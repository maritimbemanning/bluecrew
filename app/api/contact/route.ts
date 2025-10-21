// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { sendNotificationEmail } from "@/app/lib/server/email";

function readField(d: any, key: string) {
  const v = (d?.[key] ?? "").toString().trim();
  return v.length ? v : undefined;
}

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
};

export async function POST(req: Request) {
  try {
    const data = await req.json().catch(() => ({}));
    const payload: ContactPayload = {
      name: readField(data, "name"),
      email: readField(data, "email"),
      phone: readField(data, "phone"),
      company: readField(data, "company"),
      subject: readField(data, "subject"),
      message: readField(data, "message") || "",
    };

    if (!payload.message) {
      return NextResponse.json({ ok: false, error: "Melding kan ikke være tom." }, { status: 400 });
    }

    const lines = [
      "NY KONTAKTFORESPØRSEL",
      payload.name ? `Navn: ${payload.name}` : undefined,
      payload.email ? `E-post: ${payload.email}` : undefined,
      payload.phone ? `Telefon: ${payload.phone}` : undefined,
      payload.company ? `Selskap: ${payload.company}` : undefined,
      payload.subject ? `Emne: ${payload.subject}` : undefined,
      "",
      payload.message,
    ].filter(Boolean);

    await sendNotificationEmail({
      subject: `Kontaktforespørsel: ${payload.subject || payload.name || "(uten emne)"}`,
      text: lines.join("\n"),
      replyTo: payload.email,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] error:", err);
    return NextResponse.json({ ok: false, error: "Kunne ikke sende e-post." }, { status: 500 });
  }
}
