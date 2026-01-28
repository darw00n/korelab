import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ===================
// RATE LIMITING CONFIG
// ===================

// Simple in-memory rate limiter (pour dev/production sans Upstash)
// En production avec beaucoup de trafic, utilisez Upstash Redis
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

interface RateLimitConfig {
  windowMs: number; // Fenêtre de temps en ms
  max: number;      // Nombre max de requêtes
}

// Configuration par type de route
const RATE_LIMITS: Record<string, RateLimitConfig> = {
  // API AI - limites strictes (coûteux)
  '/api/ai': { windowMs: 60000, max: 10 }, // 10 req/min
  
  // API Paiements - limites moyennes
  '/api/payments': { windowMs: 60000, max: 20 }, // 20 req/min
  
  // API Recipes - limites souples
  '/api/recipes': { windowMs: 60000, max: 60 }, // 60 req/min
  
  // Default pour autres API
  '/api': { windowMs: 60000, max: 100 }, // 100 req/min
};

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  return 'unknown';
}

function getRateLimitConfig(pathname: string): RateLimitConfig {
  // Trouver la config la plus spécifique
  for (const [path, config] of Object.entries(RATE_LIMITS)) {
    if (pathname.startsWith(path)) {
      return config;
    }
  }
  return RATE_LIMITS['/api'];
}

function checkRateLimit(key: string, config: RateLimitConfig): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  // Nettoyer les anciennes entrées (toutes les 100 requêtes)
  if (rateLimitMap.size > 10000) {
    const cutoff = now - 300000; // 5 minutes
    for (const [k, v] of rateLimitMap.entries()) {
      if (v.timestamp < cutoff) {
        rateLimitMap.delete(k);
      }
    }
  }

  if (!record || now - record.timestamp > config.windowMs) {
    // Nouvelle fenêtre
    rateLimitMap.set(key, { count: 1, timestamp: now });
    return { allowed: true, remaining: config.max - 1 };
  }

  if (record.count >= config.max) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: config.max - record.count };
}

// ===================
// MIDDLEWARE
// ===================

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ===================
  // 1. RATE LIMITING (API routes seulement)
  // ===================
  if (pathname.startsWith('/api')) {
    const ip = getClientIP(request);
    const config = getRateLimitConfig(pathname);
    const key = `${ip}:${pathname.split('/').slice(0, 3).join('/')}`;
    
    const { allowed, remaining } = checkRateLimit(key, config);

    if (!allowed) {
      return new NextResponse(
        JSON.stringify({
          error: 'Trop de requêtes. Veuillez réessayer dans quelques instants.',
          code: 'RATE_LIMIT_EXCEEDED',
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': config.max.toString(),
            'X-RateLimit-Remaining': '0',
            'Retry-After': Math.ceil(config.windowMs / 1000).toString(),
          },
        }
      );
    }

    // Ajouter les headers de rate limit à la réponse
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', config.max.toString());
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    return response;
  }

  // ===================
  // 2. SECURITY HEADERS
  // ===================
  const response = NextResponse.next();

  // Content Security Policy - plus permissif en dev
  const isDev = process.env.NODE_ENV === 'development';
  
  // En développement, autoriser localhost pour Supabase local
  const connectSrc = isDev
    ? "'self' http://127.0.0.1:* http://localhost:* https://*.supabase.co wss://*.supabase.co https://api.stripe.com https://generativelanguage.googleapis.com"
    : "'self' https://*.supabase.co wss://*.supabase.co https://api.stripe.com https://generativelanguage.googleapis.com";

  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      `connect-src ${connectSrc}`,
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')
  );

  // Autres headers de sécurité
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // HSTS (uniquement en production)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains'
    );
  }

  return response;
}

// ===================
// CONFIG MATCHER
// ===================

export const config = {
  matcher: [
    // API routes
    '/api/:path*',
    // Pages (pour les security headers)
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
