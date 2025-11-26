# BLUECREW PLATFORM - KOMPLETT OVERSIKT

**Dato:** 26. november 2025
**Versjon:** 1.0
**Status:** ✅ Live i produksjon

---

## 📊 TECH STACK

### Frontend
| Teknologi | Versjon | Formål |
|-----------|---------|--------|
| Next.js | 15.5.5 | App Router, RSC |
| React | 19 | UI |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling |

### Backend & Database
| Teknologi | Formål |
|-----------|--------|
| Supabase | PostgreSQL database + Storage |
| Clerk Pro | Autentisering, Organizations, Webhooks |
| Upstash Redis | Rate limiting |
| Resend | E-post |
| Vipps | ID-verifisering (BankID) |

### Hosting
| Tjeneste | URL |
|----------|-----|
| Vercel | bluecrew.no |
| Admincrew | admincrew.no (separat app) |

---

## 🏗️ ARKITEKTUR

```
┌─────────────────────────────────────────────────────────────┐
│                        BLUECREW.NO                          │
├─────────────────────────────────────────────────────────────┤
│  Jobbsøker-flyt:                                            │
│  /jobbsoker/registrer → Vipps → Skjema → Supabase          │
│                                                              │
│  Ansatt-portal (/min-side):                                 │
│  ├── /soknader      - Søknadshistorikk                      │
│  ├── /dokumenter    - CV, sertifikater                      │
│  ├── /meldinger     - Chat med Bluecrew                     │
│  ├── /oppdrag       - Arbeidsoppdrag                        │
│  ├── /timer         - Timeregistrering                      │
│  ├── /varsler       - Push-notifikasjoner                   │
│  └── /personvern    - GDPR                                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        ADMINCREW.NO                         │
├─────────────────────────────────────────────────────────────┤
│  Admin-dashboard:                                           │
│  - Se alle kandidater                                       │
│  - Behandle søknader                                        │
│  - Oppdatere status                                         │
│  - Sende meldinger                                          │
│  - Administrere oppdrag                                     │
│  - Godkjenne timer                                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         SUPABASE                            │
├─────────────────────────────────────────────────────────────┤
│  Tabeller:                                                  │
│  - candidates         (jobbsøkere)                          │
│  - job_applications   (søknader)                            │
│  - user_documents     (dokumenter)                          │
│  - messages           (meldinger)                           │
│  - assignments        (oppdrag)                             │
│  - time_entries       (timer)                               │
│  - clerk_users        (synkronisert fra Clerk)              │
│                                                              │
│  Storage:                                                    │
│  - candidates-private (CV, sertifikater)                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 SIKKERHET

### Admin-tilgang
```typescript
// app/lib/admin-config.ts
export const ADMIN_EMAILS: readonly string[] = [
  "isak@bluecrew.no",
  "tf@bluecrew.no",
];
```

**VIKTIG:** Kun e-post-whitelist brukes. Clerk metadata/orgs ignoreres.

### API-sikkerhet
- ✅ CSRF-beskyttelse (JWT-basert)
- ✅ Rate limiting (Upstash Redis, 8 req/min)
- ✅ Honeypot på skjemaer
- ✅ File validation (type, størrelse, extension)
- ✅ RLS på Supabase-tabeller

---

## ✅ HVA FUNGERER

| Funksjon | Status | Testet |
|----------|--------|--------|
| Kandidatregistrering | ✅ | 26.11.2025 |
| Vipps-verifisering | ✅ | 26.11.2025 |
| Portal /min-side | ✅ | 26.11.2025 |
| Dokumenter | ✅ | Trenger Supabase-tabell |
| Meldinger | ✅ | Trenger Supabase-tabell |
| Oppdrag | ✅ | Trenger Supabase-tabell |
| Timer | ✅ | Trenger Supabase-tabell |
| Admin-panel | ✅ | Skal flyttes til Admincrew |

---

## ⚠️ GJENSTÅR

### Høy prioritet
| Oppgave | Beskrivelse |
|---------|-------------|
| Fiks RESEND_TO_EMAILS | Vercel env var peker til test-adresse |
| Clerk orgs | Skru av "Allow users to create organizations" |
| Slett test-orgs | Robin, Olaf, Mattias orgs i Clerk |

### GDPR (lovpålagt)
| Oppgave | Beskrivelse |
|---------|-------------|
| Slett konto | Bruker må kunne slette all sin data |
| Eksporter data | Bruker må kunne laste ned alt |
| Personvernerklæring | Full tekst på /personvern |
| Databehandleravtaler | Med Supabase, Clerk, Vercel |

### Admincrew
| Oppgave | Beskrivelse |
|---------|-------------|
| Status-håndtering | Dropdown for å endre kandidat-status |
| Meldingssvar | Admin kan svare på brukermeldinger |
| Timer-godkjenning | Admin godkjenner/avviser timer |
| Oppdrag-tildeling | Admin tildeler oppdrag til ansatte |

---

## 📁 VIKTIGE FILER

```
bluecrew/
├── app/
│   ├── jobbsoker/
│   │   ├── registrer/page.tsx    # Registreringsside
│   │   ├── VippsLogin.tsx        # Vipps-flyt
│   │   └── CandidateForm.tsx     # Skjema
│   ├── min-side/
│   │   ├── page.tsx              # Hovedportal
│   │   ├── soknader/             # Søknadshistorikk
│   │   ├── dokumenter/           # Dokumenter
│   │   ├── meldinger/            # Chat
│   │   ├── oppdrag/              # Oppdrag
│   │   ├── timer/                # Timeregistrering
│   │   └── varsler/              # Varslinger
│   ├── api/
│   │   ├── submit-candidate/     # Kandidat-innsending
│   │   ├── admin/                # Admin-APIer
│   │   └── user/                 # Bruker-APIer
│   └── lib/
│       ├── admin-config.ts       # Admin whitelist
│       ├── admin.ts              # Admin-funksjoner
│       └── server/
│           ├── supabase.ts       # Database
│           ├── email.ts          # E-post
│           └── csrf.ts           # CSRF-beskyttelse
├── supabase/
│   └── migrations/               # Database-migrasjoner
└── SYSTEM-STATUS.md              # Denne filen
```

---

## 🔧 ENVIRONMENT VARIABLES (Vercel)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...

# Redis (Rate limiting)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx

# Email
RESEND_API_KEY=re_xxx
RESEND_FROM_EMAIL=no-reply@bluecrew.no
RESEND_TO_EMAILS=isak@bluecrew.no,tf@bluecrew.no  # ⚠️ FIKS DENNE!

# Security
CSRF_SECRET=xxx (32+ tegn)

# Vipps
VIPPS_CLIENT_ID=xxx
VIPPS_CLIENT_SECRET=xxx
```

---

## 🚀 NESTE STEG

### 1. Umiddelbart (i dag)
- [ ] Fiks RESEND_TO_EMAILS i Vercel
- [ ] Skru av org-opprettelse i Clerk
- [ ] Slett test-orgs i Clerk

### 2. Denne uken
- [ ] Fjern admin-panel fra bluecrew.no/min-side
- [ ] Bygg status-håndtering i Admincrew
- [ ] Implementer GDPR slett/eksport

### 3. Fremover
- [ ] Push-notifikasjoner (service worker)
- [ ] Automatisk status-oppdatering via webhooks
- [ ] Integrasjon mellom Bluecrew og Admincrew

---

## 📞 SUPPORT

**Branch:** `claude/fix-candidate-form-01VbQ4DjwPFsXZuQThXyvJhs`
**Admin-e-poster:** isak@bluecrew.no, tf@bluecrew.no

---

*Sist oppdatert: 26. november 2025, 15:XX*
