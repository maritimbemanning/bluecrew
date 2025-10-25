import { style } from '@vanilla-extract/css';

export const section = style({
  padding: '120px 20px',
  background: 'linear-gradient(135deg, #0B1F3A 0%, #1e3a5f 100%)',
  backgroundImage: 'url(/hero/skipper_matros_lønn.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  position: 'relative',
  borderTop: '4px solid #38bdf8',
  borderBottom: '4px solid #38bdf8',
  
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(11, 31, 58, 0.92) 0%, rgba(30, 58, 95, 0.88) 100%)',
    zIndex: 0,
  },
  
  '@media': {
    '(max-width: 768px)': {
      padding: '100px 20px',
    },
  },
});

export const container = style({
  maxWidth: '900px',
  margin: '0 auto',
  position: 'relative',
  zIndex: 1,
});

export const content = style({
  textAlign: 'center',
  display: 'grid',
  gap: '28px',
});

export const badge = style({
  display: 'inline-block',
  background: '#38bdf8',
  color: '#0B1F3A',
  padding: '12px 28px',
  borderRadius: '12px',
  fontSize: '1rem',
  fontWeight: 700,
  border: 'none',
  boxShadow: '0 4px 16px rgba(56, 189, 248, 0.4)',
  textTransform: 'uppercase',
  letterSpacing: '1px',
});

export const title = style({
  fontSize: '3.25rem',
  fontWeight: 800,
  color: '#ffffff',
  lineHeight: 1.1,
  margin: 0,
  letterSpacing: '-0.02em',
  
  '@media': {
    '(max-width: 768px)': {
      fontSize: '2.5rem',
    },
  },
});

export const lead = style({
  fontSize: '1.25rem',
  lineHeight: 1.7,
  color: 'rgba(255, 255, 255, 0.9)',
  margin: '0 auto',
  maxWidth: '700px',
  fontWeight: 400,
});

export const actions = style({
  display: 'flex',
  gap: '16px',
  marginTop: '32px',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
});

export const btnPrimary = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '18px 36px',
  background: '#38bdf8',
  color: '#0B1F3A',
  borderRadius: '12px',
  fontSize: '1.125rem',
  fontWeight: 700,
  textDecoration: 'none',
  boxShadow: '0 6px 20px rgba(56, 189, 248, 0.5)',
  transition: 'all 0.2s ease',
  
  ':hover': {
    background: '#7dd3fc',
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 28px rgba(56, 189, 248, 0.6)',
  },
});

export const btnSecondary = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '16px 32px',
  background: 'rgba(255, 255, 255, 0.1)',
  color: '#ffffff',
  borderRadius: '12px',
  fontSize: '1rem',
  fontWeight: 600,
  textDecoration: 'none',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  transition: 'all 0.2s ease',
  
  ':hover': {
    background: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    transform: 'translateY(-2px)',
  },
});
