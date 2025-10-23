import SiteLayout from "../../components/SiteLayout";

export default function Page() {
  return (
    <SiteLayout active="jobbsoker">
      <section className="section section--alt">
        <div className="container container--narrow">
          <h1 className="heading-xl">Oppdrag for sjøfolk</h1>
          <p className="text-lead text-lead--sm">
            Bluecrew leverer oppdrag innen hele den maritime verdikjeden. Vi tilbyr konkurransedyktige vilkår, lønn over tariff og
            bonuser der innsats og resultat gjør en forskjell.
          </p>
          <div className="content-stack mt-section">
            <section className="content-card">
              <h2 className="heading-lg">Typiske oppdrag</h2>
              <ul className="content-list">
                <li>Havbruk: driftslag, fôringsoperatører og servicefartøy.</li>
                <li>Fiskeri: skipper, styrmann og erfarne matroser til kyst- og havfiske.</li>
                <li>Service- og spesialfartøy: ROV, dekksbesetning, mekanikere og prosjektskip.</li>
                <li>Logistikk og beredskap: havn, slepebåt, SAR og støttefartøy.</li>
              </ul>
            </section>
            <section className="content-card content-card--dark">
              <h3 className="heading-lg">Hva vi trenger fra deg</h3>
              <ul className="content-list">
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
