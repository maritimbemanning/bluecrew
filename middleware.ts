// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob:",
  // Merk: 'unsafe-inline'/'unsafe-eval' beholdes som i prosjektet for kompatibilitet
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // FIX: komplett connect-src
  "connect-src 'self' https://api.resend.com https://*.supabase.co https://*.supabase.net https://*.upstash.io https://plausible.io",
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
 * Admin-paths krever ADMIN_TOKEN (via header x-admin-token eller cookie admin-token)
 */
function isAdminPath(pathname: string) {
  return pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Admin-gating
  if (isAdminPath(pathname)) {
    const expectedToken = process.env.ADMIN_TOKEN;
    if (!expectedToken) {
      const response = new NextResponse("ADMIN_TOKEN ikke konfigurert", { status: 500 });
      return applySecurityHeaders(response);
    }

    const headerToken = req.headers.get("x-admin-token");
    const cookieToken = req.cookies.get("admin-token")?.value;
    if (headerToken !== expectedToken && cookieToken !== expectedToken) {
      const response = new NextResponse("Unauthorized", { status: 401 });
      response.headers.set("WWW-Authenticate", "Bearer realm=admin");
      return applySecurityHeaders(response);
    }
  }

  // Vedlikeholdsmodus
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE === "1";
  if (!isMaintenance || isAdminPath(pathname)) {
    return applySecurityHeaders(NextResponse.next());
  }

  // Tillatte paths under maintenance
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

  // Alt annet → /maintenance
  const url = req.nextUrl.clone();
  url.pathname = "/maintenance";
  return applySecurityHeaders(NextResponse.rewrite(url));
}

export const config = {
  matcher: ["/:path*"],
};
