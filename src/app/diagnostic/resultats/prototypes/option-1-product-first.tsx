'use client';

// ============================================
// PROTOTYPE OPTION 1: "PRODUCT-FIRST"
// Focus: E-commerce - Pousser à l'achat immédiat
// ============================================
// 
// PHILOSOPHIE:
// - L'utilisatrice veut une SOLUTION rapide
// - Les produits sont LA solution
// - Routine = contexte pour justifier les produits
//
// STRUCTURE:
// 1. Score de compatibilité (validation)
// 2. "Ta routine personnalisée" avec produits intégrés
// 3. CTA fort: "Commander ma routine"
// 4. Recettes DIY en bonus (secondary)
//
// AVANTAGES:
// ✅ Conversion directe
// ✅ Parcours simple
// ✅ Mobile-friendly (scroll vertical)
//
// INCONVÉNIENTS:
// ❌ Peut sembler "pushy"/commercial
// ❌ Moins éducatif
// ============================================

import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  ShoppingBag, 
  Sun, 
  Moon, 
  Sparkles,
  ChevronRight,
  Star
} from 'lucide-react';

export default function PrototypeProductFirst() {
  return (
    <div className="min-h-screen bg-white">
      {/* ========== HEADER: Score + Validation ========== */}
      <header className="bg-gradient-to-b from-science-900 to-science-800 text-white px-4 pt-8 pb-12">
        {/* Match Score - Grand et central */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-white/10 border-4 border-accent-500 mb-4">
            <span className="font-mono text-4xl font-bold">87%</span>
          </div>
          <h1 className="font-mono text-lg uppercase tracking-wider">
            Compatibilité Trouvée
          </h1>
          <p className="font-sans text-sm text-slate-300 mt-2">
            Nous avons trouvé ta routine idéale
          </p>
        </motion.div>

        {/* Quick Profile Summary */}
        <div className="flex justify-center gap-4 text-xs">
          <span className="px-3 py-1 bg-white/10 rounded-full">Crépus 4C</span>
          <span className="px-3 py-1 bg-white/10 rounded-full">Porosité Forte</span>
          <span className="px-3 py-1 bg-white/10 rounded-full">Cuir Chevelu Sec</span>
        </div>
      </header>

      {/* ========== ROUTINE SECTION ========== */}
      <section className="px-4 -mt-6">
        {/* Card: Morning Routine */}
        <div className="card p-4 mb-4 border-l-4 border-amber-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <Sun className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="font-mono font-bold text-sm uppercase">Routine Matin</h2>
              <p className="text-xs text-text-muted">3 étapes • 5 min</p>
            </div>
          </div>

          {/* Products in routine */}
          <div className="space-y-3">
            <ProductInRoutine 
              step={1}
              name="Spray Hydratant Aloe"
              action="Vaporiser sur cheveux"
              price={89}
              tag="Hydratation"
            />
            <ProductInRoutine 
              step={2}
              name="Huile de Ricin"
              action="2-3 gouttes sur pointes"
              price={65}
              tag="Scellant"
            />
            <ProductInRoutine 
              step={3}
              name="Beurre de Karité"
              action="Sceller les longueurs"
              price={79}
              tag="Protection"
            />
          </div>
        </div>

        {/* Card: Evening Routine */}
        <div className="card p-4 mb-4 border-l-4 border-indigo-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <Moon className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="font-mono font-bold text-sm uppercase">Routine Soir</h2>
              <p className="text-xs text-text-muted">2 étapes • 3 min</p>
            </div>
          </div>

          <div className="space-y-3">
            <ProductInRoutine 
              step={1}
              name="Huile de Nigelle"
              action="Masser le cuir chevelu"
              price={75}
              tag="Stimulant"
            />
            <ProductInRoutine 
              step={2}
              name="Bonnet Satin"
              action="Protéger pour la nuit"
              price={35}
              tag="Protection"
            />
          </div>
        </div>
      </section>

      {/* ========== TOTAL + CTA ========== */}
      <section className="px-4 py-6 bg-slate-50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-text-muted">Ta routine complète</p>
            <p className="font-mono text-2xl font-bold text-science-900">343 DH</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-green-600 font-bold">Économie -15%</p>
            <p className="text-xs text-text-muted line-through">404 DH</p>
          </div>
        </div>

        <button className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          COMMANDER MA ROUTINE
        </button>
        
        <p className="text-center text-xs text-text-muted mt-3">
          Livraison gratuite • Paiement à la livraison
        </p>
      </section>

      {/* ========== BONUS: DIY Recipes (Secondary) ========== */}
      <section className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono font-bold text-sm uppercase text-science-900">
            Bonus: Recettes DIY
          </h2>
          <span className="badge badge-secondary">Gratuit</span>
        </div>

        <div className="card p-4 bg-accent-50 border-accent-200">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-accent-600 flex-shrink-0" />
            <div>
              <p className="font-mono text-sm font-bold text-accent-800">
                3 recettes pour ton profil
              </p>
              <p className="text-xs text-accent-600 mt-1">
                Crée tes propres soins avec les produits de ta routine
              </p>
              <button className="mt-3 text-accent-700 font-mono text-xs uppercase flex items-center gap-1">
                Voir les recettes <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Sub-component
function ProductInRoutine({ step, name, action, price, tag }: {
  step: number;
  name: string;
  action: string;
  price: number;
  tag: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
      <div className="w-8 h-8 bg-science-900 text-white rounded-full flex items-center justify-center font-mono text-sm font-bold">
        {step}
      </div>
      <div className="flex-1">
        <p className="font-mono text-sm font-bold text-science-900">{name}</p>
        <p className="text-xs text-text-muted">{action}</p>
      </div>
      <div className="text-right">
        <span className="text-[10px] px-2 py-0.5 bg-accent-100 text-accent-700 rounded">{tag}</span>
        <p className="font-mono text-sm font-bold mt-1">{price} DH</p>
      </div>
    </div>
  );
}
