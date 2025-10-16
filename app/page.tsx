import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const styles = {
  page: {
    background: "#F1F5F9",
    minHeight: "100vh",
  },
  hero: {
    padding: "120px 0 80px",
    background: "linear-gradient(135deg, #0B1F3A 0%, #1E3A8A 100%)",
    color: "#fff",
  },
  heroWrap: {
    width: "min(1120px, 92vw)",
    margin: "0 auto",
    display: "grid",
    gap: 40,
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  },
  heroContent: {
    display: "grid",
    gap: 24,
  },
  heroPill: {
    display: "inline-flex",
    padding: "6px 14px",
    borderRadius: 999,
    background: "rgba(15, 23, 42, 0.55)",
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
  },
  heroTitle: {
    fontSize: 56,
    fontWeight: 800,
    lineHeight: 1.05,
    maxWidth: 680,
  },
  heroLead: {
    fontSize: 20,
    lineHeight: 1.6,
    color: "rgba(226, 232, 240, 0.9)",
    maxWidth: 600,
  },
  heroHighlights: {
    display: "grid",
    gap: 12,
  },
  heroHighlightItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    fontSize: 15,
    lineHeight: 1.6,
    color: "rgba(226, 232, 240, 0.85)",
  },
  heroHighlightIcon: {
    fontSize: 18,
    lineHeight: 1,
  },
  heroCard: {
    alignSelf: "stretch",
    display: "grid",
    gap: 16,
    padding: 24,
    background: "rgba(15, 23, 42, 0.55)",
    borderRadius: 20,
    border: "1px solid rgba(148, 163, 184, 0.25)",
  },
  heroCardTitle: {
    fontSize: 18,
    fontWeight: 700,
  },
  heroCardText: {
    fontSize: 15,
    lineHeight: 1.6,
    color: "rgba(226, 232, 240, 0.78)",
  },
  heroCardList: {
    display: "grid",
    gap: 12,
    marginTop: 6,
  },
  heroCardStat: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
  },
  heroCardStatValue: {
    fontSize: 32,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: "#fff",
  },
  heroCardStatLabel: {
    fontSize: 14,
    color: "rgba(226, 232, 240, 0.72)",
  },
  heroCtas: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 16,
  },
  heroBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "14px 26px",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 16,
    textDecoration: "none",
  },
  btnPrimary: {
    background: "#fff",
    color: "#0B1F3A",
  },
  btnSecondary: {
    background: "rgba(15, 23, 42, 0.35)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.35)",
  },
  section: {
    padding: "80px 0",
  },
  wrap: {
    width: "min(1120px, 92vw)",
    margin: "0 auto",
    display: "grid",
    gap: 42,
  },
  sectionHeader: {
    display: "grid",
    gap: 16,
    maxWidth: 720,
  },
  sectionBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 14px",
    borderRadius: 999,
    background: "rgba(29, 78, 216, 0.12)",
    color: "#1E3A8A",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: 800,
    color: "#0F172A",
  },
  sectionLead: {
    fontSize: 18,
    color: "#475569",
    lineHeight: 1.7,
  },
  cardGrid: {
    display: "grid",
    gap: 20,
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  },
  card: {
    background: "#fff",
    borderRadius: 18,
    padding: 26,
    border: "1px solid #E2E8F0",
    boxShadow: "0 18px 40px rgba(15, 23, 42, 0.05)",
    display: "grid",
    gap: 16,
  },
  cardIcon: {
    fontSize: 28,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0B1F3A",
  },
  cardText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 1.6,
  },
  deliveryGrid: {
    display: "grid",
    gap: 28,
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    alignItems: "start",
  },
  miniGrid: {
    display: "grid",
    gap: 18,
  },
  miniCard: {
    display: "grid",
    gap: 10,
    padding: 24,
    background: "#fff",
    borderRadius: 18,
    border: "1px solid #E2E8F0",
    boxShadow: "0 18px 40px rgba(15, 23, 42, 0.05)",
  },
  miniTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#0B1F3A",
  },
  miniText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 1.6,
  },
  processPanel: {
    background: "#0B1F3A",
    borderRadius: 20,
    padding: 26,
    color: "#E2E8F0",
    display: "grid",
    gap: 18,
    boxShadow: "0 22px 45px rgba(15, 23, 42, 0.2)",
  },
  processTitle: {
    fontSize: 20,
    fontWeight: 700,
  },
  processList: {
    display: "grid",
    gap: 16,
  },
  processItem: {
    display: "grid",
    gap: 6,
  },
  processNumber: {
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#93C5FD",
  },
  processStepTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: "#F8FAFC",
  },
  processCopy: {
    fontSize: 15,
    lineHeight: 1.6,
    color: "rgba(226, 232, 240, 0.82)",
  },
  splitSection: {
    display: "grid",
    gap: 24,
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  },
  splitCard: {
    background: "#fff",
    borderRadius: 20,
    padding: 24,
    border: "1px solid #E2E8F0",
    display: "grid",
    gap: 16,
    boxShadow: "0 18px 40px rgba(15, 23, 42, 0.05)",
  },
  link: {
    color: "#1D4ED8",
    fontWeight: 600,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },
  contactGrid: {
    display: "grid",
    gap: 24,
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  },
  contactCard: {
    background: "#fff",
    borderRadius: 18,
    padding: 24,
    border: "1px solid #E2E8F0",
    display: "grid",
    gap: 12,
  },
};

const HERO_POINTS = [
  {
    icon: "🌊",
    text: "Bemanningspartnere til havbruk, fiskeri og maritime serviceoperasjoner.",
  },
  {
    icon: "🧭",
    text: "Tilgjengelige rådgivere som kjenner skiftene, sertifikatkrav og daglig drift om bord.",
  },
  {
    icon: "🤝",
    text: "Kandidatoppfølging fra screening til avløsning – vi sørger for et komplett mannskap.",
  },
];

const SERVICES = [
  {
    icon: "🛥️",
    title: "Servicefartøy",
    text: "Fartøyledere, matroser og teknisk støtte som holder vedlikehold, notvask og logistikk i gang.",
  },
  {
    icon: "🐟",
    title: "Havbruk",
    text: "Akvateknikere, driftsteam og spesialister på fôrings- og lusebehandling – klare når produksjonen topper seg.",
  },
  {
    icon: "⚓",
    title: "Fiskeri",
    text: "Erfarne skippere, styrmenn og mannskap til sesongtopper på kyst- og havgående fartøy.",
  },
];

const DELIVERY_POINTS = [
  {
    icon: "⚓️",
    title: "Folk fra sjøen",
    text: "Vi bemanner for drift, ikke bare vaktlister. Teamet vårt har stått i skiftene og vet hva som kreves om bord.",
  },
  {
    icon: "🤝",
    title: "Treffsikre matcher",
    text: "Kompetanse, holdning og samarbeidsevne veier tyngre enn CV-lengde. Det gir stabile skift.",
  },
  {
    icon: "📋",
    title: "Papirene i orden",
    text: "Sertifikater, helse og kurs sjekkes før avreise. Dokumentasjonen følger kandidaten til fartøyet.",
  },
  {
    icon: "📡",
    title: "Oppfølging hele veien",
    text: "Vi er i kontakt hele veien og justerer raskt når drift, vær eller behov endrer seg.",
  },
];

const DELIVERY_STEPS = [
  {
    title: "Kartlegging",
    text: "Vi kartlegger fartøy, oppgaver og varighet slik at vi vet hvem som passer inn.",
  },
  {
    title: "Utvelgelse",
    text: "Kandidater sjekkes mot krav og kultur. Du får forslag med korte oppsummeringer du kan ta stilling til.",
  },
  {
    title: "Oppstart",
    text: "Vi avtaler logistikk, følger opp om bord og sørger for en ryddig avslutning når oppdraget er i mål.",
  },
];

const NEXT_STEPS = [
  {
    title: "Registrer kandidat",
    text: "Legg inn erfaring, kurs og tilgjengelighet. Vi tar kontakt når passende oppdrag dukker opp.",
    href: "/kandidat",
    cta: "Åpne skjema",
  },
  {
    title: "Meld inn bemanningsbehov",
    text: "Fortell oss om fartøyet, tidsrommet og oppgavene – så matcher vi aktuelle kandidater.",
    href: "/bemanningsbehov",
    cta: "Start bestilling",
  },
  {
    title: "Book en rådgiver",
    text: "Vil du diskutere bemanningsplaner eller samarbeid? Avtal en prat med oss.",
    href: "mailto:isak@bluecrew.no",
    cta: "Send e-post",
  },
];

export default function HomePage() {
  return (
    <div style={styles.page}>
      <SiteHeader />
      <main>
        <section style={styles.hero}>
          <div style={styles.heroWrap}>
            <div style={styles.heroContent}>
              <span style={styles.heroPill}>Bluecrew – Bemanning til sjøs</span>
              <h1 style={styles.heroTitle}>Rett kompetanse. På rett sted. Til rett tid.</h1>
              <p style={styles.heroLead}>
                Bluecrew leverer kvalifisert maritim arbeidskraft til havbruksnæringen, fiskeri og servicefartøy. Vi kjenner
                sjøen, skiftene og menneskene som får drifta til å gå rundt — fordi vi selv har vært der.
              </p>
              <div style={styles.heroHighlights}>
                {HERO_POINTS.map((item) => (
                  <div key={item.text} style={styles.heroHighlightItem}>
                    <span aria-hidden="true" style={styles.heroHighlightIcon}>
                      {item.icon}
                    </span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              <div style={styles.heroCtas}>
                <Link href="/kandidat" style={{ ...styles.heroBtn, ...styles.btnPrimary }}>
                  Registrer kandidat
                </Link>
                <Link href="/bemanningsbehov" style={{ ...styles.heroBtn, ...styles.btnSecondary }}>
                  Meld inn behov
                </Link>
              </div>
            </div>
            <aside style={styles.heroCard}>
              <h2 style={styles.heroCardTitle}>Bemanning klar når du trenger det</h2>
              <p style={styles.heroCardText}>
                ⚓️ Vi bemanner for drift, ikke bare vaktlister. Hos oss møter du sjøfolk med praktisk erfaring som matcher
                både kompetanse og lagfølelse om bord.
              </p>
              <div style={styles.heroCardList}>
                <div style={styles.heroCardStat}>
                  <span style={styles.heroCardStatValue}>24/7</span>
                  <span style={styles.heroCardStatLabel}>beredskap på telefon</span>
                </div>
                <div style={styles.heroCardStat}>
                  <span style={styles.heroCardStatValue}>48 t</span>
                  <span style={styles.heroCardStatLabel}>typisk responstid for kritiske skift</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="tjenester" style={{ ...styles.section, background: "#F8FAFC" }}>
          <div style={styles.wrap}>
            <header style={styles.sectionHeader}>
              <span style={styles.sectionBadge}>Tjenester</span>
              <h2 style={styles.sectionTitle}>Vi bemanner hele den maritime verdikjeden</h2>
              <p style={styles.sectionLead}>
                Fra oppdrettsanlegg til servicefartøy og fiskeri. Vi kjenner bransjen, sertifikatkravene og tempoet som kreves
                for å holde driften i gang.
              </p>
            </header>
            <div style={styles.cardGrid}>
              {SERVICES.map((service) => (
                <article key={service.title} style={styles.card}>
                  <div style={styles.cardIcon}>{service.icon}</div>
                  <h3 style={styles.cardTitle}>{service.title}</h3>
                  <p style={styles.cardText}>{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="leveranse" style={{ ...styles.section, background: "#fff" }}>
          <div style={styles.wrap}>
            <header style={styles.sectionHeader}>
              <span style={styles.sectionBadge}>Leveranse</span>
              <h2 style={styles.sectionTitle}>Derfor velger rederiene Bluecrew</h2>
              <p style={styles.sectionLead}>
                Bluecrew leverer kvalifisert mannskap til havbruk, fiskeri og servicefartøy. Vi kjenner sjøen, skiftene og
                folka som holder drifta i gang – og sørger for at hvert oppdrag flyter.
              </p>
            </header>
            <div style={styles.deliveryGrid}>
              <div style={styles.miniGrid}>
                {DELIVERY_POINTS.map((item) => (
                  <article key={item.title} style={styles.miniCard}>
                    <div style={styles.cardIcon}>{item.icon}</div>
                    <h3 style={styles.miniTitle}>{item.title}</h3>
                    <p style={styles.miniText}>{item.text}</p>
                  </article>
                ))}
              </div>
              <aside style={styles.processPanel}>
                <h3 style={styles.processTitle}>Slik ser et oppdrag ut</h3>
                <div style={styles.processList}>
                  {DELIVERY_STEPS.map((step, index) => (
                    <div key={step.title} style={styles.processItem}>
                      <span style={styles.processNumber}>Steg {index + 1}</span>
                      <span style={styles.processStepTitle}>{step.title}</span>
                      <p style={styles.processCopy}>{step.text}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="neste" style={styles.section}>
          <div style={styles.wrap}>
            <header style={styles.sectionHeader}>
              <span style={styles.sectionBadge}>Kom i gang</span>
              <h2 style={styles.sectionTitle}>Neste steg</h2>
              <p style={styles.sectionLead}>
                Velg hvordan du vil komme i gang. Vi følger opp innen kort tid når du sender inn skjema eller booker samtale.
              </p>
            </header>
            <div style={styles.splitSection}>
              {NEXT_STEPS.map((item) => (
                <article key={item.title} style={styles.splitCard}>
                  <h3 style={styles.cardTitle}>{item.title}</h3>
                  <p style={styles.cardText}>{item.text}</p>
                  {item.href.startsWith("mailto:") ? (
                    <a href={item.href} style={styles.link}>
                      {item.cta}
                      <span aria-hidden="true">→</span>
                    </a>
                  ) : (
                    <Link href={item.href} style={styles.link}>
                      {item.cta}
                      <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="kontakt" style={{ ...styles.section, background: "#fff" }}>
          <div style={styles.wrap}>
            <header style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Kontakt oss</h2>
              <p style={styles.sectionLead}>
                Vi tar gjerne en prat om bemanningsplaner, sertifikater eller samarbeid. Du når oss direkte på telefon eller
                e-post.
              </p>
            </header>
            <div style={styles.contactGrid}>
              <div style={styles.contactCard}>
                <h3 style={styles.cardTitle}>Bluecrew AS</h3>
                <p style={styles.cardText}>Østenbekkveien 43, 9403 Harstad</p>
                <p style={styles.cardText}>Org.nr: 936 321 194</p>
                <p style={styles.cardText}>
                  <a href="mailto:isak@bluecrew.no" style={styles.link}>
                    isak@bluecrew.no
                  </a>
                </p>
                <p style={styles.cardText}>
                  <a href="tel:92328850" style={styles.link}>
                    923 28 850
                  </a>
                </p>
              </div>
              <div style={styles.contactCard}>
                <h3 style={styles.cardTitle}>Hva kan vi hjelpe deg med?</h3>
                <p style={styles.cardText}>
                  • Midlertidig bemanning til havbruk, servicefartøy og fiskeri
                  <br />• Rekruttering til faste stillinger
                  <br />• Rådgivning rundt sertifikater, kurs og vaktplaner
                </p>
                <p style={styles.cardText}>
                  Vi behandler persondata i tråd med GDPR og deler aldri dokumenter uten samtykke.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
