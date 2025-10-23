import Link from "next/link";
import SiteLayout from "../components/SiteLayout";
import buttons from "../styles/buttons.module.css";
import base from "../styles/base.module.css";
import sections from "../styles/sections.module.css";

export default function Page() {
  return (
    <SiteLayout active="kunde">
      <section className={base.sectionAlt}>
        <div className={base.wrapNarrow}>
          <h1 className={base.h2}>Bemanningspartner for hele den maritime verdikjeden</h1>
          <p className={base.leadSmall}>
            Vi støtter rederier, oppdrett, service- og spesialfartøy med komplette bemanningsløsninger. Bluecrew eies og drives
            av sjøfolk – derfor vet vi hvilke ressurser som trengs for å holde operasjonen trygg og effektiv.
          </p>
          <div className={`${sections.sectionGrid} ${sections.sectionGridLarge}`}>
            <div className={sections.card}>
              <h2 className={`${base.h2} ${sections.cardSubheading}`}>Hvordan vi jobber</h2>
              <ul className={sections.cardList}>
                <li>Behovskartlegging med fokus på sertifikater, erfaring og turnus.</li>
                <li>Screening, referansesjekk og dokumentkontroll før vi presenterer mannskapet.</li>
                <li>Tett oppfølging om bord og løpende evaluering gjennom hele oppdraget.</li>
              </ul>
            </div>
            <div className={sections.cardDark}>
              <h3 className={sections.cardTitle}>Neste steg</h3>
              <p className={sections.cardParagraph}>
                Ta kontakt for å diskutere kommende behov, eller registrer et konkret oppdrag via skjemaet. Vi skreddersyr team
                til havbruk, fiskeri, logistikk, beredskap og offshore støttefartøy.
              </p>
            </div>
          </div>
          <div className={sections.actionRow}>
            <Link href="/kunde/registrer-behov" className={buttons.btnMain}>
              Registrer behov
            </Link>
            <Link href="/kontakt" className={buttons.btnGhost}>
              Snakk med en bemanningsleder
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
