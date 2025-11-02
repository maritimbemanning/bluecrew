import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteLayout from "../../components/SiteLayout";

export const metadata: Metadata = {
  title: "Matros Lønn Norge 2025 - Hva tjener en matros i maritime stillinger?",
  description:
    "Komplett guide til matroslønn i Norge 2025. Gjennomsnittlig lønn for lettmatros, matros og båtsmann i havbruk, offshore, servicefartøy og cruise. STCW-krav og karriereveier.",
  keywords: [
    "matros lønn",
    "lettmatros lønn",
    "båtsmann lønn",
    "matros lønn norge",
    "hva tjener en matros",
    "matros havbruk lønn",
    "matros offshore lønn",
    "STCW matros",
    "maritime stillinger lønn",
    "dekksmannskap lønn",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Matros Lønn Norge 2025 - Komplett Guide | Bluecrew",
    description: "Hva tjener en matros i Norge? Gjennomsnittlig lønn, STCW-krav og karriereveier fra lettmatros til båtsmann.",
    type: "article",
  },
};

export default function Page() {
  return (
    <SiteLayout active="jobbsoker">
      <main style={{ background: "#f8fafc" }}>
        {/* Hero */}
        <section style={{ padding: "80px 0 40px", background: "linear-gradient(180deg, rgba(2,6,23,0.03), rgba(2,6,23,0))" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <h1 style={{ fontSize: 40, fontWeight: 800, color: "#0f172a", marginBottom: 16, lineHeight: 1.2 }}>
              Matros Lønn i Norge 2025
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.7, color: "#475569", maxWidth: 800, marginBottom: 32 }}>
              Komplett oversikt over lønn for matroser i norsk maritime sektor. Fra lettmatros til båtsmann – 
              hva kan du forvente i havbruk, offshore, servicefartøy og cruise?
            </p>
            <div style={{ marginTop: 32 }}>
              <Image
                src="/guides/Matros-dekksarbeid.jpeg"
                alt="Matros utfører profesjonelt dekksarbeid med tau og fortøyning på havbruksfartøy Nord-Norge - maritim bemanning"
                width={1200}
                height={675}
                priority
                sizes="(max-width: 768px) 100vw, 800px"
                style={{ borderRadius: 16, boxShadow: "0 12px 40px rgba(2,6,23,0.12)" }}
              />
            </div>
          </div>
        </section>

        {/* Summary */}
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
                Hva tjener en matros i Norge?
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 20 }}>
                En matros i Norge tjener typisk <strong>400,000–650,000 kr per år</strong>, avhengig av erfaring, 
                sertifikater, fartsområde og type skip. Lettmatroser starter lavere (380k-450k), mens erfarne 
                båtsmenn i offshore kan tjene opp mot 720,000 kr/år med overtid og tillegg.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155" }}>
                Lønn varierer betydelig mellom sektorer – havbruk og offshore betaler generelt best, mens kystfart 
                og cruise ligger lavere. Rotasjonsordninger (2/2, 4/4) gir ofte høyere årslønn enn dagturnus.
              </p>
            </div>
          </div>
        </section>

        {/* Lønnstabell */}
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", marginBottom: 24 }}>
              Lønnstabell for matroser i Norge 2025
            </h2>
            <div style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#0f172a" }}>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>Nivå</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>Erfaring</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>Årslønn (kr)</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>Sektor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>Lettmatros</td>
                    <td style={{ padding: "16px 20px", color: "#475569" }}>0-1 år</td>
                    <td style={{ padding: "16px 20px", color: "#0ea5e9", fontWeight: 600 }}>380,000 – 450,000</td>
                    <td style={{ padding: "16px 20px", color: "#64748b", fontSize: 14 }}>Alle</td>
                  </tr>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>Matros</td>
                    <td style={{ padding: "16px 20px", color: "#475569" }}>1-3 år</td>
                    <td style={{ padding: "16px 20px", color: "#0ea5e9", fontWeight: 600 }}>450,000 – 560,000</td>
                    <td style={{ padding: "16px 20px", color: "#64748b", fontSize: 14 }}>Havbruk, kystfart</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>Matros (erfaren)</td>
                    <td style={{ padding: "16px 20px", color: "#475569" }}>3-6 år</td>
                    <td style={{ padding: "16px 20px", color: "#0ea5e9", fontWeight: 600 }}>540,000 – 650,000</td>
                    <td style={{ padding: "16px 20px", color: "#64748b", fontSize: 14 }}>Offshore, havbruk</td>
                  </tr>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>Båtsmann</td>
                    <td style={{ padding: "16px 20px", color: "#475569" }}>6+ år</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 600 }}>600,000 – 720,000</td>
                    <td style={{ padding: "16px 20px", color: "#64748b", fontSize: 14 }}>Offshore PSV/AHTS</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 14, color: "#64748b", marginTop: 12, fontStyle: "italic" }}>
              Tall er estimater basert på tariffavtaler, bransjeundersøkelser og offentlig tilgjengelig statistikk. 
              Faktisk lønn kan variere betydelig avhengig av arbeidsgiver, fartstid, sertifikater og forhandlinger.
            </p>
          </div>
        </section>

        {/* Lettmatros */}
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
                Lettmatros – Din første stilling til sjøs (380k–450k)
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 16 }}>
                Som lettmatros er du den yngste i dekksbesetningen og lærer grunnleggende sjømannskap. 
                Startlønnen ligger på <strong>380,000–450,000 kr/år</strong>, avhengig av om du jobber i havbruk, 
                kystfart eller offshore.
              </p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Typisk lønnspakke:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Grunnlønn:</strong> 380,000–450,000 kr/år</li>
                <li><strong>Kost og losji:</strong> Gratis om bord (verdi ~80-100k/år)</li>
                <li><strong>Turnus:</strong> Ofte 2/2 eller 4/4 (50% friperiode)</li>
                <li><strong>Overtid:</strong> Betalt overtid ved behov (varierer)</li>
                <li><strong>Pensjonsordning:</strong> 2-5% av bruttolønn</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Arbeidsoppgaver:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li>Vedlikehold av dekk (rust, maling, renhold)</li>
                <li>Assistere matroser ved fortøyning og ankring</li>
                <li>Daglig vedlikehold av tau, kjettinger og utstyr</li>
                <li>Lastoperasjoner under oppsyn</li>
                <li>HMS-rutiner og sikkerhetsberedskap</li>
              </ul>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginTop: 16 }}>
                <strong>Karrierevei:</strong> Etter 6-12 måneders fartstid og STCW grunnleggende sikkerhetskurs 
                kan du avansere til matros. Mange lettmatroser tar fagbrev som matros parallelt med jobb.
              </p>
            </div>
          </div>
        </section>

        {/* Matros */}
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
                Matros – Erfaren dekksmannskap (450k–650k)
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 16 }}>
                Som matros er du kvalifisert dekksmannskap med fagbrev eller tilsvarende fartstid. 
                Lønnen ligger på <strong>450,000–650,000 kr/år</strong>, avhengig av sektor og erfaring.
              </p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Lønn etter sektor:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Havbruk (brønnbåt):</strong> 520,000–600,000 kr/år (2/2 eller 4/4 turnus)</li>
                <li><strong>Offshore PSV/AHTS:</strong> 540,000–650,000 kr/år (høyere risikotillegg)</li>
                <li><strong>Servicefartøy:</strong> 480,000–580,000 kr/år (2/2 eller 4/4 turnus)</li>
                <li><strong>Kystfart:</strong> 450,000–540,000 kr/år (dagturnus eller ukesturnus)</li>
                <li><strong>Cruise:</strong> 460,000–550,000 kr/år (lange turnuser 4-6 måneder)</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Ansvar og oppgaver:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li>Fortøyning, ankring og dekksvakt</li>
                <li>Operere dekksmaskineri (kran, spill, winch)</li>
                <li>Vedlikehold av tau, kjettinger og sikkerhetsutstyr</li>
                <li>Lastoperasjoner (havbruk: fiskepumping, offshore: supply)</li>
                <li>HMS-ansvar og sikkerhetsberedskap</li>
                <li>Opplæring av lettmatroser</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Krav:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Fagbrev matros</strong> eller tilsvarende fartstid (minimum 18 måneder)</li>
                <li><strong>STCW grunnleggende sikkerhetskurs:</strong> PST, FPFF, EFA, PSSR</li>
                <li><strong>Helseattest</strong> godkjent av Sjøfartsdirektoratet</li>
                <li><strong>Båtførerbevis</strong> (ofte påkrevd i havbruk)</li>
                <li><strong>Truckførerbevis</strong> (enkelte fartøy)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Båtsmann */}
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
                Båtsmann – Leder for dekksbesetningen (600k–720k)
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 16 }}>
                Båtsmann er dekksmannskap med erfaring og lederansvar. Du koordinerer dekksarbeid, opplæring og 
                sikkerhet. Lønnen ligger på <strong>600,000–720,000 kr/år</strong>, spesielt i offshore.
              </p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Typisk lønnspakke:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Grunnlønn:</strong> 600,000–720,000 kr/år</li>
                <li><strong>Ledertillegg:</strong> 30,000–60,000 kr/år</li>
                <li><strong>Overtid:</strong> Betalt overtid (kan øke årslønn med 50-100k)</li>
                <li><strong>Turnus:</strong> 4/4 eller 6/6 (lengre friperioder)</li>
                <li><strong>Kost og losji:</strong> Gratis om bord</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Ansvar:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li>Koordinere dekksarbeid og vedlikehold</li>
                <li>Opplæring og veiledning av matroser/lettmatroser</li>
                <li>Sikre HMS-rutiner og sikkerhetsutstyr</li>
                <li>Rapportere til styrmann/overstyrsmann</li>
                <li>Planlegge vedlikeholdsarbeid og innkjøp</li>
                <li>Lede lastoperasjoner og fortøyning</li>
              </ul>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginTop: 16 }}>
                <strong>Karrierevei:</strong> Mange båtsmenn tar senere 3. styrmann (D2 dekksoffiser) og går 
                offiserveien. Andre fortsetter som senior båtsmann med spesialisering (rigging, supply, havbruk).
              </p>
            </div>
          </div>
        </section>

        {/* Sektor-sammenligning */}
        <section style={{ padding: "40px 0", background: "#f1f5f9" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", marginBottom: 24 }}>
              Lønn etter sektor – Hvor lønner det seg mest?
            </h2>
            <div style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#0f172a" }}>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>Sektor</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>Lettmatros</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>Matros</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>Båtsmann</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>Offshore PSV/AHTS</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 600 }}>420k–480k</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 600 }}>540k–650k</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 600 }}>660k–720k</td>
                  </tr>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>Havbruk (brønnbåt)</td>
                    <td style={{ padding: "16px 20px", color: "#0ea5e9", fontWeight: 600 }}>400k–450k</td>
                    <td style={{ padding: "16px 20px", color: "#0ea5e9", fontWeight: 600 }}>520k–600k</td>
                    <td style={{ padding: "16px 20px", color: "#0ea5e9", fontWeight: 600 }}>600k–680k</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>Servicefartøy</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>390k–440k</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>480k–580k</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>580k–650k</td>
                  </tr>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>Kystfart</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>380k–420k</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>450k–540k</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>560k–620k</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>Cruise</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>390k–430k</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>460k–550k</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>570k–640k</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 14, color: "#64748b", marginTop: 12, fontStyle: "italic" }}>
              Offshore og havbruk betaler best på grunn av tøffere arbeidsforhold, høyere HMS-krav og lengre 
              rotasjonsordninger. Kystfart har ofte dagturnus og lavere risikotillegg.
            </p>
          </div>
        </section>

        {/* Turnus og arbeidstid */}
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
                Turnus og arbeidstid – Hvordan påvirker det lønnen?
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 16 }}>
                Matroser jobber typisk i rotasjonsordninger (turnus) – du jobber om bord i X uker, 
                deretter friperiode i Y uker. Dette påvirker både årslønn og livskvalitet.
              </p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Vanlige turnusordninger:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>2/2 turnus:</strong> 2 uker om bord, 2 uker fri (26 uker jobb/år) – Høyest årslønn</li>
                <li><strong>4/4 turnus:</strong> 4 uker om bord, 4 uker fri (24 uker jobb/år) – Balansert</li>
                <li><strong>6/6 turnus:</strong> 6 uker om bord, 6 uker fri (26 uker jobb/år) – Lengre friperioder</li>
                <li><strong>Dagturnus:</strong> 08:00-16:00 mandag-fredag (kystfart) – Lavest årslønn</li>
                <li><strong>Ukesturnus:</strong> 1 uke om bord, helg hjemme (ferge, cruise) – Familievennlig</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Arbeidstid om bord:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Standard:</strong> 12-timers vakter (00:00-12:00 eller 12:00-24:00)</li>
                <li><strong>Overtid:</strong> Betalt over 8 timer/dag (tariff) eller 40 timer/uke</li>
                <li><strong>Hvileperiode:</strong> Minimum 10 timer i døgnet (MLC 2006)</li>
                <li><strong>Maksimal arbeidstid:</strong> 14 timer/dag, 72 timer/uke (sikkerhet)</li>
              </ul>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginTop: 16 }}>
                <strong>Årslønn vs. faktisk arbeidstid:</strong> En matros i 2/2 turnus tjener kanskje 520k/år, 
                men jobber kun 26 uker. Det tilsvarer ~60,000 kr/måned i aktive perioder – mer enn mange 
                land-baserte stillinger med 12 måneders årslønn.
              </p>
            </div>
          </div>
        </section>

        {/* STCW-krav */}
        <section style={{ padding: "40px 0", background: "#f1f5f9" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", marginBottom: 24 }}>
              STCW-krav for matroser
            </h2>
            <div style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 20 }}>
                For å jobbe som matros på skip registrert under Sjøfartsdirektoratet må du ha 
                <strong> STCW grunnleggende sikkerhetskurs</strong> og gjeldende helseattest.
              </p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>
                1. Grunnleggende sikkerhetskurs (alle matroser):
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24, marginBottom: 20 }}>
                <li><strong>PST (Personal Safety Techniques):</strong> Grunnleggende sikkerhet til sjøs</li>
                <li><strong>FPFF (Fire Prevention and Fire Fighting):</strong> Brannvern og brannslukning</li>
                <li><strong>EFA (Elementary First Aid):</strong> Førstehjelp</li>
                <li><strong>PSSR (Personal Survival and Rescue):</strong> Overlevelses- og redningsteknikker</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>
                2. Helseattest (påkrevd):
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24, marginBottom: 20 }}>
                <li>Godkjent legeundersøkelse fra Sjøfartsdirektoratet</li>
                <li>Gyldig i 2 år (under 18 år) eller 5 år (over 18 år)</li>
                <li>Syn, hørsel, fysisk helse sjekkes</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>
                3. Ekstra sertifikater (ofte påkrevd):
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24, marginBottom: 20 }}>
                <li><strong>Båtførerbevis:</strong> Betjene arbeidsbåt i havbruk (ofte krav)</li>
                <li><strong>ROC (Restricted Operator Certificate):</strong> Radiooperatør VHF</li>
                <li><strong>Truckførerbevis:</strong> Betjene truck på dekk (enkelte fartøy)</li>
                <li><strong>Kranskurs:</strong> Betjene kran over 10 meter (offshore)</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>
                4. Fagbrev matros (anbefalt):
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 12 }}>
                Du kan jobbe som matros uten fagbrev hvis du har tilstrekkelig fartstid (18 måneder), 
                men fagbrev gir bedre lønn og karrieremuligheter:
              </p>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Vg2 skip og fartøy</strong> + <strong>Vg3 læretid</strong> (2 år) = Fagbrev matros</li>
                <li>Eller: Praksiskandidat (4,5 år fartstid uten fagskole)</li>
                <li>Dokumentasjon: Fartsbøker og HMS-opplæring</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Karrierevei */}
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
                Karrierevei fra matros til kaptein
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 16 }}>
                Som matros har du to hovedveier: <strong>Fortsette i dekksbesetningen</strong> (båtsmann, senior matros) 
                eller <strong>ta offisersutdanning</strong> (3. styrmann → kaptein).
              </p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Karrierestigen (6-10 år fra matros til styrmann):
              </h3>
              <ol style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Lettmatros (0-1 år):</strong> 380k–450k – Lærer grunnleggende sjømannskap</li>
                <li><strong>Matros (1-3 år):</strong> 450k–560k – Kvalifisert dekksmannskap med fagbrev</li>
                <li><strong>Matros erfaren (3-6 år):</strong> 540k–650k – Spesialisering (rigging, supply, havbruk)</li>
                <li><strong>Båtsmann (6+ år):</strong> 600k–720k – Lederansvar for dekksbesetning</li>
                <li><strong>3. styrmann (D2 + VG3 nautikk):</strong> 504k–624k – Offiserveien starter</li>
                <li><strong>2. styrmann (D3-D4):</strong> 600k–780k – Senior offiser med navigasjonsansvar</li>
                <li><strong>Overstyrsmann (D5):</strong> 720k–900k – Assisterer kaptein</li>
                <li><strong>Kaptein (D6):</strong> 840k–1.2M – Øverste ansvar om bord</li>
              </ol>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Veien til styrmann:
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 12 }}>
                Hvis du ønsker å bli styrmann/kaptein må du ta dekksoffisersertifikat:
              </p>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Vg3 nautikk</strong> (1 år maritime fag) → 3. styrmann (D2-klasse)</li>
                <li><strong>Fartstid 12-18 måneder</strong> som 3. styrmann → 2. styrmann (D3-D4)</li>
                <li><strong>Bachelor i nautikk (NTNU/HVL)</strong> → Raskeste vei til D5-D6</li>
                <li><strong>Eller: Praksiskandidat</strong> (lengre fartstid uten fagskole)</li>
              </ul>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginTop: 16 }}>
                <strong>Tidslinje:</strong> Fra matros til kaptein tar typisk 8-15 år, avhengig av utdanningsvalg, 
                fartstid og motivasjon. Mange velger å stoppe som styrmann (god lønn, mindre ansvar).
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "40px 0", background: "#f1f5f9" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", marginBottom: 24 }}>
              Ofte stilte spørsmål om matroslønn
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                {
                  q: "Hva er forskjellen på lettmatros og matros?",
                  a: "Lettmatros er uten fagbrev/tilstrekkelig fartstid og tjener 380k-450k/år. Matros har fagbrev eller 18+ måneders fartstid og tjener 450k-650k/år. Matros har mer ansvar, opererer dekksmaskineri og leder lastoperasjoner.",
                },
                {
                  q: "Hvor mye tjener en matros i Nord-Norge?",
                  a: "Matroser i Nord-Norge (havbruk, brønnbåt) tjener typisk 520k-650k/år, avhengig av erfaring. Nord-Norge har høy etterspørsel etter matroser i havbruksnæringen, noe som driver lønningene opp. Mange jobber 2/2 eller 4/4 turnus fra Tromsø, Bodø eller Lofoten.",
                },
                {
                  q: "Lønner det seg å ta fagbrev som matros?",
                  a: "Ja! Fagbrev gir 50,000-80,000 kr høyere årslønn enn ufaglærte, bedre karrieremuligheter (båtsmann, styrmann) og krav til mange fartøy. Du kan ta fagbrev via Vg3 læretid (2 år) eller som praksiskandidat (4,5 år fartstid). Mange rederier betaler for fagbrev.",
                },
                {
                  q: "Kan jeg jobbe som matros uten maritim fagskole?",
                  a: "Ja, du kan bli matros uten fagskole hvis du har 18 måneders dokumentert fartstid og STCW grunnleggende sikkerhetskurs. Mange starter som lettmatros (uten krav) og jobber seg opp. Fagbrev eller fagskole gir raskere karriere og høyere lønn, men er ikke påkrevd.",
                },
                {
                  q: "Hvilken sektor betaler best for matroser?",
                  a: "Offshore PSV/AHTS betaler best (540k-650k for matros, 660k-720k for båtsmann), fulgt av havbruk brønnbåt (520k-600k). Kystfart og cruise betaler lavest (450k-550k). Offshore har høyere risikotillegg, lengre turnus og mer overtid.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "white",
                    padding: 24,
                    borderRadius: 12,
                    boxShadow: "0 2px 8px rgba(2,6,23,0.04)",
                  }}
                >
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>
                    {item.q}
                  </h3>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: "#475569", margin: 0 }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "60px 0" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px", textAlign: "center" }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
              Søk maritime jobber med Bluecrew
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: "#475569", marginBottom: 32 }}>
              Vi kobler kvalifiserte matroser med ledende rederier i havbruk, offshore og maritim service. 
              Registrer deg gratis og få tilgang til eksklusivejobber.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/jobbsoker/registrer"
                style={{
                  display: "inline-block",
                  padding: "14px 28px",
                  background: "linear-gradient(180deg, #0ea5e9, #0284c7)",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: 10,
                  textDecoration: "none",
                  boxShadow: "0 6px 20px rgba(14,165,233,0.4)",
                }}
              >
                Registrer som kandidat
              </Link>
              <Link
                href="/jobbsoker/guides"
                style={{
                  display: "inline-block",
                  padding: "14px 28px",
                  background: "white",
                  color: "#0f172a",
                  fontWeight: 600,
                  borderRadius: 10,
                  textDecoration: "none",
                  border: "1px solid #e2e8f0",
                }}
              >
                Les flere guider
              </Link>
            </div>
          </div>
        </section>

        {/* Related guides */}
        <section style={{ padding: "40px 0", background: "#f8fafc" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: "#0f172a", marginBottom: 20 }}>
              Relaterte guider:
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              <Link href="/karriere/styrmann-lonn" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    background: "white",
                    padding: 20,
                    borderRadius: 12,
                    boxShadow: "0 2px 8px rgba(2,6,23,0.04)",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <h4 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", marginBottom: 8 }}>
                    Styrmann Lønn Norge 2025
                  </h4>
                  <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
                    3. styrmann, 2. styrmann og overstyrsmann – lønn, STCW-krav og karrierevei
                  </p>
                </div>
              </Link>
              <Link href="/karriere/kaptein-lonn" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    background: "white",
                    padding: 20,
                    borderRadius: 12,
                    boxShadow: "0 2px 8px rgba(2,6,23,0.04)",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <h4 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", marginBottom: 8 }}>
                    Kaptein Lønn Norge 2025
                  </h4>
                  <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
                    Hva tjener en kaptein i havbruk, offshore og maritim service? Komplett guide
                  </p>
                </div>
              </Link>
              <Link href="/jobbsoker/guides/hvordan-bli-matros" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    background: "white",
                    padding: 20,
                    borderRadius: 12,
                    boxShadow: "0 2px 8px rgba(2,6,23,0.04)",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <h4 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", marginBottom: 8 }}>
                    Hvordan bli matros?
                  </h4>
                  <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
                    Utdanning, sertifikater og karriereveier – komplett guide til matrosyrket
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
