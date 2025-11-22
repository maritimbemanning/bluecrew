"use client";

import { useState, useEffect } from "react";

/**
 * Hook to fetch and manage CSRF token for client-side forms.
 *
 * Usage:
 * ```tsx
 * const { csrfToken, loading } = useCsrfToken();
 *
 * // In form:
 * <input type="hidden" name="csrf_token" value={csrfToken} />
 * ```
 */
export function useCsrfToken() {
  const [csrfToken, setCsrfToken] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch("/api/csrf");
        if (!response.ok) {
          throw new Error("Failed to fetch CSRF token");
        }
        const data = await response.json();
        setCsrfToken(data.token);
      } catch (err) {
        console.error("CSRF token fetch error:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchToken();
  }, []);

  return { csrfToken, loading, error };
}
