import { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "../../../components/SiteLayout";
import { sx } from "../../../lib/styles";

export const metadata: Metadata = {
  title: "Lønnsguide maritime stillinger 2025 - Komplett oversikt over lønn til sjøs",
  description:
    "Hva tjener man i maritime stillinger? Komplett lønnsguide 2025: Skipsfører, styrmann, matros, maskinoffiser, offshore, cruise, havbruk. Inkludert turnusordninger og lønnsforhandlingstips.",
  keywords: [
    "maritime lønninger 2025",
    "skipsfører lønn",
    "styrmann lønn",
    "matros lønn",
    "maskinoffiser lønn",
    "offshore lønn Norge",
    "brønnbåt lønn",
    "cruise lønn",
    "maritime stillinger lønn",
    "sjømann lønn",
    "dekksoffiser lønn",
    "hva tjener skipsfører",
    "maritime lønnsstatistikk",
  ],
  openGraph: {
    title: "Lønnsguide maritime stillinger 2025 | Bluecrew AS",
    description: "Komplett oversikt over lønninger i maritime stillinger: Skipsfører, styrmann, matros, maskinoffiser og mer.",
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
          <h1 style={sx.h2}>Lønnsguide maritime stillinger 2025</h1>
          <p style={sx.leadSmall}>
            Komplett oversikt over lønninger i norske maritime stillinger. Basert på tariffavtaler, bransjedata og reelle 
            jobboppslag fra offshore, cruise, havbruk og kystfart. Oppdatert oktober 2025.
          </p>

          <div style={{ background: "#fff3cd", border: "2px solid #ffc107", borderRadius: 12, padding: 20, marginTop: 32 }}>
            <p style={{ margin: 0, color: "#856404", fontSize: 15, lineHeight: 1.6 }}>
              <strong>Viktig:</strong> Lønningene varierer betydelig med sektor, erfaring, rederi, turnusordning og tariffavtaler. 
              Tallene under er veiledende årslønn før skatt. Bruk dem som utgangspunkt for forhandlinger.
            </p>
          </div>

          {/* Hurtignavigasjon */}
          <div style={{ background: "#f8fafc", borderRadius: 16, padding: 24, marginTop: 32 }}>
            <h2 style={{ margin: "0 0 16px 0", fontSize: 20, fontWeight: 700 }}>Innhold</h2>
            <div style={{ display: "grid", gap: 8, fontSize: 15 }}>
              <a href="#dekk" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ Dekksoffiserer (skipsfører, styrmann)</a>
              <a href="#maskin" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ Maskinoffiserer</a>
              <a href="#mannskap" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ Mannskapsnivå (matros, motormann)</a>
              <a href="#sektor" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ Lønn etter sektor</a>
              <a href="#turnus" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ Turnusordninger forklart</a>
              <a href="#faktorer" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ Faktorer som påvirker lønn</a>
              <a href="#tips" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ Tips til lønnsforhandling</a>
            </div>
          </div>

          {/* DEKK */}
          <div id="dekk" style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Dekksoffiserer (navigasjon)</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              Dekksoffiserer har ansvar for navigasjon, lasthåndtering og sikkerhet. Lønn avhenger av sertifikatnivå (D1-D6) og fartøytype.
            </p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, background: "#ffffff", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                <thead>
                  <tr style={{ background: "#0f172a", color: "#ffffff" }}>
                    <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: 700 }}>Stilling</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: 700 }}>Årsinntekt (ca.)</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: 700 }}>Kommentar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>Skipsfører offshore/subsea</td>
                    <td style={{ padding: "14px 16px" }}>900 000 - 1 200 000+ kr</td>
                    <td style={{ padding: "14px 16px" }}>Høyest lønn, krevende operasjoner, DP-krav</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>Skipsfører cruise/Hurtigruten</td>
                    <td style={{ padding: "14px 16px" }}>850 000 - 1 100 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Passasjeransvar, sesongvariasjon</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>Skipsfører tank (LNG/kjemikalie)</td>
                    <td style={{ padding: "14px 16px" }}>800 000 - 1 000 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Tank-sertifikater påkrevd</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>Skipsfører brønnbåt/havbruk</td>
                    <td style={{ padding: "14px 16px" }}>700 000 - 900 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Ofte 2/2 eller 2/4 turnus</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>Skipsfører kystfart/servicefartøy</td>
                    <td style={{ padding: "14px 16px" }}>650 000 - 850 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Mindre fartøy, kortere distanser</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>Overstyrmann offshore</td>
                    <td style={{ padding: "14px 16px" }}>750 000 - 950 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Stedfortreder for skipsfører</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>Overstyrmann cruise/havbruk</td>
                    <td style={{ padding: "14px 16px" }}>600 000 - 750 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Planlegging, cargo, HMS</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>Styrmann (2./3. styrmann) offshore</td>
                    <td style={{ padding: "14px 16px" }}>600 000 - 800 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Vakthold, navigasjon</td>
                  </tr>
                  <tr style={{ background: "#f8fafc" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>Styrmann havbruk/kyst</td>
                    <td style={{ padding: "14px 16px" }}>450 000 - 600 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Junior-nivå, bygger erfaring</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* MASKIN */}
          <div id="maskin" style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Maskinoffiserer (fremdrift)</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              Maskinoffiserer har ansvar for fremdriftssystemer, teknisk drift og vedlikehold. Lønn varierer med maskineffekt og fartøytype.
            </p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, background: "#ffffff", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                <thead>
                  <tr style={{ background: "#0f172a", color: "#ffffff" }}>
                    <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: 700 }}>Stilling</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: 700 }}>Årsinntekt (ca.)</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: 700 }}>Kommentar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>Maskinsjef offshore/subsea</td>
                    <td style={{ padding: "14px 16px" }}>850 000 - 1 100 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Komplekse systemer, høy ansvar</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>Maskinsjef cruise/tank</td>
                    <td style={{ padding: "14px 16px" }}>750 000 - 950 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Store fremdriftssystemer</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>Maskinsjef brønnbåt/havbruk</td>
                    <td style={{ padding: "14px 16px" }}>650 000 - 850 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Vedlikehold, hydraulikk, elektriske systemer</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>1. maskinist offshore</td>
                    <td style={{ padding: "14px 16px" }}>700 000 - 900 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Stedfortreder for maskinsjef</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>1. maskinist havbruk/kyst</td>
                    <td style={{ padding: "14px 16px" }}>550 000 - 700 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Mindre fartøy, mindre kompleksitet</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>Maskinoffiser (2./3.) offshore</td>
                    <td style={{ padding: "14px 16px" }}>550 000 - 750 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Vakthold maskinrom, vedlikehold</td>
                  </tr>
                  <tr style={{ background: "#f8fafc" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>Maskinoffiser havbruk/kyst</td>
                    <td style={{ padding: "14px 16px" }}>450 000 - 600 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Junior-nivå, bygger erfaring</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* MANNSKAP */}
          <div id="mannskap" style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Mannskapsnivå (ratings)</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              Mannskap utfører operative oppgaver på dekk, i maskinrom og andre avdelinger. Lønn avhenger av kvalifikasjoner og sektor.
            </p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, background: "#ffffff", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                <thead>
                  <tr style={{ background: "#0f172a", color: "#ffffff" }}>
                    <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: 700 }}>Stilling</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: 700 }}>Årsinntekt (ca.)</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: 700 }}>Kommentar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>Matros offshore</td>
                    <td style={{ padding: "14px 16px" }}>500 000 - 650 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Dekksarbeid, kranoperatør, vedlikehold</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>Matros brønnbåt/havbruk</td>
                    <td style={{ padding: "14px 16px" }}>420 000 - 550 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Lasting, vedlikehold, vakt</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>Matros kystfart/ferge</td>
                    <td style={{ padding: "14px 16px" }}>400 000 - 500 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Ofte dagpendling, mer forutsigbart</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>Motormann offshore</td>
                    <td style={{ padding: "14px 16px" }}>480 000 - 620 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Maskinvakt, vedlikehold</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>Motormann havbruk/kyst</td>
                    <td style={{ padding: "14px 16px" }}>400 000 - 520 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Teknisk assistanse, vedlikehold</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>Lettmatros (OS)</td>
                    <td style={{ padding: "14px 16px" }}>350 000 - 450 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Entry-level, opplæring</td>
                  </tr>
                  <tr style={{ background: "#f8fafc" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>Kok/messemannskap</td>
                    <td style={{ padding: "14px 16px" }}>380 000 - 500 000 kr</td>
                    <td style={{ padding: "14px 16px" }}>Varierer med fartøysstørrelse</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SEKTOR */}
          <div id="sektor" style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Lønn etter sektor</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              Sektoren du jobber i har stor påvirkning på lønn. Offshore betaler best, men havbruk/kyst gir mer forutsigbarhet.
            </p>

            <div style={{ display: "grid", gap: 20 }}>
              <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>Offshore/Subsea (høyest)</h3>
                <p style={{ margin: "0 0 12px 0", color: "#475569", lineHeight: 1.7 }}>
                  Olje- og gassinstallasjoner, ROV, kabel, subsea construction. Krevende operasjoner, lange skift, høy risiko.
                </p>
                <p style={{ margin: 0, color: "#0f172a", fontWeight: 600 }}>
                  Lønnsnivå: +30-50% over kystfart
                </p>
              </div>

              <div style={{ background: "#f8fafc", borderRadius: 12, padding: 24 }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>Cruise/Passasjer</h3>
                <p style={{ margin: "0 0 12px 0", color: "#475569", lineHeight: 1.7 }}>
                  Hurtigruten, cruiseskip, passasjerferger. Passasjeransvar, sesongvariasjon, servicefokus.
                </p>
                <p style={{ margin: 0, color: "#0f172a", fontWeight: 600 }}>
                  Lønnsnivå: +20-40% over kystfart
                </p>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>Tank (olje/kjemikalie/gass)</h3>
                <p style={{ margin: "0 0 12px 0", color: "#475569", lineHeight: 1.7 }}>
                  Tankfartøy, LNG, kjemikalietankere. Krever spesialsertifikater (V/1-1, V/1-2), høyt sikkerhetsfokus.
                </p>
                <p style={{ margin: 0, color: "#0f172a", fontWeight: 600 }}>
                  Lønnsnivå: +20-35% over kystfart
                </p>
              </div>

              <div style={{ background: "#f8fafc", borderRadius: 12, padding: 24 }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>Havbruk/Brønnbåt</h3>
                <p style={{ margin: "0 0 12px 0", color: "#475569", lineHeight: 1.7 }}>
                  Brønnbåter, fôrbåter, servicefartøy til havbruk. Forutsigbar drift, kjente områder, 2/2 eller 2/4 turnus.
                </p>
                <p style={{ margin: 0, color: "#0f172a", fontWeight: 600 }}>
                  Lønnsnivå: Referanse (grunnivå)
                </p>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>Kystfart/Ferger</h3>
                <p style={{ margin: "0 0 12px 0", color: "#475569", lineHeight: 1.7 }}>
                  Lokalferger, kysttrafikk, lastebåter. Dagpendling mulig, kortere distanser, mer forutsigbart.
                </p>
                <p style={{ margin: 0, color: "#0f172a", fontWeight: 600 }}>
                  Lønnsnivå: Lavest, men bedre work-life balance
                </p>
              </div>
            </div>
          </div>

          {/* TURNUS */}
          <div id="turnus" style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Turnusordninger forklart</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              Turnus (rotasjon) betyr at du jobber X uker om bord, deretter X uker fri. Dette påvirker både lønn og livskvalitet.
            </p>

            <div style={{ background: "#ffffff", borderRadius: 16, padding: 32, border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "grid", gap: 24 }}>
                <div>
                  <h3 style={{ margin: "0 0 10px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>2/2 turnus (2 uker på / 2 uker av)</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                    <strong>Vanlig i:</strong> Havbruk, brønnbåt, kystfart<br />
                    <strong>Arbeidsdager per år:</strong> ~180 dager (50% av året)<br />
                    <strong>Fordeler:</strong> Ofte hjemme, god work-life balance<br />
                    <strong>Ulemper:</strong> Lavere årslønn enn lengre turnus
                  </p>
                </div>

                <div style={{ background: "#f8fafc", padding: 20, borderRadius: 12 }}>
                  <h3 style={{ margin: "0 0 10px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>2/4 turnus (2 uker på / 4 uker av)</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                    <strong>Vanlig i:</strong> Havbruk, servicefartøy<br />
                    <strong>Arbeidsdager per år:</strong> ~120 dager (33% av året)<br />
                    <strong>Fordeler:</strong> Mye fritid, fleksibilitet<br />
                    <strong>Ulemper:</strong> Lavest årslønn, kan være vanskelig å holde rutine
                  </p>
                </div>

                <div>
                  <h3 style={{ margin: "0 0 10px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>4/4 turnus (4 uker på / 4 uker av)</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                    <strong>Vanlig i:</strong> Offshore, cruise, tankfartøy<br />
                    <strong>Arbeidsdager per år:</strong> ~180 dager (50% av året)<br />
                    <strong>Fordeler:</strong> Balanse mellom arbeid og fritid, høyere lønn<br />
                    <strong>Ulemper:</strong> Lange perioder borte fra familien
                  </p>
                </div>

                <div style={{ background: "#f8fafc", padding: 20, borderRadius: 12 }}>
                  <h3 style={{ margin: "0 0 10px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>6/6 turnus (6 uker på / 6 uker av)</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                    <strong>Vanlig i:</strong> Offshore (internasjonalt), langdistanse<br />
                    <strong>Arbeidsdager per år:</strong> ~180 dager (50% av året)<br />
                    <strong>Fordeler:</strong> Lange friperioder, høy lønn<br />
                    <strong>Ulemper:</strong> Mentalt krevende, vanskelig for familieliv
                  </p>
                </div>
              </div>

              <div style={{ background: "#e0f2fe", border: "2px solid #0ea5e9", borderRadius: 12, padding: 20, marginTop: 24 }}>
                <p style={{ margin: 0, color: "#0c4a6e", fontSize: 15, lineHeight: 1.7 }}>
                  <strong>Viktig:</strong> Lengre turnus (4/4, 6/6) gir vanligvis høyere <strong>dagslønn</strong>, men ikke nødvendigvis 
                  høyere <strong>årslønn</strong> sammenlignet med 2/2 hvis du regner per arbeidsdag. Vurder hva som passer din livssituasjon.
                </p>
              </div>
            </div>
          </div>

          {/* FAKTORER */}
          <div id="faktorer" style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Faktorer som påvirker lønn</h2>
            
            <div style={{ display: "grid", gap: 16 }}>
              <div style={{ background: "#f8fafc", borderRadius: 12, padding: 20, display: "flex", gap: 16 }}>
                <div>
                  <h3 style={{ margin: "0 0 6px 0", fontSize: 18, fontWeight: 700 }}>Erfaring og kompetanse</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7, fontSize: 15 }}>
                    Mer fartstid = høyere lønn. Spesialsertifikater (DP, tank, ROV) gir 10-30% økning.
                  </p>
                </div>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 12, padding: 20, border: "1px solid #e2e8f0", display: "flex", gap: 16 }}>
                <div>
                  <h3 style={{ margin: "0 0 6px 0", fontSize: 18, fontWeight: 700 }}>Rederi og tariffavtale</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7, fontSize: 15 }}>
                    Store internasjonale rederi betaler ofte bedre enn små lokale. NIS vs NOR-register påvirker skatt og nettoinntekt.
                  </p>
                </div>
              </div>

              <div style={{ background: "#f8fafc", borderRadius: 12, padding: 20, display: "flex", gap: 16 }}>
                <div>
                  <h3 style={{ margin: "0 0 6px 0", fontSize: 18, fontWeight: 700 }}>Overtid og tillegg</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7, fontSize: 15 }}>
                    Overtid, helg- og nattillegg kan øke lønnen med 20-40% i travel perioder. Viktig å dokumentere timer.
                  </p>
                </div>
              </div>

              <div style={{ background: "#ffffff", borderRadius: 12, padding: 20, border: "1px solid #e2e8f0", display: "flex", gap: 16 }}>
                <div>
                  <h3 style={{ margin: "0 0 6px 0", fontSize: 18, fontWeight: 700 }}>Geografi og fartsområde</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7, fontSize: 15 }}>
                    Internasjonale ruter gir vanligvis bedre lønn enn lokal kysttrafikk. Arktis/farlige områder gir risikotillegg.
                  </p>
                </div>
              </div>

              <div style={{ background: "#f8fafc", borderRadius: 12, padding: 20, display: "flex", gap: 16 }}>
                <div>
                  <h3 style={{ margin: "0 0 6px 0", fontSize: 18, fontWeight: 700 }}>Markedssituasjon</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7, fontSize: 15 }}>
                    Høy etterspørsel etter kvalifisert mannskap (f.eks. offshore-oppgang) gir bedre forhandlingsposisjon.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TIPS */}
          <div id="tips" style={{ marginTop: 48, background: "#fff3cd", border: "2px solid #ffc107", borderRadius: 16, padding: 32 }}>
            <h2 style={{ margin: "0 0 16px 0", fontSize: 24, fontWeight: 800, color: "#856404" }}>Tips til lønnsforhandling</h2>
            <ul style={{ margin: 0, paddingLeft: 24, color: "#856404", lineHeight: 1.8, display: "grid", gap: 10 }}>
              <li>
                <strong>Gjør research:</strong> Bruk denne guiden + snakk med kollegaer om markedspris. Kom med konkrete tall.
              </li>
              <li>
                <strong>Fremhev spesialkompetanse:</strong> DP, tank, ROV, HUET, HeliDeck – alle spesialsertifikater er verdt penger.
              </li>
              <li>
                <strong>Dokumenter erfaring:</strong> Ha fartstidsbok, referanser og sertifikater klare. Vis hva du har gjort.
              </li>
              <li>
                <strong>Vurder totalpakken:</strong> Ikke bare grunnlønn – sjekk overtidskompensasjon, pensjon, forsikring, reisekostnader.
              </li>
              <li>
                <strong>Vær realistisk med turnus:</strong> 2/2 gir lavere årslønn enn 4/4, men mer livskvalitet. Hva er viktigst for deg?
              </li>
              <li>
                <strong>Bruk bemanningsbyrå smart:</strong> Vi (Bluecrew) kan forhandle på dine vegne og har oversikt over markedspriser.
              </li>
              <li>
                <strong>Timing er alt:</strong> Forhandl når du har et annet tilbud eller når rederi har akutt behov.
              </li>
            </ul>
          </div>

          {/* Sammenligning Norge vs internasjonalt */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>Norge vs internasjonalt</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 20 }}>
              Norske maritime lønninger er blant de høyeste i verden, men leveomkostninger er også høye:
            </p>

            <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <ul style={{ margin: 0, paddingLeft: 24, color: "#334155", lineHeight: 1.8, display: "grid", gap: 10 }}>
                <li>
                  <strong>Norge (NOR-register):</strong> Høyest lønn, men også høyest skatt (25-40%). Full sosial sikkerhet, pensjon, forsikring.
                </li>
                <li>
                  <strong>Norge (NIS-register):</strong> Lavere skatt (skattefritak ved {'>'} 130 dagers opphold utenlands/år), vanlig for offshore internasjonalt.
                </li>
                <li>
                  <strong>Nordsjøen (UK/Nederland):</strong> Sammenlignbart med Norge, men valutasvingninger påvirker.
                </li>
                <li>
                  <strong>Middelhavet/Asia:</strong> 30-50% lavere lønn, men også lavere leveomkostninger og skatt.
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: 48, background: "#0ea5e9", color: "#ffffff", borderRadius: 20, padding: 40, textAlign: "center" as const }}>
            <h2 style={{ margin: "0 0 16px 0", fontSize: 28, fontWeight: 800 }}>Søker du jobb med riktig lønn?</h2>
            <p style={{ margin: "0 0 28px 0", fontSize: 18, lineHeight: 1.6, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
              Bluecrew hjelper deg med å finne oppdrag som matcher din kompetanse og lønnsforventninger. Vi forhandler på dine vegne 
              og sikrer at du får markedspris.
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
              <li>Sjøoffisersforbundet lønnsstatistikk 2024-2025</li>
              <li>Tariffavtaler NHO Sjøfart og Sjømannsforbundet</li>
              <li>Reelle jobboppslag fra Bluecrew og andre bemanningsbyråer</li>
              <li>SSB (Statistisk Sentralbyrå) – Maritime lønninger</li>
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
