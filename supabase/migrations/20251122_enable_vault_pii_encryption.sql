-- Migration: Enable Supabase Vault for PII Encryption
-- Date: 2025-11-22
-- Purpose: Set up encryption for sensitive personal data (GDPR compliance)
--
-- IMPORTANT: Run this in Supabase SQL Editor with service_role access
-- Supabase Pro required for Vault features

-- ============================================================================
-- STEP 1: Enable required extensions
-- ============================================================================

-- pgsodium provides cryptographic functions
CREATE EXTENSION IF NOT EXISTS pgsodium WITH SCHEMA pgsodium;

-- vault extension for secret management
CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;

-- ============================================================================
-- STEP 2: Create encryption keys for each sensitive table
-- ============================================================================

-- Create a key for candidates table PII
-- This key will be used to encrypt name, email, phone, and IP
DO $$
BEGIN
  -- Check if key already exists
  IF NOT EXISTS (
    SELECT 1 FROM pgsodium.valid_key
    WHERE name = 'candidates_pii_key'
  ) THEN
    -- Create a new encryption key
    PERFORM pgsodium.create_key(
      name := 'candidates_pii_key',
      key_type := 'aead-det',  -- Deterministic AEAD for searchable encryption
      key_context := 'candidates'
    );
  END IF;
END $$;

-- Create a key for leads table PII
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pgsodium.valid_key
    WHERE name = 'leads_pii_key'
  ) THEN
    PERFORM pgsodium.create_key(
      name := 'leads_pii_key',
      key_type := 'aead-det',
      key_context := 'leads'
    );
  END IF;
END $$;

-- ============================================================================
-- STEP 3: Create helper functions for encryption/decryption
-- ============================================================================

-- Function to encrypt text using a named key
CREATE OR REPLACE FUNCTION encrypt_pii(
  plaintext TEXT,
  key_name TEXT DEFAULT 'candidates_pii_key'
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  key_id UUID;
  encrypted BYTEA;
BEGIN
  IF plaintext IS NULL OR plaintext = '' THEN
    RETURN NULL;
  END IF;

  -- Get the key ID
  SELECT id INTO key_id
  FROM pgsodium.valid_key
  WHERE name = key_name
  LIMIT 1;

  IF key_id IS NULL THEN
    RAISE EXCEPTION 'Encryption key % not found', key_name;
  END IF;

  -- Encrypt the data
  encrypted := pgsodium.crypto_aead_det_encrypt(
    message := convert_to(plaintext, 'UTF8'),
    additional := ''::BYTEA,
    key_id := key_id
  );

  -- Return as base64
  RETURN encode(encrypted, 'base64');
END;
$$;

-- Function to decrypt text
CREATE OR REPLACE FUNCTION decrypt_pii(
  ciphertext TEXT,
  key_name TEXT DEFAULT 'candidates_pii_key'
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  key_id UUID;
  decrypted BYTEA;
BEGIN
  IF ciphertext IS NULL OR ciphertext = '' THEN
    RETURN NULL;
  END IF;

  -- Get the key ID
  SELECT id INTO key_id
  FROM pgsodium.valid_key
  WHERE name = key_name
  LIMIT 1;

  IF key_id IS NULL THEN
    RAISE EXCEPTION 'Encryption key % not found', key_name;
  END IF;

  -- Decrypt the data
  decrypted := pgsodium.crypto_aead_det_decrypt(
    ciphertext := decode(ciphertext, 'base64'),
    additional := ''::BYTEA,
    key_id := key_id
  );

  RETURN convert_from(decrypted, 'UTF8');
END;
$$;

-- ============================================================================
-- STEP 4: Add encrypted columns to candidates table
-- ============================================================================

-- Add encrypted columns (store encrypted data alongside original for migration)
ALTER TABLE public.candidates
  ADD COLUMN IF NOT EXISTS name_encrypted TEXT,
  ADD COLUMN IF NOT EXISTS email_encrypted TEXT,
  ADD COLUMN IF NOT EXISTS phone_encrypted TEXT,
  ADD COLUMN IF NOT EXISTS source_ip_encrypted TEXT;

-- Create index on email_encrypted for lookups (deterministic encryption allows this)
CREATE INDEX IF NOT EXISTS idx_candidates_email_encrypted
  ON public.candidates(email_encrypted);

-- ============================================================================
-- STEP 5: Add encrypted columns to leads table
-- ============================================================================

ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS name_encrypted TEXT,
  ADD COLUMN IF NOT EXISTS email_encrypted TEXT,
  ADD COLUMN IF NOT EXISTS phone_encrypted TEXT;

CREATE INDEX IF NOT EXISTS idx_leads_email_encrypted
  ON public.leads(email_encrypted);

-- ============================================================================
-- STEP 6: Create trigger to auto-encrypt on INSERT/UPDATE
-- ============================================================================

-- Trigger function for candidates
CREATE OR REPLACE FUNCTION encrypt_candidate_pii()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Encrypt PII fields
  IF NEW.name IS NOT NULL AND NEW.name != '' THEN
    NEW.name_encrypted := encrypt_pii(NEW.name, 'candidates_pii_key');
  END IF;

  IF NEW.email IS NOT NULL AND NEW.email != '' THEN
    NEW.email_encrypted := encrypt_pii(NEW.email, 'candidates_pii_key');
  END IF;

  IF NEW.phone IS NOT NULL AND NEW.phone != '' THEN
    NEW.phone_encrypted := encrypt_pii(NEW.phone, 'candidates_pii_key');
  END IF;

  IF NEW.source_ip IS NOT NULL AND NEW.source_ip != '' THEN
    NEW.source_ip_encrypted := encrypt_pii(NEW.source_ip, 'candidates_pii_key');
  END IF;

  RETURN NEW;
END;
$$;

-- Attach trigger to candidates table
DROP TRIGGER IF EXISTS encrypt_candidate_pii_trigger ON public.candidates;
CREATE TRIGGER encrypt_candidate_pii_trigger
  BEFORE INSERT OR UPDATE ON public.candidates
  FOR EACH ROW
  EXECUTE FUNCTION encrypt_candidate_pii();

-- Trigger function for leads
CREATE OR REPLACE FUNCTION encrypt_lead_pii()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NEW.name IS NOT NULL AND NEW.name != '' THEN
    NEW.name_encrypted := encrypt_pii(NEW.name, 'leads_pii_key');
  END IF;

  IF NEW.email IS NOT NULL AND NEW.email != '' THEN
    NEW.email_encrypted := encrypt_pii(NEW.email, 'leads_pii_key');
  END IF;

  IF NEW.phone IS NOT NULL AND NEW.phone != '' THEN
    NEW.phone_encrypted := encrypt_pii(NEW.phone, 'leads_pii_key');
  END IF;

  RETURN NEW;
END;
$$;

-- Attach trigger to leads table
DROP TRIGGER IF EXISTS encrypt_lead_pii_trigger ON public.leads;
CREATE TRIGGER encrypt_lead_pii_trigger
  BEFORE INSERT OR UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION encrypt_lead_pii();

-- ============================================================================
-- STEP 7: Migrate existing data (encrypt current PII)
-- ============================================================================

-- Encrypt existing candidate records
UPDATE public.candidates
SET
  name_encrypted = encrypt_pii(name, 'candidates_pii_key'),
  email_encrypted = encrypt_pii(email, 'candidates_pii_key'),
  phone_encrypted = encrypt_pii(phone, 'candidates_pii_key'),
  source_ip_encrypted = encrypt_pii(source_ip, 'candidates_pii_key')
WHERE name_encrypted IS NULL
  AND (name IS NOT NULL OR email IS NOT NULL);

-- Encrypt existing lead records
UPDATE public.leads
SET
  name_encrypted = encrypt_pii(name, 'leads_pii_key'),
  email_encrypted = encrypt_pii(email, 'leads_pii_key'),
  phone_encrypted = encrypt_pii(phone, 'leads_pii_key')
WHERE name_encrypted IS NULL
  AND (name IS NOT NULL OR email IS NOT NULL);

-- ============================================================================
-- STEP 8: Create secure view for admin access
-- ============================================================================

-- View that shows decrypted data (only for service_role)
CREATE OR REPLACE VIEW public.candidates_decrypted AS
SELECT
  id,
  COALESCE(decrypt_pii(name_encrypted, 'candidates_pii_key'), name) as name,
  COALESCE(decrypt_pii(email_encrypted, 'candidates_pii_key'), email) as email,
  COALESCE(decrypt_pii(phone_encrypted, 'candidates_pii_key'), phone) as phone,
  fylke,
  kommune,
  available_from,
  wants_temporary,
  stcw_confirm,
  work_main,
  skills,
  other_comp,
  cv_key,
  certs_key,
  submitted_at,
  COALESCE(decrypt_pii(source_ip_encrypted, 'candidates_pii_key'), source_ip) as source_ip,
  status
FROM public.candidates;

CREATE OR REPLACE VIEW public.leads_decrypted AS
SELECT
  id,
  COALESCE(decrypt_pii(name_encrypted, 'leads_pii_key'), name) as name,
  COALESCE(decrypt_pii(email_encrypted, 'leads_pii_key'), email) as email,
  COALESCE(decrypt_pii(phone_encrypted, 'leads_pii_key'), phone) as phone,
  company,
  work_location,
  num_people,
  start_date,
  org_number,
  submitted_at
FROM public.leads;

-- ============================================================================
-- STEP 9: Revoke direct access to encrypted functions from public
-- ============================================================================

-- Only service_role should be able to decrypt
REVOKE ALL ON FUNCTION decrypt_pii(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION decrypt_pii(TEXT, TEXT) TO service_role;

-- Encrypt function can be used by triggers (which run as SECURITY DEFINER)
REVOKE ALL ON FUNCTION encrypt_pii(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION encrypt_pii(TEXT, TEXT) TO service_role;

-- Views only accessible to service_role
ALTER VIEW public.candidates_decrypted OWNER TO postgres;
ALTER VIEW public.leads_decrypted OWNER TO postgres;

REVOKE ALL ON public.candidates_decrypted FROM PUBLIC;
GRANT SELECT ON public.candidates_decrypted TO service_role;

REVOKE ALL ON public.leads_decrypted FROM PUBLIC;
GRANT SELECT ON public.leads_decrypted TO service_role;

-- ============================================================================
-- VERIFICATION: Check encryption is working
-- ============================================================================

-- This should return the count of encrypted records
DO $$
DECLARE
  encrypted_candidates INT;
  encrypted_leads INT;
BEGIN
  SELECT COUNT(*) INTO encrypted_candidates
  FROM public.candidates
  WHERE name_encrypted IS NOT NULL;

  SELECT COUNT(*) INTO encrypted_leads
  FROM public.leads
  WHERE name_encrypted IS NOT NULL;

  RAISE NOTICE 'Encryption complete: % candidates, % leads encrypted',
    encrypted_candidates, encrypted_leads;
END $$;

-- Add comments for documentation
COMMENT ON COLUMN public.candidates.name_encrypted IS 'Encrypted name using pgsodium AEAD';
COMMENT ON COLUMN public.candidates.email_encrypted IS 'Encrypted email using pgsodium AEAD';
COMMENT ON COLUMN public.candidates.phone_encrypted IS 'Encrypted phone using pgsodium AEAD';
COMMENT ON COLUMN public.candidates.source_ip_encrypted IS 'Encrypted IP address using pgsodium AEAD';

COMMENT ON COLUMN public.leads.name_encrypted IS 'Encrypted name using pgsodium AEAD';
COMMENT ON COLUMN public.leads.email_encrypted IS 'Encrypted email using pgsodium AEAD';
COMMENT ON COLUMN public.leads.phone_encrypted IS 'Encrypted phone using pgsodium AEAD';

COMMENT ON FUNCTION encrypt_pii IS 'Encrypts text using named pgsodium key (SECURITY DEFINER)';
COMMENT ON FUNCTION decrypt_pii IS 'Decrypts text using named pgsodium key (service_role only)';

COMMENT ON VIEW public.candidates_decrypted IS 'Secure view showing decrypted candidate data (service_role only)';
COMMENT ON VIEW public.leads_decrypted IS 'Secure view showing decrypted lead data (service_role only)';
