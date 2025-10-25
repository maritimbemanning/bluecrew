import { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "../../../components/SiteLayout";
import { sx } from "../../../lib/styles";

export const metadata: Metadata = {
  title: "Hvordan bli matros - Utdanning, sertifikater og karrierevei 2025",
  description:
    "Komplett guide til å bli matros: Kvalifikasjonsbevis, STCW-krav, lønn, karrieremuligheter og veien til styrmann. Alt du trenger å vite for å starte maritime karriere.",
  keywords: [
    "hvordan bli matros",
    "matros utdanning",
    "matros kvalifikasjonsbevis",
    "matros lønn",
    "matros krav",
    "lettmatros",
    "dekksmannskap",
    "STCW II/5",
    "maritime jobber",
    "bli sjømann",
    "dekksarbeid",
    "matros karriere",
  ],
  openGraph: {
    title: "Hvordan bli matros - Komplett guide 2025 | Bluecrew AS",
    description: "Alt du trenger å vite om å bli matros: Utdanning, sertifikater, lønn og karrierevei fra lettmatros til styrmann.",
    type: "article",
  },
};

export default function Page() {
  return (
    <SiteLayout active="jobbsoker">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8, fontWeight: 500 }}>
            Sist oppdatert: 24. oktober 2025
          </div>
          <h1 style={sx.h2}>Hvordan bli matros i Norge</h1>
          <p style={sx.leadSmall}>
            Komplett guide til å bli matros: Kvalifikasjonsbevis, STCW-krav, lønn, karrieremuligheter og veien videre til styrmann. 
            Oppdatert 2025 basert på Kvalifikasjonsforskriften og bransjedata.
          </p>

          <div style={{ background: "#e0f2fe", border: "2px solid #0ea5e9", borderRadius: 12, padding: 20, marginTop: 32 }}>
            <p style={{ margin: 0, color: "#0c4a6e", fontSize: 16, lineHeight: 1.6 }}>
              <strong>Kort oppsummert:</strong> For å bli matros trenger du <strong>grunnleggende sikkerhet (VI/1)</strong>, 
              <strong>18 måneder fartstid</strong> som lettmatros/dekksmann, og <strong>kvalifikasjonsbevis matros (STCW II/5)</strong>. 
              Lønn fra ca. 400 000 kr til 650 000 kr/år avhengig av sektor. Karrierevei: Lettmatros → Matros → Bosun → Styrmann.
            </p>
          </div>

          {/* Hva er en matros */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Hva er en matros?</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
              En matros (også kalt <strong>Able Seaman</strong> eller <strong>AB</strong>) er kvalifisert dekksmannskap som utfører 
              operative oppgaver på dekk. Matros har ansvar for:
            </p>
            <ul style={{ margin: "16px 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, fontSize: 16, display: "grid", gap: 8 }}>
              <li>Dekksarbeid (fortøying, lasting/lossing, vedlikehold)</li>
              <li>Vakthold på broen som utkikk</li>
              <li>Betjening av dekks-utstyr (spill, kran, wire)</li>
              <li>Vedlikehold og maling av fartøy</li>
              <li>Assistere dekksoffiserer med navigasjon og sikkerhet</li>
              <li>Deltakelse i sikkerhetsberedskap (brann, mann over bord)</li>
            </ul>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
              Matros er en nøkkelrolle om bord og ofte førstelinje-personen i praktiske operasjoner. Erfarne matroser er høyt verdsatt 
              og kan gå videre til bosun eller styrmann.
            </p>
          </div>

          {/* Krav for å bli matros */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Krav for å bli matros</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              For å få kvalifikasjonsbevis som matros må du oppfylle følgende krav:
            </p>

            <div style={{ display: "grid", gap: 20 }}>
              <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>
                  1. Grunnleggende sikkerhet (STCW VI/1)
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Obligatorisk for alle som går til sjøs. Omfatter personlig sikkerhet, brannforebygging, førstehjelp og personlig overlevelse. 
                  Kurset tar ca. 1 uke og koster 15 000-20 000 kr. Tilbys ved alle maritime kurssenter.
                </p>
              </div>

              <div style={{ background: "#f8fafc", borderRadius: 12, padding: 24 }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>
                  2. Fartstid: 18 måneder som lettmatros/dekksmann
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Du må ha <strong>minimum 18 måneders dokumentert fartstid</strong> på dekk. Dette kan være som lettmatros (OS - Ordinary Seaman), 
                  dekksgutt eller lignende. Fartstiden må dokumenteres i sjømannsbok. Må inkludere minst 6 måneder vakthold på broen.
                </p>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>
                  3. Kvalifikasjonsbevis matros (STCW II/5)
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Etter 18 måneders fartstid kan du søke om <strong>kvalifikasjonsbevis matros</strong> hos Sjøfartsdirektoratet. 
                  Dette bekrefter at du har nødvendig erfaring og kompetanse. Ingen eksamen, men krav om dokumentasjon av fartstid, 
                  referanser og gyldige sertifikater.
                </p>
              </div>

              <div style={{ background: "#f8fafc", borderRadius: 12, padding: 24 }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>
                  4. Gyldig helseattest
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Helseattest for sjøfolk må fornyes hvert 2. år (under 18: årlig, over 60: årlig). Utstedes av godkjent lege. 
                  Ingen spesielle fysiske krav utover generell arbeidsevne.
                </p>
              </div>
            </div>
          </div>

          {/* Veien til matros */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Veien til matros: Steg-for-steg</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              Slik kommer du i gang og bygger karrieren som matros:
            </p>

            <div style={{ position: "relative", paddingLeft: 40, borderLeft: "3px solid #0ea5e9" }}>
              <div style={{ marginBottom: 32 }}>
                <div style={{ position: "absolute", left: -12, width: 20, height: 20, borderRadius: "50%", background: "#0ea5e9", border: "3px solid #ffffff" }}></div>
                <h3 style={{ margin: "0 0 8px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>Steg 1: Ta grunnleggende sikkerhet (VI/1)</h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Dette er første steget for alle maritime karrierer. Kurset tar 1 uke og du lærer grunnleggende sikkerhet, brann, 
                  førstehjelp og overlevelse. Koster ca. 15-20k. Tilbys ved Senter for Maritime Fag, Fagskolen i Ålesund, Nautisk Kurs 
                  Vest og mange andre.
                </p>
              </div>

              <div style={{ marginBottom: 32 }}>
                <div style={{ position: "absolute", left: -12, width: 20, height: 20, borderRadius: "50%", background: "#0ea5e9", border: "3px solid #ffffff" }}></div>
                <h3 style={{ margin: "0 0 8px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>Steg 2: Få din første jobb som lettmatros</h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Søk jobb som lettmatros (OS), dekksgutt eller trainee. Mange starter i havbruk, kystfart eller ferger fordi det er 
                  lettere å få jobb der uten erfaring. Alternativt gå via bemanningsbyrå som Bluecrew som matcher deg med oppdrag. 
                  Forvent 350-450k/år som lettmatros.
                </p>
              </div>

              <div style={{ marginBottom: 32 }}>
                <div style={{ position: "absolute", left: -12, width: 20, height: 20, borderRadius: "50%", background: "#0ea5e9", border: "3px solid #ffffff" }}></div>
                <h3 style={{ margin: "0 0 8px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>Steg 3: Bygg fartstid (18 måneder)</h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Jobb til sjøs og samle fartstid. Alt registreres i sjømannsboken din. Sørg for å få vakthold-erfaring (minst 6 mnd) 
                  da dette er påkrevd for matros-beviset. Vær proaktiv, lær av erfarne kollegaer og ta initiativ til å lære dekks-operasjoner.
                </p>
              </div>

              <div style={{ marginBottom: 32 }}>
                <div style={{ position: "absolute", left: -12, width: 20, height: 20, borderRadius: "50%", background: "#0ea5e9", border: "3px solid #ffffff" }}></div>
                <h3 style={{ margin: "0 0 8px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>Steg 4: Søk om kvalifikasjonsbevis matros</h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Etter 18 måneder sender du søknad til Sjøfartsdirektoratet med dokumentasjon av fartstid, referanser fra skipsfører/overstyrmann, 
                  og kopi av sertifikater. Behandlingstid ca. 2-4 uker. Når godkjent får du <strong>kvalifikasjonsbevis matros</strong> som gir 
                  rett til å jobbe som matros (AB) på alle norske fartøy.
                </p>
              </div>

              <div>
                <div style={{ position: "absolute", left: -12, width: 20, height: 20, borderRadius: "50%", background: "#0ea5e9", border: "3px solid #ffffff" }}></div>
                <h3 style={{ margin: "0 0 8px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>Steg 5: Jobb som matros og bygg erfaring</h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Nå er du kvalifisert matros! Fortsett å bygge erfaring, spesialiser deg (f.eks. kranoperatør, rigging, vedlikehold) 
                  og vurder neste steg: Bosun, eller ta utdanning til styrmann. Lønn som matros: 400-650k/år avhengig av sektor.
                </p>
              </div>
            </div>
          </div>

          {/* Lønn */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Lønn som matros</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              Lønnen varierer betydelig med sektor, erfaring og turnusordning:
            </p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, background: "#ffffff", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                <thead>
                  <tr style={{ background: "#0f172a", color: "#ffffff" }}>
                    <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: 700 }}>Sektor</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: 700 }}>Årslønn (ca.)</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: 700 }}>Kommentar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>Offshore/subsea</td>
                    <td style={{ padding: "14px 16px" }}>500 000 - 650 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Høyest lønn, krevende arbeid, 4/4 turnus</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>Brønnbåt/havbruk</td>
                    <td style={{ padding: "14px 16px" }}>420 000 - 550 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>2/2 eller 2/4 turnus, forutsigbart</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>Cruise/Hurtigruten</td>
                    <td style={{ padding: "14px 16px" }}>450 000 - 580 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Sesongvariasjon, passasjeransvar</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>Kystfart/servicefartøy</td>
                    <td style={{ padding: "14px 16px" }}>400 000 - 500 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Kortere distanser, mer forutsigbart</td>
                  </tr>
                  <tr style={{ background: "#f8fafc" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>Ferger (lokaltrafikk)</td>
                    <td style={{ padding: "14px 16px" }}>380 000 - 480 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Dagpendling mulig, fast rute</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ marginTop: 20, fontSize: 15, color: "#64748b", fontStyle: "italic" }}>
              <strong>Tips:</strong> Offshore gir høyest lønn, men også mest krevende arbeid. Havbruk/kyst gir bedre work-life balance. 
              Vurder hva som passer din livssituasjon.
            </p>
          </div>

          {/* Karrieremuligheter */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Karrieremuligheter etter matros</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              Som matros har du mange veier videre:
            </p>

            <div style={{ display: "grid", gap: 20 }}>
              <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>Bosun (båtsmann)</h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Leder av dekksmannskap. Planlegger dekksarbeid, vedlikehold og sikkerhet. Krever flere års erfaring som matros. 
                  Lønn: 500-700k/år. Ofte neste steg før styrmann.
                </p>
              </div>

              <div style={{ background: "#f8fafc", borderRadius: 12, padding: 24 }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>Styrmann (dekksoffiser)</h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Ta videreutdanning (vakthavende offiser-kurs) og bli styrmann. Krever matros-erfaring + kurs + eksamen. 
                  Åpner for offiserskarriere (styrmann → overstyrmann → skipsfører). Lønn: 450-800k/år.
                </p>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>Spesialisering</h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Kranoperatør, rigging-spesialist, DP-assistent, ROV-tekniker. Ta spesialkurs og bli ekspert innen et felt. 
                  Gir høyere lønn (10-30% økning) og bedre jobbsikkerhet.
                </p>
              </div>

              <div style={{ background: "#f8fafc", borderRadius: 12, padding: 24 }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>Landbaserte roller</h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Etter mange år til sjøs kan du gå over til landbasert arbeid: Bemanningskoordinator, verftassistent, havnearbeider, 
                  sikkerhetsinstruktør. Lavere lønn, men mer forutsigbart.
                </p>
              </div>
            </div>
          </div>

          {/* Hverdagen som matros */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Hverdagen som matros</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              Hva gjør du egentlig til daglig som matros?
            </p>

            <div style={{ background: "#ffffff", borderRadius: 16, padding: 32, border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
              <h3 style={{ margin: "0 0 16px 0", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>Typisk arbeidsdag:</h3>
              
              <ul style={{ margin: 0, paddingLeft: 24, color: "#334155", lineHeight: 1.8, display: "grid", gap: 12 }}>
                <li>
                  <strong>Vakthold (4-8 timer):</strong> På broen som utkikk, assistere styrmann med navigasjon, observere radar/AIS, 
                  rapportere trafikk og værforhold.
                </li>
                <li>
                  <strong>Dekksarbeid:</strong> Fortøying i havn, lasting/lossing av last (containere, last, utstyr), betjening av kran/spill/wire.
                </li>
                <li>
                  <strong>Vedlikehold:</strong> Maling, rust-behandling, vedlikehold av tau og utstyr, rengjøring av dekk og lugarområder.
                </li>
                <li>
                  <strong>Sikkerhetsberedskap:</strong> Deltakelse i brannøvelser, mann over bord-øvelser, båt-trening (MOB-båt, livbåter).
                </li>
                <li>
                  <strong>Spesialoppgaver:</strong> Avhengig av fartøy – kan være ROV-assistanse, ankerhåndtering (offshore), fisketilsyn (brønnbåt).
                </li>
              </ul>

              <p style={{ marginTop: 20, color: "#475569", lineHeight: 1.7, fontSize: 16, fontStyle: "italic" }}>
                Arbeidsdagen varierer mye med fartøytype og operasjon. Offshore er mer intenst og strukturert, mens havbruk/kyst kan være 
                mer avslappet med perioder av høy aktivitet.
              </p>
            </div>
          </div>

          {/* Tips */}
          <div style={{ marginTop: 48, background: "#fff3cd", border: "2px solid #ffc107", borderRadius: 16, padding: 32 }}>
            <h2 style={{ margin: "0 0 16px 0", fontSize: 24, fontWeight: 800, color: "#856404" }}>Tips for å lykkes som matros</h2>
            <ul style={{ margin: 0, paddingLeft: 24, color: "#856404", lineHeight: 1.8, display: "grid", gap: 10 }}>
              <li><strong>Vær lærevillig:</strong> Matros-rollen er hands-on. Be om å få prøve nye oppgaver og lær av erfarne kollegaer.</li>
              <li><strong>Ta sikkerhet på alvor:</strong> HMS er viktig til sjøs. Følg prosedyrer, bruk verneutstyr og meld fra om farlige situasjoner.</li>
              <li><strong>Bygg nettverk:</strong> Maritime miljøer er små. Gode relasjoner med kollegaer kan gi deg bedre jobber senere.</li>
              <li><strong>Hold deg i form:</strong> Dekksarbeid er fysisk krevende. God fysikk gjør jobben lettere og reduserer skaderisiko.</li>
              <li><strong>Dokumenter alt:</strong> Sørg for at all fartstid registreres i sjømannsboken. Du trenger dette for å avansere senere.</li>
              <li><strong>Vurder spesialisering:</strong> Kranoperatør-kurs, rigging-sertifikat, DP-assistent – alle gir høyere lønn og bedre muligheter.</li>
            </ul>
          </div>

          {/* CTA */}
          <div style={{ marginTop: 48, background: "#0ea5e9", color: "#ffffff", borderRadius: 20, padding: 40, textAlign: "center" as const }}>
            <h2 style={{ margin: "0 0 16px 0", fontSize: 28, fontWeight: 800 }}>Klar til å starte som matros?</h2>
            <p style={{ margin: "0 0 28px 0", fontSize: 18, lineHeight: 1.6, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
              Bluecrew hjelper deg med å finne din første jobb som lettmatros eller matros-oppdrag som matcher din erfaring. 
              Vi har kontakt med rederi i havbruk, kystfart og offshore.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" as const }}>
              <Link
                href="/jobbsoker/registrer"
                style={{
                  display: "inline-block",
                  background: "#ffffff",
                  color: "#0ea5e9",
                  padding: "16px 32px",
                  borderRadius: 12,
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: 17,
                }}
              >
                Registrer deg som kandidat
              </Link>
              <Link
                href="/jobbsoker/oppdrag"
                style={{
                  display: "inline-block",
                  background: "rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  padding: "16px 32px",
                  borderRadius: 12,
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: 17,
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
              >
                Se ledige oppdrag
              </Link>
            </div>
          </div>

          {/* Relaterte guider */}
          <div style={{ marginTop: 48 }}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>Relaterte guider</h3>
            <div style={{ display: "grid", gap: 12 }}>
              <Link href="/jobbsoker/guides/hvordan-bli-skipsforer" style={{ color: "#0ea5e9", textDecoration: "none", fontSize: 16, fontWeight: 600 }}>
                → Hvordan bli skipsfører
              </Link>
              <Link href="/jobbsoker/guides/lonnsguide-maritime-stillinger" style={{ color: "#0ea5e9", textDecoration: "none", fontSize: 16, fontWeight: 600 }}>
                → Lønnsguide maritime stillinger 2025
              </Link>
              <Link href="/jobbsoker/guides" style={{ color: "#0ea5e9", textDecoration: "none", fontSize: 16, fontWeight: 600 }}>
                → Maritime sertifikatkrav (komplett oversikt)
              </Link>
              <Link href="/faq" style={{ color: "#0ea5e9", textDecoration: "none", fontSize: 16, fontWeight: 600 }}>
                → Ofte stilte spørsmål
              </Link>
            </div>
          </div>

          {/* Kilder */}
          <div style={{ marginTop: 32, background: "#f8fafc", borderRadius: 12, padding: 20, fontSize: 14 }}>
            <h4 style={{ margin: "0 0 10px 0", fontSize: 15, fontWeight: 700, color: "#0f172a" }}>Kilder</h4>
            <ul style={{ margin: 0, paddingLeft: 20, color: "#64748b", lineHeight: 1.7, display: "grid", gap: 4 }}>
              <li>Kvalifikasjonsforskriften (FOR-2011-12-22-1523) - Kap. II</li>
              <li>Sjøfartsdirektoratet (sdir.no) - Kvalifikasjonsbevis matros</li>
              <li>STCW Convention II/5</li>
              <li>Sjømannsforbundet lønnsstatistikk</li>
            </ul>
            <p style={{ margin: "12px 0 0 0", fontSize: 13, color: "#94a3b8", fontStyle: "italic" }}>
              Sist oppdatert: 24. oktober 2025
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
