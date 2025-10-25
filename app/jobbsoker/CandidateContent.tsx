"use client";

import Link from "next/link";
import { FormEvent, useCallback, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FileInput, Input, Select, Textarea } from "../components/FormControls";
import { WORK, STCW_MODULES, COUNTIES, MUNICIPALITIES_BY_COUNTY } from "../lib/constants";
import { sx } from "../lib/styles";
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
      <div style={{ ...sx.ok, maxWidth: 620, margin: "0 auto" }} role="status">
        <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 12, color: "#0f172a" }}>✓ Søknaden er mottatt!</div>
        <p style={{ marginBottom: 16, lineHeight: 1.7, color: "#334155" }}>
          Takk for at du registrerte deg. Vi går gjennom profilen din og tar kontakt når vi har et oppdrag som matcher din kompetanse og tilgjengelighet.
        </p>
        <div style={{ background: "rgba(148, 197, 255, 0.1)", borderRadius: 10, padding: 14, border: "1px solid rgba(148, 197, 255, 0.3)" }}>
          <strong style={{ display: "block", marginBottom: 6, color: "#0f172a" }}>Hva skjer nå?</strong>
          <ul style={{ margin: 0, paddingLeft: 20, color: "#475569", fontSize: 14, lineHeight: 1.8 }}>
            <li>Vi verifiserer dokumentasjonen din (normalt innen 24–48 timer)</li>
            <li>Du får beskjed når vi har et oppdrag som passer</li>
            <li>Vi tar kontakt på e-post eller telefon når en mulighet dukker opp</li>
          </ul>
        </div>
        <p style={{ marginTop: 16, fontSize: 14, color: "#64748b" }}>
          Spørsmål? Ring oss på <strong>923 28 850</strong> eller send e-post til <strong>isak@bluecrew.no</strong>.
        </p>
      </div>
    );
  }

  return (
    <form
      action="/api/submit-candidate"
      method="POST"
      encType="multipart/form-data"
      style={sx.form}
      noValidate
      onSubmit={handleSubmit}
    >
      {formError ? (
        <div style={sx.formError} role="alert">
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

      <div style={{ gridColumn: "1 / -1" }}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Ønsket arbeid</div>
        <div style={{ display: "grid", gap: 12 }}>
          {workEntries.map(([main, subs]) => {
            const open = !!openMain[main];
            return (
              <div
                key={main}
                style={{ border: "1px solid #E2E8F0", borderRadius: 12, padding: 12, background: "#fff" }}
              >
                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                  <input type="checkbox" checked={open} onChange={() => toggleMain(main)} />
                  <span style={{ fontWeight: 700 }}>{main}</span>
                </label>
               {open && (
  <div style={{ marginTop: 10 }}>
    <div style={sx.tags}>
      {subs.map((sub) =>
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
      Velg undervalg (eller fyll «Annet». Du kan åpne flere hovedkategorier.)
    </small>
    {fieldErrors.work_main ? (
      <div style={sx.errText} role="alert">
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

      <div style={{ gridColumn: "1 / -1" }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Er du åpen for midlertidige oppdrag?</div>
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

      <div style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>STCW – Grunnleggende sikkerhetskurs</div>
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
          {fieldErrors.stcw_has ? (
            <div style={sx.errText} role="alert">
              {fieldErrors.stcw_has}
            </div>
          ) : null}
          {hasSTCW === "ja" && (
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 13, color: "#475569", marginBottom: 6 }}>Huk av relevante moduler</div>
              <div style={sx.checkGrid}>
                {STCW_MODULES.map((m) => (
                  <label key={m} style={sx.checkItem}>
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
                <div style={sx.errText} role="alert">
                  {fieldErrors.stcw_mod}
                </div>
              ) : null}
            </div>
          )}
        </div>

        <div>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Dekksoffiser-sertifikat</div>
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
                  clearFieldError("deck_has");
                  setDeckClass("");
                }}
              />
              Nei
            </label>
          </div>
          {fieldErrors.deck_has ? (
            <div style={sx.errText} role="alert">
              {fieldErrors.deck_has}
            </div>
          ) : null}
          {hasDeck === "ja" && (
            <div style={{ marginTop: 8 }}>
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
        label="Er det noe annet vi bør vite? (valgfritt)"
        name="other_comp"
        rows={3}
        full
        description="F.eks. språk, preferanser, begrensninger i tilgjengelighet."
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

      <div style={{ gridColumn: "1 / -1", background: "rgba(148, 197, 255, 0.08)", borderRadius: 12, padding: 16, border: "1px solid rgba(148, 197, 255, 0.2)" }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10, color: "#0f172a" }}>
          Bekreftelse og samtykke
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <label style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14, color: "#334155", cursor: "pointer" }}>
            <input
              type="checkbox"
              id="stcw_confirm"
              name="stcw_confirm"
              required
              aria-invalid={!!fieldErrors.stcw_confirm}
              onChange={() => clearFieldError("stcw_confirm")}
              style={{ marginTop: 2, flexShrink: 0 }}
            />
            <span>
              Jeg bekrefter at jeg har eller vil skaffe <strong>STCW grunnleggende sikkerhetskurs</strong> og <strong>gyldig helseattest</strong> før oppdragsstart (påkrevd for alle maritime stillinger).
            </span>
          </label>
          {fieldErrors.stcw_confirm ? (
            <div style={sx.errText} role="alert">
              {fieldErrors.stcw_confirm}
            </div>
          ) : null}

          <label style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14, color: "#334155", cursor: "pointer" }}>
            <input
              id="gdpr"
              type="checkbox"
              name="gdpr"
              value="yes"
              required
              aria-invalid={!!fieldErrors.gdpr}
              onChange={() => clearFieldError("gdpr")}
              style={{ marginTop: 2, flexShrink: 0 }}
            />
            <span>
              Jeg samtykker til at Bluecrew AS lagrer og behandler mine personopplysninger, CV og sertifikater for å matche meg mot bemanningsoppdrag. Data lagres i <strong>12–24 måneder</strong>. {" "}
              <Link href="/personvern" style={{ color: "#0f172a", textDecoration: "underline", fontWeight: 600 }}>
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

      {/* Honeypot: NB! navnet må matche values.honey */}
      <div aria-hidden="true" style={sx.honeypot}>
        <label>
          <span>Dette feltet skal stå tomt</span>
          <input name="honey" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div style={{ gridColumn: "1 / -1" }}>
        <button
          type="submit"
          style={{
            ...sx.btnMain,
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? "wait" : sx.btnMain.cursor,
          }}
          disabled={isSubmitting}
        >
          Send inn jobbsøkerprofil
        </button>
      </div>
    </form>
  );
}
