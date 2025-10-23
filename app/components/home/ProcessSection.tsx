import styles from "./ProcessSection.module.css";

const CARDS = [
  {
    title: "Operativ innsikt",
    text: "Rådgivere med bakgrunn fra bro, dekk og maskin setter sammen team som fungerer om bord.",
  },
  {
    title: "Fleksible leveranser",
    text: "Innleie eller fast rekruttering – du får ett kontaktpunkt som kjenner fartøyet ditt.",
  },
  {
    title: "Kvalitet og trygghet",
    text: "Sertifikater, referanser og HMS kontrolleres før oppstart og rapporteres gjennom hele oppdraget.",
  },
];

export default function ProcessSection() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Fra behov til bemannet fartøy</h2>
          <p className={styles.lead}>
            Vi avklarer kompetansekrav, verifiserer dokumentasjon og holder dialogen med mannskapet slik at oppdraget ditt flyter
            trygt.
          </p>
        </div>
        <div className={styles.grid}>
          {CARDS.map((card) => (
            <article key={card.title} className={styles.card}>
              <strong className={styles.cardTitle}>{card.title}</strong>
              <p className={styles.cardText}>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
