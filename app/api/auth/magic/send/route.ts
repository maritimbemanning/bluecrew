import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit } from "@/app/lib/server/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-real-ip") ||
      (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
      "unknown";
    const rl = await enforceRateLimit(`magic:send:${ip}`);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { email, returnTo } = (await request.json().catch(() => ({}))) as {
      email?: string;
      returnTo?: string;
    };

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "E-post mangler" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!baseUrl || !anon) {
      return NextResponse.json({ error: "Supabase ikke konfigurert" }, { status: 500 });
    }

    const origin = new URL(request.url).origin;
    const redirect = `${origin}/auth/confirm${returnTo ? `?return=${encodeURIComponent(returnTo)}` : ""}`;

    const res = await fetch(`${baseUrl}/auth/v1/otp`, {
      method: "POST",
      headers: {
        apikey: anon,
        Authorization: `Bearer ${anon}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, create_user: true, redirect_to: redirect }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json({ error: text || "Kunne ikke sende lenke" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Serverfeil" }, { status: 500 });
  }
}
