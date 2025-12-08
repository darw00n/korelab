-- ============================================
-- KORELAB - Database Schema (HAIR CARE EDITION)
-- Pivot vers le Soin Capillaire Marocain
-- ============================================

-- ===================
-- EXTENSIONS
-- ===================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===================
-- ÉNUMÉRATIONS
-- ===================

-- Types de produits capillaires (catégorie principale)
CREATE TYPE product_type_enum AS ENUM ('cleanser', 'treatment', 'finish');

-- Sous-types de produits (plus précis)
CREATE TYPE product_subtype_enum AS ENUM (
    'shampoo',      -- Shampoing classique
    'clay_powder',  -- Poudre lavante (Ghassoul)
    'co_wash',      -- Après-shampoing lavant
    'mask',         -- Masque capillaire
    'oil',          -- Huile végétale
    'butter',       -- Beurre (Karité, Cacao)
    'serum',        -- Sérum concentré
    'active',       -- Actif pur (Protéines, HE)
    'gel',          -- Gel coiffant/hydratant
    'leave_in'      -- Soin sans rinçage
);

-- Statuts de commande
CREATE TYPE order_status_enum AS ENUM ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled');

-- Compatibilité produit/profil
CREATE TYPE compatibility_enum AS ENUM ('recommended', 'compatible', 'not_recommended', 'forbidden');

-- ===================
-- TABLES DE RÉFÉRENCE CAPILLAIRES
-- ===================

-- Textures de cheveux
CREATE TABLE hair_textures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE hair_textures IS 'Types de texture capillaire (1-4 scale)';

-- Porosités capillaires
CREATE TABLE hair_porosities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    care_tip TEXT, -- Conseil de soin spécifique
    icon VARCHAR(50),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE hair_porosities IS 'Niveau de porosité (absorption eau/produits)';

-- Types de cuir chevelu
CREATE TABLE scalp_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE scalp_types IS 'État du cuir chevelu';

-- Préoccupations capillaires
CREATE TABLE concerns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE concerns IS 'Problèmes capillaires à cibler';

-- ===================
-- CATÉGORIES & PRODUITS
-- ===================

-- Catégories de produits
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Produits capillaires
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    
    -- Identité
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    short_description VARCHAR(300),
    
    -- Prix
    price DECIMAL(10, 2) NOT NULL,
    compare_at_price DECIMAL(10, 2),
    
    -- Classification capillaire
    product_type product_type_enum NOT NULL,
    product_subtype product_subtype_enum NOT NULL,
    
    -- Médias
    image_url VARCHAR(500),
    video_url VARCHAR(500),
    
    -- Stock
    stock_quantity INTEGER DEFAULT 100,
    is_available BOOLEAN DEFAULT true,
    
    -- Métadonnées
    usage_instructions TEXT,  -- Comment utiliser
    expert_note TEXT,         -- Note d'expert (ex: "À utiliser en bain d'huile")
    tags TEXT[],
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour recherche rapide
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_type ON products(product_type);
CREATE INDEX idx_products_subtype ON products(product_subtype);
CREATE INDEX idx_products_available ON products(is_available) WHERE is_available = true;

-- ===================
-- MATRICES DE SCORING
-- ===================

-- Scoring Produit <-> Concern (problème capillaire)
CREATE TABLE product_concern_scoring (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    concern_id UUID NOT NULL REFERENCES concerns(id) ON DELETE CASCADE,
    score INTEGER NOT NULL CHECK (score >= 1 AND score <= 10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(product_id, concern_id)
);

CREATE INDEX idx_concern_scoring_product ON product_concern_scoring(product_id);
CREATE INDEX idx_concern_scoring_concern ON product_concern_scoring(concern_id);

-- Compatibilité Produit <-> Texture
CREATE TABLE product_texture_compat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    texture_id UUID NOT NULL REFERENCES hair_textures(id) ON DELETE CASCADE,
    compatibility compatibility_enum NOT NULL DEFAULT 'compatible',
    score INTEGER CHECK (score >= 1 AND score <= 10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(product_id, texture_id)
);

CREATE INDEX idx_texture_compat_product ON product_texture_compat(product_id);
CREATE INDEX idx_texture_compat_texture ON product_texture_compat(texture_id);

-- Compatibilité Produit <-> Porosité
CREATE TABLE product_porosity_compat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    porosity_id UUID NOT NULL REFERENCES hair_porosities(id) ON DELETE CASCADE,
    compatibility compatibility_enum NOT NULL DEFAULT 'compatible',
    score INTEGER CHECK (score >= 1 AND score <= 10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(product_id, porosity_id)
);

CREATE INDEX idx_porosity_compat_product ON product_porosity_compat(product_id);
CREATE INDEX idx_porosity_compat_porosity ON product_porosity_compat(porosity_id);

-- Compatibilité Produit <-> Type de cuir chevelu
CREATE TABLE product_scalp_compat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    scalp_type_id UUID NOT NULL REFERENCES scalp_types(id) ON DELETE CASCADE,
    compatibility compatibility_enum NOT NULL DEFAULT 'compatible',
    score INTEGER CHECK (score >= 1 AND score <= 10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(product_id, scalp_type_id)
);

CREATE INDEX idx_scalp_compat_product ON product_scalp_compat(product_id);
CREATE INDEX idx_scalp_compat_scalp ON product_scalp_compat(scalp_type_id);

-- ===================
-- DIAGNOSTIC SESSIONS
-- ===================

CREATE TABLE diagnostic_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID, -- Nullable si utilisateur non connecté
    session_id VARCHAR(100), -- ID session anonyme
    
    -- Profil capillaire
    texture_id UUID REFERENCES hair_textures(id),
    porosity_id UUID REFERENCES hair_porosities(id),
    scalp_type_id UUID REFERENCES scalp_types(id),
    concern_ids UUID[], -- Tableau des préoccupations
    
    -- Résultats
    recommended_products JSONB,
    match_score INTEGER,
    
    -- Conversion
    converted_to_order BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_diagnostic_user ON diagnostic_sessions(user_id);
CREATE INDEX idx_diagnostic_session ON diagnostic_sessions(session_id);

-- ===================
-- COMMANDES
-- ===================

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    
    -- Statut
    status order_status_enum DEFAULT 'pending',
    
    -- Montants
    total_amount DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    shipping_amount DECIMAL(10, 2) DEFAULT 0,
    
    -- Promo
    promo_code VARCHAR(50),
    
    -- Livraison
    shipping_address JSONB,
    phone VARCHAR(20),
    notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

-- Lignes de commande
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);

-- ===================
-- CODES PROMO
-- ===================

CREATE TABLE promo_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value DECIMAL(10, 2) NOT NULL,
    min_order_amount DECIMAL(10, 2) DEFAULT 0,
    max_uses INTEGER,
    current_uses INTEGER DEFAULT 0,
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    valid_until TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================
-- AVIS
-- ===================

CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID,
    
    -- Contenu
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    content TEXT,
    
    -- Profil capillaire du reviewer (pour pertinence)
    reviewer_texture VARCHAR(50),
    reviewer_porosity VARCHAR(50),
    
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_reviews_product ON reviews(product_id);

-- ===================
-- TRIGGER: updated_at automatique
-- ===================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ===================
-- FIN DU SCHÉMA HAIR CARE
-- ===================
