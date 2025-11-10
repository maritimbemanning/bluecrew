-- Migration: Update leads table for new B2B form structure
-- Date: 2025-11-10
-- Purpose: Add new required fields and update schema to match ClientContent.tsx

-- Add new required fields
ALTER TABLE public.leads 
  ADD COLUMN IF NOT EXISTS work_location TEXT,
  ADD COLUMN IF NOT EXISTS num_people TEXT,
  ADD COLUMN IF NOT EXISTS start_date TEXT,
  ADD COLUMN IF NOT EXISTS org_number TEXT;

-- Make phone optional (was required before)
-- Note: Can't directly alter constraint, but validation happens in app layer

-- Update indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_work_location ON public.leads(work_location);
CREATE INDEX IF NOT EXISTS idx_leads_start_date ON public.leads(start_date);
CREATE INDEX IF NOT EXISTS idx_leads_org_number ON public.leads(org_number);

-- Add comment for documentation
COMMENT ON COLUMN public.leads.work_location IS 'Arbeidssted (skipsnavn eller område) - Required';
COMMENT ON COLUMN public.leads.num_people IS 'Antall personer - Required';
COMMENT ON COLUMN public.leads.start_date IS 'Oppstartsdato (ISO format eller text) - Required';
COMMENT ON COLUMN public.leads.org_number IS 'Organisasjonsnummer for autofyll - Optional';
COMMENT ON COLUMN public.leads.phone IS 'Telefon - Optional but recommended';

-- Verify schema
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'leads' 
  AND table_schema = 'public'
ORDER BY ordinal_position;
