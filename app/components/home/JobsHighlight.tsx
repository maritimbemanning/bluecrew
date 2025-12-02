import React from 'react';
import Link from 'next/link';

const styles = {
  section: {
    padding: '120px 20px',
    background: 'linear-gradient(135deg, #0B1F3A 0%, #1e3a5f 100%)',
    backgroundImage: 'url(/hero/skipper_matros_lønn.webp)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative' as const,
    borderTop: '4px solid #38bdf8',
    borderBottom: '4px solid #38bdf8',
  },
  container: {
    maxWidth: 900,
    margin: '0 auto',
    position: 'relative' as const,
    zIndex: 1,
  },
  content: {
    textAlign: 'center' as const,
    display: 'grid',
    gap: 28,
  },
  badge: {
    display: 'inline-block',
    background: '#38bdf8',
    color: '#0B1F3A',
    padding: '12px 28px',
    borderRadius: 12,
    fontSize: '1rem',
    fontWeight: 700,
    border: 'none',
    boxShadow: '0 4px 16px rgba(56, 189, 248, 0.4)',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
  },
  title: {
    fontSize: '3.25rem',
    fontWeight: 800,
    color: '#ffffff',
    lineHeight: 1.1,
    margin: 0,
    letterSpacing: '-0.02em',
  },
  lead: {
    fontSize: '1.25rem',
    lineHeight: 1.7,
    color: 'rgba(255, 255, 255, 0.9)',
    margin: '0 auto',
    maxWidth: 700,
    fontWeight: 400,
  },
  actions: {
    display: 'flex',
    gap: 16,
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '18px 36px',
    background: '#38bdf8',
    color: '#0B1F3A',
    borderRadius: 12,
    fontSize: '1.125rem',
    fontWeight: 700,
    textDecoration: 'none',
    boxShadow: '0 6px 20px rgba(56, 189, 248, 0.5)',
    transition: 'all 0.2s ease',
  },
  btnSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '16px 32px',
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    borderRadius: 12,
    fontSize: '1rem',
    fontWeight: 600,
    textDecoration: 'none',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.2s ease',
  },
};

export function JobsHighlight() {
  return (
    <section className="jobs-section" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.content}>
          <span style={styles.badge}>Søker du jobb?</span>
          <h2 style={styles.title}>Er du ute etter en ny hverdag til sjøs?</h2>
          <p style={styles.lead}>
            Registrer deg én gang, så matcher vi deg med oppdrag som passer din kompetanse og ambisjon.
          </p>
          <div style={styles.actions}>
            <Link href="/jobbsoker/oppdrag" className="jobs-btn-primary" style={styles.btnPrimary}>
              Se ledige stillinger →
            </Link>
            <Link href="/jobbsoker/registrer" className="jobs-btn-secondary" style={styles.btnSecondary}>
              Registrer CV
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JobsHighlight;
