import SiteLayout from "@/app/components/SiteLayout";
import { sx } from "@/app/lib/styles";

export default function VippsFeilPage() {
  return (
    <SiteLayout active="jobbsoker">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Identitetskontroll via Vipps er påkrevd</h1>
          <div style={{ ...sx.formError, marginTop: 12 }}>
            Vi kan ikke starte Vipps akkurat nå fordi tjenesten ikke er riktig konfigurert.
          </div>
          <p style={{ ...sx.leadSmall, marginTop: 12 }}>
            Dette er et midlertidig problem. Vennligst prøv igjen senere, eller ta kontakt på
            {" "}
            <a href="mailto:post@bluecrew.no" style={{ color: "#0ea5e9" }}>post@bluecrew.no</a>.
          </p>
          <div style={{ marginTop: 16 }}>
            <a href="/jobbsoker/registrer" style={sx.btnSecondary}>Tilbake til registrering</a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
