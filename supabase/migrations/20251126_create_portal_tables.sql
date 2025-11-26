-- =====================================================
-- BLUECREW PORTAL TABLES
-- Migration: 20251126_create_portal_tables.sql
--
-- Creates tables for the /min-side portal:
-- - user_documents: CV, certificates, health docs
-- - messages: User <-> Bluecrew messaging
-- - assignments: Work assignments for maritime workers
-- =====================================================

-- =====================================================
-- 1. USER DOCUMENTS
-- Stores metadata for uploaded documents (files in Supabase Storage)
-- =====================================================
CREATE TABLE IF NOT EXISTS user_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('cv', 'certificate', 'health', 'other')),
  name TEXT NOT NULL,
  filename TEXT NOT NULL,
  storage_path TEXT, -- Path in Supabase Storage bucket
  expires_at TIMESTAMPTZ, -- For certificates/health docs
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast user lookups
CREATE INDEX IF NOT EXISTS idx_user_documents_clerk_user_id ON user_documents(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_user_documents_expires_at ON user_documents(expires_at) WHERE expires_at IS NOT NULL;

-- RLS Policies
ALTER TABLE user_documents ENABLE ROW LEVEL SECURITY;

-- Users can only see their own documents (via API with service role)
-- Admin access handled via service role key in API routes

-- =====================================================
-- 2. MESSAGES
-- Messaging between users and Bluecrew team
-- =====================================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'bluecrew')),
  sender_name TEXT, -- Name of Bluecrew team member if sender='bluecrew'
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_messages_clerk_user_id ON messages(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_unread ON messages(clerk_user_id, read) WHERE read = FALSE;

-- RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 3. ASSIGNMENTS
-- Work assignments for maritime personnel
-- =====================================================
CREATE TABLE IF NOT EXISTS assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL,

  -- Assignment details
  title TEXT NOT NULL,
  vessel_name TEXT,
  company TEXT,
  location TEXT,
  role TEXT, -- Job role on the vessel

  -- Dates
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,

  -- Status: upcoming, active, completed, cancelled
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'completed', 'cancelled')),

  -- Contact info
  contact_name TEXT,
  contact_phone TEXT,

  -- Additional info
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_assignments_clerk_user_id ON assignments(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_assignments_status ON assignments(status);
CREATE INDEX IF NOT EXISTS idx_assignments_dates ON assignments(start_date, end_date);

-- RLS
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 4. HELPER FUNCTIONS
-- =====================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_user_documents_updated_at ON user_documents;
CREATE TRIGGER update_user_documents_updated_at
  BEFORE UPDATE ON user_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_assignments_updated_at ON assignments;
CREATE TRIGGER update_assignments_updated_at
  BEFORE UPDATE ON assignments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 5. SAMPLE DATA FOR TESTING (commented out for production)
-- =====================================================
-- Uncomment to add test data:
/*
INSERT INTO messages (clerk_user_id, sender, sender_name, content) VALUES
  ('test_user_id', 'bluecrew', 'Maria', 'Velkommen til Bluecrew! Vi har mottatt din søknad.'),
  ('test_user_id', 'bluecrew', 'Maria', 'Hei! Vi har en spennende mulighet som kan passe deg.');
*/
