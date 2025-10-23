import Image from "next/image";
import Link from "next/link";
import SiteLayout from "./components/SiteLayout";
import { CONTACT_POINTS, HERO_POINTS } from "./lib/constants";
import styles from "./page.module.css";

const crewStories = [
  {
    name: "Mats",
    role: "Skipper på servicefartøy",
    quote:
      "Bluecrew sørger for at teamet er klart før vi legger fra kai. Dokumentasjon, reiser og avløsere er avklart i god tid.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Selma",
    role: "Rekrutteringsrådgiver",
    quote:
      "Vi kjenner sjøfolkene våre ved navn og følger dem tett gjennom hvert oppdrag. Det gir trygghet både for kandidat og kunde.",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Jonas",
    role: "Matros innen havbruk",
    quote:
      "Oppdragene passer kompetansen min, og jeg får raske svar når turnusen endres. Det merkes at Bluecrew selv kommer fra sjøen.",
    image: "https://images.unsplash.com/photo-1500043201424-482c8263b48d?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Page() {
  return (
    <SiteLayout active="home">
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.heroPill}>Bemanning til sjøs</div>
              <h1 className={styles.heroTitle}>Rett mannskap. Riktig tid. Trygg drift til sjøs.</h1>
              <p className={styles.heroLead}>
                Vi er sjøfolk som bemanner havbruk, fiskeri og spesialfartøy med sertifiserte team klare fra første vaktskifte.
              </p>
              <ul className={styles.heroPoints}>
                {HERO_POINTS.map((point) => (
                  <li key={point.text} className={styles.heroPoint}>
                    <span className={styles.heroPointIcon} aria-hidden="true">
                      {point.icon}
                    </span>
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.ctaRow}>
                <Link href="/jobbsoker/registrer" className="cta-button cta-button--primary">
                  Registrer jobbsøker
                </Link>
                <Link href="/kunde/registrer-behov" className="cta-button cta-button--ghost">
                  Meld inn bemanningsbehov
                </Link>
                <Link href="/jobbsoker/oppdrag" className="cta-button cta-button--outline">
                  Se ledige stillinger
                </Link>
              </div>
            </div>
            <div className={styles.heroMedia}>
              <div className={styles.heroMediaFrame}>
                <Image
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
                  alt="Mannskap på dekk som gjør klar fortøyning"
                  width={520}
                  height={360}
                  priority
                  className={styles.heroImage}
                />
              </div>
              <p className={styles.heroMediaCaption}>
                Bildene er hentet fra virkelige oppdrag og viser folkene som møter kundene våre til sjøs.
              </p>
              <div className={styles.heroStatRow}>
                <div className={styles.heroStatChip}>
                  <span className={styles.heroStatChipValue}>Sertifisert</span>
                  <span className={styles.heroStatChipLabel}>STCW & helseattest</span>
                </div>
                <div className={styles.heroStatChip}>
                  <span className={styles.heroStatChipValue}>Dialog</span>
                  <span className={styles.heroStatChipLabel}>Oppfølging hele veien</span>
                </div>
              </div>
            </div>
            <aside className={styles.heroMedia}>
              <div className={styles.heroMediaGlow} aria-hidden="true" />
              <div className={styles.heroPhotoFrame}>
                <div className={styles.heroPhotoBadge}>
                  <span aria-hidden="true">🧑‍✈️</span>
                  På oppdrag nå
                </div>
                <Image
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80"
                  alt="Tre sjøfolk gjør klar utstyr på dekk"
                  width={640}
                  height={520}
                  priority
                  className={styles.heroPhoto}
                />
              </div>
              <p className={styles.heroPhotoCaption}>
                «Vi leverer bare folk vi selv ville hatt om bord.» – Tor Martin, bemanningsrådgiver og tidligere overstyrmann.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.sectionDeep}>
        <div className={styles.storyGrid}>
          <div className={styles.storyContent}>
            <span className={styles.storyBadge}>Menneskene om bord</span>
            <h2 className={styles.sectionTitleLight}>Ekte sjøfolk i hvert prosjekt</h2>
            <p className={styles.storyLead}>
              Vi kombinerer nettverket vårt av sertifiserte sjøfolk med operativ oppfølging av både mannskap og kunde.
            </p>
            <ul className={styles.storyList}>
              <li className={styles.storyListItem}>
                <span aria-hidden="true">👥</span>
                <span>Personlig kontakt før, under og etter oppdraget.</span>
              </li>
              <li className={styles.storyListItem}>
                <span aria-hidden="true">🧭</span>
                <span>Rådgivning fra folk som kjenner regelverket og hverdagen til sjøs.</span>
              </li>
              <li className={styles.storyListItem}>
                <span aria-hidden="true">🔐</span>
                <span>GDPR-tilpasset databehandling og dokumentkontroll for hver kandidat.</span>
              </li>
            </ul>
          </div>
          <div className={styles.storyMedia}>
            <div className={styles.heroMediaFrame}>
              <Image src="/crew-collage.svg" alt="Illustrasjon av Bluecrew-team som bemanner fartøy" width={420} height={320} />
            </div>
            <div className={styles.storyPanel}>
              <div className={styles.storyAccent}>Fra dekk til drift</div>
              <p className={styles.quote}>
                «Vi følger opp mannskapet like tett som vi følger opp kunden. Da leverer vi trygge skift – hver gang.»
              </p>
              <div className={styles.quoteName}>Sander Berg, operativ leder</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.containerNarrow}>
          <div className={styles.flowStack}>
            <div className={styles.flowIntro}>
              <h2 className={styles.sectionTitle}>Fra behov til bemannet fartøy</h2>
              <p className={styles.lead}>
                Vi avklarer kompetansekrav, verifiserer dokumentasjon og holder dialogen med mannskapet slik at oppdraget ditt flyter
                trygt.
              </p>
            </div>
            <div className={styles.flowCards}>
              <div className={styles.flowCard}>
                <strong className={styles.flowCardTitle}>Operativ innsikt</strong>
                <p className={styles.flowCardBody}>
                  Rådgivere med bakgrunn fra bro, dekk og maskin setter sammen team som fungerer om bord.
                </p>
              </div>
              <div className={styles.flowCard}>
                <strong className={styles.flowCardTitle}>Fleksible leveranser</strong>
                <p className={styles.flowCardBody}>
                  Innleie eller fast rekruttering – du får ett kontaktpunkt som kjenner fartøyet ditt.
                </p>
              </div>
              <div className={styles.flowCard}>
                <strong className={styles.flowCardTitle}>Kvalitet og trygghet</strong>
                <p className={styles.flowCardBody}>
                  Sertifikater, referanser og HMS kontrolleres før oppstart og rapporteres gjennom hele oppdraget.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.containerNarrow}>
          <div className={styles.sectionHeading}>
            <h2 className={styles.sectionTitle}>Tjenesteområder</h2>
            <p className={styles.lead}>
              Vi bemanner fartøy og operasjoner langs hele norskekysten med sertifisert personell på kort varsel.
            </p>
          </div>
          <div className={styles.cardsGrid}>
            <article className={styles.serviceCard}>
              <div className={styles.cardIcon}>🐟</div>
              <div className={styles.cardTitle}>Havbruk</div>
              <p className={styles.cardLead}>
                Skippere, båtførere og akvateknikere som kjenner linjene, rutinene og HMS-kravene dine.
              </p>
            </article>
            <article className={styles.serviceCard}>
              <div className={styles.cardIcon}>⚓</div>
              <div className={styles.cardTitle}>Fiskeri</div>
              <p className={styles.cardLead}>
                Styrmenn, maskinister og matroser med dokumentert fartstid og oppdatert sikkerhetstrening.
              </p>
            </article>
            <article className={styles.serviceCard}>
              <div className={styles.cardIcon}>🛠️</div>
              <div className={styles.cardTitle}>Service & spesialfartøy</div>
              <p className={styles.cardLead}>
                ROV-, kran- og DP-personell samt logistikkteam som holder prosjektet trygt i gang.
              </p>
            </article>
          </div>
          <div className={styles.centerRow}>
            <Link href="/kunde/bemanning" className="cta-button cta-button--secondary">
              Se hvordan vi bemanner
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.containerNarrow}>
          <div className={styles.teamIntro}>
            <span className={styles.teamAccent}>Menneskene i Bluecrew</span>
            <h2 className={styles.sectionTitle}>Virkelige sjøfolk. Virkelige historier.</h2>
            <p className={styles.lead}>
              Vi møter kundene med folk som har vært på dekk selv. Slik bygger vi tillit og leverer mannskap som fungerer fra dag én.
            </p>
          </div>
          <div className={styles.teamGrid}>
            {crewStories.map((story) => (
              <article key={story.name} className={styles.teamCard}>
                <div className={styles.teamPortrait}>
                  <Image
                    src={story.image}
                    alt={`${story.name} – ${story.role}`}
                    fill
                    sizes="(min-width: 1024px) 320px, 90vw"
                    className={styles.teamImage}
                  />
                </div>
                <p className={styles.teamQuote}>“{story.quote}”</p>
                <div className={styles.teamMeta}>
                  <span className={styles.teamName}>{story.name}</span>
                  <span className={styles.teamRole}>{story.role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.jobsHighlight}>
          <span className={styles.jobsBadge}>For jobbsøkere</span>
          <h2 className={styles.jobsTitle}>Finn din neste jobb til sjøs</h2>
          <p className={styles.jobsText}>
            Oppdragene våre spenner fra hurtigbåt og havbruk til offshore service. Registrer deg én gang, så matcher vi deg med
            turnus, fartøy og mannskap som passer ambisjonene dine.
          </p>
          <div className={styles.jobsActions}>
            <Link href="/jobbsoker/oppdrag" className="cta-button cta-button--primary">
              Se ledige stillinger
            </Link>
            <Link href="/jobbsoker/registrer" className={styles.softButton}>
              Registrer CV
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.journeyGrid}>
          <article className={styles.journeyPrimary}>
            <h2 className={styles.journeyTitle}>For sjøfolk som vil videre</h2>
            <p className={styles.journeyText}>
              Registrer deg som jobbsøker, så holder vi deg oppdatert på oppdrag der lønn, turnus og team passer det du ser etter. Vi
              følger deg opp før, under og etter hver seilas.
            </p>
            <div className={styles.journeyActions}>
              <Link href="/jobbsoker" className={styles.journeyLink}>
                Les mer for jobbsøkere
              </Link>
              <Link href="/jobbsoker/oppdrag" className="cta-button cta-button--outline">
                Se ledige stillinger
              </Link>
            </div>
          </article>
          <article className={styles.journeySecondary}>
            <h3 className={styles.journeySecondaryTitle}>Klar for neste skift</h3>
            <p className={styles.journeySecondaryText}>
              Vi sørger for at STCW, helseattest og kurs er oppdatert. Du får støtte til papirarbeid og reiser slik at du kan fokusere på
              jobben om bord.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.sectionContact}>
        <div className={styles.contactGrid}>
          <div className={styles.contactIntro}>
            <h2 className={styles.sectionTitle}>Kontakt oss</h2>
            <p className={styles.lead}>
              Skal du bemanne et fartøy eller trenger du en partner for kommende prosjekt? Vi svarer raskt og tilpasser leveransen til
              operasjonen din.
            </p>
            <ul className={styles.contactList}>
              <li className={styles.contactHighlightItem}>
                <span aria-hidden="true">⚙️</span> Skreddersydde team for hele den maritime sektoren
              </li>
              <li className={styles.contactHighlightItem}>
                <span aria-hidden="true">🕑</span> Oppstart på kort varsel når situasjonen krever det
              </li>
              <li className={styles.contactHighlightItem}>
                <span aria-hidden="true">🧭</span> Rådgivning fra folk som kjenner norskekysten og offshorefelt
              </li>
            </ul>
            <Link href="/kontakt" className="cta-button cta-button--secondary">
              Planlegg bemanningen sammen med oss
            </Link>
          </div>
          <div className={styles.contactCard}>
            <div className={styles.contactHeader}>
              <h3 className={styles.contactTitle}>Bluecrew AS</h3>
              <p className={styles.contactDescription}>
                Daglig bemanning og langsiktige avtaler for fartøy i hele Nord-Norge og resten av norskekysten.
              </p>
            </div>
            <ul className={styles.contactListDense}>
              {CONTACT_POINTS.map((point) => (
                <li key={point.label} className={styles.contactListItem}>
                  <span className={styles.contactLabel}>{point.label}</span>
                  {point.href ? (
                    <Link href={point.href} className={`${styles.contactValue} ${styles.contactValueLink}`}>
                      {point.value}
                    </Link>
                  ) : (
                    <span className={styles.contactValue}>{point.value}</span>
                  )}
                </li>
              ))}
            </ul>
            <p className={styles.contactMeta}>Org.nr: 936 321 194 • GDPR-tilpasset behandling av persondata</p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
