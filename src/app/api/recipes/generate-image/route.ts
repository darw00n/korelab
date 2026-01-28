// ============================================
// KORELAB - Recipe Image Generation API
// Generates consistent educational visuals
// ============================================

import { NextRequest, NextResponse } from 'next/server';

// Types
interface ImageGenerationRequest {
  recipeName: string;
  recipeType: string;
  ingredients: {
    name: string;
    percentage: number;
    color?: string;
  }[];
  colorHex: string;
  difficulty: 'debutant' | 'intermediaire' | 'expert';
}

// Gemini Imagen API configuration
const IMAGEN_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict';

/**
 * TEMPLATE DE PROMPT POUR GÉNÉRATION D'IMAGES COHÉRENTES
 * 
 * Ce template garantit que toutes les images de recettes suivent le même style:
 * - Infographie éducative scientifique
 * - Fond blanc/crème propre
 * - Palette: Navy (#1e3a5f) + Gold (#d4a574) + couleur recette
 * - Style flat/vector minimaliste
 * - Pas de texte (ajouté en overlay)
 */
function buildImagePrompt(data: ImageGenerationRequest): string {
  const ingredientsList = data.ingredients
    .map((ing, i) => `${i + 1}. ${ing.name} (${ing.percentage}%)`)
    .join(', ');

  const difficultyStars = {
    debutant: '1 star (easy)',
    intermediaire: '2 stars (medium)',
    expert: '3 stars (hard)',
  }[data.difficulty];

  return `Create a clean, scientific educational infographic illustration for a DIY hair care recipe. Professional cosmetic formulation style.

COMPOSITION (TOP TO BOTTOM):
1. TOP SECTION (20%): 
   - Small icons representing each ingredient arranged horizontally
   - Ingredients: ${ingredientsList}
   - Each shown as a minimalist icon (bottle, jar, dropper, etc.)
   - Small percentage circles next to each

2. MIDDLE SECTION (50%):
   - Central illustration: A glass mixing bowl viewed from above at 45° angle
   - Inside the bowl: swirling mixture showing the blend of colors
   - Around the bowl: measuring tools (pipette, spoon)
   - Subtle motion lines suggesting mixing action

3. BOTTOM SECTION (30%):
   - Final product container appropriate for ${data.recipeType}:
     * spray → spray bottle
     * masque → jar with lid
     * bain_huile → dropper bottle
     * serum → small amber bottle with dropper
     * leave_in → pump bottle
     * beurre → round tin container
     * pre_poo → squeeze bottle
   - Small sparkle effects suggesting quality product

STYLE REQUIREMENTS:
- Clean, minimalist, flat design / vector illustration style
- Professional cosmetic laboratory aesthetic
- White/cream background (#f8f6f3)
- Primary color: Navy blue (#1e3a5f) for outlines and icons
- Accent color: Gold (#d4a574) for highlights
- Recipe color accent: ${data.colorHex} for the product/mixture
- NO TEXT whatsoever - purely visual
- Subtle shadows for depth (very light, professional)
- 1:1 square aspect ratio (1024x1024)
- High contrast, clear distinct elements
- Premium, scientific, trustworthy aesthetic

DO NOT INCLUDE:
- Any text, labels, or numbers
- Realistic photographs
- Human hands or faces
- Cluttered or busy backgrounds
- Cartoon or childish style`;
}

async function generateImage(prompt: string): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('GEMINI_API_KEY not configured');
    return null;
  }

  try {
    const response = await fetch(`${IMAGEN_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: {
          sampleCount: 1,
          aspectRatio: '1:1',
          safetyFilterLevel: 'block_few',
          personGeneration: 'dont_allow',
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Imagen API error:', errorText);
      return null;
    }

    const result = await response.json();
    const imageData = result.predictions?.[0]?.bytesBase64Encoded;
    
    if (!imageData) {
      console.error('No image data in response');
      return null;
    }

    return `data:image/png;base64,${imageData}`;
  } catch (error) {
    console.error('Image generation error:', error);
    return null;
  }
}

// Fallback: return a placeholder based on recipe type
function getFallbackImageUrl(recipeType: string, colorHex: string): string {
  // In production, these would be pre-generated SVG placeholders
  const placeholders: Record<string, string> = {
    spray: '/images/recipes/placeholder-spray.svg',
    masque: '/images/recipes/placeholder-masque.svg',
    bain_huile: '/images/recipes/placeholder-bain-huile.svg',
    serum: '/images/recipes/placeholder-serum.svg',
    leave_in: '/images/recipes/placeholder-leave-in.svg',
    beurre: '/images/recipes/placeholder-beurre.svg',
    pre_poo: '/images/recipes/placeholder-pre-poo.svg',
    rinse: '/images/recipes/placeholder-rinse.svg',
  };

  return placeholders[recipeType] || '/images/recipes/placeholder-default.svg';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ImageGenerationRequest;

    // Validate request
    if (!body.recipeName || !body.recipeType || !body.ingredients?.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Build prompt
    const prompt = buildImagePrompt(body);

    // Try to generate image
    let imageUrl = await generateImage(prompt);
    let isGenerated = imageUrl !== null;

    // Use fallback if generation failed
    if (!imageUrl) {
      imageUrl = getFallbackImageUrl(body.recipeType, body.colorHex);
      isGenerated = false;
    }

    return NextResponse.json({
      success: true,
      imageUrl,
      isGenerated,
      prompt: isGenerated ? undefined : prompt, // Return prompt for debugging if fallback used
    });
  } catch (error) {
    console.error('Recipe image API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate recipe image' },
      { status: 500 }
    );
  }
}

/**
 * GET: Return the prompt template documentation
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    documentation: {
      title: 'KoreLab Recipe Image Generation Template',
      description: 'Consistent visual style for all DIY recipe images',
      style: {
        type: 'Scientific educational infographic',
        background: '#f8f6f3 (cream/white)',
        primaryColor: '#1e3a5f (navy blue)',
        accentColor: '#d4a574 (gold)',
        format: '1:1 square, 1024x1024px',
        aesthetic: 'Flat/vector, minimalist, professional cosmetic lab',
      },
      composition: {
        top: 'Ingredient icons with percentage indicators (20%)',
        middle: 'Mixing bowl with swirling mixture (50%)',
        bottom: 'Final product container (30%)',
      },
      rules: [
        'NO text of any kind',
        'NO human elements',
        'Clean, professional look',
        'Consistent color palette',
        'Recipe-specific accent color',
      ],
    },
  });
}
