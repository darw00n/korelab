'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error:', error);
  }, [error]);

  return (
    <html lang="fr">
      <body className="bg-slate-950 text-white">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            {/* Icon */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            {/* Text */}
            <h1 className="text-2xl font-bold mb-3">
              Erreur critique
            </h1>
            <p className="text-slate-400 mb-8">
              Une erreur inattendue s'est produite. 
              Veuillez rafraîchir la page ou réessayer plus tard.
            </p>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={reset}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Réessayer
              </button>

              <a
                href="/"
                className="block w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Retour à l'accueil
              </a>
            </div>

            {/* Contact */}
            <p className="mt-8 text-sm text-slate-500">
              Besoin d'aide ?{' '}
              <a href="mailto:support@korelab.ma" className="text-amber-400 hover:underline">
                support@korelab.ma
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
