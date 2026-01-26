// Test script to verify new products in database
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testNewProducts() {
  console.log('🔍 Testing new products in database...\n');

  // 0. Check categories first
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('id, name, slug');

  console.log('📁 Categories in database:');
  categories?.forEach(c => console.log(`  - ${c.name} (slug: "${c.slug}")`));
  if (catError) console.error('  Error:', catError);

  // Try to insert a test category to see if it works
  console.log('\n🔧 Trying to insert test category...');
  const { data: newCat, error: newCatError } = await supabase
    .from('categories')
    .insert({ name: 'Test Hydrolats', slug: 'hydrolats-test', description: 'Test', icon: 'Droplet' })
    .select();
  
  if (newCatError) {
    console.log('  ❌ Insert failed:', newCatError.message);
  } else {
    console.log('  ✅ Insert succeeded:', newCat);
    // Clean up
    await supabase.from('categories').delete().eq('slug', 'hydrolats-test');
  }
  console.log('');

  // 1. Check if new products exist
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, name, slug, product_type, product_subtype')
    .in('slug', [
      'huile-olive',
      'hydrolat-rose',
      'hydrolat-romarin',
      'hydrolat-lavande',
      'hydrolat-sauge',
      'hydrolat-menthe',
      'macerat-fenugrec',
      'macerat-oignon',
      'macerat-ail',
      'proteines-riz',
      'panthenol-b5',
      'glycerine-vegetale',
      'he-tea-tree',
      'he-lavande',
      'he-eucalyptus',
      'he-orange'
    ]);

  if (productsError) {
    console.error('❌ Error fetching products:', productsError);
    return;
  }

  console.log(`✅ Found ${products?.length || 0} new products in database:\n`);
  products?.forEach(p => {
    console.log(`  - ${p.name} (${p.slug}) - type: ${p.product_type}, subtype: ${p.product_subtype}`);
  });

  if (!products || products.length === 0) {
    console.log('\n❌ No new products found! Migration may have failed.');
    return;
  }

  // 2. Check concern scoring for new products
  const productIds = products.map(p => p.id);
  const { data: concernScoring, error: csError } = await supabase
    .from('product_concern_scoring')
    .select('product_id, concern_id, score')
    .in('product_id', productIds);

  console.log(`\n📊 Concern scoring entries: ${concernScoring?.length || 0}`);
  if (csError) console.error('  Error:', csError);

  // 3. Check porosity compatibility
  const { data: porosityCompat, error: pcError } = await supabase
    .from('product_porosity_compat')
    .select('product_id, porosity_id, compatibility, score')
    .in('product_id', productIds);

  console.log(`📊 Porosity compat entries: ${porosityCompat?.length || 0}`);
  if (pcError) console.error('  Error:', pcError);

  // 4. Check texture compatibility
  const { data: textureCompat, error: tcError } = await supabase
    .from('product_texture_compat')
    .select('product_id, texture_id, compatibility, score')
    .in('product_id', productIds);

  console.log(`📊 Texture compat entries: ${textureCompat?.length || 0}`);
  if (tcError) console.error('  Error:', tcError);

  // 5. Check scalp compatibility
  const { data: scalpCompat, error: scError } = await supabase
    .from('product_scalp_compat')
    .select('product_id, scalp_type_id, compatibility, score')
    .in('product_id', productIds);

  console.log(`📊 Scalp compat entries: ${scalpCompat?.length || 0}`);
  if (scError) console.error('  Error:', scError);

  // Summary
  console.log('\n📋 SUMMARY:');
  console.log('============');
  console.log(`Products found: ${products?.length || 0}/16`);
  console.log(`Concern scores: ${concernScoring?.length || 0} (expected ~${16 * 6} = 96)`);
  console.log(`Porosity compat: ${porosityCompat?.length || 0} (expected ~${16 * 3} = 48)`);
  console.log(`Texture compat: ${textureCompat?.length || 0} (expected ~${16 * 4} = 64)`);
  console.log(`Scalp compat: ${scalpCompat?.length || 0} (expected ~${16 * 4} = 64)`);

  if (
    (concernScoring?.length || 0) < 10 ||
    (porosityCompat?.length || 0) < 10 ||
    (textureCompat?.length || 0) < 10 ||
    (scalpCompat?.length || 0) < 10
  ) {
    console.log('\n⚠️ Missing compatibility data! Products won\'t be recommended.');
  } else {
    console.log('\n✅ All compatibility data present!');
  }
}

testNewProducts().catch(console.error);
