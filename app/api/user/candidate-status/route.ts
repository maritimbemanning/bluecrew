/**
 * API: Check if current Clerk user has a candidate profile
 * Returns candidate registration status based on email match
 */

import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

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

    // Check if user's email exists in candidates table using REST API
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase configuration");
      return NextResponse.json({
        registered: false,
        reason: "config_error",
      });
    }

    const url = new URL(`${supabaseUrl}/rest/v1/candidates`);
    url.searchParams.set("select", "id,name,submitted_at,status");
    url.searchParams.set("email", `eq.${email}`);
    url.searchParams.set("order", "submitted_at.desc");
    url.searchParams.set("limit", "1");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Supabase error:", await response.text());
      return NextResponse.json({
        registered: false,
        reason: "db_error",
      });
    }

    const candidates = await response.json();

    if (!candidates || candidates.length === 0) {
      return NextResponse.json({
        registered: false,
        reason: "not_found",
      });
    }

    const candidate = candidates[0];

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
