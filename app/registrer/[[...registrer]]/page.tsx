"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function RegistrerPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Email verification
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded || !signUp) return;

    setLoading(true);
    setError("");

    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });

      // Send email verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (err: unknown) {
      const clerkError = err as { errors?: Array<{ message: string; code: string }> };
      const errorMessage = clerkError.errors?.[0]?.message || "Noe gikk galt. Prøv igjen.";

      // Translate common Clerk errors to Norwegian
      if (errorMessage.includes("already exists")) {
        setError("Denne e-postadressen er allerede registrert. Prøv å logge inn.");
      } else if (errorMessage.includes("Password")) {
        setError("Passordet må være minst 8 tegn langt.");
      } else if (errorMessage.includes("email")) {
        setError("Ugyldig e-postadresse.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleVerification(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded || !signUp) return;

    setLoading(true);
    setError("");

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/min-side");
      } else {
        console.log("Verification status:", result.status);
      }
    } catch (err: unknown) {
      const clerkError = err as { errors?: Array<{ message: string }> };
      setError(clerkError.errors?.[0]?.message || "Ugyldig kode. Prøv igjen.");
    } finally {
      setLoading(false);
    }
  }

  // Email verification screen
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

          <h1 style={styles.title}>Bekreft e-posten din</h1>
          <p style={styles.subtitle}>
            Vi har sendt en bekreftelseskode til <strong>{email}</strong>
          </p>

          <form onSubmit={handleVerification} style={styles.form}>
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
              {loading ? "Verifiserer..." : "Bekreft og fortsett"}
            </button>
          </form>

          <button
            onClick={() => setPendingVerification(false)}
            style={styles.linkButton}
          >
            ← Tilbake til registrering
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

        <h1 style={styles.title}>Opprett konto</h1>
        <p style={styles.subtitle}>
          Bli en del av Bluecrew - Norges ledende maritime bemanningsbyrå.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.nameRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Fornavn</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ola"
                style={styles.input}
                autoComplete="given-name"
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Etternavn</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Nordmann"
                style={styles.input}
                autoComplete="family-name"
                required
              />
            </div>
          </div>

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
                placeholder="Minst 8 tegn"
                style={styles.input}
                autoComplete="new-password"
                minLength={8}
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
            <p style={styles.hint}>Minst 8 tegn</p>
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
            {loading ? "Registrerer..." : "Opprett konto"}
          </button>
        </form>

        <p style={styles.terms}>
          Ved å registrere deg godtar du våre{" "}
          <Link href="/vilkar" style={styles.link}>
            vilkår
          </Link>{" "}
          og{" "}
          <Link href="/personvern" style={styles.link}>
            personvernerklæring
          </Link>
          .
        </p>

        <div style={styles.divider}>
          <span style={styles.dividerLine} />
          <span style={styles.dividerText}>eller</span>
          <span style={styles.dividerLine} />
        </div>

        <p style={styles.footer}>
          Har du allerede konto?{" "}
          <Link href="/logg-inn" style={styles.link}>
            Logg inn
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
    maxWidth: "480px",
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
    gap: "18px",
  },
  nameRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
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
  hint: {
    fontSize: "0.8rem",
    color: "#94a3b8",
    margin: 0,
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
  terms: {
    fontSize: "0.8rem",
    color: "#94a3b8",
    textAlign: "center",
    marginTop: "16px",
    lineHeight: 1.5,
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "20px 0",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "#e2e8f0",
  },
  dividerText: {
    fontSize: "0.85rem",
    color: "#94a3b8",
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
