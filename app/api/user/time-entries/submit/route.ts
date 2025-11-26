import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// POST - Submit time entries for approval
export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Ikke autorisert" }, { status: 401 });
    }

    const body = await req.json();
    const { entryIds } = body;

    if (!entryIds || !Array.isArray(entryIds) || entryIds.length === 0) {
      return NextResponse.json({ error: "Ingen timer å sende inn" }, { status: 400 });
    }

    // Update all draft entries to submitted
    const { error } = await supabase
      .from("time_entries")
      .update({
        status: "submitted",
        submitted_at: new Date().toISOString(),
      })
      .in("id", entryIds)
      .eq("clerk_user_id", userId)
      .eq("status", "draft");

    if (error) {
      if (error.code === "42P01") {
        return NextResponse.json({ error: "Timeregistrering ikke konfigurert" }, { status: 500 });
      }
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Time entries submit error:", error);
    return NextResponse.json({ error: "Serverfeil" }, { status: 500 });
  }
}
