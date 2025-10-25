import { style } from '@vanilla-extract/css';
import { vars } from './tokens.css';

export const container = style({
  maxWidth: 1100,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: vars.space.md,
  paddingRight: vars.space.md,
});

export const btn = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '0.5rem 1rem',
  borderRadius: vars.radius.sm,
  fontWeight: 600,
  cursor: 'pointer',
  border: 'none',
  textDecoration: 'none',
  transition: 'background-color 160ms ease, box-shadow 160ms ease',
});

export const btnPrimary = style([{ background: vars.color.cta, color: vars.color.ctaText, boxShadow: vars.shadow.sm }]);

export const btnSecondary = style([{ background: 'transparent', color: vars.color.primary, border: '1px solid rgba(2,6,23,0.06)' }]);

export const focusRing = style({
  selectors: {
    '&:focus': {
      outline: `3px solid ${vars.color.primary}`,
      outlineOffset: 2,
    },
  },
});
