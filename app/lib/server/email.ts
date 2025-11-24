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
const fromEmail = process.env.RESEND_FROM_EMAIL || "no-reply@send.bluecrew.no";
const toList = (process.env.RESEND_TO_EMAILS || "isak@bluecrew.no,SanderBerg@bluecrew.no")
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
