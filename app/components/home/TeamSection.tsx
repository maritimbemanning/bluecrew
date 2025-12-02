import React from 'react';
import Image from 'next/image';

const styles = {
  section: {
    padding: '40px 0',
  },
  container: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '0 16px',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: 24,
  },
  teamAccent: {
    color: '#0369a1',
    fontWeight: 700,
  },
  teamGrid: {
    display: 'grid',
    gap: 16,
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  },
  teamCard: {
    background: '#fff',
    borderRadius: 6,
    overflow: 'hidden',
    boxShadow: '0 1px 2px rgba(2,6,23,0.06)',
  },
  teamPortrait: {
    width: '100%',
    height: 200,
    position: 'relative' as const,
  },
  teamQuote: {
    padding: 16,
    fontStyle: 'italic',
    color: '#64748b',
  },
  teamMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 16px 16px 16px',
  },
  teamName: {
    fontWeight: 700,
  },
  teamRole: {
    color: '#64748b',
  },
};

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

export function TeamSection() {
  return (
    <section aria-labelledby="team-heading" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.teamAccent}>Menneskene i Bluecrew</span>
          <h2 id="team-heading">Virkelige sjøfolk. Virkelige historier.</h2>
        </div>
        <div style={styles.teamGrid}>
          {crewStories.map((s) => (
            <article key={s.name} style={styles.teamCard}>
              <div style={styles.teamPortrait} aria-hidden="true">
                <Image src={s.image} alt={`${s.name} – ${s.role}`} fill style={{objectFit: 'cover'}} />
              </div>
              <p style={styles.teamQuote}>&ldquo;{s.quote}&rdquo;</p>
              <div style={styles.teamMeta}>
                <span style={styles.teamName}>{s.name}</span>
                <span style={styles.teamRole}>{s.role}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
