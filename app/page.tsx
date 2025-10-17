"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const HERO_BULLETS = [
  {
    icon: "🧭",
    text: "Bemanning med skippere, matroser, akvateknikere og støttepersonell som kjenner sjøen.",
  },
  {
    icon: "🌊",
    text: "Operativ erfaring fra havbruk, servicefartøy og fiskeri gir rask onboarding og trygg drift.",
  },
  {
    icon: "🤝",
    text: "Vi matcher mannskap etter kompetanse og samarbeidsevne – ikke bare papirer.",
  },
];

const SERVICE_CARDS = [
  {
    icon: "🛥️",
    title: "Servicefartøy",
    lines: ["Skipper/Styrmann", "Matros- og dekksarbeid", "Kokekyndig og lett proviant"],
  },
  {
    icon: "🐟",
    title: "Havbruk",
    lines: ["Operatører til anlegg", "Akvatekniker med fagbrev", "Fôrings- og laseroperatører"],
  },
  {
    icon: "⚓",
    title: "Fiskeri",
    lines: ["Skipper/Styrmann", "Matros", "Korttids- og sesongoppdrag"],
  },
];

const WORK: Record<string, string[]> = {
  "Servicefartøy mannskap": ["Skipper/Styrmann", "Matros", "Kokekyndig", "Annet"],
  Havbruk: ["Operativt", "Akvatekniker m/fagbrev", "Laseroperatør", "Fôringsoperatør", "Annet"],
  Fiskeri: ["Skipper/Styrmann", "Matros", "Annet"],
  Midlertidig: ["Korttidsoppdrag", "Sesong", "Annet"],
  Annet: ["Annet"],
};

const NEED_OPTIONS = Object.keys(WORK);

const STCW_MODULES = [
  "Sjøoverlevelse (PST)",
  "Brannvern (FPFF)",
  "Førstehjelp (EFA)",
  "PSSR",
];

const styles: Record<string, CSSProperties> = {
  page: {
    background: "#F8FAFC",
    color: "#0F172A",
    minHeight: "100vh",
  },
  hero: {
    padding: "120px 0 88px",
    background: "linear-gradient(180deg, #F7FAFC 0%, #E2E8F0 40%, #F8FAFC 100%)",
    borderBottom: "1px solid rgba(148, 163, 184, 0.25)",
  },
  heroWrap: {
    width: "min(1080px, 92vw)",
    margin: "0 auto",
    display: "grid",
    gap: 28,
    textAlign: "center",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 18px",
    borderRadius: 999,
    background: "#0B1F3A",
    color: "#F8FAFC",
    fontSize: 13,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    justifyContent: "center",
  },
  heroTitle: {
    fontSize: 52,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    margin: 0,
    color: "#0B1F3A",
  },
  heroLead: {
    margin: "0 auto",
    fontSize: 20,
    color: "#334155",
    lineHeight: 1.6,
    maxWidth: 760,
  },
  heroFootnote: {
    margin: 0,
    fontSize: 15,
    color: "#1E3A8A",
  },
  heroBullets: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
  },
  heroBullet: {
    background: "#FFFFFF",
    borderRadius: 18,
    padding: "16px 18px",
    border: "1px solid rgba(226, 232, 240, 0.9)",
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
    boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
  },
  heroBulletIcon: {
    fontSize: 18,
  },
  heroCtas: {
    display: "flex",
    gap: 16,
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 10,
  },
  heroBtnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "14px 28px",
    borderRadius: 12,
    background: "linear-gradient(135deg, #0B1F3A 0%, #1E3A8A 100%)",
    color: "#F8FAFC",
    fontWeight: 700,
    textDecoration: "none",
    boxShadow: "0 16px 32px rgba(15, 23, 42, 0.18)",
  },
  heroBtnSecondary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "14px 24px",
    borderRadius: 12,
    background: "#FFFFFF",
    color: "#0B1F3A",
    fontWeight: 700,
    textDecoration: "none",
    border: "1px solid rgba(15, 23, 42, 0.18)",
  },
  section: {
    padding: "80px 0",
  },
  sectionAlt: {
    padding: "80px 0",
    background: "#FFFFFF",
  },
  wrap: {
    width: "min(1080px, 92vw)",
    margin: "0 auto",
    display: "grid",
    gap: 40,
  },
  wrapNarrow: {
    width: "min(880px, 92vw)",
    margin: "0 auto",
    display: "grid",
    gap: 28,
  },
  sectionHeader: {
    display: "grid",
    gap: 12,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: 800,
    color: "#0B1F3A",
    margin: 0,
  },
  sectionLead: {
    fontSize: 18,
    color: "#475569",
    margin: 0,
    lineHeight: 1.7,
  },
  serviceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 24,
  },
  serviceCard: {
    background: "#FFFFFF",
    borderRadius: 18,
    padding: 24,
    border: "1px solid rgba(226, 232, 240, 0.9)",
    display: "grid",
    gap: 12,
    boxShadow: "0 14px 30px rgba(15, 23, 42, 0.08)",
  },
  serviceIcon: {
    fontSize: 26,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0F172A",
  },
  serviceList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
    gap: 6,
    color: "#475569",
    fontSize: 15,
  },
  formIntro: {
    color: "#475569",
    margin: 0,
    fontSize: 16,
    lineHeight: 1.6,
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    background: "#FFFFFF",
    border: "1px solid rgba(226, 232, 240, 0.9)",
    borderRadius: 20,
    padding: 24,
    boxShadow: "0 16px 36px rgba(15, 23, 42, 0.08)",
  },
  label: {
    display: "grid",
    gap: 6,
    fontSize: 14,
    color: "#0F172A",
  },
  input: {
    padding: "11px 14px",
    borderRadius: 12,
    border: "1px solid #CBD5E1",
    background: "#FFFFFF",
    fontSize: 15,
    color: "#0F172A",
  },
  inputErr: {
    borderColor: "#DC2626",
    boxShadow: "0 0 0 3px rgba(220, 38, 38, 0.18)",
  },
  textarea: {
    minHeight: 96,
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid #CBD5E1",
    fontSize: 15,
    color: "#0F172A",
    resize: "vertical",
  },
  inlineRadios: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
    fontSize: 14,
    color: "#1F2937",
  },
  checkGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: 10,
    marginTop: 10,
  },
  checkItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    color: "#1F2937",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  tagItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 12px",
    borderRadius: 999,
    border: "1px solid #CBD5E1",
    background: "#F8FAFC",
    fontSize: 14,
    color: "#0F172A",
  },
  ok: {
    background: "#ECFDF5",
    border: "1px solid #A7F3D0",
    color: "#065F46",
    padding: "14px 16px",
    borderRadius: 14,
    fontSize: 15,
  },
  aboutBody: {
    display: "grid",
    gap: 18,
    color: "#475569",
    fontSize: 16,
    lineHeight: 1.7,
  },
  quoteBox: {
    borderLeft: "4px solid #0B1F3A",
    background: "#FFFFFF",
    padding: "18px 20px",
    borderRadius: 14,
    color: "#0B1F3A",
    fontWeight: 700,
    fontSize: 16,
  },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 24,
  },
  contactCard: {
    background: "#FFFFFF",
    borderRadius: 18,
    padding: 24,
    border: "1px solid rgba(226, 232, 240, 0.9)",
    display: "grid",
    gap: 12,
    boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0B1F3A",
    margin: 0,
  },
  cardText: {
    fontSize: 15,
    color: "#475569",
    margin: 0,
    lineHeight: 1.6,
  },
  link: {
    color: "#1D4ED8",
    textDecoration: "none",
    fontWeight: 600,
  },
};

export default function Page() {
  const [sent, setSent] = useState<string | null>(null);
  const [openMain, setOpenMain] = useState<Record<string, boolean>>({});
  const [otherText, setOtherText] = useState<Record<string, string>>({});
  const [hasSTCW, setHasSTCW] = useState<"" | "ja" | "nei">("");
  const [hasDeck, setHasDeck] = useState<"" | "ja" | "nei">("");
  const [deckClass, setDeckClass] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const value = new URLSearchParams(window.location.search).get("sent");
    setSent(value);
  }, []);

  useEffect(() => {
    if (hasDeck !== "ja") {
      setDeckClass("");
    }
  }, [hasDeck]);

  const workerSent = sent === "worker";
  const clientSent = sent === "client";

  const toggleMain = (main: string) => {
    setOpenMain((prev) => ({ ...prev, [main]: !prev[main] }));
  };

  return (
    <div style={styles.page}>
      <SiteHeader />
      <main>
        <section style={styles.hero}>
          <div style={styles.heroWrap}>
            <span style={styles.heroBadge}>Bluecrew – Bemanning til sjøs</span>
            <h1 style={styles.heroTitle}>Rett kompetanse. På rett sted. Til rett tid.</h1>
            <p style={styles.heroLead}>
              Bluecrew leverer kvalifisert maritim arbeidskraft til havbruksnæringen, fiskeri og servicefartøy.
              Vi kjenner sjøen, skiftene og menneskene som holder drifta i gang – fordi vi selv har vært der.
            </p>
            <p style={styles.heroFootnote}>Bemanning for drift, ikke bare vaktlister.</p>
            <div style={styles.heroCtas}>
              <a href="#kandidat" style={styles.heroBtnPrimary}>
                Registrer kandidat
              </a>
              <a href="#kunde" style={styles.heroBtnSecondary}>
                Meld inn bemanningsbehov
              </a>
            </div>
            <ul style={styles.heroBullets}>
              {HERO_BULLETS.map((item) => (
                <li key={item.text} style={styles.heroBullet}>
                  <span style={styles.heroBulletIcon}>{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="tjenester" style={styles.sectionAlt}>
          <div style={styles.wrap}>
            <header style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Våre tjenester</h2>
              <p style={styles.sectionLead}>
                Vi bemanner fartøy og anlegg med sjøfolk som leverer fra første skift. Fortell oss hvor trykket er størst,
                så setter vi rett mannskap på oppdraget.
              </p>
            </header>
            <div style={styles.serviceGrid}>
              {SERVICE_CARDS.map((card) => (
                <article key={card.title} style={styles.serviceCard}>
                  <span style={styles.serviceIcon}>{card.icon}</span>
                  <h3 style={styles.serviceTitle}>{card.title}</h3>
                  <ul style={styles.serviceList}>
                    {card.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="kandidat" style={styles.section}>
          <div style={styles.wrapNarrow}>
            <header style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>For kandidater</h2>
              <p style={styles.formIntro}>
                Registrer deg for neste tur. Legg ved kontaktinfo, fagområder og CV – vi tar kontakt når riktig oppdrag dukker opp.
              </p>
            </header>

            {workerSent ? (
              <div style={styles.ok} role="status">
                Takk! Skjemaet er sendt inn.
              </div>
            ) : (
              <form
                action="/api/submit-candidate"
                method="POST"
                encType="multipart/form-data"
                style={styles.form}
                noValidate
              >
                <Input label="Fullt navn" name="name" required />
                <Input label="E-post" name="email" type="email" required />
                <Input label="Telefon" name="phone" required />
                <Input label="Bosted (by/kommune)" name="city" required />

                <div style={{ gridColumn: "1 / -1", display: "grid", gap: 12 }}>
                  <div style={{ fontWeight: 700 }}>Ønsket arbeid</div>
                  <div style={{ display: "grid", gap: 12 }}>
                    {Object.keys(WORK).map((main) => {
                      const open = !!openMain[main];
                      const subs = WORK[main];
                      return (
                        <div
                          key={main}
                          style={{
                            border: "1px solid #E2E8F0",
                            borderRadius: 14,
                            padding: 16,
                            background: "#FFFFFF",
                          }}
                        >
                          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                            <input type="checkbox" checked={open} onChange={() => toggleMain(main)} />
                            <span style={{ fontWeight: 700 }}>{main}</span>
                          </label>
                          {open ? (
                            <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                              <div style={styles.tags}>
                                {subs.map((sub) =>
                                  sub === "Annet" ? (
                                    <div key={sub} style={{ flex: 1, minWidth: 220 }}>
                                      <label style={styles.label}>
                                        <span>Annet (kort beskrivelse)</span>
                                        <input
                                          name={`other_${main}`}
                                          value={otherText[main] ?? ""}
                                          onChange={(event) =>
                                            setOtherText((prev) => ({ ...prev, [main]: event.target.value }))
                                          }
                                          placeholder="F.eks. maskinist, kranfører"
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
                              <small style={{ color: "#64748B" }}>
                                Velg relevante undervalg. Du kan åpne flere hovedkategorier samtidig.
                              </small>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ gridColumn: "1 / -1", display: "grid", gap: 18 }}>
                  <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                    <div>
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>STCW – grunnleggende sikkerhetskurs</div>
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
                          <input
                            type="radio"
                            name="stcw_has"
                            value="nei"
                            onChange={() => setHasSTCW("nei")}
                          />
                          Har ikke
                        </label>
                      </div>
                      {hasSTCW === "ja" ? (
                        <div>
                          <div style={{ fontSize: 13, color: "#475569", marginTop: 8 }}>Velg relevante moduler</div>
                          <div style={styles.checkGrid}>
                            {STCW_MODULES.map((module) => (
                              <label key={module} style={styles.checkItem}>
                                <input type="checkbox" name="stcw_mod" value={module} />
                                <span>{module}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>Dekksoffiser-sertifikat</div>
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
                            onChange={() => setHasDeck("nei")}
                          />
                          Har ikke
                        </label>
                      </div>
                      {hasDeck === "ja" ? (
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
                      ) : null}
                    </div>
                  </div>
                </div>

                <Input label="Tilgjengelig fra" name="available_from" type="date" />
                <Textarea label="Kompetanse/kurs (kort)" name="skills" rows={4} full />
                <Textarea label="Andre relevante sertifikater og erfaring" name="other_comp" rows={4} full />

                <FileInput label="CV (PDF, maks 10 MB)" name="cv" accept=".pdf" required />
                <FileInput label="Sertifikater (PDF/zip, valgfritt)" name="certs" accept=".pdf,.zip" />

                <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 10 }}>
                  <input id="gdpr" type="checkbox" required />
                  <label htmlFor="gdpr" style={{ fontSize: 13, color: "#475569" }}>
                    Jeg samtykker til behandling av persondata for bemanning og rekruttering.
                  </label>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <button type="submit" style={styles.heroBtnPrimary}>
                    Send inn kandidatprofil
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        <section id="kunde" style={styles.sectionAlt}>
          <div style={styles.wrapNarrow}>
            <header style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>For kunder</h2>
              <p style={styles.formIntro}>
                Beskriv behovet kort – vi håndplukker kandidater med riktig sertifikat, erfaring og tilgjengelighet.
              </p>
            </header>

            {clientSent ? (
              <div style={styles.ok} role="status">
                Takk! Forespørselen er sendt inn.
              </div>
            ) : (
              <form action="/api/submit-client" method="POST" style={styles.form} noValidate>
                <Input label="Selskap" name="company" required />
                <Input label="Kontaktperson" name="contact" required />
                <Input label="E-post" name="c_email" type="email" required />
                <Input label="Telefon" name="c_phone" required />
                <Input label="Lokasjon/område" name="location" />
                <Select label="Type behov" name="need_type" options={NEED_OPTIONS} placeholder="Velg behov" />
                <Textarea label="Kort beskrivelse av oppdraget" name="desc" rows={4} full />

                <div style={{ gridColumn: "1 / -1" }}>
                  <button type="submit" style={styles.heroBtnPrimary}>
                    Send forespørsel
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        <section id="om" style={styles.section}>
          <div style={styles.wrapNarrow}>
            <header style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Om Bluecrew</h2>
              <p style={styles.sectionLead}>
                Vi er sjøfolk, operatører og maritime fagfolk som kjenner hverdagen om bord.
              </p>
            </header>
            <div style={styles.aboutBody}>
              <p>
                Bluecrew AS leverer bemanning og rekruttering til havbruk, fiskeri og servicefartøy. Vi bygger team som holder
                drifta i gang – fra dekksarbeid og maskin til bro og støttefunksjoner på land.
              </p>
              <p>
                Våre rådgivere matcher oppdrag og mannskap ut fra kompetanse, holdninger og samarbeidsevne. Vi følger opp før,
                under og etter oppdrag, slik at både rederi og mannskap føler seg ivaretatt.
              </p>
              <p>
                Med praktisk erfaring fra feltet vet vi hva som kreves for å levere sikkert, effektivt og i tråd med kravene i
                maritim sektor. Derfor bemanner vi for drift – ikke bare for å fylle en vaktliste.
              </p>
            </div>
            <div style={styles.quoteBox}>Bluecrew – Bemanning til sjøs. Rett kompetanse. På rett sted. Til rett tid.</div>
          </div>
        </section>

        <section id="kontakt" style={styles.sectionAlt}>
          <div style={styles.wrap}>
            <header style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Kontakt oss</h2>
              <p style={styles.sectionLead}>
                Vi tar gjerne en prat om bemanningsplaner, sertifikater eller samarbeid. Du når oss direkte på telefon eller
                e-post.
              </p>
            </header>
            <div style={styles.contactGrid}>
              <div style={styles.contactCard}>
                <h3 style={styles.cardTitle}>Bluecrew AS</h3>
                <p style={styles.cardText}>Østenbekkveien 43, 9403 Harstad</p>
                <p style={styles.cardText}>Org.nr: 936 321 194</p>
                <p style={styles.cardText}>
                  <a href="mailto:isak@bluecrew.no" style={styles.link}>
                    isak@bluecrew.no
                  </a>
                </p>
                <p style={styles.cardText}>
                  <a href="tel:92328850" style={styles.link}>
                    923 28 850
                  </a>
                </p>
              </div>
              <div style={styles.contactCard}>
                <h3 style={styles.cardTitle}>Hva kan vi hjelpe deg med?</h3>
                <p style={styles.cardText}>
                  • Midlertidig bemanning til havbruk, servicefartøy og fiskeri
                  <br />• Rekruttering til faste stillinger
                  <br />• Rådgivning rundt sertifikater, kurs og vaktplaner
                </p>
                <p style={styles.cardText}>
                  Vi behandler persondata i tråd med GDPR og deler aldri dokumenter uten samtykke.
                </p>
              </div>
            </div>
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
  const id = `${name}-id`;
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
  const id = `${name}-id`;
  return (
    <label
      style={{
        ...styles.label,
        gridColumn: full ? "1 / -1" : undefined,
      }}
      htmlFor={id}
    >
      <span>{label}</span>
      <textarea
        id={id}
        name={name}
        rows={rows}
        style={{ ...styles.textarea, minHeight: rows * 24 }}
      />
    </label>
  );
}

function Select({
  label,
  name,
  options = [],
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}) {
  const id = `${name}-id`;
  return (
    <label style={styles.label} htmlFor={id}>
      <span>{label}</span>
      <select
        id={id}
        name={name}
        {...(value !== undefined ? { value } : {})}
        onChange={(event) => (onChange ? onChange(event.target.value) : undefined)}
        style={styles.input}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
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
  const id = `${name}-id`;
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
