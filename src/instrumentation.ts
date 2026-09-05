import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Tracing
  tracesSampleRate: 0.1,

  // Environment
  environment: process.env.NODE_ENV,

  // Disable in development
  enabled: process.env.NODE_ENV === 'production',

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
})

// Export onRequestError hook for Sentry SDK
export const onRequestError = Sentry.captureRequestError