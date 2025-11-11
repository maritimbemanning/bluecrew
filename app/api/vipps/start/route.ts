import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { getVippsOpenIdConfig } from "@/app/lib/server/vipps";
import { logger } from "../../../lib/logger";

export async function GET(request: NextRequest) {
  logger.debug("🚀 Vipps start endpoint called");

  // Validate environment variables
  if (!process.env.VIPPS_CLIENT_ID || !process.env.VIPPS_API_BASE_URL) {
    logger.error("❌ Missing Vipps environment variables");
    return NextResponse.redirect(
      new URL("/jobbsoker/registrer?vipps_error=missing_config", request.url)
    );
  }

  const state = crypto.randomBytes(16).toString("hex");
  const nonce = crypto.randomBytes(16).toString("hex");

  logger.success(" Generated state and nonce", { state, nonce });

  // Ensure cookies work across apex and www in production
  const hostname = new URL(request.url).hostname;
  const cookieDomain =
    process.env.NODE_ENV === "production" && hostname.endsWith("bluecrew.no")
      ? ".bluecrew.no"
      : undefined;

  // Store state and nonce in httpOnly cookies for security
  const cookieStore = await cookies();
  cookieStore.set("vipps_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600, // 10 minutes
    ...(cookieDomain ? { domain: cookieDomain } : {}),
  });
  cookieStore.set("vipps_nonce", nonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600,
    ...(cookieDomain ? { domain: cookieDomain } : {}),
  });

  // Prefer deriving redirect URI from the current host to avoid www/apex mismatches in prod.
  const currentOrigin = new URL(request.url).origin;
  const derivedRedirect = `${currentOrigin}/api/vipps/callback`;
  const redirectUri =
    // If VIPPS_REDIRECT_URI is set but points to another host than current, prefer current for stability
    process.env.VIPPS_REDIRECT_URI && process.env.VIPPS_REDIRECT_URI.startsWith(currentOrigin)
      ? process.env.VIPPS_REDIRECT_URI
      : derivedRedirect;

  const cfg = await getVippsOpenIdConfig();

  const params = new URLSearchParams({
    client_id: process.env.VIPPS_CLIENT_ID!,
    response_type: "code",
    // Request email so we can provision/login the user post-verification
    scope: "openid name phoneNumber birthDate email",
    state,
    nonce,
    redirect_uri: redirectUri,
  });

  const authUrl = `${cfg.authorization_endpoint}?${params}`;

  logger.debug("🔗 Redirecting to Vipps", { url: authUrl });

  return NextResponse.redirect(authUrl);
}
