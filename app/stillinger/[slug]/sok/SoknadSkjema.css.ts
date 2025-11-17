import { style } from "@vanilla-extract/css";
import { vars } from "../../../../styles/tokens.css";

export const section = style({
  paddingTop: vars.space.xl,
  paddingBottom: vars.space.xl,
  background: "#f8fafc",
  minHeight: "100vh",
});

export const container = style({
  maxWidth: 700,
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: vars.space.md,
  paddingRight: vars.space.md,
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

export const card = style({
  background: "white",
  borderRadius: vars.radius.md,
  padding: vars.space.xl,
  boxShadow: vars.shadow.md,
  border: "1px solid rgba(2,6,23,0.06)",
});

export const header = style({
  marginBottom: vars.space.xl,
  textAlign: "center",
});

export const title = style({
  fontSize: "2rem",
  fontWeight: 700,
  color: vars.color.text,
  marginBottom: vars.space.sm,
});

export const subtitle = style({
  fontSize: "1rem",
  color: vars.color.muted,
});

export const formSection = style({
  marginBottom: vars.space.xl,
});

export const sectionTitle = style({
  fontSize: "1.125rem",
  fontWeight: 700,
  color: vars.color.text,
  marginBottom: vars.space.md,
});

export const formGroup = style({
  marginBottom: vars.space.lg,
});

export const label = style({
  display: "block",
  fontSize: "0.9rem",
  fontWeight: 600,
  color: vars.color.text,
  marginBottom: vars.space.xs,
});

export const input = style({
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: vars.radius.sm,
  border: "1px solid rgba(2,6,23,0.1)",
  fontSize: "1rem",
  transition: "border-color 160ms ease",
  ":focus": {
    outline: "none",
    borderColor: vars.color.primary,
  },
  ":disabled": {
    background: "#f1f5f9",
    cursor: "not-allowed",
  },
});

export const textarea = style({
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: vars.radius.sm,
  border: "1px solid rgba(2,6,23,0.1)",
  fontSize: "1rem",
  minHeight: 120,
  resize: "vertical",
  transition: "border-color 160ms ease",
  ":focus": {
    outline: "none",
    borderColor: vars.color.primary,
  },
});

export const fileUpload = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const fileInput = style({
  padding: "0.75rem",
  border: "2px dashed rgba(2,6,23,0.15)",
  borderRadius: vars.radius.sm,
  cursor: "pointer",
  transition: "border-color 160ms ease",
  ":hover": {
    borderColor: vars.color.primary,
  },
});

export const fileInfo = style({
  fontSize: "0.875rem",
  color: vars.color.muted,
});

export const checkbox = style({
  display: "flex",
  alignItems: "flex-start",
  gap: vars.space.sm,
  marginBottom: vars.space.lg,
});

export const checkboxInput = style({
  marginTop: "0.25rem",
  width: 18,
  height: 18,
  cursor: "pointer",
});

export const checkboxLabel = style({
  fontSize: "0.9rem",
  color: vars.color.text,
  lineHeight: 1.5,
});

export const loadingState = style({
  textAlign: "center",
  padding: vars.space.xl,
});

export const loadingSpinner = style({
  width: 40,
  height: 40,
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: vars.space.md,
  animation: "spin 1s linear infinite",
  color: vars.color.primary,
});

export const successState = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "80vh",
  padding: vars.space.xl,
});

export const successCard = style({
  background: "white",
  borderRadius: vars.radius.md,
  padding: vars.space.xl,
  boxShadow: vars.shadow.md,
  border: "1px solid rgba(2,6,23,0.06)",
  maxWidth: 600,
  width: "100%",
  textAlign: "center",
});

export const successIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 80,
  height: 80,
  background: "#dcfce7",
  borderRadius: "50%",
  marginBottom: vars.space.lg,
  color: "#22c55e",
});

export const successTitle = style({
  fontSize: "2rem",
  fontWeight: 700,
  color: vars.color.text,
  marginBottom: vars.space.md,
});

export const successText = style({
  fontSize: "1.1rem",
  color: vars.color.muted,
  marginBottom: vars.space.sm,
});

export const successJobTitle = style({
  fontSize: "1.3rem",
  fontWeight: 600,
  color: vars.color.primary,
  marginBottom: vars.space.lg,
});

export const successInfo = style({
  background: "#eff6ff",
  borderRadius: vars.radius.md,
  padding: vars.space.lg,
  marginBottom: vars.space.xl,
  fontSize: "0.9rem",
  color: vars.color.text,
});

export const successActions = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  "@media": {
    "screen and (min-width: 640px)": {
      flexDirection: "row",
      justifyContent: "center",
    },
  },
});

export const successButtonSecondary = style({
  padding: "0.75rem 1.5rem",
  border: "1px solid rgba(2,6,23,0.15)",
  borderRadius: vars.radius.sm,
  background: "white",
  color: vars.color.text,
  fontSize: "1rem",
  fontWeight: 600,
  textDecoration: "none",
  textAlign: "center",
  transition: "all 160ms ease",
  ":hover": {
    background: "#f8fafc",
  },
});

export const vippsSection = style({
  padding: vars.space.lg,
  background: "#fff5e6",
  borderRadius: vars.radius.md,
  border: "1px solid #ff8c00",
  marginBottom: vars.space.xl,
  textAlign: "center",
});

export const vippsText = style({
  fontSize: "0.9rem",
  color: "#92400e",
  marginBottom: vars.space.md,
});
