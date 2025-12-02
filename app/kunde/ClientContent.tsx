"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Input, Select, Textarea } from "../components/FormControls";
import { WORK } from "../lib/constants";
import { sx } from "../lib/styles";
import { clientSchema, extractClientForm } from "../lib/validation";
import { useCsrf } from "../lib/hooks/useCsrf";

type FieldErrors = Record<string, string>;

const ui = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "40px clamp(20px, 5vw, 32px) 80px",
  },
  formShell: {
    background: "#ffffff",
    borderRadius: 20,
    padding: "32px clamp(24px, 6vw, 40px)",
    border: "1px solid #e2e8f0",
    boxShadow: "0 10px 40px rgba(15, 23, 42, 0.08)",
    display: "grid",
    gap: 24,
  },
  formHeader: {
    display: "grid",
    gap: 8,
    marginBottom: 8,
  },
  formTitle: {
    margin: 0,
    fontSize: 28,
    fontWeight: 800,
    color: "#0b1f3a",
  },
  formLead: {
    margin: 0,
    fontSize: 16,
    color: "#475569",
    lineHeight: 1.6,
  },
  fieldGrid: {
    display: "grid",
    gap: 16,
  },
  fieldRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 14,
  },
  expandButton: {
    background: "transparent",
    border: "1px solid #cbd5e1",
    borderRadius: 12,
    padding: "12px 20px",
    fontSize: 15,
    fontWeight: 600,
    color: "#0369a1",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  divider: {
    height: 1,
    background:
      "linear-gradient(90deg, transparent, #e2e8f0 10%, #e2e8f0 90%, transparent)",
    margin: "12px 0",
  },
  microCopy: {
    fontSize: 13,
    color: "#64748b",
    lineHeight: 1.7,
    padding: "14px 18px",
    background: "#f8fafc",
    borderRadius: 12,
    border: "1px solid #e2e8f0",
  },
  submitRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    flexWrap: "wrap" as const,
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
} satisfies Record<string, CSSProperties>;

export default function ClientContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const submitted = searchParams.get("sent") === "client";

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
      plausible("Lead Submitted", { props: { form: "client" } });
    }

    const gtag = (
      window as typeof window & {
        gtag?: (...args: unknown[]) => void;
      }
    ).gtag;
    if (typeof gtag === "function") {
      gtag("event", "conversion", {
        send_to: "AW-17715214678/XXXXXX",
        value: 1.0,
        currency: "NOK",
        transaction_id: `client_${Date.now()}`,
      });
    }
  }, [submitted]);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orgLookupLoading, setOrgLookupLoading] = useState(false);
  const [showStep2, setShowStep2] = useState(false);

  // Brønnøysund API lookup
  const lookupOrganization = async (orgnr: string) => {
    const cleanOrgnr = orgnr.replace(/\s/g, "");
    if (!/^\d{9}$/.test(cleanOrgnr)) return;

    setOrgLookupLoading(true);
    try {
      const response = await fetch(
        `https://data.brreg.no/enhetsregisteret/api/enheter/${cleanOrgnr}`
      );
      if (!response.ok) {
        console.error("Org lookup failed: HTTP", response.status);
        return;
      }

      const data = await response.json();

      // Autoutfyll Selskap og Arbeidssted
      const companyField = document.querySelector<HTMLInputElement>(
        'input[name="company"]'
      );
      const workLocationField = document.querySelector<HTMLInputElement>(
        'input[name="work_location"]'
      );

      if (companyField) companyField.value = data.navn || "";
      if (workLocationField) workLocationField.value = data.navn || "";

      // Valgfritt: Fyll ut kontaktinfo hvis tilgjengelig
      if (data.forretningsadresse) {
        const addr = data.forretningsadresse;
        const addressField = document.querySelector<HTMLInputElement>(
          'input[name="address_info"]'
        );
        if (addressField && addr.adresse && addr.poststed) {
          addressField.value = `${addr.adresse}, ${addr.postnummer} ${addr.poststed}`;
        }
      }
    } catch (error) {
      console.error("Org lookup failed:", error);
    } finally {
      setOrgLookupLoading(false);
    }
  };

  const clearFieldError = useCallback((name: string) => {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
    setFormError(null);
  }, []);

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

    // Honeypot check
    if (values.honey) {
      setFieldErrors({});
      setFormError(null);
      return;
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setFormError("Kontroller feltene markert i rødt.");
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setFieldErrors({});
    setFormError(null);
    setIsSubmitting(true);

    // Add CSRF token
    if (csrfToken) {
      formData.append("csrf_token", csrfToken);
    }

    try {
      const response = await fetch("/api/submit-client", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Innsending feilet");
      }

      // Redirect on success
      router.push("/kunde/registrer-behov?sent=client");
    } catch (error) {
      console.error("Submission error:", error);
      setFormError(
        error instanceof Error ? error.message : "Noe gikk galt. Prøv igjen."
      );
      setIsSubmitting(false);
      refreshCsrf();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [csrfToken, refreshCsrf, router]);

  if (submitted) {
    return (
      <div style={ui.successCard} role="status">
        <h2 style={ui.successTitle}>Forespørselen er tatt imot</h2>
        <p style={ui.successBody}>
          Vi setter stor pris på tilliten. Teamet vårt gjør en første vurdering
          med en gang, og holder deg løpende orientert til du har mannskap på
          plass.
        </p>
        <div>
          <strong style={{ color: "#047857" }}>Neste steg:</strong>
          <ul style={ui.successList}>
            <li>Du får en bekreftelse på e-post med kontaktinformasjon</li>
            <li>
              En rådgiver ringer deg normalt{" "}
              <strong>innen 24 timer på dagtid</strong>
            </li>
            <li>
              Akutte saker (&lt;48 timer) prioriteres – ring 923 28 850 ved
              behov
            </li>
          </ul>
        </div>
        <p style={ui.successBody}>
          Har du oppdateringer eller dokumentasjon? Send det direkte til{" "}
          <strong>isak@bluecrew.no</strong> så legger vi det til saken.
        </p>
      </div>
    );
  }

  return (
    <div style={ui.wrap}>
      <form
        noValidate
        onSubmit={handleSubmit}
        style={ui.formShell}
      >
        {formError ? (
          <div style={sx.formError} role="alert">
            {formError}
          </div>
        ) : null}

        <div style={ui.formHeader}>
          <h1 style={ui.formTitle}>Registrer bemanningsbehov</h1>
          <p style={ui.formLead}>
            Vi kontakter deg for avklaring og presenterer kandidater så raskt
            som mulig.
          </p>
        </div>

        {/* STEG 1: Grunnleggende info (1 min) */}
        <div style={ui.fieldGrid}>
          <Input
            label="Selskap"
            name="company"
            required
            error={fieldErrors.company}
            onChange={() => clearFieldError("company")}
            placeholder={orgLookupLoading ? "Henter..." : "Bedriftsnavn"}
          />

          <Input
            label="Autoutfyll med org.nr (valgfritt)"
            name="org_number"
            placeholder="123 456 789"
            error={fieldErrors.org_number}
            onChange={(e) => {
              clearFieldError("org_number");
              const value = e.target.value;
              if (/^\d{9}$/.test(value.replace(/\s/g, ""))) {
                lookupOrganization(value);
              }
            }}
          />

          <div style={ui.fieldRow}>
            <Input
              label="Kontaktperson"
              name="contact"
              required
              error={fieldErrors.contact}
              onChange={() => clearFieldError("contact")}
              placeholder="Fornavn Etternavn"
            />
            <Input
              label="E-post"
              name="c_email"
              type="email"
              required
              error={fieldErrors.c_email}
              onChange={() => clearFieldError("c_email")}
              placeholder="din@epost.no"
            />
          </div>

          <Input
            label="Telefon (anbefales for raske avklaringer)"
            name="c_phone"
            error={fieldErrors.c_phone}
            onChange={() => clearFieldError("c_phone")}
            placeholder="123 45 678"
          />

          <div style={ui.fieldRow}>
            <Input
              label="Antall personer"
              name="num_people"
              type="number"
              required
              placeholder="F.eks. 2"
              error={fieldErrors.num_people}
              onChange={() => clearFieldError("num_people")}
            />
            <Input
              label="Oppstart"
              name="start_date"
              type="date"
              required
              error={fieldErrors.start_date}
              onChange={() => clearFieldError("start_date")}
            />
          </div>

          <Input
            label="Arbeidssted (skipsnavn eller område)"
            name="work_location"
            required
            placeholder="F.eks. MS ARCTIC eller Harstad-området"
            error={fieldErrors.work_location}
            onChange={() => clearFieldError("work_location")}
          />

          <Select
            label="Kategori"
            name="need_type"
            options={Object.keys(WORK)}
            placeholder="Velg type bemanning"
            required
            error={fieldErrors.need_type}
            onChange={() => clearFieldError("need_type")}
          />
        </div>

        {/* STEG 2: Flere detaljer (valgfritt) */}
        {!showStep2 && (
          <button
            type="button"
            style={ui.expandButton}
            onClick={() => setShowStep2(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f0f9ff";
              e.currentTarget.style.borderColor = "#0369a1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "#cbd5e1";
            }}
          >
            <span>+ Legg til flere detaljer (valgfritt)</span>
          </button>
        )}

        {showStep2 && (
          <>
            <div style={ui.divider} />
            <div style={ui.fieldGrid}>
              <Select
                label="Oppdragstype"
                name="need_duration"
                options={[
                  "Langsiktig bemanning",
                  "Midlertidig bemanning",
                  "Usikker / kombinasjon",
                ]}
                placeholder="Velg varighet"
                error={fieldErrors.need_duration}
                onChange={() => clearFieldError("need_duration")}
              />

              <div>
                <div
                  style={{
                    fontWeight: 600,
                    marginBottom: 10,
                    color: "#0b1f3a",
                    fontSize: 15,
                  }}
                >
                  Hvor raskt trenger du mannskap?
                </div>
                <div style={sx.inlineRadios}>
                  <label style={sx.radioLabel}>
                    <input
                      type="radio"
                      name="urgency"
                      value="akutt"
                      onChange={() => clearFieldError("urgency")}
                    />
                    Akutt (&lt;48t)
                  </label>
                  <label style={sx.radioLabel}>
                    <input
                      type="radio"
                      name="urgency"
                      value="1uke"
                      onChange={() => clearFieldError("urgency")}
                    />
                    Innen 1 uke
                  </label>
                  <label style={sx.radioLabel}>
                    <input
                      type="radio"
                      name="urgency"
                      value="1mnd"
                      onChange={() => clearFieldError("urgency")}
                    />
                    Innen 1 måned
                  </label>
                  <label style={sx.radioLabel}>
                    <input
                      type="radio"
                      name="urgency"
                      value="fleksibel"
                      onChange={() => clearFieldError("urgency")}
                    />
                    Fleksibel
                  </label>
                </div>
                {fieldErrors.urgency ? (
                  <div style={sx.errText} role="alert">
                    {fieldErrors.urgency}
                  </div>
                ) : null}
              </div>

              <Textarea
                label="Kort kravbeskrivelse (maks 280 tegn)"
                name="desc"
                rows={4}
                full
                maxLength={280}
                description="Hvilke stillinger, sertifikater, turnus, osv.?"
                error={fieldErrors.desc}
                onChange={() => clearFieldError("desc")}
              />
            </div>
          </>
        )}

        {/* Mikrocopy i stedet for samtykkeboks */}
        <div style={ui.microCopy}>
          Ved å sende skjemaet ber du Bluecrew AS kontakte deg om bemanning. Vi
          behandler opplysningene for å vurdere og levere oppdrag og lagrer dem
          i inntil <strong>12 måneder</strong>.{" "}
          <Link
            href="/personvern"
            style={{
              color: "#0369a1",
              textDecoration: "underline",
              fontWeight: 600,
            }}
          >
            Les vår personvernerklæring
          </Link>
          .
        </div>

        {/* Honeypot */}
        <div aria-hidden="true" style={sx.honeypot}>
          <input name="honey" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div style={ui.submitRow}>
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
          <div style={ui.submitNote}>
            Vi ringer deg så snart vurderingen er gjort. Telefon:{" "}
            <strong>923 28 850</strong>
          </div>
        </div>
      </form>
    </div>
  );
}
