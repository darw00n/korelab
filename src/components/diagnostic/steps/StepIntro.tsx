'use client';

// ============================================
// KORELAB - Step Intro (HAIR CARE)
// Écran d'accueil du diagnostic capillaire
// ============================================

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Leaf, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/context';

interface StepIntroProps {
  onStart: () => void;
}

export function StepIntro({ onStart }: StepIntroProps) {
  const { t, dir } = useTranslation();
  
  return (
    <div className="h-full flex flex-col justify-center items-center text-center px-4">
      {/* Icône animée */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-24 h-24 bg-gradient-to-br from-primary to-primary-600 rounded-3xl flex items-center justify-center mb-8 shadow-lg"
      >
        <Sparkles className="w-12 h-12 text-white" />
      </motion.div>

      {/* Titre */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-secondary-900 mb-3 font-playfair"
      >
        {t('diagnostic.intro.title')}
      </motion.h1>

      {/* Sous-titre */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-secondary-600 mb-8 max-w-sm"
      >
        {t('diagnostic.intro.subtitle')}
        <span className="text-primary font-semibold"> {t('diagnostic.intro.questionsCount')}</span>
      </motion.p>

      {/* Points clés */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col gap-3 mb-10 w-full max-w-xs"
      >
        <div className={`flex items-center gap-3 ${dir === 'rtl' ? 'text-right flex-row-reverse' : 'text-left'}`}>
          <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <span className="text-secondary-700">{t('diagnostic.intro.features.time')}</span>
        </div>
        
        <div className={`flex items-center gap-3 ${dir === 'rtl' ? 'text-right flex-row-reverse' : 'text-left'}`}>
          <div className="w-10 h-10 bg-accent-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Leaf className="w-5 h-5 text-accent" />
          </div>
          <span className="text-secondary-700">{t('diagnostic.intro.features.natural')}</span>
        </div>
        
        <div className={`flex items-center gap-3 ${dir === 'rtl' ? 'text-right flex-row-reverse' : 'text-left'}`}>
          <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-secondary-600" />
          </div>
          <span className="text-secondary-700">{t('diagnostic.intro.features.personalized')}</span>
        </div>
      </motion.div>

      {/* Bouton CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={onStart}
        className={`btn-primary w-full max-w-xs text-lg py-4 flex items-center justify-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
        whileTap={{ scale: 0.98 }}
      >
        {t('diagnostic.intro.cta')}
        <ArrowRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
      </motion.button>

      {/* Texte légal */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xs text-secondary-400 mt-6"
      >
        {t('diagnostic.intro.legal')}
      </motion.p>
    </div>
  );
}

export default StepIntro;
