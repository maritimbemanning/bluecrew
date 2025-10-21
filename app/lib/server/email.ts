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

function withComplianceFooter(text: string) {
  const footer = [
    "",
    "--",
    "Bluecrew AS · Org.nr 936 321 194",
    "Østenbekkveien 43, 9403 Harstad",
    "E-post: isak@bluecrew.no · https://bluecrew.no",
    "Personvern: https://bluecrew.no/personvern",
  ].join("\n");
  return `${text}${footer}`;
}

export async function sendNotificationEmail(options: SendEmailOptions) {
  const apiKey = process.env.RESEND_API_KEY;
  const disabled = process.env.RESEND_DISABLED === "1";
  const fromEmail = process.env.RESEND_FROM_EMAIL || process.env.FROM_EMAIL || "noreply@bluecrew.no";
  const toEmail = process.env.RESEND_TO_EMAIL || process.env.TO_EMAIL || "isak@bluecrew.no";

  if (!apiKey || disabled) {
    console.warn("✉️ Resend er deaktivert eller mangler API-nøkkel – hopper over e-post.");
    return { skipped: true };
  }

  const payload = {
    from: fromEmail,
    to: [toEmail],
    subject: options.subject,
    text: withComplianceFooter(options.text),
    reply_to: options.replyTo || undefined,
    attachments: options.attachments?.map((a) => ({
      filename: a.filename,
      content: a.content,
      content_type: a.contentType || "application/octet-stream",
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
