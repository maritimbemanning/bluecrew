import React from "react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { CandidateForm } from "../components/forms";

export default function KandidatPage() {
  return (
    <main style={styles.page}>
      <SiteHeader />
      <section style={styles.hero}>
        <div style={styles.wrap}>
          <h1 style={styles.heroTitle}>Registrer deg som kandidat</h1>
          <p style={styles.heroLead}>
            Del erfaringen din fra havbruk, fiskeri eller servicefartøy. Vi kontakter deg når vi har et oppdrag som matcher
            kompetansen og tilgjengeligheten din.
          </p>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.wrapNarrow}>
          <h2 style={styles.sectionTitle}>Kandidatprofil</h2>
          <p style={styles.sectionLead}>
            Fyll ut skjemaet og last opp CV (PDF). Opplysningene dine behandles konfidensielt og i henhold til GDPR.
          </p>
          <CandidateForm />
        </div>
      </section>

      <section style={styles.sectionAlt}>
        <div style={styles.wrapNarrow}>
          <h2 style={styles.sectionTitle}>Hva skjer etter innsending?</h2>
          <ul style={styles.list}>
            <li>Vi går gjennom kompetansen og kontakter deg for en kort samtale.</li>
            <li>Sertifikater og referanser verifiseres før vi presenterer deg til kunde.</li>
            <li>Du får beskjed når vi har et aktuelt oppdrag og oppfølging underveis.</li>
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
    maxWidth: 880,
    margin: "0 auto",
    padding: "0 20px",
    display: "grid",
    gap: 24,
  },
  hero: {
    background: "linear-gradient(180deg, #0B1F3A 0%, #102E58 100%)",
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
    maxWidth: 680,
    marginTop: 16,
    color: "rgba(226,232,240,0.88)",
  },
  section: {
    padding: "72px 0",
  },
  sectionAlt: {
    padding: "72px 0",
    background: "#EEF2F7",
  },
  sectionTitle: {
    margin: 0,
    fontSize: 26,
    fontWeight: 800,
    color: "#0B1F3A",
  },
  sectionLead: {
    margin: 0,
    fontSize: 16,
    color: "#334155",
    lineHeight: 1.6,
  },
  list: {
    margin: "0",
    paddingLeft: 22,
    fontSize: 15,
    color: "#334155",
    lineHeight: 1.7,
    display: "grid",
    gap: 8,
  },
};
