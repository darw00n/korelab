-- ============================================
-- KORELAB - DIY Recipes Schema
-- Tables for DIY recipe system (NO essential oils)
-- ============================================

-- ===================
-- 1. DIY TOOLS / ACCESSORIES
-- ===================

CREATE TABLE IF NOT EXISTS diy_tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    short_description VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    is_available BOOLEAN DEFAULT true,
    is_in_starter_kit BOOLEAN DEFAULT false,
    usage_tip TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================
-- 2. RECIPE DIFFICULTY ENUM
-- ===================

DO $$ BEGIN
    CREATE TYPE recipe_difficulty AS ENUM ('debutant', 'intermediaire', 'expert');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ===================
-- 3. RECIPE TYPE ENUM
-- ===================

DO $$ BEGIN
    CREATE TYPE recipe_type AS ENUM (
        'spray',           -- Spray démêlant/hydratant
        'masque',          -- Masque capillaire
        'bain_huile',      -- Bain d'huile
        'serum',           -- Sérum concentré
        'leave_in',        -- Soin sans rinçage
        'beurre',          -- Beurre/crème scellante
        'pre_poo',         -- Soin avant shampoing
        'rinse'            -- Rinçage (vinaigre etc)
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ===================
-- 4. RECIPES TABLE
-- ===================

CREATE TABLE IF NOT EXISTS recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    short_description VARCHAR(255),
    recipe_type recipe_type NOT NULL,
    difficulty recipe_difficulty DEFAULT 'debutant',
    
    -- Timing
    prep_time_minutes INTEGER DEFAULT 5,
    application_time_minutes INTEGER,
    frequency VARCHAR(100), -- "2-3x par semaine", "1x par semaine", etc.
    
    -- Storage
    shelf_life_days INTEGER DEFAULT 7,
    storage_instructions TEXT,
    
    -- Yield
    yield_ml INTEGER, -- Quantité produite en ml
    yield_applications INTEGER, -- Nombre d'applications
    
    -- Visual
    image_url VARCHAR(500),
    color_hex VARCHAR(7), -- Couleur représentative pour l'UI
    icon VARCHAR(50), -- Lucide icon name
    
    -- Target profiles (for AI matching)
    target_porosities TEXT[], -- ['faible', 'moyenne', 'forte']
    target_textures TEXT[],   -- ['lisse', 'ondule', 'boucle', 'crepu']
    target_concerns TEXT[],   -- ['secheresse', 'casse', 'pellicules', etc.]
    target_scalp_types TEXT[], -- ['normal', 'gras', 'sec', 'sensible']
    
    -- Benefits
    benefits TEXT[],
    
    -- Warnings (sans HE, mais autres précautions)
    warnings TEXT[],
    
    -- Status
    is_published BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================
-- 5. RECIPE INGREDIENTS (Link to products)
-- ===================

CREATE TABLE IF NOT EXISTS recipe_ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    
    -- Quantity
    quantity_value DECIMAL(10,2) NOT NULL, -- Valeur numérique
    quantity_unit VARCHAR(20) NOT NULL,     -- 'ml', 'g', 'gouttes', 'cuillere_soupe', 'cuillere_cafe'
    percentage DECIMAL(5,2),                -- Pourcentage dans la formule (optionnel)
    
    -- Role in recipe
    role VARCHAR(50), -- 'base', 'actif', 'hydratant', 'nourrissant', 'scellant'
    is_optional BOOLEAN DEFAULT false,
    substitution_note TEXT, -- "Peut être remplacé par..."
    
    -- Order
    step_order INTEGER DEFAULT 1,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================
-- 6. RECIPE STEPS
-- ===================

CREATE TABLE IF NOT EXISTS recipe_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    step_number INTEGER NOT NULL,
    
    -- Content
    title VARCHAR(100) NOT NULL,
    instruction TEXT NOT NULL,
    tip TEXT, -- Conseil pro pour cette étape
    
    -- Duration
    duration_seconds INTEGER, -- Durée de l'étape
    
    -- Visual
    image_url VARCHAR(500),
    icon VARCHAR(50),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================
-- 7. RECIPE TOOLS (Link to diy_tools)
-- ===================

CREATE TABLE IF NOT EXISTS recipe_tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    tool_id UUID NOT NULL REFERENCES diy_tools(id) ON DELETE CASCADE,
    
    is_essential BOOLEAN DEFAULT true, -- Indispensable ou optionnel
    quantity INTEGER DEFAULT 1,
    usage_note TEXT, -- Comment utiliser pour cette recette
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================
-- 8. USER SAVED RECIPES (Favorites)
-- ===================

CREATE TABLE IF NOT EXISTS user_saved_recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    
    notes TEXT, -- Notes personnelles de l'utilisateur
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    last_made_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, recipe_id)
);

-- ===================
-- INDEXES
-- ===================

CREATE INDEX IF NOT EXISTS idx_recipes_type ON recipes(recipe_type);
CREATE INDEX IF NOT EXISTS idx_recipes_difficulty ON recipes(difficulty);
CREATE INDEX IF NOT EXISTS idx_recipes_published ON recipes(is_published);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_recipe ON recipe_ingredients(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_product ON recipe_ingredients(product_id);
CREATE INDEX IF NOT EXISTS idx_recipe_steps_recipe ON recipe_steps(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_tools_recipe ON recipe_tools(recipe_id);
CREATE INDEX IF NOT EXISTS idx_user_saved_recipes_user ON user_saved_recipes(user_id);

-- ===================
-- RLS POLICIES
-- ===================

ALTER TABLE diy_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_saved_recipes ENABLE ROW LEVEL SECURITY;

-- Public read for tools, recipes, ingredients, steps, tools
CREATE POLICY "DIY tools are viewable by everyone" ON diy_tools FOR SELECT USING (true);
CREATE POLICY "Recipes are viewable by everyone" ON recipes FOR SELECT USING (is_published = true);
CREATE POLICY "Recipe ingredients are viewable by everyone" ON recipe_ingredients FOR SELECT USING (true);
CREATE POLICY "Recipe steps are viewable by everyone" ON recipe_steps FOR SELECT USING (true);
CREATE POLICY "Recipe tools are viewable by everyone" ON recipe_tools FOR SELECT USING (true);

-- User saved recipes - users can manage their own
CREATE POLICY "Users can view own saved recipes" ON user_saved_recipes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own saved recipes" ON user_saved_recipes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own saved recipes" ON user_saved_recipes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own saved recipes" ON user_saved_recipes FOR DELETE USING (auth.uid() = user_id);

-- ===================
-- TRIGGER: Update timestamp
-- ===================

CREATE OR REPLACE FUNCTION update_recipe_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER recipes_updated_at
    BEFORE UPDATE ON recipes
    FOR EACH ROW
    EXECUTE FUNCTION update_recipe_timestamp();

CREATE TRIGGER diy_tools_updated_at
    BEFORE UPDATE ON diy_tools
    FOR EACH ROW
    EXECUTE FUNCTION update_recipe_timestamp();

-- ===================
-- SUCCESS MESSAGE
-- ===================

DO $$
BEGIN
    RAISE NOTICE '✅ DIY Recipes schema created successfully!';
    RAISE NOTICE '   - diy_tools table';
    RAISE NOTICE '   - recipes table';
    RAISE NOTICE '   - recipe_ingredients table';
    RAISE NOTICE '   - recipe_steps table';
    RAISE NOTICE '   - recipe_tools table';
    RAISE NOTICE '   - user_saved_recipes table';
END $$;
