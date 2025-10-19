import { NextResponse } from "next/server";
import { createSupabaseSignedUrl } from "../../../lib/server/supabase";
import { captureServerException } from "../../../lib/server/observability";

export const runtime = "nodejs";

function isAllowedPath(path: string) {
  return path.startsWith("cv/") || path.startsWith("cert/");
}

export async function POST(req: Request) {
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
