import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import SiteLayout from "../../components/SiteLayout";

export const metadata: Metadata = {
  title: "Maskinoffiser Lønn Norge 2025 - Hva tjener en maskinoffiser?",
  description:
    "Komplett guide til maskinoffiserlønn i Norge 2025. M1-M4 klasser, lønn i havbruk, offshore og maritim service. STCW III/1-III/3 krav og karrierevei til sjefsingeniør.",
  keywords: [
    "maskinoffiser lønn",
    "maskinsjef lønn",
    "motormann lønn",
    "maskinoffiser lønn norge",
    "M1 M2 M3 M4 lønn",
    "havbruk maskinoffiser",
    "offshore maskinoffiser",
    "STCW maskin",
    "maritime stillinger lønn",
    "sjefsingeniør lønn",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Maskinoffiser Lønn Norge 2025 - Komplett Guide | Bluecrew",
    description: "Hva tjener en maskinoffiser i Norge? M1-M4 klasser, STCW-krav og karrierevei fra motormann til sjefsingeniør.",
    type: "article",
  },
  alternates: {
    canonical: "/lonn/maskinoffiser",
  },
};

export default function Page() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17731534362"
        strategy="afterInteractive"
      />
      <Script id="google-ads-maskinoffiser" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17731534362');
          gtag('config', 'G-T4LZ5PSGP9');
        `}
      </Script>
      <SiteLayout active="jobbsoker">
        <main style={{ background: "#f8fafc" }}>
        {/* Hero */}
        <section style={{ padding: "80px 0 40px", background: "linear-gradient(180deg, rgba(2,6,23,0.03), rgba(2,6,23,0))" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <h1 style={{ fontSize: 40, fontWeight: 800, color: "#0f172a", marginBottom: 16, lineHeight: 1.2 }}>
              Maskinoffiser Lønn i Norge 2025
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.7, color: "#475569", maxWidth: 800, marginBottom: 32 }}>
              Komplett oversikt over lønn for maskinoffiserer i norsk maritime sektor. Fra motormann til sjefsingeniør – 
              M1, M2, M3 og M4 klasser forklart med lønnsdata fra havbruk, offshore og servicefartøy.
            </p>
            <div style={{ marginTop: 32 }}>
              <Image
                src="/guides/Maskinoffiser-maskinrom.jpeg"
                alt="Maskinoffiser inspiserer teknisk utstyr og motorer i maskinrom på brønnbåt - maritime tekniske operasjoner"
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
            {/* Disclaimer */}
            <div style={{ background: "#fef3c7", padding: "16px 20px", borderRadius: 8, marginBottom: 24, border: "1px solid #fbbf24" }}>
              <p style={{ fontSize: 14, color: "#92400e", margin: 0, lineHeight: 1.6 }}>
                <strong>📊 Merk:</strong> Lønnsdata er estimater basert på{" "}
                <a href="https://www.nsf.no/tariff" target="_blank" rel="noopener" style={{ color: "#92400e", textDecoration: "underline" }}>NSF tariffavtaler</a>,{" "}
                <a href="https://www.ssb.no/arbeid-og-lonn/lonn-og-arbeidskraftkostnader/statistikk/lonn" target="_blank" rel="noopener" style={{ color: "#92400e", textDecoration: "underline" }}>SSB lønnsstatistikk</a>,{" "}
                <a href="https://www.nav.no/no/person/arbeid/arbeidsmarkedet-og-yrker" target="_blank" rel="noopener" style={{ color: "#92400e", textDecoration: "underline" }}>NAV yrkesinformasjon</a> og bransjeundersøkelser per november 2025. 
                Faktisk lønn varierer basert på erfaring, rederiet, sektor og individuell forhandling.
              </p>
            </div>

            <div style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
                Hva tjener en maskinoffiser i Norge?
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 20 }}>
                En maskinoffiser i Norge tjener typisk <strong>500,000–900,000 kr per år</strong>, avhengig av 
                sertifikat (M1-M4), erfaring og sektor. Motormann starter på 480k-560k, mens sjefsingeniører 
                (M1) i offshore kan tjene opp til 1,000,000 kr/år med overtid.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155" }}>
                Maskinoffiserer er ansvarlige for fremdriftsmaskineriet, elektriske systemer og teknisk vedlikehold 
                om bord. Høyere sertifikat (M1) gir tilgang til større skip og betydelig høyere lønn.
              </p>
            </div>
          </div>
        </section>

        {/* Lønnstabell */}
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", marginBottom: 24 }}>
              Lønnstabell for maskinoffiserer i Norge 2025
            </h2>
            <div style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#0f172a" }}>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>Sertifikat</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>Tittel</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>Maskineffekt</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>Årslønn (kr)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>Motormann</td>
                    <td style={{ padding: "16px 20px", color: "#475569" }}>Assistent</td>
                    <td style={{ padding: "16px 20px", color: "#64748b", fontSize: 14 }}>Ingen grense</td>
                    <td style={{ padding: "16px 20px", color: "#0ea5e9", fontWeight: 600 }}>480,000 – 560,000</td>
                  </tr>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>M4</td>
                    <td style={{ padding: "16px 20px", color: "#475569" }}>3. maskinoffiser</td>
                    <td style={{ padding: "16px 20px", color: "#64748b", fontSize: 14 }}>0–750 kW</td>
                    <td style={{ padding: "16px 20px", color: "#0ea5e9", fontWeight: 600 }}>540,000 – 660,000</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>M3</td>
                    <td style={{ padding: "16px 20px", color: "#475569" }}>2. maskinoffiser</td>
                    <td style={{ padding: "16px 20px", color: "#64748b", fontSize: 14 }}>750–3000 kW</td>
                    <td style={{ padding: "16px 20px", color: "#0ea5e9", fontWeight: 600 }}>620,000 – 780,000</td>
                  </tr>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>M2</td>
                    <td style={{ padding: "16px 20px", color: "#475569" }}>1. maskinoffiser</td>
                    <td style={{ padding: "16px 20px", color: "#64748b", fontSize: 14 }}>3000+ kW</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 600 }}>720,000 – 900,000</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>M1</td>
                    <td style={{ padding: "16px 20px", color: "#475569" }}>Sjefsingeniør</td>
                    <td style={{ padding: "16px 20px", color: "#64748b", fontSize: 14 }}>Ubegrenset</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 600 }}>840,000 – 1,000,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 14, color: "#64748b", marginTop: 12, fontStyle: "italic" }}>
              Tall er estimater basert på tariffavtaler, bransjeundersøkelser og offentlig tilgjengelig statistikk. 
              M1-M4 refererer til STCW maskinoffisersertifikater utstedt av Sjøfartsdirektoratet.
            </p>
          </div>
        </section>

        {/* M4 - 3. maskinoffiser */}
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
                M4 - 3. maskinoffiser (540k–660k)
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 16 }}>
                M4-sertifikat (STCW III/3) gir rett til å være maskinoffiser på skip med fremdriftsmaskineri 
                opp til <strong>750 kW</strong>. Dette er inngangsposisjonen for maskinoffiserer og typisk første 
                jobb etter fagskole eller maritime videregående.
              </p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Typisk lønnspakke:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Grunnlønn:</strong> 540,000–660,000 kr/år</li>
                <li><strong>Sektor:</strong> Havbruk (brønnbåt), kystfart, mindre servicefartøy</li>
                <li><strong>Turnus:</strong> 2/2 eller 4/4 (50% friperiode)</li>
                <li><strong>Overtid:</strong> Betalt overtid ved vedlikehold og reparasjoner</li>
                <li><strong>Kost og losji:</strong> Gratis om bord</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Ansvar:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li>Drift og overvåking av fremdriftsmaskineri</li>
                <li>Vedlikehold av hjelpemaskiner (generatorer, pumper, kompressorer)</li>
                <li>Elektriske systemer og automatikk</li>
                <li>Daglig logging og rapportering</li>
                <li>HMS-rutiner i maskinrom</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Krav:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Vg3 maskin og energi</strong> (maritime fag) + 12 måneders fartstid</li>
                <li><strong>STCW grunnleggende sikkerhetskurs</strong> (PST, FPFF, EFA, PSSR)</li>
                <li><strong>Helseattest</strong> godkjent av Sjøfartsdirektoratet</li>
                <li><strong>Fagbrev industrimekaniker/energimontør</strong> (anbefalt)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* M3 - 2. maskinoffiser */}
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
                M3 - 2. maskinoffiser (620k–780k)
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 16 }}>
                M3-sertifikat (STCW III/2) gir rett til skip med fremdriftsmaskineri mellom 
                <strong> 750–3000 kW</strong>. Dette dekker de fleste brønnbåter, servicefartøy og mindre offshore-fartøy.
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
                <li>Assistere sjefsingeniør/1. maskinoffiser</li>
                <li>Overvåke fremdriftssystemer og hjelpemaskiner</li>
                <li>Planlegge og gjennomføre vedlikehold</li>
                <li>Feilsøking og reparasjoner</li>
                <li>Opplæring av motormann og lærling</li>
                <li>Rapportering til maskinsjef</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Krav:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>M4-sertifikat</strong> + 12 måneder fartstid som 3. maskinoffiser</li>
                <li><strong>Eller:</strong> 3 år maritimt fagskole (VG3 + påbygg)</li>
                <li><strong>STCW Advanced Fire Fighting</strong> (ofte påkrevd)</li>
                <li><strong>Elkraftbevis</strong> (anbefalt for større fartøy)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* M2 - 1. maskinoffiser */}
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
                M2 - 1. maskinoffiser (720k–900k)
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 16 }}>
                M2-sertifikat (STCW III/1 Second Engineer) gir rett til skip med fremdriftsmaskineri 
                <strong> over 3000 kW</strong>. Dette inkluderer offshore supply, større brønnbåter og cruise.
              </p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Typisk lønnspakke:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Grunnlønn:</strong> 720,000–900,000 kr/år</li>
                <li><strong>Offshore PSV/AHTS:</strong> 780,000–900,000 kr/år</li>
                <li><strong>Havbruk (stor brønnbåt):</strong> 740,000–840,000 kr/år</li>
                <li><strong>Turnus:</strong> 4/4 eller 6/6</li>
                <li><strong>Overtid:</strong> Betydelig overtidsbetaling ved reparasjoner</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Ansvar:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li>Assistere sjefsingeniør med driften</li>
                <li>Ansvar for vedlikeholdsprogram og inspeksjoner</li>
                <li>Koordinere reparasjoner og modifikasjoner</li>
                <li>Budsjettansvar for maskinavdeling</li>
                <li>Lede maskinbesetning ved sjefsingeniørs fravær</li>
                <li>Teknisk rapportering til reder</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Krav:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>M3-sertifikat</strong> + 18 måneder fartstid som 2. maskinoffiser</li>
                <li><strong>Eller:</strong> Bachelor mariningeniør (NTNU, HVL)</li>
                <li><strong>STCW Medical Care</strong> (førstehjelpslærer)</li>
                <li><strong>Elkraftbevis for høyspent</strong> (ofte krav)</li>
                <li><strong>Lederkurs</strong> (HMS, personledelse)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* M1 - Sjefsingeniør */}
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
                M1 - Sjefsingeniør (840k–1,000k+)
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 16 }}>
                M1-sertifikat (STCW III/1 Chief Engineer) er det høyeste maskinoffisersertifikatet og gir rett til 
                <strong> ubegrenset maskineffekt</strong>. Sjefsingeniør har øverste ansvar for all maskinteknisk drift om bord.
              </p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Lønn etter sektor:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Offshore PSV/AHTS:</strong> 900,000–1,000,000+ kr/år</li>
                <li><strong>Havbruk (brønnbåt):</strong> 840,000–960,000 kr/år</li>
                <li><strong>Cruise (stor):</strong> 880,000–1,100,000 kr/år</li>
                <li><strong>Servicefartøy:</strong> 820,000–920,000 kr/år</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Ansvar:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li>Øverste ansvar for alle maskinsystemer om bord</li>
                <li>Lede maskinbesetning (motormann, lærling, offiserer)</li>
                <li>Budsjett- og innkjøpsansvar</li>
                <li>Planlegge vedlikehold, dokking og modifikasjoner</li>
                <li>Rapportere til kaptein og reder</li>
                <li>Sikre HMS-compliance (ISO, ISPS, MLC)</li>
                <li>Teknisk godkjenning av reparasjoner</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Krav:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>M2-sertifikat</strong> + 18 måneder fartstid som 1. maskinoffiser</li>
                <li><strong>Eller:</strong> Bachelor mariningeniør + fartstid</li>
                <li><strong>Master mariningeniør</strong> (anbefalt for cruiseskip)</li>
                <li><strong>STCW Management Level</strong> (ledelseskurs)</li>
                <li><strong>ISM-kurs</strong> (International Safety Management)</li>
                <li><strong>10+ års erfaring</strong> i marinteknisk drift (typisk)</li>
              </ul>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginTop: 16 }}>
                <strong>Karrieretopp:</strong> Sjefsingeniør er toppstillingen i maskinbesetningen. Mange velger 
                senere å gå i land som teknisk direktør, operasjonsansvarlig eller inspektør hos rederi/klassifikasjonsselskap.
              </p>
            </div>
          </div>
        </section>

        {/* Sektor-sammenligning */}
        <section style={{ padding: "40px 0", background: "#f1f5f9" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", marginBottom: 24 }}>
              Lønn etter sektor – Hvor tjener maskinoffiserer best?
            </h2>
            <div style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#0f172a" }}>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>Sektor</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>M4 (3. off)</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>M3 (2. off)</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>M2 (1. off)</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>M1 (Sjef)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>Offshore PSV/AHTS</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 600 }}>600k–660k</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 600 }}>680k–780k</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 600 }}>780k–900k</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 600 }}>900k–1.0M+</td>
                  </tr>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>Havbruk (brønnbåt)</td>
                    <td style={{ padding: "16px 20px", color: "#0ea5e9", fontWeight: 600 }}>560k–620k</td>
                    <td style={{ padding: "16px 20px", color: "#0ea5e9", fontWeight: 600 }}>640k–740k</td>
                    <td style={{ padding: "16px 20px", color: "#0ea5e9", fontWeight: 600 }}>740k–840k</td>
                    <td style={{ padding: "16px 20px", color: "#0ea5e9", fontWeight: 600 }}>840k–960k</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>Servicefartøy</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>540k–600k</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>620k–720k</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>720k–840k</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>820k–920k</td>
                  </tr>
                  <tr style={{ background: "#f8fafc" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>Kystfart</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>520k–580k</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>600k–680k</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>700k–800k</td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>800k–900k</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 14, color: "#64748b", marginTop: 12, fontStyle: "italic" }}>
              Offshore betaler best på grunn av tøffere arbeidsforhold, høyere kompetansekrav (DP, høyspent) og 
              lengre turnuser. Havbruk krever spesialisering i RSW-anlegg (kjøleanlegg for levende fisk).
            </p>
          </div>
        </section>

        {/* STCW-krav */}
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", marginBottom: 24 }}>
              STCW-krav for maskinoffiserer
            </h2>
            <div style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 4px 20px rgba(2,6,23,0.06)" }}>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 20 }}>
                STCW (Standards of Training, Certification and Watchkeeping) regulerer krav til maskinoffiserer. 
                M1-M4 er norske betegnelser basert på STCW III/1-III/3.
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
                <li><strong>M4 (STCW III/3):</strong> Vg3 maskin + 12 mnd fartstid → 0-750 kW</li>
                <li><strong>M3 (STCW III/2):</strong> M4 + 12 mnd fartstid → 750-3000 kW</li>
                <li><strong>M2 (STCW III/1 Second):</strong> M3 + 18 mnd fartstid → 3000+ kW</li>
                <li><strong>M1 (STCW III/1 Chief):</strong> M2 + 18 mnd fartstid → Ubegrenset</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>
                3. Ekstra sertifikater (ofte påkrevd):
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24, marginBottom: 20 }}>
                <li><strong>Advanced Fire Fighting:</strong> Påkrevd for M2-M1</li>
                <li><strong>Medical Care:</strong> Påkrevd for M2-M1 (førstehjelpslærer)</li>
                <li><strong>Elkraftbevis høyspent:</strong> Ofte krav for offshore og cruise</li>
                <li><strong>ISM-kurs:</strong> Påkrevd for M1 (sikkerhetsledelse)</li>
                <li><strong>DP-kurs (Dynamic Positioning):</strong> Ofte krav offshore</li>
              </ul>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>
                4. Utdanningsveier:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Vg1-Vg2 elektro/teknikk</strong> + Vg3 maskin → M4</li>
                <li><strong>Bachelor mariningeniør</strong> (NTNU, HVL, UiT) → M2 etter fartstid</li>
                <li><strong>Fagbrev industrimekaniker</strong> + maritime påbygg → M4-M3</li>
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
                Karrierevei fra motormann til sjefsingeniør
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 16 }}>
                Veien fra motormann til sjefsingeniør tar typisk <strong>8-15 år</strong>, avhengig av utdanning, 
                fartstid og motivasjon. Mange stopper som 2. maskinoffiser (M3) eller 1. maskinoffiser (M2) 
                med god lønn og mindre ansvar enn sjefsingeniør.
              </p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Karrierestigen (typisk tidslinje):
              </h3>
              <ol style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Motormann/lærling (0-2 år):</strong> 480k–560k – Lærer grunnleggende maskinteknisk drift</li>
                <li><strong>3. maskinoffiser M4 (2-4 år):</strong> 540k–660k – Første offisersstilling, 0-750 kW</li>
                <li><strong>2. maskinoffiser M3 (4-6 år):</strong> 620k–780k – Mellomledelse, 750-3000 kW</li>
                <li><strong>1. maskinoffiser M2 (6-10 år):</strong> 720k–900k – Senior offiser, 3000+ kW</li>
                <li><strong>Sjefsingeniør M1 (10-15 år):</strong> 840k–1.0M+ – Øverste ansvar, ubegrenset maskineffekt</li>
              </ol>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Raskeste vei til M1:
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", marginBottom: 12 }}>
                Bachelor mariningeniør (NTNU, HVL) gir M2-kompetanse etter 18 måneders fartstid, deretter 
                18 måneder til M1. Total tid fra bachelor til sjefsingeniør: ~6-8 år.
              </p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginTop: 24, marginBottom: 12 }}>
                Spesialiseringsveier:
              </h3>
              <ul style={{ fontSize: 16, lineHeight: 1.8, color: "#334155", paddingLeft: 24 }}>
                <li><strong>Elkraft:</strong> Elkraftbevis høyspent → Cruiseskip, offshore, større fartøy</li>
                <li><strong>DP (Dynamic Positioning):</strong> Offshore PSV/AHTS med DP2-DP3 systemer</li>
                <li><strong>Havbruk:</strong> Spesialisering i RSW-anlegg (kjøleanlegg for levende fisk)</li>
                <li><strong>Landbasert:</strong> Teknisk direktør, operasjonsansvarlig, inspektør (etter 10+ år)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", marginBottom: 24 }}>
              Ofte stilte spørsmål om maskinoffiserlønn
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                {
                  q: "Hva er forskjellen på M1, M2, M3 og M4?",
                  a: "M1-M4 er STCW maskinoffisersertifikater basert på maskineffekt: M4 (0-750 kW), M3 (750-3000 kW), M2 (3000+ kW), M1 (ubegrenset). Høyere sertifikat gir tilgang til større skip og høyere lønn. M1 (sjefsingeniør) tjener 840k-1.0M+/år, mens M4 (3. maskinoffiser) tjener 540k-660k/år.",
                },
                {
                  q: "Hvor mye tjener en maskinoffiser i offshore?",
                  a: "Offshore PSV/AHTS betaler best for maskinoffiserer: M4 (600k-660k), M3 (680k-780k), M2 (780k-900k), M1 (900k-1.0M+). Offshore krever ofte DP-kurs, elkraftbevis høyspent og lengre turnuser (4/4 eller 6/6), men gir høyere lønn og mer overtid enn havbruk/kystfart.",
                },
                {
                  q: "Trenger jeg bachelor for å bli maskinoffiser?",
                  a: "Nei, du kan bli maskinoffiser via Vg3 maskin og energi (M4) og jobbe deg opp til M1 med fartstid. Bachelor mariningeniør (NTNU, HVL) gir raskere vei til M2-M1, men er ikke påkrevd. Mange velger fagbrev industrimekaniker + maritime påbygg → M4, deretter oppgradering med fartstid.",
                },
                {
                  q: "Hvilken sektor betaler best for maskinoffiserer?",
                  a: "Offshore PSV/AHTS betaler best (M1: 900k-1.0M+), fulgt av havbruk brønnbåt (M1: 840k-960k) og cruise (M1: 880k-1.1M). Kystfart betaler lavest (M1: 800k-900k). Offshore har høyere risikotillegg, mer overtid og lengre turnuser, mens kystfart har dagturnus og familievennlige ordninger.",
                },
                {
                  q: "Hvor lang tid tar det fra M4 til M1?",
                  a: "Fra M4 til M1 tar typisk 6-8 år med kontinuerlig fartstid: M4 (start) → M3 (12 mnd) → M2 (18 mnd) → M1 (18 mnd) = minimum 4 år fartstid + utdanning. Med bachelor mariningeniør kan du starte på M2-nivå og nå M1 på 3-4 år. Typisk alder for sjefsingeniør er 35-45 år.",
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
              Søk maskinoffiser-jobber med Bluecrew
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: "#475569", marginBottom: 32 }}>
              Vi kobler kvalifiserte maskinoffiserer med ledende rederier i havbruk, offshore og maritim service. 
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
                href="/faq"
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
                Ofte stilte spørsmål
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
              <Link href="/lonn/kaptein" style={{ textDecoration: "none" }}>
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
              <Link href="/lonn/matros" style={{ textDecoration: "none" }}>
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
                    Matros Lønn Norge 2025
                  </h4>
                  <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
                    Lettmatros, matros og båtsmann – lønn, STCW-krav og karrierevei
                  </p>
                </div>
              </Link>
              <Link href="/karriere/maskinoffiser" style={{ textDecoration: "none" }}>
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
                    Hvordan bli maskinoffiser?
                  </h4>
                  <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
                    Utdanning, M1-M4 sertifikater og karriereveier – komplett guide
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
    </>
  );
}


