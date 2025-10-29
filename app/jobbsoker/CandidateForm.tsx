"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FileInput, Input, Select, Textarea } from "../components/FormControls";
import { WORK, STCW_MODULES, COUNTIES, MUNICIPALITIES_BY_COUNTY } from "../lib/constants";
import { sx } from "../lib/styles";
import { candidateSchema, extractCandidateForm } from "../lib/validation";

type FieldErrors = Record<string, string>;

type FileErrors = {
  cv?: string;
  certs?: string;
};

const ui = {
  wrap: {
    display: "grid",
    gap: 28,
    maxWidth: 1120,
    margin: "0 auto",
    padding: "0 clamp(18px, 6vw, 26px) 64px",
  },
  hero: {
    background:
      "radial-gradient(circle at 12% -10%, rgba(56,189,248,0.45), transparent 55%), radial-gradient(circle at 82% -12%, rgba(14,165,233,0.38), transparent 60%), linear-gradient(155deg, #051427 0%, #0a1d39 55%, #0f2648 100%)",
    borderRadius: 30,
    padding: "36px clamp(22px, 6vw, 44px)",
    color: "#e2e8f0",
    boxShadow: "0 32px 80px rgba(5, 17, 34, 0.55)",
    position: "relative",
    overflow: "hidden",
  },
  heroTitle: {
    fontSize: "clamp(30px, 5.6vw, 40px)",
    fontWeight: 900,
    letterSpacing: "-0.02em",
    margin: 0,
  },
  heroLead: {
    marginTop: 14,
    maxWidth: 700,
    fontSize: 18,
    lineHeight: 1.7,
    color: "rgba(226, 232, 240, 0.86)",
  },
  heroBadges: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 18,
  },
  heroBadge: {
    padding: "9px 16px",
    borderRadius: 999,
    border: "1px solid rgba(148,197,255,0.35)",
    background: "rgba(15, 23, 42, 0.55)",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    color: "#bae6fd",
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 18,
    marginTop: 26,
  },
  heroCard: {
    background: "rgba(7, 18, 34, 0.7)",
    border: "1px solid rgba(148, 197, 255, 0.32)",
    borderRadius: 20,
    padding: 18,
    display: "grid",
    gap: 6,
  },
  heroCardLabel: {
    fontSize: 12,
    letterSpacing: ".1em",
    textTransform: "uppercase",
    color: "rgba(226, 232, 240, 0.65)",
  },
  heroCardValue: {
    fontSize: 18,
    fontWeight: 700,
    color: "#f8fafc",
  },
  layout: {
    display: "grid",
    gap: 28,
    gridTemplateColumns: "1fr",
  },
  layoutWide: {
    gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
    alignItems: "start",
  },
  formShell: {
    background: "#ffffff",
    borderRadius: 28,
    padding: "32px clamp(20px, 6vw, 38px)",
    border: "1px solid #dbe4f3",
    boxShadow: "0 30px 80px rgba(15, 23, 42, 0.12)",
    display: "grid",
    gap: 28,
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
} satisfies Record<string, CSSProperties>;

export default function CandidateContent() {
  const searchParams = useSearchParams();
  const submitted = searchParams.get("sent") === "worker";

  const [isWide, setIsWide] = useState<boolean>(() => {
    return typeof window !== "undefined" ? window.innerWidth >= 960 : false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setIsWide(window.innerWidth >= 960);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!submitted || typeof window === "undefined") return;
    const plausible = (window as typeof window & {
      plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
    }).plausible;
    if (typeof plausible === "function") {
      plausible("Lead Submitted", { props: { form: "candidate" } });
    }
  }, [submitted]);

  const [county, setCounty] = useState("");
  const [municipality, setMunicipality] = useState("");
  const municipalityOptions = useMemo(
    () => (county ? MUNICIPALITIES_BY_COUNTY[county] ?? [] : []),
    [county]
  );

  const workEntries = useMemo(() => Object.entries(WORK), []);
  const [openMain, setOpenMain] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const key of Object.keys(WORK)) init[key] = false;
    return init;
  });
  const [otherText, setOtherText] = useState<Record<string, string>>({});

  const [hasSTCW, setHasSTCW] = useState<"ja" | "nei" | "">("");
  const [hasDeck, setHasDeck] = useState<"ja" | "nei" | "">("");
  const [deckClass, setDeckClass] = useState("");

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

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const { values } = extractCandidateForm(formData);
    const parsed = candidateSchema.safeParse(values);

    const nextErrors: FieldErrors = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !nextErrors[key]) {
          nextErrors[key] = issue.message;
        }
      }
    }

    // Honeypot
    if (values.honey) {
      event.preventDefault();
      setFieldErrors({});
      setFormError(null);
      return;
    }

    if (Object.keys(nextErrors).length > 0) {
      event.preventDefault();
      setFieldErrors(nextErrors);
      setFormError("Kontroller feltene markert i rødt.");
      setIsSubmitting(false);
      return;
    }

    setFieldErrors({});
    setFormError(null);
    setIsSubmitting(true);
    // Let the browser submit to /api/submit-candidate
  }, []);

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

  const layoutStyle = isWide ? { ...ui.layout, ...ui.layoutWide } : ui.layout;

  return (
    <div style={ui.wrap}>
      <section style={ui.hero}>
        <h1 style={ui.heroTitle}>Registrer deg for maritime oppdrag</h1>
        <p style={ui.heroLead}>
          Vi samarbeider med rederier innen havbruk, service og offshore. Legg inn detaljene dine, så matcher vi deg med
          oppdrag som passer kompetansen din.
        </p>
        <div style={ui.heroBadges}>
          <span style={ui.heroBadge}>Personlig oppfølging</span>
          <span style={ui.heroBadge}>Oppdrag i hele Norge</span>
          <span style={ui.heroBadge}>Krav til STCW og helseattest</span>
        </div>
        <div style={ui.heroGrid}>
          <div style={ui.heroCard}>
            <span style={ui.heroCardLabel}>Aktive oppdrag</span>
            <span style={ui.heroCardValue}>Havbruk, servicebåt, fiskeri og offshore</span>
          </div>
          <div style={ui.heroCard}>
            <span style={ui.heroCardLabel}>Tilgjengelighet</span>
            <span style={ui.heroCardValue}>Team på vakt 07–22 · respons innen 24–48 timer</span>
          </div>
          <div style={ui.heroCard}>
            <span style={ui.heroCardLabel}>Dekning</span>
            <span style={ui.heroCardValue}>Base i Nord-Norge – dekker hele landet</span>
          </div>
        </div>
      </section>

      <div style={layoutStyle}>
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

          <div style={ui.section}>
            <div style={ui.sectionHeader}>
              <h2 style={ui.sectionTitle}>Kontaktinformasjon</h2>
              <p style={ui.sectionLead}>Vi bruker denne informasjonen til å kontakte deg om relevante oppdrag.</p>
            </div>
            <div style={ui.fieldGrid}>
              <Input label="Fullt navn" name="name" required error={fieldErrors.name} onChange={() => clearFieldError("name")} />
              <Input label="E-post" name="email" type="email" required error={fieldErrors.email} onChange={() => clearFieldError("email")} />
              <Input label="Telefon" name="phone" required error={fieldErrors.phone} onChange={() => clearFieldError("phone")} />
              <Input label="Tilgjengelig fra" name="available_from" type="date" error={fieldErrors.available_from} onBlur={() => clearFieldError("available_from")} />
            </div>
          </div>

          <div style={ui.divider} />

          <div style={ui.section}>
            <div style={ui.sectionHeader}>
              <h2 style={ui.sectionTitle}>Bosted og arbeidsønsker</h2>
              <p style={ui.sectionLead}>Oppgi primær lokasjon. Vi vurderer reise og turnus etter behov.</p>
            </div>
            <div style={ui.fieldGrid}>
              <Select
                label="Fylke"
                name="county"
                options={COUNTIES}
                value={county}
                onChange={(value) => {
                  setCounty(value);
                  clearFieldError("county");
                  if (!value) {
                    setMunicipality("");
                  } else if (!(MUNICIPALITIES_BY_COUNTY[value] || []).includes(municipality)) {
                    setMunicipality("");
                  }
                }}
                placeholder="Velg fylke"
                required
                error={fieldErrors.county}
                onBlur={() => clearFieldError("county")}
              />

              <Select
                label="Kommune/by"
                name="municipality"
                options={municipalityOptions}
                value={municipality}
                onChange={(value) => {
                  setMunicipality(value);
                  clearFieldError("municipality");
                }}
                placeholder={county ? "Velg kommune" : "Velg fylke først"}
                disabled={!county}
                required={!!county}
                error={fieldErrors.municipality}
                onBlur={() => clearFieldError("municipality")}
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
          </div>

          <div style={ui.divider} />

          <div style={ui.section}>
            <div style={ui.sectionHeader}>
              <h2 style={ui.sectionTitle}>Ønsket arbeid</h2>
              <p style={ui.sectionLead}>Huk av relevante fagområder. Åpne flere kategorier ved behov.</p>
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
              <h2 style={ui.sectionTitle}>Kompetanse og sertifikater</h2>
              <p style={ui.sectionLead}>Oppgi status på STCW og eventuelt dekksoffiser-sertifikat.</p>
            </div>

            <div style={ui.fieldGrid}>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 6, color: "#0b1f3a" }}>STCW – Grunnleggende sikkerhetskurs</div>
                <div style={sx.inlineRadios}>
                  <label style={sx.radioLabel}>
                    <input
                      type="radio"
                      name="stcw_has"
                      value="ja"
                      required
                      onChange={() => {
                        setHasSTCW("ja");
                        clearFieldError("stcw_has");
                      }}
                    />
                    Ja
                  </label>
                  <label style={sx.radioLabel}>
                    <input
                      type="radio"
                      name="stcw_has"
                      value="nei"
                      onChange={() => {
                        setHasSTCW("nei");
                        clearFieldError("stcw_has");
                      }}
                    />
                    Nei
                  </label>
                </div>
                {fieldErrors.stcw_has ? <div style={sx.errText} role="alert">{fieldErrors.stcw_has}</div> : null}

                {hasSTCW === "ja" ? (
                  <div style={{ marginTop: 10 }}>
                    <div style={{ fontSize: 13, color: "#475569", marginBottom: 6 }}>Huk av relevante moduler</div>
                    <div style={sx.checkGrid}>
                      {STCW_MODULES.map((m) => (
                        <label key={m} style={sx.checkItem}>
                          <input type="checkbox" name="stcw_mod" value={m} onChange={() => clearFieldError("stcw_mod")} />
                          <span>{m}</span>
                        </label>
                      ))}
                    </div>
                    {fieldErrors.stcw_mod ? <div style={sx.errText} role="alert">{fieldErrors.stcw_mod}</div> : null}
                  </div>
                ) : null}
              </div>

              <div>
                <div style={{ fontWeight: 700, marginBottom: 6, color: "#0b1f3a" }}>Dekksoffiser-sertifikat</div>
                <div style={sx.inlineRadios}>
                  <label style={sx.radioLabel}>
                    <input
                      type="radio"
                      name="deck_has"
                      value="ja"
                      required
                      onChange={() => {
                        setHasDeck("ja");
                        clearFieldError("deck_has");
                      }}
                    />
                    Ja
                  </label>
                  <label style={sx.radioLabel}>
                    <input
                      type="radio"
                      name="deck_has"
                      value="nei"
                      onChange={() => {
                        setHasDeck("nei");
                        setDeckClass("");
                        clearFieldError("deck_has");
                      }}
                    />
                    Nei
                  </label>
                </div>
                {fieldErrors.deck_has ? <div style={sx.errText} role="alert">{fieldErrors.deck_has}</div> : null}

                {hasDeck === "ja" ? (
                  <div style={{ marginTop: 10 }}>
                    <Select
                      label="Klasse"
                      name="deck_class"
                      options={["1", "2", "3", "4", "5", "6"]}
                      value={deckClass}
                      onChange={(value) => {
                        setDeckClass(value);
                        clearFieldError("deck_class");
                      }}
                      placeholder="Velg klasse (1–6)"
                      error={fieldErrors.deck_class}
                      onBlur={() => clearFieldError("deck_class")}
                    />
                    <small style={{ color: "#475569" }}>1 = høyeste, 6 = laveste (D6).</small>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div style={ui.divider} />

          <div style={ui.section}>
            <div style={ui.sectionHeader}>
              <h2 style={ui.sectionTitle}>Kompetansebeskrivelse</h2>
              <p style={ui.sectionLead}>Fortell kort om erfaringene dine, samt relevante sertifikater og språk.</p>
            </div>
            <Textarea
              label="Kompetanse og erfaring (kort)"
              name="skills"
              rows={5}
              full
              description="F.eks. fartøytyper, sertifikater, kurs, språk, turnuser."
              error={fieldErrors.skills}
              onBlur={() => clearFieldError("skills")}
            />
            <Textarea
              label="Er det noe annet vi bør vite? (valgfritt)"
              name="other_comp"
              rows={3}
              full
              description="Skriv gjerne om preferanser, tilgjengelighet eller andre notater."
              error={fieldErrors.other_comp}
              onBlur={() => clearFieldError("other_comp")}
            />
          </div>

          <div style={ui.divider} />

          <div style={ui.section}>
            <div style={ui.sectionHeader}>
              <h2 style={ui.sectionTitle}>Dokumenter og samtykke</h2>
              <p style={ui.sectionLead}>Last opp CV og eventuelle sertifikater. Vi sender deg bekreftelse på e-post.</p>
            </div>

            <div style={ui.filesGrid}>
              <FileInput label="CV (PDF, maks 10 MB)" name="cv" accept=".pdf" required error={fileErrors.cv} onChange={() => clearFileError("cv")} />
              <FileInput label="Sertifikater (PDF/ZIP/DOC/DOCX)" name="certs" accept=".pdf,.zip,.doc,.docx" error={fileErrors.certs} onChange={() => clearFileError("certs")} />
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

        <aside style={ui.sidebar}>
          <h3 style={ui.sidebarTitle}>Slik fungerer prosessen</h3>
          <ul style={ui.sidebarList}>
            <li>Vi verifiserer CV, sertifikater og referanser før du settes aktiv.</li>
            <li>Du får oppdragstilbud som matcher kompetanse, turnus og tilgjengelighet.</li>
            <li>Ved akutte behov koordinerer vi reise og innkvartering for deg.</li>
          </ul>
          <div style={ui.sidebarFooter}>
            Hold CV og medisinske attester oppdatert. Spørsmål? Kontakt <strong>isak@bluecrew.no</strong> eller ring
            <strong> 923 28 850</strong>.
          </div>
        </aside>
      </div>
    </div>
  );
}
