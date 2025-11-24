// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a user loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // GDPR-friendly settings
  // Don't send PII (Personally Identifiable Information)
  sendDefaultPii: false,

  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Session Replay (disabled for GDPR - captures user sessions)
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,

  // Only enable in production
  enabled: process.env.NODE_ENV === "production",

  // Environment tag
  environment: process.env.NODE_ENV,

  // Filter out sensitive data
  beforeSend(event) {
    // Remove IP addresses
    if (event.user) {
      delete event.user.ip_address;
    }

    // Remove any email addresses from error messages
    if (event.message) {
      event.message = event.message.replace(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
        "[EMAIL_REDACTED]"
      );
    }

    return event;
  },

  // Ignore common non-actionable errors
  ignoreErrors: [
    // Browser extensions
    "top.GLOBALS",
    "ResizeObserver loop limit exceeded",
    "ResizeObserver loop completed with undelivered notifications",
    // Network errors
    "Network request failed",
    "Failed to fetch",
    "Load failed",
    // User-initiated navigation
    "AbortError",
    "cancelled",
  ],

  // Only allow errors from our domain
  allowUrls: [
    /https?:\/\/(www\.)?bluecrew\.no/,
    /https?:\/\/.*\.vercel\.app/,
  ],
});

// Export hook for navigation instrumentation
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
