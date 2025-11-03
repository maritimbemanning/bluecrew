import { Suspense } from "react";
import SiteLayout from "../../components/SiteLayout";
import { sx } from "../../lib/styles";
import CandidateContent from "../CandidateForm";

export const dynamic = "force-dynamic"; // Disable all caching

export default function Page() {
  return (
    <SiteLayout active="jobbsoker">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Registrer deg som jobbsøker</h1>
          <p style={sx.leadSmall}>
            Fyll ut skjemaet under for å registrere deg som jobbsøker.
          </p>
          <Suspense fallback={<div style={sx.formLoading} role="status">Laster inn …</div>}>
            <CandidateContent />
          </Suspense>
        </div>
      </section>
    </SiteLayout>
  );
}
