-- Migration: Create clerk_users table for Clerk webhook sync
-- Date: 2024-11-24
-- Purpose: Store Clerk user data for local reference and GDPR compliance

-- Create clerk_users table
CREATE TABLE IF NOT EXISTS clerk_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_user_id TEXT UNIQUE NOT NULL,
    email TEXT,
    first_name TEXT,
    last_name TEXT,
    full_name TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    vipps_verified BOOLEAN DEFAULT FALSE,
    candidate_registered BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ -- Soft delete for GDPR
);

-- Create index on clerk_user_id for fast lookups
CREATE INDEX IF NOT EXISTS idx_clerk_users_clerk_user_id ON clerk_users(clerk_user_id);

-- Create index on email for fast lookups
CREATE INDEX IF NOT EXISTS idx_clerk_users_email ON clerk_users(email);

-- Enable Row Level Security
ALTER TABLE clerk_users ENABLE ROW LEVEL SECURITY;

-- Policy: Service role has full access
CREATE POLICY "Service role full access on clerk_users"
    ON clerk_users
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Add clerk_user_id column to candidates table if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'candidates' AND column_name = 'clerk_user_id'
    ) THEN
        ALTER TABLE candidates ADD COLUMN clerk_user_id TEXT;
        CREATE INDEX idx_candidates_clerk_user_id ON candidates(clerk_user_id);
    END IF;
END $$;

-- Add clerk_user_id column to leads table if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'leads' AND column_name = 'clerk_user_id'
    ) THEN
        ALTER TABLE leads ADD COLUMN clerk_user_id TEXT;
        CREATE INDEX idx_leads_clerk_user_id ON leads(clerk_user_id);
    END IF;
END $$;

-- Add clerk_user_id column to job_applications table if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'job_applications' AND column_name = 'clerk_user_id'
    ) THEN
        ALTER TABLE job_applications ADD COLUMN clerk_user_id TEXT;
        CREATE INDEX idx_job_applications_clerk_user_id ON job_applications(clerk_user_id);
    END IF;
END $$;

-- Comment on table
COMMENT ON TABLE clerk_users IS 'Local cache of Clerk user data, synced via webhooks. Used for admin features and GDPR compliance.';
