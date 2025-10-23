import Image from "next/image";
import styles from "./StorySection.module.css";

export default function StorySection() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.content}>
          <span className={styles.badge}>Menneskene om bord</span>
          <h2 className={styles.heading}>Ekte sjøfolk i hvert prosjekt</h2>
          <p className={styles.lead}>
            Vi kombinerer nettverket vårt av sertifiserte sjøfolk med operativ oppfølging av både mannskap og kunde.
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span aria-hidden="true">👥</span>
              <span>Personlig kontakt før, under og etter oppdraget.</span>
            </li>
            <li className={styles.listItem}>
              <span aria-hidden="true">🧭</span>
              <span>Rådgivning fra folk som kjenner regelverket og hverdagen til sjøs.</span>
            </li>
            <li className={styles.listItem}>
              <span aria-hidden="true">🔐</span>
              <span>GDPR-tilpasset databehandling og dokumentkontroll for hver kandidat.</span>
            </li>
          </ul>
        </div>
        <div className={styles.media}>
          <div>
            <Image
              src="/crew-collage.svg"
              alt="Illustrasjon av Bluecrew-team som bemanner fartøy"
              width={420}
              height={320}
            />
          </div>
          <div className={styles.panel}>
            <div className={styles.accent}>Fra dekk til drift</div>
            <p className={styles.quote}>
              «Vi følger opp mannskapet like tett som vi følger opp kunden. Da leverer vi trygge skift – hver gang.»
            </p>
            <div className={styles.quoteName}>Sander Berg, operativ leder</div>
          </div>
        </div>
      </div>
    </section>
  );
}
