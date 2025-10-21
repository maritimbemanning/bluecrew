import { MetadataRoute } from "next";

/**
 * Bluecrew sitemap – komplett og SEO-optimal
 * Inkluderer alle hovedsider + juridiske sider (cookies, vilkår, personvern)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://bluecrew.no";
  const now = new Date();

  return [
    // Forside
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },

    // Jobbsøker
    { url: `${base}/jobbsoker`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/jobbsoker/registrer`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/jobbsoker/oppdrag`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // Kunde
    { url: `${base}/kunde`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/kunde/registrer-behov`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/kunde/bemanning`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/kunde/rekruttering`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/kunde/hva-vi-hjelper-med`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // Andre sider
    { url: `${base}/om-oss`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/kontakt`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // Juridiske sider (GDPR / Informasjonsplikt)
    { url: `${base}/personvern`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/vilkar`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
