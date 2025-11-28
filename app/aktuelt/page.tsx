import { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "../components/SiteLayout";
import { sx } from "../lib/styles";
import { ArrowRight, Calendar, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Aktuelt - Nyheter fra Bluecrew",
  description:
    "Les siste nytt fra Bluecrew AS. Oppdateringer om leverte oppdrag, samarbeid og nyheter fra maritim bemanning.",
  keywords: [
    "bluecrew nyheter",
    "maritim bemanning aktuelt",
    "maritime oppdrag",
    "bemanningsoppdrag Norge",
  ],
  openGraph: {
    title: "Aktuelt - Nyheter fra Bluecrew AS",
    description: "Siste nytt om leverte oppdrag og samarbeid innen maritim bemanning.",
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
    title: "Første leverte oppdrag til ZeonAqua",
    excerpt: "Vi er stolte av å ha levert vårt aller første bemanningsoppdrag til ZeonAqua AS. Dette markerer en viktig milepæl for Bluecrew.",
    date: "2025-11-28",
    company: "ZeonAqua AS",
    image: "/aktuelt/zeonaqua-oppdrag.jpg",
  },
];

export default function AktueltPage() {
  return (
    <SiteLayout active="om-oss">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={{ ...sx.h2, marginBottom: 12 }}>Aktuelt</h1>
          <p style={{ ...sx.leadSmall, marginBottom: 40, maxWidth: 600 }}>
            Nyheter og oppdateringer fra Bluecrew AS
          </p>

          <div style={{ display: "grid", gap: 24 }}>
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/aktuelt/${article.slug}`}
                style={{
                  display: "block",
                  background: "#fff",
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid #e2e8f0",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all 200ms ease",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ padding: "clamp(20px, 4vw, 32px)" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 16, fontSize: 14, color: "#64748b" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Calendar size={16} />
                      {new Date(article.date).toLocaleDateString("nb-NO", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Building2 size={16} />
                      {article.company}
                    </span>
                  </div>

                  <h2 style={{
                    fontSize: "clamp(1.25rem, 3vw, 1.5rem)",
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: 12,
                    lineHeight: 1.3,
                  }}>
                    {article.title}
                  </h2>

                  <p style={{
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "#475569",
                    marginBottom: 20,
                  }}>
                    {article.excerpt}
                  </p>

                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#0369a1",
                    fontWeight: 600,
                    fontSize: 15,
                  }}>
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
