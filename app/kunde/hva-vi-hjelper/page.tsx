import SiteLayout from "../../components/SiteLayout";
import { sx } from "../../lib/styles";

const SUPPORT_LIST = [
  {
    heading: "Operativ drift",
    text: "Planlegging av skift, koordinering av reiser og håndtering av dokumentasjon slik at mannskapet møter klart til første vakt.",
  },
  {
    heading: "Bemanning ved endringer",
    text: "Sesongtopper, prosjekter og uforutsette hendelser løses med fleksible team som er vant til å kaste loss på kort varsel.",
  },
  {
    heading: "Langsiktige samarbeid",
    text: "Vi bygger kjerneteam rundt fartøyene dine og følger dem opp med jevnlige statusmøter og forslag til forbedringer.",
  },
  {
    heading: "Rådgivning",
    text: "Tilgang til sparring om bemanningsplaner, HMS og krav til sertifisering på tvers av maritime segmenter.",
  },
];

export default function Page() {
  return (
    <SiteLayout active="kunde">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Hva vi hjelper din bedrift med</h1>
          <p style={sx.leadSmall}>
            Bluecrew er partneren din fra bemanningsplan til fullført oppdrag. Vi kjenner hele den maritime verdikjeden og
            tilpasser leveransen etter hvordan fartøyet ditt opererer.
          </p>
          <div style={{ display: "grid", gap: 20, marginTop: 32 }}>
            {SUPPORT_LIST.map((item) => (
              <article key={item.heading} style={sx.featureCard}>
                <h2 style={{ ...sx.featureTitle, fontSize: 20 }}>{item.heading}</h2>
                <p style={sx.featureText}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
