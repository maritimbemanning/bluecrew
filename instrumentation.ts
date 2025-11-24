import * as Sentry from "@sentry/nextjs";
import { validateEnvironment } from "./app/lib/env";
import { logger } from "./app/lib/logger";

// Validate environment variables at server startup
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Initialize Sentry for Node.js runtime
    await import("./sentry.server.config");
    // Only run on server-side (not in edge runtime)
    validateEnvironment();
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    // Initialize Sentry for Edge runtime
    await import("./sentry.edge.config");
  }
}

// Capture request errors in Sentry
export const onRequestError = Sentry.captureRequestError;
