"use client";

import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function LoggInnPage() {
  const [showTimeout, setShowTimeout] = useState(false);

  useEffect(() => {
    // Debug: Log Clerk environment
    console.log("[Clerk Debug] Publishable Key exists:", !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
    console.log("[Clerk Debug] Proxy URL:", process.env.NEXT_PUBLIC_CLERK_PROXY_URL);
    console.log("[Clerk Debug] Current domain:", window.location.hostname);

    // Show error message if Clerk doesn't load within 10 seconds
    const timer = setTimeout(() => {
      setShowTimeout(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        background:
          "linear-gradient(155deg, #0a1d39 0%, #0f2648 55%, #051427 100%)",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ marginBottom: 32, textDecoration: "none" }}>
        <div style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700 }}>
          Bluecrew
        </div>
        <div style={{ color: "#94a3b8", fontSize: "0.75rem", letterSpacing: "0.15em" }}>
          BEMANNING TIL SJØS
        </div>
      </Link>

      {/* Loading state */}
      <ClerkLoading>
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "#fff",
            borderRadius: "16px",
            padding: "48px 32px",
            textAlign: "center",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
          }}
        >
          {showTimeout ? (
            <>
              <div style={{ color: "#dc2626", marginBottom: 16, fontSize: "2rem" }}>!</div>
              <p style={{ color: "#1e293b", fontWeight: 600, marginBottom: 8 }}>
                Kunne ikke laste innlogging
              </p>
              <p style={{ color: "#64748b", margin: 0, fontSize: "0.875rem" }}>
                Prøv å laste siden på nytt, eller kontakt support hvis problemet vedvarer.
              </p>
              <button
                onClick={() => window.location.reload()}
                style={{
                  marginTop: 20,
                  padding: "12px 24px",
                  background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Last inn på nytt
              </button>
            </>
          ) : (
            <>
              <div
                style={{
                  width: 32,
                  height: 32,
                  border: "3px solid #e2e8f0",
                  borderTopColor: "#0369a1",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 16px",
                }}
              />
              <p style={{ color: "#64748b", margin: 0 }}>Laster inn...</p>
            </>
          )}
        </div>
      </ClerkLoading>

      {/* Clerk SignIn form */}
      <ClerkLoaded>
        <SignIn
          routing="path"
          path="/logg-inn"
          appearance={{
            elements: {
              rootBox: {
                width: "100%",
                maxWidth: "420px",
              },
              card: {
                borderRadius: "16px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
              },
              formButtonPrimary: {
                background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "1rem",
                padding: "14px 20px",
              },
              formFieldInput: {
                borderRadius: "10px",
                border: "1.5px solid #e2e8f0",
                padding: "12px 14px",
                fontSize: "1rem",
              },
              footerActionLink: {
                color: "#0369a1",
                fontWeight: 600,
              },
            },
          }}
          fallbackRedirectUrl="/min-side"
          signUpUrl="/registrer"
        />
      </ClerkLoaded>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
