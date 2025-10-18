import Link from "next/link";
import SiteLayout from "./components/SiteLayout";
import {
  BENEFITS,
  CONTACT_POINTS,
  DELIVERY_STATS,
  FAQS,
  HERO_POINTS,
  PROCESS_STEPS,
} from "./lib/constants";
import { sx } from "./lib/styles";

export default function Page() {
  return (
    <SiteLayout active="home">
      <section style={sx.hero}>
        <div style={sx.heroWrap}>
          <div style={sx.heroGrid}>
            <div style={sx.heroContent}>
              <div style={sx.heroPill}>Operativ bemanning på tvers av maritim sektor</div>
              <h1 style={sx.h1}>Mannskapet som holder driften i gang – på sjøen, i havn og offshore</h1>
              <p style={sx.h1Sub}>
                Bluecrew AS leverer sertifiserte sjøfolk til hele den maritime verdikjeden. Fra havbruk og fiskeri til service-,
                logistikk- og støttefartøy: Vi kombinerer operativ erfaring med effektive prosesser slik at du får rett mannskap
                på plass når behovet oppstår.
              </p>
              <ul style={sx.heroPoints}>
                {HERO_POINTS.map((point) => (
                  <li key={point.text} style={sx.heroPoint}>
                    <span style={sx.heroPointIcon} aria-hidden="true">
                      {point.icon}
                    </span>
                    <span>{point.text}</span>
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
              <ul style={sx.badges}>
                <li style={sx.badge}>
                  <span style={sx.badgeIcon}>✔️</span> Dokumentert kompetanse og referanser
                </li>
                <li style={sx.badge}>
                  <span style={sx.badgeIcon}>🛟</span> HMS og sikkerhet i hvert oppdrag
                </li>
                <li style={sx.badge}>
                  <span style={sx.badgeIcon}>📍</span> Lokalt nærvær i Nord-Norge
                </li>
              </ul>
            </div>
            <aside style={sx.heroCard}>
              <h2 style={sx.heroCardHeading}>Operativ drift fra dag én</h2>
              <p style={{ margin: 0, color: "#cbd5f5", lineHeight: 1.6 }}>
                Teamet vårt har bemannet fartøy i krevende vær og korte tidsvinduer. Vi planlegger skift, sikrer dokumentasjon og
                følger opp fra kai til felt.
              </p>
              <div style={sx.heroStats}>
                {DELIVERY_STATS.map((stat) => (
                  <div key={stat.label} style={sx.heroStat}>
                    <div style={sx.heroStatValue}>{stat.value}</div>
                    <div style={sx.heroStatLabel}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <Link href="/kontakt" style={sx.contactCTA}>
                Snakk med en bemanningsleder
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section style={sx.sectionDeep}>
        <div style={sx.storyGrid}>
          <div>
            <h2 style={sx.h2Light}>Vi kjenner livet om bord</h2>
            <p style={sx.leadLight}>
              Bluecrew er startet av folk som selv har stått i skift på dekk. Derfor vet vi hvordan vaktlistene fungerer, hvilke
              sertifikater som kreves – og hvordan man bygger et mannskap som samarbeider godt under press, enten det gjelder
              havbruk, fiskeri, transport, havn eller offshore-støtte.
            </p>
            <p style={sx.leadLight}>
              Vi tar ansvar for planlegging, kontrakter og oppfølging slik at du kan konsentrere deg om driften. Når forholdene
              snur, tilpasser vi oss raskt og løser bemanningen på tvers av fartøytyper og geografier.
            </p>
          </div>
          <div style={sx.storyPanel}>
            <span style={sx.storyAccent}>Fra brygge til bro</span>
            <p style={sx.quote}>
              «Det er lite slingringsmonn i sjøen. Vi vet hvor raskt ting må løses og stiller med mannskap som er klare fra første
              skift.»
            </p>
            <p style={sx.quoteName}>Didriksson, medgründer og skipper</p>
          </div>
        </div>
      </section>

      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={sx.h2}>Våre tjenester</h2>
            <p style={sx.leadSmall}>
              Rekruttering og innleie av maritimt personell – fra korttidsoppdrag til komplette mannskapsløsninger i hele
              verdikjeden.
            </p>
          </div>
          <div style={sx.cards3}>
            <article style={sx.cardService}>
              <div style={sx.cardIcon}>🛥️</div>
              <div style={sx.cardTitle}>Servicefartøy</div>
              <ul style={sx.cardList}>
                <li>Skipper og styrmann</li>
                <li>Matroser og dekksarbeid</li>
                <li>Kokk og forpleining</li>
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
            <article style={sx.cardService}>
              <div style={sx.cardIcon}>🏗️</div>
              <div style={sx.cardTitle}>Logistikk og støtte</div>
              <ul style={sx.cardList}>
                <li>Havne- og terminalbemanning</li>
                <li>Offshore- og supplypersonell</li>
                <li>Teknisk drift og vedlikehold</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section style={sx.section}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
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
          <div style={{ textAlign: "center", marginBottom: 40 }}>
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
          <div style={{ textAlign: "center", marginBottom: 32 }}>
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

      <section style={sx.sectionContact}>
        <div style={sx.contactSplit}>
          <div style={sx.contactIntro}>
            <h2 style={sx.h2}>Kontakt oss</h2>
            <p style={sx.leadContact}>
              Trenger du mannskap til neste tur eller en langsiktig partner på bemanning? Vi svarer raskt og setter oss inn i
              driften din før vi foreslår løsninger for hele maritime virksomheten.
            </p>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "grid",
                gap: 12,
                fontSize: 16,
                color: "#1e293b",
              }}
            >
              <li style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span aria-hidden="true">⚙️</span> Skreddersydde team for hele den maritime sektoren
              </li>
              <li style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span aria-hidden="true">🕑</span> Oppstart på kort varsel når situasjonen krever det
              </li>
              <li style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span aria-hidden="true">🧭</span> Rådgivning fra folk som kjenner norskekysten
              </li>
            </ul>
            <Link href="/kontakt" style={sx.contactCTA}>
              Planlegg bemanningen sammen med oss
            </Link>
          </div>
          <div style={sx.contactCard}>
            <div style={{ display: "grid", gap: 10 }}>
              <h3 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#f8fafc" }}>Bluecrew AS</h3>
              <p style={{ margin: 0, color: "#cbd5f5", lineHeight: 1.6 }}>
                Daglig bemanning og langsiktige avtaler for fartøy og maritime operasjoner i hele Nord-Norge.
              </p>
            </div>
            <ul style={sx.contactList}>
              {CONTACT_POINTS.map((point) => (
                <li key={point.label} style={sx.contactListItem}>
                  <span style={sx.contactLabel}>{point.label}</span>
                  {point.href ? (
                    <Link href={point.href} style={{ ...sx.contactValue, color: "#38bdf8", textDecoration: "none" }}>
                      {point.value}
                    </Link>
                  ) : (
                    <span style={sx.contactValue}>{point.value}</span>
                  )}
                </li>
              ))}
            </ul>
            <p style={{ margin: 0, fontSize: 14, color: "#94a3b8" }}>
              Org.nr: 936 321 194 • GDPR-tilpasset behandling av persondata
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
