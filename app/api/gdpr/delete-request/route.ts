/**
 * GDPR Delete Request API
 * Route: POST /api/gdpr/delete-request
 *
 * Handles user requests to delete their personal data.
 * SECURITY: Requires Clerk authentication to prevent unauthorized deletion requests.
 * Sends notification email to admin for processing.
 */

import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { sendNotificationEmail } from "@/app/lib/server/email";
import { enforceRateLimit } from "@/app/lib/server/rate-limit";
import { logger } from "@/app/lib/logger";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // SECURITY: Require authentication
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Du må være innlogget for å sende en slettforespørsel" },
        { status: 401 }
      );
    }

    // Rate limit (per user, not just IP)
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const rateLimit = await enforceRateLimit(`gdpr-delete:${user.id}:${ip}`);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "For mange forespørsler. Prøv igjen senere." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { vipps_sub, name, phone, email } = body;

    // SECURITY: Verify user owns this email or log discrepancy
    const userEmail = user.emailAddresses[0]?.emailAddress?.toLowerCase();
    const requestedEmail = email?.toLowerCase();
    if (requestedEmail && userEmail && requestedEmail !== userEmail) {
      logger.warn("GDPR request email mismatch", {
        userId: user.id,
        userEmail,
        requestedEmail,
      });
      // Allow but flag for admin review
    }

    if (!vipps_sub || !name) {
      return NextResponse.json(
        { error: "Mangler påkrevde felt" },
        { status: 400 }
      );
    }

    // Send notification email to admin
    await sendNotificationEmail({
      subject: `[GDPR] Slettforespørsel - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #dc2626; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 12px; }
            .label { font-weight: bold; color: #64748b; font-size: 12px; text-transform: uppercase; }
            .value { font-size: 16px; }
            .warning { background: #fef2f2; border: 1px solid #fecaca; padding: 16px; border-radius: 8px; margin-top: 20px; }
            .footer { margin-top: 20px; font-size: 12px; color: #64748b; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">🗑️ GDPR Slettforespørsel</h2>
            </div>
            <div class="content">
              <p>En bruker har bedt om sletting av sine personopplysninger i henhold til GDPR Art. 17.</p>

              <div class="field">
                <div class="label">Navn</div>
                <div class="value">${name}</div>
              </div>

              <div class="field">
                <div class="label">Telefon</div>
                <div class="value">${phone || "Ikke oppgitt"}</div>
              </div>

              <div class="field">
                <div class="label">E-post</div>
                <div class="value">${email || "Ikke oppgitt"}</div>
              </div>

              <div class="field">
                <div class="label">Vipps ID</div>
                <div class="value" style="font-family: monospace; font-size: 14px;">${vipps_sub}</div>
              </div>

              <div class="field">
                <div class="label">Clerk User ID</div>
                <div class="value" style="font-family: monospace; font-size: 14px;">${user.id}</div>
              </div>

              <div class="warning">
                <strong>⚠️ Påkrevd handling</strong><br>
                I henhold til GDPR må denne forespørselen behandles innen 30 dager.
                <br><br>
                <strong>Sjekkliste:</strong>
                <ul style="margin: 8px 0; padding-left: 20px;">
                  <li>Slett fra <code>candidates</code> tabell</li>
                  <li>Slett fra <code>candidate_interest</code> tabell</li>
                  <li>Slett fra <code>job_applications</code> tabell</li>
                  <li>Slett filer fra Supabase Storage (CV, sertifikater)</li>
                  <li>Send bekreftelse til bruker</li>
                </ul>
              </div>
            </div>
            <div class="footer">
              Mottatt: ${new Date().toLocaleString("nb-NO", { timeZone: "Europe/Oslo" })}<br>
              IP: ${ip}
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
GDPR Slettforespørsel

En bruker har bedt om sletting av sine personopplysninger.

Navn: ${name}
Telefon: ${phone || "Ikke oppgitt"}
E-post: ${email || "Ikke oppgitt"}
Vipps ID: ${vipps_sub}
Clerk User ID: ${user.id}

Denne forespørselen må behandles innen 30 dager i henhold til GDPR Art. 17.

Mottatt: ${new Date().toISOString()}
      `,
    });

    logger.info("GDPR delete request received", { vipps_sub, name });

    return NextResponse.json({
      success: true,
      message: "Slettforespørsel mottatt. Vi behandler den innen 30 dager.",
    });
  } catch (error) {
    logger.error("GDPR delete request error:", error);
    return NextResponse.json(
      { error: "Kunne ikke sende forespørsel" },
      { status: 500 }
    );
  }
}
