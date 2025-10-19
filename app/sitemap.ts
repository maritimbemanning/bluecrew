import type { MetadataRoute } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://bluecrew.no").replace(/\/$/, "");

const routes = [
  "",
  "/jobbsoker",
  "/jobbsoker/registrer",
  "/jobbsoker/oppdrag",
  "/kunde",
  "/kunde/registrer-behov",
  "/kunde/bemanning",
  "/kunde/rekruttering",
  "/kunde/hva-vi-hjelper-med",
  "/om-oss",
  "/kontakt",
  "/personvern",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
