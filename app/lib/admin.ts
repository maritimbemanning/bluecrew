/**
 * Admin Functions (Server-only)
 *
 * SECURITY: Admin access is ONLY granted via hardcoded email whitelist.
 * Organization membership and metadata roles are NOT checked.
 * This prevents unauthorized access via Clerk dashboard manipulation.
 */

import "server-only";
import { auth, clerkClient } from "@clerk/nextjs/server";

// Re-export client-safe config
export { ADMIN_EMAILS, ADMIN_ORG_SLUG, isAdminUser } from "./admin-config";

import { ADMIN_EMAILS } from "./admin-config";

/**
 * Check if current user has admin access (async version)
 * SECURITY: ONLY checks email whitelist - no other methods!
 *
 * @returns { isAdmin: boolean, userId: string | null, email: string | null }
 */
export async function checkAdminAccess(): Promise<{
  isAdmin: boolean;
  userId: string | null;
  email: string | null;
}> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { isAdmin: false, userId: null, email: null };
    }

    // Get user email
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const email = user.primaryEmailAddress?.emailAddress || null;

    // SECURITY: Only check email whitelist
    const isAdmin = Boolean(email && ADMIN_EMAILS.includes(email.toLowerCase()));

    return { isAdmin, userId, email };
  } catch (error) {
    console.error("Error checking admin access:", error);
    return { isAdmin: false, userId: null, email: null };
  }
}

/**
 * Check if a specific user ID has admin access
 * SECURITY: ONLY checks email whitelist
 *
 * @param userId - Clerk user ID
 * @returns true if user has admin access
 */
export async function isUserAdmin(userId: string): Promise<boolean> {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const email = user.primaryEmailAddress?.emailAddress || null;

    // SECURITY: Only check email whitelist
    return Boolean(email && ADMIN_EMAILS.includes(email.toLowerCase()));
  } catch (error) {
    console.error("Error checking if user is admin:", error);
    return false;
  }
}

// NOTE: setUserAsAdmin and removeUserAdmin functions removed for security.
// Admin access is managed ONLY via the ADMIN_EMAILS list in admin-config.ts
