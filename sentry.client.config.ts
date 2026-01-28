// ============================================
// KORELAB - Sentry Client Configuration
// ============================================

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,

    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    // Environnement
    environment: process.env.NODE_ENV,

    // Debug en développement
    debug: process.env.NODE_ENV === 'development',

    // Filtrer les erreurs non pertinentes
    beforeSend(event) {
      // Ignorer certaines erreurs
      if (event.exception?.values?.[0]?.value?.includes('ResizeObserver')) {
        return null;
      }
      return event;
    },

    // Tags par défaut
    initialScope: {
      tags: {
        app: 'korelab',
      },
    },
  });
}
