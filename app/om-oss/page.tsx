import SiteLayout from "../components/SiteLayout";
import base from "../styles/base.module.css";

export default function Page() {
  return (
    <SiteLayout active="om-oss">
      <section className={base.sectionAlt}>
        <div className={base.wrapNarrow}>
          <h1 className={base.h2}>Om Bluecrew AS</h1>
          <p className={base.leadSmall}>
            Bluecrew AS er et norsk bemannings- og rekrutteringsselskap spesialisert på maritim næring. Vi leverer kvalifisert personell til havbruk, fiskeri og servicefartøy langs hele kysten.
          </p>
          <div className={base.stack}>
            <p className={base.leadSmall}>
              Selskapet drives av sjøfolk med erfaring fra norsk kystfart og oppdrettsnæring. Vi vet hva som kreves om bord, og hvor viktig det er med rett kompetanse til rett tid.
            </p>
            <p className={base.leadSmall}>
              Vi jobber tett med både mannskap og rederier. Gjennom grundig verifisering av kompetanse, sertifikater og referanser leverer vi trygge og fleksible bemanningsløsninger.
            </p>
            <div className={base.philosophyBox}>
              <p className={base.philosophyText}>
                <strong>Vår filosofi:</strong> Rett kompetanse, på rett sted, til rett tid.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
