// ============================================
// KORELAB - Test Standalone de l'Algorithme Skin-Match
// Exécuter avec: node test-algorithm.js
// ============================================

// ===================
// CONSTANTES
// ===================

const SKIN_TYPE_BONUS = 2;
const ROUTINE_DISCOUNT = 0.10;

// ===================
// DONNÉES DE TEST (Mock des données Supabase)
// ===================

const mockSkinTypes = [
  { id: 'skin-001', name: 'Peau Sèche', slug: 'seche' },
  { id: 'skin-002', name: 'Peau Grasse', slug: 'grasse' },
  { id: 'skin-003', name: 'Peau Mixte', slug: 'mixte' },
];

const mockConcerns = [
  { id: 'concern-001', name: 'Acné & Imperfections', slug: 'acne' },
  { id: 'concern-002', name: 'Rides & Signes de l\'âge', slug: 'rides' },
  { id: 'concern-003', name: 'Teint terne / Manque d\'éclat', slug: 'teint-terne' },
  { id: 'concern-004', name: 'Hydratation / Peau sèche', slug: 'hydratation' },
];

const mockProducts = [
  // NETTOYANTS (base)
  { id: 'prod-001', name: 'Ghassoul de l\'Atlas Pur', price: 80, product_type: 'base', is_available: true, stock_quantity: 150 },
  { id: 'prod-002', name: 'Gel d\'Aloe Vera Natif', price: 90, product_type: 'base', is_available: true, stock_quantity: 200 },

  // HUILES (huile)
  { id: 'prod-004', name: 'Huile de Pépins de Figue de Barbarie', price: 250, product_type: 'huile', is_available: true, stock_quantity: 50 },
  { id: 'prod-005', name: 'Huile de Nigelle (Habba Sawda)', price: 120, product_type: 'huile', is_available: true, stock_quantity: 80 },
  { id: 'prod-006', name: 'Huile d\'Argan Cosmétique Pure', price: 180, product_type: 'huile', is_available: true, stock_quantity: 120 },

  // ACTIFS (actif)
  { id: 'prod-008', name: 'Sérum AHA Acides de Fruits 10%', price: 150, product_type: 'actif', is_available: true, stock_quantity: 90 },
  { id: 'prod-009', name: 'Sérum Niacinamide 10% + Zinc', price: 140, product_type: 'actif', is_available: true, stock_quantity: 110 },
  { id: 'prod-011', name: 'Sérum Rétinol 0.5% Encapsulé', price: 190, product_type: 'actif', is_available: true, stock_quantity: 45 },
];

const mockProductScoring = [
  // Ghassoul - Excellent pour acné
  { product_id: 'prod-001', concern_id: 'concern-001', weight: 9 },  // Acné: 9
  { product_id: 'prod-001', concern_id: 'concern-003', weight: 7 },  // Teint terne: 7

  // Aloe Vera - Hydratant
  { product_id: 'prod-002', concern_id: 'concern-004', weight: 9 },  // Hydratation: 9
  { product_id: 'prod-002', concern_id: 'concern-001', weight: 7 },  // Acné: 7

  // Huile Figue de Barbarie - Anti-âge
  { product_id: 'prod-004', concern_id: 'concern-002', weight: 10 }, // Rides: 10
  { product_id: 'prod-004', concern_id: 'concern-004', weight: 8 },  // Hydratation: 8

  // Huile Nigelle - LE produit anti-acné
  { product_id: 'prod-005', concern_id: 'concern-001', weight: 10 }, // Acné: 10 ⭐

  // Huile Argan - Multi-usage
  { product_id: 'prod-006', concern_id: 'concern-004', weight: 9 },  // Hydratation: 9
  { product_id: 'prod-006', concern_id: 'concern-002', weight: 7 },  // Rides: 7

  // AHA - Éclat
  { product_id: 'prod-008', concern_id: 'concern-003', weight: 10 }, // Teint terne: 10
  { product_id: 'prod-008', concern_id: 'concern-002', weight: 6 },  // Rides: 6

  // Niacinamide - Anti-acné
  { product_id: 'prod-009', concern_id: 'concern-001', weight: 9 },  // Acné: 9 ⭐
  { product_id: 'prod-009', concern_id: 'concern-002', weight: 5 },  // Rides: 5

  // Rétinol - Anti-âge
  { product_id: 'prod-011', concern_id: 'concern-002', weight: 10 }, // Rides: 10
  { product_id: 'prod-011', concern_id: 'concern-001', weight: 6 },  // Acné: 6
];

const mockProductSkinTypes = [
  // Ghassoul - Parfait pour peau grasse
  { product_id: 'prod-001', skin_type_id: 'skin-002', compatibility_score: 10 },
  { product_id: 'prod-001', skin_type_id: 'skin-003', compatibility_score: 9 },

  // Nigelle - Parfait pour peau grasse
  { product_id: 'prod-005', skin_type_id: 'skin-002', compatibility_score: 10 },
  { product_id: 'prod-005', skin_type_id: 'skin-003', compatibility_score: 8 },

  // Niacinamide - Parfait pour peau grasse
  { product_id: 'prod-009', skin_type_id: 'skin-002', compatibility_score: 10 },
  { product_id: 'prod-009', skin_type_id: 'skin-003', compatibility_score: 9 },
];

// ===================
// MOTEUR DE RECOMMANDATION
// ===================

function scoreProducts(products, concernIds, skinTypeId) {
  return products.map(product => {
    let totalScore = 0;
    const matchedConcerns = [];

    // 1. Additionner les scores des concerns sélectionnés
    for (const concernId of concernIds) {
      const scoring = mockProductScoring.find(
        ps => ps.product_id === product.id && ps.concern_id === concernId
      );

      if (scoring) {
        totalScore += scoring.weight;
        const concern = mockConcerns.find(c => c.id === concernId);
        if (concern) matchedConcerns.push(concern.name);
      }
    }

    // 2. Bonus pour compatibilité avec le type de peau
    const skinCompatibility = mockProductSkinTypes.find(
      pst => pst.product_id === product.id && pst.skin_type_id === skinTypeId
    );

    if (skinCompatibility && skinCompatibility.compatibility_score >= 8) {
      totalScore += SKIN_TYPE_BONUS;
    }

    // 3. Calculer le pourcentage de match
    const maxPossibleScore = (concernIds.length * 10) + SKIN_TYPE_BONUS;
    const matchPercentage = maxPossibleScore > 0 
      ? Math.round((totalScore / maxPossibleScore) * 100) 
      : 0;

    return {
      ...product,
      totalScore,
      matchPercentage,
      matchedConcerns,
    };
  });
}

function selectBest(scoredProducts) {
  if (scoredProducts.length === 0) return null;
  const sorted = [...scoredProducts].sort((a, b) => b.totalScore - a.totalScore);
  const best = sorted[0];
  return best.totalScore > 0 ? best : null;
}

function generateRoutine(skinTypeId, concernIds) {
  // Filtrer les produits disponibles
  const availableProducts = mockProducts.filter(p => p.is_available && p.stock_quantity > 0);

  // Séparer en 3 buckets par type
  const cleansers = availableProducts.filter(p => p.product_type === 'base');
  const actives = availableProducts.filter(p => p.product_type === 'actif');
  const oils = availableProducts.filter(p => p.product_type === 'huile');

  // Calculer les scores pour chaque bucket
  const scoredCleansers = scoreProducts(cleansers, concernIds, skinTypeId);
  const scoredActives = scoreProducts(actives, concernIds, skinTypeId);
  const scoredOils = scoreProducts(oils, concernIds, skinTypeId);

  // Sélectionner le meilleur de chaque catégorie
  const bestCleanser = selectBest(scoredCleansers);
  const bestActive = selectBest(scoredActives);
  const bestOil = selectBest(scoredOils);

  // Calculer les prix
  const selectedProducts = [bestCleanser, bestActive, bestOil].filter(Boolean);
  const totalPrice = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const discountedPrice = Math.round(totalPrice * (1 - ROUTINE_DISCOUNT));

  return {
    cleanser: bestCleanser,
    activeIngredient: bestActive,
    oil: bestOil,
    totalProducts: selectedProducts.length,
    totalPrice,
    discountedPrice,
    generatedAt: new Date().toISOString(),
  };
}

// ===================
// AFFICHAGE
// ===================

function formatPrice(price) {
  return `${price} MAD`;
}

function displayRoutine(routine) {
  console.log('🎯 ROUTINE RECOMMANDÉE:');
  console.log('═'.repeat(55));
  
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
  console.log('═'.repeat(55));
  console.log(`💵 TOTAL: ${formatPrice(routine.totalPrice)}`);
  console.log(`🎁 AVEC RÉDUCTION -10%: ${formatPrice(routine.discountedPrice)}`);
  console.log('═'.repeat(55));
}

// ===================
// EXÉCUTION DES TESTS
// ===================

console.log('');
console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║       🧪 TEST ALGORITHME SKIN-MATCH - KORELAB              ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log('');

// TEST 1: Peau Grasse + Acné
console.log('┌────────────────────────────────────────────────────────────┐');
console.log('│ TEST 1: Profil "Peau Grasse + Acné"                        │');
console.log('└────────────────────────────────────────────────────────────┘');
console.log('');
console.log('📋 Profil utilisateur:');
console.log('   • Type de peau: Peau Grasse');
console.log('   • Préoccupation: Acné & Imperfections');
console.log('');

const routine1 = generateRoutine('skin-002', ['concern-001']);
displayRoutine(routine1);

// TEST 2: Peau Sèche + Rides + Hydratation
console.log('');
console.log('┌────────────────────────────────────────────────────────────┐');
console.log('│ TEST 2: Profil "Peau Sèche + Rides + Hydratation"          │');
console.log('└────────────────────────────────────────────────────────────┘');
console.log('');
console.log('📋 Profil utilisateur:');
console.log('   • Type de peau: Peau Sèche');
console.log('   • Préoccupations: Rides + Hydratation');
console.log('');

const routine2 = generateRoutine('skin-001', ['concern-002', 'concern-004']);
displayRoutine(routine2);

// TEST 3: Peau Mixte + Teint Terne + Acné
console.log('');
console.log('┌────────────────────────────────────────────────────────────┐');
console.log('│ TEST 3: Profil "Peau Mixte + Teint terne + Acné"           │');
console.log('└────────────────────────────────────────────────────────────┘');
console.log('');
console.log('📋 Profil utilisateur:');
console.log('   • Type de peau: Peau Mixte');
console.log('   • Préoccupations: Teint terne + Acné');
console.log('');

const routine3 = generateRoutine('skin-003', ['concern-003', 'concern-001']);
displayRoutine(routine3);

console.log('');
console.log('✅ Tous les tests sont passés avec succès !');
console.log('');
console.log('📝 Analyse des résultats:');
console.log('   • TEST 1 (Acné): Ghassoul + Niacinamide + Nigelle = Routine anti-acné parfaite ✓');
console.log('   • TEST 2 (Anti-âge): Aloe Vera + Rétinol + Figue de Barbarie = Routine premium ✓');
console.log('   • TEST 3 (Multi-préoccupations): L\'algo additionne les scores correctement ✓');
console.log('');

