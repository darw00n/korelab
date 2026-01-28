'use client';

import { MobileShell } from '@/components/layout/MobileShell';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CGVPage() {
  return (
    <MobileShell>
      <div className="min-h-screen bg-slate-950 text-white">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3">
            <Link href="/" className="p-2 -ml-2 hover:bg-slate-800 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-semibold">Conditions Générales de Vente</h1>
          </div>
        </header>

        {/* Content */}
        <main className="px-4 py-6 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">Article 1 - Objet</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300">
              <p>
                Les présentes Conditions Générales de Vente (CGV) régissent les ventes de produits 
                cosmétiques naturels effectuées par KORELAB SARL via le site korelab.ma.
              </p>
              <p className="mt-2">
                Toute commande implique l'acceptation sans réserve des présentes CGV.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">Article 2 - Produits</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300 space-y-3">
              <p>
                Les produits proposés à la vente sont des cosmétiques naturels destinés au soin 
                des cheveux. Chaque produit fait l'objet d'une fiche descriptive détaillant ses 
                caractéristiques essentielles.
              </p>
              <p>
                Les photographies des produits sont les plus fidèles possibles mais ne peuvent 
                assurer une similitude parfaite avec le produit.
              </p>
              <p>
                KORELAB se réserve le droit de modifier son offre de produits à tout moment.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">Article 3 - Prix</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300 space-y-3">
              <p>
                Les prix sont indiqués en Dirhams marocains (MAD), toutes taxes comprises.
              </p>
              <p>
                Les frais de livraison ne sont pas inclus et sont calculés lors de la validation 
                du panier en fonction du lieu de livraison.
              </p>
              <p>
                KORELAB se réserve le droit de modifier ses prix à tout moment, étant entendu 
                que les produits seront facturés au prix en vigueur lors de la validation de la commande.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">Article 4 - Commande</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300 space-y-3">
              <p><strong className="text-white">4.1</strong> Le processus de commande comprend :</p>
              <ul className="list-disc list-inside text-sm ml-4 space-y-1">
                <li>Sélection des produits et ajout au panier</li>
                <li>Validation du panier</li>
                <li>Identification ou création de compte</li>
                <li>Choix du mode de livraison</li>
                <li>Choix du mode de paiement</li>
                <li>Validation finale de la commande</li>
              </ul>
              <p className="mt-3">
                <strong className="text-white">4.2</strong> La commande n'est définitive qu'après 
                confirmation du paiement ou validation du paiement à la livraison.
              </p>
              <p>
                <strong className="text-white">4.3</strong> Un email de confirmation sera envoyé 
                à l'adresse indiquée lors de la commande.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">Article 5 - Paiement</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300 space-y-3">
              <p>Les modes de paiement acceptés sont :</p>
              <ul className="list-disc list-inside text-sm ml-4 space-y-1">
                <li><strong className="text-white">Carte bancaire</strong> (Visa, Mastercard) via Stripe</li>
                <li><strong className="text-white">Paiement à la livraison</strong> (espèces uniquement)</li>
              </ul>
              <p className="mt-3">
                Les paiements par carte sont sécurisés par Stripe, certifié PCI-DSS.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">Article 6 - Livraison</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300 space-y-3">
              <p><strong className="text-white">6.1 Zones de livraison :</strong></p>
              <p className="text-sm">Livraison sur tout le territoire marocain.</p>
              
              <p className="mt-3"><strong className="text-white">6.2 Délais indicatifs :</strong></p>
              <ul className="list-disc list-inside text-sm ml-4 space-y-1">
                <li>Casablanca : 24-48h</li>
                <li>Grandes villes : 2-3 jours</li>
                <li>Autres régions : 3-5 jours</li>
              </ul>
              
              <p className="mt-3"><strong className="text-white">6.3 Frais de livraison :</strong></p>
              <ul className="list-disc list-inside text-sm ml-4 space-y-1">
                <li>Gratuit à partir de 300 MAD d'achat</li>
                <li>Forfait selon zone (voir panier)</li>
              </ul>
              
              <p className="mt-3 text-sm text-slate-400">
                À réception, vérifiez l'état du colis. En cas de dommage, 
                émettez des réserves auprès du livreur.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">Article 7 - Droit de Rétractation</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300 space-y-3">
              <p>
                <strong className="text-white">7.1</strong> Conformément à la réglementation, 
                vous disposez d'un délai de <strong className="text-white">7 jours</strong> à 
                compter de la réception pour exercer votre droit de rétractation, sans avoir 
                à justifier de motifs.
              </p>
              <p>
                <strong className="text-white">7.2 Conditions :</strong>
              </p>
              <ul className="list-disc list-inside text-sm ml-4 space-y-1">
                <li>Produits non ouverts et dans leur emballage d'origine</li>
                <li>Produits en parfait état de revente</li>
                <li>Retour à la charge du client</li>
              </ul>
              <p className="mt-3">
                <strong className="text-white">7.3 Exclusions :</strong> Les produits descellés 
                ou utilisés ne peuvent être retournés pour des raisons d'hygiène.
              </p>
              <p>
                <strong className="text-white">7.4</strong> Pour exercer ce droit, contactez-nous 
                à : <strong className="text-white">retours@korelab.ma</strong>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">Article 8 - Garanties</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300 space-y-3">
              <p>
                Tous nos produits bénéficient de la garantie légale de conformité et de la 
                garantie des vices cachés.
              </p>
              <p>
                En cas de produit non conforme à la commande ou présentant un défaut, 
                contactez-nous dans les 48h suivant la réception.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">Article 9 - Responsabilité</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300 space-y-3">
              <p>
                <strong className="text-white">9.1</strong> KORELAB ne saurait être tenu responsable 
                de l'inexécution du contrat en cas de force majeure, rupture de stock, ou fait 
                du transporteur.
              </p>
              <p>
                <strong className="text-white">9.2</strong> Les conseils et recommandations fournis 
                (diagnostic, routines) sont à titre indicatif. En cas de réaction allergique, 
                cessez l'utilisation et consultez un professionnel de santé.
              </p>
              <p>
                <strong className="text-white">9.3</strong> Il est recommandé d'effectuer un test 
                cutané avant première utilisation.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">Article 10 - Propriété Intellectuelle</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300">
              <p>
                Tous les éléments du site (textes, images, logos, recettes DIY) sont protégés 
                par le droit de la propriété intellectuelle. Toute reproduction est interdite 
                sans autorisation.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">Article 11 - Données Personnelles</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300">
              <p>
                Le traitement de vos données personnelles est détaillé dans notre{' '}
                <Link href="/politique-confidentialite" className="text-amber-400 underline">
                  Politique de Confidentialité
                </Link>.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">Article 12 - Litiges</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300 space-y-3">
              <p>
                Les présentes CGV sont soumises au droit marocain.
              </p>
              <p>
                En cas de litige, une solution amiable sera recherchée. À défaut, les tribunaux 
                de Casablanca seront compétents.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-400 mb-4">Article 13 - Service Client</h2>
            <div className="bg-slate-900 rounded-xl p-4 text-slate-300">
              <p>Pour toute question :</p>
              <p className="mt-2"><strong className="text-white">Email :</strong> contact@korelab.ma</p>
              <p><strong className="text-white">WhatsApp :</strong> +212 [À COMPLÉTER]</p>
              <p className="text-sm text-slate-400 mt-2">
                Réponse sous 24-48h ouvrées.
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
