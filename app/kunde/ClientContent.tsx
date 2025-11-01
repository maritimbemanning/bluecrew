"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input, Select, Textarea } from "../components/FormControls";
import { WORK } from "../lib/constants";
import { sx } from "../lib/styles";
import { clientSchema, extractClientForm } from "../lib/validation";

type FieldErrors = Record<string, string>;

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
  consentBox: {
    background: "#f0f9ff",
    borderRadius: 18,
    border: "1px solid #bae6fd",
    padding: 18,
    display: "grid",
    gap: 10,
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

export default function ClientContent() {
  const searchParams = useSearchParams();
  const submitted = searchParams.get("sent") === "client";

  useEffect(() => {
    if (!submitted || typeof window === "undefined") return;
    const plausible = (window as typeof window & {
      plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
    }).plausible;
    if (typeof plausible === "function") {
      plausible("Lead Submitted", { props: { form: "client" } });
    }
  }, [submitted]);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orgLookupLoading, setOrgLookupLoading] = useState(false);

  // Brønnøysund API lookup - call directly from client
  const lookupOrganization = async (orgnr: string, isWorkLocation: boolean = false) => {
    const cleanOrgnr = orgnr.replace(/\s/g, "");
    if (!/^\d{9}$/.test(cleanOrgnr)) return;

    setOrgLookupLoading(true);
    try {
      const response = await fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${cleanOrgnr}`);
      if (!response.ok) {
        console.error("Org lookup failed: HTTP", response.status);
        return;
      }
      
      const data = await response.json();
      
      if (isWorkLocation) {
        // Populate work location fields
        const nameField = document.querySelector<HTMLInputElement>('input[name="c_work_location_name"]');
        const streetField = document.querySelector<HTMLInputElement>('input[name="c_street_address"]');
        const postalCodeField = document.querySelector<HTMLInputElement>('input[name="c_postal_code"]');
        const postalCityField = document.querySelector<HTMLInputElement>('input[name="c_postal_city"]');
        
        if (nameField) nameField.value = data.navn || "";
        if (data.forretningsadresse) {
          const addr = data.forretningsadresse;
          if (streetField) streetField.value = addr.adresse || "";
          if (postalCodeField) postalCodeField.value = addr.postnummer || "";
          if (postalCityField) postalCityField.value = addr.poststed || "";
        }
      } else {
        // Populate company name
        const companyField = document.querySelector<HTMLInputElement>('input[name="company"]');
        if (companyField) companyField.value = data.navn || "";
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

    // Honeypot: må matche input-navnet under
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
    // Ikke preventDefault ved OK – la browseren poste til /api/submit-client
  }, []);

  if (submitted) {
    return (
      <div style={ui.successCard} role="status">
        <h2 style={ui.successTitle}>Forespørselen er tatt imot</h2>
        <p style={ui.successBody}>
          Vi setter stor pris på tilliten. Teamet vårt gjør en første vurdering med en gang, og holder deg løpende
          orientert til du har mannskap på plass.
        </p>
        <div>
          <strong style={{ color: "#047857" }}>Neste steg:</strong>
          <ul style={ui.successList}>
            <li>Du får en bekreftelse på e-post med kontaktinformasjon</li>
            <li>En rådgiver ringer deg normalt <strong>innen 24 timer på dagtid</strong></li>
            <li>Akutte saker (&lt;48 timer) prioriteres – ring 923 28 850 ved behov</li>
          </ul>
        </div>
        <p style={ui.successBody}>
          Har du oppdateringer eller dokumentasjon? Send det direkte til <strong>isak@bluecrew.no</strong> så legger vi
          det til saken.
        </p>
      </div>
    );
  }

  return (
    <div style={ui.wrap}>
      <form action="/api/submit-client" method="POST" noValidate onSubmit={handleSubmit} style={ui.formShell}>
          {formError ? (
            <div style={sx.formError} role="alert">
              {formError}
            </div>
          ) : null}

          <div style={ui.section}>
            <div style={ui.sectionHeader}>
              <h2 style={ui.sectionTitle}>Kontaktinformasjon</h2>
              <p style={ui.sectionLead}>Vi trenger en kontaktperson som kan ta raske avklaringer.</p>
            </div>
            <div style={ui.fieldGrid}>
              <Input
                label="Organisasjonsnummer (9 siffer)"
                name="org_number"
                placeholder="123 456 789"
                error={fieldErrors.org_number}
                onChange={(e) => {
                  clearFieldError("org_number");
                  const value = e.target.value;
                  if (/^\d{9}$/.test(value.replace(/\s/g, ""))) {
                    lookupOrganization(value, false);
                  }
                }}
              />
              <Input
                label="Selskap"
                name="company"
                required
                error={fieldErrors.company}
                onChange={() => clearFieldError("company")}
                placeholder={orgLookupLoading ? "Henter..." : ""}
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
            </div>
          </div>

          <div style={ui.divider} />

          <div style={ui.section}>
            <div style={ui.sectionHeader}>
              <h2 style={ui.sectionTitle}>Arbeidssted</h2>
              <p style={ui.sectionLead}>Oppgi fullstendig adresse hvor mannskapet skal jobbe.</p>
            </div>
            <div style={ui.fieldGrid}>
              <Input
                label="Org.nr arbeidssted (valgfritt - fyller ut adresse automatisk)"
                name="work_org_number"
                placeholder="123 456 789"
                error={fieldErrors.work_org_number}
                onChange={(e) => {
                  clearFieldError("work_org_number");
                  const value = e.target.value;
                  if (/^\d{9}$/.test(value.replace(/\s/g, ""))) {
                    lookupOrganization(value, true);
                  }
                }}
              />
              <Input
                label="Arbeidssted (bedriftsnavn eller skipsnavn)"
                name="c_work_location_name"
                placeholder="Eksempel: Brønnbåt MS ARCTIC eller Havbruk AS"
                required
                error={fieldErrors.c_work_location_name}
                onChange={() => clearFieldError("c_work_location_name")}
              />
            </div>
            <div style={ui.fieldGrid}>
              <Input
                label="Gateadresse"
                name="c_street_address"
                placeholder="Eksempel: Havnegata 12"
                required
                error={fieldErrors.c_street_address}
                onBlur={() => clearFieldError("c_street_address")}
              />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12 }}>
                <Input
                  label="Postnummer"
                  name="c_postal_code"
                  placeholder="0150"
                  required
                  error={fieldErrors.c_postal_code}
                  onBlur={() => clearFieldError("c_postal_code")}
                />
                <Input
                  label="Poststed"
                  name="c_postal_city"
                  placeholder="OSLO"
                  required
                  error={fieldErrors.c_postal_city}
                  onBlur={() => clearFieldError("c_postal_city")}
                />
              </div>
            </div>
          </div>

          <div style={ui.divider} />

          <div style={ui.section}>
            <div style={ui.sectionHeader}>
              <h2 style={ui.sectionTitle}>Oppdraget</h2>
              <p style={ui.sectionLead}>
                Beskriv oppgaven og ønsket profil. Jo mer konkret, desto raskere kan vi presentere riktige kandidater.
              </p>
            </div>
            <div style={ui.fieldGrid}>
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
              <Input
                label="Antall personer"
                name="num_people"
                type="number"
                placeholder="F.eks. 2"
                error={fieldErrors.num_people}
                onChange={() => clearFieldError("num_people")}
              />
              <Input
                label="Ønsket oppstartsdato"
                name="start_date"
                type="date"
                error={fieldErrors.start_date}
                onChange={() => clearFieldError("start_date")}
              />
            </div>

            <div>
              <div style={{ fontWeight: 700, marginBottom: 8, color: "#0b1f3a" }}>Hvor raskt trenger du mannskap?</div>
              <div style={sx.inlineRadios}>
                <label style={sx.radioLabel}>
                  <input
                    type="radio"
                    name="urgency"
                    value="akutt"
                    onChange={() => clearFieldError("urgency")}
                  />
                  Akutt (&lt;48 timer)
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
              label="Beskriv bemanningsbehovet"
              name="desc"
              rows={5}
              full
              description="Hvilke stillinger, kompetansekrav, turnus, sertifikater, arbeidstid, osv.?"
              error={fieldErrors.desc}
              onBlur={() => clearFieldError("desc")}
            />
          </div>

          <div style={ui.divider} />

          <div style={ui.section}>
            <div style={ui.consentBox}>
              <label
                style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14.5, color: "#0b1f3a", cursor: "pointer" }}
              >
                <input
                  type="checkbox"
                  id="gdpr_client"
                  required
                  name="gdpr_client"
                  aria-invalid={!!fieldErrors.gdpr_client}
                  onChange={() => clearFieldError("gdpr_client")}
                  style={{ marginTop: 3, flexShrink: 0 }}
                />
                <span>
                  Jeg samtykker til at Bluecrew AS lagrer forespørselen min for å levere mannskap. Data lagres i
                  <strong> 6–12 måneder</strong> og slettes ved avsluttet samarbeid eller på forespørsel. {" "}
                  <Link href="/personvern" style={{ color: "#0369a1", textDecoration: "underline", fontWeight: 600 }}>
                    Les personvernerklæringen
                  </Link>
                  .
                </span>
              </label>
              {fieldErrors.gdpr_client ? (
                <div style={sx.errText} role="alert">
                  {fieldErrors.gdpr_client}
                </div>
              ) : null}
            </div>
          </div>

          {/* Honeypot: må matche values.honey */}
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
                cursor: isSubmitting ? "wait" : sx.btnMain.cursor,
              }}
              disabled={isSubmitting}
            >
              Send forespørsel
            </button>
            <div style={ui.submitNote}>
              Vi ringer deg så snart vurderingen er gjort. Telefonnummer: <strong>923 28 850</strong>
            </div>
          </div>
        </form>
    </div>
  );
}
