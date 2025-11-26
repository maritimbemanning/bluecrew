"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FileInput, Input, Textarea } from "../components/FormControls";
import { WORK } from "../lib/constants";
import { sx } from "../lib/styles";
import {
  candidateSchema,
  extractCandidateForm,
  type CandidateFormValues,
} from "../lib/validation";
import { VippsVerifiedBadge } from "./VippsLogin";
import { useCsrfToken } from "../hooks/useCsrfToken";

const FORM_STORAGE_KEY = "bluecrew:candidateFormDraft";
const TOTAL_STEPS = 4;

type FieldErrors = Record<string, string>;
type FileErrors = { cv?: string; certs?: string };

// Step definitions
const STEPS = [
  { id: 1, title: "Kontaktinfo", shortTitle: "Kontakt" },
  { id: 2, title: "Arbeidsønsker", shortTitle: "Arbeid" },
  { id: 3, title: "Kompetanse", shortTitle: "Erfaring" },
  { id: 4, title: "Dokumenter", shortTitle: "Last opp" },
] as const;

const ui = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "32px clamp(16px, 5vw, 24px) 80px",
  },
  formShell: {
    background: "#ffffff",
    borderRadius: 20,
    padding: "32px clamp(20px, 5vw, 40px)",
    border: "1px solid #e2e8f0",
    boxShadow: "0 10px 40px rgba(15, 23, 42, 0.08)",
    display: "grid",
    gap: 24,
  },
  stepIndicator: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  stepDot: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 14,
    transition: "all 0.2s ease",
  },
  stepLine: {
    flex: 1,
    height: 3,
    background: "#e2e8f0",
    borderRadius: 2,
  },
  stepLineActive: {
    background: "#0ea5e9",
  },
  section: {
    display: "grid",
    gap: 18,
  },
  sectionHeader: {
    display: "grid",
    gap: 6,
  },
  sectionTitle: {
    margin: 0,
    fontSize: 22,
    fontWeight: 800,
    color: "#0b1f3a",
  },
  sectionLead: {
    margin: 0,
    fontSize: 15,
    color: "#475569",
    lineHeight: 1.6,
  },
  fieldGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
  },
  filesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 16,
  },
  consentBox: {
    background: "#f0f9ff",
    borderRadius: 18,
    border: "1px solid #bae6fd",
    padding: 18,
    display: "grid",
    gap: 10,
  },
  workPanel: {
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    background: "#f8fafc",
    padding: 16,
    display: "grid",
    gap: 12,
  },
  navRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    marginTop: 8,
    paddingTop: 24,
    borderTop: "1px solid #e2e8f0",
  },
  btnPrev: {
    padding: "14px 28px",
    background: "#f1f5f9",
    color: "#334155",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  btnNext: {
    padding: "14px 32px",
    background: "#0ea5e9",
    color: "#ffffff",
    border: "none",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(14, 165, 233, 0.3)",
    transition: "all 0.2s ease",
  },
  btnSubmit: {
    padding: "16px 36px",
    background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(5, 150, 105, 0.35)",
    transition: "all 0.2s ease",
  },
  infoBox: {
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    color: "#1d4ed8",
    padding: 12,
    borderRadius: 14,
    fontWeight: 600,
    fontSize: 14,
  },
  successCard: {
    background:
      "linear-gradient(140deg, #ecfdf5 0%, #d1fae5 60%, #dcfce7 100%)",
    borderRadius: 26,
    border: "1px solid #a7f3d0",
    padding: "30px clamp(20px, 6vw, 32px)",
    margin: "0 auto",
    maxWidth: 720,
    boxShadow: "0 28px 60px rgba(16, 94, 78, 0.22)",
    display: "grid",
    gap: 18,
  },
  successTitle: {
    margin: 0,
    fontSize: 26,
    fontWeight: 800,
    color: "#064e3b",
  },
  successBody: {
    margin: 0,
    color: "#065f46",
    lineHeight: 1.7,
    fontSize: 16,
  },
  successList: {
    margin: 0,
    paddingLeft: 20,
    fontSize: 14.5,
    color: "#047857",
    lineHeight: 1.8,
    display: "grid",
    gap: 4,
  },
} satisfies Record<string, CSSProperties>;

// Step Indicator Component
function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div style={ui.stepIndicator}>
      {STEPS.map((step, index) => (
        <div
          key={step.id}
          style={{
            display: "flex",
            alignItems: "center",
            flex: index < STEPS.length - 1 ? 1 : "none",
          }}
        >
          <div
            style={{
              ...ui.stepDot,
              background: currentStep >= step.id ? "#0ea5e9" : "#e2e8f0",
              color: currentStep >= step.id ? "#ffffff" : "#94a3b8",
            }}
            title={step.title}
          >
            {currentStep > step.id ? "✓" : step.id}
          </div>
          {index < STEPS.length - 1 && (
            <div
              style={{
                ...ui.stepLine,
                ...(currentStep > step.id ? ui.stepLineActive : {}),
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// Step labels below dots
function StepLabels({ currentStep }: { currentStep: number }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 24,
      }}
    >
      {STEPS.map((step) => (
        <div
          key={step.id}
          style={{
            fontSize: 12,
            fontWeight: currentStep === step.id ? 700 : 500,
            color: currentStep >= step.id ? "#0ea5e9" : "#94a3b8",
            textAlign: "center",
            width: 60,
          }}
        >
          {step.shortTitle}
        </div>
      ))}
    </div>
  );
}

type VippsSession = {
  verified: boolean;
  name: string;
  givenName: string;
  familyName: string;
  phone: string;
  email: string;
  birthDate: string;
  verifiedAt: string;
  sub: string;
};

type StoredCandidateDraft = Partial<CandidateFormValues> & {
  [key: string]: unknown;
};

export default function CandidateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const submitted = searchParams.get("sent") === "worker";
  const isVerified = searchParams.get("verified") === "true";
  const formRef = useRef<HTMLFormElement>(null);
  const { csrfToken } = useCsrfToken();

  // Multi-step state
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (!submitted || typeof window === "undefined") return;
    const plausible = (
      window as typeof window & {
        plausible?: (
          event: string,
          options?: { props?: Record<string, unknown> }
        ) => void;
      }
    ).plausible;
    if (typeof plausible === "function") {
      plausible("Lead Submitted", { props: { form: "candidate" } });
    }
  }, [submitted]);

  const [vippsSession, setVippsSession] = useState<VippsSession | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [draftValues, setDraftValues] = useState<StoredCandidateDraft | null>(
    null
  );
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const checkVippsSession = useCallback(async () => {
    try {
      const response = await fetch("/api/vipps/session");
      if (!response.ok) {
        console.log("Vipps API not configured, skipping verification");
        setCheckingSession(false);
        return;
      }
      const data = await response.json();

      if (data.verified && data.session) {
        setVippsSession(data.session as VippsSession);
        setStatusMessage(
          isVerified
            ? "Vipps-verifisering fullført. Fyll ut skjemaet for å fullføre registreringen."
            : null
        );
      } else {
        router.push("/jobbsoker/registrer");
        return;
      }
    } catch (error) {
      console.error("Failed to check Vipps session", error);
      router.push("/jobbsoker/registrer");
      return;
    } finally {
      setCheckingSession(false);
    }
  }, [router, isVerified]);

  useEffect(() => {
    checkVippsSession();
  }, [checkVippsSession]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.sessionStorage.getItem(FORM_STORAGE_KEY);
      if (saved) {
        const parsed: StoredCandidateDraft = JSON.parse(saved);
        setDraftValues(parsed);
      }
    } catch (error) {
      console.error("Failed to restore candidate draft", error);
    }
  }, []);

  const workEntries = useMemo(() => Object.entries(WORK), []);
  const [openMain, setOpenMain] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const key of Object.keys(WORK)) init[key] = false;
    return init;
  });
  const [otherText, setOtherText] = useState<Record<string, string>>({});

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [fileErrors, setFileErrors] = useState<FileErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearFieldError = useCallback((name: string) => {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
    setFormError(null);
  }, []);

  const clearFileError = useCallback((name: keyof FileErrors) => {
    setFileErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const toggleMain = useCallback((main: string) => {
    setOpenMain((prev) => ({ ...prev, [main]: !prev[main] }));
  }, []);

  // Step validation
  const validateStep = useCallback((step: number): boolean => {
    if (!formRef.current) return false;
    const formData = new FormData(formRef.current);
    const nextErrors: FieldErrors = {};

    if (step === 1) {
      // Validate contact info
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const phone = String(formData.get("phone") || "").trim();
      const fylke = String(formData.get("fylke") || "").trim();
      const kommune = String(formData.get("kommune") || "").trim();

      if (!name || name.length < 2) nextErrors.name = "Oppgi fullt navn";
      if (!email || !email.includes("@"))
        nextErrors.email = "Oppgi gyldig e-post";
      if (!phone || phone.length < 6) nextErrors.phone = "Oppgi telefonnummer";
      if (!fylke) nextErrors.fylke = "Velg fylke";
      if (!kommune) nextErrors.kommune = "Oppgi kommune";
    }

    if (step === 2) {
      // Validate work preferences
      const wantsTemporary = formData.get("wants_temporary");
      const workMain = formData.getAll("work_main");

      if (!wantsTemporary) nextErrors.wants_temporary = "Velg ja eller nei";
      if (workMain.length === 0)
        nextErrors.work_main = "Velg minst ett arbeidsområde";
    }

    // Step 3 (skills) has no required fields

    if (step === 4) {
      // Validate files and consent
      const cvFile = formData.get("cv") as File | null;
      const certsFile = formData.get("certs") as File | null;
      const stcwConfirm = formData.get("stcw_confirm") !== null;
      const gdpr = formData.get("gdpr") !== null;
      const nextFileErrors: FileErrors = {};

      // CV is required
      if (!cvFile || cvFile.size === 0) {
        nextFileErrors.cv = "CV (PDF) er påkrevd";
      } else if (cvFile.size > 10 * 1024 * 1024) {
        nextFileErrors.cv = "CV må være under 10 MB";
      } else if (!cvFile.name.toLowerCase().endsWith(".pdf")) {
        nextFileErrors.cv = "CV må være en PDF-fil";
      }

      // Certificates are optional - only validate if provided
      if (certsFile && certsFile.size > 0) {
        if (certsFile.size > 10 * 1024 * 1024) {
          nextFileErrors.certs = "Fil må være under 10 MB";
        } else {
          const allowed = [".pdf", ".zip", ".doc", ".docx"];
          const name = certsFile.name.toLowerCase();
          if (!allowed.some((ext) => name.endsWith(ext))) {
            nextFileErrors.certs = "Fil må være PDF, ZIP eller Word";
          }
        }
      }

      if (!stcwConfirm) nextErrors.stcw_confirm = "Bekreft STCW og helseattest";
      if (!gdpr) nextErrors.gdpr = "Samtykke til personvern er påkrevd";

      if (Object.keys(nextFileErrors).length > 0) {
        setFileErrors(nextFileErrors);
      }

      // Return false if there are file errors OR field errors for step 4
      if (
        Object.keys(nextFileErrors).length > 0 ||
        Object.keys(nextErrors).length > 0
      ) {
        setFieldErrors(nextErrors);
        return false;
      }
      return true;
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return false;
    }

    return true;
  }, []);

  const handleNext = useCallback(() => {
    if (validateStep(currentStep)) {
      setFieldErrors({});
      setFileErrors({});
      setFormError(null);
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep, validateStep]);

  const handlePrev = useCallback(() => {
    setFieldErrors({});
    setFileErrors({});
    setFormError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // Final validation
      if (!validateStep(4)) {
        setFormError("Kontroller feltene markert i rødt.");
        return;
      }

      const formData = new FormData(event.currentTarget);
      const { values } = extractCandidateForm(formData);
      const parsed = candidateSchema.safeParse(values);

      if (!parsed.success) {
        const nextErrors: FieldErrors = {};
        for (const issue of parsed.error.issues) {
          const key = issue.path[0];
          if (typeof key === "string" && !nextErrors[key]) {
            nextErrors[key] = issue.message;
          }
        }
        setFieldErrors(nextErrors);
        setFormError("Kontroller feltene markert i rødt.");
        return;
      }

      // Honeypot check
      if (values.honey) {
        return;
      }

      // Vipps verification check
      if (!vippsSession) {
        setFormError("Du må verifisere identiteten din med Vipps først.");
        router.push("/jobbsoker/registrer");
        return;
      }

      setFieldErrors({});
      setFileErrors({});
      setFormError(null);
      setIsSubmitting(true);

      if (csrfToken) {
        formData.set("csrf_token", csrfToken);
      }

      try {
        const response = await fetch("/api/submit-candidate", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || "Innsending feilet");
        }

        try {
          if (typeof window !== "undefined") {
            window.sessionStorage.removeItem(FORM_STORAGE_KEY);
          }
        } catch {
          // Ignore storage errors
        }

        window.location.href = "/jobbsoker/registrer/skjema?sent=worker";
      } catch (error) {
        setFormError(
          error instanceof Error ? error.message : "Noe gikk galt. Prøv igjen."
        );
        setIsSubmitting(false);
      }
    },
    [vippsSession, router, csrfToken, validateStep]
  );

  // Success state
  if (submitted) {
    // Google Ads Conversion Tracking
    if (
      typeof window !== "undefined" &&
      (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag
    ) {
      (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag(
        "event",
        "conversion",
        {
          send_to: "AW-17731534362/F93uCMSS9MYbEJr8hodC",
          value: 1.0,
          currency: "NOK",
        }
      );
    }

    // Meta Pixel Lead Tracking
    if (
      typeof window !== "undefined" &&
      (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq
    ) {
      (window as typeof window & { fbq: (...args: unknown[]) => void }).fbq(
        "track",
        "Lead"
      );
    }

    return (
      <div style={ui.successCard} role="status">
        <h2 style={ui.successTitle}>Søknaden er mottatt!</h2>
        <p style={ui.successBody}>
          Takk for at du registrerte deg hos Bluecrew. Vi verifiserer profilen
          din og matcher deg med relevante oppdrag.
        </p>
        <div>
          <strong style={{ color: "#047857" }}>Hva skjer nå?</strong>
          <ul style={ui.successList}>
            <li>
              Vi går gjennom CV og sertifikater innen{" "}
              <strong>24–48 timer</strong>.
            </li>
            <li>Du får e-post når profilen din er aktivert.</li>
            <li>Oppdrag formidles via telefon eller e-post.</li>
          </ul>
        </div>
        <p style={ui.successBody}>
          Spørsmål? Send e-post til <strong>isak@bluecrew.no</strong> eller ring{" "}
          <strong>923 28 850</strong>.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 28px",
            backgroundColor: "#0ea5e9",
            color: "#ffffff",
            textDecoration: "none",
            borderRadius: "12px",
            fontWeight: "700",
            fontSize: "1rem",
            marginTop: "16px",
            boxShadow: "0 4px 12px rgba(14, 165, 233, 0.3)",
          }}
        >
          ← Tilbake til forsiden
        </Link>
      </div>
    );
  }

  // Loading state
  if (checkingSession) {
    return (
      <div style={ui.wrap}>
        <div style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>
            Verifiserer Vipps-sesjon...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div style={ui.wrap}>
      <form
        ref={formRef}
        action="/api/submit-candidate"
        method="POST"
        encType="multipart/form-data"
        noValidate
        onSubmit={handleSubmit}
        style={ui.formShell}
      >
        {/* Step Progress */}
        <div>
          <StepIndicator currentStep={currentStep} />
          <StepLabels currentStep={currentStep} />
        </div>

        {formError && (
          <div style={sx.formError} role="alert">
            {formError}
          </div>
        )}

        {vippsSession && currentStep === 1 && (
          <VippsVerifiedBadge session={vippsSession} />
        )}

        {statusMessage && currentStep === 1 && (
          <div style={ui.infoBox} role="status">
            {statusMessage}
          </div>
        )}

        {/* STEP 1: Contact Info */}
        {currentStep === 1 && (
          <div style={ui.section}>
            <div style={ui.sectionHeader}>
              <h2 style={ui.sectionTitle}>Kontaktinformasjon</h2>
              <p style={ui.sectionLead}>
                Oppgi navn, kontaktinformasjon og bosted.
              </p>
            </div>
            <div style={ui.fieldGrid}>
              <Input
                label="Fullt navn"
                name="name"
                required
                defaultValue={(vippsSession?.name || draftValues?.name) ?? ""}
                error={fieldErrors.name}
                onChange={() => clearFieldError("name")}
              />
              <Input
                label="E-post"
                name="email"
                type="email"
                required
                defaultValue={
                  ((vippsSession as unknown as { email?: string })?.email ||
                    draftValues?.email) ??
                  ""
                }
                error={fieldErrors.email}
                onChange={() => clearFieldError("email")}
              />
              <Input
                label="Telefon"
                name="phone"
                required
                defaultValue={(vippsSession?.phone || draftValues?.phone) ?? ""}
                error={fieldErrors.phone}
                onChange={() => clearFieldError("phone")}
              />
            </div>
            <div style={ui.fieldGrid}>
              <div>
                <label style={sx.label}>
                  <span>Fylke</span>
                  <select
                    name="fylke"
                    style={sx.input}
                    onChange={() => clearFieldError("fylke")}
                  >
                    <option value="">Velg fylke</option>
                    <option value="Agder">Agder</option>
                    <option value="Innlandet">Innlandet</option>
                    <option value="Møre og Romsdal">Møre og Romsdal</option>
                    <option value="Nordland">Nordland</option>
                    <option value="Oslo">Oslo</option>
                    <option value="Rogaland">Rogaland</option>
                    <option value="Troms">Troms</option>
                    <option value="Finnmark">Finnmark</option>
                    <option value="Trøndelag">Trøndelag</option>
                    <option value="Vestfold og Telemark">
                      Vestfold og Telemark
                    </option>
                    <option value="Vestland">Vestland</option>
                    <option value="Viken">Viken</option>
                    <option value="Svalbard">Svalbard</option>
                  </select>
                </label>
              </div>
              <div>
                <label style={sx.label}>
                  <span>Kommune</span>
                  <input
                    type="text"
                    name="kommune"
                    placeholder="F.eks. Bergen, Tromsø"
                    style={sx.input}
                    onChange={() => clearFieldError("kommune")}
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Work Preferences */}
        {currentStep === 2 && (
          <div style={ui.section}>
            <div style={ui.sectionHeader}>
              <h2 style={ui.sectionTitle}>Arbeidsønsker</h2>
              <p style={ui.sectionLead}>
                Oppgi tilgjengelighet og ønskede arbeidsområder.
              </p>
            </div>

            <div style={ui.fieldGrid}>
              <Input
                label="Tilgjengelig fra"
                name="available_from"
                type="date"
                defaultValue={draftValues?.available_from ?? ""}
                error={fieldErrors.available_from}
                onChange={() => clearFieldError("available_from")}
              />
            </div>

            <div>
              <div
                style={{ fontWeight: 700, marginBottom: 8, color: "#0b1f3a" }}
              >
                Er du åpen for midlertidige oppdrag? *
              </div>
              <div style={sx.inlineRadios}>
                <label style={sx.radioLabel}>
                  <input
                    type="radio"
                    name="wants_temporary"
                    value="ja"
                    onChange={() => clearFieldError("wants_temporary")}
                    required
                  />
                  Ja
                </label>
                <label style={sx.radioLabel}>
                  <input
                    type="radio"
                    name="wants_temporary"
                    value="nei"
                    onChange={() => clearFieldError("wants_temporary")}
                  />
                  Nei
                </label>
              </div>
              {fieldErrors.wants_temporary && (
                <div style={sx.errText} role="alert">
                  {fieldErrors.wants_temporary}
                </div>
              )}
            </div>

            <div style={{ marginTop: 12 }}>
              <div
                style={{
                  fontWeight: 700,
                  marginBottom: 12,
                  color: "#0b1f3a",
                  fontSize: 16,
                }}
              >
                Ønsket arbeid *
              </div>
              <p style={{ fontSize: 14, color: "#64748b", marginBottom: 12 }}>
                Huk av relevante fagområder.
              </p>
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              {workEntries.map(([main, subs]) => {
                const open = !!openMain[main];
                return (
                  <div key={main} style={ui.workPanel}>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={open}
                        onChange={() => toggleMain(main)}
                      />
                      <span style={{ fontWeight: 700, color: "#0b1f3a" }}>
                        {main}
                      </span>
                    </label>
                    {open && (
                      <div>
                        <div style={sx.tags}>
                          {(subs as string[]).map((sub) =>
                            sub === "Annet" ? (
                              <div key={sub} style={{ flex: 1, minWidth: 200 }}>
                                <label style={sx.label}>
                                  <span>Annet</span>
                                  <input
                                    name={`other_${main}`}
                                    placeholder="Beskriv kort"
                                    value={otherText[main] || ""}
                                    onChange={(e) =>
                                      setOtherText((prev) => ({
                                        ...prev,
                                        [main]: e.target.value,
                                      }))
                                    }
                                    style={sx.input}
                                  />
                                </label>
                              </div>
                            ) : (
                              <label key={sub} style={sx.tagItem}>
                                <input
                                  type="checkbox"
                                  name="work_main"
                                  value={`${main}:${sub}`}
                                  onChange={() => clearFieldError("work_main")}
                                />
                                <span>{sub}</span>
                              </label>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {fieldErrors.work_main && (
              <div style={sx.errText} role="alert">
                {fieldErrors.work_main}
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Skills */}
        {currentStep === 3 && (
          <div style={ui.section}>
            <div style={ui.sectionHeader}>
              <h2 style={ui.sectionTitle}>Kompetanse og erfaring</h2>
              <p style={ui.sectionLead}>
                Beskriv relevant erfaring og sertifikater.
              </p>
            </div>
            <Textarea
              label="Kompetanse og erfaring"
              name="skills"
              rows={6}
              full
              description="Eksempel: 5 års erfaring som matros på brønnbåt, STCW grunnkurs, ROV-sertifikat..."
              error={fieldErrors.skills}
              onBlur={() => clearFieldError("skills")}
            />
            <Textarea
              label="Andre kommentarer (valgfritt)"
              name="other_comp"
              rows={4}
              full
              description="Preferanser, tilgjengelighet eller andre notater."
              error={fieldErrors.other_comp}
              onBlur={() => clearFieldError("other_comp")}
            />
          </div>
        )}

        {/* STEP 4: Documents & Consent */}
        {currentStep === 4 && (
          <div style={ui.section}>
            <div style={ui.sectionHeader}>
              <h2 style={ui.sectionTitle}>Dokumenter og samtykke</h2>
              <p style={ui.sectionLead}>
                Last opp CV og sertifikater for å fullføre registreringen.
              </p>
            </div>

            <div style={ui.filesGrid}>
              <FileInput
                label="CV (PDF, maks 10 MB) *"
                name="cv"
                accept=".pdf"
                required
                error={fileErrors.cv}
                onChange={() => clearFileError("cv")}
              />
              <FileInput
                label="Sertifikater/Helseattest (valgfritt)"
                name="certs"
                accept=".pdf,.zip,.doc,.docx"
                multiple
                error={fileErrors.certs}
                onChange={() => clearFileError("certs")}
              />
            </div>
            <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
              Har du ikke sertifikatene klare? Du kan laste dem opp senere via
              Min Side.
            </p>

            <div style={ui.consentBox}>
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontSize: 14.5,
                  color: "#0b1f3a",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name="stcw_confirm"
                  required
                  aria-invalid={!!fieldErrors.stcw_confirm}
                  onChange={() => clearFieldError("stcw_confirm")}
                  style={{ marginTop: 3, flexShrink: 0 }}
                />
                <span>
                  Jeg bekrefter at jeg har eller vil skaffe{" "}
                  <strong>STCW grunnleggende sikkerhetskurs</strong> og{" "}
                  <strong>gyldig helseattest</strong> før oppdrag.
                </span>
              </label>
              {fieldErrors.stcw_confirm && (
                <div style={sx.errText} role="alert">
                  {fieldErrors.stcw_confirm}
                </div>
              )}

              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontSize: 14.5,
                  color: "#0b1f3a",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name="gdpr"
                  required
                  aria-invalid={!!fieldErrors.gdpr}
                  onChange={() => clearFieldError("gdpr")}
                  style={{ marginTop: 3, flexShrink: 0 }}
                />
                <span>
                  Jeg samtykker til at Bluecrew AS lagrer personopplysninger, CV
                  og sertifikater i <strong>12–24 måneder</strong>.{" "}
                  <Link
                    href="/personvern"
                    style={{
                      color: "#0369a1",
                      textDecoration: "underline",
                      fontWeight: 600,
                    }}
                  >
                    Les personvernerklæringen
                  </Link>
                  .
                </span>
              </label>
              {fieldErrors.gdpr && (
                <div style={sx.errText} role="alert">
                  {fieldErrors.gdpr}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Honeypot */}
        <div aria-hidden="true" style={sx.honeypot}>
          <label>
            <span>Dette feltet skal stå tomt</span>
            <input name="honey" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {/* Navigation */}
        <div style={ui.navRow}>
          {currentStep > 1 ? (
            <button type="button" onClick={handlePrev} style={ui.btnPrev}>
              ← Forrige
            </button>
          ) : (
            <div />
          )}

          {currentStep < TOTAL_STEPS ? (
            <button type="button" onClick={handleNext} style={ui.btnNext}>
              Neste →
            </button>
          ) : (
            <button
              type="submit"
              style={{
                ...ui.btnSubmit,
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? "wait" : "pointer",
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sender..." : "Send inn søknad"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export { CandidateContent as CandidateForm };
