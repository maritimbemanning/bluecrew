"use client";

import { SignUp, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Link from "next/link";

export default function RegistrerPage() {
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
            maxWidth: "480px",
            background: "#fff",
            borderRadius: "16px",
            padding: "48px 32px",
            textAlign: "center",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
          }}
        >
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
        </div>
      </ClerkLoading>

      {/* Clerk SignUp form */}
      <ClerkLoaded>
        <SignUp
          routing="path"
          path="/registrer"
          appearance={{
            elements: {
              rootBox: {
                width: "100%",
                maxWidth: "480px",
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
          signInUrl="/logg-inn"
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
