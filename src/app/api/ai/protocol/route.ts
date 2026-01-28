// ============================================
// KORELAB - AI Protocol Manual Generation API
// Hybrid approach: Template + AI-personalized tips
// ============================================

import { NextRequest, NextResponse } from 'next/server';

// Types
interface ProtocolRequest {
  profile: {
    texture: string;
    porosity: string;
    scalpType: string;
    concerns: string[];
  };
  userProblemDescription?: string;
  products: {
    name: string;
    type: string;
    quantity?: string;
    instructions?: string;
  }[];
  orderId?: string;
}

interface ProtocolManual {
  profile: {
    texture: string;
    porosity: string;
    scalpType: string;
    concerns: string[];
  };
  products: {
    cleanser?: { name: string; usage: string };
    treatment?: { name: string; usage: string };
    finish?: { name: string; usage: string };
  };
  dailyRoutine: {
    morning: RoutineStep[];
    evening: RoutineStep[];
  };
  weeklyRoutine: RoutineStep[];
  personalizedTips: string[];
  thingsToAvoid: string[];
  progressTracker: ProgressWeek[];
  generatedAt: string;
}

interface RoutineStep {
  step: number;
  action: string;
  product?: string;
  quantity: string;
  duration?: string;
  frequency: string;
  instructions: string;
}

interface ProgressWeek {
  week: string;
  milestone: string;
  expectation: string;
}

// Gemini API configuration
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

function buildTipsPrompt(data: ProtocolRequest): string {
  const productsFormatted = data.products
    .map(p => `- ${p.name} (${p.type})`)
    .join('\n');

  return `Tu es un expert capillaire KoreLab. Génère 4-5 conseils personnalisés pour ce client.

## PROFIL
- Texture: ${data.profile.texture}
- Porosité: ${data.profile.porosity}
- Cuir chevelu: ${data.profile.scalpType}
- Préoccupations: ${data.profile.concerns.join(', ')}
${data.userProblemDescription ? `- Description du problème: "${data.userProblemDescription}"` : ''}

## PRODUITS COMMANDÉS
${productsFormatted}

## FORMAT
Réponds en JSON valide sans markdown:
{
  "tips": [
    "Conseil 1 spécifique au profil...",
    "Conseil 2...",
    "Conseil 3...",
    "Conseil 4..."
  ]
}

## RÈGLES
- Conseils pratiques et actionnables
- Spécifiques aux produits commandés
- Adaptés à la porosité du client
- Max 2 phrases par conseil
- Utilise le tutoiement
- Pas de jargon technique sans explication`;
}

async function getPersonalizedTips(data: ProtocolRequest): Promise<string[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return getDefaultTips(data.profile.porosity);
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildTipsPrompt(data) }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 512,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Gemini API error');
    }

    const result = await response.json();
    const textContent = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textContent) {
      throw new Error('No content');
    }

    // Parse JSON
    let jsonString = textContent.trim();
    if (jsonString.startsWith('```json')) jsonString = jsonString.slice(7);
    if (jsonString.startsWith('```')) jsonString = jsonString.slice(3);
    if (jsonString.endsWith('```')) jsonString = jsonString.slice(0, -3);
    
    const parsed = JSON.parse(jsonString.trim());
    return parsed.tips || getDefaultTips(data.profile.porosity);
  } catch (error) {
    console.error('Failed to get AI tips:', error);
    return getDefaultTips(data.profile.porosity);
  }
}

function getDefaultTips(porosity: string): string[] {
  const porosityLower = porosity.toLowerCase();
  
  if (porosityLower.includes('faible')) {
    return [
      'Utilise toujours de l\'eau tiède à chaude pour ouvrir les cuticules avant d\'appliquer tes soins.',
      'Privilégie les huiles légères (argan, pépins de raisin) qui pénètrent plus facilement.',
      'Laisse poser tes masques sous un bonnet chauffant pour maximiser la pénétration.',
      'Évite de superposer trop de produits : tes cheveux ont du mal à tout absorber.',
    ];
  } else if (porosityLower.includes('forte')) {
    return [
      'Termine toujours par un scellant (huile épaisse ou beurre) pour retenir l\'hydratation.',
      'Fais des soins protéinés régulièrement pour renforcer la fibre capillaire.',
      'Rince tes cheveux à l\'eau froide pour refermer les cuticules après le soin.',
      'Protège tes cheveux la nuit avec un bonnet en satin pour éviter la déshydratation.',
    ];
  }
  
  return [
    'Alterne entre soins hydratants et protéinés pour maintenir l\'équilibre de tes cheveux.',
    'Utilise la méthode LOC (Liquid, Oil, Cream) adaptée à ta porosité.',
    'Lave tes cheveux 2-3 fois par semaine maximum pour préserver le sébum naturel.',
    'Démêle toujours tes cheveux avec un peigne à dents larges, du bas vers le haut.',
  ];
}

function getThingsToAvoid(profile: ProtocolRequest['profile']): string[] {
  const avoid: string[] = [];
  const porosityLower = profile.porosity.toLowerCase();
  const scalpLower = profile.scalpType.toLowerCase();

  // Porosity-based
  if (porosityLower.includes('faible')) {
    avoid.push('Les huiles lourdes (ricin, olive) en grande quantité - elles restent en surface');
    avoid.push('Les produits avec trop de protéines - risque de surcharge');
  } else if (porosityLower.includes('forte')) {
    avoid.push('Les soins sans scellant - l\'hydratation s\'évapore rapidement');
    avoid.push('L\'eau très chaude - elle ouvre encore plus les cuticules');
  }

  // Scalp-based
  if (scalpLower.includes('gras')) {
    avoid.push('Les huiles sur le cuir chevelu - privilégie les longueurs et pointes');
    avoid.push('Les shampoings trop hydratants - préfère les formules purifiantes');
  } else if (scalpLower.includes('sec') || scalpLower.includes('sensible')) {
    avoid.push('Les shampoings avec sulfates - ils assèchent le cuir chevelu');
    avoid.push('Les lavages quotidiens - espace à 2-3 fois par semaine');
  }

  // Concern-based
  if (profile.concerns.some(c => c.toLowerCase().includes('pellicules'))) {
    avoid.push('Les produits comédogènes qui peuvent obstruer les pores du cuir chevelu');
  }
  if (profile.concerns.some(c => c.toLowerCase().includes('casse'))) {
    avoid.push('Les manipulations excessives et les coiffures trop serrées');
  }

  // General
  avoid.push('La chaleur excessive (sèche-cheveux chaud, fer) sans protection thermique');

  return avoid.slice(0, 5); // Limit to 5 items
}

function buildDailyRoutine(data: ProtocolRequest): { morning: RoutineStep[]; evening: RoutineStep[] } {
  const porosityLower = data.profile.porosity.toLowerCase();
  const isHighPorosity = porosityLower.includes('forte');
  
  const cleanser = data.products.find(p => p.type === 'cleanser');
  const treatment = data.products.find(p => p.type === 'treatment');
  const finish = data.products.find(p => p.type === 'finish');

  const morning: RoutineStep[] = [];
  const evening: RoutineStep[] = [];

  // Morning routine
  if (finish) {
    morning.push({
      step: 1,
      action: 'Hydratation',
      product: finish.name,
      quantity: '2-3 noisettes',
      frequency: 'Quotidien',
      instructions: 'Sur cheveux légèrement humidifiés, appliquer sur les longueurs en évitant les racines.',
    });

    if (isHighPorosity) {
      morning.push({
        step: 2,
        action: 'Scellage',
        product: finish.name,
        quantity: 'Quelques gouttes',
        frequency: 'Quotidien',
        instructions: 'Appliquer sur les pointes pour sceller l\'hydratation.',
      });
    }
  }

  // Evening routine
  if (treatment) {
    evening.push({
      step: 1,
      action: 'Traitement',
      product: treatment.name,
      quantity: 'Selon le produit',
      duration: '30 min à toute la nuit',
      frequency: '2-3x/semaine',
      instructions: 'Appliquer généreusement, couvrir d\'un bonnet en plastique puis satin.',
    });
  }

  evening.push({
    step: treatment ? 2 : 1,
    action: 'Protection nocturne',
    quantity: 'Bonnet satin ou taie d\'oreiller satin',
    frequency: 'Chaque nuit',
    instructions: 'Protège tes cheveux des frottements et de la déshydratation.',
  });

  return { morning, evening };
}

function buildWeeklyRoutine(data: ProtocolRequest): RoutineStep[] {
  const cleanser = data.products.find(p => p.type === 'cleanser');
  const treatment = data.products.find(p => p.type === 'treatment');
  const steps: RoutineStep[] = [];

  if (cleanser) {
    steps.push({
      step: 1,
      action: 'Nettoyage profond',
      product: cleanser.name,
      quantity: '1-2 applications',
      duration: '5-10 minutes',
      frequency: '1-2x/semaine',
      instructions: 'Premier shampoing pour nettoyer, deuxième pour traiter. Masser le cuir chevelu.',
    });
  }

  if (treatment) {
    steps.push({
      step: 2,
      action: 'Soin profond',
      product: treatment.name,
      quantity: 'Généreuse application',
      duration: '30 min à 2h',
      frequency: '1x/semaine',
      instructions: 'Sous bonnet chauffant pour maximiser la pénétration. Rincer abondamment.',
    });
  }

  return steps;
}

function buildProgressTracker(porosity: string): ProgressWeek[] {
  const porosityLower = porosity.toLowerCase();
  const isHighPorosity = porosityLower.includes('forte');
  const isLowPorosity = porosityLower.includes('faible');

  return [
    {
      week: 'Semaine 1-2',
      milestone: 'Phase d\'adaptation',
      expectation: 'Tes cheveux s\'habituent aux nouveaux produits. Possible effet "purge" temporaire.',
    },
    {
      week: 'Semaine 3-4',
      milestone: 'Premiers résultats',
      expectation: isHighPorosity
        ? 'Hydratation mieux retenue, moins de frisottis.'
        : isLowPorosity
        ? 'Meilleure pénétration des soins, cheveux plus souples.'
        : 'Équilibre hydratation/nutrition visible.',
    },
    {
      week: 'Semaine 5-6',
      milestone: 'Transformation visible',
      expectation: 'Brillance améliorée, texture plus définie, moins de casse.',
    },
    {
      week: 'Semaine 7-8',
      milestone: 'Résultats optimaux',
      expectation: 'Tes cheveux ont trouvé leur équilibre. Continue la routine pour maintenir les résultats.',
    },
  ];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ProtocolRequest;

    // Validate request
    if (!body.profile || !body.products || body.products.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: missing profile or products' },
        { status: 400 }
      );
    }

    // Get AI-personalized tips
    const personalizedTips = await getPersonalizedTips(body);

    // Build the protocol manual
    const protocol: ProtocolManual = {
      profile: body.profile,
      products: {
        cleanser: body.products.find(p => p.type === 'cleanser') 
          ? { name: body.products.find(p => p.type === 'cleanser')!.name, usage: 'Nettoyage' }
          : undefined,
        treatment: body.products.find(p => p.type === 'treatment')
          ? { name: body.products.find(p => p.type === 'treatment')!.name, usage: 'Traitement' }
          : undefined,
        finish: body.products.find(p => p.type === 'finish')
          ? { name: body.products.find(p => p.type === 'finish')!.name, usage: 'Finition/Scellage' }
          : undefined,
      },
      dailyRoutine: buildDailyRoutine(body),
      weeklyRoutine: buildWeeklyRoutine(body),
      personalizedTips,
      thingsToAvoid: getThingsToAvoid(body.profile),
      progressTracker: buildProgressTracker(body.profile.porosity),
      generatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      protocol,
    });
  } catch (error) {
    console.error('Protocol API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate protocol manual' },
      { status: 500 }
    );
  }
}
