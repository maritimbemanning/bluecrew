import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteLayout from "../../components/SiteLayout";

export const metadata: Metadata = {
  title: "Dekksoffiser Lønn Norge 2025 - Hva tjener en dekksoffiser?",
  description:
    "Komplett guide til dekksoffiserlønn i Norge 2025. D1-D6 klasser, lønn i havbruk, offshore og maritim service. STCW II/1-II/3 krav og karrierevei fra lettmatros til overstyrsmann.",
  keywords: [
    "dekksoffiser lønn",
    "styrmann lønn",
    "overstyrsmann lønn",
    "3. styrmann lønn",
    "dekksoffiser lønn norge",
    "D1 D2 D3 D4 D5 D6 lønn",
    "havbruk dekksoffiser",
    "offshore dekksoffiser",
    "STCW dekk",
    "maritime stillinger lønn",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Dekksoffiser Lønn Norge 2025 - Komplett Guide | Bluecrew",
    description: "Hva tjener en dekksoffiser i Norge? D1-D6 klasser, STCW-krav og karrierevei fra lettmatros til overstyrsmann.",
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
              Dekksoffiser Lønn i Norge 2025
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.7, color: "#475569", maxWidth: 800, marginBottom: 32 }}>
              Komplett oversikt over lønn for dekksoffiserer i norsk maritime sektor. Fra lettmatros til overstyrsmann – 
              D1, D2, D3, D4, D5 og D6 klasser forklart med lønnsdata fra havbruk, offshore og servicefartøy.
            </p>
            <div style={{ marginTop: 32 }}>
              <Image
                src="/guides/Dekksoffiser-navigasjon.jpeg"
                alt="Dekksoffiser studerer nautiske kart og navigasjonsutstyr på broen - maritime operasjoner"
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
                Hva tjener en dekksoffiser i Norge?
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 20 }}>
                En dekksoffiser i Norge tjener typisk <strong>450,000–750,000 kr per år</strong>, avhengig av 
                sertifikat (D1-D6), erfaring og sektor. Lettmatros starter på 380k-450k, mens overstyrsmann 
                (D2) i offshore kan tjene opp til 900,000 kr/år med overtid.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155" }}>
                Dekksoffiserer er ansvarlige for navigasjon, dekksdrift, sikkerhet og lasting/lossing. 
                Høyere sertifikat (D1-D2) gir tilgang til større skip, kapteinsstillinger og betydelig høyere lønn.
              </p>
            </div>
          </div>
        </section>

        {/* Lønnstabell */}
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", marginBottom: 24 }}>
              Lønnstabell for dekksoffiserer i Norge 2025
            </h2>
            <div style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#0f172a" }}>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>Sertifikat</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>Tittel</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>Skipstype</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>Årslønn (kr)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>Lettmatros</td>
                    <td style={{ padding: "16px 20px", color: "#475569" }}>Dekksassistent</td>
                    <td style={{ padding: "16px 20px", color: "#64748b", fontSize: 14 }}>Alle fartøy</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>380,000 – 450,000</td>
                  </tr>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>Matros/D6</td>
                    <td style={{ padding: "16px 20px", color: "#475569" }}>Matros erfaren</td>
                    <td style={{ padding: "16px 20px", color: "#64748b", fontSize: 14 }}>Alle fartøy</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>450,000 – 560,000</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>D5</td>
                    <td style={{ padding: "16px 20px", color: "#475569" }}>3. styrmann / Skipper &lt;15m</td>
                    <td style={{ padding: "16px 20px", color: "#64748b", fontSize: 14 }}>0–500 GT</td>
                    <td style={{ padding: "16px 20px", color: "#0ea5e9", fontWeight: 600 }}>500,000 – 620,000</td>
                  </tr>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>D4</td>
                    <td style={{ padding: "16px 20px", color: "#475569" }}>3. styrmann</td>
                    <td style={{ padding: "16px 20px", color: "#64748b", fontSize: 14 }}>500–3000 GT</td>
                    <td style={{ padding: "16px 20px", color: "#0ea5e9", fontWeight: 600 }}>540,000 – 660,000</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>D3</td>
                    <td style={{ padding: "16px 20px", color: "#475569" }}>2. styrmann</td>
                    <td style={{ padding: "16px 20px", color: "#64748b", fontSize: 14 }}>500–3000 GT</td>
                    <td style={{ padding: "16px 20px", color: "#0ea5e9", fontWeight: 600 }}>620,000 – 780,000</td>
                  </tr>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>D2</td>
                    <td style={{ padding: "16px 20px", color: "#475569" }}>Overstyrsmann</td>
                    <td style={{ padding: "16px 20px", color: "#64748b", fontSize: 14 }}>3000+ GT</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 600 }}>720,000 – 900,000</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>D1</td>
                    <td style={{ padding: "16px 20px", color: "#475569" }}>Kaptein / Master</td>
                    <td style={{ padding: "16px 20px", color: "#64748b", fontSize: 14 }}>Ubegrenset</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 600 }}>840,000 – 1,200,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 14, color: "#64748b", marginTop: 12, fontStyle: "italic" }}>
              Tall er estimater basert på tariffavtaler, bransjeundersøkelser og offentlig tilgjengelig statistikk. 
              D1-D6 refererer til STCW dekksoffisersertifikater (GT = bruttotonnasje).
            </p>
          </div>
        </section>

        {/* D5 - 3. styrmann / Skipper */}
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
                D5 - 3. styrmann / Skipper (500k–620k)
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 16 }}>
                D5-sertifikat (STCW II/3) gir rett til å være <strong>3. styrmann</strong> på skip opp til 500 GT 
                (bruttotonnasje), eller <strong>skipper på mindre fartøy</strong> under 15 meter. Dette er typisk 
                første offisersstilling etter matros og fagbrev.
              </p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Typisk lønnspakke:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Grunnlønn:</strong> 500,000–620,000 kr/år</li>
                <li><strong>Sektor:</strong> Havbruk (brønnbåt), kystfart, servicefartøy, turistfiske</li>
                <li><strong>Turnus:</strong> 2/2 eller 4/4 (50% friperiode)</li>
                <li><strong>Ansvar:</strong> Navigering, vakthold, dekksdrift</li>
                <li><strong>Kost og losji:</strong> Gratis om bord</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Arbeidsoppgaver:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li>Navigasjonsvakt (4-8 timer per døgn)</li>
                <li>Assistere 2. styrmann og overstyrsmann</li>
                <li>Vedlikehold av dekksutstyr (wirer, tau, redningsutstyr)</li>
                <li>Sikkerhetskontroller (ISPS, SOLAS)</li>
                <li>Opplæring av matros og lettmatros</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Krav:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Vg3 nautikk</strong> (maritime fag) + 12 måneders fartstid</li>
                <li><strong>STCW grunnleggende sikkerhetskurs</strong> (PST, FPFF, EFA, PSSR)</li>
                <li><strong>Helseattest</strong> godkjent av Sjøfartsdirektoratet</li>
                <li><strong>Fagbrev matros</strong> (anbefalt, ikke påkrevd)</li>
                <li><strong>ROC/GOC</strong> (GMDSS radio-sertifikat)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* D4 - 3. styrmann */}
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
                D4 - 3. styrmann (540k–660k)
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 16 }}>
                D4-sertifikat (STCW II/3) gir rett til skip mellom <strong>500–3000 GT</strong>. Dette dekker de fleste 
                brønnbåter, servicefartøy og mindre offshore-fartøy. D4 er typisk oppgradering fra D5 etter fartstid.
              </p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Lønn etter sektor:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Havbruk (brønnbåt):</strong> 560,000–640,000 kr/år</li>
                <li><strong>Offshore PSV/AHTS:</strong> 600,000–660,000 kr/år</li>
                <li><strong>Servicefartøy:</strong> 540,000–620,000 kr/år</li>
                <li><strong>Kystfart:</strong> 520,000–600,000 kr/år</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Ansvar:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li>Navigasjonsvakt (bruk av radar, ECDIS, AIS)</li>
                <li>Planlegge seilaser og rutekart</li>
                <li>Vedlikehold av navigasjonsutstyr</li>
                <li>Koordinere dekksbemanning ved manøvrering</li>
                <li>Sikkerhetsinspeksjoner og rapportering</li>
                <li>Assistere overstyrsmann med lasting/lossing</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Krav:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>D5-sertifikat</strong> + 12 måneder fartstid som 3. styrmann</li>
                <li><strong>Eller:</strong> 3 år maritimt fagskole (VG3 nautikk + påbygg)</li>
                <li><strong>ECDIS-kurs</strong> (Electronic Chart Display and Information System)</li>
                <li><strong>ROC/GOC</strong> (GMDSS radio)</li>
                <li><strong>Advanced Fire Fighting</strong> (ofte påkrevd)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* D3 - 2. styrmann */}
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
                D3 - 2. styrmann (620k–780k)
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 16 }}>
                D3-sertifikat (STCW II/2) gir rett til skip mellom <strong>500–3000 GT</strong> som 2. styrmann. 
                Dette er senior offisersstilling med ansvar for navigasjon, sikkerhet og lasting.
              </p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Lønn etter sektor:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Havbruk (brønnbåt):</strong> 640,000–740,000 kr/år</li>
                <li><strong>Offshore PSV/AHTS:</strong> 680,000–780,000 kr/år</li>
                <li><strong>Servicefartøy:</strong> 620,000–720,000 kr/år</li>
                <li><strong>Kystfart:</strong> 600,000–680,000 kr/år</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Ansvar:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li>Assistere overstyrsmann og kaptein</li>
                <li>Ansvar for nautiske publikasjoner (kart, Notice to Mariners)</li>
                <li>Planlegge vedlikehold av dekksutstyr</li>
                <li>Koordinere lasting og ballastering</li>
                <li>Opplæring av 3. styrmann og matros</li>
                <li>Sikkerhetsinspeksjoner (LSA, FFA)</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Krav:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>D4-sertifikat</strong> + 18 måneder fartstid som 3. styrmann</li>
                <li><strong>Eller:</strong> 3 år maritimt fagskole (VG3 nautikk + påbygg)</li>
                <li><strong>ECDIS-kurs</strong> (påkrevd)</li>
                <li><strong>BRM-kurs</strong> (Bridge Resource Management)</li>
                <li><strong>Advanced Fire Fighting</strong> (påkrevd)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* D2 - Overstyrsmann */}
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
                D2 - Overstyrsmann (720k–900k)
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 16 }}>
                D2-sertifikat (STCW II/1 Chief Mate) gir rett til skip <strong>over 3000 GT</strong> som overstyrsmann 
                (Chief Mate). Dette er høyeste offisersstilling under kapteinen, med ansvar for daglig drift.
              </p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Typisk lønnspakke:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Grunnlønn:</strong> 720,000–900,000 kr/år</li>
                <li><strong>Offshore PSV/AHTS:</strong> 780,000–900,000 kr/år</li>
                <li><strong>Havbruk (stor brønnbåt):</strong> 740,000–840,000 kr/år</li>
                <li><strong>Turnus:</strong> 4/4 eller 6/6</li>
                <li><strong>Overtid:</strong> Betydelig overtidsbetaling ved lasting/lossing</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Ansvar:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li>Assistere kaptein med driften</li>
                <li>Ansvar for lasting, lossing og stabilitet</li>
                <li>Koordinere vedlikehold og dokking</li>
                <li>Lede dekksbesetning</li>
                <li>Sikkerhetsinspeksjoner og ISM-compliance</li>
                <li>Representere kaptein ved fravær</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Krav:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>D3-sertifikat</strong> + 18 måneder fartstid som 2. styrmann</li>
                <li><strong>Eller:</strong> Bachelor nautikk (NTNU, HVL, UiT)</li>
                <li><strong>STCW Management Level</strong> (ledelseskurs)</li>
                <li><strong>ISM-kurs</strong> (International Safety Management)</li>
                <li><strong>Medical Care</strong> (førstehjelpslærer)</li>
                <li><strong>Lederkurs</strong> (HMS, personledelse)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* D1 - Kaptein */}
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
                D1 - Kaptein / Master (840k–1,200k+)
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 16 }}>
                D1-sertifikat (STCW II/2 Master) er det høyeste dekksoffisersertifikatet og gir rett til 
                <strong> ubegrenset bruttotonnasje</strong>. Kapteinen har øverste ansvar for skipet, mannskapet og lasten.
              </p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Lønn etter sektor:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Offshore PSV/AHTS:</strong> 900,000–1,140,000+ kr/år</li>
                <li><strong>Havbruk (brønnbåt):</strong> 840,000–1,000,000 kr/år</li>
                <li><strong>Cruise (stor):</strong> 1,000,000–1,400,000 kr/år</li>
                <li><strong>Servicefartøy:</strong> 820,000–960,000 kr/år</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Ansvar:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li>Øverste ansvar for skipet, mannskapet og lasten</li>
                <li>Lede hele besetningen (dekk og maskin)</li>
                <li>Budsjett- og innkjøpsansvar</li>
                <li>Planlegge seilaser, vedlikehold og dokking</li>
                <li>Rapportere til reder</li>
                <li>Sikre HMS-compliance (ISO, ISPS, MLC, SOLAS)</li>
                <li>Representere reder i havner og overfor myndigheter</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Krav:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>D2-sertifikat</strong> + 18 måneder fartstid som overstyrsmann</li>
                <li><strong>Eller:</strong> Bachelor nautikk + fartstid</li>
                <li><strong>Master nautikk</strong> (anbefalt for cruiseskip)</li>
                <li><strong>STCW Management Level</strong> (ledelseskurs)</li>
                <li><strong>ISM-kurs</strong> (International Safety Management)</li>
                <li><strong>10+ års erfaring</strong> i maritime operasjoner (typisk)</li>
              </ul>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginTop: 16 }}>
                <strong>Karrieretopp:</strong> Kaptein er toppstillingen i dekksbesetningen. Mange velger 
                senere å gå i land som operasjonsansvarlig, teknisk direktør eller inspektør hos rederi/klassifikasjonsselskap.
              </p>
            </div>
          </div>
        </section>

        {/* Sektor-sammenligning */}
        <section style={{ padding: "40px 0", background: "#f1f5f9" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", marginBottom: 24 }}>
              Lønn etter sektor – Hvor tjener dekksoffiserer best?
            </h2>
            <div style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#0f172a" }}>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>Sektor</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>D5 (3. styr)</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>D4 (3. styr)</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>D3 (2. styr)</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>D2 (Oversty)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>Offshore PSV/AHTS</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 600 }}>580k–620k</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 600 }}>600k–660k</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 600 }}>680k–780k</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 600 }}>780k–900k</td>
                  </tr>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>Havbruk (brønnbåt)</td>
                    <td style={{ padding: "16px 20px", color: "#0ea5e9", fontWeight: 600 }}>540k–600k</td>
                    <td style={{ padding: "16px 20px", color: "#0ea5e9", fontWeight: 600 }}>560k–640k</td>
                    <td style={{ padding: "16px 20px", color: "#0ea5e9", fontWeight: 600 }}>640k–740k</td>
                    <td style={{ padding: "16px 20px", color: "#0ea5e9", fontWeight: 600 }}>740k–840k</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>Servicefartøy</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>520k–580k</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>540k–620k</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>620k–720k</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>720k–840k</td>
                  </tr>
                  <tr style={{ background: "#f8fafc" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>Kystfart</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>500k–560k</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>520k–600k</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>600k–680k</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>700k–800k</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 14, color: "#64748b", marginTop: 12, fontStyle: "italic" }}>
              Offshore betaler best på grunn av tøffere arbeidsforhold, høyere kompetansekrav (DP, ECDIS, BRM) og 
              lengre turnuser. Havbruk krever spesialisering i brønnbåt-operasjoner (fisketransport).
            </p>
          </div>
        </section>

        {/* STCW-krav */}
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", marginBottom: 24 }}>
              STCW-krav for dekksoffiserer
            </h2>
            <div style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 20 }}>
                STCW (Standards of Training, Certification and Watchkeeping) regulerer krav til dekksoffiserer. 
                D1-D6 er norske betegnelser basert på STCW II/1-II/3 og bruttotonnasje (GT).
              </p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>
                1. Grunnleggende sikkerhetskurs (alle):
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24, marginBottom: 20 }}>
                <li><strong>PST:</strong> Personal Safety Techniques</li>
                <li><strong>FPFF:</strong> Fire Prevention and Fire Fighting</li>
                <li><strong>EFA:</strong> Elementary First Aid</li>
                <li><strong>PSSR:</strong> Personal Survival and Rescue</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>
                2. Sertifikat per nivå:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24, marginBottom: 20 }}>
                <li><strong>D6 (Matros):</strong> Vg2 nautikk + 6 mnd fartstid → Alle fartøy (ikke offiser)</li>
                <li><strong>D5 (STCW II/3):</strong> Vg3 nautikk + 12 mnd fartstid → 0-500 GT / 3. styrmann</li>
                <li><strong>D4 (STCW II/3):</strong> D5 + 12 mnd fartstid → 500-3000 GT / 3. styrmann</li>
                <li><strong>D3 (STCW II/2):</strong> D4 + 18 mnd fartstid → 500-3000 GT / 2. styrmann</li>
                <li><strong>D2 (STCW II/1 Mate):</strong> D3 + 18 mnd fartstid → 3000+ GT / Overstyrsmann</li>
                <li><strong>D1 (STCW II/2 Master):</strong> D2 + 18 mnd fartstid → Ubegrenset GT / Kaptein</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>
                3. Ekstra sertifikater (ofte påkrevd):
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24, marginBottom: 20 }}>
                <li><strong>ECDIS:</strong> Påkrevd for D4-D1 (elektronisk kartplotter)</li>
                <li><strong>ROC/GOC:</strong> Påkrevd for alle offiserer (GMDSS radio)</li>
                <li><strong>BRM:</strong> Påkrevd for D3-D1 (Bridge Resource Management)</li>
                <li><strong>Advanced Fire Fighting:</strong> Påkrevd for D3-D1</li>
                <li><strong>Medical Care:</strong> Påkrevd for D2-D1 (førstehjelpslærer)</li>
                <li><strong>DP-kurs:</strong> Ofte krav offshore (Dynamic Positioning)</li>
                <li><strong>ISM-kurs:</strong> Påkrevd for D1 (sikkerhetsledelse)</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>
                4. Utdanningsveier:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Vg1-Vg2 maritime fag</strong> + Vg3 nautikk → D5</li>
                <li><strong>Bachelor nautikk</strong> (NTNU, HVL, UiT) → D2 etter fartstid</li>
                <li><strong>Fagbrev matros</strong> + maritime påbygg → D5-D4</li>
                <li><strong>Praksiskandidat:</strong> Lang fartstid uten fagskole (krevende vei)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Karrierevei */}
        <section style={{ padding: "40px 0", background: "#f1f5f9" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
                Karrierevei fra lettmatros til kaptein
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 16 }}>
                Veien fra lettmatros til kaptein tar typisk <strong>10-15 år</strong>, avhengig av utdanning, 
                fartstid og motivasjon. Mange stopper som 2. styrmann (D3) eller overstyrsmann (D2) 
                med god lønn og mindre ansvar enn kaptein.
              </p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Karrierestigen (typisk tidslinje):
              </h3>
              <ol style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Lettmatros (0-1 år):</strong> 380k–450k – Lærer grunnleggende dekksdrift</li>
                <li><strong>Matros (1-3 år):</strong> 450k–560k – Erfaren dekksmann</li>
                <li><strong>3. styrmann D5 (3-5 år):</strong> 500k–620k – Første offisersstilling, 0-500 GT</li>
                <li><strong>3. styrmann D4 (5-7 år):</strong> 540k–660k – Mellomstore skip, 500-3000 GT</li>
                <li><strong>2. styrmann D3 (7-10 år):</strong> 620k–780k – Senior offiser</li>
                <li><strong>Overstyrsmann D2 (10-13 år):</strong> 720k–900k – Høyeste offisersstilling</li>
                <li><strong>Kaptein D1 (13-15+ år):</strong> 840k–1.2M+ – Øverste ansvar</li>
              </ol>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Raskeste vei til D1:
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 12 }}>
                Bachelor nautikk (NTNU, HVL, UiT) gir D2-kompetanse etter 18 måneders fartstid, deretter 
                18 måneder til D1. Total tid fra bachelor til kaptein: ~8-10 år.
              </p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Spesialiseringsveier:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>DP (Dynamic Positioning):</strong> Offshore PSV/AHTS med DP2-DP3 systemer</li>
                <li><strong>Havbruk:</strong> Spesialisering i brønnbåt-operasjoner (fisketransport)</li>
                <li><strong>Cruise:</strong> Cruiseskip med 1000+ passasjerer (krever D1 + erfaring)</li>
                <li><strong>Landbasert:</strong> Operasjonsansvarlig, teknisk direktør, inspektør (etter 10+ år)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", marginBottom: 24 }}>
              Ofte stilte spørsmål om dekksoffiserlønn
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                {
                  q: "Hva er forskjellen på D1, D2, D3, D4, D5 og D6?",
                  a: "D1-D6 er STCW dekksoffisersertifikater basert på bruttotonnasje (GT): D6 (matros), D5 (0-500 GT), D4 (500-3000 GT), D3 (500-3000 GT), D2 (3000+ GT), D1 (ubegrenset). Høyere sertifikat gir tilgang til større skip og høyere lønn. D1 (kaptein) tjener 840k-1.2M+/år, mens D5 (3. styrmann) tjener 500k-620k/år.",
                },
                {
                  q: "Hvor mye tjener en dekksoffiser i offshore?",
                  a: "Offshore PSV/AHTS betaler best for dekksoffiserer: D5 (580k-620k), D4 (600k-660k), D3 (680k-780k), D2 (780k-900k), D1 (900k-1.14M+). Offshore krever ofte DP-kurs, BRM og lengre turnuser (4/4 eller 6/6), men gir høyere lønn og mer overtid enn havbruk/kystfart.",
                },
                {
                  q: "Trenger jeg bachelor for å bli kaptein?",
                  a: "Nei, du kan bli kaptein via Vg3 nautikk (D5) og jobbe deg opp til D1 med fartstid. Bachelor nautikk (NTNU, HVL, UiT) gir raskere vei til D2-D1, men er ikke påkrevd. Mange velger fagbrev matros + maritime påbygg → D5, deretter oppgradering med fartstid.",
                },
                {
                  q: "Hvilken sektor betaler best for dekksoffiserer?",
                  a: "Offshore PSV/AHTS betaler best (D1: 900k-1.14M+), fulgt av havbruk brønnbåt (D1: 840k-1.0M) og cruise (D1: 1.0-1.4M). Kystfart betaler lavest (D1: 820k-960k). Offshore har høyere risikotillegg, mer overtid og lengre turnuser, mens kystfart har dagturnus og familievennlige ordninger.",
                },
                {
                  q: "Hvor lang tid tar det fra D5 til D1?",
                  a: "Fra D5 til D1 tar typisk 8-10 år med kontinuerlig fartstid: D5 (start) → D4 (12 mnd) → D3 (18 mnd) → D2 (18 mnd) → D1 (18 mnd) = minimum 5.5 år fartstid + utdanning. Med bachelor nautikk kan du starte på D2-nivå og nå D1 på 3-4 år. Typisk alder for kaptein er 35-50 år.",
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
        <section style={{ padding: "60px 0", background: "#f1f5f9" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px", textAlign: "center" }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
              Søk dekksoffiser-jobber med Bluecrew
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: "#475569", marginBottom: 32 }}>
              Vi kobler kvalifiserte dekksoffiserer med ledende rederier i havbruk, offshore og maritim service. 
              Registrer deg gratis og få tilgang til eksklusive jobber.
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
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: "#0f172a", marginBottom: 20 }}>
              Relaterte guider:
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
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
                    3. styrmann, 2. styrmann og overstyrsmann – lønn og karrierevei
                  </p>
                </div>
              </Link>
              <Link href="/jobbsoker/guides/hvordan-bli-styrmann" style={{ textDecoration: "none" }}>
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
                    Hvordan bli styrmann?
                  </h4>
                  <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
                    Utdanning, D1-D6 sertifikater og karriereveier – komplett guide
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
