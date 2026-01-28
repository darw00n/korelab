'use client';

// ============================================
// KORELAB - Cuticle Diagram Component
// Pre-generated SVG illustrations for education
// ============================================

import React from 'react';
import { motion } from 'framer-motion';

interface CuticleDiagramProps {
  porosity: string;
}

export function CuticleDiagram({ porosity }: CuticleDiagramProps) {
  const porosityKey = porosity?.toLowerCase() || 'moyenne';
  
  const config = POROSITY_CONFIG[porosityKey] || POROSITY_CONFIG.moyenne;

  return (
    <div className="p-4 bg-white rounded-lg border">
      <p className="font-mono text-xs uppercase text-text-muted mb-4">
        Schéma: Tes Cuticules vs Objectif
      </p>
      
      <div className="flex items-center justify-between gap-4">
        {/* Before: Current State */}
        <motion.div 
          className="flex-1 text-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-slate-50 rounded-lg p-3 mb-2">
            <CuticleSVG type={config.before} />
          </div>
          <p className="text-[10px] font-mono text-text-muted">{config.beforeLabel}</p>
          <p className="text-[10px] text-red-600">{config.beforeEffect}</p>
        </motion.div>

        {/* Arrow */}
        <motion.div 
          className="flex-shrink-0"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </motion.div>

        {/* After: Goal State */}
        <motion.div 
          className="flex-1 text-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-green-50 rounded-lg p-3 mb-2">
            <CuticleSVG type="healthy" />
          </div>
          <p className="text-[10px] font-mono text-text-muted">Cuticules équilibrées</p>
          <p className="text-[10px] text-green-600">= Hydratation optimale</p>
        </motion.div>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="flex justify-center gap-6 text-[10px]">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-amber-200 border border-amber-400" />
            <span className="text-text-muted">Cortex (cœur)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-amber-700" style={{ borderRadius: '0 4px 0 0' }} />
            <span className="text-text-muted">Cuticules (écailles)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// CUTICLE SVG COMPONENT
// ============================================

type CuticleType = 'closed' | 'normal' | 'open' | 'very-open' | 'healthy';

function CuticleSVG({ type }: { type: CuticleType }) {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-20">
      <defs>
        <linearGradient id={`hairGrad-${type}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e8c49a" />
          <stop offset="100%" stopColor="#d4a574" />
        </linearGradient>
      </defs>
      
      {/* Hair shaft base */}
      <ellipse 
        cx="60" cy="40" rx="50" ry="18" 
        fill={`url(#hairGrad-${type})`} 
        stroke="#8b5e34" 
        strokeWidth="1.5"
      />
      
      {/* Cuticle scales based on type */}
      {type === 'closed' && (
        // Porosité faible: cuticules très fermées
        <>
          <path d="M15 38 Q25 36 35 38" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
          <path d="M30 38 Q40 36 50 38" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
          <path d="M45 38 Q55 36 65 38" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
          <path d="M60 38 Q70 36 80 38" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
          <path d="M75 38 Q85 36 95 38" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
          <path d="M90 38 Q100 36 105 38" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
          {/* Water droplets bouncing off */}
          <circle cx="40" cy="18" r="4" fill="#87CEEB" opacity="0.6"/>
          <circle cx="80" cy="15" r="3" fill="#87CEEB" opacity="0.6"/>
          <path d="M40 22 L38 28" stroke="#87CEEB" strokeWidth="1" opacity="0.6"/>
          <path d="M80 18 L82 24" stroke="#87CEEB" strokeWidth="1" opacity="0.6"/>
        </>
      )}
      
      {type === 'normal' && (
        // Porosité moyenne: cuticules légèrement ouvertes
        <>
          <path d="M15 35 Q25 30 35 38" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
          <path d="M30 35 Q40 30 50 38" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
          <path d="M45 35 Q55 30 65 38" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
          <path d="M60 35 Q70 30 80 38" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
          <path d="M75 35 Q85 30 95 38" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
          {/* Water droplets entering normally */}
          <circle cx="50" cy="22" r="3" fill="#87CEEB" opacity="0.7"/>
          <circle cx="70" cy="20" r="3" fill="#87CEEB" opacity="0.7"/>
        </>
      )}
      
      {type === 'open' || type === 'very-open' && (
        // Porosité forte: cuticules très ouvertes
        <>
          <path d="M15 30 Q25 18 35 38" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
          <path d="M30 30 Q40 18 50 38" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
          <path d="M45 30 Q55 18 65 38" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
          <path d="M60 30 Q70 18 80 38" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
          <path d="M75 30 Q85 18 95 38" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
          {/* Water droplets entering AND exiting */}
          <circle cx="35" cy="15" r="3" fill="#87CEEB" opacity="0.8"/>
          <circle cx="55" cy="12" r="4" fill="#87CEEB" opacity="0.8"/>
          <circle cx="75" cy="14" r="3" fill="#87CEEB" opacity="0.8"/>
          {/* Droplets escaping below */}
          <circle cx="40" cy="58" r="2" fill="#87CEEB" opacity="0.4"/>
          <circle cx="70" cy="60" r="2" fill="#87CEEB" opacity="0.4"/>
          <path d="M40 55 L40 62" stroke="#87CEEB" strokeWidth="1" opacity="0.4" strokeDasharray="2,2"/>
          <path d="M70 55 L70 65" stroke="#87CEEB" strokeWidth="1" opacity="0.4" strokeDasharray="2,2"/>
        </>
      )}
      
      {type === 'healthy' && (
        // État optimal: cuticules lisses avec brillance
        <>
          <path d="M15 36 Q25 32 35 38" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
          <path d="M30 36 Q40 32 50 38" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
          <path d="M45 36 Q55 32 65 38" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
          <path d="M60 36 Q70 32 80 38" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
          <path d="M75 36 Q85 32 95 38" stroke="#8b5e34" strokeWidth="1.5" fill="none"/>
          {/* Shine effect */}
          <ellipse cx="50" cy="32" rx="20" ry="6" fill="white" opacity="0.4"/>
          {/* Sparkles */}
          <circle cx="30" cy="25" r="2" fill="#d4a574"/>
          <circle cx="90" cy="28" r="2" fill="#d4a574"/>
          <circle cx="60" cy="22" r="2.5" fill="#22c55e"/>
        </>
      )}
    </svg>
  );
}

// ============================================
// CONFIG
// ============================================

interface PorosityConfigItem {
  before: CuticleType;
  beforeLabel: string;
  beforeEffect: string;
}

const POROSITY_CONFIG: Record<string, PorosityConfigItem> = {
  faible: {
    before: 'closed',
    beforeLabel: 'Cuticules fermées',
    beforeEffect: '= Pénétration difficile',
  },
  moyenne: {
    before: 'normal',
    beforeLabel: 'Cuticules normales',
    beforeEffect: '= Équilibre à maintenir',
  },
  forte: {
    before: 'very-open',
    beforeLabel: 'Cuticules ouvertes',
    beforeEffect: '= Perte d\'hydratation',
  },
};

export default CuticleDiagram;
