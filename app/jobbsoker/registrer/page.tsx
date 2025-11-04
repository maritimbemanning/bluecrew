import { Suspense } from "react";
import SiteLayout from "../../components/SiteLayout";
import { sx } from "../../lib/styles";
import CandidateContent from "../CandidateContent";

export default function Page() {
  const vippsEnabled = Boolean(
    process.env.VIPPS_CLIENT_ID &&
      process.env.VIPPS_CLIENT_SECRET &&
      process.env.VIPPS_SUBSCRIPTION_KEY &&
      process.env.VIPPS_ISSUER,
  );
  return (
    <SiteLayout active="jobbsoker">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Registrer deg som jobbsøker</h1>
          <p style={sx.leadSmall}>
            Fyll ut skjemaet og last opp CV og sertifikater. Vi kobler deg på oppdrag når vi finner en match med erfaringen og
            tilgjengeligheten din.
          </p>
          {vippsEnabled && (
            <div style={{
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              color: "#1d4ed8",
              padding: 12,
              borderRadius: 12,
              fontWeight: 600,
              marginTop: 8,
            }}>
              Før du kan sende inn skjemaet, sender vi deg til Vipps for å bekrefte identiteten din.
            </div>
          )}
          <Suspense fallback={<div style={sx.formLoading} role="status">Laster inn skjema …</div>}>
            <CandidateContent />
          </Suspense>
        </div>
      </section>
    </SiteLayout>
  );
}
