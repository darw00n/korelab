'use client';

import { MobileShell } from '@/components/layout/MobileShell';
import { ArrowLeft, Shield, Eye, Trash2, Download, Mail } from 'lucide-react';
import Link from 'next/link';

export default function PolitiqueConfidentialitePage() {
  return (
    <MobileShell>
      <div className="min-h-screen bg-slate-950 text-white">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3">
            <Link href="/" className="p-2 -ml-2 hover:bg-slate-800 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-semibold">Politique de Confidentialité</h1>
          </div>
        </header>

        {/* Content */}
        <main className="px-4 py-6 space-y-8">
          {/* Introduction */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4">
            <div className="flex gap-3">
              <Shield className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-300">
                Chez KORELAB, la protection de vos données personnelles est une priorité. 
                Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
              </p>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">1. Responsable du Traitement</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300">
              <p><strong className="text-white">KORELAB SARL</strong></p>
              <p>[Adresse], Casablanca, Maroc</p>
              <p>Email : privacy@korelab.ma</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">2. Données Collectées</h2>
            <div className="bg-slate-900 rounded-xl p-4 space-y-4 text-slate-300">
              <div>
                <h3 className="text-white font-medium mb-2">Données d'identification :</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Nom et prénom</li>
                  <li>Adresse email</li>
                  <li>Numéro de téléphone</li>
                  <li>Adresse de livraison</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Données du diagnostic capillaire :</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Type de cheveux (texture, porosité)</li>
                  <li>État du cuir chevelu</li>
                  <li>Préoccupations capillaires</li>
                  <li>Historique de routines</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Données techniques :</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Adresse IP</li>
                  <li>Type de navigateur</li>
                  <li>Cookies (voir Politique Cookies)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">3. Finalités du Traitement</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300">
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-amber-400">•</span>
                  Gestion de votre compte et de vos commandes
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-400">•</span>
                  Personnalisation de vos recommandations produits
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-400">•</span>
                  Amélioration de nos services et algorithmes
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-400">•</span>
                  Communication marketing (avec votre consentement)
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-400">•</span>
                  Respect de nos obligations légales
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">4. Base Légale</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300 space-y-2">
              <p><strong className="text-white">Exécution du contrat :</strong> traitement des commandes</p>
              <p><strong className="text-white">Consentement :</strong> diagnostic, marketing</p>
              <p><strong className="text-white">Intérêt légitime :</strong> amélioration des services</p>
              <p><strong className="text-white">Obligation légale :</strong> facturation, fiscalité</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">5. Durée de Conservation</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300">
              <ul className="space-y-2 text-sm">
                <li><strong className="text-white">Compte client :</strong> durée de la relation + 3 ans</li>
                <li><strong className="text-white">Commandes :</strong> 10 ans (obligations comptables)</li>
                <li><strong className="text-white">Diagnostic capillaire :</strong> 3 ans après dernière activité</li>
                <li><strong className="text-white">Cookies :</strong> 13 mois maximum</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">6. Vos Droits</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900 rounded-xl p-4 text-center">
                <Eye className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <p className="text-sm font-medium">Accès</p>
                <p className="text-xs text-slate-400">Consulter vos données</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4 text-center">
                <Trash2 className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <p className="text-sm font-medium">Suppression</p>
                <p className="text-xs text-slate-400">Effacer vos données</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4 text-center">
                <Download className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <p className="text-sm font-medium">Portabilité</p>
                <p className="text-xs text-slate-400">Exporter vos données</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4 text-center">
                <Mail className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <p className="text-sm font-medium">Opposition</p>
                <p className="text-xs text-slate-400">Refuser le marketing</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 mt-4">
              Pour exercer vos droits : <strong className="text-white">privacy@korelab.ma</strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">7. Sécurité</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300 space-y-2">
              <p>Nous mettons en œuvre des mesures techniques et organisationnelles :</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Chiffrement SSL/TLS</li>
                <li>Authentification sécurisée</li>
                <li>Accès restreint aux données</li>
                <li>Hébergement sécurisé (Supabase, Vercel)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">8. Transferts de Données</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300">
              <p className="mb-2">Vos données peuvent être traitées par :</p>
              <ul className="text-sm space-y-1">
                <li><strong className="text-white">Supabase</strong> (base de données) - USA</li>
                <li><strong className="text-white">Stripe</strong> (paiements) - USA</li>
                <li><strong className="text-white">Vercel</strong> (hébergement) - USA</li>
                <li><strong className="text-white">Google</strong> (IA Gemini) - USA</li>
              </ul>
              <p className="text-sm mt-3 text-slate-400">
                Ces prestataires respectent des garanties de protection adéquates.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">9. Contact</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300">
              <p>Pour toute question relative à vos données :</p>
              <p className="mt-2">
                <strong className="text-white">Email :</strong> privacy@korelab.ma
              </p>
              <p className="text-sm text-slate-400 mt-3">
                Vous pouvez également adresser une réclamation à la CNDP 
                (Commission Nationale de contrôle de la protection des Données à caractère Personnel).
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
