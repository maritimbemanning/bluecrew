# PII Encryption Setup for Bluecrew

This guide explains how to enable encryption for personally identifiable information (PII) in the Bluecrew database.

## What Supabase Already Provides

Before adding extra encryption, know that Supabase already provides:

- **Encryption at Rest**: All database files are encrypted with AES-256
- **Encryption in Transit**: All traffic encrypted via HTTPS/TLS 1.2+
- **Row Level Security (RLS)**: Fine-grained access control
- **Vault**: Secure storage for secrets and API keys

## Why Add Column Encryption?

Additional column-level encryption provides:

1. **Defense in depth**: Even if someone gains database access, PII remains encrypted
2. **GDPR Article 32**: "Appropriate technical measures" for data protection
3. **Audit compliance**: Shows proactive security measures

## What Gets Encrypted

### Candidates Table
| Column | Type | Encrypted Column |
|--------|------|-----------------|
| `name` | Full name | `name_encrypted` |
| `email` | Email address | `email_encrypted` |
| `phone` | Phone number | `phone_encrypted` |
| `source_ip` | IP address | `source_ip_encrypted` |

### Leads Table
| Column | Type | Encrypted Column |
|--------|------|-----------------|
| `name` | Contact name | `name_encrypted` |
| `email` | Email address | `email_encrypted` |
| `phone` | Phone number | `phone_encrypted` |

## Technical Implementation

### Encryption Method
- **Algorithm**: AES-256-CBC (industry standard)
- **Library**: pgcrypto (Supabase-supported)
- **Key Storage**: Supabase Vault (encrypted secrets)
- **IV Handling**: Random 16-byte IV per encryption (prepended to ciphertext)

### How It Works
```
User submits form
       |
       v
API writes to database
       |
       v
Trigger fires (auto_encrypt_candidate_pii)
       |
       v
1. Get encryption key from Vault
2. Generate random IV
3. Encrypt PII with AES-256-CBC
4. Store IV + ciphertext in *_encrypted columns
5. Set is_encrypted = TRUE
```

## How to Apply the Migration

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to **SQL Editor** (left sidebar)

### Step 2: Run the Migration

1. Open the file: `supabase/migrations/20251122_enable_pgcrypto_pii_encryption.sql`
2. Copy the entire contents
3. Paste into the SQL Editor
4. Click **Run**

The migration will:
1. Enable pgcrypto extension
2. Generate and store encryption key in Vault
3. Create `encrypt_pii()` and `decrypt_pii()` functions
4. Add encrypted columns to tables
5. Create auto-encryption triggers
6. Encrypt all existing data
7. Create secure views for admin access

### Step 3: Verify It Worked

Run this in SQL Editor:

```sql
-- Check encryption key exists in Vault
SELECT name, description FROM vault.decrypted_secrets
WHERE name = 'pii_encryption_key';

-- Check candidates are encrypted
SELECT
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE is_encrypted = TRUE) as encrypted
FROM public.candidates;

-- Check leads are encrypted
SELECT
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE is_encrypted = TRUE) as encrypted
FROM public.leads;

-- Test encryption/decryption
SELECT
  encrypt_pii('test@example.com') as encrypted,
  decrypt_pii(encrypt_pii('test@example.com')) as decrypted;

-- View decrypted data (service_role only)
SELECT name, email FROM public.candidates_secure LIMIT 5;
```

## Accessing Data

### For Normal API Operations
The application code doesn't need changes. The original columns (`name`, `email`, etc.) still work for writing. Triggers handle encryption automatically.

### For Admin/Reporting
Use the secure views that automatically decrypt:
- `candidates_secure` - Decrypted candidate data
- `leads_secure` - Decrypted lead data

These views only work with `service_role` key.

### Example: Reading from Admin Dashboard
```sql
-- Get all candidates with decrypted PII
SELECT * FROM candidates_secure ORDER BY submitted_at DESC;

-- Search by decrypted email
SELECT * FROM candidates_secure WHERE email LIKE '%@example.com';
```

## Security Model

### Access Control
| Role | encrypt_pii() | decrypt_pii() | *_secure views |
|------|--------------|---------------|----------------|
| anon | No | No | No |
| authenticated | No | No | No |
| service_role | Yes | Yes | Yes |

### Key Management
- Key is generated automatically (32 bytes / 256 bits)
- Key is stored encrypted in Supabase Vault
- Key never leaves the database
- Key is only accessible to service_role

## Trade-offs

### Performance
- Encryption/decryption adds ~1-2ms per operation
- Encrypted columns cannot be indexed for searching
- Batch operations may be slower

### Recommendations
- Don't encrypt columns you need to search/filter by
- Use secure views for reporting, not raw tables
- Keep original columns during transition period

## Future Steps (Optional)

### Phase 2: Remove Plaintext Columns
After verifying encryption works (1-2 weeks):

```sql
-- Remove plaintext columns
ALTER TABLE public.candidates
  DROP COLUMN name,
  DROP COLUMN email,
  DROP COLUMN phone,
  DROP COLUMN source_ip;

-- Rename encrypted columns
ALTER TABLE public.candidates
  RENAME COLUMN name_encrypted TO name;
ALTER TABLE public.candidates
  RENAME COLUMN email_encrypted TO email;
-- etc.
```

### Phase 3: Update Application Code
Modify the application to use encrypted columns directly and decrypt on read.

## Troubleshooting

### "extension pgcrypto does not exist"
```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

### "permission denied for function"
You're not using service_role. Check your connection:
```sql
SELECT current_user, session_user;
```

### "Encryption key not found in Vault"
Re-run the key generation part of the migration:
```sql
DO $$
BEGIN
  PERFORM vault.create_secret(
    encode(gen_random_bytes(32), 'hex'),
    'pii_encryption_key',
    'AES-256 key for PII column encryption'
  );
END $$;
```

### Decryption returns NULL
The data might not be encrypted, or the key changed. Check:
```sql
SELECT is_encrypted, name_encrypted FROM candidates LIMIT 1;
```

## GDPR Compliance

This encryption helps with:
- **Article 32**: Security of processing (encryption at rest)
- **Article 5(1)(f)**: Integrity and confidentiality
- **Recital 83**: Appropriate technical measures

Combined with existing Bluecrew features:
- Automatic data deletion (24 months candidates, 12 months leads)
- User portal for data access requests (`/min-side`)
- Rate limiting and CSRF protection
- Cookie consent banner

## Sources

- [Supabase Column Encryption](https://supabase.com/docs/guides/database/column-encryption)
- [Supabase Vault](https://supabase.com/docs/guides/database/vault)
- [pgcrypto Documentation](https://www.postgresql.org/docs/current/pgcrypto.html)
- [GDPR Article 32](https://gdpr-info.eu/art-32-gdpr/)
