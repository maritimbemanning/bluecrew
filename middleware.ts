import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob:",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "connect-src 'self' https://api.resend.com https://*.supabase.co https://*.supabase.in https://*.supabase.net https://*.upstash.io https://plausible.io",
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

function isAdminPath(pathname: string) {
  return pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
}

function isPublicAdminPath(pathname: string) {
  const loginEnabled = process.env.ADMIN_LOGIN_ENABLED === "1";
  if (!loginEnabled) return false; // never public unless explicitly enabled
  return pathname === "/admin/login" || pathname.startsWith("/api/admin/login");
}

function isCandidateProtectedPath(pathname: string) {
  // Candidate registration page
  return pathname === "/jobbsoker/registrer";
}

function isEmailOnlyProtectedPath(pathname: string) {
  // Candidate self-service area requires email session only
  return pathname === "/min-side" || pathname.startsWith("/min-side/");
}

// Note: Vipps is mandatory; env presence is validated in /api/vipps/start

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProd = process.env.NODE_ENV === "production";
  const embeddedAdminEnabled = process.env.EMBEDDED_ADMIN_ENABLED === "1";

  if (isAdminPath(pathname)) {
    // Hard 404 any admin route when embedded admin is disabled
    if (!embeddedAdminEnabled) {
      return applySecurityHeaders(new NextResponse("Not found", { status: 404 }));
    }

    // If enabled, enforce token unless on explicitly public admin paths
    if (!isPublicAdminPath(pathname)) {
      const expectedToken = process.env.ADMIN_TOKEN;
      if (!expectedToken) {
        return applySecurityHeaders(new NextResponse("ADMIN_TOKEN ikke konfigurert", { status: 500 }));
      }
      const headerToken = req.headers.get("x-admin-token");
      const cookieToken = req.cookies.get("admin-token")?.value;
      const ok = headerToken === expectedToken || cookieToken === expectedToken;
      if (!ok) {
        if (isProd) {
          return applySecurityHeaders(new NextResponse("Not found", { status: 404 }));
        }
        const url = req.nextUrl.clone();
        url.pathname = "/admin/login";
        return applySecurityHeaders(NextResponse.redirect(url));
      }
    }
  }

  // Gate candidate registration in steps: 1) magic link email verified, 2) Vipps (mandatory)
  if (isCandidateProtectedPath(pathname)) {
    const hasEmail = Boolean(req.cookies.get("email-session")?.value);
    if (!hasEmail) {
      const url = req.nextUrl.clone();
      url.pathname = "/jobbsoker/registrer/verify";
      url.searchParams.set("return", req.nextUrl.pathname + (req.nextUrl.search || ""));
      return applySecurityHeaders(NextResponse.redirect(url));
    }

    // Always require Vipps candidate-session for legal compliance
    const hasCandidate = Boolean(req.cookies.get("candidate-session")?.value);
    if (!hasCandidate) {
      const url = req.nextUrl.clone();
      url.pathname = "/api/vipps/start";
      url.searchParams.set("flow", "candidate");
      url.searchParams.set("return", req.nextUrl.pathname + (req.nextUrl.search || ""));
      return applySecurityHeaders(NextResponse.redirect(url));
    }
  }

  // Email-only protected area (/min-side)
  if (isEmailOnlyProtectedPath(pathname)) {
    const hasEmail = Boolean(req.cookies.get("email-session")?.value);
    if (!hasEmail && !pathname.endsWith("/logg-inn")) {
      const url = req.nextUrl.clone();
      url.pathname = "/min-side/logg-inn";
      url.searchParams.set("return", req.nextUrl.pathname + (req.nextUrl.search || ""));
      return applySecurityHeaders(NextResponse.redirect(url));
    }
  }

  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE === "1";
  if (!isMaintenance || isAdminPath(pathname)) {
    return applySecurityHeaders(NextResponse.next());
  }

  // Allow maintenance page and framework assets
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

  // Everything else: rewrite to maintenance
  const url = req.nextUrl.clone();
  url.pathname = "/maintenance";
  return applySecurityHeaders(NextResponse.rewrite(url));
}

export const config = {
  matcher: ["/:path*"],
};

