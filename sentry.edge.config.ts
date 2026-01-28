// ============================================
// KORELAB - Sentry Edge Configuration
// ============================================

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,

    // Performance Monitoring (plus léger pour edge)
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.05 : 0.5,

    // Environnement
    environment: process.env.NODE_ENV,

    // Tags par défaut
    initialScope: {
      tags: {
        app: 'korelab',
        runtime: 'edge',
      },
    },
  });
}
