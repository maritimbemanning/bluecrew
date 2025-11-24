/**
 * Admin Configuration
 * Centralized admin user management
 */

/**
 * List of admin email addresses
 * Users with these emails get admin access even without explicit role metadata
 */
export const ADMIN_EMAILS: readonly string[] = [
  "isak@bluecrew.no",
  "tf@bluecrew.no",
  "isak.didriksson@gmail.com",
];

/**
 * Check if a user has admin access
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
