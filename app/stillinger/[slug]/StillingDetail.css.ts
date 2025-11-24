import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/tokens.css";

export const section = style({
  paddingTop: vars.space.lg,
  paddingBottom: vars.space.xl,
  background: vars.color.bg,
});

export const backButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: "0.5rem 1rem",
  marginBottom: vars.space.lg,
  color: vars.color.primary,
  fontSize: "0.9rem",
  fontWeight: 600,
  textDecoration: "none",
  transition: "opacity 160ms ease",
  ":hover": {
    opacity: 0.8,
  },
});

export const container = style({
  maxWidth: 1100,
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: vars.space.md,
  paddingRight: vars.space.md,
});

export const hero = style({
  background: "linear-gradient(155deg, #0a1d39 0%, #0f2648 55%, #051427 100%)",
  color: "#fff",
  padding: vars.space.xl,
  marginBottom: vars.space.xl,
  borderRadius: vars.radius.md,
});

export const badges = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.sm,
  marginBottom: vars.space.md,
});

export const badge = style({
  display: "inline-block",
  padding: "6px 14px",
  background: "rgba(255,255,255,0.15)",
  borderRadius: "999px",
  fontSize: "0.8125rem",
  fontWeight: 600,
});

export const badgeUrgent = style({
  background: "#ef4444",
});

export const header = style({
  marginBottom: vars.space.xl,
});

export const title = style({
  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
  fontWeight: 800,
  marginBottom: vars.space.md,
  lineHeight: 1.15,
  letterSpacing: "-0.02em",
});

export const meta = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.lg,
  marginTop: vars.space.md,
  paddingTop: vars.space.md,
  borderTop: "1px solid rgba(2,6,23,0.06)",
});

export const metaRow = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: vars.space.lg,
  color: "rgba(226, 232, 240, 0.9)",
  fontSize: "0.9375rem",
});

export const metaItem = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.xs,
  fontSize: "0.9rem",
  color: vars.color.muted,
});

export const metaItemLight = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.xs,
  color: "rgba(226, 232, 240, 0.9)",
});

export const metaIcon = style({
  width: 18,
  height: 18,
});

export const salary = style({
  marginTop: vars.space.md,
  fontSize: "1.25rem",
  fontWeight: 700,
  color: "#86efac",
  display: "flex",
  alignItems: "center",
  gap: vars.space.xs,
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: vars.space.lg,
  "@media": {
    "(min-width: 900px)": {
      gridTemplateColumns: "1fr 340px",
      alignItems: "start",
    },
  },
});

export const mainContent = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const card = style({
  background: "#fff",
  borderRadius: vars.radius.md,
  padding: vars.space.lg,
  border: "1px solid rgba(2,6,23,0.06)",
  boxShadow: vars.shadow.sm,
});

export const sectionBlock = style({
  marginBottom: vars.space.xl,
});

export const sectionTitle = style({
  fontSize: "1.25rem",
  fontWeight: 700,
  color: vars.color.text,
  marginBottom: vars.space.md,
});

export const description = style({
  fontSize: "1rem",
  lineHeight: 1.7,
  color: vars.color.muted,
  whiteSpace: "pre-wrap",
});

export const list = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const listItem = style({
  display: "flex",
  alignItems: "flex-start",
  gap: vars.space.sm,
  fontSize: "0.95rem",
  lineHeight: 1.6,
  color: vars.color.muted,
});

export const listIcon = style({
  flexShrink: 0,
  marginTop: 2,
});

export const sidebar = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const ctaCard = style({
  background: "linear-gradient(155deg, #0a1d39 0%, #0f2648 55%, #051427 100%)",
  color: "#fff",
  borderRadius: vars.radius.md,
  padding: vars.space.lg,
  position: "sticky",
  top: 100,
});

export const ctaSection = style({
  marginTop: vars.space.xl,
  padding: vars.space.xl,
  background: "#f8fafc",
  borderRadius: vars.radius.md,
  border: "1px solid rgba(2,6,23,0.06)",
  textAlign: "center",
});

export const ctaTitle = style({
  fontSize: "1.5rem",
  fontWeight: 700,
  marginBottom: vars.space.md,
});

export const ctaText = style({
  fontSize: "1rem",
  color: vars.color.muted,
  marginBottom: vars.space.lg,
  maxWidth: 600,
  marginLeft: "auto",
  marginRight: "auto",
});

export const deadlineBox = style({
  background: "rgba(255,255,255,0.1)",
  borderRadius: vars.radius.sm,
  padding: vars.space.md,
  marginBottom: vars.space.md,
});

export const deadlineLabel = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.xs,
  fontSize: "0.875rem",
  fontWeight: 600,
  marginBottom: vars.space.xs,
});

export const deadlineDate = style({
  fontSize: "1.125rem",
  fontWeight: 700,
});

export const deadlineRemaining = style({
  fontSize: "0.875rem",
  color: "rgba(226, 232, 240, 0.8)",
  marginTop: vars.space.xxs,
});

export const deadlineUrgent = style({
  color: "#fde68a",
  fontWeight: 600,
});

export const ctaButton = style({
  width: "100%",
  padding: "16px 24px",
  background: "#fff",
  color: "#0369a1",
  border: "none",
  borderRadius: vars.radius.sm,
  fontSize: "1rem",
  fontWeight: 700,
  cursor: "pointer",
  transition: "transform 150ms ease, box-shadow 150ms ease",
  marginBottom: vars.space.md,
  ":hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
  },
});

export const ctaNote = style({
  fontSize: "0.8125rem",
  color: "rgba(226, 232, 240, 0.7)",
  textAlign: "center",
});

export const detailsCard = style({
  background: "#fff",
  borderRadius: vars.radius.md,
  padding: vars.space.lg,
  border: "1px solid rgba(2,6,23,0.06)",
  boxShadow: vars.shadow.sm,
});

export const detailsTitle = style({
  fontSize: "1rem",
  fontWeight: 700,
  color: vars.color.text,
  marginBottom: vars.space.md,
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
});

export const detailIcon = style({
  color: vars.color.muted,
  flexShrink: 0,
  marginTop: 2,
});

export const detailContent = style({
  flex: 1,
});

export const detailLabel = style({
  fontSize: "0.8125rem",
  color: vars.color.muted,
});

export const detailValue = style({
  fontSize: "0.9375rem",
  fontWeight: 600,
  color: vars.color.text,
});

export const shareButton = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.xs,
  padding: "10px 16px",
  background: "transparent",
  border: "1px solid rgba(2,6,23,0.12)",
  borderRadius: vars.radius.sm,
  fontSize: "0.875rem",
  fontWeight: 500,
  color: vars.color.text,
  cursor: "pointer",
  marginTop: vars.space.md,
  transition: "background 150ms ease",
  ":hover": {
    background: "#f8fafc",
  },
});

export const expiredCard = style({
  textAlign: "center",
  padding: vars.space.lg,
});

export const expiredIcon = style({
  width: 48,
  height: 48,
  marginBottom: vars.space.sm,
  marginLeft: "auto",
  marginRight: "auto",
});

export const expiredTitle = style({
  fontSize: "1.25rem",
  fontWeight: 700,
  marginBottom: vars.space.xs,
});

export const expiredText = style({
  fontSize: "0.875rem",
  color: "rgba(226, 232, 240, 0.8)",
});

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
  width: 48,
  height: 48,
  border: "4px solid #e2e8f0",
  borderTopColor: vars.color.primary,
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  marginBottom: vars.space.md,
});

export const errorState = style({
  minHeight: "60vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: vars.space.xl,
});

export const errorIcon = style({
  width: 64,
  height: 64,
  color: "#ef4444",
  marginBottom: vars.space.md,
});

export const errorTitle = style({
  fontSize: "1.5rem",
  fontWeight: 700,
  color: vars.color.text,
  marginBottom: vars.space.sm,
});

export const errorText = style({
  color: vars.color.muted,
  marginBottom: vars.space.lg,
});

export const primaryButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: "14px 24px",
  background: vars.color.primary,
  color: "#fff",
  borderRadius: vars.radius.sm,
  fontWeight: 600,
  textDecoration: "none",
  transition: "background 150ms ease",
  ":hover": {
    background: "#025a8a",
  },
});
