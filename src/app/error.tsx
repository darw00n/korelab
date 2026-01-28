'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Home, RefreshCw, AlertTriangle, Mail } from 'lucide-react';
import { MobileShell } from '@/components/layout/MobileShell';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log l'erreur (sera capturé par Sentry si configuré)
    console.error('Application Error:', error);
  }, [error]);

  return (
    <MobileShell>
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          {/* Icon */}
          <div className="mb-8">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-red-400" />
              </div>
            </div>
          </div>

          {/* Text */}
          <h1 className="text-2xl font-bold text-white mb-3">
            Une erreur est survenue
          </h1>
          <p className="text-slate-400 mb-2">
            Nous sommes désolés, quelque chose s'est mal passé.
          </p>
          <p className="text-slate-500 text-sm mb-8">
            Notre équipe a été notifiée et travaille à résoudre le problème.
          </p>

          {/* Error details (dev only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-left">
              <p className="text-xs text-red-400 font-mono break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-slate-500 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={reset}
              className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium py-3 px-6 rounded-xl transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Réessayer
            </button>

            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-xl transition-colors"
            >
              <Home className="w-5 h-5" />
              Retour à l'accueil
            </Link>
          </div>

          {/* Contact */}
          <div className="mt-8 p-4 bg-slate-900 rounded-xl">
            <p className="text-sm text-slate-400 mb-2">
              Le problème persiste ?
            </p>
            <a
              href="mailto:support@korelab.ma"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm"
            >
              <Mail className="w-4 h-4" />
              support@korelab.ma
            </a>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
