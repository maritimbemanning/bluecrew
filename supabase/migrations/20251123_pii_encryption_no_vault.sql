-- Migration: PII Encryption using pgcrypto (NO VAULT)
-- Date: 2025-11-23
-- Purpose: Encrypt sensitive personal data for GDPR compliance
--
-- This version does NOT use Supabase Vault (which requires pgsodium)
-- Instead, it stores the encryption key in a secure table with RLS
--
-- IMPORTANT: Run this in Supabase SQL Editor

-- ============================================================================
-- STEP 1: Verify pgcrypto is available
-- ============================================================================

-- Test that pgcrypto functions work
DO $$
BEGIN
  PERFORM extensions.gen_random_bytes(16);
  RAISE NOTICE '✅ pgcrypto is working';
END $$;

-- ============================================================================
-- STEP 2: Create secure key storage table (instead of Vault)
-- ============================================================================

-- Create private schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS private;

-- Create a table to store encryption keys securely
CREATE TABLE IF NOT EXISTS private.encryption_keys (
  id UUID PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
  key_name TEXT UNIQUE NOT NULL,
  key_value TEXT NOT NULL,  -- Stored as hex-encoded
  created_at TIMESTAMPTZ DEFAULT NOW(),
  description TEXT
);

-- Enable RLS - only service_role can access
ALTER TABLE private.encryption_keys ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Service role only" ON private.encryption_keys;

-- Create restrictive policy - NO public access
CREATE POLICY "Service role only" ON private.encryption_keys
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Revoke all access from public and authenticated
REVOKE ALL ON private.encryption_keys FROM PUBLIC;
REVOKE ALL ON private.encryption_keys FROM authenticated;
REVOKE ALL ON private.encryption_keys FROM anon;

-- Grant only to service_role
GRANT ALL ON private.encryption_keys TO service_role;

-- ============================================================================
-- STEP 3: Generate and store encryption key
-- ============================================================================

-- Insert encryption key if it doesn't exist
INSERT INTO private.encryption_keys (key_name, key_value, description)
SELECT
  'pii_encryption_key',
  encode(extensions.gen_random_bytes(32), 'hex'),
  'AES-256 key for PII column encryption'
WHERE NOT EXISTS (
  SELECT 1 FROM private.encryption_keys WHERE key_name = 'pii_encryption_key'
);

-- Verify key was created
DO $$
DECLARE
  key_exists BOOLEAN;
BEGIN
  SELECT EXISTS(
    SELECT 1 FROM private.encryption_keys WHERE key_name = 'pii_encryption_key'
  ) INTO key_exists;

  IF key_exists THEN
    RAISE NOTICE '✅ Encryption key created/exists';
  ELSE
    RAISE EXCEPTION '❌ Failed to create encryption key';
  END IF;
END $$;

-- ============================================================================
-- STEP 4: Create encryption function
-- ============================================================================

CREATE OR REPLACE FUNCTION encrypt_pii(plaintext TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, private
AS $$
DECLARE
  encryption_key BYTEA;
  iv BYTEA;
  encrypted BYTEA;
BEGIN
  IF plaintext IS NULL OR plaintext = '' THEN
    RETURN NULL;
  END IF;

  -- Get key from secure table
  SELECT decode(key_value, 'hex') INTO encryption_key
  FROM private.encryption_keys
  WHERE key_name = 'pii_encryption_key'
  LIMIT 1;

  IF encryption_key IS NULL THEN
    RAISE EXCEPTION 'Encryption key not found. Run migration setup first.';
  END IF;

  -- Generate random IV (16 bytes for AES)
  iv := extensions.gen_random_bytes(16);

  -- Encrypt using AES-256-CBC
  encrypted := extensions.encrypt_iv(
    convert_to(plaintext, 'UTF8'),
    encryption_key,
    iv,
    'aes-cbc/pad:pkcs'
  );

  -- Return IV + encrypted data as base64
  RETURN encode(iv || encrypted, 'base64');
END;
$$;

-- ============================================================================
-- STEP 5: Create decryption function
-- ============================================================================

CREATE OR REPLACE FUNCTION decrypt_pii(ciphertext TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, private
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

  -- Get key from secure table
  SELECT decode(key_value, 'hex') INTO encryption_key
  FROM private.encryption_keys
  WHERE key_name = 'pii_encryption_key'
  LIMIT 1;

  IF encryption_key IS NULL THEN
    RAISE EXCEPTION 'Encryption key not found';
  END IF;

  -- Decode from base64
  raw_data := decode(ciphertext, 'base64');

  -- Extract IV (first 16 bytes) and encrypted data
  iv := substring(raw_data from 1 for 16);
  encrypted := substring(raw_data from 17);

  -- Decrypt
  decrypted := extensions.decrypt_iv(
    encrypted,
    encryption_key,
    iv,
    'aes-cbc/pad:pkcs'
  );

  RETURN convert_from(decrypted, 'UTF8');
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL;
END;
$$;

-- ============================================================================
-- STEP 6: Test encryption/decryption
-- ============================================================================

DO $$
DECLARE
  test_encrypted TEXT;
  test_decrypted TEXT;
BEGIN
  test_encrypted := encrypt_pii('test@example.com');
  test_decrypted := decrypt_pii(test_encrypted);

  IF test_decrypted = 'test@example.com' THEN
    RAISE NOTICE '✅ Encryption test PASSED';
    RAISE NOTICE '   Encrypted: %', substring(test_encrypted from 1 for 30) || '...';
    RAISE NOTICE '   Decrypted: %', test_decrypted;
  ELSE
    RAISE EXCEPTION '❌ Encryption test FAILED: got "%" instead of "test@example.com"', test_decrypted;
  END IF;
END $$;

-- ============================================================================
-- STEP 7: Add encrypted columns to tables
-- ============================================================================

-- Candidates table
ALTER TABLE public.candidates
  ADD COLUMN IF NOT EXISTS name_encrypted TEXT,
  ADD COLUMN IF NOT EXISTS email_encrypted TEXT,
  ADD COLUMN IF NOT EXISTS phone_encrypted TEXT,
  ADD COLUMN IF NOT EXISTS source_ip_encrypted TEXT,
  ADD COLUMN IF NOT EXISTS is_encrypted BOOLEAN DEFAULT FALSE;

-- Leads table
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS name_encrypted TEXT,
  ADD COLUMN IF NOT EXISTS email_encrypted TEXT,
  ADD COLUMN IF NOT EXISTS phone_encrypted TEXT,
  ADD COLUMN IF NOT EXISTS is_encrypted BOOLEAN DEFAULT FALSE;

-- ============================================================================
-- STEP 8: Create auto-encryption triggers
-- ============================================================================

CREATE OR REPLACE FUNCTION auto_encrypt_candidate_pii()
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

CREATE OR REPLACE FUNCTION auto_encrypt_lead_pii()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NEW.is_encrypted IS NOT TRUE THEN
    -- Note: leads table uses 'contact' instead of 'name'
    IF NEW.contact IS NOT NULL AND NEW.contact != '' THEN
      NEW.name_encrypted := encrypt_pii(NEW.contact);
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
-- STEP 9: Encrypt existing data
-- ============================================================================

-- Encrypt candidates
UPDATE public.candidates
SET
  name_encrypted = encrypt_pii(name),
  email_encrypted = encrypt_pii(email),
  phone_encrypted = encrypt_pii(phone),
  source_ip_encrypted = encrypt_pii(source_ip),
  is_encrypted = TRUE
WHERE is_encrypted IS NOT TRUE OR is_encrypted IS NULL;

-- Encrypt leads (note: leads uses 'contact' not 'name')
UPDATE public.leads
SET
  name_encrypted = encrypt_pii(contact),
  email_encrypted = encrypt_pii(email),
  phone_encrypted = encrypt_pii(phone),
  is_encrypted = TRUE
WHERE is_encrypted IS NOT TRUE OR is_encrypted IS NULL;

-- ============================================================================
-- STEP 10: Create secure views
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
  COALESCE(decrypt_pii(name_encrypted), contact) as contact,
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
-- STEP 11: Restrict access
-- ============================================================================

REVOKE ALL ON FUNCTION encrypt_pii(TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION decrypt_pii(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION encrypt_pii(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION decrypt_pii(TEXT) TO service_role;

REVOKE ALL ON public.candidates_secure FROM PUBLIC;
REVOKE ALL ON public.leads_secure FROM PUBLIC;
GRANT SELECT ON public.candidates_secure TO service_role;
GRANT SELECT ON public.leads_secure TO service_role;

-- ============================================================================
-- VERIFICATION
-- ============================================================================

DO $$
DECLARE
  candidates_count INT;
  leads_count INT;
BEGIN
  SELECT COUNT(*) INTO candidates_count FROM public.candidates WHERE is_encrypted = TRUE;
  SELECT COUNT(*) INTO leads_count FROM public.leads WHERE is_encrypted = TRUE;

  RAISE NOTICE '';
  RAISE NOTICE '========================================';
  RAISE NOTICE '✅ PII ENCRYPTION COMPLETE';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Candidates encrypted: %', candidates_count;
  RAISE NOTICE 'Leads encrypted: %', leads_count;
  RAISE NOTICE '';
  RAISE NOTICE 'Key stored in: private.encryption_keys';
  RAISE NOTICE 'Auto-encryption: ENABLED (triggers active)';
  RAISE NOTICE '';
  RAISE NOTICE 'To view decrypted data, use:';
  RAISE NOTICE '  SELECT * FROM candidates_secure;';
  RAISE NOTICE '  SELECT * FROM leads_secure;';
  RAISE NOTICE '========================================';
END $$;
