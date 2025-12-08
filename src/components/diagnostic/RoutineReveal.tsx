'use client';

// ============================================
// KORELAB - Routine Reveal (HAIR CARE)
// Affichage des résultats avec Cleanse/Treat/Seal
// ============================================

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ShoppingCart, 
  Droplets, 
  FlaskConical, 
  Lock,
  Star,
  Info,
  MessageCircle
} from 'lucide-react';
import { useDiagnosticStore } from '@/store/diagnosticStore';
import { useTranslation } from '@/lib/i18n/context';
import type { ScoredProduct } from '@/types/database.types';
import { ScienceExplainer } from './ScienceExplainer';

// ===================
// CONFIGURATION DES ÉTAPES
// ===================

const STEP_CONFIG: Record<string, {
  icon: React.ReactNode;
  label: string;
  labelEn: string;
  description: string;
  color: string;
}> = {
  'cleanser': {
    icon: <Droplets className="w-5 h-5" />,
    label: 'LAVER',
    labelEn: 'CLEANSE',
    description: 'Nettoyer le cuir chevelu',
    color: 'from-sky-400 to-blue-500',
  },
  'treatment': {
    icon: <FlaskConical className="w-5 h-5" />,
    label: 'TRAITER',
    labelEn: 'TREAT',
    description: 'Cibler les problèmes',
    color: 'from-purple-400 to-violet-500',
  },
  'finish': {
    icon: <Lock className="w-5 h-5" />,
    label: 'SCELLER',
    labelEn: 'SEAL',
    description: 'Retenir l\'hydratation',
    color: 'from-amber-400 to-orange-500',
  },
};

export function RoutineReveal() {
  const { results } = useDiagnosticStore();
  const { t, dir } = useTranslation();

  if (!results) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-secondary-500">{t('common.error')}</p>
      </div>
    );
  }

  const { products, matchScore, finalPrice, totalPrice, discountAmount, profile } = results;

  return (
    <div className="min-h-full pb-32" dir={dir}>
      {/* Header avec score */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        {/* Badge de match */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent-50 border border-accent-200 rounded-full mb-4"
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-accent font-semibold">{t('results.matchBadge')} {matchScore}%</span>
        </motion.div>

        {/* Titre */}
        <h1 className="text-2xl font-bold text-secondary-900 mb-2 font-playfair">
          {t('results.title')} ✨
        </h1>
        
        {/* Profil résumé */}
        <p className="text-secondary-600 text-sm">
          {t('results.forHair')} <strong>{profile.texture}</strong> • {t('results.porosity')} <strong>{profile.porosity}</strong>
        </p>
      </motion.div>

      {/* Liste des produits */}
      <div className="space-y-4 mb-8">
        {products.map((product, index) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            stepNumber={index + 1}
            delay={0.3 + index * 0.15}
            t={t}
          />
        ))}
      </div>

      {/* Section Science */}
      <ScienceExplainer 
        profile={profile}
        products={products}
      />

      {/* Sticky Footer */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-secondary-200 p-4 shadow-lg z-40"
      >
        <div className="max-w-md mx-auto">
          {/* Prix */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-secondary-500">{t('results.footer.totalLabel')}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-secondary-900">{finalPrice} MAD</span>
                <span className="text-sm text-secondary-400 line-through">{totalPrice} MAD</span>
              </div>
            </div>
            <div className="px-3 py-1 bg-accent-50 rounded-full">
              <span className="text-accent font-semibold text-sm">-{discountAmount} MAD</span>
            </div>
          </div>

          {/* Bouton CTA */}
          <button className="w-full py-4 bg-primary hover:bg-primary-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/30 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {t('results.footer.addToCart')} ({t('results.footer.discountPercent')})
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ===================
// CARTE PRODUIT
// ===================

interface ProductCardProps {
  product: ScoredProduct;
  stepNumber: number;
  delay: number;
  t: (key: string) => string;
}

function ProductCard({ product, stepNumber, delay, t }: ProductCardProps) {
  // Mapper step aux clés de traduction
  const stepKeys: Record<string, string> = {
    'cleanser': 'cleanse',
    'treatment': 'treat',
    'finish': 'seal',
  };
  const stepKey = stepKeys[product.step] || 'treat';
  
  const config = STEP_CONFIG[product.step] || STEP_CONFIG['treatment'];
  
  // Calcul du pourcentage de match individuel
  const productMatch = Math.min(100, Math.round(60 + (product.score / 30) * 40));

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="bg-white rounded-2xl border border-secondary-200 overflow-hidden shadow-sm"
    >
      {/* Header de l'étape */}
      <div className={`bg-gradient-to-r ${config.color} px-4 py-2 flex items-center gap-2`}>
        <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-white text-sm font-bold">
          {stepNumber}
        </span>
        <span className="text-white font-semibold text-sm">{t(`results.steps.${stepKey}.label`)}</span>
        <span className="text-white/70 text-xs">• {t(`results.steps.${stepKey}.labelEn`)}</span>
      </div>

      {/* Contenu produit */}
      <div className="p-4">
        <div className="flex gap-4">
          {/* Image placeholder */}
          <div className="w-20 h-20 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center text-white`}>
              {config.icon}
            </div>
          </div>

          {/* Infos produit */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-secondary-900 mb-1 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-secondary-500 mb-2 line-clamp-1">
              {product.short_description}
            </p>
            
            {/* Prix et score */}
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary">{product.price} MAD</span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">{productMatch}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Badge "Pourquoi ce produit" */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
          className="mt-3 p-3 bg-primary-50 rounded-xl flex items-start gap-2"
        >
          <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-primary-800">
            {product.reason}
          </p>
        </motion.div>

        {/* Note expert si disponible */}
        {product.expert_note && (
          <div className="mt-2 p-2 bg-amber-50 rounded-lg flex items-start gap-2">
            <MessageCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-800">{product.expert_note}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default RoutineReveal;
