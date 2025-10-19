import SiteLayout from "../../components/SiteLayout";
import { sx } from "../../lib/styles";
import ClientContent from "../ClientContent";

export default function Page() {
  return (
    <SiteLayout active="kunde">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Registrer bemanningsbehov</h1>
          <p style={sx.leadSmall}>
            Del informasjon om fartøyet eller operasjonen du trenger mannskap til. Vi matcher kvalifiserte sjøfolk med riktig
            erfaring, sertifikater og tilgjengelighet.
          </p>
          <ClientContent />
        </div>
      </section>
    </SiteLayout>
  );
}
