-- =====================================================
-- Add clerk_user_id column to candidates table
-- Migration: 20251126_add_clerk_user_id_to_candidates.sql
--
-- Links candidates to their Clerk user account
-- =====================================================

-- Add clerk_user_id column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'candidates' AND column_name = 'clerk_user_id'
  ) THEN
    ALTER TABLE candidates ADD COLUMN clerk_user_id TEXT;
  END IF;
END $$;

-- Create index for fast lookups
CREATE INDEX IF NOT EXISTS idx_candidates_clerk_user_id ON candidates(clerk_user_id);

-- Optional: Update existing candidates if you have a mapping
-- UPDATE candidates SET clerk_user_id = (SELECT clerk_user_id FROM clerk_users WHERE clerk_users.email = candidates.email);
