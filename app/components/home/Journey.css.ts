import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/tokens.css';

export const journeyWrap = style({
  display: 'grid',
  gap: vars.space.lg,
  gridTemplateColumns: '2fr 1fr',
  alignItems: 'start',
});

export const journeyPrimary = style({
  padding: vars.space.md,
});

export const journeySecondary = style({
  padding: vars.space.md,
  background: '#f8fafc',
  borderRadius: vars.radius.sm,
});

export const journeyTitle = style({
  fontSize: '1.5rem',
  margin: 0,
  color: vars.color.text,
});

export const journeyText = style({ color: vars.color.muted });

export const journeyActionRow = style({
  display: 'flex',
  gap: vars.space.md,
  marginTop: vars.space.md,
});
