import Link from "next/link";
import SiteLayout from "./components/SiteLayout";
import { sx } from "./lib/styles";
import { BENEFITS, PROCESS_STEPS, FAQS } from "./lib/constants";

export default function Page() {
  return (
    <SiteLayout active="home">
      <section style={sx.hero}>
        <div style={sx.heroWrap}>
          <div style={sx.heroPill}>Maritim bemanning • Bluecrew AS</div>
          <h1 style={sx.h1}>Rett mannskap til havbruk, fiskeri og servicefartøy</h1>
          <p style={sx.h1Sub}>
            Bluecrew AS leverer sjøfolk med riktig kompetanse, sertifikater og holdninger der du trenger dem.
          </p>
          <div style={sx.ctaRow}>
            <Link href="/kandidat" style={sx.btnMain}>
              Registrer kandidat
            </Link>
            <Link href="/kunde" style={sx.btnGhost}>
              Meld inn bemanningsbehov
            </Link>
          </div>
          <ul style={sx.badges}>
            <li style={sx.badge}>
              <span style={sx.badgeIcon}>🧭</span> Skippere, matroser og akvateknikere klare for oppdrag
            </li>
            <li style={sx.badge}>
              <span style={sx.badgeIcon}>🌊</span> Operativ erfaring fra norsk kystfart og havbruk
            </li>
            <li style={sx.badge}>
              <span style={sx.badgeIcon}>⏱️</span> Rask respons og ryddige avtaler
            </li>
          </ul>
        </div>
      </section>

      <section style={sx.sectionAlt}>
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
