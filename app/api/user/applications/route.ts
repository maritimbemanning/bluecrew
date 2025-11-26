/**
 * USER APPLICATIONS API
 * Route: /api/user/applications
 *
 * Fetches job applications for the authenticated user from Supabase
 */

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Ikke autentisert" },
        { status: 401 }
      );
    }

    // Try to fetch job applications from Supabase
    const { data: applications, error } = await supabase
      .from("job_applications")
      .select(`
        id,
        status,
        created_at,
        updated_at,
        job_posting:job_postings (
          id,
          title,
          company_name,
          location
        )
      `)
      .eq("clerk_user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      // Table doesn't exist yet - return empty array
      if (error.code === "42P01") {
        return NextResponse.json({ applications: [] });
      }
      // Column doesn't exist - try by email fallback (not implemented for now)
      if (error.code === "42703") {
        return NextResponse.json({ applications: [] });
      }
      console.error("Job applications fetch error:", error);
      return NextResponse.json({ applications: [] });
    }

    return NextResponse.json({
      applications: applications || [],
    });
  } catch (err) {
    console.error("Error fetching user applications:", err);
    return NextResponse.json({ applications: [] });
  }
}
