'use client';

// ============================================
// KORELAB - Step Porosity (Science Snap)
// Test de porosité avec style clinique
// ============================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { useDiagnosticStore } from '@/store/diagnosticStore';
import { useTranslation } from '@/lib/i18n/context';
import { PorosityHelp } from '../PorosityHelp';
import type { HairPorosity } from '@/types/database.types';

interface StepPorosityProps {
  onNext: () => void;
  porosities: HairPorosity[];
}

export function StepPorosity({ onNext, porosities }: StepPorosityProps) {
  const { answers, setPorosity } = useDiagnosticStore();
  const { t } = useTranslation();
  const selectedId = answers.porosityId;
  const [showHelp, setShowHelp] = useState(false);

  const handleSelect = (id: string) => {
    setPorosity(id);
  };

  const handleContinue = () => {
    if (selectedId) {
      onNext();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Question - Gros titre en Space Mono */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="font-mono text-2xl font-bold uppercase tracking-wider text-science-900 mb-2">
          Ta capacité à absorber l'eau
        </h2>
        <p className="font-sans text-sm text-text-secondary mb-3">
          {t('diagnostic.porosity.subtitle')}
        </p>
        
        {/* Help button */}
        <button
          onClick={() => setShowHelp(true)}
          className="flex items-center gap-2 text-accent-600 hover:text-accent-700 transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          <span className="font-mono text-xs uppercase tracking-wider font-bold">
            Comment savoir ?
          </span>
        </button>
      </motion.div>

      {/* Porosity Help Modal */}
      <PorosityHelp isOpen={showHelp} onClose={() => setShowHelp(false)} />

      {/* Liste verticale des réponses */}
      <div className="flex-1 space-y-3">
        {porosities.map((porosity, index) => {
          const isSelected = selectedId === porosity.id;
          
          return (
            <motion.button
              key={porosity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSelect(porosity.id)}
              className={`
                selectable-card w-full text-left p-4
                ${isSelected ? 'selected' : ''}
              `}
            >
              <div className="flex items-center gap-3">
                {/* Puce carrée */}
                <div className={`
                  w-5 h-5 rounded-sm border-2 flex items-center justify-center flex-shrink-0
                  ${isSelected 
                    ? 'bg-science-900 border-science-900' 
                    : 'bg-white border-slate-300'
                  }
                `}>
                  {isSelected && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </div>

                {/* Texte */}
                <div className="flex-1">
                  <p className="font-mono font-bold text-sm text-science-900 mb-1">
                    {porosity.name}
                  </p>
                  {porosity.description && (
                    <p className="font-sans text-xs text-text-secondary line-clamp-2">
                      {porosity.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bouton Continuer */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={handleContinue}
        disabled={!selectedId}
        className={`
          mt-6 w-full py-4 rounded-md font-mono font-bold uppercase tracking-wider
          transition-all duration-200
          ${selectedId 
            ? 'btn-primary' 
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }
        `}
      >
        CONTINUER
      </motion.button>
    </div>
  );
}

export default StepPorosity;
