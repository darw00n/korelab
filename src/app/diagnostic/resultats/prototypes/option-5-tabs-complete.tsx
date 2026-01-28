'use client';

// ============================================
// PROTOTYPE OPTION 5: "TABS COMPLETE"
// Focus: Organisation claire - Tout accessible
// ============================================
// 
// PHILOSOPHIE:
// - L'utilisatrice veut TOUT voir et choisir
// - Organisation par onglets = clarté
// - Elle décide ce qui l'intéresse
//
// STRUCTURE:
// 1. Header avec profil
// 2. Tabs: Analyse | Routine | Recettes | Shop
// 3. Contenu selon l'onglet actif
// 4. CTA flottant adaptatif
//
// AVANTAGES:
// ✅ Tout est accessible
// ✅ UX claire et standard
// ✅ L'utilisatrice contrôle son parcours
//
// INCONVÉNIENTS:
// ❌ Moins "guidé"
// ❌ Peut être overwhelming
// ============================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Calendar, 
  Beaker, 
  ShoppingBag,
  ChevronRight,
  Star,
  Clock,
  Sparkles,
  Sun,
  Moon,
  Plus,
  Check
} from 'lucide-react';

type TabId = 'analyse' | 'routine' | 'recettes' | 'shop';

export default function PrototypeTabsComplete() {
  const [activeTab, setActiveTab] = useState<TabId>('analyse');
  const [cartCount, setCartCount] = useState(0);

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'analyse', label: 'Analyse', icon: <Brain className="w-4 h-4" /> },
    { id: 'routine', label: 'Routine', icon: <Calendar className="w-4 h-4" /> },
    { id: 'recettes', label: 'Recettes', icon: <Beaker className="w-4 h-4" /> },
    { id: 'shop', label: 'Shop', icon: <ShoppingBag className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* ========== HEADER: Profile Summary ========== */}
      <header className="bg-science-900 text-white px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-mono text-xs text-accent-400 uppercase">Ton Profil</p>
            <h1 className="font-mono text-lg font-bold uppercase">Cheveux Poreux 4C</h1>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-accent-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-mono font-bold">87%</span>
            </div>
            <p className="text-[10px] text-slate-400">Match Score</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-white/10 rounded text-[10px]">Porosité Forte</span>
          <span className="px-2 py-1 bg-white/10 rounded text-[10px]">Cuir Sec</span>
          <span className="px-2 py-1 bg-white/10 rounded text-[10px]">Sécheresse</span>
        </div>
      </header>

      {/* ========== TABS ========== */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-mono uppercase transition-colors
                ${activeTab === tab.id 
                  ? 'text-accent-600 border-b-2 border-accent-500 bg-accent-50/50' 
                  : 'text-text-muted'}
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========== TAB CONTENT ========== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'analyse' && <TabAnalyse />}
          {activeTab === 'routine' && <TabRoutine />}
          {activeTab === 'recettes' && <TabRecettes />}
          {activeTab === 'shop' && <TabShop onAddToCart={() => setCartCount(c => c + 1)} />}
        </motion.div>
      </AnimatePresence>

      {/* ========== FLOATING CTA ========== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 safe-area-inset-bottom">
        <div className="flex items-center gap-3">
          {cartCount > 0 && (
            <div className="flex-shrink-0 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center relative">
              <ShoppingBag className="w-5 h-5 text-science-900" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white text-[10px] rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </div>
          )}
          <button className="btn-primary flex-1 py-3">
            {cartCount > 0 ? `VOIR MON PANIER (${cartCount})` : 'COMMANDER MA ROUTINE'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ========== TAB CONTENTS ==========

function TabAnalyse() {
  return (
    <div className="px-4 py-6 space-y-4">
      <h2 className="font-mono font-bold text-sm uppercase text-science-900">
        Comprendre Tes Cheveux
      </h2>

      <div className="card p-4">
        <h3 className="font-mono text-xs uppercase text-accent-600 mb-2">Nature</h3>
        <p className="text-sm text-text-secondary">
          Tes cuticules sont <strong>naturellement ouvertes</strong> (porosité forte). 
          L'hydratation entre facilement mais ressort vite.
        </p>
      </div>

      <div className="card p-4">
        <h3 className="font-mono text-xs uppercase text-amber-600 mb-2">Problème</h3>
        <p className="text-sm text-text-secondary">
          La <strong>sécheresse</strong> et la <strong>casse</strong> sont liées à cette difficulté 
          à retenir l'hydratation.
        </p>
      </div>

      <div className="card p-4">
        <h3 className="font-mono text-xs uppercase text-green-600 mb-2">Solution</h3>
        <p className="text-sm text-text-secondary">
          Des <strong>protéines</strong> pour renforcer + des <strong>beurres</strong> pour sceller. 
          La méthode LOC sera ton alliée.
        </p>
      </div>

      <button className="w-full py-3 text-accent-600 font-mono text-sm flex items-center justify-center gap-2">
        Voir l'explication complète <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function TabRoutine() {
  return (
    <div className="px-4 py-6 space-y-6">
      {/* Morning */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sun className="w-5 h-5 text-amber-500" />
          <h2 className="font-mono font-bold text-sm uppercase text-science-900">
            Routine Matin
          </h2>
          <span className="text-xs text-text-muted">5 min</span>
        </div>

        <div className="space-y-2">
          <RoutineStep step={1} product="Spray Hydratant" action="Vaporiser" />
          <RoutineStep step={2} product="Huile Légère" action="2-3 gouttes" />
          <RoutineStep step={3} product="Crème Coiffante" action="Sceller" />
        </div>
      </div>

      {/* Evening */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Moon className="w-5 h-5 text-indigo-500" />
          <h2 className="font-mono font-bold text-sm uppercase text-science-900">
            Routine Soir
          </h2>
          <span className="text-xs text-text-muted">3 min</span>
        </div>

        <div className="space-y-2">
          <RoutineStep step={1} product="Huile Cuir Chevelu" action="Masser" />
          <RoutineStep step={2} product="Protection Nuit" action="Bonnet/Taie" />
        </div>
      </div>

      {/* Weekly */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-5 h-5 text-purple-500" />
          <h2 className="font-mono font-bold text-sm uppercase text-science-900">
            Hebdomadaire
          </h2>
        </div>

        <div className="card p-3">
          <p className="text-sm text-text-secondary">
            <strong>1x/semaine:</strong> Masque nutrition intense (30 min)
          </p>
        </div>
      </div>
    </div>
  );
}

function TabRecettes() {
  return (
    <div className="px-4 py-6 space-y-4">
      <h2 className="font-mono font-bold text-sm uppercase text-science-900 mb-4">
        Recettes Recommandées
      </h2>

      <RecipePreview
        name="Masque Nutrition Intense"
        match={95}
        time={30}
        difficulty={2}
      />
      <RecipePreview
        name="Spray Hydratant Quotidien"
        match={88}
        time={5}
        difficulty={1}
      />
      <RecipePreview
        name="Beurre Scellant Karité"
        match={85}
        time={15}
        difficulty={2}
      />

      <button className="w-full py-3 text-accent-600 font-mono text-sm flex items-center justify-center gap-2 mt-4">
        Voir toutes les recettes <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function TabShop({ onAddToCart }: { onAddToCart: () => void }) {
  const [addedProducts, setAddedProducts] = useState<Set<number>>(new Set());

  const handleAdd = (id: number) => {
    if (!addedProducts.has(id)) {
      setAddedProducts(prev => new Set([...Array.from(prev), id]));
      onAddToCart();
    }
  };

  return (
    <div className="px-4 py-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-mono font-bold text-sm uppercase text-science-900">
          Produits Recommandés
        </h2>
        <span className="text-xs text-text-muted">5 produits</span>
      </div>

      <ProductCard id={1} name="Beurre de Karité" price={79} tag="Scellant" isAdded={addedProducts.has(1)} onAdd={() => handleAdd(1)} />
      <ProductCard id={2} name="Huile de Ricin" price={65} tag="Fortifiant" isAdded={addedProducts.has(2)} onAdd={() => handleAdd(2)} />
      <ProductCard id={3} name="Gel Aloe Vera" price={55} tag="Hydratant" isAdded={addedProducts.has(3)} onAdd={() => handleAdd(3)} />
      <ProductCard id={4} name="Huile d'Argan" price={89} tag="Nutrition" isAdded={addedProducts.has(4)} onAdd={() => handleAdd(4)} />
      <ProductCard id={5} name="Protéines de Soie" price={75} tag="Réparateur" isAdded={addedProducts.has(5)} onAdd={() => handleAdd(5)} />

      <div className="pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-muted">Total routine</span>
          <span className="font-mono font-bold text-lg">363 DH</span>
        </div>
        <button className="w-full btn-secondary py-3" onClick={() => {
          [1,2,3,4,5].forEach(id => handleAdd(id));
        }}>
          Ajouter tous les produits
        </button>
      </div>
    </div>
  );
}

// Sub-components
function RoutineStep({ step, product, action }: { step: number; product: string; action: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
      <div className="w-8 h-8 bg-science-900 text-white rounded-full flex items-center justify-center font-mono text-sm font-bold">
        {step}
      </div>
      <div className="flex-1">
        <p className="font-mono text-sm font-bold">{product}</p>
        <p className="text-xs text-text-muted">{action}</p>
      </div>
    </div>
  );
}

function RecipePreview({ name, match, time, difficulty }: { 
  name: string; 
  match: number; 
  time: number; 
  difficulty: number;
}) {
  return (
    <div className="card p-4 flex items-center gap-4">
      <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
        <Beaker className="w-6 h-6 text-accent-600" />
      </div>
      <div className="flex-1">
        <p className="font-mono font-bold text-sm">{name}</p>
        <div className="flex gap-3 text-xs text-text-muted mt-1">
          <span className="text-accent-600 font-bold">{match}%</span>
          <span><Clock className="w-3 h-3 inline" /> {time} min</span>
          <span>
            {[...Array(3)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 inline ${i < difficulty ? 'text-amber-500' : 'text-slate-200'}`} fill={i < difficulty ? 'currentColor' : 'none'} />
            ))}
          </span>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-text-muted" />
    </div>
  );
}

function ProductCard({ id, name, price, tag, isAdded, onAdd }: { 
  id: number;
  name: string; 
  price: number; 
  tag: string;
  isAdded: boolean;
  onAdd: () => void;
}) {
  return (
    <div className="card p-4 flex items-center gap-4">
      <div className="w-12 h-12 bg-slate-100 rounded-lg" />
      <div className="flex-1">
        <p className="font-mono font-bold text-sm">{name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-mono text-sm">{price} DH</span>
          <span className="text-[10px] px-2 py-0.5 bg-accent-100 text-accent-700 rounded">{tag}</span>
        </div>
      </div>
      <button
        onClick={onAdd}
        disabled={isAdded}
        className={`
          w-10 h-10 rounded-full flex items-center justify-center transition-colors
          ${isAdded ? 'bg-green-100 text-green-600' : 'bg-accent-100 text-accent-600'}
        `}
      >
        {isAdded ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
      </button>
    </div>
  );
}
