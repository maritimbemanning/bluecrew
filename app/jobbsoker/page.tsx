import Link from "next/link";
import SiteLayout from "../components/SiteLayout";
import { sx } from "../lib/styles";

export default function Page() {
  return (
    <SiteLayout active="jobbsoker">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Jobb til sjøs med Bluecrew</h1>
          <p style={sx.leadSmall}>
            Vi tilbyr oppdrag for sjøfolk som ønsker forutsigbarhet, ordnede forhold og utvikling. Som en del av Bluecrew får du
            tett dialog med ledere som selv har stått i skiftet og vet hvordan hverdagen om bord er.
          </p>
          <div style={{ display: "grid", gap: 26, marginTop: 36 }}>
            <div style={{ background: "#ffffff", borderRadius: 20, border: "1px solid #e2e8f0", padding: 28, boxShadow: "0 14px 30px rgba(15, 23, 42, 0.06)", display: "grid", gap: 12 }}>
              <h2 style={{ ...sx.h2, fontSize: 26 }}>Dette kan du forvente</h2>
              <ul style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 8, color: "#334155", lineHeight: 1.6 }}>
                <li>Lønn over tariff der innsats og ansvar belønnes.</li>
                <li>Oppdrag innen havbruk, fiskeri, service-, logistikk- og spesialfartøy.</li>
                <li>Oppfølging før, under og etter oppdrag fra bemanningsledere med sjøerfaring.</li>
              </ul>
            </div>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 20, padding: 28, display: "grid", gap: 12 }}>
              <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Sertifikater og kompetanse</h3>
              <p style={{ margin: 0, lineHeight: 1.6 }}>
                Vi hjelper deg med å holde orden på STCW, helseattest og andre kurskrav. Fortell oss hvor du står i dag, så finner
                vi oppdrag og utviklingsmuligheter som matcher nivået ditt.
              </p>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 32 }}>
            <Link href="/jobbsoker/registrer" className="cta-button cta-button--primary">
              Registrer deg
            </Link>
            <Link href="/jobbsoker/oppdrag" className="cta-button cta-button--secondary">
              Se hvilke oppdrag vi tilbyr
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
