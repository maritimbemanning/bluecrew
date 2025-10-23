"use client";

import Link from "next/link";
import { FormEvent, useCallback, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FileInput, Input, Select, Textarea } from "../components/FormControls";
import { WORK, STCW_MODULES, COUNTIES, MUNICIPALITIES_BY_COUNTY } from "../lib/constants";
import styles from "./candidate-content.module.css";
import { candidateSchema, extractCandidateForm } from "../lib/validation";

type FieldErrors = Record<string, string>;

function createInitialOpen() {
  const initial: Record<string, boolean> = {};
  Object.keys(WORK).forEach((key) => {
    initial[key] = false;
  });
  return initial;
}

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

  const [openMain, setOpenMain] = useState<Record<string, boolean>>(() => createInitialOpen());
  const [otherText, setOtherText] = useState<Record<string, string>>({});
  const [hasSTCW, setHasSTCW] = useState<"" | "ja" | "nei">("");
  const [hasDeck, setHasDeck] = useState<"" | "ja" | "nei">("");
  const [deckClass, setDeckClass] = useState("");
  const [county, setCounty] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [fileErrors, setFileErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const workEntries = useMemo(() => Object.entries(WORK), []);
  const municipalityOptions = useMemo(
    () => (county ? MUNICIPALITIES_BY_COUNTY[county] ?? [] : []),
    [county],
  );

  const toggleMain = useCallback((main: string) => {
    setOpenMain((prev) => ({ ...prev, [main]: !prev[main] }));
  }, []);

  const clearFieldError = useCallback((name: string) => {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
    setFormError(null);
  }, []);

  const clearFileError = useCallback((name: string) => {
    setFileErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
    setFormError(null);
  }, []);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);

    const { values, files } = extractCandidateForm(formData);
    const parsed = candidateSchema.safeParse(values);

    const nextFieldErrors: FieldErrors = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !nextFieldErrors[key]) {
          nextFieldErrors[key] = issue.message;
        }
      }
    }

    const nextFileErrors: FieldErrors = {};
    const cv = files.cv;
    if (!cv || typeof cv === "string" || cv.size === 0) {
      nextFileErrors.cv = "Last opp CV (PDF)";
    } else {
      const lower = (cv.name || "").toLowerCase();
      if (!lower.endsWith(".pdf")) {
        nextFileErrors.cv = "CV må være PDF";
      } else if (cv.size > 10 * 1024 * 1024) {
        nextFileErrors.cv = "CV kan maks være 10 MB";
      }
    }

    const certs = files.certs;
    if (certs && typeof certs !== "string") {
      if (certs.size > 10 * 1024 * 1024) {
        nextFileErrors.certs = "Sertifikater kan maks være 10 MB";
      } else {
        const lower = (certs.name || "").toLowerCase();
        const allowed = [".pdf", ".zip", ".doc", ".docx"];
        if (!allowed.some((ext) => lower.endsWith(ext))) {
          nextFileErrors.certs = "Vedlegg må være PDF, ZIP eller DOC/DOCX";
        }
      }
    }

    // Honeypot (må matche feltnavnet i skjemaet, se note under)
    if (values.honey) {
      event.preventDefault();
      setFieldErrors({});
      setFileErrors({});
      setFormError(null);
      return;
    }

    const hasErrors =
      Object.keys(nextFieldErrors).length > 0 || Object.keys(nextFileErrors).length > 0;

    if (hasErrors) {
      event.preventDefault();
      setFieldErrors(nextFieldErrors);
      setFileErrors(nextFileErrors);
      setFormError("Kontroller feltene markert i rødt.");
      setIsSubmitting(false);
      return;
    }

    // La browseren sende form til /api/submit-candidate (ingen preventDefault).
    setFieldErrors({});
    setFileErrors({});
    setFormError(null);
    setIsSubmitting(true);
  }, []);

  if (submitted) {
    return (
      <div className={styles.success} role="status">
        Takk! Søknaden er mottatt. Vi tar kontakt når vi har et oppdrag som matcher profilen din.
      </div>
    );
  }

  return (
    <form
      action="/api/submit-candidate"
      method="POST"
      encType="multipart/form-data"
      className={styles.formWrapper}
      noValidate
      onSubmit={handleSubmit}
    >
      {formError ? (
        <div className={styles.formError} role="alert">
          {formError}
        </div>
      ) : null}

      <Input
        label="Fullt navn"
        name="name"
        required
        error={fieldErrors.name}
        onChange={() => clearFieldError("name")}
      />
      <Input
        label="E-post"
        name="email"
        type="email"
        required
        error={fieldErrors.email}
        onChange={() => clearFieldError("email")}
      />
      <Input
        label="Telefon"
        name="phone"
        required
        error={fieldErrors.phone}
        onChange={() => clearFieldError("phone")}
      />
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
        label="Kommune"
        name="municipality"
        options={municipalityOptions}
        value={municipality}
        onChange={(value) => {
          setMunicipality(value);
          clearFieldError("municipality");
        }}
        placeholder={county ? "Velg kommune" : "Velg fylke først"}
        disabled={!county}
        required
        error={fieldErrors.municipality}
        onBlur={() => clearFieldError("municipality")}
      />

      <div className={styles.sectionGroup}>
        <div className={styles.sectionHeader}>Ønsket arbeid</div>
        <div className={styles.workWrapper}>
          {workEntries.map(([main, subs]) => {
            const open = !!openMain[main];
            return (
              <div key={main} className={styles.workPanel}>
                <label className={styles.workToggle}>
                  <input type="checkbox" checked={open} onChange={() => toggleMain(main)} />
                  <span>{main}</span>
                </label>
                {open && (
                  <div className={styles.workDetails}>
                    <div className={styles.tagGrid}>
                      {subs.map((sub) =>
                        sub === "Annet" ? (
                          <div key={sub} className={styles.otherField}>
                            <label className={styles.otherLabel}>
                              <span>Annet (kort beskrivelse)</span>
                              <input
                                name={`other_${main}`}
                                placeholder="Skriv kort om ønsket arbeid"
                                value={otherText[main] || ""}
                                onChange={(e) =>
                                  setOtherText((prev) => ({ ...prev, [main]: e.target.value }))
                                }
                                className={styles.otherInput}
                              />
                            </label>
                          </div>
                        ) : (
                          <label key={sub} className={styles.tagItem}>
                            <input
                              type="checkbox"
                              name="work_main"
                              value={`${main}:${sub}`}
                              onChange={() => clearFieldError("work_main")}
                            />
                            <span>{sub}</span>
                          </label>
                        ),
                      )}
                    </div>
                    <small className={styles.supportText}>
                      Velg undervalg (eller fyll «Annet». Du kan åpne flere hovedkategorier.)
                    </small>
                    {fieldErrors.work_main ? (
                      <div className={styles.errorMessage} role="alert">
                        {fieldErrors.work_main}
                      </div>
                    ) : null}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.sectionGroup}>
        <div className={styles.fieldTitle}>Er du åpen for midlertidige oppdrag?</div>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="wants_temporary"
              value="ja"
              onChange={() => clearFieldError("wants_temporary")}
              required
            />
            Ja
          </label>
          <label className={styles.radioLabel}>
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
          <div className={styles.errorMessage} role="alert">
            {fieldErrors.wants_temporary}
          </div>
        ) : null}
      </div>

      <div className={`${styles.sectionGroup} ${styles.twoColumn}`}>
        <div>
          <div className={styles.fieldTitle}>STCW – Grunnleggende sikkerhetskurs</div>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
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
            <label className={styles.radioLabel}>
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
          {fieldErrors.stcw_has ? (
            <div className={styles.errorMessage} role="alert">
              {fieldErrors.stcw_has}
            </div>
          ) : null}
          {hasSTCW === "ja" && (
            <div className={styles.subSection}>
              <div className={styles.fieldSubtitle}>Huk av relevante moduler</div>
              <div className={styles.checkGrid}>
                {STCW_MODULES.map((m) => (
                  <label key={m} className={styles.checkItem}>
                    <input
                      type="checkbox"
                      name="stcw_mod"
                      value={m}
                      onChange={() => clearFieldError("stcw_mod")}
                    />
                    <span>{m}</span>
                  </label>
                ))}
              </div>
              {fieldErrors.stcw_mod ? (
                <div className={styles.errorMessage} role="alert">
                  {fieldErrors.stcw_mod}
                </div>
              ) : null}
            </div>
          )}
        </div>

        <div>
          <div className={styles.fieldTitle}>Dekksoffiser-sertifikat</div>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
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
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="deck_has"
                value="nei"
                onChange={() => {
                  setHasDeck("nei");
                  clearFieldError("deck_has");
                  setDeckClass("");
                }}
              />
              Nei
            </label>
          </div>
          {fieldErrors.deck_has ? (
            <div className={styles.errorMessage} role="alert">
              {fieldErrors.deck_has}
            </div>
          ) : null}
          {hasDeck === "ja" && (
            <div className={styles.subSection}>
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
              <small className={styles.supportText}>1 = høyeste, 6 = laveste (D6).</small>
            </div>
          )}
        </div>
      </div>

      <Input
        label="Tilgjengelig fra"
        name="available_from"
        type="date"
        error={fieldErrors.available_from}
        onBlur={() => clearFieldError("available_from")}
      />
      <Textarea
        label="Kompetanse og erfaring (kort)"
        name="skills"
        rows={4}
        full
        description="Skriv kort om erfaring, sertifikater og kurs du ønsker å fremheve."
        error={fieldErrors.skills}
        onBlur={() => clearFieldError("skills")}
      />
      <Textarea
        label="Andre kommentarer (valgfritt)"
        name="other_comp"
        rows={4}
        full
        description="Legg til annen informasjon vi bør vite om tilgjengelighet, språk eller preferanser."
        error={fieldErrors.other_comp}
        onBlur={() => clearFieldError("other_comp")}
      />

      <FileInput
        label="CV (PDF, maks 10 MB)"
        name="cv"
        accept=".pdf"
        required
        error={fileErrors.cv}
        onChange={() => clearFileError("cv")}
      />
      <FileInput
        label="Sertifikater (PDF/ZIP/DOC/DOCX, valgfritt)"
        name="certs"
        accept=".pdf,.zip,.doc,.docx"
        error={fileErrors.certs}
        onChange={() => clearFileError("certs")}
      />

      <div className={styles.gdprRow}>
        <input
          id="gdpr"
          type="checkbox"
          name="gdpr"
          value="yes"
          required
          aria-invalid={!!fieldErrors.gdpr}
          aria-describedby={fieldErrors.gdpr ? "gdpr-err" : undefined}
          onChange={() => clearFieldError("gdpr")}
        />
        <label htmlFor="gdpr" className={styles.gdprLabel}>
          Jeg samtykker til behandling av persondata for bemanning/rekruttering. {" "}
          <Link href="/personvern" className={styles.gdprLink}>
            Les personvernerklæringen
          </Link>
          .
        </label>
        {fieldErrors.gdpr ? (
          <div id="gdpr-err" className={styles.errorMessage} role="alert">
            {fieldErrors.gdpr}
          </div>
        ) : null}
      </div>

      {/* Honeypot: NB! navnet må matche values.honey */}
      <div aria-hidden="true" className={styles.honeypot}>
        <label>
          <span>Dette feltet skal stå tomt</span>
          <input name="honey" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={styles.submitRow}>
        <button
          type="submit"
          className={`cta-button cta-button--primary ${styles.submitButton}`}
          disabled={isSubmitting}
        >
          Send inn jobbsøkerprofil
        </button>
      </div>
    </form>
  );
}
