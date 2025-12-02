"use client";
// Cache-bust: 2025-12-02-CSRF

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { CSSProperties } from "react";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { FileInput, Input, Textarea } from "../components/FormControls";
import { WORK } from "../lib/constants";
import { useCsrf } from "../lib/hooks/useCsrf";
import { sx } from "../lib/styles";
import {
  candidateSchema,
  extractCandidateForm,
  type CandidateFormValues,
} from "../lib/validation";
import { VippsVerifiedBadge } from "./VippsLogin";

const FORM_STORAGE_KEY = "bluecrew:candidateFormDraft";

type FieldErrors = Record<string, string>;

type FileErrors = {
  cv?: string;
  certs?: string;
};

const ui = {
  wrap: {
    maxWidth: 920,
    margin: "0 auto",
    padding: "40px clamp(20px, 5vw, 32px) 80px",
  },
  formShell: {
    background: "#ffffff",
    borderRadius: 20,
    padding: "40px clamp(24px, 6vw, 48px)",
    border: "1px solid #e2e8f0",
    boxShadow: "0 10px 40px rgba(15, 23, 42, 0.08)",
    display: "grid",
    gap: 32,
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
    fontSize: 20,
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
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 16,
  },
  divider: {
    height: 1,
    background:
      "linear-gradient(90deg, transparent, #e2e8f0 10%, #e2e8f0 90%, transparent)",
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
  sidebar: {
    background: "#0f172a",
    borderRadius: 26,
    padding: 28,
    border: "1px solid rgba(148, 197, 255, 0.28)",
    color: "#e2e8f0",
    display: "grid",
    gap: 18,
    boxShadow: "0 24px 60px rgba(8, 16, 32, 0.45)",
  },
  sidebarTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 800,
  },
  sidebarList: {
    margin: 0,
    paddingLeft: 18,
    display: "grid",
    gap: 10,
    color: "rgba(226, 232, 240, 0.9)",
    fontSize: 14.5,
    lineHeight: 1.7,
  },
  sidebarFooter: {
    marginTop: 8,
    fontSize: 13,
    color: "rgba(226, 232, 240, 0.7)",
    lineHeight: 1.7,
  },
  submitRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    flexWrap: "wrap",
    alignItems: "center",
  },
  submitNote: {
    fontSize: 13,
    color: "#475569",
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
  modalBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.65)",
    display: "grid",
    placeItems: "center",
    padding: "24px clamp(16px, 5vw, 36px)",
    zIndex: 100,
  },
  modalPanel: {
    background: "#fff",
    borderRadius: 24,
    padding: "32px clamp(18px, 5vw, 38px)",
    boxShadow: "0 32px 80px rgba(15, 23, 42, 0.35)",
    display: "grid",
    gap: 18,
    maxWidth: 420,
    width: "100%",
  },
  infoBox: {
    gridColumn: "1 / -1",
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    color: "#1d4ed8",
    padding: 12,
    borderRadius: 14,
    fontWeight: 600,
  },
} satisfies Record<string, CSSProperties>;

type VippsSession = {
  verified: boolean;
  name: string;
  givenName: string;
  familyName: string;
  phone?: string;
  phone_number?: string;
  email?: string;
  birthDate: string;
  verifiedAt?: string;
  verified_at?: string;
};

type StoredCandidateDraft = Partial<CandidateFormValues> & {
  [key: string]: unknown;
};

export default function CandidateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const submitted = searchParams.get("sent") === "worker";
  const isVerified = searchParams.get("verified") === "true";
  const requireVipps =
    (process.env.NEXT_PUBLIC_REQUIRE_VIPPS ?? "true").toLowerCase() !== "false";

  // CSRF protection
  const { token: csrfToken, refresh: refreshCsrf } = useCsrf();

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
            ? "Vipps-verifisering fullført. Kontroller opplysningene før innsending."
            : "Vipps-verifisering aktiv. Fullfør skjemaet for å sende inn."
        );
      } else {
        if (requireVipps) {
          // Require a valid session for compliance – redirect back to Vipps step
          router.push("/jobbsoker/registrer");
          return;
        } else {
          // Soft mode: allow form without Vipps temporarily
          setStatusMessage(
            "Midleridig løsning: Du kan sende inn uten Vipps-verifisering."
          );
        }
      }
    } catch (error) {
      console.error("Failed to check Vipps session", error);
      if (requireVipps) {
        // On error, enforce Vipps step again
        router.push("/jobbsoker/registrer");
        return;
      }
    } finally {
      setCheckingSession(false);
    }
  }, [router, isVerified, requireVipps]);

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
        setStatusMessage("Skjemautkast funnet. Fullfør skjemaet og send inn.");
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

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const { values } = extractCandidateForm(formData);
      const parsed = candidateSchema.safeParse(values);

      const nextErrors: FieldErrors = {};
      const nextFileErrors: FileErrors = {};

      if (!parsed.success) {
        console.log("Validation errors:", parsed.error.issues);
        for (const issue of parsed.error.issues) {
          const key = issue.path[0];
          if (typeof key === "string" && !nextErrors[key]) {
            nextErrors[key] = issue.message;
          }
        }
      }

      // Honeypot
      if (values.honey) {
        setFieldErrors({});
        setFormError(null);
        return;
      }

      // Client-side file validation
      const cvFile = formData.get("cv") as File | null;
      const certsFile = formData.get("certs") as File | null;

      console.log("📎 File validation:", {
        cv: {
          exists: !!cvFile,
          size: cvFile?.size || 0,
          name: cvFile?.name || "N/A",
        },
        certs: {
          exists: !!certsFile,
          size: certsFile?.size || 0,
          name: certsFile?.name || "N/A",
        },
      });

      if (!cvFile || cvFile.size === 0) {
        nextFileErrors.cv = "CV (PDF) er påkrevd";
      } else if (cvFile.size > 10 * 1024 * 1024) {
        nextFileErrors.cv = "CV må være under 10 MB";
      } else if (!cvFile.name.toLowerCase().endsWith(".pdf")) {
        nextFileErrors.cv = "CV må være en PDF-fil";
      }

      if (!certsFile || certsFile.size === 0) {
        nextFileErrors.certs = "Sertifikater/Helseattest er påkrevd";
      } else if (certsFile.size > 10 * 1024 * 1024) {
        nextFileErrors.certs = "Fil må være under 10 MB";
      } else {
        const allowed = [".pdf", ".zip", ".doc", ".docx"];
        const name = certsFile.name.toLowerCase();
        if (!allowed.some((ext) => name.endsWith(ext))) {
          nextFileErrors.certs = "Fil må være PDF, ZIP eller DOC/DOCX";
        }
      }

      if (
        Object.keys(nextErrors).length > 0 ||
        Object.keys(nextFileErrors).length > 0
      ) {
        console.log("Form errors:", nextErrors);
        console.log("File errors:", nextFileErrors);
        setFieldErrors(nextErrors);
        setFileErrors(nextFileErrors);

        // Build a more helpful error message
        const errorFields: string[] = [];
        if (nextErrors.name) errorFields.push("Navn");
        if (nextErrors.email) errorFields.push("E-post");
        if (nextErrors.phone) errorFields.push("Telefon");
        if (nextErrors.region) errorFields.push("Region");
        if (nextErrors.wants_temporary)
          errorFields.push("Midlertidige oppdrag (ja/nei)");
        if (nextErrors.work_main) errorFields.push("Ønsket arbeid");
        if (nextErrors.stcw_confirm) errorFields.push("STCW-bekreftelse");
        if (nextErrors.gdpr) errorFields.push("Personvernsamtykke");
        if (nextFileErrors.cv) errorFields.push("CV");
        if (nextFileErrors.certs) errorFields.push("Sertifikater");

        const errorMessage =
          errorFields.length > 0
            ? `Fyll ut følgende felt: ${errorFields.join(", ")}`
            : "Kontroller feltene markert i rødt.";

        setFormError(errorMessage);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // CRITICAL: Check Vipps verification BEFORE submitting to API (unless soft mode)
      if (requireVipps && !vippsSession) {
        // User should have been redirected already, but just in case
        console.error("❌ Vipps verification missing when required");
        setFormError("Du må verifisere identiteten din med Vipps først.");
        window.scrollTo({ top: 0, behavior: "smooth" });
        router.push("/jobbsoker/registrer");
        return;
      }

      // Vipps verified—submit to API
      setFieldErrors({});
      setFileErrors({});
      setFormError(null);
      setIsSubmitting(true);

      console.log("🚀 Submitting form to API...");

      // Add CSRF token to form data
      if (csrfToken) {
        formData.append("csrf_token", csrfToken);
      }

      try {
        const response = await fetch("/api/submit-candidate", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const message = await response.text();
          console.error("❌ API error:", message);
          throw new Error(message || "Innsending feilet");
        }

        console.log("✅ Form submitted successfully");

        // Clear draft after successful submit
        try {
          if (typeof window !== "undefined") {
            window.sessionStorage.removeItem(FORM_STORAGE_KEY);
          }
        } catch (error) {
          console.warn("Kunne ikke fjerne skjemautkast", error);
        }

        window.location.href = "/jobbsoker/registrer/skjema?sent=worker";
      } catch (error) {
        console.error("❌ Submission error:", error);
        setFormError(
          error instanceof Error ? error.message : "Noe gikk galt. Prøv igjen."
        );
        setIsSubmitting(false);
        refreshCsrf(); // Get new CSRF token after failed attempt
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [vippsSession, requireVipps, router, csrfToken, refreshCsrf]
  );

  if (submitted) {
    return (
      <div style={ui.successCard} role="status">
        <h2 style={ui.successTitle}>Søknaden er mottatt</h2>
        <p style={ui.successBody}>
          Takk for at du registrerte deg hos Bluecrew. Vi verifiserer profilen
          din og matcher deg med relevante oppdrag.
        </p>
        <div>
          <strong style={{ color: "#047857" }}>Hva skjer nå?</strong>
          <ul style={ui.successList}>
            <li>
              Vi går gjennom CV, sertifikater og referanser innen{" "}
              <strong>24–48 timer</strong>.
            </li>
            <li>
              Du får e-post når profilen din er aktivert og klar for matching.
            </li>
            <li>
              Oppdrag formidles via telefon eller e-post – hold
              kontaktinformasjonen din oppdatert.
            </li>
          </ul>
        </div>
        <p style={ui.successBody}>
          Spørsmål eller oppdateringer? Send e-post til{" "}
          <strong>post@bluecrew.no</strong> eller ring{" "}
          <strong>77 02 90 00</strong>.
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
            transition: "all 0.2s ease",
            marginTop: "16px",
            boxShadow: "0 4px 12px rgba(14, 165, 233, 0.3)",
          }}
        >
          ← Tilbake til forsiden
        </Link>
      </div>
    );
  }

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
        action="/api/submit-candidate"
        method="POST"
        encType="multipart/form-data"
        noValidate
        onSubmit={handleSubmit}
        style={ui.formShell}
      >
        {formError ? (
          <div style={sx.formError} role="alert">
            {formError}
          </div>
        ) : null}

        {vippsSession ? <VippsVerifiedBadge session={vippsSession} /> : null}

        {statusMessage ? (
          <div style={ui.infoBox} role="status">
            {statusMessage}
          </div>
        ) : null}

        <div style={ui.section}>
          <div style={ui.sectionHeader}>
            <h2 style={ui.sectionTitle}>Kontaktinformasjon</h2>
            <p style={ui.sectionLead}>
              Oppgi navn, kontaktinformasjon og bostedsadresse.
            </p>
          </div>

          {/* Rad 1: Navn, E-post, Telefon */}
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
              defaultValue={(vippsSession?.email || draftValues?.email) ?? ""}
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

          {/* Rad 2: Gateadresse (full bredde) */}
          <Input
            label="Gateadresse (valgfritt)"
            name="street_address"
            placeholder="Eksempel: Storgata 15"
            defaultValue={(draftValues?.street_address as string) ?? ""}
            error={fieldErrors.street_address}
            onChange={() => clearFieldError("street_address")}
          />

          {/* Rad 3: Postnr, Poststed, Region */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "100px 1fr 1fr",
              gap: 16,
            }}
          >
            <Input
              label="Postnr."
              name="postal_code"
              placeholder="0150"
              defaultValue={(draftValues?.postal_code as string) ?? ""}
              error={fieldErrors.postal_code}
              onChange={() => clearFieldError("postal_code")}
            />
            <Input
              label="Poststed"
              name="postal_city"
              placeholder="OSLO"
              defaultValue={(draftValues?.postal_city as string) ?? ""}
              error={fieldErrors.postal_city}
              onChange={() => clearFieldError("postal_city")}
            />
            <div>
              <label style={sx.label}>
                <span>Region *</span>
                <select
                  name="region"
                  required
                  style={{
                    ...sx.input,
                    ...(fieldErrors.region ? sx.inputErr : null),
                  }}
                  onChange={() => clearFieldError("region")}
                >
                  <option value="">Velg region</option>
                  <option>Nord-Norge</option>
                  <option>Midt-Norge</option>
                  <option>Vestlandet</option>
                  <option>Østlandet</option>
                  <option>Svalbard</option>
                </select>
              </label>
              {fieldErrors.region ? (
                <div style={sx.errText} role="alert">
                  {fieldErrors.region}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div style={ui.divider} />

        <div style={ui.section}>
          <div style={ui.sectionHeader}>
            <h2 style={ui.sectionTitle}>Arbeidsønsker</h2>
            <p style={ui.sectionLead}>
              Oppgi når du er tilgjengelig, om du er åpen for midlertidige
              oppdrag, og huk av relevante fagområder.
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

          <div
            style={{
              padding: fieldErrors.wants_temporary ? 12 : 0,
              borderRadius: 12,
              border: fieldErrors.wants_temporary
                ? "2px solid #ef4444"
                : "none",
              background: fieldErrors.wants_temporary
                ? "rgba(239, 68, 68, 0.05)"
                : "transparent",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 8, color: "#0b1f3a" }}>
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
            {fieldErrors.wants_temporary ? (
              <div style={sx.errText} role="alert">
                {fieldErrors.wants_temporary}
              </div>
            ) : null}
          </div>

          <div
            style={{
              marginTop: 12,
              padding: fieldErrors.work_main ? 16 : 0,
              borderRadius: 16,
              border: fieldErrors.work_main ? "2px solid #ef4444" : "none",
              background: fieldErrors.work_main
                ? "rgba(239, 68, 68, 0.05)"
                : "transparent",
            }}
          >
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
              Huk av relevante fagområder. Åpne flere kategorier ved behov.
            </p>

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
                    {open ? (
                      <div>
                        <div style={sx.tags}>
                          {(subs as string[]).map((sub) =>
                            sub === "Annet" ? (
                              <div key={sub} style={{ flex: 1, minWidth: 240 }}>
                                <label style={sx.label}>
                                  <span>Annet (kort beskrivelse)</span>
                                  <input
                                    name={`other_${main}`}
                                    placeholder="Skriv kort om ønsket arbeid"
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
                        <small style={{ color: "#64748b" }}>
                          Fyll inn «Annet» dersom spesifikke stillinger mangler
                        </small>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
            {fieldErrors.work_main ? (
              <div style={sx.errText} role="alert">
                {fieldErrors.work_main}
              </div>
            ) : null}
          </div>
        </div>

        <div style={ui.divider} />

        <div style={ui.section}>
          <div style={ui.sectionHeader}>
            <h2 style={ui.sectionTitle}>Kompetanse og erfaring</h2>
            <p style={ui.sectionLead}>
              Beskriv relevant erfaring, sertifikater og spesialkompetanse.
            </p>
          </div>
          <Textarea
            label="Kompetanse og erfaring"
            name="skills"
            rows={6}
            full
            description="Eksempel: 5 års erfaring som matros på brønnbåt, STCW grunnkurs, ROV-sertifikat... Oppgi maritime sertifikater, utdanning og relevant arbeidserfaring."
            error={fieldErrors.skills}
            onBlur={() => clearFieldError("skills")}
          />
          <Textarea
            label="Andre kommentarer eller preferanser (valgfritt)"
            name="other_comp"
            rows={4}
            full
            description="Eksempel: Foretrekker oppdrag i Nord-Norge, kan starte med kort varsel... Skriv gjerne om preferanser, tilgjengelighet eller andre notater."
            error={fieldErrors.other_comp}
            onBlur={() => clearFieldError("other_comp")}
          />
        </div>

        <div style={ui.divider} />

        <div style={ui.section}>
          <div style={ui.sectionHeader}>
            <h2 style={ui.sectionTitle}>Dokumenter og samtykke</h2>
            <p style={ui.sectionLead}>
              Last opp CV og eventuelle sertifikater. Vi sender deg bekreftelse
              på e-post.
            </p>
          </div>

          <div style={ui.filesGrid}>
            <FileInput
              label="CV (PDF, maks 10 MB)"
              name="cv"
              accept=".pdf"
              required
              error={fileErrors.cv}
              onChange={() => clearFileError("cv")}
            />
            <FileInput
              label="Sertifikater/Helseattest (PDF/ZIP/DOC, maks 10 MB)"
              name="certs"
              accept=".pdf,.zip,.doc,.docx"
              required
              error={fileErrors.certs}
              onChange={() => clearFileError("certs")}
            />
          </div>

          <div
            style={{
              ...ui.consentBox,
              ...(fieldErrors.stcw_confirm || fieldErrors.gdpr
                ? {
                    border: "2px solid #ef4444",
                    background: "rgba(239, 68, 68, 0.08)",
                  }
                : {}),
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                fontSize: 14.5,
                color: fieldErrors.stcw_confirm ? "#b91c1c" : "#0b1f3a",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                id="stcw_confirm"
                name="stcw_confirm"
                required
                aria-invalid={!!fieldErrors.stcw_confirm}
                onChange={() => clearFieldError("stcw_confirm")}
                style={{ marginTop: 3, flexShrink: 0 }}
              />
              <span>
                Jeg bekrefter at jeg har eller vil skaffe{" "}
                <strong>STCW grunnleggende sikkerhetskurs</strong> og
                <strong> gyldig helseattest</strong> før oppdrag. *
              </span>
            </label>
            {fieldErrors.stcw_confirm ? (
              <div style={sx.errText} role="alert">
                {fieldErrors.stcw_confirm}
              </div>
            ) : null}

            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                fontSize: 14.5,
                color: fieldErrors.gdpr ? "#b91c1c" : "#0b1f3a",
                cursor: "pointer",
              }}
            >
              <input
                id="gdpr"
                type="checkbox"
                name="gdpr"
                value="yes"
                required
                aria-invalid={!!fieldErrors.gdpr}
                onChange={() => clearFieldError("gdpr")}
                style={{ marginTop: 3, flexShrink: 0 }}
              />
              <span>
                Jeg samtykker til at Bluecrew AS lagrer og behandler
                personopplysninger, CV og sertifikater for å matche meg mot
                oppdrag. Data lagres i <strong>12–24 måneder</strong>. *{" "}
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
            {fieldErrors.gdpr ? (
              <div style={sx.errText} role="alert">
                {fieldErrors.gdpr}
              </div>
            ) : null}
          </div>
        </div>

        {/* Honeypot */}
        <div aria-hidden="true" style={sx.honeypot}>
          <label>
            <span>Dette feltet skal stå tomt</span>
            <input name="honey" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div style={ui.submitRow}>
          <button
            type="submit"
            style={{
              ...sx.btnMain,
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? "wait" : (sx.btnMain.cursor as string),
            }}
            disabled={isSubmitting}
          >
            Send inn jobbsøkerprofil
          </button>
          <div style={ui.submitNote}>
            Vi tar kontakt når profilen er verifisert. Spørsmål? Ring{" "}
            <strong>923 28 850</strong>.
          </div>
        </div>
      </form>
    </div>
  );
}

// Export as named export for use in /jobbsoker/registrer/skjema
export { CandidateContent as CandidateForm };
