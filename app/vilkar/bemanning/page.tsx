import { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "../../components/SiteLayout";

export const metadata: Metadata = {
  title: "Arbeidsvilkår for bemanning og innleie",
  description:
    "Bluecrew AS leverer bemanning i henhold til Arbeidsmiljøloven Kap 14 og Bemanningsforskriften. Informasjon om likebehandling, forsikring og HMS-ansvar.",
  keywords: [
    "arbeidsvilkår bemanning",
    "innleie",
    "arbeidsmiljøloven",
    "bemanningsforetak",
    "likebehandling",
    "HMS-ansvar",
    "forsikring",
    "yrkesskadeforsikring",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

const ui = {
  hero: {
    position: "relative" as const,
    padding: "64px 0 32px",
    background: "linear-gradient(180deg, rgba(2,6,23,0.02), rgba(2,6,23,0))",
    overflow: "hidden" as const,
  },
  wrap: {
    width: "min(1100px, 92vw)",
    margin: "0 auto",
    padding: "0 8px",
  },
  h1: {
    fontSize: 36,
    lineHeight: 1.2,
    letterSpacing: ".01em",
    fontWeight: 800,
    color: "#0f172a",
    margin: 0,
  },
  lead: {
    marginTop: 12,
    fontSize: 18,
    lineHeight: 1.7,
    color: "#334155",
    maxWidth: 820,
  },
  section: { padding: "16px 0 64px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 16,
    marginTop: 28,
  },
  card: {
    background: "white",
    borderRadius: 16,
    padding: 22,
    border: "1px solid rgba(2,6,23,0.06)",
    boxShadow: "0 8px 24px rgba(2,6,23,0.06)",
  },
  h2: {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: ".02em",
    color: "#0f172a",
    marginTop: 0,
    marginBottom: 8,
  },
  p: {
    margin: "8px 0 0 0",
    color: "#334155",
    fontSize: 15.5,
    lineHeight: 1.8,
  },
  ul: {
    margin: "10px 0 0 0",
    paddingLeft: 20,
    lineHeight: 1.8,
    color: "#334155",
    fontSize: 15.5,
  },
  a: {
    color: "#007eb6",
    textDecoration: "none",
    borderBottom: "1px dashed rgba(14,165,233,0.35)",
  },
  badgeRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap" as const,
    marginTop: 10,
  },
  badge: {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(2,6,23,0.05)",
    color: "#0f172a",
    border: "1px solid rgba(2,6,23,0.08)",
  },
  footer: { marginTop: 22, fontSize: 13, color: "#475569" },
  "@media(min-width: 960px)": { grid: { gridTemplateColumns: "1fr 1fr" } },
};

export default function BemanningTermsPage() {
  return (
    <SiteLayout active="personvern">
      <header style={ui.hero}>
        <div style={ui.wrap}>
          <h1 style={ui.h1}>Arbeidsvilkår for bemanning og innleie</h1>
          <p style={ui.lead}>
            Bluecrew AS leverer bemanning i henhold til Arbeidsmiljøloven Kap 14 og Bemanningsforskriften. Her finner du
            informasjon om arbeidsgivers ansvar, likebehandling, forsikring og HMS.
          </p>
          <div style={ui.badgeRow}>
            <span style={ui.badge}>Oppdatert: 29. oktober 2025</span>
            <span style={ui.badge}>Gjelder: Innleie og vikarbruk</span>
            <span style={ui.badge}>Kontakt: isak@bluecrew.no</span>
          </div>
        </div>
      </header>

      <main style={ui.section}>
        <div
          style={{
            ...ui.wrap,
          }}
        >
          <div
            style={{
              ...ui.grid,
              ...(typeof window !== "undefined" && window.innerWidth >= 960
                ? ui["@media(min-width: 960px)"].grid
                : {}),
            }}
          >
            <section style={ui.card}>
              <h2 style={ui.h2}>Lovgrunnlag</h2>
              <p style={ui.p}>
                Bluecrew AS er et bemanningsforetak som driver innleie og formidling av maritime fagarbeidere i henhold til:
              </p>
              <ul style={ui.ul}>
                <li>
                  <strong>Arbeidsmiljøloven (AML) Kapittel 14</strong> (§§ 14-12 til 14-18) – Innleie og formidling av
                  arbeidstakere
                </li>
                <li>
                  <strong>Bemanningsforskriften</strong> (FOR-2013-04-26-405)
                </li>
                <li>
                  <strong>EU Bemanningsdirektiv 2008/104/EF</strong> (implementert i norsk lov)
                </li>
                <li>
                  <strong>ILO Maritime Labour Convention (MLC 2006)</strong> – for maritime oppdrag
                </li>
              </ul>
              <p style={ui.p}>
                Arbeidstilsynet fører tilsyn med at bemanningsforetak følger regelverket. Les mer på{" "}
                <a href="https://www.arbeidstilsynet.no/tema/innleie/" style={ui.a} target="_blank" rel="noopener noreferrer">
                  Arbeidstilsynet.no
                </a>
                .
              </p>
            </section>

            <section style={ui.card}>
              <h2 style={ui.h2}>Arbeidsgivers ansvar</h2>
              <ul style={ui.ul}>
                <li>
                  <strong>Bluecrew AS er arbeidsgiver</strong> for innleid personell (vikar eller midlertidig ansettelse).
                  Vi står ansvarlig for lønnsutbetaling, feriepenger, arbeidsgiveravgift og pensjon.
                </li>
                <li>
                  <strong>Innleiekunde har HMS-ansvar</strong> på arbeidsstedet i henhold til AML § 14-12c. Dette omfatter
                  opplæring, sikkerhetsutstyr, risikovurdering og oppfølging av arbeidsmiljøet.
                </li>
                <li>
                  <strong>Delt ansvar:</strong> Bluecrew følger opp kandidaten administrativt og kontraktsmessig, mens
                  innleiekunde har det operative ansvaret for arbeidet som utføres.
                </li>
              </ul>
            </section>

            <section style={ui.card}>
              <h2 style={ui.h2}>Likebehandlingsprinsippet (AML § 14-12a)</h2>
              <p style={ui.p}>
                Innleid arbeidstaker har rett til <strong>minst like gode arbeidsvilkår</strong> som innleiekundebedriftens
                egne ansatte med sammenlignbart arbeid. Dette gjelder:
              </p>
              <ul style={ui.ul}>
                <li>Lønn (grunnlønn, tillegg, overtid)</li>
                <li>Arbeidstid (daglig/ukentlig arbeidstid, pauser)</li>
                <li>Ferie og ferietillegg</li>
                <li>Andre ytelser som følger av tariffavtale eller bedriftens praksis</li>
              </ul>
              <p style={ui.p}>
                Bluecrew sikrer at lønns- og arbeidsvilkår er i tråd med gjeldende tariffavtaler og kundebedriftens standard.
                Ved uenighet kan saken tas opp med tillitsvalgte eller Arbeidstilsynet.
              </p>
            </section>

            <section style={ui.card}>
              <h2 style={ui.h2}>Forsikring og erstatningsansvar</h2>
              <ul style={ui.ul}>
                <li>
                  <strong>Yrkesskadeforsikring:</strong> Bluecrew har yrkesskadeforsikring som dekker alle våre ansatte ved
                  arbeidsulykker og yrkesskader. Dette er lovpålagt i henhold til yrkesskadeforsikringsloven.
                </li>
                <li>
                  <strong>Ansvarsforsikring:</strong> Vi har ansvarsforsikring som dekker skader påført tredjeperson eller
                  eiendom i forbindelse med arbeidet våre ansatte utfører.
                </li>
                <li>
                  <strong>Innleiekundes forsikring:</strong> Innleiekunde må ha egen bedriftsforsikring som dekker
                  HMS-risiko og erstatningsansvar på arbeidsstedet. Ved større skader eller uklare ansvarsforhold avklares
                  dette mellom forsikringsselskapene.
                </li>
              </ul>
              <p style={ui.p}>
                Kontakt oss på{" "}
                <a href="mailto:isak@bluecrew.no" style={ui.a}>
                  isak@bluecrew.no
                </a>{" "}
                for kopi av forsikringsbevis ved behov.
              </p>
            </section>

            <section style={ui.card}>
              <h2 style={ui.h2}>HMS-ansvar og opplæring</h2>
              <p style={ui.p}>
                Innleiekunde har <strong>fullt HMS-ansvar</strong> for innleid personell mens de er på kundens arbeidssted
                (AML § 14-12c). Dette innebærer:
              </p>
              <ul style={ui.ul}>
                <li>
                  <strong>Sikker arbeidsinnføring:</strong> Opplæring i arbeidsoppgaver, maskiner, verktøy og HMS-rutiner.
                </li>
                <li>
                  <strong>Risikovurdering:</strong> Kartlegging av farer og iverksetting av tiltak.
                </li>
                <li>
                  <strong>Verneutstyr:</strong> Tilgang til nødvendig personlig verneutstyr (hjelm, verneklær, etc.).
                </li>
                <li>
                  <strong>Tilsyn og oppfølging:</strong> Jevnlig oppfølging av arbeidsmiljøet og rapportering av hendelser.
                </li>
              </ul>
              <p style={ui.p}>
                Bluecrew forventer at innleiekunde gjennomfører nødvendig HMS-opplæring før arbeidet starter. Ved maritime
                oppdrag skal sertifikater (STCW, helseattest) være verifisert før ombordstigning.
              </p>
            </section>

            <section style={ui.card}>
              <h2 style={ui.h2}>Oppsigelse og varighet</h2>
              <ul style={ui.ul}>
                <li>
                  <strong>Arbeidskontrakt:</strong> Innleie reguleres av arbeidskontrakt mellom Bluecrew og kandidat.
                  Kontrakten spesifiserer oppdragets varighet, arbeidssted, stillingsbeskrivelse og lønn.
                </li>
                <li>
                  <strong>Oppsigelsesfrist:</strong> Innleiekunde kan si opp innleie etter avtale (normalt 1–4 ukers
                  varsel). Ved kortvarige oppdrag (under 6 måneder) kan kortere frist avtales.
                </li>
                <li>
                  <strong>Arbeidstakers rettigheter:</strong> Innleid arbeidstaker har vanlig oppsigelsesvern etter AML og
                  kan ikke sies opp uten saklig grunn (ved fast ansettelse hos Bluecrew).
                </li>
              </ul>
            </section>

            <section style={ui.card}>
              <h2 style={ui.h2}>Sosiale rettigheter</h2>
              <p style={ui.p}>
                Alle ansatte hos Bluecrew har full sosial sikkerhet i henhold til norsk lov:
              </p>
              <ul style={ui.ul}>
                <li>Sykepenger (Nav dekker fra dag 17, arbeidsgiver fra dag 1–16)</li>
                <li>Feriepenger (minimum 12 % for maritime stillinger med høy turnusgrad)</li>
                <li>Obligatorisk tjenestepensjon (OTP)</li>
                <li>Foreldrepermisjon og omsorgspermisjon</li>
              </ul>
              <p style={ui.p}>
                For maritime oppdrag offshore eller i internasjonalt farvann følger vi også{" "}
                <strong>ILO Maritime Labour Convention (MLC 2006)</strong>, som sikrer skriftlig arbeidsavtale, minstelønn,
                hviletid og sosial sikkerhet.
              </p>
            </section>

            <section style={ui.card}>
              <h2 style={ui.h2}>Kontakt ved spørsmål</h2>
              <p style={ui.p}>
                Har du spørsmål om innleie, arbeidsvilkår eller forsikring? Ta kontakt med oss:
              </p>
              <ul style={ui.ul}>
                <li>
                  <strong>E-post:</strong>{" "}
                  <a href="mailto:isak@bluecrew.no" style={ui.a}>
                    isak@bluecrew.no
                  </a>
                </li>
                <li>
                  <strong>Telefon:</strong> 923 28 850
                </li>
                <li>
                  <strong>Adresse:</strong> Østenbekkveien 43, 9403 Harstad
                </li>
              </ul>
              <p style={ui.p}>
                For generell informasjon om innleie og arbeidsmiljø, se{" "}
                <a href="https://www.arbeidstilsynet.no/" style={ui.a} target="_blank" rel="noopener noreferrer">
                  Arbeidstilsynet
                </a>{" "}
                eller{" "}
                <a href="https://www.nav.no/" style={ui.a} target="_blank" rel="noopener noreferrer">
                  Nav
                </a>
                .
              </p>
            </section>
          </div>

          <div style={ui.footer}>
            © {new Date().getFullYear()} Bluecrew AS – Arbeidsvilkår for bemanning og innleie
          </div>
        </div>
      </main>
    </SiteLayout>
  );
}
