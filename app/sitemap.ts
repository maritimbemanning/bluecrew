import { MetadataRoute } from "next";

/**
 * Bluecrew sitemap – komplett og SEO-optimal
 * Inkluderer alle hovedsider + juridiske sider (cookies, vilkår, personvern)
 * Priority: 1.0 = viktigst, 0.8 = meget viktig, 0.7 = viktig, 0.5 = standard, 0.3 = lav prioritet
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://bluecrew.no";
  const now = new Date();

  return [
    // Forside - viktigste siden
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },

    // Hovedkategorier - meget viktig for SEO
    { url: `${base}/jobbsoker`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/kunde`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    
    // Tjenestesider - viktige landingssider for søkeord
    { url: `${base}/kunde/bemanning`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/kunde/rekruttering`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/jobbsoker/oppdrag`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    
    // Konverteringssider
    { url: `${base}/jobbsoker/registrer`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/kunde/registrer-behov`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    
    // Informasjonssider
    { url: `${base}/kunde/hva-vi-hjelper-med`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/om-oss`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/kontakt`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // Guides og ressurser - viktige SEO-sider
    { url: `${base}/jobbsoker/guides`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/jobbsoker/guides/hvordan-bli-skipsforer`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/jobbsoker/guides/hvordan-bli-matros`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/jobbsoker/guides/hvordan-bli-maskinoffiser`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/jobbsoker/guides/lonnsguide-maritime-stillinger`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // Juridiske sider (GDPR / Informasjonsplikt)
    { url: `${base}/personvern`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/vilkar`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
