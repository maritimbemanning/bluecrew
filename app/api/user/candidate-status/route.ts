/**
 * API: Check if current Clerk user has a candidate profile
 * Returns candidate registration status based on email match
 */

import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { supabaseServer } from "@/app/lib/server/supabase";

export const runtime = "nodejs";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Ikke innlogget" }, { status: 401 });
    }

    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!email) {
      return NextResponse.json({
        registered: false,
        reason: "no_email",
      });
    }

    // Check if user's email exists in candidates table
    const supabase = supabaseServer();
    const { data: candidate, error } = await supabase
      .from("candidates")
      .select("id, name, submitted_at, status")
      .eq("email", email)
      .order("submitted_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({
        registered: false,
        reason: "db_error",
      });
    }

    if (!candidate) {
      return NextResponse.json({
        registered: false,
        reason: "not_found",
      });
    }

    return NextResponse.json({
      registered: true,
      candidate: {
        id: candidate.id,
        name: candidate.name,
        submittedAt: candidate.submitted_at,
        status: candidate.status,
      },
    });
  } catch (error) {
    console.error("Candidate status error:", error);
    return NextResponse.json(
      { error: "Intern feil" },
      { status: 500 }
    );
  }
}
