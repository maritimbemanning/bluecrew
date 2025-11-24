/**
 * CSRF Protection
 * Generates and validates CSRF tokens for form submissions
 */

import { cookies } from "next/headers";
import { createHmac, randomBytes } from "crypto";

const CSRF_TOKEN_LENGTH = 32;
const CSRF_COOKIE_NAME = "csrf_token";

// Lazy-loaded secret to avoid build-time errors
let _cachedSecret: string | null = null;

function getCsrfSecret(): string {
  if (_cachedSecret) return _cachedSecret;

  const secret = process.env.CSRF_SECRET || process.env.NEXTAUTH_SECRET;

  // SECURITY: CSRF_SECRET must be set in production - no fallback allowed
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("CRITICAL: CSRF_SECRET environment variable must be set in production");
  }

  // Use a runtime-generated fallback for development only (not predictable)
  _cachedSecret = secret || `dev-${Date.now()}-${Math.random()}`;
  return _cachedSecret;
}

/**
 * Generates a CSRF token and stores it in a cookie
 * Call this when rendering a form
 */
export async function generateCsrfToken(): Promise<string> {
  const token = randomBytes(CSRF_TOKEN_LENGTH).toString("hex");
  const cookieStore = await cookies();
  
  // Create HMAC signature of the token
  const signature = createHmac("sha256", getCsrfSecret())
    .update(token)
    .digest("hex");
  
  // Store token in httpOnly cookie
  cookieStore.set(CSRF_COOKIE_NAME, `${token}.${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60, // 1 hour
    path: "/",
  });
  
  return token;
}

/**
 * Validates a CSRF token from a form submission
 * Returns true if valid, false otherwise
 */
export async function validateCsrfToken(submittedToken: string | null | undefined): Promise<boolean> {
  if (!submittedToken) {
    return false;
  }
  
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(CSRF_COOKIE_NAME)?.value;
  
  if (!cookieValue) {
    return false;
  }
  
  const [storedToken, storedSignature] = cookieValue.split(".");
  
  if (!storedToken || !storedSignature) {
    return false;
  }
  
  // Verify the submitted token matches the stored token
  if (submittedToken !== storedToken) {
    return false;
  }
  
  // Verify the signature
  const expectedSignature = createHmac("sha256", getCsrfSecret())
    .update(storedToken)
    .digest("hex");
  
  if (expectedSignature !== storedSignature) {
    return false;
  }
  
  return true;
}

/**
 * Middleware helper to check CSRF token in API routes
 * Throws an error if the token is invalid
 */
export async function requireCsrfToken(request: Request): Promise<void> {
  // Only check CSRF for state-changing methods
  const method = request.method;
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") {
    return;
  }
  
  // Get token from header or form data
  let csrfToken: string | null = request.headers.get("x-csrf-token");
  
  if (!csrfToken) {
    // Try to get from form data
    try {
      const formData = await request.clone().formData();
      csrfToken = formData.get("csrf_token") as string | null;
    } catch {
      // Not form data, might be JSON
      try {
        const json = await request.clone().json();
        csrfToken = json.csrf_token || null;
      } catch {
        csrfToken = null;
      }
    }
  }
  
  const isValid = await validateCsrfToken(csrfToken);
  
  if (!isValid) {
    throw new Error("Invalid or missing CSRF token");
  }
}

/**
 * Component helper to get CSRF token for inclusion in forms
 */
export async function getCsrfToken(): Promise<string> {
  return generateCsrfToken();
}
