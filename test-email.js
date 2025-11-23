// Quick diagnostic script to test email sending
const { Resend } = require('resend');

const resendKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL || 'no-reply@send.bluecrew.no';
const toEmails = (process.env.RESEND_TO_EMAILS || 'isak@bluecrew.no,SanderBerg@bluecrew.no')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

console.log('=== EMAIL CONFIGURATION ===');
console.log('RESEND_API_KEY:', resendKey ? `${resendKey.slice(0, 10)}...` : 'MISSING!');
console.log('RESEND_FROM_EMAIL:', fromEmail);
console.log('RESEND_TO_EMAILS:', toEmails);
console.log('');

if (!resendKey) {
  console.error('ERROR: RESEND_API_KEY is missing!');
  process.exit(1);
}

const resend = new Resend(resendKey);

async function testEmail() {
  console.log('Sending test email...');

  try {
    const result = await resend.emails.send({
      from: `Bluecrew <${fromEmail}>`,
      to: toEmails,
      subject: 'Test: Ny interesse fra kandidat',
      html: '<p>Dette er en test-epost for å verifisere at Resend fungerer.</p>',
      text: 'Dette er en test-epost for å verifisere at Resend fungerer.',
    });

    console.log('✅ Email sent successfully!');
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('❌ Email failed!');
    console.error('Error:', error);
    if (error.response) {
      console.error('Response:', error.response);
    }
  }
}

testEmail();
