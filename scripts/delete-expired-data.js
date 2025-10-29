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
