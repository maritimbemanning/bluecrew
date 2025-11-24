"use client";

import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import * as styles from "@/app/components/auth/auth.css";

export default function LoggInnPage() {
  return (
    <div className={styles.container}>
      {/* Logo */}
      <Link href="/" className={styles.logo}>
        <span className={styles.wordmark}>Bluecrew</span>
        <span className={styles.slogan}>Bemanning til sjøs</span>
      </Link>

      {/* Loading state */}
      <ClerkLoading>
        <div className={styles.loadingCard}>
          <div className={styles.spinner} />
          <p className={styles.loadingText}>Laster inn...</p>
        </div>
      </ClerkLoading>

      {/* Clerk SignIn form */}
      <ClerkLoaded>
        <div className={styles.formWrapper}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={16} />
            Tilbake til forsiden
          </Link>
          <SignIn
            routing="path"
            path="/logg-inn"
            appearance={{
              elements: {
                rootBox: {
                  width: "100%",
                },
                card: {
                  borderRadius: "20px",
                  boxShadow:
                    "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(148, 197, 255, 0.1)",
                  border: "none",
                },
                headerTitle: {
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "#0f172a",
                },
                headerSubtitle: {
                  color: "#64748b",
                },
                formButtonPrimary: {
                  background:
                    "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  padding: "14px 20px",
                  boxShadow: "0 12px 24px rgba(14, 165, 233, 0.3)",
                  border: "none",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                },
                formFieldInput: {
                  borderRadius: "12px",
                  border: "1.5px solid #e2e8f0",
                  padding: "14px 16px",
                  fontSize: "1rem",
                  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                },
                formFieldInput__focused: {
                  borderColor: "#0ea5e9",
                  boxShadow: "0 0 0 3px rgba(14, 165, 233, 0.15)",
                },
                footerActionLink: {
                  color: "#0369a1",
                  fontWeight: 600,
                },
                identityPreviewEditButton: {
                  color: "#0369a1",
                },
                formFieldLabel: {
                  fontWeight: 600,
                  color: "#334155",
                },
                dividerLine: {
                  background: "#e2e8f0",
                },
                dividerText: {
                  color: "#94a3b8",
                },
                socialButtonsBlockButton: {
                  borderRadius: "12px",
                  border: "1.5px solid #e2e8f0",
                  fontWeight: 600,
                },
                alert: {
                  borderRadius: "12px",
                },
              },
            }}
            fallbackRedirectUrl="/min-side"
            signUpUrl="/registrer"
          />
        </div>
      </ClerkLoaded>
    </div>
  );
}
