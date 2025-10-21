// app/lib/server/email.ts
import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL || "no-reply@send.bluecrew.no";
const toList = (process.env.RESEND_TO_EMAILS || "isak@bluecrew.no,SanderBerg@bluecrew.no")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

if (!resendKey) {
  console.warn("[email.ts] RESEND_API_KEY mangler – e-postsending er deaktivert.");
}
if (!fromEmail) {
  console.warn("[email.ts] RESEND_FROM_EMAIL mangler – settes i Vercel → Environment Variables.");
}
if (toList.length === 0) {
  console.warn("[email.ts] RESEND_TO_EMAILS mangler – ingen interne mottakere definert.");
}

const resend = resendKey ? new Resend(resendKey) : null;

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

function buildContactHtml(p: ContactPayload) {
  return `
  <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6">
    <h2 style="margin:0 0 8px">Ny henvendelse fra nettsiden</h2>
    <table style="border-collapse:collapse">
      <tr><td style="padding:4px 8px"><b>Navn</b></td><td style="padding:4px 8px">${esc(p.name || "-")}</td></tr>
      <tr><td style="padding:4px 8px"><b>E-post</b></td><td style="padding:4px 8px">${esc(p.email || "-")}</td></tr>
      <tr><td style="padding:4px 8px"><b>Telefon</b></td><td style="padding:4px 8px">${esc(p.phone || "-")}</td></tr>
      <tr><td style="padding:4px 8px"><b>Selskap</b></td><td style="padding:4px 8px">${esc(p.company || "-")}</td></tr>
      <tr><td style="padding:4px 8px;vertical-align:top"><b>Melding</b></td><td style="padding:4px 8px;white-space:pre-wrap">${esc(p.message)}</td></tr>
    </table>
    <p style="color:#64748b;font-size:12px;margin-top:16px">
      Sendt fra bluecrew.no – svar gjerne til avsender (reply-to).
    </p>
  </div>`;
}

/** Sender til interne mottakere (kommaseparert i RESEND_TO_EMAILS) */
export async function sendContactToTeam(payload: ContactPayload) {
  if (!resend || !fromEmail || toList.length === 0) return null;

  const subject =
    payload.subject?.trim() ||
    `Ny henvendelse: ${payload.name || "Ukjent"}${payload.company ? ` (${payload.company})` : ""}`;

  const html = buildContactHtml(payload);

  const result = await resend.emails.send({
    from: `Bluecrew <${fromEmail}>`,
    to: toList,
    subject,
    html,
    // NB: Resend SDK bruker camelCase
    replyTo: payload.email ? [payload.email] : undefined,
  });

  return result;
}

/** Kvittering til avsender (valgfritt) */
export async function sendReceiptToSender(payload: ContactPayload) {
  if (!resend || !fromEmail || !payload.email) return null;

  const html = `
  <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6">
    <p>Hei ${esc(payload.name || "")},</p>
    <p>Takk for meldingen! Vi tar kontakt så snart vi kan.</p>
    <hr style="margin:12px 0;border:none;border-top:1px solid #e5e7eb"/>
    <p><b>Din melding:</b></p>
    <pre style="white-space:pre-wrap;margin:0">${esc(payload.message)}</pre>
    <p style="color:#64748b;font-size:12px;margin-top:16px">
      Hilsen Bluecrew – denne e-posten er sendt automatisk.
    </p>
  </div>`;

  const result = await resend.emails.send({
    from: `Bluecrew <${fromEmail}>`,
    to: payload.email,
    subject: "Takk for henvendelsen til Bluecrew",
    html,
  });

  return result;
}

/**
 * GENERISK helper brukt av andre API-ruter (tilbakekomp.)
 * Bruk:
 *   await sendNotificationEmail({ subject, html, replyTo: "bruker@eksempel.no" })
 */
export async function sendNotificationEmail(args: {
  subject: string;
  html: string;
  replyTo?: string | string[];
}) {
  if (!resend || !fromEmail || toList.length === 0) return null;

  const result = await resend.emails.send({
    from: `Bluecrew <${fromEmail}>`,
    to: toList,
    subject: args.subject,
    html: args.html,
    replyTo: args.replyTo
      ? Array.isArray(args.replyTo)
        ? args.replyTo
        : [args.replyTo]
      : undefined,
  });

  return result;
}
