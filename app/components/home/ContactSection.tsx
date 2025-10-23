import Link from "next/link";
import { CONTACT_POINTS } from "../../lib/constants";
import base from "../../styles/base.module.css";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  return (
    <section className={styles.section}>
      <div className={styles.split}>
        <div className={styles.intro}>
          <h2 className={base.h2}>Kontakt oss</h2>
          <p className={base.leadSmall}>
            Skal du bemanne et fartøy eller trenger du en partner for kommende prosjekt? Vi svarer raskt og tilpasser leveransen til operasjonen din.
          </p>
          <ul className={styles.benefits}>
            <li className={styles.benefitItem}>
              <span aria-hidden="true">⚙️</span> Skreddersydde team for hele den maritime sektoren
            </li>
            <li className={styles.benefitItem}>
              <span aria-hidden="true">🕑</span> Oppstart på kort varsel når situasjonen krever det
            </li>
            <li className={styles.benefitItem}>
              <span aria-hidden="true">🧭</span> Rådgivning fra folk som kjenner norskekysten og offshorefelt
            </li>
          </ul>
          <Link href="/kontakt" className={styles.cta}>
            Planlegg bemanningen sammen med oss
          </Link>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Bluecrew AS</h3>
            <p className={styles.cardText}>
              Daglig bemanning og langsiktige avtaler for fartøy i hele Nord-Norge og resten av norskekysten.
            </p>
          </div>
          <ul className={styles.list}>
            {CONTACT_POINTS.map((point) => (
              <li key={point.label} className={styles.listItem}>
                <span className={styles.label}>{point.label}</span>
                {point.href ? (
                  <Link href={point.href} className={styles.value}>
                    {point.value}
                  </Link>
                ) : (
                  <span className={styles.value}>{point.value}</span>
                )}
              </li>
            ))}
          </ul>
          <p className={styles.note}>Org.nr: 936 321 194 • GDPR-tilpasset behandling av persondata</p>
        </div>
      </div>
    </section>
  );
}
