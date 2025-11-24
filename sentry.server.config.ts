// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // GDPR-friendly settings
  sendDefaultPii: false,

  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

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

    // Scrub sensitive headers
    if (event.request?.headers) {
      const sensitiveHeaders = [
        "authorization",
        "cookie",
        "x-forwarded-for",
        "x-real-ip",
      ];
      for (const header of sensitiveHeaders) {
        if (event.request.headers[header]) {
          event.request.headers[header] = "[REDACTED]";
        }
      }
    }

    // Remove email addresses from error messages
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
    "ECONNRESET",
    "ENOTFOUND",
    "ETIMEDOUT",
    "socket hang up",
  ],
});
