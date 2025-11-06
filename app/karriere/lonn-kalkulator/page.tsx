import type { Metadata } from "next";
import { SalaryCalculator } from "./SalaryCalculator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bluecrew.no";

export const metadata: Metadata = {
  title: "Lønnkalkulator Maritim | Beregn Din Lønn som Sjømann 2025",
  description:
    "Interaktiv lønnkalkulator for maritime stillinger i Norge. Beregn forventet lønn som matros, styrmann, kaptein, maskinoffiser og dekksoffiser. Oppdatert for 2025.",
  keywords: [
    "maritim lønn kalkulator",
    "sjømann lønn beregner",
    "matros lønn kalkulator",
    "kaptein lønn beregner",
    "offshore lønn kalkulator",
    "havbruk lønn beregner",
    "STCW lønn Norge",
  ],
  openGraph: {
    title: "Lønnkalkulator Maritim | Beregn Din Lønn som Sjømann 2025",
    description: "Beregn forventet lønn for maritime stillinger. Matros, styrmann, kaptein, maskinoffiser og dekksoffiser.",
    url: `${siteUrl}/karriere/lonn-kalkulator`,
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
          text: "Erfaring har stor innvirkning. 0-2 år erfaring gir basislønn, 2-5 år kan øke lønnen med 20-30%, og over 5 års erfaring kan gi 40-60% høyere lønn enn startlønn.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <main className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
            ⚓ Maritim Lønnkalkulator
          </h1>
          <p style={{ fontSize: "1.25rem", color: "#666", maxWidth: "700px", margin: "0 auto" }}>
            Beregn forventet lønn for maritime stillinger i Norge. Basert på reelle lønnsdata fra 2025.
          </p>
        </header>

        <SalaryCalculator />

        <section style={{ marginTop: "4rem", padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
            Ofte stilte spørsmål om maritim lønn
          </h2>
          
          <div style={{ display: "grid", gap: "1.5rem" }}>
            <details style={{ padding: "1rem", backgroundColor: "white", borderRadius: "8px" }}>
              <summary style={{ fontWeight: "600", cursor: "pointer", fontSize: "1.1rem" }}>
                Hva tjener en matros i Norge?
              </summary>
              <p style={{ marginTop: "1rem", color: "#555" }}>
                En matros i Norge tjener typisk mellom 450 000 - 650 000 kr i året, avhengig av erfaring og arbeidssted. 
                Med offshore-tillegg kan lønnen overstige 700 000 kr.
              </p>
            </details>

            <details style={{ padding: "1rem", backgroundColor: "white", borderRadius: "8px" }}>
              <summary style={{ fontWeight: "600", cursor: "pointer", fontSize: "1.1rem" }}>
                Hvor mye tjener en kaptein på havbruk?
              </summary>
              <p style={{ marginTop: "1rem", color: "#555" }}>
                En kaptein på havbruksanlegg tjener typisk 700 000 - 950 000 kr årlig. 
                Med god erfaring og lederansvar kan lønnen overstige 1 million kr.
              </p>
            </details>

            <details style={{ padding: "1rem", backgroundColor: "white", borderRadius: "8px" }}>
              <summary style={{ fontWeight: "600", cursor: "pointer", fontSize: "1.1rem" }}>
                Påvirker STCW-sertifikat lønnen min?
              </summary>
              <p style={{ marginTop: "1rem", color: "#555" }}>
                Ja, gyldig STCW-sertifikat er et krav for de fleste maritime stillinger og påvirker både jobbmuligheter og lønn. 
                Spesialiserte sertifikater som DP (Dynamic Positioning) kan øke lønnen med 15-25%.
              </p>
            </details>

            <details style={{ padding: "1rem", backgroundColor: "white", borderRadius: "8px" }}>
              <summary style={{ fontWeight: "600", cursor: "pointer", fontSize: "1.1rem" }}>
                Hvordan påvirker erfaring maritim lønn?
              </summary>
              <p style={{ marginTop: "1rem", color: "#555" }}>
                Erfaring har stor innvirkning. 0-2 år erfaring gir basislønn, 2-5 år kan øke lønnen med 20-30%, 
                og over 5 års erfaring kan gi 40-60% høyere lønn enn startlønn.
              </p>
            </details>
          </div>
        </section>

        <section style={{ marginTop: "3rem", textAlign: "center", padding: "2rem", backgroundColor: "#e3f2fd", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
            Klar for neste steg i karrieren?
          </h2>
          <p style={{ marginBottom: "1.5rem", color: "#555" }}>
            Vi hjelper deg med å finne maritime oppdrag som matcher din erfaring og lønnsforventning.
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
