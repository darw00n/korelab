// ============================================
// KORELAB - Education Images Helper
// Gère les images éducatives (cuticules, etc.)
// ============================================

/**
 * Images de cuticules par type de porosité
 * Ces images sont pré-générées et stockées dans /public/images/education/
 */
export const CUTICLE_IMAGES = {
  faible: {
    current: '/images/education/cuticle-low-porosity.png',
    placeholder: '/images/placeholders/cuticle-placeholder.svg',
    label: 'Cuticules fermées',
    effect: 'Pénétration difficile',
  },
  moyenne: {
    current: '/images/education/cuticle-medium-porosity.png',
    placeholder: '/images/placeholders/cuticle-placeholder.svg',
    label: 'Cuticules équilibrées',
    effect: 'Absorption optimale',
  },
  forte: {
    current: '/images/education/cuticle-high-porosity.png',
    placeholder: '/images/placeholders/cuticle-placeholder.svg',
    label: 'Cuticules ouvertes',
    effect: "Perte d'hydratation",
  },
  healthy: {
    current: '/images/education/cuticle-healthy-goal.png',
    placeholder: '/images/placeholders/cuticle-placeholder.svg',
    label: 'Cuticules saines',
    effect: 'Hydratation optimale',
  },
} as const;

/**
 * Retourne l'URL de l'image de cuticule appropriée
 * Utilise le placeholder si l'image n'est pas encore générée
 */
export function getCuticleImageUrl(porosity: string): string {
  const key = porosity?.toLowerCase() as keyof typeof CUTICLE_IMAGES;
  const config = CUTICLE_IMAGES[key] || CUTICLE_IMAGES.moyenne;
  
  // En production, utiliser l'image réelle
  // En développement ou si l'image n'existe pas, utiliser le placeholder
  return config.current;
}

/**
 * Images de recettes par slug
 */
export const RECIPE_IMAGES: Record<string, {
  url: string;
  placeholder: string;
  color: string;
}> = {
  'masque-proteine-oeuf': {
    url: '/images/recipes/recipe-masque-proteine.png',
    placeholder: '/images/placeholders/recipe-placeholder.svg',
    color: '#F59E0B',
  },
  'spray-hydratant-quotidien': {
    url: '/images/recipes/recipe-spray-hydratant.png',
    placeholder: '/images/placeholders/recipe-placeholder.svg',
    color: '#0EA5E9',
  },
  'bain-huile-nourrissant': {
    url: '/images/recipes/recipe-bain-huile.png',
    placeholder: '/images/placeholders/recipe-placeholder.svg',
    color: '#D97706',
  },
  'gel-lin-definissant': {
    url: '/images/recipes/recipe-gel-lin.png',
    placeholder: '/images/placeholders/recipe-placeholder.svg',
    color: '#16A34A',
  },
  'masque-banane-avocat': {
    url: '/images/recipes/recipe-masque-banane.png',
    placeholder: '/images/placeholders/recipe-placeholder.svg',
    color: '#84CC16',
  },
  'rincage-vinaigre-cidre': {
    url: '/images/recipes/recipe-rinse-vinaigre.png',
    placeholder: '/images/placeholders/recipe-placeholder.svg',
    color: '#DC2626',
  },
  'prepoo-coco-miel': {
    url: '/images/recipes/recipe-prepoo-coco.png',
    placeholder: '/images/placeholders/recipe-placeholder.svg',
    color: '#78350F',
  },
  'masque-argile-purifiant': {
    url: '/images/recipes/recipe-masque-argile.png',
    placeholder: '/images/placeholders/recipe-placeholder.svg',
    color: '#6B7280',
  },
};

/**
 * Retourne l'URL de l'image de recette
 */
export function getRecipeImageUrl(slug: string): string {
  const config = RECIPE_IMAGES[slug];
  if (!config) {
    return '/images/placeholders/recipe-placeholder.svg';
  }
  return config.url;
}

/**
 * Images des outils DIY
 */
export const DIY_TOOL_IMAGES: Record<string, string> = {
  'kit-starter-diy': '/images/diy-tools/diy-kit-starter.png',
  'flacons-ambres-30ml': '/images/diy-tools/diy-tool-bottles-amber.png',
  'flacon-spray-200ml': '/images/diy-tools/diy-tool-spray-bottle.png',
  'bol-melange-silicone': '/images/diy-tools/diy-tool-mixing-bowl.png',
  'spatule-silicone': '/images/diy-tools/diy-tool-spatula.png',
  'cuilleres-doseuses': '/images/diy-tools/diy-tool-measuring-spoons.png',
  'entonnoir-mini': '/images/diy-tools/diy-tool-funnel.png',
  'pipettes-graduees': '/images/diy-tools/diy-tool-pipettes.png',
  'etiquettes-waterproof': '/images/diy-tools/diy-tool-labels.png',
  'pinceau-application': '/images/diy-tools/diy-tool-brush.png',
  'bonnet-chauffant': '/images/diy-tools/diy-tool-heat-cap.png',
  'pot-verre-100ml': '/images/diy-tools/diy-tool-glass-jar.png',
  'fouet-mini': '/images/diy-tools/diy-tool-whisk.png',
  'balance-precision': '/images/diy-tools/diy-tool-scale.png',
  'thermometre-cuisine': '/images/diy-tools/diy-tool-thermometer.png',
  'gants-nitrile': '/images/diy-tools/diy-tool-gloves.png',
  'passoire-fine': '/images/diy-tools/diy-tool-strainer.png',
};

/**
 * Retourne l'URL de l'image d'un outil DIY
 */
export function getDIYToolImageUrl(slug: string): string {
  return DIY_TOOL_IMAGES[slug] || '/images/placeholders/product-placeholder.svg';
}

/**
 * Vérifie si une image existe (côté client)
 */
export async function checkImageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Hook helper pour charger une image avec fallback
 */
export function getImageWithFallback(
  primaryUrl: string, 
  fallbackUrl: string
): string {
  // Cette fonction est synchrone, donc on retourne toujours l'URL primaire
  // Le composant Image de Next.js gère déjà les erreurs
  return primaryUrl;
}
