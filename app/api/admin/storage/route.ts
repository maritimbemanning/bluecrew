// app/api/admin/storage/route.ts
import { NextResponse } from "next/server";
import { createSupabaseSignedUrl } from "../../../lib/server/supabase";
import { captureServerException } from "../../../lib/server/observability";
import { enforceRateLimit } from "../../../lib/server/rate-limit";

export const runtime = "nodejs";

function isAllowedPath(path: string) {
  return path.startsWith("cv/") || path.startsWith("cert/");
}

function getClientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  // Admin-token håndteres av middleware – her legger vi kun på enkel rate-limit
  const ip = getClientIp(req);
  const { allowed, resetSeconds } = await enforceRateLimit(`admin:${ip}:storage`);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too Many Requests", retryAfterSeconds: resetSeconds },
      { status: 429, headers: { "Retry-After": String(resetSeconds) } }
    );
  }

  try {
    const form = await req.formData();
    const path = form.get("path");
    const expiresRaw = form.get("expires");

    if (typeof path !== "string" || !isAllowedPath(path)) {
      return NextResponse.json({ error: "Ugyldig forespørsel" }, { status: 400 });
    }

    const expires = Math.min(Math.max(Number(expiresRaw) || 600, 60), 1800);

    const signedUrl = await createSupabaseSignedUrl({
      bucket: "candidates-private",
      object: path,
      expiresInSeconds: expires,
    });

    return NextResponse.redirect(signedUrl, { status: 302 });
  } catch (error) {
    captureServerException(error, { scope: "admin-sign-url" });
    return NextResponse.json({ error: "Kunne ikke generere signert lenke" }, { status: 500 });
  }
}
