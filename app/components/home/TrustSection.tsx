import Image from 'next/image';
import { Linkedin, Facebook } from 'lucide-react';
import * as styles from './TrustSection.css';

export function TrustSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Hvorfor Bluecrew?</h2>
          <p className={styles.lead}>
            Vi har base i Nord-Norge, men opererer over hele kysten. Vi kjenner fiskeflåten og fartøyene, og leverer akkurat det mannskapet du trenger.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Forstår hva som driver resultater</h3>
            <p className={styles.cardText}>
              Erfaring fra ulike maritime sektorer har lært oss å se hva som faktisk betyr noe for drift og sikkerhet om bord. Vi leverer STCW-sertifiserte kapteiner, styrmenn, matroser og maskinoffiserer som kjenner norske forhold og maritime regelverk.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Teamet vårt har ekte sjøerfaring</h3>
            <p className={styles.cardText}>
              Du snakker med folk som forstår forskjellen på papirer og praktisk dyktighet. Vårt team har selv jobbet innen havbruk, fiskeri og offshore – vi vet hva som kreves når været snur og operasjonene må gå som planlagt.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Rask respons og personlig oppfølging</h3>
            <p className={styles.cardText}>
              Mindre byråkrati, mer havforståelse. Vi bryr oss fordi det er vårt navn på spill. Fra første kontakt til mannskap om bord – vi følger opp personlig og sikrer at bemanningen matcher dine behov.
            </p>
          </div>
        </div>

        {/* Subtle partner mention with image */}
        <div className={styles.partnerMention}>
          <Image
            src="/hero/zeonaqua.jpg"
            alt="MS Akva Fighter - ZeonAqua servicefartøy"
            width={60}
            height={40}
            className={styles.partnerImage}
            title="MS Akva Fighter | Foto: ZeonAqua AS"
          />
          <span className={styles.partnerText}>Stolt leverandør til</span>
          <span className={styles.partnerName}>ZeonAqua AS</span>
          <div className={styles.partnerLinks}>
            <a
              href="https://www.linkedin.com/company/zeon-aqua/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.partnerLink}
              aria-label="ZeonAqua LinkedIn"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="https://www.facebook.com/zeonaqua.as"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.partnerLink}
              aria-label="ZeonAqua Facebook"
            >
              <Facebook size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

