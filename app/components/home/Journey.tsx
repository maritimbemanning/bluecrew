import React from 'react';
import Link from 'next/link';
import * as styles from './Journey.css';
import * as util from '../../../styles/utils.css';

export function Journey(){
  return (
    <section style={{padding:'var(--space-lg) 0'}} aria-labelledby="journey-heading">
      <div className={util.container}>
        <div className={styles.journeyWrap}>
          <article className={styles.journeyPrimary}>
            <h2 className={styles.journeyTitle} id="journey-heading">For sjøfolk som vil videre</h2>
            <p className={styles.journeyText}>Registrer deg som jobbsøker, så holder vi deg oppdatert på oppdrag der lønn, turnus og team passer det du ser etter. Vi følger deg opp før, under og etter hver seilas.</p>
            <div className={styles.journeyActionRow}>
              <Link href="/jobbsoker" className={util.btn + ' ' + util.btnPrimary}>Les mer for jobbsøkere</Link>
              <Link href="/jobbsoker/oppdrag" className={util.btn + ' ' + util.btnSecondary}>Se ledige stillinger</Link>
            </div>
          </article>
          <aside className={styles.journeySecondary}>
            <h3 style={{margin:0}}>Klar for neste skift</h3>
            <p style={{marginTop:8}}>Vi sørger for at STCW, helseattest og kurs er oppdatert. Du får støtte til papirarbeid og reiser slik at du kan fokusere på jobben om bord.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Journey;
