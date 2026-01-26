'use client';

// ============================================
// KORELAB - Step Loading (Science Snap)
// Animation de chargement avec style clinique
// ============================================

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const LOADING_TEXTS = [
  'Corrélation des symptômes...',
  'Traitement des données...',
  'Analyse de compatibilité...',
  'Génération du protocole...',
];

export function StepLoading() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Changer le texte toutes les 600ms
    const textInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % LOADING_TEXTS.length);
    }, 600);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 50);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4 bg-white">
      {/* Icône Pouls qui bat */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="mb-8"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-20 h-20 flex items-center justify-center"
        >
          <Activity className="w-16 h-16 text-accent-500" />
        </motion.div>
      </motion.div>

      {/* Texte technique */}
      <motion.p
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="font-mono text-sm uppercase tracking-wider text-science-900 mb-8"
      >
        {LOADING_TEXTS[currentStep]}
      </motion.p>

      {/* Barre de chargement scientifique */}
      <div className="w-full max-w-xs">
        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-science-900 rounded-full"
          />
        </div>
      </div>

      {/* Pourcentage */}
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="font-mono text-xs uppercase tracking-wider text-text-secondary mt-4"
      >
        {progress}%
      </motion.p>
    </div>
  );
}

export default StepLoading;
