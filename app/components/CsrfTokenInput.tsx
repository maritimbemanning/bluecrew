import { getCsrfToken } from "@/app/lib/server/csrf";

/**
 * Server Component that renders a hidden input with CSRF token
 * Include this in all forms that submit to POST endpoints
 * 
 * Usage:
 * <form action="/api/submit">
 *   <CsrfTokenInput />
 *   ... other form fields ...
 * </form>
 */
export async function CsrfTokenInput() {
  const token = await getCsrfToken();
  
  return (
    <input 
      type="hidden" 
      name="csrf_token" 
      value={token}
      // Also include in a meta tag for fetch requests
      data-csrf={token}
    />
  );
}
