import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/tokens.css';

export const section = style({
  paddingTop: vars.space.xl,
  paddingBottom: vars.space.xl,
});

export const grid = style({
  display: 'grid',
  gap: vars.space.lg,
  gridTemplateColumns: '1fr 1fr',
});

export const storyTitle = style({
  fontSize: '1.25rem',
  color: vars.color.text,
  margin: 0,
});

export const storyText = style({
  color: vars.color.muted,
  marginTop: vars.space.sm,
});
