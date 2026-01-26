'use client';

// ============================================
// KORELAB - Routine Tutorial (Science Snap)
// Tutoriel de routine quotidienne avec guide jour/nuit
// ============================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Droplets, Lock, Sparkles, ShoppingCart, Check } from 'lucide-react';
import { useDiagnosticStore } from '@/store/diagnosticStore';
import { useTranslation } from '@/lib/i18n/context';
import { useCartStore } from '@/store/cartStore';
import { getProductImageUrl } from '@/lib/product-images';
import type { ScoredProduct } from '@/types/database.types';

export function RoutineTutorial() {
  const { results } = useDiagnosticStore();
  const { t } = useTranslation();
  const addToCart = useCartStore((state) => state.addItem);
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());

  if (!results) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="font-mono text-sm uppercase tracking-wider text-text-secondary">{t('common.error')}</p>
      </div>
    );
  }

  const { products, matchScore, profile } = results;

  // Grouper les produits par catégorie
  const productsByCategory = {
    cleanser: products.filter(p => p.product_type === 'cleanser'),
    treatment: products.filter(p => p.product_type === 'treatment'),
    finish: products.filter(p => p.product_type === 'finish'),
  };

  // Ajouter un produit au panier
  const handleAddProduct = (product: ScoredProduct) => {
    addToCart(product, 1);
    setAddedProducts(prev => new Set([...prev, product.id]));
  };

  // Ajouter tous les produits au panier
  const handleAddAll = () => {
    products.forEach(product => {
      addToCart(product, 1);
      setAddedProducts(prev => new Set([...prev, product.id]));
    });
  };

  // Identifier les produits par type
  const cleanser = products.find(p => p.product_type === 'cleanser');
  const treatment = products.find(p => p.product_type === 'treatment');
  const finish = products.find(p => p.product_type === 'finish');

  return (
    <div className="min-h-screen bg-white pb-32" style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
      {/* En-tête Bleu Nuit */}
      <div className="h-[33vh] bg-science-900 text-white relative flex-shrink-0">
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
              TA ROUTINE QUOTIDIENNE
            </h1>
            <p className="font-sans text-sm text-slate-300">
              Basée sur ton profil: {profile.texture} • {profile.porosity} • {profile.scalpType}
            </p>
            {profile.concerns.length > 0 && (
              <p className="font-sans text-xs text-slate-400 mt-2">
                Cibles: {profile.concerns.join(', ')}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Carte Résultat - Chevauche l'en-tête */}
      <div className="relative -mt-16 mx-4 mb-6">
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
              PROTOCOLE PERSONNALISÉ
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
        </motion.div>
      </div>

      {/* Contenu scrollable */}
      <div className="px-4 space-y-6 pb-8">
        {/* Section Matin */}
        <RoutineSection
          title="MATIN"
          icon={<Clock className="w-5 h-5" />}
          timing="Au réveil / Avant de sortir"
          cleanser={cleanser}
          finish={finish}
          profile={profile}
          delay={0.3}
        />

        {/* Section Après-midi */}
        <RoutineSection
          title="APRÈS-MIDI"
          icon={<Droplets className="w-5 h-5" />}
          timing="Après le sport / Rafraîchissement"
          isOptional={true}
          finish={finish}
          profile={profile}
          delay={0.4}
        />

        {/* Section Soir */}
        <RoutineSection
          title="SOIR"
          icon={<Lock className="w-5 h-5" />}
          timing="Avant de se coucher"
          treatment={treatment}
          profile={profile}
          delay={0.5}
        />

        {/* Section Hebdomadaire */}
        <RoutineWeekly
          cleanser={cleanser}
          treatment={treatment}
          profile={profile}
          delay={0.6}
        />

        {/* Partie Éducative */}
        <EducationalSection
          profile={profile}
          products={products}
          delay={0.7}
        />

        {/* Produits Recommandés par Catégorie */}
        <ProductsSection
          productsByCategory={productsByCategory}
          matchScore={matchScore}
          addedProducts={addedProducts}
          onAddProduct={handleAddProduct}
          onAddAll={handleAddAll}
          delay={0.8}
        />
      </div>
    </div>
  );
}

// ===================
// ROUTINE SECTION (Matin/Après-midi/Soir)
// ===================

interface RoutineSectionProps {
  title: string;
  icon: React.ReactNode;
  timing: string;
  cleanser?: ScoredProduct;
  treatment?: ScoredProduct;
  finish?: ScoredProduct;
  profile: any;
  isOptional?: boolean;
  delay: number;
}

function RoutineSection({
  title,
  icon,
  timing,
  cleanser,
  treatment,
  finish,
  profile,
  isOptional,
  delay,
}: RoutineSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card p-4"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-science-900 text-white rounded-sm flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="font-mono font-bold text-lg uppercase tracking-wider text-science-900">
            {title}
          </h3>
          <p className="font-sans text-xs text-text-secondary">{timing}</p>
        </div>
        {isOptional && (
          <span className="badge badge-accent ml-auto">OPTIONNEL</span>
        )}
      </div>

      {/* Étapes */}
      <div className="space-y-4">
        {/* Nettoyage (Matin uniquement) */}
        {cleanser && title === 'MATIN' && (
          <RoutineStep
            stepNumber={1}
            label="NETTOYAGE"
            frequency="2-3x/semaine"
            product={cleanser}
            quantity="1 noisette"
            instructions="Masser le cuir chevelu, rincer abondamment"
          />
        )}

        {/* Hydratation (Matin/Après-midi) */}
        {finish && (title === 'MATIN' || title === 'APRÈS-MIDI') && (
          <RoutineStep
            stepNumber={title === 'MATIN' ? (cleanser ? 2 : 1) : 1}
            label="HYDRATATION"
            frequency={title === 'MATIN' ? 'Quotidien' : 'Si nécessaire'}
            product={finish}
            quantity={finish.product_subtype === 'gel' ? '2-3 cuillères à soupe' : '2-3 gouttes'}
            instructions="Appliquer sur cheveux humides, longueurs et pointes"
          />
        )}

        {/* Scellage (Matin si porosité forte) */}
        {finish && title === 'MATIN' && profile.porosity?.toLowerCase().includes('fort') && (
          <RoutineStep
            stepNumber={cleanser ? 3 : 2}
            label="SCELLAGE"
            frequency="Quotidien"
            product={finish}
            quantity={finish.product_subtype === 'butter' ? 'Noisette' : 'Quelques gouttes'}
            instructions="Appliquer en dernier, sur les pointes uniquement"
          />
        )}

        {/* Traitement (Soir) */}
        {treatment && title === 'SOIR' && (
          <RoutineStep
            stepNumber={1}
            label="TRAITEMENT"
            frequency="2-3x/semaine"
            product={treatment}
            quantity={treatment.product_subtype === 'oil' ? 'Selon produit' : 'Selon instructions'}
            instructions="Bain d'huile ou masque, laisser poser 1h minimum ou toute la nuit"
          />
        )}

        {/* Protection (Soir) */}
        {title === 'SOIR' && (
          <RoutineStep
            stepNumber={treatment ? 2 : 1}
            label="PROTECTION"
            frequency="Quotidien"
            product={null}
            quantity="Bonnet satin ou foulard"
            instructions="Protège les cheveux pendant le sommeil"
          />
        )}
      </div>
    </motion.div>
  );
}

// ===================
// ROUTINE STEP
// ===================

interface RoutineStepProps {
  stepNumber: number;
  label: string;
  frequency: string;
  product: ScoredProduct | null;
  quantity: string;
  instructions: string;
}

function RoutineStep({ stepNumber, label, frequency, product, quantity, instructions }: RoutineStepProps) {
  const imageUrl = product ? getProductImageUrl(product) : null;
  
  return (
    <div className="p-3 border border-slate-200 rounded-md">
      <div className="flex items-start gap-3">
        {/* Numéro ou Image */}
        {imageUrl ? (
          <div className="flex-shrink-0 w-12 h-12 bg-slate-100 rounded-md overflow-hidden">
            <img
              src={imageUrl}
              alt={product?.name || label}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="flex-shrink-0 w-6 h-6 bg-science-900 text-white rounded-sm flex items-center justify-center">
            <span className="font-mono text-xs font-bold">{stepNumber}</span>
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono font-bold text-sm text-science-900">{label}</span>
            <span className="badge text-[10px]">{frequency}</span>
          </div>
          {product && (
            <p className="font-mono text-xs text-science-900 mb-1">{product.name}</p>
          )}
          <p className="font-sans text-xs text-text-secondary mb-1">
            <strong>Quantité:</strong> {quantity}
          </p>
          <p className="font-sans text-xs text-text-secondary">
            → {instructions}
          </p>
        </div>
      </div>
    </div>
  );
}

// ===================
// ROUTINE WEEKLY
// ===================

interface RoutineWeeklyProps {
  cleanser?: ScoredProduct;
  treatment?: ScoredProduct;
  profile: any;
  delay: number;
}

function RoutineWeekly({ cleanser, treatment, profile, delay }: RoutineWeeklyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card p-4"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-accent-500 text-white rounded-sm flex items-center justify-center">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-mono font-bold text-lg uppercase tracking-wider text-science-900">
            HEBDOMADAIRE
          </h3>
          <p className="font-sans text-xs text-text-secondary">1-2x par semaine</p>
        </div>
      </div>

      <div className="space-y-4">
        {cleanser && (
          <RoutineStep
            stepNumber={1}
            label="NETTOYAGE PROFOND"
            frequency="1-2x/semaine"
            product={cleanser}
            quantity="Selon produit"
            instructions="Masque sur cuir chevelu, laisser poser 10 min"
          />
        )}
        {treatment && (
          <RoutineStep
            stepNumber={2}
            label="MASQUE RÉPARATEUR"
            frequency="1-2x/semaine"
            product={treatment}
            quantity="Selon produit"
            instructions="Bain d'huile ou masque, laisser poser 30 min à 2h"
          />
        )}
      </div>
    </motion.div>
  );
}

// ===================
// EDUCATIONAL SECTION
// ===================

interface EducationalSectionProps {
  profile: any;
  products: ScoredProduct[];
  delay: number;
}

function EducationalSection({ profile, products, delay }: EducationalSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card p-6"
    >
      <h3 className="font-mono font-bold text-lg uppercase tracking-wider text-science-900 mb-4">
        📚 COMPRENDRE TA ROUTINE
      </h3>

      {/* Explication Porosité */}
      <div className="mb-6 p-4 bg-slate-50 border-l-4 border-science-900">
        <p className="font-mono text-xs uppercase tracking-wider text-science-900 mb-2">
          TA POROSITÉ: {profile.porosity}
        </p>
        <p className="font-sans text-sm text-text-secondary leading-relaxed">
          {profile.porosity?.toLowerCase().includes('faible') && 
            'Tes cheveux ont des cuticules fermées. Ils repoussent l\'eau, donc les produits légers (huiles légères) pénètrent mieux.'}
          {profile.porosity?.toLowerCase().includes('moyenne') && 
            'Tes cheveux ont une porosité équilibrée. Tu peux utiliser la plupart des produits avec la méthode LOC classique.'}
          {profile.porosity?.toLowerCase().includes('forte') && 
            'Tes cheveux ont des cuticules ouvertes. Ils absorbent vite mais perdent l\'hydratation. Tu as besoin de scellants lourds (beurres) et de protéines.'}
        </p>
      </div>

      {/* Méthode LOC/LCO */}
      <div className="mb-6">
        <p className="font-mono text-xs uppercase tracking-wider text-science-900 mb-3">
          MÉTHODE LOC/LCO PERSONNALISÉE
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-sm text-science-900 w-8">L</span>
            <span className="font-sans text-sm text-text-secondary">Liquid (Gel Aloe ou eau)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-sm text-science-900 w-8">O</span>
            <span className="font-sans text-sm text-text-secondary">Oil (Huile selon porosité)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-sm text-science-900 w-8">C</span>
            <span className="font-sans text-sm text-text-secondary">
              Cream (Beurre si porosité forte)
            </span>
          </div>
        </div>
      </div>

      {/* Pourquoi chaque produit */}
      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-science-900 mb-3">
          POURQUOI CES PRODUITS
        </p>
        <div className="space-y-3">
          {products.map((product, index) => (
            <div key={product.id} className="p-3 bg-slate-50 rounded-md">
              <p className="font-mono font-bold text-sm text-science-900 mb-1">
                {product.name}
              </p>
              {product.reason && (
                <p className="font-sans text-xs text-text-secondary">
                  {product.reason}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ===================
// PRODUCTS SECTION
// ===================

interface ProductsSectionProps {
  productsByCategory: {
    cleanser: ScoredProduct[];
    treatment: ScoredProduct[];
    finish: ScoredProduct[];
  };
  matchScore: number;
  addedProducts: Set<string>;
  onAddProduct: (product: ScoredProduct) => void;
  onAddAll: () => void;
  delay: number;
}

function ProductsSection({ 
  productsByCategory, 
  matchScore, 
  addedProducts,
  onAddProduct,
  onAddAll,
  delay 
}: ProductsSectionProps) {
  const allProducts = [
    ...productsByCategory.cleanser,
    ...productsByCategory.treatment,
    ...productsByCategory.finish,
  ];

  const allAdded = allProducts.every(p => addedProducts.has(p.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono font-bold text-lg uppercase tracking-wider text-science-900">
          PRODUITS RECOMMANDÉS
        </h3>
        {allProducts.length > 0 && (
          <button
            onClick={onAddAll}
            disabled={allAdded}
            className={`
              btn-secondary text-xs py-2 px-3 flex items-center gap-2
              ${allAdded ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {allAdded ? (
              <>
                <Check className="w-4 h-4" />
                TOUS AJOUTÉS
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                AJOUTER TOUT
              </>
            )}
          </button>
        )}
      </div>

      {/* Produits par catégorie */}
      <div className="space-y-6">
        {/* NETTOYANTS */}
        {productsByCategory.cleanser.length > 0 && (
          <ProductCategory
            title="NETTOYANTS"
            products={productsByCategory.cleanser}
            addedProducts={addedProducts}
            onAddProduct={onAddProduct}
          />
        )}

        {/* TRAITEMENTS */}
        {productsByCategory.treatment.length > 0 && (
          <ProductCategory
            title="TRAITEMENTS"
            products={productsByCategory.treatment}
            addedProducts={addedProducts}
            onAddProduct={onAddProduct}
          />
        )}

        {/* FINITIONS */}
        {productsByCategory.finish.length > 0 && (
          <ProductCategory
            title="FINITIONS"
            products={productsByCategory.finish}
            addedProducts={addedProducts}
            onAddProduct={onAddProduct}
          />
        )}
      </div>

      <div className="p-4 bg-success-50 border border-success-200 rounded-md mt-6">
        <p className="font-mono text-xs uppercase tracking-wider text-success-800 mb-1">
          EFFICACITÉ PROUVÉE
        </p>
        <p className="font-sans text-sm text-success-700">
          92% Satisfaction • Score de compatibilité: {matchScore}%
        </p>
      </div>
    </motion.div>
  );
}

// ===================
// PRODUCT CATEGORY
// ===================

interface ProductCategoryProps {
  title: string;
  products: ScoredProduct[];
  addedProducts: Set<string>;
  onAddProduct: (product: ScoredProduct) => void;
}

function ProductCategory({ title, products, addedProducts, onAddProduct }: ProductCategoryProps) {
  return (
    <div>
      <h4 className="font-mono font-bold text-sm uppercase tracking-wider text-text-secondary mb-3">
        {title}
      </h4>
      <div className="space-y-3">
        {products.map((product) => {
          const isAdded = addedProducts.has(product.id);
          const imageUrl = getProductImageUrl(product);
          return (
            <div key={product.id} className="flex gap-3 p-3 border border-slate-200 rounded-md">
              {/* Image produit */}
              <div className="flex-shrink-0 w-16 h-16 bg-slate-100 rounded-md flex items-center justify-center overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-science-900 text-white rounded-sm flex items-center justify-center">
                    <span className="font-mono text-xs font-bold">
                      {product.step === 'cleanser' ? '01' : product.step === 'treatment' ? '02' : '03'}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono font-bold text-sm text-science-900 mb-1">
                  {product.name}
                </p>
                <p className="font-sans text-xs text-text-secondary mb-2 line-clamp-2">
                  {product.short_description || product.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-mono font-bold text-sm text-science-900">
                    {product.price} DH
                  </p>
                  <button
                    onClick={() => onAddProduct(product)}
                    disabled={isAdded}
                    className={`
                      btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5
                      ${isAdded ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3 h-3" />
                        AJOUTÉ
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3 h-3" />
                        AJOUTER
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RoutineTutorial;
