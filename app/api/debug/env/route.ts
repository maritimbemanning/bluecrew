import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

type EnvCheck = {
  NEXT_PUBLIC_SUPABASE_URL: boolean;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: boolean;
  SUPABASE_SERVICE_ROLE_KEY: boolean;
  UPSTASH_REDIS_REST_URL: boolean;
  UPSTASH_REDIS_REST_TOKEN: boolean;
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: boolean;
};

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const cookieStore = await cookies();
  const checks: EnvCheck = {
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    UPSTASH_REDIS_REST_URL: !!process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: !!process.env.UPSTASH_REDIS_REST_TOKEN,
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN: !!process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  };

  return NextResponse.json({
    ok: Object.values(checks).every(Boolean),
    ...checks,
    _vipps:
      {
        host: url.host,
        origin: url.origin,
        env: {
          hasClientId: Boolean(process.env.VIPPS_CLIENT_ID),
          hasClientSecret: Boolean(process.env.VIPPS_CLIENT_SECRET),
          hasSubKey: Boolean(process.env.VIPPS_SUBSCRIPTION_KEY),
          hasApiBase: Boolean(process.env.VIPPS_API_BASE_URL),
          issuer: process.env.VIPPS_ISSUER || null,
          redirectUri: process.env.VIPPS_REDIRECT_URI || null,
        },
        redirect: {
          derived: `${url.origin}/api/vipps/callback`,
          usingEnv: (process.env.VIPPS_REDIRECT_URI || "").startsWith(url.origin),
        },
        cookies: {
          hasVippsSessionId: Boolean(cookieStore.get("vipps_session_id")?.value),
          hasVippsState: Boolean(cookieStore.get("vipps_state")?.value),
          hasVippsNonce: Boolean(cookieStore.get("vipps_nonce")?.value),
        },
      },
  });
}
