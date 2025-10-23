import SiteLayout from "../../components/SiteLayout";
import base from "../../styles/base.module.css";
import sections from "../../styles/sections.module.css";

export default function Page() {
  return (
    <SiteLayout active="jobbsoker">
      <section className={base.sectionAlt}>
        <div className={base.wrapNarrow}>
          <h1 className={base.h2}>Oppdrag for sjøfolk</h1>
          <p className={base.leadSmall}>
            Bluecrew leverer oppdrag innen hele den maritime verdikjeden. Vi tilbyr konkurransedyktige vilkår, lønn over tariff
            og bonuser der innsats og resultat gjør en forskjell.
          </p>
          <div className={sections.sectionGrid}>
            <section className={sections.card}>
              <h2 className={`${base.h2} ${sections.cardSubheading}`}>Typiske oppdrag</h2>
              <ul className={sections.cardList}>
                <li>Havbruk: driftslag, fôringsoperatører og servicefartøy.</li>
                <li>Fiskeri: skipper, styrmann og erfarne matroser til kyst- og havfiske.</li>
                <li>Service- og spesialfartøy: ROV, dekksbesetning, mekanikere og prosjektskip.</li>
                <li>Logistikk og beredskap: havn, slepebåt, SAR og støttefartøy.</li>
              </ul>
            </section>
            <section className={sections.cardDark}>
              <h3 className={sections.cardTitle}>Hva vi trenger fra deg</h3>
              <ul className={sections.cardListDark}>
                <li>Gyldig STCW grunnleggende sikkerhetskurs og helseattest.</li>
                <li>Eventuelle fagbrev, dekksoffiser- eller maskinoffisersertifikater.</li>
                <li>Referanser fra tidligere oppdrag og motivasjon for å levere gode resultater.</li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
