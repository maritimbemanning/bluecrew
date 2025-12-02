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
    console.log("[useCsrf] Fetching CSRF token...");
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/csrf");
      console.log("[useCsrf] CSRF response status:", response.status);
      if (!response.ok) {
        throw new Error(`Failed to fetch CSRF token: ${response.status}`);
      }
      const data = await response.json();
      console.log("[useCsrf] CSRF token received:", data.token ? "yes" : "no");
      setToken(data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      console.error("[useCsrf] CSRF token fetch FAILED:", err);
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
