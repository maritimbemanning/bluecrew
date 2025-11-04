import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Redis } from "@upstash/redis";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const origin = url.origin;
  const hostname = url.hostname;

  // Derived cookie domain like in Vipps routes
  const cookieDomain =
    process.env.NODE_ENV === "production" && hostname.endsWith("bluecrew.no")
      ? ".bluecrew.no"
      : undefined;

  // Derived redirect like in Vipps start/callback
  const derivedRedirect = `${origin}/api/vipps/callback`;

  // Env presence
  const env = {
    VIPPS_CLIENT_ID: !!process.env.VIPPS_CLIENT_ID,
    VIPPS_CLIENT_SECRET: !!process.env.VIPPS_CLIENT_SECRET,
    VIPPS_SUBSCRIPTION_KEY: !!process.env.VIPPS_SUBSCRIPTION_KEY,
    VIPPS_API_BASE_URL: !!process.env.VIPPS_API_BASE_URL,
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    UPSTASH_REDIS_REST_URL: !!process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: !!process.env.UPSTASH_REDIS_REST_TOKEN,
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: !!process.env.RESEND_FROM_EMAIL,
  } as const;

  // Check Redis connectivity (non-fatal if missing)
  let redisCheck: { ok: boolean; message?: string } = { ok: false };
  if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
      });
      const key = `selftest:${Date.now()}`;
      await redis.set(key, { t: new Date().toISOString() }, { ex: 5 });
      const val = await redis.get(key);
      redisCheck = { ok: !!val };
    } catch (e: any) {
      redisCheck = { ok: false, message: e?.message || String(e) };
    }
  } else {
    redisCheck = { ok: false, message: "Redis env missing" };
  }

  // Optional Supabase auth admin check (guarded by SELFTEST_ENABLE_AUTH=true)
  const doAuth = String(process.env.SELFTEST_ENABLE_AUTH ?? "false").toLowerCase() === "true";
  let supabaseAuthCheck: { ok: boolean; message?: string } = { ok: false, message: doAuth ? undefined : "skipped" };
  if (doAuth) {
    try {
      if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error("Missing Supabase env");
      }
      const sb = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { autoRefreshToken: false, persistSession: false } }
      );
      const email = `selftest+${Date.now()}@example.com`;
      const r = await sb.auth.admin.generateLink({ type: "magiclink", email });
      const link = (r as any)?.data?.properties?.action_link as string | undefined;
      supabaseAuthCheck = { ok: !!link, message: link ? undefined : "no link returned" };
    } catch (e: any) {
      supabaseAuthCheck = { ok: false, message: e?.message || String(e) };
    }
  }

  // Quick cookie write/read smoke test
  let cookieCheck: { ok: boolean; message?: string } = { ok: false };
  try {
    const store = await cookies();
    store.set("selftest_cookie", "1", {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 30,
      ...(cookieDomain ? { domain: cookieDomain } : {}),
    });
    cookieCheck = { ok: true };
  } catch (e: any) {
    cookieCheck = { ok: false, message: e?.message || String(e) };
  }

  // Scope check matches what we send in start route
  const requestedScope = "openid name phoneNumber birthDate email";

  return NextResponse.json({
    ok: true,
    info: {
      host: url.host,
      origin,
      cookieDomain: cookieDomain || "default",
      derivedRedirect,
      requestedScope,
    },
    env,
    checks: {
      redis: redisCheck,
      cookie: cookieCheck,
      supabaseAuth: supabaseAuthCheck,
    },
  });
}
