import { randomUUID } from "node:crypto";

const SDK_NAME = "bluecrew.server";
const SDK_VERSION = "1.0.0";

type SentryConfig = {
  dsn: string;
  ingestUrl: string;
  authHeader: string;
};

let sentryConfig: SentryConfig | null = null;

function parseSentryDsn(dsn: string): SentryConfig | null {
  if (!dsn) return null;
  try {
    const url = new URL(dsn);
    const projectId = url.pathname.replace(/^\//, "");
    const key = url.username;
    if (!projectId || !key) return null;
    const ingestUrl = `${url.protocol}//${url.host}/api/${projectId}/envelope/`;
    const authHeader = `Sentry sentry_key=${key}, sentry_version=7, sentry_client=${SDK_NAME}/${SDK_VERSION}`;
    return { dsn, ingestUrl, authHeader };
  } catch {
    return null;
  }
}

function getSentryConfig(): SentryConfig | null {
  if (sentryConfig) return sentryConfig;
  const dsn = process.env.SENTRY_DSN;
  if (!dsn) return null;
  const parsed = parseSentryDsn(dsn);
  if (!parsed) return null;
  sentryConfig = parsed;
  return sentryConfig;
}

function createEventPayload(error: unknown, context?: Record<string, unknown>) {
  const err = error instanceof Error ? error : new Error(typeof error === "string" ? error : "Unknown error");
  const eventId = randomUUID();
  const now = new Date().toISOString();
  const stack = typeof err.stack === "string" ? err.stack : undefined;

  const sanitizedContext: Record<string, unknown> | undefined = context
    ? Object.fromEntries(
        Object.entries(context).map(([key, value]) => [key, typeof value === "string" ? value.slice(0, 200) : value]),
      )
    : undefined;

  return {
    event_id: eventId,
    timestamp: now,
    platform: "node",
    level: "error",
    logger: SDK_NAME,
    message: err.message?.slice(0, 200) || "Unhandled error",
    tags: { runtime: "server" },
    extra: sanitizedContext,
    exception: {
      values: [
        {
          type: err.name || "Error",
          value: err.message || "Error",
          stacktrace: stack
            ? {
                frames: stack
                  .split("\n")
                  .slice(1)
                  .map((line) => ({ filename: line.trim() })),
              }
            : undefined,
        },
      ],
    },
  };
}

export async function captureServerException(error: unknown, context?: Record<string, unknown>) {
  const config = getSentryConfig();
  if (!config) return;

  const envelopeHeader = { dsn: config.dsn, sdk: { name: SDK_NAME, version: SDK_VERSION } };
  const eventPayload = createEventPayload(error, context);
  const itemHeader = { type: "event" };
  const envelope = `${JSON.stringify(envelopeHeader)}\n${JSON.stringify(itemHeader)}\n${JSON.stringify(eventPayload)}`;

  try {
    await fetch(config.ingestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-sentry-envelope",
        "X-Sentry-Auth": config.authHeader,
      },
      body: envelope,
    });
  } catch (err) {
    console.error("Sentry transport error", err);
  }
}
