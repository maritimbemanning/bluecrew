// Complete export of ALL candidates from both tables
const fs = require('fs');

const interestData = JSON.parse(fs.readFileSync('candidates-export.json', 'utf8'));
const cvData = JSON.parse(fs.readFileSync('candidates-with-cvs-export.json', 'utf8'));

console.log('=== CANDIDATE DATA SUMMARY ===');
console.log(`candidate_interest (quick interest): ${interestData.length}`);
console.log(`candidates (full application with CV): ${cvData.length}`);
console.log(`TOTAL: ${interestData.length + cvData.length}`);
console.log('');

// CSV Headers for combined export
const headers = [
  'Type',
  'ID',
  'Registrert dato',
  'Navn',
  'E-post',
  'Telefon',
  'Rolle/Arbeidsområder',
  'Fylke',
  'Kommune',
  'Erfaring (år)',
  'Sertifikater/STCW',
  'Ferdigheter/Skills',
  'Tilgjengelig fra',
  'Ønsker vikar',
  'Tilleggsinfo/Notater',
  'Status',
  'CV fil',
  'Sertifikat fil',
  'Kilde'
];

function escapeCSV(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('\n') || str.includes('"') || str.includes(';')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleString('no-NO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

let csv = headers.join(',') + '\n';

// Add interest candidates (without CV)
interestData.forEach(c => {
  const row = [
    escapeCSV('Interesse'),
    escapeCSV(c.id),
    escapeCSV(formatDate(c.created_at)),
    escapeCSV(c.name),
    escapeCSV(c.email),
    escapeCSV(c.phone),
    escapeCSV(c.role),
    escapeCSV(c.fylke || c.region),
    escapeCSV(c.kommune),
    escapeCSV(c.experience),
    escapeCSV(c.certificates),
    escapeCSV(''),
    escapeCSV(c.start_from),
    escapeCSV(''),
    escapeCSV(c.notes),
    escapeCSV(c.status),
    escapeCSV(''),
    escapeCSV(''),
    escapeCSV(c.source)
  ];
  csv += row.join(',') + '\n';
});

// Add full candidates (with CV)
cvData.forEach(c => {
  const workAreas = Array.isArray(c.work_main) ? c.work_main.join('; ') : '';
  const row = [
    escapeCSV('Full søknad (med CV)'),
    escapeCSV(c.id),
    escapeCSV(formatDate(c.created_at)),
    escapeCSV(c.name),
    escapeCSV(c.email),
    escapeCSV(c.phone),
    escapeCSV(workAreas),
    escapeCSV(c.fylke || c.county),
    escapeCSV(c.kommune || c.municipality),
    escapeCSV(''),
    escapeCSV(c.stcw_confirm ? 'Har/vil skaffe STCW' : ''),
    escapeCSV(c.skills),
    escapeCSV(c.available_from),
    escapeCSV(c.wants_temporary),
    escapeCSV(c.other_comp),
    escapeCSV(c.status),
    escapeCSV(c.cv_key),
    escapeCSV(c.certs_key),
    escapeCSV('Fullt registreringsskjema')
  ];
  csv += row.join(',') + '\n';
});

fs.writeFileSync('ALLE-KANDIDATER-KOMPLETT.csv', csv, 'utf8');

// Create detailed summary
const summary = `
════════════════════════════════════════════════════════════
KOMPLETT KANDIDATRAPPORT - BLUECREW
════════════════════════════════════════════════════════════
Generert: ${new Date().toLocaleString('no-NO')}

───────────────────────────────────────────────────────────
TOTALOVERSIKT
───────────────────────────────────────────────────────────
Total antall kandidater: ${interestData.length + cvData.length}

  • Interesse-registreringer: ${interestData.length}
    (Raske interesseregistreringer uten CV)

  • Fulle søknader med CV: ${cvData.length}
    (Komplette søknader med CV og sertifikater)

───────────────────────────────────────────────────────────
KANDIDATER MED CV (${cvData.length} stk)
───────────────────────────────────────────────────────────

Status fordeling:
${(() => {
  const statusCount = {};
  cvData.forEach(c => {
    const status = c.status || 'ingen status';
    statusCount[status] = (statusCount[status] || 0) + 1;
  });
  return Object.entries(statusCount)
    .sort((a, b) => b[1] - a[1])
    .map(([status, count]) => `  ${status}: ${count}`)
    .join('\n');
})()}

Arbeidsområder (top 10):
${(() => {
  const workCount = {};
  cvData.forEach(c => {
    if (Array.isArray(c.work_main)) {
      c.work_main.forEach(w => {
        workCount[w] = (workCount[w] || 0) + 1;
      });
    }
  });
  return Object.entries(workCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([work, count]) => `  ${work}: ${count}`)
    .join('\n');
})()}

STCW-sertifikat:
  Har eller vil skaffe: ${cvData.filter(c => c.stcw_confirm).length}

Tilgjengelighet:
  Ønsker vikararbeid: ${cvData.filter(c => c.wants_temporary === 'ja').length}

CV-filer lagret: ${cvData.filter(c => c.cv_key).length}
Sertifikatfiler lagret: ${cvData.filter(c => c.certs_key).length}

───────────────────────────────────────────────────────────
INTERESSE-REGISTRERINGER (${interestData.length} stk)
───────────────────────────────────────────────────────────

Siste 7 dager: ${(() => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return interestData.filter(c => new Date(c.created_at) > oneWeekAgo).length;
})()}

Roller (top 10):
${(() => {
  const roleCount = {};
  interestData.forEach(c => {
    const role = c.role || 'Ikke oppgitt';
    roleCount[role] = (roleCount[role] || 0) + 1;
  });
  return Object.entries(roleCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([role, count]) => `  ${role}: ${count}`)
    .join('\n');
})()}

Status:
${(() => {
  const statusCount = {};
  interestData.forEach(c => {
    const status = c.status || 'ingen';
    statusCount[status] = (statusCount[status] || 0) + 1;
  });
  return Object.entries(statusCount)
    .sort((a, b) => b[1] - a[1])
    .map(([status, count]) => `  ${status}: ${count}`)
    .join('\n');
})()}

Datakvalitet:
  Med erfaring oppgitt: ${interestData.filter(c => c.experience !== null).length} (${Math.round(interestData.filter(c => c.experience !== null).length/interestData.length*100)}%)
  Med sertifikater oppgitt: ${interestData.filter(c => c.certificates).length} (${Math.round(interestData.filter(c => c.certificates).length/interestData.length*100)}%)
  Med tilleggsnotater: ${interestData.filter(c => c.notes).length} (${Math.round(interestData.filter(c => c.notes).length/interestData.length*100)}%)

───────────────────────────────────────────────────────────
FILER GENERERT
───────────────────────────────────────────────────────────
✓ ALLE-KANDIDATER-KOMPLETT.csv
  → Excel-fil med ALLE ${interestData.length + cvData.length} kandidater
  → Inkluderer CV-filstier for nedlasting

✓ KOMPLETT-KANDIDATRAPPORT.txt
  → Denne filen med fullstendig oversikt

✓ candidates-with-cvs-export.json
  → Rådata for kandidater med CV

✓ candidates-export.json
  → Rådata for interesse-registreringer

───────────────────────────────────────────────────────────
CV-NEDLASTING
───────────────────────────────────────────────────────────
CV-filer er lagret i Supabase Storage under bucket "candidates-private"

For å laste ned en CV:
1. Bruk cv_key fra CSV-filen (f.eks. "cv/abc123.pdf")
2. Last ned via Supabase Dashboard eller API
3. Alternativt: Kontakt utvikler for bulk-nedlasting

NB: CV-filer krever service role autentisering (privat bucket)

════════════════════════════════════════════════════════════
`;

fs.writeFileSync('KOMPLETT-KANDIDATRAPPORT.txt', summary, 'utf8');

console.log('✅ KOMPLETT EKSPORT FERDIG!');
console.log('');
console.log('📊 Filer generert:');
console.log('   ALLE-KANDIDATER-KOMPLETT.csv');
console.log('   KOMPLETT-KANDIDATRAPPORT.txt');
console.log('');
console.log(`📈 Totalt: ${interestData.length + cvData.length} kandidater`);
console.log(`   - ${interestData.length} interesse-registreringer`);
console.log(`   - ${cvData.length} fulle søknader med CV`);
