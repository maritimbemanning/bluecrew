import { NextRequest, NextResponse } from "next/server";

/**
 * Supabase auth callback handler.
 * This catches magic link redirects and sends users to the home page.
 * Prevents users from accidentally landing on /admin.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  
  // Get any error from Supabase
  const error = url.searchParams.get("error");
  const errorDescription = url.searchParams.get("error_description");
  
  if (error) {
    console.error("Supabase auth error:", error, errorDescription);
    // Redirect to home with error message
    return NextResponse.redirect(new URL("/?auth=error", url.origin));
  }
  
  // Success - redirect to home page
  return NextResponse.redirect(new URL("/?auth=success", url.origin));
}
