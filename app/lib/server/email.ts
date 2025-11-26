// app/lib/server/email.ts
import { Resend } from "resend";
import { logger } from "../logger";

type EmailAttachment = {
  filename: string;
  content: string;
  contentType?: string;
};

type SendEmailArgs = {
  subject: string;
  html?: string;
  text?: string;
  to: string | string[];
  replyTo?: string | string[];
  attachments?: EmailAttachment[];
};

const resendKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL || "jobb@bluecrew.no";
const toList = (process.env.RESEND_TO_EMAILS || "isak@bluecrew.no,tf@bluecrew.no")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// Reduce log noise during build by warning only once, on first send attempt
let hasWarnedEmailConfig = false;
function warnMissingEmailConfig() {
  if (hasWarnedEmailConfig) return;
  hasWarnedEmailConfig = true;
  if (!resendKey) {
    logger.warn("[email.ts] RESEND_API_KEY mangler – e-postsending er deaktivert.");
  }
  if (!fromEmail) {
    logger.warn("[email.ts] RESEND_FROM_EMAIL mangler – settes i Vercel → Environment Variables.");
  }
  if (toList.length === 0) {
    logger.warn("[email.ts] RESEND_TO_EMAILS mangler – ingen interne mottakere definert.");
  }
}

const resend = resendKey ? new Resend(resendKey) : null;

const complianceLines = [
  "",
  "--",
  "Bluecrew AS (Org.nr: 936463843)",
  "Ervikveien 110, 9402 Harstad",
  "E-post: post@bluecrew.no · https://bluecrew.no",
  "Personvern: https://bluecrew.no/personvern",
].join("\n");

const complianceHtml = `
  <hr style="margin:16px 0;border:none;border-top:1px solid #e2e8f0" />
  <p style="color:#64748b;font-size:12px;margin:0">Bluecrew AS (Org.nr: 936463843)</p>
  <p style="color:#64748b;font-size:12px;margin:4px 0 0">Ervikveien 110, 9402 Harstad</p>
  <p style="color:#64748b;font-size:12px;margin:4px 0 0">
    E-post: <a href="mailto:post@bluecrew.no" style="color:inherit">post@bluecrew.no</a> ·
    <a href="https://bluecrew.no/personvern" style="color:inherit">Personvern</a>
  </p>
`;

export type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
};

function esc(s: string = "") {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function withComplianceText(text?: string) {
  const base = text?.trim()?.length ? text : "";
  return base ? `${base}${complianceLines}` : complianceLines.trimStart();
}

function withComplianceHtml(subject: string, html?: string, text?: string) {
  if (html && html.includes("Bluecrew AS")) {
    // Antar at footeren allerede er på plass
    return html;
  }
  if (html) {
    return `${html}${complianceHtml}`;
  }
  const content = text ? esc(text).replace(/\n/g, "<br />") : esc(subject);
  return `
    <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6">
      <p>${content}</p>
      ${complianceHtml}
    </div>
  `;
}

async function sendEmail({ subject, html, text, to, replyTo, attachments }: SendEmailArgs) {
  // Warn lazily on first use rather than on import
  warnMissingEmailConfig();
  if (!resend || !fromEmail) return null;
  const recipients = Array.isArray(to) ? to.filter(Boolean) : [to].filter(Boolean);
  if (recipients.length === 0) return null;

  const payload = {
    from: `Bluecrew <${fromEmail}>`,
    to: recipients,
    subject,
    html: withComplianceHtml(subject, html, text),
    text: withComplianceText(text),
    replyTo: replyTo
      ? Array.isArray(replyTo)
        ? replyTo.filter(Boolean)
        : [replyTo].filter(Boolean)
      : undefined,
    attachments: attachments?.map((att) => ({
      filename: att.filename,
      content: att.content,
      contentType: att.contentType,
    })),
  };

  return resend.emails.send(payload);
}

function buildContactHtml(p: ContactPayload) {
  return `
  <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6">
    <h2 style="margin:0 0 8px">Ny henvendelse fra nettsiden</h2>
    <table style="border-collapse:collapse">
      <tr><td style="padding:4px 8px"><b>Navn</b></td><td style="padding:4px 8px">${esc(p.name || "-")}</td></tr>
      <tr><td style="padding:4px 8px"><b>E-post</b></td><td style="padding:4px 8px">${esc(p.email || "-")}</td></tr>
      <tr><td style="padding:4px 8px"><b>Telefon</b></td><td style="padding:4px 8px">${esc(p.phone || "-")}</td></tr>
      <tr><td style="padding:4px 8px"><b>Selskap</b></td><td style="padding:4px 8px">${esc(p.company || "-")}</td></tr>
      <tr><td style="padding:4px 8px;vertical-align:top"><b>Melding</b></td><td style="padding:4px 8px;white-space:pre-wrap">${esc(
        p.message,
      )}</td></tr>
    </table>
  </div>`;
}

function buildContactText(p: ContactPayload) {
  return [
    "NY HENVENDELSE",
    `Navn: ${p.name || "-"}`,
    `E-post: ${p.email || "-"}`,
    `Telefon: ${p.phone || "-"}`,
    `Selskap: ${p.company || "-"}`,
    "",
    "Melding:",
    p.message,
  ].join("\n");
}

/** Sender til interne mottakere (kommaseparert i RESEND_TO_EMAILS) */
export async function sendContactToTeam(payload: ContactPayload) {
  const subject =
    payload.subject?.trim() ||
    `Ny henvendelse: ${payload.name || "Ukjent"}${payload.company ? ` (${payload.company})` : ""}`;

  return sendEmail({
    subject,
    html: buildContactHtml(payload),
    text: buildContactText(payload),
    to: toList,
    replyTo: payload.email ? [payload.email] : undefined,
  });
}

/** Kvittering til avsender (valgfritt) */
export async function sendReceiptToSender(payload: ContactPayload) {
  if (!payload.email) return null;

  const text = `Hei ${payload.name || ""},\n\nTakk for meldingen! Vi tar kontakt så snart vi kan.\n\nDin melding:\n${
    payload.message
  }`;

  const html = `
  <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6">
    <p>Hei ${esc(payload.name || "")},</p>
    <p>Takk for meldingen! Vi tar kontakt så snart vi kan.</p>
    <hr style="margin:12px 0;border:none;border-top:1px solid #e5e7eb"/>
    <p><b>Din melding:</b></p>
    <pre style="white-space:pre-wrap;margin:0">${esc(payload.message)}</pre>
  </div>`;

  return sendEmail({
    subject: "Takk for henvendelsen til Bluecrew",
    html,
    text,
    to: payload.email,
  });
}

export async function sendCandidateReceipt(payload: { name?: string; email?: string }) {
  if (!payload.email) return null;

  const text = `Hei ${payload.name || ""},\n\nTakk for at du sendte inn jobbsøkerprofilen din til Bluecrew.\nVi går gjennom informasjonen din og tar kontakt så snart vi har et oppdrag som passer.\n\nHilsen Bluecrew-teamet`;

  const html = `
  <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6">
    <p>Hei ${esc(payload.name || "")},</p>
    <p>Takk for at du sendte inn jobbsøkerprofilen din til Bluecrew.</p>
    <p>Vi går gjennom informasjonen din og tar kontakt så snart vi har et oppdrag som passer.</p>
    <p style="margin-top:20px">Hilsen Bluecrew-teamet</p>
  </div>`;

  return sendEmail({
    subject: "Takk for søknaden din til Bluecrew",
    html,
    text,
    to: payload.email,
  });
}

export async function sendClientConfirmation(payload: { name?: string; email?: string; company?: string }) {
  if (!payload.email) return null;

  const text = `Hei ${payload.name || ""},\n\nTakk for henvendelsen${
    payload.company ? ` fra ${payload.company}` : ""
  }!\nTeamet vårt ser gjennom behovet og kontakter deg så snart som mulig.\n\nHilsen Bluecrew-teamet`;

  const html = `
  <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6">
    <p>Hei ${esc(payload.name || "")},</p>
    <p>Takk for henvendelsen${payload.company ? ` fra ${esc(payload.company)}` : ""}!</p>
    <p>Teamet vårt ser gjennom behovet og kontakter deg så snart som mulig.</p>
    <p style="margin-top:20px">Hilsen Bluecrew-teamet</p>
  </div>`;

  return sendEmail({
    subject: "Takk for henvendelsen til Bluecrew",
    html,
    text,
    to: payload.email,
  });
}

export async function sendInterestReceipt(payload: { name?: string; email?: string }) {
  if (!payload.email) return null;

  const text = `Hei ${payload.name || ""},\n\nTakk for at du meldte interesse hos Bluecrew. Vi går gjennom informasjonen din og tar kontakt når vi har oppdrag som passer din erfaring.\n\nHilsen Bluecrew-teamet`;

  const html = `
  <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6">
    <p>Hei ${esc(payload.name || "")},</p>
    <p>Takk for at du meldte interesse hos Bluecrew.</p>
    <p>Vi går gjennom informasjonen din og tar kontakt når vi har oppdrag som passer din erfaring.</p>
    <p style="margin-top:20px">Hilsen Bluecrew-teamet</p>
  </div>`;

  return sendEmail({
    subject: "Takk for interessen – Bluecrew",
    html,
    text,
    to: payload.email,
  });
}

/**
 * GENERISK helper brukt av andre API-ruter.
 */
export async function sendNotificationEmail(args: {
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string | string[];
  attachments?: EmailAttachment[];
}) {
  return sendEmail({
    subject: args.subject,
    html: args.html,
    text: args.text,
    to: toList,
    replyTo: args.replyTo,
    attachments: args.attachments,
  });
}

/**
 * Email template for job application status updates
 */
export async function sendApplicationStatusUpdate(payload: {
  name: string;
  email: string;
  jobTitle?: string;
  status: 'reviewed' | 'contacted' | 'interview' | 'rejected' | 'hired' | 'pending';
  message?: string;
}) {
  if (!payload.email) return null;

  // Status-specific messages in Norwegian
  const statusMessages = {
    reviewed: {
      subject: 'Din søknad er mottatt og under vurdering',
      greeting: 'Takk for din søknad!',
      body: 'Vi har mottatt din søknad og går nå gjennom den. Du vil høre fra oss så snart vi har vurdert din profil.',
      color: '#3b82f6' // blue
    },
    contacted: {
      subject: 'Vi ønsker å komme i kontakt med deg',
      greeting: 'Vi er interessert i din profil!',
      body: 'Vi har gjennomgått din søknad og ønsker å komme i kontakt med deg. En av våre rekrutterere vil kontakte deg snart.',
      color: '#8b5cf6' // purple
    },
    interview: {
      subject: 'Invitasjon til intervju hos Bluecrew',
      greeting: 'Gratulerer!',
      body: 'Vi ønsker å invitere deg til intervju. Du vil snart motta mer informasjon om tid og sted.',
      color: '#10b981' // green
    },
    rejected: {
      subject: 'Tilbakemelding på din søknad',
      greeting: 'Takk for din interesse',
      body: 'Etter nøye vurdering har vi dessverre besluttet å gå videre med andre kandidater denne gangen. Vi oppfordrer deg til å søke igjen når nye stillinger blir tilgjengelige.',
      color: '#ef4444' // red
    },
    hired: {
      subject: 'Gratulerer med jobbtilbud fra Bluecrew!',
      greeting: 'Gratulerer!',
      body: 'Vi er glade for å kunne tilby deg stillingen! Du vil snart motta kontrakt og videre informasjon om oppstart.',
      color: '#059669' // emerald
    },
    pending: {
      subject: 'Status på din søknad',
      greeting: 'Oppdatering på din søknad',
      body: 'Din søknad er fortsatt under behandling. Vi kommer tilbake til deg så snart vi har mer informasjon.',
      color: '#f59e0b' // amber
    }
  };

  const statusInfo = statusMessages[payload.status];
  const jobInfo = payload.jobTitle ? ` for stillingen som ${payload.jobTitle}` : '';

  const text = `Hei ${payload.name},

${statusInfo.greeting}

${statusInfo.body}

${payload.message ? `\nMelding fra rekrutterer:\n${payload.message}\n` : ''}
Med vennlig hilsen,
Bluecrew-teamet`;

  const html = `
  <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6">
    <div style="background:linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%);color:white;padding:24px;border-radius:8px 8px 0 0">
      <h1 style="margin:0;font-size:24px">Bluecrew</h1>
    </div>
    <div style="padding:24px;background:white;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
      <div style="display:inline-block;padding:4px 12px;background:${statusInfo.color};color:white;border-radius:4px;font-size:12px;font-weight:500;margin-bottom:16px">
        ${payload.status.toUpperCase()}
      </div>
      <p style="font-size:16px;color:#111827;margin:0 0 8px">Hei ${esc(payload.name)},</p>
      <p style="font-size:18px;font-weight:600;color:#111827;margin:0 0 16px">${statusInfo.greeting}</p>
      <p style="font-size:14px;color:#4b5563;margin:0 0 16px">${statusInfo.body}</p>
      ${payload.message ? `
      <div style="background:#f9fafb;border-left:4px solid ${statusInfo.color};padding:12px;margin:16px 0">
        <p style="font-weight:600;margin:0 0 8px;color:#111827">Melding fra rekrutterer:</p>
        <p style="margin:0;color:#4b5563">${esc(payload.message)}</p>
      </div>
      ` : ''}
      <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb"/>
      <p style="font-size:14px;color:#6b7280;margin:0">Med vennlig hilsen,<br><strong>Bluecrew-teamet</strong></p>
    </div>
  </div>`;

  return sendEmail({
    subject: `${statusInfo.subject}${jobInfo}`,
    html,
    text,
    to: payload.email,
    replyTo: 'jobb@bluecrew.no',
  });
}

/**
 * Email template for candidate interest status updates (from candidate_interest table)
 */
export async function sendCandidateStatusUpdate(payload: {
  name: string;
  email: string;
  status: 'new' | 'screening' | 'interviewed' | 'approved' | 'placed' | 'rejected';
  role?: string;
  message?: string;
}) {
  if (!payload.email) return null;

  // Status-specific messages for candidate pipeline
  const statusMessages = {
    new: {
      subject: 'Vi har mottatt din registrering',
      greeting: 'Velkommen til Bluecrew!',
      body: 'Vi har mottatt din registrering og vil gjennomgå din profil. Du hører fra oss snart.',
      color: '#6b7280' // gray
    },
    screening: {
      subject: 'Din profil er under vurdering',
      greeting: 'Vi vurderer din profil',
      body: 'Vi går nå gjennom din bakgrunn og kvalifikasjoner. En av våre rekrutterere vil kontakte deg hvis vi finner et passende oppdrag.',
      color: '#3b82f6' // blue
    },
    interviewed: {
      subject: 'Takk for intervjuet',
      greeting: 'Takk for en god samtale!',
      body: 'Vi setter pris på at du tok deg tid til å møte oss. Vi vurderer nå alle kandidater og kommer tilbake til deg snart.',
      color: '#8b5cf6' // purple
    },
    approved: {
      subject: 'Du er godkjent for oppdrag',
      greeting: 'Gratulerer - du er godkjent!',
      body: 'Din profil er godkjent og vi vil nå matche deg med passende oppdrag. Du hører fra oss så snart vi har et oppdrag som passer.',
      color: '#10b981' // green
    },
    placed: {
      subject: 'Gratulerer med nytt oppdrag!',
      greeting: 'Du har fått oppdrag!',
      body: 'Vi er glade for å kunne bekrefte at du har fått oppdrag. Du vil snart motta all praktisk informasjon.',
      color: '#059669' // emerald
    },
    rejected: {
      subject: 'Tilbakemelding på din profil',
      greeting: 'Takk for din interesse',
      body: 'Etter vurdering passer dessverre ikke din profil våre nåværende behov. Vi oppfordrer deg til å registrere deg på nytt når din situasjon endrer seg.',
      color: '#ef4444' // red
    }
  };

  const statusInfo = statusMessages[payload.status];
  const roleInfo = payload.role ? ` for rollen som ${payload.role}` : '';

  const text = `Hei ${payload.name},

${statusInfo.greeting}

${statusInfo.body}

${payload.message ? `\nMelding fra Bluecrew:\n${payload.message}\n` : ''}
Med vennlig hilsen,
Bluecrew-teamet`;

  const html = `
  <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6">
    <div style="background:linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%);color:white;padding:24px;border-radius:8px 8px 0 0">
      <h1 style="margin:0;font-size:24px">Bluecrew</h1>
    </div>
    <div style="padding:24px;background:white;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
      <div style="display:inline-block;padding:4px 12px;background:${statusInfo.color};color:white;border-radius:4px;font-size:12px;font-weight:500;margin-bottom:16px">
        STATUS: ${payload.status.toUpperCase()}
      </div>
      <p style="font-size:16px;color:#111827;margin:0 0 8px">Hei ${esc(payload.name)},</p>
      <p style="font-size:18px;font-weight:600;color:#111827;margin:0 0 16px">${statusInfo.greeting}</p>
      <p style="font-size:14px;color:#4b5563;margin:0 0 16px">${statusInfo.body}</p>
      ${payload.message ? `
      <div style="background:#f9fafb;border-left:4px solid ${statusInfo.color};padding:12px;margin:16px 0">
        <p style="font-weight:600;margin:0 0 8px;color:#111827">Tilleggsinfo:</p>
        <p style="margin:0;color:#4b5563">${esc(payload.message)}</p>
      </div>
      ` : ''}
      ${payload.role ? `
      <p style="font-size:14px;color:#6b7280;margin:16px 0">
        <strong>Rolle:</strong> ${esc(payload.role)}
      </p>
      ` : ''}
      <div style="margin:24px 0;padding:16px;background:#f9fafb;border-radius:8px">
        <p style="margin:0 0 8px;font-weight:600;color:#111827">Dine neste steg:</p>
        <ul style="margin:0;padding:0 0 0 20px;color:#4b5563">
          ${payload.status === 'new' ? '<li>Hold kontaktinformasjonen din oppdatert</li><li>Sjekk e-posten din regelmessig</li>' : ''}
          ${payload.status === 'screening' ? '<li>Vær tilgjengelig på telefon</li><li>Forbered deg på eventuelle spørsmål om din erfaring</li>' : ''}
          ${payload.status === 'interviewed' ? '<li>Vi kontakter deg innen kort tid</li><li>Hold deg oppdatert på e-post</li>' : ''}
          ${payload.status === 'approved' ? '<li>Hold CV og sertifikater oppdatert</li><li>Vær klar for oppdrag på kort varsel</li>' : ''}
          ${payload.status === 'placed' ? '<li>Sjekk e-posten for kontraktsinformasjon</li><li>Forbered deg på oppstart</li>' : ''}
          ${payload.status === 'rejected' ? '<li>Oppdater din profil ved endringer</li><li>Følg med på nye stillinger på bluecrew.no</li>' : ''}
        </ul>
      </div>
      <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb"/>
      <p style="font-size:14px;color:#6b7280;margin:0">Med vennlig hilsen,<br><strong>Bluecrew-teamet</strong></p>
    </div>
  </div>`;

  return sendEmail({
    subject: `${statusInfo.subject}${roleInfo}`,
    html,
    text,
    to: payload.email,
    replyTo: 'jobb@bluecrew.no',
  });
}
