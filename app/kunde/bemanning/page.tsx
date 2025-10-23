import Link from "next/link";
import SiteLayout from "../../components/SiteLayout";
import base from "../../styles/base.module.css";
import sections from "../../styles/sections.module.css";
import buttons from "../../styles/buttons.module.css";

export default function Page() {
  return (
    <SiteLayout active="kunde">
      <section className={base.sectionAlt}>
        <div className={base.wrapNarrow}>
          <h1 className={base.h2}>Bemanning når operasjonen ikke kan stoppe</h1>
          <p className={base.leadSmall}>
            Vi leverer komplette team eller enkeltressurser til havbruk, fiskeri, servicefartøy, logistikk og beredskap. Bluecrew
            håndterer skiftplan, kontrakter og dokumentasjon slik at du kan fokusere på driften.
          </p>
          <div className={sections.sectionGrid}>
            <section className={sections.card}>
              <h2 className={`${base.h2} ${sections.cardSubheading}`}>Våre leveranser</h2>
              <ul className={sections.cardList}>
                <li>Operativ bemanning for korttidsoppdrag, sesong og fast turnus.</li>
                <li>Kapteiner, styrmenn, matroser, teknikere og støttepersonell.</li>
                <li>Planlegging av skift, transport og onboarding av mannskap.</li>
              </ul>
            </section>
            <section className={sections.cardDark}>
              <h3 className={sections.cardTitle}>Fordeler</h3>
              <p className={sections.cardParagraph}>
                Kundene våre får en partner som kjenner kravene til sikker drift. Vi sørger for verifiserte sertifikater, HMS-oppfølging
                og rapportering gjennom hele engasjementet.
              </p>
            </section>
          </div>
          <div className={sections.sectionGrid}>
            <Link href="/kunde/registrer-behov" className={buttons.btnSecondary}>
              Registrer behov
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
