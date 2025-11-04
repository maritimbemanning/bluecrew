import { NextResponse } from "next/server";
import { createSupabaseSignedUrl } from "../../../../lib/server/supabase";
import { enforceRateLimit } from "../../../../lib/server/rate-limit";

export const runtime = "nodejs";

function allowedOrigin(req: Request) {
  // Default allow admin subdomain; can be overridden via env
  const fallback = "https://admin.bluecrew.no";
  const allowed = process.env.ADMIN_ALLOWED_ORIGIN || fallback;
  // If request has Origin header matching allowed, return it; otherwise undefined (no CORS)
  const origin = req.headers.get("origin") || "";
  if (origin && origin.toLowerCase() === allowed.toLowerCase()) return allowed;
  return undefined;
}

function withCors(res: NextResponse, origin?: string) {
  if (origin) {
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set("Vary", "Origin");
  }
  return res;
}

function unauthorized(message = "unauthorized", origin?: string) {
  return withCors(NextResponse.json({ ok: false, error: message }, { status: 401 }), origin);
}

export async function GET(req: Request) {
  const origin = allowedOrigin(req);
  const rateKey = `sign:${req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"}`;
  const rate = await enforceRateLimit(rateKey);
  if (!rate.allowed) {
    return withCors(
      NextResponse.json(
        { ok: false, error: "rate_limited", retryAfter: rate.resetSeconds },
        { status: 429, headers: { "Retry-After": String(rate.resetSeconds || 60) } },
      ),
      origin,
    );
  }

  const token = req.headers.get("x-admin-token") || req.headers.get("authorization");
  if (!process.env.ADMIN_SIGN_TOKEN) return unauthorized("server not configured", origin);
  if (!token || !token.includes(process.env.ADMIN_SIGN_TOKEN)) return unauthorized(undefined, origin);

  const url = new URL(req.url);
  const key = url.searchParams.get("key") || "";
  const valid = validateKey(key);
  if (!valid.ok) return NextResponse.json({ ok: false, error: valid.error }, { status: 400 });

  try {
    const signedUrl = await createSupabaseSignedUrl({
      bucket: "candidates-private",
      object: key,
      expiresInSeconds: 900, // 15 minutes
    });
    return withCors(NextResponse.json({ ok: true, url: signedUrl }), origin);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "unknown";
    return withCors(NextResponse.json({ ok: false, error: message }, { status: 500 }), origin);
  }
}

export async function POST(req: Request) {
  const origin = allowedOrigin(req);
  const rateKey = `sign:${req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"}`;
  const rate = await enforceRateLimit(rateKey);
  if (!rate.allowed) {
    return withCors(
      NextResponse.json(
        { ok: false, error: "rate_limited", retryAfter: rate.resetSeconds },
        { status: 429, headers: { "Retry-After": String(rate.resetSeconds || 60) } },
      ),
      origin,
    );
  }

  const token = req.headers.get("x-admin-token") || req.headers.get("authorization");
  if (!process.env.ADMIN_SIGN_TOKEN) return unauthorized("server not configured", origin);
  if (!token || !token.includes(process.env.ADMIN_SIGN_TOKEN)) return unauthorized(undefined, origin);

  const body = await req.json().catch(() => ({}));
  const key = typeof body?.key === "string" ? body.key : "";
  const valid = validateKey(key);
  if (!valid.ok) return NextResponse.json({ ok: false, error: valid.error }, { status: 400 });

  try {
    const signedUrl = await createSupabaseSignedUrl({
      bucket: "candidates-private",
      object: key,
      expiresInSeconds: 900,
    });
    return withCors(NextResponse.json({ ok: true, url: signedUrl }), origin);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "unknown";
    return withCors(NextResponse.json({ ok: false, error: message }, { status: 500 }), origin);
  }
}

function validateKey(key: string): { ok: true } | { ok: false; error: string } {
  if (!key) return { ok: false, error: "missing key" };
  // Only allow our known prefixes and disallow path traversal
  if (!(key.startsWith("cv/") || key.startsWith("cert/"))) {
    return { ok: false, error: "invalid prefix" };
  }
  if (key.includes("..")) return { ok: false, error: "invalid key" };
  return { ok: true };
}

// Handle CORS preflight for browser-based calls from Admin UI
export async function OPTIONS(req: Request) {
  const origin = allowedOrigin(req);
  const res = new NextResponse(null, { status: 204 });
  if (origin) {
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type,Authorization,X-Admin-Token");
    res.headers.set("Vary", "Origin");
  }
  return res;
}
