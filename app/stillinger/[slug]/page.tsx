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
import SiteLayout from "@/app/components/SiteLayout";
import * as styles from "./StillingDetail.css";

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

      const json = await response.json();
      // AdminCrew returns { data: [...], pagination: {...} }
      const jobs = json.data || json;
      const foundJob = Array.isArray(jobs) ? jobs.find((j: JobPosting) => j.slug === slug) : null;

      if (!foundJob) {
        setNotFound(true);
        return;
      }

      setJob(foundJob);

      // Note: View count tracking should be handled by AdminCrew API
      // Removed PATCH request that was causing issues
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
      <SiteLayout active="stillinger">
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner} />
          <p style={{ color: "#64748b" }}>Laster stillingsannonse...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </SiteLayout>
    );
  }

  if (notFound || !job) {
    return (
      <SiteLayout active="stillinger">
        <div className={styles.errorState}>
          <AlertCircle className={styles.errorIcon} />
          <h1 className={styles.errorTitle}>Stilling ikke funnet</h1>
          <p className={styles.errorText}>
            Denne stillingen eksisterer ikke eller er ikke lenger aktiv.
          </p>
          <Link href="/stillinger" className={styles.primaryButton}>
            <ArrowLeft size={18} />
            Tilbake til stillinger
          </Link>
        </div>
      </SiteLayout>
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
    <SiteLayout active="stillinger">
      {/* Google Jobs Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <section className={styles.section}>
        <div className={styles.container}>
          {/* Back link */}
          <Link href="/stillinger" className={styles.backButton}>
            <ArrowLeft size={18} />
            Tilbake til stillinger
          </Link>

          {/* Hero Section */}
          <div className={styles.hero}>
            <div className={styles.badges}>
              <span className={styles.badge}>{job.job_type}</span>
              <span className={styles.badge}>{job.category}</span>
              {deadline && deadline.isUrgent && !deadline.isExpired && (
                <span className={`${styles.badge} ${styles.badgeUrgent}`}>
                  <Clock size={14} style={{ marginRight: 4 }} />
                  Søk snart!
                </span>
              )}
            </div>

            <h1 className={styles.title}>{job.title}</h1>

            <div className={styles.metaRow}>
              {job.company_name && (
                <span className={styles.metaItemLight}>
                  <Building size={18} />
                  {job.company_name}
                </span>
              )}
              {job.vessel_name && (
                <span className={styles.metaItemLight}>
                  <Ship size={18} />
                  {job.vessel_name}
                </span>
              )}
              <span className={styles.metaItemLight}>
                <MapPin size={18} />
                {job.location}, {job.fylke}
              </span>
            </div>

            {job.salary_text && (
              <div className={styles.salary}>
                <DollarSign size={22} />
                {job.salary_text}
              </div>
            )}
          </div>

          {/* Main Grid */}
          <div className={styles.grid}>
            {/* Left Column - Main Content */}
            <div className={styles.mainContent}>
              {/* Description */}
              <div className={styles.card}>
                <h2 className={styles.sectionTitle}>Om stillingen</h2>
                <p className={styles.description}>{job.description}</p>
              </div>

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <div className={styles.card}>
                  <h2 className={styles.sectionTitle}>Kvalifikasjoner</h2>
                  <ul className={styles.list}>
                    {job.requirements.map((req, index) => (
                      <li key={index} className={styles.listItem}>
                        <CheckCircle size={18} color="#22c55e" className={styles.listIcon} />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div className={styles.card}>
                  <h2 className={styles.sectionTitle}>Arbeidsoppgaver</h2>
                  <ul className={styles.list}>
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className={styles.listItem}>
                        <Briefcase size={18} color="#0369a1" className={styles.listIcon} />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <div className={styles.card}>
                  <h2 className={styles.sectionTitle}>Vi tilbyr</h2>
                  <ul className={styles.list}>
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className={styles.listItem}>
                        <CheckCircle size={18} color="#22c55e" className={styles.listIcon} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className={styles.sidebar}>
              {/* Apply CTA */}
              <div className={styles.ctaCard}>
                {deadline && deadline.isExpired ? (
                  <div className={styles.expiredCard}>
                    <AlertCircle size={48} className={styles.expiredIcon} />
                    <h3 className={styles.expiredTitle}>Søknadsfristen er utgått</h3>
                    <p className={styles.expiredText}>
                      Denne stillingen tar ikke lenger imot søknader.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className={styles.ctaTitle}>Interessert?</h3>

                    {deadline && (
                      <div className={styles.deadlineBox}>
                        <div className={styles.deadlineLabel}>
                          <Clock size={16} />
                          Søknadsfrist
                        </div>
                        <p className={styles.deadlineDate}>
                          {formatDate(job.application_deadline)}
                        </p>
                        <p className={deadline.isUrgent ? styles.deadlineUrgent : styles.deadlineRemaining}>
                          {deadline.text} igjen
                        </p>
                      </div>
                    )}

                    <button onClick={handleApply} className={styles.ctaButton}>
                      SØK PÅ STILLINGEN
                    </button>

                    <p className={styles.ctaNote}>
                      Du vil bli bedt om å verifisere deg med Vipps
                    </p>
                  </>
                )}
              </div>

              {/* Job Details */}
              <div className={styles.detailsCard}>
                <h3 className={styles.detailsTitle}>Detaljer</h3>
                <div className={styles.detailsList}>
                  {job.start_date && (
                    <div className={styles.detailItem}>
                      <Calendar size={18} className={styles.detailIcon} />
                      <div className={styles.detailContent}>
                        <p className={styles.detailLabel}>Oppstart</p>
                        <p className={styles.detailValue}>{formatDate(job.start_date)}</p>
                      </div>
                    </div>
                  )}

                  {job.duration_days && (
                    <div className={styles.detailItem}>
                      <Clock size={18} className={styles.detailIcon} />
                      <div className={styles.detailContent}>
                        <p className={styles.detailLabel}>Varighet</p>
                        <p className={styles.detailValue}>{job.duration_days} dager</p>
                      </div>
                    </div>
                  )}

                  <div className={styles.detailItem}>
                    <Eye size={18} className={styles.detailIcon} />
                    <div className={styles.detailContent}>
                      <p className={styles.detailLabel}>Visninger</p>
                      <p className={styles.detailValue}>{job.view_count}</p>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    <Users size={18} className={styles.detailIcon} />
                    <div className={styles.detailContent}>
                      <p className={styles.detailLabel}>Søkere</p>
                      <p className={styles.detailValue}>{job.application_count}</p>
                    </div>
                  </div>
                </div>

                <button onClick={shareJob} className={styles.shareButton}>
                  <Share2 size={16} />
                  Del stilling
                </button>
              </div>

              {/* Contact */}
              {(job.contact_person || job.contact_email || job.contact_phone) && (
                <div className={styles.detailsCard}>
                  <h3 className={styles.detailsTitle}>Kontakt</h3>
                  <div style={{ fontSize: "0.9rem", color: "#64748b" }}>
                    {job.contact_person && <p style={{ fontWeight: 600, color: "#0f172a" }}>{job.contact_person}</p>}
                    {job.contact_email && (
                      <a href={`mailto:${job.contact_email}`} style={{ color: "#0369a1", display: "block", marginTop: 4 }}>
                        {job.contact_email}
                      </a>
                    )}
                    {job.contact_phone && (
                      <a href={`tel:${job.contact_phone}`} style={{ color: "#0369a1", display: "block", marginTop: 4 }}>
                        {job.contact_phone}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
