/**
 * TEST 03: Vérification des tables de base de données
 * 
 * Ce script vérifie que toutes les tables nécessaires existent.
 * 
 * Exécution: node scripts/test-03-tables.js
 */

const dotenv = require('dotenv');
const path = require('path');

// Charger les variables d'environnement
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('\n🔍 TEST 03: Vérification des tables\n');
console.log('='.repeat(50));

// Tables requises pour l'application
const REQUIRED_TABLES = {
  // Tables de base (hair care)
  'products': 'Produits capillaires',
  'categories': 'Catégories de produits',
  'hair_textures': 'Types de texture capillaire',
  'hair_porosities': 'Niveaux de porosité',
  'scalp_types': 'Types de cuir chevelu',
  'concerns': 'Préoccupations capillaires',
  'diagnostic_sessions': 'Sessions de diagnostic',
  'orders': 'Commandes',
  'order_items': 'Lignes de commande',
  
  // Tables user management (nouvelle migration)
  'profiles': 'Profils utilisateurs',
  'user_hair_profiles': 'Profils capillaires utilisateurs',
};

async function checkTables() {
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  const results = {
    existing: [],
    missing: [],
  };
  
  for (const [tableName, description] of Object.entries(REQUIRED_TABLES)) {
    try {
      // Essayer de sélectionner une ligne de la table
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);
      
      if (error && (error.code === '42P01' || error.message.includes('does not exist'))) {
        console.log(`❌ ${tableName} - MANQUANTE (${description})`);
        results.missing.push({ name: tableName, description });
      } else if (error) {
        // Autre erreur (probablement RLS)
        console.log(`⚠️  ${tableName} - Existe mais accès limité (${description})`);
        results.existing.push({ name: tableName, description, limited: true });
      } else {
        const count = data ? data.length : 0;
        console.log(`✅ ${tableName} - OK (${description})`);
        results.existing.push({ name: tableName, description, count });
      }
    } catch (err) {
      console.log(`❌ ${tableName} - ERREUR: ${err.message}`);
      results.missing.push({ name: tableName, description });
    }
  }
  
  return results;
}

async function checkData() {
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  console.log('\n📊 Vérification des données de seed:\n');
  
  // Vérifier les données de base
  const checks = [
    { table: 'products', label: 'Produits' },
    { table: 'hair_textures', label: 'Textures' },
    { table: 'hair_porosities', label: 'Porosités' },
    { table: 'scalp_types', label: 'Types cuir chevelu' },
    { table: 'concerns', label: 'Préoccupations' },
  ];
  
  let hasData = true;
  
  for (const check of checks) {
    try {
      const { data, error, count } = await supabase
        .from(check.table)
        .select('*', { count: 'exact' });
      
      if (error) {
        console.log(`⚠️  ${check.label}: Impossible de vérifier`);
      } else if (!data || data.length === 0) {
        console.log(`❌ ${check.label}: Aucune donnée (seed requis)`);
        hasData = false;
      } else {
        console.log(`✅ ${check.label}: ${data.length} enregistrements`);
      }
    } catch (err) {
      console.log(`❌ ${check.label}: Erreur - ${err.message}`);
      hasData = false;
    }
  }
  
  return hasData;
}

async function main() {
  const tableResults = await checkTables();
  const hasData = await checkData();
  
  console.log('\n' + '='.repeat(50));
  console.log('\n📋 RÉSUMÉ:\n');
  console.log(`   Tables existantes: ${tableResults.existing.length}/${Object.keys(REQUIRED_TABLES).length}`);
  console.log(`   Tables manquantes: ${tableResults.missing.length}`);
  
  if (tableResults.missing.length > 0) {
    console.log('\n⚠️  Tables manquantes:');
    tableResults.missing.forEach(t => console.log(`   - ${t.name} (${t.description})`));
  }
  
  console.log('\n' + '='.repeat(50));
  
  if (tableResults.missing.length === 0 && hasData) {
    console.log('\n🟢 TEST RÉUSSI: Toutes les tables existent avec données');
    process.exit(0);
  } else if (tableResults.missing.length === 0) {
    console.log('\n🟡 TEST PARTIEL: Tables OK mais données manquantes');
    console.log('   → Exécutez: supabase db reset (pour appliquer les seeds)');
    process.exit(0);
  } else {
    console.log('\n🔴 TEST ÉCHOUÉ: Tables manquantes');
    console.log('   → Exécutez: supabase db reset (pour appliquer les migrations)');
    process.exit(1);
  }
}

main();
