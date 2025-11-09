import React from 'react';
import Link from 'next/link';
import * as styles from './JobsHighlight.css';

export function JobsHighlight(){
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>Søker du jobb?</span>
          <h2 className={styles.title}>Er du ute etter en ny hverdag til sjøs?</h2>
          <p className={styles.lead}>
            Registrer deg én gang, så matcher vi deg med oppdrag som passer din kompetanse og ambisjon.
          </p>
          <div className={styles.actions}>
            <Link href="/jobbsoker/oppdrag" className={styles.btnPrimary}>
              Se ledige stillinger →
            </Link>
            <Link href="/jobbsoker/registrer" className={styles.btnSecondary}>
              Registrer CV
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JobsHighlight;

