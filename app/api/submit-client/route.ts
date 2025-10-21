import { NextResponse } from "next/server";
import { enforceRateLimit } from "../../lib/server/rate-limit";
import {
  sendClientReceipt,
  sendNotificationEmail,
} from "../../lib/server/email";

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

  const contentType = req.headers.get("content-type") || "";
  const acceptsJson = (req.headers.get("accept") || "").includes("application/json");
  const isJsonPayload = contentType.includes("application/json");

  let form: FormData | null = null;
  let json: Record<string, unknown> = {};

  if (isJsonPayload) {
    json = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  } else {
    form = await req.formData();
  }

  const read = (key: string) => {
    if (form) {
      const value = form.get(key);
      return value == null ? "" : value.toString().trim();
    }
    const value = json[key];
    return value == null ? "" : String(value).trim();
  };

  const company = read("company");
  const contact = read("contact") || read("name");
  const email = read("c_email") || read("email");
  const phone = read("c_phone") || read("phone");
  const county = read("c_county") || read("county");
  const municipality = read("c_municipality") || read("municipality");
  const needType = read("need_type") || read("needs");
  const needDuration = read("need_duration") || read("duration");
  const desc = read("desc") || read("message");

  const subject = `Bluecrew kundehenvendelse: ${company || contact || "-"}`;
  const html = `
    <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6">
      <h2 style="margin:0 0 8px">Ny kundehenvendelse</h2>
      <table style="border-collapse:collapse">
        <tr><td style="padding:4px 8px"><b>Kontaktperson</b></td><td style="padding:4px 8px">${esc(contact || "-")}</td></tr>
        <tr><td style="padding:4px 8px"><b>E-post</b></td><td style="padding:4px 8px">${esc(email || "-")}</td></tr>
        <tr><td style="padding:4px 8px"><b>Telefon</b></td><td style="padding:4px 8px">${esc(phone || "-")}</td></tr>
        <tr><td style="padding:4px 8px"><b>Selskap</b></td><td style="padding:4px 8px">${esc(company || "-")}</td></tr>
        <tr><td style="padding:4px 8px"><b>Lokasjon</b></td><td style="padding:4px 8px">${esc(
          [county, municipality].filter(Boolean).join(", ") || "-",
        )}</td></tr>
        <tr><td style="padding:4px 8px"><b>Type behov</b></td><td style="padding:4px 8px">${esc(needType || "-")}</td></tr>
        <tr><td style="padding:4px 8px"><b>Oppdragstype</b></td><td style="padding:4px 8px">${esc(needDuration || "-")}</td></tr>
        <tr><td style="padding:4px 8px;vertical-align:top"><b>Beskrivelse</b></td>
            <td style="padding:4px 8px;white-space:pre-wrap">${esc(desc || "")}</td></tr>
      </table>
    </div>
  `;

  await sendNotificationEmail({
    subject,
    html,
    replyTo: email || undefined,
  });

  await sendClientReceipt({
    name: contact,
    email,
    company,
  });

  if (acceptsJson || isJsonPayload) {
    return NextResponse.json({ ok: true });
  }

  const redirectUrl = new URL("/kunde?sent=client", req.url);
  return NextResponse.redirect(redirectUrl, { status: 303 });
}
