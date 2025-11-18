-- ============================================
-- UPDATE CANDIDATES TABLE
-- Add Fylke and Kommune columns, remove old address fields
-- ============================================

-- Add new columns
ALTER TABLE public.candidates 
ADD COLUMN IF NOT EXISTS fylke TEXT,
ADD COLUMN IF NOT EXISTS kommune TEXT;

-- Remove old address columns (if they exist)
ALTER TABLE public.candidates 
DROP COLUMN IF EXISTS street_address,
DROP COLUMN IF EXISTS postal_code,
DROP COLUMN IF EXISTS postal_city;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_candidates_fylke ON public.candidates(fylke);
CREATE INDEX IF NOT EXISTS idx_candidates_kommune ON public.candidates(kommune);

-- Verify changes
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'candidates'
  AND column_name IN ('fylke', 'kommune', 'street_address', 'postal_code', 'postal_city')
ORDER BY column_name;

-- ============================================
-- FERDIG! ✅
-- ============================================
-- Forventede resultater:
-- fylke: TEXT, nullable YES
-- kommune: TEXT, nullable YES
-- (street_address, postal_code, postal_city skal IKKE vises)
