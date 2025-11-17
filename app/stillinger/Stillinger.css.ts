import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/tokens.css";

export const section = style({
  paddingTop: vars.space.xl,
  paddingBottom: vars.space.xl,
  background: vars.color.bg,
});

export const header = style({
  textAlign: "center",
  marginBottom: vars.space.xl,
});

export const title = style({
  fontSize: "2.5rem",
  fontWeight: 700,
  color: vars.color.text,
  marginBottom: vars.space.md,
  lineHeight: 1.2,
});

export const subtitle = style({
  fontSize: "1.125rem",
  color: vars.color.muted,
  maxWidth: 600,
  marginLeft: "auto",
  marginRight: "auto",
});

export const filterBar = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.md,
  marginBottom: vars.space.xl,
  padding: vars.space.lg,
  background: "#f8fafc",
  borderRadius: vars.radius.md,
  border: "1px solid rgba(2,6,23,0.06)",
});

export const searchBox = style({
  flex: "1 1 300px",
  position: "relative",
});

export const searchIcon = style({
  position: "absolute",
  left: 12,
  top: "50%",
  transform: "translateY(-50%)",
  color: vars.color.muted,
  pointerEvents: "none",
});

export const searchInput = style({
  width: "100%",
  padding: "0.75rem 1rem 0.75rem 2.5rem",
  borderRadius: vars.radius.sm,
  border: "1px solid rgba(2,6,23,0.1)",
  fontSize: "1rem",
  transition: "border-color 160ms ease",
  ":focus": {
    outline: "none",
    borderColor: vars.color.primary,
  },
});

export const filterGroup = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.sm,
  alignItems: "center",
});

export const filterLabel = style({
  fontSize: "0.875rem",
  fontWeight: 600,
  color: vars.color.text,
  marginRight: vars.space.xs,
});

export const filterButton = style({
  padding: "0.5rem 1rem",
  borderRadius: vars.radius.sm,
  border: "1px solid rgba(2,6,23,0.1)",
  background: "white",
  fontSize: "0.875rem",
  fontWeight: 500,
  color: vars.color.text,
  cursor: "pointer",
  transition: "all 160ms ease",
  ":hover": {
    borderColor: vars.color.primary,
    background: "#f0f9ff",
  },
});

export const filterButtonActive = style({
  background: vars.color.primary,
  color: "white",
  borderColor: vars.color.primary,
  ":hover": {
    background: "#025a8a",
  },
});

export const jobsGrid = style({
  display: "grid",
  gap: vars.space.lg,
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
});

export const jobCard = style({
  background: "white",
  borderRadius: vars.radius.md,
  padding: vars.space.lg,
  border: "1px solid rgba(2,6,23,0.06)",
  boxShadow: vars.shadow.sm,
  transition: "box-shadow 200ms ease, transform 200ms ease",
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
  display: "block",
  ":hover": {
    boxShadow: vars.shadow.md,
    transform: "translateY(-2px)",
  },
});

export const jobCardHeader = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  marginBottom: vars.space.md,
});

export const jobCardTitle = style({
  fontSize: "1.25rem",
  fontWeight: 700,
  color: vars.color.text,
  marginBottom: vars.space.xs,
  lineHeight: 1.3,
});

export const jobCardCompany = style({
  fontSize: "0.9rem",
  color: vars.color.muted,
  fontWeight: 500,
});

export const jobBadge = style({
  padding: "0.25rem 0.75rem",
  borderRadius: vars.radius.sm,
  fontSize: "0.75rem",
  fontWeight: 600,
  whiteSpace: "nowrap",
});

export const jobBadgeVikariat = style({
  background: "#fef3c7",
  color: "#92400e",
});

export const jobBadgeFast = style({
  background: "#d1fae5",
  color: "#065f46",
});

export const jobCardMeta = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.md,
  marginTop: vars.space.md,
  paddingTop: vars.space.md,
  borderTop: "1px solid rgba(2,6,23,0.06)",
});

export const jobMetaItem = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.xs,
  fontSize: "0.875rem",
  color: vars.color.muted,
});

export const jobMetaIcon = style({
  width: 16,
  height: 16,
});

export const emptyState = style({
  textAlign: "center",
  padding: vars.space.xl,
  color: vars.color.muted,
});

export const emptyStateIcon = style({
  width: 64,
  height: 64,
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: vars.space.md,
  color: "#cbd5e1",
});

export const emptyStateTitle = style({
  fontSize: "1.25rem",
  fontWeight: 600,
  color: vars.color.text,
  marginBottom: vars.space.sm,
});

export const emptyStateText = style({
  fontSize: "1rem",
  color: vars.color.muted,
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
