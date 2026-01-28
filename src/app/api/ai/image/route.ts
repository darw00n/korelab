// ============================================
// KORELAB - AI Image Generation API Route
// Uses Google Gemini Imagen for educational images
// ============================================

import { NextRequest, NextResponse } from 'next/server';

// Types
interface ImageRequest {
  profile: {
    texture: string;
    porosity: string;
    scalpType: string;
    concerns: string[];
  };
  mainConcern?: string;
}

// Gemini Imagen API configuration
const IMAGEN_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict';

// Concern to icon mapping for prompt
const CONCERN_ICONS: Record<string, string> = {
  'Chute de Cheveux': 'falling hair strands',
  'Pellicules': 'flaky scalp',
  'Casse': 'broken hair strand',
  'Sécheresse': 'dry cracked hair',
  'Pousse Lente': 'short hair with growth arrows',
  'Frisottis': 'frizzy unruly hair',
  'Volume': 'flat limp hair',
  'Brillance': 'dull matte hair',
};

function buildImagePrompt(data: ImageRequest): string {
  const { porosity, concerns } = data.profile;
  const mainConcern = data.mainConcern || concerns[0] || 'hair health';
  
  const porosityLower = porosity.toLowerCase();
  const isLowPorosity = porosityLower.includes('faible');
  const isHighPorosity = porosityLower.includes('forte');
  
  const cuticleDescription = isLowPorosity 
    ? 'tightly closed, flat cuticle scales'
    : isHighPorosity 
    ? 'lifted, raised cuticle scales with gaps'
    : 'partially open, slightly raised cuticle scales';
    
  const concernIcon = CONCERN_ICONS[mainConcern] || 'hair problem';

  return `Create an educational infographic illustration for hair care, scientific and clean style:

VISUAL ELEMENTS TO INCLUDE:
1. LEFT SIDE: Cross-section diagram of a single hair strand fiber showing ${cuticleDescription} - medical illustration style

2. CENTER: Large arrow pointing from left to right indicating transformation, with a small ${concernIcon} icon on the left side and a healthy hair icon on the right side

3. RIGHT SIDE: Healthy hair strand after treatment, with smooth cuticles and a subtle shine/glow effect

4. BOTTOM: Simple timeline with 3 dots labeled showing progression: starting point, mid-progress, final result

STYLE REQUIREMENTS:
- Clean, minimalist, medical/scientific illustration style
- Color palette: Navy blue (#1e3a5f) for main elements, Gold accent (#d4a574) for highlights, White/cream background
- NO TEXT whatsoever - purely visual illustration
- Vector-like, flat design with subtle gradients
- Professional medical/scientific aesthetic
- 16:9 aspect ratio, horizontal layout
- High contrast, clear distinct elements
- Suitable for a premium hair care brand`;
}

async function callImagenAPI(prompt: string): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  try {
    const response = await fetch(`${IMAGEN_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [
          {
            prompt: prompt,
          },
        ],
        parameters: {
          sampleCount: 1,
          aspectRatio: '16:9',
          safetyFilterLevel: 'block_few',
          personGeneration: 'dont_allow',
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Imagen API error:', errorText);
      
      // Try alternative endpoint format
      return await tryAlternativeImageGen(prompt, apiKey);
    }

    const result = await response.json();
    
    // Extract base64 image from response
    const imageData = result.predictions?.[0]?.bytesBase64Encoded;
    
    if (!imageData) {
      console.error('No image data in response:', result);
      return null;
    }

    return `data:image/png;base64,${imageData}`;
  } catch (error) {
    console.error('Imagen API call failed:', error);
    return null;
  }
}

// Alternative: Try using Gemini's vision model to generate a description
// that could be used with a placeholder image
async function tryAlternativeImageGen(prompt: string, apiKey: string): Promise<string | null> {
  // For now, return null to use fallback
  // In production, you could integrate with other image APIs like DALL-E or Stable Diffusion
  return null;
}

// Get a static fallback image URL based on porosity type
function getFallbackImageUrl(data: ImageRequest): string {
  const porosityLower = data.profile.porosity.toLowerCase();
  
  // Return a placeholder that will be shown with CSS styling
  // In production, you would have pre-generated images for each porosity type
  if (porosityLower.includes('faible')) {
    return '/images/educational/porosity-low.svg';
  } else if (porosityLower.includes('forte')) {
    return '/images/educational/porosity-high.svg';
  } else {
    return '/images/educational/porosity-medium.svg';
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ImageRequest;

    // Validate request
    if (!body.profile || !body.profile.porosity) {
      return NextResponse.json(
        { error: 'Invalid request: missing profile data' },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;
    let isGenerated = false;

    try {
      const prompt = buildImagePrompt(body);
      imageUrl = await callImagenAPI(prompt);
      isGenerated = imageUrl !== null;
    } catch (imageError) {
      console.error('Image generation failed:', imageError);
    }

    // If AI generation failed, use fallback
    if (!imageUrl) {
      imageUrl = getFallbackImageUrl(body);
      isGenerated = false;
    }

    return NextResponse.json({
      success: true,
      imageUrl,
      isGenerated,
      message: isGenerated 
        ? 'Image generated successfully' 
        : 'Using fallback educational image',
    });
  } catch (error) {
    console.error('Image API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
