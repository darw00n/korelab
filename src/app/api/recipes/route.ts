// ============================================
// KORELAB - Recipes API Route
// Fetch and personalize DIY recipes
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, supabase as supabaseClient } from '@/lib/supabase';

// Use admin client if available, otherwise fallback to public client
const supabase = supabaseAdmin || supabaseClient;

// Types
interface RecipeFilters {
  type?: string;
  difficulty?: string;
  porosity?: string;
  texture?: string;
  concern?: string;
  featured?: boolean;
}

interface ProfileMatchParams {
  porosity?: string;
  texture?: string;
  concerns?: string[];
  scalpType?: string;
}

// Calculate match score for a recipe based on user profile
function calculateMatchScore(recipe: any, profile: ProfileMatchParams): number {
  let score = 0;
  let maxScore = 0;

  // Porosity match (weight: 30)
  if (profile.porosity && recipe.target_porosities?.length > 0) {
    maxScore += 30;
    if (recipe.target_porosities.includes(profile.porosity.toLowerCase())) {
      score += 30;
    }
  }

  // Texture match (weight: 25)
  if (profile.texture && recipe.target_textures?.length > 0) {
    maxScore += 25;
    if (recipe.target_textures.includes(profile.texture.toLowerCase())) {
      score += 25;
    }
  }

  // Concerns match (weight: 30)
  if (profile.concerns && profile.concerns.length > 0 && recipe.target_concerns?.length > 0) {
    maxScore += 30;
    const matchingConcerns = profile.concerns.filter(c => 
      recipe.target_concerns.includes(c.toLowerCase())
    );
    score += (matchingConcerns.length / profile.concerns.length) * 30;
  }

  // Scalp type match (weight: 15)
  if (profile.scalpType && recipe.target_scalp_types?.length > 0) {
    maxScore += 15;
    if (recipe.target_scalp_types.includes(profile.scalpType.toLowerCase())) {
      score += 15;
    }
  }

  return maxScore > 0 ? Math.round((score / maxScore) * 100) : 50;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse filters
    const filters: RecipeFilters = {
      type: searchParams.get('type') || undefined,
      difficulty: searchParams.get('difficulty') || undefined,
      porosity: searchParams.get('porosity') || undefined,
      texture: searchParams.get('texture') || undefined,
      concern: searchParams.get('concern') || undefined,
      featured: searchParams.get('featured') === 'true' ? true : undefined,
    };

    // Parse profile for matching
    const profile: ProfileMatchParams = {
      porosity: searchParams.get('porosity') || undefined,
      texture: searchParams.get('texture') || undefined,
      concerns: searchParams.get('concerns')?.split(',').filter(Boolean) || undefined,
      scalpType: searchParams.get('scalpType') || undefined,
    };

    // Build query - Ne pas filtrer par is_published pour s'assurer d'avoir des résultats
    let query = supabase
      .from('recipes')
      .select('*');

    // Apply filters
    if (filters.type) {
      query = query.eq('recipe_type', filters.type);
    }
    if (filters.difficulty) {
      query = query.eq('difficulty', filters.difficulty);
    }
    if (filters.featured) {
      query = query.eq('is_featured', true);
    }
    if (filters.porosity) {
      query = query.contains('target_porosities', [filters.porosity.toLowerCase()]);
    }
    if (filters.texture) {
      query = query.contains('target_textures', [filters.texture.toLowerCase()]);
    }
    if (filters.concern) {
      query = query.contains('target_concerns', [filters.concern.toLowerCase()]);
    }

    const { data: recipes, error } = await query.order('is_featured', { ascending: false });

    if (error) {
      console.error('Error fetching recipes:', error);
      return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
    }

    // Calculate match scores if profile provided
    const recipesWithScores = (recipes as any[] || []).map((recipe: any) => ({
      ...recipe,
      matchScore: calculateMatchScore(recipe, profile),
    }));

    // Sort by match score if profile was provided
    if (profile.porosity || profile.texture || profile.concerns?.length) {
      recipesWithScores.sort((a, b) => b.matchScore - a.matchScore);
    }

    return NextResponse.json({
      success: true,
      recipes: recipesWithScores,
      count: recipesWithScores.length,
    });
  } catch (error) {
    console.error('Recipes API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
