import { style, keyframes } from "@vanilla-extract/css";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const container = style({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px 20px",
  background:
    "radial-gradient(circle at 20% -10%, rgba(56, 189, 248, 0.25), transparent 55%), radial-gradient(circle at 80% 0%, rgba(14, 165, 233, 0.2), transparent 58%), linear-gradient(155deg, #0a1d39 0%, #0f2648 55%, #051427 100%)",
});

export const logo = style({
  marginBottom: 32,
  textDecoration: "none",
  textAlign: "center",
  display: "grid",
  gap: 4,
});

export const wordmark = style({
  fontWeight: 800,
  letterSpacing: "-0.035em",
  fontSize: "clamp(24px, 5vw, 28px)",
  lineHeight: 1.05,
  backgroundImage:
    "linear-gradient(120deg, #f8fbff 0%, #bae6fd 45%, #38bdf8 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 6px 18px rgba(15, 23, 42, 0.45)",
});

export const slogan = style({
  fontSize: "clamp(10px, 2.6vw, 11px)",
  fontWeight: 600,
  letterSpacing: ".28em",
  textTransform: "uppercase",
  color: "rgba(191, 219, 254, 0.85)",
});

export const loadingCard = style({
  width: "100%",
  maxWidth: 420,
  background: "#fff",
  borderRadius: 20,
  padding: "48px 32px",
  textAlign: "center",
  boxShadow:
    "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(148, 197, 255, 0.1)",
});

export const spinner = style({
  width: 32,
  height: 32,
  border: "3px solid #e2e8f0",
  borderTopColor: "#0369a1",
  borderRadius: "50%",
  animation: `${spin} 1s linear infinite`,
  margin: "0 auto 16px",
});

export const loadingText = style({
  color: "#64748b",
  margin: 0,
  fontSize: 15,
});

export const formWrapper = style({
  width: "100%",
  maxWidth: 420,
});

export const backLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  color: "rgba(191, 219, 254, 0.85)",
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 500,
  marginBottom: 24,
  transition: "color 0.15s ease",
  ":hover": {
    color: "#fff",
  },
});
