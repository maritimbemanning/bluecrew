"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoggInnPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // For magic link / email code flow
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  // Show loading while Clerk initializes
  if (!isLoaded) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "16px" }}>⏳</div>
            <p style={{ color: "#64748b" }}>Laster inn...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error if Clerk failed to initialize
  if (!signIn) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#dc2626" }}>⚠️</div>
            <p style={{ color: "#dc2626", fontWeight: 600, marginBottom: "12px" }}>
              Kunne ikke laste innloggingsskjema
            </p>
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "20px" }}>
              Prøv å laste siden på nytt, eller kontakt oss på post@bluecrew.no
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "12px 24px",
                background: "#0369a1",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Last siden på nytt
            </button>
          </div>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      // Try password-based sign in first
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/min-side");
      } else {
        // Handle other statuses (2FA, etc.)
        console.log("Sign in status:", result.status);
      }
    } catch (err: unknown) {
      const clerkError = err as { errors?: Array<{ message: string; code: string }> };
      const errorMessage = clerkError.errors?.[0]?.message || "Noe gikk galt. Prøv igjen.";

      // Translate common Clerk errors to Norwegian
      if (errorMessage.includes("Identifier is invalid")) {
        setError("Ugyldig e-postadresse");
      } else if (errorMessage.includes("Password is incorrect")) {
        setError("Feil passord");
      } else if (errorMessage.includes("Couldn't find your account")) {
        setError("Fant ikke kontoen din. Har du registrert deg?");
      } else if (errorMessage.includes("too many")) {
        setError("For mange forsøk. Vent litt før du prøver igjen.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }

  // Email code verification
  async function handleEmailCode(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded || !signIn) return;

    setLoading(true);
    setError("");

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/min-side");
      }
    } catch (err: unknown) {
      const clerkError = err as { errors?: Array<{ message: string }> };
      setError(clerkError.errors?.[0]?.message || "Ugyldig kode. Prøv igjen.");
    } finally {
      setLoading(false);
    }
  }

  // Send magic link / email code
  async function handleMagicLink() {
    if (!isLoaded || !signIn || !email) return;

    setLoading(true);
    setError("");

    try {
      await signIn.create({
        identifier: email,
        strategy: "email_code",
      });
      setPendingVerification(true);
    } catch (err: unknown) {
      const clerkError = err as { errors?: Array<{ message: string }> };
      setError(clerkError.errors?.[0]?.message || "Kunne ikke sende kode. Prøv igjen.");
    } finally {
      setLoading(false);
    }
  }

  // Verification code screen
  if (pendingVerification) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <Link href="/" style={styles.logoLink}>
            <Image
              src="/logo.png"
              alt="Bluecrew"
              width={180}
              height={48}
              style={styles.logo}
              priority
            />
          </Link>

          <h1 style={styles.title}>Sjekk e-posten din</h1>
          <p style={styles.subtitle}>
            Vi har sendt en bekreftelseskode til <strong>{email}</strong>
          </p>

          <form onSubmit={handleEmailCode} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Bekreftelseskode</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                style={styles.input}
                autoComplete="one-time-code"
                required
              />
            </div>

            {error && <div style={styles.error}>{error}</div>}

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Verifiserer..." : "Bekreft"}
            </button>
          </form>

          <button
            onClick={() => setPendingVerification(false)}
            style={styles.linkButton}
          >
            ← Tilbake til innlogging
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <Link href="/" style={styles.logoLink}>
          <Image
            src="/logo.png"
            alt="Bluecrew"
            width={180}
            height={48}
            style={styles.logo}
            priority
          />
        </Link>

        <h1 style={styles.title}>Logg inn</h1>
        <p style={styles.subtitle}>
          Velkommen tilbake! Logg inn for å fortsette.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>E-postadresse</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="din@epost.no"
              style={styles.input}
              autoComplete="email"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Passord</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={styles.input}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.showPasswordBtn}
                aria-label={showPassword ? "Skjul passord" : "Vis passord"}
              >
                {showPassword ? "Skjul" : "Vis"}
              </button>
            </div>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Logger inn..." : "Logg inn"}
          </button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerText}>eller</span>
        </div>

        <button
          onClick={handleMagicLink}
          disabled={loading || !email}
          style={{
            ...styles.secondaryButton,
            opacity: !email ? 0.5 : 1,
          }}
        >
          Send innloggingskode på e-post
        </button>

        <p style={styles.footer}>
          Har du ikke konto?{" "}
          <Link href="/registrer" style={styles.link}>
            Registrer deg
          </Link>
        </p>
      </div>

      <p style={styles.backLink}>
        <Link href="/" style={styles.link}>
          ← Tilbake til forsiden
        </Link>
      </p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    background: "linear-gradient(155deg, #0a1d39 0%, #0f2648 55%, #051427 100%)",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "40px 32px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
  },
  logoLink: {
    display: "block",
    textAlign: "center",
    marginBottom: "24px",
  },
  logo: {
    margin: "0 auto",
    objectFit: "contain",
  },
  title: {
    fontSize: "1.75rem",
    fontWeight: 700,
    color: "#0f172a",
    textAlign: "center",
    margin: "0 0 8px 0",
  },
  subtitle: {
    fontSize: "0.95rem",
    color: "#64748b",
    textAlign: "center",
    margin: "0 0 28px 0",
    lineHeight: 1.5,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#334155",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    fontSize: "1rem",
    border: "1.5px solid #e2e8f0",
    borderRadius: "10px",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  },
  passwordWrapper: {
    position: "relative",
  },
  showPasswordBtn: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#0369a1",
    fontSize: "0.85rem",
    fontWeight: 600,
    cursor: "pointer",
    padding: "4px 8px",
  },
  button: {
    width: "100%",
    padding: "14px 20px",
    fontSize: "1rem",
    fontWeight: 700,
    color: "#ffffff",
    background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    marginTop: "8px",
  },
  secondaryButton: {
    width: "100%",
    padding: "12px 20px",
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#0369a1",
    background: "#f0f9ff",
    border: "1.5px solid #bae6fd",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    margin: "24px 0",
  },
  dividerText: {
    flex: 1,
    textAlign: "center",
    fontSize: "0.85rem",
    color: "#94a3b8",
    position: "relative",
  },
  error: {
    padding: "12px 14px",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "8px",
    color: "#dc2626",
    fontSize: "0.875rem",
    textAlign: "center",
  },
  footer: {
    textAlign: "center",
    marginTop: "24px",
    fontSize: "0.9rem",
    color: "#64748b",
  },
  link: {
    color: "#0369a1",
    fontWeight: 600,
    textDecoration: "none",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#0369a1",
    fontWeight: 600,
    fontSize: "0.9rem",
    cursor: "pointer",
    marginTop: "20px",
    padding: 0,
  },
  backLink: {
    marginTop: "24px",
    fontSize: "0.9rem",
  },
};
