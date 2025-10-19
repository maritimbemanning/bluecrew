import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob:",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "connect-src 'self' https://api.resend.com https://*.supabase.co https://*.supabase.in https://*.supabase.net https://*.upstash.io",
  "manifest-src 'self'",
  "media-src 'self'",
].join("; ");

function applySecurityHeaders(response: NextResponse) {
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  return response;
}

/**
 * Når NEXT_PUBLIC_MAINTENANCE = "1":
 *  - Alle ruter sendes til /maintenance
 *  - Unntak: /maintenance selv og Next sine statiske filer
 */
export function middleware(req: NextRequest) {
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE === "1";

  if (!isMaintenance) {
    return applySecurityHeaders(NextResponse.next());
  }

  const { pathname } = req.nextUrl;

  // Tillat disse å gå gjennom (selve vedlikeholdssiden + Next sine filer)
  const allow =
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/assets");

  if (allow) {
    return applySecurityHeaders(NextResponse.next());
  }

  // Alt annet: send til /maintenance
  const url = req.nextUrl.clone();
  url.pathname = "/maintenance";
  return applySecurityHeaders(NextResponse.rewrite(url));
}

export const config = {
  // Kjør middleware på alle ruter
  matcher: ["/:path*"],
};

