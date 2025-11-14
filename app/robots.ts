import { MetadataRoute } from "next";

/**
 * Bluecrew robots.txt
 * - Leser automatisk base-URL fra NEXT_PUBLIC_SITE_URL
 * - Matcher sitemap.xml i både Preview og Production
 * - Hindrer søkemotorer fra å krype interne ruter (/admin, /api, /_next, osv.)
 */
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://bluecrew.no";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/api/", "/_next/", "/static/", "/server-sitemap-index.xml"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
