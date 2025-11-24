/**
 * ADMIN: Job Applications Dashboard
 * Route: /admin/applications
 *
 * Protected admin-only page showing all job applications
 * Only accessible by users with "admin" role in Clerk
 */

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { selectSupabaseRows, createSupabaseSignedUrl } from "@/app/lib/server/supabase";
import ApplicationsTable from "./ApplicationsTable";

export const metadata = {
  title: "Jobbsøknader - Admin - Bluecrew",
  description: "Admin dashboard for jobbsøknader",
};

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

async function getApplications(): Promise<JobApplication[]> {
  try {
    const applications = await selectSupabaseRows<JobApplication>({
      table: "job_applications",
      columns: "*",
      order: { column: "created_at", ascending: false },
    });

    return applications;
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return [];
  }
}

async function getCvDownloadUrl(cvPath: string): Promise<string | null> {
  try {
    const signedUrl = await createSupabaseSignedUrl({
      bucket: "candidates-private",
      object: cvPath,
      expiresInSeconds: 3600, // 1 hour
    });
    return signedUrl;
  } catch (error) {
    console.error("Failed to create signed URL:", error);
    return null;
  }
}

export default async function AdminApplicationsPage() {
  // Check authentication - use currentUser() to get full user data including publicMetadata
  const user = await currentUser();

  if (!user) {
    redirect("/logg-inn?redirect_url=/admin/applications");
  }

  // Check if user has admin role (from publicMetadata)
  const role = (user.publicMetadata as { role?: string })?.role;

  // Fallback: Check if user email is in admin list
  const adminEmails = ["isak@bluecrew.no", "tf@bluecrew.no", "isak.didriksson@gmail.com"];
  const userEmail = user.emailAddresses[0]?.emailAddress?.toLowerCase();

  const isAdmin = role === "admin" || (userEmail && adminEmails.includes(userEmail));

  if (!isAdmin) {
    redirect("/");
  }

  // Fetch applications
  const applications = await getApplications();

  // Generate CV download URLs for applications that have CVs
  const applicationsWithUrls = await Promise.all(
    applications.map(async (app) => {
      if (app.cv_path) {
        const cvUrl = await getCvDownloadUrl(app.cv_path);
        return { ...app, cvUrl };
      }
      return { ...app, cvUrl: null };
    })
  );

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      padding: "2rem 1rem",
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "2rem",
          marginBottom: "2rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}>
          <h1 style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#0f172a",
            marginBottom: "0.5rem",
          }}>
            Jobbsøknader
          </h1>
          <p style={{
            color: "#64748b",
            fontSize: "1rem",
          }}>
            Totalt {applications.length} søknader
          </p>
        </div>

        {/* Applications Table */}
        <ApplicationsTable applications={applicationsWithUrls} />
      </div>
    </div>
  );
}
