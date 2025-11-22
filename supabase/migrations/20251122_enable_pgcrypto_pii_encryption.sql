-- Migration: Enable PII Encryption using pgcrypto
-- Date: 2025-11-22
-- Purpose: Encrypt sensitive personal data for GDPR compliance
--
-- NOTE: Supabase already provides:
--   - Encryption at rest (AES-256)
--   - Encryption in transit (TLS 1.2+)
--   - Row Level Security (RLS)
--
-- This migration adds APPLICATION-LEVEL encryption for extra PII protection
-- using pgcrypto (Supabase's recommended approach as of 2024/2025)
--
-- IMPORTANT: Run this in Supabase SQL Editor with service_role access

-- ============================================================================
-- STEP 1: Enable pgcrypto extension
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================================
-- STEP 2: Create encryption key storage in Vault
-- ============================================================================

-- Store the encryption key securely in Supabase Vault
-- You must set this key - replace 'YOUR_SECURE_32_BYTE_KEY_HERE' with a real key
-- Generate one with: SELECT encode(gen_random_bytes(32), 'hex');

-- First, let's generate a secure key and store it
DO $$
DECLARE
  existing_key TEXT;
  new_key TEXT;
BEGIN
  -- Check if key already exists in vault
  SELECT decrypted_secret INTO existing_key
  FROM vault.decrypted_secrets
  WHERE name = 'pii_encryption_key'
  LIMIT 1;

  IF existing_key IS NULL THEN
    -- Generate a new 32-byte key
    new_key := encode(gen_random_bytes(32), 'hex');

    -- Store in Vault
    PERFORM vault.create_secret(
      new_key,
      'pii_encryption_key',
      'AES-256 key for PII column encryption'
    );

    RAISE NOTICE 'Created new encryption key in Vault';
  ELSE
    RAISE NOTICE 'Encryption key already exists in Vault';
  END IF;
END $$;

-- ============================================================================
-- STEP 3: Create encryption/decryption functions
-- ============================================================================

-- Function to encrypt text using AES-256
CREATE OR REPLACE FUNCTION encrypt_pii(plaintext TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, vault
AS $$
DECLARE
  encryption_key BYTEA;
  iv BYTEA;
  encrypted BYTEA;
BEGIN
  IF plaintext IS NULL OR plaintext = '' THEN
    RETURN NULL;
  END IF;

  -- Get key from Vault
  SELECT decode(decrypted_secret, 'hex') INTO encryption_key
  FROM vault.decrypted_secrets
  WHERE name = 'pii_encryption_key'
  LIMIT 1;

  IF encryption_key IS NULL THEN
    RAISE EXCEPTION 'Encryption key not found in Vault. Run migration setup first.';
  END IF;

  -- Generate random IV (16 bytes for AES)
  iv := gen_random_bytes(16);

  -- Encrypt using AES-256-CBC
  encrypted := encrypt_iv(
    convert_to(plaintext, 'UTF8'),
    encryption_key,
    iv,
    'aes-cbc/pad:pkcs'
  );

  -- Return IV + encrypted data as base64 (IV is needed for decryption)
  RETURN encode(iv || encrypted, 'base64');
END;
$$;

-- Function to decrypt text
CREATE OR REPLACE FUNCTION decrypt_pii(ciphertext TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, vault
AS $$
DECLARE
  encryption_key BYTEA;
  raw_data BYTEA;
  iv BYTEA;
  encrypted BYTEA;
  decrypted BYTEA;
BEGIN
  IF ciphertext IS NULL OR ciphertext = '' THEN
    RETURN NULL;
  END IF;

  -- Get key from Vault
  SELECT decode(decrypted_secret, 'hex') INTO encryption_key
  FROM vault.decrypted_secrets
  WHERE name = 'pii_encryption_key'
  LIMIT 1;

  IF encryption_key IS NULL THEN
    RAISE EXCEPTION 'Encryption key not found in Vault';
  END IF;

  -- Decode from base64
  raw_data := decode(ciphertext, 'base64');

  -- Extract IV (first 16 bytes) and encrypted data
  iv := substring(raw_data from 1 for 16);
  encrypted := substring(raw_data from 17);

  -- Decrypt
  decrypted := decrypt_iv(
    encrypted,
    encryption_key,
    iv,
    'aes-cbc/pad:pkcs'
  );

  RETURN convert_from(decrypted, 'UTF8');
EXCEPTION
  WHEN OTHERS THEN
    -- Return NULL if decryption fails (data might not be encrypted)
    RETURN NULL;
END;
$$;

-- ============================================================================
-- STEP 4: Add encrypted columns to candidates table
-- ============================================================================

ALTER TABLE public.candidates
  ADD COLUMN IF NOT EXISTS name_encrypted TEXT,
  ADD COLUMN IF NOT EXISTS email_encrypted TEXT,
  ADD COLUMN IF NOT EXISTS phone_encrypted TEXT,
  ADD COLUMN IF NOT EXISTS source_ip_encrypted TEXT,
  ADD COLUMN IF NOT EXISTS is_encrypted BOOLEAN DEFAULT FALSE;

-- ============================================================================
-- STEP 5: Add encrypted columns to leads table
-- ============================================================================

ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS name_encrypted TEXT,
  ADD COLUMN IF NOT EXISTS email_encrypted TEXT,
  ADD COLUMN IF NOT EXISTS phone_encrypted TEXT,
  ADD COLUMN IF NOT EXISTS is_encrypted BOOLEAN DEFAULT FALSE;

-- ============================================================================
-- STEP 6: Create trigger to auto-encrypt on INSERT/UPDATE
-- ============================================================================

CREATE OR REPLACE FUNCTION auto_encrypt_candidate_pii()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only encrypt if not already encrypted
  IF NEW.is_encrypted IS NOT TRUE THEN
    -- Encrypt PII fields
    IF NEW.name IS NOT NULL AND NEW.name != '' THEN
      NEW.name_encrypted := encrypt_pii(NEW.name);
    END IF;

    IF NEW.email IS NOT NULL AND NEW.email != '' THEN
      NEW.email_encrypted := encrypt_pii(NEW.email);
    END IF;

    IF NEW.phone IS NOT NULL AND NEW.phone != '' THEN
      NEW.phone_encrypted := encrypt_pii(NEW.phone);
    END IF;

    IF NEW.source_ip IS NOT NULL AND NEW.source_ip != '' THEN
      NEW.source_ip_encrypted := encrypt_pii(NEW.source_ip);
    END IF;

    NEW.is_encrypted := TRUE;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS auto_encrypt_candidate_trigger ON public.candidates;
CREATE TRIGGER auto_encrypt_candidate_trigger
  BEFORE INSERT OR UPDATE ON public.candidates
  FOR EACH ROW
  EXECUTE FUNCTION auto_encrypt_candidate_pii();

-- Trigger for leads
CREATE OR REPLACE FUNCTION auto_encrypt_lead_pii()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NEW.is_encrypted IS NOT TRUE THEN
    IF NEW.name IS NOT NULL AND NEW.name != '' THEN
      NEW.name_encrypted := encrypt_pii(NEW.name);
    END IF;

    IF NEW.email IS NOT NULL AND NEW.email != '' THEN
      NEW.email_encrypted := encrypt_pii(NEW.email);
    END IF;

    IF NEW.phone IS NOT NULL AND NEW.phone != '' THEN
      NEW.phone_encrypted := encrypt_pii(NEW.phone);
    END IF;

    NEW.is_encrypted := TRUE;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS auto_encrypt_lead_trigger ON public.leads;
CREATE TRIGGER auto_encrypt_lead_trigger
  BEFORE INSERT OR UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION auto_encrypt_lead_pii();

-- ============================================================================
-- STEP 7: Encrypt existing data
-- ============================================================================

-- Encrypt existing candidates (in batches to avoid timeout)
DO $$
DECLARE
  batch_size INT := 100;
  affected INT := 1;
BEGIN
  WHILE affected > 0 LOOP
    WITH to_update AS (
      SELECT id FROM public.candidates
      WHERE is_encrypted IS NOT TRUE
      LIMIT batch_size
    )
    UPDATE public.candidates c
    SET
      name_encrypted = encrypt_pii(c.name),
      email_encrypted = encrypt_pii(c.email),
      phone_encrypted = encrypt_pii(c.phone),
      source_ip_encrypted = encrypt_pii(c.source_ip),
      is_encrypted = TRUE
    FROM to_update
    WHERE c.id = to_update.id;

    GET DIAGNOSTICS affected = ROW_COUNT;

    IF affected > 0 THEN
      RAISE NOTICE 'Encrypted % candidate records', affected;
    END IF;
  END LOOP;
END $$;

-- Encrypt existing leads
DO $$
DECLARE
  batch_size INT := 100;
  affected INT := 1;
BEGIN
  WHILE affected > 0 LOOP
    WITH to_update AS (
      SELECT id FROM public.leads
      WHERE is_encrypted IS NOT TRUE
      LIMIT batch_size
    )
    UPDATE public.leads l
    SET
      name_encrypted = encrypt_pii(l.name),
      email_encrypted = encrypt_pii(l.email),
      phone_encrypted = encrypt_pii(l.phone),
      is_encrypted = TRUE
    FROM to_update
    WHERE l.id = to_update.id;

    GET DIAGNOSTICS affected = ROW_COUNT;

    IF affected > 0 THEN
      RAISE NOTICE 'Encrypted % lead records', affected;
    END IF;
  END LOOP;
END $$;

-- ============================================================================
-- STEP 8: Create secure views for admin access
-- ============================================================================

CREATE OR REPLACE VIEW public.candidates_secure AS
SELECT
  id,
  COALESCE(decrypt_pii(name_encrypted), name) as name,
  COALESCE(decrypt_pii(email_encrypted), email) as email,
  COALESCE(decrypt_pii(phone_encrypted), phone) as phone,
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
  COALESCE(decrypt_pii(source_ip_encrypted), source_ip) as source_ip,
  status,
  is_encrypted
FROM public.candidates;

CREATE OR REPLACE VIEW public.leads_secure AS
SELECT
  id,
  COALESCE(decrypt_pii(name_encrypted), name) as name,
  COALESCE(decrypt_pii(email_encrypted), email) as email,
  COALESCE(decrypt_pii(phone_encrypted), phone) as phone,
  company,
  work_location,
  num_people,
  start_date,
  org_number,
  submitted_at,
  is_encrypted
FROM public.leads;

-- ============================================================================
-- STEP 9: Restrict access to encryption functions and views
-- ============================================================================

-- Revoke public access to encryption functions
REVOKE ALL ON FUNCTION encrypt_pii(TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION decrypt_pii(TEXT) FROM PUBLIC;

-- Grant to service_role only
GRANT EXECUTE ON FUNCTION encrypt_pii(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION decrypt_pii(TEXT) TO service_role;

-- Secure views - service_role only
REVOKE ALL ON public.candidates_secure FROM PUBLIC;
REVOKE ALL ON public.leads_secure FROM PUBLIC;

GRANT SELECT ON public.candidates_secure TO service_role;
GRANT SELECT ON public.leads_secure TO service_role;

-- ============================================================================
-- STEP 10: Verification
-- ============================================================================

DO $$
DECLARE
  candidates_encrypted INT;
  leads_encrypted INT;
  test_encryption TEXT;
  test_decryption TEXT;
BEGIN
  -- Count encrypted records
  SELECT COUNT(*) INTO candidates_encrypted
  FROM public.candidates WHERE is_encrypted = TRUE;

  SELECT COUNT(*) INTO leads_encrypted
  FROM public.leads WHERE is_encrypted = TRUE;

  -- Test encryption/decryption
  test_encryption := encrypt_pii('test@example.com');
  test_decryption := decrypt_pii(test_encryption);

  IF test_decryption = 'test@example.com' THEN
    RAISE NOTICE '✅ Encryption test PASSED';
  ELSE
    RAISE EXCEPTION '❌ Encryption test FAILED: got % instead of test@example.com', test_decryption;
  END IF;

  RAISE NOTICE '✅ Encryption complete:';
  RAISE NOTICE '   - % candidates encrypted', candidates_encrypted;
  RAISE NOTICE '   - % leads encrypted', leads_encrypted;
  RAISE NOTICE '   - Encryption key stored in Vault';
  RAISE NOTICE '   - Auto-encryption triggers active';
END $$;

-- ============================================================================
-- Documentation
-- ============================================================================

COMMENT ON FUNCTION encrypt_pii IS 'Encrypts text using AES-256-CBC with key from Vault (service_role only)';
COMMENT ON FUNCTION decrypt_pii IS 'Decrypts text using AES-256-CBC with key from Vault (service_role only)';
COMMENT ON VIEW public.candidates_secure IS 'View with decrypted candidate PII (service_role only)';
COMMENT ON VIEW public.leads_secure IS 'View with decrypted lead PII (service_role only)';

COMMENT ON COLUMN public.candidates.name_encrypted IS 'AES-256 encrypted name';
COMMENT ON COLUMN public.candidates.email_encrypted IS 'AES-256 encrypted email';
COMMENT ON COLUMN public.candidates.phone_encrypted IS 'AES-256 encrypted phone';
COMMENT ON COLUMN public.candidates.source_ip_encrypted IS 'AES-256 encrypted IP address';
COMMENT ON COLUMN public.candidates.is_encrypted IS 'Flag indicating if PII columns are encrypted';
