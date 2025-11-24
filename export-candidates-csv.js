// Export candidates to CSV format
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('candidates-export.json', 'utf8'));

// Define CSV headers
const headers = [
  'ID',
  'Registrert dato',
  'Navn',
  'E-post',
  'Telefon',
  'Rolle',
  'Fylke',
  'Kommune',
  'Erfaring (år)',
  'Sertifikater',
  'Ønsket oppstart',
  'Tilleggsinfo/Notater',
  'Kilde',
  'Status',
  'Pipeline status',
  'Prioritet',
  'Rating',
  'IP-adresse',
  'User Agent'
];

// Function to escape CSV fields
function escapeCSV(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  // If contains comma, newline, or quote, wrap in quotes and escape quotes
  if (str.includes(',') || str.includes('\n') || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// Format date
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

// Build CSV content
let csv = headers.join(',') + '\n';

data.forEach(candidate => {
  const row = [
    escapeCSV(candidate.id),
    escapeCSV(formatDate(candidate.created_at)),
    escapeCSV(candidate.name),
    escapeCSV(candidate.email),
    escapeCSV(candidate.phone),
    escapeCSV(candidate.role),
    escapeCSV(candidate.fylke),
    escapeCSV(candidate.kommune),
    escapeCSV(candidate.experience),
    escapeCSV(candidate.certificates),
    escapeCSV(candidate.start_from),
    escapeCSV(candidate.notes),
    escapeCSV(candidate.source),
    escapeCSV(candidate.status),
    escapeCSV(candidate.pipeline_status),
    escapeCSV(candidate.priority),
    escapeCSV(candidate.rating),
    escapeCSV(candidate.ip),
    escapeCSV(candidate.user_agent)
  ];
  csv += row.join(',') + '\n';
});

// Write CSV file
fs.writeFileSync('kandidater-alle.csv', csv, 'utf8');

// Create a summary
const summary = {
  total: data.length,
  byRole: {},
  byFylke: {},
  byStatus: {},
  withExperience: 0,
  withCertificates: 0,
  withNotes: 0,
  recentWeek: 0
};

const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

data.forEach(c => {
  // By role
  summary.byRole[c.role] = (summary.byRole[c.role] || 0) + 1;

  // By fylke
  if (c.fylke) {
    summary.byFylke[c.fylke] = (summary.byFylke[c.fylke] || 0) + 1;
  }

  // By status
  summary.byStatus[c.status || 'ingen'] = (summary.byStatus[c.status || 'ingen'] || 0) + 1;

  // With data
  if (c.experience !== null && c.experience !== undefined) summary.withExperience++;
  if (c.certificates) summary.withCertificates++;
  if (c.notes) summary.withNotes++;

  // Recent
  if (new Date(c.created_at) > oneWeekAgo) summary.recentWeek++;
});

// Write summary
const summaryText = `
OPPSUMMERING - KANDIDATER
==========================
Generert: ${new Date().toLocaleString('no-NO')}

TOTALT: ${summary.total} kandidater

SISTE 7 DAGER: ${summary.recentWeek} nye

FORDELING PER ROLLE:
${Object.entries(summary.byRole).sort((a, b) => b[1] - a[1]).map(([role, count]) => `  ${role}: ${count}`).join('\n')}

FORDELING PER FYLKE:
${Object.entries(summary.byFylke).sort((a, b) => b[1] - a[1]).map(([fylke, count]) => `  ${fylke}: ${count}`).join('\n')}

FORDELING PER STATUS:
${Object.entries(summary.byStatus).sort((a, b) => b[1] - a[1]).map(([status, count]) => `  ${status}: ${count}`).join('\n')}

DATAKVALITET:
  Med erfaring oppgitt: ${summary.withExperience} (${Math.round(summary.withExperience/summary.total*100)}%)
  Med sertifikater oppgitt: ${summary.withCertificates} (${Math.round(summary.withCertificates/summary.total*100)}%)
  Med tilleggsnotater: ${summary.withNotes} (${Math.round(summary.withNotes/summary.total*100)}%)

FILER GENERERT:
  - kandidater-alle.csv (åpnes i Excel)
  - kandidater-oppsummering.txt (denne filen)
  - candidates-export.json (rådata)
`;

fs.writeFileSync('kandidater-oppsummering.txt', summaryText, 'utf8');

console.log('✅ Eksport fullført!');
console.log('');
console.log('Filer generert:');
console.log('  📊 kandidater-alle.csv - Alle kandidater (åpnes i Excel)');
console.log('  📄 kandidater-oppsummering.txt - Oppsummering og statistikk');
console.log('  📦 candidates-export.json - Rådata (JSON)');
console.log('');
console.log(`Totalt: ${summary.total} kandidater`);
console.log(`Siste 7 dager: ${summary.recentWeek} nye`);
