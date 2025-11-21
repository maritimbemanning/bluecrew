"use client";

import { useEffect } from "react";
import NextError from "next/error";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <html lang="no">
      <head>
        <title>Noe gikk galt - Bluecrew AS</title>
      </head>
      <body
        style={{
          margin: 0,
          padding: "2rem",
          fontFamily: "system-ui, sans-serif",
          maxWidth: "800px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div>
          <h1>Noe gikk galt</h1>
          <p>Beklager, det oppstod en uventet feil.</p>

          {process.env.NODE_ENV === "development" && (
            <details
              style={{
                marginTop: "2rem",
                padding: "1rem",
                backgroundColor: "#fee",
                borderRadius: "4px",
                border: "1px solid #fcc",
              }}
            >
              <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
                Feildetaljer (kun i development)
              </summary>
              <pre
                style={{
                  marginTop: "1rem",
                  whiteSpace: "pre-wrap",
                  fontSize: "0.875rem",
                  overflow: "auto",
                }}
              >
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
                {error.stack && `\n\nStack:\n${error.stack}`}
              </pre>
            </details>
          )}

          <div style={{ marginTop: "2rem" }}>
            <button
              onClick={reset}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "1rem",
                marginRight: "1rem",
              }}
            >
              Prøv igjen
            </button>
            <Link
              href="/"
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#666",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px",
                display: "inline-block",
              }}
            >
              Gå til forsiden
            </Link>
          </div>
        </div>

        {/* Fallback to Next.js default error component */}
        <div style={{ display: "none" }}>
          <NextError statusCode={0} />
        </div>
      </body>
    </html>
  );
}
