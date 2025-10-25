import { style } from '@vanilla-extract/css';

export const section = style({
  padding: '100px 20px',
  background: '#f8fafc',
  borderTop: '1px solid #e2e8f0',
  
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
  gap: '64px',
});

export const header = style({
  textAlign: 'center',
  maxWidth: '800px',
  margin: '0 auto',
  display: 'grid',
  gap: '20px',
});

export const title = style({
  fontSize: '2.75rem',
  fontWeight: 800,
  color: '#0B1F3A',
  lineHeight: 1.15,
  margin: 0,
  letterSpacing: '-0.02em',
  
  '@media': {
    '(max-width: 768px)': {
      fontSize: '2.25rem',
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
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '40px',
  
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '32px',
    },
  },
});

export const card = style({
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '36px',
  display: 'grid',
  gap: '16px',
  transition: 'all 0.3s ease',
  
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 24px rgba(11, 31, 58, 0.1)',
    borderColor: '#cbd5e1',
  },
});

export const icon = style({
  fontSize: '2.5rem',
  lineHeight: 1,
});

export const cardTitle = style({
  fontSize: '1.375rem',
  fontWeight: 700,
  color: '#0B1F3A',
  margin: 0,
  lineHeight: 1.3,
});

export const cardText = style({
  fontSize: '1.0625rem',
  lineHeight: 1.7,
  color: '#475569',
  margin: 0,
});
