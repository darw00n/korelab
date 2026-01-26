// ============================================
// KORELAB - Hair Care Matching Engine V2
// Algorithme de recommandation capillaire
// ============================================

import type {
  Product,
  HairProfile,
  ScoredProduct,
  HairRoutineRecommendation,
  Compatibility,
  ProductConcernScoring,
  ProductPorosityCompat,
  ProductTextureCompat,
  ProductScalpCompat,
  HairTexture,
  HairPorosity,
  ScalpType,
  Concern,
} from '@/types/database.types';

// ===================
// TYPES INTERNES
// ===================

interface MatchingData {
  products: Product[];
  textures: HairTexture[];
  porosities: HairPorosity[];
  scalpTypes: ScalpType[];
  concerns: Concern[];
  concernScoring: ProductConcernScoring[];
  porosityCompat: ProductPorosityCompat[];
  textureCompat: ProductTextureCompat[];
  scalpCompat: ProductScalpCompat[];
}

interface ProductScore {
  product: Product;
  totalScore: number;
  concernScore: number;
  porosityScore: number;
  textureScore: number;
  scalpScore: number;
  compatibility: Compatibility;
  reason: string;
}

// ===================
// RÈGLES MÉTIER EXPERTES
// ===================

/**
 * Règle 1: Produits INTERDITS selon porosité
 * - Porosité faible + Karité/Ricin/Olive/Fenugrec = INTERDIT (trop lourds)
 * - Porosité forte + Pépins de Raisin seul = pas efficace
 */
const FORBIDDEN_COMBOS: Record<string, string[]> = {
  'faible': ['beurre-karite', 'huile-ricin', 'huile-olive', 'macerat-fenugrec'], // Trop lourds pour cuticules fermées
};

/**
 * Règle 2: Produits RECOMMANDÉS selon porosité pour le FINISH
 */
const FINISH_BY_POROSITY: Record<string, string[]> = {
  'faible': ['huile-pepins-raisin', 'huile-argan'],
  'moyenne': ['huile-argan', 'gel-aloe-vera', 'huile-pepins-raisin'],
  'forte': ['beurre-karite', 'huile-avocat', 'huile-argan'],
};

/**
 * Règle 3: Produits RECOMMANDÉS selon texture pour le FINISH
 */
const FINISH_BY_TEXTURE: Record<string, string[]> = {
  'lisse': ['huile-pepins-raisin', 'huile-argan'],
  'ondule': ['huile-argan', 'gel-aloe-vera'],
  'boucle': ['gel-aloe-vera', 'huile-argan', 'beurre-karite'],
  'crepu': ['beurre-karite', 'huile-avocat', 'gel-aloe-vera'],
};

/**
 * Règle 4: Cleanser selon cuir chevelu
 */
const CLEANSER_BY_SCALP: Record<string, string> = {
  'gras': 'ghassoul-atlas-pur',
  'sec': 'shampoing-base-neutre',
  'normal': 'shampoing-base-neutre',
  'sensible': 'shampoing-base-neutre',
};

/**
 * Règle 5: Treatment selon concern principal
 * Inclut les nouveaux produits: hydrolats, macérats, actifs, HE
 */
const TREATMENT_BY_CONCERN: Record<string, string[]> = {
  'chute': ['huile-ricin', 'he-romarin', 'macerat-fenugrec', 'macerat-oignon', 'hydrolat-romarin'],
  'pousse': ['huile-ricin', 'he-romarin', 'macerat-fenugrec', 'hydrolat-romarin', 'hydrolat-menthe'],
  'pellicules': ['huile-nigelle', 'he-tea-tree', 'macerat-ail', 'hydrolat-lavande'],
  'casse': ['proteines-soie', 'huile-avocat', 'proteines-riz', 'panthenol-b5'],
  'secheresse': ['huile-avocat', 'gel-aloe-vera', 'glycerine-vegetale', 'huile-olive', 'hydrolat-rose'],
  'frisottis': ['huile-argan', 'gel-aloe-vera', 'glycerine-vegetale'],
  'volume': ['ghassoul-atlas-pur', 'proteines-riz', 'hydrolat-sauge'],
  'brillance': ['huile-argan', 'proteines-soie', 'he-orange', 'panthenol-b5'],
};

/**
 * Règle 6: Hydrolats selon cuir chevelu (produits doux à pulvériser)
 */
const HYDROLAT_BY_SCALP: Record<string, string[]> = {
  'gras': ['hydrolat-sauge', 'hydrolat-romarin', 'hydrolat-menthe'],
  'sec': ['hydrolat-rose', 'hydrolat-lavande'],
  'normal': ['hydrolat-rose', 'hydrolat-romarin'],
  'sensible': ['hydrolat-rose', 'hydrolat-lavande'],
};

/**
 * Règle 7: Huiles essentielles selon concern (usage expert, dilué)
 * ⚠️ Interdit femmes enceintes/allaitantes
 */
const ESSENTIAL_OIL_BY_CONCERN: Record<string, string[]> = {
  'chute': ['he-romarin'],
  'pousse': ['he-romarin'],
  'pellicules': ['he-tea-tree', 'he-lavande'],
  'secheresse': ['he-lavande'],
  'brillance': ['he-orange'],
};

// ===================
// FONCTIONS UTILITAIRES
// ===================

function getCompatibilityBonus(compat: Compatibility): number {
  switch (compat) {
    case 'recommended': return 3;
    case 'compatible': return 0;
    case 'not_recommended': return -2;
    case 'forbidden': return -10;
    default: return 0;
  }
}

function findBySlug<T extends { slug: string }>(items: T[], slug: string): T | undefined {
  return items.find(item => item.slug === slug);
}

function findById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id);
}

// ===================
// SCORING PAR ÉTAPE
// ===================

/**
 * Score un produit pour l'étape CLEANSER
 * Critère principal: Type de cuir chevelu
 */
function scoreCleanser(
  product: Product,
  profile: HairProfile,
  data: MatchingData
): ProductScore {
  const scalpType = findById(data.scalpTypes, profile.scalpTypeId);
  const scalpSlug = scalpType?.slug || 'normal';
  
  let totalScore = 0;
  let reason = '';
  let compatibility: Compatibility = 'compatible';
  
  // Score basé sur le cuir chevelu
  const scalpCompat = data.scalpCompat.find(
    sc => sc.product_id === product.id && sc.scalp_type_id === profile.scalpTypeId
  );
  
  if (scalpCompat) {
    totalScore += scalpCompat.score || 5;
    compatibility = scalpCompat.compatibility;
  }
  
  // Bonus si c'est LE produit recommandé pour ce scalp
  if (CLEANSER_BY_SCALP[scalpSlug] === product.slug) {
    totalScore += 5;
    reason = `Idéal pour cuir chevelu ${scalpType?.name?.toLowerCase() || scalpSlug}`;
  }
  
  // Malus si non recommandé
  totalScore += getCompatibilityBonus(compatibility);
  
  return {
    product,
    totalScore,
    concernScore: 0,
    porosityScore: 0,
    textureScore: 0,
    scalpScore: totalScore,
    compatibility,
    reason: reason || `Nettoyant adapté`,
  };
}

/**
 * Score un produit pour l'étape TREATMENT
 * Critère principal: Concern (problème capillaire)
 */
function scoreTreatment(
  product: Product,
  profile: HairProfile,
  data: MatchingData
): ProductScore {
  let concernScore = 0;
  let porosityScore = 0;
  let reason = '';
  let compatibility: Compatibility = 'compatible';
  
  // Score par concern
  for (const concernId of profile.concernIds) {
    const scoring = data.concernScoring.find(
      cs => cs.product_id === product.id && cs.concern_id === concernId
    );
    if (scoring) {
      concernScore += scoring.score;
    }
  }
  
  // Identifier le concern principal ciblé
  const concernNames: string[] = [];
  for (const concernId of profile.concernIds) {
    const concern = findById(data.concerns, concernId);
    if (concern) {
      const treatments = TREATMENT_BY_CONCERN[concern.slug] || [];
      if (treatments.includes(product.slug)) {
        concernNames.push(concern.name);
      }
    }
  }
  
  if (concernNames.length > 0) {
    reason = `Cible : ${concernNames.join(', ')}`;
  }
  
  // Score porosité (important pour les treatments aussi)
  const porosityCompat = data.porosityCompat.find(
    pc => pc.product_id === product.id && pc.porosity_id === profile.porosityId
  );
  
  if (porosityCompat) {
    porosityScore = porosityCompat.score || 5;
    compatibility = porosityCompat.compatibility;
  }
  
  const totalScore = concernScore + porosityScore + getCompatibilityBonus(compatibility);
  
  return {
    product,
    totalScore,
    concernScore,
    porosityScore,
    textureScore: 0,
    scalpScore: 0,
    compatibility,
    reason: reason || `Soin traitant`,
  };
}

/**
 * Score un produit pour l'étape FINISH
 * Critères principaux: Porosité + Texture (règles expertes strictes)
 */
function scoreFinish(
  product: Product,
  profile: HairProfile,
  data: MatchingData
): ProductScore {
  const porosity = findById(data.porosities, profile.porosityId);
  const texture = findById(data.textures, profile.textureId);
  const porositySlug = porosity?.slug || 'moyenne';
  const textureSlug = texture?.slug || 'ondule';
  
  let porosityScore = 0;
  let textureScore = 0;
  let reason = '';
  let compatibility: Compatibility = 'compatible';
  
  // RÈGLE STRICTE: Vérifier les interdictions
  const forbiddenSlugs = FORBIDDEN_COMBOS[porositySlug] || [];
  if (forbiddenSlugs.includes(product.slug)) {
    return {
      product,
      totalScore: -100,
      concernScore: 0,
      porosityScore: -10,
      textureScore: 0,
      scalpScore: 0,
      compatibility: 'forbidden',
      reason: `⚠️ Trop lourd pour porosité ${porositySlug}`,
    };
  }
  
  // Score porosité
  const porosityCompat = data.porosityCompat.find(
    pc => pc.product_id === product.id && pc.porosity_id === profile.porosityId
  );
  
  if (porosityCompat) {
    porosityScore = porosityCompat.score || 5;
    compatibility = porosityCompat.compatibility;
  }
  
  // Bonus si dans la liste recommandée pour cette porosité
  const recommendedByPorosity = FINISH_BY_POROSITY[porositySlug] || [];
  if (recommendedByPorosity.includes(product.slug)) {
    porosityScore += 3;
  }
  
  // Score texture
  const textureCompat = data.textureCompat.find(
    tc => tc.product_id === product.id && tc.texture_id === profile.textureId
  );
  
  if (textureCompat) {
    textureScore = textureCompat.score || 5;
    if (textureCompat.compatibility === 'recommended') {
      textureScore += 2;
    }
  }
  
  // Bonus si dans la liste recommandée pour cette texture
  const recommendedByTexture = FINISH_BY_TEXTURE[textureSlug] || [];
  if (recommendedByTexture.includes(product.slug)) {
    textureScore += 3;
  }
  
  // Construire la raison
  const reasons: string[] = [];
  if (recommendedByPorosity.includes(product.slug)) {
    reasons.push(`porosité ${porositySlug}`);
  }
  if (recommendedByTexture.includes(product.slug)) {
    reasons.push(`cheveux ${texture?.name?.toLowerCase() || textureSlug}`);
  }
  
  if (reasons.length > 0) {
    reason = `Parfait pour ${reasons.join(' et ')}`;
  } else {
    reason = 'Scellant/Finition';
  }
  
  const totalScore = porosityScore + textureScore + getCompatibilityBonus(compatibility);
  
  return {
    product,
    totalScore,
    concernScore: 0,
    porosityScore,
    textureScore,
    scalpScore: 0,
    compatibility,
    reason,
  };
}

// ===================
// SÉLECTION DU MEILLEUR
// ===================

function selectBest(scores: ProductScore[]): ProductScore | null {
  if (scores.length === 0) return null;
  
  // Filtrer les produits interdits
  const valid = scores.filter(s => s.compatibility !== 'forbidden' && s.totalScore > -50);
  
  if (valid.length === 0) return null;
  
  // Trier par score décroissant
  valid.sort((a, b) => b.totalScore - a.totalScore);
  
  return valid[0];
}

// ===================
// GÉNÉRATION DE LA ROUTINE
// ===================

export function generateHairRoutine(
  profile: HairProfile,
  data: MatchingData
): HairRoutineRecommendation | null {
  // Séparer les produits par type
  const cleansers = data.products.filter(p => p.product_type === 'cleanser' && p.is_available);
  const treatments = data.products.filter(p => p.product_type === 'treatment' && p.is_available);
  const finishes = data.products.filter(p => p.product_type === 'finish' && p.is_available);
  
  // ÉTAPE 1: LAVER - Basé sur le cuir chevelu
  const cleanserScores = cleansers.map(p => scoreCleanser(p, profile, data));
  const bestCleanser = selectBest(cleanserScores);
  
  // ÉTAPE 2: TRAITER - Basé sur les concerns
  const treatmentScores = treatments.map(p => scoreTreatment(p, profile, data));
  const sortedTreatments = treatmentScores
    .filter(s => s.compatibility !== 'forbidden' && s.totalScore > -50)
    .sort((a, b) => b.totalScore - a.totalScore);
  const bestTreatment = sortedTreatments[0] || null;
  
  // ÉTAPE 3: SCELLER/NOURRIR - Basé sur porosité + texture
  const finishScores = finishes.map(p => scoreFinish(p, profile, data));
  const bestFinish = selectBest(finishScores);
  
  // Vérifier qu'on a une routine complète
  if (!bestCleanser || !bestTreatment || !bestFinish) {
    console.error('Impossible de générer une routine complète');
    return null;
  }
  
  // Construire les produits scorés principaux
  const routine: ScoredProduct[] = [
    {
      ...bestCleanser.product,
      score: bestCleanser.totalScore,
      step: 'cleanser',
      reason: bestCleanser.reason,
      compatibility: bestCleanser.compatibility,
    },
    {
      ...bestTreatment.product,
      score: bestTreatment.totalScore,
      step: 'treatment',
      reason: bestTreatment.reason,
      compatibility: bestTreatment.compatibility,
    },
    {
      ...bestFinish.product,
      score: bestFinish.totalScore,
      step: 'finish',
      reason: bestFinish.reason,
      compatibility: bestFinish.compatibility,
    },
  ];
  
  // PRODUITS COMPLÉMENTAIRES: Top 3 traitements additionnels (score > 5)
  const additionalProducts: ScoredProduct[] = sortedTreatments
    .slice(1, 4) // Prendre les 3 suivants après le meilleur
    .filter(s => s.totalScore > 5) // Score minimum pour être recommandé
    .map(s => ({
      ...s.product,
      score: s.totalScore,
      step: 'treatment' as const,
      reason: s.reason || 'Recommandé pour votre profil',
      compatibility: s.compatibility,
    }));
  
  // Calculer les prix
  const totalPrice = routine.reduce((sum, p) => sum + p.price, 0);
  const discountPercent = 10;
  const discountAmount = Math.round(totalPrice * (discountPercent / 100) * 100) / 100;
  const finalPrice = totalPrice - discountAmount;
  
  // Calculer le match score
  const maxPossibleScore = 30; // Score max théorique par produit
  const totalObtained = routine.reduce((sum, p) => sum + Math.max(0, p.score), 0);
  const matchScore = Math.min(100, Math.round((totalObtained / (maxPossibleScore * 3)) * 100) + 60);
  
  // Récupérer les noms pour le profil
  const texture = findById(data.textures, profile.textureId);
  const porosity = findById(data.porosities, profile.porosityId);
  const scalpType = findById(data.scalpTypes, profile.scalpTypeId);
  const concernNames = profile.concernIds
    .map(id => findById(data.concerns, id)?.name)
    .filter(Boolean) as string[];
  
  return {
    products: routine,
    additionalProducts: additionalProducts.length > 0 ? additionalProducts : undefined,
    totalPrice,
    discountPercent,
    discountAmount,
    finalPrice,
    matchScore,
    generatedAt: new Date().toISOString(),
    profile: {
      texture: texture?.name || 'Non spécifié',
      porosity: porosity?.name || 'Non spécifiée',
      scalpType: scalpType?.name || 'Non spécifié',
      concerns: concernNames,
    },
  };
}

// ===================
// EXPORT PAR DÉFAUT
// ===================

export default generateHairRoutine;
