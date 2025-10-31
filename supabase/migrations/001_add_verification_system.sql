-- Migration: Add verification system for candidates
-- Created: 2025-10-29
-- Purpose: Add BankID/Vipps verification, OCR validation, and audit logging

-- ============================================================================
-- 1. ADD VERIFICATION COLUMNS TO CANDIDATES TABLE
-- ============================================================================

ALTER TABLE candidates 
ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'pending_bankid' 
  CHECK (verification_status IN ('pending_bankid', 'pending_documents', 'pending_review', 'verified', 'rejected'));

ALTER TABLE candidates ADD COLUMN IF NOT EXISTS bankid_verified_at TIMESTAMP;
ALTER TABLE candidates ADD COLUMN IF NOT EXISTS national_id_hash TEXT; -- SHA-256 of fødselsnummer
ALTER TABLE candidates ADD COLUMN IF NOT EXISTS ocr_confidence_score INTEGER DEFAULT 0 CHECK (ocr_confidence_score >= 0 AND ocr_confidence_score <= 100);
ALTER TABLE candidates ADD COLUMN IF NOT EXISTS flagged_reason TEXT;
ALTER TABLE candidates ADD COLUMN IF NOT EXISTS verified_by TEXT; -- Admin email who approved
ALTER TABLE candidates ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP;

-- Add index for filtering by verification status
CREATE INDEX IF NOT EXISTS idx_candidates_verification_status ON candidates(verification_status);
CREATE INDEX IF NOT EXISTS idx_candidates_verified_at ON candidates(verified_at);

-- ============================================================================
-- 2. CREATE VERIFICATION_LOGS TABLE (AUDIT TRAIL)
-- ============================================================================

CREATE TABLE IF NOT EXISTS verification_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  action TEXT NOT NULL, -- 'bankid_verified', 'ocr_checked', 'manual_approved', 'manual_rejected', 'data_accessed'
  performed_by TEXT NOT NULL, -- 'system' or admin email
  result TEXT, -- 'pass', 'fail', 'needs_review'
  confidence_score INTEGER CHECK (confidence_score >= 0 AND confidence_score <= 100),
  details JSONB, -- Extra data (OCR results, flags, etc)
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for verification_logs
CREATE INDEX IF NOT EXISTS idx_verification_logs_candidate ON verification_logs(candidate_id);
CREATE INDEX IF NOT EXISTS idx_verification_logs_created_at ON verification_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_verification_logs_action ON verification_logs(action);

-- ============================================================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on verification_logs
ALTER TABLE verification_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users can read logs (for admin portal)
CREATE POLICY "Authenticated users can read verification logs" 
  ON verification_logs 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Policy: Only service role can insert logs
CREATE POLICY "Service role can insert verification logs" 
  ON verification_logs 
  FOR INSERT 
  WITH CHECK (auth.role() = 'service_role');

-- ============================================================================
-- 4. HELPER FUNCTIONS
-- ============================================================================

-- Function to automatically log when candidate verification status changes
CREATE OR REPLACE FUNCTION log_verification_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.verification_status IS DISTINCT FROM OLD.verification_status THEN
    INSERT INTO verification_logs (
      candidate_id,
      action,
      performed_by,
      result,
      details
    ) VALUES (
      NEW.id,
      'status_changed',
      COALESCE(NEW.verified_by, 'system'),
      NEW.verification_status,
      jsonb_build_object(
        'old_status', OLD.verification_status,
        'new_status', NEW.verification_status,
        'flagged_reason', NEW.flagged_reason
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-log status changes
DROP TRIGGER IF EXISTS trigger_log_verification_change ON candidates;
CREATE TRIGGER trigger_log_verification_change
  AFTER UPDATE ON candidates
  FOR EACH ROW
  EXECUTE FUNCTION log_verification_status_change();

-- ============================================================================
-- 5. COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON COLUMN candidates.verification_status IS 'Current verification status of candidate';
COMMENT ON COLUMN candidates.bankid_verified_at IS 'Timestamp when BankID/Vipps verification completed';
COMMENT ON COLUMN candidates.national_id_hash IS 'SHA-256 hash of Norwegian fødselsnummer (GDPR-safe)';
COMMENT ON COLUMN candidates.ocr_confidence_score IS 'Confidence score (0-100) from OCR validation of STCW certificate';
COMMENT ON COLUMN candidates.flagged_reason IS 'Reason why candidate was flagged for manual review';
COMMENT ON COLUMN candidates.verified_by IS 'Email of admin who manually verified candidate';
COMMENT ON COLUMN candidates.verified_at IS 'Timestamp when candidate was finally approved';

COMMENT ON TABLE verification_logs IS 'Audit trail of all verification actions (required for legal compliance)';
COMMENT ON COLUMN verification_logs.action IS 'Type of action performed (bankid_verified, ocr_checked, manual_approved, etc)';
COMMENT ON COLUMN verification_logs.performed_by IS 'Who performed the action (system or admin email)';
COMMENT ON COLUMN verification_logs.result IS 'Result of the action (pass, fail, needs_review)';
COMMENT ON COLUMN verification_logs.confidence_score IS 'Confidence score if applicable (e.g., OCR confidence)';
COMMENT ON COLUMN verification_logs.details IS 'Additional JSON data about the action';
