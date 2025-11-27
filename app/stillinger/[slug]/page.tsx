/**
 * JOB DETAIL PAGE - Server Component
 * Route: bluecrew.no/stillinger/[slug]
 *
 * Server-side rendered for SEO:
 * - Dynamic metadata for social sharing
 * - Google Jobs JSON-LD structured data
 * - Fast initial page load
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteLayout from "@/app/components/SiteLayout";
import JobDetailClient from "./JobDetailClient";

// Types
type JobPosting = {
  id: string;
  title: string;
  company_name: string | null;
  vessel_name: string | null;
  short_description: string | null;
  description: string;
  requirements: string[] | null;
  responsibilities: string[] | null;
  benefits: string[] | null;
  job_type: string;
  category: string;
  location: string;
  region: string | null;
  fylke: string;
  kommune: string;
  start_date: string | null;
  end_date: string | null;
  duration_days: number | null;
  salary_text: string | null;
  application_deadline: string | null;
  published_at: string | null;
  created_at: string;
  slug: string;
  view_count: number;
  application_count: number;
  contact_person: string | null;
  contact_email: string | null;
  contact_phone: string | null;
};

// Fetch job from AdminCrew API
async function getJob(slug: string): Promise<JobPosting | null> {
  const apiUrl = process.env.NEXT_PUBLIC_ADMIN_URL || "https://admincrew.no";
  const fullUrl = `${apiUrl}/api/job-postings?status=active`;

  try {
    const response = await fetch(fullUrl, {
      next: { revalidate: 60 }, // Cache for 60 seconds
      headers: {
        Accept: "application/json",
        "User-Agent": "Bluecrew/1.0",
      },
    });

    if (!response.ok) {
      console.error(`[getJob] API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const json = await response.json();
    const jobs = json.data || json;

    if (!Array.isArray(jobs)) {
      console.error("[getJob] Invalid API response format");
      return null;
    }

    return jobs.find((j: JobPosting) => j.slug === slug) || null;
  } catch (error) {
    // Log error but don't expose to user
    console.error("[getJob] Fetch failed:", error instanceof Error ? error.message : "Unknown error");
    return null;
  }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job) {
    return {
      title: "Stilling ikke funnet | Bluecrew AS",
    };
  }

  const title = `${job.title} | ${job.company_name || "Bluecrew AS"}`;
  const description = job.short_description || job.description.substring(0, 160);

  return {
    title,
    description,
    keywords: [
      job.title,
      job.category,
      job.fylke,
      "maritim jobb",
      "stilling",
      job.job_type,
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://bluecrew.no/stillinger/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/stillinger/${slug}`,
    },
  };
}

// Generate Google Jobs JSON-LD structured data
function generateJobPostingSchema(job: JobPosting) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.published_at || job.created_at,
    validThrough: job.application_deadline || undefined,
    employmentType:
      job.job_type === "Fast"
        ? "FULL_TIME"
        : job.job_type === "Vikariat"
          ? "TEMPORARY"
          : "CONTRACTOR",
    hiringOrganization: {
      "@type": "Organization",
      name: job.company_name || "Bluecrew AS",
      sameAs: "https://bluecrew.no",
      logo: "https://bluecrew.no/logo.png",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.kommune,
        addressRegion: job.fylke,
        addressCountry: "NO",
      },
    },
    baseSalary: job.salary_text
      ? {
          "@type": "MonetaryAmount",
          currency: "NOK",
          value: {
            "@type": "QuantitativeValue",
            value: job.salary_text,
          },
        }
      : undefined,
    occupationalCategory: job.category,
    industry: "Maritime",
    workHours: job.duration_days ? `${job.duration_days} dager` : undefined,
    identifier: {
      "@type": "PropertyValue",
      name: "Bluecrew",
      value: job.id,
    },
  };
}

// Server Component
export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job) {
    notFound();
  }

  const jobPostingSchema = generateJobPostingSchema(job);

  return (
    <SiteLayout active="stillinger">
      {/* Google Jobs Structured Data - Server rendered for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />

      {/* Client component for interactivity */}
      <JobDetailClient job={job} />
    </SiteLayout>
  );
}
