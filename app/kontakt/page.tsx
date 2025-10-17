import React from "react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

export default function KontaktPage() {
  return (
    <main style={styles.page}>
      <SiteHeader />

      <section style={styles.hero}>
        <div style={styles.wrap}>
          <h1 style={styles.heroTitle}>Kontakt Bluecrew AS</h1>
          <p style={styles.heroLead}>
            Ta kontakt for forespørsler om bemanning, samarbeid eller andre spørsmål. Vi svarer raskt.
          </p>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.wrapNarrow}>
          <div style={styles.cardGrid}>
            <article style={styles.card}>
              <h2 style={styles.sectionTitle}>Kontaktinformasjon</h2>
              <p style={styles.line}><strong>E-post:</strong> <a href="mailto:isak@bluecrew.no" style={styles.link}>isak@bluecrew.no</a></p>
              <p style={styles.line}><strong>Telefon:</strong> <a href="tel:92328850" style={styles.link}>923 28 850</a></p>
              <p style={styles.line}><strong>Adresse:</strong> Østenbekkveien 43, 4515 Mandal</p>
              <p style={styles.line}><strong>Arbeidsområde:</strong> Hele Norge – med særlig erfaring fra kysten og Nord-Norge.</p>
            </article>

            <article style={styles.card}>
              <h2 style={styles.sectionTitle}>Juridisk informasjon</h2>
              <p style={styles.line}>Bluecrew AS</p>
              <p style={styles.line}>Org.nr: 936 321 194</p>
              <p style={styles.line}>Personopplysninger behandles i samsvar med GDPR.</p>
              <p style={styles.line}>Dokumenter lagres sikkert og deles ikke uten uttrykkelig samtykke.</p>
            </article>
          </div>
        </div>
      </section>

      <section style={styles.sectionAlt}>
        <div style={styles.wrapNarrow}>
          <h2 style={styles.sectionTitle}>Når du kontakter oss</h2>
          <ul style={styles.list}>
            <li>Vi avklarer behovet ditt og hvilke sertifikater som er nødvendige.</li>
            <li>Du får en tidsplan for videre prosess og forslag til kandidater.</li>
            <li>Oppfølging skjer både før, under og etter oppdraget.</li>
          </ul>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    background: "#F8FAFC",
    color: "#0F172A",
  },
  wrap: {
    maxWidth: 960,
    margin: "0 auto",
    padding: "0 20px",
  },
  wrapNarrow: {
    maxWidth: 920,
    margin: "0 auto",
    padding: "0 20px",
  },
  hero: {
    background: "linear-gradient(180deg, #0B1F3A 0%, #0F304E 100%)",
    color: "#E2E8F0",
    padding: "96px 0 64px",
  },
  heroTitle: {
    fontSize: 42,
    margin: 0,
    fontWeight: 800,
    letterSpacing: "-0.02em",
  },
  heroLead: {
    fontSize: 18,
    maxWidth: 720,
    marginTop: 16,
    color: "rgba(226,232,240,0.9)",
  },
  section: {
    padding: "72px 0",
  },
  sectionAlt: {
    padding: "72px 0",
    background: "#EEF2F7",
  },
  sectionTitle: {
    margin: "0 0 12px",
    fontSize: 24,
    fontWeight: 800,
    color: "#0B1F3A",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 24,
  },
  card: {
    background: "#fff",
    borderRadius: 18,
    border: "1px solid #E2E8F0",
    padding: 26,
    display: "grid",
    gap: 12,
    boxShadow: "0 16px 36px rgba(15,23,42,0.08)",
  },
  line: {
    margin: 0,
    fontSize: 15,
    color: "#334155",
  },
  link: {
    color: "#0B1F3A",
    textDecoration: "none",
  },
  list: {
    margin: 0,
    paddingLeft: 22,
    fontSize: 15,
    color: "#334155",
    lineHeight: 1.7,
    display: "grid",
    gap: 8,
  },
};
