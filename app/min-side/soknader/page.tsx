"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SiteLayout from "@/app/components/SiteLayout";
import {
  ArrowLeft,
  Loader2,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  ChevronRight,
  Briefcase,
  Calendar,
  MapPin,
  Building,
  User,
  Phone,
  Mail,
  Filter,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";

type StatusStep = {
  status: string;
  label: string;
  date: string | null;
  active: boolean;
  completed: boolean;
};

type Application = {
  id: string;
  type: "job" | "candidate";
  title: string;
  company?: string;
  location?: string;
  status: string;
  created_at: string;
  updated_at: string;
  timeline: StatusStep[];
};

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode; order: number }> = {
  new: { label: "Mottatt", color: "#3b82f6", icon: <Clock size={16} />, order: 1 },
  pending: { label: "Venter", color: "#f59e0b", icon: <Clock size={16} />, order: 1 },
  reviewed: { label: "Under vurdering", color: "#8b5cf6", icon: <Clock size={16} />, order: 2 },
  contacted: { label: "Kontaktet", color: "#0ea5e9", icon: <Phone size={16} />, order: 3 },
  interview: { label: "Til intervju", color: "#6366f1", icon: <User size={16} />, order: 4 },
  offer: { label: "Tilbud sendt", color: "#10b981", icon: <Mail size={16} />, order: 5 },
  hired: { label: "Ansatt", color: "#059669", icon: <CheckCircle size={16} />, order: 6 },
  rejected: { label: "Avslått", color: "#ef4444", icon: <XCircle size={16} />, order: -1 },
  withdrawn: { label: "Trukket", color: "#6b7280", icon: <XCircle size={16} />, order: -1 },
};

const TIMELINE_STEPS = ["new", "reviewed", "contacted", "interview", "offer", "hired"];

function buildTimeline(currentStatus: string, createdAt: string, updatedAt: string): StatusStep[] {
  const currentOrder = STATUS_CONFIG[currentStatus]?.order || 1;

  return TIMELINE_STEPS.map((status, index) => {
    const config = STATUS_CONFIG[status];
    const stepOrder = config.order;
    const isCompleted = stepOrder < currentOrder;
    const isActive = status === currentStatus;

    let date: string | null = null;
    if (isActive) {
      date = updatedAt;
    } else if (isCompleted) {
      // Estimate dates for completed steps (in real app, fetch from status_history table)
      date = createdAt;
    }

    return {
      status,
      label: config.label,
      date,
      active: isActive,
      completed: isCompleted,
    };
  });
}

function StatusTimeline({ steps, isRejected }: { steps: StatusStep[]; isRejected: boolean }) {
  if (isRejected) {
    return (
      <div style={styles.rejectedBadge}>
        <XCircle size={18} />
        <span>Søknaden ble dessverre ikke innvilget</span>
      </div>
    );
  }

  return (
    <div style={styles.timeline}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <div key={step.status} style={styles.timelineStep}>
            {/* Dot */}
            <div
              style={{
                ...styles.timelineDot,
                background: step.completed
                  ? "#10b981"
                  : step.active
                  ? "#3b82f6"
                  : "#e2e8f0",
                borderColor: step.completed
                  ? "#10b981"
                  : step.active
                  ? "#3b82f6"
                  : "#cbd5e1",
              }}
            >
              {step.completed && <CheckCircle size={12} color="#fff" />}
            </div>

            {/* Line */}
            {!isLast && (
              <div
                style={{
                  ...styles.timelineLine,
                  background: step.completed ? "#10b981" : "#e2e8f0",
                }}
              />
            )}

            {/* Label */}
            <div style={styles.timelineLabel}>
              <span
                style={{
                  fontWeight: step.active ? 700 : 500,
                  color: step.active ? "#0f172a" : step.completed ? "#10b981" : "#94a3b8",
                }}
              >
                {step.label}
              </span>
              {step.date && (
                <span style={styles.timelineDate}>
                  {new Date(step.date).toLocaleDateString("nb-NO", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ApplicationCard({ app, onClick }: { app: Application; onClick: () => void }) {
  const config = STATUS_CONFIG[app.status] || STATUS_CONFIG.new;
  const isRejected = app.status === "rejected" || app.status === "withdrawn";

  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.cardHeader}>
        <div style={styles.cardIcon}>
          {app.type === "job" ? (
            <Briefcase size={20} color="#0369a1" />
          ) : (
            <User size={20} color="#0369a1" />
          )}
        </div>
        <div style={styles.cardInfo}>
          <h3 style={styles.cardTitle}>{app.title}</h3>
          <div style={styles.cardMeta}>
            {app.company && (
              <span style={styles.cardMetaItem}>
                <Building size={14} />
                {app.company}
              </span>
            )}
            {app.location && (
              <span style={styles.cardMetaItem}>
                <MapPin size={14} />
                {app.location}
              </span>
            )}
            <span style={styles.cardMetaItem}>
              <Calendar size={14} />
              {new Date(app.created_at).toLocaleDateString("nb-NO")}
            </span>
          </div>
        </div>
        <div
          style={{
            ...styles.statusBadge,
            background: `${config.color}15`,
            color: config.color,
          }}
        >
          {config.icon}
          {config.label}
        </div>
      </div>

      <StatusTimeline steps={app.timeline} isRejected={isRejected} />

      <div style={styles.cardFooter}>
        <span style={styles.cardFooterText}>Se detaljer</span>
        <ChevronRight size={18} color="#94a3b8" />
      </div>
    </div>
  );
}

export default function SoknaderPage() {
  const { user, isLoaded } = useUser();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    if (user?.id) {
      loadApplications();
    }
  }, [user?.id]);

  async function loadApplications() {
    try {
      // Fetch job applications
      const jobRes = await fetch("/api/user/applications");
      const jobData = jobRes.ok ? await jobRes.json() : { applications: [] };

      // Fetch candidate registration status
      const candRes = await fetch("/api/user/candidate-status");
      const candData = candRes.ok ? await candRes.json() : { registered: false };

      const apps: Application[] = [];

      // Add job applications
      if (jobData.applications) {
        for (const app of jobData.applications) {
          apps.push({
            id: app.id,
            type: "job",
            title: app.job_posting?.title || "Stilling",
            company: app.job_posting?.company_name || undefined,
            location: app.job_posting?.location || undefined,
            status: app.status || "new",
            created_at: app.created_at,
            updated_at: app.updated_at || app.created_at,
            timeline: buildTimeline(app.status || "new", app.created_at, app.updated_at || app.created_at),
          });
        }
      }

      // Add candidate registration as an "application"
      if (candData.registered && candData.candidate) {
        apps.push({
          id: candData.candidate.id,
          type: "candidate",
          title: "Jobbsøker-registrering",
          status: candData.candidate.status || "pending",
          created_at: candData.candidate.submittedAt,
          updated_at: candData.candidate.submittedAt,
          timeline: buildTimeline(
            candData.candidate.status || "pending",
            candData.candidate.submittedAt,
            candData.candidate.submittedAt
          ),
        });
      }

      // Sort by date (newest first)
      apps.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setApplications(apps);
    } catch (err) {
      console.error("Failed to load applications:", err);
    } finally {
      setLoading(false);
    }
  }

  const filteredApplications =
    filter === "all"
      ? applications
      : applications.filter((app) => app.status === filter);

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (!isLoaded) {
    return (
      <SiteLayout active="">
        <div style={styles.loading}>
          <Loader2 size={32} style={{ animation: "spin 1s linear infinite" }} />
        </div>
      </SiteLayout>
    );
  }

  if (!user) {
    return (
      <SiteLayout active="">
        <section style={styles.container}>
          <p>Du må være innlogget for å se dine søknader.</p>
          <Link href="/logg-inn?redirect_url=/min-side/soknader" style={styles.link}>
            Logg inn
          </Link>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout active="">
      <section style={styles.container}>
        {/* Header */}
        <Link href="/min-side" style={styles.backLink}>
          <ArrowLeft size={18} />
          Tilbake til Min side
        </Link>

        <div style={styles.header}>
          <FileText size={28} color="#0369a1" />
          <div>
            <h1 style={styles.title}>Mine søknader</h1>
            <p style={styles.subtitle}>
              {applications.length} søknad{applications.length !== 1 ? "er" : ""} totalt
            </p>
          </div>
        </div>

        {/* Filters */}
        <div style={styles.filters}>
          <button
            onClick={() => setFilter("all")}
            style={{
              ...styles.filterBtn,
              ...(filter === "all" ? styles.filterBtnActive : {}),
            }}
          >
            Alle ({applications.length})
          </button>
          {Object.entries(statusCounts).map(([status, count]) => {
            const config = STATUS_CONFIG[status];
            if (!config) return null;
            return (
              <button
                key={status}
                onClick={() => setFilter(status)}
                style={{
                  ...styles.filterBtn,
                  ...(filter === status ? styles.filterBtnActive : {}),
                }}
              >
                {config.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Content */}
        {loading ? (
          <div style={styles.loading}>
            <Loader2 size={24} style={{ animation: "spin 1s linear infinite" }} />
            <p style={{ margin: "12px 0 0", color: "#64748b" }}>Laster søknader...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div style={styles.empty}>
            <FileText size={48} color="#cbd5e1" />
            <h3 style={styles.emptyTitle}>Ingen søknader ennå</h3>
            <p style={styles.emptyText}>
              {filter === "all"
                ? "Du har ikke sendt inn noen søknader ennå."
                : `Ingen søknader med status "${STATUS_CONFIG[filter]?.label || filter}".`}
            </p>
            <Link href="/stillinger" style={styles.ctaButton}>
              <Briefcase size={18} />
              Se ledige stillinger
            </Link>
          </div>
        ) : (
          <div style={styles.list}>
            {filteredApplications.map((app) => (
              <ApplicationCard
                key={app.id}
                app={app}
                onClick={() => setSelectedApp(app)}
              />
            ))}
          </div>
        )}

        {/* Detail Modal */}
        {selectedApp && (
          <div style={styles.modalOverlay} onClick={() => setSelectedApp(null)}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>{selectedApp.title}</h2>
                <button
                  onClick={() => setSelectedApp(null)}
                  style={styles.modalClose}
                >
                  ✕
                </button>
              </div>

              <div style={styles.modalContent}>
                {selectedApp.company && (
                  <p style={styles.modalMeta}>
                    <Building size={16} />
                    {selectedApp.company}
                  </p>
                )}
                {selectedApp.location && (
                  <p style={styles.modalMeta}>
                    <MapPin size={16} />
                    {selectedApp.location}
                  </p>
                )}
                <p style={styles.modalMeta}>
                  <Calendar size={16} />
                  Søkt {new Date(selectedApp.created_at).toLocaleDateString("nb-NO", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <div style={styles.modalSection}>
                  <h3 style={styles.modalSectionTitle}>Status-historikk</h3>
                  <div style={styles.modalTimeline}>
                    {selectedApp.timeline.map((step, i) => (
                      <div
                        key={step.status}
                        style={{
                          ...styles.modalTimelineItem,
                          opacity: step.completed || step.active ? 1 : 0.4,
                        }}
                      >
                        <div
                          style={{
                            ...styles.modalTimelineDot,
                            background: step.completed
                              ? "#10b981"
                              : step.active
                              ? "#3b82f6"
                              : "#e2e8f0",
                          }}
                        />
                        <div>
                          <div style={{ fontWeight: step.active ? 700 : 500 }}>
                            {step.label}
                          </div>
                          {step.date && (
                            <div style={{ fontSize: 13, color: "#64748b" }}>
                              {new Date(step.date).toLocaleDateString("nb-NO")}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
  loading: {
    minHeight: "40vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    padding: "40px 20px 60px",
    maxWidth: 700,
    margin: "0 auto",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    color: "#64748b",
    fontSize: 14,
    textDecoration: "none",
    marginBottom: 24,
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 700,
    margin: 0,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    margin: "4px 0 0",
  },
  filters: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  filterBtn: {
    padding: "8px 14px",
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    color: "#64748b",
    cursor: "pointer",
  },
  filterBtnActive: {
    background: "#0369a1",
    borderColor: "#0369a1",
    color: "#fff",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  card: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: 20,
    cursor: "pointer",
    transition: "box-shadow 0.2s, border-color 0.2s",
  },
  cardHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 16,
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    background: "#f0f9ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardInfo: {
    flex: 1,
    minWidth: 0,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 600,
    margin: 0,
    color: "#0f172a",
  },
  cardMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 6,
  },
  cardMetaItem: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 13,
    color: "#64748b",
  },
  statusBadge: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 12px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    flexShrink: 0,
  },
  timeline: {
    display: "flex",
    alignItems: "center",
    padding: "16px 0",
    overflowX: "auto",
  },
  timelineStep: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    flex: 1,
    minWidth: 80,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    border: "3px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  timelineLine: {
    position: "absolute",
    top: 12,
    left: "50%",
    width: "100%",
    height: 3,
    zIndex: 0,
  },
  timelineLabel: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 12,
  },
  timelineDate: {
    display: "block",
    fontSize: 11,
    color: "#94a3b8",
    marginTop: 2,
  },
  rejectedBadge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "12px 16px",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: 8,
    color: "#dc2626",
    fontSize: 14,
    fontWeight: 500,
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
    paddingTop: 12,
    borderTop: "1px solid #f1f5f9",
    marginTop: 8,
  },
  cardFooterText: {
    fontSize: 13,
    color: "#64748b",
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 600,
    margin: "16px 0 8px",
    color: "#334155",
  },
  emptyText: {
    color: "#64748b",
    marginBottom: 24,
  },
  ctaButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "14px 24px",
    background: "#0369a1",
    color: "#fff",
    borderRadius: 10,
    fontWeight: 600,
    textDecoration: "none",
  },
  link: {
    color: "#0369a1",
    textDecoration: "underline",
  },
  // Modal styles
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    borderRadius: 20,
    width: "100%",
    maxWidth: 500,
    maxHeight: "80vh",
    overflow: "auto",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    borderBottom: "1px solid #e2e8f0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 700,
    margin: 0,
  },
  modalClose: {
    width: 32,
    height: 32,
    borderRadius: 8,
    border: "none",
    background: "#f1f5f9",
    cursor: "pointer",
    fontSize: 16,
  },
  modalContent: {
    padding: 24,
  },
  modalMeta: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    color: "#64748b",
    margin: "0 0 8px",
  },
  modalSection: {
    marginTop: 24,
  },
  modalSectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 16,
    color: "#334155",
  },
  modalTimeline: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  modalTimelineItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  modalTimelineDot: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    flexShrink: 0,
  },
};
