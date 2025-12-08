'use client';

// ============================================
// KORELAB - Step Loading (HAIR CARE)
// Animation de chargement pendant l'analyse IA
// ============================================

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Dna, FlaskConical, Microscope } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/context';

const LOADING_ICONS = [Microscope, FlaskConical, Dna, Sparkles];
const LOADING_KEYS = [
  'diagnostic.loading.steps.texture',
  'diagnostic.loading.steps.porosity',
  'diagnostic.loading.steps.actives',
  'diagnostic.loading.steps.routine',
];

export function StepLoading() {
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % LOADING_ICONS.length);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = LOADING_ICONS[currentStep];

  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4">
      {/* Cercle animé avec icône */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="relative mb-8"
      >
        {/* Cercle de fond animé */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="w-32 h-32 rounded-full border-4 border-primary-200 border-t-primary"
        />
        
        {/* Icône centrale */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            key={currentStep}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="w-16 h-16 bg-gradient-to-br from-primary to-primary-600 rounded-2xl flex items-center justify-center shadow-lg"
          >
            <CurrentIcon className="w-8 h-8 text-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* Titre */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-secondary-900 mb-4 font-playfair"
      >
        {t('diagnostic.loading.title')}
      </motion.h2>

      {/* Texte de progression */}
      <motion.p
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-secondary-600 mb-8 flex items-center gap-2"
      >
        <CurrentIcon className="w-4 h-4 text-primary" />
        {t(LOADING_KEYS[currentStep])}
      </motion.p>

      {/* Barre de progression */}
      <div className="w-full max-w-xs">
        <div className="h-2 bg-secondary-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full"
          />
        </div>
      </div>

      {/* Points de chargement */}
      <div className="flex gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-2 h-2 bg-primary rounded-full"
          />
        ))}
      </div>
    </div>
  );
}

export default StepLoading;
