import { NextResponse } from "next/server";
import { enforceRateLimit } from "../../lib/server/rate-limit";
import { sendNotificationEmail } from "../../lib/server/email";

/** Enkel HTML-escaping */
function esc(s: string = "") {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

/**
 * Minimal, robust versjon:
 * - Leser formData direkte
 * - Sender e-post med sikker HTML
 * - Beholder rate limit
 */
export async function POST(req: Request) {
  try {
    await enforceRateLimit("submit-client");
  } catch (e) {
    console.warn("[submit-client] rate limit warning:", e);
  }

  const form = await req.formData();

  const name = (form.get("name")?.toString() ?? "").trim();
  const email = (form.get("email")?.toString() ?? "").trim();
  const phone = (form.get("phone")?.toString() ?? "").trim();
  const company = (form.get("company")?.toString() ?? "").trim();
  const needs = (form.get("needs")?.toString() ?? "").trim();
  const message = (form.get("message")?.toString() ?? "").trim();

  const subject = `Bluecrew kundehenvendelse: ${company || name || "-"}`;
  const html = `
    <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6">
      <h2 style="margin:0 0 8px">Ny kundehenvendelse</h2>
      <table style="border-collapse:collapse">
        <tr><td style="padding:4px 8px"><b>Navn</b></td><td style="padding:4px 8px">${esc(name || "-")}</td></tr>
        <tr><td style="padding:4px 8px"><b>E-post</b></td><td style="padding:4px 8px">${esc(email || "-")}</td></tr>
        <tr><td style="padding:4px 8px"><b>Telefon</b></td><td style="padding:4px 8px">${esc(phone || "-")}</td></tr>
        <tr><td style="padding:4px 8px"><b>Selskap</b></td><td style="padding:4px 8px">${esc(company || "-")}</td></tr>
        <tr><td style="padding:4px 8px"><b>Behov</b></td><td style="padding:4px 8px">${esc(needs || "-")}</td></tr>
        <tr><td style="padding:4px 8px;vertical-align:top"><b>Melding</b></td>
            <td style="padding:4px 8px;white-space:pre-wrap">${esc(message || "")}</td></tr>
      </table>
    </div>
  `;

  await sendNotificationEmail({
    subject,
    html,
    replyTo: email || undefined,
  });

  return NextResponse.json({ ok: true });
}
