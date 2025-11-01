// middleware.ts
import { NextResponse } from "next/server";

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Streng, men praktisk Content Security Policy (CSP)
 * - Tillater Google Fonts og Plausible
 * - Tillater nødvendige utgående forbindelser (Resend, Supabase, Upstash, Sentry, Plausible)
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
  `script-src 'self' 'unsafe-inline' ${isDevelopment ? "'unsafe-eval'" : ""} https://plausible.io https://cdn.jsdelivr.net`, // unsafe-eval needed for Next.js dev mode
  "connect-src 'self' https://api.resend.com https://*.supabase.co https://*.supabase.net https://*.upstash.io https://plausible.io https://o*.ingest.sentry.io https://api.vipps.no https://data.brreg.no",
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
export function middleware() {
  return applySecurityHeaders(NextResponse.next());
}

/** Kjør på hele nettstedet */
export const config = {
  matcher: ["/:path*"],
};
