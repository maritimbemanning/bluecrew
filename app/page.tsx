"use client";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Bluecrew.no – forside (pusset)
 * - Moderne hero + tillitspiller
 * - Ryddig kandidat-skjema: vis bare hovedkategorier først; åpne undervalg når man haker av
 * - Kompakt STCW/Dekk uten store bokser
 * - E-post-ruter: /api/submit-candidate og /api/submit-client (allerede satt opp)
 */

export default function Page() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const searchParams = useSearchParams();
  const sent = searchParams.get("sent"); // "worker" eller "client"

  // (Valgfritt lokalt state – beholder for “demo-OK” ved manuell test)
  const workerSent = false;
const clientSent = false;


  // Epost validering (brukes kun hvis vi en dag går tilbake til JS-submit)
  const emailOk = (v: FormDataEntryValue | null) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").toLowerCase());

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
            <a href="#om" style={sx.navLink}>Om oss</a>
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
              <Input label="Fullt navn" name="name" required error={wErr.name} />
              <Input label="E-post" name="email" type="email" required error={wErr.email} />
              <Input label="Telefon" name="phone" required error={wErr.phone} />
              <Input label="Bosted (by/kommune)" name="city" required error={wErr.city} />

              {/* Tilgjengelighet / kompetanse */}
<Input label="Tilgjengelig fra" name="available_from" type="date" />


              {/* ØNSKET ARBEID – kun hovedkategorier synlig; åpne undervalg når man huker av */}
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
                            {/* Undervalg dukker opp først når hovedkategorien er valgt */}
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
                                    {/* NB: vi sender bare undervalgene til API via name="work_main" */}
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

          {/* KOMPAKT STCW / DEKK (obligatorisk valg) */}
<div style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
  {/* STCW – påkrevd Har/Har ikke */}
  <div>
    <div style={{ fontWeight: 700, marginBottom: 6 }}>STCW – Grunnleggende sikkerhetskurs</div>
    <div style={sx.inlineRadios}>
      {/* For at radio-gruppen skal være påkrevd: sett required på ÉN av inputene i gruppen */}
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

  {/* Dekksoffiser – påkrevd Har/Har ikke */}
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

{/* NY: Andre relevante sertifikater og kompetanse (fritekst) */}
<Textarea label="Andre relevante sertifikater og kompetanse (valgfritt)" name="other_comp" rows={4} full />


{/* CV + Sertifikater (CV obligatorisk) */}
<FileInput label="CV (PDF, maks 10 MB)" name="cv" accept=".pdf" required />
<FileInput label="Sertifikater + Søknad (PDF/zip, valgfritt)" name="certs" accept=".pdf,.zip" />

              {/* GDPR og Submit */}
              <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 8 }}>
                <input id="gdpr" type="checkbox" required />
                <label htmlFor="gdpr" style={{ fontSize: 13, color: "#475569" }}>
                  Jeg samtykker til behandling av persondata for bemanning/rekruttering.
                </label>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <button type="submit" style={sx.btn}>Send inn kandidatprofil</button>
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
              <Input label="Selskap" name="company" required error={cErr.company} />
              <Input label="Kontaktperson" name="contact" required error={cErr.contact} />
              <Input label="E-post" name="c_email" type="email" required error={cErr.c_email} />
              <Input label="Telefon" name="c_phone" required error={cErr.c_phone} />
              <Input label="Lokasjon/område" name="location" />
              <Select label="Type behov" name="need_type" options={Object.keys(WORK)} />
              <Textarea label="Kort beskrivelse av oppdraget" name="desc" rows={4} full />
              <div style={{ gridColumn: "1 / -1" }}>
                <button type="submit" style={sx.btn}>Send forespørsel</button>
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

function Info({ label, value }: { label: string; value: string }) {
  return <div><strong>{label}:</strong> {value}</div>;
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
    fontSize: 18,
    maxWidth: 720,
    marginLeft: "auto",
    marginRight: "auto",
  },
  lead: { marginTop: 12, color: "#374151", fontSize: 18 },
  ctaRow: { display: "flex", gap: 12, marginTop: 20, justifyContent: "center", flexWrap: "wrap" },
  btnMain: {
  padding: "14px 22px",
  borderRadius: 12,
  border: "1px solid #0B1F3A",
  background: "linear-gradient(180deg, #0B1F3A, #0A1B33)",
  color: "#fff",
  fontWeight: 800,
  textDecoration: "none",
  boxShadow: "0 8px 20px rgba(11,31,58,0.25)",
  transition: "all 0.2s ease",
  display: "inline-block",
},
btnMainHover: {
  background: "#152c57",
  boxShadow: "0 10px 24px rgba(11,31,58,0.35)",
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

