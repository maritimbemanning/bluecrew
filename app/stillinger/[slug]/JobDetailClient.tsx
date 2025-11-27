/**
 * JOB DETAIL CLIENT COMPONENT
 * Handles interactivity: apply button, share, etc.
 * Uses inline styles consistent with rest of site
 */

"use client";

import React, { useState, CSSProperties } from "react";
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

// Inline styles following the sx pattern
const styles: Record<string, CSSProperties> = {
  section: {
    paddingTop: 0,
    paddingBottom: 32,
    background: "#f8fafc",
    minHeight: "100vh",
  },
  container: {
    maxWidth: 1140,
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0 clamp(18px, 6vw, 26px)",
  },
  backButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 16px",
    marginBottom: 24,
    marginTop: 24,
    color: "#64748b",
    fontSize: 14,
    fontWeight: 500,
    textDecoration: "none",
    borderRadius: 8,
    background: "transparent",
  },
  hero: {
    background: "linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #0d2847 100%)",
    color: "#fff",
    padding: "clamp(40px, 6vw, 60px) 0",
    marginBottom: 32,
    position: "relative",
    overflow: "hidden",
  },
  heroInner: {
    maxWidth: 1140,
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0 clamp(18px, 6vw, 26px)",
    position: "relative",
    zIndex: 1,
  },
  badges: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 16px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 600,
    border: "1px solid rgba(255,255,255,0.1)",
  },
  badgeUrgent: {
    background: "rgba(239, 68, 68, 0.9)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
  },
  badgeFast: {
    background: "rgba(34, 197, 94, 0.2)",
    border: "1px solid rgba(34, 197, 94, 0.3)",
    color: "#86efac",
  },
  badgeVikariat: {
    background: "rgba(251, 191, 36, 0.2)",
    border: "1px solid rgba(251, 191, 36, 0.3)",
    color: "#fcd34d",
  },
  title: {
    fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
    fontWeight: 800,
    marginBottom: 16,
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
    maxWidth: 800,
  },
  metaRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 24,
    color: "rgba(226, 232, 240, 0.9)",
    fontSize: 15,
    marginBottom: 16,
  },
  metaItemLight: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "rgba(226, 232, 240, 0.9)",
  },
  salary: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: 700,
    color: "#86efac",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 32,
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  card: {
    background: "#ffffff",
    borderRadius: 16,
    padding: "clamp(20px, 4vw, 32px)",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 24,
    display: "flex",
    alignItems: "center",
    gap: 12,
    paddingBottom: 16,
    borderBottom: "2px solid #f1f5f9",
  },
  description: {
    fontSize: 16,
    lineHeight: 1.8,
    color: "#475569",
    whiteSpace: "pre-wrap",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  listItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    fontSize: 15,
    lineHeight: 1.6,
    color: "#475569",
    padding: 12,
    borderRadius: 8,
  },
  listIcon: {
    flexShrink: 0,
    marginTop: 2,
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  ctaCard: {
    background: "linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #0d2847 100%)",
    color: "#fff",
    borderRadius: 16,
    padding: "clamp(24px, 4vw, 32px)",
    boxShadow: "0 20px 40px rgba(10, 22, 40, 0.3)",
    position: "relative",
    overflow: "hidden",
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 24,
    position: "relative",
    zIndex: 1,
  },
  deadlineBox: {
    background: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    border: "1px solid rgba(255,255,255,0.1)",
    position: "relative",
    zIndex: 1,
  },
  deadlineLabel: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 6,
    color: "rgba(226, 232, 240, 0.8)",
  },
  deadlineDate: {
    fontSize: 20,
    fontWeight: 700,
  },
  deadlineRemaining: {
    fontSize: 14,
    color: "rgba(226, 232, 240, 0.7)",
    marginTop: 4,
  },
  deadlineUrgent: {
    fontSize: 14,
    color: "#fde68a",
    fontWeight: 600,
    marginTop: 4,
  },
  ctaButton: {
    width: "100%",
    padding: "18px 24px",
    background: "#ffffff",
    color: "#0369a1",
    border: "none",
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    marginBottom: 16,
    position: "relative",
    zIndex: 1,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  ctaNote: {
    fontSize: 13,
    color: "rgba(226, 232, 240, 0.6)",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },
  detailsCard: {
    background: "#ffffff",
    borderRadius: 16,
    padding: "clamp(20px, 4vw, 28px)",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 24,
    paddingBottom: 12,
    borderBottom: "2px solid #f1f5f9",
  },
  detailsList: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  detailItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: 12,
    borderRadius: 8,
  },
  detailIcon: {
    color: "#94a3b8",
    flexShrink: 0,
    marginTop: 2,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontWeight: 600,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: 600,
    color: "#0f172a",
    marginTop: 4,
  },
  shareButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "12px 16px",
    background: "transparent",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    color: "#64748b",
    cursor: "pointer",
    marginTop: 24,
  },
  expiredCard: {
    textAlign: "center",
    padding: 32,
  },
  expiredTitle: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 12,
  },
  expiredText: {
    fontSize: 14,
    color: "rgba(226, 232, 240, 0.7)",
  },
};

export default function JobDetailClient({ job }: JobDetailClientProps) {
  const router = useRouter();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

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

  // Responsive grid styles based on window width (simplified for SSR compatibility)
  const gridStyle: CSSProperties = {
    ...styles.grid,
  };

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (min-width: 900px) {
          .job-detail-grid { grid-template-columns: 1fr 380px !important; align-items: start; }
          .job-detail-sidebar { position: sticky; top: 100px; }
        }
      `}</style>

      <section style={styles.section}>
        {/* Back Button */}
        <div style={styles.container}>
          <Link
            href="/stillinger"
            style={{
              ...styles.backButton,
              background: hoveredButton === "back" ? "#f0f9ff" : "transparent",
              color: hoveredButton === "back" ? "#0369a1" : "#64748b",
            }}
            onMouseEnter={() => setHoveredButton("back")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <ArrowLeft size={18} />
            Tilbake til stillinger
          </Link>
        </div>

        {/* Hero Section */}
        <div style={styles.hero}>
          <div style={styles.heroInner}>
            {/* Badges */}
            <div style={styles.badges}>
              <span
                style={{
                  ...styles.badge,
                  ...(job.job_type === "Fast"
                    ? styles.badgeFast
                    : styles.badgeVikariat),
                }}
              >
                {job.job_type}
              </span>
              <span style={styles.badge}>{job.category}</span>
              {deadline && deadline.isUrgent && !deadline.isExpired && (
                <span style={{ ...styles.badge, ...styles.badgeUrgent }}>
                  <Clock size={14} />
                  Søk snart!
                </span>
              )}
            </div>

            {/* Title */}
            <h1 style={styles.title}>{job.title}</h1>

            {/* Meta Row */}
            <div style={styles.metaRow}>
              {job.company_name && (
                <span style={styles.metaItemLight}>
                  <Building size={18} />
                  {job.company_name}
                </span>
              )}
              {job.vessel_name && (
                <span style={styles.metaItemLight}>
                  <Ship size={18} />
                  {job.vessel_name}
                </span>
              )}
              <span style={styles.metaItemLight}>
                <MapPin size={18} />
                {job.kommune}, {job.fylke}
              </span>
            </div>

            {/* Salary */}
            {job.salary_text && (
              <div style={styles.salary}>
                <DollarSign size={22} />
                {job.salary_text}
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={styles.container}>
          <div className="job-detail-grid" style={gridStyle}>
            {/* Left Column - Main Content */}
            <div style={styles.mainContent}>
              {/* Description */}
              <div style={styles.card}>
                <h2 style={styles.sectionTitle}>
                  <FileText size={20} color="#0369a1" />
                  Om stillingen
                </h2>
                <p style={styles.description}>{job.description}</p>
              </div>

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <div style={styles.card}>
                  <h2 style={styles.sectionTitle}>
                    <Award size={20} color="#0369a1" />
                    Kvalifikasjoner
                  </h2>
                  <ul style={styles.list}>
                    {job.requirements.map((req, index) => (
                      <li key={index} style={styles.listItem}>
                        <CheckCircle
                          size={18}
                          color="#22c55e"
                          style={styles.listIcon}
                        />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div style={styles.card}>
                  <h2 style={styles.sectionTitle}>
                    <Briefcase size={20} color="#0369a1" />
                    Arbeidsoppgaver
                  </h2>
                  <ul style={styles.list}>
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} style={styles.listItem}>
                        <Briefcase
                          size={18}
                          color="#0369a1"
                          style={styles.listIcon}
                        />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <div style={styles.card}>
                  <h2 style={styles.sectionTitle}>
                    <CheckCircle size={20} color="#22c55e" />
                    Vi tilbyr
                  </h2>
                  <ul style={styles.list}>
                    {job.benefits.map((benefit, index) => (
                      <li key={index} style={styles.listItem}>
                        <CheckCircle
                          size={18}
                          color="#22c55e"
                          style={styles.listIcon}
                        />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="job-detail-sidebar" style={styles.sidebar}>
              {/* Apply CTA */}
              <div style={styles.ctaCard}>
                {deadline && deadline.isExpired ? (
                  <div style={styles.expiredCard}>
                    <h3 style={styles.expiredTitle}>
                      Søknadsfristen er utgått
                    </h3>
                    <p style={styles.expiredText}>
                      Denne stillingen tar ikke lenger imot søknader.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 style={styles.ctaTitle}>Interessert?</h3>

                    {deadline && (
                      <div style={styles.deadlineBox}>
                        <div style={styles.deadlineLabel}>
                          <Clock size={16} />
                          Søknadsfrist
                        </div>
                        <p style={styles.deadlineDate}>
                          {formatDate(job.application_deadline)}
                        </p>
                        <p
                          style={
                            deadline.isUrgent
                              ? styles.deadlineUrgent
                              : styles.deadlineRemaining
                          }
                        >
                          {deadline.text} igjen
                        </p>
                      </div>
                    )}

                    <button
                      onClick={handleApply}
                      style={{
                        ...styles.ctaButton,
                        transform: hoveredButton === "apply" ? "translateY(-2px)" : undefined,
                        boxShadow: hoveredButton === "apply" ? "0 8px 24px rgba(0,0,0,0.2)" : "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                      onMouseEnter={() => setHoveredButton("apply")}
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      SØK PÅ STILLINGEN
                    </button>

                    <p style={styles.ctaNote}>
                      Du vil bli bedt om å verifisere deg med Vipps
                    </p>
                  </>
                )}
              </div>

              {/* Job Details */}
              <div style={styles.detailsCard}>
                <h3 style={styles.detailsTitle}>Detaljer</h3>
                <div style={styles.detailsList}>
                  {job.start_date && (
                    <div style={styles.detailItem}>
                      <Calendar size={18} style={styles.detailIcon} />
                      <div style={styles.detailContent}>
                        <p style={styles.detailLabel}>Oppstart</p>
                        <p style={styles.detailValue}>
                          {formatDate(job.start_date)}
                        </p>
                      </div>
                    </div>
                  )}

                  {job.duration_days && (
                    <div style={styles.detailItem}>
                      <Clock size={18} style={styles.detailIcon} />
                      <div style={styles.detailContent}>
                        <p style={styles.detailLabel}>Varighet</p>
                        <p style={styles.detailValue}>
                          {job.duration_days} dager
                        </p>
                      </div>
                    </div>
                  )}

                  <div style={styles.detailItem}>
                    <Eye size={18} style={styles.detailIcon} />
                    <div style={styles.detailContent}>
                      <p style={styles.detailLabel}>Visninger</p>
                      <p style={styles.detailValue}>{job.view_count}</p>
                    </div>
                  </div>

                  <div style={styles.detailItem}>
                    <Users size={18} style={styles.detailIcon} />
                    <div style={styles.detailContent}>
                      <p style={styles.detailLabel}>Søkere</p>
                      <p style={styles.detailValue}>
                        {job.application_count}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={shareJob}
                  style={{
                    ...styles.shareButton,
                    background: hoveredButton === "share" ? "#f8fafc" : "transparent",
                    borderColor: hoveredButton === "share" ? "#cbd5e1" : "#e2e8f0",
                    color: hoveredButton === "share" ? "#0f172a" : "#64748b",
                  }}
                  onMouseEnter={() => setHoveredButton("share")}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <Share2 size={16} />
                  Del stilling
                </button>
              </div>

              {/* Contact */}
              {(job.contact_person ||
                job.contact_email ||
                job.contact_phone) && (
                <div style={styles.detailsCard}>
                  <h3 style={styles.detailsTitle}>Kontakt</h3>
                  <div style={{ fontSize: 14, color: "#64748b" }}>
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
