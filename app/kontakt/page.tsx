import SiteLayout from "../components/SiteLayout";
import { sx } from "../lib/styles";

export default function Page() {
  return (
    <SiteLayout active="kontakt">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Kontakt oss</h1>
          <p style={sx.leadSmall}>
            Ta kontakt for bemanning i havbruk, fiskeri, logistikk, offshore eller annen maritim virksomhet. Vi svarer raskt og
            følger opp tett.
          </p>
          <div style={sx.contactGrid}>
            <div>
              <h2 style={sx.contactTitle}>Bluecrew AS</h2>
              <p style={sx.contactLine}>
                <strong>E-post:</strong> <a href="mailto:isak@bluecrew.no" style={sx.contactLink}>isak@bluecrew.no</a>
              </p>
              <p style={sx.contactLine}>
                <strong>Telefon:</strong> <a href="tel:92328850" style={sx.contactLink}>923 28 850</a>
              </p>
              <p style={sx.contactLine}>
                <strong>Adresse:</strong> Østenbekkveien 43, 9403 Harstad
              </p>
            </div>
            <div>
              <h2 style={sx.contactTitle}>Juridisk informasjon</h2>
              <p style={sx.contactLine}>Bluecrew AS</p>
              <p style={sx.contactLine}>Org.nr: 936 321 194</p>
              <p style={sx.contactLine}>Persondata behandles i henhold til GDPR.</p>
            </div>
          </div>
          <div style={sx.privacyBox}>
            <p style={{ margin: 0, fontSize: 14 }}>
              Alle personopplysninger lagres sikkert og brukes kun i forbindelse med rekruttering og bemanning. Dokumenter deles ikke med tredjepart uten samtykke.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
