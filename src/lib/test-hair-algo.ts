// ============================================
// KORELAB - Test Hair Care Algorithm
// Vérifie que l'algorithme produit les bonnes recommandations
// ============================================

import { generateHairRoutine } from './matching-engine';
import type {
  Product,
  HairTexture,
  HairPorosity,
  ScalpType,
  Concern,
  ProductConcernScoring,
  ProductPorosityCompat,
  ProductTextureCompat,
  ProductScalpCompat,
  HairProfile,
} from '@/types/database.types';

// ===================
// MOCK DATA (simule les données Supabase)
// ===================

const MOCK_TEXTURES: HairTexture[] = [
  { id: 'tex-1', name: 'Lisse', slug: 'lisse', description: '', icon: 'Minus', display_order: 1, created_at: '' },
  { id: 'tex-2', name: 'Ondulé', slug: 'ondule', description: '', icon: 'Waves', display_order: 2, created_at: '' },
  { id: 'tex-3', name: 'Bouclé', slug: 'boucle', description: '', icon: 'Circle', display_order: 3, created_at: '' },
  { id: 'tex-4', name: 'Frisé/Crépu', slug: 'crepu', description: '', icon: 'Zap', display_order: 4, created_at: '' },
];

const MOCK_POROSITIES: HairPorosity[] = [
  { id: 'por-1', name: 'Faible', slug: 'faible', description: '', care_tip: '', icon: '', display_order: 1, created_at: '' },
  { id: 'por-2', name: 'Moyenne', slug: 'moyenne', description: '', care_tip: '', icon: '', display_order: 2, created_at: '' },
  { id: 'por-3', name: 'Forte', slug: 'forte', description: '', care_tip: '', icon: '', display_order: 3, created_at: '' },
];

const MOCK_SCALP_TYPES: ScalpType[] = [
  { id: 'scalp-1', name: 'Sec', slug: 'sec', description: '', icon: '', display_order: 1, created_at: '' },
  { id: 'scalp-2', name: 'Gras', slug: 'gras', description: '', icon: '', display_order: 2, created_at: '' },
  { id: 'scalp-3', name: 'Normal', slug: 'normal', description: '', icon: '', display_order: 3, created_at: '' },
  { id: 'scalp-4', name: 'Sensible', slug: 'sensible', description: '', icon: '', display_order: 4, created_at: '' },
];

const MOCK_CONCERNS: Concern[] = [
  { id: 'con-1', name: 'Chute de Cheveux', slug: 'chute', description: '', icon: '', display_order: 1, created_at: '' },
  { id: 'con-2', name: 'Pellicules', slug: 'pellicules', description: '', icon: '', display_order: 2, created_at: '' },
  { id: 'con-3', name: 'Casse', slug: 'casse', description: '', icon: '', display_order: 3, created_at: '' },
  { id: 'con-4', name: 'Pousse Lente', slug: 'pousse', description: '', icon: '', display_order: 4, created_at: '' },
  { id: 'con-5', name: 'Sécheresse', slug: 'secheresse', description: '', icon: '', display_order: 5, created_at: '' },
];

const MOCK_PRODUCTS: Product[] = [
  // CLEANSERS
  {
    id: 'prod-ghassoul',
    category_id: null,
    name: 'Ghassoul de l\'Atlas Pur',
    slug: 'ghassoul-atlas-pur',
    description: '',
    short_description: 'Argile lavante purifiante',
    price: 75,
    compare_at_price: null,
    product_type: 'cleanser',
    product_subtype: 'clay_powder',
    image_url: null,
    video_url: null,
    stock_quantity: 100,
    is_available: true,
    usage_instructions: null,
    expert_note: null,
    tags: null,
    safety_warning: null,
    is_pregnancy_safe: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'prod-shampoo',
    category_id: null,
    name: 'Shampoing Base Neutre',
    slug: 'shampoing-base-neutre',
    description: '',
    short_description: 'Nettoyant doux quotidien',
    price: 65,
    compare_at_price: null,
    product_type: 'cleanser',
    product_subtype: 'shampoo',
    image_url: null,
    video_url: null,
    stock_quantity: 100,
    is_available: true,
    usage_instructions: null,
    expert_note: null,
    tags: null,
    safety_warning: null,
    is_pregnancy_safe: true,
    created_at: '',
    updated_at: '',
  },
  // TREATMENTS
  {
    id: 'prod-ricin',
    category_id: null,
    name: 'Huile de Ricin',
    slug: 'huile-ricin',
    description: '',
    short_description: 'Stimule la pousse',
    price: 95,
    compare_at_price: null,
    product_type: 'treatment',
    product_subtype: 'oil',
    image_url: null,
    video_url: null,
    stock_quantity: 100,
    is_available: true,
    usage_instructions: null,
    expert_note: null,
    tags: null,
    safety_warning: null,
    is_pregnancy_safe: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'prod-nigelle',
    category_id: null,
    name: 'Huile de Nigelle',
    slug: 'huile-nigelle',
    description: '',
    short_description: 'Anti-pelliculaire',
    price: 110,
    compare_at_price: null,
    product_type: 'treatment',
    product_subtype: 'oil',
    image_url: null,
    video_url: null,
    stock_quantity: 100,
    is_available: true,
    usage_instructions: null,
    expert_note: null,
    tags: null,
    safety_warning: null,
    is_pregnancy_safe: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'prod-avocat',
    category_id: null,
    name: 'Huile d\'Avocat',
    slug: 'huile-avocat',
    description: '',
    short_description: 'Nutrition profonde',
    price: 90,
    compare_at_price: null,
    product_type: 'treatment',
    product_subtype: 'oil',
    image_url: null,
    video_url: null,
    stock_quantity: 100,
    is_available: true,
    usage_instructions: null,
    expert_note: null,
    tags: null,
    safety_warning: null,
    is_pregnancy_safe: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'prod-proteines',
    category_id: null,
    name: 'Protéines de Soie',
    slug: 'proteines-soie',
    description: '',
    short_description: 'Anti-casse',
    price: 120,
    compare_at_price: null,
    product_type: 'treatment',
    product_subtype: 'active',
    image_url: null,
    video_url: null,
    stock_quantity: 100,
    is_available: true,
    usage_instructions: null,
    expert_note: null,
    tags: null,
    safety_warning: null,
    is_pregnancy_safe: true,
    created_at: '',
    updated_at: '',
  },
  // FINISH
  {
    id: 'prod-argan',
    category_id: null,
    name: 'Huile d\'Argan Bio',
    slug: 'huile-argan',
    description: '',
    short_description: 'Brillance universelle',
    price: 135,
    compare_at_price: null,
    product_type: 'finish',
    product_subtype: 'oil',
    image_url: null,
    video_url: null,
    stock_quantity: 100,
    is_available: true,
    usage_instructions: null,
    expert_note: null,
    tags: null,
    safety_warning: null,
    is_pregnancy_safe: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'prod-pepins',
    category_id: null,
    name: 'Huile Pépins de Raisin',
    slug: 'huile-pepins-raisin',
    description: '',
    short_description: 'Ultra-légère',
    price: 85,
    compare_at_price: null,
    product_type: 'finish',
    product_subtype: 'oil',
    image_url: null,
    video_url: null,
    stock_quantity: 100,
    is_available: true,
    usage_instructions: null,
    expert_note: null,
    tags: null,
    safety_warning: null,
    is_pregnancy_safe: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'prod-karite',
    category_id: null,
    name: 'Beurre de Karité',
    slug: 'beurre-karite',
    description: '',
    short_description: 'Scellant cheveux crépus',
    price: 95,
    compare_at_price: null,
    product_type: 'finish',
    product_subtype: 'butter',
    image_url: null,
    video_url: null,
    stock_quantity: 100,
    is_available: true,
    usage_instructions: null,
    expert_note: null,
    tags: null,
    safety_warning: null,
    is_pregnancy_safe: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'prod-aloe',
    category_id: null,
    name: 'Gel Aloe Vera',
    slug: 'gel-aloe-vera',
    description: '',
    short_description: 'Hydratant universel',
    price: 70,
    compare_at_price: null,
    product_type: 'finish',
    product_subtype: 'gel',
    image_url: null,
    video_url: null,
    stock_quantity: 100,
    is_available: true,
    usage_instructions: null,
    expert_note: null,
    tags: null,
    safety_warning: null,
    is_pregnancy_safe: true,
    created_at: '',
    updated_at: '',
  },
];

// CONCERN SCORING
const MOCK_CONCERN_SCORING: ProductConcernScoring[] = [
  // Ricin -> Chute/Pousse
  { id: '1', product_id: 'prod-ricin', concern_id: 'con-1', score: 10, created_at: '' },
  { id: '2', product_id: 'prod-ricin', concern_id: 'con-4', score: 10, created_at: '' },
  { id: '3', product_id: 'prod-ricin', concern_id: 'con-3', score: 7, created_at: '' },
  // Nigelle -> Pellicules
  { id: '4', product_id: 'prod-nigelle', concern_id: 'con-2', score: 10, created_at: '' },
  // Avocat -> Sécheresse/Casse
  { id: '5', product_id: 'prod-avocat', concern_id: 'con-5', score: 10, created_at: '' },
  { id: '6', product_id: 'prod-avocat', concern_id: 'con-3', score: 9, created_at: '' },
  // Protéines -> Casse
  { id: '7', product_id: 'prod-proteines', concern_id: 'con-3', score: 10, created_at: '' },
  // Karité -> Sécheresse
  { id: '8', product_id: 'prod-karite', concern_id: 'con-5', score: 10, created_at: '' },
];

// POROSITY COMPAT
const MOCK_POROSITY_COMPAT: ProductPorosityCompat[] = [
  // Faible
  { id: '1', product_id: 'prod-pepins', porosity_id: 'por-1', compatibility: 'recommended', score: 10, created_at: '' },
  { id: '2', product_id: 'prod-argan', porosity_id: 'por-1', compatibility: 'recommended', score: 9, created_at: '' },
  { id: '3', product_id: 'prod-karite', porosity_id: 'por-1', compatibility: 'forbidden', score: 1, created_at: '' },
  { id: '4', product_id: 'prod-ricin', porosity_id: 'por-1', compatibility: 'not_recommended', score: 3, created_at: '' },
  // Forte
  { id: '5', product_id: 'prod-karite', porosity_id: 'por-3', compatibility: 'recommended', score: 10, created_at: '' },
  { id: '6', product_id: 'prod-avocat', porosity_id: 'por-3', compatibility: 'recommended', score: 10, created_at: '' },
  { id: '7', product_id: 'prod-proteines', porosity_id: 'por-3', compatibility: 'recommended', score: 9, created_at: '' },
  { id: '8', product_id: 'prod-pepins', porosity_id: 'por-3', compatibility: 'not_recommended', score: 3, created_at: '' },
];

// TEXTURE COMPAT
const MOCK_TEXTURE_COMPAT: ProductTextureCompat[] = [
  // Lisse
  { id: '1', product_id: 'prod-pepins', texture_id: 'tex-1', compatibility: 'recommended', score: 10, created_at: '' },
  { id: '2', product_id: 'prod-karite', texture_id: 'tex-1', compatibility: 'forbidden', score: 1, created_at: '' },
  // Crépu
  { id: '3', product_id: 'prod-karite', texture_id: 'tex-4', compatibility: 'recommended', score: 10, created_at: '' },
  { id: '4', product_id: 'prod-avocat', texture_id: 'tex-4', compatibility: 'recommended', score: 9, created_at: '' },
  { id: '5', product_id: 'prod-aloe', texture_id: 'tex-4', compatibility: 'recommended', score: 8, created_at: '' },
];

// SCALP COMPAT
const MOCK_SCALP_COMPAT: ProductScalpCompat[] = [
  // Gras
  { id: '1', product_id: 'prod-ghassoul', scalp_type_id: 'scalp-2', compatibility: 'recommended', score: 10, created_at: '' },
  // Sec/Sensible
  { id: '2', product_id: 'prod-shampoo', scalp_type_id: 'scalp-1', compatibility: 'recommended', score: 10, created_at: '' },
  { id: '3', product_id: 'prod-shampoo', scalp_type_id: 'scalp-4', compatibility: 'recommended', score: 10, created_at: '' },
  { id: '4', product_id: 'prod-ghassoul', scalp_type_id: 'scalp-1', compatibility: 'not_recommended', score: 3, created_at: '' },
];

// ===================
// ASSEMBLAGE DES DONNÉES
// ===================

const MOCK_DATA = {
  products: MOCK_PRODUCTS,
  textures: MOCK_TEXTURES,
  porosities: MOCK_POROSITIES,
  scalpTypes: MOCK_SCALP_TYPES,
  concerns: MOCK_CONCERNS,
  concernScoring: MOCK_CONCERN_SCORING,
  porosityCompat: MOCK_POROSITY_COMPAT,
  textureCompat: MOCK_TEXTURE_COMPAT,
  scalpCompat: MOCK_SCALP_COMPAT,
};

// ===================
// TESTS
// ===================

function runTest(name: string, profile: HairProfile, expectedSlugs: { cleanser: string; treatment: string; finish: string }) {
  console.log('\n' + '='.repeat(60));
  console.log(`🧪 TEST: ${name}`);
  console.log('='.repeat(60));
  
  const result = generateHairRoutine(profile, MOCK_DATA);
  
  if (!result) {
    console.log('❌ ÉCHEC: Aucune routine générée');
    return false;
  }
  
  console.log(`\n📊 Profil:`);
  console.log(`   Texture: ${result.profile.texture}`);
  console.log(`   Porosité: ${result.profile.porosity}`);
  console.log(`   Cuir chevelu: ${result.profile.scalpType}`);
  console.log(`   Concerns: ${result.profile.concerns.join(', ')}`);
  
  console.log(`\n💇 Routine générée (Match ${result.matchScore}%):`);
  
  let allPassed = true;
  
  result.products.forEach((p, i) => {
    const step = ['LAVER', 'TRAITER', 'SCELLER'][i];
    const expectedSlug = Object.values(expectedSlugs)[i];
    const passed = p.slug === expectedSlug;
    
    if (!passed) allPassed = false;
    
    console.log(`\n   ${i + 1}. ${step}: ${p.name}`);
    console.log(`      Prix: ${p.price} MAD`);
    console.log(`      Score: ${p.score}`);
    console.log(`      Raison: ${p.reason}`);
    console.log(`      ${passed ? '✅' : '❌'} Expected: ${expectedSlug}, Got: ${p.slug}`);
  });
  
  console.log(`\n💰 Prix:`);
  console.log(`   Total: ${result.totalPrice} MAD`);
  console.log(`   Réduction: -${result.discountAmount} MAD (${result.discountPercent}%)`);
  console.log(`   Final: ${result.finalPrice} MAD`);
  
  console.log(`\n${allPassed ? '✅ TEST RÉUSSI' : '❌ TEST ÉCHOUÉ'}`);
  
  return allPassed;
}

// ===================
// EXÉCUTION DES TESTS
// ===================

console.log('\n🚀 KORELAB - Hair Care Algorithm Tests\n');

// TEST 1: Cheveux Crépus + Porosité Forte + Chute
// Attendu: Shampoing Doux + Ricin + Karité/Avocat
const test1 = runTest(
  'Cheveux Crépus + Porosité Forte + Chute',
  {
    textureId: 'tex-4',      // Crépu
    porosityId: 'por-3',     // Forte
    scalpTypeId: 'scalp-3',  // Normal
    concernIds: ['con-1'],   // Chute
  },
  {
    cleanser: 'shampoing-base-neutre',
    treatment: 'huile-ricin',
    finish: 'beurre-karite',
  }
);

// TEST 2: Cheveux Fins + Porosité Faible + Cuir Chevelu Gras
// Attendu: Ghassoul + (traitement) + Pépins de Raisin
const test2 = runTest(
  'Cheveux Fins (Lisse) + Porosité Faible + Cuir Gras',
  {
    textureId: 'tex-1',      // Lisse
    porosityId: 'por-1',     // Faible
    scalpTypeId: 'scalp-2',  // Gras
    concernIds: ['con-5'],   // Sécheresse
  },
  {
    cleanser: 'ghassoul-atlas-pur',
    treatment: 'huile-avocat',
    finish: 'huile-pepins-raisin',
  }
);

// TEST 3: Cheveux Bouclés + Pellicules + Cuir Sensible
// Attendu: Shampoing Doux + Nigelle + Argan
const test3 = runTest(
  'Cheveux Bouclés + Pellicules + Cuir Sensible',
  {
    textureId: 'tex-3',      // Bouclé
    porosityId: 'por-2',     // Moyenne
    scalpTypeId: 'scalp-4',  // Sensible
    concernIds: ['con-2'],   // Pellicules
  },
  {
    cleanser: 'shampoing-base-neutre',
    treatment: 'huile-nigelle',
    finish: 'huile-argan',
  }
);

// TEST 4: Casse + Porosité Forte
// Attendu: Protéines ou Avocat en treatment
const test4 = runTest(
  'Cheveux Ondulés + Casse + Porosité Forte',
  {
    textureId: 'tex-2',      // Ondulé
    porosityId: 'por-3',     // Forte
    scalpTypeId: 'scalp-3',  // Normal
    concernIds: ['con-3'],   // Casse
  },
  {
    cleanser: 'shampoing-base-neutre',
    treatment: 'proteines-soie',
    finish: 'beurre-karite',
  }
);

// RÉSUMÉ
console.log('\n' + '='.repeat(60));
console.log('📋 RÉSUMÉ DES TESTS');
console.log('='.repeat(60));
console.log(`Test 1 (Crépu + Forte + Chute): ${test1 ? '✅' : '❌'}`);
console.log(`Test 2 (Lisse + Faible + Gras): ${test2 ? '✅' : '❌'}`);
console.log(`Test 3 (Bouclé + Pellicules): ${test3 ? '✅' : '❌'}`);
console.log(`Test 4 (Casse + Forte): ${test4 ? '✅' : '❌'}`);

const allPassed = test1 && test2 && test3 && test4;
console.log(`\n${allPassed ? '🎉 TOUS LES TESTS PASSENT!' : '⚠️ CERTAINS TESTS ÉCHOUENT'}\n`);

export {};

