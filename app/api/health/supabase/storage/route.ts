import { NextResponse } from "next/server";
import { listSupabaseObjects } from "../../../../lib/server/supabase";

export const runtime = "nodejs";

export async function GET() {
  try {
    // Harmless prefix that should not exist; verifies auth + connectivity.
    const names = await listSupabaseObjects({
      bucket: "candidates-private",
      prefix: "health-check/",
      limit: 1,
    });

    return NextResponse.json({ ok: true, count: Array.isArray(names) ? names.length : 0 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "unknown";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
