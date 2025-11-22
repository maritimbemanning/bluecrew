import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteLayout from "../components/SiteLayout";
import { FAQS } from "../lib/constants";
import { sx } from "../lib/styles";

export const metadata: Metadata = {
  title: "Vanlige spørsmål - Maritim bemanning og rekruttering",
  description:
    "Svar på vanlige spørsmål om maritim bemanning, STCW-krav, lønn, turnus og kontrakter. Alt du trenger å vite om å jobbe gjennom Bluecrew eller bestille mannskap.",
  keywords: [
    "FAQ maritim bemanning",
    "STCW krav",
    "lønn sjøfolk",
    "turnus havbruk",
    "bemanning spørsmål",
    "kontrakt maritime",
    "rekruttering spørsmål",
    "helseattest sjømann",
    "maritime sertifikater",
  ],
  openGraph: {
    title: "FAQ - Vanlige spørsmål om maritim bemanning | Bluecrew AS",
    description: "Svar på spørsmål om bemanning, STCW-krav, lønn og kontrakter.",
    type: "website",
  },
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQPage() {
  // FAQPage structured data for Google (extract plain text from answers)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  // Enhanced answers with internal links for SEO
  const renderAnswer = (faq: { q: string; a: string }) => {
    // Sertifikater question
    if (faq.q === "Hvilke sertifikater trenger jeg for å få oppdrag?") {
      return (
        <>
          Minimum STCW grunnleggende sikkerhetskurs (PST, FPFF, EFA) og gyldig helseattest. Avhengig av stilling kan du
          trenge fagbrev, dekksoffiser- eller maskinoffisersertifikater.{" "}
          <Link href="/lonn/oversikt" style={{ textDecoration: "underline", fontWeight: 500 }}>
            Se vår komplette lønnsoversikt
          </Link>{" "}
          for alle krav, eller kontakt oss så hjelper vi deg med å kartlegge hva som kreves.
        </>
      );
    }

    // Lønn question
    if (faq.q === "Hvor mye kan jeg forvente å tjene?") {
      return (
        <>
          Lønn varierer etter stilling, erfaring og type fartøy. Vi tilbyr konkurransedyktig lønn over tariff der innsats
          og kompetanse belønnes.{" "}
          <Link href="/lonn/oversikt" style={{ textDecoration: "underline", fontWeight: 500 }}>
            Se vår komplette lønnsguide for maritime stillinger
          </Link>{" "}
          eller kontakt oss for konkrete lønnsestimater basert på din bakgrunn.
        </>
      );
    }

    // Sertifikat mangler question
    if (faq.q === "Hva hvis jeg mangler et sertifikat?") {
      return (
        <>
          Vi hjelper deg med å kartlegge hvilke kurs du trenger og kan gi veiledning om hvor du tar dem.{" "}
          <Link href="/lonn/oversikt" style={{ textDecoration: "underline", fontWeight: 500 }}>
            Les mer om lønn og krav for maritime stillinger
          </Link>
          . I noen tilfeller kan kunden dekke kurskostnader hvis du forplikter deg til et lengre oppdrag.
        </>
      );
    }

    // Bemanning vs rekruttering question
    if (faq.q === "Hva er forskjellen på bemanning og rekruttering?") {
      return (
        <>
          Bemanning er når vi leverer personell som er ansatt hos oss, mens rekruttering er når vi finner kandidater til
          fast ansettelse hos deg.{" "}
          <Link href="/kunde/bemanning" style={{ textDecoration: "underline", fontWeight: 500 }}>
            Les mer om vår bemanningsløsning
          </Link>{" "}
          eller{" "}
          <Link href="/kunde/rekruttering" style={{ textDecoration: "underline", fontWeight: 500 }}>
            rekrutteringstjeneste
          </Link>
          . Bemanning gir fleksibilitet, rekruttering gir langsiktig kontinuitet.
        </>
      );
    }

    // Pricing question
    if (faq.q === "Hva koster bemanningsløsningene deres?") {
      return (
        <>
          Vi tilbyr skreddersydde løsninger basert på hver kundes behov.{" "}
          <Link href="/kunde/registrer-behov" style={{ textDecoration: "underline", fontWeight: 500 }}>
            Kontakt oss for en uforpliktende samtale
          </Link>{" "}
          der vi kan diskutere ditt prosjekt.
        </>
      );
    }

    // Mobiliseringstid question
    if (faq.q === "Hvor raskt kan dere levere personell?") {
      return (
        <>
          Behov som meldes inn på dagtid får normalt svar innen 24 timer. Ved akutte tilfeller følger vi opp etter avtale
          og prioriterer oppstart så raskt som mulig. Vårt nettverk gjør at vi ofte kan mobilisere på 48-72 timer.{" "}
          <Link href="/kunde/registrer-behov" style={{ textDecoration: "underline", fontWeight: 500 }}>
            Registrer ditt behov her
          </Link>
          .
        </>
      );
    }

    // Kvalitetssikring question
    if (faq.q === "Hvordan sikrer dere kvaliteten på mannskapet?") {
      return (
        <>
          Alle kandidater gjennomgår intervju, referansesjekk og dokumentkontroll før godkjenning. Vi verifiserer
          sertifikater, helseattest og arbeidserfaring. Teamet vårt har selv erfaring fra sjøen og vet hva som kreves.{" "}
          <Link href="/om-oss" style={{ textDecoration: "underline", fontWeight: 500 }}>
            Les mer om hvordan vi jobber
          </Link>
          .
        </>
      );
    }

    // Jobbsøker registrering question
    if (faq.q === "Hvordan registrerer jeg meg som jobbsøker?") {
      return (
        <>
          Bruk skjemaet under «Jobbsøker» og last opp CVen din. Vi kontakter deg når vi har et oppdrag som matcher
          erfaringen din.{" "}
          <Link href="/jobbsoker/registrer" style={{ textDecoration: "underline", fontWeight: 500 }}>
            Registrer deg her
          </Link>
          .
        </>
      );
    }

    // Default: return plain text
    return faq.a;
  };

  return (
    <SiteLayout active="faq">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section style={sx.section}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ ...sx.heroPill, margin: "0 auto 18px" }}>Vanlige spørsmål</div>
            <h1 style={sx.h2}>Svar på de vanligste bemanningsspørsmålene</h1>
            <p style={sx.leadSmall}>
              Her finner du informasjon om hvordan vi jobber med jobbsøkere og rederier. Kontakt oss hvis du trenger mer
              detaljer eller ønsker å diskutere et konkret oppdrag.
            </p>
          </div>
          <div style={sx.faqList}>
            {FAQS.map((faq) => (
              <details key={faq.q} style={sx.faqItem}>
                <summary style={sx.faqSummary}>{faq.q}</summary>
                <div style={sx.faqContent}>{renderAnswer(faq)}</div>
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

