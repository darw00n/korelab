'use client';

// ============================================
// KORELAB - Porosity Help Modal
// Explains how to determine hair porosity
// ============================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Droplets, Clock, CheckCircle } from 'lucide-react';

interface PorosityHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PorosityHelp({ isOpen, onClose }: PorosityHelpProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-h-[85vh] overflow-y-auto"
          >
            {/* Handle */}
            <div className="sticky top-0 bg-white pt-3 pb-2 px-4 border-b border-slate-200">
              <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between">
                <h2 className="font-mono text-lg font-bold uppercase tracking-wider text-science-900">
                  Comment connaître ta porosité ?
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-text-secondary" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-6 pb-8">
              {/* Test du verre d'eau */}
              <div className="card p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-science-900 text-white rounded-sm flex items-center justify-center">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-science-900">
                      Test du verre d'eau
                    </h3>
                    <p className="font-sans text-xs text-text-secondary">Méthode simple et fiable</p>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-3 mb-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-accent-500 text-white rounded-full flex items-center justify-center">
                      <span className="font-mono text-xs font-bold">1</span>
                    </div>
                    <p className="font-sans text-sm text-text-secondary">
                      Prends un cheveu <strong>propre et sec</strong> (sans produit)
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-accent-500 text-white rounded-full flex items-center justify-center">
                      <span className="font-mono text-xs font-bold">2</span>
                    </div>
                    <p className="font-sans text-sm text-text-secondary">
                      Dépose-le dans un <strong>verre d'eau</strong> à température ambiante
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-accent-500 text-white rounded-full flex items-center justify-center">
                      <span className="font-mono text-xs font-bold">3</span>
                    </div>
                    <p className="font-sans text-sm text-text-secondary">
                      Attends <strong>2-4 minutes</strong> et observe
                    </p>
                  </div>
                </div>

                {/* Timer icon */}
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-md">
                  <Clock className="w-4 h-4 text-text-secondary" />
                  <span className="font-sans text-xs text-text-secondary">
                    Patience ! Le résultat prend quelques minutes.
                  </span>
                </div>
              </div>

              {/* Results interpretation */}
              <div>
                <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-science-900 mb-4">
                  Interprétation des résultats
                </h3>

                <div className="space-y-4">
                  {/* Low Porosity */}
                  <div className="card p-4 border-l-4 border-blue-500">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {/* Glass illustration - floating */}
                        <div className="w-16 h-20 relative">
                          <div className="absolute inset-0 border-2 border-slate-300 rounded-b-lg bg-blue-50">
                            {/* Water line */}
                            <div className="absolute top-2 left-0 right-0 border-t-2 border-dashed border-blue-300" />
                            {/* Hair floating at top */}
                            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-amber-800 rounded-full" />
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-mono font-bold text-sm text-science-900 mb-1">
                          POROSITÉ FAIBLE
                        </h4>
                        <p className="font-sans text-xs text-blue-700 mb-2">
                          Le cheveu <strong>flotte à la surface</strong>
                        </p>
                        <p className="font-sans text-xs text-text-secondary">
                          Tes cuticules sont fermées. Les produits ont du mal à pénétrer.
                          Privilégie les <strong>huiles légères</strong> et la <strong>chaleur</strong> pour ouvrir les cuticules.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Medium Porosity */}
                  <div className="card p-4 border-l-4 border-green-500">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {/* Glass illustration - middle */}
                        <div className="w-16 h-20 relative">
                          <div className="absolute inset-0 border-2 border-slate-300 rounded-b-lg bg-blue-50">
                            {/* Water line */}
                            <div className="absolute top-2 left-0 right-0 border-t-2 border-dashed border-blue-300" />
                            {/* Hair in middle */}
                            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-amber-800 rounded-full" />
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-mono font-bold text-sm text-science-900 mb-1">
                          POROSITÉ MOYENNE
                        </h4>
                        <p className="font-sans text-xs text-green-700 mb-2">
                          Le cheveu <strong>flotte au milieu</strong>
                        </p>
                        <p className="font-sans text-xs text-text-secondary">
                          Équilibre parfait ! Tes cuticules s'ouvrent et se ferment normalement.
                          La plupart des produits fonctionnent bien pour toi.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* High Porosity */}
                  <div className="card p-4 border-l-4 border-amber-500">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {/* Glass illustration - sunk */}
                        <div className="w-16 h-20 relative">
                          <div className="absolute inset-0 border-2 border-slate-300 rounded-b-lg bg-blue-50">
                            {/* Water line */}
                            <div className="absolute top-2 left-0 right-0 border-t-2 border-dashed border-blue-300" />
                            {/* Hair at bottom */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-amber-800 rounded-full" />
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-mono font-bold text-sm text-science-900 mb-1">
                          POROSITÉ FORTE
                        </h4>
                        <p className="font-sans text-xs text-amber-700 mb-2">
                          Le cheveu <strong>coule rapidement</strong>
                        </p>
                        <p className="font-sans text-xs text-text-secondary">
                          Tes cuticules sont ouvertes. L'hydratation entre vite mais ressort aussi vite.
                          Tu as besoin de <strong>protéines</strong> et de <strong>scellants lourds</strong> (beurres).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cuticle diagram */}
              <div className="card p-4 bg-slate-50">
                <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-science-900 mb-4">
                  Comprendre les cuticules
                </h3>
                
                <div className="grid grid-cols-3 gap-3">
                  {/* Low porosity cuticle */}
                  <div className="text-center">
                    <div className="w-full h-16 mb-2 flex items-center justify-center">
                      {/* Closed cuticles representation */}
                      <svg viewBox="0 0 60 40" className="w-full h-full">
                        <ellipse cx="30" cy="20" rx="25" ry="8" fill="#d4a574" stroke="#8b5e34" strokeWidth="1"/>
                        {/* Tight scales */}
                        <path d="M10 18 Q15 16 20 18" stroke="#8b5e34" strokeWidth="1" fill="none"/>
                        <path d="M18 18 Q23 16 28 18" stroke="#8b5e34" strokeWidth="1" fill="none"/>
                        <path d="M26 18 Q31 16 36 18" stroke="#8b5e34" strokeWidth="1" fill="none"/>
                        <path d="M34 18 Q39 16 44 18" stroke="#8b5e34" strokeWidth="1" fill="none"/>
                        <path d="M42 18 Q47 16 52 18" stroke="#8b5e34" strokeWidth="1" fill="none"/>
                      </svg>
                    </div>
                    <p className="font-mono text-[10px] uppercase text-blue-600 font-bold">Faible</p>
                    <p className="font-sans text-[10px] text-text-secondary">Fermées</p>
                  </div>

                  {/* Medium porosity cuticle */}
                  <div className="text-center">
                    <div className="w-full h-16 mb-2 flex items-center justify-center">
                      <svg viewBox="0 0 60 40" className="w-full h-full">
                        <ellipse cx="30" cy="20" rx="25" ry="8" fill="#d4a574" stroke="#8b5e34" strokeWidth="1"/>
                        {/* Slightly raised scales */}
                        <path d="M10 17 Q15 14 20 18" stroke="#8b5e34" strokeWidth="1" fill="none"/>
                        <path d="M18 17 Q23 14 28 18" stroke="#8b5e34" strokeWidth="1" fill="none"/>
                        <path d="M26 17 Q31 14 36 18" stroke="#8b5e34" strokeWidth="1" fill="none"/>
                        <path d="M34 17 Q39 14 44 18" stroke="#8b5e34" strokeWidth="1" fill="none"/>
                        <path d="M42 17 Q47 14 52 18" stroke="#8b5e34" strokeWidth="1" fill="none"/>
                      </svg>
                    </div>
                    <p className="font-mono text-[10px] uppercase text-green-600 font-bold">Moyenne</p>
                    <p className="font-sans text-[10px] text-text-secondary">Légèrement ouvertes</p>
                  </div>

                  {/* High porosity cuticle */}
                  <div className="text-center">
                    <div className="w-full h-16 mb-2 flex items-center justify-center">
                      <svg viewBox="0 0 60 40" className="w-full h-full">
                        <ellipse cx="30" cy="20" rx="25" ry="8" fill="#d4a574" stroke="#8b5e34" strokeWidth="1"/>
                        {/* Lifted scales */}
                        <path d="M10 15 Q15 10 20 18" stroke="#8b5e34" strokeWidth="1" fill="none"/>
                        <path d="M18 15 Q23 10 28 18" stroke="#8b5e34" strokeWidth="1" fill="none"/>
                        <path d="M26 15 Q31 10 36 18" stroke="#8b5e34" strokeWidth="1" fill="none"/>
                        <path d="M34 15 Q39 10 44 18" stroke="#8b5e34" strokeWidth="1" fill="none"/>
                        <path d="M42 15 Q47 10 52 18" stroke="#8b5e34" strokeWidth="1" fill="none"/>
                      </svg>
                    </div>
                    <p className="font-mono text-[10px] uppercase text-amber-600 font-bold">Forte</p>
                    <p className="font-sans text-[10px] text-text-secondary">Très ouvertes</p>
                  </div>
                </div>
              </div>

              {/* Quick tips */}
              <div className="p-4 bg-accent-50 border border-accent-200 rounded-md">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-accent-800 font-bold mb-1">
                      Pas sûr(e) du résultat ?
                    </p>
                    <p className="font-sans text-sm text-accent-700">
                      Si tu hésites, choisis <strong>"Porosité Moyenne"</strong>. 
                      C'est le profil le plus commun et notre algorithme s'adaptera à tes retours.
                    </p>
                  </div>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="btn-primary w-full py-4"
              >
                J'AI COMPRIS
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default PorosityHelp;
