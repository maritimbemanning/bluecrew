import { Suspense } from "react";
import SiteLayout from "../components/SiteLayout";
import { STCW_MODULES } from "../lib/constants";
import { sx } from "../lib/styles";
import CandidateContent from "../kandidat/CandidateContent";

export default function Page() {
  return (
    <SiteLayout active="jobbsoker">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Registrer deg som kandidat</h1>
          <p style={sx.leadSmall}>
            Vi leter etter sjøfolk som ønsker oppdrag innen havbruk, fiskeri, logistikk og offshore støtte. Våre kunder tilbyr
            lønn over tariff, gode turnuser og mulighet til å bygge videre på kompetansen din.
          </p>
          <ul style={{ margin: "16px 0 24px", paddingLeft: 20, color: "#334155", lineHeight: 1.6, fontSize: 15 }}>
            <li>Oppdrag med tydelig briefing, oppfølging og god planlegging av reise og oppstart.</li>
            <li>
              Tilgang til kurspåfyll og veiledning rundt sertifikater som {STCW_MODULES.join(", ")} samt helseattest og brovakthold.
            </li>
            <li>Mulighet til å ta både kortvarige og lengre engasjement – vi matcher etter dine ønsker.</li>
          </ul>
          <Suspense fallback={<div style={sx.loading}>Laster inn skjema …</div>}>
            <CandidateContent />
          </Suspense>
        </div>
      </section>
    </SiteLayout>
  );
}
