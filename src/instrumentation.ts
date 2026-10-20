import * as Sentry from "@sentry/nextjs";

// Server-side error monitoring. Does nothing until SENTRY_DSN is set.
export function register() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN,
    enabled: Boolean(process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN),
    environment: process.env.NODE_ENV,
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,
  });
}

export const onRequestError = Sentry.captureRequestError;
