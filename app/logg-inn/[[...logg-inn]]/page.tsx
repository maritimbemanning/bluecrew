import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(155deg, #0a1d39 0%, #0f2648 55%, #051427 100%)",
      }}
    >
      <SignIn
        fallback={
          <div style={{ color: "white", textAlign: "center" }}>
            <p>Laster innlogging...</p>
            <p style={{ fontSize: "12px", opacity: 0.7, marginTop: "8px" }}>
              Hvis dette tar lang tid, sjekk at Clerk er konfigurert riktig.
            </p>
          </div>
        }
        appearance={{
          elements: {
            rootBox: {
              width: "100%",
              maxWidth: "420px",
            },
          },
        }}
      />
    </div>
  );
}
