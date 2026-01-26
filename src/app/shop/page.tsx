'use client';

// ============================================
// KORELAB - Page Shop (Science Snap)
// Catalogue avec recherche et filtres
// ============================================

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Search,
  ShoppingCart,
  Activity,
  X,
  Sparkles
} from 'lucide-react';
import { MobileShell } from '@/components/layout/MobileShell';
import { useMatchingEngine } from '@/hooks/useMatchingEngine';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { getProductImageUrl } from '@/lib/product-images';
import type { Product } from '@/types/database.types';

// ===================
// TYPES
// ===================

type FilterType = 'TOUS' | 'NETTOYANT' | 'TRAITEMENT' | 'FINITION';
type SubtypeFilter = 'TOUS' | 'HUILES' | 'HYDROLATS' | 'MACERATS' | 'ACTIFS' | 'HE';

// ===================
// PAGE PRINCIPALE
// ===================

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('TOUS');
  const [subtypeFilter, setSubtypeFilter] = useState<SubtypeFilter>('TOUS');
  
  const { products, isLoading, getProductCompatibility } = useMatchingEngine();
  const addToCart = useCartStore((state) => state.addItem);
  const { user } = useAuthStore();
  
  // Profil capillaire de l'utilisateur
  const hairProfile = user?.hairProfile;

  // Filtrage des produits
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = [...products];

    // Filtre par type
    if (activeFilter !== 'TOUS') {
      const filterMap: Record<FilterType, string[]> = {
        'TOUS': [],
        'NETTOYANT': ['cleanser'],
        'TRAITEMENT': ['treatment'],
        'FINITION': ['finish'],
      };
      
      const types = filterMap[activeFilter];
      if (types.length > 0) {
        filtered = filtered.filter(p => types.includes(p.product_type));
      }
    }

    // Filtre par sous-type (uniquement pour traitements)
    if (subtypeFilter !== 'TOUS' && (activeFilter === 'TRAITEMENT' || activeFilter === 'TOUS')) {
      const subtypeMap: Record<SubtypeFilter, string[]> = {
        'TOUS': [],
        'HUILES': ['oil'],
        'HYDROLATS': ['hydrolat'],
        'MACERATS': ['macerat'],
        'ACTIFS': ['active'],
        'HE': ['essential_oil'],
      };
      
      const subtypes = subtypeMap[subtypeFilter];
      if (subtypes.length > 0) {
        filtered = filtered.filter(p => subtypes.includes(p.product_subtype));
      }
    }

    // Recherche texte
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.short_description?.toLowerCase().includes(query) ||
        p.expert_note?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [products, activeFilter, subtypeFilter, searchQuery]);

  const filters: FilterType[] = ['TOUS', 'NETTOYANT', 'TRAITEMENT', 'FINITION'];
  const subtypeFilters: SubtypeFilter[] = ['TOUS', 'HUILES', 'HYDROLATS', 'MACERATS', 'ACTIFS', 'HE'];
  
  // Reset subtype filter when changing main filter
  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    if (filter !== 'TRAITEMENT' && filter !== 'TOUS') {
      setSubtypeFilter('TOUS');
    }
  };

  return (
    <MobileShell showHeader={false} showBottomNav={true}>
      <div className="min-h-screen bg-white">
        {/* Header Sticky */}
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
          <div className="px-4 py-3 space-y-3">
            {/* Bouton Retour */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-science-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-mono text-sm uppercase tracking-wider">Retour Labo</span>
            </Link>

            {/* Barre de recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 pr-10 w-full"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-science-900"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filtres (Scroll Horizontal) */}
          <div className="px-4 pb-3 space-y-2">
            {/* Filtres principaux */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className={`px-4 py-2 rounded-md font-mono text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                    activeFilter === filter
                      ? 'bg-science-900 text-white'
                      : 'bg-white text-text-secondary border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            
            {/* Filtres par sous-type (visible pour Traitements ou Tous) */}
            {(activeFilter === 'TRAITEMENT' || activeFilter === 'TOUS') && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar pt-1">
                {subtypeFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSubtypeFilter(filter)}
                    className={`px-3 py-1.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                      subtypeFilter === filter
                        ? 'bg-accent-500 text-white'
                        : 'bg-slate-100 text-text-secondary hover:bg-slate-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Liste Produits */}
        <main className="px-4 py-4 pb-24">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Activity className="w-8 h-8 text-text-muted animate-pulse mx-auto mb-2" />
                <p className="font-mono text-sm text-text-secondary">CHARGEMENT...</p>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <EmptyState />
          ) : (
            <ProductsList 
              products={filteredProducts} 
              onAddToCart={addToCart} 
              hairProfile={hairProfile}
              getProductCompatibility={getProductCompatibility}
            />
          )}
        </main>
      </div>
    </MobileShell>
  );
}

// ===================
// PRODUCTS LIST (Organisée par catégorie)
// ===================

interface ProductsListProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  hairProfile: any;
  getProductCompatibility: (productId: string, hairProfile: any) => { isRecommended: boolean; score: number; reason?: string };
}

function ProductsList({ products, onAddToCart, hairProfile, getProductCompatibility }: ProductsListProps) {
  // Grouper les produits par catégorie et sous-type
  const productsByCategory = {
    cleanser: products.filter(p => p.product_type === 'cleanser'),
    // Treatments groupés par sous-type
    oils: products.filter(p => p.product_type === 'treatment' && p.product_subtype === 'oil'),
    hydrolats: products.filter(p => p.product_type === 'treatment' && p.product_subtype === 'hydrolat'),
    macerats: products.filter(p => p.product_type === 'treatment' && p.product_subtype === 'macerat'),
    actives: products.filter(p => p.product_type === 'treatment' && p.product_subtype === 'active'),
    essentialOils: products.filter(p => p.product_type === 'treatment' && p.product_subtype === 'essential_oil'),
    // Autres traitements (masques, sérums, etc.)
    otherTreatments: products.filter(p => 
      p.product_type === 'treatment' && 
      !['oil', 'hydrolat', 'macerat', 'active', 'essential_oil'].includes(p.product_subtype)
    ),
    finish: products.filter(p => p.product_type === 'finish'),
  };

  const hasProducts = products.length > 0;

  if (!hasProducts) {
    return <EmptyState />;
  }

  // Helper pour afficher une section
  const renderSection = (title: string, items: Product[], subtitle?: string, warning?: string) => {
    if (items.length === 0) return null;
    return (
      <div>
        <div className="mb-3">
          <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-text-secondary">
            {title}
          </h3>
          {subtitle && (
            <p className="font-sans text-xs text-text-muted mt-1">{subtitle}</p>
          )}
          {warning && (
            <p className="font-sans text-xs text-amber-600 mt-1">{warning}</p>
          )}
        </div>
        <div className="space-y-3">
          {items.map((product, index) => {
            const compatibility = getProductCompatibility(product.id, hairProfile);
            return (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onAddToCart={() => onAddToCart(product, 1)}
                isRecommended={compatibility.isRecommended}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* NETTOYANTS */}
      {renderSection('NETTOYANTS', productsByCategory.cleanser)}

      {/* HUILES VÉGÉTALES */}
      {renderSection(
        'HUILES VÉGÉTALES', 
        productsByCategory.oils,
        'Bains d\'huile & soins cuir chevelu'
      )}

      {/* HYDROLATS */}
      {renderSection(
        'HYDROLATS', 
        productsByCategory.hydrolats,
        'Eaux florales douces - Usage quotidien'
      )}

      {/* MACÉRATS */}
      {renderSection(
        'MACÉRATS', 
        productsByCategory.macerats,
        'Huiles infusées aux plantes actives'
      )}

      {/* ACTIFS */}
      {renderSection(
        'ACTIFS', 
        productsByCategory.actives,
        'Ingrédients fonctionnels à ajouter aux soins'
      )}

      {/* HUILES ESSENTIELLES */}
      {renderSection(
        'HUILES ESSENTIELLES', 
        productsByCategory.essentialOils,
        'Actifs concentrés - Usage expert',
        '⚠️ Interdit femmes enceintes/allaitantes'
      )}

      {/* AUTRES TRAITEMENTS */}
      {renderSection('AUTRES TRAITEMENTS', productsByCategory.otherTreatments)}

      {/* FINITIONS */}
      {renderSection(
        'FINITIONS', 
        productsByCategory.finish,
        'Scellants & leave-in'
      )}
    </div>
  );
}

// ===================
// PRODUCT CARD
// ===================

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: () => void;
  isRecommended?: boolean;
}

function ProductCard({ product, index, onAddToCart, isRecommended }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`card p-3 flex gap-3 relative ${isRecommended ? 'ring-2 ring-accent-500 ring-offset-1' : ''}`}
    >
      {/* Badge Recommandé */}
      {isRecommended && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="flex items-center gap-1 bg-accent-500 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
            <Sparkles className="w-3 h-3" />
            Pour vous
          </div>
        </div>
      )}

      {/* Visuel à gauche */}
      <div className="w-20 h-20 bg-slate-100 rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden">
        {(() => {
          const imageUrl = getProductImageUrl(product);
          return imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <ShoppingCart className="w-8 h-8 text-text-muted" />
          );
        })()}
      </div>

      {/* Infos à droite */}
      <div className="flex-1 min-w-0">
        <h3 className="font-mono font-bold text-sm text-science-900 mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-text-secondary mb-2 line-clamp-1">
          {product.short_description || product.description || 'Produit naturel marocain'}
        </p>
        
        {/* Prix */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-baseline gap-2">
            <span className="font-mono font-bold text-base text-science-900">
              {product.price} DH
            </span>
            {product.compare_at_price && (
              <span className="font-mono text-xs text-text-muted line-through">
                {product.compare_at_price} DH
              </span>
            )}
          </div>
        </div>

        {/* Bouton Ajouter */}
        <button
          onClick={onAddToCart}
          className={`w-full py-2 text-xs ${isRecommended ? 'btn-primary' : 'btn-secondary'}`}
        >
          Ajouter au panier
        </button>
      </div>
    </motion.div>
  );
}

// ===================
// EMPTY STATE
// ===================

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Activity className="w-16 h-16 text-text-muted mb-4" />
      <p className="font-mono text-sm uppercase tracking-wider text-text-secondary mb-1">
        Aucun résultat
      </p>
      <p className="font-sans text-xs text-text-muted text-center max-w-xs">
        Aucun produit ne correspond à votre recherche
      </p>
    </div>
  );
}
