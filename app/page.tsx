import Link from "next/link";
import SiteLayout from "./components/SiteLayout";
import { sx } from "./lib/styles";
import { BENEFITS, PROCESS_STEPS, FAQS, HERO_STATS, TRUST_POINTS } from "./lib/constants";

export default function Page() {
  return (
    <SiteLayout active="home">
      <section style={sx.hero}>
        <div style={sx.heroWrap}>
          <div style={sx.heroGrid}>
            <div style={sx.heroIntro}>
              <div style={sx.heroPill}>
                <span>Maritim bemanning</span>
                <span>Bluecrew AS</span>
              </div>
              <h1 style={sx.h1}>Bemanning fra sjøfolk som kjenner tempoet ditt</h1>
              <p style={sx.h1Sub}>
                Bluecrew AS drives av folk som har stått på broen, i dekk og i merden. Vi vet hvordan hvert skift påvirker
                operasjonen – derfor leverer vi sertifiserte mannskap raskt og trygt.
              </p>
              <div style={sx.heroHighlights}>
                <div style={sx.highlightItem}>
                  <span style={sx.highlightIcon}>🧭</span>
                  <span>Operative eiere med bakgrunn fra havbruk, servicefartøy og fiskeri.</span>
                </div>
                <div style={sx.highlightItem}>
                  <span style={sx.highlightIcon}>⚓</span>
                  <span>Dokumentert kompetanse, sikkerhetskultur og ryddige avtaler for hvert oppdrag.</span>
                </div>
                <div style={sx.highlightItem}>
                  <span style={sx.highlightIcon}>⚡</span>
                  <span>Effektive prosesser gjør at du får de rette folka om bord når behovet oppstår.</span>
                </div>
              </div>
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
              <h2 style={sx.heroAsideTitle}>Oppdrag vi løser</h2>
              <p style={sx.heroAsideText}>
                Fra korttidsvikarer til komplette team. Vi håndterer mobilisering, dokumentasjon og oppfølging før, under og
                etter utsendelse.
              </p>
              <ul style={sx.heroAsideList}>
                <li style={sx.heroAsideItem}>
                  <span style={sx.heroAsideBullet}>🚤</span>
                  <span>Servicefartøy og arbeidsbåter innen havbruk</span>
                </li>
                <li style={sx.heroAsideItem}>
                  <span style={sx.heroAsideBullet}>🐟</span>
                  <span>Operativ drift av merder og lukkede anlegg</span>
                </li>
                <li style={sx.heroAsideItem}>
                  <span style={sx.heroAsideBullet}>🎣</span>
                  <span>Fiskeri og sesongbaserte bemanningsbehov</span>
                </li>
                <li style={sx.heroAsideItem}>
                  <span style={sx.heroAsideBullet}>🛡️</span>
                  <span>Vakthold, dokumentasjon og HMS-støtte</span>
                </li>
              </ul>
            </aside>
          </div>
          <div style={sx.statStrip}>
            {HERO_STATS.map((stat) => (
              <div key={stat.label} style={sx.statCard}>
                <div style={sx.statValue}>{stat.value}</div>
                <div style={sx.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center" }}>
            <h2 style={sx.h2}>Sjøfolk som leverer – hver gang</h2>
            <p style={sx.leadSmall}>
              Vi er til stede i havbruksnæringen hver dag og vet hvordan oppdrag endrer seg med vær, sesong og logistikk. Det gjør
              oss i stand til å levere presist bemannede team.
            </p>
          </div>
          <div style={sx.trustGrid}>
            {TRUST_POINTS.map((point) => (
              <article key={point.title} style={sx.trustCard}>
                <div style={sx.trustIcon}>{point.icon}</div>
                <h3 style={sx.trustTitle}>{point.title}</h3>
                <p style={sx.trustText}>{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={sx.section}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={sx.h2}>Våre tjenester</h2>
            <p style={sx.leadSmall}>
              Rekruttering og innleie av maritimt personell – fra enkeltoppdrag til komplette mannskapsløsninger.
            </p>
          </div>
          <div style={sx.cards3}>
            <article style={sx.cardService}>
              <div style={sx.cardIcon}>🛥️</div>
              <div style={sx.cardTitle}>Servicefartøy</div>
              <ul style={sx.cardList}>
                <li>Skipper og styrmann</li>
                <li>Matroser og dekksarbeid</li>
                <li>Kokk og lett proviant</li>
              </ul>
            </article>
            <article style={sx.cardService}>
              <div style={sx.cardIcon}>🐟</div>
              <div style={sx.cardTitle}>Havbruk</div>
              <ul style={sx.cardList}>
                <li>Operativ drift av oppdrettsanlegg</li>
                <li>Akvatekniker med fagbrev</li>
                <li>Laser- og fôringsoperatører</li>
              </ul>
            </article>
            <article style={sx.cardService}>
              <div style={sx.cardIcon}>⚓</div>
              <div style={sx.cardTitle}>Fiskeri</div>
              <ul style={sx.cardList}>
                <li>Skippere og styrmenn</li>
                <li>Erfarne matroser</li>
                <li>Sesong- og vikaroppdrag</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section style={sx.section}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={sx.h2}>Hvorfor velge Bluecrew?</h2>
            <p style={sx.leadSmall}>
              Vi kombinerer sjøfolkets erfaring med moderne prosesser og kvalitetssikring.
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
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={sx.h2}>Slik jobber vi</h2>
            <p style={sx.leadSmall}>
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

      <section style={sx.contactSection}>
        <div style={sx.contactInner}>
          <div style={sx.contactIntro}>
            <h2 style={sx.contactHeadline}>Kontakt oss direkte</h2>
            <p style={sx.contactLead}>
              Vi tar telefonen – også etter arbeidstid. Sammen planlegger vi bemanning som gir stabil drift og trygge skift.
            </p>
            <div style={sx.contactCTA}>
              <a href="tel:92328850" style={sx.contactLinkPrimary}>
                📞 Ring 923 28 850
              </a>
              <a href="mailto:isak@bluecrew.no" style={sx.contactLinkSecondary}>
                isak@bluecrew.no
              </a>
              <span>Østenbekkveien 43, 9011 Tromsø</span>
            </div>
          </div>
          <div style={sx.contactCard}>
            <h3 style={sx.contactCardTitle}>Bluecrew AS</h3>
            <p style={sx.contactCardText}>
              Erfaring fra bro, dekk og merd gjør at vi forstår bemanningsbehovet ditt og følger opp folkene våre gjennom hele
              oppdraget.
            </p>
            <p style={sx.contactCardText}>
              <strong>Org.nr:</strong> 936 321 194
            </p>
            <p style={sx.contactCardText}>
              <strong>Åpningstider:</strong> 08:00 – 16:00, vakttelefon ved akutte behov.
            </p>
          </div>
        </div>
      </section>

      <section style={sx.section}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
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
