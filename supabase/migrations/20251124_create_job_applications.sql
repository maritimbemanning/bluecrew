-- Create job_applications table for storing job applications
-- This table stores applications submitted via /stillinger/[slug]/sok

CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Job reference
  job_posting_id TEXT, -- References job posting in AdminCrew

  -- Applicant info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  cover_letter TEXT,
  cv_key TEXT, -- Path to CV in Supabase storage

  -- Vipps verification
  vipps_verified BOOLEAN DEFAULT false,
  vipps_sub TEXT,
  vipps_phone TEXT,
  vipps_name TEXT,
  vipps_verified_at TIMESTAMPTZ,

  -- Application metadata
  source TEXT DEFAULT 'web',
  user_agent TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'contacted', 'interview', 'rejected', 'hired', 'pending')),

  -- Admin fields
  notes TEXT,
  reviewed_by UUID,
  reviewed_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Service role has full access
CREATE POLICY "Service role full access on job_applications"
  ON job_applications
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_job_applications_email ON job_applications(email);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_created ON job_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_applications_job_posting ON job_applications(job_posting_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_vipps_sub ON job_applications(vipps_sub);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_job_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_job_applications_updated_at
  BEFORE UPDATE ON job_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_job_applications_updated_at();

-- Comment
COMMENT ON TABLE job_applications IS 'Job applications submitted via bluecrew.no/stillinger';
