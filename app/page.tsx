import Link from "next/link";
import SiteLayout from "./components/SiteLayout";
import { CONTACT_POINTS, HERO_POINTS, STCW_MODULES } from "./lib/constants";
import { sx } from "./lib/styles";

const SERVICE_AREAS = [
  {
    icon: "🐟",
    title: "Havbruk og oppdrett",
    lines: ["Drift av matfisk- og settefiskanlegg", "Akvateknikere, ROV- og miljøoperatører", "Fôr, service og beredskapsteam"],
  },
  {
    icon: "🛥️",
    title: "Service- og arbeidsfartøy",
    lines: ["Skippere, styrmenn og matroser", "Teknikere for vedlikehold, ROV og dekksoperasjoner", "Forpleiningspersonell og HSE"],
  },
  {
    icon: "⚓",
    title: "Fiskeri og spesialfartøy",
    lines: ["Kyst- og havgående fartøy", "Logistikk, slep og beredskap", "Prosjekt- og offshorestøtte"],
  },
];

const PARTNER_POINTS = [
  {
    icon: "🤝",
    title: "For rederier og operatører",
    text:
      "Vi planlegger skift, følger opp dokumentasjonen og leverer mannskap som går rett inn i operasjonen. Oppdragene strekker seg fra korttidsinnleie til faste team på tvers av fartøystørrelser.",
    bullets: [
      "Oppstart på kort varsel uten å kompromisse på sikkerhet",
      "Langsiktige avtaler for stabil drift og lavere administrasjon",
      "Rådgivning fra folk med operativ erfaring fra hele kysten",
    ],
    cta: { href: "/kunde", label: "Registrer bemanningsbehov" },
  },
  {
    icon: "🧑‍✈️",
    title: "For mannskap og jobbsøkere",
    text:
      "Vi matcher deg med oppdrag der innsats og kompetanse verdsettes. Våre kunder tilbyr lønn over tariff, gode turnuser og rom for videre sertifisering.",
    bullets: [
      "Variasjon fra oppdrett og servicefartøy til logistikk og offshore",
      "Oppfølging før, under og etter oppdraget",
      `Krav og veiledning rundt dokumentasjon som ${STCW_MODULES.join(", ")} og helseattest`,
    ],
    cta: { href: "/register-candidate", label: "Registrer deg som kandidat" },
  },
];

export default function Page() {
  return (
    <SiteLayout active="home">
      <section style={sx.hero}>
        <div style={sx.heroWrap}>
          <div style={{ maxWidth: 620, display: "grid", gap: 20 }}>
            <div style={sx.heroPill}>Bemanning til sjøs</div>
            <h1 style={sx.h1}>Mannskap til hele den maritime verdikjeden</h1>
            <p style={sx.h1Sub}>
              Bluecrew setter sammen sertifiserte team til havbruk, fiskeri, service- og spesialfartøy. Med operativ erfaring
              i ryggen løser vi både akutte behov og langsiktige avtaler – uten unødvendig kompleksitet.
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
              <Link href="/kunde" style={sx.btnMain}>
                Meld inn behov
              </Link>
              <Link href="/register-candidate" style={sx.btnGhost}>
                Registrer deg som jobbsøker
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={sx.h2}>Vi bemanner hele maritime Norge</h2>
            <p style={sx.leadSmall}>
              Én partner for hele verdikjeden – fra oppdrettsanlegg og servicefartøy til logistikk-, beredskaps- og offshoreoperasjoner.
            </p>
          </div>
          <div style={sx.cards3}>
            {SERVICE_AREAS.map((area) => (
              <article key={area.title} style={sx.cardService}>
                <div style={sx.cardIcon}>{area.icon}</div>
                <div style={sx.cardTitle}>{area.title}</div>
                <ul style={sx.cardList}>
                  {area.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={sx.section}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={sx.h2}>Praktiske leveranser for begge sider av bordet</h2>
            <p style={sx.leadSmall}>
              Vi kombinerer strukturert bemanning med tett oppfølging av både kunde og mannskap.
            </p>
          </div>
          <div style={sx.featureGrid}>
            {PARTNER_POINTS.map((item) => (
              <article key={item.title} style={sx.featureCard}>
                <div style={sx.featureIcon} aria-hidden="true">
                  {item.icon}
                </div>
                <h3 style={sx.featureTitle}>{item.title}</h3>
                <p style={sx.featureText}>{item.text}</p>
                <ul style={{ margin: 0, paddingLeft: 18, color: "#334155", fontSize: 15, lineHeight: 1.6 }}>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <Link href={item.cta.href} style={{ ...sx.contactCTA, justifyContent: "flex-start", marginTop: 12 }}>
                  {item.cta.label}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={sx.sectionContact}>
        <div style={sx.contactSplit}>
          <div style={sx.contactIntro}>
            <h2 style={sx.h2}>Kontakt oss</h2>
            <p style={sx.leadContact}>
              Fortell oss om fartøyet eller oppdraget ditt, så foreslår vi tilgjengelig mannskap og setter opp en plan for oppstart.
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
                <span aria-hidden="true">⚙️</span> Skreddersydd mannskap til hele den maritime sektoren
              </li>
              <li style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span aria-hidden="true">🕑</span> Oppstart på kort varsel når operasjonen krever det
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
                Erfarne sjøfolk som bemanner havbruk, fiskeri, service- og spesialfartøy i hele Norge.
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
