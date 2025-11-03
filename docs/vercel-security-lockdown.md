# Vercel Security Lockdown - CRITICAL
## Prevent Unauthorized Deployments

**INCIDENT:** Unauthorized deployment from isakdidriksson-9729 account caused SEO damage (Nov 3, 2025)

---

## 🚨 IMMEDIATE ACTIONS (DO NOW):

### 1. Remove Unauthorized Team Members
- Vercel Dashboard → Settings → Team Members
- **REMOVE: isakdidriksson-9729** (if present)
- Only keep trusted accounts with deploy permissions

### 2. Enable Deployment Protection
- Settings → General → Deployment Protection
- ✅ Enable "Vercel Authentication" for preview deployments
- ✅ Enable "Deployment Protection" for production

### 3. Lock Production Branch
- Settings → Git
- Production Branch: `main` (ONLY)
- ✅ Disable preview deployments from other branches
- ✅ Require approval for deployments (if available)

### 4. GitHub Branch Protection (CRITICAL)
Add this to prevent force pushes and require reviews:

**GitHub Repo → Settings → Branches → Add Rule:**
- Branch name pattern: `main`
- ✅ Require pull request before merging
- ✅ Require approvals: 1
- ✅ Dismiss stale reviews
- ✅ Require review from Code Owners
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ **Include administrators** (important!)
- ✅ Restrict who can push to matching branches
  - Add ONLY: maritimbemanning

### 5. Vercel Environment Variables Protection
- Settings → Environment Variables
- Set all sensitive vars to "Production" ONLY (not preview)
- This prevents unauthorized accounts from seeing secrets

---

## 🔐 RECOMMENDED SECURITY SETUP:

### Vercel Team Roles:
- **Owner**: maritimbemanning (YOU) - full control
- **Member**: (if needed) - can deploy but not change settings
- **Viewer**: (if needed) - read-only, NO deploy permissions

### GitHub Repository Settings:
- **Admin**: maritimbemanning (YOU)
- **Write**: (optional trusted developers)
- **Read**: (optional - for contractors, no push access)

### Deployment Workflow (Secure):
1. All changes go through Pull Requests
2. Preview deployments for PRs (not main)
3. Code review required before merge to main
4. Only main branch deploys to production
5. Manual approval required (optional but recommended)

---

## 📋 AUDIT CHECKLIST (Run Monthly):

- [ ] Review Vercel team members (Settings → Team)
- [ ] Review GitHub collaborators (Repo → Settings → Collaborators)
- [ ] Check recent deployments for unauthorized activity
- [ ] Verify production domain points to correct branch
- [ ] Rotate API keys/tokens if compromised
- [ ] Check Vercel audit log for suspicious activity

---

## 🚨 INCIDENT RESPONSE (If Unauthorized Deploy Happens Again):

1. **Immediately redeploy latest main commit** in Vercel
2. Remove unauthorized team member from Vercel + GitHub
3. Check what was deployed (compare commits)
4. Request Google Search Console re-index if SEO affected
5. Rotate all API keys/secrets (Supabase, Resend, etc)
6. Document incident and update security measures

---

## ✅ VERIFICATION (After Lockdown):

Test that security is working:
1. Try deploying from a different account → Should fail
2. Try pushing to main without PR → Should fail (if branch protection enabled)
3. Check Vercel team list → Only authorized accounts
4. Check GitHub collaborators → Only authorized accounts

---

**Last updated: Nov 3, 2025**
**Next review: Dec 3, 2025**
