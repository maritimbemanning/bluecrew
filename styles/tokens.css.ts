import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    bg: '#ffffff',
    text: '#0f172a',
    primary: '#007eb6',
    accent: '#0ea5e9',
    muted: '#64748b',
    cta: '#0369a1',
    ctaText: '#ffffff',
    footer: '#475569',
  },
  space: {
    xxs: '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '40px',
  },
  radius: {
    sm: '6px',
    md: '12px',
  },
  shadow: {
    sm: '0 1px 2px rgba(2,6,23,0.06)',
    md: '0 8px 24px rgba(2,6,23,0.08)',
  },
});
