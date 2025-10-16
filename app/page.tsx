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
  focusSection: {
    background: "#0B1F3A",
    color: "#E2E8F0",
  },
  focusCard: {
    background: "rgba(15, 23, 42, 0.55)",
    border: "1px solid rgba(148, 163, 184, 0.25)",
    color: "#E2E8F0",
  },
  focusText: {
    color: "rgba(226,232,240,0.75)",
  },
  steps: {
    counterReset: "steps" as const,
    display: "grid",
    gap: 18,
  },
  step: {
    display: "grid",
    gap: 10,
    padding: 20,
    borderRadius: 16,
    background: "#fff",
    border: "1px solid #E2E8F0",
  },
  stepNumber: {
    fontSize: 32,
    fontWeight: 800,
    color: "#1D4ED8",
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0F172A",
  },
  stepText: {
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

const VALUE_PROPS = [
  {
    icon: "🧭",
    title: "Fagfolk som forstår sjøen",
    text: "Bluecrew drives av sjøfolk. Vi vet hvilke sertifikater, rutiner og holdninger som trengs om bord.",
  },
  {
    icon: "⚙️",
    title: "Skalerbar bemanning",
    text: "Alt fra enkeltoppdrag til komplette rotasjoner. Vi bygger vaktplaner og følger opp gjennom hele leveransen.",
  },
  {
    icon: "🤝",
    title: "Langsiktige partnerskap",
    text: "Vi setter oss inn i fartøy, prosedyrer og kultur slik at hvert oppdrag bygger videre på forrige suksess.",
  },
];

const SAFETY_ITEMS = [
  {
    icon: "📋",
    title: "Kvalitetssikrede sertifikater",
    text: "STCW, helseerklæring og kurs kontrolleres før utsendelse. Dokumentasjon følger kandidaten til rederiet.",
  },
  {
    icon: "🛰️",
    title: "Kontinuerlig oppfølging",
    text: "Digitale vaktplaner og rapportering sikrer at bemanningen tilpasses endringer i drift og vær.",
  },
  {
    icon: "🛡️",
    title: "HMS i fokus",
    text: "Vi følger norske krav og sørger for at alle oppdrag ivaretar sikkerhet, miljø og kvalitet.",
  },
];

const PROCESS = [
  {
    title: "Behovsavklaring",
    text: "Vi kartlegger fartøy, arbeidsoppgaver og varighet slik at leveransen treffer på både kompetanse og personlighet.",
  },
  {
    title: "Screening og dokumentasjon",
    text: "Kandidater forhåndsvurderes, og vi innhenter sertifikater og referanser før vi presenterer forslag.",
  },
  {
    title: "Oppstart og oppfølging",
    text: "Vi koordinerer oppstart, sørger for onboarding og følger opp både kunde og mannskap underveis.",
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
            <span style={styles.heroPill}>Bemanning • Havbruk • Fiskeri • Servicefartøy</span>
            <h1 style={styles.heroTitle}>Rett mannskap til havbruk, fiskeri og servicefartøy</h1>
            <p style={styles.heroLead}>
              Bluecrew AS leverer sertifisert mannskap med maritim erfaring. Vi kombinerer lokal tilstedeværelse i Harstad
              med raske leveranser langs hele kysten.
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
              <h2 style={styles.sectionTitle}>Hvorfor velge Bluecrew?</h2>
              <p style={styles.sectionLead}>
                Et spesialisert team av sjøfolk, rådgivere og koordinatorer som bygger langvarige samarbeid og leverer kvalitet
                i hvert oppdrag.
              </p>
            </header>
            <div style={styles.cardGrid}>
              {VALUE_PROPS.map((item) => (
                <article key={item.title} style={styles.card}>
                  <div style={styles.cardIcon}>{item.icon}</div>
                  <h3 style={styles.cardTitle}>{item.title}</h3>
                  <p style={styles.cardText}>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="trygghet" style={{ ...styles.section, ...styles.focusSection }}>
          <div style={styles.wrap}>
            <header style={styles.sectionHeader}>
              <h2 style={{ ...styles.sectionTitle, color: "#fff" }}>Trygghet i hver leveranse</h2>
              <p style={{ ...styles.sectionLead, ...styles.focusText }}>
                Sertifiseringer, HMS og oppfølging er grunnlaget for hvert oppdrag. Vi tar ansvar for dokumentasjon og kvalitet
                før, under og etter utsendelse.
              </p>
            </header>
            <div style={styles.cardGrid}>
              {SAFETY_ITEMS.map((item) => (
                <article key={item.title} style={{ ...styles.card, ...styles.focusCard }}>
                  <div style={styles.cardIcon}>{item.icon}</div>
                  <h3 style={{ ...styles.cardTitle, color: "#fff" }}>{item.title}</h3>
                  <p style={{ ...styles.cardText, ...styles.focusText }}>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ ...styles.section, background: "#fff" }}>
          <div style={styles.wrap}>
            <header style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Slik jobber vi</h2>
              <p style={styles.sectionLead}>
                En strukturert prosess som gjør samarbeidet sømløst, enten du trenger enkeltvikarer eller komplett bemanning.
              </p>
            </header>
            <div style={styles.steps}>
              {PROCESS.map((step, index) => (
                <article key={step.title} style={styles.step}>
                  <div style={styles.stepNumber}>{index + 1}</div>
                  <div>
                    <h3 style={styles.stepTitle}>{step.title}</h3>
                    <p style={styles.stepText}>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.section}>
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
