import { Metadata } from "next";
import SiteLayout from "../components/SiteLayout";
import { sx } from "../lib/styles";

export const metadata: Metadata = {
  title: "Kontakt oss - Bluecrew AS Harstad",
  description:
    "Kontakt Bluecrew AS for bemanning til havbruk, servicefartøy og offshore. Telefon 923 28 850. E-post: isak@bluecrew.no. Besøksadresse: Ervikveien 110, Harstad.",
  keywords: [
    "kontakt bluecrew",
    "bemanning forespørsel",
    "bluecrew telefon",
    "bluecrew harstad",
    "maritim bemanning kontakt",
    "rekruttering henvendelse",
  ],
  openGraph: {
    title: "Kontakt Bluecrew AS",
    description: "Ta kontakt for bemanning til havbruk, servicefartøy og offshore. Vi svarer raskt.",
    type: "website",
  },
  alternates: {
    canonical: "/kontakt",
  },
};

export default function Page() {
  return (
    <SiteLayout active="kontakt">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Kontakt oss</h1>
          <p style={sx.leadSmall}>
            Ta kontakt for forespørsel om bemanning, samarbeid eller andre henvendelser. Vi svarer raskt og følger opp tett.
          </p>
          <div style={sx.contactGrid}>
            <div>
              <h2 style={sx.contactTitle}>Bluecrew AS</h2>
              <p style={sx.contactLine}>
                <strong>E-post:</strong> <a href="mailto:isak@bluecrew.no" style={sx.contactLink}>isak@bluecrew.no</a>
              </p>
              <p style={sx.contactLine}>
                <strong>Telefon:</strong> <a href="tel:92328850" style={sx.contactLink}>923 28 850</a>
              </p>
              <p style={sx.contactLine}>
                <strong>Adresse:</strong> Ervikveien 110, 9402 Harstad
              </p>
            </div>
            <div>
              <h2 style={sx.contactTitle}>Juridisk informasjon</h2>
              <p style={sx.contactLine}>Bluecrew AS</p>
              <p style={sx.contactLine}>Org.nr: 936 463 843</p>
              <p style={sx.contactLine}>Persondata behandles i henhold til GDPR.</p>
            </div>
          </div>
          <div style={sx.privacyBox}>
            <p style={{ margin: 0, fontSize: 14 }}>
              Alle personopplysninger lagres sikkert og brukes kun i forbindelse med rekruttering og bemanning. Dokumenter deles ikke med tredjepart uten samtykke.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

