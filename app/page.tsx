import Image from "next/image";
import Link from "next/link";
import SiteLayout from "./components/SiteLayout";
import { CONTACT_POINTS, HERO_POINTS } from "./lib/constants";
import { sx } from "./lib/styles";

export default function Page() {
  return (
    <SiteLayout active="home">
      <section style={sx.hero}>
        <div style={sx.heroWrap}>
          <div style={sx.heroGrid}>
            <div style={sx.heroContent}>
              <div style={sx.heroPill}>Bemanning til sjøs</div>
              <h1 style={sx.h1}>Rett mannskap. Riktig tid. Trygg drift til sjøs.</h1>
              <p style={sx.h1Sub}>
                Vi er sjøfolk som bemanner havbruk, fiskeri og spesialfartøy med sertifiserte team klare fra første vaktskifte.
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
                <Link href="/jobbsoker/oppdrag" style={sx.btnOutline}>
                  Se ledige stillinger
                </Link>
              </div>
            </div>
            <div style={sx.heroMedia}>
              <div style={sx.heroMediaFrame}>
                <Image
                  src="/crew-collage.svg"
                  alt="Illustrasjon av Bluecrew-mannskap i arbeid"
                  width={480}
                  height={360}
                  priority
                />
              </div>
              <p style={sx.heroMediaCaption}>
                Menneskene i Bluecrew har selv stått på bro, dekk og maskin – vi bemanner med innsikt fra sjøen.
              </p>
              <div style={sx.heroStatRow}>
                <div style={sx.heroStatChip}>
                  <span style={sx.heroStatChipValue}>Sertifisert</span>
                  <span style={sx.heroStatChipLabel}>STCW & helseattest</span>
                </div>
                <div style={sx.heroStatChip}>
                  <span style={sx.heroStatChipValue}>Dialog</span>
                  <span style={sx.heroStatChipLabel}>Oppfølging hele veien</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={sx.sectionDeep}>
        <div style={sx.storyGrid}>
          <div style={sx.storyContent}>
            <span style={sx.storyBadge}>Menneskene om bord</span>
            <h2 style={sx.h2Light}>Ekte sjøfolk i hvert prosjekt</h2>
            <p style={sx.storyLead}>
              Vi kombinerer nettverket vårt av sertifiserte sjøfolk med operativ oppfølging av både mannskap og kunde.
            </p>
            <ul style={sx.storyList}>
              <li style={sx.storyListItem}>
                <span aria-hidden="true">👥</span>
                <span>Personlig kontakt før, under og etter oppdraget.</span>
              </li>
              <li style={sx.storyListItem}>
                <span aria-hidden="true">🧭</span>
                <span>Rådgivning fra folk som kjenner regelverket og hverdagen til sjøs.</span>
              </li>
              <li style={sx.storyListItem}>
                <span aria-hidden="true">🔐</span>
                <span>GDPR-tilpasset databehandling og dokumentkontroll for hver kandidat.</span>
              </li>
            </ul>
          </div>
          <div style={sx.storyMedia}>
            <div style={sx.heroMediaFrame}>
              <Image
                src="/crew-collage.svg"
                alt="Illustrasjon av Bluecrew-team som bemanner fartøy"
                width={420}
                height={320}
              />
            </div>
            <div style={sx.storyPanel}>
              <div style={sx.storyAccent}>Fra dekk til drift</div>
              <p style={sx.quote}>
                «Vi følger opp mannskapet like tett som vi følger opp kunden. Da leverer vi trygge skift – hver gang.»
              </p>
              <div style={sx.quoteName}>Sander Berg, operativ leder</div>
            </div>
          </div>
        </div>
      </section>

      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <div style={{ display: "grid", gap: 28 }}>
            <div style={{ display: "grid", gap: 16 }}>
              <h2 style={sx.h2}>Fra behov til bemannet fartøy</h2>
              <p style={sx.leadSmall}>
                Vi avklarer kompetansekrav, verifiserer dokumentasjon og holder dialogen med mannskapet slik at oppdraget ditt flyter
                trygt.
              </p>
            </div>
            <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              <div style={{ background: "#f8fafc", borderRadius: 18, padding: 22, border: "1px solid #e2e8f0", display: "grid", gap: 8 }}>
                <strong style={{ fontSize: 16 }}>Operativ innsikt</strong>
                <p style={{ margin: 0, color: "#334155", lineHeight: 1.6 }}>
                  Rådgivere med bakgrunn fra bro, dekk og maskin setter sammen team som fungerer om bord.
                </p>
              </div>
              <div style={{ background: "#f8fafc", borderRadius: 18, padding: 22, border: "1px solid #e2e8f0", display: "grid", gap: 8 }}>
                <strong style={{ fontSize: 16 }}>Fleksible leveranser</strong>
                <p style={{ margin: 0, color: "#334155", lineHeight: 1.6 }}>
                  Innleie eller fast rekruttering – du får ett kontaktpunkt som kjenner fartøyet ditt.
                </p>
              </div>
              <div style={{ background: "#f8fafc", borderRadius: 18, padding: 22, border: "1px solid #e2e8f0", display: "grid", gap: 8 }}>
                <strong style={{ fontSize: 16 }}>Kvalitet og trygghet</strong>
                <p style={{ margin: 0, color: "#334155", lineHeight: 1.6 }}>
                  Sertifikater, referanser og HMS kontrolleres før oppstart og rapporteres gjennom hele oppdraget.
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
              Vi bygger mannskap og finner nøkkelpersonell til fartøy og operasjoner over hele norskekysten.
            </p>
          </div>
          <div style={sx.cards3}>
            <article style={sx.cardService}>
              <div style={sx.cardIcon}>🐟</div>
              <div style={sx.cardTitle}>Havbruk</div>
              <ul style={sx.cardListTerse}>
                <li>Skippere og båtførere klare for produksjon og service.</li>
                <li>Akvateknikere og operatører med oppdatert HMS.</li>
              </ul>
            </article>
            <article style={sx.cardService}>
              <div style={sx.cardIcon}>⚓</div>
              <div style={sx.cardTitle}>Fiskeri</div>
              <ul style={sx.cardListTerse}>
                <li>Styrmenn og maskinister med dokumentert fartstid.</li>
                <li>Matroser og fabrikkpersonell klare for sesong.</li>
              </ul>
            </article>
            <article style={sx.cardService}>
              <div style={sx.cardIcon}>🛠️</div>
              <div style={sx.cardTitle}>Service & spesialfartøy</div>
              <ul style={sx.cardListTerse}>
                <li>ROV-, kran- og DP-personell med gyldige sertifikat.</li>
                <li>Logistikk- og beredskapsteam for krevende operasjoner.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section style={sx.sectionAlt}>
        <div style={sx.jobStripWrap}>
          <div style={sx.jobStrip}>
            <div style={sx.jobStripContent}>
              <h2 style={sx.jobStripTitle}>Finn din neste jobb til sjøs</h2>
              <p style={sx.jobStripText}>
                Vi publiserer oppdrag fortløpende og matcher deg med rederier som trenger kompetansen din. Oppdater preferansene dine
                når som helst.
              </p>
            </div>
            <div style={sx.jobStripActions}>
              <Link href="/jobbsoker/oppdrag" style={sx.btnMain}>
                Se ledige stillinger
              </Link>
              <Link href="/jobbsoker/registrer" style={sx.btnOutline}>
                Registrer CV
              </Link>
            </div>
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
              <Link href="/jobbsoker/oppdrag" style={sx.btnOutline}>
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
