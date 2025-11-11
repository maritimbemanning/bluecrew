import { NextResponse } from "next/server";
import { clientSchema, extractClientForm } from "../../lib/validation";
import { enforceRateLimit } from "../../lib/server/rate-limit";
import {
  sendClientConfirmation,
  sendNotificationEmail,
} from "../../lib/server/email";
import { insertSupabaseRow } from "../../lib/server/supabase";

export const runtime = "nodejs";

export async function GET() {
  return new Response("submit-client API er oppe. Bruk POST fra skjemaet.", {
    status: 200,
  });
}

export async function POST(req: Request) {
  try {
    const rateKey = getClientKey(req, "client");
    const rate = await enforceRateLimit(rateKey);
    if (!rate.allowed) {
      return new Response("For mange forespørsler. Prøv igjen senere.", {
        status: 429,
        headers: { "Retry-After": String(rate.resetSeconds || 60) },
      });
    }

    const formData = await req.formData();
    const values = extractClientForm(formData);

    if (values.honey) {
      return new Response(null, { status: 204 });
    }

    const parsed = clientSchema.safeParse(values);
    if (!parsed.success) {
      const message =
        parsed.error.issues.map((issue) => issue.message).join("; ") ||
        "Ugyldige felter";
      return new Response("FEIL: " + message, { status: 400 });
    }

    const data = parsed.data;

    const lines: string[] = [
      "NY KUNDEFORESPØRSEL",
      `Selskap: ${data.company}`,
      `Kontaktperson: ${data.contact}`,
      `E-post: ${data.c_email}`,
      `Telefon: ${data.c_phone || "(ikke oppgitt)"}`,
      `Antall personer: ${data.num_people}`,
      `Oppstart: ${data.start_date}`,
      `Arbeidssted: ${data.work_location}`,
      `Type behov: ${data.need_type}`,
      data.need_duration ? `Oppdragstype: ${data.need_duration}` : "",
      data.urgency ? `Hastighet: ${data.urgency}` : "",
      "",
      "Beskrivelse:",
      data.desc || "-",
    ].filter(Boolean);

    const html = buildClientHtml(data);

    await Promise.all([
      insertSupabaseRow({
        table: "leads",
        payload: {
          company: data.company,
          contact: data.contact,
          email: data.c_email,
          phone: data.c_phone || null,
          need_type: data.need_type,
          work_location: data.work_location,
          need_duration: data.need_duration || null,
          num_people: data.num_people || null,
          start_date: data.start_date || null,
          urgency: data.urgency || null,
          description: data.desc || null,
          submitted_at: new Date().toISOString(),
          source_ip: getClientIp(req),
        },
      }).catch((error) => {
        console.error("⚠️ Supabase-feil (client):", error);
      }),
      sendNotificationEmail({
        subject: `Bluecrew kunde: ${data.company || "(uten selskap)"}`,
        text: lines.join("\n"),
        html,
        replyTo: data.c_email,
      }).catch((error) => {
        console.error("❌ Sendefeil (client):", error);
      }),
      sendClientConfirmation({
        name: data.contact,
        email: data.c_email,
        company: data.company,
      }).catch((error) => {
        console.error("⚠️ Sendte ikke kvittering (client):", error);
      }),
    ]);

    const acceptsJson = (req.headers.get("accept") || "").includes(
      "application/json"
    );
    if (acceptsJson) {
      return NextResponse.json({ ok: true });
    }

    const back = new URL("/kunde/registrer-behov?sent=client", req.url);
    return NextResponse.redirect(back, { status: 303 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("❌ Uventet feil (client):", err);
    return new Response("FEIL: " + msg, { status: 500 });
  }
}

function buildClientHtml(data: {
  company: string;
  contact: string;
  c_email: string;
  c_phone?: string;
  need_type: string;
  num_people: string;
  start_date: string;
  work_location: string;
  need_duration?: string;
  urgency?: string;
  desc?: string;
}) {
  return `
    <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6">
      <h2 style="margin:0 0 8px">Ny kundehenvendelse</h2>
      <table style="border-collapse:collapse">
        <tr><td style=\"padding:4px 8px\"><b>Selskap</b></td><td style=\"padding:4px 8px\">${esc(data.company)}</td></tr>
        <tr><td style=\"padding:4px 8px\"><b>Kontaktperson</b></td><td style=\"padding:4px 8px\">${esc(data.contact)}</td></tr>
        <tr><td style=\"padding:4px 8px\"><b>E-post</b></td><td style=\"padding:4px 8px\">${esc(data.c_email)}</td></tr>
        <tr><td style=\"padding:4px 8px\"><b>Telefon</b></td><td style=\"padding:4px 8px\">${esc(data.c_phone || "(ikke oppgitt)")}</td></tr>
        <tr><td style=\"padding:4px 8px\"><b>Antall personer</b></td><td style=\"padding:4px 8px\">${esc(data.num_people)}</td></tr>
        <tr><td style=\"padding:4px 8px\"><b>Oppstart</b></td><td style=\"padding:4px 8px\">${esc(data.start_date)}</td></tr>
        <tr><td style=\"padding:4px 8px\"><b>Arbeidssted</b></td><td style=\"padding:4px 8px\">${esc(data.work_location)}</td></tr>
        <tr><td style=\"padding:4px 8px\"><b>Type behov</b></td><td style=\"padding:4px 8px\">${esc(data.need_type)}</td></tr>
        ${data.need_duration ? `<tr><td style=\"padding:4px 8px\"><b>Oppdragstype</b></td><td style=\"padding:4px 8px\">${esc(data.need_duration)}</td></tr>` : ""}
        ${data.urgency ? `<tr><td style=\"padding:4px 8px\"><b>Hastighet</b></td><td style=\"padding:4px 8px\">${esc(data.urgency)}</td></tr>` : ""}
        ${data.desc ? `<tr><td style=\"padding:4px 8px;vertical-align:top\"><b>Beskrivelse</b></td><td style=\"padding:4px 8px;white-space:pre-wrap\">${esc(data.desc)}</td></tr>` : ""}
      </table>
    </div>
  `;
}

function esc(s: string = "") {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function getClientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip") || "unknown";
}

function getClientKey(req: Request, prefix: string) {
  return `${prefix}:${getClientIp(req)}`;
}
