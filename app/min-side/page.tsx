/**
 * USER PORTAL - MIN SIDE
 * Route: bluecrew.no/min-side
 *
 * Clean dashboard showing:
 * - Candidate registration status
 * - Job applications
 * - Quick actions
 */

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SiteLayout from "@/app/components/SiteLayout";
import {
  User,
  FileText,
  ChevronDown,
  ChevronUp,
  Loader2,
  CheckCircle,
  Clock,
  XCircle,
  Briefcase,
  Shield,
} from "lucide-react";
import { useUser, SignOutButton, UserButton } from "@clerk/nextjs";

type JobApplication = {
  id: string;
  job_posting: {
    id: string;
    title: string;
    company_name: string | null;
  } | null;
  status: string;
  created_at: string;
};

type CandidateStatus = {
  registered: boolean;
  candidate?: {
    id: string;
    name: string;
    submittedAt: string;
    status: string;
  };
};

const statusLabels: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  new: { label: "Mottatt", color: "#3b82f6", icon: <Clock size={14} /> },
  reviewed: { label: "Under vurdering", color: "#f59e0b", icon: <Clock size={14} /> },
  contacted: { label: "Kontaktet", color: "#10b981", icon: <CheckCircle size={14} /> },
  interview: { label: "Til intervju", color: "#8b5cf6", icon: <CheckCircle size={14} /> },
  hired: { label: "Ansatt", color: "#10b981", icon: <CheckCircle size={14} /> },
  rejected: { label: "Avslått", color: "#ef4444", icon: <XCircle size={14} /> },
  pending: { label: "Venter godkjenning", color: "#f59e0b", icon: <Clock size={14} /> },
};

export default function MinSidePage() {
  const { user, isLoaded } = useUser();
  const [candidateStatus, setCandidateStatus] = useState<CandidateStatus | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loadingCandidate, setLoadingCandidate] = useState(true);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [applicationsExpanded, setApplicationsExpanded] = useState(false);

  // Load candidate status and applications
  useEffect(() => {
    if (user?.id) {
      loadCandidateStatus();
      loadApplications(user.id);
    }
  }, [user?.id]);

  async function loadCandidateStatus() {
    try {
      const res = await fetch("/api/user/candidate-status");
      if (res.ok) {
        const data = await res.json();
        setCandidateStatus(data);
      }
    } catch (err) {
      console.error("Failed to load candidate status:", err);
    } finally {
      setLoadingCandidate(false);
    }
  }

  async function loadApplications(userId: string) {
    setLoadingApplications(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ADMIN_URL || "https://admincrew.no"}/api/job-applications?user_id=${userId}`
      );
      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications || []);
      }
    } catch (err) {
      console.error("Failed to load applications:", err);
    } finally {
      setLoadingApplications(false);
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Loading state
  if (!isLoaded) {
    return (
      <SiteLayout active="">
        <div style={styles.loadingContainer}>
          <Loader2 size={32} style={{ animation: "spin 1s linear infinite" }} />
        </div>
      </SiteLayout>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <SiteLayout active="">
        <section style={styles.notLoggedIn}>
          <User size={48} style={{ color: "#0369a1", marginBottom: 16 }} />
          <h1 style={{ fontSize: "1.5rem", marginBottom: 12 }}>Min side</h1>
          <p style={{ color: "#64748b", marginBottom: 24 }}>
            Logg inn for å se din profil.
          </p>
          <Link href="/logg-inn?redirect_url=/min-side" style={styles.primaryButton}>
            Logg inn
          </Link>
        </section>
      </SiteLayout>
    );
  }

  const userName = user.firstName || user.fullName?.split(" ")[0] || "der";
  const isRegistered = candidateStatus?.registered;

  return (
    <SiteLayout active="">
      <section style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.greeting}>Hei, {userName}!</h1>
            <p style={styles.subtext}>
              {isRegistered ? "Velkommen tilbake" : "Kom i gang med å registrere deg"}
            </p>
          </div>
          <div style={styles.headerRight}>
            <UserButton
              appearance={{
                elements: { avatarBox: { width: 44, height: 44 } },
              }}
            />
            <SignOutButton>
              <button style={styles.logoutButton}>Logg ut</button>
            </SignOutButton>
          </div>
        </div>

        {/* Status cards */}
        <div style={styles.cardGrid}>
          {/* Registration status */}
          <div style={{
            ...styles.card,
            borderColor: isRegistered ? "#86efac" : "#fde68a",
          }}>
            {loadingCandidate ? (
              <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} />
            ) : isRegistered ? (
              <>
                <div style={styles.cardIcon}>
                  <CheckCircle size={24} color="#16a34a" />
                </div>
                <div>
                  <div style={styles.cardTitle}>Registrert jobbsøker</div>
                  <div style={styles.cardSubtext}>
                    {candidateStatus.candidate?.submittedAt
                      ? formatDate(candidateStatus.candidate.submittedAt)
                      : ""}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={styles.cardIcon}>
                  <Clock size={24} color="#d97706" />
                </div>
                <div>
                  <div style={styles.cardTitle}>Ikke registrert</div>
                  <div style={styles.cardSubtext}>Registrer deg som jobbsøker</div>
                </div>
              </>
            )}
          </div>

          {/* Applications count */}
          <div style={{ ...styles.card, borderColor: "#bfdbfe" }}>
            <div style={styles.cardIcon}>
              <FileText size={24} color="#0369a1" />
            </div>
            <div>
              <div style={styles.cardTitle}>
                {loadingApplications ? "..." : applications.length} søknad{applications.length !== 1 ? "er" : ""}
              </div>
              <div style={styles.cardSubtext}>Sendt inn</div>
            </div>
          </div>
        </div>

        {/* Main CTA */}
        {!isRegistered ? (
          <Link href="/jobbsoker/registrer" style={styles.ctaButton}>
            <Briefcase size={20} />
            Registrer deg som jobbsøker
          </Link>
        ) : (
          <Link href="/stillinger" style={styles.ctaButtonSecondary}>
            <Briefcase size={20} />
            Se ledige stillinger
          </Link>
        )}

        {/* Applications dropdown */}
        <div style={styles.applicationsSection}>
          <button
            onClick={() => setApplicationsExpanded(!applicationsExpanded)}
            style={styles.dropdownHeader}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <FileText size={18} />
              Mine søknader ({applications.length})
            </span>
            {applicationsExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {applicationsExpanded && (
            <div style={styles.dropdownContent}>
              {loadingApplications ? (
                <div style={styles.emptyState}>
                  <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} />
                </div>
              ) : applications.length === 0 ? (
                <div style={styles.emptyState}>
                  <p style={{ margin: 0, color: "#64748b" }}>Ingen søknader ennå</p>
                </div>
              ) : (
                applications.map((app) => {
                  const status = statusLabels[app.status] || statusLabels.new;
                  return (
                    <div key={app.id} style={styles.applicationItem}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>
                          {app.job_posting?.title || "Jobbsøker-registrering"}
                        </div>
                        <div style={{ fontSize: 13, color: "#64748b" }}>
                          {formatDate(app.created_at)}
                        </div>
                      </div>
                      <div style={{
                        ...styles.statusBadge,
                        background: `${status.color}15`,
                        color: status.color,
                      }}>
                        {status.icon}
                        {status.label}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Footer with GDPR link */}
        <div style={styles.footer}>
          <Link href="/min-side/personvern" style={styles.footerLink}>
            <Shield size={14} />
            Personvern & datarettigheter
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </SiteLayout>
  );
}

const styles: Record<string, React.CSSProperties> = {
  loadingContainer: {
    minHeight: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  notLoggedIn: {
    padding: "80px 20px",
    maxWidth: 400,
    margin: "0 auto",
    textAlign: "center",
  },
  container: {
    padding: "40px 20px 60px",
    maxWidth: 600,
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
  },
  greeting: {
    fontSize: "1.75rem",
    fontWeight: 700,
    margin: 0,
  },
  subtext: {
    color: "#64748b",
    margin: "4px 0 0",
    fontSize: 15,
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  logoutButton: {
    padding: "8px 14px",
    background: "#f1f5f9",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
    color: "#64748b",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 12,
    marginBottom: 24,
  },
  card: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: 16,
    background: "#fff",
    border: "2px solid #e2e8f0",
    borderRadius: 12,
  },
  cardIcon: {
    flexShrink: 0,
  },
  cardTitle: {
    fontWeight: 600,
    fontSize: 15,
  },
  cardSubtext: {
    fontSize: 13,
    color: "#64748b",
  },
  ctaButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
    padding: "16px 24px",
    background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)",
    color: "#fff",
    borderRadius: 12,
    fontWeight: 600,
    fontSize: 16,
    textDecoration: "none",
    marginBottom: 24,
  },
  ctaButtonSecondary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
    padding: "16px 24px",
    background: "#fff",
    color: "#0369a1",
    border: "2px solid #0369a1",
    borderRadius: 12,
    fontWeight: 600,
    fontSize: 16,
    textDecoration: "none",
    marginBottom: 24,
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "14px 28px",
    background: "#0369a1",
    color: "#fff",
    borderRadius: 12,
    fontWeight: 600,
    textDecoration: "none",
  },
  applicationsSection: {
    background: "#f8fafc",
    borderRadius: 12,
    overflow: "hidden",
  },
  dropdownHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 16,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 15,
    color: "#1e293b",
  },
  dropdownContent: {
    borderTop: "1px solid #e2e8f0",
  },
  emptyState: {
    padding: 24,
    textAlign: "center",
  },
  applicationItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
    borderBottom: "1px solid #e2e8f0",
  },
  statusBadge: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
  },
  footer: {
    marginTop: 32,
    paddingTop: 20,
    borderTop: "1px solid #e2e8f0",
    textAlign: "center",
  },
  footerLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    color: "#64748b",
    fontSize: 14,
    textDecoration: "none",
  },
};
