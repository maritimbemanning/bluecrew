import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteLayout from "../../components/SiteLayout";
import { sx } from "../../lib/styles";
import { ArrowLeft, Calendar, Building2, Linkedin, Facebook, ExternalLink } from "lucide-react";

const articleData = {
  title: "Første leverte oppdrag til ZeonAqua",
  description: "Bluecrew AS har levert sitt første bemanningsoppdrag til ZeonAqua AS - en viktig milepæl for selskapet.",
  date: "2025-11-28",
  dateISO: "2025-11-28T12:00:00+01:00",
  company: "ZeonAqua AS",
  image: "/hero/zeonaqua.jpg",
  linkedin: "https://www.linkedin.com/company/zeon-aqua/",
  facebook: "https://www.facebook.com/zeonaqua.as",
};

export const metadata: Metadata = {
  title: `${articleData.title} - Bluecrew Aktuelt`,
  description: articleData.description,
  keywords: [
    "bluecrew oppdrag",
    "zeonaqua bemanning",
    "maritim bemanning",
    "første oppdrag",
    "havbruk bemanning",
  ],
  openGraph: {
    title: articleData.title,
    description: articleData.description,
    type: "article",
    publishedTime: articleData.dateISO,
    authors: ["Bluecrew AS"],
    images: [
      {
        url: articleData.image,
        width: 1200,
        height: 630,
        alt: `${articleData.title} - Bluecrew og ZeonAqua`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: articleData.title,
    description: articleData.description,
    images: [articleData.image],
  },
  alternates: {
    canonical: "/aktuelt/forste-leverte-oppdrag",
  },
};

// Article structured data for SEO
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: articleData.title,
  description: articleData.description,
  image: `https://bluecrew.no${articleData.image}`,
  datePublished: articleData.dateISO,
  dateModified: articleData.dateISO,
  author: {
    "@type": "Organization",
    name: "Bluecrew AS",
    url: "https://bluecrew.no",
  },
  publisher: {
    "@type": "Organization",
    name: "Bluecrew AS",
    logo: {
      "@type": "ImageObject",
      url: "https://bluecrew.no/logo.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://bluecrew.no/aktuelt/forste-leverte-oppdrag",
  },
};

export default function ForsteLeverteOppdragPage() {
  return (
    <SiteLayout active="om-oss">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          {/* Back link */}
          <Link
            href="/aktuelt"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#64748b",
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              marginBottom: 24,
            }}
          >
            <ArrowLeft size={16} />
            Tilbake til aktuelt
          </Link>

          {/* Article header */}
          <header style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 16, fontSize: 14, color: "#64748b" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Calendar size={16} />
                {new Date(articleData.date).toLocaleDateString("nb-NO", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Building2 size={16} />
                {articleData.company}
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}>
              {articleData.title}
            </h1>
          </header>

          {/* Featured image */}
          <div style={{
            position: "relative",
            width: "100%",
            height: "clamp(200px, 40vw, 400px)",
            borderRadius: 16,
            overflow: "hidden",
            marginBottom: 32,
            background: "linear-gradient(135deg, #0a1628 0%, #1e3a5f 100%)",
          }}>
            <Image
              src={articleData.image}
              alt={`${articleData.company} - Første oppdrag levert av Bluecrew`}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          {/* Article content */}
          <div style={{
            background: "#fff",
            borderRadius: 16,
            padding: "clamp(24px, 5vw, 40px)",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}>
            <div style={{
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              lineHeight: 1.8,
              color: "#334155",
            }}>
              <p style={{ marginBottom: 24 }}>
                <strong>Vi er stolte av å kunngjøre at Bluecrew AS har levert sitt aller første bemanningsoppdrag!</strong>
              </p>

              <p style={{ marginBottom: 24 }}>
                Oppdraget ble levert til <strong>ZeonAqua AS</strong>, et selskap som opererer innen havbruksnæringen.
                Dette markerer en viktig milepæl for Bluecrew og viser at vi er i gang med å levere på vårt løfte
                om kvalifisert maritim bemanning.
              </p>

              <p style={{ marginBottom: 24 }}>
                Hos Bluecrew jobber vi tett med både mannskap og rederier for å sikre riktig kompetanse til rett tid.
                Vi er takknemlige for tilliten ZeonAqua har vist oss, og ser frem til et fortsatt godt samarbeid.
              </p>

              <p style={{ marginBottom: 32 }}>
                Dette er bare begynnelsen. Vi fortsetter å bygge et nettverk av kvalifiserte sjøfolk og
                arbeidsgivere langs hele norskekysten.
              </p>

              {/* ZeonAqua social links */}
              <div style={{
                background: "#f8fafc",
                borderRadius: 12,
                padding: 24,
                border: "1px solid #e2e8f0",
              }}>
                <h3 style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: 16,
                }}>
                  Om ZeonAqua AS
                </h3>
                <p style={{ fontSize: 15, color: "#475569", marginBottom: 20 }}>
                  Følg ZeonAqua på sosiale medier for å lære mer om deres virksomhet:
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  <a
                    href={articleData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "12px 20px",
                      background: "#0A66C2",
                      color: "#fff",
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 150ms ease",
                    }}
                  >
                    <Linkedin size={18} />
                    LinkedIn
                    <ExternalLink size={14} />
                  </a>
                  <a
                    href={articleData.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "12px 20px",
                      background: "#1877F2",
                      color: "#fff",
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 150ms ease",
                    }}
                  >
                    <Facebook size={18} />
                    Facebook
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{
            marginTop: 40,
            padding: 32,
            background: "linear-gradient(135deg, #0a1628 0%, #1e3a5f 100%)",
            borderRadius: 16,
            textAlign: "center",
            color: "#fff",
          }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
              Trenger du maritimt mannskap?
            </h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", marginBottom: 24 }}>
              Vi leverer kvalifisert personell til havbruk, fiskeri og servicefartøy.
            </p>
            <Link
              href="/kunde/registrer-behov"
              style={{
                display: "inline-block",
                padding: "14px 28px",
                background: "#fff",
                color: "#0369a1",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              Registrer bemanningsbehov
            </Link>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
