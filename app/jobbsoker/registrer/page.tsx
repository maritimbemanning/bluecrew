import { Suspense } from "react";
import SiteLayout from "../../components/SiteLayout";
import base from "../../styles/base.module.css";
import formStyles from "../../styles/forms.module.css";
import CandidateContent from "../CandidateContent";

export default function Page() {
  return (
    <SiteLayout active="jobbsoker">
      <section className={base.sectionAlt}>
        <div className={base.wrapNarrow}>
          <h1 className={base.h2}>Registrer deg som jobbsøker</h1>
          <p className={base.leadSmall}>
            Fyll ut skjemaet og last opp CV og sertifikater. Vi kobler deg på oppdrag når vi finner en match med erfaringen og
            tilgjengeligheten din.
          </p>
          <Suspense fallback={<div className={formStyles.formLoading} role="status">Laster inn skjema …</div>}>
            <CandidateContent />
          </Suspense>
        </div>
      </section>
    </SiteLayout>
  );
}
