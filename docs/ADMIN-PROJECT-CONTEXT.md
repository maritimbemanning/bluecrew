# 📚 **BLUECREW ADMIN - KOMPLETT KUNNSKAPSBASE**

> Viktig: Denne filen beskriver Admin‑portalen (egen app/repo: `maritimbemanning/bluecrew-admin`), ikke dette nettstedet (`bluecrew`). Beholdes her for referanse, men endringer bør skje i admin‑repoet.

*Sist oppdatert: 4. november 2025*

---

## 🏢 **PROSJEKT OVERVIEW**

### **Hva er Bluecrew Admin?**
Moderne administrasjonsplattform for bemanningsbyrå i maritim sektor. Internt verktøy for Bluecrew AS til å administrere kandidater, kunder, oppdrag, kontrakter, sertifikater, HMS-avvik, og fakturering.

### **Deployment Info**
- **Produksjon**: https://admin.bluecrew.no (Vercel)
- **GitHub Repo**: maritimbemanning/bluecrew-admin
- **Branch**: main (auto-deploy til prod)
- **Framework**: Next.js 16.0.0 (App Router)
- **Lansert**: 1. november 2025

### **Hvem bruker det?**
- **Isak Didriksson** (owner) - full admin access
- **Bluecrew team** - kandidat-matching, oppdragsstyring
- **Planlagt**: Flere admins når selskapet skalerer

---

## 💻 **TEKNISK STACK**

### **Frontend**
```typescript
Framework: Next.js 16.0.0 (Turbopack)
React: 19.2.0
TypeScript: Strict mode
Styling: Tailwind CSS 4.0
Animations: Framer Motion 12.23.24
UI Components: shadcn/ui (Radix primitives)
Icons: Lucide React 0.548.0
Charts: Recharts 2.15.0
Dev Port: 3001 (3000 tatt av bluecrew.no)
```

### **Backend & Database**
```
Database: Supabase (PostgreSQL) Pro tier
Auth: Supabase Auth (email/password)
Storage: Supabase Storage (4 buckets: cvs, certificates, contracts, hms-attachments)
Realtime: Supabase Realtime (live updates)
State: Zustand 5.0.8 (global state + persist)
Cache: Upstash Redis 1.35.6
```

### **Integrasjoner**
```
Email: Resend API (post@bluecrew.no sender)
Fakturering: Tripletex REST API v2
OCR: Azure Document Intelligence (AI-powered CV parsing)
Monitoring: Vercel Analytics + Speed Insights
Error Tracking: (planlagt: Sentry)
```

### **Deployment**
```
Hosting: Vercel Pro
Domain: admin.bluecrew.no (CNAME til Vercel)
Auto-deploy: Push til main → auto-deploy
Environment: Production (TRIPLETEX_ENV=production)
SSL: Automatic via Vercel
```

---

## 📊 **DATABASE SCHEMA**

### **Eksisterende Tabeller**

#### **1. candidates** (fra bluecrew.no public site)
```sql
id UUID PRIMARY KEY
name TEXT
email TEXT
phone TEXT
skills TEXT[]
available_from DATE
available_to DATE
municipality TEXT
county TEXT
cv_key TEXT (Storage path til CV)
certs_key TEXT (Storage path til sertifikater)
stcw_has BOOLEAN
stcw_mod TEXT[] (STCW moduler)
deck_has BOOLEAN
deck_class TEXT (D1L, D5L, etc.)
work_main TEXT[] (servicefartøy, havbruk, offshore)
wants_temporary BOOLEAN
created_at TIMESTAMP
```

#### **2. candidate_interest** (fra /meld-interesse form)
```sql
id UUID PRIMARY KEY
name TEXT
email TEXT
phone TEXT
role TEXT (skipper, matros, etc.)
region TEXT (Nord-Norge, Vestlandet, etc.)
experience INTEGER (år erfaring)
certificates TEXT
notes TEXT
start_from TEXT
consent BOOLEAN
source TEXT (meld-interesse, homepage, etc.)
ip TEXT
user_agent TEXT
created_at TIMESTAMP
```

#### **3. leads** (kunder fra bluecrew.no)
```sql
id UUID PRIMARY KEY
company TEXT
contact TEXT (kontaktperson)
email TEXT
phone TEXT
municipality TEXT
county TEXT
created_at TIMESTAMP
```

#### **4. assignments** (oppdrag - admin-only)
```sql
id UUID PRIMARY KEY
customer_id UUID (ref til leads)
candidate_id UUID (ref til candidates)
role TEXT (Styrmann, Matros, etc.)
status TEXT (pending, active, completed, cancelled)
start_date DATE
end_date DATE
location TEXT
contract_url TEXT (Storage path til kontrakt PDF)
tripletex_project_id INTEGER (kobling til Tripletex)
created_at TIMESTAMP
updated_at TIMESTAMP
```

#### **5. candidate_certifications** (sertifikater - admin-only)
```sql
id UUID PRIMARY KEY
candidate_id UUID (ref til candidates)
cert_type TEXT (STCW, Deck, HMS, etc.)
cert_class TEXT (D5L, STCW Basic, etc.)
cert_name TEXT
issued_date DATE
expires_at DATE
verified BOOLEAN
verified_by UUID (admin som verifiserte)
verified_at TIMESTAMP
verification_notes TEXT
file_key TEXT (Storage path til sertifikat-fil)
created_at TIMESTAMP
```

#### **6. hms_incidents** (HMS-avvik)
```sql
id UUID PRIMARY KEY
title TEXT
description TEXT
severity TEXT (low, medium, high, critical)
status TEXT (open, in_progress, resolved, closed)
reported_by UUID
assigned_to UUID
location TEXT
incident_date TIMESTAMP
resolved_at TIMESTAMP
attachments TEXT[] (Storage paths)
created_at TIMESTAMP
updated_at TIMESTAMP
```

#### **7. expenses** (utgifter - for Tripletex sync)
```sql
id UUID PRIMARY KEY
assignment_id UUID
candidate_id UUID
description TEXT
amount DECIMAL(10,2)
expense_date DATE
category TEXT (transport, kost, losji, etc.)
receipt_url TEXT (Storage path)
approved BOOLEAN
approved_by UUID
approved_at TIMESTAMP
tripletex_voucher_id INTEGER
created_at TIMESTAMP
```

#### **8. analytics_daily** (daglige metrics)
```sql
id UUID PRIMARY KEY
snapshot_date DATE UNIQUE
total_candidates INTEGER
active_candidates INTEGER
new_candidates_today INTEGER
candidates_in_assignment INTEGER
total_customers INTEGER
active_customers INTEGER
new_customers_today INTEGER
total_assignments INTEGER
active_assignments INTEGER
new_assignments_today INTEGER
completed_assignments INTEGER
estimated_daily_revenue DECIMAL(10,2)
total_documents_uploaded INTEGER
certificates_expiring_soon INTEGER
created_at TIMESTAMP
```

#### **9. contract_templates** (kontraktmaler - planlagt)
```sql
id UUID PRIMARY KEY
name TEXT
type TEXT (innleie, rekruttering)
content TEXT (HTML/Markdown)
variables TEXT[] (placeholders: {candidate_name}, {start_date}, etc.)
created_at TIMESTAMP
updated_at TIMESTAMP
```

---

## 📁 **FILSTRUKTUR**

```
bluecrew-admin/
├── app/
│   ├── layout.tsx              # Root layout (Vercel Analytics)
│   ├── page.tsx                # Dashboard (main view)
│   ├── candidates/page.tsx     # Kandidatvisning
│   ├── assignments/page.tsx    # Oppdrag
│   ├── contracts/page.tsx      # Kontrakter
│   ├── hms/page.tsx            # HMS-avvik
│   ├── api/
│   │   ├── assignments/route.ts        # POST/PUT assignments
│   │   ├── approve-candidate/route.ts  # Auto-approve workflow
│   │   ├── tripletex/route.ts          # Tripletex sync
│   │   ├── cron/
│   │   │   └── check-certificates/route.ts  # Daily cert check (09:00 UTC)
│   │   └── debug/
│   │       └── env/route.ts            # Debug env vars
│   └── globals.css             # Tailwind + custom styles
│
├── components/
│   ├── ui/                     # shadcn/ui primitives
│   ├── views/
│   │   ├── CandidatesView.tsx  # Kandidat-tabell med search/filter
│   │   ├── AssignmentsView.tsx # Oppdrag-oversikt
│   │   └── Dashboard.tsx       # Statistikk & metrics
│   └── dialogs/
│       ├── ApproveDialog.tsx   # Godkjenn kandidat dialog
│       └── ContractDialog.tsx  # Lag kontrakt dialog
│
├── lib/
│   ├── supabaseClient.ts       # Client-side Supabase (anon key)
│   ├── supabaseServer.ts       # Server-side Supabase (service_role)
│   ├── stores.ts               # Zustand stores (candidates, assignments, etc.)
│   ├── types.ts                # TypeScript types
│   ├── utils.ts                # Helper functions
│   ├── contractGenerator.ts    # PDF generation (Bluecrew-branded)
│   ├── emailService.ts         # Resend email sender
│   ├── tripletexService.ts     # Tripletex API client
│   └── AuthContext.tsx         # Auth provider (Supabase Auth)
│
├── supabase/
│   ├── complete-database-setup.sql     # Alle tabeller
│   ├── setup-storage.sql               # Storage buckets
│   ├── setup-daily-backup.sql          # Automated backups (02:00 UTC)
│   ├── setup-analytics.sql             # Analytics tabell + daily cron
│   ├── create-expenses-table.sql       # Expenses tabell
│   ├── hms-avvik-system.sql            # HMS tabell
│   └── add-tripletex-columns-*.sql     # Tripletex integrasjon
│
├── docs/
│   ├── LAUNCH_SUMMARY.md       # 1. nov launch notes
│   ├── STRATEGI.md             # Forretningsstrategi
│   ├── BLUECREW_CONTEXT.md     # Full prosjekt context
│   ├── PRO_FEATURES_GUIDE.md   # Supabase/Vercel Pro features
│   ├── WHITE_LABEL_GUIDE.md    # White-label setup for andre kunder
│   ├── FILE_UPLOAD_GUIDE.md    # Supabase Storage setup
│   ├── EMAIL_SETUP_GUIDE.md    # Resend configuration
│   ├── AUTO_APPROVE_GUIDE.md   # Auto-approve workflow
│   └── TRIPLETEX_GUIDE.md      # Tripletex integration guide
│
├── public/
│   └── logo.png                # Bluecrew logo
│
├── .env.local                  # Environment variables (SECRET!)
├── next.config.ts              # Next.js config
├── tailwind.config.ts          # Tailwind CSS config
└── package.json                # Dependencies
```

---

## 🔑 **ENVIRONMENT VARIABLES**

### **Produksjon (.env.local i Vercel)**
```bash
# Supabase (SAME as bluecrew.no frontend!)
NEXT_PUBLIC_SUPABASE_URL=https://uqwfesvsfiqjcpzwetkz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]  # ⚠️ SERVER-SIDE ONLY!

# Upstash Redis (rate limiting + cache)
UPSTASH_REDIS_REST_URL=[redis-url]
UPSTASH_REDIS_REST_TOKEN=[redis-token]

# Resend (email)
RESEND_API_KEY=re_UetGDqjU_5odz3FHpqrFBnGun919C9ETk
ADMIN_EMAIL=isak@bluecrew.no

# Cron Secret (for /api/cron/check-certificates)
CRON_SECRET=[random-secret-string]

# Tripletex (fakturering)
TRIPLETEX_TOKEN=eyJ0b2tlbklkIjoxNjc0LCJ0b2tlbiI6InRlc3QtZmJjYzUxNGMtOWU5MS00NmQwLWJmM2ItNzUxY2UwYjc3ZDYzIn0=
TRIPLETEX_ENV=production

# Azure Document Intelligence (OCR - optional)
AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT=[azure-endpoint]
AZURE_DOCUMENT_INTELLIGENCE_KEY=[azure-key]
```

**VIKTIG SECURITY:**
- `SUPABASE_SERVICE_ROLE_KEY` brukes KUN på server-side (API routes)
- Aldri eksponert til klienten
- Gir full database access (bypass RLS)

---

## 🔄 **DATAFLYT**

### **Kandidater (Public → Admin)**
```
1. Kandidat fyller ut skjema på bluecrew.no
   ↓
2. POST /api/submit-candidate (bluecrew.no)
   ↓
3. INSERT til Supabase `candidates` tabell
   ↓
4. Email til isak@bluecrew.no (Resend)
   ↓
5. Admin ser kandidat i admin.bluecrew.no
   ↓
6. Realtime sync via Supabase
```

### **Godkjenning av kandidat (Admin-only)**
```
1. Admin klikker "✅ Godkjenn" på kandidat
   ↓
2. Opens ApproveDialog
   ↓
3. Velg kunde, fyll ut oppdragsdetaljer
   ↓
4. POST /api/approve-candidate
   ↓
5. INSERT assignment til Supabase
   ↓
6. Generate contract PDF (contractGenerator.ts)
   ↓
7. Upload PDF til Supabase Storage (contracts bucket)
   ↓
8. Send email til kandidat: "Du er godkjent! Se kontrakt vedlagt"
   ↓
9. (Optional) Sync til Tripletex (create project + customer)
```

### **Fakturering (Tripletex sync)**
```
1. Assignment completed → status = "completed"
   ↓
2. Admin klikker "Sync til Tripletex"
   ↓
3. POST /api/tripletex
   ↓
4. Create customer i Tripletex (if not exists)
   ↓
5. Create project i Tripletex
   ↓
6. Create invoice (based on assignment dates)
   ↓
7. Save tripletex_project_id til assignment
```

---

## ✨ **KJERNEFUNKSJONER**

### **1. Dashboard** (app/page.tsx)
- **Stats Cards**: Total kandidater, aktive oppdrag, kommende oppstart, sertifikater som utløper
- **Charts**: Kandidater per måned, oppdrag per status, revenue estimate
- **Quick Actions**: Ny kandidat, nytt oppdrag, generer kontrakt
- **Recent Activity**: Siste registreringer, godkjenninger

### **2. Kandidatvisning** (app/candidates/page.tsx)
- **Tabell**: Alle kandidater med sortring, filtrering, søk
- **Global Search**: Cmd+K (søk på tvers av alle felter)
- **Actions**: Godkjenn, Eksporter CV, Send email, Slett
- **Batch Actions**: Velg flere kandidater → bulk export
- **Sertifikatsjekk**: Badge hvis sertifikater utløper snart
- **Download**: Last ned CV/sertifikater fra Supabase Storage

### **3. Oppdragsstyring** (app/assignments/page.tsx)
- **Kanban Board**: pending → active → completed (drag-and-drop)
- **Timeline View**: Visuell tidslinje over oppdrag
- **Filters**: Etter status, kunde, kandidat, lokasjon
- **Contract Generation**: Automatisk PDF-generering
- **Tripletex Sync**: Synkroniser til fakturering

### **4. Kontraktstyring** (app/contracts/page.tsx)
- **Template Manager**: Lag/rediger kontraktmaler
- **Variables**: {candidate_name}, {start_date}, etc.
- **PDF Generation**: React → HTML → PDF (contractGenerator.ts)
- **Storage**: Supabase Storage (contracts bucket)
- **Email**: Send kontrakt til kandidat via Resend

### **5. HMS-avvik** (app/hms/page.tsx)
- **Incident Logging**: Registrer avvik med severity, lokasjon, dato
- **Attachments**: Last opp bilder/dokumenter
- **Assignment**: Tilordne til ansvarlig person
- **Status Tracking**: open → in_progress → resolved → closed
- **Notifications**: Email til assigned_to ved nytt avvik

### **6. Email Automation** (lib/emailService.ts)
**Daglig cron (09:00 UTC):**
- Sjekk sertifikater som utløper innen 30 dager
- Send email til isak@bluecrew.no med liste
- Send email til kandidater: "Ditt [sertifikat] utløper snart"

**Godkjenning:**
- Email til kandidat: "Du er godkjent! Se kontrakt vedlagt"
- Email til kunde: "Ny kandidat tildelt ditt oppdrag"

**HMS-avvik:**
- Email til assigned_to: "Nytt HMS-avvik tildelt deg"

---

## 🔐 **SIKKERHET & AUTH**

### **Autentisering**
```
Provider: Supabase Auth
Method: Email/Password
Admin user: isak@bluecrew.no (opprettet manuelt i Supabase)
Session: 7 dager (refresh token)
Protected routes: All routes in app/ (except /api/cron)
```

### **Authorization**
```
Current: Single admin user (Isak)
Planned: Role-based access control (RBAC)
  - Super Admin: Full access
  - Admin: Kandidater + oppdrag
  - Koordinator: Read-only + assign oppdrag
  - Accountant: Fakturering only
```

### **Row-Level Security (RLS)**
```
Status: ⚠️ DISABLED (for utvikling)
Production: MÅ aktiveres!
Policies needed:
  - assignments: Admin-only read/write
  - candidate_certifications: Admin-only write
  - expenses: Admin-only write
  - analytics_daily: Read-only (generated by cron)
```

### **Data Protection**
```
HTTPS: ✅ (Vercel SSL)
Environment vars: ✅ (ikke committed til Git)
Storage: ✅ (Private buckets, signed URLs)
Backup: ✅ (Daglig kl 02:00 UTC, 30 dagers retention)
GDPR: ✅ (Kandidater kan be om sletting)
```

---

## 📧 **EMAIL SETUP (Resend)**

### **Sender Domain**
```
Domain: bluecrew.no
Sender: post@bluecrew.no
Reply-to: isak@bluecrew.no
DNS Records: ✅ Verified (SPF, DKIM, DMARC)
```

### **Email Templates**
**1. Certificate Expiry (til admin):**
```
Subject: ⚠️ Sertifikater som utløper snart
Body: Liste over kandidater med sertifikater som utløper innen 30 dager
Frequency: Daglig kl 09:00 UTC
```

**2. Certificate Expiry (til kandidat):**
```
Subject: 📄 Ditt [sertifikat] utløper snart
Body: "Hei {name}, ditt {cert_name} utløper {expires_at}. Vennligst forny."
CTA: "Last opp nytt sertifikat"
```

**3. Candidate Approved:**
```
Subject: ✅ Du er godkjent hos Bluecrew!
Body: "Hei {name}, du er godkjent for oppdrag som {role}. Se kontrakt vedlagt."
Attachments: contract.pdf
CTA: "Se detaljer i portal" (planlagt)
```

**4. HMS Incident:**
```
Subject: ⚠️ Nytt HMS-avvik tildelt deg
Body: "Hei {assigned_to}, nytt avvik: {title}. Severity: {severity}."
CTA: "Se detaljer i HMS-systemet"
```

---

## 🔄 **CRON JOBS**

### **1. Certificate Expiry Check** (09:00 UTC daglig)
```
Endpoint: /api/cron/check-certificates
Auth: CRON_SECRET header
Action:
  1. Query Supabase: certificates WHERE expires_at < NOW() + 30 days
  2. Send email til admin (list of expiring certs)
  3. Send email til hver kandidat med utløpende sertifikat
Setup: Vercel Cron (vercel.json)
```

### **2. Daily Analytics Snapshot** (02:00 UTC daglig)
```
SQL Function: generate_daily_analytics() (pg_cron)
Action:
  1. Count kandidater (total, active, new today)
  2. Count oppdrag (total, active, completed)
  3. Count kunder (total, active, new today)
  4. Calculate estimated revenue
  5. INSERT til analytics_daily
Auto: Kjører via pg_cron i Supabase
```

### **3. Daily Backup** (02:00 UTC daglig)
```
SQL Function: create_daily_backup() (pg_cron)
Action:
  1. pg_dump til Supabase Storage (backups bucket)
  2. Retain 30 dagers historikk
  3. Delete backups > 30 dager
Setup: supabase/setup-daily-backup.sql
```

---

## 🚀 **SUPABASE PRO FEATURES**

### **Aktivert nå:**
- ✅ pg_cron extension (automated tasks)
- ✅ Daily backups (02:00 UTC)
- ✅ Analytics tracking (analytics_daily tabell)
- ✅ Storage buckets (cvs, certificates, contracts, hms-attachments)

### **Anbefalt å aktivere:**
- ⏳ Point-in-Time Recovery (PITR) - 7-day rollback
- ⏳ Database Compute Upgrade (Micro → Small) - når 50+ kandidater
- ⏳ Read Replica - når 100+ samtidige brukere
- ⏳ Network Restrictions - whitelist kun Vercel IPs

---

## ⚡ **VERCEL PRO FEATURES**

### **Aktivert nå:**
- ✅ Analytics (pageviews, unique visitors)
- ✅ Custom domain (admin.bluecrew.no)
- ✅ Automatic deployments (push til main → deploy)

### **Anbefalt å aktivere:**
- ⏳ Speed Insights (Core Web Vitals tracking)
- ⏳ Deployment Protection (password-protect previews)
- ⏳ Edge Config (feature flags uten redeploy)
- ⏳ Web Firewall (IP blocking, rate limiting)

---

## 🎯 **WHITE-LABEL POTENTIAL**

Bluecrew Admin er bygget med white-labeling i tankene. Kan selges som SaaS til andre bemanningsbyrå:

### **Setup tid: ~30 minutter per kunde**
1. Clone repo → ny GitHub repo
2. Endre branding (logo, farger, navn)
3. Opprett ny Supabase database → kjør SQL scripts
4. Sett opp Resend sender (kunde-domene)
5. Deploy til Vercel
6. Konfigurasjon ferdig!

### **Pricing model (forslag):**
```
Setup fee: 15 000 NOK (one-time)
Monthly: 2 000 NOK/mnd
  + 100 NOK per aktiv kandidat
  + Tripletex integration: +500 NOK/mnd
Revenue split: 70/30 (70% til deg, 30% til kunde)
```

### **Target kunder:**
- Bemanningsbyrå i havbruk
- Offshore crewing companies
- Andre maritime bemanningsselskap

---

## 📈 **ROADMAP & FUTURE FEATURES**

### **Q1 2026 (Neste kvartaler):**
1. **Mobile App** (React Native)
   - Kandidater oppdaterer availability via app
   - Push notifications for nye oppdrag
   - Same Supabase backend

2. **Customer Portal** (kunde.bluecrew.no)
   - Kunder ser sine placements
   - Request nye kandidater
   - Se fakturaer/kontrakter
   - Rate kandidater

3. **AI Matching Engine**
   - Train ML model på successful placements
   - Auto-suggest best kandidater for oppdrag
   - Vercel AI SDK + Supabase pgvector

4. **Automated Invoicing**
   - Auto-generate invoice når assignment ends
   - Send til kunde via email
   - Track payment status

5. **WhatsApp Integration** (Twilio)
   - Send SMS når kandidat godkjennes
   - Two-way communication med kandidater
   - WhatsApp-varsel for nye oppdrag

### **Q2-Q3 2026:**
- Timesheet functionality (kandidater logger timer)
- Automated reference checks (API til tidligere arbeidsgivere)
- Video interviews (Loom/async)
- Multi-language support (English for international crew)
- Advanced analytics (Looker/Metabase integration)

---

## 🐛 **KJENTE ISSUES & WARNINGS**

### **⚠️ RLS er disabled**
- **Problem**: Row-Level Security er skrudd av i Supabase
- **Risiko**: Hvem som helst med anon_key kan lese database
- **Fix**: Aktiver RLS policies før full produksjon
- **Timeline**: Må fikses før flere admins får tilgang

### **⚠️ Ingen RBAC**
- **Problem**: Alle admins har lik tilgang
- **Risiko**: Koordinatorer kan slette kandidater
- **Fix**: Implementer role-based permissions
- **Timeline**: Q1 2026

### **⚠️ Service_role key i .env**
- **Problem**: Service role key gir full database access
- **Risiko**: Hvis leaked → full database compromise
- **Fix**: Aldri commit til Git, bruk Vercel env vars
- **Status**: ✅ Korrekt setup (ikke committed)

### **⚠️ Ingen Sentry/error tracking**
- **Problem**: Bugs i production ikke tracket
- **Risiko**: Brukere opplever errors uten at vi vet det
- **Fix**: Installer Sentry, setup error boundaries
- **Timeline**: Q1 2026

---

## 💰 **COST BREAKDOWN (Monthly)**

```
Supabase Pro: $25/mnd (database, auth, storage)
Vercel Pro: $20/mnd (hosting, analytics)
Upstash Redis: $10/mnd (rate limiting, cache)
Resend: $20/mnd (10k emails)
Tripletex: Inkludert i eksisterende lisens
Azure OCR: Pay-per-use (~$5/mnd ved 50 kandidater)
--------------------------------------------
Total: ~$80/mnd ($960/år)
```

**ROI:**
- 1 plassert kandidat = ~15 000 NOK margin
- Breakeven: 1 kandidat per år
- Ved 10 placements/mnd: 1 800 000 NOK årlig revenue

---

## 🔄 **GIT WORKFLOW**

### **Branching Strategy**
```
main (production)
  └── develop (feature testing)
       └── feature/invoice-automation (feature branches)
```

### **Deployment Flow**
1. Utvikle på `feature/*` branch
2. Merge til `develop` → Vercel preview deploy → test
3. Merge `develop` til `main` → auto-deploy til prod
4. Tag releases: `v1.0.0`, `v1.1.0`, etc.

### **Nåværende Git State**
```
main branch (production):
  - Launch-klar (1. nov 2025)
  - Alle features live
  - admin.bluecrew.no deployment
```

---

## 📚 **VIKTIGE FILER Å KJENNE TIL**

### **Må aldri endre uten backup:**
- `supabase/complete-database-setup.sql` (master schema)
- `lib/stores.ts` (all state management)
- `lib/contractGenerator.ts` (PDF generation)

### **Ofte redigert:**
- `app/page.tsx` (dashboard layout)
- `components/views/*.tsx` (views)
- `app/api/**/*.ts` (API endpoints)

### **Config files:**
- `next.config.ts` (Next.js settings)
- `tailwind.config.ts` (design system)
- `vercel.json` (cron jobs)

---

## 🎓 **LEKSJONER LÆRT**

### **1. Supabase Storage URL-endring (okt 2025)**
**Problem:** Storage URLs endret format → broken downloads
**Fix:** Bruk `supabase.storage.from(bucket).download(path)` ikke public URLs
**Læring:** Always use SDK methods, ikke hard-code URLs

### **2. Service_role key exposed i Git (tidlig dev)**
**Problem:** Committet .env med service_role key
**Fix:** Regenerated key, added .env to .gitignore
**Læring:** ALDRI commit secrets, bruk environment variables

### **3. Cron job timezone confusion**
**Problem:** Cron kjørte kl 11:00 norsk tid (bruker forventet 09:00)
**Fix:** Cron bruker UTC, ikke lokal tid
**Læring:** Alltid spesifiser UTC i cron schedules

---

## 🚨 **EMERGENCY CONTACTS**

```
Isak Didriksson: isak@bluecrew.no, 923 28 850
Supabase Support: support@supabase.io (Pro SLA: 24h response)
Vercel Support: support@vercel.com (Pro SLA: 8h response)
Resend Support: support@resend.com
```

---

## 📖 **DOCUMENTATION LINKS**

### **Internal**
- LAUNCH_SUMMARY.md - 1. nov launch notes
- STRATEGI.md - Forretningsstrategi
- PRO_FEATURES_GUIDE.md - Supabase/Vercel Pro features
- WHITE_LABEL_GUIDE.md - White-label setup
- AUTO_APPROVE_GUIDE.md - Godkjenn-workflow
- TRIPLETEX_GUIDE.md - Fakturering integration

### **External**
- Supabase Docs: https://supabase.com/docs
- Vercel Docs: https://vercel.com/docs
- Next.js 16: https://nextjs.org/docs
- Tripletex API: https://developer.tripletex.no
- Resend API: https://resend.com/docs

---

**Dette er alt jeg vet om Bluecrew Admin. Bruk denne filen sammen med COPILOT-FULL-PROJECT-CONTEXT.md for å få full oversikt over begge prosjektene!** ✅
