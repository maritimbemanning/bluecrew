// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isDevelopment = process.env.NODE_ENV === 'development';

// Routes that require authentication
const isProtectedRoute = createRouteMatcher([
  "/min-side(.*)",
]);

/**
 * Streng, men praktisk Content Security Policy (CSP)
 * - Tillater Google Fonts og Plausible
 * - Tillater nødvendige utgående forbindelser (Resend, Supabase, Upstash, Plausible, Vipps, Brreg)
 * - NB: 'unsafe-inline' er midlertidig for stil/skript. Fjern/stram inn når mulig.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self' https://*.clerk.accounts.dev https://*.clerk.dev https://*.clerk.com",
  "frame-ancestors 'none'",
  // Clerk + Cloudflare Turnstile (bot protection/CAPTCHA)
  "frame-src 'self' https://*.clerk.accounts.dev https://*.clerk.dev https://*.clerk.com https://challenges.cloudflare.com",
  "img-src 'self' data: blob: https://img.clerk.com https://*.clerk.com https://*.clerk.dev",
  "font-src 'self' https://fonts.gstatic.com data:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // Clerk + Cloudflare Turnstile scripts
  `script-src 'self' 'unsafe-inline' ${isDevelopment ? "'unsafe-eval'" : ""} https://plausible.io https://cdn.jsdelivr.net https://vercel.live https://*.clerk.accounts.dev https://*.clerk.dev https://*.clerk.com https://challenges.cloudflare.com blob:`,
  "worker-src 'self' blob:",
  // Allow Vercel Live, Clerk, Cloudflare Turnstile, and other services
  "connect-src 'self' https://api.resend.com https://*.supabase.co https://*.supabase.net https://*.upstash.io https://plausible.io https://api.vipps.no https://data.brreg.no https://vercel.live https://*.clerk.accounts.dev https://*.clerk.dev https://*.clerk.com https://challenges.cloudflare.com",
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
 * Clerk middleware with security headers and maintenance mode.
 */
export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  // Hard guard: Never expose /admin routes from this public site
  if (pathname.startsWith("/admin")) {
    const res = new NextResponse("Not Found", { status: 404 });
    return applySecurityHeaders(res);
  }

  // Read maintenance flag from env
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
    /^\/icons\//,
    /^\/hero\//,
    /^\/guides\//,
  ];

  const isAllowed = allow.some((r) => r.test(pathname));

  if (MAINTENANCE_MODE && !isAllowed) {
    if (req.method !== "GET" && req.method !== "HEAD") {
      const res = new NextResponse("Service Unavailable (maintenance)", {
        status: 503,
        headers: { "Retry-After": "120", "Cache-Control": "no-store" },
      });
      return applySecurityHeaders(res);
    }

    url.pathname = "/maintenance";
    const res = NextResponse.rewrite(url);
    res.headers.set("Cache-Control", "no-store");
    res.headers.set("X-Maintenance-Mode", "true");
    return applySecurityHeaders(res);
  }

  // Protect /min-side routes - redirect to login if not authenticated
  if (isProtectedRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      const signInUrl = new URL("/logg-inn", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  const res = NextResponse.next();
  return applySecurityHeaders(res);
});

/** Clerk middleware matcher */
export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
