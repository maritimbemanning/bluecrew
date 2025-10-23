import Link from "next/link";
import SiteLayout from "../components/SiteLayout";
import buttons from "../styles/buttons.module.css";
import base from "../styles/base.module.css";
import sections from "../styles/sections.module.css";

export default function Page() {
  return (
    <SiteLayout active="jobbsoker">
      <section className={base.sectionAlt}>
        <div className={base.wrapNarrow}>
          <h1 className={base.h2}>Jobb til sjøs med Bluecrew</h1>
          <p className={base.leadSmall}>
            Vi tilbyr oppdrag for sjøfolk som ønsker forutsigbarhet, ordnede forhold og utvikling. Som en del av Bluecrew får du
            tett dialog med ledere som selv har stått i skiftet og vet hvordan hverdagen om bord er.
          </p>
          <div className={`${sections.sectionGrid} ${sections.sectionGridLarge}`}>
            <div className={sections.card}>
              <h2 className={`${base.h2} ${sections.cardSubheading}`}>Dette kan du forvente</h2>
              <ul className={sections.cardList}>
                <li>Lønn over tariff der innsats og ansvar belønnes.</li>
                <li>Oppdrag innen havbruk, fiskeri, service-, logistikk- og spesialfartøy.</li>
                <li>Oppfølging før, under og etter oppdrag fra bemanningsledere med sjøerfaring.</li>
              </ul>
            </div>
            <div className={sections.cardDark}>
              <h3 className={sections.cardTitle}>Sertifikater og kompetanse</h3>
              <p className={sections.cardParagraph}>
                Vi hjelper deg med å holde orden på STCW, helseattest og andre kurskrav. Fortell oss hvor du står i dag, så finner
                vi oppdrag og utviklingsmuligheter som matcher nivået ditt.
              </p>
            </div>
          </div>
          <div className={sections.actionRow}>
            <Link href="/jobbsoker/registrer" className={buttons.btnMain}>
              Registrer deg
            </Link>
            <Link href="/jobbsoker/oppdrag" className={buttons.btnSecondary}>
              Se hvilke oppdrag vi tilbyr
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
