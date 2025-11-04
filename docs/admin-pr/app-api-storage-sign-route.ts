import { NextRequest, NextResponse } from "next/server";
import { getSignedUrl } from "@/lib/supabaseServer";

export const runtime = "nodejs";

function validateKey(key: string): { ok: true } | { ok: false; error: string } {
  if (!key) return { ok: false, error: "missing key" };
  if (!(key.startsWith("cv/") || key.startsWith("cert/"))) return { ok: false, error: "invalid prefix" };
  if (key.includes("..")) return { ok: false, error: "invalid key" };
  return { ok: true };
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key") || "";
  const valid = validateKey(key);
  if (!valid.ok) return NextResponse.json({ ok: false, error: valid.error }, { status: 400 });
  try {
    const signed = await getSignedUrl("candidates-private", key);
    return NextResponse.json({ ok: true, url: signed });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "failed" }, { status: 400 });
  }
}
