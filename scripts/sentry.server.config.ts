import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Tracing
  tracesSampleRate: 0.1,

  // Environment
  environment: process.env.NODE_ENV,

  // Disable in development
  enabled: process.env.NODE_ENV === 'production',
})
