import type { Metadata } from "next";
import Link from "next/link";
import ClientForm from "@/app/bemanningsbehov/ClientForm";
import { formStyles } from "@/components/forms/Controls";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Meld inn bemanningsbehov",
  description:
    "Beskriv bemanningsbehovet ditt og få raske forslag til kvalifiserte kandidater fra Bluecrew AS.",
};

const styles = {
  page: {
    background: "#F8FAFC",
    minHeight: "100vh",
  },
  hero: {
    padding: "100px 0 40px",
    background: "#0B1F3A",
    color: "#E2E8F0",
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
    border: "1px solid rgba(15,23,42,0.18)",
    boxShadow: "0 18px 38px rgba(15,23,42,0.1)",
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

export default function ClientPage() {
  return (
    <div style={styles.page}>
      <SiteHeader showCtas={false} />
      <section style={styles.hero}>
        <div style={styles.heroWrap}>
          <h1 style={styles.heroTitle}>Meld inn bemanningsbehov</h1>
          <p style={styles.heroText}>
            Gi oss en kort beskrivelse av fartøyet, oppgavene og tidsrommet. Vi matcher deg med tilgjengelige kandidater med
            riktig sertifisering og erfaring.
          </p>
        </div>
      </section>
      <div style={styles.introCard}>
        <p>
          Legg gjerne ved detaljer om vakter, rotasjoner og spesielle krav til sertifikater. Vi kontakter deg innen kort tid for
          å avklare eventuelle spørsmål.
        </p>
        <p>
          Du kan også ringe <a href="tel:92328850" style={styles.backLink}>923 28 850</a> for en umiddelbar prat, eller sende en
          e-post til <a href="mailto:isak@bluecrew.no" style={styles.backLink}>isak@bluecrew.no</a>.
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
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0F172A" }}>Forespørsel</h2>
            <p style={{ color: "#475569", fontSize: 15 }}>
              Beskriv behovet kort, så tar vi raskt kontakt med forslag på kvalifiserte kandidater.
            </p>
          </div>
          <ClientForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
