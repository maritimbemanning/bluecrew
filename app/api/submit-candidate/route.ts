import { candidateSchema, extractCandidateForm } from "../../lib/validation";
import { enforceRateLimit } from "../../lib/server/rate-limit";
import { sendNotificationEmail } from "../../lib/server/email";
import { insertSupabaseRow } from "../../lib/server/supabase";

export const runtime = "nodejs";

export async function GET() {
  return new Response("submit-candidate API er oppe. Bruk POST fra skjemaet.", { status: 200 });
}

export async function POST(req: Request) {
  try {
    const rateKey = getClientKey(req, "candidate");
    const rate = await enforceRateLimit(rateKey);
    if (!rate.allowed) {
      return new Response("For mange forespørsler. Prøv igjen senere.", {
        status: 429,
        headers: { "Retry-After": String(rate.resetSeconds || 60) },
      });
    }

    const fd = await req.formData();
    const { values, files } = extractCandidateForm(fd);

    if (values.honey) {
      return new Response(null, { status: 204 });
    }

    const parsed = candidateSchema.safeParse(values);
    if (!parsed.success) {
      const message = parsed.error.issues.map((issue) => issue.message).join("; ") || "Ugyldige felter";
      return new Response(`FEIL: ${message}`, { status: 400 });
    }

    const data = parsed.data;

    const cvFile = files.cv;
    if (!cvFile || typeof cvFile === "string" || cvFile.size === 0) {
      return new Response("FEIL: CV (PDF) er påkrevd", { status: 400 });
    }

    const cvName = cvFile.name || "CV.pdf";
    if (!cvName.toLowerCase().endsWith(".pdf")) {
      return new Response("FEIL: CV må være PDF", { status: 400 });
    }
    if (cvFile.size > 10 * 1024 * 1024) {
      return new Response("FEIL: CV for stor (maks 10 MB)", { status: 400 });
    }

    const attachments: { filename: string; content: string; contentType?: string }[] = [
      {
        filename: cvName,
        content: Buffer.from(await cvFile.arrayBuffer()).toString("base64"),
        contentType: cvFile.type || "application/pdf",
      },
    ];

    const certsFile = files.certs;
    if (certsFile && typeof certsFile !== "string" && certsFile.size > 0) {
      if (certsFile.size > 10 * 1024 * 1024) {
        return new Response("FEIL: Vedlegg for stort (maks 10 MB)", { status: 400 });
      }
      const name = certsFile.name || "sertifikater";
      const allowed = [".pdf", ".zip", ".doc", ".docx"];
      if (!allowed.some((ext) => name.toLowerCase().endsWith(ext))) {
        return new Response("FEIL: Vedlegg må være PDF, ZIP eller DOC", { status: 400 });
      }
      attachments.push({
        filename: name,
        content: Buffer.from(await certsFile.arrayBuffer()).toString("base64"),
        contentType: certsFile.type || "application/octet-stream",
      });
    }

    const otherLines = data.other_notes
      ? Object.entries(data.other_notes).map(([key, value]) => `- ${key}: ${value}`)
      : [];

    const stcwSummary = data.stcw_has === "ja" ? `Ja${data.stcw_mod?.length ? ` (${data.stcw_mod.join(", ")})` : ""}` : "Nei";
    const deckSummary =
      data.deck_has === "ja" ? `Ja${data.deck_class ? ` (klasse ${data.deck_class})` : ""}` : "Nei";

    const location = data.municipality
      ? data.county
        ? `${data.municipality} (${data.county})`
        : data.municipality
      : data.county || "-";

    const lines: string[] = [
      "NY JOBBSØKER",
      `Navn: ${data.name}`,
      `E-post: ${data.email}`,
      `Telefon: ${data.phone}`,
      `Bosted: ${location}`,
      `Tilgjengelig fra: ${data.available_from || "-"}`,
      "",
      "Ønsket arbeid:",
      ...(data.work_main.length ? data.work_main.map((w) => `- ${w}`) : ["- (ikke valgt)"]),
    ];

    lines.push("", `Åpen for midlertidige oppdrag: ${data.wants_temporary || "-"}`);

    if (otherLines.length) {
      lines.push("", "Andre ønsker / «Annet»:", ...otherLines);
    }

    lines.push(
      "",
      `STCW: ${stcwSummary}`,
      `Dekksoffiser: ${deckSummary}`,
      "",
      "Kompetanse og erfaring:",
      data.skills || "-",
      "",
      "Andre kommentarer:",
      data.other_comp || "-",
    );

    await Promise.all([
      sendNotificationEmail({
        subject: `Bluecrew jobbsøker: ${data.name || "(uten navn)"}`,
        text: lines.join("\n"),
        replyTo: data.email,
        attachments,
      }).catch((error) => {
        console.error("❌ Sendefeil (candidate):", error);
      }),
      insertSupabaseRow({
        table: "candidates",
        payload: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          county: data.county,
          municipality: data.municipality,
          available_from: data.available_from || null,
          wants_temporary: data.wants_temporary,
          stcw_has: data.stcw_has,
          stcw_mod: data.stcw_mod ?? [],
          deck_has: data.deck_has,
          deck_class: data.deck_class || null,
          work_main: data.work_main,
          other_notes: data.other_notes ?? null,
          skills: data.skills || null,
          other_comp: data.other_comp || null,
          submitted_at: new Date().toISOString(),
          source_ip: getClientIp(req),
        },
      }).catch((error) => {
        console.error("⚠️ Supabase-feil (candidate):", error);
      }),
    ]);

    const back = new URL("/jobbsoker/registrer?sent=worker", req.url);
    return Response.redirect(back, 303);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("❌ Uventet feil (candidate):", err);
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
