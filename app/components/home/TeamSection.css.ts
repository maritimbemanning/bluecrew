import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/tokens.css';

export const teamAccent = style({
  color: vars.color.primary,
  fontWeight: 700,
});

export const teamGrid = style({
  display: 'grid',
  gap: vars.space.md,
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
});

export const teamCard = style({
  background: '#fff',
  borderRadius: vars.radius.sm,
  overflow: 'hidden',
  boxShadow: vars.shadow.sm,
});

export const teamPortrait = style({
  width: '100%',
  height: 200,
  position: 'relative',
});

export const teamQuote = style({
  padding: vars.space.md,
  fontStyle: 'italic',
  color: vars.color.muted,
});

export const teamMeta = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: `0 ${vars.space.md} ${vars.space.md} ${vars.space.md}`,
});

export const teamName = style({ fontWeight: 700 });

export const teamRole = style({ color: vars.color.muted });
