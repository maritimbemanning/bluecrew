import { clientSchema, extractClientForm } from "../../lib/validation";
import { enforceRateLimit } from "../../lib/server/rate-limit";
import { sendNotificationEmail } from "../../lib/server/email";
import { insertSupabaseRow } from "../../lib/server/supabase";

export const runtime = "nodejs";

export async function GET() {
  return new Response("submit-client API er oppe. Bruk POST fra skjemaet.", { status: 200 });
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

    const fd = await req.formData();
    const values = extractClientForm(fd);

    if (values.honey) {
      return new Response(null, { status: 204 });
    }

    const parsed = clientSchema.safeParse(values);
    if (!parsed.success) {
      const message = parsed.error.issues.map((issue) => issue.message).join("; ") || "Ugyldige felter";
      return new Response(`FEIL: ${message}`, { status: 400 });
    }

    const data = parsed.data;
    const location = data.c_municipality
      ? data.c_county
        ? `${data.c_municipality} (${data.c_county})`
        : data.c_municipality
      : data.c_county || "-";

    const lines = [
      "NY KUNDEFORESPØRSEL",
      `Selskap: ${data.company}`,
      `Kontaktperson: ${data.contact}`,
      `E-post: ${data.c_email}`,
      `Telefon: ${data.c_phone}`,
      `Lokasjon: ${location}`,
      `Type behov: ${data.need_type}`,
      `Oppdragstype: ${data.need_duration}`,
      "",
      "Beskrivelse:",
      data.desc || "-",
    ];

    await Promise.all([
      sendNotificationEmail({
        subject: `Bluecrew kunde: ${data.company || "(uten selskap)"}`,
        text: lines.join("\n"),
        replyTo: data.c_email,
      }).catch((error) => {
        console.error("❌ Sendefeil (client):", error);
      }),
      insertSupabaseRow({
        table: "leads",
        payload: {
          company: data.company,
          contact: data.contact,
          email: data.c_email,
          phone: data.c_phone,
          county: data.c_county,
          municipality: data.c_municipality || null,
          need_type: data.need_type,
          need_duration: data.need_duration,
          description: data.desc || null,
          submitted_at: new Date().toISOString(),
          source_ip: getClientIp(req),
        },
      }).catch((error) => {
        console.error("⚠️ Supabase-feil (client):", error);
      }),
    ]);

    const back = new URL("/kunde?sent=client", req.url);
    return Response.redirect(back, 303);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("❌ Uventet feil (client):", err);
    return new Response("FEIL: " + msg, { status: 500 });
  }
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
