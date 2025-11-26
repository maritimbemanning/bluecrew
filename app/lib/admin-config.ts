/**
 * Admin Configuration (Client-safe)
 * Contains only static data - no server imports
 *
 * SECURITY: Admin access is ONLY granted via hardcoded email list.
 * This prevents unauthorized access via Clerk metadata manipulation.
 */

/**
 * Admin Organization Slug (for reference only - not used for auth)
 * From Clerk Dashboard: Organizations → Bluecrew Admin
 */
export const ADMIN_ORG_SLUG = "bluecrew-admin-1764030919";

/**
 * List of admin email addresses
 * ONLY these emails have admin access - no exceptions!
 * To add/remove admins: Edit this list and deploy.
 */
export const ADMIN_EMAILS: readonly string[] = [
  "isak@bluecrew.no",
  "tf@bluecrew.no",
];

/**
 * Check if a user has admin access (sync version)
 * SECURITY: Uses ONLY email whitelist - ignores Clerk metadata
 * Safe to use in Client Components
 *
 * @param userEmail - The user's email address (lowercase)
 * @param _role - Ignored for security (kept for API compatibility)
 * @returns true if user has admin access
 */
export function isAdminUser(
  userEmail: string | undefined | null,
  _role?: string | undefined | null
): boolean {
  if (!userEmail) return false;
  return ADMIN_EMAILS.includes(userEmail.toLowerCase());
}
