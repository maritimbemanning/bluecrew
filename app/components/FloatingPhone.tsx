import React from 'react';
import * as styles from './FloatingPhone.css';

export function FloatingPhone() {
  return (
    <a 
      href="mailto:post@bluecrew.no" 
      className={styles.floatingPhone}
      aria-label="Send e-post til Bluecrew: post@bluecrew.no"
      onClick={() => {
        const plausible = (window as typeof window & { plausible?: (e: string, o?: { props?: Record<string, unknown> }) => void }).plausible;
        if (typeof plausible === 'function') {
          plausible('Email Click', { props: { location: 'floating' } });
        }
      }}
    >
      <svg 
        className={styles.icon}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
        />
      </svg>
      <span className={styles.phoneNumber}>post@bluecrew.no</span>
    </a>
  );
}

export default FloatingPhone;

