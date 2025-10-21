import Image from "next/image";
import Link from "next/link";
import SiteLayout from "./components/SiteLayout";
import { CONTACT_POINTS, HERO_POINTS } from "./lib/constants";
import { sx } from "./lib/styles";

const CREW_STORIES = [
  {
    name: "Iselin",
    role: "Matros på servicefartøy",
    quote:
      "Bluecrew følger opp før, under og etter hvert skift. Jeg føler meg sett, og kundene vet at jeg møter forberedt.",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Tore",
    role: "Skipper innen havbruk",
    quote:
      "Vi får mannskap som kjenner anlegget og rutinene. Det gjør at båten er klar når oppdraget starter.",
    image:
      "https://images.unsplash.com/photo-1521208914987-3424ed53b2ea?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Maja",
    role: "Bemanningsrådgiver",
    quote:
      "Hver utsendelse er personlig. Vi kjenner sjøfolkene våre og matcher dem med oppdrag der de lykkes.",
    image:
      "https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Page() {
  return (
    <SiteLayout active="home">
      <section style={sx.hero}>
        <div style={sx.heroWrap}>
          <div style={sx.heroGrid}>
            <div style={sx.heroContent}>
              <div style={sx.heroPill}>Bemanning til sjøs</div>
              <h1 style={sx.h1}>Rett mannskap. Riktig tid, trygg drift til sjøs.</h1>
              <p style={sx.h1Sub}>
                Bluecrew leverer kvalifisert mannskap til havbruk, fiskeri, service-, logistikk- og spesialfartøy. Vi sørger for at
                skipene dine er bemannet trygt og effektivt fra første skift.
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
                <Link href="/stillinger" style={sx.btnSecondary}>
                  Se ledige stillinger
                </Link>
              </div>
              <div style={sx.jobsBar}>
                <span style={sx.jobsTag}>
                  <span aria-hidden="true">🧑‍✈️</span> Jobber pågående innen havbruk, logistikk og offshore
                </span>
                <Link href="/jobbsoker" style={sx.ctaHelper}>
                  Finn din neste jobb
                </Link>
              </div>
            </div>
            <div style={sx.heroMedia}>
              <div style={sx.heroMediaImage}>
                <Image
                  src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80"
                  alt="Mannskap på dekk ser utover havet"
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
              <div style={sx.heroMediaOverlay}>
                <p style={sx.heroMediaQuote}>
                  «Folka fra Bluecrew møter forberedt, og vi får støtte hele veien. Det gir oss ro på broa.»
                </p>
                <span style={sx.heroMediaName}>Kunde i havbruk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <div style={{ display: "grid", gap: 28 }}>
            <div style={{ display: "grid", gap: 16 }}>
              <h2 style={sx.h2}>Fra planlegging til bemannet fartøy</h2>
              <p style={sx.leadSmall}>
                Vi tar ansvar for hele prosessen: behovsavklaring, screening, dokumentkontroll og oppfølging om bord. Slik får du en
                partner som kjenner tempoet, regelverket og hverdagen i norsk sjøfart.
              </p>
            </div>
            <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              <div style={{ background: "#f8fafc", borderRadius: 18, padding: 22, border: "1px solid #e2e8f0", display: "grid", gap: 8 }}>
                <strong style={{ fontSize: 16 }}>Operativ innsikt</strong>
                <p style={{ margin: 0, color: "#334155", lineHeight: 1.6 }}>
                  Teamet vårt kommer fra bro, dekk og teknisk drift. Det gir deg rådgivere som forstår hvilke roller som trengs i
                  praksis.
                </p>
              </div>
              <div style={{ background: "#f8fafc", borderRadius: 18, padding: 22, border: "1px solid #e2e8f0", display: "grid", gap: 8 }}>
                <strong style={{ fontSize: 16 }}>Fleksible leveranser</strong>
                <p style={{ margin: 0, color: "#334155", lineHeight: 1.6 }}>
                  Vi leverer både innleie og rekruttering. Enten du trenger et team for sesongen eller en fast skipper, får du ett
                  kontaktpunkt hos oss.
                </p>
              </div>
              <div style={{ background: "#f8fafc", borderRadius: 18, padding: 22, border: "1px solid #e2e8f0", display: "grid", gap: 8 }}>
                <strong style={{ fontSize: 16 }}>Kvalitet og trygghet</strong>
                <p style={{ margin: 0, color: "#334155", lineHeight: 1.6 }}>
                  Vi kvalitetssikrer sertifikater, referanser og HMS. Rapportering skjer gjennom hele oppdraget for å sikre trygg drift.
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
            <p style={sx.leadSmall}>Tre tydelige fagområder – og team som er klare når du trenger dem.</p>
          </div>
          <div style={sx.cards3}>
            <article style={sx.cardService}>
              <div style={sx.cardIcon}>🐟</div>
              <div style={sx.cardTitle}>Havbruk</div>
              <ul style={sx.cardList}>
                <li>Akvateknikere og operatører med oppdatert sertifikatportefølje.</li>
                <li>Skippere og dekksmannskap til serviceflåte og støtteoperasjoner.</li>
              </ul>
            </article>
            <article style={sx.cardService}>
              <div style={sx.cardIcon}>⚓</div>
              <div style={sx.cardTitle}>Fiskeri</div>
              <ul style={sx.cardList}>
                <li>Skippere, styrmenn og maskinister klare for korte og lange tokt.</li>
                <li>Erfarent dekksmannskap og fabrikkteam for fangstsesongen.</li>
              </ul>
            </article>
            <article style={sx.cardService}>
              <div style={sx.cardIcon}>🛠️</div>
              <div style={sx.cardTitle}>Service & spesialfartøy</div>
              <ul style={sx.cardList}>
                <li>Skipsførere, overstyrmenn og maskinsjefer for spesialiserte fartøy.</li>
                <li>DP-operatører, teknikere og beredskapsteam til krevende operasjoner.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section style={sx.crewSection}>
        <div style={sx.crewWrap}>
          <div style={sx.crewIntro}>
            <h2 style={sx.h2Light}>Ekte sjøfolk. Ekte historier.</h2>
            <p style={sx.leadLight}>
              Vi er tett på folkene våre – fra første intervju til siste turnus. Slik bygger vi relasjoner som varer og leveranser som
              gir trygg drift.
            </p>
          </div>
          <div style={sx.crewGrid}>
            {CREW_STORIES.map((story) => (
              <article key={story.name} style={sx.crewCard}>
                <div style={sx.crewPortrait}>
                  <Image
                    src={story.image}
                    alt={`${story.name} – ${story.role}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <div style={sx.crewCaption}>Fra feltet</div>
                  <p style={sx.crewQuote}>“{story.quote}”</p>
                </div>
                <div>
                  <p style={sx.crewName}>{story.name}</p>
                  <p style={sx.crewRole}>{story.role}</p>
                </div>
              </article>
            ))}
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
              <Link href="/stillinger" style={sx.journeyAction}>
                Se ledige stillinger
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
