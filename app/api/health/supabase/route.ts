import { NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/server/supabase";

export const runtime = "nodejs";

export async function GET() {
  try {
    const sb = supabaseServer();
    const { error } = await sb.from("leads").select("*", { head: true, count: "exact" });
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "unknown" }, { status: 500 });
  }
}
