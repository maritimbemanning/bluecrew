// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://4abfd37e10def4223d91d7a76cd28941@o4510290040848384.ingest.de.sentry.io/4510290046353488",

  // Add optional integrations for additional features
  // Replay disabled by default to avoid capturing user interactions/PII
  integrations: [],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1,
  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Replay sampling disabled
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,

  // Do not send user PII by default
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;