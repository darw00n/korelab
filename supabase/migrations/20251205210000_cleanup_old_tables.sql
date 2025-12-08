-- ============================================
-- KORELAB - Cleanup Old Skin Care Tables
-- Supprime les anciennes tables avant Hair Care
-- ============================================

-- Supprimer les tables de scoring d'abord (dépendances)
DROP TABLE IF EXISTS product_scoring CASCADE;
DROP TABLE IF EXISTS product_skin_type CASCADE;
DROP TABLE IF EXISTS product_concern_scoring CASCADE;
DROP TABLE IF EXISTS product_porosity_compat CASCADE;
DROP TABLE IF EXISTS product_texture_compat CASCADE;
DROP TABLE IF EXISTS product_scalp_compat CASCADE;

-- Supprimer les tables de diagnostic
DROP TABLE IF EXISTS diagnostic_sessions CASCADE;

-- Supprimer les tables de commandes
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;

-- Supprimer les tables de reviews et promo
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS promo_codes CASCADE;

-- Supprimer les tables de produits et catégories
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Supprimer les tables de référence (anciennes)
DROP TABLE IF EXISTS skin_types CASCADE;
DROP TABLE IF EXISTS concerns CASCADE;
DROP TABLE IF EXISTS hair_textures CASCADE;
DROP TABLE IF EXISTS hair_porosities CASCADE;
DROP TABLE IF EXISTS scalp_types CASCADE;

-- Supprimer les types ENUM existants
DROP TYPE IF EXISTS product_type_enum CASCADE;
DROP TYPE IF EXISTS product_subtype_enum CASCADE;
DROP TYPE IF EXISTS order_status_enum CASCADE;
DROP TYPE IF EXISTS compatibility_enum CASCADE;

-- Confirmation
SELECT 'Anciennes tables supprimées avec succès' AS status;

