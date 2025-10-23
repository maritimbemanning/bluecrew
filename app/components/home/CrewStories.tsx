import Image from "next/image";
import styles from "./CrewStories.module.css";

const STORIES = [
  {
    name: "Mats",
    role: "Skipper på servicefartøy",
    quote:
      "Bluecrew sørger for at teamet er klart før vi legger fra kai. Dokumentasjon, reiser og avløsere er avklart i god tid.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Selma",
    role: "Rekrutteringsrådgiver",
    quote:
      "Vi kjenner sjøfolkene våre ved navn og følger dem tett gjennom hvert oppdrag. Det gir trygghet både for kandidat og kunde.",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Jonas",
    role: "Matros innen havbruk",
    quote:
      "Oppdragene passer kompetansen min, og jeg får raske svar når turnusen endres. Det merkes at Bluecrew selv kommer fra sjøen.",
    image: "https://images.unsplash.com/photo-1500043201424-482c8263b48d?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function CrewStories() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <span className={styles.accent}>Menneskene i Bluecrew</span>
          <h2 className={styles.heading}>Virkelige sjøfolk. Virkelige historier.</h2>
          <p className={styles.lead}>
            Vi møter kundene med folk som har vært på dekk selv. Slik bygger vi tillit og leverer mannskap som fungerer fra dag én.
          </p>
        </div>
        <div className={styles.grid}>
          {STORIES.map((story) => (
            <article key={story.name} className={styles.card}>
              <div className={styles.portrait}>
                <Image
                  src={story.image}
                  alt={`${story.name} – ${story.role}`}
                  fill
                  sizes="(min-width: 1024px) 320px, 90vw"
                  className={styles.image}
                />
              </div>
              <p className={styles.quote}>“{story.quote}”</p>
              <div className={styles.meta}>
                <span className={styles.name}>{story.name}</span>
                <span className={styles.role}>{story.role}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
