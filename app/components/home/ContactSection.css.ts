import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/tokens.css';

export const section = style({
  padding: '100px 20px',
  background: '#f8fafc',
  
  '@media': {
    '(max-width: 768px)': {
      padding: '80px 20px',
    },
  },
});

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
});

export const split = style({
  display: 'grid',
  gap: '60px',
  gridTemplateColumns: '1fr 420px',
  alignItems: 'start',
  
  '@media': {
    '(max-width: 968px)': {
      gridTemplateColumns: '1fr',
      gap: '48px',
    },
  },
});

export const intro = style({
  display: 'grid',
  gap: '28px',
});

export const heading = style({
  fontSize: '2.75rem',
  fontWeight: 800,
  color: '#0B1F3A',
  margin: 0,
  lineHeight: 1.15,
  letterSpacing: '-0.02em',
  
  '@media': {
    '(max-width: 768px)': {
      fontSize: '2.25rem',
    },
  },
});

export const lead = style({
  fontSize: '1.25rem',
  lineHeight: 1.7,
  color: '#475569',
  margin: 0,
  fontWeight: 400,
});

export const list = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'grid',
  gap: '14px',
});

export const listItem = style({
  fontSize: '1.0625rem',
  color: '#475569',
  paddingLeft: '28px',
  position: 'relative',
  lineHeight: 1.6,
  
  '::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '10px',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#38bdf8',
  },
});

export const cta = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '16px 32px',
  background: '#38bdf8',
  color: '#0B1F3A',
  borderRadius: '12px',
  fontSize: '1rem',
  fontWeight: 700,
  textDecoration: 'none',
  boxShadow: '0 4px 16px rgba(56, 189, 248, 0.4)',
  transition: 'all 0.2s ease',
  marginTop: '8px',
  
  ':hover': {
    background: '#7dd3fc',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(56, 189, 248, 0.5)',
  },
});

export const card = style({
  background: 'linear-gradient(135deg, #0B1F3A 0%, #1e3a5f 100%)',
  color: '#ffffff',
  padding: '44px',
  borderRadius: '16px',
  display: 'grid',
  gap: '36px',
  boxShadow: '0 12px 32px rgba(11, 31, 58, 0.2)',
});

export const cardHeader = style({
  display: 'grid',
  gap: '14px',
});

export const cardTitle = style({
  margin: 0,
  fontSize: '1.875rem',
  fontWeight: 800,
  color: '#ffffff',
  lineHeight: 1.25,
});

export const cardDescription = style({
  margin: 0,
  color: 'rgba(255, 255, 255, 0.9)',
  lineHeight: 1.7,
  fontSize: '1.0625rem',
});

export const contactList = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'grid',
  gap: '20px',
});

export const contactItem = style({
  display: 'grid',
  gap: '6px',
});

export const contactLabel = style({
  fontWeight: 700,
  fontSize: '0.875rem',
  color: 'rgba(255, 255, 255, 0.7)',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
});

export const contactValue = style({
  color: '#38bdf8',
  fontSize: '1.1875rem',
  fontWeight: 600,
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  
  ':hover': {
    color: '#7dd3fc',
  },
});

export const legal = style({
  margin: 0,
  fontSize: '0.9375rem',
  color: 'rgba(255, 255, 255, 0.65)',
  lineHeight: 1.6,
});
