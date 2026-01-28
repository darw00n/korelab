'use client';

import { MobileShell } from '@/components/layout/MobileShell';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function MentionsLegalesPage() {
  return (
    <MobileShell>
      <div className="min-h-screen bg-slate-950 text-white">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3">
            <Link href="/" className="p-2 -ml-2 hover:bg-slate-800 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-semibold">Mentions Légales</h1>
          </div>
        </header>

        {/* Content */}
        <main className="px-4 py-6 space-y-8">
          {/* À PERSONNALISER avec vos informations */}
          
          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">1. Éditeur du Site</h2>
            <div className="bg-slate-900 rounded-xl p-4 space-y-2 text-slate-300">
              <p><strong className="text-white">Raison sociale :</strong> KORELAB SARL</p>
              <p><strong className="text-white">Forme juridique :</strong> Société à Responsabilité Limitée</p>
              <p><strong className="text-white">Capital social :</strong> [À COMPLÉTER] MAD</p>
              <p><strong className="text-white">Siège social :</strong> [Adresse complète], Casablanca, Maroc</p>
              <p><strong className="text-white">RC :</strong> [Numéro Registre Commerce]</p>
              <p><strong className="text-white">ICE :</strong> [Identifiant Commun de l'Entreprise]</p>
              <p><strong className="text-white">Email :</strong> contact@korelab.ma</p>
              <p><strong className="text-white">Téléphone :</strong> +212 [À COMPLÉTER]</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">2. Directeur de Publication</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300">
              <p><strong className="text-white">Nom :</strong> [Nom du gérant]</p>
              <p><strong className="text-white">Qualité :</strong> Gérant</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">3. Hébergement</h2>
            <div className="bg-slate-900 rounded-xl p-4 space-y-2 text-slate-300">
              <p><strong className="text-white">Hébergeur :</strong> Vercel Inc.</p>
              <p><strong className="text-white">Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
              <p><strong className="text-white">Site web :</strong> vercel.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">4. Propriété Intellectuelle</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300 space-y-3">
              <p>
                L'ensemble du contenu de ce site (textes, images, logos, vidéos, éléments graphiques) 
                est la propriété exclusive de KORELAB ou de ses partenaires et est protégé par les 
                lois marocaines et internationales relatives à la propriété intellectuelle.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication ou adaptation de tout 
                ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est 
                interdite sans autorisation écrite préalable.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">5. Données Personnelles</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300 space-y-3">
              <p>
                Conformément à la loi marocaine n° 09-08 relative à la protection des personnes 
                physiques à l'égard du traitement des données à caractère personnel, vous disposez 
                d'un droit d'accès, de rectification et de suppression de vos données.
              </p>
              <p>
                Pour exercer ce droit, contactez-nous à : <strong className="text-white">privacy@korelab.ma</strong>
              </p>
              <p>
                <Link href="/politique-confidentialite" className="text-amber-400 underline">
                  Voir notre Politique de Confidentialité
                </Link>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">6. Cookies</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300">
              <p>
                Ce site utilise des cookies pour améliorer votre expérience. 
                Pour plus d'informations, consultez notre{' '}
                <Link href="/politique-cookies" className="text-amber-400 underline">
                  Politique de Cookies
                </Link>.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">7. Loi Applicable</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300">
              <p>
                Les présentes mentions légales sont régies par la loi marocaine. 
                En cas de litige, les tribunaux de Casablanca seront seuls compétents.
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
