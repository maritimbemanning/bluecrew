import Image from 'next/image';
import { Linkedin, Facebook } from 'lucide-react';
import * as styles from './TrustSection.css';

// Partners/clients data
const partners = [
  {
    name: 'ZeonAqua AS',
    type: 'Havbruk',
    logo: '/hero/zeonaqua.jpg',
    linkedin: 'https://www.linkedin.com/company/zeon-aqua/',
    facebook: 'https://www.facebook.com/zeonaqua.as',
  },
];

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

        {/* Partners Section */}
        <div className={styles.partnersSection}>
          <div className={styles.partnersHeader}>
            <p className={styles.partnersTitle}>Våre samarbeidspartnere</p>
          </div>
          <div className={styles.partnersGrid}>
            {partners.map((partner) => (
              <div key={partner.name} className={styles.partnerCard}>
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={140}
                  height={80}
                  className={styles.partnerLogo}
                />
                <div className={styles.partnerInfo}>
                  <p className={styles.partnerName}>{partner.name}</p>
                  <p className={styles.partnerType}>{partner.type}</p>
                </div>
                <div className={styles.partnerLinks}>
                  {partner.linkedin && (
                    <a
                      href={partner.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.partnerLink}
                      aria-label={`${partner.name} LinkedIn`}
                    >
                      <Linkedin size={16} />
                    </a>
                  )}
                  {partner.facebook && (
                    <a
                      href={partner.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.partnerLink}
                      aria-label={`${partner.name} Facebook`}
                    >
                      <Facebook size={16} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

