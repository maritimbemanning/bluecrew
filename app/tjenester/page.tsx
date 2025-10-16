import type { CSSProperties } from "react";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

const serviceDetails = [
  {
    title: "Servicefartøy",
    summary: "Bemanning til vedlikehold, inspeksjon og beredskap.",
    bullets: [
      "Skippere, styrmenn og maskinister",
      "Dekksoperasjoner og ROV-støtte",
      "Kokekyndige og logistikktjenester",
    ],
  },
  {
    title: "Havbruk",
    summary: "Personell til sjø- og landbaserte produksjoner.",
    bullets: [
      "Akvateknikere, drifts- og serviceteam",
      "Fôringsoperatører og laserspesialister",
      "Vikarer til sesongtopper og sykdomsfravær",
    ],
  },
  {
    title: "Fiskeri",
    summary: "Komplette mannskap til kyst- og havgående fartøy.",
    bullets: [
      "Fartøyledere, styrmenn og matroser",
      "Hurtig mobilisering til korte turer",
      "Langsiktige rotasjoner med dokumentert kompetanse",
    ],
  },
];

const deliverables = [
  {
    title: "Bemanningsplan og kontrakter",
    text: "Vi setter opp tydelige kontrakter, turnuser og rapportering slik at både rederi og mannskap har forutsigbarhet.",
  },
  {
    title: "Sertifikatkontroll",
    text: "STCW, helse, fagbrev og andre kurs verifiseres og lagres sikkert før utsendelse.",
  },
  {
    title: "Reise og logistikk",
    text: "Vi håndterer reise, forpleining og nødvendige registreringer ved oppstart og avslutning av oppdrag.",
  },
  {
    title: "Oppfølging om bord",
    text: "Oppdragene følges opp med faste sjekkpunkter for å sikre at både kunde og mannskap er fornøyde.",
  },
];

const process = [
  {
    step: "1",
    title: "Kartlegging",
    text: "Vi definerer krav, sertifikater og ønskede personlige egenskaper sammen med deg.",
  },
  {
    step: "2",
    title: "Utvelgelse",
    text: "Kandidater intervjuers, referansesjekkes og kvalitetssikres før presentasjon.",
  },
  {
    step: "3",
    title: "Oppstart",
    text: "Kontrakter signeres digitalt og logistikk for avreise håndteres av oss.",
  },
  {
    step: "4",
    title: "Oppfølging",
    text: "Vi har løpende dialog underveis og evaluerer oppdraget sammen med deg i etterkant.",
  },
];

export default function TjenesterPage() {
  return (
    <div style={styles.page}>
      <SiteHeader />
      <main>
        <section style={styles.hero}>
          <div style={styles.heroInner}>
            <p style={styles.heroPill}>Tjenester</p>
            <h1 style={styles.heroTitle}>Fleksible bemanningsløsninger for maritim næring</h1>
            <p style={styles.heroText}>
              Bluecrew AS leverer komplette mannskap til servicefartøy, havbruk og fiskeri. Vi kombinerer sjøfolkets erfaring med
              strukturert oppfølging og dokumentert kvalitet.
            </p>
            <div style={styles.heroCtas}>
              <Link href="/bemanningsbehov" style={styles.primaryCta}>
                Bestill bemanning
              </Link>
              <Link href="/kandidat" style={styles.secondaryCta}>
                Registrer kandidat
              </Link>
            </div>
          </div>
        </section>

        <section style={styles.sectionLight}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Hva vi leverer</h2>
            <div style={styles.cardGrid}>
              {serviceDetails.map((service) => (
                <article key={service.title} style={styles.serviceCard}>
                  <h3 style={styles.cardTitle}>{service.title}</h3>
                  <p style={styles.cardSummary}>{service.summary}</p>
                  <ul style={styles.cardList}>
                    {service.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.sectionAccent}>
          <div style={styles.container}>
            <h2 style={{ ...styles.sectionTitle, color: "#fff" }}>Leveranser i hvert oppdrag</h2>
            <div style={styles.deliverGrid}>
              {deliverables.map((item) => (
                <article key={item.title} style={styles.deliverCard}>
                  <h3 style={styles.deliverTitle}>{item.title}</h3>
                  <p style={styles.deliverText}>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.sectionLight}>
          <div style={styles.containerNarrow}>
            <h2 style={styles.sectionTitle}>Slik samarbeider vi</h2>
            <p style={styles.sectionLead}>
              Fra første samtale til evaluering etter endt oppdrag – prosessen vår er tilpasset maritim drift og krav til HMS.
            </p>
            <ol style={styles.processGrid}>
              {process.map((step) => (
                <li key={step.step} style={styles.processCard}>
                  <div style={styles.processStep}>{step.step}</div>
                  <div>
                    <h3 style={styles.processTitle}>{step.title}</h3>
                    <p style={styles.processText}>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section style={styles.sectionLight}>
          <div style={styles.containerNarrow}>
            <div style={styles.contactBox}>
              <h2 style={styles.sectionTitle}>Trenger du mannskap nå?</h2>
              <p style={styles.sectionLead}>
                Ta kontakt for et raskt estimat eller bestill direkte.
              </p>
              <div style={styles.heroCtas}>
                <Link href="tel:+4741380800" style={styles.secondaryCta}>
                  +47 41 38 08 00
                </Link>
                <Link href="mailto:post@bluecrew.no" style={styles.secondaryCta}>
                  post@bluecrew.no
                </Link>
                <Link href="/bemanningsbehov" style={styles.primaryCta}>
                  Meld inn behov
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    background: "#F8FAFC",
    color: "#0F172A",
    minHeight: "100vh",
  },
  hero: {
    padding: "100px 0 80px",
    background: "linear-gradient(180deg, #0B1F3A 0%, #123061 100%)",
    color: "#fff",
  },
  heroInner: {
    maxWidth: 960,
    margin: "0 auto",
    padding: "0 24px",
    textAlign: "center",
    display: "grid",
    gap: 16,
  },
  heroPill: {
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.18)",
    fontSize: 12,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  heroTitle: {
    margin: 0,
    fontSize: 40,
    fontWeight: 800,
    letterSpacing: "-0.01em",
  },
  heroText: {
    margin: 0,
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.86)",
  },
  heroCtas: {
    marginTop: 24,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 16,
  },
  primaryCta: {
    padding: "14px 26px",
    borderRadius: 14,
    background: "#60A5FA",
    color: "#0B1F3A",
    fontWeight: 800,
    textDecoration: "none",
    boxShadow: "0 18px 40px rgba(96,165,250,0.35)",
  },
  secondaryCta: {
    padding: "14px 24px",
    borderRadius: 14,
    background: "rgba(255,255,255,0.12)",
    color: "#fff",
    fontWeight: 700,
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.24)",
  },
  sectionLight: {
    padding: "80px 0",
  },
  sectionAccent: {
    padding: "80px 0",
    background: "#0F1E3A",
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 24px",
    display: "grid",
    gap: 36,
  },
  containerNarrow: {
    maxWidth: 820,
    margin: "0 auto",
    padding: "0 24px",
    display: "grid",
    gap: 36,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 800,
    margin: 0,
    letterSpacing: "-0.01em",
    color: "#0B1F3A",
  },
  sectionLead: {
    margin: 0,
    lineHeight: 1.7,
    color: "#475569",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 28,
  },
  serviceCard: {
    background: "#fff",
    borderRadius: 18,
    padding: 28,
    border: "1px solid #E2E8F0",
    boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
    display: "grid",
    gap: 12,
  },
  cardTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 800,
    color: "#0B1F3A",
  },
  cardSummary: {
    margin: 0,
    color: "#475569",
    lineHeight: 1.6,
  },
  cardList: {
    margin: 0,
    paddingLeft: 18,
    display: "grid",
    gap: 6,
  },
  deliverGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 24,
  },
  deliverCard: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 18,
    padding: 26,
    display: "grid",
    gap: 10,
  },
  deliverTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    color: "#fff",
  },
  deliverText: {
    margin: 0,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 1.6,
  },
  processGrid: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    display: "grid",
    gap: 20,
  },
  processCard: {
    display: "flex",
    gap: 16,
    alignItems: "flex-start",
    textAlign: "left",
  },
  processStep: {
    fontSize: 18,
    fontWeight: 800,
    color: "#2563EB",
    minWidth: 36,
  },
  processTitle: {
    margin: "0 0 6px",
    fontSize: 18,
    fontWeight: 700,
    color: "#0B1F3A",
  },
  processText: {
    margin: 0,
    color: "#475569",
    lineHeight: 1.6,
  },
  contactBox: {
    background: "#fff",
    borderRadius: 24,
    padding: 40,
    border: "1px solid #E2E8F0",
    boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
    display: "grid",
    gap: 20,
  },
};
