# Data Processing Agreements (DPA)

Purpose: Keep signed DPAs and key transfer safeguards handy for audits and vendor reviews. This folder provides a simple, consistent place to store metadata and (optionally) the signed PDFs.

Important:
- If this repository is public, do not commit signed PDFs. Instead, store them in a private drive and record metadata here (date, signer, link/path).
- If this repo is private and you choose to commit, ensure files are access-controlled and contain no API keys or customer data.

## Vendors

Recommended subfolders for signed copies or metadata:

- `./supabase/` — Supabase DPA (SCC 2021, Module 2)
- `./resend/` — Resend Data Processing Addendum
- `./upstash/` — Upstash DPA (SCC Module 2)
- `./plausible/` — Plausible DPA (cookie‑less analytics; EU-based)

We also keep a Transfer Impact Assessment here: `./tia.md`.

## Quick checklist

- [ ] Supabase — DPA signed, SCC included
  - Link: https://supabase.com/legal/dpa
  - Signed date: ____ / ____ / ______
  - Signer(s): ______________________
  - Storage location: `./supabase/` (or private drive link)
- [ ] Resend — DPA signed
  - Legal page: https://resend.com/legal (DPA section)
  - Signed date: ____ / ____ / ______
  - Signer(s): ______________________
  - Storage location: `./resend/` (or private drive link)
- [ ] Upstash — DPA signed, SCC included
  - Link: https://upstash.com/legal/dpa
  - Signed date: ____ / ____ / ______
  - Signer(s): ______________________
  - Storage location: `./upstash/` (or private drive link)
- [ ] Plausible — DPA signed (if using Cloud), or Processor Agreement if applicable
  - Link: https://plausible.io/dpa and https://plausible.io/data-policy
  - Signed date: ____ / ____ / ______
  - Signer(s): ______________________
  - Storage location: `./plausible/` (or private drive link)

## Suggested metadata template

Create a `metadata.json` alongside each signed document to track revisions without opening PDFs:

```
{
  "vendor": "Supabase",
  "document": "DPA",
  "version": "2024-09-30",
  "signed_date": "2025-01-15",
  "signers": [
    { "name": "Bluecrew AS", "role": "Controller" },
    { "name": "Supabase Ltd.", "role": "Processor" }
  ],
  "scc_attached": true,
  "data_center_region": "EU (Frankfurt/Stockholm)",
  "retention_notes": "As per processor policy; see main privacy policy",
  "storage": {
    "repo_path": "docs/dpa/supabase/SUPABASE_DPA_SIGNED_2025-01-15.pdf",
    "private_drive": "SharePoint/Legal/DPAs/Supabase_DPA_2025-01-15.pdf"
  }
}
```

## Housekeeping tips

- Keep the latest signed copy; move older versions to an `/archive` subfolder (or private drive) with clear dates.
- When vendors update their terms, add a note here and include the effective date.
- Cross-reference this folder from `app/personvern/page.tsx` if you want an internal comment indicating where DPAs are kept (not user-visible).
