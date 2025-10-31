-- Migration: Add consent tracking columns for candidates and leads
-- Created: 2025-10-31
-- Purpose: Persist GDPR consent and STCW confirmation flags collected via forms

-- ============================================================================
-- 1. CANDIDATES: GDPR CONSENT & STCW CONFIRMATION
-- ============================================================================
ALTER TABLE candidates
  ADD COLUMN IF NOT EXISTS gdpr_consent BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS stcw_confirmed BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN candidates.gdpr_consent IS 'True when candidate accepted privacy policy at submission';
COMMENT ON COLUMN candidates.stcw_confirmed IS 'True when candidate confirmed STCW/health documentation commitment';

-- Backfill existing rows with the safest assumption (no consent). Manual review required for legacy data.
UPDATE candidates SET gdpr_consent = coalesce(gdpr_consent, false), stcw_confirmed = coalesce(stcw_confirmed, false);

-- ============================================================================
-- 2. LEADS: GDPR CONSENT
-- ============================================================================
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS gdpr_client_consent BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN leads.gdpr_client_consent IS 'True when client representative accepted privacy policy';

UPDATE leads SET gdpr_client_consent = coalesce(gdpr_client_consent, false);
