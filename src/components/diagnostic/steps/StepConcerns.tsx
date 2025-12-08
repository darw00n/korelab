'use client';

// ============================================
// KORELAB - Step Concerns (HAIR CARE)
// Sélection des préoccupations capillaires
// ============================================

import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingDown, 
  Snowflake, 
  Scissors, 
  Clock, 
  Droplets, 
  Wind,
  ArrowUp,
  Sparkles
} from 'lucide-react';
import { useDiagnosticStore } from '@/store/diagnosticStore';
import { useTranslation } from '@/lib/i18n/context';
import type { Concern } from '@/types/database.types';

// ===================
// MAPPING DES ICÔNES
// ===================

const CONCERN_ICONS: Record<string, React.ReactNode> = {
  'chute': <TrendingDown className="w-5 h-5" />,
  'pellicules': <Snowflake className="w-5 h-5" />,
  'casse': <Scissors className="w-5 h-5" />,
  'pousse': <Clock className="w-5 h-5" />,
  'secheresse': <Droplets className="w-5 h-5" />,
  'frisottis': <Wind className="w-5 h-5" />,
  'volume': <ArrowUp className="w-5 h-5" />,
  'brillance': <Sparkles className="w-5 h-5" />,
};

const CONCERN_COLORS: Record<string, string> = {
  'chute': 'from-red-400 to-rose-500',
  'pellicules': 'from-blue-400 to-cyan-500',
  'casse': 'from-orange-400 to-amber-500',
  'pousse': 'from-purple-400 to-violet-500',
  'secheresse': 'from-sky-400 to-blue-500',
  'frisottis': 'from-teal-400 to-emerald-500',
  'volume': 'from-pink-400 to-fuchsia-500',
  'brillance': 'from-yellow-400 to-amber-500',
};

// Noms courts pour l'affichage
const SHORT_NAMES: Record<string, string> = {
  'chute': 'Chute',
  'pellicules': 'Pellicules',
  'casse': 'Casse',
  'pousse': 'Pousse',
  'secheresse': 'Sécheresse',
  'frisottis': 'Frisottis',
  'volume': 'Volume',
  'brillance': 'Brillance',
};

interface StepConcernsProps {
  onNext: () => void;
  concerns: Concern[];
}

export function StepConcerns({ onNext, concerns }: StepConcernsProps) {
  const { answers, toggleConcern } = useDiagnosticStore();
  const { t } = useTranslation();
  const selectedIds = answers.concernIds || [];

  const handleToggle = (id: string) => {
    toggleConcern(id);
  };

  const handleContinue = () => {
    if (selectedIds.length > 0) {
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
          {t('diagnostic.concerns.title')}
        </h2>
        <p className="text-secondary-600">
          {t('diagnostic.concerns.subtitle')}
        </p>
      </motion.div>

      {/* Badge de sélection */}
      <AnimatedBadge count={selectedIds.length} t={t} />

      {/* Grid des concerns */}
      <div className="flex-1">
        <div className="grid grid-cols-2 gap-3">
          {concerns.map((concern, index) => {
            const isSelected = selectedIds.includes(concern.id);
            const icon = CONCERN_ICONS[concern.slug] || <Sparkles className="w-5 h-5" />;
            const color = CONCERN_COLORS[concern.slug] || 'from-gray-400 to-gray-500';
            const shortName = SHORT_NAMES[concern.slug] || concern.name.split(' ')[0];
            
            return (
              <motion.button
                key={concern.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleToggle(concern.id)}
                className={`
                  relative p-4 rounded-xl border-2 transition-all duration-200
                  flex flex-col items-center justify-center text-center gap-2
                  ${isSelected 
                    ? 'border-primary bg-primary-50 shadow-md' 
                    : 'border-secondary-200 bg-white hover:border-primary-300'
                  }
                `}
                whileTap={{ scale: 0.95 }}
              >
                {/* Checkmark */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                  >
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}

                {/* Icône */}
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center
                  bg-gradient-to-br ${color} text-white
                  transition-transform duration-200
                  ${isSelected ? 'scale-110' : ''}
                `}>
                  {icon}
                </div>

                {/* Label */}
                <span className={`
                  text-sm font-medium
                  ${isSelected ? 'text-primary' : 'text-secondary-700'}
                `}>
                  {shortName}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Message d'encouragement */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-sm text-secondary-500 mt-4 mb-4"
      >
        💡 {t('diagnostic.concerns.helper')}
      </motion.p>

      {/* Bouton Continuer */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={handleContinue}
        disabled={selectedIds.length === 0}
        className={`
          w-full py-4 rounded-xl font-semibold text-white
          transition-all duration-200 flex items-center justify-center gap-2
          ${selectedIds.length > 0 
            ? 'bg-primary hover:bg-primary-600 shadow-lg shadow-primary/30' 
            : 'bg-secondary-300 cursor-not-allowed'
          }
        `}
      >
        {t('diagnostic.concerns.cta')}
        <Sparkles className="w-5 h-5" />
      </motion.button>
    </div>
  );
}

// Composant badge animé
function AnimatedBadge({ count, t }: { count: number; t: (key: string) => string }) {
  if (count === 0) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mb-4 mx-auto px-4 py-2 bg-primary-50 border border-primary-200 rounded-full"
    >
      <p className="text-sm text-primary font-medium">
        {count} {t('diagnostic.concerns.selectedCount')}
      </p>
    </motion.div>
  );
}

export default StepConcerns;
