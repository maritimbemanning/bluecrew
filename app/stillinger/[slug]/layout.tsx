import { Metadata } from "next";

type JobPosting = {
  id: string;
  title: string;
  company_name: string | null;
  short_description: string | null;
  location: string;
  fylke: string;
  job_type: string;
  salary_text: string | null;
  slug: string;
};

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

async function getJob(slug: string): Promise<JobPosting | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_URL || "https://admincrew.no"}/api/job-postings?status=active`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!res.ok) return null;

    const json = await res.json();
    const jobs = json.data || json;
    return Array.isArray(jobs) ? jobs.find((j: JobPosting) => j.slug === slug) || null : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job) {
    return {
      title: "Stilling ikke funnet | Bluecrew",
      description: "Denne stillingen finnes ikke eller er ikke lenger aktiv.",
    };
  }

  const title = `${job.title} | ${job.location} | Bluecrew`;
  const description = job.short_description
    || `${job.title} i ${job.location}. ${job.job_type}. Søk nå hos Bluecrew - Maritim bemanning.`;

  return {
    title,
    description,
    keywords: [
      job.title.toLowerCase(),
      "maritim jobb",
      job.location.toLowerCase(),
      job.fylke?.toLowerCase(),
      job.job_type?.toLowerCase(),
      "sjøfart",
      "maritime stillinger",
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://bluecrew.no/stillinger/${slug}`,
      siteName: "Bluecrew",
      locale: "nb_NO",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://bluecrew.no/stillinger/${slug}`,
    },
  };
}

export default function JobDetailLayout({ children }: Props) {
  return children;
}
