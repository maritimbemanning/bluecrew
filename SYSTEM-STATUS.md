# BLUECREW.NO - SYSTEM STATUS & GDPR COMPLIANCE

**Sist oppdatert:** 26. november 2025
**Branch:** `claude/fix-candidate-form-01VbQ4DjwPFsXZuQThXyvJhs`

---

## 🔒 SIKKERHET

### Admin-tilgang
| Metode | Status |
|--------|--------|
| E-post whitelist | ✅ KUN `isak@bluecrew.no`, `tf@bluecrew.no` |
| Clerk metadata | ❌ IGNORERES (sikkert) |
| Clerk organizations | ❌ IGNORERES (sikkert) |

**Fil:** `app/lib/admin-config.ts`

### API-sikkerhet
| Endpoint | Beskyttelse |
|----------|-------------|
| `/api/admin/*` | ✅ Krever admin e-post |
| `/api/user/*` | ✅ Krever innlogging (Clerk) |
| `/api/submit-candidate` | ✅ CSRF + Rate limiting + Honeypot |

---

## 📋 GDPR STATUS

### ✅ Implementert
- [x] Samtykke-avkrysning på registreringsskjema
- [x] Private storage buckets (`candidates-private`)
- [x] Row Level Security i Supabase
- [x] Admin-tilgang begrenset til whitelist
- [x] Personvern-side (`/min-side/personvern`)

### ⚠️ MANGLER (prioritert)
- [ ] **Slett min konto** - Bruker må kunne slette all sin data
- [ ] **Eksporter mine data** - Bruker må kunne laste ned alt
- [ ] **Databehandleravtaler** - Sjekk avtaler med Supabase, Clerk, Vercel
- [ ] **Oppbevaringstid** - Definer hvor lenge data lagres
- [ ] **Cookie-samtykke** - Hvis cookies brukes

---

## 🏗️ ARKITEKTUR

### Nettsteder
| URL | Formål | Clerk App |
|-----|--------|-----------|
| bluecrew.no | Jobbsøkere + Ansatte | Bluecrew |
| admincrew.no | Admin-dashboard | Admincrew |

### Brukertyper
| Type | Tilgang | Hvordan identifisert |
|------|---------|---------------------|
| Jobbsøker | Registrering, se egen status | Alle innloggede |
| Ansatt | Full portal | TBD (Clerk org?) |
| Admin | Admin-panel | E-post whitelist |

---

## 📱 PORTAL (/min-side)

### Sider
| Side | Status | Supabase-tabell |
|------|--------|-----------------|
| `/min-side` | ✅ Live | - |
| `/min-side/soknader` | ✅ Live | `job_applications` |
| `/min-side/dokumenter` | ✅ Live | `user_documents` |
| `/min-side/meldinger` | ✅ Live | `messages` |
| `/min-side/oppdrag` | ✅ Live | `assignments` |
| `/min-side/timer` | ✅ Live | `time_entries` |
| `/min-side/varsler` | ✅ Live | Clerk metadata |
| `/min-side/personvern` | ✅ Live | - |

### Supabase-tabeller (må eksistere)
```sql
-- Sjekk at disse finnes:
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN (
  'candidates',
  'job_applications',
  'user_documents',
  'messages',
  'assignments',
  'time_entries',
  'clerk_users'
);
```

---

## 🐛 KJENTE ISSUES

### Fikset
- [x] "Body has already been read" - Kandidatskjema
- [x] `clerk_user_id` mangler i candidates - Migrasjon kjørt
- [x] React.cloneElement TypeScript-feil - Dokumenter-side

### Åpne
- [ ] Clerk organizations - Brukere kan lage egne (skru av i dashboard)
- [ ] Admin-panel vises i /min-side (skal fjernes)

---

## 🚀 DEPLOYMENT CHECKLIST

Før neste deploy, sjekk:

1. **Supabase**
   - [ ] Alle tabeller opprettet
   - [ ] RLS aktivert på alle tabeller
   - [ ] Storage bucket `candidates-private` eksisterer

2. **Clerk**
   - [ ] "Allow users to create organizations" = AV
   - [ ] Slett uønskede orgs (Robin, Olaf, Mattias)
   - [ ] Legg ansatte til i Bluecrew Admin org

3. **Testing**
   - [ ] Test kandidatskjema som ny bruker
   - [ ] Test portal som ansatt
   - [ ] Verifiser admin-tilgang fungerer

---

## 📞 KONTAKT

**Teknisk support:** Claude (denne chatten)
**Admin-e-poster:** isak@bluecrew.no, tf@bluecrew.no

---

*Dette dokumentet er auto-generert og bør holdes oppdatert.*
