'use client';

// ============================================
// KORELAB - Step Scalp (HAIR CARE)
// Évaluation du type de cuir chevelu
// ============================================

import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Sun, Heart, AlertTriangle } from 'lucide-react';
import { useDiagnosticStore } from '@/store/diagnosticStore';
import { useTranslation } from '@/lib/i18n/context';
import type { ScalpType } from '@/types/database.types';

// ===================
// ICÔNES ET VISUELS
// ===================

const SCALP_VISUALS: Record<string, {
  icon: React.ReactNode;
  emoji: string;
  color: string;
  answer: string;
}> = {
  'sec': {
    icon: <Droplets className="w-6 h-6" />,
    emoji: '🏜️',
    color: 'from-orange-400 to-red-500',
    answer: 'Sec, ça gratte parfois',
  },
  'gras': {
    icon: <Sun className="w-6 h-6" />,
    emoji: '💧',
    color: 'from-yellow-400 to-amber-500',
    answer: 'Gras, lourd à la racine',
  },
  'normal': {
    icon: <Heart className="w-6 h-6" />,
    emoji: '✨',
    color: 'from-green-400 to-emerald-500',
    answer: 'Normal, confortable',
  },
  'sensible': {
    icon: <AlertTriangle className="w-6 h-6" />,
    emoji: '⚠️',
    color: 'from-pink-400 to-rose-500',
    answer: 'Sensible, irrité',
  },
};

interface StepScalpProps {
  onNext: () => void;
  scalpTypes: ScalpType[];
}

export function StepScalp({ onNext, scalpTypes }: StepScalpProps) {
  const { answers, setScalpType } = useDiagnosticStore();
  const { t } = useTranslation();
  const selectedId = answers.scalpTypeId;

  const handleSelect = (id: string) => {
    setScalpType(id);
  };

  const handleContinue = () => {
    if (selectedId) {
      onNext();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Titre avec contexte */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <h2 className="text-2xl font-bold text-secondary-900 mb-2 font-playfair">
          {t('diagnostic.scalp.title')}
        </h2>
        <p className="text-secondary-600">
          {t('diagnostic.scalp.subtitle')}
        </p>
      </motion.div>

      {/* Question contextuelle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-amber-50 rounded-xl border border-primary-100"
      >
        <p className="text-sm text-secondary-700 text-center">
          🤔 <em>{t('diagnostic.scalp.question')}</em>
        </p>
      </motion.div>

      {/* Options */}
      <div className="flex-1 space-y-3">
        {scalpTypes.map((scalp, index) => {
          const visual = SCALP_VISUALS[scalp.slug] || SCALP_VISUALS['normal'];
          const isSelected = selectedId === scalp.id;
          
          return (
            <motion.button
              key={scalp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSelect(scalp.id)}
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
              {/* Icône */}
              <div className={`
                w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0
                bg-gradient-to-br ${visual.color} text-white
              `}>
                <span className="text-2xl">{visual.emoji}</span>
              </div>

              {/* Texte */}
              <div className="flex-1 min-w-0">
                <p className={`
                  font-semibold mb-1
                  ${isSelected ? 'text-primary' : 'text-secondary-800'}
                `}>
                  {scalp.name}
                </p>
                <p className="text-sm text-secondary-500">
                  {visual.answer}
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

      {/* Bouton Continuer */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={handleContinue}
        disabled={!selectedId}
        className={`
          mt-6 w-full py-4 rounded-xl font-semibold text-white
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
    </div>
  );
}

export default StepScalp;

