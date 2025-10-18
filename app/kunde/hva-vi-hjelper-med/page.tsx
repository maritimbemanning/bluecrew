import SiteLayout from "../../components/SiteLayout";
import { sx } from "../../lib/styles";

export default function Page() {
  return (
    <SiteLayout active="kunde">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Hva vi hjelper din bedrift med</h1>
          <p style={sx.leadSmall}>
            Bluecrew tilbyr rådgivning og bemanningstjenester som dekker hele oppdraget – fra planlegging til ferdig levert mannskap.
            Vi jobber tett på både operativ drift og HR-funksjon hos kundene våre.
          </p>
          <div style={{ display: "grid", gap: 24, marginTop: 32 }}>
            <section style={{ background: "#ffffff", borderRadius: 20, border: "1px solid #e2e8f0", padding: 26, boxShadow: "0 18px 36px rgba(15, 23, 42, 0.07)", display: "grid", gap: 10 }}>
              <h2 style={{ ...sx.h2, fontSize: 24 }}>Rådgivning</h2>
              <ul style={{ margin: 0, paddingLeft: 20, color: "#334155", lineHeight: 1.6, display: "grid", gap: 6 }}>
                <li>Planlegging av bemanningsstrategi og beredskap.</li>
                <li>Analyse av kompetansebehov og sertifikatløp.</li>
                <li>Forbedring av turnus, logistikk og HMS-prosedyrer.</li>
              </ul>
            </section>
            <section style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 20, padding: 26, display: "grid", gap: 10 }}>
              <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Gjennomføring</h3>
              <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.6, display: "grid", gap: 6 }}>
                <li>Bemanning og rekruttering til kort- og langvarige behov.</li>
                <li>Koordinering av mobilisering, reiser og dokumentkontroll.</li>
                <li>Oppfølging av mannskap om bord og rapportering til ledelsen.</li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
