/**
 * API: Fetch all job applications (Admin only)
 * Returns applications list with signed CV URLs
 */

import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { selectSupabaseRows, createSupabaseSignedUrl } from "@/app/lib/server/supabase";
import { isAdminUser } from "@/app/lib/admin";

export const runtime = "nodejs";

type JobApplication = {
  id: string;
  created_at: string;
  job_posting_id: string;
  name: string;
  email: string;
  phone: string;
  job_title: string;
  job_company: string | null;
  job_location: string;
  cover_letter: string | null;
  cv_path: string | null;
  vipps_verified: boolean;
  vipps_sub: string | null;
};

export async function GET() {
  try {
    // Check authentication
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Ikke innlogget" }, { status: 401 });
    }

    // Check admin access
    const role = (user.publicMetadata as { role?: string })?.role;
    const userEmail = user.emailAddresses[0]?.emailAddress?.toLowerCase();
    const isAdmin = isAdminUser(userEmail, role);

    if (!isAdmin) {
      return NextResponse.json({ error: "Ingen tilgang" }, { status: 403 });
    }

    // Fetch applications
    const applications = await selectSupabaseRows<JobApplication>({
      table: "job_applications",
      columns: "*",
      order: { column: "created_at", ascending: false },
    });

    // Generate CV download URLs
    const applicationsWithUrls = await Promise.all(
      applications.map(async (app) => {
        if (app.cv_path) {
          try {
            const cvUrl = await createSupabaseSignedUrl({
              bucket: "candidates-private",
              object: app.cv_path,
              expiresInSeconds: 3600,
            });
            return { ...app, cvUrl };
          } catch {
            return { ...app, cvUrl: null };
          }
        }
        return { ...app, cvUrl: null };
      })
    );

    return NextResponse.json({ applications: applicationsWithUrls });
  } catch (error) {
    console.error("Admin applications error:", error);
    return NextResponse.json({ error: "Intern feil" }, { status: 500 });
  }
}
