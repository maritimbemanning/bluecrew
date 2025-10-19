"use client";

import { FormEvent, useCallback, useMemo, useState } from "react";
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
    if (certs && typeof certs !== "string" && certs.size > 10 * 1024 * 1024) {
      nextFileErrors.certs = "Sertifikater kan maks være 10 MB";
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
      <div style={sx.ok} role="status">
        Takk! Søknaden er mottatt. Vi tar kontakt når vi har et oppdrag som matcher profilen din.
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
          clearFieldError("municipility");
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
        label="Sertifikater (PDF/zip, valgfritt)"
        name="certs"
        accept=".pdf,.zip"
        error={fileErrors.certs}
        onChange={() => clearFileError("certs")}
      />

      <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 8 }}>
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
        <label htmlFor="gdpr" style={{ fontSize: 13, color: "#475569", cursor: "pointer" }}>
          Jeg samtykker til behandling av persondata for bemanning/rekruttering.
        </label>
        {fieldErrors.gdpr ? (
          <div id="gdpr-err" style={sx.errText} role="alert">
            {fieldErrors.gdpr}
          </div>
        ) : null}
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
