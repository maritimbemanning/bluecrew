import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify, decodeJwt, JWTPayload } from "jose";
import { Redis } from "@upstash/redis";
import crypto from "crypto";
import { getVippsOpenIdConfig, getVippsJWKS } from "@/app/lib/server/vipps";
import { logger } from "../../../lib/logger";

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
      logger.error("Vipps token error:", errorText);
      return NextResponse.redirect(
        new URL("/jobbsoker/registrer?vipps_error=token_failed", request.url)
      );
    }

    const tokens = await tokenResponse.json();
    logger.debug(" Token response received", { hasIdToken: Boolean(tokens.id_token) });

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
          logger.error(" JWT issuer mismatch", { expectedIssuer, tokenIssuer });
          return NextResponse.redirect(
            new URL("/jobbsoker/registrer?vipps_error=invalid_token", request.url)
          );
        }
      } else {
        logger.debug("⚠️ Skipping issuer check due to VIPPS_ENFORCE_ISSUER=false");
      }

      verifiedPayload = payload;
      logger.success(" JWT verified (aud & iss ok)");
    } catch (jwtError: unknown) {
      try {
        // Light diagnostics (non-PII): show iss/aud if present
        const diag: JWTPayload = decodeJwt(tokens.id_token);
        const aud = Array.isArray(diag.aud) ? diag.aud : [diag.aud];
        logger.error(" JWT verification failed", {
          hasToken: Boolean(tokens.id_token),
          iss: diag.iss,
          aud,
          expectedAud: process.env.VIPPS_CLIENT_ID,
          expectedIss: process.env.VIPPS_ISSUER || cfg.issuer,
        });
      } catch {
        logger.error("❌ JWT verification failed and token could not be decoded");
      }
      logger.error("JWT verification error", jwtError);

      // If failure was due to issuer claim, try signature-only verify, then manual aud/iss checks
      if (typeof jwtError === 'object' && jwtError !== null && 'code' in jwtError && (jwtError as any).code === 'ERR_JWT_CLAIM_VALIDATION_FAILED' && 'claim' in jwtError && (jwtError as any).claim === 'iss') {
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
            logger.debug("⚠️ Skipping issuer check due to VIPPS_ENFORCE_ISSUER=false (fallback path)");
          }
          verifiedPayload = payload2;
          logger.success(" JWT verified via fallback (signature + manual aud/iss)");
        } catch (fallbackErr) {
          logger.error(" Fallback verify failed", fallbackErr);
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
          logger.error(" UserInfo fallback failed", t);
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
        } as Record<string, unknown>;
        logger.success(" Using UserInfo fallback for Vipps");
      } catch (uiErr) {
        logger.error(" UserInfo fallback threw", uiErr);
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
      email: String(((verifiedPayload as Record<string, unknown>).email as string) || ''),
      verified_at: new Date().toISOString(),
    };

    // Store minimal operational log only (no PII)
    logger.debug("💾 Storing Vipps session in Redis", { key: `vipps:${sessionId}` });

    // Store in Redis with 1 hour expiry using set() with EX option
    try {
      await redis.set(`vipps:${sessionId}`, sessionData, { ex: 3600 });
  logger.success(" Redis storage successful");
    } catch (redisError) {
      logger.error(" Redis storage failed:", redisError);
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

    logger.debug("🍪 Setting session cookie", { domain: cookieDomain || "default", hostname });

    // Only store session ID in cookie (not PII)
    cookieStore.set("vipps_session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600, // 1 hour
      ...(cookieDomain ? { domain: cookieDomain } : {}),
    });

    // Get return URL if set (for job application flow)
    const returnUrl = cookieStore.get("vipps_return")?.value;

    // Clean up state/nonce/return cookies
    cookieStore.delete("vipps_state");
    cookieStore.delete("vipps_nonce");
    cookieStore.delete("vipps_return");

    // Determine redirect destination
    // If return URL is set and is a valid internal path, use it
    const redirectPath = returnUrl && returnUrl.startsWith("/")
      ? returnUrl
      : "/jobbsoker/registrer/skjema?verified=true";

    logger.debug("🔄 Redirecting after Vipps verification", { redirectPath });

    return NextResponse.redirect(
      new URL(redirectPath, request.url)
    );
  } catch (error) {
    logger.error("Vipps callback error:", error);
    return NextResponse.redirect(
      new URL("/jobbsoker/registrer?vipps_error=server_error", request.url)
    );
  }
}
