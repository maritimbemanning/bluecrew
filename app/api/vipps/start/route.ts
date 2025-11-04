import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { enforceRateLimit } from "@/app/lib/server/rate-limit";

async function getVippsOpenIdConfig() {
  const issuer = process.env.VIPPS_ISSUER;
  if (!issuer) throw new Error("VIPPS_ISSUER missing");
  const wellKnown = issuer.endsWith("/.well-known/openid-configuration")
    ? issuer
    : `${issuer.replace(/\/$/, "")}/.well-known/openid-configuration`;
  const res = await fetch(wellKnown, { cache: "no-store" });
  if (!res.ok) throw new Error(`Vipps discovery failed: ${res.status}`);
  return res.json();
}

export async function GET(request: NextRequest) {
  try {
    // Basic per-IP rate limit to protect the auth start endpoint
    const ip =
      request.headers.get("x-real-ip") ||
      (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
      "unknown";
    const rl = await enforceRateLimit(`vipps:start:${ip}`);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
    }

  const url = new URL(request.url);
  const origin = url.origin;
  const flow = (url.searchParams.get("flow") || "candidate").toLowerCase();
  const returnTo = url.searchParams.get("return") || "/";

    // Derive redirect URI if not explicitly set (so preview envs work)
    const derivedRedirect = `${origin}/api/vipps/callback`;
    const redirectUri = process.env.VIPPS_REDIRECT_URI && process.env.VIPPS_REDIRECT_URI.startsWith(origin)
      ? process.env.VIPPS_REDIRECT_URI
      : derivedRedirect;

    const clientId = process.env.VIPPS_CLIENT_ID;
    const subscriptionKey = process.env.VIPPS_SUBSCRIPTION_KEY; // required for Vipps

    if (!clientId || !subscriptionKey) {
      const fallback = new URL("/jobbsoker/registrer/vipps-feil?reason=config", origin);
      return NextResponse.redirect(fallback);
    }

    const state = crypto.randomUUID();
    const nonce = crypto.randomUUID();

    const store = await cookies();
    store.set("vipps_state", state, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 600 });
    store.set("vipps_nonce", nonce, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 600 });
  // remember intent (admin or candidate) and return path
  const intent = Buffer.from(JSON.stringify({ flow, returnTo }), "utf8").toString("base64url");
  store.set("vipps_intent", intent, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 600 });

    let cfg: { authorization_endpoint?: string } | null = null;
    try {
      cfg = (await getVippsOpenIdConfig()) as { authorization_endpoint?: string };
    } catch {
      const fallback = new URL("/jobbsoker/registrer/vipps-feil?reason=discovery", origin);
      return NextResponse.redirect(fallback);
    }

    const params = new URLSearchParams({
      client_id: clientId,
      response_type: "code",
      redirect_uri: redirectUri,
      scope: "openid name phoneNumber birthDate email",
      state,
      nonce,
    });

    const authUrl = `${cfg.authorization_endpoint}?${params.toString()}`;
    return NextResponse.redirect(authUrl);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "start failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
