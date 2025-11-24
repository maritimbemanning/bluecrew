/**
 * GDPR Rights Page - /min-side/personvern
 *
 * Allows users to:
 * - Download their personal data (GDPR Art. 20)
 * - Request deletion of their data (GDPR Art. 17)
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import SiteLayout from "@/app/components/SiteLayout";
import {
  ArrowLeft,
  Download,
  Trash2,
  Loader2,
  CheckCircle,
  Shield,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function PersonvernPage() {
  const { user, isLoaded } = useUser();
  const [deleteRequested, setDeleteRequested] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Export user data
  async function handleExport() {
    if (!user) return;

    setExportLoading(true);
    try {
      const userData = {
        exportedAt: new Date().toISOString(),
        identity: {
          name: user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          email: user.primaryEmailAddress?.emailAddress || null,
          phone: user.primaryPhoneNumber?.phoneNumber || null,
          createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : null,
        },
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
    if (!user) return;

    const confirmed = window.confirm(
      "Er du sikker på at du vil be om sletting av alle dine data?\n\n" +
      "Dette inkluderer alle søknader og personopplysninger.\n" +
      "Handlingen kan ikke angres."
    );

    if (!confirmed) return;

    setDeleteLoading(true);
    try {
      await fetch("/api/gdpr/delete-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerk_user_id: user.id,
          name: user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          email: user.primaryEmailAddress?.emailAddress,
          phone: user.primaryPhoneNumber?.phoneNumber,
        }),
      });

      setDeleteRequested(true);
    } catch (err) {
      console.error("Delete request failed:", err);
      alert("Kunne ikke sende forespørsel. Prøv igjen eller kontakt oss på post@bluecrew.no");
    } finally {
      setDeleteLoading(false);
    }
  }

  // Loading
  if (!isLoaded) {
    return (
      <SiteLayout active="">
        <div style={styles.loading}>
          <Loader2 size={32} style={{ animation: "spin 1s linear infinite" }} />
        </div>
      </SiteLayout>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <SiteLayout active="">
        <section style={styles.container}>
          <p>Du må være innlogget for å se denne siden.</p>
          <Link href="/logg-inn?redirect_url=/min-side/personvern" style={styles.link}>
            Logg inn
          </Link>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout active="">
      <section style={styles.container}>
        {/* Back link */}
        <Link href="/min-side" style={styles.backLink}>
          <ArrowLeft size={18} />
          Tilbake til Min side
        </Link>

        {/* Header */}
        <div style={styles.header}>
          <Shield size={32} color="#0369a1" />
          <h1 style={styles.title}>Personvern & datarettigheter</h1>
        </div>

        <p style={styles.intro}>
          I henhold til GDPR har du rett til innsyn i, eksport av, og sletting av dine personopplysninger.
        </p>

        {/* Actions */}
        <div style={styles.actionsGrid}>
          {/* Export data */}
          <button
            onClick={handleExport}
            disabled={exportLoading}
            style={styles.actionCard}
          >
            <div style={styles.actionIcon}>
              {exportLoading ? (
                <Loader2 size={24} style={{ animation: "spin 1s linear infinite" }} />
              ) : (
                <Download size={24} color="#0369a1" />
              )}
            </div>
            <div style={styles.actionContent}>
              <div style={styles.actionTitle}>Last ned mine data</div>
              <div style={styles.actionDesc}>
                Eksporter alle dine personopplysninger som JSON-fil
              </div>
            </div>
          </button>

          {/* Delete request */}
          {deleteRequested ? (
            <div style={{ ...styles.actionCard, borderColor: "#86efac", cursor: "default" }}>
              <div style={styles.actionIcon}>
                <CheckCircle size={24} color="#16a34a" />
              </div>
              <div style={styles.actionContent}>
                <div style={{ ...styles.actionTitle, color: "#16a34a" }}>
                  Forespørsel sendt
                </div>
                <div style={styles.actionDesc}>
                  Vi behandler din forespørsel innen 30 dager.
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={handleDeleteRequest}
              disabled={deleteLoading}
              style={{ ...styles.actionCard, borderColor: "#fecaca" }}
            >
              <div style={styles.actionIcon}>
                {deleteLoading ? (
                  <Loader2 size={24} style={{ animation: "spin 1s linear infinite" }} />
                ) : (
                  <Trash2 size={24} color="#dc2626" />
                )}
              </div>
              <div style={styles.actionContent}>
                <div style={styles.actionTitle}>Be om sletting</div>
                <div style={styles.actionDesc}>
                  Slett alle mine data permanent
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Info */}
        <div style={styles.infoBox}>
          <h3 style={styles.infoTitle}>Dine rettigheter</h3>
          <ul style={styles.infoList}>
            <li><strong>Innsyn (Art. 15)</strong> – Du kan be om kopi av alle data vi har om deg</li>
            <li><strong>Retting (Art. 16)</strong> – Du kan be om at feil i data rettes</li>
            <li><strong>Sletting (Art. 17)</strong> – Du kan be om at alle data slettes</li>
            <li><strong>Dataportabilitet (Art. 20)</strong> – Du kan laste ned dine data</li>
          </ul>
        </div>

        <p style={styles.footer}>
          Les mer i vår{" "}
          <Link href="/personvern" style={styles.link}>personvernerklæring</Link>.
          <br />
          Spørsmål? Kontakt oss på{" "}
          <a href="mailto:post@bluecrew.no" style={styles.link}>post@bluecrew.no</a>
        </p>
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
    minHeight: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    padding: "40px 20px 60px",
    maxWidth: 600,
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
    gap: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 700,
    margin: 0,
  },
  intro: {
    color: "#64748b",
    lineHeight: 1.6,
    marginBottom: 32,
  },
  actionsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 32,
  },
  actionCard: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: 20,
    background: "#fff",
    border: "2px solid #e2e8f0",
    borderRadius: 12,
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
  },
  actionIcon: {
    flexShrink: 0,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontWeight: 600,
    fontSize: 16,
    marginBottom: 4,
  },
  actionDesc: {
    fontSize: 14,
    color: "#64748b",
  },
  infoBox: {
    background: "#f8fafc",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 600,
    margin: "0 0 12px",
  },
  infoList: {
    margin: 0,
    paddingLeft: 20,
    fontSize: 14,
    lineHeight: 1.8,
    color: "#475569",
  },
  footer: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 1.6,
  },
  link: {
    color: "#0369a1",
    textDecoration: "underline",
  },
};
