/**
 * TEST 02: Test de connexion à Supabase
 * 
 * Ce script vérifie que Supabase est accessible et fonctionnel.
 * 
 * Exécution: node scripts/test-02-connection.js
 */

const dotenv = require('dotenv');
const path = require('path');

// Charger les variables d'environnement
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('\n🔍 TEST 02: Test de connexion à Supabase\n');
console.log('='.repeat(50));
console.log(`URL: ${supabaseUrl}`);
console.log('='.repeat(50));

async function testConnection() {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Test 1: Vérifier que le serveur répond
    console.log('\n📡 Test 1: Ping du serveur...');
    const startTime = Date.now();
    
    // Essayer une requête simple
    const { data, error } = await supabase.from('products').select('count').limit(1);
    
    const responseTime = Date.now() - startTime;
    
    if (error) {
      // Si l'erreur est "relation does not exist", ça veut dire que la connexion fonctionne
      // mais les tables n'existent pas encore
      if (error.message.includes('does not exist') || error.code === '42P01') {
        console.log(`✅ Serveur accessible (${responseTime}ms)`);
        console.log('⚠️  Tables non créées (normal si migrations pas encore appliquées)');
        return { connected: true, tablesExist: false };
      }
      
      console.log(`❌ Erreur: ${error.message}`);
      return { connected: false, tablesExist: false };
    }
    
    console.log(`✅ Serveur accessible (${responseTime}ms)`);
    console.log('✅ Tables existantes');
    return { connected: true, tablesExist: true };
    
  } catch (err) {
    console.log(`❌ Impossible de se connecter: ${err.message}`);
    
    if (err.message.includes('ECONNREFUSED') || err.message.includes('fetch failed')) {
      console.log('\n💡 Supabase local ne semble pas démarré.');
      console.log('\n📋 Pour démarrer Supabase local:');
      console.log('   1. Ouvrez un terminal');
      console.log('   2. Exécutez: supabase start');
      console.log('   3. Attendez que tous les services démarrent');
    }
    
    return { connected: false, tablesExist: false };
  }
}

async function main() {
  const result = await testConnection();
  
  console.log('\n' + '='.repeat(50));
  
  if (result.connected) {
    console.log('\n🟢 TEST RÉUSSI: Connexion Supabase OK');
    if (!result.tablesExist) {
      console.log('   → Prochaine étape: Créer les tables (migrations)');
    }
    process.exit(0);
  } else {
    console.log('\n🔴 TEST ÉCHOUÉ: Connexion impossible');
    process.exit(1);
  }
}

main();
