import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const styles = {
  page: {
    background: "#F8FAFC",
    minHeight: "100vh",
  },
  hero: {
    padding: "120px 0 96px",
    background: "linear-gradient(135deg, #0B1F3A 0%, #1D4ED8 100%)",
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
    gap: 40,
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    alignItems: "center",
  },
  heroContent: {
    display: "grid",
    gap: 26,
    maxWidth: 620,
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 20px",
    borderRadius: 999,
    background: "rgba(15, 23, 42, 0.12)",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: "rgba(248, 250, 252, 0.9)",
  },
  heroTitle: {
    fontSize: 56,
    fontWeight: 800,
    lineHeight: 1.04,
    color: "#F8FAFC",
  },
  heroLead: {
    fontSize: 19,
    lineHeight: 1.7,
    color: "rgba(226, 232, 240, 0.92)",
  },
  heroList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
    gap: 12,
    fontSize: 16,
    color: "rgba(226, 232, 240, 0.85)",
  },
  heroListItem: {
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
  },
  heroListIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: "50%",
    background: "rgba(15, 23, 42, 0.25)",
    fontSize: 15,
    color: "#F8FAFC",
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
    boxShadow: "0 18px 32px rgba(15, 23, 42, 0.18)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  btnPrimary: {
    background: "#F8FAFC",
    color: "#0B1F3A",
  },
  btnSecondary: {
    background: "rgba(15, 23, 42, 0.28)",
    color: "#F8FAFC",
    border: "1px solid rgba(248, 250, 252, 0.45)",
  },
  heroCard: {
    background: "#FFFFFF",
    borderRadius: 28,
    border: "1px solid rgba(226, 232, 240, 0.8)",
    padding: 32,
    display: "grid",
    gap: 20,
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.18)",
  },
  heroCardHeader: {
    display: "grid",
    gap: 6,
  },
  heroCardBadge: {
    fontSize: 12,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: "#2563EB",
  },
  heroCardTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#0B1F3A",
  },
  heroStats: {
    display: "grid",
    gap: 18,
  },
  heroStat: {
    display: "grid",
    gap: 4,
  },
  heroStatNumber: {
    fontSize: 34,
    fontWeight: 800,
    color: "#1E3A8A",
  },
  heroStatLabel: {
    fontSize: 15,
    fontWeight: 700,
    color: "#1E293B",
  },
  heroStatCopy: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 1.6,
  },
  heroFootnote: {
    fontSize: 13,
    color: "#64748B",
  },
  section: {
    padding: "90px 0",
  },
  wrap: {
    width: "min(1100px, 92vw)",
    margin: "0 auto",
    display: "grid",
    gap: 42,
  },
  sectionHeader: {
    display: "grid",
    gap: 14,
    maxWidth: 720,
  },
  sectionTitle: {
    fontSize: 38,
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
    gap: 28,
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  },
  card: {
    background: "#FFFFFF",
    borderRadius: 22,
    padding: 28,
    border: "1px solid rgba(226, 232, 240, 0.8)",
    display: "grid",
    gap: 18,
    boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
  },
  cardAccent: {
    height: 4,
    borderRadius: 999,
    background: "linear-gradient(135deg, #0B1F3A 0%, #1D4ED8 100%)",
    width: 56,
  },
  cardIcon: {
    fontSize: 30,
  },
  cardFocus: {
    fontSize: 13,
    textTransform: "uppercase" as const,
    letterSpacing: "0.16em",
    color: "#2563EB",
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
  cardList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
    gap: 6,
    fontSize: 14,
    color: "#475569",
  },
  deliveryLayout: {
    display: "grid",
    gap: 32,
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    alignItems: "start",
  },
  differenceList: {
    display: "grid",
    gap: 18,
  },
  differenceCard: {
    background: "#FFFFFF",
    borderRadius: 18,
    padding: 24,
    border: "1px solid rgba(226, 232, 240, 0.8)",
    display: "grid",
    gap: 10,
    boxShadow: "0 16px 36px rgba(15, 23, 42, 0.08)",
  },
  differenceTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#0B1F3A",
  },
  differenceText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 1.6,
  },
  timeline: {
    background: "#FFFFFF",
    borderRadius: 22,
    border: "1px solid rgba(226, 232, 240, 0.8)",
    padding: 30,
    display: "grid",
    gap: 22,
    boxShadow: "0 20px 44px rgba(15, 23, 42, 0.1)",
  },
  timelineTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0B1F3A",
  },
  timelineList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
    gap: 18,
  },
  timelineItem: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: 16,
    alignItems: "start",
  },
  timelineBadge: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #0B1F3A 0%, #1D4ED8 100%)",
    color: "#F8FAFC",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
  },
  timelineStep: {
    display: "grid",
    gap: 6,
  },
  timelineStepTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#0B1F3A",
  },
  timelineStepText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 1.6,
  },
  timelineQuote: {
    fontSize: 15,
    color: "#334155",
    lineHeight: 1.6,
  },
  timelineByline: {
    fontSize: 13,
    textTransform: "uppercase" as const,
    letterSpacing: "0.2em",
    color: "#2563EB",
  },
  splitSection: {
    display: "grid",
    gap: 24,
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  },
  splitCard: {
    background: "#FFFFFF",
    borderRadius: 20,
    padding: 26,
    border: "1px solid rgba(226, 232, 240, 0.8)",
    display: "grid",
    gap: 14,
    boxShadow: "0 18px 36px rgba(15, 23, 42, 0.08)",
  },
  splitIcon: {
    fontSize: 26,
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
  "Bemanning til havbruk, fiskeri og servicefartøy",
  "Rask mobilisering – vi kjenner kravene om bord",
  "Sjøfolk som matcher kultur, sikkerhet og tempo",
];

const HERO_STATS = [
  { value: "150+", label: "aktive sjøfolk", copy: "klare for korte og lange oppdrag" },
  { value: "24/7", label: "bemanningsvakt", copy: "vi svarer når driften trenger folk" },
  { value: "48 t", label: "typisk levering", copy: "fra behov til klarert mannskap" },
];

const SERVICES = [
  {
    icon: "🛥️",
    title: "Servicefartøy",
    focus: "Operasjoner og daglig drift",
    text: "Skipper, styrmann, matros og kokekyndig personell som holder trykket oppe på service- og arbeidsbåter.",
    points: ["Planlagt vedlikehold", "Døgnkontinuerlig drift", "Kortvarige ekstraoppdrag"],
  },
  {
    icon: "🐟",
    title: "Havbruk",
    focus: "Produksjon på merdkanten",
    text: "Operative crew, akvateknikere, fôrings- og laseroperatører som kjenner rytmen i oppdrett.",
    points: ["Røkting og telling", "Fangst og sortering", "Teknisk støtte"],
  },
  {
    icon: "⚓",
    title: "Fiskeri",
    focus: "Sesong og ekspedisjon",
    text: "Rederier får rask tilgang til sertifisert mannskap for kyst- og havgående fartøy.",
    points: ["Skiftplanlegging", "Vaktlister og logistikk", "Lang- og korttidskontrakter"],
  },
];

const DIFFERENCE_POINTS = [
  {
    icon: "⚓️",
    title: "Folk med sjøbein",
    text: "Vi bemanner for drift – ikke bare for å fylle vakter. Crewene våre har stått i skiftene selv.",
  },
  {
    icon: "🤝",
    title: "Treffsikre matcher",
    text: "Vi kjenner kulturene om bord og matcher personer på kompetanse, holdninger og samarbeidsevne.",
  },
  {
    icon: "📋",
    title: "Papirene i orden",
    text: "Sertifikater, helse og kurs sjekkes før avreise. Dokumentasjonen følger kandidaten hele veien.",
  },
  {
    icon: "📡",
    title: "Oppfølging underveis",
    text: "Vi holder kontakten gjennom oppdraget, og skalerer bemanningen når behovet endrer seg.",
  },
];

const PROCESS_STEPS = [
  {
    title: "Kartlegging",
    text: "Vi får oversikt over fartøy, oppgaver og tidsrom slik at vi vet hvem som passer om bord.",
  },
  {
    title: "Utvelgelse",
    text: "Kandidater sjekkes mot kravene. Du får forslag med korte profiler du kan ta stilling til.",
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
                <span style={styles.heroBadge}>Bluecrew – Bemanning til sjøs</span>
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
                  <h2 style={styles.heroCardTitle}>Trygge crew klare for avgang</h2>
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
                <p style={styles.heroFootnote}>Oppdrag gjennomføres i tett dialog med rederi og kandidat.</p>
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
                  <span style={styles.cardAccent} aria-hidden />
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

        <section id="leveranse" style={{ ...styles.section, background: "#EEF2FF" }}>
          <div style={styles.wrap}>
            <header style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Derfor velger rederiene Bluecrew</h2>
              <p style={styles.sectionLead}>
                Crewene våre kommer ferdig klarert, og vi følger opp helt til oppdraget er i mål. Det gir ro i drifta og
                forutsigbar bemanning – uansett vær og skift.
              </p>
            </header>
            <div style={styles.deliveryLayout}>
              <div style={styles.differenceList}>
                {DIFFERENCE_POINTS.map((item) => (
                  <article key={item.title} style={styles.differenceCard}>
                    <span style={styles.cardIcon}>{item.icon}</span>
                    <h3 style={styles.differenceTitle}>{item.title}</h3>
                    <p style={styles.differenceText}>{item.text}</p>
                  </article>
                ))}
              </div>
              <aside style={styles.timeline}>
                <h3 style={styles.timelineTitle}>Fra behov til bemanning</h3>
                <ol style={styles.timelineList}>
                  {PROCESS_STEPS.map((step, index) => (
                    <li key={step.title} style={styles.timelineItem}>
                      <span style={styles.timelineBadge}>{index + 1}</span>
                      <div style={styles.timelineStep}>
                        <span style={styles.timelineStepTitle}>{step.title}</span>
                        <p style={styles.timelineStepText}>{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p style={styles.timelineQuote}>{DELIVERY_QUOTE.text}</p>
                <span style={styles.timelineByline}>{DELIVERY_QUOTE.byline}</span>
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
