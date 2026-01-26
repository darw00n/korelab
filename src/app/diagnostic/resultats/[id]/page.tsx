'use client';

// ============================================
// KORELAB - Page Résultats Diagnostic (historique)
// Affiche les résultats d'un diagnostic passé
// ============================================

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft,
  Sparkles,
  Calendar,
  Droplets,
  Loader2,
  ShoppingBag,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { MobileShell } from '@/components/layout/MobileShell';
import { supabase } from '@/lib/supabase';
import { useCartStore } from '@/store/cartStore';
import { getProductImageUrl } from '@/lib/product-images';

// ===================
// TYPES
// ===================

interface DiagnosticSession {
  id: string;
  created_at: string;
  answers: Record<string, string | string[]>;
  results: {
    texture?: { id: string; name: string };
    porosity?: { id: string; name: string };
    scalp?: { id: string; name: string };
    concerns?: { id: string; name: string }[];
  } | null;
  match_score: number | null;
  is_complete: boolean;
}

interface RecommendedProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  image_url: string | null;
  short_description: string | null;
  category_name?: string;
}

// ===================
// PAGE PRINCIPALE
// ===================

export default function DiagnosticResultsPage() {
  const router = useRouter();
  const params = useParams();
  const diagnosticId = params.id as string;
  
  const { addItem } = useCartStore();
  
  const [diagnostic, setDiagnostic] = useState<DiagnosticSession | null>(null);
  const [products, setProducts] = useState<RecommendedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les données du diagnostic
  useEffect(() => {
    const loadDiagnostic = async () => {
      if (!diagnosticId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Charger le diagnostic
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: diagData, error: diagError } = await (supabase as any)
          .from('diagnostic_sessions')
          .select('*')
          .eq('id', diagnosticId)
          .single();
        
        if (diagError) throw diagError;
        
        if (!diagData) {
          setError('Diagnostic non trouvé');
          return;
        }
        
        setDiagnostic(diagData as DiagnosticSession);
        
        // Charger les produits recommandés (basés sur les textures/concerns)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: productsData } = await (supabase as any)
          .from('products')
          .select(`
            id,
            name,
            slug,
            price,
            image_url,
            short_description,
            categories!inner(name)
          `)
          .eq('is_active', true)
          .limit(6);
        
        if (productsData) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setProducts(productsData.map((p: any) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            price: p.price,
            image_url: p.image_url,
            short_description: p.short_description,
            category_name: p.categories?.name
          })));
        }
      } catch (err) {
        console.error('Erreur chargement diagnostic:', err);
        setError('Erreur lors du chargement');
      } finally {
        setIsLoading(false);
      }
    };

    loadDiagnostic();
  }, [diagnosticId]);

  // Ajouter au panier
  const handleAddToCart = (product: RecommendedProduct) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image_url: product.image_url,
      product_type: 'treatment',
      product_subtype: 'oil',
      stock_quantity: 100,
      is_available: true,
    } as any, 1);
  };

  // Loading
  if (isLoading) {
    return (
      <MobileShell showHeader={false} showBottomNav={true}>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-science-900 animate-spin" />
        </div>
      </MobileShell>
    );
  }

  // Erreur
  if (error || !diagnostic) {
    return (
      <MobileShell showHeader={false} showBottomNav={true}>
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="font-mono font-bold text-lg text-science-900 mb-2">
            {error || 'Diagnostic non trouvé'}
          </h2>
          <p className="font-sans text-sm text-text-secondary mb-6 text-center">
            Ce diagnostic n'existe pas ou vous n'y avez pas accès.
          </p>
          <Link href="/profil" className="btn-primary">
            Retour au profil
          </Link>
        </div>
      </MobileShell>
    );
  }

  const date = new Date(diagnostic.created_at);
  const formattedDate = date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <MobileShell showHeader={false} showBottomNav={true}>
      <div className="min-h-screen bg-white pb-24">
        {/* Header */}
        <div className="bg-science-900 px-4 pt-6 pb-10">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-mono font-bold text-lg uppercase tracking-wider text-white">
              Résultats
            </h1>
          </div>

          {/* Info */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-mono font-bold text-white">
                Diagnostic capillaire
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-3 h-3 text-white/60" />
                <span className="font-sans text-sm text-white/70">
                  {formattedDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="px-4 -mt-6">
          {/* Profil capillaire */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-4 mb-6"
          >
            <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-science-900 mb-4">
              Votre Profil Capillaire
            </h3>

            {diagnostic.results ? (
              <div className="space-y-3">
                {diagnostic.results.texture && (
                  <ProfileItem 
                    label="Texture" 
                    value={diagnostic.results.texture.name} 
                  />
                )}
                {diagnostic.results.porosity && (
                  <ProfileItem 
                    label="Porosité" 
                    value={diagnostic.results.porosity.name} 
                  />
                )}
                {diagnostic.results.scalp && (
                  <ProfileItem 
                    label="Type de cuir chevelu" 
                    value={diagnostic.results.scalp.name} 
                  />
                )}
                {diagnostic.results.concerns && diagnostic.results.concerns.length > 0 && (
                  <div className="pt-2 border-t border-slate-100">
                    <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                      Préoccupations
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {diagnostic.results.concerns.map((concern) => (
                        <span 
                          key={concern.id}
                          className="px-2 py-1 bg-science-100 text-science-900 font-mono text-xs rounded"
                        >
                          {concern.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="font-sans text-sm text-text-secondary">
                Données du profil non disponibles
              </p>
            )}

            {diagnostic.match_score && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                    Score de correspondance
                  </span>
                  <span className="font-mono font-bold text-lg text-success-700">
                    {diagnostic.match_score}%
                  </span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Produits recommandés */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-science-900 mb-4">
              Produits Recommandés
            </h3>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    onAddToCart={() => handleAddToCart(product)}
                  />
                ))}
              </div>
            ) : (
              <div className="card p-6 text-center">
                <ShoppingBag className="w-8 h-8 text-text-muted mx-auto mb-2" />
                <p className="font-sans text-sm text-text-secondary">
                  Aucun produit recommandé
                </p>
              </div>
            )}
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <Link
              href="/diagnostic"
              className="btn-primary w-full py-4 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Refaire un diagnostic</span>
            </Link>
            
            <Link
              href="/shop"
              className="btn-secondary w-full py-4 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Voir tous les produits</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </MobileShell>
  );
}

// ===================
// COMPOSANTS
// ===================

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
        {label}
      </span>
      <span className="font-sans text-sm font-medium text-science-900">
        {value}
      </span>
    </div>
  );
}

interface ProductCardProps {
  product: RecommendedProduct;
  onAddToCart: () => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getProductImageUrl({ 
    slug: product.slug, 
    name: product.name, 
    image_url: product.image_url 
  });
  
  return (
    <div className="card overflow-hidden">
      {/* Image */}
      <div className="aspect-square bg-slate-100 relative">
        {!imageError && imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Droplets className="w-8 h-8 text-slate-300" />
          </div>
        )}
      </div>
      
      {/* Info */}
      <div className="p-3">
        <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-1">
          {product.category_name || 'Produit'}
        </p>
        <h4 className="font-sans font-medium text-sm text-science-900 line-clamp-2 mb-2">
          {product.name}
        </h4>
        <div className="flex items-center justify-between">
          <span className="font-mono font-bold text-sm text-science-900">
            {product.price} DH
          </span>
          <button
            onClick={onAddToCart}
            className="p-2 bg-science-900 text-white rounded hover:bg-science-800 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
