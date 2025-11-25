/**
 * Admin Functions (Server-only)
 * Contains async functions that require server imports
 */

import "server-only";
import { auth, clerkClient } from "@clerk/nextjs/server";

// Re-export client-safe config
export { ADMIN_EMAILS, ADMIN_ORG_SLUG, isAdminUser } from "./admin-config";

import { ADMIN_EMAILS, ADMIN_ORG_SLUG } from "./admin-config";

/**
 * Check if current user has admin access (async version)
 * Checks in order:
 * 1. Clerk Organization membership (Clerk Pro)
 * 2. publicMetadata.role === "admin"
 * 3. Email in ADMIN_EMAILS list
 *
 * @returns { isAdmin: boolean, userId: string | null, email: string | null }
 */
export async function checkAdminAccess(): Promise<{
  isAdmin: boolean;
  userId: string | null;
  email: string | null;
  method: "organization" | "role" | "email" | null;
}> {
  try {
    const { userId, orgSlug } = await auth();

    if (!userId) {
      return { isAdmin: false, userId: null, email: null, method: null };
    }

    // 1. Check if user is in admin organization
    if (orgSlug === ADMIN_ORG_SLUG) {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      const email = user.primaryEmailAddress?.emailAddress || null;
      return { isAdmin: true, userId, email, method: "organization" };
    }

    // 2. Get user and check metadata/email
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const email = user.primaryEmailAddress?.emailAddress || null;
    const role = (user.publicMetadata as Record<string, unknown>)?.role as string | undefined;

    // Check role metadata
    if (role === "admin") {
      return { isAdmin: true, userId, email, method: "role" };
    }

    // Check email list
    if (email && ADMIN_EMAILS.includes(email.toLowerCase())) {
      return { isAdmin: true, userId, email, method: "email" };
    }

    return { isAdmin: false, userId, email, method: null };
  } catch (error) {
    console.error("Error checking admin access:", error);
    return { isAdmin: false, userId: null, email: null, method: null };
  }
}

/**
 * Check if a specific user ID has admin access
 * Useful for API routes where you already have the userId
 *
 * @param userId - Clerk user ID
 * @returns true if user has admin access
 */
export async function isUserAdmin(userId: string): Promise<boolean> {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const email = user.primaryEmailAddress?.emailAddress || null;
    const role = (user.publicMetadata as Record<string, unknown>)?.role as string | undefined;

    // Check role metadata
    if (role === "admin") return true;

    // Check email list
    if (email && ADMIN_EMAILS.includes(email.toLowerCase())) return true;

    // Check organization memberships
    const orgMemberships = await client.users.getOrganizationMembershipList({
      userId,
    });

    return orgMemberships.data.some(
      (membership) => membership.organization.slug === ADMIN_ORG_SLUG
    );
  } catch (error) {
    console.error("Error checking if user is admin:", error);
    return false;
  }
}

/**
 * Set admin role for a user
 * Updates publicMetadata.role to "admin"
 *
 * @param userId - Clerk user ID
 */
export async function setUserAsAdmin(userId: string): Promise<void> {
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { role: "admin" },
  });
}

/**
 * Remove admin role from a user
 * Removes role from publicMetadata
 *
 * @param userId - Clerk user ID
 */
export async function removeUserAdmin(userId: string): Promise<void> {
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { role: null },
  });
}
