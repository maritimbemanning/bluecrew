# 🏢 Bedriftsnett Blokkering - Diagnose og Fix

## ⚠️ KRITISK PROBLEM

Bluecrew blir **blokkert på bedriftsnettverk** hvis Clerk ikke er riktig konfigurert!

---

## 🔍 Hvorfor skjer dette?

Bedriftsnettverk har strenge firewalls som blokkerer:
- ❌ Ukjente tredjepartsdomener (f.eks. `accounts.clerk.dev`)
- ❌ Eksterne autentiseringstjenester
- ❌ OAuth/OIDC-trafikk til ikke-godkjente domener

**Når `NEXT_PUBLIC_CLERK_PROXY_URL` ikke er satt:**
```
Browser → accounts.clerk.dev ❌ BLOKKERT
           ↑
     Ukjent domene → Firewall sier NEI!
```

**Når `NEXT_PUBLIC_CLERK_PROXY_URL` ER satt:**
```
Browser → clerk.bluecrew.no ✅ TILLATT
           ↑
     Subdomain av bluecrew.no → Firewall sier OK!
```

---

## 🚨 SJEKK DETTE NÅ!

### 1. Er NEXT_PUBLIC_CLERK_PROXY_URL satt i Vercel?

**Gå til:** Vercel Dashboard → bluecrew → Settings → Environment Variables

**Må finnes:**
```env
NEXT_PUBLIC_CLERK_PROXY_URL=https://clerk.bluecrew.no
```

**Hvis den MANGLER eller er feil:**
- ❌ Clerk bruker `accounts.clerk.dev`
- ❌ Bedriftsnettverk blokkerer
- ❌ Brukere kan ikke logge inn
- ❌ Nettsiden virker "ødelagt"

---

### 2. Er DNS CNAME konfigurert?

**Test i terminal:**
```bash
nslookup clerk.bluecrew.no
```

**Forventet resultat:**
```
clerk.bluecrew.no    canonical name = frontend-api.clerk.services.
```

**Hvis du får "NXDOMAIN" eller "server can't find":**
- ❌ DNS CNAME mangler
- ❌ `clerk.bluecrew.no` eksisterer ikke
- ❌ Selv om proxy URL er satt, vil det ikke funke

**Fix:**
1. Gå til DNS-leverandør (der bluecrew.no er registrert)
2. Legg til CNAME:
   ```
   Name: clerk
   Target: frontend-api.clerk.services
   TTL: 3600
   ```
3. Vent 5-60 minutter (DNS propagering)

---

### 3. Er Clerk Supabase Integration aktivert?

**Gå til:** Clerk Dashboard → Integrations → Supabase

**VIKTIG:** Du trenger **IKKE** Supabase-integrasjonen!
- ✅ Deres arkitektur bruker **server-side Supabase** (riktig!)
- ✅ All database-tilgang går gjennom API routes
- ❌ IKKE aktiver Supabase integration (unødvendig)

---

## 🛠️ FIX CHECKLIST

### ✅ Step 1: Sett Environment Variable i Vercel

1. Gå til: https://vercel.com/maritimbemanning/bluecrew/settings/environment-variables
2. Klikk "Add"
3. Fyll ut:
   ```
   Name: NEXT_PUBLIC_CLERK_PROXY_URL
   Value: https://clerk.bluecrew.no
   Environments: Production, Preview, Development (huk av ALLE!)
   ```
4. Klikk "Save"

---

### ✅ Step 2: Konfigurer DNS CNAME

**Hvor er bluecrew.no registrert?**
- Domeneshop.no?
- Cloudflare?
- GoDaddy?
- Namecheap?

**Gå dit og:**
1. Finn DNS-settings
2. Legg til ny record:
   ```
   Type: CNAME
   Name: clerk
   Target: frontend-api.clerk.services
   TTL: Auto (eller 3600)
   ```
3. Lagre

**Verifiser etter 10-60 minutter:**
```bash
nslookup clerk.bluecrew.no
# Skal vise: frontend-api.clerk.services
```

---

### ✅ Step 3: Konfigurer i Clerk Dashboard

1. Gå til: https://dashboard.clerk.com
2. Velg bluecrew-appen din
3. Gå til: **Configure** → **Domains**
4. Under "Frontend API", legg til:
   ```
   clerk.bluecrew.no
   ```
5. Klikk "Add domain"
6. Clerk vil gi deg CNAME target (skal være `frontend-api.clerk.services`)

---

### ✅ Step 4: Redeploy i Vercel

Etter at environment variable er satt:
1. Gå til: Vercel Dashboard → Deployments
2. Finn siste deployment
3. Klikk "..." → **Redeploy**
4. ELLER: Promote feature branch deployment til Production

---

### ✅ Step 5: Test!

**Test fra bedriftsnettverket:**
```bash
# Kjør automated test
node test-corporate-network.js
```

**Manuell test:**
1. Gå til https://bluecrew.no/logg-inn
2. Åpne DevTools (F12) → Network tab
3. Prøv å logge inn
4. Sjekk at requests går til `clerk.bluecrew.no` (IKKE `accounts.clerk.dev`)

---

## 🎯 Hvordan vet jeg om det funker?

### ✅ RIKTIG konfigurert:

**I Network tab (DevTools):**
```
✅ clerk.bluecrew.no/v1/client?...      200 OK
✅ clerk.bluecrew.no/v1/environment     200 OK
```

**I Console tab:**
```
(ingen feilmeldinger)
```

---

### ❌ FEIL konfigurert:

**I Network tab:**
```
❌ accounts.clerk.dev/v1/client?...     (failed) net::ERR_BLOCKED_BY_CLIENT
```

**I Console:**
```
❌ Failed to load resource: net::ERR_BLOCKED_BY_CLIENT
❌ Clerk: Unable to load environment
```

---

## 🔧 Debugging Commands

```bash
# Test DNS resolution
nslookup clerk.bluecrew.no

# Test HTTPS connection
curl -I https://clerk.bluecrew.no

# Test if blocked by firewall
curl -I https://accounts.clerk.dev

# Run automated tests
node test-corporate-network.js
```

---

## 📊 Vanlige problemer og løsninger

| Problem | Årsak | Fix |
|---------|-------|-----|
| clerk.bluecrew.no NXDOMAIN | CNAME ikke satt | Legg til CNAME i DNS |
| Clerk bruker accounts.clerk.dev | NEXT_PUBLIC_CLERK_PROXY_URL mangler | Legg til i Vercel env vars |
| DNS resolves men blocked | Firewall blokkerer Clerk | Bedrifts-IT må whiteliste clerk.bluecrew.no |
| Fungerer hjemme, ikke på jobb | Bedriftsnettverk strengere | Fix DNS + Proxy URL |
| Console spam med CSP errors | Sentry/Clerk blokkert | Deploy siste versjon (CSP fikset) |

---

## 💡 TL;DR - Quick Fix

```bash
# 1. Legg til i Vercel Environment Variables:
NEXT_PUBLIC_CLERK_PROXY_URL=https://clerk.bluecrew.no

# 2. Legg til CNAME i DNS:
clerk → frontend-api.clerk.services

# 3. Redeploy i Vercel

# 4. Vent 10-60 min (DNS propagering)

# 5. Test:
node test-corporate-network.js
```

**Ferdig! 🎉**

---

**Laget:** 2025-11-24
**Av:** Claude (AI Assistant)
