/**
 * Vipps Login Step Component
 *
 * First step in candidate registration - requires Vipps authentication
 * for identity verification before showing the registration form.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import type { CSSProperties } from "react";

interface VippsSession {
  verified: boolean;
  name: string;
  givenName: string;
  familyName: string;
  phone: string;
  email: string;
  birthDate: string;
  verifiedAt: string;
  sub: string;
}

interface VippsLoginProps {
  onVerified: (session: VippsSession) => void;
}

const ui = {
  container: {
    background:
      "linear-gradient(155deg, #0a1d39 0%, #0f2648 55%, #051427 100%)",
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
    padding: "16px 28px",
    fontSize: 17,
    fontWeight: 700,
    background: "transparent",
    color: "#ff5100", // Vipps orange
    border: "1.5px solid #ff5100",
    borderRadius: 12,
    cursor: "pointer",
    transition:
      "background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
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
    } catch {
      // Non-critical error - user will just see the login prompt
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
      // Redirect directly to Vipps start endpoint (GET request)
      window.location.href = "/api/vipps/start";
    } catch (err) {
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
        For å sikre at alle kandidater er ekte personer og oppfyller lovkrav, må
        du verifisere identiteten din med Vipps før du registrerer deg.
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
            e.currentTarget.style.background = "rgba(255,81,0,0.12)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        {loading ? (
          <>
            <span>Starter Vipps…</span>
          </>
        ) : (
          <>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="12" cy="12" r="10" fill="#ff5100" />
              <rect x="7" y="11" width="10" height="2" rx="1" fill="#ffffff" />
            </svg>
            <span>Verifiser med Vipps</span>
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
  // Be tolerant to backend field names: phone vs phone_number, verifiedAt vs verified_at
  const sessionData = session as unknown as {
    phone?: string;
    phone_number?: string;
    verifiedAt?: string;
    verified_at?: string;
  };
  const phone = sessionData.phone ?? sessionData.phone_number ?? "";
  const verifiedAt = sessionData.verifiedAt ?? sessionData.verified_at ?? null;
  return (
    <div style={ui.verifiedBox}>
      <div style={ui.verifiedIcon}>✅</div>
      <div style={ui.verifiedTitle}>Identitet verifisert!</div>
      <div style={ui.verifiedInfo}>
        <strong>{session.name}</strong>
        <br />
        {phone}
        <br />
        <span style={{ fontSize: 14, opacity: 0.7 }}>
          Verifisert{" "}
          {verifiedAt ? new Date(verifiedAt).toLocaleString("nb-NO") : "nå"}
        </span>
      </div>
    </div>
  );
}

/**
 * Standalone Vipps Login Page
 * Checks for existing session and redirects to form if verified
 */
export function VippsLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  // Check if user came back from Vipps
  const isReturningFromVipps = searchParams.get("verified") === "true";

  // Check if user already has a valid Vipps session
  const checkExistingSession = useCallback(async () => {
    try {
      const response = await fetch("/api/vipps/session");
      const data = await response.json();

      if (data.verified && data.session) {
        // User is already verified, redirect to form
        router.push("/jobbsoker/registrer/skjema");
        return;
      }

      if (isReturningFromVipps && !data.verified) {
        setError("Vipps-verifisering feilet. Prøv igjen.");
      }
    } catch {
      if (isReturningFromVipps) {
        setError("Kunne ikke bekrefte Vipps-sesjonen. Prøv igjen.");
      }
    } finally {
      setCheckingSession(false);
    }
  }, [router, isReturningFromVipps]);

  useEffect(() => {
    checkExistingSession();
  }, [checkExistingSession]);

  async function handleVippsLogin() {
    setLoading(true);
    setError(null);

    try {
      // Redirect directly to Vipps start endpoint (GET request)
      window.location.href = "/api/vipps/start";
    } catch (err) {
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
      <div style={compactUi.card}>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>⏳</div>
          <p style={{ margin: 0, color: "#64748b" }}>Sjekker sesjon...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={compactUi.card}>
      {/* Vipps logo */}
      <div style={compactUi.logoWrap}>
        <Image
          src="/icons/vipps-logo.jpeg"
          alt="Vipps"
          width={100}
          height={40}
          style={{ borderRadius: 8 }}
        />
      </div>

      <h2 style={compactUi.title}>Verifiser identiteten din</h2>

      <p style={compactUi.text}>
        Identitetsverifisering med BankID er lovpålagt for bemanningsbransjen.
      </p>

      {/* Trust badges */}
      <div style={compactUi.trustBadges}>
        <span style={compactUi.trustBadge}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          BankID-sikret
        </span>
        <span style={compactUi.trustBadge}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          30 sek
        </span>
      </div>

      <button
        onClick={handleVippsLogin}
        disabled={loading}
        style={{
          ...compactUi.button,
          ...(loading ? { opacity: 0.7, cursor: "wait" } : {}),
        }}
      >
        {loading ? "Kobler til Vipps…" : "Logg inn med Vipps"}
      </button>

      {error && (
        <p style={compactUi.error}>{error}</p>
      )}

      <p style={compactUi.footer}>
        Ved å fortsette godtar du vår{" "}
        <a href="/personvern" style={compactUi.link}>personvernerklæring</a>
      </p>
    </div>
  );
}

const compactUi = {
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: "40px 32px",
    maxWidth: 400,
    margin: "0 auto",
    boxShadow: "0 20px 50px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(226, 232, 240, 0.8)",
    textAlign: "center",
  } as CSSProperties,
  logoWrap: {
    marginBottom: 24,
    display: "flex",
    justifyContent: "center",
  } as CSSProperties,
  logo: {
    height: 48,
    width: "auto",
    borderRadius: 8,
  } as CSSProperties,
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: "#0f172a",
    margin: "0 0 12px",
  } as CSSProperties,
  text: {
    fontSize: 15,
    color: "#64748b",
    lineHeight: 1.6,
    margin: "0 0 24px",
  } as CSSProperties,
  trustBadges: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
    marginBottom: 24,
  } as CSSProperties,
  trustBadge: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    color: "#64748b",
    fontWeight: 500,
  } as CSSProperties,
  button: {
    width: "100%",
    padding: "16px 28px",
    fontSize: 17,
    fontWeight: 700,
    background: "#ff5100",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    transition: "transform 0.15s, box-shadow 0.15s",
    boxShadow: "0 8px 24px rgba(255, 81, 0, 0.3)",
  } as CSSProperties,
  error: {
    marginTop: 16,
    padding: "12px 16px",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: 10,
    color: "#dc2626",
    fontSize: 14,
    fontWeight: 500,
  } as CSSProperties,
  footer: {
    marginTop: 20,
    fontSize: 13,
    color: "#94a3b8",
  } as CSSProperties,
  link: {
    color: "#0369a1",
    textDecoration: "underline",
  } as CSSProperties,
}
