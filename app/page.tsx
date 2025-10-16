import type { CSSProperties } from "react";
import Link from "next/link";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const services = [
  {
    title: "Servicefartøy",
    lead: "AHTS, ROV- og vedlikeholdsfartøy",
    points: ["Skipper og styrmann", "Matros og dekksoperatører", "Teknisk støtte og kokekyndige"],
  },
  {
    title: "Havbruk",
    lead: "Land- og sjøbaserte anlegg",
    points: [
      "Akvateknikere og driftsoperatører",
      "Fôrings- og laseroperatører",
      "Midlertidig bemanning til sesongtopper",
    ],
  },
  {
    title: "Fiskeri",
    lead: "Kyst- og havgående fartøy",
    points: ["Fartøyledere og styrmenn", "Matroser og lettmatroser", "Ressurser for korttids- og lengre rotasjoner"],
  },
];

const highlights = [
  {
    title: "Sertifisert kompetanse",
    text: "Alle kandidater dokumenterer STCW, helse og relevante fagbrev før de tilbys til oppdrag.",
  },
  {
    title: "Ryddige prosesser",
    text: "Vi kartlegger krav, matcher riktige kandidater og følger opp både kunde og mannskap underveis.",
  },
  {
    title: "Vaktplan på plass",
    text: "Digital bemanningsoversikt og beredskap gjør at vi raskt fyller hull når noe uventet skjer.",
  },
];

const process = [
  {
    step: "01",
    title: "Behovskartlegging",
    text: "Vi går gjennom fartøy, sertifikatkrav og ønsket oppstart for å sikre et tydelig oppdrag.",
  },
  {
    step: "02",
    title: "Screening & verifisering",
    text: "Intervjuer, referansesjekker og kontroll av dokumentasjon før kandidatene presenteres.",
  },
  {
    step: "03",
    title: "Oppstart & oppfølging",
    text: "Vi sørger for kontrakter, reise og briefing – og følger opp om bord for å sikre kvalitet.",
  },
];

const compliance = [
  {
    icon: "🧭",
    title: "Maritim rådgivning",
    text: "Praktisk erfaring fra norsk kystfart gjør at vi forstår hverdagen om bord og leverer realistiske bemanningsplaner.",
  },
  {
    icon: "📑",
    title: "Dokumentkontroll",
    text: "Oppdaterte sertifikater, helseerklæringer og sikkerhetskurs kontrolleres før kandidatene går om bord.",
  },
  {
    icon: "🛰️",
    title: "Tilgjengelig 24/7",
    text: "Vakttjeneste på telefon og e-post sikrer rask respons når rotasjoner må justeres på kort varsel.",
  },
];

export default function HomePage() {
  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh", color: "#0F172A" }}>
      <SiteHeader />
      <main>
        <section style={styles.hero}>
          <div style={styles.container}>
            <p style={styles.heroPill}>Bemanning • Havbruk • Fiskeri • Servicefartøy</p>
            <h1 style={styles.heroTitle}>Bluecrew AS – bemanning til sjøs</h1>
            <p style={styles.heroSubtitle}>
              Vi leverer sertifiserte mannskaper til havbruk, fiskeri og servicefartøy fra Harstad – med kort responstid og
              tett oppfølging gjennom hele oppdraget.
            </p>
            <div style={styles.heroCtas}>
              <Link href="/bemanningsbehov" style={styles.primaryCta}>
                Meld inn bemanningsbehov
              </Link>
              <Link href="/kandidat" style={styles.secondaryCta}>
                Registrer deg som kandidat
              </Link>
            </div>
          </div>
        </section>

        <section style={styles.sectionLight}>
          <div style={styles.container}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Hva vi leverer</h2>
              <p style={styles.sectionLead}>
                Tilpassede bemanningsløsninger for fartøy og anlegg i hele landet. Vi kombinerer erfarne sjøfolk med fleksibel
                administrasjon.
              </p>
            </div>
            <div style={styles.cardGrid}>
              {services.map((service) => (
                <article key={service.title} style={styles.serviceCard}>
                  <h3 style={styles.cardTitle}>{service.title}</h3>
                  <p style={styles.cardLead}>{service.lead}</p>
                  <ul style={styles.cardList}>
                    {service.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <Link href="/bemanningsbehov" style={styles.cardLink}>
                    Bestill bemanning
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.sectionDark}>
          <div style={styles.containerDark}>
            <div style={styles.sectionHeaderDark}>
              <h2 style={{ ...styles.sectionTitle, color: "#fff" }}>Hvorfor velge Bluecrew?</h2>
              <p style={{ ...styles.sectionLead, color: "rgba(255,255,255,0.82)" }}>
                Et erfarent team med bakgrunn fra sjøen, strukturert kandidatoppfølging og tydelige HMS-rutiner.
              </p>
            </div>
            <div style={styles.highlightGrid}>
              {highlights.map((item) => (
                <article key={item.title} style={styles.highlightCard}>
                  <h3 style={styles.highlightTitle}>{item.title}</h3>
                  <p style={styles.highlightText}>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.sectionLight}>
          <div style={styles.container}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Slik jobber vi</h2>
              <p style={styles.sectionLead}>
                Vi leder prosessen fra første kontakt til oppfølging om bord og rapportering i etterkant.
              </p>
            </div>
            <div style={styles.processGrid}>
              {process.map((item) => (
                <article key={item.step} style={styles.processCard}>
                  <div style={styles.processStep}>{item.step}</div>
                  <div>
                    <h3 style={styles.processTitle}>{item.title}</h3>
                    <p style={styles.processText}>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.sectionOutline}>
          <div style={styles.container}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Trygghet og etterlevelse</h2>
              <p style={styles.sectionLead}>
                Bluecrew AS dokumenterer kompetanse, HMS og sikkerhetskrav for hvert eneste oppdrag.
              </p>
            </div>
            <div style={styles.complianceGrid}>
              {compliance.map((item) => (
                <article key={item.title} style={styles.complianceCard}>
                  <div style={styles.complianceIcon} aria-hidden="true">
                    {item.icon}
                  </div>
                  <h3 style={styles.complianceTitle}>{item.title}</h3>
                  <p style={styles.complianceText}>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.sectionLight}>
          <div style={styles.containerSmall}>
            <h2 style={styles.sectionTitle}>Klar for neste oppdrag?</h2>
            <p style={styles.sectionLead}>
              Ta kontakt for en uforpliktende prat om bemanningsplaner, eller send oss detaljer direkte.
            </p>
            <div style={styles.ctaRow}>
              <Link href="tel:+4741380800" style={styles.secondaryCta}>
                Ring oss på +47 41 38 08 00
              </Link>
              <Link href="mailto:post@bluecrew.no" style={styles.secondaryCta}>
                post@bluecrew.no
              </Link>
              <Link href="/bemanningsbehov" style={styles.primaryCta}>
                Bestill bemanning
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  hero: {
    padding: "100px 0 80px",
    background: "linear-gradient(180deg, #0B1F3A 0%, #10264F 60%, #0B1F3A 100%)",
    color: "#fff",
    textAlign: "center",
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 24px",
  },
  containerDark: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 24px 56px",
  },
  containerSmall: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "0 24px",
    textAlign: "center",
  },
  heroPill: {
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.14)",
    color: "rgba(255,255,255,0.92)",
    fontSize: 12,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  heroTitle: {
    fontSize: 46,
    fontWeight: 900,
    margin: "24px 0 16px",
    letterSpacing: "-0.02em",
  },
  heroSubtitle: {
    margin: "0 auto",
    maxWidth: 720,
    fontSize: 18,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.86)",
  },
  heroCtas: {
    marginTop: 32,
    display: "flex",
    justifyContent: "center",
    gap: 16,
    flexWrap: "wrap",
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
    background: "rgba(255,255,255,0.08)",
    color: "inherit",
    fontWeight: 700,
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.24)",
  },
  sectionLight: {
    padding: "80px 0",
    background: "#F8FAFC",
  },
  sectionDark: {
    padding: "80px 0",
    background: "#0F1E3A",
    color: "#fff",
  },
  sectionOutline: {
    padding: "80px 0",
    background: "#fff",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: 48,
    display: "grid",
    gap: 12,
  },
  sectionHeaderDark: {
    textAlign: "center",
    marginBottom: 48,
    display: "grid",
    gap: 12,
    paddingTop: 12,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 800,
    margin: 0,
    letterSpacing: "-0.01em",
    color: "#0B1F3A",
  },
  sectionLead: {
    margin: "0 auto",
    maxWidth: 720,
    fontSize: 17,
    lineHeight: 1.7,
    color: "#334155",
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
    boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
    border: "1px solid #E2E8F0",
    display: "grid",
    gap: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 800,
    margin: 0,
    color: "#0B1F3A",
  },
  cardLead: {
    margin: 0,
    color: "#475569",
    lineHeight: 1.6,
  },
  cardList: {
    margin: 0,
    paddingLeft: 18,
    display: "grid",
    gap: 6,
    color: "#1F2937",
  },
  cardLink: {
    marginTop: 4,
    fontWeight: 700,
    color: "#1D4ED8",
    textDecoration: "none",
  },
  highlightGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 24,
  },
  highlightCard: {
    background: "rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: 28,
    border: "1px solid rgba(255,255,255,0.18)",
    display: "grid",
    gap: 12,
  },
  highlightTitle: {
    margin: 0,
    fontWeight: 800,
    fontSize: 20,
  },
  highlightText: {
    margin: 0,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.82)",
  },
  processGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 24,
  },
  processCard: {
    background: "#fff",
    borderRadius: 18,
    padding: 28,
    border: "1px solid #E2E8F0",
    display: "flex",
    gap: 16,
  },
  processStep: {
    fontSize: 18,
    fontWeight: 800,
    color: "#2563EB",
    minWidth: 44,
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
  complianceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 24,
  },
  complianceCard: {
    borderRadius: 18,
    padding: 28,
    border: "1px solid #E2E8F0",
    background: "#F8FAFC",
    display: "grid",
    gap: 12,
  },
  complianceIcon: {
    fontSize: 30,
  },
  complianceTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    color: "#0B1F3A",
  },
  complianceText: {
    margin: 0,
    lineHeight: 1.6,
    color: "#475569",
  },
  ctaRow: {
    marginTop: 32,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
};
