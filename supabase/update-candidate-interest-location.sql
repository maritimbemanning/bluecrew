-- ============================================
-- UPDATE CANDIDATE_INTEREST TABLE
-- Add Fylke and Kommune columns, remove old address fields
-- ============================================

-- Add new columns
ALTER TABLE public.candidate_interest 
ADD COLUMN IF NOT EXISTS fylke TEXT,
ADD COLUMN IF NOT EXISTS kommune TEXT;

-- Remove old columns (if they exist)
ALTER TABLE public.candidate_interest 
DROP COLUMN IF EXISTS street_address,
DROP COLUMN IF EXISTS postal_code,
DROP COLUMN IF EXISTS postal_city,
DROP COLUMN IF EXISTS region;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_candidate_interest_fylke ON public.candidate_interest(fylke);
CREATE INDEX IF NOT EXISTS idx_candidate_interest_kommune ON public.candidate_interest(kommune);

-- Verify changes
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'candidate_interest'
  AND column_name IN ('fylke', 'kommune', 'street_address', 'postal_code', 'postal_city', 'region')
ORDER BY column_name;

-- ============================================
-- FERDIG! ✅
-- ============================================
-- Forventede resultater:
-- fylke: TEXT, nullable YES
-- kommune: TEXT, nullable YES
-- (street_address, postal_code, postal_city, region skal IKKE vises)
