import React from 'react';
import Link from 'next/link';

const styles = {
  section: {
    padding: '24px 0',
  },
  container: {
    maxWidth: 1100,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 16,
    paddingRight: 16,
  },
  journeyWrap: {
    display: 'grid',
    gap: 24,
    gridTemplateColumns: '2fr 1fr',
    alignItems: 'start',
  },
  journeyPrimary: {
    padding: 16,
  },
  journeySecondary: {
    padding: 16,
    background: '#f8fafc',
    borderRadius: 6,
  },
  journeyTitle: {
    fontSize: '1.5rem',
    margin: 0,
    color: '#0f172a',
  },
  journeyText: {
    color: '#64748b',
  },
  journeyActionRow: {
    display: 'flex',
    gap: 16,
    marginTop: 16,
  },
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '0.5rem 1rem',
    borderRadius: 6,
    fontWeight: 600,
    cursor: 'pointer',
    border: 'none',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  },
  btnPrimary: {
    background: '#0369a1',
    color: '#ffffff',
    boxShadow: '0 1px 2px rgba(2,6,23,0.06)',
  },
  btnSecondary: {
    background: 'transparent',
    color: '#0369a1',
    border: '1px solid rgba(2,6,23,0.06)',
  },
};

export function Journey() {
  return (
    <section style={styles.section} aria-labelledby="journey-heading">
      <div style={styles.container}>
        <div style={styles.journeyWrap}>
          <article style={styles.journeyPrimary}>
            <h2 style={styles.journeyTitle} id="journey-heading">For sjøfolk som vil videre</h2>
            <p style={styles.journeyText}>Registrer deg som jobbsøker, så holder vi deg oppdatert på oppdrag der lønn, turnus og team passer det du ser etter. Vi følger deg opp før, under og etter hver seilas.</p>
            <div style={styles.journeyActionRow}>
              <Link href="/jobbsoker" className="btn-journey" style={{...styles.btn, ...styles.btnPrimary}}>Les mer for jobbsøkere</Link>
              <Link href="/jobbsoker/oppdrag" className="btn-journey" style={{...styles.btn, ...styles.btnSecondary}}>Se ledige stillinger</Link>
            </div>
          </article>
          <aside style={styles.journeySecondary}>
            <h3 style={{margin: 0}}>Klar for neste skift</h3>
            <p style={{marginTop: 8}}>Vi sørger for at STCW, helseattest og kurs er oppdatert. Du får støtte til papirarbeid og reiser slik at du kan fokusere på jobben om bord.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Journey;
