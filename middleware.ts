import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Når NEXT_PUBLIC_MAINTENANCE = "1":
 *  - Alle ruter sendes til /maintenance
 *  - Unntak: /maintenance selv og Next sine statiske filer
 */
export function middleware(req: NextRequest) {
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE === "1";

  if (!isMaintenance) return NextResponse.next();

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

  if (allow) return NextResponse.next();

  // Alt annet: send til /maintenance
  const url = req.nextUrl.clone();
  url.pathname = "/maintenance";
  return NextResponse.rewrite(url);
}

export const config = {
  // Kjør middleware på alle ruter
  matcher: ["/:path*"],
};
