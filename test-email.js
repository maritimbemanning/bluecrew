const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  console.log('Testing Resend email...');
  console.log('API Key:', process.env.RESEND_API_KEY ? 'Set' : 'Missing');
  
  const from = process.env.RESEND_FROM_EMAIL || 'no-reply@send.bluecrew.no';
  const to = (process.env.RESEND_TO_EMAILS || 'isak@bluecrew.no').split(',')[0];
  
  console.log('From:', from);
  console.log('To:', to);

  try {
    const result = await resend.emails.send({
      from: 'Bluecrew Test <' + from + '>',
      to: to,
      subject: 'Test email fra Bluecrew',
      text: 'Hvis du ser denne, fungerer e-post!'
    });
    console.log('\nEmail sent!', result);
  } catch (error) {
    console.error('\nError:', error);
  }
}

test();
