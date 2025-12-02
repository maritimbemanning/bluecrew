import { NextResponse } from "next/server";
import { generateCsrfToken } from "../../lib/server/csrf";

export const runtime = "nodejs";

/**
 * GET /api/csrf
 * Returns a fresh CSRF token for form submissions.
 * The token is also stored in an httpOnly cookie for validation.
 */
export async function GET() {
  try {
    const token = await generateCsrfToken();
    return NextResponse.json({ token });
  } catch (error) {
    console.error("Failed to generate CSRF token:", error);
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    );
  }
}
