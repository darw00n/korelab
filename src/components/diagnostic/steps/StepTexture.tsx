'use client';

// ============================================
// KORELAB - Step Texture (HAIR CARE)
// Sélection de la texture capillaire (Type 1-4)
// ============================================

import React from 'react';
import { motion } from 'framer-motion';
import { useDiagnosticStore } from '@/store/diagnosticStore';
import { useTranslation } from '@/lib/i18n/context';
import type { HairTexture } from '@/types/database.types';

// ===================
// DONNÉES VISUELLES DES TEXTURES
// ===================

const TEXTURE_VISUALS: Record<string, {
  pattern: string;
  emoji: string;
  color: string;
}> = {
  'lisse': {
    pattern: '━━━━━━━━',
    emoji: '〰️',
    color: 'from-blue-400 to-blue-600',
  },
  'ondule': {
    pattern: '∿∿∿∿∿∿∿∿',
    emoji: '🌊',
    color: 'from-cyan-400 to-cyan-600',
  },
  'boucle': {
    pattern: '〰〰〰〰',
    emoji: '🔄',
    color: 'from-purple-400 to-purple-600',
  },
  'crepu': {
    pattern: '〰〰〰〰',
    emoji: '⚡',
    color: 'from-amber-500 to-orange-600',
  },
};

interface StepTextureProps {
  onNext: () => void;
  textures: HairTexture[];
}

export function StepTexture({ onNext, textures }: StepTextureProps) {
  const { answers, setTexture } = useDiagnosticStore();
  const { t } = useTranslation();
  const selectedId = answers.textureId;

  const handleSelect = (id: string) => {
    setTexture(id);
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
        className="mb-6 text-center"
      >
        <h2 className="text-2xl font-bold text-secondary-900 mb-2 font-playfair">
          {t('diagnostic.texture.title')}
        </h2>
        <p className="text-secondary-600">
          {t('diagnostic.texture.subtitle')}
        </p>
      </motion.div>

      {/* Grid des textures */}
      <div className="flex-1 grid grid-cols-2 gap-3">
        {textures.map((texture, index) => {
          const visual = TEXTURE_VISUALS[texture.slug] || TEXTURE_VISUALS['ondule'];
          const isSelected = selectedId === texture.id;
          
          return (
            <motion.button
              key={texture.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSelect(texture.id)}
              className={`
                relative p-4 rounded-2xl border-2 transition-all duration-200
                flex flex-col items-center justify-center text-center
                ${isSelected 
                  ? 'border-primary bg-primary-50 shadow-lg shadow-primary/20' 
                  : 'border-secondary-200 bg-white hover:border-primary-300'
                }
              `}
              whileTap={{ scale: 0.97 }}
            >
              {/* Badge de sélection */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}

              {/* Représentation visuelle du cheveu */}
              <div className={`
                w-16 h-16 rounded-2xl mb-3 flex items-center justify-center
                bg-gradient-to-br ${visual.color}
              `}>
                <span className="text-3xl">{visual.emoji}</span>
              </div>

              {/* Nom de la texture */}
              <span className={`
                font-semibold text-sm mb-1
                ${isSelected ? 'text-primary' : 'text-secondary-800'}
              `}>
                {texture.name}
              </span>

              {/* Description courte */}
              <span className="text-xs text-secondary-500 line-clamp-2">
                {texture.description}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Aide visuelle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 p-3 bg-secondary-50 rounded-xl text-center"
      >
        <p className="text-xs text-secondary-600">
          💡 {t('diagnostic.texture.helper')}
        </p>
      </motion.div>

      {/* Bouton Continuer */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
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
    </div>
  );
}

export default StepTexture;

