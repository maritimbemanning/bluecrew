import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
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
      <SignUp
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
