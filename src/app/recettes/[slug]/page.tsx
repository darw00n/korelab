'use client';

// ============================================
// KORELAB - Recipe Detail Page
// View a single DIY recipe with all details
// ============================================

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Share2, Heart, HeartOff } from 'lucide-react';
import { MobileShell } from '@/components/layout/MobileShell';
import { RecipeDetail } from '@/components/recipes';
import type { RecipeWithDetails } from '@/types/database.types';

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [recipe, setRecipe] = useState<RecipeWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // Fetch recipe details
  useEffect(() => {
    async function fetchRecipe() {
      if (!slug) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/recipes/${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Recette non trouvée');
          }
          throw new Error('Erreur lors du chargement');
        }

        const data = await response.json();
        setRecipe(data.recipe);
      } catch (err: any) {
        console.error('Error fetching recipe:', err);
        setError(err.message || 'Impossible de charger la recette');
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecipe();
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share && recipe) {
      try {
        await navigator.share({
          title: recipe.name,
          text: recipe.short_description || recipe.description,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share not supported
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié !');
    }
  };

  const handleSave = () => {
    // Toggle saved state (in real app, would save to backend)
    setIsSaved(!isSaved);
  };

  if (isLoading) {
    return (
      <MobileShell showHeader={false} showBottomNav={false}>
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 text-accent-500 animate-spin mb-4" />
          <p className="font-mono text-sm text-text-secondary">Chargement de la recette...</p>
        </div>
      </MobileShell>
    );
  }

  if (error || !recipe) {
    return (
      <MobileShell showHeader={false} showBottomNav={false}>
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
          <p className="font-mono text-lg text-red-600 mb-4">{error || 'Recette non trouvée'}</p>
          <button
            onClick={() => router.push('/recettes')}
            className="btn-secondary"
          >
            Retour aux recettes
          </button>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell showHeader={false} showBottomNav={false}>
      <div className="min-h-screen bg-white">
        {/* Sticky Header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-text-secondary hover:text-science-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-mono text-sm uppercase tracking-wider">Retour</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className={`p-2 rounded-full transition-colors ${
                  isSaved 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-slate-100 text-text-secondary hover:bg-slate-200'
                }`}
              >
                {isSaved ? (
                  <Heart className="w-5 h-5 fill-current" />
                ) : (
                  <HeartOff className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={handleShare}
                className="p-2 bg-slate-100 text-text-secondary rounded-full hover:bg-slate-200 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Recipe Detail Content */}
        <RecipeDetail recipe={recipe} />

        {/* Sticky CTA */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 safe-area-inset-bottom"
        >
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="font-mono text-xs text-text-muted uppercase">Ingrédients</p>
              <p className="font-mono font-bold text-lg text-science-900">
                {recipe.ingredients.length} produits
              </p>
            </div>
            <button
              onClick={() => router.push('/panier')}
              className="btn-primary py-3 px-6"
            >
              VOIR LE PANIER
            </button>
          </div>
        </motion.div>
      </div>
    </MobileShell>
  );
}
