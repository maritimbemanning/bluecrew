import Link from "next/link";
import Logo from "@/components/Logo";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const styles = {
  page: {
    background: "#F1F5F9",
    minHeight: "100vh",
  },
  hero: {
    padding: "140px 0 90px",
    background: "radial-gradient(circle at top left, rgba(37, 99, 235, 0.35), transparent 55%), linear-gradient(135deg, #0B1F3A 0%, #1E3A8A 60%, #172554 100%)",
    color: "#fff",
  },
  heroWrap: {
    width: "min(1180px, 92vw)",
    margin: "0 auto",
    display: "grid",
    gap: 40,
  },
  heroLayout: {
    display: "grid",
    gap: 32,
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    alignItems: "center",
  },
  heroMain: {
    display: "grid",
    gap: 18,
  },
  heroPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 16px",
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
    lineHeight: 1.04,
    maxWidth: 700,
  },
  heroLead: {
    fontSize: 20,
    lineHeight: 1.65,
    color: "rgba(226, 232, 240, 0.92)",
    maxWidth: 600,
  },
  heroAside: {
    fontSize: 16,
    lineHeight: 1.7,
    color: "rgba(226, 232, 240, 0.78)",
    maxWidth: 520,
  },
  heroHighlights: {
    display: "grid",
    gap: 12,
    marginTop: 8,
  },
  heroHighlight: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 16px",
    borderRadius: 999,
    background: "rgba(30, 64, 175, 0.25)",
    border: "1px solid rgba(148, 163, 184, 0.28)",
    fontSize: 14,
    fontWeight: 600,
    color: "#E2E8F0",
  },
  heroHighlightDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#93C5FD",
  },
  heroPanel: {
    background: "rgba(15, 23, 42, 0.48)",
    borderRadius: 28,
    padding: 32,
    border: "1px solid rgba(148, 163, 184, 0.25)",
    backdropFilter: "blur(4px)",
    display: "grid",
    gap: 18,
    justifyItems: "flex-start",
  },
  heroPanelHeader: {
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 14px",
    borderRadius: 18,
    background: "rgba(30, 64, 175, 0.3)",
    border: "1px solid rgba(147, 197, 253, 0.25)",
  },
  heroPanelHeaderText: {
    fontSize: 12,
    letterSpacing: "0.16em",
    textTransform: "uppercase" as const,
    color: "rgba(226, 232, 240, 0.78)",
    fontWeight: 700,
  },
  heroPanelTitle: {
    fontSize: 22,
    fontWeight: 700,
  },
  heroPanelText: {
    fontSize: 15,
    lineHeight: 1.7,
    color: "rgba(226, 232, 240, 0.82)",
  },
  heroPanelList: {
    display: "grid",
    gap: 10,
    width: "100%",
  },
  heroPanelItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    borderRadius: 14,
    background: "rgba(30, 58, 138, 0.45)",
    border: "1px solid rgba(96, 165, 250, 0.2)",
    fontSize: 14,
    fontWeight: 600,
  },
  heroPanelBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: 12,
    background: "rgba(147, 197, 253, 0.18)",
    color: "#BFDBFE",
    fontWeight: 700,
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
    background: "#F8FAFC",
    color: "#0B1F3A",
  },
  btnSecondary: {
    background: "rgba(15, 23, 42, 0.2)",
    color: "#fff",
    border: "1px solid rgba(248, 250, 252, 0.35)",
  },
  heroStats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 18,
  },
  heroStat: {
    background: "rgba(15, 23, 42, 0.18)",
    borderRadius: 18,
    padding: 18,
    border: "1px solid rgba(148, 163, 184, 0.25)",
    display: "grid",
    gap: 6,
  },
  heroStatValue: {
    fontSize: 26,
    fontWeight: 800,
  },
  heroStatLabel: {
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "rgba(226, 232, 240, 0.7)",
  },
  section: {
    padding: "90px 0",
  },
  wrap: {
    width: "min(1180px, 92vw)",
    margin: "0 auto",
    display: "grid",
    gap: 40,
  },
  sectionMuted: {
    background: "#F8FAFC",
  },
  sectionAccent: {
    background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
  },
  sectionHeader: {
    display: "grid",
    gap: 12,
    maxWidth: 780,
  },
  sectionTitle: {
    fontSize: 38,
    fontWeight: 800,
    color: "#0B1F3A",
    lineHeight: 1.15,
  },
  sectionLead: {
    fontSize: 18,
    color: "#475569",
    lineHeight: 1.7,
  },
  cardGrid: {
    display: "grid",
    gap: 24,
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  },
  card: {
    background: "#fff",
    borderRadius: 22,
    padding: 28,
    border: "1px solid #E2E8F0",
    boxShadow: "0 18px 45px -28px rgba(15, 23, 42, 0.35)",
    display: "grid",
    gap: 16,
  },
  cardTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12,
    textTransform: "uppercase" as const,
    letterSpacing: "0.16em",
    fontWeight: 700,
    color: "#1D4ED8",
    background: "#DBEAFE",
    borderRadius: 999,
    padding: "6px 12px",
    width: "fit-content",
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
    lineHeight: 1.65,
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
    borderRadius: 20,
    border: "1px solid rgba(148, 163, 184, 0.25)",
    boxShadow: "0 16px 40px -30px rgba(15, 23, 42, 0.4)",
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
    borderRadius: 24,
    padding: 30,
    color: "#E2E8F0",
    display: "grid",
    gap: 20,
    boxShadow: "0 24px 54px -32px rgba(15, 23, 42, 0.65)",
  },
  processTitle: {
    fontSize: 22,
    fontWeight: 700,
  },
  processList: {
    display: "grid",
    gap: 18,
  },
  processItem: {
    display: "grid",
    gap: 6,
  },
  processNumber: {
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "#93C5FD",
  },
  processStepTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#F8FAFC",
  },
  processCopy: {
    fontSize: 15,
    lineHeight: 1.65,
    color: "rgba(226, 232, 240, 0.82)",
  },
  splitSection: {
    display: "grid",
    gap: 24,
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  },
  splitCard: {
    background: "#fff",
    borderRadius: 22,
    padding: 26,
    border: "1px solid rgba(148, 163, 184, 0.24)",
    boxShadow: "0 18px 45px -30px rgba(15, 23, 42, 0.35)",
    display: "grid",
    gap: 14,
  },
  quoteBlock: {
    background: "#0B1F3A",
    color: "#E2E8F0",
    borderRadius: 24,
    padding: 36,
    boxShadow: "0 30px 70px -40px rgba(15, 23, 42, 0.75)",
    display: "grid",
    gap: 18,
  },
  quoteText: {
    fontSize: 22,
    lineHeight: 1.7,
  },
  quoteAuthor: {
    fontSize: 16,
    fontWeight: 700,
  },
  quoteRole: {
    fontSize: 14,
    color: "rgba(226, 232, 240, 0.75)",
  },
  link: {
    color: "#1D4ED8",
    fontWeight: 600,
    textDecoration: "none",
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

const HERO_HIGHLIGHTS = [
  "24/7 vakttelefon og rask mobilisering",
  "Erfarne sjøfolk med oppdatert sertifikat",
  "Bemanning skreddersydd for havbruk, fiskeri og service",
];

const HERO_PANEL_ITEMS = [
  "Planlegging av skift og logistikk",
  "Oppfølging under hele oppdraget",
  "Dokumentkontroll før avreise",
];

const HERO_STATS = [
  { value: "120+", label: "Skip og anlegg bemannet" },
  { value: "48 t", label: "Typisk responstid" },
  { value: "15 år", label: "Egen erfaring til sjøs" },
];

const SERVICES = [
  {
    icon: "🛥️",
    title: "Servicefartøy",
    tag: "Drift og operasjon",
    text: "Bemanning til fartøy i havbruk og service, fra skipper og styrmann til matros og kokekyndig personell.",
  },
  {
    icon: "🐟",
    title: "Havbruk",
    tag: "Produksjon",
    text: "Operativt personell, akvateknikere, fôrings- og laseroperatører med erfaring fra norsk oppdrett.",
  },
  {
    icon: "⚓",
    title: "Fiskeri",
    tag: "Sesong og crew",
    text: "Rask tilgang på mannskap til kyst- og havgående fartøy, korttidsoppdrag og sesongtopper.",
  },
];

const DELIVERY_POINTS = [
  {
    icon: "⚓️",
    title: "Folk fra sjøen",
    text: "Crew som kan havbruk, fiskeri og servicefartøy. Vi bemanner for drift – ikke bare for å fylle vaktlister.",
  },
  {
    icon: "🤝",
    title: "Treffsikre matcher",
    text: "Kompetanse, holdninger og samarbeidsevne veier tyngst. Papirene er i orden, men menneskene må passe laget.",
  },
  {
    icon: "📋",
    title: "Papirene i orden",
    text: "Sertifikater, helse og kurs kontrolleres før avreise. Du får dokumentasjonen samlet og klar for inspeksjon.",
  },
  {
    icon: "📡",
    title: "Oppfølging hele veien",
    text: "Vi følger opp mannskap og ledelse underveis og justerer ved værskifte, ekstra arbeid eller nye krav.",
  },
];

const DELIVERY_STEPS = [
  {
    title: "Kartlegging",
    text: "Vi kartlegger fartøy, oppgaver og varighet for å treffe med rett mannskap.",
  },
  {
    title: "Utvelgelse",
    text: "Kandidater sjekkes mot krav og kultur. Du får konkrete forslag med korte oppsummeringer.",
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
  },
  {
    title: "Meld inn bemanningsbehov",
    text: "Fortell oss om fartøyet, tidsrommet og oppgavene – så matcher vi aktuelle kandidater.",
    href: "/bemanningsbehov",
  },
  {
    title: "Book en rådgiver",
    text: "Vil du diskutere bemanningsplaner eller langtidssamarbeid? Avtal en prat med oss.",
    href: "mailto:isak@bluecrew.no",
  },
];

export default function HomePage() {
  return (
    <div style={styles.page}>
      <SiteHeader />
      <main>
        <section style={styles.hero}>
          <div style={styles.heroWrap}>
            <div style={styles.heroLayout}>
              <div style={styles.heroMain}>
                <span style={styles.heroPill}>
                  <span role="img" aria-hidden>
                    ⚓
                  </span>
                  Bluecrew – Bemanning til sjøs
                </span>
                <h1 style={styles.heroTitle}>Rett kompetanse. På rett sted. Til rett tid.</h1>
                <p style={styles.heroLead}>
                  Bluecrew leverer kvalifisert maritim arbeidskraft til havbruksnæringen, fiskeri og servicefartøy. Vi kjenner
                  sjøen, skiftene og menneskene som får drifta til å gå rundt — fordi vi selv har vært der.
                </p>
                <p style={styles.heroAside}>
                  Vi bemanner for drift, ikke bare vaktlister. Hos oss møter du sjøfolk med praktisk erfaring som matcher både
                  kompetansekrav og lagfølelse om bord.
                </p>
                <div style={styles.heroHighlights}>
                  {HERO_HIGHLIGHTS.map((item) => (
                    <span key={item} style={styles.heroHighlight}>
                      <span style={styles.heroHighlightDot} aria-hidden />
                      {item}
                    </span>
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
              <aside style={styles.heroPanel}>
                <span style={styles.heroPanelHeader}>
                  <Logo size={32} />
                  <span style={styles.heroPanelHeaderText}>Leveranser til sjø og havbruk</span>
                </span>
                <h2 style={styles.heroPanelTitle}>Din bemanningspartner på dekk</h2>
                <p style={styles.heroPanelText}>
                  Vi mobiliserer komplette team til servicefartøy, havbruk og fiskeri. Når oppdraget starter følger vi bemanningen
                  tett slik at skipet har alt som trengs for å levere.
                </p>
                <div style={styles.heroPanelList}>
                  {HERO_PANEL_ITEMS.map((item, index) => (
                    <span key={item} style={styles.heroPanelItem}>
                      <span style={styles.heroPanelBadge}>{index + 1}</span>
                      {item}
                    </span>
                  ))}
                </div>
              </aside>
            </div>
            <div style={styles.heroStats}>
              {HERO_STATS.map((stat) => (
                <div key={stat.label} style={styles.heroStat}>
                  <span style={styles.heroStatValue}>{stat.value}</span>
                  <span style={styles.heroStatLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ ...styles.section, ...styles.sectionMuted }}>
          <div style={styles.wrap}>
            <div style={styles.quoteBlock}>
              <p style={styles.quoteText}>
                «Bluecrew er bygget av folk som selv har stått i skiftene. Vi vet hva som kreves på broen, på merdkanten og i
                maskinen – derfor matcher vi mannskap som leverer fra første vaktskift.»
              </p>
              <div>
                <div style={styles.quoteAuthor}>Isak Didriksson</div>
                <div style={styles.quoteRole}>Daglig leder, Bluecrew AS</div>
              </div>
            </div>
          </div>
        </section>

        <section id="tjenester" style={{ ...styles.section, ...styles.sectionMuted }}>
          <div style={styles.wrap}>
            <header style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Vi bemanner hele den maritime verdikjeden</h2>
              <p style={styles.sectionLead}>
                Fra oppdrettsanlegg til servicefartøy og fiskeri. Vi kjenner bransjen, sertifikatkravene og tempoet som kreves
                for å holde driften i gang.
              </p>
            </header>
            <div style={styles.cardGrid}>
              {SERVICES.map((service) => (
                <article key={service.title} style={styles.card}>
                  {service.tag ? <span style={styles.cardTag}>{service.tag}</span> : null}
                  <div style={styles.cardIcon}>{service.icon}</div>
                  <h3 style={styles.cardTitle}>{service.title}</h3>
                  <p style={styles.cardText}>{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="leveranse" style={{ ...styles.section, ...styles.sectionAccent }}>
          <div style={styles.wrap}>
            <header style={styles.sectionHeader}>
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
                      Send e-post
                    </a>
                  ) : (
                    <Link href={item.href} style={styles.link}>
                      Gå til siden
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
