import { globalStyle } from '@vanilla-extract/css';
import { vars } from './tokens.css';

globalStyle('html, body, #__next', { height: '100%' });
globalStyle('*, *::before, *::after', { boxSizing: 'border-box' });
globalStyle('body', {
  margin: 0,
  fontFamily:
    "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
  background: vars.color.bg,
  color: vars.color.text,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  lineHeight: 1.4,
});
globalStyle('a', { color: vars.color.primary, textDecoration: 'none' });
globalStyle('img', { maxWidth: '100%', height: 'auto' });
