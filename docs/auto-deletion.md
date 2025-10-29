# Automatisk datasletting for GDPR-compliance

Dette dokumentet beskriver automatisk sletting av utdaterte kandidat- og kundedata i henhold til **GDPR art. 5(1)(e) – Lagringsminimering**.

## Formål

Personopplysninger skal ikke lagres lenger enn nødvendig for formålet de ble samlet inn til. Bluecrew har definert følgende lagringstider:

- **Kandidater:** 12–24 måneder etter registrering (avhengig av aktivitet)
- **Kunder/leads:** 6–12 måneder etter registrering

Denne scriptet sletter automatisk data som har passert lagringstiden.

---

## Implementering: GitHub Actions

Vi bruker **GitHub Actions** til å kjøre et daglig scheduled script som:
1. Henter kandidater og leads som har passert lagringstiden
2. Sletter tilhørende filer i Supabase Storage (`cv_key`, `certs_key`)
3. Sletter radene fra `public.candidates` og `public.leads`
4. Logger antall slettede poster for revisjon

---

## Workflow-fil: `.github/workflows/delete-expired-data.yml`

```yaml
name: Delete expired data (GDPR art 5(1)(e))

on:
  schedule:
    # Kjører hver dag kl 03:00 UTC (04:00 CET/05:00 CEST)
    - cron: '0 3 * * *'
  workflow_dispatch: # Tillater manuell kjøring for testing

jobs:
  delete-expired:
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: |
          npm install @supabase/supabase-js@latest

      - name: Run deletion script
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
        run: |
          node scripts/delete-expired-data.js
```

---

## Slette-script: `scripts/delete-expired-data.js`

```javascript
#!/usr/bin/env node

/**
 * Automatisk sletting av utdaterte kandidat- og kundedata
 * GDPR art. 5(1)(e) – Lagringsminimering
 * 
 * Kjøres daglig via GitHub Actions eller manuelt:
 * SUPABASE_URL=https://... SUPABASE_SERVICE_ROLE_KEY=... node scripts/delete-expired-data.js
 */

import { createClient } from '@supabase/supabase-js';

// Lagringstider (i måneder)
const CANDIDATE_RETENTION_MONTHS = 24;
const LEAD_RETENTION_MONTHS = 12;

// Initialiserer Supabase med service role (bypasser RLS)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Mangler SUPABASE_URL eller SUPABASE_SERVICE_ROLE_KEY i environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Sletter utdaterte kandidater (24 måneder)
 */
async function deleteExpiredCandidates() {
  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - CANDIDATE_RETENTION_MONTHS);
  const cutoffISO = cutoffDate.toISOString();

  console.log(`🔍 Søker etter kandidater eldre enn ${cutoffISO} (${CANDIDATE_RETENTION_MONTHS} måneder)...`);

  // Hent kandidater som skal slettes
  const { data: expiredCandidates, error: fetchError } = await supabase
    .from('candidates')
    .select('id, cv_key, certs_key, submitted_at')
    .lt('submitted_at', cutoffISO);

  if (fetchError) {
    console.error('❌ Feil ved henting av kandidater:', fetchError.message);
    return;
  }

  if (!expiredCandidates || expiredCandidates.length === 0) {
    console.log('✅ Ingen utdaterte kandidater funnet');
    return;
  }

  console.log(`🗑️  Fant ${expiredCandidates.length} utdaterte kandidater`);

  // Slett filer fra storage
  let filesDeleted = 0;
  for (const candidate of expiredCandidates) {
    const filesToDelete = [];
    if (candidate.cv_key) filesToDelete.push(candidate.cv_key);
    if (candidate.certs_key) filesToDelete.push(candidate.certs_key);

    if (filesToDelete.length > 0) {
      const { error: storageError } = await supabase.storage
        .from('candidates-private')
        .remove(filesToDelete);

      if (storageError) {
        console.error(`⚠️  Kunne ikke slette filer for kandidat ${candidate.id}:`, storageError.message);
      } else {
        filesDeleted += filesToDelete.length;
      }
    }
  }

  // Slett kandidater fra database
  const { error: deleteError } = await supabase
    .from('candidates')
    .delete()
    .lt('submitted_at', cutoffISO);

  if (deleteError) {
    console.error('❌ Feil ved sletting av kandidater:', deleteError.message);
    return;
  }

  console.log(`✅ Slettet ${expiredCandidates.length} kandidater og ${filesDeleted} filer`);
}

/**
 * Sletter utdaterte kunde-leads (12 måneder)
 */
async function deleteExpiredLeads() {
  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - LEAD_RETENTION_MONTHS);
  const cutoffISO = cutoffDate.toISOString();

  console.log(`🔍 Søker etter leads eldre enn ${cutoffISO} (${LEAD_RETENTION_MONTHS} måneder)...`);

  // Hent leads som skal slettes
  const { data: expiredLeads, error: fetchError } = await supabase
    .from('leads')
    .select('id, submitted_at')
    .lt('submitted_at', cutoffISO);

  if (fetchError) {
    console.error('❌ Feil ved henting av leads:', fetchError.message);
    return;
  }

  if (!expiredLeads || expiredLeads.length === 0) {
    console.log('✅ Ingen utdaterte leads funnet');
    return;
  }

  console.log(`🗑️  Fant ${expiredLeads.length} utdaterte leads`);

  // Slett leads fra database
  const { error: deleteError } = await supabase
    .from('leads')
    .delete()
    .lt('submitted_at', cutoffISO);

  if (deleteError) {
    console.error('❌ Feil ved sletting av leads:', deleteError.message);
    return;
  }

  console.log(`✅ Slettet ${expiredLeads.length} leads`);
}

/**
 * Hovedfunksjon
 */
async function main() {
  console.log('🚀 Starter automatisk datasletting (GDPR art 5(1)(e))');
  console.log(`📅 Tidspunkt: ${new Date().toISOString()}\n`);

  await deleteExpiredCandidates();
  console.log('');
  await deleteExpiredLeads();

  console.log('\n✅ Datasletting fullført');
}

main().catch((error) => {
  console.error('❌ Uventet feil:', error);
  process.exit(1);
});
```

---

## Oppsett

### 1. Legg til GitHub Secrets

I GitHub repository settings → Secrets and variables → Actions, legg til:

- `SUPABASE_URL`: URL til Supabase-prosjektet (f.eks. `https://xxxxx.supabase.co`)
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key fra Supabase Dashboard → Settings → API

### 2. Test lokalt (valgfritt)

```bash
# Installer Supabase client
npm install @supabase/supabase-js

# Kjør scriptet lokalt
SUPABASE_URL=https://xxxxx.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... \
node scripts/delete-expired-data.js
```

### 3. Manuell kjøring via GitHub Actions

Gå til **Actions** → **Delete expired data** → **Run workflow** for å teste før første scheduled run.

---

## Logging og revisjon

Slettingene logges automatisk i GitHub Actions logs:
- Antall kandidater/leads slettet
- Antall filer slettet fra storage
- Eventuelle feil

For å se historikk: **GitHub → Actions → Delete expired data (GDPR art 5(1)(e))**

---

## Referanser

- **GDPR art. 5(1)(e):** Lagringsminimering – personopplysninger skal ikke lagres lenger enn nødvendig
- **GDPR art. 17:** Retten til sletting (rett til å bli glemt)
- **Datatilsynets veiledning:** https://www.datatilsynet.no/regelverk-og-verktoy/veiledere/grunnleggende-om-personvern/lagringsminimering/

---

**Kontakt:**  
Isak Simonsen – isak@bluecrew.no
