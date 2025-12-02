"use client";

import React from 'react';
import Link from 'next/link';

const styles = {
  hero: {
    position: 'relative' as const,
    background: 'linear-gradient(135deg, #0B1F3A 0%, #1e3a5f 50%, #0B1F3A 100%)',
    backgroundImage: 'url(/hero/maritime-hero.jpeg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    marginTop: 0,
    paddingTop: 120,
    paddingBottom: 100,
    minHeight: 650,
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  },
  heroInner: {
    position: 'relative' as const,
    zIndex: 2,
    maxWidth: 1100,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 16,
    paddingRight: 16,
  },
  heroContent: {
    maxWidth: 800,
    color: '#ffffff',
  },
  badge: {
    display: 'inline-block',
    padding: '10px 20px',
    background: 'rgba(56, 189, 248, 0.12)',
    border: '1px solid rgba(56, 189, 248, 0.25)',
    borderRadius: 24,
    color: '#7dd3fc',
    fontSize: '0.9375rem',
    fontWeight: 600,
    marginBottom: 28,
    letterSpacing: '0.2px',
    fontStyle: 'italic',
  },
  title: {
    fontSize: '3.75rem',
    lineHeight: 1.1,
    fontWeight: 800,
    color: '#ffffff',
    margin: 0,
    marginBottom: 28,
    letterSpacing: '-0.02em',
  },
  lead: {
    fontSize: '1.3125rem',
    lineHeight: 1.65,
    color: 'rgba(255, 255, 255, 0.92)',
    marginBottom: 44,
    maxWidth: 650,
    fontWeight: 400,
  },
  ctaGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 12,
    marginBottom: 56,
  },
  btnPrimaryLarge: {
    fontSize: '1.0625rem',
    padding: '16px 32px',
    fontWeight: 700,
    background: '#38bdf8',
    color: '#0B1F3A',
    borderRadius: 12,
    boxShadow: '0 4px 16px rgba(56, 189, 248, 0.4)',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    textDecoration: 'none',
    minHeight: 48,
    border: 'none',
  },
  candidateButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    padding: '16px 32px',
    background: '#38bdf8',
    color: '#0B1F3A',
    borderRadius: 12,
    fontSize: '1rem',
    fontWeight: 700,
    textDecoration: 'none',
    boxShadow: '0 4px 16px rgba(56, 189, 248, 0.4)',
    transition: 'all 0.2s ease',
    border: 'none',
    minHeight: 48,
    justifyContent: 'center',
  },
  candidateButtonContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 1,
    alignItems: 'flex-start',
  },
  candidateButtonTitle: {
    fontSize: '1rem',
    fontWeight: 700,
  },
  candidateButtonSubtext: {
    fontSize: '0.8125rem',
    opacity: 0.85,
    fontWeight: 400,
  },
  phoneCta: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 6,
  },
  btnSecondary: {
    fontSize: '0.95rem',
    padding: '14px 24px',
    fontWeight: 600,
    background: 'rgba(255, 255, 255, 0.08)',
    color: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    transition: 'all 0.2s ease',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    textDecoration: 'none',
  },
  ctaSubtext: {
    fontSize: '0.875rem',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: 0,
    fontStyle: 'italic',
  },
  trustBadges: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 14,
    paddingTop: 32,
    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
    maxWidth: 600,
  },
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  trustIcon: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#38bdf8',
    flexShrink: 0,
  },
  trustLabel: {
    fontSize: '0.9375rem',
    color: 'rgba(255, 255, 255, 0.87)',
    lineHeight: 1.5,
    fontWeight: 500,
  },
};

export function Hero() {
  return (
    <section className="hero-section" style={styles.hero} aria-labelledby="hero-heading">
      <div className="hero-overlay"></div>
      <div style={styles.heroInner}>
        <div style={styles.heroContent}>
          <div style={styles.badge}>Effektiv bemanning til sjøs</div>
          <h1 id="hero-heading" style={styles.title}>
            Kvalifisert mannskap til den maritime næringen
          </h1>
          <p style={styles.lead}>
            Vi leverer maritime bemanningsløsninger tilpasset ditt behov, fra korttidsoppdrag
            til langsiktige kontrakter. Vi har selv jobbet til sjøs og vet
            forskjellen mellom papirer og praktisk dyktighet.
          </p>

          <div style={styles.ctaGroup}>
            <Link href="/kunde/registrer-behov" className="btn-primary-large" style={styles.btnPrimaryLarge}>
              Registrer behov →
            </Link>
            <Link href="/jobbsoker/registrer" className="candidate-btn" style={styles.candidateButton}>
              <div style={styles.candidateButtonContent}>
                <strong style={styles.candidateButtonTitle}>Søker du jobb?</strong>
                <span style={styles.candidateButtonSubtext}>Registrer deg som kandidat</span>
              </div>
            </Link>
            <div style={styles.phoneCta}>
              <a
                href="mailto:post@bluecrew.no"
                className="btn-secondary"
                style={styles.btnSecondary}
                onClick={() => {
                  const plausible = (window as typeof window & { plausible?: (e: string, o?: { props?: Record<string, unknown> }) => void }).plausible;
                  if (typeof plausible === 'function') {
                    plausible('Email Click', { props: { location: 'hero' } });
                  }
                }}
              >
                📧 post@bluecrew.no
              </a>
              <p style={styles.ctaSubtext}>Svar innen 24 timer</p>
            </div>
          </div>

          <div style={styles.trustBadges}>
            <div style={styles.trustItem}>
              <span style={styles.trustIcon}>✓</span>
              <span style={styles.trustLabel}>Verifiserte sertifikater og HMS</span>
            </div>
            <div style={styles.trustItem}>
              <span style={styles.trustIcon}>✓</span>
              <span style={styles.trustLabel}>Erfaring fra norsk kyst</span>
            </div>
            <div style={styles.trustItem}>
              <span style={styles.trustIcon}>✓</span>
              <span style={styles.trustLabel}>Digital matching med AI-teknologi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
