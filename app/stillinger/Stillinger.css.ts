import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "../../styles/tokens.css";

// Animations
const fadeInUp = keyframes({
  "0%": { opacity: 0, transform: "translateY(20px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const pulse = keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.6 },
});

// Hero Section
export const hero = style({
  background: "linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #0d2847 100%)",
  position: "relative",
  overflow: "hidden",
  paddingTop: "clamp(60px, 10vw, 100px)",
  paddingBottom: "clamp(60px, 10vw, 100px)",
  "::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "url('/images/wave-pattern.svg') repeat",
    opacity: 0.03,
    pointerEvents: "none",
  },
});

export const heroInner = style({
  position: "relative",
  zIndex: 1,
  maxWidth: 900,
  marginLeft: "auto",
  marginRight: "auto",
  textAlign: "center",
  paddingLeft: vars.space.md,
  paddingRight: vars.space.md,
});

export const heroLabel = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: "8px 16px",
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(8px)",
  borderRadius: "999px",
  fontSize: "0.875rem",
  fontWeight: 600,
  color: "#93c5fd",
  marginBottom: vars.space.lg,
  border: "1px solid rgba(147, 197, 253, 0.2)",
});

export const heroTitle = style({
  fontSize: "clamp(2rem, 5vw, 3.5rem)",
  fontWeight: 800,
  color: "#ffffff",
  marginBottom: vars.space.md,
  lineHeight: 1.1,
  letterSpacing: "-0.03em",
});

export const heroSubtitle = style({
  fontSize: "clamp(1rem, 2vw, 1.25rem)",
  color: "rgba(226, 232, 240, 0.85)",
  maxWidth: 600,
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: vars.space.xl,
  lineHeight: 1.6,
});

// Search Box in Hero
export const heroSearchBox = style({
  display: "flex",
  maxWidth: 640,
  marginLeft: "auto",
  marginRight: "auto",
  background: "rgba(255,255,255,0.95)",
  borderRadius: "16px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.2)",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.2)",
  "@media": {
    "(max-width: 640px)": {
      flexDirection: "column",
    },
  },
});

export const heroSearchInput = style({
  flex: 1,
  padding: "18px 24px",
  border: "none",
  fontSize: "1rem",
  color: vars.color.text,
  background: "transparent",
  ":focus": {
    outline: "none",
  },
  "::placeholder": {
    color: "#94a3b8",
  },
});

export const heroSearchButton = style({
  padding: "18px 32px",
  background: vars.color.primary,
  color: "#fff",
  border: "none",
  fontSize: "1rem",
  fontWeight: 600,
  cursor: "pointer",
  transition: "background 200ms ease",
  display: "flex",
  alignItems: "center",
  gap: vars.space.xs,
  ":hover": {
    background: "#0284c7",
  },
  "@media": {
    "(max-width: 640px)": {
      justifyContent: "center",
    },
  },
});

// Stats Bar
export const statsBar = style({
  display: "flex",
  justifyContent: "center",
  gap: "clamp(24px, 5vw, 60px)",
  marginTop: vars.space.xl,
  paddingTop: vars.space.lg,
  borderTop: "1px solid rgba(255,255,255,0.1)",
});

export const statItem = style({
  textAlign: "center",
});

export const statValue = style({
  fontSize: "clamp(1.5rem, 3vw, 2rem)",
  fontWeight: 800,
  color: "#fff",
  lineHeight: 1.2,
});

export const statLabel = style({
  fontSize: "0.8125rem",
  color: "rgba(226, 232, 240, 0.7)",
  marginTop: vars.space.xxs,
});

// Main Content Section
export const section = style({
  paddingTop: vars.space.xl,
  paddingBottom: vars.space.xl,
  background: "#f8fafc",
  minHeight: "60vh",
});

// Filter Bar
export const filterSection = style({
  background: "#fff",
  borderRadius: vars.radius.md,
  padding: vars.space.lg,
  marginBottom: vars.space.xl,
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  border: "1px solid #e2e8f0",
});

export const filterHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: vars.space.md,
  flexWrap: "wrap",
  gap: vars.space.sm,
});

export const filterTitle = style({
  fontSize: "0.9375rem",
  fontWeight: 600,
  color: vars.color.text,
  display: "flex",
  alignItems: "center",
  gap: vars.space.xs,
});

export const clearFilters = style({
  fontSize: "0.875rem",
  color: vars.color.primary,
  background: "none",
  border: "none",
  cursor: "pointer",
  fontWeight: 500,
  padding: "4px 8px",
  borderRadius: vars.radius.sm,
  transition: "background 150ms ease",
  ":hover": {
    background: "#f0f9ff",
  },
});

export const filterBar = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.md,
  alignItems: "flex-start",
});

export const filterGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  minWidth: 160,
  flex: "1 1 160px",
  "@media": {
    "(max-width: 768px)": {
      flex: "1 1 100%",
    },
  },
});

export const filterLabel = style({
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "#64748b",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

export const filterSelect = style({
  padding: "10px 36px 10px 14px",
  borderRadius: vars.radius.sm,
  border: "1px solid #e2e8f0",
  background: "#fff",
  fontSize: "0.9375rem",
  color: vars.color.text,
  cursor: "pointer",
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  transition: "border-color 150ms ease, box-shadow 150ms ease",
  ":focus": {
    outline: "none",
    borderColor: vars.color.primary,
    boxShadow: "0 0 0 3px rgba(3, 105, 161, 0.1)",
  },
  ":hover": {
    borderColor: "#cbd5e1",
  },
});

// Results Header
export const resultsHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: vars.space.lg,
  flexWrap: "wrap",
  gap: vars.space.sm,
});

export const resultsCount = style({
  fontSize: "0.9375rem",
  color: "#64748b",
});

export const resultsCountNumber = style({
  fontWeight: 700,
  color: vars.color.text,
});

export const sortSelect = style({
  padding: "8px 32px 8px 12px",
  borderRadius: vars.radius.sm,
  border: "1px solid #e2e8f0",
  background: "#fff",
  fontSize: "0.875rem",
  color: vars.color.text,
  cursor: "pointer",
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
});

// Jobs Grid
export const jobsGrid = style({
  display: "grid",
  gap: vars.space.lg,
  gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
  "@media": {
    "(max-width: 400px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

// Job Card - Premium Design
export const jobCard = style({
  background: "#ffffff",
  borderRadius: "16px",
  padding: "0",
  border: "1px solid #e2e8f0",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  animation: `${fadeInUp} 400ms ease-out`,
  ":hover": {
    boxShadow: "0 20px 40px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.06)",
    transform: "translateY(-4px)",
    borderColor: "#cbd5e1",
  },
});

export const jobCardContent = style({
  padding: vars.space.lg,
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

export const jobCardHeader = style({
  display: "flex",
  alignItems: "flex-start",
  gap: vars.space.md,
  marginBottom: vars.space.md,
});

export const jobCardLogo = style({
  width: 56,
  height: 56,
  borderRadius: "12px",
  background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  boxShadow: "0 2px 8px rgba(3, 105, 161, 0.2)",
});

export const jobCardLogoText = style({
  fontSize: "1.25rem",
  fontWeight: 700,
  color: "#fff",
});

export const jobCardHeaderText = style({
  flex: 1,
  minWidth: 0,
});

export const jobCardTitle = style({
  fontSize: "1.125rem",
  fontWeight: 700,
  color: vars.color.text,
  marginBottom: vars.space.xxs,
  lineHeight: 1.3,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const jobCardCompany = style({
  fontSize: "0.9rem",
  color: "#64748b",
  fontWeight: 500,
});

export const jobCardDescription = style({
  fontSize: "0.9rem",
  color: "#64748b",
  lineHeight: 1.6,
  marginBottom: vars.space.md,
  flex: 1,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const jobCardTags = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.xs,
  marginBottom: vars.space.md,
});

export const jobBadge = style({
  padding: "5px 12px",
  borderRadius: "999px",
  fontSize: "0.75rem",
  fontWeight: 600,
  whiteSpace: "nowrap",
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
});

export const jobBadgeVikariat = style({
  background: "#fef3c7",
  color: "#92400e",
});

export const jobBadgeFast = style({
  background: "#dcfce7",
  color: "#166534",
});

export const jobBadgeCategory = style({
  background: "#f0f9ff",
  color: "#0369a1",
});

export const jobBadgeUrgent = style({
  background: "#fef2f2",
  color: "#dc2626",
  animation: `${pulse} 2s ease-in-out infinite`,
});

// Job Card Footer
export const jobCardFooter = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,
  paddingTop: vars.space.md,
  borderTop: "1px solid #f1f5f9",
});

export const jobCardMeta = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.md,
});

export const jobMetaItem = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "0.8125rem",
  color: "#64748b",
});

export const jobMetaIcon = style({
  width: 14,
  height: 14,
  color: "#94a3b8",
});

export const jobCardArrow = style({
  width: 32,
  height: 32,
  borderRadius: "8px",
  background: "#f8fafc",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#64748b",
  transition: "all 200ms ease",
  flexShrink: 0,
  selectors: {
    [`${jobCard}:hover &`]: {
      background: vars.color.primary,
      color: "#fff",
      transform: "translateX(2px)",
    },
  },
});

// Empty State
export const emptyState = style({
  textAlign: "center",
  padding: "clamp(40px, 8vw, 80px)",
  background: "#fff",
  borderRadius: vars.radius.md,
  border: "1px solid #e2e8f0",
});

export const emptyStateIcon = style({
  width: 80,
  height: 80,
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: vars.space.lg,
  color: "#cbd5e1",
});

export const emptyStateTitle = style({
  fontSize: "1.5rem",
  fontWeight: 700,
  color: vars.color.text,
  marginBottom: vars.space.sm,
});

export const emptyStateText = style({
  fontSize: "1rem",
  color: "#64748b",
  maxWidth: 400,
  marginLeft: "auto",
  marginRight: "auto",
});

export const emptyStateCta = style({
  marginTop: vars.space.lg,
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: "12px 24px",
  background: vars.color.primary,
  color: "#fff",
  borderRadius: vars.radius.sm,
  fontWeight: 600,
  textDecoration: "none",
  transition: "background 150ms ease",
  ":hover": {
    background: "#0284c7",
  },
});

// Loading State
export const loadingState = style({
  textAlign: "center",
  padding: "clamp(60px, 10vw, 100px)",
});

export const loadingSpinner = style({
  width: 48,
  height: 48,
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: vars.space.md,
  animation: "spin 1s linear infinite",
  color: vars.color.primary,
});

export const loadingText = style({
  color: "#64748b",
  fontSize: "0.9375rem",
});

// Skeleton loading for cards
export const skeletonCard = style({
  background: "#fff",
  borderRadius: "16px",
  padding: vars.space.lg,
  border: "1px solid #e2e8f0",
});

export const skeletonPulse = style({
  animation: `${pulse} 1.5s ease-in-out infinite`,
  background: "#e2e8f0",
  borderRadius: vars.radius.sm,
});

// Legacy support - keeping old class names for compatibility
export const header = style({});
export const title = style({});
export const subtitle = style({});
export const searchBox = style({});
export const searchIcon = style({});
export const searchInput = style({});
export const filterButton = style({});
export const filterButtonActive = style({});
