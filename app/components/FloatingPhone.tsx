import React from 'react';

const styles = {
  floatingPhone: {
    position: 'fixed' as const,
    bottom: 24,
    right: 24,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 16px',
    backgroundColor: '#0B1F3A',
    color: '#ffffff',
    borderRadius: 50,
    textDecoration: 'none',
    fontSize: 16,
    fontWeight: 600,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.2s ease',
  },
  icon: {
    width: 20,
    height: 20,
    flexShrink: 0,
  },
  phoneNumber: {
    whiteSpace: 'nowrap' as const,
  },
};

export function FloatingPhone() {
  return (
    <a
      href="mailto:post@bluecrew.no"
      className="floating-phone"
      style={styles.floatingPhone}
      aria-label="Send e-post til Bluecrew: post@bluecrew.no"
      onClick={() => {
        const plausible = (window as typeof window & { plausible?: (e: string, o?: { props?: Record<string, unknown> }) => void }).plausible;
        if (typeof plausible === 'function') {
          plausible('Email Click', { props: { location: 'floating' } });
        }
      }}
    >
      <svg
        style={styles.icon}
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
      <span style={styles.phoneNumber}>post@bluecrew.no</span>
    </a>
  );
}

export default FloatingPhone;
