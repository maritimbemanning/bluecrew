/**
 * Server-side Utility Functions
 * Shared helpers for API routes
 */

/**
 * Extract client IP address from request headers
 * Handles x-forwarded-for (proxy/CDN) and x-real-ip headers
 *
 * @param req - The incoming request
 * @returns The client IP address or "unknown"
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip") || "unknown";
}

/**
 * Escape HTML special characters to prevent XSS
 * Use this when inserting user input into HTML templates
 *
 * @param s - The string to escape
 * @returns HTML-escaped string
 */
export function escapeHtml(s: string = ""): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/**
 * Alias for escapeHtml (shorter name for templates)
 */
export const esc = escapeHtml;
