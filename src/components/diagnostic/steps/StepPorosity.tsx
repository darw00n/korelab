'use client';

// ============================================
// KORELAB - Step Porosity (HAIR CARE)
// Test de porosité éducatif avec explication
// ============================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, Beaker, ArrowUp, Minus, ArrowDown } from 'lucide-react';
import { useDiagnosticStore } from '@/store/diagnosticStore';
import { useTranslation } from '@/lib/i18n/context';
import type { HairPorosity } from '@/types/database.types';

// ===================
// VISUELS POROSITÉ
// ===================

const POROSITY_VISUALS: Record<string, {
  icon: React.ReactNode;
  position: string;
  waterLevel: string;
  color: string;
  testResult: string;
}> = {
  'faible': {
    icon: <ArrowUp className="w-6 h-6" />,
    position: 'top-2',
    waterLevel: 'Flotte en surface',
    color: 'from-sky-400 to-blue-500',
    testResult: '🥛 Le cheveu flotte',
  },
  'moyenne': {
    icon: <Minus className="w-6 h-6" />,
    position: 'top-1/2 -translate-y-1/2',
    waterLevel: 'Flotte au milieu',
    color: 'from-emerald-400 to-green-500',
    testResult: '🥛 Le cheveu flotte au milieu',
  },
  'forte': {
    icon: <ArrowDown className="w-6 h-6" />,
    position: 'bottom-2',
    waterLevel: 'Coule au fond',
    color: 'from-amber-400 to-orange-500',
    testResult: '🥛 Le cheveu coule',
  },
};

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
      {/* Titre */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 text-center"
      >
        <h2 className="text-2xl font-bold text-secondary-900 mb-2 font-playfair">
          {t('diagnostic.porosity.title')}
        </h2>
        <p className="text-secondary-600">
          {t('diagnostic.porosity.subtitle')}
        </p>
      </motion.div>

      {/* Bouton d'aide */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        onClick={() => setShowHelp(true)}
        className="mb-6 mx-auto flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary rounded-full text-sm font-medium hover:bg-primary-100 transition-colors"
      >
        <HelpCircle className="w-4 h-4" />
        {t('diagnostic.porosity.helpButton')}
      </motion.button>

      {/* Options */}
      <div className="flex-1 space-y-3">
        {porosities.map((porosity, index) => {
          const visual = POROSITY_VISUALS[porosity.slug] || POROSITY_VISUALS['moyenne'];
          const isSelected = selectedId === porosity.id;
          
          return (
            <motion.button
              key={porosity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSelect(porosity.id)}
              className={`
                w-full p-4 rounded-xl border-2 transition-all duration-200
                flex items-center gap-4 text-left
                ${isSelected 
                  ? 'border-primary bg-primary-50 shadow-md' 
                  : 'border-secondary-200 bg-white hover:border-primary-300'
                }
              `}
              whileTap={{ scale: 0.98 }}
            >
              {/* Illustration verre d'eau */}
              <div className={`
                relative w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0
                bg-gradient-to-br ${visual.color} text-white overflow-hidden
              `}>
                {/* Verre stylisé */}
                <Beaker className="w-8 h-8" />
                {/* Position du cheveu */}
                <div className={`absolute ${visual.position} left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full`} />
              </div>

              {/* Texte */}
              <div className="flex-1 min-w-0">
                <p className={`
                  font-semibold mb-1
                  ${isSelected ? 'text-primary' : 'text-secondary-800'}
                `}>
                  {porosity.name}
                </p>
                <p className="text-sm text-secondary-500">
                  {visual.testResult}
                </p>
              </div>

              {/* Checkmark */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Info conseil */}
      {selectedId && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 p-3 bg-accent-50 border border-accent-200 rounded-xl"
        >
          <p className="text-sm text-accent-800">
            {porosities.find(p => p.id === selectedId)?.care_tip || 
              '💡 Conseil personnalisé selon ta porosité'}
          </p>
        </motion.div>
      )}

      {/* Bouton Continuer */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={handleContinue}
        disabled={!selectedId}
        className={`
          mt-4 w-full py-4 rounded-xl font-semibold text-white
          transition-all duration-200 flex items-center justify-center gap-2
          ${selectedId 
            ? 'bg-primary hover:bg-primary-600 shadow-lg shadow-primary/30' 
            : 'bg-secondary-300 cursor-not-allowed'
          }
        `}
      >
        {t('common.continue')}
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>

      {/* Modal d'aide */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white p-4 border-b flex items-center justify-between">
                <h3 className="text-lg font-bold text-secondary-900">
                  🧪 {t('diagnostic.porosity.test.title')}
                </h3>
                <button 
                  onClick={() => setShowHelp(false)}
                  className="p-2 hover:bg-secondary-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contenu */}
              <div className="p-4 space-y-4">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                    <span className="text-4xl">🥛</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <p className="text-secondary-700">{t('diagnostic.porosity.test.step1')}</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    <p className="text-secondary-700">{t('diagnostic.porosity.test.step2')}</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    <p className="text-secondary-700">{t('diagnostic.porosity.test.step3')}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-sky-50 rounded-lg">
                    <ArrowUp className="w-5 h-5 text-sky-600" />
                    <div>
                      <p className="font-semibold text-sky-800">{t('diagnostic.porosity.test.results.floats')}</p>
                      <p className="text-xs text-sky-600">{t('diagnostic.porosity.test.results.floatsDescription')}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                    <Minus className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-emerald-800">{t('diagnostic.porosity.test.results.middle')}</p>
                      <p className="text-xs text-emerald-600">{t('diagnostic.porosity.test.results.middleDescription')}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                    <ArrowDown className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="font-semibold text-amber-800">{t('diagnostic.porosity.test.results.sinks')}</p>
                      <p className="text-xs text-amber-600">{t('diagnostic.porosity.test.results.sinksDescription')}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowHelp(false)}
                  className="w-full mt-4 py-3 bg-primary text-white rounded-xl font-semibold"
                >
                  {t('diagnostic.porosity.test.understood')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default StepPorosity;

