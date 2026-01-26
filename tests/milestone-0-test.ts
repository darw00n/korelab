// ============================================
// MILESTONE 0: Test de Connexion Supabase
// ============================================

import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database.types';
import * as fs from 'fs';
import * as path from 'path';

// Charger .env.local manuellement
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && !key.startsWith('#')) {
      const value = valueParts.join('=').trim();
      process.env[key.trim()] = value;
    }
  });
}

// Couleurs pour le terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  success: (msg: string) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg: string) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  info: (msg: string) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  test: (msg: string) => console.log(`${colors.cyan}▶${colors.reset} ${msg}`),
};

// Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

console.log('\n' + '='.repeat(60));
console.log('🧪 MILESTONE 0: TEST DE CONNEXION SUPABASE');
console.log('='.repeat(60) + '\n');

async function runTests() {
  let passed = 0;
  let failed = 0;

  // Test 1: Vérifier les variables d'environnement
  log.test('Test 1: Variables d\'environnement');
  if (supabaseUrl && supabaseKey) {
    log.success(`URL: ${supabaseUrl}`);
    log.success(`Key: ${supabaseKey.substring(0, 20)}...`);
    passed++;
  } else {
    log.error('Variables d\'environnement manquantes');
    failed++;
    return;
  }

  // Test 2: Créer le client Supabase
  log.test('\nTest 2: Création du client Supabase');
  let supabase;
  try {
    supabase = createClient<Database>(supabaseUrl, supabaseKey);
    log.success('Client Supabase créé');
    passed++;
  } catch (error) {
    log.error(`Erreur: ${error}`);
    failed++;
    return;
  }

  // Test 3: Vérifier la connexion à la base de données
  log.test('\nTest 3: Connexion à la base de données');
  try {
    const { data, error } = await supabase
      .from('hair_textures')
      .select('*')
      .limit(1);
    
    if (error) throw error;
    
    log.success('Connexion réussie à la base de données');
    log.info(`Exemple de données: ${JSON.stringify(data?.[0] || {}, null, 2)}`);
    passed++;
  } catch (error: any) {
    log.error(`Erreur de connexion: ${error.message}`);
    failed++;
  }

  // Test 4: Vérifier les tables principales
  log.test('\nTest 4: Vérification des tables');
  const tables = [
    'hair_textures',
    'hair_porosities',
    'scalp_types',
    'concerns',
    'products',
    'categories',
  ];

  for (const table of tables) {
    try {
      const { count, error } = await supabase
        .from(table as any)
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      
      log.success(`Table "${table}": ${count} lignes`);
      passed++;
    } catch (error: any) {
      log.error(`Table "${table}": ${error.message}`);
      failed++;
    }
  }

  // Test 5: Tester une requête complexe (avec join)
  log.test('\nTest 5: Requête complexe (produits avec compatibilité)');
  try {
    const { data, error } = await supabase
      .from('products')
      .select('name, product_type, price')
      .eq('is_available', true)
      .limit(3);
    
    if (error) throw error;
    
    log.success(`${data?.length || 0} produits trouvés`);
    data?.forEach((product, i) => {
      log.info(`  ${i + 1}. ${product.name} - ${product.price} MAD`);
    });
    passed++;
  } catch (error: any) {
    log.error(`Erreur: ${error.message}`);
    failed++;
  }

  // Résultats
  console.log('\n' + '='.repeat(60));
  console.log(`${colors.cyan}📊 RÉSULTATS DU TEST${colors.reset}`);
  console.log('='.repeat(60));
  console.log(`${colors.green}✓ Tests réussis: ${passed}${colors.reset}`);
  console.log(`${colors.red}✗ Tests échoués: ${failed}${colors.reset}`);
  console.log(`Total: ${passed + failed}`);
  console.log('='.repeat(60) + '\n');

  if (failed === 0) {
    console.log(`${colors.green}🎉 MILESTONE 0 VALIDÉ !${colors.reset}\n`);
    console.log('Supabase local est configuré et fonctionnel.');
    console.log(`\nAccès Studio: ${colors.blue}http://127.0.0.1:54323${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`${colors.red}❌ MILESTONE 0 ÉCHOUÉ${colors.reset}\n`);
    process.exit(1);
  }
}

runTests().catch((error) => {
  log.error(`Erreur fatale: ${error.message}`);
  process.exit(1);
});
