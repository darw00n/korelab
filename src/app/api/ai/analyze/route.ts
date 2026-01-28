// ============================================
// KORELAB - AI Analysis API Route
// Uses Google Gemini for hair profile analysis
// ============================================

import { NextRequest, NextResponse } from 'next/server';

// Types
interface AnalyzeRequest {
  profile: {
    texture: string;
    porosity: string;
    scalpType: string;
    concerns: string[];
  };
  userProblemDescription?: string;
  userDesiredSolution?: string;
  products: { name: string; type: string }[];
}

interface AIAnalysis {
  hairNatureExplanation: string;
  problemDiagnosis: string;
  solutionStrategy: string;
  expectedResults: string;
}

// Gemini API configuration
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

function buildPrompt(data: AnalyzeRequest): string {
  const productsFormatted = data.products
    .map(p => `- ${p.name} (${p.type})`)
    .join('\n');

  const concernsFormatted = data.profile.concerns.join(', ');

  return `Tu es un expert en soins capillaires naturels chez KoreLab. Tu dois analyser le profil capillaire d'un client et lui expliquer sa situation de manière éducative et rassurante.

## PROFIL CLIENT
- Texture: ${data.profile.texture}
- Porosité: ${data.profile.porosity}
- Cuir chevelu: ${data.profile.scalpType}
- Préoccupations: ${concernsFormatted}
${data.userProblemDescription ? `- Description du problème par le client: "${data.userProblemDescription}"` : ''}
${data.userDesiredSolution ? `- Solution recherchée: "${data.userDesiredSolution}"` : ''}

## PRODUITS RECOMMANDÉS
${productsFormatted}

## FORMAT DE RÉPONSE OBLIGATOIRE
Réponds EXACTEMENT dans ce format JSON:

{
  "hairNatureExplanation": "[2-3 phrases expliquant la nature du cheveu du client, sa porosité, et ce que ça signifie concrètement. Utilise un ton bienveillant et éducatif. Max 150 mots.]",
  
  "problemDiagnosis": "[2-3 phrases identifiant précisément le(s) problème(s) basé sur le profil et la description du client. Explique POURQUOI ces problèmes surviennent (ex: cuticules ouvertes = perte d'hydratation). Max 100 mots.]",
  
  "solutionStrategy": "[2-3 phrases expliquant la stratégie de soin recommandée. Mentionne la méthode LOC/LCO si pertinent, et comment les produits recommandés agissent ensemble. Max 150 mots.]",
  
  "expectedResults": "[1-2 phrases sur les résultats attendus avec ce protocole, et le délai approximatif (ex: 4-6 semaines). Soit réaliste et encourageant. Max 80 mots.]"
}

## RÈGLES
- Utilise le tutoiement
- Évite le jargon technique sauf si tu l'expliques
- Sois positif et encourageant
- Ne mentionne JAMAIS de marques autres que KoreLab
- Réponds UNIQUEMENT en JSON valide, sans markdown ni backticks`;
}

async function callGeminiAPI(prompt: string): Promise<AIAnalysis> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API error:', errorText);
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const result = await response.json();
  
  // Extract text from Gemini response
  const textContent = result.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!textContent) {
    throw new Error('No content in Gemini response');
  }

  // Parse JSON from response (handle possible markdown code blocks)
  let jsonString = textContent.trim();
  if (jsonString.startsWith('```json')) {
    jsonString = jsonString.slice(7);
  }
  if (jsonString.startsWith('```')) {
    jsonString = jsonString.slice(3);
  }
  if (jsonString.endsWith('```')) {
    jsonString = jsonString.slice(0, -3);
  }
  jsonString = jsonString.trim();

  try {
    const analysis = JSON.parse(jsonString) as AIAnalysis;
    return analysis;
  } catch (parseError) {
    console.error('Failed to parse Gemini response:', jsonString);
    throw new Error('Failed to parse AI response');
  }
}

// Fallback analysis when AI is unavailable
function getFallbackAnalysis(data: AnalyzeRequest): AIAnalysis {
  const { texture, porosity, scalpType, concerns } = data.profile;
  
  const porosityLower = porosity.toLowerCase();
  const isLowPorosity = porosityLower.includes('faible');
  const isHighPorosity = porosityLower.includes('forte');

  return {
    hairNatureExplanation: `Tes cheveux ${texture.toLowerCase()} avec une ${porosity.toLowerCase()} ont des caractéristiques uniques. ${
      isLowPorosity 
        ? 'Les cuticules de tes cheveux sont naturellement fermées, ce qui signifie que les produits mettent plus de temps à pénétrer mais l\'hydratation est bien retenue une fois absorbée.'
        : isHighPorosity
        ? 'Les cuticules de tes cheveux sont plus ouvertes, ce qui permet une absorption rapide des produits mais nécessite un scellage efficace pour maintenir l\'hydratation.'
        : 'Tes cuticules ont un équilibre naturel qui permet une bonne absorption et rétention des soins.'
    }`,
    
    problemDiagnosis: `${
      concerns.length > 0 
        ? `Les préoccupations que tu as identifiées (${concerns.join(', ')}) sont typiques de ton profil capillaire. `
        : ''
    }${
      data.userProblemDescription 
        ? `Ce que tu décris correspond à un besoin de ${isHighPorosity ? 'renforcement et scellage' : 'pénétration et hydratation en profondeur'}. `
        : ''
    }Ton cuir chevelu ${scalpType.toLowerCase()} influence aussi le choix des produits adaptés.`,
    
    solutionStrategy: `Ta routine suivra la méthode ${isHighPorosity ? 'LCO (Liquide, Crème, Huile)' : 'LOC (Liquide, Huile, Crème)'} adaptée à ta porosité. Les produits sélectionnés travaillent en synergie : un nettoyant doux, un traitement ciblé pour tes préoccupations, et un scellant adapté à ta texture.`,
    
    expectedResults: `En suivant ce protocole régulièrement, tu devrais observer les premiers résultats en 3-4 semaines. Une amélioration significative de la texture et de la santé de tes cheveux est attendue après 6-8 semaines d'utilisation.`,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as AnalyzeRequest;

    // Validate request
    if (!body.profile || !body.profile.texture || !body.profile.porosity) {
      return NextResponse.json(
        { error: 'Invalid request: missing profile data' },
        { status: 400 }
      );
    }

    let analysis: AIAnalysis;

    try {
      const prompt = buildPrompt(body);
      analysis = await callGeminiAPI(prompt);
    } catch (aiError) {
      console.error('AI analysis failed, using fallback:', aiError);
      analysis = getFallbackAnalysis(body);
    }

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error('Analysis API error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze profile' },
      { status: 500 }
    );
  }
}
