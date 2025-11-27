/**
 * NOT FOUND PAGE for job details
 * Uses inline styles consistent with rest of site
 */

import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import SiteLayout from "@/app/components/SiteLayout";
import { CSSProperties } from "react";

const styles: Record<string, CSSProperties> = {
  errorState: {
    minHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 32,
    background: "#fff",
    borderRadius: 16,
    margin: 32,
    border: "1px solid #e2e8f0",
  },
  errorIcon: {
    width: 72,
    height: 72,
    color: "#ef4444",
    marginBottom: 24,
  },
  errorTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 12,
  },
  errorText: {
    color: "#64748b",
    marginBottom: 32,
    maxWidth: 400,
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "16px 28px",
    background: "#0369a1",
    color: "#fff",
    borderRadius: 12,
    fontWeight: 600,
    textDecoration: "none",
    boxShadow: "0 4px 12px rgba(3, 105, 161, 0.2)",
  },
};

export default function NotFound() {
  return (
    <SiteLayout active="stillinger">
      <div style={styles.errorState}>
        <AlertCircle style={styles.errorIcon} />
        <h1 style={styles.errorTitle}>Stilling ikke funnet</h1>
        <p style={styles.errorText}>
          Denne stillingen eksisterer ikke eller er ikke lenger aktiv.
        </p>
        <Link href="/stillinger" style={styles.primaryButton}>
          <ArrowLeft size={18} />
          Tilbake til stillinger
        </Link>
      </div>
    </SiteLayout>
  );
}
