import { NextResponse } from "next/server";

export const runtime = "nodejs";

type EnvCheck = {
  NEXT_PUBLIC_SUPABASE_URL: boolean;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: boolean;
  SUPABASE_SERVICE_ROLE_KEY: boolean;
  UPSTASH_REDIS_REST_URL: boolean;
  UPSTASH_REDIS_REST_TOKEN: boolean;
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: boolean;
};

export async function GET() {
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
  });
}
