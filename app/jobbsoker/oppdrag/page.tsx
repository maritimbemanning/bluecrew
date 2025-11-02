import { Metadata } from "next";
import SiteLayout from "../../components/SiteLayout";
import { sx } from "../../lib/styles";

export const metadata: Metadata = {
  title: "Ledige maritime oppdrag - Havbruk, fiskeri og servicefartøy",
  description:
    "Oppdrag for dekksmannskap, offiserer og teknikere til havbruk, fiskeri og servicefartøy. STCW-sertifisert, lønn over tariff. Registrer CV for å få tilgang.",
  keywords: [
    "ledige maritime oppdrag",
    "havbruk oppdrag",
    "brønnbåt jobb",
    "servicefartøy ledige",
    "fiskeri jobb Nord-Norge",
    "dekksmannskap oppdrag",
    "ROV operatør jobb",
    "offshore oppdrag Norge",
    "maritime vikariater",
    "STCW oppdrag",
  ],
  openGraph: {
    title: "Ledige maritime oppdrag | Bluecrew AS",
    description: "Se ledige oppdrag til havbruk, fiskeri og servicefartøy. Konkurransedyktige vilkår.",
    type: "website",
  },
};

export default function Page() {
  return (
    <SiteLayout active="jobbsoker">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Oppdrag for sjøfolk</h1>
          <p style={sx.leadSmall}>
            Bluecrew leverer oppdrag innen hele den maritime verdikjeden. Vi tilbyr konkurransedyktige vilkår, lønn over tariff
            og bonuser der innsats og resultat gjør en forskjell.
          </p>
          <div style={{ display: "grid", gap: 24, marginTop: 32 }}>
            <section style={{ background: "#ffffff", borderRadius: 20, border: "1px solid #e2e8f0", padding: 26, boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)", display: "grid", gap: 12 }}>
              <h2 style={{ ...sx.h2, fontSize: 24 }}>Typiske oppdrag</h2>
              <ul style={{ margin: 0, paddingLeft: 20, color: "#334155", lineHeight: 1.6, display: "grid", gap: 6 }}>
                <li>Havbruk: driftslag og servicefartøy.</li>
                <li>Fiskeri: skipper, styrmann og erfarne matroser til kyst- og havfiske.</li>
                <li>Service- og spesialfartøy: ROV, dekksbesetning, mekanikere og prosjektskip.</li>
                <li>Logistikk og beredskap: havn, slepebåt, SAR og støttefartøy.</li>
              </ul>
            </section>
            <section style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 20, padding: 26, display: "grid", gap: 12 }}>
              <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Hva vi trenger fra deg</h3>
              <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.6, display: "grid", gap: 6 }}>
                <li>Gyldig STCW grunnleggende sikkerhetskurs og helseattest.</li>
                <li>Eventuelle fagbrev, dekksoffiser- eller maskinoffisersertifikater.</li>
                <li>Referanser fra tidligere oppdrag og motivasjon for å levere gode resultater.</li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
