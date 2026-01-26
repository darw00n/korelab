'use client';

// ============================================
// KORELAB - Routine Reveal (Science Snap)
// Affichage des résultats avec style clinique
// ============================================

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useDiagnosticStore } from '@/store/diagnosticStore';
import { useTranslation } from '@/lib/i18n/context';
import { useCartStore } from '@/store/cartStore';
import type { ScoredProduct } from '@/types/database.types';

export function RoutineReveal() {
  const { results } = useDiagnosticStore();
  const { t } = useTranslation();
  const addToCart = useCartStore((state) => state.addItem);

  if (!results) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="font-mono text-sm uppercase tracking-wider text-text-secondary">{t('common.error')}</p>
      </div>
    );
  }

  const { products, matchScore, finalPrice, totalPrice, discountAmount, profile } = results;

  // Ajouter tous les produits au panier
  const handleAddToCart = () => {
    products.forEach((product) => {
      addToCart(product, 1);
    });
    window.location.href = '/panier';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* En-tête Bleu Nuit (tiers haut de l'écran) */}
      <div className="h-[33vh] bg-science-900 text-white relative">
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-accent-400 mb-4">
              ANALYSE COMPLÈTE
            </p>
            <h1 className="font-mono text-2xl font-bold uppercase tracking-wider mb-2">
              PROTOCOLE PERSONNALISÉ
            </h1>
            <p className="font-sans text-sm text-slate-300">
              {profile.texture} • {profile.porosity} • {profile.scalpType}
            </p>
            {profile.concerns.length > 0 && (
              <p className="font-sans text-xs text-slate-400 mt-2">
                Cibles: {profile.concerns.join(', ')}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Carte Résultat (Blanche) - Chevauche l'en-tête */}
      <div className="relative -mt-16 mx-4 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          {/* Label Solution Scientifique */}
          <div className="mb-4">
            <span className="badge badge-accent mb-2">SOLUTION SCIENTIFIQUE</span>
            <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-science-900 mt-2">
              ROUTINE COMPLÈTE
            </h2>
          </div>

          {/* Encart Mécanisme d'action */}
          <div className="mb-6 p-4 bg-slate-50 border-l-4 border-science-900">
            <p className="font-mono text-xs uppercase tracking-wider text-science-900 mb-2">
              MÉCANISME D'ACTION
            </p>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              Protocole basé sur l'analyse de la porosité capillaire et la compatibilité moléculaire. 
              Chaque produit cible un marqueur biologique spécifique pour une efficacité optimale.
            </p>
          </div>

          {/* Liste des produits (Step-by-step) */}
          <div className="space-y-4 mb-6">
            {products.map((product, index) => (
              <ProductItem
                key={product.id}
                product={product}
                stepNumber={index + 1}
                delay={0.3 + index * 0.1}
              />
            ))}
          </div>

          {/* Preuve sociale */}
          <div className="p-4 bg-success-50 border border-success-200 rounded-md">
            <p className="font-mono text-xs uppercase tracking-wider text-success-800 mb-1">
              EFFICACITÉ PROUVÉE
            </p>
            <p className="font-sans text-sm text-success-700">
              92% Satisfaction • Score de compatibilité: {matchScore}%
            </p>
          </div>
        </motion.div>
      </div>

      {/* CTA Sticky */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-lg z-40"
      >
        <div className="max-w-md mx-auto">
          {/* Prix */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-text-secondary mb-1">
                TOTAL
              </p>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xl font-bold text-science-900">{finalPrice} DH</span>
                <span className="font-mono text-sm text-text-muted line-through">{totalPrice} DH</span>
              </div>
            </div>
            <div className="badge badge-success">
              -{discountAmount} DH
            </div>
          </div>

          {/* Bouton CTA */}
          <button
            onClick={handleAddToCart}
            className="btn-primary w-full py-4 flex items-center justify-center gap-2"
          >
            COMMANDER LE PROTOCOLE
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ===================
// PRODUCT ITEM
// ===================

interface ProductItemProps {
  product: ScoredProduct;
  stepNumber: number;
  delay: number;
}

function ProductItem({ product, stepNumber, delay }: ProductItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex gap-3 p-3 border border-slate-200 rounded-md"
    >
      {/* Numéro */}
      <div className="flex-shrink-0 w-8 h-8 bg-science-900 text-white rounded-sm flex items-center justify-center">
        <span className="font-mono text-xs font-bold">
          {String(stepNumber).padStart(2, '0')}
        </span>
      </div>

      {/* Infos produit */}
      <div className="flex-1 min-w-0">
        <h3 className="font-mono font-bold text-sm text-science-900 mb-1">
          {product.name}
        </h3>
        <p className="font-sans text-xs text-text-secondary mb-2 line-clamp-2">
          {product.short_description || product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-mono font-bold text-sm text-science-900">
            {product.price} DH
          </span>
          {product.reason && (
            <span className="font-sans text-xs text-text-muted italic">
              {product.reason}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default RoutineReveal;
