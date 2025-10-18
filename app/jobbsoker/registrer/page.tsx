import { Suspense } from "react";
import SiteLayout from "../../components/SiteLayout";
import { sx } from "../../lib/styles";
import CandidateContent from "../CandidateContent";

export default function Page() {
  return (
    <SiteLayout active="jobbsoker">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Registrer deg som jobbsøker</h1>
          <p style={sx.leadSmall}>
            Fyll ut skjemaet og last opp CV og sertifikater. Vi kobler deg på oppdrag når vi finner en match med erfaringen og
            tilgjengeligheten din.
          </p>
          <Suspense fallback={<div style={sx.loading}>Laster inn skjema …</div>}>
            <CandidateContent />
          </Suspense>
        </div>
      </section>
    </SiteLayout>
  );
}
