import { MetadataRoute } from "next";

/**
 * Bluecrew sitemap – ryddet og oppdatert nov 2025
 * Kun sider som faktisk eksisterer i app/
 * Priority: 1.0 = viktigst, 0.9 = meget viktig, 0.8 = viktig, 0.7 = viktig, 0.5 = standard, 0.3 = lav
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://bluecrew.no";
  const now = new Date();

  // Fetch active job postings
  let jobs: Array<{ slug: string; updated_at?: string }> = [];
  try {
    const adminUrl =
      process.env.NEXT_PUBLIC_ADMIN_URL || "https://admincrew.no";
    const response = await fetch(`${adminUrl}/api/job-postings?status=active`, {
      cache: "no-store",
    });
    if (response.ok) {
      jobs = await response.json();
    }
  } catch (error) {
    console.error("Failed to fetch jobs for sitemap:", error);
  }

  const staticPages: MetadataRoute.Sitemap = [
    // Forside
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // Hovedkategorier
    {
      url: `${base}/kandidat`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/kunde`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // Konverteringssider (VIKTIGST!)
    {
      url: `${base}/meld-interesse`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${base}/kunde/registrer-behov`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },

    // Tjenestesider - kunde
    {
      url: `${base}/kunde/bemanning`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/kunde/rekruttering`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/kunde/hva-vi-hjelper-med`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Kandidatsider
    {
      url: `${base}/kandidat/oppdrag`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/kandidat/registrer`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // Karriere - Jobber (viktige SEO-sider - "hvordan bli X")
    {
      url: `${base}/karriere/skipsforer`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/karriere/matros`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/karriere/maskinoffiser`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // Lønn - HØYT søkevolum (viktigste SEO-sider!)
    {
      url: `${base}/lonn/kalkulator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${base}/lonn/oversikt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/lonn/kaptein`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/lonn/styrmann`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/lonn/matros`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/lonn/maskinoffiser`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/lonn/dekksoffiser`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // Informasjonssider
    {
      url: `${base}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/om-oss`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/kontakt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // Juridiske sider (GDPR-påkrevd)
    {
      url: `${base}/personvern`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/vilkar`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },

    // Jobbportal
    {
      url: `${base}/stillinger`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Add dynamic job posting pages
  const jobPages: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${base}/stillinger/${job.slug}`,
    lastModified: job.updated_at ? new Date(job.updated_at) : now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...jobPages];
}
