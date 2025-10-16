import type { Metadata } from "next";
import Link from "next/link";
import CandidateForm from "@/app/kandidat/CandidateForm";
import { formStyles } from "@/components/forms/Controls";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Registrer kandidat",
  description:
    "Registrer deg som kandidat hos Bluecrew AS og få tilgang til oppdrag innen havbruk, fiskeri og servicefartøy.",
};

const styles = {
  page: {
    background: "#F1F5F9",
    minHeight: "100vh",
  },
  hero: {
    padding: "100px 0 40px",
    background: "linear-gradient(135deg, #0B1F3A 0%, #1E3A8A 100%)",
    color: "#fff",
  },
  heroWrap: {
    width: "min(860px, 92vw)",
    margin: "0 auto",
    display: "grid",
    gap: 18,
  },
  heroTitle: {
    fontSize: 44,
    fontWeight: 800,
    lineHeight: 1.1,
  },
  heroText: {
    fontSize: 18,
    lineHeight: 1.7,
    color: "rgba(226,232,240,0.85)",
  },
  introCard: {
    margin: "-40px auto 0",
    width: "min(860px, 92vw)",
    background: "#fff",
    borderRadius: 20,
    padding: 24,
    border: "1px solid rgba(255,255,255,0.3)",
    boxShadow: "0 20px 45px rgba(15,23,42,0.12)",
    display: "grid",
    gap: 12,
    color: "#0F172A",
  },
  main: {
    padding: "80px 0 120px",
  },
  backLink: {
    color: "#1D4ED8",
    fontWeight: 600,
    textDecoration: "none",
  },
};

export default function CandidatePage() {
  return (
    <div style={styles.page}>
      <SiteHeader showCtas={false} />
      <section style={styles.hero}>
        <div style={styles.heroWrap}>
          <h1 style={styles.heroTitle}>Registrer kandidatprofil</h1>
          <p style={styles.heroText}>
            Fortell oss om erfaringen din, hvilke sertifikater du har og når du er tilgjengelig. Vi kontakter deg når relevante
            oppdrag dukker opp innen havbruk, fiskeri og servicefartøy.
          </p>
        </div>
      </section>
      <div style={styles.introCard}>
        <p>
          Vi anbefaler å ha CV og eventuelle sertifikater klare før du fyller ut skjemaet. Last opp filer i PDF-format.
          Informasjonen behandles konfidensielt og deles ikke med kunder uten samtykke.
        </p>
        <p>
          Trenger du hjelp? <a href="mailto:isak@bluecrew.no" style={styles.backLink}>Kontakt oss på e-post</a> eller ring
          <a href="tel:92328850" style={{ ...styles.backLink, marginLeft: 6 }}>923 28 850</a>.
        </p>
        <p>
          <Link href="/" style={styles.backLink}>
            ← Tilbake til forsiden
          </Link>
        </p>
      </div>
      <main style={styles.main}>
        <div style={formStyles.shell}>
          <div style={formStyles.intro}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0F172A" }}>Kandidatdetaljer</h2>
            <p style={{ color: "#475569", fontSize: 15 }}>
              Vi matcher deg med aktuelle oppdrag basert på kompetanse, sertifikater og tilgjengelighet.
            </p>
          </div>
          <CandidateForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
