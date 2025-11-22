-- Quick Fix: Update functions to use extensions schema
-- Run this FIRST if you already ran the main migration and got the gen_random_bytes error
-- Then run the data encryption section again

-- ============================================================================
-- FIX 1: Recreate encrypt_pii function with correct schema path
-- ============================================================================

CREATE OR REPLACE FUNCTION encrypt_pii(plaintext TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, vault, extensions
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

  -- Generate random IV (16 bytes for AES) - using extensions schema
  iv := extensions.gen_random_bytes(16);

  -- Encrypt using AES-256-CBC - using extensions schema
  encrypted := extensions.encrypt_iv(
    convert_to(plaintext, 'UTF8'),
    encryption_key,
    iv,
    'aes-cbc/pad:pkcs'
  );

  -- Return IV + encrypted data as base64 (IV is needed for decryption)
  RETURN encode(iv || encrypted, 'base64');
END;
$$;

-- ============================================================================
-- FIX 2: Recreate decrypt_pii function with correct schema path
-- ============================================================================

CREATE OR REPLACE FUNCTION decrypt_pii(ciphertext TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, vault, extensions
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

  -- Decrypt - using extensions schema
  decrypted := extensions.decrypt_iv(
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
-- FIX 3: Test that functions work now
-- ============================================================================

DO $$
DECLARE
  test_encryption TEXT;
  test_decryption TEXT;
BEGIN
  -- Test encryption/decryption
  test_encryption := encrypt_pii('test@example.com');
  test_decryption := decrypt_pii(test_encryption);

  IF test_decryption = 'test@example.com' THEN
    RAISE NOTICE '✅ Functions fixed! Encryption test PASSED';
  ELSE
    RAISE EXCEPTION '❌ Encryption test FAILED: got % instead of test@example.com', test_decryption;
  END IF;
END $$;

-- ============================================================================
-- FIX 4: Now encrypt existing data (this was the failing part)
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
-- VERIFICATION
-- ============================================================================

DO $$
DECLARE
  candidates_encrypted INT;
  leads_encrypted INT;
BEGIN
  SELECT COUNT(*) INTO candidates_encrypted
  FROM public.candidates WHERE is_encrypted = TRUE;

  SELECT COUNT(*) INTO leads_encrypted
  FROM public.leads WHERE is_encrypted = TRUE;

  RAISE NOTICE '✅ Encryption complete:';
  RAISE NOTICE '   - % candidates encrypted', candidates_encrypted;
  RAISE NOTICE '   - % leads encrypted', leads_encrypted;
END $$;
