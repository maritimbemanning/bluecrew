import { Suspense } from "react";
import SiteLayout from "../../components/SiteLayout";
import { sx } from "../../lib/styles";
import { VippsLoginPage } from "../VippsLogin";

export const dynamic = "force-dynamic"; // Disable all caching

export default function Page() {
  return (
    <SiteLayout active="jobbsoker">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Registrer deg som jobbsøker</h1>
          <p style={sx.leadSmall}>
            Bekreft identiteten din med Vipps før du fyller ut jobbsøkerprofilen.
          </p>
          <Suspense fallback={<div style={sx.formLoading} role="status">Laster inn …</div>}>
            <VippsLoginPage />
          </Suspense>
        </div>
      </section>
    </SiteLayout>
  );
}

