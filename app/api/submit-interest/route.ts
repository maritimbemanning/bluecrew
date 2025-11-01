import { NextResponse } from "next/server";
import { enforceRateLimit } from "@/app/lib/server/rate-limit";
import { supabaseServer } from "@/app/lib/server/supabase";
import { sendInterestReceipt, sendNotificationEmail } from "@/app/lib/server/email";

export const runtime = "nodejs";

function parseBody(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return Object.fromEntries(new URLSearchParams(text) as any);
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
      console.error("Supabase insert feilet (candidate_interest):", e);
      // continue with email notifications even if DB fails
    }

    // Internal notification
    await sendNotificationEmail({
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

    // Candidate receipt
    await sendInterestReceipt({ name, email });

    // Respond
    const wantsJson = (req.headers.get("accept") || "").includes("application/json");
    if (wantsJson) {
      return NextResponse.json({ ok: true });
    }
    const back = new URL("/?interest=ok", req.url);
    return NextResponse.redirect(back, { status: 303 });
  } catch (err) {
    console.error("[/api/submit-interest] uventet feil:", err);
    return NextResponse.json({ error: "Uventet feil" }, { status: 500 });
  }
}
