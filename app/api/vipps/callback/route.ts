import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify, createRemoteJWKSet } from "jose";
import { Redis } from "@upstash/redis";
import crypto from "crypto";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Vipps OpenID base and JWKS endpoint for signature verification
const VIPPS_OPENID_BASE = `${process.env.VIPPS_API_BASE_URL}/access-management-1.0/access`;
const VIPPS_JWKS_URL = `${VIPPS_OPENID_BASE}/.well-known/jwks.json`;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL(`/jobbsoker/registrer?vipps_error=${error}`, request.url)
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      new URL("/jobbsoker/registrer?vipps_error=missing_params", request.url)
    );
  }

  // Verify state matches
  const cookieStore = await cookies();
  const storedState = cookieStore.get("vipps_state")?.value;
  const storedNonce = cookieStore.get("vipps_nonce")?.value;

  if (state !== storedState) {
    return NextResponse.redirect(
      new URL("/jobbsoker/registrer?vipps_error=invalid_state", request.url)
    );
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch(
      `${process.env.VIPPS_API_BASE_URL}/access-management-1.0/access/oauth2/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${process.env.VIPPS_CLIENT_ID}:${process.env.VIPPS_CLIENT_SECRET}`
          ).toString("base64")}`,
          "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: process.env.VIPPS_REDIRECT_URI!,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Vipps token error:", errorText);
      return NextResponse.redirect(
        new URL("/jobbsoker/registrer?vipps_error=token_failed", request.url)
      );
    }

    const tokens = await tokenResponse.json();

    // ✅ SECURE: Verify ID token signature with Vipps JWKS
  const JWKS = createRemoteJWKSet(new URL(VIPPS_JWKS_URL));
    
    let verifiedPayload;
    try {
      const { payload } = await jwtVerify(tokens.id_token, JWKS, {
        issuer: process.env.VIPPS_ISSUER || VIPPS_OPENID_BASE,
        audience: process.env.VIPPS_CLIENT_ID,
      });
      verifiedPayload = payload;
    } catch (jwtError) {
      console.error("❌ JWT verification failed:", jwtError);
      return NextResponse.redirect(
        new URL("/jobbsoker/registrer?vipps_error=invalid_token", request.url)
      );
    }

    // Verify nonce
    if (verifiedPayload.nonce !== storedNonce) {
      return NextResponse.redirect(
        new URL("/jobbsoker/registrer?vipps_error=invalid_nonce", request.url)
      );
    }

    // Generate secure session ID and store PII server-side
    const sessionId = crypto.randomUUID();
    const vippsData = {
      sub: verifiedPayload.sub,
      name: verifiedPayload.name,
      phone_number: verifiedPayload.phone_number,
      birthdate: verifiedPayload.birthdate,
      verified_at: new Date().toISOString(),
    };

    // Store in Redis with 1 hour expiry
    try {
      await redis.setex(`vipps:${sessionId}`, 3600, JSON.stringify(vippsData));
    } catch (redisError) {
      console.error("⚠️ Redis storage failed:", redisError);
      // Fallback: continue without session (user will need to re-verify)
    }

    // Ensure cookies work across apex and www in production
    const hostname = new URL(request.url).hostname;
    const cookieDomain =
      process.env.NODE_ENV === "production" && hostname.endsWith("bluecrew.no")
        ? ".bluecrew.no"
        : undefined;

    // Only store session ID in cookie (not PII)
    cookieStore.set("vipps_session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600, // 1 hour
      ...(cookieDomain ? { domain: cookieDomain } : {}),
    });

    // Clean up state/nonce cookies
    cookieStore.delete("vipps_state");
    cookieStore.delete("vipps_nonce");

    return NextResponse.redirect(
      new URL("/jobbsoker/registrer/skjema?verified=true", request.url)
    );
  } catch (error) {
    console.error("Vipps callback error:", error);
    return NextResponse.redirect(
      new URL("/jobbsoker/registrer?vipps_error=server_error", request.url)
    );
  }
}
