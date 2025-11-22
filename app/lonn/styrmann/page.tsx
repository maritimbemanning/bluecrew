import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteLayout from "../../components/SiteLayout";
import { sx } from "../../lib/styles";

export const metadata: Metadata = {
  title: "Styrmann Lønn Norge 2025 - Hva tjener en styrmann i maritime stillinger?",
  description:
    "Komplett oversikt over styrmannlønn i Norge 2025: 3. styrmann, 2. styrmann, overstyrsmann. Fra 500.000 til 850.000 kr/år. Havbruk, offshore, servicefartøy. STCW-krav og karrierevei.",
  keywords: [
    "styrmann lønn",
    "chief mate lønn",
    "overstyrsmann lønn",
    "2 styrmann lønn",
    "3 styrmann lønn",
    "styrmann havbruk",
    "styrmann offshore",
    "hva tjener en styrmann",
    "styrmann karriere",
    "STCW II/1 lønn",
    "dekksoffiser D2 D3",
    "maritime lønninger styrmann",
  ],
  openGraph: {
    title: "Styrmann Lønn Norge 2025 | Komplett guide | Bluecrew AS",
    description: "Hva tjener en styrmann i Norge? Lønn fra 500.000 til 850.000 kr/år. Offshore, havbruk, servicefartøy - komplett oversikt.",
    type: "article",
  },
  alternates: {
    canonical: "/lonn/styrmann",
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
              alt="Styrmann og kaptein på broen navigerer fartøy - maritim bemanning Norge - karriere og lønn" 
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
          <h1 style={sx.h2}>Styrmann Lønn i Norge 2025</h1>
          <p style={sx.leadSmall}>
            Komplett oversikt over lønn for styrmann (chief mate, first officer) i Norge: 3. styrmann, 2. styrmann, 
            overstyrsmann. Alle sektorer dekket: havbruk, offshore, servicefartøy, kystfart. 
            Basert på tariffavtaler og bransjedata. Oppdatert november 2025.
          </p>

          <div style={{ background: "#e0f2fe", border: "2px solid #0ea5e9", borderRadius: 12, padding: 20, marginTop: 32 }}>
            <p style={{ margin: 0, color: "#0c4a6e", fontSize: 16, lineHeight: 1.6 }}>
              <strong>Kort oppsummert:</strong> En styrmann i Norge tjener mellom <strong>500.000 kr og 850.000 kr/år</strong> 
              avhengig av erfaring, sektor og nivå. <strong>3. styrmann:</strong> 500k-600k kr, <strong>2. styrmann:</strong> 
              600k-750k kr, <strong>Overstyrsmann:</strong> 700k-850k kr. Offshore/havbruk betaler høyest. 
              Krever <strong>STCW II/1</strong> og <strong>dekksoffiser D2-D6</strong>.
            </p>
          </div>

          {/* Innhold */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Innhold</h2>
            <div style={{ display: "grid", gap: 10, fontSize: 16, paddingLeft: 20 }}>
              <a href="#lonntabell" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ Lønnstabell per nivå og sektor</a>
              <a href="#3styrmann" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ 3. styrmann lønn</a>
              <a href="#2styrmann" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ 2. styrmann lønn</a>
              <a href="#overstyrsmann" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ Overstyrsmann lønn</a>
              <a href="#sektor" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ Lønn etter sektor (havbruk, offshore, servicefartøy)</a>
              <a href="#krav" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ STCW-krav og kvalifikasjoner</a>
              <a href="#karriere" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ Karriereveien fra matros til overstyrsmann</a>
              <a href="#faq" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ Ofte stilte spørsmål</a>
            </div>
          </div>

          {/* Lønnstabell */}
          <div id="lonntabell" style={{ marginTop: 56 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 24 }}>Lønnstabell: Styrmann per nivå 2025</h2>
            
            <div style={{ overflowX: "auto", marginBottom: 24 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", borderRadius: 12, overflow: "hidden" }}>
                <thead>
                  <tr style={{ background: "#0ea5e9", color: "#ffffff" }}>
                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: 700 }}>Nivå</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: 700 }}>Månedslønn</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: 700 }}>Årslønn (før skatt)</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: 700 }}>Erfaring</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600 }}>3. styrmann</td>
                    <td style={{ padding: "16px 20px" }}>42.000 - 52.000 kr</td>
                    <td style={{ padding: "16px 20px", color: "#f59e0b", fontWeight: 700 }}>504.000 - 624.000 kr</td>
                    <td style={{ padding: "16px 20px" }}>0-3 år</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600 }}>2. styrmann</td>
                    <td style={{ padding: "16px 20px" }}>50.000 - 65.000 kr</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 700 }}>600.000 - 780.000 kr</td>
                    <td style={{ padding: "16px 20px" }}>3-6 år</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "16px 20px", fontWeight: 600 }}>Overstyrsmann (Chief Mate)</td>
                    <td style={{ padding: "16px 20px" }}>60.000 - 75.000 kr</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 700 }}>720.000 - 900.000 kr</td>
                    <td style={{ padding: "16px 20px" }}>6+ år</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ background: "#fff3cd", border: "1px solid #ffc107", borderRadius: 12, padding: 16, fontSize: 14, color: "#856404" }}>
              <strong>Merk:</strong> Lønningene inkluderer grunnlønn og varierer med sektor, turnusordning, overtid og tariffavtaler. 
              Offshore og havbruk betaler gjennomsnittlig 15-25% høyere enn kystfart.
            </div>
          </div>

          {/* 3. styrmann */}
          <div id="3styrmann" style={{ marginTop: 56 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>3. Styrmann Lønn</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
              3. styrmann er <strong>inngangsposisjonen</strong> for dekksoffiserer som har fullført bachelor i nautikk 
              eller tilsvarende fartstid. Lønn: <strong>504.000 - 624.000 kr/år</strong>.
            </p>

            <h3 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 16 }}>Typisk lønnspakke:</h3>
            <ul style={{ margin: "16px 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, fontSize: 16, display: "grid", gap: 10 }}>
              <li><strong>Grunnlønn:</strong> 42.000 - 52.000 kr/måned</li>
              <li><strong>Kost og losji:</strong> Inkludert om bord (verdi ~12.000 kr/mnd)</li>
              <li><strong>Overtid:</strong> Variabel, 5.000-10.000 kr/mnd gjennomsnitt</li>
              <li><strong>Turnus:</strong> 2/2 eller 4/4 (offshore/havbruk)</li>
              <li><strong>Pensjon:</strong> 5-7% innskuddspensjon</li>
            </ul>

            <h3 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 16 }}>Ansvar og oppgaver:</h3>
            <ul style={{ margin: "16px 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, fontSize: 16, display: "grid", gap: 8 }}>
              <li>Navigasjonsvakt (4-8 timers skift)</li>
              <li>Assistere overstyrsmann med dekksoperasjoner</li>
              <li>Vedlikehold av sikkerhets- og navigasjonsutstyr</li>
              <li>Last- og ballastvannhåndtering</li>
              <li>Brannvern og sikkerhetstiltak</li>
              <li>Opplæring av matroser og lettmatroser</li>
            </ul>

            <div style={{ background: "#dcfce7", border: "1px solid #22c55e", borderRadius: 12, padding: 20, marginTop: 24 }}>
              <p style={{ margin: 0, color: "#166534", fontSize: 16, lineHeight: 1.6 }}>
                <strong>Eksempel:</strong> 3. styrmann på servicefartøy havbruk, 2/2 turnus, 1 års erfaring:<br />
                Grunnlønn: 48.000 kr/mnd × 12 = <strong>576.000 kr</strong><br />
                Overtid: ~7.000 kr/mnd × 6 mnd = <strong>42.000 kr</strong><br />
                <strong>Total årslønn: 618.000 kr</strong> (før skatt)
              </p>
            </div>
          </div>

          {/* 2. styrmann */}
          <div id="2styrmann" style={{ marginTop: 56 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>2. Styrmann Lønn</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
              2. styrmann har <strong>3-6 års erfaring</strong> og mer ansvar enn 3. styrmann. Ofte backup for 
              overstyrsmann. Lønn: <strong>600.000 - 780.000 kr/år</strong>.
            </p>

            <h3 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 16 }}>Lønnsstruktur:</h3>
            <ul style={{ margin: "16px 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, fontSize: 16, display: "grid", gap: 10 }}>
              <li><strong>Grunnlønn:</strong> 50.000 - 65.000 kr/måned</li>
              <li><strong>Overtid:</strong> 8.000-15.000 kr/mnd (havbruk/offshore)</li>
              <li><strong>Ansvarstillegg:</strong> 2.000-5.000 kr/mnd</li>
              <li><strong>Turnus:</strong> 2/2, 4/4 eller dagturnus</li>
            </ul>

            <h3 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 16 }}>Ansvar og oppgaver:</h3>
            <ul style={{ margin: "16px 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, fontSize: 16, display: "grid", gap: 8 }}>
              <li>Navigasjonsvakt og brovakt</li>
              <li>Koordinering av dekksmannskap</li>
              <li>Lasting/lossing operasjoner</li>
              <li>Sikkerhetsinspeksjoner og drills</li>
              <li>Kommunikasjon med havnemyndigheter</li>
              <li>Backup for overstyrsmann (1. styrmann)</li>
            </ul>

            <div style={{ marginTop: 24, padding: 20, background: "#f0f9ff", border: "1px solid #0ea5e9", borderRadius: 12 }}>
              <p style={{ margin: 0, color: "#0c4a6e", fontSize: 16, lineHeight: 1.6 }}>
                <strong>Karrieretips:</strong> Som 2. styrmann er det smart å ta DP-sertifikat (Dynamic Positioning) 
                eller spesialkurs i last/ballast. Dette øker lønn med 50.000-80.000 kr/år og gir bedre jobbmuligheter.
              </p>
            </div>
          </div>

          {/* Overstyrsmann */}
          <div id="overstyrsmann" style={{ marginTop: 56 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Overstyrsmann (Chief Mate) Lønn</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
              Overstyrsmann (også kalt <strong>1. styrmann</strong> eller <strong>Chief Mate</strong>) er nest høyeste 
              offiser om bord, direkte under kapteinen. Lønn: <strong>720.000 - 900.000 kr/år</strong>.
            </p>

            <h3 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 16 }}>Lønnspakke:</h3>
            <ul style={{ margin: "16px 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, fontSize: 16, display: "grid", gap: 10 }}>
              <li><strong>Grunnlønn:</strong> 60.000 - 75.000 kr/måned</li>
              <li><strong>Overtid:</strong> 10.000-20.000 kr/mnd (offshore/havbruk)</li>
              <li><strong>Ansvarstillegg:</strong> 5.000-10.000 kr/mnd</li>
              <li><strong>Turnus:</strong> 4/4, 2/2 (offshore/havbruk) eller dagturnus</li>
              <li><strong>Pensjon:</strong> 7-10% innskuddspensjon</li>
            </ul>

            <h3 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 16 }}>Ansvar og oppgaver:</h3>
            <ul style={{ margin: "16px 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, fontSize: 16, display: "grid", gap: 8 }}>
              <li><strong>Dekksavdeling:</strong> Øverste ansvar for alt dekksarbeid</li>
              <li><strong>Last og stabilitet:</strong> Lastehåndtering, ballast, stabilitetskontroll</li>
              <li><strong>Vedlikehold:</strong> Planlegging av vedlikehold av dekk, tau, utstyr</li>
              <li><strong>Sikkerhet:</strong> HMS-ansvar, brannvern, redningsutstyr</li>
              <li><strong>Navigasjon:</strong> Vaktleder, backup for kapteinen</li>
              <li><strong>Personell:</strong> Leder dekksmannskapet (matroser, styrmenn)</li>
            </ul>

            <div style={{ background: "#dcfce7", border: "1px solid #22c55e", borderRadius: 12, padding: 20, marginTop: 24 }}>
              <p style={{ margin: 0, color: "#166534", fontSize: 16, lineHeight: 1.6 }}>
                <strong>Eksempel:</strong> Overstyrsmann på brønnbåt, 4/4 turnus, 8 års erfaring:<br />
                Grunnlønn: 70.000 kr/mnd × 12 = <strong>840.000 kr</strong><br />
                Overtid/tillegg: ~12.000 kr/mnd × 6 mnd = <strong>72.000 kr</strong><br />
                <strong>Total årslønn: 912.000 kr</strong> (før skatt)
              </p>
            </div>

            <div style={{ marginTop: 24, padding: 20, background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 12 }}>
              <p style={{ margin: 0, color: "#78350f", fontSize: 16, lineHeight: 1.6 }}>
                <strong>Neste steg:</strong> Fra overstyrsmann er det naturlig å gå videre til <strong>kaptein/skipsfører</strong>. 
                Krever STCW II/2, D1/D2-sertifikat og minst 36 måneder fartstid som styrmann. 
                <Link href="/lonn/kaptein" style={{ color: "#0ea5e9", fontWeight: 700 }}> Les mer om kapteinlønn →</Link>
              </p>
            </div>
          </div>

          {/* Lønn per sektor */}
          <div id="sektor" style={{ marginTop: 56 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 24 }}>Styrmannlønn per sektor</h2>
            
            <div style={{ overflowX: "auto", marginBottom: 24 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", borderRadius: 12, overflow: "hidden" }}>
                <thead>
                  <tr style={{ background: "#6366f1", color: "#ffffff" }}>
                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: 700 }}>Sektor</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: 700 }}>3. styrmann</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: 700 }}>2. styrmann</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: 700 }}>Overstyrsmann</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600 }}>Offshore (PSV/AHTS)</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 700 }}>550k-650k</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 700 }}>680k-820k</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 700 }}>800k-950k</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600 }}>Havbruk/Brønnbåt</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 700 }}>530k-620k</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 700 }}>650k-780k</td>
                    <td style={{ padding: "16px 20px", color: "#10b981", fontWeight: 700 }}>750k-900k</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600 }}>Servicefartøy</td>
                    <td style={{ padding: "16px 20px", color: "#f59e0b", fontWeight: 700 }}>500k-580k</td>
                    <td style={{ padding: "16px 20px", color: "#f59e0b", fontWeight: 700 }}>600k-720k</td>
                    <td style={{ padding: "16px 20px", color: "#f59e0b", fontWeight: 700 }}>700k-840k</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "16px 20px", fontWeight: 600 }}>Kystfart/Ferge</td>
                    <td style={{ padding: "16px 20px", color: "#f59e0b", fontWeight: 700 }}>480k-550k</td>
                    <td style={{ padding: "16px 20px", color: "#f59e0b", fontWeight: 700 }}>580k-680k</td>
                    <td style={{ padding: "16px 20px", color: "#f59e0b", fontWeight: 700 }}>680k-800k</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* STCW-krav */}
          <div id="krav" style={{ marginTop: 56 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>STCW-krav for styrmenn</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
              For å jobbe som styrmann i Norge må du ha:
            </p>

            <div style={{ display: "grid", gap: 24, marginTop: 24 }}>
              <div style={{ background: "#ffffff", borderRadius: 16, padding: 24, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <h3 style={{ margin: "0 0 12px 0", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>
                  1. STCW II/1 (Officer in Charge of a Navigational Watch)
                </h3>
                <p style={{ margin: "0 0 12px 0", color: "#475569", lineHeight: 1.7 }}>
                  Kvalifikasjon som vaktoffiser - <strong>minimum-kravet for styrmenn</strong>. Oppnås med bachelor i nautikk 
                  (3 år) eller fartstid + kvalifikasjonsbevis.
                </p>
                <p style={{ margin: 0, fontSize: 14, color: "#64748b" }}>
                  <strong>Fornyes hver 5. år</strong> med dokumentert fartstid (12+ mnd siste 5 år).
                </p>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 16, padding: 24, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <h3 style={{ margin: "0 0 12px 0", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>
                  2. Dekksoffiser D2-D6
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  <strong>D6:</strong> 3. styrmann (0-500 GT nært farvann)<br />
                  <strong>D5:</strong> 3. styrmann (500-3000 GT nært farvann)<br />
                  <strong>D4:</strong> 2. styrmann (alle størrelser, nært farvann)<br />
                  <strong>D3:</strong> Overstyrsmann (500-3000 GT, alle farvann)<br />
                  <strong>D2:</strong> Overstyrsmann (alle størrelser, nært farvann)
                </p>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 16, padding: 24, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <h3 style={{ margin: "0 0 12px 0", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>
                  3. Grunnleggende sikkerhet (STCW VI/1)
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Obligatorisk sikkerhetskurs: Brannslukking, førstehjelp, overlevelsesutstyr, personlig sikkerhet til sjøs.
                </p>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 16, padding: 24, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <h3 style={{ margin: "0 0 12px 0", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>
                  4. Radiosertifikat (GOC/LRC)
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  GOC (General Operator&apos;s Certificate) eller LRC (Long Range Certificate) for radiokommunikasjon.
                </p>
              </div>
            </div>
          </div>

          {/* Karrierevei */}
          <div id="karriere" style={{ marginTop: 56 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Karriereveien til styrmann</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
              Fra matros til overstyrsmann tar vanligvis <strong>6-12 år</strong> avhengig av utdanning:
            </p>

            <div style={{ marginTop: 32, display: "grid", gap: 16 }}>
              {[
                { step: "1", title: "Matros", time: "0-2 år", lonn: "400k-550k", desc: "Bygge sjøerfaring, STCW VI/1, dekksarbeid" },
                { step: "2", title: "Bachelor nautikk", time: "2-5 år", lonn: "N/A", desc: "Høyskoleutdanning (3 år) eller fartstid + kvalifikasjonsbevis" },
                { step: "3", title: "3. Styrmann", time: "0-3 år", lonn: "500k-620k", desc: "STCW II/1, D5/D6, inngangsposisjon dekksoffiser" },
                { step: "4", title: "2. Styrmann", time: "3-6 år", lonn: "600k-780k", desc: "D4/D3-sertifikat, 12+ mnd fartstid som styrmann" },
                { step: "5", title: "Overstyrsmann", time: "6-10 år", lonn: "720k-900k", desc: "D2/D3, 24+ mnd fartstid, ledererfaring" },
                { step: "6", title: "Kaptein/Skipsfører", time: "10-15 år", lonn: "850k-1.2M", desc: "STCW II/2, D1/D2, 36+ mnd fartstid som styrmann" },
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
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#0f172a" }}>{item.title}</h3>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <span style={{ fontSize: 14, color: "#64748b", fontWeight: 600 }}>{item.time}</span>
                        <span style={{ fontSize: 14, color: "#10b981", fontWeight: 700 }}>{item.lonn}</span>
                      </div>
                    </div>
                    <p style={{ margin: 0, color: "#475569", lineHeight: 1.6, fontSize: 15 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div id="faq" style={{ marginTop: 56, marginBottom: 56 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 24 }}>Ofte stilte spørsmål</h2>
            
            <div style={{ display: "grid", gap: 20 }}>
              <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
                <h3 style={{ margin: "0 0 12px 0", fontSize: 18, fontWeight: 700, color: "#0f172a" }}>
                  Hva er forskjellen på 1. styrmann og overstyrsmann?
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Ingen forskjell - det er samme stilling! &quot;Overstyrsmann&quot; er norsk offisiell tittel, &quot;1. styrmann&quot; er 
                  dagligdags betegnelse. Engelsk: &quot;Chief Mate&quot; eller &quot;First Officer&quot;.
                </p>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
                <h3 style={{ margin: "0 0 12px 0", fontSize: 18, fontWeight: 700, color: "#0f172a" }}>
                  Hvor lang tid tar det å bli overstyrsmann?
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Med bachelor i nautikk (3 år) + 3-4 år erfaring som styrmann = <strong>6-7 år totalt</strong>. 
                  Uten bachelor: 10-12 år med fartstid og kvalifikasjonsbevis. Krever STCW II/1 og D2/D3-sertifikat.
                </p>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
                <h3 style={{ margin: "0 0 12px 0", fontSize: 18, fontWeight: 700, color: "#0f172a" }}>
                  Tjener man mer som styrmann i havbruk eller offshore?
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  <strong>Offshore betaler 10-15% mer</strong> enn havbruk for styrmenn på samme nivå. 
                  Offshore 2. styrmann: 680k-820k vs Havbruk 2. styrmann: 650k-780k. Men havbruk har høyere etterspørsel 
                  og enklere inngang uten offshore-erfaring.
                </p>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
                <h3 style={{ margin: "0 0 12px 0", fontSize: 18, fontWeight: 700, color: "#0f172a" }}>
                  Lønner det seg å ta DP-sertifikat som styrmann?
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  <strong>Ja!</strong> DP (Dynamic Positioning) øker årslønn med 50.000-80.000 kr for styrmenn. 
                  Koster ~40.000 kr, men gir bedre jobbmuligheter offshore og på brønnbåter. Spesielt viktig for 
                  2. styrmann og overstyrsmann.
                </p>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
                <h3 style={{ margin: "0 0 12px 0", fontSize: 18, fontWeight: 700, color: "#0f172a" }}>
                  Kan jeg bli styrmann uten bachelor i nautikk?
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Ja! Med fartstid som matros (18+ måneder) og kvalifikasjonsbevis kan du bygge karriere til styrmann. 
                  Tar lengre tid enn med bachelor (10-12 år vs 6-7 år), men mange styrmenn har &quot;jobbet seg opp&quot; fra dekk. 
                  Krever STCW II/1 og D2-D6 sertifikat uansett.
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
              Søker du styrmann-stilling?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.95)", fontSize: 18, lineHeight: 1.7, margin: "0 0 32px 0", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
              Bluecrew matcher kvalifiserte styrmenn med havbruk, offshore og servicefartøy i hele Norge. 
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
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                }}
              >
                Registrer deg som kandidat →
              </Link>
              <Link
                href="/faq"
                style={{
                  display: "inline-block",
                  padding: "16px 32px",
                  background: "rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  border: "2px solid rgba(255,255,255,0.5)",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 17,
                  textDecoration: "none"
                }}
              >
                Ofte stilte spørsmål
              </Link>
            </div>
          </div>

          {/* Relaterte guider */}
          <div style={{ marginTop: 56, paddingTop: 32, borderTop: "1px solid #e2e8f0" }}>
            <h2 style={{ ...sx.h2, fontSize: 24, marginBottom: 24 }}>Relaterte karriereguider</h2>
            <div style={{ display: "grid", gap: 16 }}>
              <Link href="/lonn/kaptein" style={{ 
                display: "block",
                padding: 20, 
                background: "#f8fafc", 
                borderRadius: 12, 
                textDecoration: "none",
                border: "1px solid #e2e8f0"
              }}>
                <h3 style={{ margin: "0 0 8px 0", fontSize: 18, fontWeight: 700, color: "#0ea5e9" }}>
                  Kaptein lønn 2025 →
                </h3>
                <p style={{ margin: 0, color: "#64748b", fontSize: 15 }}>
                  Hva tjener en kaptein? Lønn fra 650k til 1.2M kr/år
                </p>
              </Link>
              <Link href="/karriere/matros" style={{ 
                display: "block",
                padding: 20, 
                background: "#f8fafc", 
                borderRadius: 12, 
                textDecoration: "none",
                border: "1px solid #e2e8f0"
              }}>
                <h3 style={{ margin: "0 0 8px 0", fontSize: 18, fontWeight: 700, color: "#0ea5e9" }}>
                  Hvordan bli matros →
                </h3>
                <p style={{ margin: 0, color: "#64748b", fontSize: 15 }}>
                  Utdanning, sertifikater og karrierevei fra lettmatros til styrmann
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


