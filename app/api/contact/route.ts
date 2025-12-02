// app/api/contact/route.ts
import { NextResponse } from "next/server";
import {
  sendContactToTeam,
  sendReceiptToSender,
  type ContactPayload,
} from "@/app/lib/server/email";
import { requireCsrfToken } from "../../lib/server/csrf";
import { enforceRateLimit } from "../../lib/server/rate-limit";
import { logger } from "../../lib/logger";

export const runtime = "nodejs";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getClientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip") || "unknown";
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
    // Rate limiting
    const rateKey = `contact:${getClientIp(req)}`;
    const rate = await enforceRateLimit(rateKey);
    if (!rate.allowed) {
      return NextResponse.json(
        { ok: false, error: "For mange forespørsler. Prøv igjen senere." },
        { status: 429, headers: { "Retry-After": String(rate.resetSeconds || 60) } }
      );
    }

    // CSRF Protection
    try {
      await requireCsrfToken(req);
    } catch (error) {
      logger.error("CSRF validation failed:", error);
      return NextResponse.json(
        { ok: false, error: "Ugyldig forespørsel. Vennligst last inn siden på nytt og prøv igjen." },
        { status: 403 }
      );
    }

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
    logger.error("[/api/contact] error:", err);
    return NextResponse.json({ ok: false, error: "Kunne ikke sende e-post." }, { status: 500 });
  }
}
