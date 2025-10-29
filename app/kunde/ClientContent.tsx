"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input, Select, Textarea } from "../components/FormControls";
import { WORK, COUNTIES, MUNICIPALITIES_BY_COUNTY } from "../lib/constants";
import { sx } from "../lib/styles";
import { clientSchema, extractClientForm } from "../lib/validation";

type FieldErrors = Record<string, string>;

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
    maxWidth: 620,
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
  consentBox: {
    background: "#f0f9ff",
    borderRadius: 18,
    border: "1px solid #bae6fd",
    padding: 18,
    display: "grid",
    gap: 10,
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

export default function ClientContent() {
  const searchParams = useSearchParams();
  const submitted = searchParams.get("sent") === "client";
  const [isWide, setIsWide] = useState<boolean>(() => {
    return typeof window !== "undefined" ? window.innerWidth >= 960 : false;
  });

  useEffect(() => {
    if (!submitted || typeof window === "undefined") return;
    const plausible = (window as typeof window & {
      plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
    }).plausible;
    if (typeof plausible === "function") {
      plausible("Lead Submitted", { props: { form: "client" } });
    }
  }, [submitted]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => {
      setIsWide(window.innerWidth >= 960);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const [county, setCounty] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const layoutStyle = isWide ? { ...ui.layout, ...ui.layoutWide } : ui.layout;

  return (
    <div style={ui.wrap}>
      <section style={ui.hero}>
        <h1 style={ui.heroTitle}>Bemanning som matcher operasjonen din</h1>
        <p style={ui.heroLead}>
          Beskriv behovet ditt, så håndterer vi screening, referanser og koordinering. Vi er tilgjengelige syv dager i
          uken når det haster.
        </p>
        <div style={ui.heroBadges}>
          <span style={ui.heroBadge}>Garantert svar innen 24 t</span>
          <span style={ui.heroBadge}>STCW-sertifiserte mannskap</span>
          <span style={ui.heroBadge}>Base i Nord-Norge · dekning nasjonalt</span>
        </div>
        <div style={ui.heroGrid}>
          <div style={ui.heroCard}>
            <span style={ui.heroCardLabel}>Oppstart</span>
            <span style={ui.heroCardValue}>Raskere enn 48 timer ved akutt</span>
          </div>
          <div style={ui.heroCard}>
            <span style={ui.heroCardLabel}>Tilgjengelighet</span>
            <span style={ui.heroCardValue}>Rådgivere på vakt 07–22 alle dager</span>
          </div>
          <div style={ui.heroCard}>
            <span style={ui.heroCardLabel}>Kvalitet</span>
            <span style={ui.heroCardValue}>Dokumentert kompetanse og referanser</span>
          </div>
        </div>
      </section>

      <div style={layoutStyle}>
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
            </div>
          </div>

          <div style={ui.divider} />

          <div style={ui.section}>
            <div style={ui.sectionHeader}>
              <h2 style={ui.sectionTitle}>Hvor skal mannskapet?</h2>
              <p style={ui.sectionLead}>Gi oss primær lokasjon. Vi kan ordne reise og bolig ved behov.</p>
            </div>
            <div style={ui.fieldGrid}>
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

        <aside style={ui.sidebar}>
          <h3 style={ui.sidebarTitle}>Hva du kan forvente</h3>
          <ul style={ui.sidebarList}>
            <li>En dedikert rådgiver følger saken din fra start til slutt.</li>
            <li>Vi kvalitetssikrer CV, sertifikater og referanser før kandidaten presenteres.</li>
            <li>Du får en shortlist med tilgjengelighet og prisbilde til godkjenning.</li>
          </ul>
          <div style={ui.sidebarFooter}>
            Operativ når det haster: ring <strong>923 28 850</strong> eller send e-post til
            <strong> isak@bluecrew.no</strong>. Vi kan koordinere reise og innkvartering på forespørsel.
          </div>
        </aside>
      </div>
    </div>
  );
}
