-- ============================================
-- KORELAB - Migration: New Products Schema
-- Date: 2026-01-26
-- Adds new product subtypes and categories
-- ============================================

-- ===================
-- 1. NEW PRODUCT SUBTYPES
-- ===================
-- Add new enum values for product subtypes

DO $$ 
BEGIN
    -- Add 'hydrolat' if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'hydrolat' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'product_subtype_enum')) THEN
        ALTER TYPE product_subtype_enum ADD VALUE 'hydrolat';
    END IF;
    
    -- Add 'macerat' if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'macerat' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'product_subtype_enum')) THEN
        ALTER TYPE product_subtype_enum ADD VALUE 'macerat';
    END IF;
    
    -- Add 'essential_oil' if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'essential_oil' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'product_subtype_enum')) THEN
        ALTER TYPE product_subtype_enum ADD VALUE 'essential_oil';
    END IF;
END $$;

-- ===================
-- 2. NEW CATEGORIES
-- ===================
-- Add new product categories

INSERT INTO categories (name, slug, description, icon) VALUES
    ('Hydrolats', 'hydrolats', 'Eaux florales apaisantes pour cuir chevelu et cheveux', 'Droplet'),
    ('Macérats', 'macerats', 'Huiles végétales infusées aux plantes actives', 'Leaf'),
    ('Huiles Essentielles', 'huiles-essentielles', 'Actifs concentrés à diluer - Usage expert', 'Sparkles')
ON CONFLICT (slug) DO NOTHING;

-- ===================
-- 3. ADD SAFETY WARNING FIELD TO PRODUCTS
-- ===================
-- For essential oils and other products with contraindications

ALTER TABLE products 
ADD COLUMN IF NOT EXISTS safety_warning TEXT,
ADD COLUMN IF NOT EXISTS is_pregnancy_safe BOOLEAN DEFAULT true;

COMMENT ON COLUMN products.safety_warning IS 'Avertissement de sécurité (ex: Interdit femmes enceintes)';
COMMENT ON COLUMN products.is_pregnancy_safe IS 'Peut être utilisé par les femmes enceintes/allaitantes';

-- ===================
-- FIN MIGRATION NEW PRODUCTS SCHEMA
-- ===================
