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
  heroBody: {
    display: "grid",
    gap: 12,
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
  statement: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: 18,
    padding: 26,
    borderRadius: 20,
    background: "linear-gradient(135deg, #DBEAFE 0%, #E0E7FF 100%)",
    border: "1px solid #BFDBFE",
    alignItems: "start",
  },
  statementIcon: {
    fontSize: 36,
  },
  statementTitle: {
    fontSize: 22,
    fontWeight: 800,
    color: "#0B1F3A",
  },
  statementText: {
    fontSize: 16,
    color: "#1E293B",
    lineHeight: 1.6,
  },
  flowList: {
    display: "grid",
    gap: 16,
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  },
  flowItem: {
    background: "#F8FAFC",
    borderRadius: 18,
    padding: 20,
    border: "1px solid #E2E8F0",
    display: "grid",
    gap: 10,
  },
  flowNumber: {
    fontSize: 18,
    fontWeight: 700,
    color: "#1D4ED8",
  },
  flowTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#0F172A",
  },
  flowText: {
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

const BLUECREW_PILLARS = [
  {
    icon: "🌊",
    title: "Sjøfolk i ryggen",
    text: "Teamet vårt har selv seilt og jobbet i oppdrett. Vi vet hvordan hverdagen om bord ser ut.",
  },
  {
    icon: "📜",
    title: "Papirene i orden",
    text: "Vi dobbeltsjekker sertifikater, helse og kurs før utsendelse, så du slipper overraskelser.",
  },
  {
    icon: "🤝",
    title: "Oppfølging hele veien",
    text: "Fast kontaktperson, raske svar og oppfølging av både kunde og mannskap gjennom hele oppdraget.",
  },
];

const BLUECREW_FLOW = [
  {
    title: "Kartlegg behovet",
    text: "Du forteller oss om fartøyet, tidsrommet og oppgavene. Vi foreslår en plan på dagen.",
  },
  {
    title: "Match og avklaring",
    text: "Vi presenterer kandidater med riktig erfaring og personlighet, og avklarer logistikken sammen.",
  },
  {
    title: "Om bord og videre",
    text: "Oppstart, rapportering og utskiftninger håndteres av oss – du beholder fokuset på drift.",
  },
];

const NEXT_STEPS = [
  {
    title: "Registrer kandidat",
    text: "Del erfaring, sertifikater og tilgjengelighet – så matcher vi deg med oppdrag som passer.",
    href: "/kandidat",
  },
  {
    title: "Meld inn bemanningsbehov",
    text: "Gi oss et bilde av fartøy, tidsperiode og arbeidsoppgaver. Vi sender forslag på mannskap.",
    href: "/bemanningsbehov",
  },
  {
    title: "Book en rådgiver",
    text: "Trenger du sparring rundt bemanningsplaner eller langsiktig samarbeid? Avtal en prat.",
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
            <div style={styles.heroBody}>
              <p style={styles.heroLead}>
                Bluecrew leverer kvalifisert maritim arbeidskraft til havbruk, fiskeri og servicefartøy.
              </p>
              <p style={styles.heroLead}>
                Vi kjenner sjøen, skiftene og menneskene som får drifta til å gå rundt — fordi vi selv har vært der.
              </p>
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
            <header style={{ ...styles.sectionHeader, gap: 16 }}>
              <h2 style={styles.sectionTitle}>Derfor Bluecrew</h2>
              <div style={{ display: "grid", gap: 8 }}>
                <p style={styles.sectionLead}>
                  Bluecrew leverer kvalifisert maritim arbeidskraft til havbruk, fiskeri og servicefartøy.
                </p>
                <p style={styles.sectionLead}>
                  Vi kjenner sjøen, skiftene og menneskene som får drifta til å gå rundt – og vi deler erfaringen med deg.
                </p>
              </div>
            </header>
            <article style={styles.statement}>
              <div style={styles.statementIcon}>⚓️</div>
              <div style={{ display: "grid", gap: 8 }}>
                <h3 style={styles.statementTitle}>Vi bemanner for drift, ikke bare vaktlister</h3>
                <p style={styles.statementText}>
                  Hos Bluecrew finner du folk med praktisk erfaring fra sjøen, oppdrett og maritime fartøy.
                </p>
                <p style={styles.statementText}>
                  Vi matcher personell basert på kompetanse, holdninger og samarbeidsevne – ikke bare papirer.
                </p>
              </div>
            </article>
            <div style={styles.cardGrid}>
              {BLUECREW_PILLARS.map((item) => (
                <article key={item.title} style={styles.card}>
                  <div style={styles.cardIcon}>{item.icon}</div>
                  <h3 style={styles.cardTitle}>{item.title}</h3>
                  <p style={styles.cardText}>{item.text}</p>
                </article>
              ))}
            </div>
            <div style={{ display: "grid", gap: 16 }}>
              <div style={{ display: "grid", gap: 8 }}>
                <h3 style={{ ...styles.cardTitle, fontSize: 22 }}>Slik jobber vi</h3>
                <p style={styles.sectionLead}>
                  Tre enkle steg fra første telefon til fullt bemannet skiftlag.
                </p>
              </div>
              <div style={styles.flowList}>
                {BLUECREW_FLOW.map((step, index) => (
                  <article key={step.title} style={styles.flowItem}>
                    <span style={styles.flowNumber}>{index + 1}.</span>
                    <h4 style={styles.flowTitle}>{step.title}</h4>
                    <p style={styles.flowText}>{step.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="neste" style={styles.section}>
          <div style={styles.wrap}>
            <header style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Neste steg</h2>
              <p style={styles.sectionLead}>
                Velg hvordan du vil komme i gang. Vi svarer raskt når du sender inn skjema eller booker en prat.
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
