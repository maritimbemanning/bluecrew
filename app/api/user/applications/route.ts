/**
 * USER APPLICATIONS API
 * Route: /api/user/applications
 *
 * Fetches job applications for the authenticated user from local Supabase
 */

import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { logger } from "@/app/lib/logger";

export const runtime = "nodejs";

interface JobApplication {
  id: string;
  job_posting_id: string | null;
  name: string;
  email: string;
  status: string;
  created_at: string;
  cover_letter: string | null;
}

async function fetchApplicationsByEmail(email: string): Promise<JobApplication[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase config");
  }

  const params = new URLSearchParams({
    select: "id,job_posting_id,name,email,status,created_at,cover_letter",
    email: `eq.${email.toLowerCase()}`,
    order: "created_at.desc",
  });

  const res = await fetch(`${url}/rest/v1/job_applications?${params}`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Supabase error: ${res.status}`);
  }

  return res.json();
}

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

    // Get user email
    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!email) {
      return NextResponse.json(
        { error: "Ingen e-post funnet" },
        { status: 400 }
      );
    }

    // Fetch applications from Supabase
    let applications: JobApplication[] = [];
    try {
      applications = await fetchApplicationsByEmail(email);
    } catch (err) {
      logger.error("Failed to fetch applications:", err);
      return NextResponse.json(
        { error: "Kunne ikke hente søknader" },
        { status: 500 }
      );
    }

    // Try to enrich with job posting data from AdminCrew
    const enrichedApplications = await Promise.all(
      (applications || []).map(async (app) => {
        let jobPosting = null;

        if (app.job_posting_id) {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_ADMIN_URL || "https://admincrew.no"}/api/job-postings/${app.job_posting_id}`,
              { next: { revalidate: 3600 } } // Cache for 1 hour
            );
            if (res.ok) {
              const data = await res.json();
              jobPosting = {
                id: data.id,
                title: data.title,
                company_name: data.company_name,
              };
            }
          } catch {
            // Ignore - job posting might not exist
          }
        }

        return {
          id: app.id,
          job_posting: jobPosting,
          status: app.status || "new",
          created_at: app.created_at,
        };
      })
    );

    return NextResponse.json({
      applications: enrichedApplications,
    });
  } catch (err) {
    logger.error("Error fetching user applications:", err);
    return NextResponse.json(
      { error: "Noe gikk galt" },
      { status: 500 }
    );
  }
}
