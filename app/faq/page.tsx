import Link from "next/link";
import SiteLayout from "../components/SiteLayout";
import { FAQS } from "../lib/constants";
import { sx } from "../lib/styles";

export default function FAQPage() {
  return (
    <SiteLayout active="faq">
      <section style={sx.section}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ ...sx.heroPill, margin: "0 auto 18px" }}>Vanlige spørsmål</div>
            <h1 style={sx.h2}>Svar på de vanligste bemanningsspørsmålene</h1>
            <p style={sx.leadSmall}>
              Her finner du informasjon om hvordan vi jobber med kandidater og rederier. Kontakt oss hvis du trenger mer
              detaljer eller ønsker å diskutere et konkret oppdrag.
            </p>
          </div>
          <div style={sx.faqList}>
            {FAQS.map((faq) => (
              <details key={faq.q} style={sx.faqItem}>
                <summary style={sx.faqSummary}>{faq.q}</summary>
                <p style={sx.faqContent}>{faq.a}</p>
              </details>
            ))}
          </div>
          <div style={{ marginTop: 48, textAlign: "center" }}>
            <Link href="/kontakt" style={sx.btnMain}>
              Ta kontakt med oss
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
