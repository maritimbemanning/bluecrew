// app/api/contact/route.ts
import { NextResponse } from "next/server";
import {
  sendContactToTeam,
  sendReceiptToSender,
  type ContactPayload,
} from "@/app/lib/server/email";

function readField(d: any, key: string) {
  const v = (d?.[key] ?? "").toString().trim();
  return v.length ? v : undefined;
}

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

    await sendContactToTeam(payload);
    await sendReceiptToSender(payload); // valgfritt – fjern hvis du ikke vil sende kvittering

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] error:", err);
    return NextResponse.json({ ok: false, error: "Kunne ikke sende e-post." }, { status: 500 });
  }
}
