/**
 * TEST 01: Vérification de la configuration Supabase
 * 
 * Ce script vérifie que les variables d'environnement sont correctement configurées.
 * 
 * Exécution: npx ts-node --esm scripts/test-01-config.ts
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Charger les variables d'environnement
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('\n🔍 TEST 01: Vérification de la configuration Supabase\n');
console.log('='.repeat(50));

let hasErrors = false;

// Vérifier NEXT_PUBLIC_SUPABASE_URL
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!supabaseUrl) {
  console.log('❌ NEXT_PUBLIC_SUPABASE_URL: MANQUANT');
  hasErrors = true;
} else if (supabaseUrl === 'https://placeholder.supabase.co') {
  console.log('⚠️  NEXT_PUBLIC_SUPABASE_URL: Placeholder détecté (non configuré)');
  hasErrors = true;
} else {
  console.log(`✅ NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl.substring(0, 30)}...`);
}

// Vérifier NEXT_PUBLIC_SUPABASE_ANON_KEY
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!anonKey) {
  console.log('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY: MANQUANT');
  hasErrors = true;
} else if (anonKey === 'placeholder-key') {
  console.log('⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY: Placeholder détecté (non configuré)');
  hasErrors = true;
} else {
  console.log(`✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: ${anonKey.substring(0, 20)}...`);
}

// Vérifier SUPABASE_SERVICE_ROLE_KEY (optionnel mais recommandé)
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!serviceKey) {
  console.log('⚠️  SUPABASE_SERVICE_ROLE_KEY: Non configuré (optionnel)');
} else {
  console.log(`✅ SUPABASE_SERVICE_ROLE_KEY: ${serviceKey.substring(0, 20)}...`);
}

console.log('\n' + '='.repeat(50));

// Vérifier que le fichier .env.local existe
const envPath = path.resolve(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('\n❌ Le fichier .env.local n\'existe pas!');
  console.log('\n📝 Créez un fichier .env.local avec le contenu suivant:');
  console.log(`
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJvotre-clé-anon...
SUPABASE_SERVICE_ROLE_KEY=eyJvotre-clé-service...
`);
  hasErrors = true;
}

// Résultat final
if (hasErrors) {
  console.log('\n🔴 TEST ÉCHOUÉ: Configuration incomplète');
  console.log('\n📋 Actions requises:');
  console.log('   1. Créez un projet sur https://supabase.com');
  console.log('   2. Allez dans Settings > API');
  console.log('   3. Copiez les clés dans .env.local');
  process.exit(1);
} else {
  console.log('\n🟢 TEST RÉUSSI: Configuration Supabase OK');
  process.exit(0);
}
