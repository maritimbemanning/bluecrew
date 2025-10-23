import Link from "next/link";
import buttons from "../../styles/buttons.module.css";
import styles from "./JobsHighlight.module.css";

export default function JobsHighlight() {
  return (
    <section className={styles.section}>
      <div className={styles.highlight}>
        <span className={styles.badge}>For jobbsøkere</span>
        <h2 className={styles.title}>Finn din neste jobb til sjøs</h2>
        <p className={styles.text}>
          Oppdragene våre spenner fra hurtigbåt og havbruk til offshore service. Registrer deg én gang, så matcher vi deg med
          turnus, fartøy og mannskap som passer ambisjonene dine.
        </p>
        <div className={styles.actions}>
          <Link href="/jobbsoker/oppdrag" className={buttons.btnMain}>
            Se ledige stillinger
          </Link>
          <Link href="/jobbsoker/registrer" className={buttons.btnSoft}>
            Registrer CV
          </Link>
        </div>
      </div>
    </section>
  );
}
