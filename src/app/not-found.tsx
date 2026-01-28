'use client';

import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { MobileShell } from '@/components/layout/MobileShell';

export default function NotFound() {
  return (
    <MobileShell>
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          {/* Illustration */}
          <div className="mb-8">
            <div className="relative w-32 h-32 mx-auto">
              {/* Circle background */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full" />
              {/* 404 Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-bold text-amber-400">404</span>
              </div>
            </div>
          </div>

          {/* Text */}
          <h1 className="text-2xl font-bold text-white mb-3">
            Page introuvable
          </h1>
          <p className="text-slate-400 mb-8">
            Oups ! Cette page n'existe pas ou a été déplacée. 
            Pas de panique, votre routine capillaire parfaite vous attend ailleurs.
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium py-3 px-6 rounded-xl transition-colors"
            >
              <Home className="w-5 h-5" />
              Retour à l'accueil
            </Link>

            <Link
              href="/diagnostic"
              className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-xl transition-colors"
            >
              <Search className="w-5 h-5" />
              Faire mon diagnostic
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 w-full text-slate-400 hover:text-white font-medium py-3 px-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Page précédente
            </button>
          </div>

          {/* Help */}
          <p className="mt-8 text-sm text-slate-500">
            Besoin d'aide ?{' '}
            <a href="mailto:contact@korelab.ma" className="text-amber-400 hover:underline">
              Contactez-nous
            </a>
          </p>
        </div>
      </div>
    </MobileShell>
  );
}
