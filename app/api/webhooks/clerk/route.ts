/**
 * CLERK WEBHOOK HANDLER
 * Route: /api/webhooks/clerk
 *
 * Handles Clerk user lifecycle events for automatic sync with our system.
 * Configure webhook in Clerk Dashboard: https://dashboard.clerk.com/webhooks
 *
 * Required events:
 * - user.created: Initialize user in our system
 * - user.updated: Sync profile changes
 * - user.deleted: GDPR-compliant data handling
 */

import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { insertSupabaseRow } from "@/app/lib/server/supabase";
import { logger } from "@/app/lib/logger";

export const runtime = "nodejs";

// Webhook signing secret from Clerk Dashboard
const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

// Supabase config
const getSupabaseConfig = () => ({
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  key: process.env.SUPABASE_SERVICE_ROLE_KEY!,
});

// Direct REST API call to Supabase
async function supabaseQuery(
  table: string,
  method: "GET" | "PATCH",
  filters: Record<string, string>,
  data?: Record<string, unknown>
) {
  const { url, key } = getSupabaseConfig();
  const tableUrl = new URL(`${url}/rest/v1/${table}`);

  // Add filters as query params
  for (const [k, v] of Object.entries(filters)) {
    tableUrl.searchParams.set(k, v);
  }

  const res = await fetch(tableUrl.toString(), {
    method,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: method === "PATCH" ? "return=minimal" : "",
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!res.ok && method === "GET") {
    return null;
  }

  return method === "GET" ? res.json() : { ok: res.ok };
}

export async function POST(req: Request) {
  if (!WEBHOOK_SECRET) {
    logger.error("CLERK_WEBHOOK_SECRET is not set");
    return new Response("Webhook secret not configured", { status: 500 });
  }

  // Get the headers for signature verification
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    logger.warn("Missing Svix headers in webhook request");
    return new Response("Missing signature headers", { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Verify the webhook signature
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    logger.error("Webhook signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  // Handle the webhook event
  const eventType = evt.type;
  logger.info(`📬 Clerk webhook received: ${eventType}`);

  try {
    switch (eventType) {
      case "user.created":
        await handleUserCreated(evt.data);
        break;

      case "user.updated":
        await handleUserUpdated(evt.data);
        break;

      case "user.deleted":
        await handleUserDeleted(evt.data);
        break;

      default:
        logger.debug(`Unhandled webhook event: ${eventType}`);
    }

    return new Response("Webhook processed", { status: 200 });
  } catch (error) {
    logger.error(`Error processing webhook ${eventType}:`, error);
    return new Response("Webhook processing failed", { status: 500 });
  }
}

// Type for user webhook data
type UserWebhookData = {
  id: string;
  email_addresses?: { id: string; email_address: string }[];
  primary_email_address_id?: string;
  first_name?: string | null;
  last_name?: string | null;
  created_at?: number;
  public_metadata?: Record<string, unknown>;
};

/**
 * Handle user.created event
 * Creates a record in our users table to track Clerk users
 */
async function handleUserCreated(data: WebhookEvent["data"]) {
  if (!("id" in data) || !("email_addresses" in data)) return;

  const userData = data as UserWebhookData;
  const { id, email_addresses, first_name, last_name, created_at, public_metadata } = userData;
  const primaryEmail = email_addresses?.find((e) => e.id === userData.primary_email_address_id);

  logger.info("👤 New Clerk user created", { userId: id, email: primaryEmail?.email_address });

  try {
    await insertSupabaseRow({
      table: "clerk_users",
      payload: {
        clerk_user_id: id,
        email: primaryEmail?.email_address || null,
        first_name: first_name || null,
        last_name: last_name || null,
        full_name: [first_name, last_name].filter(Boolean).join(" ") || null,
        is_admin: public_metadata?.role === "admin",
        vipps_verified: public_metadata?.vipps_verified === true,
        candidate_registered: public_metadata?.candidate_registered === true,
        created_at: created_at ? new Date(created_at).toISOString() : new Date().toISOString(),
      },
    });
    logger.success("✅ User record created", { userId: id });
  } catch (error) {
    // Might be duplicate - that's ok
    logger.warn("Could not create user record (may already exist)", { error: String(error) });
  }
}

/**
 * Handle user.updated event
 * Syncs profile changes to our database
 */
async function handleUserUpdated(data: WebhookEvent["data"]) {
  if (!("id" in data) || !("email_addresses" in data)) return;

  const userData = data as UserWebhookData;
  const { id, email_addresses, first_name, last_name, public_metadata } = userData;
  const primaryEmail = email_addresses?.find((e) => e.id === userData.primary_email_address_id);

  logger.info("🔄 Clerk user updated", { userId: id });

  // Update user record
  const result = await supabaseQuery(
    "clerk_users",
    "PATCH",
    { clerk_user_id: `eq.${id}` },
    {
      email: primaryEmail?.email_address || null,
      first_name: first_name || null,
      last_name: last_name || null,
      full_name: [first_name, last_name].filter(Boolean).join(" ") || null,
      is_admin: public_metadata?.role === "admin",
      vipps_verified: public_metadata?.vipps_verified === true,
      candidate_registered: public_metadata?.candidate_registered === true,
      updated_at: new Date().toISOString(),
    }
  );

  if (!result?.ok) {
    // User doesn't exist, create them
    await handleUserCreated(data);
    return;
  }

  // Also update linked candidate record if exists
  if (public_metadata?.candidate_status) {
    await supabaseQuery(
      "candidates",
      "PATCH",
      { clerk_user_id: `eq.${id}` },
      { status: public_metadata.candidate_status as string }
    );
  }

  logger.success("✅ User record updated", { userId: id });
}

/**
 * Handle user.deleted event
 * GDPR-compliant: anonymize user data instead of hard delete
 */
async function handleUserDeleted(data: WebhookEvent["data"]) {
  if (!("id" in data)) return;

  const { id } = data;
  logger.info("🗑️ Clerk user deleted", { userId: id });

  // Soft delete: mark as deleted, anonymize PII
  await supabaseQuery(
    "clerk_users",
    "PATCH",
    { clerk_user_id: `eq.${id}` },
    {
      email: null,
      first_name: null,
      last_name: null,
      full_name: "[Slettet bruker]",
      deleted_at: new Date().toISOString(),
    }
  );

  // Anonymize linked candidate record
  await supabaseQuery(
    "candidates",
    "PATCH",
    { clerk_user_id: `eq.${id}` },
    {
      name: "[Slettet]",
      email: `deleted-${id}@anonymized.local`,
      phone: null,
      status: "deleted",
      skills: null,
      other_comp: null,
    }
  );

  // Log for GDPR audit trail
  logger.info("✅ GDPR: User data anonymized", {
    userId: id,
    action: "user.deleted",
    timestamp: new Date().toISOString(),
  });
}
