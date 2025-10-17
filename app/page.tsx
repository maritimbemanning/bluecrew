import Link from "next/link";
import SiteLayout from "./components/SiteLayout";
import { sx } from "./lib/styles";
import { BENEFITS, PROCESS_STEPS, FAQS } from "./lib/constants";

const HERO_POINTS = [
  "Operativ erfaring fra havbruk, fiskeri og servicefartøy",
  "Kandidater klarert med nødvendige sertifikater og referanser",
  "Rask mobilisering og tett oppfølging gjennom hele oppdraget",
];

const TRUST_METRICS = [
  { value: "12 t", label: "Gj.sn. responstid på hasteoppdrag" },
  { value: "500+", label: "Leveranser av mannskapsdøgn i 2023" },
  { value: "24/7", label: "Tilgjengelighet for rederi og mannskap" },
];

const CONTACT_POINTS = [
  "Bemanningsrådgiver med bakgrunn som skipper og matros",
  "Tilpassede bemanningsplaner for hvert fartøy og skift",
  "Oppfølging før, under og etter utreise",
];

export default function Page() {
  return (
    <SiteLayout active="home">
      <section style={sx.hero}>
        <div style={sx.heroWrap}>
          <div style={sx.heroGrid}>
            <div style={sx.heroContent}>
              <div style={sx.heroPill}>Erfarne sjøfolk som kjenner tempoet om bord</div>
              <h1 style={sx.h1}>Mannskapet som holder driften i gang</h1>
              <p style={sx.h1Sub}>
                Bluecrew AS leverer maritime spesialister til havbruk, fiskeri og servicefartøy. Vi vet hvilke roller som må
                være på plass for at produksjonen skal flyte – og hvordan vi mobiliserer dem raskt og sikkert.
              </p>
              <ul style={sx.heroChecklist}>
                {HERO_POINTS.map((point) => (
                  <li key={point} style={sx.heroChecklistItem}>
                    <span style={sx.heroChecklistIcon}>✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div style={sx.ctaRow}>
                <Link href="/kandidat" style={sx.btnMain}>
                  Registrer kandidat
                </Link>
                <Link href="/kunde" style={sx.btnGhost}>
                  Meld inn bemanningsbehov
                </Link>
              </div>
            </div>
            <aside style={sx.heroAside}>
              <div style={sx.heroCard}>
                <h2 style={sx.heroCardHeading}>Leveransene våre</h2>
                <div style={sx.statList}>
                  {TRUST_METRICS.map((metric) => (
                    <div key={metric.label} style={sx.statItem}>
                      <span style={sx.statValue}>{metric.value}</span>
                      <span style={sx.statLabel}>{metric.label}</span>
                    </div>
                  ))}
                </div>
                <div style={sx.trustRow}>
                  <div style={sx.trustItem}>
                    <span style={sx.trustValue}>Skippere, styrmenn, matroser</span>
                    <span style={sx.trustLabel}>Bemanning for servicefartøy og arbeidsbåter</span>
                  </div>
                  <div style={sx.trustItem}>
                    <span style={sx.trustValue}>Akvateknikere & ROV-personell</span>
                    <span style={sx.trustLabel}>Klarert for oppdrettsanlegg langs hele kysten</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <div style={sx.sectionIntro}>
            <h2 style={sx.h2}>Våre tjenester</h2>
            <p style={sx.leadSmall}>
              Rekruttering og innleie av maritimt personell – fra enkeltoppdrag til helbemanning av fartøy. Vi leverer
              bemanning som forstår sikkerhet, produksjonstempo og kundens mål.
            </p>
          </div>
          <div style={sx.cards3}>
            <article style={sx.cardService}>
              <div style={sx.cardIcon}>🛥️</div>
              <div style={sx.cardTitle}>Servicefartøy</div>
              <ul style={sx.cardList}>
                <li>Skipper, styrmann og maskinist</li>
                <li>Matroser med erfaring fra vedlikeholdsoppdrag</li>
                <li>Kokk og logistikkløsninger ved behov</li>
              </ul>
            </article>
            <article style={sx.cardService}>
              <div style={sx.cardIcon}>🐟</div>
              <div style={sx.cardTitle}>Havbruk</div>
              <ul style={sx.cardList}>
                <li>Akvateknikere med fagbrev og relevante kurs</li>
                <li>Laser- og fôringsoperatører klare for skift</li>
                <li>Team for service, avlusing og notvask</li>
              </ul>
            </article>
            <article style={sx.cardService}>
              <div style={sx.cardIcon}>⚓</div>
              <div style={sx.cardTitle}>Fiskeri & sesong</div>
              <ul style={sx.cardList}>
                <li>Skippere og styrmenn til kyst- og havfiske</li>
                <li>Matroser og dekkspersonell på kort varsel</li>
                <li>Sesongoppdrag og hurtige vikarløsninger</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section style={sx.section}>
        <div style={sx.wrapNarrow}>
          <div style={sx.sectionIntro}>
            <h2 style={sx.h2}>Hvorfor velge Bluecrew?</h2>
            <p style={sx.leadSmall}>
              Vi kombinerer sjøfolkets erfaring med moderne prosesser og kvalitetssikring. Derfor får kundene våre mannskap som
              leverer fra første dag om bord.
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

      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <div style={sx.sectionIntro}>
            <h2 style={sx.h2}>Slik jobber vi</h2>
            <p style={sx.leadSmall}>
              Fire steg som sikrer trygg leveranse for både kandidat og kunde. Vi tar ansvar for hvert ledd – fra behovsanalyse
              til oppfølging ute på havet.
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

      <section style={sx.section}>
        <div style={sx.wrapNarrow}>
          <div style={sx.sectionIntro}>
            <h2 style={sx.h2}>Kontakt oss</h2>
            <p style={sx.leadSmall}>
              Vi er klare til å sette sammen mannskap til ditt fartøy. Ta kontakt, så får du en plan og et dedikert team å
              sparre med.
            </p>
          </div>
          <div style={sx.contactHomeGrid}>
            <div>
              <ul style={sx.contactHomeList}>
                {CONTACT_POINTS.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div style={sx.contactHomeCard}>
              <div>
                <strong>Bluecrew AS</strong>
                <div>Østenbekkveien 43, 9011 Tromsø</div>
              </div>
              <div>
                <a href="mailto:isak@bluecrew.no" style={{ ...sx.contactLink, color: "#f8fafc" }}>
                  isak@bluecrew.no
                </a>
                <div style={{ fontSize: 15 }}>Telefon: <a href="tel:92328850" style={{ ...sx.contactLink, color: "#f8fafc" }}>923 28 850</a></div>
              </div>
              <Link href="/kontakt" style={sx.contactCta}>
                Se alle kontaktpunkter
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <div style={sx.sectionIntro}>
            <h2 style={sx.h2}>Vanlige spørsmål</h2>
            <p style={sx.leadSmall}>Finner du ikke svaret? Ta kontakt – vi hjelper deg gjerne.</p>
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
    </SiteLayout>
  );
}
