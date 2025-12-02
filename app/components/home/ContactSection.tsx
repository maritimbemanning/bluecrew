import React from 'react';
import Link from 'next/link';
import { CONTACT_POINTS } from '../../lib/constants';

const styles = {
  section: {
    padding: '100px 20px',
    background: '#f8fafc',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
  },
  split: {
    display: 'grid',
    gap: 60,
    gridTemplateColumns: '1fr 420px',
    alignItems: 'start',
  },
  intro: {
    display: 'grid',
    gap: 28,
  },
  heading: {
    fontSize: '2.75rem',
    fontWeight: 800,
    color: '#0B1F3A',
    margin: 0,
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
  },
  lead: {
    fontSize: '1.25rem',
    lineHeight: 1.7,
    color: '#475569',
    margin: 0,
    fontWeight: 400,
  },
  list: {
    listStyle: 'none' as const,
    margin: 0,
    padding: 0,
    display: 'grid',
    gap: 14,
  },
  listItem: {
    fontSize: '1.0625rem',
    color: '#475569',
    paddingLeft: 28,
    position: 'relative' as const,
    lineHeight: 1.6,
  },
  cta: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '16px 32px',
    background: '#38bdf8',
    color: '#0B1F3A',
    borderRadius: 12,
    fontSize: '1rem',
    fontWeight: 700,
    textDecoration: 'none',
    boxShadow: '0 4px 16px rgba(56, 189, 248, 0.4)',
    transition: 'all 0.2s ease',
    marginTop: 8,
  },
  card: {
    background: 'linear-gradient(135deg, #0B1F3A 0%, #1e3a5f 100%)',
    color: '#ffffff',
    padding: 44,
    borderRadius: 16,
    display: 'grid',
    gap: 36,
    boxShadow: '0 12px 32px rgba(11, 31, 58, 0.2)',
  },
  cardHeader: {
    display: 'grid',
    gap: 14,
  },
  cardTitle: {
    margin: 0,
    fontSize: '1.875rem',
    fontWeight: 800,
    color: '#ffffff',
    lineHeight: 1.25,
  },
  cardDescription: {
    margin: 0,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 1.7,
    fontSize: '1.0625rem',
  },
  contactList: {
    listStyle: 'none' as const,
    margin: 0,
    padding: 0,
    display: 'grid',
    gap: 20,
  },
  contactItem: {
    display: 'grid',
    gap: 6,
  },
  contactLabel: {
    fontWeight: 700,
    fontSize: '0.875rem',
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  contactValue: {
    color: '#38bdf8',
    fontSize: '1.1875rem',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
  legal: {
    margin: 0,
    fontSize: '0.9375rem',
    color: 'rgba(255, 255, 255, 0.65)',
    lineHeight: 1.6,
  },
};

export function ContactSection() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.split}>
          <div style={styles.intro}>
            <h2 style={styles.heading}>Kontakt oss</h2>
            <p style={styles.lead}>
              Skal du bemanne et fartøy eller trenger du en partner for kommende prosjekt? Vi svarer raskt og tilpasser leveransen til din operasjon.
            </p>
            <ul style={styles.list}>
              <li className="list-bullet" style={styles.listItem}>Skreddersydde team for hele den maritime sektoren</li>
              <li className="list-bullet" style={styles.listItem}>Oppstart på kort varsel når situasjonen krever det</li>
              <li className="list-bullet" style={styles.listItem}>Rådgivning fra folk som kjenner norskekysten</li>
            </ul>
            <Link href="/kontakt" className="contact-cta" style={styles.cta}>
              Planlegg bemanningen sammen med oss →
            </Link>
          </div>
          <aside style={styles.card} data-nosnippet>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Bluecrew AS</h3>
              <p style={styles.cardDescription}>
                Base i Nord-Norge – leverer mannskap til hele Norge. Daglig bemanning og langsiktige avtaler for maritime operasjoner.
              </p>
            </div>
            <ul style={styles.contactList} data-nosnippet>
              {CONTACT_POINTS.map((point) => (
                <li key={point.label} style={styles.contactItem}>
                  <span style={styles.contactLabel}>{point.label}</span>
                  {point.href ? (
                    <Link href={point.href} className="contact-value" style={styles.contactValue}>
                      {point.value}
                    </Link>
                  ) : (
                    <span style={styles.contactValue}>{point.value}</span>
                  )}
                </li>
              ))}
            </ul>
            <p style={styles.legal}>
              Org.nr: 936 463 843 • GDPR-tilpasset behandling av persondata
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
