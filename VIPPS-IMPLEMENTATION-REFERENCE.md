# Vipps Implementation Reference – Bluecrew Candidate Form

**Last updated:** October 31, 2025  
**Branch:** `hotfix/candidate-form-restore`  
**Status:** ✅ GDPR-compliant, passing lint (0 errors, 8 warnings)

---

## 📖 About Bluecrew

**Bluecrew** is a Norwegian maritime staffing and recruitment agency (vikar- og bemanningsbyrå) specializing in the maritime sector.

### Core Business
- **Vikarbyråtjenester** (Temporary staffing): Short-term crew placement for ships and offshore operations
- **Bemanningsbyrå** (Staffing agency): Sourcing qualified maritime personnel (deck officers, engineers, ABs, etc.)
- **Rekruttering** (Recruitment): Permanent position hiring for shipping companies and offshore operators

### Website Purpose
This website helps Bluecrew:
- Collect candidate applications (with Vipps verification for GDPR compliance)
- Receive client staffing/recruitment requests
- Process maritime documents via OCR (certificates, seafarer's books)
- Match qualified workers with clients

### Admin Portal
The admin portal at `/admin/*` (authentication required) allows Bluecrew staff to:
- View and manage candidate applications from Supabase
- Review client job requests
- Process OCR-scanned maritime documents
- Monitor Vipps verification status
- Handle GDPR data deletion requests

**Access:** Admin routes are protected by Criipto/BankID authentication (Norwegian eID).

---

## 🎯 What We Built

Vipps-first candidate registration flow where:
- User fills out form
- **Vipps verification required BEFORE any data goes to API/database**
- Draft saved to sessionStorage (client-only, no server write) if user hasn't verified
- Data only submits to `/api/submit-candidate` after Vipps verification completes

---

## 🔒 GDPR Compliance – Critical

### The Law Requirement
Cannot store candidate data in database before identity verification (GDPR Article 5 + Norwegian personal data law).

### Our Solution
1. User submits form → check if `vippsSession` exists
2. **NO Vipps verification?**
   - Save form values to `window.sessionStorage` (client-side only)
   - Show Vipps modal
   - **No API call, no DB write**
3. **YES Vipps verification?**
   - Submit form to `/api/submit-candidate`
   - Write to Supabase
   - Clear sessionStorage draft

### What Happens If User Cancels
- Draft stays in browser's sessionStorage
- User can close browser/cancel modal—no data leaked to server
- When they return, draft auto-restores from sessionStorage

---

## 📁 Modified Files

### Core Form Component
- **`app/jobbsoker/CandidateForm.tsx`** (main changes)
  - Added Vipps session check on page load
  - Added `handleSubmit` with Vipps gate
  - Added modal UI for Vipps login
  - Added verified badge display
  - Added draft save/restore from sessionStorage
  - Added status messages

### Supporting Files (already created, not changed in this session)
- `app/jobbsoker/VippsLogin.tsx` – Vipps verified badge component
- `app/api/vipps/init/route.ts` – Start Vipps auth flow
- `app/api/vipps/session/route.ts` – Check Vipps session
- `app/api/vipps/callback/route.ts` – Handle Vipps redirect
- `app/lib/vipps.ts` – Vipps utility functions
- `.env.local` – Vipps credentials (NEVER commit this file)

---

## 🔄 User Flow (Step by Step)

### Happy Path
1. User visits `/jobbsoker/registrer`
2. Page checks `/api/vipps/session` on load (sets `vippsSession` if already verified)
3. User fills out form fields
4. User clicks "Send inn jobbsøkerprofil"
5. Form validates (Zod schema)
6. **Check: Is `vippsSession` set?**
   - ❌ **NO** → Save draft to sessionStorage, show Vipps modal
   - ✅ **YES** → Submit to `/api/submit-candidate`, redirect to success page
7. User clicks "Logg inn med Vipps" in modal
8. Redirect to Vipps auth (`/api/vipps/init`)
9. Vipps redirect back to `/jobbsoker/registrer?verified=true`
10. Page checks session again, finds Vipps verification, shows verified badge
11. Draft auto-restores from sessionStorage
12. User clicks submit again → now sends to API

### Cancel/Exit Path
1. User fills form, clicks submit
2. Modal shows (no data sent to server yet)
3. User clicks "Avbryt" or closes browser
4. Draft stays in sessionStorage
5. No data written to DB ✅

---

## 🛠️ Technical Implementation

### Key State Variables (CandidateForm.tsx)
```typescript
const [vippsSession, setVippsSession] = useState<VippsSession | null>(null);
const [showVippsModal, setShowVippsModal] = useState(false);
const [draftValues, setDraftValues] = useState<StoredCandidateDraft | null>(null);
const [statusMessage, setStatusMessage] = useState<string | null>(null);
```

### Submit Handler Logic
```typescript
const handleSubmit = useCallback(
  async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Validate form
    const formData = new FormData(event.currentTarget);
    const { values } = extractCandidateForm(formData);
    const parsed = candidateSchema.safeParse(values);
    
    // Check validation errors
    if (errors) {
      // Show errors, return early
    }
    
    // CRITICAL GATE: Check Vipps verification
    if (!vippsSession) {
      // Save to sessionStorage (client-side only)
      window.sessionStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(values));
      setShowVippsModal(true); // Show modal
      return; // Stop here—no API call
    }
    
    // Vipps verified—submit to API
    const response = await fetch("/api/submit-candidate", {
      method: "POST",
      body: formData,
    });
    
    // Clear draft after success
    window.sessionStorage.removeItem(FORM_STORAGE_KEY);
    window.location.href = "/jobbsoker/registrer?sent=worker";
  },
  [vippsSession]
);
```

### SessionStorage Key
```typescript
const FORM_STORAGE_KEY = "bluecrew:candidateFormDraft";
```

### Draft Restore (useEffect)
```typescript
useEffect(() => {
  if (typeof window === "undefined") return;
  try {
    const saved = window.sessionStorage.getItem(FORM_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setDraftValues(parsed);
      setStatusMessage("Skjemautkast funnet. Fullfør Vipps-verifisering og send inn.");
    }
  } catch (error) {
    console.error("Failed to restore candidate draft", error);
  }
}, []);
```

### Vipps Session Check (useEffect)
```typescript
const checkVippsSession = useCallback(async (fromCallback = false) => {
  try {
    const response = await fetch("/api/vipps/session");
    const data = await response.json();
    
    if (data.verified && data.session) {
      setVippsSession(data.session);
      setShowVippsModal(false);
      setStatusMessage(
        fromCallback
          ? "Vipps-verifisering fullført. Kontroller opplysningene før innsending."
          : "Vipps-verifisering aktiv. Fullfør skjemaet for å sende inn."
      );
    }
  } catch (error) {
    console.error("Failed to check Vipps session", error);
  }
}, []);

useEffect(() => {
  checkVippsSession();
}, [checkVippsSession]);

useEffect(() => {
  const verified = searchParams.get("verified");
  if (verified === "true") {
    checkVippsSession(true);
  }
}, [searchParams, checkVippsSession]);
```

---

## 🧪 Testing Instructions

### Local Testing
```powershell
# Start dev server
cd c:/dev/bluecrew
npm run dev
```

Visit: `http://localhost:3000/jobbsoker/registrer`

### Test Scenarios

#### Scenario 1: Fresh User (No Vipps Verification)
1. Fill form fields
2. Click "Send inn jobbsøkerprofil"
3. ✅ Should see Vipps modal (no API call yet)
4. Check Network tab: no POST to `/api/submit-candidate`
5. Check sessionStorage: `bluecrew:candidateFormDraft` should have form data
6. Click "Avbryt" → modal closes
7. Refresh page → form should auto-fill from draft

#### Scenario 2: Vipps Flow Complete
1. Fill form
2. Click submit → modal shows
3. Click "Logg inn med Vipps"
4. Complete Vipps auth (or mock it in `/api/vipps/callback`)
5. Redirect back to form
6. ✅ Should see green verified badge
7. ✅ Should see status message
8. Click submit again
9. ✅ Should POST to `/api/submit-candidate`
10. ✅ Should redirect to success page

#### Scenario 3: Draft Persistence
1. Fill form halfway
2. Click submit (no Vipps)
3. Close browser tab
4. Reopen `/jobbsoker/registrer`
5. ✅ Form should restore from draft
6. ✅ Status message should show "Skjemautkast funnet"

---

## 🚨 Troubleshooting

### Problem: Form submits to API before Vipps verification
**Diagnosis:** Check `handleSubmit` function—`if (!vippsSession)` gate must return early  
**Fix:** Verify `vippsSession` state is null before verification

### Problem: Draft not restoring after Vipps return
**Diagnosis:** Check sessionStorage key matches `FORM_STORAGE_KEY`  
**Fix:** Open DevTools → Application → Session Storage → verify `bluecrew:candidateFormDraft` exists

### Problem: Modal doesn't show
**Diagnosis:** Check `showVippsModal` state is set to `true` in submit handler  
**Fix:** Add console.log in `handleSubmit` to trace state

### Problem: Verified badge not showing
**Diagnosis:** Check `/api/vipps/session` returns `{ verified: true, session: {...} }`  
**Fix:** Test session endpoint directly in browser

### Problem: Cache issues
**Clear all caches:**
```powershell
# Hard refresh in browser
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)

# Clear Next.js cache
cd c:/dev/bluecrew
Remove-Item -Recurse -Force .next
npm run dev
```

**Clear sessionStorage:**
```javascript
// In browser console
sessionStorage.clear();
location.reload();
```

---

## 🔐 Environment Variables

Required in `.env.local` (NEVER commit this file):

```bash
# Vipps credentials
VIPPS_CLIENT_ID=your-client-id
VIPPS_CLIENT_SECRET=your-client-secret
VIPPS_SUBSCRIPTION_KEY=your-subscription-key

# Vipps API config
NEXT_PUBLIC_BASE_URL=https://www.bluecrew.no
VIPPS_REDIRECT_URI=https://www.bluecrew.no/api/vipps/callback
VIPPS_API_BASE_URL=https://api.vipps.no

# Supabase (for data storage after Vipps verification)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 📊 Current Status

### Build Status
- **ESLint:** ✅ 0 errors, 8 warnings (non-blocking)
- **TypeScript:** ✅ Compiles
- **Branch:** `hotfix/candidate-form-restore`

### Warnings (Safe to Ignore for Now)
1. `app/api/auth/criipto/callback/route.ts` – unused `state` variable
2. `app/api/auth/criipto/session/route.ts` – unused `error` variable
3. `app/api/vipps/init/route.ts` – unused `redirectUrl` variable
4. `app/jobbsoker/CandidateForm.tsx` – unused `honey` variable (honeypot)
5. `app/jobbsoker/guides/hvordan-bli-maskinoffiser/page.tsx` – unused `Image` import
6. `app/kunde/ClientContent.tsx` – unused `useMemo` import
7. `app/lib/ocr.ts` – unused `filePath` and `candidateName` variables

### Working Tree Changes
- 26 modified files (various UI, API routes, layouts)
- 3 deleted public images
- Multiple new untracked files (auth routes, Vipps components, docs)

---

## 🚀 Deployment Checklist

### Before Merge to Main
- [ ] Test Vipps flow end-to-end in dev
- [ ] Verify draft saves/restores correctly
- [ ] Confirm modal blocks API submission
- [ ] Check verified badge appears after Vipps return
- [ ] Lint passes (0 errors)
- [ ] `.env.local` not committed (check `.gitignore`)

### Deploy to Production
```powershell
# Merge hotfix branch
git checkout main
git merge hotfix/candidate-form-restore

# Push to trigger Vercel deploy
git push origin main
```

### Post-Deploy Verification
- [ ] Test form submission flow on production URL
- [ ] Verify Vipps redirect works with production callback URL
- [ ] Check sessionStorage draft persistence
- [ ] Monitor Sentry/logs for errors

---

## 📝 Key Files Reference

### CandidateForm.tsx Structure
```
Imports
  ↓
Types (VippsSession, StoredCandidateDraft, FieldErrors)
  ↓
UI Styles (const ui = { ... })
  ↓
Component (CandidateContent)
  ├─ State setup (vippsSession, showVippsModal, draftValues, etc.)
  ├─ useEffect hooks (session check, draft restore, analytics)
  ├─ Handlers (handleSubmit, handleVippsLogin, clearFieldError, etc.)
  ├─ Conditional render (if submitted → success card)
  └─ Main render
      ├─ Hero section
      ├─ Vipps modal (conditional)
      └─ Form layout
          ├─ Verified badge (conditional)
          ├─ Status message (conditional)
          ├─ Form sections (contact, address, work, competence, documents, consent)
          └─ Submit button
```

---

## 💡 Quick Commands

```powershell
# Start dev server
npm run dev

# Lint check
npm run lint

# Clear Next.js cache
Remove-Item -Recurse -Force .next

# View current branch
git branch --show-current

# Check working tree status
git status --short

# View uncommitted changes
git diff app/jobbsoker/CandidateForm.tsx
```

---

## 🆘 Emergency Rollback

If something breaks in production:

```powershell
# Checkout main
git checkout main

# Restore CandidateForm.tsx to last known good commit
git checkout HEAD~1 -- app/jobbsoker/CandidateForm.tsx

# Commit and push
git commit -m "revert: rollback CandidateForm to previous stable version"
git push origin main
```

---

## 📞 Contact for Issues

- Developer: GitHub Copilot (AI assistant)
- Client: Isak (isak@bluecrew.no, 923 28 850)
- Vipps Support: [Vipps Developer Portal](https://developer.vippsmobilepay.com)

---

**Remember:** Data NEVER goes to the API before Vipps verification. That's the entire point of this implementation. If you see data in Supabase without a Vipps session record, something is broken.
