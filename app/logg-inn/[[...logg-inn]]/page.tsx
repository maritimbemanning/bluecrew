"use client";

import { SignIn } from "@clerk/nextjs";

export default function LoggInnPage() {
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
      <SignIn />
    </div>
  );
}
