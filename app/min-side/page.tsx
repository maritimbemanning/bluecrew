/**
 * USER PORTAL - MIN SIDE (Unified Dashboard)
 * Route: bluecrew.no/min-side
 *
 * Unified dashboard showing:
 * - Candidate registration status
 * - Job applications
 * - Quick actions
 * - Admin section (for admin users)
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
  Users,
  Download,
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import { useUser, SignOutButton, UserButton } from "@clerk/nextjs";
import { ADMIN_EMAILS } from "@/app/lib/admin-config";

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

// Admin types
type AdminApplication = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  job_title: string;
  job_company: string | null;
  job_location: string;
  cover_letter: string | null;
  cv_path: string | null;
  cvUrl?: string | null;
  vipps_verified: boolean;
};

type AdminCandidate = {
  id: string;
  submitted_at: string;
  name: string;
  email: string;
  phone: string;
  fylke: string | null;
  kommune: string | null;
  work_main: string[];
  wants_temporary: string;
  status: string;
  cvUrl?: string | null;
  certsUrl?: string | null;
  vipps_verified: boolean;
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

  // Admin state
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminTab, setAdminTab] = useState<"applications" | "candidates">("applications");
  const [adminApplications, setAdminApplications] = useState<AdminApplication[]>([]);
  const [adminCandidates, setAdminCandidates] = useState<AdminCandidate[]>([]);
  const [loadingAdminData, setLoadingAdminData] = useState(false);
  const [adminSearch, setAdminSearch] = useState("");

  // Check if user is admin
  useEffect(() => {
    if (isLoaded && user) {
      const role = user.publicMetadata?.role as string | undefined;
      const userEmail = user.emailAddresses[0]?.emailAddress?.toLowerCase();
      const adminStatus = role === "admin" || Boolean(userEmail && ADMIN_EMAILS.includes(userEmail));
      setIsAdmin(adminStatus);

      if (adminStatus) {
        loadAdminData();
      }
    }
  }, [isLoaded, user]);

  // Load candidate status and applications
  useEffect(() => {
    if (user?.id) {
      loadCandidateStatus();
      loadApplications();
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

  async function loadApplications() {
    setLoadingApplications(true);
    try {
      // Fetch from local API (uses authenticated user's email)
      const res = await fetch("/api/user/applications");
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

  async function loadAdminData() {
    setLoadingAdminData(true);
    try {
      const [appsRes, candsRes] = await Promise.all([
        fetch("/api/admin/applications"),
        fetch("/api/admin/candidates"),
      ]);

      if (appsRes.ok) {
        const data = await appsRes.json();
        setAdminApplications(data.applications || []);
      }

      if (candsRes.ok) {
        const data = await candsRes.json();
        setAdminCandidates(data.candidates || []);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoadingAdminData(false);
    }
  }

  // Filter admin data by search
  const filteredAdminApplications = adminApplications.filter((app) =>
    adminSearch === "" ||
    app.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
    app.email.toLowerCase().includes(adminSearch.toLowerCase()) ||
    app.job_title.toLowerCase().includes(adminSearch.toLowerCase())
  );

  const filteredAdminCandidates = adminCandidates.filter((cand) =>
    adminSearch === "" ||
    cand.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
    cand.email.toLowerCase().includes(adminSearch.toLowerCase()) ||
    (cand.fylke && cand.fylke.toLowerCase().includes(adminSearch.toLowerCase()))
  );

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
                elements: {
                  avatarBox: { width: 44, height: 44 },
                  // Hide passkeys and other unnecessary sections
                  profileSection__passkeys: { display: "none" },
                  profileSection__connectedAccounts: { display: "none" },
                  profileSection__enterpriseAccounts: { display: "none" },
                  profileSection__web3Wallets: { display: "none" },
                  // Style the modal to match site design
                  card: {
                    borderRadius: "16px",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  },
                  formButtonPrimary: {
                    background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)",
                    borderRadius: "10px",
                  },
                },
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

        {/* ADMIN SECTION */}
        {isAdmin && (
          <div style={styles.adminSection}>
            <div style={styles.adminHeader}>
              <Shield size={20} color="#0369a1" />
              <h2 style={styles.adminTitle}>Admin</h2>
            </div>

            {/* Admin tabs */}
            <div style={styles.adminTabs}>
              <button
                onClick={() => setAdminTab("applications")}
                style={{
                  ...styles.adminTab,
                  ...(adminTab === "applications" ? styles.adminTabActive : {}),
                }}
              >
                <FileText size={16} />
                Søknader ({adminApplications.length})
              </button>
              <button
                onClick={() => setAdminTab("candidates")}
                style={{
                  ...styles.adminTab,
                  ...(adminTab === "candidates" ? styles.adminTabActive : {}),
                }}
              >
                <Users size={16} />
                Kandidater ({adminCandidates.length})
              </button>
            </div>

            {/* Search */}
            <div style={styles.adminSearch}>
              <Search size={18} color="#64748b" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Søk etter navn, e-post..."
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                style={styles.adminSearchInput}
              />
            </div>

            {/* Admin content */}
            {loadingAdminData ? (
              <div style={styles.emptyState}>
                <Loader2 size={24} style={{ animation: "spin 1s linear infinite" }} />
                <p style={{ margin: "8px 0 0", color: "#64748b" }}>Laster admin-data...</p>
              </div>
            ) : adminTab === "applications" ? (
              <div style={styles.adminList}>
                {filteredAdminApplications.length === 0 ? (
                  <div style={styles.emptyState}>
                    <p style={{ margin: 0, color: "#64748b" }}>Ingen søknader funnet</p>
                  </div>
                ) : (
                  filteredAdminApplications.map((app) => (
                    <div key={app.id} style={styles.adminItem}>
                      <div style={styles.adminItemHeader}>
                        <div>
                          <div style={styles.adminItemName}>{app.name}</div>
                          <div style={styles.adminItemMeta}>
                            <span>{app.job_title}</span>
                            {app.vipps_verified && (
                              <span style={styles.verifiedBadge}>Vipps-verifisert</span>
                            )}
                          </div>
                        </div>
                        <div style={styles.adminItemDate}>
                          <Calendar size={12} />
                          {formatDate(app.created_at)}
                        </div>
                      </div>
                      <div style={styles.adminItemContact}>
                        <a href={`mailto:${app.email}`} style={styles.adminLink}>
                          <Mail size={14} /> {app.email}
                        </a>
                        <a href={`tel:${app.phone}`} style={styles.adminLink}>
                          <Phone size={14} /> {app.phone}
                        </a>
                        {app.job_location && (
                          <span style={styles.adminMeta}>
                            <MapPin size={14} /> {app.job_location}
                          </span>
                        )}
                      </div>
                      {app.cvUrl && (
                        <a
                          href={app.cvUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.downloadButton}
                        >
                          <Download size={14} /> Last ned CV
                        </a>
                      )}
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div style={styles.adminList}>
                {filteredAdminCandidates.length === 0 ? (
                  <div style={styles.emptyState}>
                    <p style={{ margin: 0, color: "#64748b" }}>Ingen kandidater funnet</p>
                  </div>
                ) : (
                  filteredAdminCandidates.map((cand) => (
                    <div key={cand.id} style={styles.adminItem}>
                      <div style={styles.adminItemHeader}>
                        <div>
                          <div style={styles.adminItemName}>{cand.name}</div>
                          <div style={styles.adminItemMeta}>
                            {cand.work_main?.join(", ") || "Ingen arbeidsområder"}
                            {cand.vipps_verified && (
                              <span style={styles.verifiedBadge}>Vipps-verifisert</span>
                            )}
                          </div>
                        </div>
                        <div style={styles.adminItemDate}>
                          <Calendar size={12} />
                          {formatDate(cand.submitted_at)}
                        </div>
                      </div>
                      <div style={styles.adminItemContact}>
                        <a href={`mailto:${cand.email}`} style={styles.adminLink}>
                          <Mail size={14} /> {cand.email}
                        </a>
                        <a href={`tel:${cand.phone}`} style={styles.adminLink}>
                          <Phone size={14} /> {cand.phone}
                        </a>
                        {cand.fylke && (
                          <span style={styles.adminMeta}>
                            <MapPin size={14} /> {cand.fylke}{cand.kommune ? `, ${cand.kommune}` : ""}
                          </span>
                        )}
                      </div>
                      <div style={styles.adminItemActions}>
                        {cand.cvUrl && (
                          <a
                            href={cand.cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.downloadButton}
                          >
                            <Download size={14} /> CV
                          </a>
                        )}
                        {cand.certsUrl && (
                          <a
                            href={cand.certsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ ...styles.downloadButton, background: "#f1f5f9", color: "#475569" }}
                          >
                            <Download size={14} /> Sertifikater
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

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
  // Admin styles
  adminSection: {
    marginTop: 32,
    padding: 20,
    background: "#fff",
    border: "2px solid #0369a1",
    borderRadius: 16,
  },
  adminHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  adminTitle: {
    fontSize: "1.25rem",
    fontWeight: 700,
    margin: 0,
    color: "#0f172a",
  },
  adminTabs: {
    display: "flex",
    gap: 8,
    marginBottom: 16,
  },
  adminTab: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "10px 16px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    color: "#64748b",
    transition: "all 0.2s",
  },
  adminTabActive: {
    background: "#0369a1",
    borderColor: "#0369a1",
    color: "#fff",
  },
  adminSearch: {
    position: "relative" as const,
    marginBottom: 16,
  },
  adminSearchInput: {
    width: "100%",
    padding: "12px 12px 12px 44px",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    fontSize: 14,
    outline: "none",
  },
  adminList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
    maxHeight: 500,
    overflowY: "auto" as const,
  },
  adminItem: {
    padding: 16,
    background: "#f8fafc",
    borderRadius: 10,
    border: "1px solid #e2e8f0",
  },
  adminItemHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  adminItemName: {
    fontWeight: 600,
    fontSize: 15,
    color: "#0f172a",
  },
  adminItemMeta: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap" as const,
  },
  adminItemDate: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    color: "#94a3b8",
  },
  adminItemContact: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 12,
    marginBottom: 10,
  },
  adminLink: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    color: "#0369a1",
    fontSize: 13,
    textDecoration: "none",
  },
  adminMeta: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    color: "#64748b",
    fontSize: 13,
  },
  adminItemActions: {
    display: "flex",
    gap: 8,
    marginTop: 8,
  },
  downloadButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    background: "#0ea5e9",
    color: "#fff",
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 500,
    textDecoration: "none",
  },
  verifiedBadge: {
    display: "inline-block",
    padding: "2px 8px",
    background: "#dcfce7",
    color: "#166534",
    fontSize: 11,
    fontWeight: 600,
    borderRadius: 4,
    marginLeft: 8,
  },
};
