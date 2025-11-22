/**
 * CSRF Token API
 * Route: GET /api/csrf
 *
 * Returns a CSRF token for client-side forms.
 * The token is also stored in an httpOnly cookie for validation.
 */

import { NextResponse } from "next/server";
import { generateCsrfToken } from "@/app/lib/server/csrf";
import { logger } from "@/app/lib/logger";

export const runtime = "nodejs";

export async function GET() {
  try {
    const token = await generateCsrfToken();

    return NextResponse.json({ token });
  } catch (error) {
    logger.error("CSRF token generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate CSRF token" },
      { status: 500 }
    );
  }
}
