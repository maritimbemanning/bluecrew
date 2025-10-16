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
  heroTagline: {
    fontSize: 22,
    fontWeight: 700,
    color: "#BFDBFE",
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
  approachPanel: {
    background: "#0B1F3A",
    borderRadius: 20,
    padding: 26,
    color: "#E2E8F0",
    display: "grid",
    gap: 18,
  },
  approachTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#fff",
  },
  approachList: {
    display: "grid",
    gap: 16,
  },
  approachItem: {
    display: "grid",
    gap: 6,
  },
  approachNumber: {
    fontSize: 15,
    fontWeight: 700,
    color: "#BFDBFE",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
  },
  approachText: {
    fontSize: 15,
    color: "rgba(226,232,240,0.85)",
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

const WHY_BLUECREW = [
  {
    icon: "⚓️",
    title: "Folk fra sjøen",
    text: "Teamet vårt har selv stått i skiftene. Vi vet hvem som fungerer på dekk og i merden.",
  },
  {
    icon: "🧑‍✈️",
    title: "Rett match",
    text: "Vi kobler kompetanse, holdninger og samarbeidsevne – ikke bare CV og sertifikatnummer.",
  },
  {
    icon: "⚙️",
    title: "Smidige leveranser",
    text: "Fra enkeltoppdrag til komplette rotasjoner. Vi stiller opp når planene endrer seg.",
  },
  {
    icon: "📡",
    title: "Én linje inn",
    text: "Du får en fast kontaktperson som følger opp mannskapet og holder deg oppdatert.",
  },
];

const DELIVERY_STEPS = [
  {
    title: "Vi avklarer behovet",
    text: "Kort prat om fartøy, sesong og mål. Da finner vi riktig profil fra første forespørsel.",
  },
  {
    title: "Vi håndplukker folkene",
    text: "Vi ringer nettverket vårt, kontrollerer papirer og sender bare kandidater vi kan gå god for.",
  },
  {
    title: "Vi følger opp underveis",
    text: "Logistikk, rapporter og tilbakemeldinger. Du kan fokusere på drift, vi tar resten.",
  },
];

const NEXT_STEPS = [
  {
    title: "Registrer kandidat",
    text: "Fortell oss hvor du trives best og når du er klar for neste tur. Vi ringer deg når riktig oppdrag dukker opp.",
    href: "/kandidat",
  },
  {
    title: "Meld inn bemanningsbehov",
    text: "Del hva slags fartøy og oppgaver du trenger folk til, så finner vi laget som passer fra dag én.",
    href: "/bemanningsbehov",
  },
  {
    title: "Book en rådgiver",
    text: "Vil du sparre om bemanningsplaner eller kursbehov? Avtal en prat direkte med oss.",
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
            <h1 style={styles.heroTitle}>Bluecrew – Bemanning til sjøs</h1>
            <p style={styles.heroTagline}>Rett kompetanse. På rett sted. Til rett tid.</p>
            <p style={styles.heroLead}>
              Bluecrew leverer kvalifisert maritim arbeidskraft til havbruksnæringen, fiskeri og servicefartøy. Vi kjenner
              sjøen, skiftene og menneskene som holder driften i gang — fordi vi selv har vært der.
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

        <section id="hvorfor" style={{ ...styles.section, background: "#F8FAFC" }}>
          <div style={styles.wrap}>
            <header style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Hvorfor folk velger Bluecrew</h2>
              <p style={styles.sectionLead}>
                Bluecrew leverer kvalifiserte sjøfolk til havbruk, fiskeri og servicefartøy. Vi bemanner for drift, ikke bare for å fylle en liste, og vi står sammen med deg når vær og planer endrer seg.
              </p>
            </header>
            <div style={styles.cardGrid}>
              {WHY_BLUECREW.map((item) => (
                <article key={item.title} style={styles.card}>
                  <div style={styles.cardIcon}>{item.icon}</div>
                  <h3 style={styles.cardTitle}>{item.title}</h3>
                  <p style={styles.cardText}>{item.text}</p>
                </article>
              ))}
            </div>
            <aside style={styles.approachPanel}>
              <h3 style={styles.approachTitle}>Slik får du oss på laget</h3>
              <div style={styles.approachList}>
                {DELIVERY_STEPS.map((step, index) => (
                  <div key={step.title} style={styles.approachItem}>
                    <span style={styles.approachNumber}>{`Steg ${index + 1}`}</span>
                    <div>
                      <h4 style={{ ...styles.cardTitle, color: "#fff" }}>{step.title}</h4>
                      <p style={styles.approachText}>{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>



        <section id="neste" style={styles.section}>
          <div style={styles.wrap}>
            <header style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Neste steg</h2>
              <p style={styles.sectionLead}>
                Velg veien som passer deg best. Vi tar kontakt så snart vi har mottatt skjemaet eller forespørselen din.
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
