"use client";

import { useEffect, useState } from "react";

/**
 * Hook to fetch and manage CSRF token for form submissions.
 * Automatically fetches a token on mount.
 */
export function useCsrf() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchToken = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/csrf");
      if (!response.ok) {
        throw new Error("Failed to fetch CSRF token");
      }
      const data = await response.json();
      setToken(data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      console.error("CSRF token fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  // Refresh token (call after successful form submission)
  const refresh = () => {
    fetchToken();
  };

  return { token, loading, error, refresh };
}
