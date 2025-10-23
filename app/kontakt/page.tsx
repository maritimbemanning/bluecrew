import SiteLayout from "../components/SiteLayout";
import base from "../styles/base.module.css";

export default function Page() {
  return (
    <SiteLayout active="kontakt">
      <section className={base.sectionAlt}>
        <div className={base.wrapNarrow}>
          <h1 className={base.h2}>Kontakt oss</h1>
          <p className={base.leadSmall}>
            Ta kontakt for forespørsel om bemanning, samarbeid eller andre henvendelser. Vi svarer raskt og følger opp tett.
          </p>
          <div className={base.contactGrid}>
            <div>
              <h2 className={base.contactTitle}>Bluecrew AS</h2>
              <p className={base.contactLine}>
                <strong>E-post:</strong> <a href="mailto:isak@bluecrew.no" className={base.contactLink}>isak@bluecrew.no</a>
              </p>
              <p className={base.contactLine}>
                <strong>Telefon:</strong> <a href="tel:92328850" className={base.contactLink}>923 28 850</a>
              </p>
              <p className={base.contactLine}>
                <strong>Adresse:</strong> Østenbekkveien 43, 9403 Harstad
              </p>
            </div>
            <div>
              <h2 className={base.contactTitle}>Juridisk informasjon</h2>
              <p className={base.contactLine}>Bluecrew AS</p>
              <p className={base.contactLine}>Org.nr: 936 321 194</p>
              <p className={base.contactLine}>Persondata behandles i henhold til GDPR.</p>
            </div>
          </div>
          <div className={base.privacyBox}>
            <p style={{ margin: 0, fontSize: 14 }}>
              Alle personopplysninger lagres sikkert og brukes kun i forbindelse med rekruttering og bemanning. Dokumenter deles ikke med tredjepart uten samtykke.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
