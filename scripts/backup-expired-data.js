#!/usr/bin/env node

/**
 * Backup av utdaterte kandidat- og kundedata før sletting
 * GDPR art. 5(1)(e) – Lagringsminimering med sikkerhetskopi
 * 
 * Kjøres før delete-expired-data.js:
 * SUPABASE_URL=https://... SUPABASE_SERVICE_ROLE_KEY=... node scripts/backup-expired-data.js
 */

import { createClient } from '@supabase/supabase-js';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// Lagringstider (må matche delete-expired-data.js)
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
 * Backup av utdaterte kandidater (24 måneder)
 */
async function backupExpiredCandidates() {
  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - CANDIDATE_RETENTION_MONTHS);
  const cutoffISO = cutoffDate.toISOString();

  console.log(`🔍 Søker etter kandidater eldre enn ${cutoffISO} (${CANDIDATE_RETENTION_MONTHS} måneder)...`);

  // Hent kandidater som skal slettes
  const { data: expiredCandidates, error: fetchError } = await supabase
    .from('candidates')
    .select('*')
    .lt('submitted_at', cutoffISO);

  if (fetchError) {
    console.error('❌ Feil ved henting av kandidater:', fetchError.message);
    throw fetchError;
  }

  if (!expiredCandidates || expiredCandidates.length === 0) {
    console.log('✅ Ingen utdaterte kandidater funnet');
    return { count: 0, file: null };
  }

  console.log(`💾 Backup av ${expiredCandidates.length} kandidater...`);

  // Lag backup-mappe hvis den ikke finnes
  const backupDir = join(process.cwd(), 'backups');
  await mkdir(backupDir, { recursive: true });

  // Lag backup-fil med timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `candidates-backup-${timestamp}.json`;
  const filepath = join(backupDir, filename);

  const backup = {
    timestamp: new Date().toISOString(),
    cutoff_date: cutoffISO,
    retention_months: CANDIDATE_RETENTION_MONTHS,
    count: expiredCandidates.length,
    data: expiredCandidates,
  };

  await writeFile(filepath, JSON.stringify(backup, null, 2), 'utf8');
  console.log(`✅ Backup lagret: ${filename}`);

  return { count: expiredCandidates.length, file: filename };
}

/**
 * Backup av utdaterte kunde-leads (12 måneder)
 */
async function backupExpiredLeads() {
  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - LEAD_RETENTION_MONTHS);
  const cutoffISO = cutoffDate.toISOString();

  console.log(`🔍 Søker etter leads eldre enn ${cutoffISO} (${LEAD_RETENTION_MONTHS} måneder)...`);

  // Hent leads som skal slettes
  const { data: expiredLeads, error: fetchError } = await supabase
    .from('leads')
    .select('*')
    .lt('submitted_at', cutoffISO);

  if (fetchError) {
    console.error('❌ Feil ved henting av leads:', fetchError.message);
    throw fetchError;
  }

  if (!expiredLeads || expiredLeads.length === 0) {
    console.log('✅ Ingen utdaterte leads funnet');
    return { count: 0, file: null };
  }

  console.log(`💾 Backup av ${expiredLeads.length} leads...`);

  // Lag backup-mappe hvis den ikke finnes
  const backupDir = join(process.cwd(), 'backups');
  await mkdir(backupDir, { recursive: true });

  // Lag backup-fil med timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `leads-backup-${timestamp}.json`;
  const filepath = join(backupDir, filename);

  const backup = {
    timestamp: new Date().toISOString(),
    cutoff_date: cutoffISO,
    retention_months: LEAD_RETENTION_MONTHS,
    count: expiredLeads.length,
    data: expiredLeads,
  };

  await writeFile(filepath, JSON.stringify(backup, null, 2), 'utf8');
  console.log(`✅ Backup lagret: ${filename}`);

  return { count: expiredLeads.length, file: filename };
}

/**
 * Hovedfunksjon
 */
async function main() {
  console.log('🚀 Starter backup av utdatert data (før GDPR-sletting)');
  console.log(`📅 Tidspunkt: ${new Date().toISOString()}\n`);

  const candidatesBackup = await backupExpiredCandidates();
  console.log('');
  const leadsBackup = await backupExpiredLeads();

  console.log('\n✅ Backup fullført');
  console.log(`📊 Total: ${candidatesBackup.count} kandidater, ${leadsBackup.count} leads`);
  
  if (candidatesBackup.file) console.log(`📁 Kandidater: backups/${candidatesBackup.file}`);
  if (leadsBackup.file) console.log(`📁 Leads: backups/${leadsBackup.file}`);
}

main().catch((error) => {
  console.error('❌ Uventet feil:', error);
  process.exit(1);
});
