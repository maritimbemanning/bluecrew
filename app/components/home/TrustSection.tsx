import * as styles from './TrustSection.css';

export function TrustSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Hvorfor Bluecrew?</h2>
          <p className={styles.lead}>
            Vi har base i Nord-Norge, men opererer over hele kysten. Vi kjenner havbruksanleggene og fartøyene, og leverer akkurat det mannskapet du trenger.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Forstår hva som driver resultater</h3>
            <p className={styles.cardText}>
              Erfaring fra ulike maritime sektorer har lært oss å se hva som faktisk betyr noe for drift og sikkerhet om bord.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Teamet vårt har ekte sjøerfaring</h3>
            <p className={styles.cardText}>
              Du snakker med folk som forstår forskjellen på papirer og praktisk dyktighet.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Rask respons og personlig oppfølging</h3>
            <p className={styles.cardText}>
              Mindre byråkrati, mer havforståelse. Vi bryr oss fordi det er vårt navn på spill.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
