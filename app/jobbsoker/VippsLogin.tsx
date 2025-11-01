/**
 * Vipps Login Step Component
 * 
 * First step in candidate registration - requires Vipps authentication
 * for identity verification before showing the registration form.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import type { CSSProperties } from "react";

interface VippsSession {
  verified: boolean;
  name: string;
  givenName: string;
  familyName: string;
  phone: string;
  birthDate: string;
  verifiedAt: string;
}

interface VippsLoginProps {
  onVerified: (session: VippsSession) => void;
}

const ui = {
  container: {
    background: "linear-gradient(155deg, #0a1d39 0%, #0f2648 55%, #051427 100%)",
    borderRadius: 24,
    padding: "48px clamp(24px, 6vw, 48px)",
    color: "#e2e8f0",
    boxShadow: "0 24px 64px rgba(5, 17, 34, 0.5)",
    maxWidth: 560,
    margin: "0 auto",
  } as CSSProperties,
  icon: {
    fontSize: 72,
    textAlign: "center",
    marginBottom: 24,
  } as CSSProperties,
  title: {
    fontSize: "clamp(28px, 5vw, 36px)",
    fontWeight: 800,
    textAlign: "center",
    margin: "0 0 16px",
    letterSpacing: "-0.02em",
  } as CSSProperties,
  description: {
    fontSize: 17,
    lineHeight: 1.7,
    textAlign: "center",
    color: "rgba(226, 232, 240, 0.85)",
    marginBottom: 32,
  } as CSSProperties,
  whyBox: {
    background: "rgba(7, 18, 34, 0.6)",
    border: "1px solid rgba(148, 197, 255, 0.25)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  } as CSSProperties,
  whyTitle: {
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    color: "#bae6fd",
    marginBottom: 12,
  } as CSSProperties,
  whyList: {
    margin: 0,
    paddingLeft: 20,
    fontSize: 15,
    lineHeight: 1.8,
    color: "rgba(226, 232, 240, 0.9)",
  } as CSSProperties,
  button: {
    width: "100%",
    padding: "18px 32px",
    fontSize: 18,
    fontWeight: 700,
    background: "#ff5100", // Vipps orange
    color: "#fff",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  } as CSSProperties,
  buttonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  } as CSSProperties,
  error: {
    background: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    borderRadius: 12,
    padding: 16,
    color: "#fca5a5",
    fontSize: 15,
    marginTop: 16,
    textAlign: "center",
  } as CSSProperties,
  verifiedBox: {
    background: "rgba(34, 197, 94, 0.1)",
    border: "1px solid rgba(34, 197, 94, 0.3)",
    borderRadius: 16,
    padding: 24,
    textAlign: "center",
  } as CSSProperties,
  verifiedIcon: {
    fontSize: 64,
    marginBottom: 16,
  } as CSSProperties,
  verifiedTitle: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 8,
    color: "#86efac",
  } as CSSProperties,
  verifiedInfo: {
    fontSize: 16,
    color: "rgba(226, 232, 240, 0.85)",
    marginBottom: 24,
  } as CSSProperties,
};

export default function VippsLogin({ onVerified }: VippsLoginProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  // Check if user already has a valid Vipps session
  const checkExistingSession = useCallback(async () => {
    try {
      const response = await fetch("/api/vipps/session");
      const data = await response.json();

      if (data.verified && data.session) {
        onVerified(data.session);
      }
    } catch (err) {
      console.error("Failed to check Vipps session:", err);
    } finally {
      setCheckingSession(false);
    }
  }, [onVerified]);

  useEffect(() => {
    checkExistingSession();
  }, [checkExistingSession]);

  async function handleVippsLogin() {
    setLoading(true);
    setError(null);

    try {
      // Request Vipps auth URL
      const response = await fetch("/api/vipps/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          redirectUrl: `${window.location.origin}/api/vipps/callback`,
        }),
      });

      if (!response.ok) {
        throw new Error("Kunne ikke starte Vipps-pålogging");
      }

      const { authUrl } = await response.json();

      // Redirect to Vipps
      window.location.href = authUrl;
    } catch (err) {
      console.error("Vipps login error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Noe gikk galt. Prøv igjen om litt."
      );
      setLoading(false);
    }
  }

  if (checkingSession) {
    return (
      <div style={ui.container}>
        <div style={ui.icon}>⏳</div>
        <h2 style={ui.title}>Sjekker sesjon...</h2>
      </div>
    );
  }

  return (
    <div style={ui.container}>
      <div style={ui.icon}>🔐</div>
      
      <h2 style={ui.title}>Verifiser identitet med Vipps</h2>
      
      <p style={ui.description}>
        For å sikre at alle kandidater er ekte personer og oppfyller lovkrav,
        må du verifisere identiteten din med Vipps før du registrerer deg.
      </p>

      <div style={ui.whyBox}>
        <div style={ui.whyTitle}>Hvorfor trenger vi dette?</div>
        <ul style={ui.whyList}>
          <li>✅ Lovpålagt identitetsverifisering (bemanningsbransjen)</li>
          <li>✅ Stopper fake profiler og svindel</li>
          <li>✅ Raskere saksbehandling</li>
          <li>✅ Sikker digital signering av kontrakter senere</li>
        </ul>
      </div>

      <button
        onClick={handleVippsLogin}
        disabled={loading}
        style={{
          ...ui.button,
          ...(loading ? ui.buttonDisabled : {}),
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.background = "#e64900";
            e.currentTarget.style.transform = "translateY(-2px)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#ff5100";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {loading ? (
          <>
            <span>Starter Vipps...</span>
          </>
        ) : (
          <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            <span>Logg inn med Vipps</span>
          </>
        )}
      </button>

      {error && <div style={ui.error}>⚠️ {error}</div>}

      <p
        style={{
          marginTop: 24,
          fontSize: 13,
          textAlign: "center",
          color: "rgba(226, 232, 240, 0.6)",
        }}
      >
        Tar kun 30 sekunder • Du blir sendt til Vipps og tilbake
      </p>
    </div>
  );
}

/**
 * Verified Badge Component
 * Shows after successful Vipps verification
 */
export function VippsVerifiedBadge({ session }: { session: VippsSession }) {
  return (
    <div style={ui.verifiedBox}>
      <div style={ui.verifiedIcon}>✅</div>
      <div style={ui.verifiedTitle}>Identitet verifisert!</div>
      <div style={ui.verifiedInfo}>
        <strong>{session.name}</strong>
        <br />
        {session.phone}
        <br />
        <span style={{ fontSize: 14, opacity: 0.7 }}>
          Verifisert {new Date(session.verifiedAt).toLocaleString("nb-NO")}
        </span>
      </div>
    </div>
  );
}
