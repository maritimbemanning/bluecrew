import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/tokens.css';

export const floatingPhone = style({
  position: 'fixed',
  bottom: vars.space.lg,
  right: vars.space.lg,
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.xs,
  padding: `${vars.space.sm} ${vars.space.md}`,
  backgroundColor: '#0B1F3A',
  color: '#ffffff',
  borderRadius: '50px',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: 600,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  transition: 'all 0.2s ease',
  ':hover': {
    backgroundColor: '#0ea5e9',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      bottom: vars.space.md,
      right: vars.space.md,
      fontSize: '15px',
      padding: `${vars.space.xs} ${vars.space.sm}`,
    },
  },
});

export const icon = style({
  width: '20px',
  height: '20px',
  flexShrink: 0,
});

export const phoneNumber = style({
  whiteSpace: 'nowrap',
  '@media': {
    'screen and (max-width: 480px)': {
      display: 'none',
    },
  },
});
