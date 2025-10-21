type EmailAttachment = {
  filename: string;
  content: string;
  contentType?: string;
};

type SendEmailOptions = {
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
};

export async function sendNotificationEmail(options: SendEmailOptions) {
  const apiKey = process.env.RESEND_API_KEY;
  const disabled = process.env.RESEND_DISABLED === "1";
  if (disabled) {
    console.info("ℹ️ Resend er deaktivert (RESEND_DISABLED=1). Hopper over utsendelse.");
    return { skipped: true };
  }

  const from =
    process.env.RESEND_FROM_EMAIL ||
    process.env.FROM_EMAIL ||
    (process.env.NODE_ENV === "production" ? "onboarding@resend.dev" : "dev@resend.dev");
  const to = process.env.RESEND_TO_EMAIL || process.env.TO_EMAIL;

  if (!apiKey || !from || !to) {
    console.warn("⚠️ Resend-konfig mangler. Hopper over utsendelse.");
    return { skipped: true };
  }

  const payload = {
    from,
    to: Array.isArray(to) ? to : [to],
    subject: options.subject,
    text: options.text,
    reply_to: options.replyTo,
    attachments: options.attachments?.map((att) => ({
      filename: att.filename,
      content: att.content,
      content_type: att.contentType,
    })),
  };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text();
    if (response.status === 403) {
      console.warn("⚠️ Resend avviste forespørselen (403). Kontroller domenekonfigurasjon.");
      return { skipped: true };
    }
    throw new Error(`Resend-feil ${response.status}: ${detail}`);
  }

  return { ok: true };
}
