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

export const backLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  color: '#64748b',
  fontSize: '14px',
  fontWeight: 500,
  textDecoration: 'none',
  marginBottom: '24px',
  transition: 'color 0.15s ease',

  ':hover': {
    color: '#0369a1',
  },
});

export const header = style({
  marginBottom: '32px',
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

export const title = style({
  fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
  fontWeight: 800,
  color: '#0f172a',
  lineHeight: 1.2,
  letterSpacing: '-0.02em',
  margin: 0,
});

export const imageWrapper = style({
  position: 'relative',
  width: '100%',
  aspectRatio: '16/9',
  borderRadius: '16px',
  overflow: 'hidden',
  marginBottom: '32px',
  background: 'linear-gradient(135deg, #0a1628 0%, #1e3a5f 100%)',
});

export const photoCredit = style({
  position: 'absolute',
  bottom: '12px',
  right: '12px',
  fontSize: '12px',
  color: 'rgba(255, 255, 255, 0.8)',
  background: 'rgba(0, 0, 0, 0.5)',
  padding: '4px 10px',
  borderRadius: '6px',
});

export const contentCard = style({
  background: '#fff',
  borderRadius: '16px',
  padding: 'clamp(24px, 5vw, 40px)',
  border: '1px solid #e2e8f0',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
});

export const articleContent = style({
  fontSize: 'clamp(1rem, 2vw, 1.125rem)',
  lineHeight: 1.8,
  color: '#334155',
});

export const paragraph = style({
  marginBottom: '24px',
});

export const lastParagraph = style({
  marginBottom: '32px',
});

export const companyBox = style({
  background: '#f8fafc',
  borderRadius: '12px',
  padding: '24px',
  border: '1px solid #e2e8f0',
});

export const companyTitle = style({
  fontSize: '16px',
  fontWeight: 700,
  color: '#0f172a',
  marginBottom: '16px',
  marginTop: 0,
});

export const companyDescription = style({
  fontSize: '15px',
  color: '#475569',
  marginBottom: '20px',
  marginTop: 0,
});

export const socialLinks = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
});

export const linkedinButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 20px',
  background: '#0A66C2',
  color: '#fff',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 600,
  textDecoration: 'none',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease',

  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(10, 102, 194, 0.3)',
  },
});

export const facebookButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 20px',
  background: '#1877F2',
  color: '#fff',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 600,
  textDecoration: 'none',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease',

  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(24, 119, 242, 0.3)',
  },
});

export const ctaSection = style({
  marginTop: '40px',
  padding: '32px',
  background: 'linear-gradient(135deg, #0a1628 0%, #1e3a5f 100%)',
  borderRadius: '16px',
  textAlign: 'center',
  color: '#fff',
});

export const ctaTitle = style({
  fontSize: '20px',
  fontWeight: 700,
  marginBottom: '12px',
  marginTop: 0,
});

export const ctaDescription = style({
  fontSize: '15px',
  color: 'rgba(255, 255, 255, 0.8)',
  marginBottom: '24px',
  marginTop: 0,
});

export const ctaButton = style({
  display: 'inline-block',
  padding: '14px 28px',
  background: '#fff',
  color: '#0369a1',
  borderRadius: '10px',
  fontWeight: 700,
  fontSize: '15px',
  textDecoration: 'none',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease',

  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },
});
