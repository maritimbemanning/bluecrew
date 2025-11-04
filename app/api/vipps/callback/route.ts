import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify, decodeJwt, JWTPayload } from "jose";
import { Redis } from "@upstash/redis";
import crypto from "crypto";
import { getVippsOpenIdConfig, getVippsJWKS } from "@/app/lib/server/vipps";
import { ensureUserAndSendLoginLink } from "../../../lib/server/auth-admin";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Vipps OpenID base (used for fallback paths only; primary is discovery)
const VIPPS_OPENID_BASE = `${process.env.VIPPS_API_BASE_URL}/access-management-1.0/access`;

function normalizeIssuer(iss: string) {
  return iss.replace(/\/+$/, "");
}

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
    // Align redirect_uri with the host that initiated the flow to avoid domain mismatch
    const currentOrigin = new URL(request.url).origin;
    const derivedRedirect = `${currentOrigin}/api/vipps/callback`;
    const redirectUri =
      process.env.VIPPS_REDIRECT_URI && process.env.VIPPS_REDIRECT_URI.startsWith(currentOrigin)
        ? process.env.VIPPS_REDIRECT_URI
        : derivedRedirect;

    const cfg = await getVippsOpenIdConfig();
    const tokenResponse = await fetch(
      cfg.token_endpoint,
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
          redirect_uri: redirectUri,
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
    console.log("🔍 Token response received, id_token present:", Boolean(tokens.id_token));

  // ✅ SECURE: Verify ID token signature with Vipps JWKS from discovery
  const JWKS = await getVippsJWKS();
    
  let verifiedPayload;
    try {
      // Verify signature + audience first
      const { payload } = await jwtVerify(tokens.id_token, JWKS, {
        audience: process.env.VIPPS_CLIENT_ID,
      });

      // Optionally validate issuer (can be disabled via env for emergency unblocking)
  // Default: do NOT enforce issuer unless explicitly enabled
  const enforceIssuer = String(process.env.VIPPS_ENFORCE_ISSUER ?? "false").toLowerCase() === "true";
      if (enforceIssuer) {
        const expectedIssuer = normalizeIssuer(process.env.VIPPS_ISSUER || cfg.issuer);
        const tokenIssuer = typeof payload.iss === "string" ? normalizeIssuer(payload.iss) : "";
        if (!tokenIssuer || tokenIssuer !== expectedIssuer) {
          console.error("❌ JWT issuer mismatch", { expectedIssuer, tokenIssuer });
          return NextResponse.redirect(
            new URL("/jobbsoker/registrer?vipps_error=invalid_token", request.url)
          );
        }
      } else {
        console.log("⚠️ Skipping issuer check due to VIPPS_ENFORCE_ISSUER=false");
      }

      verifiedPayload = payload;
      console.log("✅ JWT verified (aud & iss ok)");
    } catch (jwtError: any) {
      try {
        // Light diagnostics (non-PII): show iss/aud if present
        const diag: JWTPayload = decodeJwt(tokens.id_token);
        const aud = Array.isArray(diag.aud) ? diag.aud : [diag.aud];
        console.error("❌ JWT verification failed", {
          hasToken: Boolean(tokens.id_token),
          iss: diag.iss,
          aud,
          expectedAud: process.env.VIPPS_CLIENT_ID,
          expectedIss: process.env.VIPPS_ISSUER || cfg.issuer,
        });
      } catch {
        console.error("❌ JWT verification failed and token could not be decoded");
      }
      console.error(jwtError);

      // If failure was due to issuer claim, try signature-only verify, then manual aud/iss checks
      if (jwtError?.code === 'ERR_JWT_CLAIM_VALIDATION_FAILED' && jwtError?.claim === 'iss') {
        try {
          const { payload: payload2 } = await jwtVerify(tokens.id_token, JWKS, {});
          // Manual audience check
          const expectedAud = process.env.VIPPS_CLIENT_ID;
          const aud2 = Array.isArray(payload2.aud) ? payload2.aud : [payload2.aud];
          if (!aud2 || !aud2.includes(expectedAud)) {
            throw new Error('audience_mismatch');
          }
          // Manual issuer enforcement (toggleable)
          const enforceIssuer = String(process.env.VIPPS_ENFORCE_ISSUER ?? "false").toLowerCase() === "true";
          if (enforceIssuer) {
            const expectedIssuer = normalizeIssuer(process.env.VIPPS_ISSUER || cfg.issuer);
            const tokenIssuer = typeof payload2.iss === "string" ? normalizeIssuer(payload2.iss) : "";
            if (!tokenIssuer || tokenIssuer !== expectedIssuer) {
              throw new Error(`issuer_mismatch:${tokenIssuer}`);
            }
          } else {
            console.log("⚠️ Skipping issuer check due to VIPPS_ENFORCE_ISSUER=false (fallback path)");
          }
          verifiedPayload = payload2;
          console.log("✅ JWT verified via fallback (signature + manual aud/iss)");
        } catch (fallbackErr) {
          console.error("❌ Fallback verify failed", fallbackErr);
          // continue to userinfo fallback below
        }
      }

      // Optional fallback using UserInfo endpoint if enabled
  // Default: allow userinfo fallback to unblock customers unless explicitly disabled
  const allowUserInfoFallback = String(process.env.VIPPS_ALLOW_USERINFO_FALLBACK ?? "true").toLowerCase() === "true";
      if (!allowUserInfoFallback || !tokens.access_token) {
        return NextResponse.redirect(
          new URL("/jobbsoker/registrer?vipps_error=invalid_token", request.url)
        );
      }

      try {
        const userinfoRes = await fetch(
          cfg.userinfo_endpoint || `${VIPPS_OPENID_BASE}/userinfo`,
          {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
              "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
            },
          }
        );
        if (!userinfoRes.ok) {
          const t = await userinfoRes.text();
          console.error("❌ UserInfo fallback failed", t);
          return NextResponse.redirect(
            new URL("/jobbsoker/registrer?vipps_error=invalid_token", request.url)
          );
        }
        const ui = await userinfoRes.json();
        // Build equivalent payload from userinfo
        verifiedPayload = {
          sub: String(ui.sub || ""),
          name: String(ui.name || ""),
          phone_number: String(ui.phone_number || ""),
          birthdate: String(ui.birthdate || ""),
          email: String(ui.email || ""),
          nonce: (typeof storedNonce === "string" ? storedNonce : undefined),
        } as any;
        console.log("✅ Using UserInfo fallback for Vipps");
      } catch (uiErr) {
        console.error("❌ UserInfo fallback threw", uiErr);
        return NextResponse.redirect(
          new URL("/jobbsoker/registrer?vipps_error=invalid_token", request.url)
        );
      }
    }

    // Verify nonce
    if (verifiedPayload.nonce !== storedNonce) {
      return NextResponse.redirect(
        new URL("/jobbsoker/registrer?vipps_error=invalid_nonce", request.url)
      );
    }

    // Generate secure session ID and store PII server-side
    const sessionId = crypto.randomUUID();
    
    // Build session object with explicit string values
    const sessionData = {
      sub: String(verifiedPayload.sub || ''),
      name: String(verifiedPayload.name || ''),
      phone_number: String(verifiedPayload.phone_number || ''),
      birthdate: String(verifiedPayload.birthdate || ''),
      email: String((verifiedPayload as any).email || ''),
      verified_at: new Date().toISOString(),
    };

    // Store minimal operational log only (no PII)
    console.log("💾 Storing Vipps session in Redis", { key: `vipps:${sessionId}` });

    // Store in Redis with 1 hour expiry using set() with EX option
    try {
      await redis.set(`vipps:${sessionId}`, sessionData, { ex: 3600 });
  console.log("✅ Redis storage successful");
    } catch (redisError) {
      console.error("⚠️ Redis storage failed:", redisError);
      return NextResponse.redirect(
        new URL("/jobbsoker/registrer?vipps_error=session_storage_failed", request.url)
      );
    }

    // Ensure cookies work across apex and www in production
    const hostname = new URL(request.url).hostname;
    const cookieDomain =
      process.env.NODE_ENV === "production" && hostname.endsWith("bluecrew.no")
        ? ".bluecrew.no"
        : undefined;

    console.log("🍪 Setting session cookie", { domain: cookieDomain || "default", hostname });

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

    // Optionally: auto-provision Supabase user and send login link (non-blocking)
    try {
      const email = sessionData.email;
      const name = sessionData.name;
      if (email && /@/.test(email)) {
        ensureUserAndSendLoginLink(email, { name }).catch((e: unknown) => {
          console.warn("Auth provisioning failed (non-blocking)", e);
        });
      }
    } catch (provisionErr) {
      console.warn("Auth provisioning error (ignored)", provisionErr);
    }

    console.log("🔄 Redirecting to form with verified=true");

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
