// ============================================
// KORELAB - Single Recipe API Route
// Fetch recipe with all details
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, supabase as supabaseClient } from '@/lib/supabase';

// Use admin client if available, otherwise fallback to public client
const supabase = supabaseAdmin || supabaseClient;

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    // Fetch recipe
    const { data: recipe, error: recipeError } = await supabase
      .from('recipes')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (recipeError || !recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    // Fetch ingredients with product details
    const { data: ingredientsData, error: ingredientsError } = await supabase
      .from('recipe_ingredients')
      .select(`
        *,
        product:products(id, name, slug, price, image_url, short_description, product_type, product_subtype)
      `)
      .eq('recipe_id', (recipe as any).id)
      .order('step_order', { ascending: true });

    if (ingredientsError) {
      console.error('Error fetching ingredients:', ingredientsError);
    }
    const ingredients = ingredientsData as any[] || [];

    // Fetch steps
    const { data: stepsData, error: stepsError } = await supabase
      .from('recipe_steps')
      .select('*')
      .eq('recipe_id', (recipe as any).id)
      .order('step_number', { ascending: true });

    if (stepsError) {
      console.error('Error fetching steps:', stepsError);
    }
    const steps = stepsData as any[] || [];

    // Fetch tools with tool details
    const { data: toolsData, error: toolsError } = await supabase
      .from('recipe_tools')
      .select(`
        *,
        tool:diy_tools(id, name, slug, price, image_url, short_description, is_in_starter_kit)
      `)
      .eq('recipe_id', (recipe as any).id)
      .order('is_essential', { ascending: false });

    if (toolsError) {
      console.error('Error fetching tools:', toolsError);
    }
    const tools = toolsData as any[] || [];

    // Calculate total ingredient cost
    const totalIngredientCost = ingredients.reduce((sum: number, ing: any) => {
      const productPrice = ing.product?.price || 0;
      // Estimate cost based on percentage used (rough calculation)
      const usagePercentage = (ing.percentage || 10) / 100;
      return sum + (productPrice * usagePercentage);
    }, 0);

    // Calculate essential tools cost
    const essentialToolsCost = tools
      .filter((t: any) => t.is_essential && t.tool)
      .reduce((sum: number, t: any) => sum + (t.tool?.price || 0), 0);

    return NextResponse.json({
      success: true,
      recipe: {
        ...(recipe as object),
        ingredients,
        steps,
        tools,
        // Calculated fields
        estimatedCost: Math.round(totalIngredientCost),
        essentialToolsCost: Math.round(essentialToolsCost),
        totalIngredientsCount: ingredients.length,
        totalStepsCount: steps.length,
      },
    });
  } catch (error) {
    console.error('Recipe detail API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
