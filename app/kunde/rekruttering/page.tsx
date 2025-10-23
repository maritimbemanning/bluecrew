import SiteLayout from "../../components/SiteLayout";
import base from "../../styles/base.module.css";
import sections from "../../styles/sections.module.css";

export default function Page() {
  return (
    <SiteLayout active="kunde">
      <section className={base.sectionAlt}>
        <div className={base.wrapNarrow}>
          <h1 className={base.h2}>Rekruttering og headhunting til sjøs</h1>
          <p className={base.leadSmall}>
            Vi finner faste ansatte til nøkkelroller på bro, dekk og i landorganisasjonen. Bluecrew kombinerer nettverk fra
            sjøen med moderne rekrutteringsprosesser for å sikre riktig match.
          </p>
          <div className={sections.sectionGrid}>
            <section className={sections.card}>
              <h2 className={`${base.h2} ${sections.cardSubheading}`}>Dette gjør vi</h2>
              <ul className={sections.cardList}>
                <li>Proaktivt søk og headhunting i maritime nettverk.</li>
                <li>Grundige intervjuer, case og referansesjekk.</li>
                <li>Onboardingstøtte og oppfølging gjennom prøvetid.</li>
              </ul>
            </section>
            <section className={sections.cardDark}>
              <h3 className={sections.cardTitle}>Når passer rekruttering?</h3>
              <p className={sections.cardParagraph}>
                Når du trenger nøkkelpersonell som skal bygge kultur og kontinuitet over tid. Vi bistår særlig med
                kapteiner/styrmenn, tekniske ledere, driftsledere og spesialister.
              </p>
            </section>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
