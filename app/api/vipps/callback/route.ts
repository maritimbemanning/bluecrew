import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

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

type JwtPayload = {
  email?: string;
  phone_number?: string;
  [key: string]: unknown;
};

function decodeJwtPayload(idToken: string): JwtPayload | null {
  const parts = idToken.split(".");
  if (parts.length < 2) return null;
  const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
  try {
    const json = Buffer.from(payload, "base64").toString("utf8");
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

function isAllowedUser(email?: string | null, _phone?: string | null) {
  const allow = (process.env.ADMIN_ALLOWED_EMAILS || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (email && allow.includes(email.toLowerCase())) return true;
  return false;
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

    if (error) {
      return NextResponse.redirect(new URL(`/?auth=error&reason=${encodeURIComponent(error)}`, url.origin));
    }

    if (!code || !state) {
      return NextResponse.redirect(new URL("/?auth=error", url.origin));
    }

    const store = await cookies();
    const savedState = store.get("vipps_state")?.value;
    if (!savedState || state !== savedState) {
      return NextResponse.redirect(new URL("/?auth=error", url.origin));
    }

  const clientId = process.env.VIPPS_CLIENT_ID!;
    const clientSecret = process.env.VIPPS_CLIENT_SECRET!;
    const subscriptionKey = process.env.VIPPS_SUBSCRIPTION_KEY!;

    if (!clientId || !clientSecret || !subscriptionKey) {
      return NextResponse.redirect(new URL("/?auth=error", url.origin));
    }

    const origin = new URL(request.url).origin;
    const derivedRedirect = `${origin}/api/vipps/callback`;
    const redirectUri = process.env.VIPPS_REDIRECT_URI && process.env.VIPPS_REDIRECT_URI.startsWith(origin)
      ? process.env.VIPPS_REDIRECT_URI
      : derivedRedirect;

    const cfg = await getVippsOpenIdConfig();

    const tokenResp = await fetch(cfg.token_endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResp.ok) {
      return NextResponse.redirect(new URL("/?auth=error", url.origin));
    }

  const tokenJson = await tokenResp.json();
  const idToken = tokenJson.id_token as string | undefined;
    const payload = idToken ? decodeJwtPayload(idToken) : null;

  const email: string | undefined = payload?.email || undefined;
    // Determine intent (admin or candidate)
    const intentRaw = store.get("vipps_intent")?.value || "";
    let intent: { flow?: string; returnTo?: string } = {};
    try {
      intent = JSON.parse(Buffer.from(intentRaw, "base64url").toString("utf8"));
    } catch {}
    const flow = (intent.flow || "candidate").toLowerCase();
    const returnTo = intent.returnTo || "/";

    if (flow === "admin") {
      const phone: string | undefined = payload?.phone_number || undefined;
      if (!isAllowedUser(email, phone)) {
        return NextResponse.redirect(new URL("/?auth=denied", url.origin));
      }
      const expectedToken = process.env.ADMIN_TOKEN;
      if (!expectedToken) {
        return NextResponse.redirect(new URL("/?auth=error", url.origin));
      }
      store.set("admin-token", expectedToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 6,
        path: "/",
      });
      return NextResponse.redirect(new URL("/admin", url.origin));
    }

    // Candidate flow: everyone is allowed to proceed
    store.set("candidate-session", email || "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.redirect(new URL(returnTo, url.origin));
  } catch {
    return NextResponse.redirect(new URL("/?auth=error", new URL(request.url).origin));
  }
}
