'use client';

// ============================================
// KORELAB - Page d'Accueil (Science Snap)
// Landing page avec style clinique et technique
// ============================================

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Microscope,
  ArrowRight,
  Activity,
  TrendingUp,
  Beaker,
  Clock,
  Star,
  ShoppingBag,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { MobileShell } from '@/components/layout/MobileShell';
import { Footer } from '@/components/layout/Footer';
import { getProductImageUrl } from '@/lib/product-images';
import type { Recipe } from '@/types/database.types';

// ===================
// PAGE PRINCIPALE
// ===================

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch featured recipes
    fetch('/api/recipes?featured=true')
      .then(res => res.json())
      .then(data => setRecipes(data.recipes?.slice(0, 6) || []))
      .catch(console.error);

    // Fetch featured products from Supabase
    import('@/lib/supabase').then(({ supabase }) => {
      supabase
        .from('products')
        .select('*')
        .eq('is_available', true)
        .limit(8)
        .then(({ data }) => setProducts(data || []));
    });
  }, []);

  return (
    <MobileShell showHeader={true} showBottomNav={true}>
      <div className="min-h-screen bg-white">
        {/* Header avec Logo et Badge BETA */}
        <Header />
        
        <div className="px-4 py-6">
          {/* Hero Section */}
          <HeroSection />

          {/* Preuves (Grid) */}
          <ProofsSection />
        </div>

        {/* Carousel Recettes DIY */}
        <RecipesCarousel recipes={recipes} />

        {/* Carousel Produits */}
        <ProductsCarousel products={products} />

        {/* Footer */}
        <Footer />
      </div>
    </MobileShell>
  );
}

// ===================
// HEADER
// ===================

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Logo KORELAB.SC */}
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-lg text-science-900">
            KORELAB.SC
          </span>
          <span className="badge badge-accent text-[10px]">
            V.2.4 BETA
          </span>
        </div>
      </div>
    </header>
  );
}

// ===================
// HERO SECTION
// ===================

function HeroSection() {
  return (
    <section className="mb-8">
      {/* Badge Diagnostic */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-sm mb-6"
      >
        <Microscope className="w-4 h-4 text-science-900" />
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-science-900">
          DIAGNOSTIC CAPILLAIRE IA
        </span>
      </motion.div>

      {/* Titre */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-mono font-bold uppercase tracking-wider text-science-900 leading-tight mb-4"
      >
        Comprenez la biologie de vos cheveux
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-text-secondary font-sans text-base mb-8 leading-relaxed"
      >
        Analyse de marqueurs biologiques : porosité, sébum, structure capillaire. 
        Protocole personnalisé basé sur des données scientifiques.
      </motion.p>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        {/* Bouton Primaire */}
        <Link
          href="/diagnostic"
          className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base"
        >
          LANCER L'ANALYSE
          <ArrowRight className="w-5 h-5" />
        </Link>

        {/* Bouton Secondaire */}
        <Link
          href="/shop"
          className="btn-ghost w-full flex items-center justify-center gap-2 py-3"
        >
          JE CONNAIS MES PRODUITS
        </Link>
      </motion.div>
    </section>
  );
}

// ===================
// PROOFS SECTION (Grid)
// ===================

function ProofsSection() {
  const proofs = [
    {
      value: '94%',
      label: 'Précision',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      value: '30s',
      label: 'Analyse',
      icon: <Activity className="w-5 h-5" />,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="grid grid-cols-2 gap-3 mb-8"
    >
      {proofs.map((proof, index) => (
        <div
          key={index}
          className="card p-4 text-center"
        >
          <div className="flex items-center justify-center mb-2 text-accent-500">
            {proof.icon}
          </div>
          <p className="font-mono font-bold text-2xl text-science-900 mb-1">
            {proof.value}
          </p>
          <p className="font-mono text-xs uppercase tracking-wider text-text-secondary">
            {proof.label}
          </p>
        </div>
      ))}
    </motion.section>
  );
}

// ===================
// RECIPES CAROUSEL
// ===================

function RecipesCarousel({ recipes }: { recipes: Recipe[] }) {
  if (recipes.length === 0) return null;

  return (
    <section className="py-8 bg-slate-50">
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Beaker className="w-5 h-5 text-green-600" />
            <h2 className="font-mono font-bold text-lg uppercase tracking-wider text-science-900">
              Recettes DIY
            </h2>
          </div>
          <Link 
            href="/recettes" 
            className="flex items-center gap-1 text-sm text-accent-600 font-mono"
          >
            Voir tout <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <p className="text-sm text-text-secondary mt-1">
          Crée tes propres soins naturels
        </p>
      </div>

      {/* Horizontal Scroll */}
      <div className="flex gap-3 overflow-x-auto px-4 pb-4 scrollbar-hide">
        {recipes.map((recipe) => (
          <Link 
            key={recipe.id} 
            href={`/recettes/${recipe.slug}`}
            className="flex-shrink-0 w-64"
          >
            <div className="bg-white rounded-xl p-4 border border-slate-200 hover:border-accent-300 transition-colors h-full">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: `${recipe.color_hex || '#22c55e'}20` }}
              >
                <Beaker className="w-6 h-6" style={{ color: recipe.color_hex || '#22c55e' }} />
              </div>
              <h3 className="font-mono font-bold text-sm text-science-900 mb-1 line-clamp-2">
                {recipe.name}
              </h3>
              <p className="text-xs text-text-muted line-clamp-2 mb-3">
                {recipe.short_description}
              </p>
              <div className="flex items-center gap-3 text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {recipe.prep_time_minutes} min
                </span>
                <span className="flex items-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 ${
                        i < (recipe.difficulty === 'debutant' ? 1 : recipe.difficulty === 'intermediaire' ? 2 : 3) 
                          ? 'text-amber-500 fill-amber-500' 
                          : 'text-slate-200'
                      }`} 
                    />
                  ))}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ===================
// PRODUCTS CAROUSEL
// ===================

function ProductsCarousel({ products }: { products: any[] }) {
  if (products.length === 0) return null;

  return (
    <section className="py-8">
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h2 className="font-mono font-bold text-lg uppercase tracking-wider text-science-900">
              Nos Produits
            </h2>
          </div>
          <Link 
            href="/shop" 
            className="flex items-center gap-1 text-sm text-accent-600 font-mono"
          >
            Boutique <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <p className="text-sm text-text-secondary mt-1">
          Ingrédients 100% naturels du Maroc
        </p>
      </div>

      {/* Horizontal Scroll */}
      <div className="flex gap-3 overflow-x-auto px-4 pb-4 scrollbar-hide">
        {products.map((product) => {
          const imageUrl = getProductImageUrl(product);
          
          return (
            <Link 
              key={product.id} 
              href={`/shop/${product.slug}`}
              className="flex-shrink-0 w-40"
            >
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-accent-300 transition-colors">
                {/* Image */}
                <div className="aspect-square bg-slate-100 relative">
                  {imageUrl ? (
                    <Image 
                      src={imageUrl} 
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-slate-300" />
                    </div>
                  )}
                </div>
                {/* Info */}
                <div className="p-3">
                  <h3 className="font-mono text-xs font-bold text-science-900 line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <p className="font-mono text-sm font-bold text-accent-600">
                    {product.price} DH
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
