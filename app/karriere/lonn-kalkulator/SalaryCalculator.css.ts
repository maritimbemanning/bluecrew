import { style } from "@vanilla-extract/css";

export const calculatorContainer = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "2rem",
  "@media": {
    "(min-width: 768px)": {
      gridTemplateColumns: "1fr 1fr",
    },
  },
});

export const formSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  padding: "2rem",
  backgroundColor: "white",
  borderRadius: "16px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 20px rgba(0, 0, 0, 0.05)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  ":hover": {
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.08), 0 16px 32px rgba(0, 0, 0, 0.08)",
    transform: "translateY(-2px)",
  },
});

export const inputGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const label = style({
  fontSize: "1rem",
  fontWeight: "600",
  color: "#333",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

export const labelIcon = style({
  fontSize: "1.25rem",
});

export const select = style({
  padding: "0.875rem 1rem",
  fontSize: "1rem",
  border: "2px solid #e0e0e0",
  borderRadius: "10px",
  backgroundColor: "white",
  color: "#333",
  cursor: "pointer",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  outline: "none",
  ":hover": {
    borderColor: "#1976d2",
  },
  ":focus": {
    borderColor: "#1976d2",
    boxShadow: "0 0 0 3px rgba(25, 118, 210, 0.1)",
  },
});

export const resultSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

export const resultCard = style({
  padding: "2.5rem",
  background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
  borderRadius: "16px",
  boxShadow: "0 8px 16px rgba(25, 118, 210, 0.3), 0 16px 32px rgba(25, 118, 210, 0.15)",
  color: "white",
  position: "relative",
  overflow: "hidden",
  "::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at top right, rgba(255, 255, 255, 0.1) 0%, transparent 60%)",
    pointerEvents: "none",
  },
});

export const resultLabel = style({
  fontSize: "1rem",
  fontWeight: "600",
  opacity: 0.9,
  marginBottom: "1rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

export const salaryAmount = style({
  display: "flex",
  alignItems: "baseline",
  gap: "0.5rem",
  marginBottom: "0.5rem",
  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
});

export const animating = style({
  transform: "scale(1.05)",
});

export const currencySymbol = style({
  fontSize: "1.5rem",
  fontWeight: "600",
  opacity: 0.8,
});

export const amount = style({
  fontSize: "3rem",
  fontWeight: "bold",
  lineHeight: 1,
  "@media": {
    "(max-width: 480px)": {
      fontSize: "2.25rem",
    },
  },
});

export const monthlySalary = style({
  fontSize: "1.125rem",
  opacity: 0.85,
  marginBottom: "2rem",
  fontWeight: "500",
});

export const breakdown = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  paddingTop: "1.5rem",
  borderTop: "1px solid rgba(255, 255, 255, 0.2)",
  marginTop: "1.5rem",
});

export const breakdownItem = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "0.95rem",
});

export const breakdownLabel = style({
  opacity: 0.85,
  fontWeight: "500",
});

export const breakdownValue = style({
  fontWeight: "700",
  fontSize: "1rem",
});

export const disclaimer = style({
  marginTop: "2rem",
  padding: "1rem",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "10px",
  fontSize: "0.875rem",
  lineHeight: 1.5,
  backdropFilter: "blur(10px)",
});

export const ctaBox = style({
  padding: "2rem",
  backgroundColor: "#f8f9fa",
  borderRadius: "16px",
  border: "2px dashed #e0e0e0",
  textAlign: "center",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  ":hover": {
    borderColor: "#1976d2",
    backgroundColor: "#f0f7ff",
    transform: "translateY(-2px)",
  },
});

export const ctaTitle = style({
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "0.5rem",
});

export const ctaText = style({
  fontSize: "1rem",
  color: "#666",
  marginBottom: "1.5rem",
});

export const ctaButton = style({
  display: "inline-block",
  padding: "1rem 2rem",
  backgroundColor: "#1976d2",
  color: "white",
  textDecoration: "none",
  borderRadius: "10px",
  fontWeight: "600",
  fontSize: "1.05rem",
  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 4px 8px rgba(25, 118, 210, 0.2)",
  position: "relative",
  overflow: "hidden",
  "::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%)",
    opacity: 0,
    transition: "opacity 0.25s",
  },
  ":hover": {
    backgroundColor: "#1565c0",
    transform: "translateY(-2px) scale(1.02)",
    boxShadow: "0 8px 16px rgba(25, 118, 210, 0.3), 0 0 20px rgba(25, 118, 210, 0.2)",
  },
  ":hover::before": {
    opacity: 1,
  },
  ":active": {
    transform: "translateY(0) scale(0.98)",
  },
});
