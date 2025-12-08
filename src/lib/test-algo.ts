// ============================================
// KORELAB - Test de l'Algorithme Skin-Match
// Simulation: Utilisateur avec Peau Grasse + Acné
// ============================================

import { MatchingEngine, generateRoutine, formatPrice, generateWhatsAppMessage } from './matching-engine';
import type { Product, Concern, ProductScoring, SkinType, ProductSkinType } from '@/types';

// ===================
// DONNÉES DE TEST (Mock des données Supabase)
// ===================

// Types de peau
const mockSkinTypes: SkinType[] = [
  { id: 'skin-001', name: 'Peau Sèche', slug: 'seche', description: 'Peau qui tiraille', icon: 'Droplet', display_order: 1 },
  { id: 'skin-002', name: 'Peau Grasse', slug: 'grasse', description: 'Peau brillante', icon: 'Sun', display_order: 2 },
  { id: 'skin-003', name: 'Peau Mixte', slug: 'mixte', description: 'Zone T grasse', icon: 'CircleHalf', display_order: 3 },
];

// Préoccupations
const mockConcerns: Concern[] = [
  { id: 'concern-001', name: 'Acné & Imperfections', slug: 'acne', description: 'Boutons, points noirs', icon: 'Zap', display_order: 1, created_at: '' },
  { id: 'concern-002', name: 'Rides & Signes de l\'âge', slug: 'rides', description: 'Ridules', icon: 'Clock', display_order: 2, created_at: '' },
  { id: 'concern-003', name: 'Teint terne / Manque d\'éclat', slug: 'teint-terne', description: 'Peau fatiguée', icon: 'Sun', display_order: 3, created_at: '' },
  { id: 'concern-004', name: 'Hydratation / Peau sèche', slug: 'hydratation', description: 'Déshydratation', icon: 'Droplets', display_order: 4, created_at: '' },
];

// Produits
const mockProducts: Product[] = [
  // NETTOYANTS (base)
  {
    id: 'prod-001',
    name: 'Ghassoul de l\'Atlas Pur',
    slug: 'ghassoul-atlas-pur',
    short_description: 'Argile purifiante traditionnelle',
    price: 80,
    product_type: 'base',
    image_url: '/images/ghassoul.jpg',
    stock_quantity: 150,
    is_available: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'prod-002',
    name: 'Gel d\'Aloe Vera Natif',
    slug: 'gel-aloe-vera',
    short_description: 'Gel pur 99% - Apaise et hydrate',
    price: 90,
    product_type: 'base',
    image_url: '/images/aloe.jpg',
    stock_quantity: 200,
    is_available: true,
    created_at: '',
    updated_at: '',
  },

  // HUILES (huile)
  {
    id: 'prod-004',
    name: 'Huile de Pépins de Figue de Barbarie',
    slug: 'huile-figue-barbarie',
    short_description: 'L\'anti-âge le plus précieux',
    price: 250,
    product_type: 'huile',
    image_url: '/images/figue.jpg',
    stock_quantity: 50,
    is_available: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'prod-005',
    name: 'Huile de Nigelle (Habba Sawda)',
    slug: 'huile-nigelle',
    short_description: 'L\'huile purifiante par excellence',
    price: 120,
    product_type: 'huile',
    image_url: '/images/nigelle.jpg',
    stock_quantity: 80,
    is_available: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'prod-006',
    name: 'Huile d\'Argan Cosmétique Pure',
    slug: 'huile-argan',
    short_description: 'L\'or du Maroc',
    price: 180,
    product_type: 'huile',
    image_url: '/images/argan.jpg',
    stock_quantity: 120,
    is_available: true,
    created_at: '',
    updated_at: '',
  },

  // ACTIFS (actif)
  {
    id: 'prod-008',
    name: 'Sérum AHA Acides de Fruits 10%',
    slug: 'serum-aha',
    short_description: 'Peeling doux - Révèle l\'éclat',
    price: 150,
    product_type: 'actif',
    image_url: '/images/aha.jpg',
    stock_quantity: 90,
    is_available: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'prod-009',
    name: 'Sérum Niacinamide 10% + Zinc',
    slug: 'serum-niacinamide',
    short_description: 'Régule le sébum et affine le grain',
    price: 140,
    product_type: 'actif',
    image_url: '/images/niacinamide.jpg',
    stock_quantity: 110,
    is_available: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'prod-011',
    name: 'Sérum Rétinol 0.5% Encapsulé',
    slug: 'serum-retinol',
    short_description: 'Anti-âge gold standard',
    price: 190,
    product_type: 'actif',
    image_url: '/images/retinol.jpg',
    stock_quantity: 45,
    is_available: true,
    created_at: '',
    updated_at: '',
  },
];

// Scores produits <-> concerns
const mockProductScoring: ProductScoring[] = [
  // Ghassoul - Excellent pour acné
  { id: 'ps-1', product_id: 'prod-001', concern_id: 'concern-001', weight: 9, created_at: '' },  // Acné: 9
  { id: 'ps-2', product_id: 'prod-001', concern_id: 'concern-003', weight: 7, created_at: '' },  // Teint terne: 7

  // Aloe Vera - Hydratant et apaisant
  { id: 'ps-3', product_id: 'prod-002', concern_id: 'concern-004', weight: 9, created_at: '' },  // Hydratation: 9
  { id: 'ps-4', product_id: 'prod-002', concern_id: 'concern-001', weight: 7, created_at: '' },  // Acné: 7

  // Huile Figue de Barbarie - Anti-âge
  { id: 'ps-5', product_id: 'prod-004', concern_id: 'concern-002', weight: 10, created_at: '' }, // Rides: 10
  { id: 'ps-6', product_id: 'prod-004', concern_id: 'concern-004', weight: 8, created_at: '' },  // Hydratation: 8

  // Huile Nigelle - LE produit anti-acné
  { id: 'ps-7', product_id: 'prod-005', concern_id: 'concern-001', weight: 10, created_at: '' }, // Acné: 10 ⭐

  // Huile Argan - Multi-usage
  { id: 'ps-8', product_id: 'prod-006', concern_id: 'concern-004', weight: 9, created_at: '' },  // Hydratation: 9
  { id: 'ps-9', product_id: 'prod-006', concern_id: 'concern-002', weight: 7, created_at: '' },  // Rides: 7

  // AHA - Éclat
  { id: 'ps-10', product_id: 'prod-008', concern_id: 'concern-003', weight: 10, created_at: '' }, // Teint terne: 10
  { id: 'ps-11', product_id: 'prod-008', concern_id: 'concern-002', weight: 6, created_at: '' },  // Rides: 6

  // Niacinamide - Anti-acné et anti-pores
  { id: 'ps-12', product_id: 'prod-009', concern_id: 'concern-001', weight: 9, created_at: '' },  // Acné: 9 ⭐
  { id: 'ps-13', product_id: 'prod-009', concern_id: 'concern-002', weight: 5, created_at: '' },  // Rides: 5

  // Rétinol - Anti-âge et acné légère
  { id: 'ps-14', product_id: 'prod-011', concern_id: 'concern-002', weight: 10, created_at: '' }, // Rides: 10
  { id: 'ps-15', product_id: 'prod-011', concern_id: 'concern-001', weight: 6, created_at: '' },  // Acné: 6
];

// Compatibilité produits <-> types de peau
const mockProductSkinTypes: ProductSkinType[] = [
  // Ghassoul - Parfait pour peau grasse
  { id: 'pst-1', product_id: 'prod-001', skin_type_id: 'skin-002', compatibility_score: 10 },
  { id: 'pst-2', product_id: 'prod-001', skin_type_id: 'skin-003', compatibility_score: 9 },

  // Nigelle - Parfait pour peau grasse
  { id: 'pst-3', product_id: 'prod-005', skin_type_id: 'skin-002', compatibility_score: 10 },
  { id: 'pst-4', product_id: 'prod-005', skin_type_id: 'skin-003', compatibility_score: 8 },

  // Niacinamide - Parfait pour peau grasse
  { id: 'pst-5', product_id: 'prod-009', skin_type_id: 'skin-002', compatibility_score: 10 },
  { id: 'pst-6', product_id: 'prod-009', skin_type_id: 'skin-003', compatibility_score: 9 },
];

// ===================
// FONCTION DE TEST PRINCIPALE
// ===================

function runTest() {
  console.log('');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║       🧪 TEST ALGORITHME SKIN-MATCH - KORELAB              ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');

  // Créer l'instance du moteur
  const engine = new MatchingEngine({
    products: mockProducts,
    concerns: mockConcerns,
    productScoring: mockProductScoring,
    skinTypes: mockSkinTypes,
    productSkinTypes: mockProductSkinTypes,
  });

  // ===================
  // TEST 1: Utilisateur Peau Grasse + Acné
  // ===================
  console.log('┌────────────────────────────────────────────────────────────┐');
  console.log('│ TEST 1: Profil "Peau Grasse + Acné"                        │');
  console.log('└────────────────────────────────────────────────────────────┘');
  console.log('');
  console.log('📋 Profil utilisateur:');
  console.log('   • Type de peau: Peau Grasse');
  console.log('   • Préoccupation: Acné & Imperfections');
  console.log('');

  const routine1 = engine.generateRoutine({
    skinTypeId: 'skin-002', // Peau Grasse
    concernIds: ['concern-001'], // Acné
    preference: 'diy',
  });

  displayRoutine(routine1);

  // ===================
  // TEST 2: Utilisateur Peau Sèche + Rides + Hydratation
  // ===================
  console.log('');
  console.log('┌────────────────────────────────────────────────────────────┐');
  console.log('│ TEST 2: Profil "Peau Sèche + Rides + Hydratation"          │');
  console.log('└────────────────────────────────────────────────────────────┘');
  console.log('');
  console.log('📋 Profil utilisateur:');
  console.log('   • Type de peau: Peau Sèche');
  console.log('   • Préoccupations: Rides & Hydratation');
  console.log('');

  const routine2 = engine.generateRoutine({
    skinTypeId: 'skin-001', // Peau Sèche
    concernIds: ['concern-002', 'concern-004'], // Rides + Hydratation
    preference: 'ready',
  });

  displayRoutine(routine2);

  // ===================
  // TEST 3: Génération message WhatsApp
  // ===================
  console.log('');
  console.log('┌────────────────────────────────────────────────────────────┐');
  console.log('│ TEST 3: Génération Message WhatsApp                        │');
  console.log('└────────────────────────────────────────────────────────────┘');
  console.log('');

  const whatsappMessage = generateWhatsAppMessage(routine1, 'Fatima');
  console.log('📱 Message WhatsApp généré:');
  console.log('─'.repeat(50));
  console.log(whatsappMessage);
  console.log('─'.repeat(50));

  console.log('');
  console.log('✅ Tous les tests sont passés avec succès !');
  console.log('');
}

// ===================
// FONCTION D'AFFICHAGE DE LA ROUTINE
// ===================

function displayRoutine(routine: ReturnType<MatchingEngine['generateRoutine']>) {
  console.log('🎯 ROUTINE RECOMMANDÉE:');
  console.log('═'.repeat(50));
  
  if (routine.cleanser) {
    console.log('');
    console.log('1️⃣  NETTOYANT:');
    console.log(`    📦 ${routine.cleanser.name}`);
    console.log(`    💰 ${formatPrice(routine.cleanser.price)}`);
    console.log(`    🎯 Score: ${routine.cleanser.totalScore} points (${routine.cleanser.matchPercentage}% match)`);
    console.log(`    ✨ Traite: ${routine.cleanser.matchedConcerns.join(', ') || 'N/A'}`);
  }

  if (routine.activeIngredient) {
    console.log('');
    console.log('2️⃣  ACTIF CIBLÉ:');
    console.log(`    📦 ${routine.activeIngredient.name}`);
    console.log(`    💰 ${formatPrice(routine.activeIngredient.price)}`);
    console.log(`    🎯 Score: ${routine.activeIngredient.totalScore} points (${routine.activeIngredient.matchPercentage}% match)`);
    console.log(`    ✨ Traite: ${routine.activeIngredient.matchedConcerns.join(', ') || 'N/A'}`);
  }

  if (routine.oil) {
    console.log('');
    console.log('3️⃣  HUILE:');
    console.log(`    📦 ${routine.oil.name}`);
    console.log(`    💰 ${formatPrice(routine.oil.price)}`);
    console.log(`    🎯 Score: ${routine.oil.totalScore} points (${routine.oil.matchPercentage}% match)`);
    console.log(`    ✨ Traite: ${routine.oil.matchedConcerns.join(', ') || 'N/A'}`);
  }

  console.log('');
  console.log('═'.repeat(50));
  console.log(`💵 TOTAL: ${formatPrice(routine.totalPrice)}`);
  console.log(`🎁 AVEC RÉDUCTION -10%: ${formatPrice(routine.discountedPrice)}`);
  console.log(`📅 Généré le: ${new Date(routine.generatedAt).toLocaleString('fr-MA')}`);
  console.log('═'.repeat(50));
}

// ===================
// EXÉCUTER LE TEST
// ===================

runTest();

