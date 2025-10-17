"use client";

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
  const DELIVERY_CARDS = [
    {
      icon: "🌊",
      title: "Hvorfor velge Bluecrew?",
      points: [
        "Bemanning som forstår drift og hverdag om bord",
        "Mannskap med relevant erfaring fra havbruk, fiskeri og servicefartøy",
        "Norsk leverandør som følger opp både kandidat og rederi",
      ],
    },
    {
      icon: "🛡️",
      title: "Trygghet i hver leveranse",
      points: [
        "Sertifikater og referanser kvalitetssikres før utsending",
        "Vi avklarer forventninger og sikkerhetskrav med alle parter",
        "Åpen kommunikasjon gjennom hele oppdraget",
      ],
    },
    {
      icon: "⚙️",
      title: "Slik jobber vi",
      points: [
        "Kartlegger behovet ditt – både kompetanse og kultur",
        "Matcher aktuelle kandidater og koordinerer tilgjengelighet",
        "Følger opp underveis for å sikre en leveranse som fungerer",
      ],
    },
  ];

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
              <div style={sx.logoTag}>Bemanning til sjøs</div>
            </div>
          </a>
          <nav style={sx.nav} aria-label="Hovedmeny">
            <a href="#kandidat" style={sx.navLink}>Kandidat</a>
            <a href="#kunde" style={sx.navLink}>Kunde</a>
            <a href="#leveranse" style={sx.navLink}>Leveranse</a>
            <a href="#om-bluecrew" style={sx.navLink}>Om oss</a>
            <a href="#kontakt" style={sx.navLink}>Kontakt</a>
          </nav>
        </div>
      </header>

      {/* HERO (oppgradert) */}
      <section style={sx.hero}>
        <div style={sx.heroWrap}>
          <div style={sx.heroPill}>Maritim bemanning til havbruk, fiskeri og servicefartøy</div>
          <h1 style={sx.h1}>Bluecrew – Bemanning til sjøs</h1>
          <p style={sx.h1Sub}>Rett kompetanse. På rett sted. Til rett tid.</p>
          <p style={sx.heroIntro}>
            Bluecrew leverer kvalifisert mannskap til havbruksnæringen, fiskeri og servicefartøy. Vi kjenner sjøen,
            skiftene og menneskene som får drifta til å gå rundt — fordi vi selv har vært der.
          </p>
          <div style={sx.ctaRow}>
            <a href="#kandidat" style={sx.btnMain}>Registrer kandidat</a>
            <a href="#kunde" style={sx.btnMainSecondary}>Meld inn bemanningsbehov</a>
          </div>
          <ul style={sx.badges}>
            <li style={sx.badge}><span style={sx.badgeIcon}>⚓️</span> Vi bemanner for drift, ikke bare vaktlister</li>
            <li style={sx.badge}><span style={sx.badgeIcon}>🧑‍✈️</span> Personell med praktisk erfaring fra sjøen</li>
            <li style={sx.badge}><span style={sx.badgeIcon}>🤝</span> Ryddige avtaler og tett oppfølging</li>
          </ul>
        </div>
      </section>

      {/* TJENESTER – tre pene kort */}
      <section style={{ ...sx.section, background: "#fff" }}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={sx.h2}>Bemanning vi leverer</h2>
            <p style={sx.leadSmall}>
              Skreddersydd maritim arbeidskraft til havbruk, fiskeri og servicefartøy – klare for innsats når du trenger det.
            </p>
          </div>

          <div style={sx.cards3}>
            <div style={sx.cardService}>
              <div style={sx.cardIcon}>🛥️</div>
              <div style={sx.cardTitle}>Servicefartøy</div>
              <ul style={sx.cardList}>
                <li>Skippere og styrmenn</li>
                <li>Matroser og dekksarbeid</li>
                <li>Logistikk og støttefunksjoner</li>
              </ul>
            </div>

            <div style={sx.cardService}>
              <div style={sx.cardIcon}>🐟</div>
              <div style={sx.cardTitle}>Havbruk</div>
              <ul style={sx.cardList}>
                <li>Operativt personell på merdkanten</li>
                <li>Akvateknikere og laseroperatører</li>
                <li>Riggerteam ved prosjekt og service</li>
              </ul>
            </div>

            <div style={sx.cardService}>
              <div style={sx.cardIcon}>⚓</div>
              <div style={sx.cardTitle}>Fiskeri</div>
              <ul style={sx.cardList}>
                <li>Skippere og nøkkelpersonell på bro</li>
                <li>Erfarne mannskaper på dekk</li>
                <li>Sesong- og beredskapsbemanning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="leveranse" style={{ ...sx.section, background: "#F1F5F9" }}>
        <div style={sx.wrapNarrow}>
          <h2 style={sx.h2}>Leveranse med sjøforståelse</h2>
          <p style={sx.muted}>
            Vi kombinerer praktisk erfaring og tett oppfølging med en effektiv prosess. Resultatet er mannskap som passer inn
            fra første vakt.
          </p>
          <div style={sx.cards3}>
            {DELIVERY_CARDS.map((card) => (
              <div key={card.title} style={sx.cardInfo}>
                <div style={sx.cardIcon}>{card.icon}</div>
                <div style={sx.cardTitle}>{card.title}</div>
                <ul style={sx.cardList}>
                  {card.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
      <section id="om-bluecrew" style={{ ...sx.section, background: "#F8FAFC" }}>
        <div style={sx.wrapNarrow}>
          <h2 style={sx.h2}>Om Bluecrew</h2>
          <p style={sx.muted}>
            Bluecrew er et norsk bemannings- og rekrutteringsselskap for maritim næring. Vi leverer mannskap til havbruksnæringen,
            fiskeri og servicefartøy – fra dekk til bro.
          </p>
          <p style={sx.muted}>
            Folkene våre kjenner sjøen, skiftene og maskinene fordi de selv har vært der. Derfor matcher vi kandidater etter
            holdninger, samarbeidsevne og praktisk erfaring – ikke bare kursbevis.
          </p>
          <p style={sx.muted}>
            Vi følger opp både kandidat og kunde gjennom hele oppdraget. Enkelt, ryddig og tilpasset kravene i maritim drift.
          </p>
          <div style={{ marginTop: 20, padding: 18, borderLeft: "4px solid #0B1F3A", background: "#fff", borderRadius: 8 }}>
            <p style={{ margin: 0, fontSize: 15, color: "#0B1F3A" }}>
              <strong>Rett kompetanse. På rett sted. Til rett tid.</strong>
            </p>
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
        <h3 style={sx.contactTitle}>Bluecrew AS</h3>
        <p style={sx.contactLine}><strong>E-post:</strong> <a href="mailto:isak@bluecrew.no" style={sx.contactLink}>isak@bluecrew.no</a></p>
        <p style={sx.contactLine}><strong>Telefon:</strong> <a href="tel:92328850" style={sx.contactLink}>923 28 850</a></p>
        <p style={sx.contactLine}><strong>Adresse:</strong> Østenbekkveien 43, 9403 Harstad</p>
      </div>

      <div>
        <h3 style={sx.contactTitle}>Juridisk informasjon</h3>
        <p style={sx.contactLine}>Bluecrew AS</p>
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
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B1F3A" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#logo-gradient)" />
      <path
        d="M18 18h9.5c6.1 0 10.1 3.3 10.1 7.7S33.6 33.5 27.5 33.5H18z"
        fill="#F8FAFC"
        opacity="0.95"
      />
      <rect x="18" y="18" width="7" height="28" rx="3.5" fill="#F8FAFC" />
      <path
        d="M18 34h10.3c6.3 0 10.3 3.6 10.3 8.5S34.3 51 28.1 51H18z"
        fill="#F8FAFC"
        opacity="0.9"
      />
      <path
        d="M37 32c0-7 5.1-11.5 11.7-11.5 3.6 0 6.3 0.9 8.7 2.6l-2.7 4.3c-1.6-1.1-3.2-1.7-5.1-1.7-3.6 0-6.1 2.6-6.1 6.4v9.2c0 3.8 2.5 6.4 6.1 6.4 1.9 0 3.8-0.6 5.3-1.8l2.6 4.4c-2.4 1.9-5.1 2.8-8.6 2.8C42.1 53 37 48.3 37 41.5z"
        fill="#F8FAFC"
      />
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


/* ———— STILER ———— */

const sx: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    background: "#F8FAFC",
    color: "#0F172A",
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
  cardInfo: {
    background: "#fff",
    border: "1px solid #CBD5E1",
    borderRadius: 18,
    padding: 24,
    boxShadow: "0 12px 28px rgba(15,23,42,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: 14,
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
    padding: "72px 0 48px",
    background: "linear-gradient(180deg, #F7FAFC 0%, #EEF2F7 35%, #F7FAFC 100%)",
    borderBottom: "1px solid #E5E7EB",
  },
  heroWrap: { maxWidth: 960, margin: "0 auto", padding: "0 20px", textAlign: "center" },
  heroPill: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: 999,
    background: "#0B1F3A",
    color: "#fff",
    fontSize: 12,
    letterSpacing: ".02em",
    marginBottom: 12,
  },
  h1: { fontSize: 44, fontWeight: 900, lineHeight: 1.1, margin: 0, color: "#0B1F3A", letterSpacing: "-0.02em" },
  h1Sub: {
    marginTop: 10,
    color: "#334155",
    fontSize: 20,
    fontWeight: 600,
    maxWidth: 720,
    marginLeft: "auto",
    marginRight: "auto",
  },
  heroIntro: {
    marginTop: 18,
    color: "#334155",
    fontSize: 17,
    lineHeight: 1.7,
    maxWidth: 760,
    marginLeft: "auto",
    marginRight: "auto",
  },
  lead: { marginTop: 12, color: "#374151", fontSize: 18 },
  ctaRow: { display: "flex", gap: 12, marginTop: 20, justifyContent: "center", flexWrap: "wrap" },
  btnMain: {
    padding: "14px 26px",
    borderRadius: 999,
    border: "none",
    background: "linear-gradient(135deg, #0B1F3A, #1D4ED8)",
    color: "#fff",
    fontWeight: 800,
    textDecoration: "none",
    boxShadow: "0 10px 22px rgba(11,31,58,0.25)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    display: "inline-block",
  },
  btnMainSecondary: {
    padding: "14px 26px",
    borderRadius: 999,
    border: "1px solid rgba(15, 23, 42, 0.2)",
    background: "#fff",
    color: "#0B1F3A",
    fontWeight: 700,
    textDecoration: "none",
    boxShadow: "0 8px 18px rgba(15,23,42,0.12)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    display: "inline-block",
  },

  badges: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0,1fr))",
    gap: 10,
    listStyle: "none",
    padding: 0,
    margin: "22px auto 0",
    maxWidth: 900,
  },
  badge: {
    background: "#fff",
    border: "1px solid #E2E8F0",
    color: "#0F172A",
    borderRadius: 12,
    padding: "10px 12px",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    boxShadow: "0 4px 14px rgba(2,6,23,0.06)",
  },
  badgeIcon: { fontSize: 16 },

  

  /* Seksjoner & skjemaer */
  section: { padding: "40px 0" },
  wrapNarrow: { maxWidth: 900, margin: "0 auto", padding: "0 20px" },
  h2: { fontSize: 28, fontWeight: 900, margin: 0, color: "#0B1F3A", letterSpacing: "-0.01em" },
  muted: { color: "#475569", marginTop: 8, fontSize: 16 },

  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
    background: "#fff",
    border: "1px solid #E2E8F0",
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    boxShadow: "0 8px 24px rgba(2,6,23,0.08)",
  },
  label: { display: "grid", gap: 6, fontSize: 14, color: "#0F172A" },
  input: { padding: "11px 13px", borderRadius: 12, border: "1px solid #CBD5E1", background: "#fff", outline: "none" },
  inputErr: { borderColor: "#ef4444", boxShadow: "0 0 0 3px rgba(239,68,68,0.15)" },
  errText: { color: "#b91c1c", fontSize: 12 },
  ok: { background: "#ecfdf5", color: "#065f46", border: "1px solid #a7f3d0", padding: 12, borderRadius: 12, marginTop: 12 },

  checkboxGrid: { display: "grid", gap: 12 },
  fieldset: { border: "1px solid #E2E8F0", borderRadius: 12, padding: 12, background: "#fff" },
  legend: { fontWeight: 700 },
  tags: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 },
  tagItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 10px",
    border: "1px solid #CBD5E1",
    borderRadius: 999,
    background: "#F8FAFC",
    fontSize: 14,
  },

  inlineRadios: { display: "flex", gap: 16, marginTop: 8 },
  checkGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 },
  checkItem: { display: "flex", alignItems: "center", gap: 8 },

  labelRow: { display: "grid", gap: 6 },
  kontakt: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 },
  privacy: { fontSize: 13, color: "#475569", marginTop: 12 },
  footer: { borderTop: "1px solid #E2E8F0", padding: "18px 0", background: "#fff", color: "#475569", fontSize: 14, marginTop: 12 },
};

