import React from 'react';
import Link from 'next/link';
import * as styles from './FloatingPhone.css';

export function FloatingPhone() {
  return (
    <Link
      href="/lonn/kalkulator"
      className={styles.floatingPhone}
      aria-label="Åpne lønnskalkulator"
      onClick={() => {
        const plausible = (window as typeof window & { plausible?: (e: string, o?: { props?: Record<string, unknown> }) => void }).plausible;
        if (typeof plausible === 'function') {
          plausible('Calculator Click', { props: { location: 'floating' } });
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
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <line x1="8" y1="6" x2="16" y2="6"/>
        <line x1="8" y1="10" x2="10" y2="10"/>
        <line x1="12" y1="10" x2="14" y2="10"/>
        <line x1="8" y1="14" x2="10" y2="14"/>
        <line x1="12" y1="14" x2="14" y2="14"/>
        <line x1="8" y1="18" x2="10" y2="18"/>
        <line x1="12" y1="18" x2="16" y2="18"/>
      </svg>
      <span className={styles.phoneNumber}>Kalkulator</span>
    </Link>
  );
}

export default FloatingPhone;

