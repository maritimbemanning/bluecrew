import { NextResponse } from "next/server";
import { listSupabaseObjects } from "../../../../../lib/server/supabase";

export const runtime = "nodejs";

/**
 * Health check for CV storage bucket.
 * Returns only count, NOT file paths (security: paths contain hashed PII).
 */
export async function GET() {
  try {
    const files = await listSupabaseObjects({
      bucket: "candidates-private",
      prefix: "cv/",
      limit: 5,
    });
    // Only return count - never expose file paths publicly
    return NextResponse.json({ ok: true, count: files.length });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "unknown";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
