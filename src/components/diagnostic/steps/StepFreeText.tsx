'use client';

// ============================================
// KORELAB - Step Free Text (Science Snap)
// Free text input for user to describe their problem
// ============================================

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles } from 'lucide-react';
import { useDiagnosticStore } from '@/store/diagnosticStore';

interface StepFreeTextProps {
  onNext: () => void;
}

export function StepFreeText({ onNext }: StepFreeTextProps) {
  const { answers, setUserProblemDescription, setUserDesiredSolution } = useDiagnosticStore();

  const handleProblemChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserProblemDescription(e.target.value);
  };

  const handleSolutionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserDesiredSolution(e.target.value);
  };

  return (
    <div className="h-full flex flex-col px-4 pt-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="font-mono text-2xl font-bold uppercase tracking-wider text-science-900 mb-2">
          Parle-nous de toi
        </h2>
        <p className="font-sans text-sm text-text-secondary">
          Aide-nous à mieux comprendre tes besoins (optionnel)
        </p>
      </motion.div>

      {/* Form */}
      <div className="flex-1 space-y-6">
        {/* Problem Description */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-science-900 text-white rounded-sm flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <label className="font-mono font-bold text-sm uppercase tracking-wider text-science-900">
              Décris ton problème
            </label>
          </div>
          <textarea
            value={answers.userProblemDescription || ''}
            onChange={handleProblemChange}
            placeholder="Ex: Mes cheveux cassent beaucoup aux pointes, ils sont secs et difficiles à démêler..."
            className="w-full h-28 p-4 border-2 border-slate-200 rounded-md font-sans text-sm text-text-primary placeholder:text-text-muted focus:border-science-900 focus:outline-none transition-colors resize-none"
          />
          <p className="mt-1 font-sans text-xs text-text-muted">
            En quelques mots, quel est ton principal souci capillaire ?
          </p>
        </motion.div>

        {/* Desired Solution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-accent-500 text-white rounded-sm flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <label className="font-mono font-bold text-sm uppercase tracking-wider text-science-900">
              Qu'attends-tu comme résultat ?
            </label>
          </div>
          <textarea
            value={answers.userDesiredSolution || ''}
            onChange={handleSolutionChange}
            placeholder="Ex: Je veux des cheveux plus forts, brillants et faciles à coiffer..."
            className="w-full h-28 p-4 border-2 border-slate-200 rounded-md font-sans text-sm text-text-primary placeholder:text-text-muted focus:border-accent-500 focus:outline-none transition-colors resize-none"
          />
          <p className="mt-1 font-sans text-xs text-text-muted">
            Décris le résultat que tu souhaites obtenir.
          </p>
        </motion.div>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-accent-50 border border-accent-200 rounded-md"
        >
          <p className="font-sans text-xs text-accent-700">
            <strong>Pourquoi ces questions ?</strong> Tes réponses permettent à notre IA de personnaliser 
            encore plus ton analyse et tes recommandations. C'est optionnel mais fortement recommandé !
          </p>
        </motion.div>
      </div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 pb-4"
      >
        <button
          onClick={onNext}
          className="btn-primary w-full py-4"
        >
          CONTINUER
        </button>
        <p className="text-center font-sans text-xs text-text-muted mt-2">
          Tu peux passer cette étape si tu préfères
        </p>
      </motion.div>
    </div>
  );
}

export default StepFreeText;
