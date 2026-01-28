'use client';

// ============================================
// KORELAB - Recipes Listing Page
// Browse DIY hair care recipes
// ============================================

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Beaker, 
  Filter, 
  Loader2, 
  Sparkles,
  X,
  ChevronDown
} from 'lucide-react';
import { MobileShell } from '@/components/layout/MobileShell';
import { RecipeCard } from '@/components/recipes';
import { useDiagnosticStore } from '@/store/diagnosticStore';
import type { Recipe, RecipeType, RecipeDifficulty } from '@/types/database.types';

// Filter options
const RECIPE_TYPES: { value: RecipeType | ''; label: string }[] = [
  { value: '', label: 'Tous les types' },
  { value: 'spray', label: 'Spray' },
  { value: 'masque', label: 'Masque' },
  { value: 'bain_huile', label: 'Bain d\'huile' },
  { value: 'serum', label: 'Sérum' },
  { value: 'leave_in', label: 'Leave-in' },
  { value: 'beurre', label: 'Beurre' },
  { value: 'pre_poo', label: 'Pré-poo' },
];

const DIFFICULTIES: { value: RecipeDifficulty | ''; label: string }[] = [
  { value: '', label: 'Toutes difficultés' },
  { value: 'debutant', label: '⭐ Débutant' },
  { value: 'intermediaire', label: '⭐⭐ Intermédiaire' },
  { value: 'expert', label: '⭐⭐⭐ Expert' },
];

export default function RecettesPage() {
  const { results } = useDiagnosticStore();
  
  const [recipes, setRecipes] = useState<(Recipe & { matchScore?: number })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [selectedType, setSelectedType] = useState<RecipeType | ''>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<RecipeDifficulty | ''>('');
  const [showFilters, setShowFilters] = useState(false);
  const [useProfile, setUseProfile] = useState(true);

  // Fetch recipes
  useEffect(() => {
    async function fetchRecipes() {
      setIsLoading(true);
      setError(null);

      try {
        // Build query params
        const params = new URLSearchParams();
        
        if (selectedType) params.append('type', selectedType);
        if (selectedDifficulty) params.append('difficulty', selectedDifficulty);
        
        // Add profile data for personalization if available and enabled
        if (useProfile && results?.profile) {
          if (results.profile.porosity) {
            params.append('porosity', results.profile.porosity.toLowerCase());
          }
          if (results.profile.texture) {
            params.append('texture', results.profile.texture.toLowerCase());
          }
          if (results.profile.scalpType) {
            params.append('scalpType', results.profile.scalpType.toLowerCase());
          }
          if (results.profile.concerns?.length) {
            params.append('concerns', results.profile.concerns.join(',').toLowerCase());
          }
        }

        const response = await fetch(`/api/recipes?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }

        const data = await response.json();
        setRecipes(data.recipes || []);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError('Impossible de charger les recettes');
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecipes();
  }, [selectedType, selectedDifficulty, useProfile, results]);

  const hasActiveFilters = selectedType || selectedDifficulty;
  const featuredRecipes = recipes.filter(r => r.is_featured);
  const otherRecipes = recipes.filter(r => !r.is_featured);

  return (
    <MobileShell>
      <div className="min-h-screen bg-slate-50 pb-24">
        {/* Header */}
        <div className="bg-science-900 text-white px-4 pt-6 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-sm flex items-center justify-center">
              <Beaker className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-mono text-xl font-bold uppercase tracking-wider">
                Recettes DIY
              </h1>
              <p className="font-sans text-sm text-slate-300">
                Crée tes propres soins capillaires
              </p>
            </div>
          </div>

          {/* Profile personalization toggle */}
          {results?.profile && (
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-md">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent-400" />
                <span className="font-sans text-sm">Recettes pour mon profil</span>
              </div>
              <button
                onClick={() => setUseProfile(!useProfile)}
                className={`
                  relative w-12 h-6 rounded-full transition-colors
                  ${useProfile ? 'bg-accent-500' : 'bg-white/20'}
                `}
              >
                <div 
                  className={`
                    absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                    ${useProfile ? 'left-7' : 'left-1'}
                  `}
                />
              </button>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-md border transition-colors
                ${hasActiveFilters 
                  ? 'border-accent-500 bg-accent-50 text-accent-700' 
                  : 'border-slate-200 bg-white text-text-secondary'}
              `}
            >
              <Filter className="w-4 h-4" />
              <span className="font-mono text-xs uppercase">Filtres</span>
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-accent-500 text-white rounded-full text-xs flex items-center justify-center">
                  {(selectedType ? 1 : 0) + (selectedDifficulty ? 1 : 0)}
                </span>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Quick clear */}
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSelectedType('');
                  setSelectedDifficulty('');
                }}
                className="p-2 text-text-muted hover:text-text-secondary"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Results count */}
            <span className="ml-auto font-mono text-xs text-text-muted">
              {recipes.length} recette{recipes.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Filter dropdowns */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 space-y-3"
            >
              {/* Type filter */}
              <div>
                <label className="font-mono text-xs text-text-muted uppercase mb-1 block">
                  Type de recette
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as RecipeType | '')}
                  className="w-full p-2 border border-slate-200 rounded-md font-sans text-sm"
                >
                  {RECIPE_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty filter */}
              <div>
                <label className="font-mono text-xs text-text-muted uppercase mb-1 block">
                  Difficulté
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value as RecipeDifficulty | '')}
                  className="w-full p-2 border border-slate-200 rounded-md font-sans text-sm"
                >
                  {DIFFICULTIES.map(diff => (
                    <option key={diff.value} value={diff.value}>{diff.label}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="px-4 py-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-accent-500 animate-spin mb-4" />
              <p className="font-mono text-sm text-text-secondary">Chargement des recettes...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="font-sans text-sm text-red-600">{error}</p>
            </div>
          ) : recipes.length === 0 ? (
            <div className="text-center py-12">
              <Beaker className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="font-mono text-sm text-text-secondary">Aucune recette trouvée</p>
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setSelectedType('');
                    setSelectedDifficulty('');
                  }}
                  className="mt-4 text-accent-600 font-mono text-sm"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Featured recipes */}
              {featuredRecipes.length > 0 && !hasActiveFilters && (
                <div>
                  <h2 className="font-mono font-bold text-sm uppercase tracking-wider text-science-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent-500" />
                    Recettes Populaires
                  </h2>
                  <div className="grid gap-4">
                    {featuredRecipes.map((recipe, index) => (
                      <RecipeCard 
                        key={recipe.id} 
                        recipe={recipe} 
                        delay={index * 0.1}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Other recipes */}
              {otherRecipes.length > 0 && (
                <div>
                  {featuredRecipes.length > 0 && !hasActiveFilters && (
                    <h2 className="font-mono font-bold text-sm uppercase tracking-wider text-science-900 mb-4">
                      Toutes les Recettes
                    </h2>
                  )}
                  <div className="grid gap-4">
                    {otherRecipes.map((recipe, index) => (
                      <RecipeCard 
                        key={recipe.id} 
                        recipe={recipe} 
                        delay={(featuredRecipes.length + index) * 0.05}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Show all if filtered */}
              {hasActiveFilters && recipes.length > 0 && (
                <div className="grid gap-4">
                  {recipes.map((recipe, index) => (
                    <RecipeCard 
                      key={recipe.id} 
                      recipe={recipe} 
                      delay={index * 0.05}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </MobileShell>
  );
}
