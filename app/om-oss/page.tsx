import type { CSSProperties } from "react";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

const values = [
  {
    title: "Sjøfolk i ledelsen",
    text: "Vi kommer fra norsk kystfart og havbruk, og kjenner hverdagen om bord.",
  },
  {
    title: "Trygghet først",
    text: "Sertifikater, HMS og kvalitetssikring står sentralt i alle leveranser.",
  },
  {
    title: "Langsiktige relasjoner",
    text: "Vi følger opp kunder og kandidater gjennom hele oppdraget.",
  },
];

const milestones = [
  { year: "2021", title: "Bluecrew AS etableres", text: "Selskapet ble stiftet i Harstad og startet med bemanning til servicefartøy." },
  { year: "2022", title: "Utvider mot havbruk", text: "Nye kunder i oppdrettsnæringen og dedikerte team for sjø og land." },
  { year: "2023", title: "Digital kandidatplattform", text: "Lansering av system for å følge sertifikater, turnus og tilgjengelighet." },
  { year: "2024", title: "Nationwide leveranse", text: "Bluecrew AS leverer mannskap til fartøy og anlegg langs hele kysten." },
];

export default function OmOssPage() {
  return (
    <div style={styles.page}>
      <SiteHeader />
      <main>
        <section style={styles.hero}>
          <div style={styles.heroInner}>
            <p style={styles.heroPill}>Om Bluecrew AS</p>
            <h1 style={styles.heroTitle}>Bemanning til sjøs – bygget av sjøfolk</h1>
            <p style={styles.heroText}>
              Bluecrew AS er et bemanningsbyrå fra Harstad som leverer erfarne mannskaper til havbruk, fiskeri og servicefartøy.
              Vi kombinerer maritim erfaring med moderne rekrutteringsprosesser.
            </p>
          </div>
        </section>

        <section style={styles.sectionLight}>
          <div style={styles.containerNarrow}>
            <h2 style={styles.sectionTitle}>Vår historie</h2>
            <p style={styles.sectionLead}>
              Selskapet ble startet av sjøfolk som ville gjøre bemanning enklere for både rederier og mannskap. Vi har hovedkontor
              i Harstad og leverer oppdrag langs hele kysten.
            </p>
          </div>
        </section>

        <section style={styles.sectionLight}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Verdier vi styrer etter</h2>
            <div style={styles.valueGrid}>
              {values.map((value) => (
                <article key={value.title} style={styles.valueCard}>
                  <h3 style={styles.valueTitle}>{value.title}</h3>
                  <p style={styles.valueText}>{value.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.sectionAlt}>
          <div style={styles.container}>
            <h2 style={{ ...styles.sectionTitle, color: "#fff" }}>Milepæler</h2>
            <ul style={styles.timeline}>
              {milestones.map((milestone) => (
                <li key={milestone.year} style={styles.timelineItem}>
                  <div style={styles.timelineYear}>{milestone.year}</div>
                  <div>
                    <h3 style={styles.timelineTitle}>{milestone.title}</h3>
                    <p style={styles.timelineText}>{milestone.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section style={styles.sectionLight}>
          <div style={styles.containerNarrow}>
            <h2 style={styles.sectionTitle}>Sertifiseringer og medlemskap</h2>
            <ul style={styles.listPlain}>
              <li>STCW-sertifiserte kandidater og oppdatert helseattest</li>
              <li>HMS-rutiner i tråd med norske krav til maritim virksomhet</li>
              <li>GDPR-tilpasset behandling av personopplysninger</li>
            </ul>
          </div>
        </section>

        <section style={styles.sectionLight}>
          <div style={styles.containerContact}>
            <div style={styles.contactCard}>
              <h2 style={styles.sectionTitle}>Kontakt oss</h2>
              <p style={styles.sectionLead}>
                Østenbekkveien 43, 9403 Harstad
                <br />
                Org.nr. 933 939 007
              </p>
              <div style={styles.contactGrid}>
                <div>
                  <span style={styles.contactLabel}>Telefon</span>
                  <a href="tel:+4741380800" style={styles.contactLink}>
                    +47 41 38 08 00
                  </a>
                </div>
                <div>
                  <span style={styles.contactLabel}>E-post</span>
                  <a href="mailto:post@bluecrew.no" style={styles.contactLink}>
                    post@bluecrew.no
                  </a>
                </div>
              </div>
              <div style={styles.contactActions}>
                <Link href="/bemanningsbehov" style={styles.primaryCta}>
                  Meld inn behov
                </Link>
                <Link href="/kandidat" style={styles.secondaryCta}>
                  Registrer kandidat
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
    background: "linear-gradient(180deg, #0B1F3A 0%, #142A52 100%)",
    color: "#fff",
  },
  heroInner: {
    maxWidth: 880,
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
  sectionLight: {
    padding: "80px 0",
  },
  sectionAlt: {
    padding: "80px 0",
    background: "#0F1E3A",
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 24px",
    display: "grid",
    gap: 32,
  },
  containerNarrow: {
    maxWidth: 760,
    margin: "0 auto",
    padding: "0 24px",
    textAlign: "center",
    display: "grid",
    gap: 20,
  },
  containerContact: {
    maxWidth: 760,
    margin: "0 auto",
    padding: "0 24px",
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
  valueGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 24,
  },
  valueCard: {
    background: "#fff",
    borderRadius: 18,
    padding: 24,
    border: "1px solid #E2E8F0",
    boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
    display: "grid",
    gap: 8,
    textAlign: "left",
  },
  valueTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    color: "#0B1F3A",
  },
  valueText: {
    margin: 0,
    lineHeight: 1.6,
    color: "#475569",
  },
  timeline: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
    gap: 24,
  },
  timelineItem: {
    display: "grid",
    gridTemplateColumns: "100px 1fr",
    gap: 18,
    padding: 20,
    borderRadius: 18,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.18)",
  },
  timelineYear: {
    fontSize: 24,
    fontWeight: 800,
    color: "#60A5FA",
  },
  timelineTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    color: "#fff",
  },
  timelineText: {
    margin: 0,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.82)",
  },
  listPlain: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "grid",
    gap: 10,
    color: "#1F2937",
  },
  contactCard: {
    background: "#fff",
    borderRadius: 24,
    padding: 40,
    border: "1px solid #E2E8F0",
    boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
    display: "grid",
    gap: 20,
    textAlign: "center",
  },
  contactGrid: {
    display: "flex",
    justifyContent: "center",
    gap: 32,
    flexWrap: "wrap",
  },
  contactLabel: {
    display: "block",
    fontWeight: 700,
    color: "#0B1F3A",
  },
  contactLink: {
    color: "#1D4ED8",
    textDecoration: "none",
    fontWeight: 600,
  },
  contactActions: {
    display: "flex",
    justifyContent: "center",
    gap: 16,
    flexWrap: "wrap",
  },
  primaryCta: {
    padding: "12px 22px",
    borderRadius: 14,
    background: "#1D4ED8",
    color: "#fff",
    fontWeight: 700,
    textDecoration: "none",
  },
  secondaryCta: {
    padding: "12px 22px",
    borderRadius: 14,
    background: "#E0E7FF",
    color: "#1D4ED8",
    fontWeight: 700,
    textDecoration: "none",
  },
};
