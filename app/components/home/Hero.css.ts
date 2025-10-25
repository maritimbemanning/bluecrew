import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/tokens.css';

export const hero = style({
  position: 'relative',
  background: 'linear-gradient(135deg, #0B1F3A 0%, #1e3a5f 50%, #0B1F3A 100%)',
  backgroundImage: 'url(/hero/Skipper-styrmann-hero.jpeg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  paddingTop: '100px',
  paddingBottom: '100px',
  minHeight: '650px',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',

  // Add subtle pattern overlay to soften photo contrast
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  },

  '@media': {
    'screen and (max-width: 768px)': {
      paddingTop: '80px',
      paddingBottom: '80px',
      minHeight: '550px',
    },
  },
});

export const overlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(to right, rgba(11, 31, 58, 0.85), rgba(11, 31, 58, 0.6))',
  zIndex: 1,
});

export const heroInner = style({
  position: 'relative',
  zIndex: 2,

  '@media': {
    'screen and (max-width: 768px)': {
      padding: '0 20px',
    },
  },
});

export const heroContent = style({
  maxWidth: '800px',
  color: '#ffffff',
});

export const badge = style({
  display: 'inline-block',
  padding: '10px 20px',
  background: 'rgba(56, 189, 248, 0.12)',
  border: '1px solid rgba(56, 189, 248, 0.25)',
  borderRadius: '24px',
  color: '#7dd3fc',
  fontSize: '0.9375rem',
  fontWeight: 600,
  marginBottom: '28px',
  letterSpacing: '0.2px',
  fontStyle: 'italic',
});

export const title = style({
  fontSize: '3.75rem',
  lineHeight: 1.1,
  fontWeight: 800,
  color: '#ffffff',
  margin: 0,
  marginBottom: '28px',
  letterSpacing: '-0.02em',

  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '2rem',
      marginBottom: '20px',
    },
    'screen and (max-width: 480px)': {
      fontSize: '1.75rem',
      lineHeight: 1.2,
    },
  },
});

export const lead = style({
  fontSize: '1.3125rem',
  lineHeight: 1.65,
  color: 'rgba(255, 255, 255, 0.92)',
  marginBottom: '44px',
  maxWidth: '650px',
  fontWeight: 400,

  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '1.125rem',
      marginBottom: '32px',
    },
    'screen and (max-width: 480px)': {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
});

export const ctaGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginBottom: '56px',

  '@media': {
    'screen and (min-width: 640px)': {
      flexDirection: 'row',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: '16px',
    },
    'screen and (max-width: 480px)': {
      marginBottom: '40px',
    },
  },
});

export const primaryCta = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const phoneCta = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const btnPrimaryLarge = style({
  fontSize: '1.0625rem',
  padding: '16px 32px',
  fontWeight: 700,
  background: '#38bdf8',
  color: '#0B1F3A',
  borderRadius: '12px',
  boxShadow: '0 4px 16px rgba(56, 189, 248, 0.4)',
  transition: 'all 0.2s ease',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  textDecoration: 'none',
  minHeight: '48px',
  width: '100%',

  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(56, 189, 248, 0.5)',
    background: '#7dd3fc',
  },

  '@media': {
    'screen and (min-width: 640px)': {
      width: 'auto',
    },
    'screen and (max-width: 480px)': {
      fontSize: '1rem',
      padding: '14px 24px',
    },
  },
});

export const btnSecondary = style({
  fontSize: '0.95rem',
  padding: '14px 24px',
  fontWeight: 600,
  background: 'rgba(255, 255, 255, 0.08)',
  color: 'rgba(255, 255, 255, 0.9)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '12px',
  transition: 'all 0.2s ease',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  textDecoration: 'none',

  ':hover': {
    background: 'rgba(255, 255, 255, 0.12)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    transform: 'translateY(-1px)',
  },
});

export const btnLarge = style({
  fontSize: '1rem',
  padding: '16px 32px',
  fontWeight: 600,
  background: '#38bdf8',
  color: '#0B1F3A',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(56, 189, 248, 0.3)',
  transition: 'all 0.2s ease',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',

  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(56, 189, 248, 0.4)',
    background: '#7dd3fc',
  },
});

export const btnSecondaryLarge = style({
  fontSize: '1.0625rem',
  padding: '16px 32px',
  fontWeight: 700,
  background: 'rgba(255, 255, 255, 0.15)',
  color: '#ffffff',
  border: '2px solid rgba(255, 255, 255, 0.4)',
  borderRadius: '12px',
  transition: 'all 0.2s ease',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',

  ':hover': {
    background: 'rgba(255, 255, 255, 0.25)',
    borderColor: 'rgba(255, 255, 255, 0.6)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
  },
});

export const phoneIcon = style({
  fontSize: '1.25rem',
});

export const ctaSubtext = style({
  fontSize: '0.875rem',
  color: 'rgba(255, 255, 255, 0.7)',
  margin: 0,
  fontStyle: 'italic',
});

export const trustBadges = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  paddingTop: '32px',
  borderTop: '1px solid rgba(255, 255, 255, 0.15)',
  maxWidth: '600px',

  '@media': {
    'screen and (min-width: 640px)': {
      flexDirection: 'row',
      gap: '28px',
      paddingTop: '40px',
    },
    'screen and (max-width: 480px)': {
      paddingTop: '28px',
      gap: '12px',
    },
  },
});

export const trustItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

export const trustIcon = style({
  fontSize: '1.25rem',
  fontWeight: 'bold',
  color: '#38bdf8',
  flexShrink: 0,
});

export const trustLabel = style({
  fontSize: '0.9375rem',
  color: 'rgba(255, 255, 255, 0.87)',
  lineHeight: 1.5,
  fontWeight: 500,

  '@media': {
    'screen and (max-width: 480px)': {
      fontSize: '0.875rem',
    },
  },
});

export const candidateCta = style({
  marginTop: '32px',
  paddingTop: '32px',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
});

export const candidateButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  padding: '16px 32px',
  background: '#38bdf8',
  color: '#0B1F3A',
  borderRadius: '12px',
  fontSize: '1rem',
  fontWeight: 700,
  textDecoration: 'none',
  boxShadow: '0 4px 16px rgba(56, 189, 248, 0.4)',
  transition: 'all 0.2s ease',
  border: 'none',
  minHeight: '48px',
  width: '100%',
  justifyContent: 'center',

  ':hover': {
    background: '#7dd3fc',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(56, 189, 248, 0.5)',
  },

  ':active': {
    transform: 'translateY(0)',
  },

  '@media': {
    'screen and (min-width: 640px)': {
      width: 'auto',
      justifyContent: 'flex-start',
    },
    'screen and (max-width: 480px)': {
      padding: '14px 24px',
      fontSize: '0.9375rem',
    },
  },
});

export const candidateButtonContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1px',
  alignItems: 'flex-start',
});

export const candidateButtonTitle = style({
  fontSize: '1rem',
  fontWeight: 700,
});

export const candidateButtonSubtext = style({
  fontSize: '0.8125rem',
  opacity: 0.85,
  fontWeight: 400,
});

export const candidateIcon = style({
  fontSize: '1.75rem',
  flexShrink: 0,
  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
});

export const sideCard = style({
  background: '#ffffff',
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  boxShadow: vars.shadow.md,
});
