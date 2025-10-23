import Link from "next/link";
import buttons from "../../styles/buttons.module.css";
import styles from "./JourneySection.module.css";

export default function JourneySection() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <article className={styles.primary}>
          <h2 className={styles.primaryTitle}>For sjøfolk som vil videre</h2>
          <p className={styles.primaryText}>
            Registrer deg som jobbsøker, så holder vi deg oppdatert på oppdrag der lønn, turnus og team passer det du ser etter.
            Vi følger deg opp før, under og etter hver seilas.
          </p>
          <div className={styles.actions}>
            <Link href="/jobbsoker" className={buttons.btnGhost}>
              Les mer for jobbsøkere
            </Link>
            <Link href="/jobbsoker/oppdrag" className={buttons.btnOutline}>
              Se ledige stillinger
            </Link>
          </div>
        </article>
        <article className={styles.secondary}>
          <h3 className={styles.secondaryTitle}>Klar for neste skift</h3>
          <p className={styles.secondaryText}>
            Vi sørger for at STCW, helseattest og kurs er oppdatert. Du får støtte til papirarbeid og reiser slik at du kan fokusere på jobben om bord.
          </p>
        </article>
      </div>
    </section>
  );
}
