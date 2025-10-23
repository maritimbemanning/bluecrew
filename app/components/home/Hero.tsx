import Image from "next/image";
import Link from "next/link";
import { HERO_POINTS } from "../../lib/constants";
import buttons from "../../styles/buttons.module.css";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <div className={styles.pill}>Bemanning til sjøs</div>
            <h1 className={styles.heading}>Rett mannskap. Riktig tid. Trygg drift til sjøs.</h1>
            <p className={styles.lead}>
              Vi er sjøfolk som bemanner havbruk, fiskeri og spesialfartøy med sertifiserte team klare fra første vaktskifte.
            </p>
            <ul className={styles.points}>
              {HERO_POINTS.map((point) => (
                <li key={point.text} className={styles.point}>
                  <span className={styles.pointIcon} aria-hidden="true">
                    {point.icon}
                  </span>
                  <span>{point.text}</span>
                </li>
              ))}
            </ul>
            <div className={styles.ctaRow}>
              <Link href="/jobbsoker/registrer" className={buttons.btnMain}>
                Registrer jobbsøker
              </Link>
              <Link href="/kunde/registrer-behov" className={buttons.btnGhost}>
                Meld inn bemanningsbehov
              </Link>
              <Link href="/jobbsoker/oppdrag" className={buttons.btnOutline}>
                Se ledige stillinger
              </Link>
            </div>
          </div>

          <div className={styles.media}>
            <div className={styles.mediaFrame}>
              <Image
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
                alt="Mannskap på dekk som gjør klar fortøyning"
                width={520}
                height={360}
                priority
              />
            </div>
            <p className={styles.mediaCaption}>
              Bildene er hentet fra virkelige oppdrag og viser folkene som møter kundene våre til sjøs.
            </p>
            <div className={styles.statRow}>
              <div className={styles.statChip}>
                <span className={styles.statValue}>Sertifisert</span>
                <span className={styles.statLabel}>STCW & helseattest</span>
              </div>
              <div className={styles.statChip}>
                <span className={styles.statValue}>Dialog</span>
                <span className={styles.statLabel}>Oppfølging hele veien</span>
              </div>
            </div>
          </div>

          <aside className={styles.photoAside}>
            <div className={styles.mediaGlow} aria-hidden="true" />
            <div className={styles.photoFrame}>
              <div className={styles.photoBadge}>
                <span aria-hidden="true">🧑‍✈️</span>
                På oppdrag nå
              </div>
              <Image
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80"
                alt="Tre sjøfolk gjør klar utstyr på dekk"
                width={640}
                height={520}
                priority
                className={styles.photo}
              />
            </div>
            <p className={styles.photoCaption}>
              «Vi leverer bare folk vi selv ville hatt om bord.» – Tor Martin, bemanningsrådgiver og tidligere overstyrmann.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
