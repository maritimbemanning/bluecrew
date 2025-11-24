// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isDevelopment = process.env.NODE_ENV === "development";

// Routes that require authentication
const isProtectedRoute = createRouteMatcher(["/min-side(.*)"]);

/**
 * Content Security Policy (CSP)
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self' https://accounts.bluecrew.no https://*.clerk.accounts.dev https://*.clerk.dev https://*.clerk.com",
  "frame-ancestors 'none'",
  "frame-src 'self' https://clerk.bluecrew.no https://accounts.bluecrew.no https://*.clerk.accounts.dev https://*.clerk.dev https://*.clerk.com https://challenges.cloudflare.com https://www.googletagmanager.com",
  "img-src 'self' data: blob: https://clerk.bluecrew.no https://accounts.bluecrew.no https://img.clerk.com https://*.clerk.com https://*.clerk.dev https://*.clerk.accounts.dev https://www.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net",
  "font-src 'self' https://fonts.gstatic.com data:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://clerk.bluecrew.no https://accounts.bluecrew.no https://*.clerk.accounts.dev https://*.clerk.dev https://*.clerk.com",
  `script-src 'self' 'unsafe-inline' ${isDevelopment ? "'unsafe-eval'" : ""} https://plausible.io https://cdn.jsdelivr.net https://vercel.live https://www.googletagmanager.com https://clerk.bluecrew.no https://accounts.bluecrew.no https://*.clerk.accounts.dev https://*.clerk.dev https://*.clerk.com https://challenges.cloudflare.com blob:`,
  "worker-src 'self' blob:",
  "connect-src 'self' https://api.resend.com https://*.supabase.co https://*.supabase.net https://*.upstash.io https://plausible.io https://api.vipps.no https://data.brreg.no https://vercel.live https://clerk.bluecrew.no https://accounts.bluecrew.no https://*.clerk.accounts.dev https://*.clerk.dev https://*.clerk.com https://clerk-telemetry.com https://challenges.cloudflare.com https://admincrew.no https://www.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net",
  ...(isDevelopment ? [] : ["upgrade-insecure-requests"]),
].join("; ");

function applySecurityHeaders(res: NextResponse) {
  res.headers.set("Content-Security-Policy", csp);
  res.headers.set("Referrer-Policy", "no-referrer");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-XSS-Protection", "0");
  res.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  res.headers.set(
    "Permissions-Policy",
    [
      "accelerometer=()",
      "autoplay=()",
      "camera=()",
      "clipboard-read=()",
      "clipboard-write=(self)",
      "geolocation=()",
      "microphone=()",
      "payment=()",
      "usb=()",
      "browsing-topics=()",
    ].join(", ")
  );
  return res;
}

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  // Block /admin routes
  if (pathname.startsWith("/admin")) {
    const res = new NextResponse("Not Found", { status: 404 });
    return applySecurityHeaders(res);
  }

  // Maintenance mode
  const maintenanceFlag = String(
    process.env.MAINTENANCE_MODE ?? process.env.NEXT_PUBLIC_MAINTENANCE_MODE ?? ""
  ).toLowerCase();
  const MAINTENANCE_MODE = ["true", "1", "on", "yes"].includes(maintenanceFlag);

  const allow = [
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

  if (MAINTENANCE_MODE && !allow.some((r) => r.test(pathname))) {
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
    return applySecurityHeaders(res);
  }

  // Protect /min-side routes
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

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
