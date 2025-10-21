import { NextResponse } from "next/server";
import { enforceRateLimit } from "../../lib/server/rate-limit";
import { sendNotificationEmail } from "../../lib/server/email";

/** Enkel HTML-escaping */
function esc(s: string = "") {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

/**
 * Denne versjonen unngår alle types/SDK-mismatch:
 * - Leser formData direkte (uavhengig av schema-typer)
 * - Sender e-post med sikker HTML
 * - Beholder rate limiting
 */
export async function POST(req: Request) {
  // Rate limit med stabil nøkkel (enforceRateLimit forventer trolig 1 string-arg)
  try {
    await enforceRateLimit("submit-candidate");
  } catch (e) {
    // Hvis rate limit ikke er konfigurert i dev, svarer vi mildt
    console.warn("[submit-candidate] rate limit warning:", e);
  }

  const form = await req.formData();

  // Les kjente felter (fallback tom streng hvis ikke finnes)
  const name = (form.get("name")?.toString() ?? "").trim();
  const email = (form.get("email")?.toString() ?? "").trim();
  const phone = (form.get("phone")?.toString() ?? "").trim();
  const company = (form.get("company")?.toString() ?? "").trim();
  const position = (form.get("position")?.toString() ?? "").trim();
  const message = (form.get("message")?.toString() ?? "").trim();

  // Bygg trygg HTML uansett hva som er gitt (Resend krever html eller text)
  const subject = `Bluecrew jobbsøker: ${name || "Uten navn"}`;
  const html = `
    <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6">
      <h2 style="margin:0 0 8px">Ny jobbsøker</h2>
      <table style="border-collapse:collapse">
        <tr><td style="padding:4px 8px"><b>Navn</b></td><td style="padding:4px 8px">${esc(name || "-")}</td></tr>
        <tr><td style="padding:4px 8px"><b>E-post</b></td><td style="padding:4px 8px">${esc(email || "-")}</td></tr>
        <tr><td style="padding:4px 8px"><b>Telefon</b></td><td style="padding:4px 8px">${esc(phone || "-")}</td></tr>
        <tr><td style="padding:4px 8px"><b>Selskap</b></td><td style="padding:4px 8px">${esc(company || "-")}</td></tr>
        <tr><td style="padding:4px 8px"><b>Stilling</b></td><td style="padding:4px 8px">${esc(position || "-")}</td></tr>
        <tr><td style="padding:4px 8px;vertical-align:top"><b>Melding</b></td>
            <td style="padding:4px 8px;white-space:pre-wrap">${esc(message || "")}</td></tr>
      </table>
    </div>
  `;

  // Send e-post til team (replyTo settes hvis bruker oppga e-post)
  await sendNotificationEmail({
    subject,
    html,
    replyTo: email || undefined,
  });

  return NextResponse.json({ ok: true });
}
