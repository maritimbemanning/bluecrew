const styles = {
  section: {
    padding: '100px 20px',
    background: '#f8fafc',
    borderTop: '1px solid #e2e8f0',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'grid',
    gap: 64,
  },
  header: {
    textAlign: 'center' as const,
    maxWidth: 800,
    margin: '0 auto',
    display: 'grid',
    gap: 20,
  },
  title: {
    fontSize: '2.75rem',
    fontWeight: 800,
    color: '#0B1F3A',
    lineHeight: 1.15,
    margin: 0,
    letterSpacing: '-0.02em',
  },
  lead: {
    fontSize: '1.25rem',
    lineHeight: 1.65,
    color: '#475569',
    margin: 0,
    fontWeight: 400,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 40,
  },
  card: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 12,
    padding: 36,
    display: 'grid',
    gap: 16,
    transition: 'all 0.3s ease',
  },
  cardTitle: {
    fontSize: '1.375rem',
    fontWeight: 700,
    color: '#0B1F3A',
    margin: 0,
    lineHeight: 1.3,
  },
  cardText: {
    fontSize: '1.0625rem',
    lineHeight: 1.7,
    color: '#475569',
    margin: 0,
  },
};

export function TrustSection() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Hvorfor Bluecrew?</h2>
          <p style={styles.lead}>
            Vi har base i Nord-Norge, men opererer over hele kysten. Vi kjenner havbruksanleggene og fartøyene, og leverer akkurat det mannskapet du trenger.
          </p>
        </div>

        <div style={styles.grid}>
          <div className="trust-card" style={styles.card}>
            <h3 style={styles.cardTitle}>Forstår hva som driver resultater</h3>
            <p style={styles.cardText}>
              Erfaring fra ulike maritime sektorer har lært oss å se hva som faktisk betyr noe for drift og sikkerhet om bord.
            </p>
          </div>

          <div className="trust-card" style={styles.card}>
            <h3 style={styles.cardTitle}>Teamet vårt har ekte sjøerfaring</h3>
            <p style={styles.cardText}>
              Du snakker med folk som forstår forskjellen på papirer og praktisk dyktighet.
            </p>
          </div>

          <div className="trust-card" style={styles.card}>
            <h3 style={styles.cardTitle}>Rask respons og personlig oppfølging</h3>
            <p style={styles.cardText}>
              Mindre byråkrati, mer havforståelse. Vi bryr oss fordi det er vårt navn på spill.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
