import { NextResponse } from "next/server";
import { enforceRateLimit } from "../../lib/server/rate-limit";
import {
  sendCandidateReceipt,
  sendNotificationEmail,
} from "../../lib/server/email";
import {
  insertSupabaseRow,
  uploadSupabaseObject,
} from "../../lib/server/supabase";
import {
  buildCvPath,
  createCandidateStorageBase,
} from "../../lib/server/candidate-files";
import { requireCsrfToken } from "../../lib/server/csrf";
import { logger } from "../../lib/logger";
import { getClientIp, esc } from "../../lib/server/utils";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const runtime = "nodejs";

export async function GET() {
  return new Response("submit-candidate API er oppe. Bruk POST fra skjemaet.", {
    status: 200,
  });
}

export async function POST(req: Request) {
  try {
    // CSRF Protection
    try {
      await requireCsrfToken(req);
    } catch (error) {
      logger.error("CSRF validation failed:", error);
      return new Response(
        "Ugyldig forespørsel. Vennligst last inn siden på nytt og prøv igjen.",
        { status: 403 }
      );
    }

    const rateKey = getClientKey(req, "candidate");
    const rate = await enforceRateLimit(rateKey);
    if (!rate.allowed) {
      return new Response("For mange forespørsler. Prøv igjen senere.", {
        status: 429,
        headers: { "Retry-After": String(rate.resetSeconds || 60) },
      });
    }

    // Get Clerk user if logged in
    const { userId: clerkUserId } = await auth();

    const formData = await req.formData();

    // Extract form fields
    const name = (formData.get("name") as string || "").trim();
    const email = (formData.get("email") as string || "").trim();
    const phone = (formData.get("phone") as string || "").trim();
    const fylke = (formData.get("fylke") as string || "").trim();
    const skills = (formData.get("skills") as string || "").trim();
    const stcwConfirm = formData.get("stcw_confirm") !== null;
    const gdpr = formData.get("gdpr") !== null;
    const honey = (formData.get("honey") as string || "").trim();
    const cvFile = formData.get("cv") as File | null;

    logger.debug("📝 Candidate submission:", { name, email, fylke });

    // Honeypot check
    if (honey) {
      return new Response(null, { status: 204 });
    }

    // Validation
    const errors: string[] = [];
    if (!name || name.length < 2) errors.push("Oppgi fullt navn");
    if (!email || !email.includes("@")) errors.push("Oppgi gyldig e-post");
    if (!phone || phone.length < 6) errors.push("Oppgi telefonnummer");
    if (!fylke) errors.push("Velg fylke");
    if (!skills || skills.length < 10) errors.push("Beskriv din erfaring");
    if (!stcwConfirm) errors.push("Bekreft STCW og helseattest");
    if (!gdpr) errors.push("Samtykke til personvern er påkrevd");

    // CV validation
    if (!cvFile || typeof cvFile === "string") {
      errors.push("CV (PDF) er påkrevd");
    } else if (cvFile.size === 0) {
      errors.push("CV-filen er tom");
    } else if (!cvFile.name.toLowerCase().endsWith(".pdf")) {
      errors.push("CV må være PDF");
    } else if (cvFile.size > 10 * 1024 * 1024) {
      errors.push("CV for stor (maks 10 MB)");
    }

    if (errors.length > 0) {
      return new Response(`FEIL: ${errors.join("; ")}`, { status: 400 });
    }

    const submittedAt = new Date().toISOString();
    const storageBase = createCandidateStorageBase(email, submittedAt);
    const cvBuffer = Buffer.from(await cvFile!.arrayBuffer());
    const cvPath = buildCvPath(storageBase);

    // Upload CV to Supabase Storage
    try {
      await uploadSupabaseObject({
        bucket: "candidates-private",
        object: cvPath,
        body: cvBuffer,
        contentType: cvFile!.type || "application/pdf",
      });
    } catch (error) {
      logger.error("❌ CV upload failed:", error);
      // Continue - CV will be in email attachment
    }

    // Build email content
    const lines = [
      "NY JOBBSØKER",
      `Navn: ${name}`,
      `E-post: ${email}`,
      `Telefon: ${phone}`,
      `Fylke: ${fylke}`,
      "",
      "Erfaring og kompetanse:",
      skills,
      "",
      `STCW bekreftet: ${stcwConfirm ? "Ja" : "Nei"}`,
    ];

    const html = `
      <div style="font-family:system-ui,sans-serif;line-height:1.6">
        <h2 style="margin:0 0 16px">Ny jobbsøker</h2>
        <table style="border-collapse:collapse">
          <tr><td style="padding:4px 12px"><b>Navn</b></td><td>${esc(name)}</td></tr>
          <tr><td style="padding:4px 12px"><b>E-post</b></td><td>${esc(email)}</td></tr>
          <tr><td style="padding:4px 12px"><b>Telefon</b></td><td>${esc(phone)}</td></tr>
          <tr><td style="padding:4px 12px"><b>Fylke</b></td><td>${esc(fylke)}</td></tr>
          <tr><td style="padding:4px 12px"><b>STCW</b></td><td>${stcwConfirm ? "Bekreftet" : "Nei"}</td></tr>
        </table>
        <div style="margin-top:16px">
          <h3 style="margin:0 0 8px;font-size:16px">Erfaring og kompetanse</h3>
          <p style="margin:0;white-space:pre-wrap">${esc(skills)}</p>
        </div>
      </div>
    `;

    const attachments = [
      {
        filename: cvFile!.name || "CV.pdf",
        content: cvBuffer.toString("base64"),
        contentType: cvFile!.type || "application/pdf",
      },
    ];

    // Save to DB and send emails
    const results = await Promise.allSettled([
      insertSupabaseRow({
        table: "candidates",
        payload: {
          name,
          email,
          phone,
          fylke,
          skills,
          stcw_confirm: stcwConfirm,
          cv_key: cvPath,
          submitted_at: submittedAt,
          source_ip: getClientIp(req),
          status: "pending",
          clerk_user_id: clerkUserId || null,
        },
      }),
      sendNotificationEmail({
        subject: `Bluecrew jobbsøker: ${name}`,
        text: lines.join("\n"),
        html,
        replyTo: email,
        attachments,
      }),
      sendCandidateReceipt({ name, email }),
    ]);

    // Log failures
    const [dbResult, emailResult, receiptResult] = results;
    if (dbResult.status === "rejected") {
      logger.error("⚠️ Supabase insert failed:", dbResult.reason);
    }
    if (emailResult.status === "rejected") {
      logger.error("❌ Notification email failed:", emailResult.reason);
    }
    if (receiptResult.status === "rejected") {
      logger.error("⚠️ Receipt email failed:", receiptResult.reason);
    }

    // Update Clerk metadata
    if (clerkUserId && dbResult.status === "fulfilled") {
      try {
        const client = await clerkClient();
        await client.users.updateUserMetadata(clerkUserId, {
          publicMetadata: {
            candidate_registered: true,
            candidate_registered_at: submittedAt,
            candidate_status: "pending",
            candidate_fylke: fylke,
          },
        });
      } catch (clerkError) {
        logger.error("⚠️ Clerk metadata update failed:", clerkError);
      }
    }

    // Response
    const acceptsJson = (req.headers.get("accept") || "").includes("application/json");
    if (acceptsJson) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.redirect(
      new URL("/jobbsoker/registrer/skjema?sent=worker", req.url),
      { status: 303 }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    logger.error("❌ Unexpected error:", err);
    return new Response("FEIL: " + msg, { status: 500 });
  }
}

function getClientKey(req: Request, prefix: string) {
  return `${prefix}:${getClientIp(req)}`;
}
