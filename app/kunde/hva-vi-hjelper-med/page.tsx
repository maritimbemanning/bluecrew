import SiteLayout from "../../components/SiteLayout";
import base from "../../styles/base.module.css";
import sections from "../../styles/sections.module.css";

export default function Page() {
  return (
    <SiteLayout active="kunde">
      <section className={base.sectionAlt}>
        <div className={base.wrapNarrow}>
          <h1 className={base.h2}>Hva vi hjelper din bedrift med</h1>
          <p className={base.leadSmall}>
            Bluecrew tilbyr rådgivning og bemanningstjenester som dekker hele oppdraget – fra planlegging til ferdig levert mannskap.
            Vi jobber tett på både operativ drift og HR-funksjon hos kundene våre.
          </p>
          <div className={sections.sectionGrid}>
            <section className={sections.card}>
              <h2 className={`${base.h2} ${sections.cardSubheading}`}>Rådgivning</h2>
              <ul className={sections.cardList}>
                <li>Planlegging av bemanningsstrategi og beredskap.</li>
                <li>Analyse av kompetansebehov og sertifikatløp.</li>
                <li>Forbedring av turnus, logistikk og HMS-prosedyrer.</li>
              </ul>
            </section>
            <section className={sections.cardDark}>
              <h3 className={sections.cardTitle}>Gjennomføring</h3>
              <ul className={sections.cardListDark}>
                <li>Bemanning og rekruttering til kort- og langvarige behov.</li>
                <li>Koordinering av mobilisering, reiser og dokumentkontroll.</li>
                <li>Oppfølging av mannskap om bord og rapportering til ledelsen.</li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
