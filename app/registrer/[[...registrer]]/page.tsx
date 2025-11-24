"use client";

import { SignUp } from "@clerk/nextjs";

export default function RegistrerPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(155deg, #0a1d39 0%, #0f2648 55%, #051427 100%)",
      }}
    >
      <SignUp />
    </div>
  );
}
