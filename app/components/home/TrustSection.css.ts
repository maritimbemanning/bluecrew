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

// Partner/Client section
export const partnersSection = style({
  marginTop: '32px',
  paddingTop: '48px',
  borderTop: '1px solid #e2e8f0',
});

export const partnersHeader = style({
  textAlign: 'center',
  marginBottom: '32px',
});

export const partnersTitle = style({
  fontSize: '1.125rem',
  fontWeight: 600,
  color: '#64748b',
  margin: 0,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const partnersGrid = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '40px',

  '@media': {
    '(max-width: 768px)': {
      gap: '24px',
    },
  },
});

export const partnerCard = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  padding: '24px 32px',
  background: '#ffffff',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  textDecoration: 'none',
  color: 'inherit',
  transition: 'all 0.2s ease',

  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(11, 31, 58, 0.08)',
    borderColor: '#0369a1',
  },
});

export const partnerLogo = style({
  width: '140px',
  height: '80px',
  objectFit: 'contain',
  borderRadius: '8px',
});

export const partnerInfo = style({
  textAlign: 'center',
});

export const partnerName = style({
  fontSize: '1rem',
  fontWeight: 700,
  color: '#0f172a',
  margin: 0,
});

export const partnerType = style({
  fontSize: '0.875rem',
  color: '#64748b',
  margin: '4px 0 0 0',
});

export const partnerLinks = style({
  display: 'flex',
  gap: '12px',
  marginTop: '8px',
});

export const partnerLink = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  borderRadius: '8px',
  background: '#f1f5f9',
  color: '#64748b',
  transition: 'all 0.15s ease',

  ':hover': {
    background: '#0369a1',
    color: '#ffffff',
  },
});
