import Link from "next/link";
import buttons from "../../styles/buttons.module.css";
import styles from "./ServiceCards.module.css";

const SERVICES = [
  { icon: "🐟", title: "Havbruk", text: "Skippere, båtførere og akvateknikere som kjenner linjene, rutinene og HMS-kravene dine." },
  { icon: "⚓", title: "Fiskeri", text: "Styrmenn, maskinister og matroser med dokumentert fartstid og oppdatert sikkerhetstrening." },
  {
    icon: "🛠️",
    title: "Service & spesialfartøy",
    text: "ROV-, kran- og DP-personell samt logistikkteam som holder prosjektet trygt i gang.",
  },
];

export default function ServiceCards() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Tjenesteområder</h2>
          <p className={styles.lead}>
            Vi bemanner fartøy og operasjoner langs hele norskekysten med sertifisert personell på kort varsel.
          </p>
        </div>
        <div className={styles.grid}>
          {SERVICES.map((service) => (
            <article key={service.title} className={styles.card}>
              <div className={styles.icon}>{service.icon}</div>
              <div className={styles.cardTitle}>{service.title}</div>
              <p className={styles.cardText}>{service.text}</p>
            </article>
          ))}
        </div>
        <div className={styles.cta}>
          <Link href="/kunde/bemanning" className={buttons.btnSecondary}>
            Se hvordan vi bemanner
          </Link>
        </div>
      </div>
    </section>
  );
}
