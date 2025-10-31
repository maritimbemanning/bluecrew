import React from 'react';
import Link from 'next/link';
import * as styles from './Hero.css';
import * as util from '../../../styles/utils.css';

export function Hero(){
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.overlay}></div>
      <div className={util.container + ' ' + styles.heroInner}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>Effektiv bemanning til sjøs</div>
          <h1 id="hero-heading" className={styles.title}>
            Kvalifisert mannskap til den maritime næringen
          </h1>
          <p className={styles.lead}>
            Vi leverer maritime bemanningsløsninger tilpasset ditt behov, fra korttidsoppdrag 
            til langsiktige kontrakter. Vi har selv jobbet til sjøs og vet 
            forskjellen mellom papirer og praktisk dyktighet.
          </p>
          
          <div className={styles.ctaGroup}>
            <Link href="/kunde/registrer-behov" className={util.btn + ' ' + styles.btnPrimaryLarge}>
              Registrer behov →
            </Link>
            <Link href="/jobbsoker/registrer" className={styles.candidateButton}>
              <div className={styles.candidateButtonContent}>
                <strong className={styles.candidateButtonTitle}>Søker du jobb?</strong>
                <span className={styles.candidateButtonSubtext}>Registrer deg som kandidat</span>
              </div>
            </Link>
            <div className={styles.phoneCta}>
              <a href="tel:+4792328850" className={util.btn + ' ' + styles.btnSecondary}>
                923 28 850
              </a>
              <p className={styles.ctaSubtext}>Akutt behov?</p>
            </div>
          </div>

          <div className={styles.trustBadges}>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>✓</span>
              <span className={styles.trustLabel}>Verifiserte sertifikater og HMS</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>✓</span>
              <span className={styles.trustLabel}>Erfaring fra norsk kyst</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>✓</span>
              <span className={styles.trustLabel}>Digital matching med AI-teknologi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
