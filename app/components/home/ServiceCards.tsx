import React from 'react';
import Link from 'next/link';
import * as styles from './ServiceCards.css';

export function ServiceCards(){
  const services = [
    {
      title: 'Servicefartøy',
      description: 'Dykking, spyling, service og teknisk support. Kompetent mannskap til dynamiske operasjoner.',
      link: '/kunde/bemanning',
    },
    {
      title: 'Havbruk',
      description: 'Brønnbåt, fôring, vedlikehold og transport. Erfaring fra norsk oppdrettsnæring.',
      link: '/kunde/bemanning',
    },
    {
      title: 'Teknologi & Innovasjon',
      description: 'Vi digitaliserer bemanningsprosessen med AI-drevet matching og automatiserte kontrakter.',
      link: '/kunde/bemanning',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Våre spesialområder</h2>
          <p className={styles.lead}>
            Vi leverer kvalifisert mannskap til den maritime næringen – fra enkeltmannskap til komplette crew.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <Link href={service.link} key={service.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
              <span className={styles.cardLink}>Les mer →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceCards;
