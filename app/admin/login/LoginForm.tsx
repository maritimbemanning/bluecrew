"use client";

import { useState, FormEvent } from "react";
import type { CSSProperties } from "react";

const formStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const labelStyle: CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: "#cbd5e1",
  marginBottom: 6,
  display: "block",
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid rgba(148, 197, 255, 0.25)",
  background: "rgba(15, 23, 42, 0.8)",
  color: "#e2e8f0",
  fontSize: 15,
  fontFamily: "inherit",
  outline: "none",
  transition: "all 0.2s ease",
};

const buttonStyle: CSSProperties = {
  width: "100%",
  padding: "12px 18px",
  borderRadius: 10,
  border: "none",
  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
  color: "#fff",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const errorStyle: CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  background: "rgba(239, 68, 68, 0.15)",
  border: "1px solid rgba(239, 68, 68, 0.4)",
  color: "#fca5a5",
  fontSize: 14,
  textAlign: "center",
};

export default function LoginForm() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error("Ugyldig token");
      }

      window.location.href = "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Noe gikk galt");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div>
        <label htmlFor="token" style={labelStyle}>
          Admin Token
        </label>
        <input
          id="token"
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Skriv inn admin token..."
          style={inputStyle}
          autoFocus
          required
        />
      </div>

      {error && <div style={errorStyle}>{error}</div>}

      <button
        type="submit"
        disabled={loading || !token}
        style={{
          ...buttonStyle,
          opacity: loading || !token ? 0.6 : 1,
          cursor: loading || !token ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Logger inn..." : "Logg inn"}
      </button>
    </form>
  );
}
