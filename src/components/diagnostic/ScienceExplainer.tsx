'use client';

// ============================================
// KORELAB - Science Explainer (HAIR CARE)
// Explique la science derrière les recommandations
// ============================================

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Microscope, 
  Layers, 
  Droplet, 
  Target,
  ChevronRight,
  ChevronLeft,
  Beaker
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n/context';
import type { ScoredProduct } from '@/types/database.types';

// ===================
// MAPPING DES CLÉS DE TRADUCTION
// ===================

const POROSITY_KEYS: Record<string, { key: string; visual: string }> = {
  'Porosité Faible': { key: 'low', visual: '🔒' },
  'Porosité Moyenne': { key: 'medium', visual: '⚖️' },
  'Porosité Forte': { key: 'high', visual: '🔓' },
};

const TEXTURE_KEYS: Record<string, string> = {
  'Lisse': 'straight',
  'Ondulé': 'wavy',
  'Bouclé': 'curly',
  'Frisé/Crépu': 'coily',
};

const CONCERN_KEYS: Record<string, string> = {
  'Chute de Cheveux': 'hairLoss',
  'Pellicules': 'dandruff',
  'Casse': 'breakage',
  'Sécheresse': 'dryness',
  'Pousse Lente': 'slowGrowth',
};

interface ScienceExplainerProps {
  profile: {
    texture: string;
    porosity: string;
    scalpType: string;
    concerns: string[];
  };
  products: ScoredProduct[];
}

export function ScienceExplainer({ profile, products }: ScienceExplainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const porosityKey = POROSITY_KEYS[profile.porosity]?.key || 'medium';
  const porosityVisual = POROSITY_KEYS[profile.porosity]?.visual || '⚖️';
  const textureKey = TEXTURE_KEYS[profile.texture] || 'curly';

  // Générer les cartes science avec traductions
  const scienceCards = [
    // Carte Porosité
    {
      id: 'porosity',
      icon: <Layers className="w-6 h-6" />,
      title: `${t('results.science.porosity.' + porosityKey + 'Title')}`,
      subtitle: profile.porosity,
      visual: porosityVisual,
      content: t(`results.science.porosity.${porosityKey}Explanation`),
      action: t(`results.science.porosity.${porosityKey}Action`),
      color: 'from-purple-500 to-violet-600',
    },
    // Carte Texture
    {
      id: 'texture',
      icon: <Microscope className="w-6 h-6" />,
      title: profile.texture,
      subtitle: '',
      visual: profile.texture.includes('Crépu') ? '〰️' : '∿',
      content: t(`results.science.texture.${textureKey}`),
      action: '',
      color: 'from-blue-500 to-cyan-600',
    },
    // Carte Actif principal (si concerns)
    ...(profile.concerns.length > 0 ? [{
      id: 'active',
      icon: <Beaker className="w-6 h-6" />,
      title: profile.concerns[0],
      subtitle: '',
      visual: '🎯',
      content: getActiveExplanation(profile.concerns[0], products, t),
      action: '',
      color: 'from-amber-500 to-orange-600',
    }] : []),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-8 mb-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <Microscope className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-secondary-900 font-playfair">
            {t('results.science.title')}
          </h2>
        </div>
        
        {/* Navigation */}
        <div className="flex gap-1">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-secondary-100 hover:bg-secondary-200 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-secondary-600" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-secondary-100 hover:bg-secondary-200 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-secondary-600" />
          </button>
        </div>
      </div>

      {/* Carrousel horizontal */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {scienceCards.map((card, index) => (
          <ScienceCard key={card.id} card={card} index={index} t={t} />
        ))}
      </div>

      {/* Section LOC Method */}
      <LOCMethodExplainer porosity={profile.porosity} t={t} />
    </motion.div>
  );
}

// ===================
// CARTE SCIENCE
// ===================

interface ScienceCardProps {
  card: {
    id: string;
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    visual: string;
    content: string;
    action: string;
    color: string;
  };
  index: number;
  t: (key: string) => string;
}

function ScienceCard({ card, index, t }: ScienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7 + index * 0.1 }}
      className="flex-shrink-0 w-72 snap-center"
    >
      <div className="bg-white rounded-2xl border border-secondary-200 overflow-hidden shadow-sm h-full">
        {/* Header gradient */}
        <div className={`bg-gradient-to-r ${card.color} p-4 flex items-center gap-3`}>
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <span className="text-2xl">{card.visual}</span>
          </div>
          <div className="text-white">
            <p className="text-xs opacity-80">{t('results.science.analysisTitle')}</p>
            <h3 className="font-semibold text-sm">{card.title}</h3>
            {card.subtitle && <p className="text-xs opacity-70">{card.subtitle}</p>}
          </div>
        </div>

        {/* Contenu */}
        <div className="p-4">
          <p className="text-sm text-secondary-700 mb-3 leading-relaxed">
            {card.content}
          </p>
          
          {card.action && (
            <div className="p-3 bg-accent-50 rounded-xl border border-accent-200">
              <p className="text-xs text-accent-800 font-medium flex items-start gap-2">
                <Target className="w-4 h-4 flex-shrink-0 mt-0.5" />
                {card.action}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ===================
// MÉTHODE LOC
// ===================

function LOCMethodExplainer({ porosity, t }: { porosity: string; t: (key: string) => string }) {
  const isHighPorosity = porosity.includes('Forte');
  const method = isHighPorosity ? t('results.science.locMethod.lco') : t('results.science.locMethod.loc');
  
  const steps = isHighPorosity
    ? [t('results.science.locMethod.liquid'), t('results.science.locMethod.cream'), t('results.science.locMethod.oil')]
    : [t('results.science.locMethod.liquid'), t('results.science.locMethod.oil'), t('results.science.locMethod.cream')];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9 }}
      className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-amber-50 rounded-2xl border border-primary-100"
    >
      <div className="flex items-center gap-2 mb-3">
        <Droplet className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-secondary-900">
          {t('results.science.locMethod.title')} : {method}
        </h3>
      </div>

      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm
                ${index === 0 ? 'bg-sky-500' : index === 1 ? 'bg-amber-500' : 'bg-purple-500'}
              `}>
                {index + 1}
              </div>
              <p className="text-xs text-secondary-600 mt-1 text-center">{step}</p>
            </div>
            {index < steps.length - 1 && (
              <ChevronRight className="w-4 h-4 text-secondary-300" />
            )}
          </React.Fragment>
        ))}
      </div>

      <p className="text-xs text-secondary-600 mt-3">
        💡 {isHighPorosity 
          ? t('results.science.locMethod.tipHigh')
          : t('results.science.locMethod.tipLow')}
      </p>
    </motion.div>
  );
}

// ===================
// HELPERS
// ===================

function getActiveExplanation(concern: string, products: ScoredProduct[]): string {
  const treatment = products.find(p => p.step === 'treatment');
  
  const explanations: Record<string, string> = {
    'Chute de Cheveux': `L'huile de Ricin stimule la microcirculation du cuir chevelu et renforce les follicules. Combinée au Romarin, elle favorise une pousse plus dense.`,
    'Pellicules': `La Nigelle (Habba Sawda) possède des propriétés antifongiques naturelles qui assainissent le cuir chevelu et réduisent les pellicules.`,
    'Casse': `Les protéines comblent les brèches dans la fibre capillaire endommagée, renforçant le cheveu de l'intérieur.`,
    'Sécheresse': `L'huile d'Avocat est l'une des rares huiles capables de PÉNÉTRER la fibre capillaire pour une hydratation profonde.`,
    'Pousse Lente': `Le Romarin augmente le flux sanguin vers les follicules, accélérant la phase de croissance (anagène) du cheveu.`,
  };

  return explanations[concern] || 
    `${treatment?.name || 'L\'actif sélectionné'} cible spécifiquement ta préoccupation pour des résultats visibles.`;
}

export default ScienceExplainer;

