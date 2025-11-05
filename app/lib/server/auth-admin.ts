import { createClient } from "@supabase/supabase-js";
import { sendLoginLinkToUser } from "@/app/lib/server/email";

/**
 * Server-side Supabase admin client (service role).
 * Used to provision users and send login invitations/magic links.
 */
function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Missing Supabase configuration (URL or service role key)");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Try to invite user by email. If the user already exists, fall back to generating
 * a magic link and sending it via our email provider.
 * 
 * SECURITY: Magic links always redirect to /konto/velkommen, NEVER to /admin
 */
export async function ensureUserAndSendLoginLink(email: string, options?: { name?: string }) {
  const sb = getAdminClient();

  // Safe redirect URL - must NOT point to /admin or any protected route
  const safeRedirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bluecrew.no'}/konto/velkommen`;
  
  // Validate redirect URL doesn't contain /admin (defense in depth)
  if (safeRedirectUrl.includes('/admin')) {
    throw new Error('SECURITY: Attempted to generate magic link with /admin redirect');
  }

  console.log('🔐 Generating magic link with safe redirect:', safeRedirectUrl);

  // First, try inviting the user (Supabase will send its own invite email)
  try {
    await sb.auth.admin.inviteUserByEmail(email, {
      data: options?.name ? { name: options.name } : undefined,
      redirectTo: safeRedirectUrl,
    });
    console.log('✅ User invited via Supabase email');
    return;
  } catch (err: any) {
    // If the user exists already or invite fails for another reason, try generating a magic link instead
    const code = (err?.status ?? err?.code ?? "") as any;
    if (code) {
      // proceed to magic link path
    }
  }

  // Generate a magic link that we can send with our own email
  // This does not send an email by itself.
  // CRITICAL: Uses safeRedirectUrl to avoid /admin bypass
  const linkRes = await sb.auth.admin.generateLink({
    type: "magiclink",
    email,
    options: {
      redirectTo: safeRedirectUrl,
    },
  });

  const actionLink = (linkRes as any)?.data?.properties?.action_link as string | undefined;
  if (!actionLink) {
    throw new Error("Failed to generate magic link for user");
  }

  // Additional security check: verify the generated link doesn't redirect to /admin
  if (actionLink.includes('/admin')) {
    console.error('🚨 SECURITY ALERT: Magic link contains /admin redirect', actionLink);
    throw new Error('SECURITY: Generated magic link contains /admin redirect');
  }

  console.log('✅ Magic link generated successfully (non-admin redirect)');

  // Send a brief, branded email via Resend with the magic link directly to the user
  await sendLoginLinkToUser({
    email,
    subject: "Logg inn på Bluecrew",
    html: `
      <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6">
        <p>Hei${options?.name ? ` ${options.name}` : ""},</p>
        <p>Klikk på knappen under for å logge inn:</p>
        <p><a href="${actionLink}" style="display:inline-block;background:#2563eb;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">Logg inn</a></p>
        <p style="font-size:12px;color:#64748b">Lenken er personlig og utløper automatisk etter kort tid.</p>
      </div>
    `,
    text: `Hei${options?.name ? ` ${options.name}` : ""},\n\nÅpne denne lenken for å logge inn: ${actionLink}`,
  });
}
