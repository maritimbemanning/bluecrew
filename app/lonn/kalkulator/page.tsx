import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { SalaryCalculator } from "./SalaryCalculator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bluecrew.no";

export const metadata: Metadata = {
  title: "Lønnsoversikt Maritim 2025 | Veiledende Lønninger for Sjøfolk",
  description:
    "Veiledende lønnsintervaller for 6 maritime stillinger i Norge (matros, styrmann, kaptein, maskinoffiser, dekksoffiser, kokk/forpleining). Basert på SSB, NHO Sjøfart og tariffavtaler. Oppdatert november 2025.",
  keywords: [
    "maritim lønn oversikt",
    "sjømann lønn veiledning",
    "matros lønn Norge",
    "kaptein lønn havbruk",
    "offshore lønn estimat",
    "tariffavtaler sjøfolk",
    "STCW lønn 2025",
    "skipskokk lønn",
    "forpleining maritim",
  ],
  openGraph: {
    title: "Lønnsoversikt Maritim 2025 | Veiledende Lønninger",
    description:
      "Veiledende lønnsintervaller for 6 maritime stillinger. Matros, styrmann, kaptein, maskinoffiser, dekksoffiser og kokk. Basert på offentlige kilder.",
    url: `${siteUrl}/lonn/kalkulator`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/hero/maritime-hero.jpeg`,
        width: 1920,
        height: 1080,
        alt: "Maritim lønnkalkulator",
      },
    ],
  },
  alternates: {
    canonical: "/lonn/kalkulator",
  },
};

export default function LonnKalkulatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Hva tjener en matros i Norge?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "En matros i Norge tjener typisk mellom 450 000 - 650 000 kr i året, avhengig av erfaring og arbeidssted. Med offshore-tillegg kan lønnen overstige 700 000 kr.",
        },
      },
      {
        "@type": "Question",
        name: "Hvor mye tjener en kaptein på havbruk?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "En kaptein på havbruksanlegg tjener typisk 700 000 - 950 000 kr årlig. Med god erfaring og lederansvar kan lønnen overstige 1 million kr.",
        },
      },
      {
        "@type": "Question",
        name: "Påvirker STCW-sertifikat lønnen min?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, gyldig STCW-sertifikat er et krav for de fleste maritime stillinger og påvirker både jobbmuligheter og lønn. Spesialiserte sertifikater som DP (Dynamic Positioning) kan øke lønnen med 15-25%.",
        },
      },
      {
        "@type": "Question",
        name: "Hvordan påvirker erfaring maritim lønn?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Erfaring har stor innvirkning. I vår kalkulator estimerer vi at 2-5 år erfaring kan øke lønnen med 20-30% over basislønn, mens 5+ års erfaring kan gi 35-65% høyere lønn. Faktisk lønnsutvikling varierer mellom arbeidsgivere og bransjesegment.",
        },
      },
    ],
  };

  return (
    <>
      <Script id="gads-conversion-kalkulator" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {
            'send_to': 'AW-17731534362/WdQxCN7Fu8QbEJr8hodC',
            'value': 1.0,
            'currency': 'NOK'
          });
        `}
      </Script>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main
        className="container"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}
      >
        {/* Breadcrumbs & Back Navigation */}
        <nav
          style={{
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            className="hover:bg-slate-200 hover:text-slate-900"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#f1f5f9",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#475569",
              fontSize: "0.9rem",
              fontWeight: "500",
              transition: "all 0.2s",
            }}
          >
            ← Tilbake til forsiden
          </Link>

          <div style={{ color: "#cbd5e1" }}>•</div>

          <div style={{ fontSize: "0.9rem", color: "#64748b" }}>
            <Link href="/" style={{ color: "#3b82f6", textDecoration: "none" }}>
              Hjem
            </Link>
            <span style={{ margin: "0 0.5rem", color: "#cbd5e1" }}>/</span>
            <Link
              href="/lonn/oversikt"
              style={{ color: "#3b82f6", textDecoration: "none" }}
            >
              Lønnsoversikt
            </Link>
          </div>
        </nav>

        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            ⚓ Maritim Lønnkalkulator
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#666",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Veiledende lønnsintervaller for 6 maritime stillinger i Norge.
            Basert på offentlige kilder (SSB, NHO Sjøfart, tariffavtaler).
          </p>
        </header>

        <SalaryCalculator />

        <section
          style={{
            marginTop: "4rem",
            padding: "2rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "12px",
          }}
        >
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
            }}
          >
            Ofte stilte spørsmål om maritim lønn
          </h2>

          <div style={{ display: "grid", gap: "1.5rem" }}>
            <details
              style={{
                padding: "1rem",
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            >
              <summary
                style={{
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                }}
              >
                Hva tjener en matros i Norge?
              </summary>
              <p style={{ marginTop: "1rem", color: "#555" }}>
                En matros i Norge tjener typisk mellom 450 000 - 650 000 kr i
                året, avhengig av erfaring og arbeidssted. Med offshore-tillegg
                kan lønnen overstige 700 000 kr.
              </p>
            </details>

            <details
              style={{
                padding: "1rem",
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            >
              <summary
                style={{
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                }}
              >
                Hvor mye tjener en kaptein på havbruk?
              </summary>
              <p style={{ marginTop: "1rem", color: "#555" }}>
                En kaptein på havbruksanlegg tjener typisk 700 000 - 950 000 kr
                årlig. Med god erfaring og lederansvar kan lønnen overstige 1
                million kr.
              </p>
            </details>

            <details
              style={{
                padding: "1rem",
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            >
              <summary
                style={{
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                }}
              >
                Påvirker STCW-sertifikat lønnen min?
              </summary>
              <p style={{ marginTop: "1rem", color: "#555" }}>
                Ja, gyldig STCW-sertifikat er et krav for de fleste maritime
                stillinger og påvirker både jobbmuligheter og lønn.
                Spesialiserte sertifikater som DP (Dynamic Positioning) kan øke
                lønnen med 15-25%.
              </p>
            </details>

            <details
              style={{
                padding: "1rem",
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            >
              <summary
                style={{
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                }}
              >
                Hvordan påvirker erfaring maritim lønn?
              </summary>
              <p style={{ marginTop: "1rem", color: "#555" }}>
                Erfaring har stor innvirkning. I vår kalkulator estimerer vi at
                2-5 år erfaring kan øke lønnen med 20-30% over basislønn, mens
                5+ års erfaring kan gi 35-65% høyere lønn. Faktisk
                lønnsutvikling varierer mellom arbeidsgivere og bransjesegment.
              </p>
            </details>
          </div>
        </section>

        <section
          style={{
            marginTop: "3rem",
            textAlign: "center",
            padding: "2rem",
            backgroundColor: "#e3f2fd",
            borderRadius: "12px",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Klar for neste steg i karrieren?
          </h2>
          <p style={{ marginBottom: "1.5rem", color: "#555" }}>
            Vi hjelper deg med å finne maritime oppdrag som matcher din erfaring
            og lønnsforventning.
          </p>
          <a
            href="/jobbsoker/registrer"
            style={{
              display: "inline-block",
              padding: "1rem 2rem",
              backgroundColor: "#1976d2",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: "600",
              transition: "all 0.2s",
            }}
          >
            Registrer deg som kandidat →
          </a>
        </section>
      </main>
    </>
  );
}
