import { NextResponse } from "next/server";
import { enforceRateLimit } from "@/app/lib/server/rate-limit";
import { supabaseServer } from "@/app/lib/server/supabase";
import { sendInterestReceipt, sendNotificationEmail } from "@/app/lib/server/email";
import { requireCsrfToken } from "../../lib/server/csrf"; // TODO: Re-enable CSRF
import { logger } from "../../lib/logger";

export const runtime = "nodejs";

function parseBody(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return Object.fromEntries(new URLSearchParams(text));
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

export async function POST(req: Request) {
  try {
    // CSRF Protection
    try {
      await requireCsrfToken(req);
    } catch (error) {
      logger.error("CSRF validation failed:", error);
      return NextResponse.json(
        { error: "Ugyldig forespørsel. Vennligst last inn siden på nytt og prøv igjen." },
        { status: 403 }
      );
    }

    const rateKey = `interest:${getClientIp(req)}`;
    const rate = await enforceRateLimit(rateKey);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "For mange forespørsler. Prøv igjen om litt." },
        { status: 429, headers: { "Retry-After": String(rate.resetSeconds || 60) } },
      );
    }

    const raw = await req.text();
    const body = parseBody(raw);

    // Honeypot
    if (typeof body.company === "string" && body.company.trim()) {
      return new Response(null, { status: 204 });
    }

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const role = String(body.role || "").trim();
    const region = String(body.region || "").trim() || null;
    const experience = body.experience ? Number(body.experience) : null;
    const certificates = String(body.certificates || "").trim() || null;
    const notes = String(body.notes || "").trim() || null;
    const start_from = String(body.start_from || "").trim() || null;
    const consent = body.consent === true || body.consent === "on";
    const source = String(body.source || "meld-interesse");
    const ip = getClientIp(req);
    const user_agent = req.headers.get("user-agent") || null;

    const errors: string[] = [];
    if (name.length < 2) errors.push("Oppgi fullt navn.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Oppgi gyldig e-post.");
    if (!role) errors.push("Velg rolle.");
    if (!consent) errors.push("Samtykke mangler.");
    if (errors.length) {
      return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
    }

    // Store in Supabase (best effort)
    try {
      await supabaseServer().from("candidate_interest").insert({
        name,
        email,
        phone: phone || null,
        role,
        region,
        experience,
        certificates,
        notes,
        start_from,
        consent: true,
        source,
        ip,
        user_agent,
        honey: "",
      });
    } catch (e) {
      logger.error("Supabase insert feilet (candidate_interest):", e);
      // continue with email notifications even if DB fails
    }

    // Internal notification - MUST succeed
    try {
      const emailResult = await sendNotificationEmail({
        subject: "Ny interesse fra kandidat",
        text: [
          "NY INTERESSE",
          `Navn: ${name}`,
          `E-post: ${email}`,
          `Telefon: ${phone || "-"}`,
          `Rolle: ${role}`,
          `Region: ${region || "-"}`,
          `Erfaring: ${experience ?? "-"}`,
          `Oppstart: ${start_from || "-"}`,
          `Sertifikater: ${certificates || "-"}`,
          `Tilleggsinfo: ${notes || "-"}`,
        ].join("\n"),
      });

      if (!emailResult) {
        logger.error("[submit-interest] sendNotificationEmail returned null - email not configured");
        return NextResponse.json({ error: "E-post er ikke konfigurert. Kontakt oss på post@bluecrew.no" }, { status: 500 });
      }

      logger.info("[submit-interest] Notification email sent successfully", { id: emailResult?.data?.id });
    } catch (emailError) {
      logger.error("[submit-interest] Failed to send notification email:", emailError);
      return NextResponse.json({ error: "Kunne ikke sende e-post. Prøv igjen eller kontakt oss direkte." }, { status: 500 });
    }

    // Candidate receipt - best effort (don't fail if this fails)
    try {
      await sendInterestReceipt({ name, email });
      logger.info("[submit-interest] Receipt sent to candidate", { email });
    } catch (receiptError) {
      logger.error("[submit-interest] Failed to send receipt (non-critical):", receiptError);
    }

    // Respond
    const wantsJson = (req.headers.get("accept") || "").includes("application/json");
    if (wantsJson) {
      return NextResponse.json({ ok: true });
    }
    const back = new URL("/?interest=ok", req.url);
    return NextResponse.redirect(back, { status: 303 });
  } catch (err) {
    logger.error("[/api/submit-interest] uventet feil:", err);
    return NextResponse.json({ error: "Uventet feil" }, { status: 500 });
  }
}
