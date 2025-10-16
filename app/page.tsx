import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const styles = {
  page: {
    background: "#F4F7FB",
    minHeight: "100vh",
  },
  hero: {
    padding: "120px 0 96px",
    background: "linear-gradient(120deg, #EFF5FF 0%, #D7E6FF 45%, #123E7B 100%)",
    color: "#0F172A",
  },
  heroWrap: {
    width: "min(1100px, 92vw)",
    margin: "0 auto",
    display: "grid",
    gap: 48,
  },
  heroLayout: {
    display: "grid",
    gap: 48,
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    alignItems: "center",
  },
  heroContent: {
    display: "grid",
    gap: 24,
    maxWidth: 620,
  },
  heroPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "9px 20px",
    borderRadius: 999,
    background: "rgba(15, 23, 42, 0.08)",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: "#0C1F3D",
  },
  heroTitle: {
    fontSize: 54,
    fontWeight: 800,
    lineHeight: 1.05,
    color: "#0C1F3D",
    maxWidth: 620,
  },
  heroLead: {
    fontSize: 19,
    lineHeight: 1.7,
    color: "rgba(15, 23, 42, 0.75)",
    maxWidth: 600,
  },
  heroList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
    gap: 12,
  },
  heroListItem: {
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
    fontSize: 16,
    color: "rgba(15, 23, 42, 0.72)",
  },
  heroListIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 26,
    height: 26,
    borderRadius: "50%",
    background: "rgba(29, 78, 216, 0.14)",
    color: "#1D4ED8",
    fontSize: 13,
    marginTop: 4,
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
    padding: "14px 28px",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 16,
    textDecoration: "none",
    boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12)",
    transition: "transform 0.2s ease",
  },
  btnPrimary: {
    background: "#0E2A4E",
    color: "#F8FAFC",
  },
  btnSecondary: {
    background: "#fff",
    color: "#0E2A4E",
    border: "1px solid rgba(14, 42, 78, 0.18)",
    boxShadow: "0 16px 32px rgba(14, 42, 78, 0.08)",
  },
  heroCard: {
    background: "#fff",
    borderRadius: 28,
    border: "1px solid rgba(148, 163, 184, 0.25)",
    padding: 32,
    display: "grid",
    gap: 24,
    boxShadow: "0 35px 65px rgba(15, 23, 42, 0.12)",
    position: "relative" as const,
  },
  heroCardHeader: {
    display: "grid",
    gap: 8,
  },
  heroCardBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "6px 14px",
    borderRadius: 999,
    background: "rgba(29, 78, 216, 0.12)",
    fontSize: 12,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: "#1D4ED8",
  },
  heroCardTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#0C1F3D",
  },
  heroStats: {
    display: "grid",
    gap: 18,
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  },
  heroStat: {
    display: "grid",
    gap: 6,
  },
  heroStatNumber: {
    fontSize: 32,
    fontWeight: 800,
    color: "#0E2A4E",
  },
  heroStatLabel: {
    fontSize: 15,
    fontWeight: 600,
    color: "#1F2937",
  },
  heroStatCopy: {
    fontSize: 14,
    color: "rgba(15, 23, 42, 0.64)",
  },
  heroFootnote: {
    fontSize: 13,
    color: "rgba(15, 23, 42, 0.58)",
  },
  section: {
    padding: "90px 0",
  },
  wrap: {
    width: "min(1100px, 92vw)",
    margin: "0 auto",
    display: "grid",
    gap: 40,
  },
  sectionHeader: {
    display: "grid",
    gap: 14,
    maxWidth: 720,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: 800,
    color: "#0C1F3D",
  },
  sectionLead: {
    fontSize: 18,
    color: "#475569",
    lineHeight: 1.7,
  },
  cardGrid: {
    display: "grid",
    gap: 26,
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  },
  card: {
    background: "#fff",
    borderRadius: 22,
    padding: 28,
    border: "1px solid rgba(148, 163, 184, 0.22)",
    display: "grid",
    gap: 20,
    position: "relative" as const,
    boxShadow: "0 28px 48px rgba(15, 23, 42, 0.08)",
  },
  cardAccent: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    background: "linear-gradient(135deg, #0E2A4E 0%, #1F7AE3 100%)",
  },
  cardIcon: {
    fontSize: 32,
  },
  cardFocus: {
    fontSize: 13,
    textTransform: "uppercase" as const,
    letterSpacing: "0.16em",
    color: "#2563EB",
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: 700,
    color: "#0C1F3D",
  },
  cardText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 1.6,
  },
  cardList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
    gap: 8,
    fontSize: 14,
    color: "#475569",
  },
  deliveryGrid: {
    display: "grid",
    gap: 32,
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    alignItems: "start",
  },
  miniGrid: {
    display: "grid",
    gap: 22,
  },
  miniCard: {
    display: "grid",
    gap: 12,
    padding: 26,
    background: "#F8FBFF",
    borderRadius: 20,
    border: "1px solid rgba(148, 163, 184, 0.2)",
    boxShadow: "0 24px 40px rgba(15, 23, 42, 0.08)",
  },
  miniTitle: {
    fontSize: 19,
    fontWeight: 700,
    color: "#0C1F3D",
  },
  miniText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 1.6,
  },
  deliveryPanel: {
    background: "#fff",
    borderRadius: 24,
    padding: 32,
    color: "#0F172A",
    display: "grid",
    gap: 22,
    border: "1px solid rgba(148, 163, 184, 0.24)",
    boxShadow: "0 35px 60px rgba(15, 23, 42, 0.1)",
  },
  processTitle: {
    fontSize: 21,
    fontWeight: 700,
    color: "#0C1F3D",
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
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "#1D4ED8",
  },
  processStepTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: "#0C1F3D",
  },
  processCopy: {
    fontSize: 15,
    lineHeight: 1.6,
    color: "#475569",
  },
  deliveryQuote: {
    fontSize: 15,
    lineHeight: 1.6,
    color: "rgba(15, 23, 42, 0.7)",
    fontStyle: "italic",
  },
  deliveryQuoteByline: {
    fontSize: 13,
    textTransform: "uppercase" as const,
    letterSpacing: "0.18em",
    color: "#1D4ED8",
  },
  splitSection: {
    display: "grid",
    gap: 26,
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  },
  splitCard: {
    background: "#fff",
    borderRadius: 22,
    padding: 26,
    border: "1px solid rgba(148, 163, 184, 0.24)",
    display: "grid",
    gap: 16,
    boxShadow: "0 28px 50px rgba(15, 23, 42, 0.09)",
  },
  splitIcon: {
    fontSize: 28,
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

const HERO_POINTS = [
  "Crew til havbruk, fiskeri og servicefartøy – klare for avreise",
  "Folk med praktisk sjøerfaring og sikkerhetsfokus",
  "Planer som dekker både drift og uforutsette topper",
];

const HERO_STATS = [
  { value: "150+", label: "aktive sjøfolk", copy: "tilgjengelige for korte og lange oppdrag" },
  { value: "24/7", label: "bemanningsvakt", copy: "vi svarer når driften trenger folk" },
  { value: "48 t", label: "typisk levering", copy: "fra behov til klarert mannskap" },
];

const SERVICES = [
  {
    icon: "🛥️",
    title: "Servicefartøy",
    focus: "Operativ støtte",
    text: "Skippere, styrmenn, matroser og kokker som holder arbeidsbåter og servicefartøy i gang når trykket øker.",
    points: ["Planlagt vedlikehold", "Døgnkontinuerlig drift", "Ekstra mannskap ved prosjekter"],
  },
  {
    icon: "🐟",
    title: "Havbruk",
    focus: "Produksjon på merdkanten",
    text: "Røktere, akvateknikere, fôrings- og laseroperatører som kan rutinene og rytmen i oppdrett.",
    points: ["Røkting og telling", "Smolt- og slaktelogistikk", "Teknisk støtte på merd"],
  },
  {
    icon: "⚓",
    title: "Fiskeri",
    focus: "Sesong og ekspedisjon",
    text: "Sertifisert mannskap til kyst- og havgående fartøy – rigget for sesongtopper og faste ruter.",
    points: ["Skiftplanlegging", "Vaktlister og logistikk", "Lang- og korttidskontrakter"],
  },
];

const DELIVERY_POINTS = [
  {
    icon: "⚓️",
    title: "Folk fra sjøen",
    text: "Vi bemanner for drift, ikke bare vaktlister. Crewene våre har kjent vær, last og ansvar på kroppen.",
  },
  {
    icon: "🤝",
    title: "Treffsikre matcher",
    text: "Vi kombinerer sertifikater og referanser med kultur, holdninger og samarbeidsevne.",
  },
  {
    icon: "📋",
    title: "Papirene i orden",
    text: "Sertifikater, helse og kurs kontrolleres før avreise. Dokumentasjonen følger kandidaten til fartøyet.",
  },
  {
    icon: "📡",
    title: "Oppfølging hele veien",
    text: "Vi holder kontakten gjennom oppdraget og justerer bemanningen hvis vær eller behov endrer seg.",
  },
];

const DELIVERY_STEPS = [
  {
    title: "Kartlegging",
    text: "Vi får oversikt over fartøy, oppgaver og varighet slik at vi vet hvem som passer inn i laget ditt.",
  },
  {
    title: "Utvelgelse",
    text: "Aktuelle kandidater sjekkes mot krav og kultur. Du får korte profiler som er lette å ta stilling til.",
  },
  {
    title: "Oppstart",
    text: "Vi avtaler logistikk, følger opp om bord og sørger for en ryddig avslutning når oppdraget er i mål.",
  },
];

const DELIVERY_QUOTE = {
  text: "«Vi bygger crew som fungerer i praksis. Folk som tåler vær, tempo og ansvar – og som møter opp klare til å levere.»",
  byline: "Isak Didriksson, daglig leder",
};

const NEXT_STEPS = [
  {
    icon: "🧭",
    title: "Registrer kandidat",
    text: "Legg inn erfaring, kurs og tilgjengelighet. Vi tar kontakt når passende oppdrag dukker opp.",
    href: "/kandidat",
  },
  {
    icon: "🛟",
    title: "Meld inn bemanningsbehov",
    text: "Fortell oss om fartøyet, tidsrommet og oppgavene – så matcher vi aktuelle kandidater.",
    href: "/bemanningsbehov",
  },
  {
    icon: "📅",
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
              <div style={styles.heroContent}>
                <span style={styles.heroPill}>Bluecrew – Bemanning til sjøs</span>
                <h1 style={styles.heroTitle}>Rett kompetanse. På rett sted. Til rett tid.</h1>
                <p style={styles.heroLead}>
                  Bluecrew leverer kvalifisert maritim arbeidskraft til havbruksnæringen, fiskeri og servicefartøy. Vi
                  kjenner sjøen, skiftene og menneskene som får drifta til å gå rundt — fordi vi selv har vært der.
                </p>
                <ul style={styles.heroList}>
                  {HERO_POINTS.map((point) => (
                    <li key={point} style={styles.heroListItem}>
                      <span style={styles.heroListIcon}>⚓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
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
                <div style={styles.heroCardHeader}>
                  <span style={styles.heroCardBadge}>Maritim bemanning</span>
                  <h2 style={styles.heroCardTitle}>Trygge crew, klare for avgang</h2>
                </div>
                <div style={styles.heroStats}>
                  {HERO_STATS.map((stat) => (
                    <div key={stat.label} style={styles.heroStat}>
                      <span style={styles.heroStatNumber}>{stat.value}</span>
                      <span style={styles.heroStatLabel}>{stat.label}</span>
                      <span style={styles.heroStatCopy}>{stat.copy}</span>
                    </div>
                  ))}
                </div>
                <p style={styles.heroFootnote}>
                  Oppdrag gjennomføres i tett dialog med rederi og kandidat.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section id="tjenester" style={styles.section}>
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
                  <span aria-hidden style={styles.cardAccent} />
                  <div style={styles.cardIcon}>{service.icon}</div>
                  <h3 style={styles.cardTitle}>{service.title}</h3>
                  {service.focus ? <span style={styles.cardFocus}>{service.focus}</span> : null}
                  <p style={styles.cardText}>{service.text}</p>
                  {service.points ? (
                    <ul style={styles.cardList}>
                      {service.points.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="leveranse" style={{ ...styles.section, background: "#fff" }}>
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
              <aside style={styles.deliveryPanel}>
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
                <p style={styles.deliveryQuote}>{DELIVERY_QUOTE.text}</p>
                <span style={styles.deliveryQuoteByline}>{DELIVERY_QUOTE.byline}</span>
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
                  <span style={styles.splitIcon}>{item.icon}</span>
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
