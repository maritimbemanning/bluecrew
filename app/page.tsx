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
    width: "min(1100px, 92vw)",
    margin: "0 auto",
    display: "grid",
    gap: 32,
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
    fontSize: 54,
    fontWeight: 800,
    lineHeight: 1.05,
    maxWidth: 680,
  },
  heroLead: {
    fontSize: 18,
    lineHeight: 1.7,
    color: "rgba(226, 232, 240, 0.9)",
    maxWidth: 640,
  },
  heroSub: {
    fontSize: 16,
    color: "rgba(226, 232, 240, 0.85)",
    maxWidth: 520,
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
    width: "min(1100px, 92vw)",
    margin: "0 auto",
    display: "grid",
    gap: 36,
  },
  sectionHeader: {
    display: "grid",
    gap: 12,
    maxWidth: 720,
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
    padding: 24,
    border: "1px solid #E2E8F0",
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
    gap: 12,
  },
  list: {
    listStyleType: "none" as const,
    padding: 0,
    margin: 0,
    display: "grid",
    gap: 10,
  },
  listItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    fontSize: 15,
    color: "#475569",
    lineHeight: 1.6,
  },
  listIcon: {
    fontSize: 18,
    lineHeight: 1.4,
    color: "#1D4ED8",
  },
  orderedList: {
    listStyleType: "none" as const,
    padding: 0,
    margin: 0,
    display: "grid",
    gap: 14,
  },
  orderedItem: {
    display: "grid",
    gap: 6,
  },
  orderedNumber: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "#E0E7FF",
    color: "#1E3A8A",
    display: "grid",
    placeItems: "center",
    fontWeight: 700,
    fontSize: 16,
  },
  orderedTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#0F172A",
  },
  orderedText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 1.5,
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

const SERVICES = [
  {
    icon: "🛥️",
    title: "Servicefartøy",
    text: "Bemanning til fartøy i havbruk og service, fra skipper og styrmann til matros og kokekyndig personell.",
  },
  {
    icon: "🐟",
    title: "Havbruk",
    text: "Operativt personell, akvateknikere, fôrings- og laseroperatører med erfaring fra norsk oppdrett.",
  },
  {
    icon: "⚓",
    title: "Fiskeri",
    text: "Rask tilgang på mannskap til kyst- og havgående fartøy, korttidsoppdrag og sesongtopper.",
  },
];

const BLUECREW_PILLARS = [
  {
    icon: "⚓️",
    title: "Vi bemanner for drift",
    text: "Hos Bluecrew møter du sjøfolk med praktisk erfaring fra havbruk, fiskeri og servicefartøy.",
  },
  {
    icon: "🌊",
    title: "Kjenner havet",
    text: "Vi leverer kvalifisert maritim arbeidskraft til havbruksnæringen, fiskeri og servicefartøy – raskt og presist.",
  },
  {
    icon: "🧭",
    title: "Rett folk på rett sted",
    text: "Personell matches på kompetanse, holdninger og samarbeidsevne – ikke bare papirer.",
  },
  {
    icon: "🤝",
    title: "Tett oppfølging",
    text: "Du får et fast team som kjenner skiftene dine og følger opp hver rotasjon.",
  },
];

const TRUST_POINTS = [
  "Sertifikater, helse og kurs kontrolleres før utsendelse.",
  "HMS og rapportering følges opp sammen med oppdragsgiver.",
  "Vi holder dialogen med mannskapet gjennom hele oppdraget.",
];

const PROCESS = [
  {
    title: "Kartlegging av behov",
    text: "Vi avklarer fartøy, skift og varighet slik at bemanningen treffer fra dag én.",
  },
  {
    title: "Utvalg av sjøfolk",
    text: "Kandidater vurderes på erfaring, holdninger og samspill – ikke bare papirer.",
  },
  {
    title: "Oppstart og oppfølging",
    text: "Vi koordinerer oppstart og er tilgjengelige for justeringer underveis.",
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
            <span style={styles.heroPill}>Bluecrew – Bemanning til sjøs</span>
            <h1 style={styles.heroTitle}>Rett kompetanse. På rett sted. Til rett tid.</h1>
            <p style={styles.heroLead}>
              Bluecrew leverer kvalifisert maritim arbeidskraft til havbruksnæringen, fiskeri og servicefartøy. Vi kjenner
              sjøen, skiftene og menneskene som får drifta til å gå rundt — fordi vi selv har vært der.
            </p>
            <p style={styles.heroSub}>
              ⚓️ Vi bemanner for drift, ikke bare vaktlister.
            </p>
            <div style={styles.heroCtas}>
              <Link href="/kandidat" style={{ ...styles.heroBtn, ...styles.btnPrimary }}>
                Registrer kandidat
              </Link>
              <Link href="/bemanningsbehov" style={{ ...styles.heroBtn, ...styles.btnSecondary }}>
                Meld inn behov
              </Link>
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
                  <div style={styles.cardIcon}>{service.icon}</div>
                  <h3 style={styles.cardTitle}>{service.title}</h3>
                  <p style={styles.cardText}>{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="fordeler" style={{ ...styles.section, background: "#fff" }}>
          <div style={styles.wrap}>
            <header style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Derfor velger rederiene Bluecrew</h2>
              <p style={styles.sectionLead}>
                Vi leverer folk som kjenner havet, skiftene og rutinene som holder driften i gang. Her er hva du får med oss på
                laget.
              </p>
            </header>
            <div style={styles.cardGrid}>
              {BLUECREW_PILLARS.map((item) => (
                <article key={item.title} style={styles.card}>
                  <div style={styles.cardIcon}>{item.icon}</div>
                  <h3 style={styles.cardTitle}>{item.title}</h3>
                  <p style={styles.cardText}>{item.text}</p>
                </article>
              ))}
            </div>
            <div style={styles.splitSection}>
              <article style={styles.splitCard}>
                <h3 style={styles.cardTitle}>Trygghet i hver leveranse</h3>
                <p style={styles.cardText}>
                  Vi tar ansvar for papirene og følger opp folkene dine slik at oppdraget flyter fra første skift.
                </p>
                <ul style={styles.list}>
                  {TRUST_POINTS.map((point) => (
                    <li key={point} style={styles.listItem}>
                      <span style={styles.listIcon}>✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <article style={styles.splitCard}>
                <h3 style={styles.cardTitle}>Slik jobber vi</h3>
                <p style={styles.cardText}>
                  En enkel prosess der vi holder deg oppdatert fra første samtale til ferdig bemanning.
                </p>
                <ol style={styles.orderedList}>
                  {PROCESS.map((step, index) => (
                    <li key={step.title} style={styles.orderedItem}>
                      <span style={styles.orderedNumber}>{index + 1}</span>
                      <div>
                        <div style={styles.orderedTitle}>{step.title}</div>
                        <div style={styles.orderedText}>{step.text}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
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
