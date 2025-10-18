import SiteLayout from "../../components/SiteLayout";
import { sx } from "../../lib/styles";

export default function Page() {
  return (
    <SiteLayout active="kunde">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Bemanning når operasjonen ikke kan stoppe</h1>
          <p style={sx.leadSmall}>
            Vi leverer komplette team eller enkeltressurser til havbruk, fiskeri, servicefartøy, logistikk og beredskap. Bluecrew
            håndterer skiftplan, kontrakter og dokumentasjon slik at du kan fokusere på driften.
          </p>
          <div style={{ display: "grid", gap: 24, marginTop: 32 }}>
            <section style={{ background: "#ffffff", borderRadius: 20, border: "1px solid #e2e8f0", padding: 26, boxShadow: "0 18px 38px rgba(15, 23, 42, 0.08)", display: "grid", gap: 10 }}>
              <h2 style={{ ...sx.h2, fontSize: 24 }}>Våre leveranser</h2>
              <ul style={{ margin: 0, paddingLeft: 20, color: "#334155", lineHeight: 1.6, display: "grid", gap: 6 }}>
                <li>Operativ bemanning for korttidsoppdrag, sesong og fast turnus.</li>
                <li>Kapteiner, styrmenn, matroser, teknikere og støttepersonell.</li>
                <li>Planlegging av skift, transport og onboarding av mannskap.</li>
              </ul>
            </section>
            <section style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 20, padding: 26, display: "grid", gap: 10 }}>
              <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Fordeler</h3>
              <p style={{ margin: 0, lineHeight: 1.6 }}>
                Kundene våre får en partner som kjenner kravene til sikker drift. Vi sørger for verifiserte sertifikater, HMS-oppfølging
                og rapportering gjennom hele engasjementet.
              </p>
            </section>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
