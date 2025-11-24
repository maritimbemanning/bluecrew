import React from 'react';
import Link from 'next/link';
import * as styles from './ServiceCards.css';

export function ServiceCards(){
  const services = [
    {
      title: 'Fiskeri',
      description: 'Mannskap til fiskebåter, trålere og kystfiskefartøy. Erfarne fiskere og dekksmannskap med STCW-sertifikater og praktisk erfaring fra norske farvann og Barentshavet.',
      link: '/kunde/bemanning',
    },
    {
      title: 'Kystfart & Ferger',
      description: 'Mannskap til ferger, hurtigbåter og fraktfartøy. Sertifiserte navigatører og dekksmannskap med erfaring fra rutetrafikk og kystoperasjoner langs hele norskekysten.',
      link: '/kunde/bemanning',
    },
    {
      title: 'Offshore & Servicefartøy',
      description: 'Dykking, ankerhåndtering, PSV og offshore support. Kvalifisert mannskap med DP-sertifikater og erfaring fra krevende operasjoner i Nordsjøen og langs kysten.',
      link: '/kunde/bemanning',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Våre spesialområder</h2>
          <p className={styles.lead}>
            Vi leverer kvalifisert mannskap til den maritime næringen – fra enkeltmannskap til komplette crew. Enten du driver med fiskeri, kystfart eller offshore, finner vi de rette folkene med riktig kompetanse og sertifisering.
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

