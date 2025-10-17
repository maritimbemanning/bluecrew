import { Suspense } from "react";
import SiteLayout from "../components/SiteLayout";
import { sx } from "../lib/styles";
import ClientContent from "./ClientContent";

export default function Page() {
  return (
    <SiteLayout active="kunde">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Meld inn bemanningsbehov</h1>
          <p style={sx.leadSmall}>
            Fortell oss om fartøyet eller oppdraget du trenger folk til. Vi matcher kvalifiserte sjøfolk med riktig kompetanse og tilgjengelighet.
          </p>
          <Suspense fallback={null}>
            <ClientContent />
          </Suspense>
        </div>
      </section>
    </SiteLayout>
  );
}
