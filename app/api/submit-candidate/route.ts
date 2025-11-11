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
import { requireCsrfToken } from "../../lib/server/csrf";
import { logger } from "../../lib/logger";

export const runtime = "nodejs";

export async function GET() {
  return new Response("submit-candidate API er oppe. Bruk POST fra skjemaet.", { status: 200 });
}

export async function POST(req: Request) {
  try {
    // CSRF Protection - TEMPORARILY DISABLED until we fix client/server component issue
    // TODO: Re-enable after adding CSRF token to CandidateForm
    /*
    try {
      await requireCsrfToken(req);
    } catch (error) {
      logger.error("CSRF validation failed:", error);
      return new Response("Ugyldig forespørsel. Vennligst last inn siden på nytt og prøv igjen.", {
        status: 403,
      });
    }
    */

    const rateKey = getClientKey(req, "candidate");
    const rate = await enforceRateLimit(rateKey);
    if (!rate.allowed) {
      return new Response("For mange forespørsler. Prøv igjen senere.", {
        status: 429,
        headers: { "Retry-After": String(rate.resetSeconds || 60) },
      });
    }

    logger.debug("📝 Processing candidate submission...");
    const formData = await req.formData();
    const { values, files } = extractCandidateForm(formData);
    
    logger.debug("📋 Form values:", {
      name: values.name,
      email: values.email,
      workAreasCount: values.work_main?.length || 0,
      hasCV: !!files.cv,
      hasCerts: !!files.certs,
      cvSize: files.cv?.size || 0,
      certsSize: files.certs?.size || 0,
    });

    if (values.honey) {
      return new Response(null, { status: 204 });
    }

    const parsed = candidateSchema.safeParse(values);
    if (!parsed.success) {
      const message = parsed.error.issues.map((issue) => issue.message).join("; ") || "Ugyldige felter";
      return new Response(`FEIL: ${message}`, { status: 400 });
    }

    const data = parsed.data;

    // Validate CV file
    const cvFile = files.cv;
    if (!cvFile || typeof cvFile === "string") {
      return new Response("FEIL: CV (PDF) er påkrevd", { status: 400 });
    }
    if (cvFile.size === 0) {
      return new Response("FEIL: CV-filen er tom", { status: 400 });
    }
    const cvName = (cvFile.name || "CV.pdf").toLowerCase();
    if (!cvName.endsWith(".pdf")) {
      return new Response("FEIL: CV må være PDF", { status: 400 });
    }
    if (cvFile.size > 10 * 1024 * 1024) {
      return new Response("FEIL: CV for stor (maks 10 MB)", { status: 400 });
    }

    // Validate certificate file (REQUIRED)
    const certsFile = files.certs;
    logger.debug("🔍 Certificate file check:", {
      exists: !!certsFile,
      type: typeof certsFile,
      size: certsFile?.size || 0,
      name: certsFile?.name || "NO_NAME",
    });
    
    if (!certsFile || typeof certsFile === "string") {
      logger.error("❌ Certificate file missing or invalid type");
      return new Response("FEIL: Sertifikater/Helseattest (PDF/ZIP) er påkrevd", { status: 400 });
    }
    if (certsFile.size === 0) {
      logger.error("❌ Certificate file is empty");
      return new Response("FEIL: Sertifikatfilen er tom", { status: 400 });
    }
    const allowed = [".pdf", ".zip", ".doc", ".docx"];
    const lowerCertsName = (certsFile.name || "sertifikater").toLowerCase();
    if (!allowed.some((ext) => lowerCertsName.endsWith(ext))) {
      logger.error("❌ Certificate file has invalid extension:", lowerCertsName);
      return new Response("FEIL: Sertifikater må være PDF, ZIP eller DOC/DOCX", { status: 400 });
    }
    if (certsFile.size > 10 * 1024 * 1024) {
      logger.error("❌ Certificate file too large:", certsFile.size);
      return new Response("FEIL: Sertifikater for store (maks 10 MB)", { status: 400 });
    }
    
    logger.debug("✅ Certificate validation passed");

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
      logger.error("❌ Klarte ikke å lagre CV i Supabase:", error);
      logger.error("CV path:", cvPath);
      logger.error("Bucket:", "candidates-private");
      logger.error("Error details:", error instanceof Error ? error.message : String(error));
      // Continue with submission even if storage fails; CV will be in email attachment
    }

    const attachments: { filename: string; content: string; contentType?: string }[] = [
      {
        filename: cvFile.name || "CV.pdf",
        content: cvBuffer.toString("base64"),
        contentType: cvFile.type || "application/pdf",
      },
    ];

    // Sertifikater er nå obligatorisk - håndter opplasting
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
      logger.error("❌ Klarte ikke å lagre sertifikater i Supabase:", error);
      logger.error("Certificate path:", certificatePath);
      // Continue with submission even if certificate storage fails
    }
    attachments.push({
      filename: certsFile.name || `sertifikater${ext}`,
      content: certificateBuffer.toString("base64"),
      contentType: certsFile.type || "application/octet-stream",
    });

    const location = data.postal_city
      ? `${data.postal_city}${data.postal_code ? ` (${data.postal_code})` : ""}`
      : data.street_address || "-";

    const lines: string[] = [
      "NY JOBBSØKER",
      `Navn: ${data.name}`,
      `E-post: ${data.email}`,
      `Telefon: ${data.phone}`,
      `Adresse: ${location}`,
      `Tilgjengelig fra: ${data.available_from || "-"}`,
      "",
      "Ønsket arbeid:",
      ...(data.work_main?.length ? data.work_main.map((w) => `- ${w}`) : ["- (ikke valgt)"]),
      "",
      `Åpen for midlertidige oppdrag: ${data.wants_temporary || "-"}`,
      "",
      `STCW bekreftet: ${data.stcw_confirm ? "Ja" : "Nei"}`,
      "",
      "Kompetanse og erfaring:",
      data.skills || "-",
      "",
      "Andre kommentarer:",
      data.other_comp || "-",
    ];

    const html = buildHtmlSummary({
      ...data,
      location,
    });

    await Promise.all([
      insertSupabaseRow({
        table: "candidates",
        payload: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          street_address: data.street_address || null,
          postal_code: data.postal_code || null,
          postal_city: data.postal_city || null,
          available_from: data.available_from || null,
          wants_temporary: data.wants_temporary,
          stcw_confirm: data.stcw_confirm,
          work_main: data.work_main ?? [],
          skills: data.skills || null,
          other_comp: data.other_comp || null,
          cv_key: cvPath,
          certs_key: certificatePath,
          submitted_at: submittedAt,
          source_ip: getClientIp(req),
          status: "pending", // Venter godkjenning i Import Management (admin)
        },
      }).catch((error) => {
        logger.error("⚠️ Supabase-feil (candidate):", error);
      }),
      sendNotificationEmail({
        subject: `Bluecrew jobbsøker: ${data.name || "(uten navn)"}`,
        text: lines.join("\n"),
        html,
        replyTo: data.email,
        attachments,
      }).catch((error) => {
        logger.error("❌ Sendefeil (candidate):", error);
      }),
      sendCandidateReceipt({
        name: data.name,
        email: data.email,
      }).catch((error) => {
        logger.error("⚠️ Sendte ikke kvittering (candidate):", error);
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
    logger.error("❌ Uventet feil (candidate):", err);
    return new Response("FEIL: " + msg, { status: 500 });
  }
}

function buildHtmlSummary(data: {
  name?: string;
  email?: string;
  phone?: string;
  street_address?: string | null;
  postal_code?: string | null;
  postal_city?: string | null;
  available_from?: string | null;
  wants_temporary?: string | null;
  stcw_confirm?: boolean;
  work_main?: string[] | null;
  skills?: string | null;
  other_comp?: string | null;
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
        <tr><td style=\"padding:4px 8px\"><b>Adresse</b></td><td style=\"padding:4px 8px\">${esc(data.location)}</td></tr>
        <tr><td style=\"padding:4px 8px\"><b>Tilgjengelig fra</b></td><td style=\"padding:4px 8px\">${esc(data.available_from || "-")}</td></tr>
        <tr><td style=\"padding:4px 8px\"><b>Midlertidige oppdrag</b></td><td style=\"padding:4px 8px\">${esc(data.wants_temporary || "-")}</td></tr>
        <tr><td style=\"padding:4px 8px\"><b>STCW bekreftet</b></td><td style=\"padding:4px 8px\">${data.stcw_confirm ? "Ja" : "Nei"}</td></tr>
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
