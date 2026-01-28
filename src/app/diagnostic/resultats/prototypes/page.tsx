'use client';

// ============================================
// KORELAB - Prototype Selector
// Compare 5 result page concepts
// ============================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic imports for prototypes
const Option1 = dynamic(() => import('./option-1-product-first'), { ssr: false });
const Option2 = dynamic(() => import('./option-2-education-first'), { ssr: false });
const Option3 = dynamic(() => import('./option-3-recipe-first'), { ssr: false });
const Option4 = dynamic(() => import('./option-4-journey-story'), { ssr: false });
const Option5 = dynamic(() => import('./option-5-tabs-complete'), { ssr: false });

type OptionId = 1 | 2 | 3 | 4 | 5;

interface OptionInfo {
  id: OptionId;
  name: string;
  focus: string;
  philosophy: string;
  pros: string[];
  cons: string[];
  bestFor: string;
}

const OPTIONS: OptionInfo[] = [
  {
    id: 1,
    name: 'Product-First',
    focus: 'E-commerce',
    philosophy: 'Les produits SONT la solution. Conversion directe.',
    pros: ['Conversion rapide', 'Parcours simple', 'Mobile-friendly'],
    cons: ['Peut sembler commercial', 'Moins éducatif'],
    bestFor: 'Utilisatrices pressées qui veulent acheter vite',
  },
  {
    id: 2,
    name: 'Education-First',
    focus: 'Expertise & Confiance',
    philosophy: 'Comprendre → Faire confiance → Acheter',
    pros: ['Crée de la confiance', 'Différenciant', 'Fidélisation'],
    cons: ['Plus long avant CTA', 'Peut perdre les pressées'],
    bestFor: 'Utilisatrices curieuses qui veulent comprendre',
  },
  {
    id: 3,
    name: 'Recipe-First',
    focus: 'DIY & Empowerment',
    philosophy: "Créer soi-même = plus de satisfaction & fidélité",
    pros: ['Unique sur le marché', 'Engagement fort', 'Panier moyen élevé'],
    cons: ['Peut sembler compliqué', 'Niche'],
    bestFor: 'Utilisatrices créatives qui aiment le DIY',
  },
  {
    id: 4,
    name: 'Journey/Story',
    focus: 'Émotion & Transformation',
    philosophy: 'Raconter une histoire de transformation',
    pros: ['Connexion émotionnelle', 'Motivant', 'Mémorable'],
    cons: ['Peut sembler trop beau', 'Moins factuel'],
    bestFor: 'Utilisatrices qui ont besoin de motivation',
  },
  {
    id: 5,
    name: 'Tabs Complete',
    focus: 'Organisation & Choix',
    philosophy: "L'utilisatrice contrôle son parcours",
    pros: ['Tout accessible', 'UX standard', 'Flexible'],
    cons: ['Moins guidé', 'Peut être overwhelming'],
    bestFor: 'Utilisatrices qui veulent explorer',
  },
];

export default function PrototypesPage() {
  const [selectedOption, setSelectedOption] = useState<OptionId | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const renderPrototype = () => {
    switch (selectedOption) {
      case 1: return <Option1 />;
      case 2: return <Option2 />;
      case 3: return <Option3 />;
      case 4: return <Option4 />;
      case 5: return <Option5 />;
      default: return null;
    }
  };

  if (showPreview && selectedOption) {
    return (
      <div className="min-h-screen">
        {/* Preview Header */}
        <div className="fixed top-0 left-0 right-0 bg-science-900 text-white px-4 py-2 z-50 flex items-center justify-between">
          <span className="font-mono text-sm">
            Option {selectedOption}: {OPTIONS.find(o => o.id === selectedOption)?.name}
          </span>
          <button
            onClick={() => setShowPreview(false)}
            className="px-3 py-1 bg-white text-science-900 rounded text-sm font-mono"
          >
            ← Retour
          </button>
        </div>
        
        {/* Prototype Content */}
        <div className="pt-12">
          {renderPrototype()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      {/* Header */}
      <header className="mb-6">
        <h1 className="font-mono text-xl font-bold uppercase text-science-900">
          Prototypes Page Résultats
        </h1>
        <p className="text-sm text-text-secondary mt-2">
          5 concepts différents. Clique sur une option pour voir le détail, puis "Prévisualiser" pour voir le prototype.
        </p>
      </header>

      {/* Options Grid */}
      <div className="space-y-4">
        {OPTIONS.map((option) => (
          <motion.div
            key={option.id}
            whileTap={{ scale: 0.98 }}
            className={`
              card p-4 cursor-pointer transition-all
              ${selectedOption === option.id ? 'ring-2 ring-accent-500 bg-accent-50' : ''}
            `}
            onClick={() => setSelectedOption(option.id)}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-science-900 text-white rounded-lg flex items-center justify-center font-mono font-bold">
                  {option.id}
                </div>
                <div>
                  <h2 className="font-mono font-bold text-sm uppercase">{option.name}</h2>
                  <p className="text-xs text-accent-600">{option.focus}</p>
                </div>
              </div>
              {selectedOption === option.id && (
                <span className="text-xs bg-accent-500 text-white px-2 py-1 rounded">
                  Sélectionné
                </span>
              )}
            </div>

            {/* Philosophy */}
            <p className="text-sm text-text-secondary italic mb-3">
              "{option.philosophy}"
            </p>

            {/* Expanded Content */}
            {selectedOption === option.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-3 border-t border-slate-200"
              >
                {/* Pros & Cons */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="font-mono text-xs text-green-600 uppercase mb-2">Avantages</p>
                    <ul className="space-y-1">
                      {option.pros.map((pro, i) => (
                        <li key={i} className="text-xs text-text-secondary flex items-start gap-1">
                          <span className="text-green-500">✓</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-red-600 uppercase mb-2">Inconvénients</p>
                    <ul className="space-y-1">
                      {option.cons.map((con, i) => (
                        <li key={i} className="text-xs text-text-secondary flex items-start gap-1">
                          <span className="text-red-500">✗</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Best For */}
                <div className="p-3 bg-slate-100 rounded-lg mb-4">
                  <p className="text-xs">
                    <strong>Idéal pour:</strong> {option.bestFor}
                  </p>
                </div>

                {/* Preview Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPreview(true);
                  }}
                  className="btn-primary w-full py-3"
                >
                  PRÉVISUALISER CE PROTOTYPE
                </button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 p-4 bg-white rounded-xl">
        <h3 className="font-mono font-bold text-sm uppercase text-science-900 mb-3">
          Ma Recommandation
        </h3>
        <p className="text-sm text-text-secondary">
          <strong>Option 2 (Education-First)</strong> ou <strong>Option 4 (Journey)</strong> créent 
          la meilleure connexion émotionnelle et confiance.
        </p>
        <p className="text-sm text-text-secondary mt-2">
          <strong>Option 3 (Recipe-First)</strong> est ton différenciateur unique - aucun concurrent ne fait ça !
        </p>
        <p className="text-sm text-text-secondary mt-2">
          💡 <strong>Hybride suggéré:</strong> Combiner Education (pour la confiance) + Recipe (pour la différenciation) 
          avec les produits intégrés dans les recettes.
        </p>
      </div>
    </div>
  );
}
