import { style } from '@vanilla-extract/css';

export const section = style({
  padding: '100px 20px',
  background: '#ffffff',
  
  '@media': {
    '(max-width: 768px)': {
      padding: '80px 20px',
    },
  },
});

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'grid',
  gap: '60px',
});

export const header = style({
  textAlign: 'center',
  maxWidth: '700px',
  margin: '0 auto',
  display: 'grid',
  gap: '20px',
});

export const heading = style({
  fontSize: '2.75rem',
  fontWeight: 800,
  color: '#0B1F3A',
  lineHeight: 1.15,
  margin: 0,
  letterSpacing: '-0.02em',
  
  '@media': {
    '(max-width: 768px)': {
      fontSize: '2rem',
    },
    '(max-width: 480px)': {
      fontSize: '1.75rem',
    },
  },
});

export const lead = style({
  fontSize: '1.25rem',
  lineHeight: 1.65,
  color: '#475569',
  margin: 0,
  fontWeight: 400,
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '32px',
  
  '@media': {
    '(max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '28px',
    },
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '24px',
    },
  },
});

export const card = style({
  padding: '32px',
  borderRadius: '16px',
  background: '#ffffff',
  border: '2px solid #e2e8f0',
  display: 'grid',
  gap: '16px',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  position: 'relative',
  
  ':hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 16px 40px rgba(11, 31, 58, 0.12)',
    borderColor: '#38bdf8',
  },
  
  '@media': {
    '(max-width: 480px)': {
      padding: '24px',
    },
  },
});

export const cardTitle = style({
  fontSize: '1.625rem',
  fontWeight: 700,
  color: '#0B1F3A',
  margin: 0,
  lineHeight: 1.3,
});

export const cardDescription = style({
  fontSize: '1.0625rem',
  lineHeight: 1.7,
  color: '#475569',
  margin: 0,
});

export const cardLink = style({
  fontSize: '0.95rem',
  fontWeight: 600,
  // Darker blue for sufficient contrast on white background
  color: '#0369a1',
  marginTop: '8px',
  transition: 'all 0.2s ease',
  
  ':hover': {
    color: '#075985',
  },
});
