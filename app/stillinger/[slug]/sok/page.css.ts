import { style } from '@vanilla-extract/css';

export const container = style({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #f8fafc 0%, #e0f2fe 100%)',
});

export const heroSection = style({
  background: 'linear-gradient(135deg, #0B1F3A 0%, #1e3a5f 50%, #0B1F3A 100%)',
  padding: '80px 0 60px',
  color: '#ffffff',
  position: 'relative',
  overflow: 'hidden',

  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 30% 20%, rgba(56, 189, 248, 0.15) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
});

export const heroInner = style({
  maxWidth: '800px',
  margin: '0 auto',
  padding: '0 24px',
  position: 'relative',
  zIndex: 1,
});

export const backLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  color: 'rgba(255, 255, 255, 0.8)',
  textDecoration: 'none',
  fontSize: '0.9375rem',
  fontWeight: 500,
  marginBottom: '24px',
  transition: 'color 0.2s ease',

  ':hover': {
    color: '#ffffff',
  },
});

export const jobBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 16px',
  background: 'rgba(56, 189, 248, 0.15)',
  border: '1px solid rgba(56, 189, 248, 0.3)',
  borderRadius: '20px',
  color: '#7dd3fc',
  fontSize: '0.875rem',
  fontWeight: 600,
  marginBottom: '16px',
});

export const heroTitle = style({
  fontSize: '2.25rem',
  fontWeight: 800,
  margin: '0 0 12px',
  lineHeight: 1.2,
  letterSpacing: '-0.02em',

  '@media': {
    'screen and (max-width: 640px)': {
      fontSize: '1.75rem',
    },
  },
});

export const heroMeta = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '1rem',
});

export const metaItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});

export const formSection = style({
  maxWidth: '700px',
  margin: '-40px auto 60px',
  padding: '0 24px',
  position: 'relative',
  zIndex: 10,
});

export const formCard = style({
  background: '#ffffff',
  borderRadius: '24px',
  boxShadow: '0 20px 60px rgba(15, 23, 42, 0.12), 0 8px 24px rgba(15, 23, 42, 0.08)',
  border: '1px solid rgba(226, 232, 240, 0.8)',
  overflow: 'hidden',
});

export const verifiedBanner = style({
  background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
  borderBottom: '1px solid #a7f3d0',
  padding: '20px 28px',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});

export const verifiedIcon = style({
  width: '48px',
  height: '48px',
  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  fontSize: '1.5rem',
  flexShrink: 0,
  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
});

export const verifiedContent = style({
  flex: 1,
});

export const verifiedTitle = style({
  fontSize: '1rem',
  fontWeight: 700,
  color: '#065f46',
  margin: '0 0 4px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const verifiedDetails = style({
  fontSize: '0.9375rem',
  color: '#047857',
  margin: 0,
});

export const formBody = style({
  padding: '32px 28px',
});

export const formTitle = style({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#0f172a',
  margin: '0 0 8px',
});

export const formSubtitle = style({
  fontSize: '1rem',
  color: '#64748b',
  margin: '0 0 28px',
  lineHeight: 1.5,
});

export const formGrid = style({
  display: 'grid',
  gap: '20px',
});

export const formGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const label = style({
  fontSize: '0.9375rem',
  fontWeight: 600,
  color: '#0f172a',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});

export const labelIcon = style({
  fontSize: '1.125rem',
  color: '#64748b',
});

export const required = style({
  color: '#ef4444',
  marginLeft: '2px',
});

export const input = style({
  padding: '14px 16px',
  borderRadius: '12px',
  border: '2px solid #e2e8f0',
  fontSize: '1rem',
  transition: 'all 0.2s ease',
  background: '#ffffff',

  ':focus': {
    outline: 'none',
    borderColor: '#0ea5e9',
    boxShadow: '0 0 0 4px rgba(14, 165, 233, 0.1)',
  },

  '::placeholder': {
    color: '#94a3b8',
  },
});

export const textarea = style([input, {
  minHeight: '120px',
  resize: 'vertical',
  fontFamily: 'inherit',
}]);

export const fileUpload = style({
  position: 'relative',
  border: '2px dashed #cbd5e1',
  borderRadius: '16px',
  padding: '32px 24px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  background: '#f8fafc',

  ':hover': {
    borderColor: '#0ea5e9',
    background: '#f0f9ff',
  },
});

export const fileUploadActive = style({
  borderColor: '#10b981',
  background: '#ecfdf5',
  borderStyle: 'solid',
});

export const fileUploadIcon = style({
  width: '48px',
  height: '48px',
  margin: '0 auto 12px',
  color: '#64748b',
});

export const fileUploadText = style({
  fontSize: '1rem',
  fontWeight: 600,
  color: '#0f172a',
  margin: '0 0 4px',
});

export const fileUploadHint = style({
  fontSize: '0.875rem',
  color: '#64748b',
  margin: 0,
});

export const fileUploadInput = style({
  position: 'absolute',
  inset: 0,
  opacity: 0,
  cursor: 'pointer',
});

export const fileName = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  marginTop: '12px',
  padding: '10px 16px',
  background: '#ecfdf5',
  borderRadius: '8px',
  color: '#065f46',
  fontWeight: 600,
  fontSize: '0.9375rem',
});

export const consentBox = style({
  background: '#f8fafc',
  borderRadius: '16px',
  padding: '20px',
  marginTop: '8px',
});

export const consentLabel = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  cursor: 'pointer',
  fontSize: '0.9375rem',
  color: '#334155',
  lineHeight: 1.6,
});

export const checkbox = style({
  width: '22px',
  height: '22px',
  marginTop: '2px',
  flexShrink: 0,
  cursor: 'pointer',
  accentColor: '#0ea5e9',
});

export const submitButton = style({
  width: '100%',
  padding: '18px 32px',
  background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
  color: '#ffffff',
  fontSize: '1.125rem',
  fontWeight: 700,
  borderRadius: '14px',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 8px 24px rgba(14, 165, 233, 0.35)',
  marginTop: '12px',

  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 32px rgba(14, 165, 233, 0.45)',
  },

  ':active': {
    transform: 'translateY(0)',
  },

  ':disabled': {
    opacity: 0.7,
    cursor: 'not-allowed',
    transform: 'none',
  },
});

export const submitButtonLoading = style({
  background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
  boxShadow: '0 8px 24px rgba(100, 116, 139, 0.35)',
});

export const trustFooter = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '20px',
  marginTop: '24px',
  paddingTop: '24px',
  borderTop: '1px solid #e2e8f0',
});

export const trustItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '0.875rem',
  color: '#64748b',
});

export const trustIcon = style({
  color: '#10b981',
  fontSize: '1rem',
});

export const errorMessage = style({
  background: '#fef2f2',
  border: '1px solid #fecaca',
  color: '#991b1b',
  padding: '14px 18px',
  borderRadius: '12px',
  fontSize: '0.9375rem',
  fontWeight: 600,
  marginBottom: '20px',
});

export const successCard = style({
  background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
  borderRadius: '24px',
  padding: '48px 32px',
  textAlign: 'center',
  boxShadow: '0 20px 60px rgba(16, 185, 129, 0.15)',
  border: '1px solid #a7f3d0',
});

export const successIcon = style({
  width: '80px',
  height: '80px',
  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 24px',
  color: '#ffffff',
  fontSize: '2.5rem',
  boxShadow: '0 12px 32px rgba(16, 185, 129, 0.4)',
});

export const successTitle = style({
  fontSize: '1.75rem',
  fontWeight: 800,
  color: '#065f46',
  margin: '0 0 12px',
});

export const successText = style({
  fontSize: '1.0625rem',
  color: '#047857',
  lineHeight: 1.6,
  margin: '0 0 32px',
  maxWidth: '500px',
  marginLeft: 'auto',
  marginRight: 'auto',
});

export const successActions = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'center',

  '@media': {
    'screen and (min-width: 480px)': {
      flexDirection: 'row',
      justifyContent: 'center',
    },
  },
});

export const successButton = style({
  padding: '14px 28px',
  borderRadius: '12px',
  fontSize: '1rem',
  fontWeight: 700,
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
});

export const successButtonPrimary = style([successButton, {
  background: '#065f46',
  color: '#ffffff',

  ':hover': {
    background: '#064e3b',
    transform: 'translateY(-2px)',
  },
}]);

export const successButtonSecondary = style([successButton, {
  background: 'transparent',
  color: '#065f46',
  border: '2px solid #065f46',

  ':hover': {
    background: '#065f46',
    color: '#ffffff',
  },
}]);

export const loadingState = style({
  padding: '80px 32px',
  textAlign: 'center',
});

export const spinner = style({
  width: '48px',
  height: '48px',
  border: '4px solid #e2e8f0',
  borderTopColor: '#0ea5e9',
  borderRadius: '50%',
  margin: '0 auto 20px',
  animation: 'spin 1s linear infinite',
});

export const loadingText = style({
  fontSize: '1.0625rem',
  color: '#64748b',
  fontWeight: 500,
});

export const notVerifiedCard = style({
  background: '#ffffff',
  borderRadius: '24px',
  padding: '48px 32px',
  textAlign: 'center',
  boxShadow: '0 20px 60px rgba(15, 23, 42, 0.12)',
  border: '1px solid #e2e8f0',
});

export const vippsButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '12px',
  padding: '18px 36px',
  background: '#FF5B24',
  color: '#ffffff',
  fontSize: '1.125rem',
  fontWeight: 700,
  borderRadius: '14px',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  boxShadow: '0 8px 24px rgba(255, 91, 36, 0.35)',
  marginTop: '24px',

  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 32px rgba(255, 91, 36, 0.45)',
  },
});

export const vippsLogo = style({
  width: '28px',
  height: '28px',
  borderRadius: '6px',
});
