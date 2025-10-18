import Link from "next/link";
import SiteLayout from "../components/SiteLayout";
import { sx } from "../lib/styles";

export default function Page() {
  return (
    <SiteLayout active="kunde">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Bemanningspartner for hele den maritime verdikjeden</h1>
          <p style={sx.leadSmall}>
            Vi støtter rederier, oppdrett, service- og spesialfartøy med komplette bemanningsløsninger. Bluecrew eies og drives
            av sjøfolk – derfor vet vi hvilke ressurser som trengs for å holde operasjonen trygg og effektiv.
          </p>
          <div style={{ display: "grid", gap: 24, marginTop: 36 }}>
            <div style={{ background: "#ffffff", borderRadius: 20, border: "1px solid #e2e8f0", padding: 28, boxShadow: "0 16px 34px rgba(15, 23, 42, 0.07)", display: "grid", gap: 12 }}>
              <h2 style={{ ...sx.h2, fontSize: 26 }}>Hvordan vi jobber</h2>
              <ul style={{ margin: 0, paddingLeft: 20, color: "#334155", display: "grid", gap: 6, lineHeight: 1.6 }}>
                <li>Behovskartlegging med fokus på sertifikater, erfaring og turnus.</li>
                <li>Screening, referansesjekk og dokumentkontroll før vi presenterer mannskapet.</li>
                <li>Tett oppfølging om bord og løpende evaluering gjennom hele oppdraget.</li>
              </ul>
            </div>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 20, padding: 28, display: "grid", gap: 12 }}>
              <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Neste steg</h3>
              <p style={{ margin: 0, lineHeight: 1.6 }}>
                Ta kontakt for å diskutere kommende behov, eller registrer et konkret oppdrag via skjemaet. Vi skreddersyr team
                til havbruk, fiskeri, logistikk, beredskap og offshore støttefartøy.
              </p>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 32 }}>
            <Link href="/kunde/registrer-behov" style={sx.btnMain}>
              Registrer behov
            </Link>
            <Link href="/kontakt" style={sx.btnGhost}>
              Snakk med en bemanningsleder
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
