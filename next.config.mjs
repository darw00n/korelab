import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimisations pour le marché marocain (4G)
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 768, 1024],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
};

// Configuration Sentry
const sentryWebpackPluginOptions = {
  // Silencer les logs Sentry pendant le build
  silent: true,
  
  // Organisation et projet Sentry (à configurer)
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  
  // Upload des source maps seulement en production
  hideSourceMaps: true,
  
  // Désactiver le telemetry Sentry
  telemetry: false,
};

// Exporter avec ou sans Sentry selon la configuration
const config = process.env.SENTRY_DSN
  ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
  : nextConfig;

export default config;
