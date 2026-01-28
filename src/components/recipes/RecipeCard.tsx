'use client';

// ============================================
// KORELAB - Recipe Card Component
// Scientific/educational design for DIY recipes
// ============================================

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Beaker, 
  Star, 
  ChevronRight,
  Droplets,
  Sparkles,
  Leaf,
  FlaskConical,
  Wind,
  Lock,
  Heart,
  Zap
} from 'lucide-react';
import type { Recipe, RecipeDifficulty, RecipeType } from '@/types/database.types';

interface RecipeCardProps {
  recipe: Recipe & { matchScore?: number };
  delay?: number;
}

// Map recipe types to French labels
const RECIPE_TYPE_LABELS: Record<RecipeType, string> = {
  spray: 'Spray',
  masque: 'Masque',
  bain_huile: 'Bain d\'huile',
  serum: 'Sérum',
  leave_in: 'Leave-in',
  beurre: 'Beurre',
  pre_poo: 'Pré-poo',
  rinse: 'Rinçage',
};

// Map difficulty to display
const DIFFICULTY_CONFIG: Record<RecipeDifficulty, { label: string; stars: number; color: string }> = {
  debutant: { label: 'Débutant', stars: 1, color: 'text-green-600' },
  intermediaire: { label: 'Intermédiaire', stars: 2, color: 'text-amber-600' },
  expert: { label: 'Expert', stars: 3, color: 'text-red-600' },
};

// Map icon names to components
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Droplets,
  Sparkles,
  Leaf,
  FlaskConical,
  Wind,
  Lock,
  Heart,
  Zap,
  TrendingUp: Zap,
  Shield: Lock,
};

export function RecipeCard({ recipe, delay = 0 }: RecipeCardProps) {
  const difficultyConfig = DIFFICULTY_CONFIG[recipe.difficulty];
  const IconComponent = recipe.icon ? ICON_MAP[recipe.icon] || Beaker : Beaker;
  const typeLabel = RECIPE_TYPE_LABELS[recipe.recipe_type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Link href={`/recettes/${recipe.slug}`}>
        <div className="card group hover:shadow-lg transition-all duration-300 overflow-hidden">
          {/* Header with color accent */}
          <div 
            className="h-2"
            style={{ backgroundColor: recipe.color_hex || '#1e3a5f' }}
          />
          
          <div className="p-4">
            {/* Top row: Type badge + Match score */}
            <div className="flex items-center justify-between mb-3">
              <span className="badge badge-secondary text-[10px]">
                {typeLabel}
              </span>
              {recipe.matchScore !== undefined && recipe.matchScore > 0 && (
                <div className="flex items-center gap-1 text-accent-600">
                  <span className="font-mono text-xs font-bold">{recipe.matchScore}%</span>
                  <span className="text-[10px] text-text-muted">match</span>
                </div>
              )}
            </div>

            {/* Icon + Title */}
            <div className="flex items-start gap-3 mb-3">
              <div 
                className="flex-shrink-0 w-12 h-12 rounded-sm flex items-center justify-center"
                style={{ backgroundColor: `${recipe.color_hex || '#1e3a5f'}20` }}
              >
                <IconComponent 
                  className="w-6 h-6" 
                  style={{ color: recipe.color_hex || '#1e3a5f' }} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-science-900 line-clamp-2 group-hover:text-accent-600 transition-colors">
                  {recipe.name}
                </h3>
                <p className="font-sans text-xs text-text-secondary mt-1 line-clamp-2">
                  {recipe.short_description}
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-4 mb-3 text-text-muted">
              {/* Prep time */}
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span className="font-mono text-xs">{recipe.prep_time_minutes} min</span>
              </div>
              
              {/* Difficulty */}
              <div className="flex items-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${i < difficultyConfig.stars ? difficultyConfig.color : 'text-slate-200'}`}
                    fill={i < difficultyConfig.stars ? 'currentColor' : 'none'}
                  />
                ))}
                <span className={`font-mono text-xs ml-1 ${difficultyConfig.color}`}>
                  {difficultyConfig.label}
                </span>
              </div>
            </div>

            {/* Benefits preview */}
            {recipe.benefits && recipe.benefits.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {recipe.benefits.slice(0, 2).map((benefit, i) => (
                  <span 
                    key={i}
                    className="text-[10px] px-2 py-0.5 bg-slate-100 text-text-secondary rounded"
                  >
                    {benefit}
                  </span>
                ))}
                {recipe.benefits.length > 2 && (
                  <span className="text-[10px] px-2 py-0.5 text-text-muted">
                    +{recipe.benefits.length - 2}
                  </span>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="font-mono text-xs text-text-muted">
                {recipe.yield_applications ? `~${recipe.yield_applications} applications` : `${recipe.yield_ml}ml`}
              </span>
              <div className="flex items-center gap-1 text-accent-600 group-hover:gap-2 transition-all">
                <span className="font-mono text-xs font-bold uppercase">Voir</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Featured badge */}
          {recipe.is_featured && (
            <div className="absolute top-4 right-4">
              <span className="badge badge-accent text-[10px]">
                ⭐ Populaire
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default RecipeCard;
