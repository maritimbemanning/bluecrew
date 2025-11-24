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
  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  color: '#ffffff',
  borderRadius: '50px',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: 600,
  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
  transition: 'all 0.2s ease',
  ':hover': {
    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(245, 158, 11, 0.5)',
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
