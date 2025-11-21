/**
 * JOB DETAIL PAGE
 * Route: bluecrew.no/stillinger/[slug]
 *
 * Shows full job posting details with "SØK PÅ STILLINGEN" button
 * Includes Google Jobs structured data for SEO
 */

"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  Building,
  DollarSign,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Share2,
  Eye,
  Users,
  Ship,
} from "lucide-react";
import Link from "next/link";

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
  slug: string;
  view_count: number;
  application_count: number;
  contact_person: string | null;
  contact_email: string | null;
  contact_phone: string | null;
};

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [job, setJob] = useState<JobPosting | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Load job by slug
  const loadJob = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ADMIN_URL || "https://admincrew.no"}/api/job-postings?status=active`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch job");
      }

      const jobs = await response.json();
      const foundJob = jobs.find((j: JobPosting) => j.slug === slug);

      if (!foundJob) {
        setNotFound(true);
        return;
      }

      setJob(foundJob);

      // Increment view count (fire and forget)
      fetch(
        `${process.env.NEXT_PUBLIC_ADMIN_URL || "https://admincrew.no"}/api/job-postings?id=${foundJob.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ view_count: foundJob.view_count + 1 }),
        }
      ).catch(() => {});
    } catch (error) {
      console.error("Error loading job:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Days until deadline
  const daysUntilDeadline = (deadline: string | null) => {
    if (!deadline) return null;
    const days = Math.ceil(
      (new Date(deadline).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );
    if (days < 0) return { text: "Utgått", isUrgent: false, isExpired: true };
    if (days === 0) return { text: "I dag", isUrgent: true, isExpired: false };
    if (days === 1) return { text: "1 dag", isUrgent: true, isExpired: false };
    return {
      text: `${days} dager`,
      isUrgent: days <= 7,
      isExpired: false,
    };
  };

  // Handle apply
  const handleApply = () => {
    // Redirect to Vipps verification, then to application form
    router.push(`/stillinger/${slug}/sok`);
  };

  // Share job
  const shareJob = () => {
    if (navigator.share) {
      navigator
        .share({
          title: job?.title,
          text: job?.short_description || job?.description.substring(0, 100),
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link kopiert til utklippstavle!");
    }
  };

  useEffect(() => {
    loadJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">
            Laster stillingsannonse...
          </p>
        </div>
      </div>
    );
  }

  if (notFound || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Stilling ikke funnet
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Denne stillingen eksisterer ikke eller er ikke lenger aktiv.
          </p>
          <Link
            href="/stillinger"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            Tilbake til stillinger
          </Link>
        </div>
      </div>
    );
  }

  const deadline = daysUntilDeadline(job.application_deadline);

  // Generate Google Jobs JSON-LD structured data
  const jobPostingSchema = {
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
        addressLocality: job.location,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Google Jobs Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/stillinger"
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Tilbake til stillinger
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-medium">
                {job.job_type}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-medium">
                {job.category}
              </span>
              {deadline && deadline.isUrgent && !deadline.isExpired && (
                <span className="px-3 py-1 bg-red-500 rounded-full text-sm font-medium flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Søk snart!
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{job.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-blue-100">
              {job.company_name && (
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  <span>{job.company_name}</span>
                </div>
              )}
              {job.vessel_name && (
                <div className="flex items-center gap-2">
                  <Ship className="h-5 w-5" />
                  <span>{job.vessel_name}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>
                  {job.location}, {job.fylke}
                </span>
              </div>
            </div>

            {job.salary_text && (
              <div className="mt-4 text-xl font-medium text-green-200 flex items-center gap-2">
                <DollarSign className="h-6 w-6" />
                {job.salary_text}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Om stillingen
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                  {job.description}
                </p>
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Kvalifikasjoner
                </h2>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Arbeidsoppgaver
                </h2>
                <ul className="space-y-2">
                  {job.responsibilities.map((resp, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
                    >
                      <Briefcase className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Vi tilbyr
                </h2>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Apply CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl shadow-xl p-6 sticky top-6">
              {deadline && deadline.isExpired ? (
                <div className="text-center">
                  <AlertCircle className="h-12 w-12 mx-auto mb-3" />
                  <h3 className="text-xl font-bold mb-2">
                    Søknadsfristen er utgått
                  </h3>
                  <p className="text-blue-100 text-sm">
                    Denne stillingen tar ikke lenger imot søknader.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-4">Interessert?</h3>

                  {deadline && (
                    <div className="bg-white/20 backdrop-blur rounded-xl p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5" />
                        <span className="font-medium">Søknadsfrist</span>
                      </div>
                      <p className="text-lg">
                        {formatDate(job.application_deadline)}
                      </p>
                      <p
                        className={`text-sm mt-1 ${
                          deadline.isUrgent
                            ? "text-yellow-200 font-medium"
                            : "text-blue-100"
                        }`}
                      >
                        {deadline.text} igjen
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleApply}
                    className="w-full py-4 bg-white text-blue-700 rounded-xl hover:bg-blue-50 transition-colors font-bold text-lg mb-4"
                  >
                    SØK PÅ STILLINGEN
                  </button>

                  <p className="text-sm text-blue-100 text-center">
                    Du vil bli bedt om å verifisere deg med Vipps
                  </p>
                </>
              )}
            </div>

            {/* Job Details */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Detaljer
              </h3>

              {job.start_date && (
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Oppstart
                    </p>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {formatDate(job.start_date)}
                    </p>
                  </div>
                </div>
              )}

              {job.duration_days && (
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Varighet
                    </p>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {job.duration_days} dager
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Eye className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Visninger
                  </p>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {job.view_count}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Søkere
                  </p>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {job.application_count}
                  </p>
                </div>
              </div>

              <button
                onClick={shareJob}
                className="w-full flex items-center justify-center gap-2 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                Del stilling
              </button>
            </div>

            {/* Contact */}
            {(job.contact_person || job.contact_email || job.contact_phone) && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  Kontakt
                </h3>
                <div className="space-y-2 text-sm">
                  {job.contact_person && (
                    <p className="text-slate-600 dark:text-slate-300">
                      {job.contact_person}
                    </p>
                  )}
                  {job.contact_email && (
                    <a
                      href={`mailto:${job.contact_email}`}
                      className="block text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {job.contact_email}
                    </a>
                  )}
                  {job.contact_phone && (
                    <a
                      href={`tel:${job.contact_phone}`}
                      className="block text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {job.contact_phone}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
