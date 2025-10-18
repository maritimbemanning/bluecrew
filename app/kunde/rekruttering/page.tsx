import SiteLayout from "../../components/SiteLayout";
import { sx } from "../../lib/styles";

export default function Page() {
  return (
    <SiteLayout active="kunde">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Rekruttering og headhunting til sjøs</h1>
          <p style={sx.leadSmall}>
            Vi finner faste ansatte til nøkkelroller på bro, dekk og i landorganisasjonen. Bluecrew kombinerer nettverk fra
            sjøen med moderne rekrutteringsprosesser for å sikre riktig match.
          </p>
          <div style={{ display: "grid", gap: 24, marginTop: 32 }}>
            <section style={{ background: "#ffffff", borderRadius: 20, border: "1px solid #e2e8f0", padding: 26, boxShadow: "0 18px 36px rgba(15, 23, 42, 0.07)", display: "grid", gap: 10 }}>
              <h2 style={{ ...sx.h2, fontSize: 24 }}>Dette gjør vi</h2>
              <ul style={{ margin: 0, paddingLeft: 20, color: "#334155", lineHeight: 1.6, display: "grid", gap: 6 }}>
                <li>Proaktivt søk og headhunting i maritime nettverk.</li>
                <li>Grundige intervjuer, case og referansesjekk.</li>
                <li>Onboardingstøtte og oppfølging gjennom prøvetid.</li>
              </ul>
            </section>
            <section style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 20, padding: 26, display: "grid", gap: 10 }}>
              <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Når passer rekruttering?</h3>
              <p style={{ margin: 0, lineHeight: 1.6 }}>
                Når du trenger nøkkelpersonell som skal bygge kultur og kontinuitet over tid. Vi bistår særlig med
                kapteiner/styrmenn, tekniske ledere, driftsledere og spesialister.
              </p>
            </section>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
