-- ============================================
-- KORELAB - FIX RLS Policies
-- Script robuste qui supprime et recrée les politiques
-- ============================================

-- ===================
-- SUPPRIMER LES POLITIQUES EXISTANTES (si elles existent)
-- ===================

DROP POLICY IF EXISTS "Allow public read access on hair_textures" ON hair_textures;
DROP POLICY IF EXISTS "Allow public read access on hair_porosities" ON hair_porosities;
DROP POLICY IF EXISTS "Allow public read access on scalp_types" ON scalp_types;
DROP POLICY IF EXISTS "Allow public read access on concerns" ON concerns;
DROP POLICY IF EXISTS "Allow public read access on categories" ON categories;
DROP POLICY IF EXISTS "Allow public read access on products" ON products;
DROP POLICY IF EXISTS "Allow public read access on product_concern_scoring" ON product_concern_scoring;
DROP POLICY IF EXISTS "Allow public read access on product_texture_compat" ON product_texture_compat;
DROP POLICY IF EXISTS "Allow public read access on product_porosity_compat" ON product_porosity_compat;
DROP POLICY IF EXISTS "Allow public read access on product_scalp_compat" ON product_scalp_compat;

-- ===================
-- DÉSACTIVER RLS TEMPORAIREMENT (pour reset)
-- ===================

ALTER TABLE hair_textures DISABLE ROW LEVEL SECURITY;
ALTER TABLE hair_porosities DISABLE ROW LEVEL SECURITY;
ALTER TABLE scalp_types DISABLE ROW LEVEL SECURITY;
ALTER TABLE concerns DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE product_concern_scoring DISABLE ROW LEVEL SECURITY;
ALTER TABLE product_texture_compat DISABLE ROW LEVEL SECURITY;
ALTER TABLE product_porosity_compat DISABLE ROW LEVEL SECURITY;
ALTER TABLE product_scalp_compat DISABLE ROW LEVEL SECURITY;

-- ===================
-- RÉACTIVER RLS
-- ===================

ALTER TABLE hair_textures ENABLE ROW LEVEL SECURITY;
ALTER TABLE hair_porosities ENABLE ROW LEVEL SECURITY;
ALTER TABLE scalp_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE concerns ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_concern_scoring ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_texture_compat ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_porosity_compat ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_scalp_compat ENABLE ROW LEVEL SECURITY;

-- ===================
-- CRÉER LES POLITIQUES DE LECTURE PUBLIQUE
-- ===================

CREATE POLICY "Allow public read access on hair_textures"
ON hair_textures FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public read access on hair_porosities"
ON hair_porosities FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public read access on scalp_types"
ON scalp_types FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public read access on concerns"
ON concerns FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public read access on categories"
ON categories FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public read access on products"
ON products FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public read access on product_concern_scoring"
ON product_concern_scoring FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public read access on product_texture_compat"
ON product_texture_compat FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public read access on product_porosity_compat"
ON product_porosity_compat FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public read access on product_scalp_compat"
ON product_scalp_compat FOR SELECT
TO public
USING (true);

-- ===================
-- FIN
-- ===================

