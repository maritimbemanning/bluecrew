# Admin PR: Signed URL helper (no shared tokens)

This patch contains ready-to-copy files for the Admin app (repo: maritimbemanning/bluecrew-admin) to generate signed Supabase Storage URLs on the server, without using any token from the public site.

## Files to copy

Copy these into the Admin repo with the same paths:

- app/api/storage/sign/route.ts
- lib/supabaseServer.ts (or merge into your existing server client)

Optional UI helper:
- components/DownloadCvButton.tsx

## Env required in Admin (Production)

- NEXT_PUBLIC_SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY (server-side only)

No shared ADMIN_SIGN_TOKEN is needed.

## How it works

- The server route creates a short-lived (15 min) signed URL for keys like `cv/<hash>.pdf` or `cert/<hash>/certificate.pdf` from the private bucket `candidates-private`.
- Keys are validated to prevent traversal and restricted to allowed prefixes.
- The route is server-only and should be invoked from Admin pages/actions.

## Quick test after deploying Admin

```powershell
# Replace <admin-host> with admin.bluecrew.no or the preview domain
Invoke-WebRequest -Uri "https://<admin-host>/api/storage/sign?key=cv/TEST.pdf" -Method GET
```

Expected: `{ ok: true, url: "https://...signed..." }` or a 400 with `invalid key` if the path doesn’t exist or fails validation.

## Notes

- Keep `SUPABASE_SERVICE_ROLE_KEY` strictly on the server.
- If you add auth checks, gate this route to Admin-only sessions.
