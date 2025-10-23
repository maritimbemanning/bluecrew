import { Suspense } from "react";
import SiteLayout from "../../components/SiteLayout";
import CandidateContent from "../CandidateContent";
import formStyles from "../candidate-content.module.css";

export default function Page() {
  return (
    <SiteLayout active="jobbsoker">
      <section className="section section--alt">
        <div className="container container--narrow">
          <h1 className="heading-xl">Registrer deg som jobbsøker</h1>
          <p className="text-lead text-lead--sm">
            Fyll ut skjemaet og last opp CV og sertifikater. Vi kobler deg på oppdrag når vi finner en match med erfaringen og
            tilgjengeligheten din.
          </p>
          <Suspense fallback={<div className={formStyles.loading} role="status">Laster inn skjema …</div>}>
            <CandidateContent />
          </Suspense>
        </div>
      </section>
    </SiteLayout>
  );
}
