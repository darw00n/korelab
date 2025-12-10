-- ============================================
-- KORELAB - RLS Policies
-- Permettre l'accès public en lecture aux tables du diagnostic
-- ============================================

-- ===================
-- ACTIVER RLS SUR TOUTES LES TABLES
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
-- POLITIQUES DE LECTURE PUBLIQUE (anon)
-- Pour les tables de référence du diagnostic
-- ===================

-- Hair Textures - Lecture publique
CREATE POLICY "Allow public read access on hair_textures"
ON hair_textures FOR SELECT
TO anon, authenticated
USING (true);

-- Hair Porosities - Lecture publique
CREATE POLICY "Allow public read access on hair_porosities"
ON hair_porosities FOR SELECT
TO anon, authenticated
USING (true);

-- Scalp Types - Lecture publique
CREATE POLICY "Allow public read access on scalp_types"
ON scalp_types FOR SELECT
TO anon, authenticated
USING (true);

-- Concerns - Lecture publique
CREATE POLICY "Allow public read access on concerns"
ON concerns FOR SELECT
TO anon, authenticated
USING (true);

-- Categories - Lecture publique
CREATE POLICY "Allow public read access on categories"
ON categories FOR SELECT
TO anon, authenticated
USING (true);

-- Products - Lecture publique
CREATE POLICY "Allow public read access on products"
ON products FOR SELECT
TO anon, authenticated
USING (true);

-- Product Concern Scoring - Lecture publique
CREATE POLICY "Allow public read access on product_concern_scoring"
ON product_concern_scoring FOR SELECT
TO anon, authenticated
USING (true);

-- Product Texture Compat - Lecture publique
CREATE POLICY "Allow public read access on product_texture_compat"
ON product_texture_compat FOR SELECT
TO anon, authenticated
USING (true);

-- Product Porosity Compat - Lecture publique
CREATE POLICY "Allow public read access on product_porosity_compat"
ON product_porosity_compat FOR SELECT
TO anon, authenticated
USING (true);

-- Product Scalp Compat - Lecture publique
CREATE POLICY "Allow public read access on product_scalp_compat"
ON product_scalp_compat FOR SELECT
TO anon, authenticated
USING (true);

-- ===================
-- FIN DES POLITIQUES RLS
-- ===================

