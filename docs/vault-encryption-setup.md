# Supabase Vault PII Encryption Setup

This guide explains how to enable encryption for personally identifiable information (PII) in the Bluecrew database using Supabase Vault and pgsodium.

## Prerequisites

- **Supabase Pro plan** (required for Vault features)
- Admin access to Supabase dashboard

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

## How to Apply the Migration

### Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open the migration file: `supabase/migrations/20251122_enable_vault_pii_encryption.sql`
4. Copy the entire contents
5. Paste into the SQL Editor
6. Click **Run**

### Option 2: Supabase CLI

```bash
# Make sure you're logged in
supabase login

# Link to your project (if not already linked)
supabase link --project-ref uqwfesvsfiqjcpzwetkz

# Push the migration
supabase db push
```

## How It Works

### Encryption Process
1. **Automatic**: New data is encrypted automatically via database triggers
2. **Deterministic**: Uses AEAD-det encryption which allows searching on encrypted values
3. **Key Management**: Keys are stored securely in pgsodium key table

### Data Flow
```
User submits form
       |
       v
API writes to database
       |
       v
Trigger fires (encrypt_candidate_pii)
       |
       v
PII is encrypted and stored in *_encrypted columns
Original columns remain for backward compatibility
```

### Accessing Data

**For normal API operations**: Use the regular table - triggers handle encryption automatically

**For admin/reporting**: Use the decrypted views:
- `candidates_decrypted` - Shows decrypted candidate data
- `leads_decrypted` - Shows decrypted lead data

These views are only accessible with `service_role` key.

## Verification

After running the migration, verify it worked:

```sql
-- Check encryption keys exist
SELECT name, key_type FROM pgsodium.valid_key
WHERE name IN ('candidates_pii_key', 'leads_pii_key');

-- Check encrypted data exists
SELECT
  COUNT(*) as total,
  COUNT(name_encrypted) as encrypted
FROM public.candidates;

-- Test decryption (service_role only)
SELECT name, email FROM public.candidates_decrypted LIMIT 1;
```

## Security Notes

1. **Keys are managed by Supabase**: You don't need to handle key rotation manually
2. **Service role only**: Decryption functions are restricted to `service_role`
3. **Backward compatible**: Original columns still work during transition
4. **Searchable**: Deterministic encryption allows `WHERE email_encrypted = encrypt_pii('test@example.com')`

## Future Steps (Optional)

Once you've verified encryption works:

1. **Remove plaintext columns** (after sufficient testing):
```sql
ALTER TABLE public.candidates
  DROP COLUMN name,
  DROP COLUMN email,
  DROP COLUMN phone,
  DROP COLUMN source_ip;

-- Rename encrypted columns
ALTER TABLE public.candidates
  RENAME COLUMN name_encrypted TO name;
-- etc.
```

2. **Update application code** to use decrypted views for admin

3. **Enable audit logging** with pgAudit (separate migration)

## Troubleshooting

### "extension pgsodium does not exist"
Your Supabase project needs the pgsodium extension enabled. This should be automatic on Pro plans.

### "permission denied for function"
Make sure you're running the migration with service_role key, not anon key.

### "key not found"
The encryption keys weren't created. Check the pgsodium.valid_key table and re-run the key creation section.

## GDPR Compliance

This encryption helps with:
- **Article 32**: Security of processing (encryption at rest)
- **Article 5(1)(f)**: Integrity and confidentiality
- **Recital 83**: Appropriate technical measures

Combined with your existing:
- Automatic data deletion (24 months candidates, 12 months leads)
- User portal for data access requests
- Rate limiting and CSRF protection
