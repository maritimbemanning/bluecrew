import { NextResponse } from "next/server";
import { createSupabaseSignedUrl } from "../../../../lib/server/supabase";

export const runtime = "nodejs";

function unauthorized(message = "unauthorized") {
  return NextResponse.json({ ok: false, error: message }, { status: 401 });
}

export async function GET(req: Request) {
  const token = req.headers.get("x-admin-token") || req.headers.get("authorization");
  if (!process.env.ADMIN_SIGN_TOKEN) return unauthorized("server not configured");
  if (!token || !token.includes(process.env.ADMIN_SIGN_TOKEN)) return unauthorized();

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
    return NextResponse.json({ ok: true, url: signedUrl });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "unknown";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const token = req.headers.get("x-admin-token") || req.headers.get("authorization");
  if (!process.env.ADMIN_SIGN_TOKEN) return unauthorized("server not configured");
  if (!token || !token.includes(process.env.ADMIN_SIGN_TOKEN)) return unauthorized();

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
    return NextResponse.json({ ok: true, url: signedUrl });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "unknown";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
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
