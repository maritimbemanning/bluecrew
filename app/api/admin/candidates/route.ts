/**
 * API: Fetch all registered candidates (Admin only)
 * Returns candidates list with signed file URLs
 */

import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { selectSupabaseRows, createSupabaseSignedUrl } from "@/app/lib/server/supabase";
import { isAdminUser } from "@/app/lib/admin";

export const runtime = "nodejs";

type Candidate = {
  id: string;
  submitted_at: string;
  name: string;
  email: string;
  phone: string;
  fylke: string | null;
  kommune: string | null;
  available_from: string | null;
  skills: string | null;
  work_main: string[];
  wants_temporary: string;
  status: string;
  cv_path: string | null;
  certs_path: string | null;
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

    // Fetch candidates
    const candidates = await selectSupabaseRows<Candidate>({
      table: "candidates",
      columns: "*",
      order: { column: "submitted_at", ascending: false },
    });

    // Generate file URLs
    const candidatesWithUrls = await Promise.all(
      candidates.map(async (candidate) => {
        let cvUrl: string | null = null;
        let certsUrl: string | null = null;

        if (candidate.cv_path) {
          try {
            cvUrl = await createSupabaseSignedUrl({
              bucket: "candidates-private",
              object: candidate.cv_path,
              expiresInSeconds: 3600,
            });
          } catch {
            // Ignore URL generation errors
          }
        }

        if (candidate.certs_path) {
          try {
            certsUrl = await createSupabaseSignedUrl({
              bucket: "candidates-private",
              object: candidate.certs_path,
              expiresInSeconds: 3600,
            });
          } catch {
            // Ignore URL generation errors
          }
        }

        return { ...candidate, cvUrl, certsUrl };
      })
    );

    return NextResponse.json({ candidates: candidatesWithUrls });
  } catch (error) {
    console.error("Admin candidates error:", error);
    return NextResponse.json({ error: "Intern feil" }, { status: 500 });
  }
}
