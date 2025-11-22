/**
 * USER PORTAL - MIN SIDE
 * Route: bluecrew.no/min-side
 *
 * Allows users to:
 * - View their submitted job applications
 * - Download their personal data (GDPR Art. 20)
 * - Request deletion of their data (GDPR Art. 17)
 */

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SiteLayout from "@/app/components/SiteLayout";
import {
  User,
  FileText,
  Download,
  Trash2,
  Loader2,
  CheckCircle,
  Clock,
  XCircle,
  Shield,
} from "lucide-react";

type VippsSession = {
  sub: string;
  name: string;
  phone: string;
  email?: string;
  verifiedAt: string;
};

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

const statusLabels: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  new: { label: "Mottatt", color: "#3b82f6", icon: <Clock size={16} /> },
  reviewed: { label: "Under vurdering", color: "#f59e0b", icon: <Clock size={16} /> },
  contacted: { label: "Kontaktet", color: "#10b981", icon: <CheckCircle size={16} /> },
  interview: { label: "Til intervju", color: "#8b5cf6", icon: <CheckCircle size={16} /> },
  hired: { label: "Ansatt", color: "#10b981", icon: <CheckCircle size={16} /> },
  rejected: { label: "Avslått", color: "#ef4444", icon: <XCircle size={16} /> },
};

export default function MinSidePage() {
  const [session, setSession] = useState<VippsSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [deleteRequested, setDeleteRequested] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  // Check Vipps session
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/vipps/session");
        const data = await res.json();

        if (data.verified && data.session) {
          setSession(data.session);
          // Load applications
          loadApplications(data.session.sub);
        }
      } catch (err) {
        console.error("Failed to check session:", err);
      } finally {
        setLoading(false);
      }
    }

    checkSession();
  }, []);

  // Load user's applications
  async function loadApplications(vippsSub: string) {
    setLoadingApplications(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ADMIN_URL || "https://admincrew.no"}/api/job-applications?vipps_sub=${vippsSub}`
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

  // Export user data
  async function handleExport() {
    if (!session) return;

    setExportLoading(true);
    try {
      const userData = {
        exportedAt: new Date().toISOString(),
        identity: {
          name: session.name,
          phone: session.phone,
          email: session.email || null,
          verifiedAt: session.verifiedAt,
        },
        applications: applications.map(app => ({
          jobTitle: app.job_posting?.title || "Ukjent stilling",
          company: app.job_posting?.company_name || "Bluecrew AS",
          status: statusLabels[app.status]?.label || app.status,
          submittedAt: app.created_at,
        })),
      };

      const blob = new Blob([JSON.stringify(userData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `bluecrew-mine-data-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setExportLoading(false);
    }
  }

  // Request deletion
  async function handleDeleteRequest() {
    if (!session) return;

    const confirmed = window.confirm(
      "Er du sikker på at du vil be om sletting av alle dine data? " +
      "Dette inkluderer alle søknader og personopplysninger. " +
      "Handlingen kan ikke angres."
    );

    if (!confirmed) return;

    try {
      // Send deletion request email
      await fetch("/api/gdpr/delete-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vipps_sub: session.sub,
          name: session.name,
          phone: session.phone,
          email: session.email,
        }),
      });

      setDeleteRequested(true);
    } catch (err) {
      console.error("Delete request failed:", err);
      alert("Kunne ikke sende forespørsel. Prøv igjen eller kontakt oss på post@bluecrew.no");
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Loading state
  if (loading) {
    return (
      <SiteLayout active="">
        <div style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Loader2 size={32} style={{ animation: "spin 1s linear infinite" }} />
        </div>
      </SiteLayout>
    );
  }

  // Not logged in
  if (!session) {
    return (
      <SiteLayout active="">
        <section style={{
          padding: "80px 20px",
          maxWidth: 600,
          margin: "0 auto",
          textAlign: "center",
        }}>
          <Shield size={64} style={{ color: "#0369a1", marginBottom: 24 }} />
          <h1 style={{ fontSize: "2rem", marginBottom: 16 }}>Min side</h1>
          <p style={{ color: "#64748b", marginBottom: 32, lineHeight: 1.6 }}>
            Logg inn med Vipps for å se dine søknader og administrere dine personopplysninger.
          </p>
          <Link
            href="/api/vipps/start?return=/min-side"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              background: "#FF5B24",
              color: "#fff",
              borderRadius: 12,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            <img
              src="/icons/vipps-logo.jpeg"
              alt="Vipps"
              width={24}
              height={24}
              style={{ borderRadius: 4 }}
            />
            Logg inn med Vipps
          </Link>
        </section>
      </SiteLayout>
    );
  }

  // Logged in - show dashboard
  return (
    <SiteLayout active="">
      <section style={{
        padding: "60px 20px",
        maxWidth: 800,
        margin: "0 auto",
      }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 8 }}>Min side</h1>

        {/* User info */}
        <div style={{
          background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)",
          color: "#fff",
          padding: 24,
          borderRadius: 16,
          marginBottom: 32,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <User size={28} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{session.name}</div>
            <div style={{ opacity: 0.9 }}>{session.phone}</div>
            {session.email && (
              <div style={{ opacity: 0.9 }}>{session.email}</div>
            )}
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            <CheckCircle size={18} />
            <span style={{ fontSize: "0.85rem" }}>BankID-verifisert</span>
          </div>
        </div>

        {/* Applications */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <FileText size={20} />
            Mine søknader
          </h2>

          {loadingApplications ? (
            <div style={{ padding: 40, textAlign: "center", color: "#64748b" }}>
              <Loader2 size={24} style={{ animation: "spin 1s linear infinite" }} />
            </div>
          ) : applications.length === 0 ? (
            <div style={{
              padding: 40,
              textAlign: "center",
              background: "#f8fafc",
              borderRadius: 12,
              color: "#64748b",
            }}>
              <FileText size={32} style={{ marginBottom: 12, opacity: 0.5 }} />
              <p>Du har ingen søknader ennå.</p>
              <Link
                href="/stillinger"
                style={{
                  display: "inline-block",
                  marginTop: 16,
                  color: "#0369a1",
                  fontWeight: 600,
                }}
              >
                Se ledige jobber →
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {applications.map((app) => {
                const status = statusLabels[app.status] || statusLabels.new;
                return (
                  <div
                    key={app.id}
                    style={{
                      padding: 20,
                      background: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: 12,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600 }}>
                        {app.job_posting?.title || "Stilling"}
                      </div>
                      <div style={{ fontSize: "0.9rem", color: "#64748b" }}>
                        {app.job_posting?.company_name || "Bluecrew AS"} • Sendt {formatDate(app.created_at)}
                      </div>
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 12px",
                      background: `${status.color}15`,
                      color: status.color,
                      borderRadius: 20,
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}>
                      {status.icon}
                      {status.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* GDPR Actions */}
        <div style={{
          padding: 24,
          background: "#f8fafc",
          borderRadius: 16,
        }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: 16 }}>Dine rettigheter (GDPR)</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Export data */}
            <button
              onClick={handleExport}
              disabled={exportLoading}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 16,
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
              }}
            >
              <Download size={20} style={{ color: "#0369a1" }} />
              <div>
                <div style={{ fontWeight: 600 }}>Last ned mine data</div>
                <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                  Eksporter alle dine personopplysninger (JSON)
                </div>
              </div>
              {exportLoading && <Loader2 size={18} style={{ marginLeft: "auto", animation: "spin 1s linear infinite" }} />}
            </button>

            {/* Delete request */}
            {deleteRequested ? (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 16,
                background: "#dcfce7",
                border: "1px solid #86efac",
                borderRadius: 12,
              }}>
                <CheckCircle size={20} style={{ color: "#16a34a" }} />
                <div>
                  <div style={{ fontWeight: 600, color: "#16a34a" }}>Forespørsel sendt</div>
                  <div style={{ fontSize: "0.85rem", color: "#15803d" }}>
                    Vi behandler din forespørsel innen 30 dager.
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={handleDeleteRequest}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: 16,
                  background: "#fff",
                  border: "1px solid #fecaca",
                  borderRadius: 12,
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                <Trash2 size={20} style={{ color: "#dc2626" }} />
                <div>
                  <div style={{ fontWeight: 600 }}>Be om sletting</div>
                  <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                    Slett alle mine data permanent
                  </div>
                </div>
              </button>
            )}
          </div>

          <p style={{ marginTop: 16, fontSize: "0.85rem", color: "#64748b" }}>
            Les mer om hvordan vi behandler dine data i vår{" "}
            <Link href="/personvern" style={{ color: "#0369a1" }}>personvernerklæring</Link>.
          </p>
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
