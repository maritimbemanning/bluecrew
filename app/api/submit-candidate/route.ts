// app/api/submit-candidate/route.ts
import { candidateSchema, extractCandidateForm } from "../../lib/validation";
import { enforceRateLimit } from "../../lib/server/rate-limit";
import { sendNotificationEmail } from "../../lib/server/email";
import { insertSupabaseRow, uploadSupabaseObject } from "../../lib/server/supabase";
import {
  buildCertificatePath,
  buildCvPath,
  createCandidateStorageBase,
  extractExtension,
} from "../../lib/server/candidate-files";
import { captureServerException } from "../../lib/server/observability";

export const runtime = "nodejs";

export async function GET() {
  return new Response("submit-candidate API er oppe. Bruk POST fra skjemaet.", { status: 200 });
}

export async function POST(req: Request) {
  try {
    // Rate limit per IP
    const rateKey = getClientKey(req, "candidate");
    const rate = await enforceRateLimit(rateKey);
    if (!rate.allowed) {
      return new Response("For mange forespørsler. Prøv igjen senere.", {
        status: 429,
        headers: { "Retry-After": String(rate.resetSeconds || 60) },
      });
    }

    // Parse form
    const fd = await req.formData();
    const { values, files } = extractCandidateForm(fd);

    // Honeypot
    if (values.honey) {
      return new Response(null, { status: 204 });
    }

    // Valider felt
    const parsed = candidateSchema.safeParse(values);
    if (!parsed.success) {
      const message =
        parsed.error.issues.map((issue: { message: string }) => issue.message).join("; ") ||
        "Ugyldige felter";
      return new Response(`FEIL: ${message}`, { status: 400 });
    }
    const data = parsed.data;

    // ---- Filer (CV: påkrevd, PDF <= 10MB) ----
    const cvFile = files.cv;
    if (!cvFile || typeof cvFile === "string" || cvFile.size === 0) {
      return new Response("FEIL: CV (PDF) er påkrevd", { status: 400 });
    }
    const cvName = (cvFile.name || "CV.pdf").toLowerCase();
    if (!cvName.endsWith(".pdf")) {
      return new Response("FEIL: CV må være PDF", { status: 400 });
    }
    if (cvFile.size > 10 * 1024 * 1024) {
      return new Response("FEIL: CV for stor (maks 10 MB)", { status: 400 });
    }

    const submittedAt = new Date().toISOString();
    const storageBase = createCandidateStorageBase(data.email, submittedAt);
    const cvBuffer = Buffer.from(await cvFile.arrayBuffer());
    const cvPath = buildCvPath(storageBase);

    try {
      await uploadSupabaseObject({
        bucket: "candidates-private",
        object: cvPath,
        body: cvBuffer,
        contentType: cvFile.type || "application/pdf",
      });
    } catch (error) {
      captureServerException(error, { scope: "candidate-upload-cv" });
      console.error("❌ Klarte ikke å lagre CV i Supabase", error);
      return new Response("FEIL: Kunne ikke lagre CV", { status: 500 });
    }

    // Bygg e-postvedlegg (base64 for Resend REST API)
    const attachments: { filename: string; content: string; contentType?: string }[] = [
      {
        filename: cvFile.name || "CV.pdf",
        content: cvBuffer.toString("base64"),
        contentType: cvFile.type || "application/pdf",
      },
    ];

    // Sertifikater (valgfritt, PDF/ZIP/DOC/DOCX, <= 10MB)
    const certsFile = files.certs;
    if (certsFile && typeof certsFile !== "string" && certsFile.size > 0) {
      if (certsFile.size > 10 * 1024 * 1024) {
        return new Response("FEIL: Vedlegg for stort (maks 10 MB)", { status: 400 });
      }
      const allowed = [".pdf", ".zip", ".doc", ".docx"];
      const nm = (certsFile.name || "sertifikater").toLowerCase();
      if (!allowed.some((ext) => nm.endsWith(ext))) {
        return new Response("FEIL: Vedlegg må være PDF, ZIP eller DOC/DOCX", { status: 400 });
      }
      const ext = extractExtension(certsFile.name || "") || ".pdf";
      const certificateBuffer = Buffer.from(await certsFile.arrayBuffer());
      const certificatePath = buildCertificatePath(storageBase, ext);
      try {
        await uploadSupabaseObject({
          bucket: "candidates-private",
          object: certificatePath,
          body: certificateBuffer,
          contentType: certsFile.type || "application/octet-stream",
        });
      } catch (error) {
        captureServerException(error, { scope: "candidate-upload-certificate" });
        console.error("❌ Klarte ikke å lagre sertifikater i Supabase", error);
        return new Response("FEIL: Kunne ikke lagre sertifikater", { status: 500 });
      }
      attachments.push({
        filename: certsFile.name || `sertifikater${ext}`,
        content: certificateBuffer.toString("base64"),
        contentType: certsFile.type || "application/octet-stream",
      });
    }

    // Tekst-oppsummering til e-post
    const stcwSummary =
      data.stcw_has === "ja"
        ? `Ja${data.stcw_mod?.length ? ` (${data.stcw_mod.join(", ")})` : ""}`
        : "Nei";
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
      ...(data.work_main?.length ? data.work_main.map((w) => `- ${w}`) : ["- (ikke valgt)"]),
      "",
      `Åpen for midlertidige oppdrag: ${data.wants_temporary || "-"}`,
      "",
      `STCW: ${stcwSummary}`,
      `Dekksoffiser: ${deckSummary}`,
      "",
      "Kompetanse og erfaring:",
      data.skills || "-",
      "",
      "Andre kommentarer:",
      data.other_comp || "-",
    ];

    // Sidelagring + e-post i parallell (e-post feiler ikke innsending)
    await Promise.all([
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
          work_main: data.work_main ?? [],
          skills: data.skills || null,
          other_comp: data.other_comp || null,
          submitted_at: submittedAt,
          source_ip: getClientIp(req),
        },
      }).catch((error) => {
        captureServerException(error, { scope: "candidate-insert", table: "candidates" });
        console.error("⚠️ Supabase-feil (candidate):", error);
      }),
      sendNotificationEmail({
        subject: `Bluecrew jobbsøker: ${data.name || "(uten navn)"}`,
        text: lines.join("\n"),
        replyTo: data.email,
        attachments,
      }).catch((error) => {
        captureServerException(error, { scope: "candidate-email" });
        console.error("❌ Sendefeil (candidate):", error);
      }),
    ]);

    // Suksess → redirect til takk-side
    const back = new URL("/jobbsoker/registrer?sent=worker", req.url);
    return Response.redirect(back, 303);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    captureServerException(err, { scope: "candidate-handler" });
    console.error("❌ Uventet feil (candidate):", err);
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
