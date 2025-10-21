// app/api/contact/route.ts
import { NextResponse } from "next/server";
import {
  sendContactToTeam,
  sendReceiptToSender,
  type ContactPayload,
} from "@/app/lib/server/email";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readField(data: Record<string, unknown>, key: string) {
  const value = data[key];
  const formatted =
    typeof value === "string"
      ? value
      : typeof value === "number" || typeof value === "boolean"
      ? value.toString()
      : "";

  const trimmed = formatted.trim();
  return trimmed.length ? trimmed : undefined;
}

export async function POST(req: Request) {
  try {
    const unknownData = (await req.json().catch(() => ({}))) as unknown;
    const data = isRecord(unknownData) ? unknownData : {};
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
