// app/api/submit-client/route.ts
import { clientSchema, extractClientForm } from "../../lib/validation";
import { enforceRateLimit } from "../../lib/server/rate-limit";
import { sendNotificationEmail } from "../../lib/server/email";
import { insertSupabaseRow } from "../../lib/server/supabase";
import { captureServerException } from "../../lib/server/observability";

export const runtime = "nodejs";

export async function GET() {
  return new Response("submit-client API er oppe. Bruk POST fra skjemaet.", { status: 200 });
}

export async function POST(req: Request) {
  try {
    // Rate limit per IP
    const rateKey = getClientKey(req, "client");
    const rate = await enforceRateLimit(rateKey);
    if (!rate.allowed) {
      return new Response("For mange forespørsler. Prøv igjen senere.", {
        status: 429,
        headers: { "Retry-After": String(rate.resetSeconds || 60) },
      });
    }

    // Hent formdata
    const fd = await req.formData();
    const values = extractClientForm(fd);

    // Honeypot
    if (values.honey) {
      return new Response(null, { status: 204 });
    }

    // Valider
    const parsed = clientSchema.safeParse(values);
    if (!parsed.success) {
      const message =
        parsed.error.issues.map((i: { message: string }) => i.message).join("; ") || "Ugyldige felter";
      return new Response("FEIL: " + message, { status: 400 });
    }

    const d = parsed.data;

    // Lag e-postinnhold
    const location = d.c_municipality ? `${d.c_municipality} (${d.c_county})` : d.c_county;
    const lines: string[] = [
      "NY KUNDEFORESPØRSEL",
      `Selskap: ${d.company}`,
      `Kontaktperson: ${d.contact}`,
      `E-post: ${d.c_email}`,
      `Telefon: ${d.c_phone}`,
      `Lokasjon: ${location}`,
      `Type behov: ${d.need_type}`,
      `Oppdragstype: ${d.need_duration}`,
      "",
      "Beskrivelse:",
      d.desc || "-",
    ];

    // Lagring i Supabase + varselmail (sendefeil stopper ikke innsendingen)
    await Promise.all([
      insertSupabaseRow({
        table: "leads",
        payload: {
          company: d.company,
          contact: d.contact,
          email: d.c_email,
          phone: d.c_phone,
          county: d.c_county,
          municipality: d.c_municipality,
          need_type: d.need_type,
          need_duration: d.need_duration,
          description: d.desc || null,
          submitted_at: new Date().toISOString(),
          source_ip: getClientIp(req),
        },
      }).catch((error) => {
        captureServerException(error, { scope: "client-insert", table: "leads" });
        console.error("⚠️ Supabase-feil (client):", error);
      }),
      sendNotificationEmail({
        subject: `Bluecrew kunde: ${d.company || "(uten selskap)"}`,
        text: lines.join("\n"),
        replyTo: d.c_email,
      }).catch((error) => {
        captureServerException(error, { scope: "client-email" });
        console.error("❌ Sendefeil (client):", error);
      }),
    ]);

    // Suksess → redirect til takk
    const back = new URL("/kunde/registrer-behov?sent=client", req.url);
    return Response.redirect(back, 303);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    captureServerException(err, { scope: "client-handler" });
    console.error("❌ Uventet feil (client):", err);
    return new Response("FEIL: " + msg, { status: 500 });
  }
}

// ---- Hjelpere ----
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
