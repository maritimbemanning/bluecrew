// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Streng, men praktisk Content Security Policy (CSP)
 * - Tillater Google Fonts og Plausible
 * - Tillater nødvendige utgående forbindelser (Resend, Supabase, Upstash, Plausible, Vipps, Brreg)
 * - NB: 'unsafe-inline' er midlertidig for stil/skript. Fjern/stram inn når mulig.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data: blob:",
  "font-src 'self' https://fonts.gstatic.com data:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  `script-src 'self' 'unsafe-inline' ${isDevelopment ? "'unsafe-eval'" : ""} https://plausible.io https://cdn.jsdelivr.net https://vercel.live blob:`,
  "worker-src 'self' blob:",
  // Allow Vercel Live (preview feedback/toolbar) to avoid CSP console noise in preview/test
  "connect-src 'self' https://api.resend.com https://*.supabase.co https://*.supabase.net https://*.upstash.io https://plausible.io https://api.vipps.no https://data.brreg.no https://vercel.live",
  // Slå på neste linje når alt eksternt innhold er via HTTPS (vanlig i prod)
  ...(isDevelopment ? [] : ["upgrade-insecure-requests"]),
].join("; ");

/**
 * Legger på sikkerhets-headere for ALLE responser.
 * Beholdt uavhengig av path; ingen admin-sjekk lenger.
 */
function applySecurityHeaders(res: NextResponse) {
  // Content Security Policy
  res.headers.set("Content-Security-Policy", csp);

  // Andre anbefalte headere
  res.headers.set("Referrer-Policy", "no-referrer");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY"); // dekkes også av CSP frame-ancestors
  res.headers.set("X-XSS-Protection", "0");   // slått av; moderne browsere bruker CSP
  res.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  res.headers.set("Permissions-Policy", [
    "accelerometer=()",
    "autoplay=()",
    "camera=()",
    "clipboard-read=()",
    "clipboard-write=(self)",
    "geolocation=()",
    "microphone=()",
    "payment=()",
    "usb=()",
    // Topics/FLoC (moderne navn):
    "browsing-topics=()",
  ].join(", "));

  // CORP/COOP disabled for public marketing site
  // (Blocks Googlebot, social media crawlers, and external API requests)
  // Only enable for admin portals or apps with sensitive cross-origin data
  // res.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  // res.headers.set("Cross-Origin-Resource-Policy", "same-origin");

  return res;
}

/**
 * Minimal middleware uten admin-gating.
 * Alle requests går videre, men får sikkerhets-headere.
 */
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  // Hard guard: Never expose /admin routes from this public site
  if (pathname.startsWith("/admin")) {
    // Return 404 to avoid leaking that an admin area exists
    const res = new NextResponse("Not Found", { status: 404 });
    return applySecurityHeaders(res);
  }

  // Read maintenance flag from env (supports true/1/on). Evaluated at runtime in Edge.
  const maintenanceFlag = String(
    process.env.MAINTENANCE_MODE ?? process.env.NEXT_PUBLIC_MAINTENANCE_MODE ?? ""
  ).toLowerCase();
  const MAINTENANCE_MODE = ["true", "1", "on", "yes"].includes(maintenanceFlag);

  // Allowlist: paths that should continue to work during maintenance
  const allow: RegExp[] = [
    /^\/maintenance(\/|$)/,
    /^\/_next\//,
    /^\/favicon\.ico$/,
    /^\/robots\.txt$/,
    /^\/sitemap\.xml$/,
    /^\/api\/health(\/|$)/,
    /^\/api\/sentry-example-api(\/|$)/,
    // Public assets (served from /public)
    /^\/icons\//,
    /^\/hero\//,
    /^\/guides\//,
  ];

  const isAllowed = allow.some((r) => r.test(pathname));

  if (MAINTENANCE_MODE && !isAllowed) {
    // For non-GET methods, respond with 503 to signal temporary unavailability to clients/robots
    if (req.method !== "GET" && req.method !== "HEAD") {
      const res = new NextResponse("Service Unavailable (maintenance)", {
        status: 503,
        headers: {
          "Retry-After": "120",
          "Cache-Control": "no-store",
        },
      });
      return applySecurityHeaders(res);
    }

    // For normal page requests, rewrite to the maintenance page
    url.pathname = "/maintenance";
    const res = NextResponse.rewrite(url);
    res.headers.set("Cache-Control", "no-store");
    res.headers.set("X-Maintenance-Mode", "true");
    return applySecurityHeaders(res);
  }

  const res = NextResponse.next();
  return applySecurityHeaders(res);
}

/** Kjør på hele nettstedet */
export const config = {
  matcher: ["/:path*"],
};
