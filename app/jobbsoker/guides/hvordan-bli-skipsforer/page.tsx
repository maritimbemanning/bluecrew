import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteLayout from "../../../components/SiteLayout";
import { sx } from "../../../lib/styles";

export const metadata: Metadata = {
  title: "Hvordan bli skipsfører i Norge - Utdanning, sertifikater og karrierevei 2025",
  description:
    "Komplett guide til å bli skipsfører (Master): Utdanningskrav, STCW-sertifikater, fartstid, dekksoffiser D1, lønn og karrieremuligheter. Oppdatert 2025.",
  keywords: [
    "hvordan bli skipsfører",
    "skipsfører utdanning",
    "skipsfører krav",
    "dekksoffiser D1",
    "master sertifikat",
    "skipsfører lønn",
    "nautikk utdanning",
    "skipsfører karriere",
    "STCW II/2",
    "bli kaptein",
    "maritime utdanning Norge",
    "sjøkaptein utdanning",
  ],
  openGraph: {
    title: "Hvordan bli skipsfører - Komplett guide 2025 | Bluecrew AS",
    description: "Alt du trenger å vite om veien til å bli skipsfører: Utdanning, sertifikater, fartstid og karrieremuligheter.",
    type: "article",
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
              alt="Erfaren skipsfører navigerer fra broen på servicefartøy i norske farvann - maritim bemanning" 
              width={1200}
              height={675}
              priority
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8, fontWeight: 500 }}>
            Sist oppdatert: 7. november 2025
          </div>
          <h1 style={sx.h2}>Hvordan bli skipsfører i Norge</h1>
          <p style={sx.leadSmall}>
            Komplett guide til å bli skipsfører (Master): Utdanningskrav, sertifikater, fartstid og karrieremuligheter. 
            Oppdatert for 2025 basert på Kvalifikasjonsforskriften og Sjøfartsdirektoratets krav.
          </p>

          <div style={{ background: "#e0f2fe", border: "2px solid #0ea5e9", borderRadius: 12, padding: 20, marginTop: 32 }}>
            <p style={{ margin: 0, color: "#0c4a6e", fontSize: 16, lineHeight: 1.6 }}>
              <strong>Kort oppsummert:</strong> For å bli skipsfører trenger du <strong>nautisk utdanning</strong> (bachelor/yrkesutdanning), 
              <strong>minimum 24-36 måneder fartstid</strong> (avhengig av utdanning), <strong>STCW-sertifikater</strong> (VI/1, II/2), 
              og <strong>dekksoffiser D1-sertifikat</strong>. Lønn fra ca. 650 000 kr til 1 200 000+ kr/år avhengig av sektor og erfaring.
            </p>
          </div>

          {/* Hva er en skipsfører */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Hva er en skipsfører?</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
              En skipsfører (også kalt <strong>Master</strong> eller <strong>kaptein</strong>) er den øverste ansvarlige om bord på et fartøy. 
              Skipsfører har ansvar for:
            </p>
            <ul style={{ margin: "16px 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, fontSize: 16, display: "grid", gap: 8 }}>
              <li>Sikker navigasjon og operasjon av fartøyet</li>
              <li>Mannskap og passasjerers sikkerhet</li>
              <li>Overholdelse av maritime lover og regler</li>
              <li>Lastehåndtering og stabilitet</li>
              <li>Kommunikasjon med rederiet, havnemyndigheter og andre fartøy</li>
              <li>HMS, miljøvern og beredskap</li>
            </ul>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
              Skipsfører er en lederstilling som krever både teknisk kompetanse, lederegenskaper og beslutningstaking under press.
            </p>
          </div>

          {/* Utdanningsveien */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Utdanningsveien til skipsfører</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              Det finnes to hovedveier til å bli skipsfører i Norge:
            </p>

            <div style={{ display: "grid", gap: 24 }}>
              {/* Vei 1: Bachelor */}
              <div style={{ background: "#ffffff", borderRadius: 16, padding: 32, border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                <h3 style={{ margin: "0 0 12px 0", fontSize: 22, fontWeight: 700, color: "#0f172a" }}>
                  Vei 1: Bachelor i nautikk (3 år)
                </h3>
                <p style={{ margin: "0 0 16px 0", color: "#475569", lineHeight: 1.7 }}>
                  Den vanligste og mest direkte veien. Tilbys ved:
                </p>
                <ul style={{ margin: "0 0 16px 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, display: "grid", gap: 6 }}>
                  <li><strong>Høgskolen i Ålesund (HiÅ):</strong> Nautikk bachelor</li>
                  <li><strong>Høgskolen i Vestlandet (HVL):</strong> Nautikk bachelor (Bergen)</li>
                  <li><strong>Høgskolen i Tromsø:</strong> Nautikk bachelor</li>
                </ul>
                <p style={{ margin: "16px 0 0 0", color: "#475569", lineHeight: 1.7 }}>
                  <strong>Krav etter endt bachelor:</strong> 24 måneder fartstid som styrmann/vakthavende offiser (OOW) + eksamen for D1-sertifikat.
                </p>
              </div>

              {/* Vei 2: Yrkesutdanning */}
              <div style={{ background: "#f8fafc", borderRadius: 16, padding: 32, border: "1px solid #e2e8f0" }}>
                <h3 style={{ margin: "0 0 12px 0", fontSize: 22, fontWeight: 700, color: "#0f172a" }}>
                  Vei 2: Yrkesutdanning og opparbeidet fartstid
                </h3>
                <p style={{ margin: "0 0 16px 0", color: "#475569", lineHeight: 1.7 }}>
                  For de som starter direkte til sjøs uten bachelor:
                </p>
                <ol style={{ margin: "0 0 16px 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, display: "grid", gap: 8 }}>
                  <li><strong>Start som lettmatros/dekksmann:</strong> Grunnleggende sikkerhet (VI/1) + vakthold-kurs</li>
                  <li><strong>Opparbeide fartstid:</strong> Min. 36 måneder fartstid (dekk)</li>
                  <li><strong>Ta dekksoffiser-utdanning:</strong> Vakthavende offiser-kurs (D3-D6 avhengig av fartøy)</li>
                  <li><strong>Mer fartstid som styrmann:</strong> Ytterligere 24-36 måneder som styrmann/OOW</li>
                  <li><strong>Eksamen for skipsfører:</strong> D1-eksamen + verifisering av fartstid</li>
                </ol>
                <p style={{ margin: "16px 0 0 0", color: "#475569", lineHeight: 1.7, fontStyle: "italic" }}>
                  Denne veien tar lengre tid (typisk 6-8 år totalt), men du tjener erfaring og inntekt underveis.
                </p>
              </div>
            </div>
          </div>

          {/* Sertifikater */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Sertifikater du trenger</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              For å jobbe som skipsfører må du ha følgende sertifikater:
            </p>

            <div style={{ display: "grid", gap: 20 }}>
              <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>
                  1. Dekksoffiser D1 (Master Unlimited)
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  <strong>D1-sertifikatet</strong> gir rett til å føre skip uten begrensninger i tonnasje og fartsområde (STCW II/2). 
                  Krever bachelor i nautikk + 24 mnd fartstid som OOW, eller yrkesutdanning + 36 mnd fartstid + eksamen.
                </p>
              </div>

              <div style={{ background: "#f8fafc", borderRadius: 12, padding: 24 }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>
                  2. Grunnleggende sikkerhet (STCW VI/1)
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Obligatorisk for alle som går til sjøs. Omfatter personlig sikkerhet, brannforebygging, førstehjelp og personlig overlevelse. 
                  Må fornyes med jevne mellomrom (typisk hvert 5. år).
                </p>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>
                  3. ECDIS (Electronic Chart Display and Information System)
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Påkrevd på fartøy med ECDIS-navigasjonssystem (de fleste moderne skip). Kurs + sertifikat med 5 års gyldighet.
                </p>
              </div>

              <div style={{ background: "#f8fafc", borderRadius: 12, padding: 24 }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>
                  4. Spesialsertifikater (avhengig av fartøytype)
                </h3>
                <ul style={{ margin: "8px 0 0 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, display: "grid", gap: 6 }}>
                  <li><strong>Passasjerskip:</strong> Crowd management, krisehåndtering (STCW V/2)</li>
                  <li><strong>Tankfartøy:</strong> Tank-sertifikat olje/kjemikalie (V/1-1) eller gass (V/1-2)</li>
                  <li><strong>Offshore:</strong> Ofte krav om DP (Dynamic Positioning), helikoptertrening, HUET</li>
                  <li><strong>Hurtiggående fartøy (HSC):</strong> Særkrav iht. § 67</li>
                </ul>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>
                  5. Gyldig helseerklæring
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Helseattest for sjøfolk må fornyes hvert 2. år (under 18: årlig, over 60: årlig). Utstedes av godkjent lege.
                </p>
              </div>
            </div>
          </div>

          {/* Fartstid */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Fartstid og erfaring</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              Fartstid er tiden du faktisk jobber om bord på fartøy. Det er strenge krav til dokumentert fartstid:
            </p>

            <div style={{ background: "#ffffff", borderRadius: 16, padding: 32, border: "2px solid #0ea5e9", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
              <h3 style={{ margin: "0 0 16px 0", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>Minimumskrav for D1-sertifikat:</h3>
              
              <div style={{ display: "grid", gap: 16 }}>
                <div>
                  <h4 style={{ margin: "0 0 8px 0", fontSize: 17, fontWeight: 700, color: "#0ea5e9" }}>Med bachelor i nautikk:</h4>
                  <p style={{ margin: 0, color: "#334155", lineHeight: 1.7 }}>
                    <strong>24 måneder fartstid</strong> som vakthavende offiser (OOW/styrmann) på dekk. Kan inkludere praksisperioder 
                    under studiet, men hovedvekten må være som ansatt offiser etter utdanning.
                  </p>
                </div>

                <div>
                  <h4 style={{ margin: "0 0 8px 0", fontSize: 17, fontWeight: 700, color: "#0ea5e9" }}>Med yrkesutdanning:</h4>
                  <p style={{ margin: 0, color: "#334155", lineHeight: 1.7 }}>
                    <strong>36 måneder fartstid</strong> som vakthavende offiser (OOW/styrmann) på dekk, eller 48 måneder total fartstid 
                    på dekk (inkludert tid som matros/dekksmann). Krav om eksamen og verifisering av kompetanse.
                  </p>
                </div>
              </div>

              <p style={{ margin: "20px 0 0 0", color: "#475569", lineHeight: 1.7, fontSize: 15, fontStyle: "italic" }}>
                <strong>Tips:</strong> Alle som jobber til sjøs må føre nøyaktig fartstidsbok (sjømannsbok) hvor hver periode registreres. 
                Dette er dokumentasjonen du bruker når du søker om D1-sertifikat.
              </p>
            </div>
          </div>

          {/* Karrierevei */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Karrierevei: Fra student til skipsfører</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              Typisk karriereprogresjon fra utdanning til skipsfører:
            </p>

            <div style={{ position: "relative", paddingLeft: 40, borderLeft: "3px solid #0ea5e9" }}>
              <div style={{ marginBottom: 32 }}>
                <div style={{ position: "absolute", left: -12, width: 20, height: 20, borderRadius: "50%", background: "#0ea5e9", border: "3px solid #ffffff" }}></div>
                <h3 style={{ margin: "0 0 8px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>År 0-3: Nautikk bachelor</h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Studerer nautikk ved Ålesund, Bergen eller Tromsø. Inkluderer praksisperioder til sjøs. Får dekksoffiser-kompetanse 
                  (typisk D3-D5 rett etter utdanning).
                </p>
              </div>

              <div style={{ marginBottom: 32 }}>
                <div style={{ position: "absolute", left: -12, width: 20, height: 20, borderRadius: "50%", background: "#0ea5e9", border: "3px solid #ffffff" }}></div>
                <h3 style={{ margin: "0 0 8px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>År 3-5: Junior styrmann / 3. styrmann</h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Jobber som vakthavende offiser (OOW) på broen. Ansvar for navigasjonsvakter, lasting/lossing, sikkerhet. 
                  Opparbeider fartstid og erfaring. Lønn ca. 450 000-550 000 kr/år.
                </p>
              </div>

              <div style={{ marginBottom: 32 }}>
                <div style={{ position: "absolute", left: -12, width: 20, height: 20, borderRadius: "50%", background: "#0ea5e9", border: "3px solid #ffffff" }}></div>
                <h3 style={{ margin: "0 0 8px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>År 5-7: 2. styrmann / overstyrmann</h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Mer ansvar for planlegging, cargo, vedlikehold og HMS. Stedfortreder for skipsfører. Opparbeider 24 mnd fartstid som OOW 
                  og tar D1-eksamen. Lønn ca. 550 000-700 000 kr/år.
                </p>
              </div>

              <div>
                <div style={{ position: "absolute", left: -12, width: 20, height: 20, borderRadius: "50%", background: "#0ea5e9", border: "3px solid #ffffff" }}></div>
                <h3 style={{ margin: "0 0 8px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>År 7+: Skipsfører (Master)</h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Øverste ansvarlige om bord. Leder mannskapet, tar operative beslutninger, kommuniserer med rederi og myndigheter. 
                  Lønn ca. 650 000-1 200 000+ kr/år avhengig av sektor (offshore/cruise høyest, kyst/havbruk lavere).
                </p>
              </div>
            </div>
          </div>

          {/* Lønn */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Lønn som skipsfører</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              Lønnen varierer betydelig med sektor, fartøytype, erfaring og arbeidsgivers størrelse:
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
                    <td style={{ padding: "14px 16px" }}>900 000 - 1 200 000+ kr</td>
                    <td style={{ padding: "14px 16px" }}>Høyest lønn, krevende operasjoner</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>Cruise/passasjer</td>
                    <td style={{ padding: "14px 16px" }}>850 000 - 1 100 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Hurtigruten, cruiseskip</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>Kjemikalietankere/LNG</td>
                    <td style={{ padding: "14px 16px" }}>800 000 - 1 000 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Krever tank-sertifikater</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>Havbruk/brønnbåt</td>
                    <td style={{ padding: "14px 16px" }}>700 000 - 900 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Ofte turnusordninger 2/2 eller 2/4</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>Kystfart/servicefartøy</td>
                    <td style={{ padding: "14px 16px" }}>650 000 - 850 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Mindre fartøy, kortere distanser</td>
                  </tr>
                  <tr style={{ background: "#f8fafc" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>Ferger/lokaltrafikk</td>
                    <td style={{ padding: "14px 16px" }}>600 000 - 750 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Ofte dagpendling, mer forutsigbart</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ marginTop: 20, fontSize: 15, color: "#64748b", fontStyle: "italic" }}>
              <strong>Viktig:</strong> Disse tallene er veiledende og kan variere med erfaring, rederi, tariffavtaler og arbeidsvilkår. 
              Turnus (2 uker på/2 uker av) gir færre arbeidsdager totalt enn landbaserte jobber.
            </p>
          </div>

          {/* Karrieremuligheter */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Karrieremuligheter etter skipsfører</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              Som erfaren skipsfører har du mange muligheter, både til sjøs og på land:
            </p>

            <div style={{ display: "grid", gap: 16 }}>
              <div style={{ background: "#f8fafc", borderRadius: 12, padding: 20, display: "flex", gap: 16 }}>
                <div>
                  <h3 style={{ margin: "0 0 6px 0", fontSize: 18, fontWeight: 700 }}>Spesialisering til sjøs</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7, fontSize: 15 }}>
                    Cruise, offshore, tankfartøy, spesialfartøy (kabel, survey, ROV). Høyere lønn og mer ansvar.
                  </p>
                </div>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 12, padding: 20, border: "1px solid #e2e8f0", display: "flex", gap: 16 }}>
                <div>
                  <h3 style={{ margin: "0 0 6px 0", fontSize: 18, fontWeight: 700 }}>Landbaserte roller</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7, fontSize: 15 }}>
                    Operasjonsleder, flåtesjef, HMS-ansvarlig, bemanningskoordinator hos rederi eller bemanningsbyrå.
                  </p>
                </div>
              </div>

              <div style={{ background: "#f8fafc", borderRadius: 12, padding: 20, display: "flex", gap: 16 }}>
                <div>
                  <h3 style={{ margin: "0 0 6px 0", fontSize: 18, fontWeight: 700 }}>Underviser/instruktør</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7, fontSize: 15 }}>
                    Undervise ved maritime høyskoler, sikkerhetskurs (STCW), simulatortrening.
                  </p>
                </div>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 12, padding: 20, border: "1px solid #e2e8f0", display: "flex", gap: 16 }}>
                <div>
                  <h3 style={{ margin: "0 0 6px 0", fontSize: 18, fontWeight: 700 }}>Los, havnesjef, myndigheter</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7, fontSize: 15 }}>
                    Norsk Losforbund, havneadministrasjon, Sjøfartsdirektoratet, Kystverket.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div style={{ marginTop: 48, background: "#fff3cd", border: "2px solid #ffc107", borderRadius: 16, padding: 32 }}>
            <h2 style={{ margin: "0 0 16px 0", fontSize: 24, fontWeight: 800, color: "#856404" }}>Tips for å lykkes som skipsfører</h2>
            <ul style={{ margin: 0, paddingLeft: 24, color: "#856404", lineHeight: 1.8, display: "grid", gap: 10 }}>
              <li><strong>Start tidlig med fartstid:</strong> Sommerjobber, praksisperioder og deltid under studiet gir verdifull erfaring.</li>
              <li><strong>Velg riktig spesialisering:</strong> Offshore gir høyest lønn, men havbruk/kyst gir mer forutsigbarhet. Vurder hva som passer deg.</li>
              <li><strong>Nettverk er gull:</strong> Maritime miljøer er små. Bygg relasjoner med medstudenter, lærere og kollegaer.</li>
              <li><strong>Hold sertifikater oppdaterte:</strong> Husk fornyelse av STCW-kurs, helseattest og spesialsertifikater.</li>
              <li><strong>Lær engelsk:</strong> Maritime standardspråk er engelsk. Mange rederi krever god engelskferdighet.</li>
              <li><strong>HMS og ledelse:</strong> Skipsfører er leder. Lær deg HMS-systemer, konflikthåndtering og kommunikasjon.</li>
            </ul>
          </div>

          {/* CTA */}
          <div style={{ marginTop: 48, background: "#0ea5e9", color: "#ffffff", borderRadius: 20, padding: 40, textAlign: "center" as const }}>
            <h2 style={{ margin: "0 0 16px 0", fontSize: 28, fontWeight: 800 }}>Klar til å starte karrieren?</h2>
            <p style={{ margin: "0 0 28px 0", fontSize: 18, lineHeight: 1.6, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
              Bluecrew hjelper maritime fagfolk med å finne de beste oppdragene. Enten du er ferdig utdannet styrmann som vil bygge fartstid, 
              eller erfaren skipsfører som søker nye muligheter – vi kobler deg med oppdrag som matcher din kompetanse.
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
              <li>Kvalifikasjonsforskriften (FOR-2011-12-22-1523) §§ 23-28</li>
              <li>Sjøfartsdirektoratet (sdir.no)</li>
              <li>STCW Convention II/2</li>
              <li>Lønnsstatistikk fra Sjøoffisersforbundet og rederier</li>
            </ul>
            <p style={{ margin: "12px 0 0 0", fontSize: 13, color: "#94a3b8", fontStyle: "italic" }}>
              Sist oppdatert: 7. november 2025
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
