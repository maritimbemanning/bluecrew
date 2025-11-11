import { validateEnvironment } from "./app/lib/env";
import { logger } from "./app/lib/logger";

// Validate environment variables at server startup
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Only run on server-side (not in edge runtime)
    validateEnvironment();
  }
}

// Optional: Add request error logging
export const onRequestError = (err: unknown) => {
  if (process.env.NODE_ENV === "production") {
    // In production, log errors (could send to external service)
    logger.error("[Request Error]", err);
  } else {
    // In development, show full error details
    logger.error("Request error:", err);
  }
};
