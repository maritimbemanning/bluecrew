# Bluecrew Test Guide

## 🧪 Automated Test Scripts

Vi har laget to test-scripts for å verifisere at alt funker:

### 1. **Workflow Test** (`test-workflow.js`)
Tester alle kritiske API-endepunkter og funksjoner.

**Kjør:**
```bash
node test-workflow.js
```

**Eller test mot spesifikk URL:**
```bash
TEST_URL=https://bluecrew.no node test-workflow.js
```

**Tester:**
- ✅ Homepage laster
- ✅ Health endpoints funker
- ✅ CSP headers er riktig konfigurert
- ✅ Clerk DNS (clerk.bluecrew.no)
- ✅ AdminCrew API integration
- ✅ CORS headers
- ✅ Security headers (HSTS, X-Frame-Options, etc.)
- ✅ Rate limiting

---

### 2. **Corporate Network Test** (`test-corporate-network.js`)
Sjekker om nettsiden vil funke på strenge bedriftsnettverk.

**Kjør:**
```bash
node test-corporate-network.js
```

**Tester:**
- 🏢 DNS resolution for kritiske domener
- 🏢 Tilgang til tredjepartstjenester (Clerk, Cloudflare, Sentry)
- 🏢 Vanlige bedriftsnett-blokkeringer

---

## 🚨 KRITISKE SJEKKER for bedriftsnettverk

### Problem 1: `clerk.bluecrew.no` ikke konfigurert

**Symptom:**
```
❌ clerk.bluecrew.no - DNS NOT FOUND
```

**Fix:**
1. Gå til DNS-leverandør (der bluecrew.no er registrert)
2. Legg til CNAME record:
   ```
   Name: clerk
   Target: frontend-api.clerk.services
   TTL: 3600 (eller Auto)
   ```
3. Vent 5-60 minutter (DNS propagering)
4. Test igjen: `nslookup clerk.bluecrew.no`

---

### Problem 2: `NEXT_PUBLIC_CLERK_PROXY_URL` ikke satt

**Symptom:**
- Clerk prøver å bruke `accounts.clerk.dev` i stedet for `clerk.bluecrew.no`
- Bedriftsnettverk blokkerer Clerk

**Fix:**
1. Gå til Vercel Dashboard → bluecrew → Settings → Environment Variables
2. Legg til:
   ```
   NEXT_PUBLIC_CLERK_PROXY_URL=https://clerk.bluecrew.no
   ```
3. Sett for **Production**, **Preview**, og **Development**
4. Redeploy fra Vercel

---

### Problem 3: Cloudflare Turnstile blokkert

**Symptom:**
```
❌ Cloudflare Turnstile blocked by network
```

**Fix:**
- Cloudflare Turnstile brukes av Clerk for bot-beskyttelse
- Bedrifts-IT må whiteliste `challenges.cloudflare.com`
- Alternativt: Deaktiver Turnstile i Clerk dashboard (reduserer sikkerhet)

---

## 📋 Manuell Test-Sjekkliste

Etter deployment, test disse:

### ✅ Autentisering
1. Gå til https://bluecrew.no/logg-inn
2. Prøv å logge inn
3. **Sjekk console (F12)** - ingen CSP-feil?
4. Vellykket innlogging → redirect til /min-side?

### ✅ Jobbsøknad
1. Gå til https://bluecrew.no/stillinger
2. Velg en aktiv jobb
3. Klikk "Søk på stillingen"
4. Fullfør Vipps-verifisering
5. Last opp CV (PDF, < 4MB)
6. Send søknad
7. **Sjekk:**
   - Ingen 413 Content Too Large feil?
   - Suksessmelding vises?
   - E-post mottatt?

### ✅ Min Side (GDPR)
1. Logg inn på https://bluecrew.no/min-side
2. Sjekk at søknader vises
3. Test "Last ned mine data"
4. Test "Be om sletting"

---

## 🔧 Debugging

### Sjekk CSP-feil i browser
```
1. Åpne DevTools (F12)
2. Gå til Console tab
3. Se etter røde feilmeldinger om "Content Security Policy"
```

### Sjekk Clerk konfigurering
```bash
# Test DNS
nslookup clerk.bluecrew.no

# Skal returnere CNAME til Clerk
```

### Sjekk environment variables
```bash
# I Vercel Dashboard → Settings → Environment Variables
# Må være satt:
- NEXT_PUBLIC_CLERK_PROXY_URL=https://clerk.bluecrew.no
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
- CLERK_SECRET_KEY=sk_live_...
```

---

## 📞 Vanlige problemer

| Problem | Symptom | Fix |
|---------|---------|-----|
| 413 Content Too Large | CV upload feiler | Sjekk at filen er < 4MB |
| CSP blokkerer Sentry | Console spam | Deploy siste versjon (Sentry er lagt til CSP) |
| Clerk ikke funker | "Missing publishableKey" | Sett NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY i Vercel |
| Bedriftsnett blokkerer | Clerk loading spinner foreverigt | Sett opp clerk.bluecrew.no CNAME |
| Ingen jobbsøknader på Min Side | Tomt, men har søkt | AdminCrew backend må fikses |

---

## 🚀 Quick Start

**Test ALT på en gang:**
```bash
# 1. Test workflows
node test-workflow.js

# 2. Test corporate network compatibility
node test-corporate-network.js

# 3. Hvis alt er grønt - DEPLOY! 🎉
```

---

**Laget:** 2025-11-24
**Av:** Claude (AI Assistant)
