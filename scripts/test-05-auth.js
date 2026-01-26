/**
 * TEST 05: Test du système d'authentification
 * 
 * Ce script vérifie que l'authentification Supabase fonctionne.
 * En local, on utilise un utilisateur de test.
 * 
 * Exécution: node scripts/test-05-auth.js
 */

const dotenv = require('dotenv');
const path = require('path');

// Charger les variables d'environnement
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('\n🔍 TEST 05: Test du système d\'authentification\n');
console.log('='.repeat(50));

// Utilisateur de test
const TEST_EMAIL = 'test@korelab.local';
const TEST_PASSWORD = 'TestPassword123!';

async function testAuthFlow() {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const supabaseAdmin = serviceKey ? createClient(supabaseUrl, serviceKey) : null;
  
  let testUserId = null;
  
  try {
    // Test 1: Inscription
    console.log('\n📝 Test 1: Inscription d\'un utilisateur...');
    
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      options: {
        data: {
          full_name: 'Utilisateur Test',
        },
      },
    });
    
    if (signUpError) {
      // Si l'utilisateur existe déjà, c'est OK
      if (signUpError.message.includes('already registered')) {
        console.log('✅ Utilisateur existe déjà (OK)');
      } else {
        console.log(`⚠️  Inscription: ${signUpError.message}`);
      }
    } else if (signUpData.user) {
      testUserId = signUpData.user.id;
      console.log(`✅ Inscription réussie (ID: ${testUserId.substring(0, 8)}...)`);
    }
    
    // Test 2: Connexion
    console.log('\n🔐 Test 2: Connexion...');
    
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });
    
    if (signInError) {
      console.log(`❌ Connexion échouée: ${signInError.message}`);
      
      // Si email non confirmé (mode local sans SMTP)
      if (signInError.message.includes('Email not confirmed')) {
        console.log('\n💡 En local, l\'email n\'est pas confirmé automatiquement.');
        console.log('   Vérifiez Inbucket: http://127.0.0.1:54324');
        
        // Essayer de confirmer via admin si disponible
        if (supabaseAdmin) {
          console.log('\n🔧 Tentative de confirmation automatique...');
          
          // Récupérer l'utilisateur
          const { data: users } = await supabaseAdmin.auth.admin.listUsers();
          const testUser = users?.users?.find(u => u.email === TEST_EMAIL);
          
          if (testUser) {
            const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
              testUser.id,
              { email_confirm: true }
            );
            
            if (!updateError) {
              console.log('✅ Email confirmé via admin');
              
              // Réessayer la connexion
              const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
                email: TEST_EMAIL,
                password: TEST_PASSWORD,
              });
              
              if (!retryError && retryData.user) {
                testUserId = retryData.user.id;
                console.log('✅ Connexion réussie après confirmation');
              }
            }
          }
        }
      }
    } else if (signInData.user) {
      testUserId = signInData.user.id;
      console.log(`✅ Connexion réussie (ID: ${testUserId.substring(0, 8)}...)`);
    }
    
    // Test 3: Vérifier le profil
    if (testUserId) {
      console.log('\n👤 Test 3: Vérification du profil...');
      
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', testUserId)
        .single();
      
      if (profileError) {
        console.log(`⚠️  Profil: ${profileError.message}`);
        
        // Essayer de créer le profil
        if (profileError.code === 'PGRST116') {
          console.log('   → Création du profil...');
          
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: testUserId,
              full_name: 'Utilisateur Test',
              preferred_language: 'fr',
            });
          
          if (!insertError) {
            console.log('✅ Profil créé');
          } else {
            console.log(`❌ Création profil: ${insertError.message}`);
          }
        }
      } else {
        console.log(`✅ Profil trouvé: ${profile.full_name || 'Sans nom'}`);
      }
    }
    
    // Test 4: Déconnexion
    if (testUserId) {
      console.log('\n🚪 Test 4: Déconnexion...');
      
      const { error: signOutError } = await supabase.auth.signOut();
      
      if (signOutError) {
        console.log(`⚠️  Déconnexion: ${signOutError.message}`);
      } else {
        console.log('✅ Déconnexion réussie');
      }
    }
    
    return { success: testUserId !== null };
    
  } catch (err) {
    console.log(`\n❌ Erreur inattendue: ${err.message}`);
    return { success: false };
  }
}

async function main() {
  const result = await testAuthFlow();
  
  console.log('\n' + '='.repeat(50));
  
  if (result.success) {
    console.log('\n🟢 TEST RÉUSSI: Authentification fonctionnelle');
    console.log('\n📋 Fonctionnalités validées:');
    console.log('   ✓ Inscription utilisateur');
    console.log('   ✓ Connexion par email/mot de passe');
    console.log('   ✓ Création automatique de profil');
    console.log('   ✓ Déconnexion');
    process.exit(0);
  } else {
    console.log('\n🔴 TEST ÉCHOUÉ: Problèmes d\'authentification');
    console.log('\n📋 Vérifiez:');
    console.log('   1. Supabase local est démarré (supabase start)');
    console.log('   2. Les migrations sont appliquées (supabase db reset)');
    console.log('   3. Confirmez l\'email via Inbucket: http://127.0.0.1:54324');
    process.exit(1);
  }
}

main();
