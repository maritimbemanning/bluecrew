import { NextResponse } from "next/server";
import { candidateSchema, extractCandidateForm } from "../../lib/validation";
import { enforceRateLimit } from "../../lib/server/rate-limit";
import {
  sendCandidateReceipt,
  sendNotificationEmail,
} from "../../lib/server/email";
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
    const rateKey = getClientKey(req, "candidate");
    const rate = await enforceRateLimit(rateKey);
    if (!rate.allowed) {
      return new Response("For mange forespørsler. Prøv igjen senere.", {
        status: 429,
        headers: { "Retry-After": String(rate.resetSeconds || 60) },
      });
    }

    const formData = await req.formData();
    const { values, files } = extractCandidateForm(formData);

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
    let certificatePath: string | null = null;

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

    const attachments: { filename: string; content: string; contentType?: string }[] = [
      {
        filename: cvFile.name || "CV.pdf",
        content: cvBuffer.toString("base64"),
        contentType: cvFile.type || "application/pdf",
      },
    ];

    const certsFile = files.certs;
    if (certsFile && typeof certsFile !== "string" && certsFile.size > 0) {
      if (certsFile.size > 10 * 1024 * 1024) {
        return new Response("FEIL: Vedlegg for stort (maks 10 MB)", { status: 400 });
      }
      const allowed = [".pdf", ".zip", ".doc", ".docx"];
      const lowerName = (certsFile.name || "sertifikater").toLowerCase();
      if (!allowed.some((ext) => lowerName.endsWith(ext))) {
        return new Response("FEIL: Vedlegg må være PDF, ZIP eller DOC/DOCX", { status: 400 });
      }
      const ext = extractExtension(certsFile.name || "") || ".pdf";
      const certificateBuffer = Buffer.from(await certsFile.arrayBuffer());
      certificatePath = buildCertificatePath(storageBase, ext);
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

    const html = buildHtmlSummary({
      ...data,
      stcwSummary,
      deckSummary,
      location,
    });

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
          cv_key: cvPath,
          certs_key: certificatePath,
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
        html,
        replyTo: data.email,
        attachments,
      }).catch((error) => {
        captureServerException(error, { scope: "candidate-email" });
        console.error("❌ Sendefeil (candidate):", error);
      }),
      sendCandidateReceipt({
        name: data.name,
        email: data.email,
      }).catch((error) => {
        captureServerException(error, { scope: "candidate-receipt" });
        console.error("⚠️ Sendte ikke kvittering (candidate):", error);
      }),
    ]);

    const acceptsJson = (req.headers.get("accept") || "").includes("application/json");
    if (acceptsJson) {
      return NextResponse.json({ ok: true });
    }

    const back = new URL("/jobbsoker/registrer?sent=worker", req.url);
    return NextResponse.redirect(back, { status: 303 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    captureServerException(err, { scope: "candidate-handler" });
    console.error("❌ Uventet feil (candidate):", err);
    return new Response("FEIL: " + msg, { status: 500 });
  }
}

function buildHtmlSummary(data: {
  name?: string;
  email?: string;
  phone?: string;
  county?: string | null;
  municipality?: string | null;
  available_from?: string | null;
  wants_temporary?: string | null;
  stcw_has?: string | null;
  stcw_mod?: string[] | null;
  deck_has?: string | null;
  deck_class?: string | null;
  work_main?: string[] | null;
  skills?: string | null;
  other_comp?: string | null;
  stcwSummary: string;
  deckSummary: string;
  location: string;
}) {
  const workList = (data.work_main ?? [])
    .map((entry) => {
      const [main, sub] = entry.split(":");
      const subLabel = sub ? ` – ${esc(sub)}` : "";
      return `<li>${esc(main)}${subLabel}</li>`;
    })
    .join("");

  return `
    <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6">
      <h2 style="margin:0 0 8px">Ny jobbsøker</h2>
      <table style="border-collapse:collapse">
        <tr><td style=\"padding:4px 8px\"><b>Navn</b></td><td style=\"padding:4px 8px\">${esc(data.name || "-")}</td></tr>
        <tr><td style=\"padding:4px 8px\"><b>E-post</b></td><td style=\"padding:4px 8px\">${esc(data.email || "-")}</td></tr>
        <tr><td style=\"padding:4px 8px\"><b>Telefon</b></td><td style=\"padding:4px 8px\">${esc(data.phone || "-")}</td></tr>
        <tr><td style=\"padding:4px 8px\"><b>Bosted</b></td><td style=\"padding:4px 8px\">${esc(data.location)}</td></tr>
        <tr><td style=\"padding:4px 8px\"><b>Tilgjengelig fra</b></td><td style=\"padding:4px 8px\">${esc(data.available_from || "-")}</td></tr>
        <tr><td style=\"padding:4px 8px\"><b>Midlertidige oppdrag</b></td><td style=\"padding:4px 8px\">${esc(data.wants_temporary || "-")}</td></tr>
        <tr><td style=\"padding:4px 8px\"><b>STCW</b></td><td style=\"padding:4px 8px\">${esc(data.stcwSummary)}</td></tr>
        <tr><td style=\"padding:4px 8px\"><b>Dekksoffiser</b></td><td style=\"padding:4px 8px\">${esc(data.deckSummary)}</td></tr>
      </table>
      <div style="margin-top:16px">
        <h3 style="margin:0 0 6px;font-size:16px">Ønsket arbeid</h3>
        ${workList ? `<ul style=\"margin:0 0 12px;padding-left:18px\">${workList}</ul>` : "<p>Ingen valg</p>"}
      </div>
      ${
        data.skills
          ? `<div style=\"margin-top:12px\"><h3 style=\"margin:0 0 6px;font-size:16px\">Kompetanse</h3><p style=\"margin:0;white-space:pre-wrap\">${esc(
              data.skills,
            )}</p></div>`
          : ""
      }
      ${
        data.other_comp
          ? `<div style=\"margin-top:12px\"><h3 style=\"margin:0 0 6px;font-size:16px\">Andre kommentarer</h3><p style=\"margin:0;white-space:pre-wrap\">${esc(
              data.other_comp,
            )}</p></div>`
          : ""
      }
    </div>
  `;
}

function esc(s: string = "") {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
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
