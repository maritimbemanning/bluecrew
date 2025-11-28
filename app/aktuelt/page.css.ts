import { style } from '@vanilla-extract/css';

export const section = style({
  padding: '80px 20px',
  background: '#f8fafc',
  minHeight: '100vh',

  '@media': {
    '(max-width: 768px)': {
      padding: '60px 16px',
    },
  },
});

export const container = style({
  maxWidth: '800px',
  margin: '0 auto',
});

export const title = style({
  fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
  fontWeight: 800,
  color: '#0f172a',
  marginBottom: '12px',
  letterSpacing: '-0.02em',
});

export const subtitle = style({
  fontSize: 'clamp(1rem, 2vw, 1.125rem)',
  color: '#64748b',
  marginBottom: '40px',
  maxWidth: '600px',
});

export const grid = style({
  display: 'grid',
  gap: '24px',
});

export const card = style({
  display: 'block',
  background: '#fff',
  borderRadius: '16px',
  overflow: 'hidden',
  border: '1px solid #e2e8f0',
  textDecoration: 'none',
  color: 'inherit',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',

  ':hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
  },
});

export const cardContent = style({
  padding: 'clamp(20px, 4vw, 32px)',
});

export const metaRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  marginBottom: '16px',
  fontSize: '14px',
  color: '#64748b',
});

export const metaItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});

export const cardTitle = style({
  fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
  fontWeight: 700,
  color: '#0f172a',
  marginBottom: '12px',
  lineHeight: 1.3,
});

export const cardExcerpt = style({
  fontSize: '15px',
  lineHeight: 1.7,
  color: '#475569',
  marginBottom: '20px',
});

export const readMore = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  color: '#0369a1',
  fontWeight: 600,
  fontSize: '15px',
});
