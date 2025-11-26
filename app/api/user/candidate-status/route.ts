/**
 * API: Check if current Clerk user has a candidate profile
 * Returns candidate registration status based on clerk_user_id OR email match
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

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase configuration");
      return NextResponse.json({
        registered: false,
        reason: "config_error",
      });
    }

    // First, try to find by clerk_user_id (most reliable)
    const urlByClerkId = new URL(`${supabaseUrl}/rest/v1/candidates`);
    urlByClerkId.searchParams.set("select", "id,name,submitted_at,status,email");
    urlByClerkId.searchParams.set("clerk_user_id", `eq.${userId}`);
    urlByClerkId.searchParams.set("order", "submitted_at.desc");
    urlByClerkId.searchParams.set("limit", "1");

    const responseByClerkId = await fetch(urlByClerkId.toString(), {
      method: "GET",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (responseByClerkId.ok) {
      const candidatesByClerkId = await responseByClerkId.json();
      if (candidatesByClerkId && candidatesByClerkId.length > 0) {
        const candidate = candidatesByClerkId[0];
        return NextResponse.json({
          registered: true,
          candidate: {
            id: candidate.id,
            name: candidate.name,
            submittedAt: candidate.submitted_at,
            status: candidate.status,
          },
        });
      }
    }

    // Fallback: try to find by email
    if (email) {
      const urlByEmail = new URL(`${supabaseUrl}/rest/v1/candidates`);
      urlByEmail.searchParams.set("select", "id,name,submitted_at,status,email");
      urlByEmail.searchParams.set("email", `eq.${email}`);
      urlByEmail.searchParams.set("order", "submitted_at.desc");
      urlByEmail.searchParams.set("limit", "1");

      const responseByEmail = await fetch(urlByEmail.toString(), {
        method: "GET",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Accept: "application/json",
        },
        cache: "no-store",
      });

      if (responseByEmail.ok) {
        const candidatesByEmail = await responseByEmail.json();
        if (candidatesByEmail && candidatesByEmail.length > 0) {
          const candidate = candidatesByEmail[0];
          return NextResponse.json({
            registered: true,
            candidate: {
              id: candidate.id,
              name: candidate.name,
              submittedAt: candidate.submitted_at,
              status: candidate.status,
            },
          });
        }
      }
    }

    // No candidate found
    return NextResponse.json({
      registered: false,
      reason: "not_found",
    });
  } catch (error) {
    console.error("Candidate status error:", error);
    return NextResponse.json(
      { error: "Intern feil" },
      { status: 500 }
    );
  }
}
