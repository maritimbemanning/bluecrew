import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import { sx } from "./styles";

const SERVICE_AREAS = [
  {
    icon: "🛥️",
    title: "Servicefartøy",
    points: [
      "Skippere, styrmenn og dekksmannskap",
      "Operativ støtte til ROV, kran og vedlikehold",
      "Korttidsrotasjoner og faste avtaler",
    ],
  },
  {
    icon: "🐟",
    title: "Havbruk",
    points: [
      "Driftsoperatører og akvateknikere",
      "Laser- og fôringsoperatører",
      "Team til topphøsting og prosjekter",
    ],
  },
  {
    icon: "⚓",
    title: "Fiskeri",
    points: [
      "Skippere/Styrmenn til kyst- og havfiske",
      "Erfarne matroser og motormenn",
      "Sesong- og beredskapsbemanning",
    ],
  },
];

const CTA_PANELS = [
  {
    icon: "👩‍✈️",
    title: "Jeg er sjøfolk",
    text: "Registrer kompetansen din og få tilbud på relevante oppdrag. Vi følger deg opp gjennom hele engasjementet.",
    href: "/kandidat",
    action: "Registrer kandidat",
  },
  {
    icon: "🛳️",
    title: "Jeg trenger mannskap",
    text: "Fortell oss hva du trenger. Vi matcher sertifisert personell og håndterer logistikken fra første vakt.",
    href: "/bemanningsbehov",
    action: "Meld inn bemanningsbehov",
  },
];

const HERO_PILLS = [
  "Turnusoppfølging 24/7",
  "STCW-verifisert mannskap",
  "Dekker hele kysten",
  "Basert i Harstad",
];

const BENEFITS = [
  {
    icon: "🧭",
    title: "Bransjeerfaring",
    text: "Teamet ledes av sjøfolk som kjenner norsk kystfart, havbruk og fiskeri fra innsiden.",
  },
  {
    icon: "⚙️",
    title: "Fleksible leveranser",
    text: "Vi håndterer alt fra korttidsoppdrag til helbemanning av fartøy – med fokus på tempo og kvalitet.",
  },
  {
    icon: "🛡️",
    title: "Kvalitet & HMS",
    text: "Grundig verifisering av kompetanse og sertifikater sikrer trygghet for både mannskap og rederi.",
  },
];

const ASSURANCES = [
  {
    icon: "📋",
    title: "Dokumentert kompetanse",
    text: "Vi kontrollerer STCW, fagbrev og helseerklæringer før utsendelse slik at du får mannskap som er klar for inspeksjon.",
  },
  {
    icon: "🛰️",
    title: "Vaktplaner i sanntid",
    text: "Digital oppfølging av rotasjoner og beredskap gjør at vi raskt fyller hull og holder deg oppdatert om tilgjengelighet.",
  },
  {
    icon: "🤝",
    title: "Langsiktige partnerskap",
    text: "Vi setter oss inn i fartøy, rutiner og HMS-krav slik at hvert oppdrag bygger videre på forrige leveranse.",
  },
];

const PROCESS_STEPS = [
  {
    title: "Behovsanalyse",
    text: "Vi kartlegger bemanningsbehov, krav til sertifikater og ønsket oppstart i dialog med deg.",
  },
  {
    title: "Screening og verifisering",
    text: "Kandidater intervjuers, referansesjekkes og sertifikater kontrolleres før de presenteres.",
  },
  {
    title: "Match & presentasjon",
    text: "Du får et kortfattet kandidatoppsett med tilgjengelighet, erfaring og nøkkelkompetanse.",
  },
  {
    title: "Oppfølging om bord",
    text: "Vi følger opp begge parter underveis og justerer ved behov for å sikre smidige leveranser.",
  },
];

const RECENT_ASSIGNMENTS = [
  {
    stat: "48 timer",
    label: "Leveringstid",
    title: "Servicekatamaran i Troms",
    text: "To matroser og én skipper til havbruksoperasjoner, inkludert sertifikatkontroll og logistikk til base.",
  },
  {
    stat: "6 mnd",
    label: "Varighet",
    title: "Fiskefartøy på Finnmarkskysten",
    text: "Styrmann og motormann i rotasjon med komplett oppfølging av hviletid og rapportering.",
  },
  {
    stat: "12 crew",
    label: "Pool",
    title: "Bemanning for beredskapsselskap",
    text: "Skalerbar kandidatpool med sertifiserte ROV-operatører og dekkspersonell klar på kort varsel.",
  },
];

const FAQS = [
  {
    q: "Hvordan registrerer jeg meg som kandidat?",
    a: "Gå til siden «Kandidat» og fyll ut skjemaet med kontaktinfo, sertifikater og tilgjengelighet. Vi tar kontakt så snart vi har et oppdrag som matcher profilen din.",
  },
  {
    q: "Hva skjer etter at jeg sender inn bemanningsbehov?",
    a: "Du får en bekreftelse på e-post, og vi kontakter deg for å avklare detaljer før vi presenterer aktuelle kandidater.",
  },
  {
    q: "Leverer dere personell over hele landet?",
    a: "Ja, vi mobiliserer mannskap langs hele kysten og tilrettelegger reise og losji ved behov.",
  },
  {
    q: "Hvilke sertifikater håndterer dere?",
    a: "Vi følger gjeldende krav til STCW, helseerklæringer, sikkerhetskurs og fagbrev. Dokumentasjon verifiseres før utsendelse.",
  },
];

export default function Page() {
  return (
    <main style={sx.page}>
      <SiteHeader current="home" />

      <section style={sx.hero}>
        <div style={sx.heroWrap}>
          <div style={sx.heroPill}>Bemanning • Havbruk • Fiskeri • Servicefartøy</div>
          <h1 style={sx.h1}>Bluecrew – Bemanning til sjøs</h1>
          <p style={sx.h1Sub}>
            Rett kompetanse, på rett sted, til rett tid. Bluecrew AS leverer erfarent
            mannskap til fartøy langs hele kysten med personlig oppfølging fra Harstad.
          </p>

          <div style={sx.ctaRow}>
            <Link href="/kandidat" style={sx.btnMain}>
              Registrer kandidat
            </Link>
            <Link href="/bemanningsbehov" style={sx.btnMain}>
              Meld inn bemanningsbehov
            </Link>
            <Link
              href="#kontakt"
              style={{
                ...sx.btnMain,
                background: "#fff",
                color: "#0B1F3A",
                borderColor: "#0B1F3A",
                boxShadow: "0 6px 18px rgba(2,6,23,0.08)",
              }}
            >
              Snakk med oss
            </Link>
          </div>

          <div style={sx.pillList}>
            {HERO_PILLS.map((pill) => (
              <span key={pill} style={sx.pill}>
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="tjenester" style={{ ...sx.section, background: "#fff" }}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={sx.h2}>Våre tjenester</h2>
            <p style={sx.leadSmall}>
              Bemanning og rekruttering til havbruk, fiskeri og servicefartøy — raskt,
              trygt og ryddig.
            </p>
          </div>

          <div style={sx.cards3}>
            {SERVICE_AREAS.map((area) => (
              <article key={area.title} style={sx.cardService}>
                <div style={sx.cardIcon} aria-hidden="true">
                  {area.icon}
                </div>
                <div style={sx.cardTitle}>{area.title}</div>
                <ul style={sx.cardList}>
                  {area.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={sx.section}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={sx.h2}>Velg snarvei</h2>
            <p style={sx.muted}>
              Skjemaene ligger på egne sider slik at du kan fokusere på informasjonen
              som er relevant for deg.
            </p>
          </div>

          <div style={sx.ctaGrid}>
            {CTA_PANELS.map((panel) => (
              <article key={panel.title} style={sx.ctaCard}>
                <div style={sx.ctaIcon} aria-hidden="true">
                  {panel.icon}
                </div>
                <h3 style={sx.ctaTitle}>{panel.title}</h3>
                <p style={sx.ctaText}>{panel.text}</p>
                <Link href={panel.href} style={{ ...sx.btnMain, textAlign: "center" }}>
                  {panel.action}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="fordeler" style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={sx.h2}>Hvorfor velge Bluecrew?</h2>
            <p style={sx.leadSmall}>
              Vi kombinerer sjøfolkets erfaring med moderne bemanningsprosesser for å
              levere kvalitet fra første kontakt.
            </p>
          </div>

          <div style={sx.featureGrid}>
            {BENEFITS.map((benefit) => (
              <article key={benefit.title} style={sx.featureCard}>
                <div style={sx.featureIcon} aria-hidden="true">
                  {benefit.icon}
                </div>
                <h3 style={sx.featureTitle}>{benefit.title}</h3>
                <p style={sx.featureText}>{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={sx.sectionDeep}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ ...sx.h2, color: "#fff" }}>Sertifisert trygghet</h2>
            <p style={{ ...sx.muted, color: "rgba(226,232,240,0.85)" }}>
              Kontroll av sertifikater, sikkerhetskurs og beredskapsplaner sikrer at
              crewet ditt er revisjonsklart fra dag én.
            </p>
          </div>

          <div style={sx.assuranceGrid}>
            {ASSURANCES.map((item) => (
              <article key={item.title} style={sx.assuranceCard}>
                <div style={sx.assuranceIcon} aria-hidden="true">
                  {item.icon}
                </div>
                <h3 style={sx.assuranceTitle}>{item.title}</h3>
                <p style={sx.assuranceText}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="slik-jobber-vi" style={sx.section}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={sx.h2}>Slik jobber vi</h2>
            <p style={sx.muted}>
              Fire steg som sikrer trygg leveranse for både kandidat og kunde.
            </p>
          </div>

          <ol style={sx.processGrid}>
            {PROCESS_STEPS.map((step, index) => (
              <li key={step.title} style={sx.processStep}>
                <div style={sx.stepNumber}>{index + 1}</div>
                <div style={sx.stepBody}>
                  <h3 style={sx.stepTitle}>{step.title}</h3>
                  <p style={sx.stepText}>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section style={{ ...sx.section, background: "#fff" }}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={sx.h2}>Oppdrag vi nylig har løst</h2>
            <p style={sx.muted}>
              Et utvalg av leveranser som viser bredden i maritime tjenester vi dekker.
            </p>
          </div>

          <div style={sx.statGrid}>
            {RECENT_ASSIGNMENTS.map((assignment) => (
              <article key={assignment.title} style={sx.statCard}>
                <p style={sx.statLabel}>{assignment.label}</p>
                <h3 style={sx.statValue}>{assignment.stat}</h3>
                <h4 style={sx.ctaTitle}>{assignment.title}</h4>
                <p style={sx.statBody}>{assignment.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="om-oss" style={{ ...sx.section, background: "#F8FAFC" }}>
        <div style={sx.wrapNarrow}>
          <h2 style={sx.h2}>Om Bluecrew</h2>
          <p style={sx.muted}>
            Bluecrew er et norsk bemannings- og rekrutteringsbyrå spesialisert innen
            maritim sektor. Vi leverer kvalifisert personell til havbruk, fiskeri og
            servicefartøy — fra dekk til bro.
          </p>

          <p style={sx.muted}>
            Selskapet drives av sjøfolk med erfaring fra norsk kystfart og
            oppdrettsnæring. Vi vet hva som kreves om bord, og vi vet hvor viktig det er
            med rett kompetanse til rett tid.
          </p>

          <p style={sx.muted}>
            Gjennom et tett samarbeid med både mannskap og rederi sørger vi for
            kvalitet, trygghet og fleksibilitet i alle oppdrag. Våre prosesser er enkle,
            ryddige og tilpasset kravene i norsk maritim drift.
          </p>
        </div>
      </section>

      <section id="faq" style={sx.section}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h2 style={sx.h2}>Vanlige spørsmål</h2>
            <p style={sx.muted}>
              Finner du ikke svaret her? Ta kontakt, så hjelper vi deg videre.
            </p>
          </div>

          <div style={sx.faqList}>
            {FAQS.map((faq) => (
              <details key={faq.q} style={sx.faqItem}>
                <summary style={sx.faqSummary}>{faq.q}</summary>
                <p style={sx.faqContent}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" style={{ ...sx.section, background: "#fff" }}>
        <div style={sx.wrapNarrow}>
          <h2 style={sx.h2}>Kontakt oss</h2>
          <p style={sx.muted}>
            Ta kontakt for forespørsel om bemanning, samarbeid eller andre henvendelser.
          </p>

          <div style={sx.contactGrid}>
            <div>
              <h3 style={sx.contactTitle}>Bluecrew AS</h3>
              <p style={sx.contactLine}>
                <strong>E-post:</strong>{" "}
                <a href="mailto:isak@bluecrew.no" style={sx.contactLink}>
                  isak@bluecrew.no
                </a>
              </p>
              <p style={sx.contactLine}>
                <strong>Telefon:</strong>{" "}
                <a href="tel:92328850" style={sx.contactLink}>
                  923 28 850
                </a>
              </p>
              <p style={sx.contactLine}>
                <strong>Adresse:</strong> Østenbekkveien 43, 9403 Harstad
              </p>
            </div>

            <div>
              <h3 style={sx.contactTitle}>Juridisk informasjon</h3>
              <p style={sx.contactLine}>Bluecrew AS</p>
              <p style={sx.contactLine}>Org.nr: 936 321 194</p>
              <p style={sx.contactLine}>
                Persondata behandles i henhold til GDPR.
              </p>
            </div>
          </div>

          <div style={sx.privacyBox}>
            <p style={{ margin: 0, fontSize: 14 }}>
              Alle personopplysninger lagres sikkert og brukes kun i forbindelse med
              rekruttering og bemanning. Dokumenter deles ikke med tredjepart uten
              samtykke.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
