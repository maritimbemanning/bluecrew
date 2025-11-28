import { style } from '@vanilla-extract/css';

export const section = style({
  padding: '80px 20px',
  background: '#0B1F3A',

  '@media': {
    '(max-width: 768px)': {
      padding: '60px 20px',
    },
  },
});

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '32px',

  '@media': {
    '(max-width: 640px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '16px',
    },
  },
});

export const title = style({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#ffffff',
  margin: 0,
});

export const viewAllLink = style({
  fontSize: '0.9375rem',
  fontWeight: 500,
  color: '#38bdf8',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  transition: 'color 0.15s ease',

  ':hover': {
    color: '#7dd3fc',
  },
});

export const card = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '0',
  background: '#ffffff',
  borderRadius: '16px',
  overflow: 'hidden',
  textDecoration: 'none',
  color: 'inherit',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',

  ':hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  },

  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const imageWrapper = style({
  position: 'relative',
  aspectRatio: '16/10',
  overflow: 'hidden',

  '@media': {
    '(max-width: 768px)': {
      aspectRatio: '16/9',
    },
  },
});

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const photoCredit = style({
  position: 'absolute',
  bottom: '8px',
  right: '8px',
  fontSize: '0.6875rem',
  color: 'rgba(255, 255, 255, 0.7)',
  background: 'rgba(0, 0, 0, 0.5)',
  padding: '4px 8px',
  borderRadius: '4px',
});

export const content = style({
  padding: '40px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '16px',

  '@media': {
    '(max-width: 768px)': {
      padding: '24px',
    },
  },
});

export const tag = style({
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#0369a1',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const cardTitle = style({
  fontSize: '1.75rem',
  fontWeight: 700,
  color: '#0B1F3A',
  margin: 0,
  lineHeight: 1.3,

  '@media': {
    '(max-width: 768px)': {
      fontSize: '1.5rem',
    },
  },
});

export const cardDescription = style({
  fontSize: '1rem',
  lineHeight: 1.6,
  color: '#475569',
  margin: 0,
});

export const readMore = style({
  fontSize: '0.9375rem',
  fontWeight: 600,
  color: '#0369a1',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  marginTop: '8px',
});
