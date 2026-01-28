'use client';

import { MobileShell } from '@/components/layout/MobileShell';
import { ArrowLeft, Cookie, BarChart3, Settings, Shield } from 'lucide-react';
import Link from 'next/link';

export default function PolitiqueCookiesPage() {
  return (
    <MobileShell>
      <div className="min-h-screen bg-slate-950 text-white">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3">
            <Link href="/" className="p-2 -ml-2 hover:bg-slate-800 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-semibold">Politique de Cookies</h1>
          </div>
        </header>

        {/* Content */}
        <main className="px-4 py-6 space-y-8">
          {/* Introduction */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4">
            <div className="flex gap-3">
              <Cookie className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-300">
                Cette politique explique ce que sont les cookies, comment nous les utilisons 
                sur korelab.ma et comment vous pouvez les contrôler.
              </p>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">1. Qu'est-ce qu'un Cookie ?</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300">
              <p>
                Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, 
                tablette, smartphone) lorsque vous visitez un site web. Il permet au site de 
                mémoriser vos actions et préférences (langue, panier, connexion) pendant une 
                durée déterminée.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">2. Types de Cookies Utilisés</h2>
            
            <div className="space-y-4">
              {/* Cookies essentiels */}
              <div className="bg-slate-900 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Cookies Essentiels</h3>
                    <span className="text-xs text-green-400">Toujours actifs</span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm mb-3">
                  Indispensables au fonctionnement du site. Sans eux, vous ne pourriez pas 
                  naviguer, utiliser le panier ou vous connecter.
                </p>
                <div className="bg-slate-800 rounded-lg p-3 text-xs text-slate-400">
                  <p><strong className="text-slate-300">Exemples :</strong></p>
                  <ul className="mt-1 space-y-1">
                    <li>• Session utilisateur (authentification)</li>
                    <li>• Panier d'achat</li>
                    <li>• Préférences de langue</li>
                    <li>• Consentement cookies</li>
                  </ul>
                  <p className="mt-2"><strong className="text-slate-300">Durée :</strong> Session ou 1 an max</p>
                </div>
              </div>

              {/* Cookies analytiques */}
              <div className="bg-slate-900 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Cookies Analytiques</h3>
                    <span className="text-xs text-slate-400">Avec votre consentement</span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm mb-3">
                  Nous aident à comprendre comment vous utilisez le site pour l'améliorer 
                  (pages visitées, temps passé, erreurs rencontrées).
                </p>
                <div className="bg-slate-800 rounded-lg p-3 text-xs text-slate-400">
                  <p><strong className="text-slate-300">Outils utilisés :</strong></p>
                  <ul className="mt-1 space-y-1">
                    <li>• Google Analytics (anonymisé)</li>
                    <li>• Sentry (erreurs techniques)</li>
                  </ul>
                  <p className="mt-2"><strong className="text-slate-300">Durée :</strong> 13 mois max</p>
                </div>
              </div>

              {/* Cookies fonctionnels */}
              <div className="bg-slate-900 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Cookies Fonctionnels</h3>
                    <span className="text-xs text-slate-400">Avec votre consentement</span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm mb-3">
                  Permettent des fonctionnalités améliorées et une personnalisation.
                </p>
                <div className="bg-slate-800 rounded-lg p-3 text-xs text-slate-400">
                  <p><strong className="text-slate-300">Exemples :</strong></p>
                  <ul className="mt-1 space-y-1">
                    <li>• Sauvegarde de votre diagnostic</li>
                    <li>• Historique des routines consultées</li>
                    <li>• Produits récemment vus</li>
                  </ul>
                  <p className="mt-2"><strong className="text-slate-300">Durée :</strong> 1 an max</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">3. Cookies Tiers</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300">
              <p className="mb-3">Certains services tiers peuvent déposer des cookies :</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong className="text-white">Stripe</strong> - Paiement sécurisé
                </li>
                <li>
                  <strong className="text-white">Supabase</strong> - Authentification
                </li>
                <li>
                  <strong className="text-white">Vercel</strong> - Performance et analytics
                </li>
              </ul>
              <p className="text-sm text-slate-400 mt-3">
                Ces services ont leur propre politique de cookies.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">4. Gérer vos Cookies</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300 space-y-4">
              <p>
                <strong className="text-white">Via notre banner :</strong><br />
                Lors de votre première visite, une bannière vous permet d'accepter ou 
                refuser les cookies non-essentiels.
              </p>
              <p>
                <strong className="text-white">Via votre navigateur :</strong><br />
                Vous pouvez configurer votre navigateur pour bloquer ou supprimer les cookies.
              </p>
              <div className="bg-slate-800 rounded-lg p-3 text-xs">
                <p className="text-slate-300 mb-2">Liens vers les paramètres :</p>
                <ul className="space-y-1 text-slate-400">
                  <li>• <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener" className="text-amber-400 underline">Chrome</a></li>
                  <li>• <a href="https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent" target="_blank" rel="noopener" className="text-amber-400 underline">Firefox</a></li>
                  <li>• <a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener" className="text-amber-400 underline">Safari</a></li>
                  <li>• <a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener" className="text-amber-400 underline">Edge</a></li>
                </ul>
              </div>
              <p className="text-sm text-amber-400/80">
                ⚠️ La désactivation de certains cookies peut affecter votre expérience sur le site.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">5. Mise à Jour</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300">
              <p>
                Cette politique peut être mise à jour. La date de dernière modification 
                est indiquée ci-dessous. Nous vous recommandons de la consulter régulièrement.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">6. Contact</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300">
              <p>Pour toute question sur les cookies :</p>
              <p className="mt-2">
                <strong className="text-white">Email :</strong> privacy@korelab.ma
              </p>
            </div>
          </section>

          <p className="text-sm text-slate-500 text-center pt-4">
            Dernière mise à jour : Janvier 2026
          </p>
        </main>
      </div>
    </MobileShell>
  );
}
