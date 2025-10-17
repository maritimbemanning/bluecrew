import React from "react";
import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

const FAQS = [
  {
    q: "Hvordan registrerer jeg meg som kandidat?",
    a: "Bruk kandidatportalen og last opp CV. Vi tar kontakt når vi har et oppdrag som passer profilen din.",
  },
  {
    q: "Hvor raskt kan dere levere personell?",
    a: "Mye av mannskapet vårt er klart på kort varsel. Vi leverer ofte innen få dager, avhengig av kravene til sertifikater.",
  },
  {
    q: "Hvilke typer kontrakter tilbyr dere?",
    a: "Vi håndterer midlertidige oppdrag, sesongbemanning og lengre engasjement – skreddersydd etter behov.",
  },
  {
    q: "Hvordan ivaretas personvern?",
    a: "Alle søknader lagres sikkert og deles ikke med tredjepart uten samtykke. Vi følger GDPR i all behandling av data.",
  },
];

export default function OmOssPage() {
  return (
    <main style={styles.page}>
      <SiteHeader />

      <section style={styles.hero}>
        <div style={styles.wrap}>
          <h1 style={styles.heroTitle}>Om Bluecrew AS</h1>
          <p style={styles.heroLead}>
            Bluecrew AS er et norsk bemannings- og rekrutteringsselskap som leverer sertifisert mannskap til havbruk, fiskeri og
            servicefartøy.
          </p>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.wrapNarrow}>
          <article style={styles.card}>
            <h2 style={styles.sectionTitle}>Vår historie</h2>
            <p style={styles.text}>
              Selskapet ble etablert av sjøfolk med bakgrunn fra oppdrettsanlegg, fiskeri og norsk kystfart. Erfaringen fra
              feltet gjør at vi forstår hvilke krav som stilles til kompetanse, sertifikater og personlige egenskaper om bord.
            </p>
            <p style={styles.text}>
              Vi samarbeider tett med både rederi og mannskap for å sikre trygge leveranser. Våre prosesser er effektive og
              etterprøvbare – fra behovsavklaring til oppfølging om bord.
            </p>
            <p style={styles.text}>
              Bluecrew AS har base i Østenbekkveien 43 og leverer mannskap i hele landet. Vi kombinerer lokal tilstedeværelse med
              et landsdekkende nettverk av kvalifiserte sjøfolk.
            </p>
          </article>

          <article style={styles.card}>
            <h2 style={styles.sectionTitle}>Hvordan vi jobber</h2>
            <ol style={styles.listOrdered}>
              <li>Behovskartlegging med fokus på fartøytype, sertifikatkrav og tidsplan.</li>
              <li>Screening, intervjuer og verifikasjon av sertifikater og referanser.</li>
              <li>Presentasjon av kandidater med tydelig oversikt over erfaring og tilgjengelighet.</li>
              <li>Oppfølging før, under og etter oppdrag for både kunde og mannskap.</li>
            </ol>
            <Link href="/kunde" style={styles.linkButton}>
              Be om bemanning
            </Link>
          </article>
        </div>
      </section>

      <section style={styles.sectionAlt}>
        <div style={styles.wrapNarrow}>
          <h2 style={styles.sectionTitle}>Ofte stilte spørsmål</h2>
          <div style={styles.faqList}>
            {FAQS.map((faq) => (
              <details key={faq.q} style={styles.faqItem}>
                <summary style={styles.faqSummary}>{faq.q}</summary>
                <p style={styles.text}>{faq.a}</p>
              </details>
            ))}
          </div>
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
    display: "grid",
    gap: 32,
  },
  hero: {
    background: "linear-gradient(180deg, #0B1F3A 0%, #143769 100%)",
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
    margin: 0,
    fontSize: 26,
    fontWeight: 800,
    color: "#0B1F3A",
  },
  text: {
    margin: 0,
    fontSize: 16,
    color: "#334155",
    lineHeight: 1.7,
  },
  card: {
    background: "#fff",
    borderRadius: 18,
    border: "1px solid #E2E8F0",
    padding: 28,
    display: "grid",
    gap: 18,
    boxShadow: "0 16px 36px rgba(15,23,42,0.08)",
  },
  listOrdered: {
    margin: 0,
    paddingLeft: 24,
    fontSize: 15,
    color: "#334155",
    lineHeight: 1.7,
    display: "grid",
    gap: 8,
  },
  faqList: {
    display: "grid",
    gap: 12,
  },
  faqItem: {
    borderRadius: 14,
    border: "1px solid #E2E8F0",
    background: "#fff",
    padding: 0,
    overflow: "hidden",
    boxShadow: "0 10px 24px rgba(15,23,42,0.06)",
  },
  faqSummary: {
    listStyle: "none",
    padding: "16px 20px",
    fontWeight: 700,
    color: "#0B1F3A",
    cursor: "pointer",
  },
  linkButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 20px",
    borderRadius: 999,
    background: "linear-gradient(135deg, #38BDF8, #0EA5E9)",
    color: "#0B1F3A",
    fontWeight: 700,
    textDecoration: "none",
    fontSize: 15,
    width: "fit-content",
    boxShadow: "0 12px 28px rgba(14,165,233,0.25)",
  },
};
