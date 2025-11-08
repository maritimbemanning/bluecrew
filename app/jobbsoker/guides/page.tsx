import { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "../../components/SiteLayout";
import { sx } from "../../lib/styles";

export const metadata: Metadata = {
  title: "Maritime sertifikatkrav - Komplett guide til STCW, dekks- og maskinoffiser",
  description:
    "Komplett oversikt over sertifikatkrav for maritime stillinger i Norge. STCW-regler, dekksoffiser (D1-D6), maskinoffiser (M1-M4), matros, radiosertifikat og mer. Oppdatert 2025.",
  keywords: [
    "STCW sertifikat",
    "dekksoffiser sertifikat",
    "maskinoffiser krav",
    "matros kvalifikasjonsbevis",
    "skipsfører sertifikat",
    "styrmann sertifikat",
    "maritime sertifikater Norge",
    "STCW 95 krav",
    "VI/1 grunnleggende sikkerhet",
    "kvalifikasjonsforskriften",
    "GOC ROC radiosertifikat",
    "tank sertifikat V/1-1",
    "fiskeskipper sertifikat",
    "ETO sertifikat",
  ],
  openGraph: {
    title: "Maritime sertifikatkrav - Komplett guide | Bluecrew AS",
    description: "Alt du trenger å vite om STCW-krav, dekks- og maskinoffiser sertifikater, og kvalifikasjoner for maritime stillinger.",
    type: "website",
  },
  alternates: {
    canonical: "/jobbsoker/guides",
  },
};

export default function Page() {
  return (
    <SiteLayout active="jobbsoker">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8, fontWeight: 500 }}>
            Sist oppdatert: 7. november 2025
          </div>
          <h1 style={sx.h2}>Maritime sertifikatkrav i Norge</h1>
          <p style={sx.leadSmall}>
            Komplett oversikt over sertifikater, STCW-regler og kvalifikasjonskrav for alle maritime stillinger.
            Basert på Kvalifikasjonsforskriften (FOR-2011-12-22-1523) og Sjøfartsdirektoratets retningslinjer.
          </p>

          <div style={{ background: "#fff3cd", border: "2px solid #ffc107", borderRadius: 12, padding: 20, marginTop: 32 }}>
            <p style={{ margin: 0, color: "#856404", fontSize: 15, lineHeight: 1.6 }}>
              <strong>Viktig:</strong> Dette er en veiledende oversikt. Sjekk alltid{" "}
              <a href="https://lovdata.no/forskrift/2011-12-22-1523" target="_blank" rel="noopener" style={{ color: "#0ea5e9", textDecoration: "underline" }}>
                Lovdata
              </a>{" "}
              og{" "}
              <a href="https://www.sdir.no" target="_blank" rel="noopener" style={{ color: "#0ea5e9", textDecoration: "underline" }}>
                Sjøfartsdirektoratet
              </a>{" "}
              for oppdaterte krav og unntak. Sist oppdatert: 7. november 2025.
            </p>
          </div>

          {/* Navigasjon */}
          <div style={{ background: "#f8fafc", borderRadius: 16, padding: 24, marginTop: 32 }}>
            <h2 style={{ margin: "0 0 16px 0", fontSize: 20, fontWeight: 700 }}>Hurtignavigasjon</h2>
            <div style={{ display: "grid", gap: 8, fontSize: 15 }}>
              <a href="#dekk" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ A. Dekk (navigasjon)</a>
              <a href="#maskin" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ B. Maskin (fremdrift)</a>
              <a href="#elektro" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ C. Elektro/ETO</a>
              <a href="#radio" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ D. Radio (GMDSS)</a>
              <a href="#mannskap" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ E. Mannskapsnivå (matros, motormann)</a>
              <a href="#passasjer" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ F. Passasjer/RO-RO</a>
              <a href="#tank" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ G. Tankfartøy (olje/kjemikalie/gass)</a>
              <a href="#hsc" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ H. Hurtiggående fartøy (HSC)</a>
              <a href="#fiske" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ I. Fiskeflåten</a>
              <a href="#felles" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>→ J. Felles krav og gyldighet</a>
            </div>
          </div>

          {/* A. DEKK */}
          <div id="dekk" style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 8 }}>A. Dekk (navigasjon)</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              Dekksoffiser-sertifikater (DO) klassifiseres fra D1 (skipsfører, ubegrenset) til D6 (mindre fartøy, kystnært). 
              Kravene varierer med fartøyets størrelse og fartsområde.
            </p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, background: "#ffffff", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                <thead>
                  <tr style={{ background: "#0f172a", color: "#ffffff" }}>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Rolle</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Sertifikat/klasse</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>STCW-regel</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Nøkkelkurs</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Gyldighet</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 12px", fontWeight: 600, color: "#0f172a" }}>Skipsfører (Master)</td>
                    <td style={{ padding: "14px 12px" }}>DO <strong>D1</strong></td>
                    <td style={{ padding: "14px 12px" }}>II/2</td>
                    <td style={{ padding: "14px 12px" }}>VI/1, ECDIS, evt. passasjer/tank</td>
                    <td style={{ padding: "14px 12px" }}>5 år</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "14px 12px", fontWeight: 600, color: "#0f172a" }}>Overstyrmann (Chief Mate)</td>
                    <td style={{ padding: "14px 12px" }}>DO <strong>D2</strong></td>
                    <td style={{ padding: "14px 12px" }}>II/2</td>
                    <td style={{ padding: "14px 12px" }}>VI/1, ECDIS, evt. passasjer/tank</td>
                    <td style={{ padding: "14px 12px" }}>5 år</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 12px", fontWeight: 600, color: "#0f172a" }}>Vakthavende offiser (OOW) / Styrmann</td>
                    <td style={{ padding: "14px 12px" }}>DO <strong>D3–D6</strong></td>
                    <td style={{ padding: "14px 12px" }}>II/1</td>
                    <td style={{ padding: "14px 12px" }}>VI/1, ECDIS</td>
                    <td style={{ padding: "14px 12px" }}>5 år</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ marginTop: 16, fontSize: 15, color: "#64748b", fontStyle: "italic" }}>
              <strong>Lovhenvisning:</strong> Kvalifikasjonsforskriften kap. II, §§ 23–28 (dekksoffiserklasser)
            </p>
          </div>

          {/* B. MASKIN */}
          <div id="maskin" style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 8 }}>B. Maskin (fremdrift)</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              Maskinoffiser-sertifikater (MO) klassifiseres fra M1 (maskinsjef) til M4 (mindre fartøy). Kravene følger maskineffekt og fartøytype.
            </p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, background: "#ffffff", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                <thead>
                  <tr style={{ background: "#0f172a", color: "#ffffff" }}>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Rolle</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Sertifikat/klasse</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>STCW-regel</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Nøkkelkurs</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Gyldighet</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 12px", fontWeight: 600, color: "#0f172a" }}>Maskinsjef (Chief Engineer)</td>
                    <td style={{ padding: "14px 12px" }}>MO <strong>M1</strong></td>
                    <td style={{ padding: "14px 12px" }}>III/2</td>
                    <td style={{ padding: "14px 12px" }}>VI/1, evt. tank</td>
                    <td style={{ padding: "14px 12px" }}>5 år</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "14px 12px", fontWeight: 600, color: "#0f172a" }}>1. maskinist (Second Engineer)</td>
                    <td style={{ padding: "14px 12px" }}>MO <strong>M2</strong></td>
                    <td style={{ padding: "14px 12px" }}>III/2</td>
                    <td style={{ padding: "14px 12px" }}>VI/1, evt. tank</td>
                    <td style={{ padding: "14px 12px" }}>5 år</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 12px", fontWeight: 600, color: "#0f172a" }}>Vakthavende maskinoffiser</td>
                    <td style={{ padding: "14px 12px" }}>MO <strong>M3–M4</strong></td>
                    <td style={{ padding: "14px 12px" }}>III/1</td>
                    <td style={{ padding: "14px 12px" }}>VI/1</td>
                    <td style={{ padding: "14px 12px" }}>5 år</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ marginTop: 16, fontSize: 15, color: "#64748b", fontStyle: "italic" }}>
              <strong>Lovhenvisning:</strong> Kvalifikasjonsforskriften kap. III, §§ 37–40
            </p>
          </div>

          {/* C. ELEKTRO */}
          <div id="elektro" style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 8 }}>C. Elektro/ETO</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              Electro-Technical Officer (ETO) er ansvarlig for elektriske systemer, automatisering og elektronikk om bord.
            </p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, background: "#ffffff", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                <thead>
                  <tr style={{ background: "#0f172a", color: "#ffffff" }}>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Rolle</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Sertifikat</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>STCW-regel</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Nøkkelkurs</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Gyldighet</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: "14px 12px", fontWeight: 600, color: "#0f172a" }}>Electro-Technical Officer (ETO)</td>
                    <td style={{ padding: "14px 12px" }}>ETO-sertifikat</td>
                    <td style={{ padding: "14px 12px" }}>III/6</td>
                    <td style={{ padding: "14px 12px" }}>VI/1</td>
                    <td style={{ padding: "14px 12px" }}>5 år</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ marginTop: 16, fontSize: 15, color: "#64748b", fontStyle: "italic" }}>
              <strong>Lovhenvisning:</strong> Kvalifikasjonsforskriften kap. III, STCW III/6
            </p>
          </div>

          {/* D. RADIO */}
          <div id="radio" style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 8 }}>D. Radio (GMDSS)</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              GMDSS-operatører kreves på fartøy i SOLAS-fartsområder. GOC (General Operator&rsquo;s Certificate) dekker alle områder (A1-A4), 
              ROC (Restricted Operator&rsquo;s Certificate) kun kystnært (A1).
            </p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, background: "#ffffff", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                <thead>
                  <tr style={{ background: "#0f172a", color: "#ffffff" }}>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Rolle</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Dekningsområde</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Sertifikat</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>STCW-regel</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Gyldighet</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 12px", fontWeight: 600, color: "#0f172a" }}>Radiooperatør (GOC)</td>
                    <td style={{ padding: "14px 12px" }}>A1–A4 (globalt)</td>
                    <td style={{ padding: "14px 12px" }}><strong>GOC</strong></td>
                    <td style={{ padding: "14px 12px" }}>IV/2</td>
                    <td style={{ padding: "14px 12px" }}>5 år</td>
                  </tr>
                  <tr style={{ background: "#f8fafc" }}>
                    <td style={{ padding: "14px 12px", fontWeight: 600, color: "#0f172a" }}>Radiooperatør (ROC)</td>
                    <td style={{ padding: "14px 12px" }}>A1 (kystnært)</td>
                    <td style={{ padding: "14px 12px" }}><strong>ROC</strong></td>
                    <td style={{ padding: "14px 12px" }}>IV/2</td>
                    <td style={{ padding: "14px 12px" }}>5 år</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ marginTop: 16, fontSize: 15, color: "#64748b", fontStyle: "italic" }}>
              <strong>Lovhenvisning:</strong> Kvalifikasjonsforskriften kap. IV
            </p>
          </div>

          {/* E. MANNSKAP */}
          <div id="mannskap" style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 8 }}>E. Mannskapsnivå (ratings)</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              Matros, lettmatros (OS) og motormann er de vanligste mannskapsrollene. Krav til kvalifikasjonsbevis avhenger av stilling og fartøytype.
            </p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, background: "#ffffff", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                <thead>
                  <tr style={{ background: "#0f172a", color: "#ffffff" }}>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Rolle</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Avdeling</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Kvalifikasjonsbevis</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>STCW-regel</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Nøkkelkurs</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 12px", fontWeight: 600, color: "#0f172a" }}>Matros (AB)</td>
                    <td style={{ padding: "14px 12px" }}>Dekk</td>
                    <td style={{ padding: "14px 12px" }}>Kvalifikasjonsbevis Matros</td>
                    <td style={{ padding: "14px 12px" }}>II/5</td>
                    <td style={{ padding: "14px 12px" }}>VI/1, evt. passasjer/tank</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "14px 12px", fontWeight: 600, color: "#0f172a" }}>Lettmatros/Deck Rating (OS)</td>
                    <td style={{ padding: "14px 12px" }}>Dekk</td>
                    <td style={{ padding: "14px 12px" }}>Grunnleggende vaktkompetanse</td>
                    <td style={{ padding: "14px 12px" }}>II/4</td>
                    <td style={{ padding: "14px 12px" }}>VI/1</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "14px 12px", fontWeight: 600, color: "#0f172a" }}>Motormann</td>
                    <td style={{ padding: "14px 12px" }}>Maskin</td>
                    <td style={{ padding: "14px 12px" }}>Kvalifikasjonsbevis maskinvakt</td>
                    <td style={{ padding: "14px 12px" }}>III/5</td>
                    <td style={{ padding: "14px 12px" }}>VI/1</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ marginTop: 16, fontSize: 15, color: "#64748b", fontStyle: "italic" }}>
              <strong>Lovhenvisning:</strong> Kvalifikasjonsforskriften kap. II (dekk), kap. III (maskin)
            </p>
          </div>

          {/* F. PASSASJER */}
          <div id="passasjer" style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 8 }}>F. Passasjer/RO-RO</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              Personell på passasjerskip og RO-RO-fartøy trenger tilleggskurs i crowd management, krisehåndtering og sikkerhet.
            </p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, background: "#ffffff", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                <thead>
                  <tr style={{ background: "#0f172a", color: "#ffffff" }}>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Personell</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Krav</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>STCW-regel</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Kommentar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 12px", fontWeight: 600, color: "#0f172a" }}>Personell med passasjerkontakt</td>
                    <td style={{ padding: "14px 12px" }}>Crowd Management</td>
                    <td style={{ padding: "14px 12px" }}>V/2</td>
                    <td style={{ padding: "14px 12px" }}>I tillegg til grunnsertifikat</td>
                  </tr>
                  <tr style={{ background: "#f8fafc" }}>
                    <td style={{ padding: "14px 12px", fontWeight: 600, color: "#0f172a" }}>Ledere/ansvarlige i nødsituasjon</td>
                    <td style={{ padding: "14px 12px" }}>Krise- og passasjerhåndtering</td>
                    <td style={{ padding: "14px 12px" }}>V/2 / A-V/2-2/3</td>
                    <td style={{ padding: "14px 12px" }}>Rederi- og fartøyspesifikt</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ marginTop: 16, fontSize: 15, color: "#64748b", fontStyle: "italic" }}>
              <strong>Lovhenvisning:</strong> Kvalifikasjonsforskriften § 60
            </p>
          </div>

          {/* G. TANK */}
          <div id="tank" style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 8 }}>G. Tankfartøy (olje/kjemikalie/gass)</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              Personell på tankfartøy må ha spesialisert opplæring i håndtering av last. V/1-1 dekker olje/kjemikalier, V/1-2 dekker gass.
            </p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, background: "#ffffff", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                <thead>
                  <tr style={{ background: "#0f172a", color: "#ffffff" }}>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Rolle</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Fartøytype</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Påtegning/kurs</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>STCW-regel</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Kommentar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 12px", fontWeight: 600, color: "#0f172a" }}>Alt relevant personell</td>
                    <td style={{ padding: "14px 12px" }}>Olje/kjemikalie</td>
                    <td style={{ padding: "14px 12px" }}>Grunnleggende/avansert tank</td>
                    <td style={{ padding: "14px 12px" }}>V/1-1 (A-V/1-1)</td>
                    <td style={{ padding: "14px 12px" }}>Kurs + dokumentert fartstid</td>
                  </tr>
                  <tr style={{ background: "#f8fafc" }}>
                    <td style={{ padding: "14px 12px", fontWeight: 600, color: "#0f172a" }}>Alt relevant personell</td>
                    <td style={{ padding: "14px 12px" }}>Gass</td>
                    <td style={{ padding: "14px 12px" }}>Grunnleggende/avansert tank</td>
                    <td style={{ padding: "14px 12px" }}>V/1-2 (A-V/1-2)</td>
                    <td style={{ padding: "14px 12px" }}>Kurs + dokumentert fartstid</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ marginTop: 16, fontSize: 15, color: "#64748b", fontStyle: "italic" }}>
              <strong>Lovhenvisning:</strong> STCW V/1-1, V/1-2
            </p>
          </div>

          {/* H. HSC */}
          <div id="hsc" style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 8 }}>H. Hurtiggående fartøy (HSC)</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              Hurtiggående passasjerskip (HSC) har særkrav til dekksoffiserer og alle om bord må ha grunnleggende sikkerhetsopplæring (VI/1).
            </p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, background: "#ffffff", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                <thead>
                  <tr style={{ background: "#0f172a", color: "#ffffff" }}>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Rolle</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Fartøy</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Krav (tillegg)</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Kommentar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: "14px 12px", fontWeight: 600, color: "#0f172a" }}>Dekksoffiser/skipsfører</td>
                    <td style={{ padding: "14px 12px" }}>Hurtiggående passasjerskip</td>
                    <td style={{ padding: "14px 12px" }}>Minstekrav til klasse, passasjer-/krisehåndtering</td>
                    <td style={{ padding: "14px 12px" }}>Alle om bord: VI/1</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ marginTop: 16, fontSize: 15, color: "#64748b", fontStyle: "italic" }}>
              <strong>Lovhenvisning:</strong> Kvalifikasjonsforskriften § 67
            </p>
          </div>

          {/* I. FISKE */}
          <div id="fiske" style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 8 }}>I. Fiskeflåten</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
              Fiskefartøy har egne sertifikatkrav. Fiskeskipper-klassene (A, AB, B) gir rettigheter basert på fartøyets størrelse og fartsområde.
            </p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, background: "#ffffff", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                <thead>
                  <tr style={{ background: "#0f172a", color: "#ffffff" }}>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Rolle</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Fartøy/område</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Sertifikat</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontWeight: 700 }}>Kommentar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 12px", fontWeight: 600, color: "#0f172a" }}>Fiskeskipper klasse A</td>
                    <td style={{ padding: "14px 12px" }}>Ubegrenset</td>
                    <td style={{ padding: "14px 12px" }}>Fiskeskipper A</td>
                    <td style={{ padding: "14px 12px" }}>Rettigheter ubegrenset fartsområde</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    <td style={{ padding: "14px 12px", fontWeight: 600, color: "#0f172a" }}>Fiskeskipper klasse AB</td>
                    <td style={{ padding: "14px 12px" }}>{'<'} 3000 BT, ubegrenset fartsområde</td>
                    <td style={{ padding: "14px 12px" }}>Fiskeskipper AB</td>
                    <td style={{ padding: "14px 12px" }}>Innført fra 2018</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 12px", fontWeight: 600, color: "#0f172a" }}>Fiskeskipper klasse B</td>
                    <td style={{ padding: "14px 12px" }}>{'<'} 500 BT, bankfiske II m.m.</td>
                    <td style={{ padding: "14px 12px" }}>Fiskeskipper B</td>
                    <td style={{ padding: "14px 12px" }}>Se fartsområde-definisjoner</td>
                  </tr>
                  <tr style={{ background: "#f8fafc" }}>
                    <td style={{ padding: "14px 12px", fontWeight: 600, color: "#0f172a" }}>Fiskermannskap</td>
                    <td style={{ padding: "14px 12px" }}>Alle</td>
                    <td style={{ padding: "14px 12px" }}>Sikkerhetskurs for fiskere + evt. vakthold</td>
                    <td style={{ padding: "14px 12px" }}>VI/1 + fiskeriordning</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ marginTop: 16, fontSize: 15, color: "#64748b", fontStyle: "italic" }}>
              <strong>Lovhenvisning:</strong> Kvalifikasjonsforskriften § 32, § 32a, § 32b
            </p>
          </div>

          {/* J. FELLES KRAV */}
          <div id="felles" style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 8 }}>J. Felles krav og gyldighet</h2>
            
            <div style={{ background: "#ffffff", borderRadius: 16, padding: 32, border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
              <h3 style={{ margin: "0 0 16px 0", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>Alle som tjenestegjør om bord må ha:</h3>
              
              <ul style={{ margin: "0 0 24px 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, display: "grid", gap: 10 }}>
                <li>
                  <strong>Grunnleggende sikkerhetsopplæring (STCW VI/1):</strong> Omfatter personlig sikkerhet, brannforebygging, 
                  grunnleggende førstehjelp, og personlig overlevelse. Obligatorisk for alle (med få unntak).
                </li>
                <li>
                  <strong>Gyldig helseerklæring for sjøfolk:</strong> Må fornyes ved behov (typisk hvert 2. år under 18 år, 
                  hvert 2. år over 18 år, hvert år over 60 år).
                </li>
                <li>
                  <strong>Gyldig legitimasjon:</strong> Norsk sjømannsbok eller tilsvarende nasjonal identifikasjon.
                </li>
              </ul>

              <h3 style={{ margin: "24px 0 16px 0", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>Gyldighet og fornyelse</h3>
              
              <ul style={{ margin: "0 0 24px 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, display: "grid", gap: 10 }}>
                <li>
                  <strong>Personlige sertifikater/påtegninger:</strong> Vanligvis 5 års gyldighet (f.eks. dekksoffiser, maskinoffiser, 
                  GOC/ROC). Fornyelse krever dokumentert fartstid eller oppfriskningskurs.
                </li>
                <li>
                  <strong>Spesialkurs (passasjer, tank, krisehåndtering):</strong> Noen krever oppfriskningskurs hvert 5. år eller 
                  dokumentert fartstid siste 5 år (se § 17 og NMA-veiledning).
                </li>
                <li>
                  <strong>Rederikrav kan være strengere:</strong> Offshore-rederi kan kreve DP-bevis, ekstra sikkerhetskurs, eller 
                  kortere fornyelsesintervaller.
                </li>
              </ul>

              <h3 style={{ margin: "24px 0 16px 0", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>Utenlandske sertifikater</h3>
              
              <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                Utenlandske sertifikater kan anerkjennes etter søknad til Sjøfartsdirektoratet. Krav om dokumentasjon, oversettelse, 
                og eventuell supplementær opplæring. Les mer på{" "}
                <a href="https://www.sdir.no" target="_blank" rel="noopener" style={{ color: "#0ea5e9", textDecoration: "underline" }}>
                  sdir.no
                </a>.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: 64, background: "#0ea5e9", color: "#ffffff", borderRadius: 20, padding: 40, textAlign: "center" as const }}>
            <h2 style={{ margin: "0 0 16px 0", fontSize: 28, fontWeight: 800 }}>Har du de riktige sertifikatene?</h2>
            <p style={{ margin: "0 0 28px 0", fontSize: 18, lineHeight: 1.6, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
              Registrer deg hos Bluecrew og få tilgang til maritime oppdrag som matcher din kompetanse. Vi sjekker sertifikater, 
              verifiserer erfaring og matcher deg med de beste oppdragene.
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

          {/* Kilder */}
          <div style={{ marginTop: 48, background: "#f8fafc", borderRadius: 16, padding: 24, fontSize: 14 }}>
            <h3 style={{ margin: "0 0 12px 0", fontSize: 17, fontWeight: 700, color: "#0f172a" }}>Kilder og videre lesning</h3>
            <ul style={{ margin: 0, paddingLeft: 20, color: "#475569", lineHeight: 1.8, display: "grid", gap: 6 }}>
              <li>
                <a href="https://lovdata.no/forskrift/2011-12-22-1523" target="_blank" rel="noopener" style={{ color: "#0ea5e9", textDecoration: "underline" }}>
                  Kvalifikasjonsforskriften (FOR-2011-12-22-1523)
                </a>
              </li>
              <li>
                <a href="https://www.sdir.no" target="_blank" rel="noopener" style={{ color: "#0ea5e9", textDecoration: "underline" }}>
                  Sjøfartsdirektoratet (NMA)
                </a>
              </li>
              <li>
                <a href="https://www.imo.org/en/OurWork/HumanElement/Pages/STCW-Conv-LINK.aspx" target="_blank" rel="noopener" style={{ color: "#0ea5e9", textDecoration: "underline" }}>
                  STCW Convention (IMO)
                </a>
              </li>
            </ul>
            <p style={{ margin: "16px 0 0 0", fontSize: 13, color: "#64748b", fontStyle: "italic" }}>
              Sist oppdatert: 7. november 2025. Dette er en veiledende oversikt. Sjekk alltid offisielle kilder for gjeldende krav.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
