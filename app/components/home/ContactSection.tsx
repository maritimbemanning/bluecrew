import React from 'react';
import Link from 'next/link';
import * as styles from './ContactSection.css';
import { CONTACT_POINTS } from '../../lib/constants';

export function ContactSection(){
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.split}>
          <div className={styles.intro}>
            <h2 className={styles.heading}>Kontakt oss</h2>
            <p className={styles.lead}>
              Skal du bemanne et fartøy eller trenger du en partner for kommende prosjekt? Som godkjent bemanningsforetak leverer vi sertifisert mannskap til fiskeri, kystfart og offshore over hele Norge. Vi svarer raskt og tilpasser leveransen til din operasjon.
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>Skreddersydde team med STCW-sertifiserte sjøfolk</li>
              <li className={styles.listItem}>Oppstart på kort varsel når situasjonen krever det</li>
              <li className={styles.listItem}>Rådgivning fra erfarne sjøfolk som kjenner norskekysten</li>
            </ul>
            <Link href="/kontakt" className={styles.cta}>
              Planlegg bemanningen sammen med oss →
            </Link>
          </div>
          {/* Prevent Google from lifting phone/email into the SERP snippet */}
          <aside className={styles.card} data-nosnippet>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Bluecrew AS</h3>
              <p className={styles.cardDescription}>
                Base i Nord-Norge – leverer mannskap til hele Norge. Daglig bemanning og langsiktige avtaler for maritime operasjoner.
              </p>
            </div>
            {/* Redundant safeguard at list-level as well */}
            <ul className={styles.contactList} data-nosnippet>
              {CONTACT_POINTS.map((point) => (
                <li key={point.label} className={styles.contactItem}>
                  <span className={styles.contactLabel}>{point.label}</span>
                  {point.href ? (
                    <Link href={point.href} className={styles.contactValue}>
                      {point.value}
                    </Link>
                  ) : (
                    <span className={styles.contactValue}>{point.value}</span>
                  )}
                </li>
              ))}
            </ul>
            <p className={styles.legal}>
              Org.nr: 936 463 843 • GDPR-tilpasset behandling av persondata
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;

