"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCsrfToken } from "../hooks/useCsrfToken";

const FYLKER = [
  "Agder",
  "Innlandet",
  "Møre og Romsdal",
  "Nordland",
  "Oslo",
  "Rogaland",
  "Troms",
  "Finnmark",
  "Trøndelag",
  "Vestfold og Telemark",
  "Vestland",
  "Viken",
  "Svalbard",
];

type VippsSession = {
  verified: boolean;
  name: string;
  phone: string;
  email: string;
};

const ui = {
  wrap: {
    maxWidth: 560,
    margin: "0 auto",
    padding: "32px clamp(16px, 5vw, 24px) 80px",
  } as CSSProperties,
  card: {
    background: "#ffffff",
    borderRadius: 20,
    padding: "32px clamp(20px, 5vw, 32px)",
    border: "1px solid #e2e8f0",
    boxShadow: "0 10px 40px rgba(15, 23, 42, 0.08)",
  } as CSSProperties,
  title: {
    margin: "0 0 8px",
    fontSize: 24,
    fontWeight: 800,
    color: "#0b1f3a",
  } as CSSProperties,
  subtitle: {
    margin: "0 0 24px",
    fontSize: 15,
    color: "#64748b",
    lineHeight: 1.6,
  } as CSSProperties,
  form: {
    display: "grid",
    gap: 20,
  } as CSSProperties,
  field: {
    display: "grid",
    gap: 6,
  } as CSSProperties,
  label: {
    fontSize: 14,
    fontWeight: 600,
    color: "#334155",
  } as CSSProperties,
  input: {
    padding: "12px 14px",
    fontSize: 16,
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
  } as CSSProperties,
  inputError: {
    borderColor: "#ef4444",
  } as CSSProperties,
  select: {
    padding: "12px 14px",
    fontSize: 16,
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    background: "#fff",
    cursor: "pointer",
  } as CSSProperties,
  textarea: {
    padding: "12px 14px",
    fontSize: 16,
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    resize: "vertical" as const,
    minHeight: 120,
    fontFamily: "inherit",
  } as CSSProperties,
  fileInput: {
    padding: "12px 14px",
    fontSize: 14,
    border: "2px dashed #cbd5e1",
    borderRadius: 10,
    background: "#f8fafc",
    cursor: "pointer",
  } as CSSProperties,
  error: {
    fontSize: 13,
    color: "#dc2626",
    marginTop: 4,
  } as CSSProperties,
  formError: {
    padding: "12px 16px",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: 10,
    color: "#dc2626",
    fontSize: 14,
    fontWeight: 500,
  } as CSSProperties,
  consentBox: {
    background: "#f0f9ff",
    borderRadius: 14,
    border: "1px solid #bae6fd",
    padding: 16,
    display: "grid",
    gap: 12,
  } as CSSProperties,
  checkbox: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    fontSize: 14,
    color: "#334155",
    cursor: "pointer",
  } as CSSProperties,
  button: {
    padding: "16px 32px",
    background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(5, 150, 105, 0.35)",
    transition: "transform 0.15s, box-shadow 0.15s",
    marginTop: 8,
  } as CSSProperties,
  buttonDisabled: {
    opacity: 0.7,
    cursor: "wait",
  } as CSSProperties,
  successCard: {
    background: "linear-gradient(140deg, #ecfdf5 0%, #d1fae5 60%, #dcfce7 100%)",
    borderRadius: 20,
    border: "1px solid #a7f3d0",
    padding: "32px",
    textAlign: "center" as const,
  } as CSSProperties,
  successTitle: {
    margin: "0 0 12px",
    fontSize: 24,
    fontWeight: 800,
    color: "#064e3b",
  } as CSSProperties,
  successText: {
    margin: "0 0 20px",
    color: "#065f46",
    lineHeight: 1.7,
    fontSize: 15,
  } as CSSProperties,
  backLink: {
    display: "inline-block",
    padding: "14px 28px",
    backgroundColor: "#0ea5e9",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 15,
  } as CSSProperties,
  verifiedBadge: {
    background: "rgba(34, 197, 94, 0.1)",
    border: "1px solid rgba(34, 197, 94, 0.3)",
    borderRadius: 12,
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  } as CSSProperties,
  honeypot: {
    position: "absolute" as const,
    left: -9999,
    opacity: 0,
    pointerEvents: "none" as const,
  } as CSSProperties,
};

export default function CandidateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const submitted = searchParams.get("sent") === "worker";
  const { csrfToken } = useCsrfToken();

  const [vippsSession, setVippsSession] = useState<VippsSession | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check Vipps session
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/vipps/session");
        if (res.ok) {
          const data = await res.json();
          if (data.verified && data.session) {
            setVippsSession(data.session);
          } else {
            router.push("/jobbsoker/registrer");
            return;
          }
        }
      } catch {
        router.push("/jobbsoker/registrer");
        return;
      } finally {
        setCheckingSession(false);
      }
    }
    checkSession();
  }, [router]);

  const clearError = useCallback((field: string) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setFormError(null);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormError(null);
      setFieldErrors({});

      const form = e.currentTarget;
      const formData = new FormData(form);

      // Basic validation
      const errors: Record<string, string> = {};
      const name = (formData.get("name") as string || "").trim();
      const phone = (formData.get("phone") as string || "").trim();
      const email = (formData.get("email") as string || "").trim();
      const fylke = (formData.get("fylke") as string || "").trim();
      const skills = (formData.get("skills") as string || "").trim();
      const cv = formData.get("cv") as File | null;
      const stcw = formData.get("stcw_confirm");
      const gdpr = formData.get("gdpr");
      const honey = (formData.get("honey") as string || "").trim();

      // Honeypot
      if (honey) return;

      if (!name || name.length < 2) errors.name = "Oppgi fullt navn";
      if (!phone || phone.length < 6) errors.phone = "Oppgi telefonnummer";
      if (!email || !email.includes("@")) errors.email = "Oppgi gyldig e-post";
      if (!fylke) errors.fylke = "Velg fylke";
      if (!skills || skills.length < 10) errors.skills = "Beskriv din erfaring (minst 10 tegn)";
      if (!cv || cv.size === 0) errors.cv = "Last opp CV (PDF)";
      else if (cv.size > 10 * 1024 * 1024) errors.cv = "CV må være under 10 MB";
      else if (!cv.name.toLowerCase().endsWith(".pdf")) errors.cv = "CV må være PDF";
      if (!stcw) errors.stcw_confirm = "Du må bekrefte STCW og helseattest";
      if (!gdpr) errors.gdpr = "Samtykke til personvern er påkrevd";

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        setFormError("Vennligst fyll ut alle påkrevde felt.");
        return;
      }

      // Vipps check
      if (!vippsSession) {
        setFormError("Du må verifisere identiteten din med Vipps først.");
        router.push("/jobbsoker/registrer");
        return;
      }

      setIsSubmitting(true);

      if (csrfToken) {
        formData.set("csrf_token", csrfToken);
      }

      try {
        const res = await fetch("/api/submit-candidate", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || "Innsending feilet");
        }

        window.location.href = "/jobbsoker/registrer/skjema?sent=worker";
      } catch (err) {
        setFormError(err instanceof Error ? err.message : "Noe gikk galt. Prøv igjen.");
        setIsSubmitting(false);
      }
    },
    [vippsSession, router, csrfToken]
  );

  // Fire Google Ads conversion event on success
  useEffect(() => {
    if (submitted && typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-17731534362/WdQxCN7Fu8QbEJr8hodC",
        value: 1.0,
        currency: "NOK",
      });
    }
  }, [submitted]);

  // Success state
  if (submitted) {
    return (
      <div style={ui.wrap}>
        <div style={ui.successCard}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
          <h2 style={ui.successTitle}>Søknaden er mottatt!</h2>
          <p style={ui.successText}>
            Takk for at du registrerte deg hos Bluecrew.
            <br />
            Vi går gjennom CV-en din og tar kontakt innen 24-48 timer.
          </p>
          <Link href="/" style={ui.backLink}>
            Tilbake til forsiden
          </Link>
        </div>
      </div>
    );
  }

  // Loading state
  if (checkingSession) {
    return (
      <div style={ui.wrap}>
        <div style={{ ...ui.card, textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
          <p style={{ margin: 0, color: "#64748b" }}>Verifiserer sesjon...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={ui.wrap}>
      <div style={ui.card}>
        <h1 style={ui.title}>Registrer deg som jobbsøker</h1>
        <p style={ui.subtitle}>Fyll ut skjemaet under for å bli med i vår kandidatbase.</p>

        {vippsSession && (
          <div style={ui.verifiedBadge}>
            <span style={{ fontSize: 20 }}>✅</span>
            <span>
              <strong>{vippsSession.name}</strong> - verifisert med Vipps
            </span>
          </div>
        )}

        {formError && (
          <div style={ui.formError} role="alert">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} style={ui.form}>
          {/* Navn */}
          <div style={ui.field}>
            <label style={ui.label}>Fullt navn *</label>
            <input
              type="text"
              name="name"
              defaultValue={vippsSession?.name || ""}
              style={{ ...ui.input, ...(fieldErrors.name ? ui.inputError : {}) }}
              onChange={() => clearError("name")}
            />
            {fieldErrors.name && <div style={ui.error}>{fieldErrors.name}</div>}
          </div>

          {/* Telefon */}
          <div style={ui.field}>
            <label style={ui.label}>Telefon *</label>
            <input
              type="tel"
              name="phone"
              defaultValue={vippsSession?.phone || ""}
              style={{ ...ui.input, ...(fieldErrors.phone ? ui.inputError : {}) }}
              onChange={() => clearError("phone")}
            />
            {fieldErrors.phone && <div style={ui.error}>{fieldErrors.phone}</div>}
          </div>

          {/* E-post */}
          <div style={ui.field}>
            <label style={ui.label}>E-post *</label>
            <input
              type="email"
              name="email"
              defaultValue={vippsSession?.email || ""}
              style={{ ...ui.input, ...(fieldErrors.email ? ui.inputError : {}) }}
              onChange={() => clearError("email")}
            />
            {fieldErrors.email && <div style={ui.error}>{fieldErrors.email}</div>}
          </div>

          {/* Fylke */}
          <div style={ui.field}>
            <label style={ui.label}>Fylke *</label>
            <select
              name="fylke"
              style={{ ...ui.select, ...(fieldErrors.fylke ? ui.inputError : {}) }}
              onChange={() => clearError("fylke")}
            >
              <option value="">Velg fylke</option>
              {FYLKER.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
            {fieldErrors.fylke && <div style={ui.error}>{fieldErrors.fylke}</div>}
          </div>

          {/* Erfaring */}
          <div style={ui.field}>
            <label style={ui.label}>Erfaring og kompetanse *</label>
            <textarea
              name="skills"
              placeholder="Beskriv din maritime erfaring, sertifikater, og kompetanse..."
              style={{ ...ui.textarea, ...(fieldErrors.skills ? ui.inputError : {}) }}
              onChange={() => clearError("skills")}
            />
            {fieldErrors.skills && <div style={ui.error}>{fieldErrors.skills}</div>}
          </div>

          {/* CV */}
          <div style={ui.field}>
            <label style={ui.label}>CV (PDF, maks 10 MB) *</label>
            <input
              type="file"
              name="cv"
              accept=".pdf"
              style={{ ...ui.fileInput, ...(fieldErrors.cv ? ui.inputError : {}) }}
              onChange={() => clearError("cv")}
            />
            {fieldErrors.cv && <div style={ui.error}>{fieldErrors.cv}</div>}
          </div>

          {/* Samtykker */}
          <div style={ui.consentBox}>
            <label style={ui.checkbox}>
              <input
                type="checkbox"
                name="stcw_confirm"
                onChange={() => clearError("stcw_confirm")}
                style={{ marginTop: 2, flexShrink: 0 }}
              />
              <span>
                Jeg bekrefter at jeg har eller vil skaffe <strong>STCW grunnkurs</strong> og <strong>gyldig helseattest</strong> før oppdrag.
              </span>
            </label>
            {fieldErrors.stcw_confirm && <div style={ui.error}>{fieldErrors.stcw_confirm}</div>}

            <label style={ui.checkbox}>
              <input
                type="checkbox"
                name="gdpr"
                onChange={() => clearError("gdpr")}
                style={{ marginTop: 2, flexShrink: 0 }}
              />
              <span>
                Jeg samtykker til at Bluecrew lagrer mine opplysninger.{" "}
                <Link href="/personvern" style={{ color: "#0369a1", textDecoration: "underline" }}>
                  Les personvernerklæringen
                </Link>
              </span>
            </label>
            {fieldErrors.gdpr && <div style={ui.error}>{fieldErrors.gdpr}</div>}
          </div>

          {/* Honeypot */}
          <div style={ui.honeypot} aria-hidden="true">
            <input name="honey" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{ ...ui.button, ...(isSubmitting ? ui.buttonDisabled : {}) }}
          >
            {isSubmitting ? "Sender..." : "Send inn søknad"}
          </button>
        </form>
      </div>
    </div>
  );
}

export { CandidateForm };
