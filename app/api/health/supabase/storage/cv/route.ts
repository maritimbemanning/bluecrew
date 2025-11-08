import { NextResponse } from "next/server";
import { listSupabaseObjects } from "../../../../../lib/server/supabase";

export const runtime = "nodejs";

export async function GET() {
  try {
    const names = await listSupabaseObjects({
      bucket: "candidates-private",
      prefix: "cv/",
      limit: 5,
    });
    return NextResponse.json({ ok: true, sample: names });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "unknown";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
