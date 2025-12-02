import React from 'react';

const styles = {
  section: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  container: {
    maxWidth: 1100,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 16,
    paddingRight: 16,
  },
  grid: {
    display: 'grid',
    gap: 24,
    gridTemplateColumns: '1fr 1fr',
  },
  storyTitle: {
    fontSize: '1.25rem',
    color: '#0f172a',
    margin: 0,
  },
  storyText: {
    color: '#64748b',
    marginTop: 12,
  },
};

export function StorySection() {
  return (
    <section style={styles.section} aria-labelledby="story-heading">
      <div style={styles.container}>
        <h2 id="story-heading" style={styles.storyTitle}>Våre historier</h2>
        <div style={styles.grid}>
          <article>
            <h3 style={styles.storyTitle}>Fra usikker til trygg</h3>
            <p style={styles.storyText}>Kort tekst som forklarer story …</p>
          </article>
          <article>
            <h3 style={styles.storyTitle}>Hvorfor kunder velger oss</h3>
            <p style={styles.storyText}>Kort tekst som forklarer resultater …</p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default StorySection;
