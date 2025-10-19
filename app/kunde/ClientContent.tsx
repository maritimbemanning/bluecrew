"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Input, Select, Textarea } from "../components/FormControls";
import { WORK, COUNTIES, MUNICIPALITIES_BY_COUNTY } from "../lib/constants";
import { sx } from "../lib/styles";
import { clientSchema, extractClientForm } from "../lib/validation";

type FieldErrors = Record<string, string>;

export default function ClientContent() {
  const [submitted, setSubmitted] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return new URLSearchParams(window.location.search).get("sent") === "client";
  });
  const [county, setCounty] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const params = new URLSearchParams(window.location.search);
    setSubmitted(params.get("sent") === "client");
  }, []);

  const municipalityOptions = useMemo(
    () => (county ? MUNICIPALITIES_BY_COUNTY[county] ?? [] : []),
    [county],
  );

  const clearFieldError = useCallback((name: string) => {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
    setFormError(null);
  }, []);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const values = extractClientForm(formData);
    const parsed = clientSchema.safeParse(values);

    const nextErrors: FieldErrors = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !nextErrors[key]) {
          nextErrors[key] = issue.message;
        }
      }
    }

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
  }, []);

  if (submitted) {
    return (
      <div style={sx.ok} role="status">
        Takk for forespørselen! Vi tar kontakt så snart vi har gjennomgått behovet ditt.
      </div>
    );
  }

  return (
    <form action="/api/submit-client" method="POST" style={sx.form} noValidate onSubmit={handleSubmit}>
      {formError ? (
        <div style={sx.formError} role="alert">
          {formError}
        </div>
      ) : null}

      <Input
        label="Selskap"
        name="company"
        required
        error={fieldErrors.company}
        onChange={() => clearFieldError("company")}
      />
      <Input
        label="Kontaktperson"
        name="contact"
        required
        error={fieldErrors.contact}
        onChange={() => clearFieldError("contact")}
      />
      <Input
        label="E-post"
        name="c_email"
        type="email"
        required
        error={fieldErrors.c_email}
        onChange={() => clearFieldError("c_email")}
      />
      <Input
        label="Telefon"
        name="c_phone"
        required
        error={fieldErrors.c_phone}
        onChange={() => clearFieldError("c_phone")}
      />
      <Select
        label="Fylke"
        name="c_county"
        options={COUNTIES}
        value={county}
        onChange={(value) => {
          setCounty(value);
          clearFieldError("c_county");
          if (!value) {
            setMunicipality("");
          } else if (!(MUNICIPALITIES_BY_COUNTY[value] || []).includes(municipality)) {
            setMunicipality("");
          }
        }}
        placeholder="Velg fylke"
        required
        error={fieldErrors.c_county}
        onBlur={() => clearFieldError("c_county")}
      />
      <Select
        label="Kommune/by"
        name="c_municipality"
        options={municipalityOptions}
        value={municipality}
        onChange={(value) => {
          setMunicipality(value);
          clearFieldError("c_municipality");
        }}
        placeholder={county ? "Velg kommune" : "Velg fylke først"}
        disabled={!county}
        required={!!county}
        error={fieldErrors.c_municipality}
        onBlur={() => clearFieldError("c_municipality")}
      />
      <Select
        label="Type behov"
        name="need_type"
        options={Object.keys(WORK)}
        placeholder="Velg kategori"
        required
        error={fieldErrors.need_type}
        onBlur={() => clearFieldError("need_type")}
        onChange={() => clearFieldError("need_type")}
      />
      <Select
        label="Oppdragstype"
        name="need_duration"
        options={["Langsiktig bemanning", "Midlertidig bemanning", "Usikker / kombinasjon"]}
        placeholder="Velg ønsket varighet"
        required
        error={fieldErrors.need_duration}
        onBlur={() => clearFieldError("need_duration")}
        onChange={() => clearFieldError("need_duration")}
      />
      <Textarea
        label="Kort beskrivelse av oppdraget"
        name="desc"
        rows={4}
        full
        error={fieldErrors.desc}
        onBlur={() => clearFieldError("desc")}
      />

      <div aria-hidden="true" style={sx.honeypot}>
        <label>
          <span>Dette feltet skal stå tomt</span>
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
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
          Send forespørsel
        </button>
      </div>
    </form>
  );
}
