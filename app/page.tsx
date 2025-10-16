import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const styles = {
import React, { useMemo, useState, useEffect } from "react";
export const dynamic = "force-dynamic";
export default function Page() {
  const year = useMemo(() => new Date().getFullYear(), []);

const [sent, setSent] = useState<string | null>(null);
useEffect(() => {
  if (typeof window !== "undefined") {
    const s = new URLSearchParams(window.location.search).get("sent");
    setSent(s);
  }
}, []);

 const workerSent = false;
const clientSent = false;

  // Hovedkategorier → undervalg (som ønsket)
  const WORK: Record<string, string[]> = {
    "Servicefartøy mannskap": ["Skipper/Styrmann", "Matros", "Kokekyndig", "Annet"],
    Havbruk: ["Operativt", "Akvatekniker m/fagbrev", "Laseroperatør", "Fôringsoperatør", "Annet"],
    Fiskeri: ["Skipper/Styrmann", "Matros", "Annet"],
    Midlertidig: ["Korttidsoppdrag", "Sesong", "Annet"],
    Annet: ["Annet"],
  };

  // UI-state for hvilke hovedkategorier som er åpne/valgt (kun UI – ikke sendt til API)
  const [openMain, setOpenMain] = useState<Record<string, boolean>>({});
  const toggleMain = (main: string) => setOpenMain((p) => ({ ...p, [main]: !p[main] }));

  // “Annet”-fritekst pr. hovedkategori
  const [otherText, setOtherText] = useState<Record<string, string>>({});

  // STCW / Dekk (kompakt)
  const [hasSTCW, setHasSTCW] = useState<"" | "ja" | "nei">("");
  const [hasDeck, setHasDeck] = useState<"" | "ja" | "nei">("");
  const [deckClass, setDeckClass] = useState("");

  return (
    <main style={sx.page}>
      {/* TOPP / LOGO / NAV */}
      <header style={sx.topbar}>
        <div style={sx.wrap}>
          <a
            href="#"
            style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" }}
            aria-label="Bluecrew hjem"
          >
            <Logo size={28} />
            <div style={sx.logoBox}>
              <div style={sx.logoText}>Bluecrew</div>
              <div style={sx.logoTag}>Didriksson Maritime Bemanning</div>
            </div>
          </a>
          <nav style={sx.nav} aria-label="Hovedmeny">
            <a href="#kandidat" style={sx.navLink}>Kandidat</a>
            <a href="#kunde" style={sx.navLink}>Kunde</a>
            <a href="#om-oss" style={sx.navLink}>Om oss</a>
            <a href="#kontakt" style={sx.navLink}>Kontakt</a>
          </nav>
        </div>
      </header>

      {/* HERO (oppgradert) */}
      <section style={sx.hero}>
        <div style={sx.heroWrap}>
          <div style={sx.heroPill}>Bemanning • Havbruk • Fiskeri • Servicefartøy</div>
          <h1 style={sx.h1}>Bluecrew – Bemanning Til Sjøs</h1>
          <p style={sx.h1Sub}>Rett kompetanse, på rett sted, til rett tid.</p>

         <div style={sx.ctaRow}>
  <a href="#kandidat" style={sx.btnMain}>Registrer kandidat</a>
  <a href="#kunde" style={sx.btnMain}>Meld inn bemanningsbehov</a>
</div>


          <ul style={sx.badges}>
            <li style={sx.badge}><span style={sx.badgeIcon}>🧭</span> Skippere, matroser, akvateknikere</li>
            <li style={sx.badge}><span style={sx.badgeIcon}>🌊</span> Praktisk erfaring fra sjøen</li>
            <li style={sx.badge}><span style={sx.badgeIcon}>⏱️</span> Rask respons & ryddige avtaler</li>
          </ul>
        </div>
      </section>

      {/* TJENESTER – tre pene kort */}
<section style={{ ...sx.section, background: "#fff" }}>
  <div style={sx.wrapNarrow}>
    <div style={{ textAlign: "center", marginBottom: 36 }}>
      <h2 style={sx.h2}>Våre tjenester</h2>
      <p style={sx.leadSmall}>
        Bemanning og rekruttering til havbruk, fiskeri og servicefartøy — raskt, trygt og ryddig.
      </p>
    </div>

    <div style={sx.cards3}>
      <div style={sx.cardService}>
        <div style={sx.cardIcon}>🛥️</div>
        <div style={sx.cardTitle}>Servicefartøy</div>
        <ul style={sx.cardList}>
          <li>Skipper</li>
          <li>Matros og dekksarbeid</li>
          <li>Kokekyndig / Lett proviant</li>
        </ul>
      </div>

      <div style={sx.cardService}>
        <div style={sx.cardIcon}>🐟</div>
        <div style={sx.cardTitle}>Havbruk</div>
        <ul style={sx.cardList}>
          <li>Operativt personell i anlegg</li>
          <li>Akvatekniker m/fagbrev</li>
          <li>Fôrings- og laseroperatører</li>
        </ul>
      </div>

      <div style={sx.cardService}>
        <div style={sx.cardIcon}>⚓</div>
        <div style={sx.cardTitle}>Fiskeri</div>
        <ul style={sx.cardList}>
          <li>Skipper/Styrmann</li>
          <li>Matros</li>
          <li>Midlertidig bemanning ved behov</li>
        </ul>
      </div>
    </div>
  </div>
</section>


      {/* HVORFOR VELGE BLUECREW */}
      <section id="fordeler" style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={sx.h2}>Hvorfor velge Bluecrew?</h2>
            <p style={sx.leadSmall}>
              Vi kombinerer sjøfolkets erfaring med moderne bemanningsprosesser for å levere kvalitet fra første kontakt.
            </p>
          </div>

          <div style={sx.featureGrid}>
            {BENEFITS.map((benefit) => (
              <article key={benefit.title} style={sx.featureCard}>
                <div style={sx.featureIcon} aria-hidden="true">{benefit.icon}</div>
                <h3 style={sx.featureTitle}>{benefit.title}</h3>
                <p style={sx.featureText}>{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROSESS */}
      <section id="slik-jobber-vi" style={sx.section}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={sx.h2}>Slik jobber vi</h2>
            <p style={sx.muted}>Fire steg som sikrer trygg leveranse for både kandidat og kunde.</p>
          </div>

          <ol style={sx.processGrid}>
            {PROCESS_STEPS.map((step, index) => (
              <li key={step.title} style={sx.processStep}>
                <div style={sx.stepNumber}>{index + 1}</div>
                <div style={sx.stepBody}>
                  <h3 style={sx.stepTitle}>{step.title}</h3>
                  <p style={sx.stepText}>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>


      {/* KANDIDAT */}
      <section id="kandidat" style={sx.section}>
        <div style={sx.wrapNarrow}>
          <h2 style={sx.h2}>For kandidater</h2>
          <p style={sx.muted}>
            Legg inn kontaktinfo, velg fagområder og last opp CV (PDF). Vi kontakter deg når relevant oppdrag dukker opp.
          </p>

          {workerSent || sent === "worker" ? (
            <div style={sx.ok} role="status">Takk! Skjemaet er sendt inn.</div>
          ) : (
<form
  action="/api/submit-candidate"
  method="POST"
  encType="multipart/form-data"
  style={sx.form}
  noValidate
>
  {/* Kontaktinfo */}
  <Input label="Fullt navn" name="name" required />
  <Input label="E-post" name="email" type="email" required />
  <Input label="Telefon" name="phone" required />
  <Input label="Bosted (by/kommune)" name="city" required />

  {/* ØNSKET ARBEID – hovedkategorier først; åpne undervalg når man huker av */}
  <div style={{ gridColumn: "1 / -1" }}>
    <div style={{ fontWeight: 800, marginBottom: 8 }}>Ønsket arbeid</div>
    <div style={{ display: "grid", gap: 12 }}>
      {Object.keys(WORK).map((main) => {
        const open = !!openMain[main];
        const subs = WORK[main];
        return (
          <div key={main} style={{ border: "1px solid #E2E8F0", borderRadius: 12, padding: 12, background: "#fff" }}>
            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={open}
                onChange={() => toggleMain(main)}
              />
              <span style={{ fontWeight: 700 }}>{main}</span>
            </label>

            {open && (
              <div style={{ marginTop: 10 }}>
                <div style={sx.tags}>
                  {subs.map((sub) => (
                    sub === "Annet" ? (
                      <div key={sub} style={{ flex: 1, minWidth: 240 }}>
                        <label style={sx.label}>
                          <span>Annet (kort beskrivelse)</span>
                          <input
                            name={`other_${main}`}
                            placeholder="Skriv kort om ønsket arbeid"
                            value={otherText[main] || ""}
                            onChange={(e) =>
                              setOtherText((p) => ({ ...p, [main]: e.target.value }))
                            }
                            style={sx.input}
                          />
                        </label>
                      </div>
                    ) : (
                      <label key={sub} style={sx.tagItem}>
                        <input type="checkbox" name="work_main" value={`${main}:${sub}`} /> <span>{sub}</span>
                      </label>
                    )
                  ))}
                </div>
                <small style={{ color: "#64748b" }}>
                  Velg undervalg (eller fyll “Annet”). Du kan åpne flere hovedkategorier.
                </small>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>

  {/* STCW / DEKK – påkrevd “Har/Har ikke” */}
  <div style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
    {/* STCW */}
    <div>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>STCW – Grunnleggende sikkerhetskurs</div>
      <div style={sx.inlineRadios}>
        <label><input type="radio" name="stcw_has" value="ja" required onChange={() => setHasSTCW("ja")} /> Har</label>
        <label><input type="radio" name="stcw_has" value="nei" onChange={() => setHasSTCW("nei")} /> Har ikke</label>
      </div>
      {hasSTCW === "ja" && (
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 13, color: "#475569", marginBottom: 6 }}>Huk av relevante moduler</div>
          <div style={sx.checkGrid}>
            {STCW_MODULES.map((m) => (
              <label key={m} style={sx.checkItem}>
                <input type="checkbox" name="stcw_mod" value={m} /> <span>{m}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Dekksoffiser */}
    <div>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>Dekksoffiser-sertifikat</div>
      <div style={sx.inlineRadios}>
        <label><input type="radio" name="deck_has" value="ja" required onChange={() => setHasDeck("ja")} /> Har</label>
        <label><input type="radio" name="deck_has" value="nei" onChange={() => setHasDeck("nei")} /> Har ikke</label>
      </div>
      {hasDeck === "ja" && (
        <div style={{ marginTop: 8 }}>
          <Select
            label="Klasse"
            name="deck_class"
            options={["1","2","3","4","5","6"]}
            value={deckClass}
            onChange={setDeckClass}
            placeholder="Velg klasse (1–6)"
          />
          <small style={{ color: "#475569" }}>1 = høyeste, 6 = laveste (D6).</small>
        </div>
      )}
    </div>
  </div>

  {/* Tilgjengelighet / kompetanse */}
  <Input label="Tilgjengelig fra" name="available_from" type="date" />
  <Textarea label="Kompetanse/kurs (kort)" name="skills" rows={4} full />
  <Textarea label="Andre relevante sertifikater og kompetanse (valgfritt)" name="other_comp" rows={4} full />

  {/* CV + Sertifikater */}
  <FileInput label="CV (PDF, maks 10 MB)" name="cv" accept=".pdf" required />
  <FileInput label="Sertifikater (PDF/zip, valgfritt)" name="certs" accept=".pdf,.zip" />

  {/* GDPR + send */}
  <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 8 }}>
    <input id="gdpr" type="checkbox" required />
    <label htmlFor="gdpr" style={{ fontSize: 13, color: "#475569" }}>
      Jeg samtykker til behandling av persondata for bemanning/rekruttering.
    </label>
  </div>
  <div style={{ gridColumn: "1 / -1" }}>
    <button type="submit" style={sx.btnMain}>Send inn kandidatprofil</button>
  </div>
</form>

          )}
        </div>
      </section>

      {/* KUNDER */}
      <section id="kunde" style={{ ...sx.section, background: "#fff" }}>
        <div style={sx.wrapNarrow}>
          <h2 style={sx.h2}>For kunder</h2>
          <p style={sx.muted}>
            Beskriv behovet kort – vi matcher kvalifiserte kandidater etter kompetanse, tilgjengelighet og lokasjon.
          </p>

          {clientSent || sent === "client" ? (
            <div style={sx.ok} role="status">Takk! Forespørselen er sendt inn.</div>
          ) : (
           <form action="/api/submit-client" method="POST" style={sx.form} noValidate>
  <Input label="Selskap" name="company" required />
  <Input label="Kontaktperson" name="contact" required />
  <Input label="E-post" name="c_email" type="email" required />
  <Input label="Telefon" name="c_phone" required />
  <Input label="Lokasjon/område" name="location" />
  <Select label="Type behov" name="need_type" options={Object.keys(WORK)} />
  <Textarea label="Kort beskrivelse av oppdraget" name="desc" rows={4} full />
  <div style={{ gridColumn: "1 / -1" }}>
    <button type="submit" style={sx.btnMain}>Send forespørsel</button>
  </div>
</form>

          )}
        </div>
      </section>

{/* OM OSS */}
<section id="om-oss" style={{ ...sx.section, background: "#F8FAFC" }}>
  <div style={sx.wrapNarrow}>
    <h2 style={sx.h2}>Om Bluecrew</h2>
    <p style={sx.muted}>
      Bluecrew er et norsk bemannings- og rekrutteringsbyrå spesialisert innen maritim sektor.
      Vi leverer kvalifisert personell til havbruk, fiskeri og servicefartøy — fra dekk til bro.
    </p>

    <p style={sx.muted}>
      Selskapet drives av sjøfolk med erfaring fra norsk kystfart og oppdrettsnæring.
      Vi vet hva som kreves om bord, og vi vet hvor viktig det er med rett kompetanse til rett tid.
    </p>

    <p style={sx.muted}>
      Gjennom et tett samarbeid med både mannskap og rederi sørger vi for kvalitet, trygghet og fleksibilitet i alle oppdrag.
      Våre prosesser er enkle, ryddige og tilpasset kravene i norsk maritim drift.
    </p>

    <div style={{ marginTop: 20, padding: 18, borderLeft: "4px solid #0B1F3A", background: "#fff", borderRadius: 8 }}>
      <p style={{ margin: 0, fontSize: 15, color: "#0B1F3A" }}>
        <strong>Rett Kompetanse, På Rett Sted, Til Rett Tid.</strong> 
      </p>
    </div>
  </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={sx.section}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h2 style={sx.h2}>Vanlige spørsmål</h2>
            <p style={sx.muted}>Finner du ikke svaret her? Ta kontakt, så hjelper vi deg videre.</p>
          </div>

          <div style={sx.faqList}>
            {FAQS.map((faq) => (
              <details key={faq.q} style={sx.faqItem}>
                <summary style={sx.faqSummary}>{faq.q}</summary>
                <p style={sx.faqContent}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAKT */}
<section id="kontakt" style={{ ...sx.section, background: "#fff" }}>
  <div style={sx.wrapNarrow}>
    <h2 style={sx.h2}>Kontakt oss</h2>
    <p style={sx.muted}>Ta kontakt for forespørsel om bemanning, samarbeid eller andre henvendelser.</p>

    <div style={sx.contactGrid}>
      <div>
        <h3 style={sx.contactTitle}>Bluecrew</h3>
        <p style={sx.contactLine}><strong>E-post:</strong> <a href="mailto:isak@bluecrew.no" style={sx.contactLink}>isak@bluecrew.no</a></p>
        <p style={sx.contactLine}><strong>Telefon:</strong> <a href="tel:92328850" style={sx.contactLink}>923 28 850</a></p>
        <p style={sx.contactLine}><strong>Adresse:</strong> Tromsø, Norge</p>
      </div>

      <div>
        <h3 style={sx.contactTitle}>Juridisk informasjon</h3>
        <p style={sx.contactLine}>Didriksson Maritime Bemanning (ENK)</p>
        <p style={sx.contactLine}>Org.nr: 936 321 194</p>
        <p style={sx.contactLine}>Persondata behandles i henhold til GDPR.</p>
      </div>
    </div>

    <div style={sx.privacyBox}>
      <p style={{ margin: 0, fontSize: 14 }}>
        Alle personopplysninger lagres sikkert og brukes kun i forbindelse med rekruttering og bemanning.
        Dokumenter deles ikke med tredjepart uten samtykke.
      </p>
    </div>
  </div>
</section>



      {/* FOOTER */}
      <footer style={sx.footer}>
        <div style={sx.wrapNarrow}>© {year} Bluecrew — Bemanning til sjøs</div>
      </footer>
    </main>
  );
}

/* ———— ENKEL LOGO-SVG ———— */
function Logo({ size = 28 }: { size?: number }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 64 64" role="img" aria-label="Bluecrew logo" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="#0B1F3A" />
      <path d="M10 36c6 0 9-6 16-6s10 6 16 6 10-6 12-6" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      <path d="M10 44c6 0 9-6 16-6s10 6 16 6 10-6 12-6" fill="none" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* ———— HJELPEKOMPONENTER ———— */
function Input({
  label, name, type = "text", required, error,
}: { label: string; name: string; type?: string; required?: boolean; error?: string; }) {
  const id = `${name}-id`;
  const errId = `${name}-err`;
  return (
    <label style={sx.label} htmlFor={id}>
      <span>{label}{required ? " *" : ""}</span>
      <input id={id} name={name} type={type} required={required} aria-invalid={!!error} aria-describedby={error ? errId : undefined} style={{ ...sx.input, ...(error ? sx.inputErr : null) }} />
      {error ? <div id={errId} style={sx.errText} role="alert">{error}</div> : null}
    </label>
  );
}

function Textarea({ label, name, rows = 4, full = false }: { label: string; name: string; rows?: number; full?: boolean; }) {
  const id = `${name}-id`;
  return (
    <label style={{ ...sx.label, gridColumn: full ? "1 / -1" : undefined }} htmlFor={id}>
      <span>{label}</span>
      <textarea id={id} name={name} rows={rows} style={{ ...sx.input, height: rows * 24 }} />
    </label>
  );
}

function Select({
  label, name, options = [] as string[], value, onChange, placeholder, disabled, error,
}: {
  label: string; name: string; options?: string[]; value?: string; onChange?: (v: string) => void;
  placeholder?: string; disabled?: boolean; error?: string;
}) {
  const id = `${name}-id`;
  const errId = `${name}-err`;
  return (
    <label style={sx.label} htmlFor={id}>
      <span>{label}</span>
      <select
        id={id}
        name={name}
        value={value ?? ""}
        onChange={(e) => (onChange ? onChange(e.target.value) : undefined)}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        style={{ ...sx.input, opacity: disabled ? 0.6 : 1, ...(error ? sx.inputErr : null) }}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((op) => <option key={op} value={op}>{op}</option>)}
      </select>
      {error ? <div id={errId} style={sx.errText} role="alert">{error}</div> : null}
    </label>
  );
}

function FileInput({
  label, name, accept, error, required,
}: { label: string; name: string; accept?: string; error?: string; required?: boolean; }) {
  const id = `${name}-id`;
  const errId = `${name}-err`;
  return (
    <label style={sx.label} htmlFor={id}>
      <span>{label}{required ? " *" : ""}</span>
      <input
        id={id}
        name={name}
        type="file"
        accept={accept}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        style={sx.input}
      />
      {error ? <div id={errId} style={sx.errText} role="alert">{error}</div> : null}
    </label>
  );
}

/* ———— Data ———— */
const STCW_MODULES = [
  "Sjøoverlevelse (PST)",
  "Brannvern (FPFF)",
  "Førstehjelp (EFA)",
  "PSSR",
];

const BENEFITS = [
  {
    icon: "🧭",
    title: "Bransjeerfaring",
    text: "Teamet ledes av sjøfolk som kjenner norsk kystfart, havbruk og fiskeri fra innsiden.",
  },
  {
    icon: "⚙️",
    title: "Fleksible leveranser",
    text: "Vi håndterer alt fra korttidsoppdrag til helbemanning av fartøy – med fokus på tempo og kvalitet.",
  },
  {
    icon: "🛡️",
    title: "Kvalitet & HMS",
    text: "Grundig verifisering av kompetanse og sertifikater sikrer trygghet for både mannskap og rederi.",
  },
];

const PROCESS_STEPS = [
  {
    title: "Behovsanalyse",
    text: "Vi kartlegger bemanningsbehov, krav til sertifikater og ønsket oppstart i dialog med deg.",
  },
  {
    title: "Screening og verifisering",
    text: "Kandidater intervjuers, referansesjekkes og sertifikater kontrolleres før de presenteres.",
  },
  {
    title: "Match & presentasjon",
    text: "Du får et kortfattet kandidatoppsett med tilgjengelighet, erfaring og nøkkelkompetanse.",
  },
  {
    title: "Oppfølging om bord",
    text: "Vi følger opp begge parter underveis og justerer ved behov for å sikre smidige leveranser.",
  },
];

const FAQS = [
  {
    q: "Hvordan registrerer jeg meg som kandidat?",
    a: "Bruk skjemaet under «For kandidater» og last opp CVen din. Vi tar kontakt når vi har et oppdrag som passer profilen din.",
  },
  {
    q: "Hvor raskt kan dere levere personell?",
    a: "Mye av mannskapet vårt er klart på kort varsel. Vi kan ofte levere innen få dager, avhengig av sertifikatkrav og lokasjon.",
  },
  {
    q: "Hvilke typer kontrakter tilbyr dere?",
    a: "Vi håndterer både midlertidige oppdrag, sesongbemanning og lengre engasjement etter behov.",
  },
  {
    q: "Hvordan ivaretas personvern?",
    a: "Alle søknader lagres sikkert og deles ikke med tredjepart uten samtykke. Se også avsnittet om personvern nederst på siden.",
  },
];


/* ———— STILER ———— */

const sx: Record<string, React.CSSProperties> = {
  page: {
    background: "#F1F5F9",
    minHeight: "100vh",
  },
  topbar: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: "#0B1F3A",
    color: "#fff",
    borderBottom: "1px solid rgba(255,255,255,.12)",
    boxShadow: "0 8px 30px rgba(11,31,58,.12)",
  },
  wrap: { maxWidth: 1120, margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", gap: 16 },
  logoBox: { display: "grid" },
  logoText: { fontWeight: 900, letterSpacing: "-0.02em" },
  logoTag: { fontSize: 12, opacity: 0.85 },
  nav: { display: "flex", gap: 18, marginLeft: "auto" },
  navLink: { color: "rgba(255,255,255,.9)", textDecoration: "none", fontSize: 14, fontWeight: 600 },

  cards3: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 24,
  alignItems: "stretch",
},
cardService: {
  background: "#F8FAFC",
  border: "1px solid #E2E8F0",
  borderRadius: 16,
  padding: 24,
  boxShadow: "0 4px 18px rgba(2,6,23,0.04)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  textAlign: "left",
  transition: "transform .2s ease, box-shadow .2s ease",
  cursor: "default",
},
cardServiceHover: {
  transform: "translateY(-4px)",
  boxShadow: "0 8px 24px rgba(2,6,23,0.08)",
},
cardIcon: { fontSize: 32, marginBottom: 8 },
cardTitle: {
  fontWeight: 800,
  fontSize: 20,
  color: "#0B1F3A",
  marginBottom: 8,
},
cardList: { margin: 0, paddingLeft: 18, lineHeight: 1.6, color: "#334155" },
leadSmall: {
  fontSize: 17,
  color: "#475569",
  marginTop: 8,
},
sectionAlt: { padding: "40px 0", background: "#EEF2F7" },

featureGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 20,
},
featureCard: {
  background: "#fff",
  border: "1px solid #E2E8F0",
  borderRadius: 16,
  padding: 22,
  boxShadow: "0 6px 20px rgba(2,6,23,0.06)",
  display: "grid",
  gap: 10,
  textAlign: "left",
},
featureIcon: { fontSize: 28 },
featureTitle: { fontSize: 18, fontWeight: 800, color: "#0B1F3A", margin: 0 },
featureText: { margin: 0, fontSize: 15, color: "#334155", lineHeight: 1.6 },

processGrid: {
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 18,
},
processStep: {
  background: "#fff",
  border: "1px solid #E2E8F0",
  borderRadius: 16,
  padding: 22,
  display: "flex",
  alignItems: "flex-start",
  gap: 16,
  boxShadow: "0 8px 24px rgba(2,6,23,0.06)",
},
stepNumber: {
  width: 36,
  height: 36,
  borderRadius: "999px",
  background: "#0B1F3A",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 800,
  fontSize: 16,
},
stepBody: { display: "grid", gap: 6 },
stepTitle: { margin: 0, fontSize: 17, fontWeight: 700, color: "#0B1F3A" },
stepText: { margin: 0, fontSize: 15, color: "#334155", lineHeight: 1.6 },

faqList: { display: "grid", gap: 12 },
faqItem: {
  border: "1px solid #E2E8F0",
  borderRadius: 14,
  background: "#fff",
  padding: 0,
  overflow: "hidden",
  boxShadow: "0 4px 16px rgba(2,6,23,0.05)",
},
faqSummary: {
  padding: "16px 20px",
  listStyle: "none",
  cursor: "pointer",
  fontWeight: 700,
  color: "#0B1F3A",
  outline: "none",
},
faqContent: {
  margin: 0,
  padding: "0 20px 18px",
  fontSize: 15,
  color: "#334155",
  lineHeight: 1.6,
},

contactGrid: {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 24,
  marginTop: 20,
},
contactTitle: {
  fontWeight: 800,
  color: "#0B1F3A",
  marginBottom: 8,
  fontSize: 17,
},
contactLine: { margin: "4px 0", fontSize: 15, color: "#334155" },
contactLink: { color: "#0B1F3A", textDecoration: "none" },
privacyBox: {
  marginTop: 28,
  background: "#F8FAFC",
  border: "1px solid #E2E8F0",
  borderRadius: 12,
  padding: 16,
  color: "#475569",
},



  /* HERO */
  hero: {
    padding: "120px 0 80px",
    background: "linear-gradient(135deg, #0B1F3A 0%, #1E3A8A 100%)",
    color: "#fff",
  },
  heroWrap: {
    width: "min(1100px, 92vw)",
    margin: "0 auto",
    display: "grid",
    gap: 32,
  },
  heroPill: {
    display: "inline-flex",
    padding: "6px 14px",
    borderRadius: 999,
    background: "rgba(15, 23, 42, 0.55)",
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
  },
  heroTitle: {
    fontSize: 56,
    fontWeight: 800,
    lineHeight: 1.05,
    maxWidth: 680,
  },
  heroLead: {
    fontSize: 20,
    lineHeight: 1.6,
    color: "rgba(226, 232, 240, 0.9)",
    maxWidth: 600,
  },
  heroCtas: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 16,
  },
  heroBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "14px 26px",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 16,
    textDecoration: "none",
  },
  btnPrimary: {
    background: "#fff",
    color: "#0B1F3A",
  },
  btnSecondary: {
    background: "rgba(15, 23, 42, 0.35)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.35)",
  },
  section: {
    padding: "80px 0",
  },
  wrap: {
    width: "min(1100px, 92vw)",
    margin: "0 auto",
    display: "grid",
    gap: 36,
  },
  sectionHeader: {
    display: "grid",
    gap: 12,
    maxWidth: 720,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: 800,
    color: "#0F172A",
  },
  sectionLead: {
    fontSize: 18,
    color: "#475569",
    lineHeight: 1.7,
  },
  cardGrid: {
    display: "grid",
    gap: 20,
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  },
  card: {
    background: "#fff",
    borderRadius: 18,
    padding: 24,
    border: "1px solid #E2E8F0",
    display: "grid",
    gap: 16,
  },
  cardIcon: {
    fontSize: 28,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0B1F3A",
  },
  cardText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 1.6,
  },
  focusSection: {
    background: "#0B1F3A",
    color: "#E2E8F0",
  },
  focusCard: {
    background: "rgba(15, 23, 42, 0.55)",
    border: "1px solid rgba(148, 163, 184, 0.25)",
    color: "#E2E8F0",
  },
  focusText: {
    color: "rgba(226,232,240,0.75)",
  },
  steps: {
    counterReset: "steps" as const,
    display: "grid",
    gap: 18,
  },
  step: {
    display: "grid",
    gap: 10,
    padding: 20,
    borderRadius: 16,
    background: "#fff",
    border: "1px solid #E2E8F0",
  },
  stepNumber: {
    fontSize: 32,
    fontWeight: 800,
    color: "#1D4ED8",
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0F172A",
  },
  stepText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 1.6,
  },
  splitSection: {
    display: "grid",
    gap: 24,
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  },
  splitCard: {
    background: "#fff",
    borderRadius: 20,
    padding: 24,
    border: "1px solid #E2E8F0",
    display: "grid",
    gap: 12,
  },
  link: {
    color: "#1D4ED8",
    fontWeight: 600,
    textDecoration: "none",
  },
  contactGrid: {
    display: "grid",
    gap: 24,
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  },
  contactCard: {
    background: "#fff",
    borderRadius: 18,
    padding: 24,
    border: "1px solid #E2E8F0",
    display: "grid",
    gap: 12,
  },
};

const SERVICES = [
  {
    icon: "🛥️",
    title: "Servicefartøy",
    text: "Bemanning til fartøy i havbruk og service, fra skipper og styrmann til matros og kokekyndig personell.",
  },
  {
    icon: "🐟",
    title: "Havbruk",
    text: "Operativt personell, akvateknikere, fôrings- og laseroperatører med erfaring fra norsk oppdrett.",
  },
  {
    icon: "⚓",
    title: "Fiskeri",
    text: "Rask tilgang på mannskap til kyst- og havgående fartøy, korttidsoppdrag og sesongtopper.",
  },
];

const VALUE_PROPS = [
  {
    icon: "🧭",
    title: "Fagfolk som forstår sjøen",
    text: "Bluecrew drives av sjøfolk. Vi vet hvilke sertifikater, rutiner og holdninger som trengs om bord.",
  },
  {
    icon: "⚙️",
    title: "Skalerbar bemanning",
    text: "Alt fra enkeltoppdrag til komplette rotasjoner. Vi bygger vaktplaner og følger opp gjennom hele leveransen.",
  },
  {
    icon: "🤝",
    title: "Langsiktige partnerskap",
    text: "Vi setter oss inn i fartøy, prosedyrer og kultur slik at hvert oppdrag bygger videre på forrige suksess.",
  },
];

const SAFETY_ITEMS = [
  {
    icon: "📋",
    title: "Kvalitetssikrede sertifikater",
    text: "STCW, helseerklæring og kurs kontrolleres før utsendelse. Dokumentasjon følger kandidaten til rederiet.",
  },
  {
    icon: "🛰️",
    title: "Kontinuerlig oppfølging",
    text: "Digitale vaktplaner og rapportering sikrer at bemanningen tilpasses endringer i drift og vær.",
  },
  {
    icon: "🛡️",
    title: "HMS i fokus",
    text: "Vi følger norske krav og sørger for at alle oppdrag ivaretar sikkerhet, miljø og kvalitet.",
  },
];

const PROCESS = [
  {
    title: "Behovsavklaring",
    text: "Vi kartlegger fartøy, arbeidsoppgaver og varighet slik at leveransen treffer på både kompetanse og personlighet.",
  },
  {
    title: "Screening og dokumentasjon",
    text: "Kandidater forhåndsvurderes, og vi innhenter sertifikater og referanser før vi presenterer forslag.",
  },
  {
    title: "Oppstart og oppfølging",
    text: "Vi koordinerer oppstart, sørger for onboarding og følger opp både kunde og mannskap underveis.",
  },
];

const NEXT_STEPS = [
  {
    title: "Registrer kandidat",
    text: "Legg inn erfaring, kurs og tilgjengelighet. Vi tar kontakt når passende oppdrag dukker opp.",
    href: "/kandidat",
  },
  {
    title: "Meld inn bemanningsbehov",
    text: "Fortell oss om fartøyet, tidsrommet og oppgavene – så matcher vi aktuelle kandidater.",
    href: "/bemanningsbehov",
  },
  {
    title: "Book en rådgiver",
    text: "Vil du diskutere bemanningsplaner eller langtidssamarbeid? Avtal en prat med oss.",
    href: "mailto:isak@bluecrew.no",
  },
];

export default function HomePage() {
  return (
    <div style={styles.page}>
      <SiteHeader />
      <main>
        <section style={styles.hero}>
          <div style={styles.heroWrap}>
            <span style={styles.heroPill}>Bemanning • Havbruk • Fiskeri • Servicefartøy</span>
            <h1 style={styles.heroTitle}>Rett mannskap til havbruk, fiskeri og servicefartøy</h1>
            <p style={styles.heroLead}>
              Bluecrew AS leverer sertifisert mannskap med maritim erfaring. Vi kombinerer lokal tilstedeværelse i Harstad
              med raske leveranser langs hele kysten.
            </p>
            <div style={styles.heroCtas}>
              <Link href="/kandidat" style={{ ...styles.heroBtn, ...styles.btnPrimary }}>
                Registrer kandidat
              </Link>
              <Link href="/bemanningsbehov" style={{ ...styles.heroBtn, ...styles.btnSecondary }}>
                Meld inn behov
              </Link>
            </div>
          </div>
        </section>

        <section id="tjenester" style={styles.section}>
          <div style={styles.wrap}>
            <header style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Vi bemanner hele den maritime verdikjeden</h2>
              <p style={styles.sectionLead}>
                Fra oppdrettsanlegg til servicefartøy og fiskeri. Vi kjenner bransjen, sertifikatkravene og tempoet som kreves
                for å holde driften i gang.
              </p>
            </header>
            <div style={styles.cardGrid}>
              {SERVICES.map((service) => (
                <article key={service.title} style={styles.card}>
                  <div style={styles.cardIcon}>{service.icon}</div>
                  <h3 style={styles.cardTitle}>{service.title}</h3>
                  <p style={styles.cardText}>{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="fordeler" style={{ ...styles.section, background: "#fff" }}>
          <div style={styles.wrap}>
            <header style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Hvorfor velge Bluecrew?</h2>
              <p style={styles.sectionLead}>
                Et spesialisert team av sjøfolk, rådgivere og koordinatorer som bygger langvarige samarbeid og leverer kvalitet
                i hvert oppdrag.
              </p>
            </header>
            <div style={styles.cardGrid}>
              {VALUE_PROPS.map((item) => (
                <article key={item.title} style={styles.card}>
                  <div style={styles.cardIcon}>{item.icon}</div>
                  <h3 style={styles.cardTitle}>{item.title}</h3>
                  <p style={styles.cardText}>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="trygghet" style={{ ...styles.section, ...styles.focusSection }}>
          <div style={styles.wrap}>
            <header style={styles.sectionHeader}>
              <h2 style={{ ...styles.sectionTitle, color: "#fff" }}>Trygghet i hver leveranse</h2>
              <p style={{ ...styles.sectionLead, ...styles.focusText }}>
                Sertifiseringer, HMS og oppfølging er grunnlaget for hvert oppdrag. Vi tar ansvar for dokumentasjon og kvalitet
                før, under og etter utsendelse.
              </p>
            </header>
            <div style={styles.cardGrid}>
              {SAFETY_ITEMS.map((item) => (
                <article key={item.title} style={{ ...styles.card, ...styles.focusCard }}>
                  <div style={styles.cardIcon}>{item.icon}</div>
                  <h3 style={{ ...styles.cardTitle, color: "#fff" }}>{item.title}</h3>
                  <p style={{ ...styles.cardText, ...styles.focusText }}>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ ...styles.section, background: "#fff" }}>
          <div style={styles.wrap}>
            <header style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Slik jobber vi</h2>
              <p style={styles.sectionLead}>
                En strukturert prosess som gjør samarbeidet sømløst, enten du trenger enkeltvikarer eller komplett bemanning.
              </p>
            </header>
            <div style={styles.steps}>
              {PROCESS.map((step, index) => (
                <article key={step.title} style={styles.step}>
                  <div style={styles.stepNumber}>{index + 1}</div>
                  <div>
                    <h3 style={styles.stepTitle}>{step.title}</h3>
                    <p style={styles.stepText}>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.wrap}>
            <header style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Neste steg</h2>
              <p style={styles.sectionLead}>
                Velg hvordan du vil komme i gang. Vi følger opp innen kort tid når du sender inn skjema eller booker samtale.
              </p>
            </header>
            <div style={styles.splitSection}>
              {NEXT_STEPS.map((item) => (
                <article key={item.title} style={styles.splitCard}>
                  <h3 style={styles.cardTitle}>{item.title}</h3>
                  <p style={styles.cardText}>{item.text}</p>
                  {item.href.startsWith("mailto:") ? (
                    <a href={item.href} style={styles.link}>
                      Send e-post
                    </a>
                  ) : (
                    <Link href={item.href} style={styles.link}>
                      Gå til siden
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="kontakt" style={{ ...styles.section, background: "#fff" }}>
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
