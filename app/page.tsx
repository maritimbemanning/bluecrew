import Image from "next/image";
import Link from "next/link";
import SiteLayout from "./components/SiteLayout";
import { CONTACT_POINTS, HERO_POINTS } from "./lib/constants";
import { sx } from "./lib/styles";

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
      <section style={sx.hero}>
        <div style={sx.heroWrap}>
          <div style={sx.heroGrid}>
            <div style={{ display: "grid", gap: 28, maxWidth: 620 }}>
              <div style={sx.heroContent}>
                <div style={sx.heroPill}>Bemanning til sjøs</div>
                <h1 style={sx.h1}>Rett mannskap. Riktig tid, trygg drift til sjøs.</h1>
                <p style={sx.h1Sub}>
                  Bluecrew leverer kvalifisert mannskap til havbruk, fiskeri, service-, logistikk- og spesialfartøy. Vi sørger for
                  at skipene dine er bemannet trygt og effektivt fra første skift til oppdraget er avsluttet.
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
                  <Link href="/jobbsoker/registrer" style={sx.btnMain}>
                    Registrer jobbsøker
                  </Link>
                  <Link href="/kunde/registrer-behov" style={sx.btnGhost}>
                    Meld inn bemanningsbehov
                  </Link>
                  <Link href="/jobbsoker/oppdrag" style={sx.btnSecondary}>
                    Se ledige oppdrag
                  </Link>
                </div>
              </div>
            </div>
            <div style={sx.heroVisual}>
              <div style={sx.heroPortraitFrame}>
                <Image
                  src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80"
                  alt="Bemanningsleder fra Bluecrew i dialog med sjøfolk på dekk"
                  fill
                  sizes="(min-width: 1024px) 420px, 80vw"
                  style={sx.heroPortrait}
                  priority
                />
                <div style={sx.heroBadge}>
                  <span style={sx.heroBadgeLabel}>Bemanningsteamet</span>
                  <span style={sx.heroBadgeName}>Karoline</span>
                  <span style={sx.heroBadgeRole}>Bemanningsleder, Bluecrew</span>
                </div>
              </div>
              <div style={sx.heroQuote}>
                <p style={sx.heroQuoteText}>
                  «Vi møter sjøfolkene våre på kaia, sørger for at papirene er klare og holder dialogen tett gjennom hele skiftet.»
                </p>
                <span style={sx.heroQuoteMeta}>Karoline, bemanningsleder</span>
              </div>
            </div>
            <aside style={sx.heroMedia}>
              <div style={sx.heroMediaGlow} aria-hidden="true" />
              <div style={sx.heroPhotoFrame}>
                <div style={sx.heroPhotoBadge}>
                  <span aria-hidden="true">🧑‍✈️</span>
                  På oppdrag nå
                </div>
                <Image
                  src="/crew-hero.svg"
                  alt="Tre av Bluecrews sjøfolk gjør seg klare for neste skift på dekk."
                  width={640}
                  height={520}
                  priority
                  style={sx.heroPhoto}
                />
              </div>
              <p style={sx.heroPhotoCaption}>
                «Vi leverer bare folk vi selv ville hatt om bord.» – Tor Martin, bemanningsrådgiver og tidligere overstyrmann.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <div style={{ display: "grid", gap: 28 }}>
            <div style={{ display: "grid", gap: 16 }}>
              <h2 style={sx.h2}>Fra planlegging til bemannet fartøy</h2>
              <p style={sx.leadSmall}>
                Vi avklarer behov, verifiserer sertifikater og følger opp mannskapet om bord. Dermed får du en partner som kjenner
                tempoet, regelverket og hverdagen i norsk sjøfart.
              </p>
            </div>
            <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              <div style={{ background: "#f8fafc", borderRadius: 18, padding: 22, border: "1px solid #e2e8f0", display: "grid", gap: 8 }}>
                <strong style={{ fontSize: 16 }}>Operativ innsikt</strong>
                <p style={{ margin: 0, color: "#334155", lineHeight: 1.6 }}>
                  Rådgivere fra bro, dekk og teknisk drift sikrer bemanning som fungerer i praksis.
                </p>
              </div>
              <div style={{ background: "#f8fafc", borderRadius: 18, padding: 22, border: "1px solid #e2e8f0", display: "grid", gap: 8 }}>
                <strong style={{ fontSize: 16 }}>Fleksible leveranser</strong>
                <p style={{ margin: 0, color: "#334155", lineHeight: 1.6 }}>
                  Innleie eller rekruttering – du får ett kontaktpunkt som løser både sesongtopper og faste roller.
                </p>
              </div>
              <div style={{ background: "#f8fafc", borderRadius: 18, padding: 22, border: "1px solid #e2e8f0", display: "grid", gap: 8 }}>
                <strong style={{ fontSize: 16 }}>Kvalitet og trygghet</strong>
                <p style={{ margin: 0, color: "#334155", lineHeight: 1.6 }}>
                  Kontinuerlig rapportering og dokumentkontroll gir trygg drift for mannskap og rederi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={sx.section}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={sx.h2}>Tjenesteområder</h2>
            <p style={sx.leadSmall}>
              Vi bemanner fartøy og operasjoner langs hele norskekysten – med mannskap som er klare fra første skift.
            </p>
          </div>
          <div style={sx.cards3}>
            <article style={sx.cardService}>
              <div style={sx.cardIcon}>🐟</div>
              <div style={sx.cardTitle}>Havbruk</div>
              <ul style={sx.cardList}>
                <li>Sertifiserte driftsledere og matroser til sjø- og landbaserte anlegg.</li>
                <li>Team som håndterer fôring, service og spesialoperasjoner når behovet oppstår.</li>
              </ul>
            </article>
            <article style={sx.cardService}>
              <div style={sx.cardIcon}>⚓</div>
              <div style={sx.cardTitle}>Fiskeri</div>
              <ul style={sx.cardList}>
                <li>Skippere, styrmenn og maskinister med dokumentert fangsterfaring.</li>
                <li>Dekksmannskap og fabrikkteam klare for sesong og ekspressoppdrag.</li>
              </ul>
            </article>
            <article style={sx.cardService}>
              <div style={sx.cardIcon}>🛠️</div>
              <div style={sx.cardTitle}>Service & spesialfartøy</div>
              <ul style={sx.cardList}>
                <li>Operatører og fagressurser til service-, logistikk- og spesialoppdrag.</li>
                <li>DP-operatører, ROV-teknikere og beredskapsteam med oppdatert HMS.</li>
              </ul>
            </article>
          </div>
          <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
            <Link href="/kunde/bemanning" style={sx.btnSecondary}>
              Se hvordan vi bemanner
            </Link>
          </div>
        </div>
      </section>

      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <div style={{ display: "grid", gap: 18, textAlign: "center" }}>
            <span style={sx.teamAccent}>Menneskene i Bluecrew</span>
            <h2 style={sx.h2}>Virkelige sjøfolk. Virkelige historier.</h2>
            <p style={sx.leadSmall}>
              Vi møter kundene med folk som har vært på dekk selv. Slik bygger vi tillit og leverer mannskap som fungerer fra dag én.
            </p>
          </div>
          <div style={sx.teamGrid}>
            {crewStories.map((story) => (
              <article key={story.name} style={sx.teamCard}>
                <div style={sx.teamPortrait}>
                  <Image
                    src={story.image}
                    alt={`${story.name} – ${story.role}`}
                    fill
                    sizes="(min-width: 1024px) 320px, 90vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p style={sx.teamQuote}>“{story.quote}”</p>
                <div style={sx.teamMeta}>
                  <span style={sx.teamName}>{story.name}</span>
                  <span style={sx.teamRole}>{story.role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={sx.section}>
        <div style={sx.jobsHighlight}>
          <span style={sx.jobsBadge}>For jobbsøkere</span>
          <h2 style={sx.jobsTitle}>Finn din neste jobb til sjøs</h2>
          <p style={sx.jobsText}>
            Oppdragene våre spenner fra hurtigbåt og havbruk til offshore service. Registrer deg én gang, så matcher vi deg med
            turnus, fartøy og mannskap som passer ambisjonene dine.
          </p>
          <div style={sx.jobsActions}>
            <Link href="/jobbsoker/oppdrag" style={sx.btnMain}>
              Se ledige stillinger
            </Link>
            <Link href="/jobbsoker/registrer" style={sx.btnSoft}>
              Registrer CV
            </Link>
          </div>
        </div>
      </section>

      <section style={sx.sectionAlt}>
        <div style={sx.journeyWrap}>
          <article style={sx.journeyPrimary}>
            <h2 style={sx.journeyTitle}>For sjøfolk som vil videre</h2>
            <p style={sx.journeyText}>
              Registrer deg som jobbsøker, så holder vi deg oppdatert på oppdrag der lønn, turnus og team passer det du ser etter. Vi
              følger deg opp før, under og etter hver seilas.
            </p>
            <div style={sx.journeyActionRow}>
              <Link href="/jobbsoker" style={sx.journeyAction}>
                Les mer for jobbsøkere
              </Link>
            </div>
          </article>
          <article style={sx.journeySecondary}>
            <h3 style={sx.journeySecondaryTitle}>Klar for neste skift</h3>
            <p style={sx.journeySecondaryText}>
              Vi sørger for at STCW, helseattest og kurs er oppdatert. Du får støtte til papirarbeid og reiser slik at du kan fokusere på
              jobben om bord.
            </p>
          </article>
        </div>
      </section>

      <section style={sx.sectionContact}>
        <div style={sx.contactSplit}>
          <div style={sx.contactIntro}>
            <h2 style={sx.h2}>Kontakt oss</h2>
            <p style={sx.leadSmall}>
              Skal du bemanne et fartøy eller trenger du en partner for kommende prosjekt? Vi svarer raskt og tilpasser leveransen til
              operasjonen din.
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
                <span aria-hidden="true">🧭</span> Rådgivning fra folk som kjenner norskekysten og offshorefelt
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
                Daglig bemanning og langsiktige avtaler for fartøy i hele Nord-Norge og resten av norskekysten.
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
