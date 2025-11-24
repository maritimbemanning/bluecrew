/**
 * JOB APPLICATION API
 * Route: /api/job-applications
 *
 * Handles job applications submitted from /stillinger/[slug]/sok
 * Stores CV in Supabase storage and sends email notifications
 */

import { NextResponse } from "next/server";
import { enforceRateLimit } from "../../lib/server/rate-limit";
import { sendNotificationEmail } from "../../lib/server/email";
import { uploadSupabaseObject, insertSupabaseRow } from "../../lib/server/supabase";
import { logger } from "../../lib/logger";
import { createHash } from "node:crypto";

export const runtime = "nodejs";

// Types
interface ApplicationData {
  job_id: string;
  job_title: string;
  job_company: string;
  job_location: string;
  name: string;
  email: string;
  phone: string;
  cover_letter?: string;
  vipps_verified: boolean;
  vipps_sub?: string;
  vipps_verified_at?: string;
}

export async function GET() {
  return new Response("Job applications API. Use POST to submit.", {
    status: 200,
  });
}

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip = getClientIp(req);
    const rateKey = `job-application:${ip}`;
    const rate = await enforceRateLimit(rateKey);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "For mange forespørsler. Prøv igjen senere." },
        { status: 429, headers: { "Retry-After": String(rate.resetSeconds || 60) } }
      );
    }

    logger.debug("📝 Processing job application...");

    const formData = await req.formData();

    // Extract form fields
    const applicationData: ApplicationData = {
      job_id: formData.get("job_id") as string || "",
      job_title: formData.get("job_title") as string || "",
      job_company: formData.get("job_company") as string || "",
      job_location: formData.get("job_location") as string || "",
      name: formData.get("name") as string || "",
      email: formData.get("email") as string || "",
      phone: formData.get("phone") as string || "",
      cover_letter: formData.get("cover_letter") as string || "",
      vipps_verified: formData.get("vipps_verified") === "true",
      vipps_sub: formData.get("vipps_sub") as string || undefined,
      vipps_verified_at: formData.get("vipps_verified_at") as string || undefined,
    };

    // Validate required fields
    if (!applicationData.name || !applicationData.email || !applicationData.job_title) {
      return NextResponse.json(
        { error: "Mangler påkrevde felt (navn, e-post, stilling)" },
        { status: 400 }
      );
    }

    // Validate Vipps verification
    if (!applicationData.vipps_verified) {
      return NextResponse.json(
        { error: "Vipps-verifisering er påkrevd" },
        { status: 400 }
      );
    }

    // Handle CV file
    const cvFile = formData.get("cv") as File | null;
    let cvPath: string | null = null;
    let cvBuffer: Buffer | null = null;

    if (cvFile && cvFile.size > 0) {
      // Validate CV
      const cvName = (cvFile.name || "CV.pdf").toLowerCase();
      if (!cvName.endsWith(".pdf")) {
        return NextResponse.json(
          { error: "CV må være en PDF-fil" },
          { status: 400 }
        );
      }
      if (cvFile.size > 4 * 1024 * 1024) {
        return NextResponse.json(
          { error: "CV-filen er for stor (maks 4 MB)" },
          { status: 400 }
        );
      }

      // Create storage path
      const submittedAt = new Date().toISOString();
      const storageBase = createHash("sha256")
        .update(`${applicationData.email.toLowerCase()}|${submittedAt}|job-application`)
        .digest("hex");
      cvPath = `job-applications/${storageBase}.pdf`;

      cvBuffer = Buffer.from(await cvFile.arrayBuffer());

      // Upload to Supabase storage
      try {
        await uploadSupabaseObject({
          bucket: "candidates-private",
          object: cvPath,
          body: cvBuffer,
          contentType: "application/pdf",
        });
        logger.debug("✅ CV uploaded to Supabase", { cvPath });
      } catch (error) {
        logger.error("❌ Failed to upload CV to Supabase", error);
        // Continue - CV will be sent as email attachment
      }
    }

    // Store in local database
    try {
      await insertSupabaseRow({
        table: "job_applications",
        payload: {
          job_posting_id: applicationData.job_id,
          name: applicationData.name,
          email: applicationData.email,
          phone: applicationData.phone,
          cover_letter: applicationData.cover_letter || null,
          cv_key: cvPath,
          vipps_verified: applicationData.vipps_verified,
          vipps_sub: applicationData.vipps_sub || null,
          vipps_phone: applicationData.phone,
          vipps_name: applicationData.name,
          vipps_verified_at: applicationData.vipps_verified_at || null,
          source: "web",
          user_agent: null,
          status: "new",
        },
      });
      logger.info("✅ Job application stored in local database");
    } catch (error) {
      logger.error("❌ Failed to store job application in local database", { error: String(error) });
    }

    // Sync to AdminCrew
    try {
      const adminRes = await fetch(
        `${process.env.NEXT_PUBLIC_ADMIN_URL || "https://admincrew.no"}/api/job-applications`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            job_posting_id: applicationData.job_id,
            name: applicationData.name,
            email: applicationData.email,
            phone: applicationData.phone,
            cover_letter: applicationData.cover_letter || null,
            cv_key: cvPath,
            vipps_verified: applicationData.vipps_verified,
            vipps_sub: applicationData.vipps_sub || null,
            vipps_phone: applicationData.phone,
            vipps_name: applicationData.name,
            vipps_verified_at: applicationData.vipps_verified_at || null,
          }),
        }
      );
      if (adminRes.ok) {
        logger.debug("✅ Job application synced to AdminCrew");
      } else {
        logger.warn("⚠️ AdminCrew sync failed", { status: adminRes.status });
      }
    } catch (err) {
      logger.warn("⚠️ AdminCrew sync error", { error: String(err) });
    }

    // Build email content
    const submittedAt = new Date().toLocaleString("nb-NO", {
      timeZone: "Europe/Oslo",
      dateStyle: "long",
      timeStyle: "short",
    });

    const textContent = `
NY JOBBSØKNAD

Stilling: ${applicationData.job_title}
Selskap: ${applicationData.job_company}
Lokasjon: ${applicationData.job_location}

SØKER
Navn: ${applicationData.name}
E-post: ${applicationData.email}
Telefon: ${applicationData.phone}
Verifisert med Vipps: ${applicationData.vipps_verified ? "Ja" : "Nei"}

SØKNADSTEKST
${applicationData.cover_letter || "(Ingen søknadstekst)"}

---
Mottatt: ${submittedAt}
Job ID: ${applicationData.job_id}
`.trim();

    const htmlContent = `
<div style="font-family: ui-sans-serif, system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6;">
  <h2 style="color: #0f172a; margin: 0 0 16px;">Ny jobbsøknad</h2>

  <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
    <h3 style="margin: 0 0 8px; color: #0369a1;">Stilling</h3>
    <p style="margin: 0;"><strong>${escHtml(applicationData.job_title)}</strong></p>
    <p style="margin: 4px 0 0; color: #64748b;">${escHtml(applicationData.job_company)} • ${escHtml(applicationData.job_location)}</p>
  </div>

  <div style="background: #f0f9ff; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
    <h3 style="margin: 0 0 8px; color: #0369a1;">Søker</h3>
    <table style="border-collapse: collapse;">
      <tr><td style="padding: 4px 16px 4px 0; color: #64748b;">Navn</td><td style="padding: 4px 0;"><strong>${escHtml(applicationData.name)}</strong></td></tr>
      <tr><td style="padding: 4px 16px 4px 0; color: #64748b;">E-post</td><td style="padding: 4px 0;">${escHtml(applicationData.email)}</td></tr>
      <tr><td style="padding: 4px 16px 4px 0; color: #64748b;">Telefon</td><td style="padding: 4px 0;">${escHtml(applicationData.phone)}</td></tr>
      <tr><td style="padding: 4px 16px 4px 0; color: #64748b;">Verifisert</td><td style="padding: 4px 0; color: #059669;">✓ Vipps/BankID</td></tr>
    </table>
  </div>

  ${applicationData.cover_letter ? `
  <div style="margin-bottom: 16px;">
    <h3 style="margin: 0 0 8px; color: #0369a1;">Søknadstekst</h3>
    <p style="margin: 0; white-space: pre-wrap; background: #fff; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px;">${escHtml(applicationData.cover_letter)}</p>
  </div>
  ` : ""}

  <p style="margin: 24px 0 0; padding-top: 16px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 12px;">
    Mottatt: ${submittedAt}<br>
    Job ID: ${applicationData.job_id}
  </p>
</div>
`.trim();

    // Prepare attachments
    const attachments: { filename: string; content: string; contentType?: string }[] = [];
    if (cvBuffer) {
      attachments.push({
        filename: `CV_${applicationData.name.replace(/\s+/g, "_")}.pdf`,
        content: cvBuffer.toString("base64"),
        contentType: "application/pdf",
      });
    }

    // Send notification email
    try {
      const emailResult = await sendNotificationEmail({
        subject: `Jobbsøknad: ${applicationData.job_title} - ${applicationData.name}`,
        text: textContent,
        html: htmlContent,
        replyTo: applicationData.email,
        attachments,
      });
      if (emailResult) {
        logger.info("✅ Email notification sent", { emailId: (emailResult as { data?: { id?: string } }).data?.id });
      } else {
        logger.warn("⚠️ Email not sent - check RESEND_API_KEY configuration");
      }
    } catch (emailErr) {
      logger.error("❌ Failed to send email notification", { error: String(emailErr) });
      // Continue - application is stored, email failure shouldn't block submission
    }

    logger.info("✅ Job application submitted successfully", {
      job_id: applicationData.job_id,
      job_title: applicationData.job_title,
      applicant: applicationData.name,
    });

    return NextResponse.json({
      success: true,
      message: "Søknaden er sendt!",
    });

  } catch (err: unknown) {
    logger.error("❌ Error processing job application", err);
    return NextResponse.json(
      { error: "Noe gikk galt. Prøv igjen senere." },
      { status: 500 }
    );
  }
}

function escHtml(s: string = "") {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getClientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip") || "unknown";
}
