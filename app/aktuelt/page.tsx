import { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "../components/SiteLayout";
import { ArrowRight, Calendar, Building2 } from "lucide-react";
import * as styles from "./page.css";

export const metadata: Metadata = {
  title: "Aktuelt - Nyheter fra Bluecrew",
  description:
    "Bilder og historier fra hverdagen ute på sjøen. Følg med på livet om bord.",
  keywords: [
    "bluecrew nyheter",
    "maritim bemanning",
    "sjøfolk hverdag",
    "livet til sjøs",
  ],
  openGraph: {
    title: "Aktuelt - Nyheter fra Bluecrew AS",
    description: "Bilder og historier fra hverdagen ute på sjøen.",
    type: "website",
  },
  alternates: {
    canonical: "/aktuelt",
  },
};

// News articles data
const articles = [
  {
    slug: "forste-leverte-oppdrag",
    title: "Hverdagen om bord i MS Akva Fighter",
    excerpt: "En av våre kandidater rapporterer inn med flotte vinterbilder fra hverdagen om bord hos ZeonAqua.",
    date: "2025-11-28",
    company: "ZeonAqua AS",
  },
];

export default function AktueltPage() {
  return (
    <SiteLayout active="om-oss">
      <section className={styles.section}>
        <div className={styles.container}>
          <h1 className={styles.title}>Aktuelt</h1>
          <p className={styles.subtitle}>
            Bilder og historier fra hverdagen ute på sjøen
          </p>

          <div className={styles.grid}>
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/aktuelt/${article.slug}`}
                className={styles.card}
              >
                <div className={styles.cardContent}>
                  <div className={styles.metaRow}>
                    <span className={styles.metaItem}>
                      <Calendar size={16} />
                      {new Date(article.date).toLocaleDateString("nb-NO", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span className={styles.metaItem}>
                      <Building2 size={16} />
                      {article.company}
                    </span>
                  </div>

                  <h2 className={styles.cardTitle}>
                    {article.title}
                  </h2>

                  <p className={styles.cardExcerpt}>
                    {article.excerpt}
                  </p>

                  <span className={styles.readMore}>
                    Les mer
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
