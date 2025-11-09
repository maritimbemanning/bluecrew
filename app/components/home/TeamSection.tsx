import React from 'react';
import Image from 'next/image';
import * as styles from './TeamSection.css';

const crewStories = [
  {
    name: 'Mats',
    role: 'Skipper på servicefartøy',
    quote:
      'Bluecrew sørger for at teamet er klart før vi legger fra kai. Dokumentasjon, reiser og avløsere er avklart i god tid.',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Selma',
    role: 'Rekrutteringsrådgiver',
    quote:
      'Vi kjenner sjøfolkene våre ved navn og følger dem tett gjennom hvert oppdrag. Det gir trygghet både for kandidat og kunde.',
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Jonas',
    role: 'Matros innen havbruk',
    quote:
      'Oppdragene passer kompetansen min, og jeg får raske svar når turnusen endres. Det merkes at Bluecrew selv kommer fra sjøen.',
    image:
      'https://images.unsplash.com/photo-1500043201424-482c8263b48d?auto=format&fit=crop&w=1200&q=80',
  },
];

export function TeamSection(){
  return (
    <section aria-labelledby="team-heading" style={{padding:'var(--space-xl) 0'}}>
      <div style={{maxWidth:1100, margin:'0 auto', padding:'0 var(--space-md)'}}>
        <div style={{textAlign:'center', marginBottom:24}}>
          <span className={styles.teamAccent}>Menneskene i Bluecrew</span>
          <h2 id="team-heading">Virkelige sjøfolk. Virkelige historier.</h2>
        </div>
        <div className={styles.teamGrid}>
          {crewStories.map((s)=> (
            <article key={s.name} className={styles.teamCard}>
              <div className={styles.teamPortrait} aria-hidden="true">
                <Image src={s.image} alt={`${s.name} – ${s.role}`} fill style={{objectFit:'cover'}} />
              </div>
              <p className={styles.teamQuote}>“{s.quote}”</p>
              <div className={styles.teamMeta}>
                <span className={styles.teamName}>{s.name}</span>
                <span className={styles.teamRole}>{s.role}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;

