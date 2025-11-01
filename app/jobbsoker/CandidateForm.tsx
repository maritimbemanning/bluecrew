"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FileInput, Input, Textarea } from "../components/FormControls";
import { WORK } from "../lib/constants";
import { sx } from "../lib/styles";
import { candidateSchema, extractCandidateForm, type CandidateFormValues } from "../lib/validation";
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
    background: "linear-gradient(90deg, transparent, #e2e8f0 10%, #e2e8f0 90%, transparent)",
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
    background: "linear-gradient(140deg, #ecfdf5 0%, #d1fae5 60%, #dcfce7 100%)",
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
  phone: string;
  birthDate: string;
  verifiedAt: string;
};

type StoredCandidateDraft = Partial<CandidateFormValues> & {
  [key: string]: unknown;
};

export default function CandidateContent() {
  const searchParams = useSearchParams();
  const submitted = searchParams.get("sent") === "worker";

  useEffect(() => {
    if (!submitted || typeof window === "undefined") return;
    const plausible = (window as typeof window & {
      plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
    }).plausible;
    if (typeof plausible === "function") {
      plausible("Lead Submitted", { props: { form: "candidate" } });
    }
  }, [submitted]);

  const [vippsSession, setVippsSession] = useState<VippsSession | null>(null);
  const [showVippsModal, setShowVippsModal] = useState(false);
  const [draftValues, setDraftValues] = useState<StoredCandidateDraft | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const checkVippsSession = useCallback(async (fromCallback = false) => {
    try {
      const response = await fetch("/api/vipps/session");
      if (!response.ok) {
        // Vipps not configured yet - skip for now
        console.log("Vipps API not configured, skipping verification");
        return;
      }
      const data = await response.json();

      if (data.verified && data.session) {
        setVippsSession(data.session as VippsSession);
        setShowVippsModal(false);
        setStatusMessage(
          fromCallback
            ? "Vipps-verifisering fullført. Kontroller opplysningene før innsending."
            : "Vipps-verifisering aktiv. Fullfør skjemaet for å sende inn."
        );
      } else if (fromCallback) {
        setStatusMessage("Fant ingen aktiv Vipps-sesjon. Prøv å logge inn igjen.");
      }
    } catch (error) {
      console.error("Failed to check Vipps session", error);
      if (fromCallback) {
        setStatusMessage("Kunne ikke bekrefte Vipps-sesjonen. Prøv igjen.");
      }
    }
  }, []);

  useEffect(() => {
    checkVippsSession();
  }, [checkVippsSession]);

  useEffect(() => {
    const verified = searchParams.get("verified");
    if (verified === "true") {
      checkVippsSession(true);
    }
  }, [searchParams, checkVippsSession]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.sessionStorage.getItem(FORM_STORAGE_KEY);
      if (saved) {
        const parsed: StoredCandidateDraft = JSON.parse(saved);
        setDraftValues(parsed);
        setStatusMessage("Skjemautkast funnet. Fullfør Vipps-verifisering og send inn.");
      }
    } catch (error) {
      console.error("Failed to restore candidate draft", error);
    }
  }, []);

  const handleVippsLogin = useCallback(async () => {
    try {
      const response = await fetch("/api/vipps/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          redirectUrl: `${window.location.origin}/jobbsoker/registrer?verified=true`,
        }),
      });

      if (!response.ok) {
        throw new Error("Kunne ikke starte Vipps-pålogging");
      }

      const { authUrl } = await response.json();
      window.location.href = authUrl;
    } catch (error) {
      console.error("Vipps init failed", error);
      setStatusMessage("Kunne ikke starte Vipps-verifisering. Prøv igjen.");
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

      if (Object.keys(nextErrors).length > 0) {
        console.log("Form errors:", nextErrors);
        setFieldErrors(nextErrors);
        setFormError("Kontroller feltene markert i rødt.");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // CRITICAL: Check Vipps verification BEFORE submitting to API
      if (!vippsSession) {
        // Save draft to sessionStorage (client-only, no DB write)
        const { honey, ...restValues } = values;
        try {
          if (typeof window !== "undefined") {
            window.sessionStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(restValues));
          }
        } catch (error) {
          console.warn("Kunne ikke lagre skjemautkast", error);
        }

        setDraftValues(restValues);
        setStatusMessage("Logg inn med Vipps for å bekrefte identiteten din.");
        setShowVippsModal(true);
        setFormError(null);
        return;
      }

      // Vipps verified—submit to API
      setFieldErrors({});
      setFormError(null);
      setIsSubmitting(true);

      try {
        const response = await fetch("/api/submit-candidate", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || "Innsending feilet");
        }

        // Clear draft after successful submit
        try {
          if (typeof window !== "undefined") {
            window.sessionStorage.removeItem(FORM_STORAGE_KEY);
          }
        } catch (error) {
          console.warn("Kunne ikke fjerne skjemautkast", error);
        }

        window.location.href = "/jobbsoker/registrer?sent=worker";
      } catch (error) {
        setFormError(error instanceof Error ? error.message : "Noe gikk galt. Prøv igjen.");
        setIsSubmitting(false);
      }
    },
    [vippsSession]
  );

  if (submitted) {
    return (
      <div style={ui.successCard} role="status">
        <h2 style={ui.successTitle}>Søknaden er mottatt</h2>
        <p style={ui.successBody}>
          Takk for at du registrerte deg hos Bluecrew. Vi verifiserer profilen din og matcher deg med relevante oppdrag.
        </p>
        <div>
          <strong style={{ color: "#047857" }}>Hva skjer nå?</strong>
          <ul style={ui.successList}>
            <li>Vi går gjennom CV, sertifikater og referanser innen <strong>24–48 timer</strong>.</li>
            <li>Du får e-post når profilen din er aktivert og klar for matching.</li>
            <li>Oppdrag formidles via telefon eller e-post – hold kontaktinformasjonen din oppdatert.</li>
          </ul>
        </div>
        <p style={ui.successBody}>
          Spørsmål eller oppdateringer? Send e-post til <strong>isak@bluecrew.no</strong> eller ring <strong>923 28 850</strong>.
        </p>
      </div>
    );
  }

  return (
    <div style={ui.wrap}>
      {showVippsModal ? (
        <div style={ui.modalBackdrop} role="dialog" aria-modal="true">
          <div style={ui.modalPanel}>
            <div style={{ display: "grid", gap: 10, textAlign: "center" }}>
              <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#0f172a" }}>
                Bekreft identitet med Vipps
              </h2>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#475569" }}>
                Vi bruker Vipps for sikker identitetsverifisering. Du returnerer til skjemaet automatisk etter innlogging.
              </p>
            </div>

            <button
              onClick={handleVippsLogin}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "16px 24px",
                fontSize: 16,
                fontWeight: 600,
                background: "#ff5100",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              <span>Logg inn med Vipps</span>
            </button>

            <button
              onClick={() => setShowVippsModal(false)}
              style={{
                width: "100%",
                padding: 12,
                fontSize: 15,
                fontWeight: 500,
                background: "transparent",
                color: "#64748b",
                border: "1px solid #cbd5e1",
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              Avbryt
            </button>
          </div>
        </div>
      ) : null}

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
              <p style={ui.sectionLead}>Oppgi navn, kontaktinformasjon og bostedsadresse.</p>
            </div>
            <div style={ui.fieldGrid}>
              <Input label="Fullt navn" name="name" required defaultValue={draftValues?.name ?? ""} error={fieldErrors.name} onChange={() => clearFieldError("name")} />
              <Input label="E-post" name="email" type="email" required defaultValue={draftValues?.email ?? ""} error={fieldErrors.email} onChange={() => clearFieldError("email")} />
              <Input label="Telefon" name="phone" required defaultValue={draftValues?.phone ?? ""} error={fieldErrors.phone} onChange={() => clearFieldError("phone")} />
            </div>
            <div style={ui.fieldGrid}>
              <Input 
                label="Gateadresse (valgfritt)" 
                name="street_address" 
                placeholder="Eksempel: Storgata 15"
                defaultValue={(draftValues?.street_address as string) ?? ""} 
                error={fieldErrors.street_address} 
                onChange={() => clearFieldError("street_address")} 
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12 }}>
                <Input 
                  label="Postnummer" 
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
              </div>
            </div>
          </div>

          <div style={ui.divider} />

          <div style={ui.section}>
            <div style={ui.sectionHeader}>
              <h2 style={ui.sectionTitle}>Arbeidsønsker</h2>
              <p style={ui.sectionLead}>Oppgi når du er tilgjengelig, om du er åpen for midlertidige oppdrag, og huk av relevante fagområder.</p>
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
              <div style={{ fontWeight: 700, marginBottom: 8, color: "#0b1f3a" }}>Er du åpen for midlertidige oppdrag?</div>
              <div style={sx.inlineRadios}>
                <label style={sx.radioLabel}>
                  <input type="radio" name="wants_temporary" value="ja" onChange={() => clearFieldError("wants_temporary")} required />
                  Ja
                </label>
                <label style={sx.radioLabel}>
                  <input type="radio" name="wants_temporary" value="nei" onChange={() => clearFieldError("wants_temporary")} />
                  Nei
                </label>
              </div>
              {fieldErrors.wants_temporary ? (
                <div style={sx.errText} role="alert">{fieldErrors.wants_temporary}</div>
              ) : null}
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 700, marginBottom: 12, color: "#0b1f3a", fontSize: 16 }}>Ønsket arbeid</div>
              <p style={{ fontSize: 14, color: "#64748b", marginBottom: 12 }}>Huk av relevante fagområder. Åpne flere kategorier ved behov.</p>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {workEntries.map(([main, subs]) => {
                const open = !!openMain[main];
                return (
                  <div key={main} style={ui.workPanel}>
                    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                      <input type="checkbox" checked={open} onChange={() => toggleMain(main)} />
                      <span style={{ fontWeight: 700, color: "#0b1f3a" }}>{main}</span>
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
                                    onChange={(e) => setOtherText((prev) => ({ ...prev, [main]: e.target.value }))}
                                    style={sx.input}
                                  />
                                </label>
                              </div>
                            ) : (
                              <label key={sub} style={sx.tagItem}>
                                <input type="checkbox" name="work_main" value={`${main}:${sub}`} onChange={() => clearFieldError("work_main")} />
                                <span>{sub}</span>
                              </label>
                            )
                          )}
                        </div>
                        <small style={{ color: "#64748b" }}>Fyll inn «Annet» dersom spesifikke stillinger mangler</small>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
            {fieldErrors.work_main ? <div style={sx.errText} role="alert">{fieldErrors.work_main}</div> : null}
          </div>

          <div style={ui.divider} />

          <div style={ui.section}>
            <div style={ui.sectionHeader}>
              <h2 style={ui.sectionTitle}>Kompetanse og erfaring</h2>
              <p style={ui.sectionLead}>Beskriv relevant erfaring, sertifikater og spesialkompetanse.</p>
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
              <h2 style={ui.sectionTitle}>STCW og sikkerhetsopplæring</h2>
              <p style={ui.sectionLead}>STCW grunnkurs er påkrevd for arbeid til sjøs.</p>
            </div>
            
            <div>
              <div style={{ fontWeight: 700, marginBottom: 8, color: "#0b1f3a" }}>Har du STCW grunnleggende sikkerhetskurs?</div>
              <div style={sx.inlineRadios}>
                <label style={sx.radioLabel}>
                  <input type="radio" name="stcw_has" value="ja" onChange={() => clearFieldError("stcw_has")} required />
                  Ja
                </label>
                <label style={sx.radioLabel}>
                  <input type="radio" name="stcw_has" value="nei" onChange={() => clearFieldError("stcw_has")} />
                  Nei
                </label>
              </div>
              {fieldErrors.stcw_has ? (
                <div style={sx.errText} role="alert">{fieldErrors.stcw_has}</div>
              ) : null}
            </div>
          </div>

          <div style={ui.divider} />

          <div style={ui.section}>
            <div style={ui.sectionHeader}>
              <h2 style={ui.sectionTitle}>Dokumenter og samtykke</h2>
              <p style={ui.sectionLead}>Last opp CV og eventuelle sertifikater. Vi sender deg bekreftelse på e-post.</p>
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
                label="Søknadsbrev (PDF, valgfritt)" 
                name="cover_letter" 
                accept=".pdf" 
                error={fileErrors.certs} 
                onChange={() => clearFileError("certs")} 
              />
              <FileInput 
                label="Sertifikater (PDF/ZIP, valgfritt)" 
                name="certs" 
                accept=".pdf,.zip" 
                error={fileErrors.certs} 
                onChange={() => clearFileError("certs")} 
              />
            </div>

            <div style={ui.consentBox}>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14.5, color: "#0b1f3a", cursor: "pointer" }}>
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
                  Jeg bekrefter at jeg har eller vil skaffe <strong>STCW grunnleggende sikkerhetskurs</strong> og
                  <strong> gyldig helseattest</strong> før oppdrag.
                </span>
              </label>
              {fieldErrors.stcw_confirm ? <div style={sx.errText} role="alert">{fieldErrors.stcw_confirm}</div> : null}

              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14.5, color: "#0b1f3a", cursor: "pointer" }}>
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
                  Jeg samtykker til at Bluecrew AS lagrer og behandler personopplysninger, CV og sertifikater for å
                  matche meg mot oppdrag. Data lagres i <strong>12–24 måneder</strong>. {""}
                  <Link href="/personvern" style={{ color: "#0369a1", textDecoration: "underline", fontWeight: 600 }}>
                    Les personvernerklæringen
                  </Link>
                  .
                </span>
              </label>
              {fieldErrors.gdpr ? <div style={sx.errText} role="alert">{fieldErrors.gdpr}</div> : null}
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
              Vi tar kontakt når profilen er verifisert. Spørsmål? Ring <strong>923 28 850</strong>.
            </div>
          </div>
        </form>
    </div>
  );
}
