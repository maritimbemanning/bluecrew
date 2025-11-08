import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getVippsOpenIdConfig } from "@/app/lib/server/vipps";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("vipps_session_id")?.value;
  const vippsState = cookieStore.get("vipps_state")?.value;
  const vippsNonce = cookieStore.get("vipps_nonce")?.value;

  const currentOrigin = url.origin;
  const derivedRedirect = `${currentOrigin}/api/vipps/callback`;
  const envRedirect = process.env.VIPPS_REDIRECT_URI || null;

  // Try discovery to reveal the live issuer quickly (helps set VIPPS_ISSUER)
  let discoveryIssuer: string | null = null;
  try {
    const cfg = await getVippsOpenIdConfig();
    discoveryIssuer = cfg.issuer || null;
  } catch (err) {
    discoveryIssuer = null;
  }

  return NextResponse.json({
    ok: true,
    host: url.host,
    origin: currentOrigin,
    env: {
      hasClientId: Boolean(process.env.VIPPS_CLIENT_ID),
      hasClientSecret: Boolean(process.env.VIPPS_CLIENT_SECRET),
      hasSubKey: Boolean(process.env.VIPPS_SUBSCRIPTION_KEY),
      hasApiBase: Boolean(process.env.VIPPS_API_BASE_URL),
      issuer: process.env.VIPPS_ISSUER || null,
      enforceIssuer: String(process.env.VIPPS_ENFORCE_ISSUER ?? "false").toLowerCase() === "true",
      allowUserInfoFallback: String(process.env.VIPPS_ALLOW_USERINFO_FALLBACK ?? "true").toLowerCase() === "true",
      discoveryIssuer,
      redirectUri: envRedirect,
    },
    redirect: {
      derivedRedirect,
      usingEnv: envRedirect?.startsWith(currentOrigin) ?? false,
    },
    cookies: {
      hasVippsSessionId: Boolean(sessionId),
      hasVippsState: Boolean(vippsState),
      hasVippsNonce: Boolean(vippsNonce),
    },
    now: new Date().toISOString(),
  });
}
