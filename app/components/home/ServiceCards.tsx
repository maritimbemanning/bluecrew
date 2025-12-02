import React from 'react';
import Link from 'next/link';

const styles = {
  section: {
    padding: '100px 20px',
    background: '#ffffff',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'grid',
    gap: 60,
  },
  header: {
    textAlign: 'center' as const,
    maxWidth: 700,
    margin: '0 auto',
    display: 'grid',
    gap: 20,
  },
  heading: {
    fontSize: '2.75rem',
    fontWeight: 800,
    color: '#0B1F3A',
    lineHeight: 1.15,
    margin: 0,
    letterSpacing: '-0.02em',
  },
  lead: {
    fontSize: '1.25rem',
    lineHeight: 1.65,
    color: '#475569',
    margin: 0,
    fontWeight: 400,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 32,
  },
  card: {
    padding: 32,
    borderRadius: 16,
    background: '#ffffff',
    border: '2px solid #e2e8f0',
    display: 'grid',
    gap: 16,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    position: 'relative' as const,
  },
  cardTitle: {
    fontSize: '1.625rem',
    fontWeight: 700,
    color: '#0B1F3A',
    margin: 0,
    lineHeight: 1.3,
  },
  cardDescription: {
    fontSize: '1.0625rem',
    lineHeight: 1.7,
    color: '#475569',
    margin: 0,
  },
  cardLink: {
    fontSize: '0.95rem',
    fontWeight: 600,
    color: '#0369a1',
    marginTop: 8,
    transition: 'all 0.2s ease',
  },
};

export function ServiceCards() {
  const services = [
    {
      title: 'Servicefartøy',
      description: 'Dykking, spyling, service og offshore support. Kompetent mannskap til dynamiske operasjoner.',
      link: '/kunde/bemanning',
    },
    {
      title: 'Havbruk',
      description: 'Brønnbåt, drift, vedlikehold og transport. Erfaring fra norsk oppdrettsnæring.',
      link: '/kunde/bemanning',
    },
    {
      title: 'Kystfart',
      description: 'Mannskap til ferger, supplyskip og kystoperasjoner. Sertifisert og havtrent.',
      link: '/kunde/bemanning',
    },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.heading}>Våre spesialområder</h2>
          <p style={styles.lead}>
            Vi leverer kvalifisert mannskap til den maritime næringen – fra enkeltmannskap til komplette crew.
          </p>
        </div>

        <div style={styles.grid}>
          {services.map((service) => (
            <Link href={service.link} key={service.title} className="service-card" style={styles.card}>
              <h3 style={styles.cardTitle}>{service.title}</h3>
              <p style={styles.cardDescription}>{service.description}</p>
              <span className="service-card-link" style={styles.cardLink}>Les mer →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceCards;
