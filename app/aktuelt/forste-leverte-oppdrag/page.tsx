import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteLayout from "../../components/SiteLayout";
import { ArrowLeft, Calendar, Building2, Linkedin, Facebook, ExternalLink } from "lucide-react";
import * as styles from "./page.css";

const articleData = {
  title: "Hverdagen om bord i MS Akva Fighter",
  description: "Vinterbilder og innblikk fra hverdagen om bord i MS Akva Fighter hos ZeonAqua.",
  date: "2025-11-28",
  dateISO: "2025-11-28T12:00:00+01:00",
  company: "ZeonAqua AS",
  vessel: "MS Akva Fighter",
  image: "/hero/ZeonAqua.jpg",
  photoCredit: "Glenn Larsen",
  linkedin: "https://www.linkedin.com/company/zeon-aqua/",
  facebook: "https://www.facebook.com/zeonaqua.as",
};

export const metadata: Metadata = {
  title: `${articleData.title} - Bluecrew Aktuelt`,
  description: articleData.description,
  keywords: [
    "ms akva fighter",
    "zeonaqua",
    "maritim bemanning",
    "havbruk",
    "servicefartøy",
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

      <article className={styles.section}>
        <div className={styles.container}>
          {/* Back link */}
          <Link href="/aktuelt" className={styles.backLink}>
            <ArrowLeft size={16} />
            Tilbake til aktuelt
          </Link>

          {/* Article header */}
          <header className={styles.header}>
            <div className={styles.metaRow}>
              <span className={styles.metaItem}>
                <Calendar size={16} />
                {new Date(articleData.date).toLocaleDateString("nb-NO", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className={styles.metaItem}>
                <Building2 size={16} />
                {articleData.company}
              </span>
            </div>

            <h1 className={styles.title}>
              {articleData.title}
            </h1>
          </header>

          {/* Featured image */}
          <div className={styles.imageWrapper}>
            <Image
              src={articleData.image}
              alt={`${articleData.vessel} - servicefartøy tilhørende ${articleData.company}`}
              fill
              style={{ objectFit: "cover", objectPosition: "center 25%" }}
              priority
            />
            <span className={styles.photoCredit}>
              {articleData.vessel} | Foto: {articleData.photoCredit}
            </span>
          </div>

          {/* Article content */}
          <div className={styles.contentCard}>
            <div className={styles.articleContent}>
              <p className={styles.paragraph}>
                En av våre kandidater har sendt inn disse flotte vinterbildene fra
                <strong> {articleData.vessel}</strong>.
              </p>

              <p className={styles.paragraph}>
                Fartøyet opererer for <strong>ZeonAqua AS</strong> i havbruksnæringen langs norskekysten.
                Hverdagen om bord handler om å støtte operasjoner på oppdrettsanlegg. Transport av utstyr
                og personell, vedlikehold og service på merdene.
              </p>

              <p className={styles.paragraph}>
                Arbeidsforholdene varierer med årstidene. Om vinteren kan det være mørkt og kaldt,
                men bildene viser at det også kan være spektakulært vakkert. Solnedganger over fjorden,
                rolige dager mellom oppdragene.
              </p>

              <p className={styles.lastParagraph}>
                Vi i Bluecrew setter pris på å høre fra folkene som er ute og jobber.
                Det gir oss innblikk i hverdagen og hjelper oss å forstå hva som fungerer,
                og hva som kan bli bedre.
              </p>

              {/* ZeonAqua social links */}
              <div className={styles.companyBox}>
                <h3 className={styles.companyTitle}>
                  Om ZeonAqua AS
                </h3>
                <p className={styles.companyDescription}>
                  Følg ZeonAqua på sosiale medier for å lære mer om deres virksomhet:
                </p>
                <div className={styles.socialLinks}>
                  <a
                    href={articleData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkedinButton}
                  >
                    <Linkedin size={18} />
                    LinkedIn
                    <ExternalLink size={14} />
                  </a>
                  <a
                    href={articleData.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.facebookButton}
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
          <div className={styles.ctaSection}>
            <h3 className={styles.ctaTitle}>
              Trenger du maritimt mannskap?
            </h3>
            <p className={styles.ctaDescription}>
              Vi leverer kvalifisert personell til havbruk, fiskeri og servicefartøy.
            </p>
            <Link href="/kunde/registrer-behov" className={styles.ctaButton}>
              Registrer bemanningsbehov
            </Link>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
