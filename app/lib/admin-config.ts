/**
 * Admin Configuration (Client-safe)
 * Contains only static data - no server imports
 */

/**
 * Admin Organization Slug
 * From Clerk Dashboard: Organizations → Bluecrew Admin
 */
export const ADMIN_ORG_SLUG = "bluecrew-admin-1764030919";

/**
 * List of admin email addresses
 * Fallback for users not in admin organization
 */
export const ADMIN_EMAILS: readonly string[] = [
  "isak@bluecrew.no",
  "tf@bluecrew.no",
  "isak.didriksson@gmail.com",
];

/**
 * Check if a user has admin access (sync version)
 * Uses email list and publicMetadata role
 * Safe to use in Client Components
 *
 * @param userEmail - The user's email address (lowercase)
 * @param role - The user's role from Clerk publicMetadata
 * @returns true if user has admin access
 */
export function isAdminUser(
  userEmail: string | undefined | null,
  role: string | undefined | null
): boolean {
  if (role === "admin") return true;
  if (!userEmail) return false;
  return ADMIN_EMAILS.includes(userEmail.toLowerCase());
}
