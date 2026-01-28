// ============================================
// KORELAB - Sentry Server Configuration
// ============================================

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,

    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // Environnement
    environment: process.env.NODE_ENV,

    // Debug en développement
    debug: process.env.NODE_ENV === 'development',

    // Tags par défaut
    initialScope: {
      tags: {
        app: 'korelab',
        runtime: 'server',
      },
    },
  });
}
