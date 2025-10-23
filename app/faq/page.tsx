import Link from "next/link";
import SiteLayout from "../components/SiteLayout";
import buttons from "../styles/buttons.module.css";
import base from "../styles/base.module.css";
import { FAQS } from "../lib/constants";

export default function FAQPage() {
  return (
    <SiteLayout active="faq">
      <section className={base.section}>
        <div className={base.wrapNarrow}>
          <div className={base.sectionHeading}>
            <div className={base.heroPill} style={{ margin: "0 auto 18px" }}>Vanlige spørsmål</div>
            <h1 className={base.h2}>Svar på de vanligste bemanningsspørsmålene</h1>
            <p className={base.leadSmall}>
              Her finner du informasjon om hvordan vi jobber med jobbsøkere og rederier. Kontakt oss hvis du trenger mer
              detaljer eller ønsker å diskutere et konkret oppdrag.
            </p>
          </div>
          <div className={base.faqList}>
            {FAQS.map((faq) => (
              <details key={faq.q} className={base.faqItem}>
                <summary className={base.faqSummary}>{faq.q}</summary>
                <p className={base.faqContent}>{faq.a}</p>
              </details>
            ))}
          </div>
          <div style={{ marginTop: 48, textAlign: "center" }}>
            <Link href="/kontakt" className={buttons.btnMain}>
              Ta kontakt med oss
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
