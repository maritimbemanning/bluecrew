-- =====================================================
-- TIME ENTRIES TABLE
-- For employee time tracking
-- =====================================================

CREATE TABLE IF NOT EXISTS time_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL,

  -- Time data
  date DATE NOT NULL,
  hours DECIMAL(4,2) NOT NULL CHECK (hours >= 0 AND hours <= 24),
  description TEXT,

  -- Link to assignment (optional)
  assignment_id UUID REFERENCES assignments(id) ON DELETE SET NULL,

  -- Status: draft, submitted, approved, rejected
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'rejected')),

  -- Timestamps
  submitted_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  approved_by TEXT,
  rejected_reason TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- One entry per user per date
  UNIQUE(clerk_user_id, date)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_time_entries_clerk_user_id ON time_entries(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_date ON time_entries(date);
CREATE INDEX IF NOT EXISTS idx_time_entries_status ON time_entries(status);

-- RLS
ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;
