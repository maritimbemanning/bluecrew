import { Suspense } from "react";
import SiteLayout from "../components/SiteLayout";
import { sx } from "../lib/styles";
import CandidateContent from "./CandidateContent";

export default function Page() {
  return (
    <SiteLayout active="kandidat">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Registrer deg som kandidat</h1>
          <p style={sx.leadSmall}>
            Vi er alltid på jakt etter flinke sjøfolk til havbruk, fiskeri og servicefartøy. Fyll ut skjemaet og last opp CV så tar vi kontakt når vi har oppdrag som passer.
          </p>
          <Suspense fallback={null}>
            <CandidateContent />
          </Suspense>
        </div>
      </section>
    </SiteLayout>
  );
}
