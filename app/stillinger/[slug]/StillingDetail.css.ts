import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "../../../styles/tokens.css";

// Animations
const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const slideUp = keyframes({
  "0%": { opacity: 0, transform: "translateY(20px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const pulse = keyframes({
  "0%, 100%": { transform: "scale(1)" },
  "50%": { transform: "scale(1.05)" },
});

// Section
export const section = style({
  paddingTop: 0,
  paddingBottom: vars.space.xl,
  background: "#f8fafc",
  minHeight: "100vh",
});

// Container
export const container = style({
  maxWidth: 1140,
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: vars.space.md,
  paddingRight: vars.space.md,
});

// Back Button
export const backButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: "10px 16px",
  marginBottom: vars.space.lg,
  marginTop: vars.space.lg,
  color: "#64748b",
  fontSize: "0.9rem",
  fontWeight: 500,
  textDecoration: "none",
  borderRadius: vars.radius.sm,
  transition: "all 150ms ease",
  background: "transparent",
  ":hover": {
    color: vars.color.primary,
    background: "#f0f9ff",
  },
});

// Hero Section - Full width gradient
export const hero = style({
  background: "linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #0d2847 100%)",
  color: "#fff",
  padding: "clamp(40px, 6vw, 60px) 0",
  marginBottom: vars.space.xl,
  position: "relative",
  overflow: "hidden",
  animation: `${fadeIn} 400ms ease-out`,
  "::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 50%)",
    pointerEvents: "none",
  },
});

export const heroInner = style({
  maxWidth: 1140,
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: vars.space.md,
  paddingRight: vars.space.md,
  position: "relative",
  zIndex: 1,
});

// Badges Row
export const badges = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.sm,
  marginBottom: vars.space.lg,
});

export const badge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "8px 16px",
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(8px)",
  borderRadius: "999px",
  fontSize: "0.8125rem",
  fontWeight: 600,
  border: "1px solid rgba(255,255,255,0.1)",
});

export const badgeUrgent = style({
  background: "rgba(239, 68, 68, 0.9)",
  border: "1px solid rgba(239, 68, 68, 0.3)",
  animation: `${pulse} 2s ease-in-out infinite`,
});

export const badgeFast = style({
  background: "rgba(34, 197, 94, 0.2)",
  border: "1px solid rgba(34, 197, 94, 0.3)",
  color: "#86efac",
});

export const badgeVikariat = style({
  background: "rgba(251, 191, 36, 0.2)",
  border: "1px solid rgba(251, 191, 36, 0.3)",
  color: "#fcd34d",
});

// Title
export const title = style({
  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
  fontWeight: 800,
  marginBottom: vars.space.md,
  lineHeight: 1.15,
  letterSpacing: "-0.02em",
  maxWidth: 800,
});

// Meta Row
export const metaRow = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: vars.space.lg,
  color: "rgba(226, 232, 240, 0.9)",
  fontSize: "0.9375rem",
  marginBottom: vars.space.md,
});

export const metaItemLight = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.xs,
  color: "rgba(226, 232, 240, 0.9)",
});

// Salary
export const salary = style({
  marginTop: vars.space.md,
  fontSize: "1.375rem",
  fontWeight: 700,
  color: "#86efac",
  display: "flex",
  alignItems: "center",
  gap: vars.space.xs,
});

// Main Grid
export const grid = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: vars.space.xl,
  "@media": {
    "(min-width: 900px)": {
      gridTemplateColumns: "1fr 380px",
      alignItems: "start",
    },
  },
});

// Main Content Column
export const mainContent = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

// Card
export const card = style({
  background: "#ffffff",
  borderRadius: "16px",
  padding: "clamp(20px, 4vw, 32px)",
  border: "1px solid #e2e8f0",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  animation: `${slideUp} 400ms ease-out`,
});

// Section Title
export const sectionTitle = style({
  fontSize: "1.25rem",
  fontWeight: 700,
  color: vars.color.text,
  marginBottom: vars.space.lg,
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  paddingBottom: vars.space.md,
  borderBottom: "2px solid #f1f5f9",
});

// Description
export const description = style({
  fontSize: "1rem",
  lineHeight: 1.8,
  color: "#475569",
  whiteSpace: "pre-wrap",
});

// List
export const list = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const listItem = style({
  display: "flex",
  alignItems: "flex-start",
  gap: vars.space.sm,
  fontSize: "0.95rem",
  lineHeight: 1.6,
  color: "#475569",
  padding: vars.space.sm,
  borderRadius: vars.radius.sm,
  transition: "background 150ms ease",
  ":hover": {
    background: "#f8fafc",
  },
});

export const listIcon = style({
  flexShrink: 0,
  marginTop: 2,
});

// Sidebar
export const sidebar = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
  "@media": {
    "(min-width: 900px)": {
      position: "sticky",
      top: 100,
    },
  },
});

// CTA Card
export const ctaCard = style({
  background: "linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #0d2847 100%)",
  color: "#fff",
  borderRadius: "16px",
  padding: "clamp(24px, 4vw, 32px)",
  boxShadow: "0 20px 40px rgba(10, 22, 40, 0.3)",
  position: "relative",
  overflow: "hidden",
  "::before": {
    content: '""',
    position: "absolute",
    top: "-50%",
    right: "-50%",
    width: "100%",
    height: "100%",
    background: "radial-gradient(circle, rgba(14, 165, 233, 0.2) 0%, transparent 70%)",
    pointerEvents: "none",
  },
});

export const ctaTitle = style({
  fontSize: "1.5rem",
  fontWeight: 700,
  marginBottom: vars.space.lg,
  position: "relative",
  zIndex: 1,
});

// Deadline Box
export const deadlineBox = style({
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(8px)",
  borderRadius: "12px",
  padding: vars.space.md,
  marginBottom: vars.space.lg,
  border: "1px solid rgba(255,255,255,0.1)",
  position: "relative",
  zIndex: 1,
});

export const deadlineLabel = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.xs,
  fontSize: "0.875rem",
  fontWeight: 600,
  marginBottom: vars.space.xs,
  color: "rgba(226, 232, 240, 0.8)",
});

export const deadlineDate = style({
  fontSize: "1.25rem",
  fontWeight: 700,
});

export const deadlineRemaining = style({
  fontSize: "0.875rem",
  color: "rgba(226, 232, 240, 0.7)",
  marginTop: vars.space.xxs,
});

export const deadlineUrgent = style({
  color: "#fde68a",
  fontWeight: 600,
});

// CTA Button
export const ctaButton = style({
  width: "100%",
  padding: "18px 24px",
  background: "#ffffff",
  color: "#0369a1",
  border: "none",
  borderRadius: "12px",
  fontSize: "1rem",
  fontWeight: 700,
  cursor: "pointer",
  transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
  marginBottom: vars.space.md,
  position: "relative",
  zIndex: 1,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  ":hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
  },
  ":active": {
    transform: "translateY(0)",
  },
});

export const ctaNote = style({
  fontSize: "0.8125rem",
  color: "rgba(226, 232, 240, 0.6)",
  textAlign: "center",
  position: "relative",
  zIndex: 1,
});

// Details Card
export const detailsCard = style({
  background: "#ffffff",
  borderRadius: "16px",
  padding: "clamp(20px, 4vw, 28px)",
  border: "1px solid #e2e8f0",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
});

export const detailsTitle = style({
  fontSize: "1rem",
  fontWeight: 700,
  color: vars.color.text,
  marginBottom: vars.space.lg,
  paddingBottom: vars.space.sm,
  borderBottom: "2px solid #f1f5f9",
});

export const detailsList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const detailItem = style({
  display: "flex",
  alignItems: "flex-start",
  gap: vars.space.sm,
  padding: vars.space.sm,
  borderRadius: vars.radius.sm,
  transition: "background 150ms ease",
  ":hover": {
    background: "#f8fafc",
  },
});

export const detailIcon = style({
  color: "#94a3b8",
  flexShrink: 0,
  marginTop: 2,
});

export const detailContent = style({
  flex: 1,
});

export const detailLabel = style({
  fontSize: "0.75rem",
  color: "#94a3b8",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  fontWeight: 600,
});

export const detailValue = style({
  fontSize: "0.9375rem",
  fontWeight: 600,
  color: vars.color.text,
  marginTop: vars.space.xxs,
});

// Share Button
export const shareButton = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.xs,
  padding: "12px 16px",
  background: "transparent",
  border: "1px solid #e2e8f0",
  borderRadius: vars.radius.sm,
  fontSize: "0.875rem",
  fontWeight: 500,
  color: "#64748b",
  cursor: "pointer",
  marginTop: vars.space.lg,
  transition: "all 150ms ease",
  ":hover": {
    background: "#f8fafc",
    borderColor: "#cbd5e1",
    color: vars.color.text,
  },
});

// Expired Card
export const expiredCard = style({
  textAlign: "center",
  padding: vars.space.xl,
});

export const expiredIcon = style({
  width: 56,
  height: 56,
  marginBottom: vars.space.md,
  marginLeft: "auto",
  marginRight: "auto",
  color: "rgba(239, 68, 68, 0.8)",
});

export const expiredTitle = style({
  fontSize: "1.25rem",
  fontWeight: 700,
  marginBottom: vars.space.sm,
});

export const expiredText = style({
  fontSize: "0.9rem",
  color: "rgba(226, 232, 240, 0.7)",
});

// Loading State
export const loadingState = style({
  minHeight: "60vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: vars.space.xl,
});

export const loadingSpinner = style({
  width: 56,
  height: 56,
  border: "4px solid #e2e8f0",
  borderTopColor: vars.color.primary,
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  marginBottom: vars.space.lg,
});

// Error State
export const errorState = style({
  minHeight: "60vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: vars.space.xl,
  background: "#fff",
  borderRadius: "16px",
  margin: vars.space.xl,
  border: "1px solid #e2e8f0",
});

export const errorIcon = style({
  width: 72,
  height: 72,
  color: "#ef4444",
  marginBottom: vars.space.lg,
});

export const errorTitle = style({
  fontSize: "1.75rem",
  fontWeight: 700,
  color: vars.color.text,
  marginBottom: vars.space.sm,
});

export const errorText = style({
  color: "#64748b",
  marginBottom: vars.space.xl,
  maxWidth: 400,
});

export const primaryButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: "16px 28px",
  background: vars.color.primary,
  color: "#fff",
  borderRadius: "12px",
  fontWeight: 600,
  textDecoration: "none",
  transition: "all 200ms ease",
  boxShadow: "0 4px 12px rgba(3, 105, 161, 0.2)",
  ":hover": {
    background: "#0284c7",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(3, 105, 161, 0.3)",
  },
});

// Legacy exports for backward compatibility
export const header = style({});
export const meta = style({});
export const metaItem = style({});
export const metaIcon = style({});
export const sectionBlock = style({});
export const ctaSection = style({});
export const ctaText = style({});
