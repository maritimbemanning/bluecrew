import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteLayout from "../../components/SiteLayout";
import { sx } from "../../lib/styles";

export const metadata: Metadata = {
  title: "Kaptein Lønn Norge 2025 - Hva tjener en kaptein i maritime stillinger?",
  description:
    "Komplett oversikt over kapteinlønn i Norge 2025: Havbruk, offshore, servicefartøy og cruise. Fra 650.000 til 1.200.000+ kr/år. STCW-krav, turnus og karriereveier.",
  keywords: [
    "kaptein lønn",
    "skipsfører lønn",
    "master lønn norge",
    "kaptein havbruk lønn",
    "kaptein offshore lønn",
    "skipsfører lønn 2025",
    "hva tjener en kaptein",
    "kaptein brønnbåt lønn",
    "servicefartøy kaptein",
    "maritime lønninger",
    "STCW II/2 lønn",
    "kaptein karriere",
  ],
  openGraph: {
    title: "Kaptein Lønn Norge 2025 | Komplett guide | Bluecrew AS",
    description: "Hva tjener en kaptein i Norge? Lønn fra 650.000 til 1.200.000+ kr/år. Offshore, havbruk, servicefartøy - alle sektorer dekket.",
    type: "article",
  },
  alternates: {
    canonical: "/lonn/kaptein",
  },
};

export default function Page() {
  return (
    <SiteLayout active="jobbsoker">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <div style={{ 
            marginBottom: 32, 
            borderRadius: 16, 
            overflow: "hidden", 
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            position: "relative",
            height: 400
          }}>
            <Image 
              src="/guides/skipsforer-navigasjon.jpeg" 
              alt="Kaptein på broen navigerer fartøy - maritim bemanning Norge - lønn og karriere" 
              width={1200}
              height={675}
              priority
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8, fontWeight: 500 }}>
            Sist oppdatert: 2. november 2025
          </div>
          <h1 style={sx.h2}>Kaptein Lønn i Norge 2025</h1>
          <p style={sx.leadSmall}>
            Komplett oversikt over lønn for kaptein (skipsfører/master) i Norge: Havbruk, offshore, servicefartøy, 
            cruise og mer. Basert på tariffavtaler, bransjedata og reelle stillingsutlysninger. Oppdatert november 2025.
          </p>

          <div style={{ background: "#e0f2fe", border: "2px solid #0ea5e9", borderRadius: 12, padding: 20, marginTop: 32 }}>
            <p style={{ margin: 0, color: "#0c4a6e", fontSize: 16, lineHeight: 1.6 }}>
              <strong>Kort oppsummert:</strong> En kaptein i Norge tjener mellom <strong>650.000 kr og 1.200.000+ kr/år</strong> 
              avhengig av sektor, erfaring og turnusordning. Offshore og brønnbåt betaler høyest (900k-1.2M kr), 
              havbruk/servicefartøy 650k-900k kr, kystfart 600k-800k kr. Krever <strong>STCW II/2</strong> og 
              <strong>dekksoffiser D1-sertifikat</strong>.
            </p>
          </div>

          {/* Innhold */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Innhold</h2>
            <div style={{ display: "grid", gap: 10, fontSize: 16, paddingLeft: 20 }}>
              <a href="#lonntabell" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ Lønnstabell per sektor</a>
              <a href="#havbruk" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ Havbruk og brønnbåt</a>
              <a href="#offshore" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ Offshore og supply</a>
              <a href="#servicefartoy" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ Servicefartøy</a>
              <a href="#turnus" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ Turnusordninger og faktisk årslønn</a>
              <a href="#krav" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ STCW-krav og kvalifikasjoner</a>
              <a href="#karriere" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ Karriereveien til kaptein</a>
              <a href="#faq" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ Ofte stilte spørsmål</a>
            </div>
          </div>

          {/* Lønnstabell */}
          <div id="lonntabell" style={{ marginTop: 56 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 24 }}>Lønnstabell: Kaptein per sektor 2025</h2>
            
            <div style={{ overflowX: "auto", marginBottom: 24 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", borderRadius: 12, overflow: "hidden" }}>
                <thead>
                  <tr style={{ background: "#0ea5e9", color: "#ffffff" }}>
                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: 700 }}>Sektor</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: 700 }}>Månedslønn</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: 700 }}>Årslønn (før skatt)</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: 700 }}>Turnus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600 }}>Brønnbåt/Havbruk</td>
                    <td style={{ padding: "16px 20px" }}>70.000 - 100.000 kr</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 700 }}>840.000 - 1.200.000 kr</td>
                    <td style={{ padding: "16px 20px" }}>4/4, 2/2</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600 }}>Offshore (PSV/AHTS)</td>
                    <td style={{ padding: "16px 20px" }}>75.000 - 95.000 kr</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 700 }}>900.000 - 1.140.000 kr</td>
                    <td style={{ padding: "16px 20px" }}>4/4, 6/6</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600 }}>Servicefartøy</td>
                    <td style={{ padding: "16px 20px" }}>60.000 - 75.000 kr</td>
                    <td style={{ padding: "16px 20px", color: "#f59e0b", fontWeight: 700 }}>720.000 - 900.000 kr</td>
                    <td style={{ padding: "16px 20px" }}>2/2, 4/4</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600 }}>Kystfart/Ferge</td>
                    <td style={{ padding: "16px 20px" }}>50.000 - 65.000 kr</td>
                    <td style={{ padding: "16px 20px", color: "#f59e0b", fontWeight: 700 }}>600.000 - 780.000 kr</td>
                    <td style={{ padding: "16px 20px" }}>Dagturnus, vakt</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "16px 20px", fontWeight: 600 }}>Cruise (internasjonal)</td>
                    <td style={{ padding: "16px 20px" }}>55.000 - 80.000 kr</td>
                    <td style={{ padding: "16px 20px", color: "#f59e0b", fontWeight: 700 }}>660.000 - 960.000 kr</td>
                    <td style={{ padding: "16px 20px" }}>8/8, 6/6</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ background: "#fff3cd", border: "1px solid #ffc107", borderRadius: 12, padding: 16, fontSize: 14, color: "#856404" }}>
              <strong>Viktig:</strong> Lønningene inkluderer grunnlønn og varierer med overtid, tillegg (kost, losji), beredskap 
              og tariffavtaler. Erfarne kapteiner med spesialkompetanse (DP, ROV) kan tjene 100.000+ kr ekstra per år.
            </div>
          </div>

          {/* Havbruk og brønnbåt */}
          <div id="havbruk" style={{ marginTop: 56 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Kaptein på brønnbåt og havbruk</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
              Brønnbåter og havbruksfartøy tilbyr <strong>høyest lønn for kapteiner i Norge</strong>. Kombinasjonen av 
              spesialistkompetanse, krevende operasjoner og offshore-turnus gir årslønn på <strong>840.000 - 1.200.000 kr</strong>.
            </p>

            <h3 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 16 }}>Typisk lønnspakke:</h3>
            <ul style={{ margin: "16px 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, fontSize: 16, display: "grid", gap: 10 }}>
              <li><strong>Grunnlønn:</strong> 70.000 - 100.000 kr/måned</li>
              <li><strong>Kost og losji:</strong> Inkludert om bord (verdi ~15.000 kr/mnd)</li>
              <li><strong>Overtidsbetaling:</strong> Variabel, gjennomsnitt 10.000-20.000 kr/mnd</li>
              <li><strong>Beredskap/vakt:</strong> Tillegg på 5.000-10.000 kr/mnd</li>
              <li><strong>Pensjon:</strong> Innskuddspensjon 5-10%</li>
              <li><strong>Turnus:</strong> 4 uker på / 4 uker av eller 2/2</li>
            </ul>

            <div style={{ background: "#dcfce7", border: "1px solid #22c55e", borderRadius: 12, padding: 20, marginTop: 24 }}>
              <p style={{ margin: 0, color: "#166534", fontSize: 16, lineHeight: 1.6 }}>
                <strong>Eksempel:</strong> Kaptein på brønnbåt med 8 års erfaring, 4/4 turnus:<br />
                Grunnlønn: 85.000 kr/mnd × 12 = <strong>1.020.000 kr</strong><br />
                Overtid/tillegg: ~15.000 kr/mnd × 6 mnd = <strong>90.000 kr</strong><br />
                <strong>Total årslønn: 1.110.000 kr</strong> (før skatt)
              </p>
            </div>

            <h3 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 16 }}>Krav for havbruk/brønnbåt:</h3>
            <ul style={{ margin: "16px 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, fontSize: 16, display: "grid", gap: 8 }}>
              <li>STCW II/2 (Master &lt; 3000 GT)</li>
              <li>Dekksoffiser D1 eller D2</li>
              <li>Erfaring fra havbruk eller offshore (2-5 år)</li>
              <li>GOC (General Operator&apos;s Certificate) radiosertifikat</li>
              <li>Ofte krav om Dynamic Positioning (DP) sertifikat</li>
              <li>HMS-kompetanse spesifikk for akvakultur</li>
            </ul>
          </div>

          {/* Offshore */}
          <div id="offshore" style={{ marginTop: 56 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Kaptein offshore (PSV, AHTS, Supply)</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
              Offshore supply-fartøy (PSV - Platform Supply Vessel, AHTS - Anchor Handling Tug Supply) krever 
              erfarne kapteiner for krevende operasjoner i Nordsjøen. Lønn: <strong>900.000 - 1.140.000 kr/år</strong>.
            </p>

            <h3 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 16 }}>Lønnsstruktur:</h3>
            <ul style={{ margin: "16px 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, fontSize: 16, display: "grid", gap: 10 }}>
              <li><strong>Grunnlønn:</strong> 75.000 - 95.000 kr/måned</li>
              <li><strong>Offshore-tillegg:</strong> 8.000-15.000 kr/mnd (risiko, beredskap)</li>
              <li><strong>Turnus:</strong> 4/4 eller 6/6 (betalt for fri-perioder)</li>
              <li><strong>Overtid:</strong> Beregnet utover 8-timers dag</li>
              <li><strong>Utstyr/sertifikater:</strong> Dekket av arbeidsgiver</li>
            </ul>

            <h3 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 16 }}>Spesialkompetanse som øker lønn:</h3>
            <ul style={{ margin: "16px 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, fontSize: 16, display: "grid", gap: 8 }}>
              <li><strong>DP (Dynamic Positioning):</strong> +100.000-150.000 kr/år</li>
              <li><strong>AHTS-erfaring:</strong> +50.000-80.000 kr/år</li>
              <li><strong>IMO Advanced Fire Fighting:</strong> Påkrevd for offshore</li>
              <li><strong>Offshore Safety & Emergency Training:</strong> Obligatorisk</li>
            </ul>
          </div>

          {/* Servicefartøy */}
          <div id="servicefartoy" style={{ marginTop: 56 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Kaptein på servicefartøy</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
              Servicefartøy betjener havbruk, offshore-installasjoner og kystnæringen. Mer forutsigbare ruter enn offshore, 
              men fortsatt krevende operasjoner. Lønn: <strong>720.000 - 900.000 kr/år</strong>.
            </p>

            <ul style={{ margin: "24px 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, fontSize: 16, display: "grid", gap: 10 }}>
              <li><strong>Grunnlønn:</strong> 60.000 - 75.000 kr/måned</li>
              <li><strong>Turnus:</strong> 2 uker på / 2 uker av (vanligst)</li>
              <li><strong>Arbeidsområde:</strong> Kyst-Norge, Nord-Norge, Vestlandet</li>
              <li><strong>Krav:</strong> STCW II/2, D1/D2, erfaring fra kystfart</li>
            </ul>
          </div>

          {/* Turnus */}
          <div id="turnus" style={{ marginTop: 56 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Turnusordninger og faktisk årslønn</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
              Turnusordningen påvirker <strong>faktisk arbeidstid</strong> og dermed <strong>månedslønn vs årslønn</strong>. 
              Viktig å forstå forskjellen:
            </p>

            <div style={{ overflowX: "auto", marginTop: 24, marginBottom: 24 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", borderRadius: 12, overflow: "hidden" }}>
                <thead>
                  <tr style={{ background: "#6366f1", color: "#ffffff" }}>
                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: 700 }}>Turnus</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: 700 }}>Arbeidsdager/år</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: 700 }}>Fridager/år</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: 700 }}>Effektiv timelønn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600 }}>2/2 (2 uker på/av)</td>
                    <td style={{ padding: "16px 20px" }}>182 dager</td>
                    <td style={{ padding: "16px 20px" }}>183 dager</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 700 }}>Høyest</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600 }}>4/4 (4 uker på/av)</td>
                    <td style={{ padding: "16px 20px" }}>182 dager</td>
                    <td style={{ padding: "16px 20px" }}>183 dager</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 700 }}>Høy</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600 }}>6/6 (6 uker på/av)</td>
                    <td style={{ padding: "16px 20px" }}>182 dager</td>
                    <td style={{ padding: "16px 20px" }}>183 dager</td>
                    <td style={{ padding: "16px 20px", color: "#f59e0b", fontWeight: 700 }}>Medium</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "16px 20px", fontWeight: 600 }}>Dagturnus (fastland)</td>
                    <td style={{ padding: "16px 20px" }}>~220 dager</td>
                    <td style={{ padding: "16px 20px" }}>~145 dager</td>
                    <td style={{ padding: "16px 20px", color: "#ef4444", fontWeight: 700 }}>Lavere</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 12, padding: 20, marginTop: 24 }}>
              <p style={{ margin: 0, color: "#78350f", fontSize: 16, lineHeight: 1.6 }}>
                <strong>Tips:</strong> Offshore-turnus (4/4, 6/6) gir høyere årslønn fordi du jobber 12-timers skift 
                og får betalt for fri-perioder. Dagturnus betyr lavere månedslønn men mer forutsigbar hverdag.
              </p>
            </div>
          </div>

          {/* STCW-krav */}
          <div id="krav" style={{ marginTop: 56 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>STCW-krav og kvalifikasjoner</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
              For å jobbe som kaptein i Norge må du ha:
            </p>

            <div style={{ display: "grid", gap: 24, marginTop: 24 }}>
              <div style={{ background: "#ffffff", borderRadius: 16, padding: 24, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <h3 style={{ margin: "0 0 12px 0", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>
                  1. STCW II/2 (Master &lt; 3000 GT)
                </h3>
                <p style={{ margin: "0 0 12px 0", color: "#475569", lineHeight: 1.7 }}>
                  Skipsfører-sertifikat for skip under 3000 bruttotonn. Krever bachelor i nautikk eller tilsvarende 
                  fartstid + kvalifikasjonsbevis.
                </p>
                <p style={{ margin: 0, fontSize: 14, color: "#64748b" }}>
                  <strong>Fornyes hver 5. år</strong> med dokumentert fartstid og oppdaterte HMS-kurs.
                </p>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 16, padding: 24, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <h3 style={{ margin: "0 0 12px 0", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>
                  2. Dekksoffiser D1 eller D2
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  D1: Skip under 500 GT, alle farvann<br />
                  D2: Skip 500-3000 GT, nært kystfarvann
                </p>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 16, padding: 24, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <h3 style={{ margin: "0 0 12px 0", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>
                  3. Grunnleggende sikkerhet (STCW VI/1)
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Obligatorisk sikkerhetskurs: Brannslukking, førstehjelp, overlevelsesutstyr, sikkerhet til sjøs.
                </p>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 16, padding: 24, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <h3 style={{ margin: "0 0 12px 0", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>
                  4. Radiosertifikat (GOC)
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  General Operator&apos;s Certificate - nødvendig for VHF/MF/HF radiokommunikasjon.
                </p>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Tilleggskurs som øker lønn:</h3>
              <ul style={{ margin: 0, paddingLeft: 24, color: "#334155", lineHeight: 1.7, fontSize: 16, display: "grid", gap: 8 }}>
                <li><strong>DP (Dynamic Positioning):</strong> Unlimited eller Limited - +100k-150k kr/år</li>
                <li><strong>Advanced Fire Fighting:</strong> Ofte krevd for offshore</li>
                <li><strong>Medical Care:</strong> Medisinsk ansvar om bord</li>
                <li><strong>ROV Pilot/Superintendent:</strong> For fartøy med undervannsteknologi</li>
                <li><strong>Security Awareness (ISPS):</strong> Sikkerhet i havner</li>
              </ul>
            </div>
          </div>

          {/* Karrierevei */}
          <div id="karriere" style={{ marginTop: 56 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Karriereveien til kaptein</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
              Fra matros til kaptein tar vanligvis <strong>8-15 år</strong> avhengig av utdanningsvalg og fartstid:
            </p>

            <div style={{ marginTop: 32, display: "grid", gap: 16 }}>
              {[
                { step: "1", title: "Matros / Lettmatros", time: "0-2 år", desc: "Bygge grunnleggende sjøerfaring, STCW VI/1" },
                { step: "2", title: "3. Styrmann", time: "2-4 år", desc: "Kvalifikasjonsbevis matros, begynne nautikkutdanning" },
                { step: "3", title: "2. Styrmann", time: "4-6 år", desc: "Bachelor nautikk, D3-sertifikat, 12+ mnd fartstid" },
                { step: "4", title: "Overstyrsmann / 1. Styrmann", time: "6-10 år", desc: "D2-sertifikat, 24+ mnd fartstid som styrmann" },
                { step: "5", title: "Kaptein / Skipsfører", time: "8-15 år", desc: "STCW II/2, D1/D2, 36+ mnd fartstid, ledererfaring" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 20, background: "#f8fafc", borderRadius: 12, padding: 20, border: "1px solid #e2e8f0" }}>
                  <div style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: "50%", 
                    background: "#0ea5e9", 
                    color: "#ffffff", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    fontWeight: 700, 
                    fontSize: 20,
                    flexShrink: 0
                  }}>
                    {item.step}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#0f172a" }}>{item.title}</h3>
                      <span style={{ fontSize: 14, color: "#64748b", fontWeight: 600 }}>{item.time}</span>
                    </div>
                    <p style={{ margin: 0, color: "#475569", lineHeight: 1.6, fontSize: 15 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "#e0f2fe", border: "1px solid #0ea5e9", borderRadius: 12, padding: 20, marginTop: 32 }}>
              <p style={{ margin: 0, color: "#0c4a6e", fontSize: 16, lineHeight: 1.6 }}>
                <strong>Snarvei:</strong> Med bachelor i nautikk fra høyskole (3 år) kan du bli kaptein på 5-7 år 
                totalt. Uten høyskoleutdanning tar det gjerne 10-15 år med praksis og kursing.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div id="faq" style={{ marginTop: 56, marginBottom: 56 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 24 }}>Ofte stilte spørsmål</h2>
            
            <div style={{ display: "grid", gap: 20 }}>
              <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
                <h3 style={{ margin: "0 0 12px 0", fontSize: 18, fontWeight: 700, color: "#0f172a" }}>
                  Hva er forskjellen på kaptein og skipsfører?
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Ingen forskjell - det er samme stilling. &quot;Skipsfører&quot; er norsk offisiell tittel, &quot;kaptein&quot; er 
                  dagligdags betegnelse. Engelsk: &quot;Master&quot;. Alle refererer til den øverste ansvarlige om bord.
                </p>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
                <h3 style={{ margin: "0 0 12px 0", fontSize: 18, fontWeight: 700, color: "#0f172a" }}>
                  Hvor mye tjener en kaptein i Nord-Norge?
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Nord-Norge har høyest kapteinlønninger i Norge! Havbruk/brønnbåt: 850k-1.2M kr, servicefartøy: 750k-950k kr. 
                  Kombinasjonen av havbruksnæring, offshore-aktivitet og tilgjengelighet gir ekstra etterspørsel.
                </p>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
                <h3 style={{ margin: "0 0 12px 0", fontSize: 18, fontWeight: 700, color: "#0f172a" }}>
                  Lønner det seg å ta DP-sertifikat?
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  <strong>Absolutt!</strong> DP (Dynamic Positioning) øker årslønn med 100.000-150.000 kr. 
                  Koster ~40.000 kr å ta, men betaler seg tilbake på 4-6 måneder. Nesten alle brønnbåter og 
                  offshore-fartøy krever DP Unlimited eller Limited.
                </p>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
                <h3 style={{ margin: "0 0 12px 0", fontSize: 18, fontWeight: 700, color: "#0f172a" }}>
                  Er det lettere å få jobb som kaptein i havbruk enn offshore?
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Ja, havbruk har <strong>høyere etterspørsel</strong> etter kapteiner enn offshore (supply-markedet har 
                  mer konkurranse). Havbruk vokser raskt, spesielt i Nord-Norge, og trenger kontinuerlig bemanning. 
                  Lettere inngang, god lønn, mindre krevende operasjoner enn AHTS.
                </p>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
                <h3 style={{ margin: "0 0 12px 0", fontSize: 18, fontWeight: 700, color: "#0f172a" }}>
                  Kan jeg jobbe som kaptein uten bachelor?
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Ja! Med fartstid og kvalifikasjonsbevis kan du bygge karriere til kaptein uten høyskoleutdanning. 
                  Tar lengre tid (10-15 år vs 5-7 år med bachelor), men mange erfarne kapteiner har &quot;jobbet seg opp&quot; 
                  fra matros. Krever STCW II/2 og tilstrekkelig fartstid uansett.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ 
            background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)", 
            borderRadius: 16, 
            padding: 48, 
            textAlign: "center",
            marginTop: 56,
            marginBottom: 56
          }}>
            <h2 style={{ color: "#ffffff", fontSize: 28, fontWeight: 800, margin: "0 0 16px 0" }}>
              Søker du kaptein-stilling?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.95)", fontSize: 18, lineHeight: 1.7, margin: "0 0 32px 0", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
              Bluecrew matcher erfarne kapteiner med havbruk, offshore og servicefartøy i hele Norge. 
              Registrer deg gratis - vi kontakter deg når relevante stillinger blir ledige.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link 
                href="/jobbsoker/registrer" 
                style={{ 
                  display: "inline-block",
                  padding: "16px 32px", 
                  background: "#ffffff", 
                  color: "#0ea5e9", 
                  borderRadius: 12, 
                  fontWeight: 700,
                  fontSize: 17,
                  textDecoration: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  transition: "transform 0.2s ease"
                }}
              >
                Registrer deg som kandidat →
              </Link>
              <Link 
                href="/karriere/guides" 
                style={{ 
                  display: "inline-block",
                  padding: "16px 32px", 
                  background: "rgba(255,255,255,0.15)", 
                  color: "#ffffff", 
                  border: "2px solid rgba(255,255,255,0.5)",
                  borderRadius: 12, 
                  fontWeight: 700,
                  fontSize: 17,
                  textDecoration: "none",
                  transition: "all 0.2s ease"
                }}
              >
                Les flere karriereguider
              </Link>
            </div>
          </div>

          {/* Relaterte guider */}
          <div style={{ marginTop: 56, paddingTop: 32, borderTop: "1px solid #e2e8f0" }}>
            <h2 style={{ ...sx.h2, fontSize: 24, marginBottom: 24 }}>Relaterte karriereguider</h2>
            <div style={{ display: "grid", gap: 16 }}>
              <Link href="/karriere/skipsforer" style={{ 
                display: "block",
                padding: 20, 
                background: "#f8fafc", 
                borderRadius: 12, 
                textDecoration: "none",
                border: "1px solid #e2e8f0",
                transition: "all 0.2s ease"
              }}>
                <h3 style={{ margin: "0 0 8px 0", fontSize: 18, fontWeight: 700, color: "#0ea5e9" }}>
                  Hvordan bli skipsfører (kaptein) →
                </h3>
                <p style={{ margin: 0, color: "#64748b", fontSize: 15 }}>
                  Komplett guide til utdanning, STCW-krav og karrierevei
                </p>
              </Link>
              <Link href="/lonn/styrmann" style={{ 
                display: "block",
                padding: 20, 
                background: "#f8fafc", 
                borderRadius: 12, 
                textDecoration: "none",
                border: "1px solid #e2e8f0"
              }}>
                <h3 style={{ margin: "0 0 8px 0", fontSize: 18, fontWeight: 700, color: "#0ea5e9" }}>
                  Styrmann lønn 2025 →
                </h3>
                <p style={{ margin: 0, color: "#64748b", fontSize: 15 }}>
                  Hva tjener en styrmann i Norge? Lønn per sektor og erfaring
                </p>
              </Link>
              <Link href="/lonn/oversikt" style={{ 
                display: "block",
                padding: 20, 
                background: "#f8fafc", 
                borderRadius: 12, 
                textDecoration: "none",
                border: "1px solid #e2e8f0"
              }}>
                <h3 style={{ margin: "0 0 8px 0", fontSize: 18, fontWeight: 700, color: "#0ea5e9" }}>
                  Lønnsguide maritime stillinger →
                </h3>
                <p style={{ margin: 0, color: "#64748b", fontSize: 15 }}>
                  Komplett oversikt over lønn for alle maritime stillinger
                </p>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </SiteLayout>
  );
}


