import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import * as styles from './AktueltSection.css';

export function AktueltSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Aktuelt</h2>
          <Link href="/aktuelt" className={styles.viewAllLink}>
            Se alle nyheter <ArrowRight size={16} />
          </Link>
        </div>

        <Link href="/aktuelt/forste-leverte-oppdrag" className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image
              src="/hero/zeonaqua.jpg"
              alt="MS Akva Fighter - servicefartøy i solnedgang"
              fill
              className={styles.image}
            />
            <span className={styles.photoCredit}>Foto: Glenn Larsen</span>
          </div>
          <div className={styles.content}>
            <span className={styles.tag}>Havbruk</span>
            <h3 className={styles.cardTitle}>Hverdagen ombord i MS Akva Fighter</h3>
            <p className={styles.cardDescription}>
              Vi har levert vårt første bemanningsoppdrag til ZeonAqua AS.
              En milepæl for Bluecrew og starten på et spennende samarbeid.
            </p>
            <span className={styles.readMore}>
              Les mer <ArrowRight size={14} />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
