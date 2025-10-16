"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

const WORK: Record<string, string[]> = {
  "Servicefartøy mannskap": ["Skipper/Styrmann", "Matros", "Kokekyndig", "Annet"],
  Havbruk: ["Operativt", "Akvatekniker m/fagbrev", "Laseroperatør", "Fôringsoperatør", "Annet"],
  Fiskeri: ["Skipper/Styrmann", "Matros", "Annet"],
  Midlertidig: ["Korttidsoppdrag", "Sesong", "Annet"],
  Annet: ["Annet"],
};

const STCW_MODULES = ["Sjøoverlevelse (PST)", "Brannvern (FPFF)", "Førstehjelp (EFA)", "PSSR"];

export default function KandidatPage() {
  return (
    <Suspense fallback={<div />}>
      <KandidatPageContent />
    </Suspense>
  );
}

function KandidatPageContent() {
  const searchParams = useSearchParams();
  const sent = searchParams.get("sent");
  const [openMain, setOpenMain] = useState<Record<string, boolean>>({});
  const [otherText, setOtherText] = useState<Record<string, string>>({});
  const [hasSTCW, setHasSTCW] = useState<"" | "ja" | "nei">("");
  const [hasDeck, setHasDeck] = useState<"" | "ja" | "nei">("");
  const [deckClass, setDeckClass] = useState("");

  const toggleMain = (main: string) => {
    setOpenMain((prev) => ({ ...prev, [main]: !prev[main] }));
  };

  return (
    <div style={styles.page}>
      <SiteHeader />
      <main style={styles.main}>
        <section style={styles.hero}>
          <div style={styles.heroInner}>
            <p style={styles.heroPill}>Registrer kandidat</p>
            <h1 style={styles.heroTitle}>Mannskap klare for neste maritime oppdrag</h1>
            <p style={styles.heroText}>
              Del kontaktinformasjon, kompetanse og tilgjengelighet. Vi matcher deg med oppdrag innen havbruk, fiskeri og
              servicefartøy når behovet oppstår.
            </p>
            <div style={styles.heroLinks}>
              <Link href="/bemanningsbehov" style={styles.heroLink}>
                Meld inn bemanningsbehov i stedet
              </Link>
            </div>
          </div>
        </section>

        <section style={styles.formSection}>
          <div style={styles.formWrap}>
            <h2 style={styles.formTitle}>Kandidatprofil</h2>
            <p style={styles.formIntro}>
              Skjemaet går direkte til Bluecrew AS. Vi kontakter deg når vi har en match som passer kompetansen din.
            </p>
            {sent === "worker" ? (
              <div style={styles.success} role="status">
                Takk! Profilen er mottatt.
              </div>
            ) : (
              <form action="/api/submit-candidate" method="POST" encType="multipart/form-data" style={styles.form} noValidate>
                <Input label="Fullt navn" name="name" required />
                <Input label="E-post" name="email" type="email" required />
                <Input label="Telefon" name="phone" required />
                <Input label="Bosted (by/kommune)" name="city" required />

                <div style={{ gridColumn: "1 / -1" }}>
                  <div style={styles.fieldHeading}>Ønsket arbeid</div>
                  <div style={{ display: "grid", gap: 12 }}>
                    {Object.entries(WORK).map(([main, subs]) => {
                      const open = !!openMain[main];
                      return (
                        <div key={main} style={styles.choiceGroup}>
                          <label style={styles.choiceToggle}>
                            <input type="checkbox" checked={open} onChange={() => toggleMain(main)} />
                            <span>{main}</span>
                          </label>
                          {open && (
                            <div style={{ marginTop: 10 }}>
                              <div style={styles.tagList}>
                                {subs.map((sub) =>
                                  sub === "Annet" ? (
                                    <div key={sub} style={{ flex: 1, minWidth: 220 }}>
                                      <label style={styles.label}>
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
                                          style={styles.input}
                                        />
                                      </label>
                                    </div>
                                  ) : (
                                    <label key={sub} style={styles.tagItem}>
                                      <input type="checkbox" name="work_main" value={`${main}:${sub}`} />
                                      <span>{sub}</span>
                                    </label>
                                  ),
                                )}
                              </div>
                              <small style={{ color: "#64748b" }}>
                                Velg undervalg (eller fyll «Annet»). Du kan åpne flere hovedkategorier.
                              </small>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={styles.radioGrid}>
                  <div>
                    <div style={styles.fieldHeading}>STCW – Grunnleggende sikkerhetskurs</div>
                    <div style={styles.inlineRadios}>
                      <label>
                        <input
                          type="radio"
                          name="stcw_has"
                          value="ja"
                          required
                          onChange={() => setHasSTCW("ja")}
                        />
                        Har
                      </label>
                      <label>
                        <input type="radio" name="stcw_has" value="nei" onChange={() => setHasSTCW("nei")} />
                        Har ikke
                      </label>
                    </div>
                    {hasSTCW === "ja" && (
                      <div style={{ marginTop: 8 }}>
                        <div style={styles.helperText}>Huk av relevante moduler</div>
                        <div style={styles.checkGrid}>
                          {STCW_MODULES.map((module) => (
                            <label key={module} style={styles.checkItem}>
                              <input type="checkbox" name="stcw_mod" value={module} />
                              <span>{module}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <div style={styles.fieldHeading}>Dekksoffiser-sertifikat</div>
                    <div style={styles.inlineRadios}>
                      <label>
                        <input
                          type="radio"
                          name="deck_has"
                          value="ja"
                          required
                          onChange={() => setHasDeck("ja")}
                        />
                        Har
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="deck_has"
                          value="nei"
                          onChange={() => {
                            setHasDeck("nei");
                            setDeckClass("");
                          }}
                        />
                        Har ikke
                      </label>
                    </div>
                    {hasDeck === "ja" && (
                      <div style={{ marginTop: 8 }}>
                        <Select
                          label="Klasse"
                          name="deck_class"
                          options={["1", "2", "3", "4", "5", "6"]}
                          value={deckClass}
                          onChange={setDeckClass}
                          placeholder="Velg klasse (1–6)"
                        />
                        <small style={{ color: "#475569" }}>1 = høyeste, 6 = laveste (D6).</small>
                      </div>
                    )}
                  </div>
                </div>

                <Input label="Tilgjengelig fra" name="available_from" type="date" />
                <Textarea label="Kompetanse/kurs (kort)" name="skills" rows={4} full />
                <Textarea label="Andre relevante sertifikater og kompetanse" name="other_comp" rows={4} full />

                <FileInput label="CV (PDF, maks 10 MB)" name="cv" accept=".pdf" required />
                <FileInput label="Sertifikater (PDF/zip, valgfritt)" name="certs" accept=".pdf,.zip" />

                <div style={styles.privacyRow}>
                  <input id="gdpr" type="checkbox" required />
                  <label htmlFor="gdpr" style={styles.privacyText}>
                    Jeg samtykker til behandling av persondata for bemanning og rekruttering.
                  </label>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <button type="submit" style={styles.submitBtn}>
                    Send inn kandidatprofil
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Input({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const id = `${name}-field`;
  return (
    <label style={styles.label} htmlFor={id}>
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <input id={id} name={name} type={type} required={required} style={styles.input} />
    </label>
  );
}

function Textarea({ label, name, rows = 4, full }: { label: string; name: string; rows?: number; full?: boolean }) {
  const id = `${name}-field`;
  return (
    <label style={{ ...styles.label, gridColumn: full ? "1 / -1" : undefined }} htmlFor={id}>
      <span>{label}</span>
      <textarea id={id} name={name} rows={rows} style={{ ...styles.input, height: rows * 24 }} />
    </label>
  );
}

function Select({
  label,
  name,
  options,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  const id = `${name}-field`;
  return (
    <label style={styles.label} htmlFor={id}>
      <span>{label}</span>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        style={styles.input}
      >
        <option value="">{placeholder ?? "Velg"}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function FileInput({
  label,
  name,
  accept,
  required,
}: {
  label: string;
  name: string;
  accept?: string;
  required?: boolean;
}) {
  const id = `${name}-field`;
  return (
    <label style={styles.label} htmlFor={id}>
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <input id={id} name={name} type="file" accept={accept} required={required} style={styles.input} />
    </label>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    background: "#F8FAFC",
    color: "#0F172A",
    minHeight: "100vh",
  },
  main: {
    paddingBottom: 80,
  },
  hero: {
    background: "linear-gradient(135deg, #0B1F3A 0%, #1E3A8A 100%)",
    color: "#fff",
    padding: "96px 0 72px",
  },
  heroInner: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "0 24px",
    textAlign: "center",
    display: "grid",
    gap: 16,
  },
  heroPill: {
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.18)",
    fontSize: 12,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  heroTitle: {
    margin: 0,
    fontSize: 36,
    fontWeight: 800,
    letterSpacing: "-0.01em",
  },
  heroText: {
    margin: 0,
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.88)",
  },
  heroLinks: {
    display: "flex",
    justifyContent: "center",
    marginTop: 8,
  },
  heroLink: {
    color: "#C7D2FE",
    textDecoration: "none",
    fontWeight: 600,
  },
  formSection: {
    padding: "72px 0",
  },
  formWrap: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "0 24px",
    background: "#fff",
    borderRadius: 24,
    boxShadow: "0 24px 60px rgba(15,23,42,0.08)",
    border: "1px solid #E2E8F0",
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 800,
    margin: "32px 24px 12px",
    color: "#0B1F3A",
  },
  formIntro: {
    margin: "0 24px 24px",
    color: "#475569",
    lineHeight: 1.6,
  },
  success: {
    margin: "0 24px 32px",
    padding: "18px 20px",
    borderRadius: 14,
    background: "#DCFCE7",
    color: "#166534",
    fontWeight: 600,
  },
  form: {
    display: "grid",
    gap: 18,
    padding: "0 24px 36px",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  },
  label: {
    display: "grid",
    gap: 6,
    fontSize: 14,
    fontWeight: 600,
    color: "#0B1F3A",
  },
  input: {
    borderRadius: 12,
    border: "1px solid #CBD5F5",
    padding: "12px 14px",
    fontSize: 15,
    fontFamily: "inherit",
    color: "#0F172A",
    background: "#fff",
  },
  fieldHeading: {
    fontWeight: 700,
    marginBottom: 6,
    color: "#0B1F3A",
  },
  choiceGroup: {
    border: "1px solid #E2E8F0",
    borderRadius: 14,
    padding: 14,
    background: "#F8FAFC",
  },
  choiceToggle: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontWeight: 700,
    cursor: "pointer",
  },
  tagList: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  },
  tagItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 12px",
    borderRadius: 999,
    background: "#E0E7FF",
    color: "#1D4ED8",
    fontSize: 13,
    fontWeight: 600,
  },
  radioGrid: {
    gridColumn: "1 / -1",
    display: "grid",
    gap: 24,
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  },
  inlineRadios: {
    display: "flex",
    gap: 18,
    margin: "6px 0",
    color: "#0F172A",
    fontWeight: 600,
  },
  helperText: {
    fontSize: 13,
    color: "#475569",
    marginBottom: 6,
  },
  checkGrid: {
    display: "grid",
    gap: 10,
  },
  checkItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 12px",
    borderRadius: 12,
    background: "#E2E8F0",
  },
  privacyRow: {
    gridColumn: "1 / -1",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    color: "#475569",
  },
  privacyText: {
    fontSize: 13,
    color: "#475569",
  },
  submitBtn: {
    width: "100%",
    borderRadius: 14,
    padding: "14px 20px",
    background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
    color: "#fff",
    fontWeight: 800,
    border: "none",
    cursor: "pointer",
    boxShadow: "0 16px 32px rgba(29,78,216,0.25)",
  },
};
