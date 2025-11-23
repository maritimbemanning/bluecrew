import { SignUp } from "@clerk/nextjs";

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
        forceRedirectUrl="/min-side"
        signInUrl="/logg-inn"
      />
    </div>
  );
}
