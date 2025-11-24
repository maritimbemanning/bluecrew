/**
 * USER APPLICATIONS API
 * Route: /api/user/applications
 *
 * Fetches job applications for the authenticated user from AdminCrew
 */

import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { logger } from "@/app/lib/logger";

export const runtime = "nodejs";

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

    // Fetch applications from AdminCrew
    const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || "https://admincrew.no";
    const res = await fetch(
      `${adminUrl}/api/job-applications?email=${encodeURIComponent(email)}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      logger.error("Failed to fetch applications from AdminCrew", { status: res.status });
      return NextResponse.json(
        { error: "Kunne ikke hente søknader" },
        { status: 500 }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      applications: data.applications || [],
    });
  } catch (err) {
    logger.error("Error fetching user applications", { error: String(err) });
    return NextResponse.json(
      { error: "Noe gikk galt" },
      { status: 500 }
    );
  }
}
