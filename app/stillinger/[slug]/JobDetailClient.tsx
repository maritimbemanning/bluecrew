/**
 * JOB DETAIL CLIENT COMPONENT
 * Handles interactivity: apply button, share, etc.
 * Uses Vanilla Extract CSS for styling
 */

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  Building,
  DollarSign,
  CheckCircle,
  ArrowLeft,
  Share2,
  Eye,
  Users,
  Ship,
  FileText,
  Award,
} from "lucide-react";
import Link from "next/link";
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

interface JobDetailClientProps {
  job: JobPosting;
}

export default function JobDetailClient({ job }: JobDetailClientProps) {
  const router = useRouter();

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
    if (days === 0) return { text: "I dag!", isUrgent: true, isExpired: false };
    if (days === 1) return { text: "1 dag", isUrgent: true, isExpired: false };
    return {
      text: `${days} dager`,
      isUrgent: days <= 7,
      isExpired: false,
    };
  };

  // Handle apply
  const handleApply = () => {
    router.push(`/stillinger/${job.slug}/sok`);
  };

  // Share job
  const shareJob = () => {
    if (navigator.share) {
      navigator
        .share({
          title: job.title,
          text: job.short_description || job.description.substring(0, 100),
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link kopiert til utklippstavle!");
    }
  };

  const deadline = daysUntilDeadline(job.application_deadline);

  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <section className={styles.section}>
        {/* Back Button */}
        <div className={styles.container}>
          <Link href="/stillinger" className={styles.backButton}>
            <ArrowLeft size={18} />
            Tilbake til stillinger
          </Link>
        </div>

        {/* Hero Section */}
        <div className={styles.hero}>
          <div className={styles.heroInner}>
            {/* Badges */}
            <div className={styles.badges}>
              <span
                className={`${styles.badge} ${
                  job.job_type === "Fast"
                    ? styles.badgeFast
                    : styles.badgeVikariat
                }`}
              >
                {job.job_type}
              </span>
              <span className={styles.badge}>{job.category}</span>
              {deadline && deadline.isUrgent && !deadline.isExpired && (
                <span className={`${styles.badge} ${styles.badgeUrgent}`}>
                  <Clock size={14} />
                  Søk snart!
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className={styles.title}>{job.title}</h1>

            {/* Meta Row */}
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
                {job.kommune}, {job.fylke}
              </span>
            </div>

            {/* Salary */}
            {job.salary_text && (
              <div className={styles.salary}>
                <DollarSign size={22} />
                {job.salary_text}
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Left Column - Main Content */}
            <div className={styles.mainContent}>
              {/* Description */}
              <div className={styles.card}>
                <h2 className={styles.sectionTitle}>
                  <FileText size={20} color="#0369a1" />
                  Om stillingen
                </h2>
                <p className={styles.description}>{job.description}</p>
              </div>

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <div className={styles.card}>
                  <h2 className={styles.sectionTitle}>
                    <Award size={20} color="#0369a1" />
                    Kvalifikasjoner
                  </h2>
                  <ul className={styles.list}>
                    {job.requirements.map((req, index) => (
                      <li key={index} className={styles.listItem}>
                        <CheckCircle
                          size={18}
                          color="#22c55e"
                          className={styles.listIcon}
                        />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div className={styles.card}>
                  <h2 className={styles.sectionTitle}>
                    <Briefcase size={20} color="#0369a1" />
                    Arbeidsoppgaver
                  </h2>
                  <ul className={styles.list}>
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className={styles.listItem}>
                        <Briefcase
                          size={18}
                          color="#0369a1"
                          className={styles.listIcon}
                        />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <div className={styles.card}>
                  <h2 className={styles.sectionTitle}>
                    <CheckCircle size={20} color="#22c55e" />
                    Vi tilbyr
                  </h2>
                  <ul className={styles.list}>
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className={styles.listItem}>
                        <CheckCircle
                          size={18}
                          color="#22c55e"
                          className={styles.listIcon}
                        />
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
                    <h3 className={styles.expiredTitle}>
                      Søknadsfristen er utgått
                    </h3>
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
                        <p
                          className={
                            deadline.isUrgent
                              ? styles.deadlineUrgent
                              : styles.deadlineRemaining
                          }
                        >
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
                        <p className={styles.detailValue}>
                          {formatDate(job.start_date)}
                        </p>
                      </div>
                    </div>
                  )}

                  {job.duration_days && (
                    <div className={styles.detailItem}>
                      <Clock size={18} className={styles.detailIcon} />
                      <div className={styles.detailContent}>
                        <p className={styles.detailLabel}>Varighet</p>
                        <p className={styles.detailValue}>
                          {job.duration_days} dager
                        </p>
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
                      <p className={styles.detailValue}>
                        {job.application_count}
                      </p>
                    </div>
                  </div>
                </div>

                <button onClick={shareJob} className={styles.shareButton}>
                  <Share2 size={16} />
                  Del stilling
                </button>
              </div>

              {/* Contact */}
              {(job.contact_person ||
                job.contact_email ||
                job.contact_phone) && (
                <div className={styles.detailsCard}>
                  <h3 className={styles.detailsTitle}>Kontakt</h3>
                  <div style={{ fontSize: "0.9rem", color: "#64748b" }}>
                    {job.contact_person && (
                      <p style={{ fontWeight: 600, color: "#0f172a" }}>
                        {job.contact_person}
                      </p>
                    )}
                    {job.contact_email && (
                      <a
                        href={`mailto:${job.contact_email}`}
                        style={{
                          color: "#0369a1",
                          display: "block",
                          marginTop: 8,
                          fontWeight: 500,
                        }}
                      >
                        {job.contact_email}
                      </a>
                    )}
                    {job.contact_phone && (
                      <a
                        href={`tel:${job.contact_phone}`}
                        style={{
                          color: "#0369a1",
                          display: "block",
                          marginTop: 8,
                          fontWeight: 500,
                        }}
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
      </section>
    </>
  );
}
