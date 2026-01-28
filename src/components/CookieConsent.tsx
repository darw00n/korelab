'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Check } from 'lucide-react';
import Link from 'next/link';

// Types pour les préférences cookies
interface CookiePreferences {
  essential: boolean; // Toujours true
  analytics: boolean;
  functional: boolean;
}

const COOKIE_CONSENT_KEY = 'korelab-cookie-consent';
const COOKIE_PREFERENCES_KEY = 'korelab-cookie-preferences';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    functional: false,
  });

  // Vérifier si le consentement a déjà été donné
  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Délai pour ne pas bloquer le rendu initial
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Charger les préférences sauvegardées
      const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPrefs) {
        setPreferences(JSON.parse(savedPrefs));
      }
    }
  }, []);

  // Accepter tous les cookies
  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      functional: true,
    };
    saveConsent(allAccepted);
  };

  // Refuser les cookies non-essentiels
  const rejectAll = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
      functional: false,
    };
    saveConsent(essentialOnly);
  };

  // Sauvegarder les préférences personnalisées
  const saveCustom = () => {
    saveConsent(preferences);
  };

  // Sauvegarder le consentement
  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, new Date().toISOString());
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);
    setShowDetails(false);

    // Ici, vous pouvez initialiser les scripts analytics si acceptés
    if (prefs.analytics) {
      // Exemple: initGoogleAnalytics();
      console.log('Analytics cookies accepted');
    }
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-[100] p-4"
      >
        <div className="max-w-lg mx-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                <Cookie className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">Nous utilisons des cookies</h3>
                <p className="text-sm text-slate-400">Pour améliorer votre expérience</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {!showDetails ? (
              // Vue simple
              <div className="space-y-4">
                <p className="text-sm text-slate-300">
                  Ce site utilise des cookies pour améliorer votre expérience, 
                  analyser le trafic et personnaliser le contenu.{' '}
                  <Link href="/politique-cookies" className="text-amber-400 underline">
                    En savoir plus
                  </Link>
                </p>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={acceptAll}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium py-2.5 px-4 rounded-lg transition-colors"
                  >
                    Tout accepter
                  </button>
                  <button
                    onClick={rejectAll}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
                  >
                    Refuser
                  </button>
                </div>

                <button
                  onClick={() => setShowDetails(true)}
                  className="w-full flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white transition-colors py-2"
                >
                  <Settings className="w-4 h-4" />
                  Personnaliser mes choix
                </button>
              </div>
            ) : (
              // Vue détaillée
              <div className="space-y-4">
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-sm text-slate-400 hover:text-white flex items-center gap-1"
                >
                  ← Retour
                </button>

                {/* Cookie Categories */}
                <div className="space-y-3">
                  {/* Essentiels */}
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white text-sm">Essentiels</p>
                        <p className="text-xs text-slate-400">Nécessaires au fonctionnement</p>
                      </div>
                      <div className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">
                        Toujours actif
                      </div>
                    </div>
                  </div>

                  {/* Analytiques */}
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white text-sm">Analytiques</p>
                        <p className="text-xs text-slate-400">Améliorer nos services</p>
                      </div>
                      <button
                        onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          preferences.analytics ? 'bg-amber-500' : 'bg-slate-600'
                        }`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                            preferences.analytics ? 'left-7' : 'left-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Fonctionnels */}
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white text-sm">Fonctionnels</p>
                        <p className="text-xs text-slate-400">Personnalisation</p>
                      </div>
                      <button
                        onClick={() => setPreferences(p => ({ ...p, functional: !p.functional }))}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          preferences.functional ? 'bg-amber-500' : 'bg-slate-600'
                        }`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                            preferences.functional ? 'left-7' : 'left-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={saveCustom}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Sauvegarder mes préférences
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Hook pour vérifier les préférences cookies
export function useCookiePreferences(): CookiePreferences {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    functional: false,
  });

  useEffect(() => {
    const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (savedPrefs) {
      setPreferences(JSON.parse(savedPrefs));
    }
  }, []);

  return preferences;
}
