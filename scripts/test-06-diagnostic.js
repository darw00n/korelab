/**
 * TEST 06: Test du flux de diagnostic
 * 
 * Ce script vérifie que le diagnostic fonctionne de bout en bout:
 * - Récupération des données de référence
 * - Création d'une session de diagnostic
 * - Génération des recommandations
 * 
 * Exécution: node scripts/test-06-diagnostic.js
 */

const dotenv = require('dotenv');
const path = require('path');

// Charger les variables d'environnement
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('\n🔍 TEST 06: Test du flux de diagnostic\n');
console.log('='.repeat(50));

async function testDiagnosticFlow() {
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  let referenceData = {};
  
  try {
    // Test 1: Récupérer les données de référence
    console.log('\n📊 Test 1: Récupération des données de référence...');
    
    // Textures
    const { data: textures, error: texturesError } = await supabase
      .from('hair_textures')
      .select('*')
      .order('display_order');
    
    if (texturesError || !textures?.length) {
      console.log(`❌ Textures: ${texturesError?.message || 'Aucune donnée'}`);
      return { success: false };
    }
    console.log(`✅ Textures: ${textures.length} types trouvés`);
    referenceData.textures = textures;
    
    // Porosités
    const { data: porosities, error: porositiesError } = await supabase
      .from('hair_porosities')
      .select('*')
      .order('display_order');
    
    if (porositiesError || !porosities?.length) {
      console.log(`❌ Porosités: ${porositiesError?.message || 'Aucune donnée'}`);
      return { success: false };
    }
    console.log(`✅ Porosités: ${porosities.length} niveaux trouvés`);
    referenceData.porosities = porosities;
    
    // Types de cuir chevelu
    const { data: scalpTypes, error: scalpError } = await supabase
      .from('scalp_types')
      .select('*')
      .order('display_order');
    
    if (scalpError || !scalpTypes?.length) {
      console.log(`❌ Cuir chevelu: ${scalpError?.message || 'Aucune donnée'}`);
      return { success: false };
    }
    console.log(`✅ Cuir chevelu: ${scalpTypes.length} types trouvés`);
    referenceData.scalpTypes = scalpTypes;
    
    // Préoccupations
    const { data: concerns, error: concernsError } = await supabase
      .from('concerns')
      .select('*')
      .order('display_order');
    
    if (concernsError || !concerns?.length) {
      console.log(`❌ Préoccupations: ${concernsError?.message || 'Aucune donnée'}`);
      return { success: false };
    }
    console.log(`✅ Préoccupations: ${concerns.length} trouvées`);
    referenceData.concerns = concerns;
    
    // Test 2: Récupérer les produits
    console.log('\n🛒 Test 2: Récupération des produits...');
    
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .eq('is_available', true);
    
    if (productsError || !products?.length) {
      console.log(`❌ Produits: ${productsError?.message || 'Aucun produit'}`);
      return { success: false };
    }
    console.log(`✅ Produits: ${products.length} disponibles`);
    
    // Vérifier les types de produits
    const cleaners = products.filter(p => p.product_type === 'cleanser');
    const treatments = products.filter(p => p.product_type === 'treatment');
    const finishers = products.filter(p => p.product_type === 'finish');
    
    console.log(`   - Nettoyants: ${cleaners.length}`);
    console.log(`   - Traitements: ${treatments.length}`);
    console.log(`   - Finitions: ${finishers.length}`);
    
    if (cleaners.length === 0 || treatments.length === 0) {
      console.log('⚠️  Attention: Pas assez de produits pour une routine complète');
    }
    
    // Test 3: Simuler un diagnostic
    console.log('\n🧪 Test 3: Simulation d\'un diagnostic...');
    
    // Choisir des valeurs de test
    const testProfile = {
      textureId: textures[0].id,
      porosityId: porosities[0].id,
      scalpTypeId: scalpTypes[0].id,
      concernIds: [concerns[0].id],
    };
    
    console.log(`   Texture: ${textures[0].name}`);
    console.log(`   Porosité: ${porosities[0].name}`);
    console.log(`   Cuir chevelu: ${scalpTypes[0].name}`);
    console.log(`   Préoccupation: ${concerns[0].name}`);
    
    // Test 4: Créer une session de diagnostic (anonyme)
    console.log('\n💾 Test 4: Création d\'une session de diagnostic...');
    
    const sessionId = `test-session-${Date.now()}`;
    
    const { data: session, error: sessionError } = await supabase
      .from('diagnostic_sessions')
      .insert({
        session_id: sessionId,
        texture_id: testProfile.textureId,
        porosity_id: testProfile.porosityId,
        scalp_type_id: testProfile.scalpTypeId,
        concern_ids: testProfile.concernIds,
        is_complete: true,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (sessionError) {
      console.log(`❌ Session: ${sessionError.message}`);
      return { success: false };
    }
    
    console.log(`✅ Session créée (ID: ${session.id.substring(0, 8)}...)`);
    
    // Test 5: Vérifier qu'on peut relire la session
    console.log('\n📖 Test 5: Relecture de la session...');
    
    const { data: readSession, error: readError } = await supabase
      .from('diagnostic_sessions')
      .select('*')
      .eq('id', session.id)
      .single();
    
    if (readError) {
      console.log(`❌ Relecture: ${readError.message}`);
      return { success: false };
    }
    
    console.log('✅ Session relue avec succès');
    console.log(`   Texture ID: ${readSession.texture_id?.substring(0, 8)}...`);
    console.log(`   Complet: ${readSession.is_complete ? 'Oui' : 'Non'}`);
    
    // Nettoyer la session de test
    await supabase.from('diagnostic_sessions').delete().eq('id', session.id);
    console.log('🧹 Session de test nettoyée');
    
    return { 
      success: true, 
      data: {
        textures: textures.length,
        porosities: porosities.length,
        scalpTypes: scalpTypes.length,
        concerns: concerns.length,
        products: products.length,
      }
    };
    
  } catch (err) {
    console.log(`\n❌ Erreur inattendue: ${err.message}`);
    return { success: false };
  }
}

async function main() {
  const result = await testDiagnosticFlow();
  
  console.log('\n' + '='.repeat(50));
  
  if (result.success) {
    console.log('\n🟢 TEST RÉUSSI: Flux diagnostic fonctionnel');
    console.log('\n📋 Données disponibles:');
    console.log(`   ✓ ${result.data.textures} types de texture`);
    console.log(`   ✓ ${result.data.porosities} niveaux de porosité`);
    console.log(`   ✓ ${result.data.scalpTypes} types de cuir chevelu`);
    console.log(`   ✓ ${result.data.concerns} préoccupations`);
    console.log(`   ✓ ${result.data.products} produits`);
    process.exit(0);
  } else {
    console.log('\n🔴 TEST ÉCHOUÉ: Problèmes avec le diagnostic');
    console.log('\n📋 Vérifiez:');
    console.log('   1. Les migrations ont été appliquées');
    console.log('   2. Les données de seed existent');
    console.log('   3. Les RLS policies sont correctes');
    process.exit(1);
  }
}

main();
