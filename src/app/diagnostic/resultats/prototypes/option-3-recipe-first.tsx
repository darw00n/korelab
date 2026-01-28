'use client';

// ============================================
// PROTOTYPE OPTION 3: "RECIPE-FIRST"
// Focus: Empowerment DIY - "Crée toi-même"
// ============================================
// 
// PHILOSOPHIE:
// - L'utilisatrice veut être AUTONOME
// - Elle préfère créer que consommer
// - Les produits = ingrédients de ses recettes
//
// STRUCTURE:
// 1. "Tes recettes personnalisées" (hero)
// 2. Recettes avec ingrédients à acheter
// 3. Kit DIY recommandé
// 4. Option "Routine prête à l'emploi" (secondary)
//
// AVANTAGES:
// ✅ Différenciant (unique sur le marché)
// ✅ Engagement fort (créativité)
// ✅ Panier moyen potentiellement plus élevé
//
// INCONVÉNIENTS:
// ❌ Peut sembler "compliqué"
// ❌ Certaines préfèrent du prêt-à-l'emploi
// ============================================

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Beaker, 
  Sparkles, 
  Clock, 
  Star,
  ShoppingCart,
  ChevronRight,
  Package,
  Zap
} from 'lucide-react';

export default function PrototypeRecipeFirst() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ========== HEADER: Empowering Message ========== */}
      <header className="bg-gradient-to-br from-accent-500 to-accent-600 text-white px-4 pt-8 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Beaker className="w-5 h-5" />
            <span className="font-mono text-xs uppercase tracking-wider opacity-80">
              Tes Créations Personnalisées
            </span>
          </div>
          
          <h1 className="font-mono text-2xl font-bold uppercase tracking-wider mb-2">
            3 Recettes Rien Que Pour Toi
          </h1>
          
          <p className="font-sans text-sm opacity-90">
            Basées sur ton profil <strong>4C • Porosité Forte • Cuir Sec</strong>, 
            voici les recettes qui vont transformer tes cheveux.
          </p>
        </motion.div>
      </header>

      {/* ========== RECIPE CARDS ========== */}
      <section className="px-4 -mt-6">
        {/* Recipe 1 - Featured */}
        <RecipeCardHero
          rank={1}
          name="Masque Nutrition Intense"
          description="Répare et nourrit les cheveux très secs en profondeur"
          matchScore={95}
          time={30}
          difficulty={2}
          ingredients={['Beurre Karité', 'Huile Avocat', 'Huile Ricin']}
          totalPrice={145}
          benefits={['Réduit la casse', 'Brillance intense', 'Souplesse']}
        />

        {/* Recipe 2 */}
        <RecipeCardMini
          rank={2}
          name="Spray Hydratant Quotidien"
          matchScore={88}
          time={5}
          ingredients={3}
          totalPrice={89}
        />

        {/* Recipe 3 */}
        <RecipeCardMini
          rank={3}
          name="Beurre Scellant Karité"
          matchScore={85}
          time={15}
          ingredients={3}
          totalPrice={110}
        />
      </section>

      {/* ========== KIT STARTER CTA ========== */}
      <section className="px-4 py-6">
        <div className="card p-4 bg-science-900 text-white">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Package className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="font-mono font-bold text-sm uppercase">
                Kit Starter DIY
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Tous les outils pour créer tes recettes: flacons, pipettes, fouet, bol...
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="font-mono text-lg font-bold">119 DH</span>
                <span className="text-xs line-through text-slate-400">169 DH</span>
                <span className="text-xs bg-accent-500 px-2 py-0.5 rounded">-30%</span>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 py-3 bg-white text-science-900 font-mono font-bold text-sm uppercase rounded-lg">
            Ajouter le Kit
          </button>
        </div>
      </section>

      {/* ========== SMART BUNDLE ========== */}
      <section className="px-4 pb-6">
        <div className="card p-4 border-2 border-accent-500">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-accent-500" />
            <h3 className="font-mono font-bold text-sm uppercase text-science-900">
              Pack Complet Recommandé
            </h3>
          </div>
          
          <p className="text-sm text-text-secondary mb-4">
            Tous les ingrédients pour réaliser tes 3 recettes + le Kit Starter
          </p>

          <div className="space-y-2 mb-4">
            <BundleItem name="Beurre de Karité" />
            <BundleItem name="Huile d'Avocat" />
            <BundleItem name="Huile de Ricin" />
            <BundleItem name="Gel Aloe Vera" />
            <BundleItem name="Hydrolat Rose" />
            <BundleItem name="+ Kit Starter DIY" highlight />
          </div>

          <div className="flex items-center justify-between p-3 bg-accent-50 rounded-lg">
            <div>
              <p className="text-xs text-text-muted">Total Pack</p>
              <p className="font-mono text-xl font-bold text-science-900">389 DH</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-green-600 font-bold">Économie 25%</p>
              <p className="text-xs text-text-muted line-through">520 DH</p>
            </div>
          </div>

          <button className="btn-primary w-full py-4 mt-4 flex items-center justify-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            COMMANDER LE PACK COMPLET
          </button>
        </div>
      </section>

      {/* ========== ALTERNATIVE: Ready-made Routine ========== */}
      <section className="px-4 pb-8">
        <div className="text-center py-6 border-t border-slate-200">
          <p className="text-sm text-text-muted mb-3">
            Tu préfères une routine prête à l'emploi ?
          </p>
          <button className="text-accent-600 font-mono text-sm uppercase flex items-center gap-1 mx-auto">
            Voir la routine sans DIY <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}

// Sub-components
function RecipeCardHero({ rank, name, description, matchScore, time, difficulty, ingredients, totalPrice, benefits }: {
  rank: number;
  name: string;
  description: string;
  matchScore: number;
  time: number;
  difficulty: number;
  ingredients: string[];
  totalPrice: number;
  benefits: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card overflow-hidden mb-4"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-science-900 to-science-800 text-white p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded">
            #{rank} Recommandée
          </span>
          <span className="font-mono font-bold">{matchScore}% match</span>
        </div>
        <h3 className="font-mono font-bold text-lg uppercase">{name}</h3>
        <p className="text-sm opacity-80 mt-1">{description}</p>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Stats */}
        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-1 text-text-muted">
            <Clock className="w-4 h-4" />
            <span className="text-xs">{time} min</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${i < difficulty ? 'text-amber-500 fill-amber-500' : 'text-slate-200'}`}
              />
            ))}
            <span className="text-xs text-text-muted ml-1">Difficulté</span>
          </div>
        </div>

        {/* Ingredients preview */}
        <div className="mb-4">
          <p className="font-mono text-xs text-text-muted uppercase mb-2">Ingrédients</p>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ing, i) => (
              <span key={i} className="text-xs px-2 py-1 bg-slate-100 rounded">
                {ing}
              </span>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-4">
          <p className="font-mono text-xs text-text-muted uppercase mb-2">Bénéfices</p>
          <div className="flex flex-wrap gap-2">
            {benefits.map((b, i) => (
              <span key={i} className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <p className="text-xs text-text-muted">Ingrédients à partir de</p>
            <p className="font-mono font-bold text-lg">{totalPrice} DH</p>
          </div>
          <button className="btn-secondary flex items-center gap-2">
            Voir la recette <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function RecipeCardMini({ rank, name, matchScore, time, ingredients, totalPrice }: {
  rank: number;
  name: string;
  matchScore: number;
  time: number;
  ingredients: number;
  totalPrice: number;
}) {
  return (
    <div className="card p-4 mb-3 flex items-center gap-4">
      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
        <span className="font-mono font-bold text-lg text-text-muted">#{rank}</span>
      </div>
      <div className="flex-1">
        <h4 className="font-mono font-bold text-sm">{name}</h4>
        <div className="flex gap-3 text-xs text-text-muted mt-1">
          <span>{matchScore}% match</span>
          <span>{time} min</span>
          <span>{ingredients} ingrédients</span>
        </div>
      </div>
      <div className="text-right">
        <p className="font-mono font-bold">{totalPrice} DH</p>
        <ChevronRight className="w-4 h-4 text-text-muted ml-auto" />
      </div>
    </div>
  );
}

function BundleItem({ name, highlight = false }: { name: string; highlight?: boolean }) {
  return (
    <div className={`flex items-center gap-2 text-sm ${highlight ? 'text-accent-600 font-bold' : 'text-text-secondary'}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {name}
    </div>
  );
}
