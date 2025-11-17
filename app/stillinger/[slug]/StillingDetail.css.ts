import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/tokens.css';

export const section = style({
  paddingTop: vars.space.xl,
  paddingBottom: vars.space.xl,
  background: vars.color.bg,
});

export const backButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space.xs,
  padding: '0.5rem 1rem',
  marginBottom: vars.space.lg,
  color: vars.color.primary,
  fontSize: '0.9rem',
  fontWeight: 600,
  textDecoration: 'none',
  transition: 'opacity 160ms ease',
  ':hover': {
    opacity: 0.8,
  },
});

export const container = style({
  maxWidth: 800,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: vars.space.md,
  paddingRight: vars.space.md,
});

export const header = style({
  marginBottom: vars.space.xl,
});

export const title = style({
  fontSize: '2.5rem',
  fontWeight: 700,
  color: vars.color.text,
  marginBottom: vars.space.md,
  lineHeight: 1.2,
});

export const meta = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space.lg,
  marginTop: vars.space.md,
  paddingTop: vars.space.md,
  borderTop: '1px solid rgba(2,6,23,0.06)',
});

export const metaItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.xs,
  fontSize: '0.9rem',
  color: vars.color.muted,
});

export const metaIcon = style({
  width: 18,
  height: 18,
});

export const badge = style({
  display: 'inline-block',
  padding: '0.25rem 0.75rem',
  borderRadius: vars.radius.sm,
  fontSize: '0.75rem',
  fontWeight: 600,
  marginRight: vars.space.sm,
});

export const badgeVikariat = style({
  background: '#fef3c7',
  color: '#92400e',
});

export const badgeFast = style({
  background: '#d1fae5',
  color: '#065f46',
});

export const content = style({
  marginTop: vars.space.xl,
});

export const section = style({
  marginBottom: vars.space.xl,
});

export const sectionTitle = style({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: vars.color.text,
  marginBottom: vars.space.md,
});

export const description = style({
  fontSize: '1rem',
  lineHeight: 1.7,
  color: vars.color.text,
  marginBottom: vars.space.lg,
});

export const list = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const listItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: vars.space.sm,
  marginBottom: vars.space.sm,
  fontSize: '0.95rem',
  lineHeight: 1.6,
  color: vars.color.text,
  ':before': {
    content: '"✓"',
    color: vars.color.primary,
    fontWeight: 700,
    fontSize: '1.1rem',
    flexShrink: 0,
  },
});

export const ctaSection = style({
  marginTop: vars.space.xl,
  padding: vars.space.xl,
  background: '#f8fafc',
  borderRadius: vars.radius.md,
  border: '1px solid rgba(2,6,23,0.06)',
  textAlign: 'center',
});

export const ctaTitle = style({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: vars.color.text,
  marginBottom: vars.space.md,
});

export const ctaText = style({
  fontSize: '1rem',
  color: vars.color.muted,
  marginBottom: vars.space.lg,
  maxWidth: 600,
  marginLeft: 'auto',
  marginRight: 'auto',
});

export const loadingState = style({
  textAlign: 'center',
  padding: vars.space.xl,
});

export const loadingSpinner = style({
  width: 40,
  height: 40,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: vars.space.md,
  animation: 'spin 1s linear infinite',
  color: vars.color.primary,
});

export const errorState = style({
  textAlign: 'center',
  padding: vars.space.xl,
  color: '#ef4444',
});
