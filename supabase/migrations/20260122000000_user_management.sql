-- ============================================
-- KORELAB - Migration: User Management System
-- Date: 2026-01-22
-- MILESTONE 1: Gestion des utilisateurs et profils
-- ============================================

-- ===================
-- 1. TABLE PROFILES
-- ===================
-- Étend auth.users avec les infos métier
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Identité
    full_name VARCHAR(200),
    phone VARCHAR(20),
    phone_verified BOOLEAN DEFAULT false,
    
    -- Adresse par défaut
    default_address JSONB,
    city VARCHAR(100),
    
    -- Préférences
    preferred_language VARCHAR(10) DEFAULT 'fr',
    
    -- Marketing
    accepts_marketing BOOLEAN DEFAULT false,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE public.profiles IS 'Profils utilisateurs étendus (complément de auth.users)';
COMMENT ON COLUMN public.profiles.default_address IS 'Format JSONB: {street, city, postal_code, country}';

-- ===================
-- 2. TABLE USER_HAIR_PROFILES
-- ===================
-- Profil capillaire de l'utilisateur (peut évoluer dans le temps)
CREATE TABLE IF NOT EXISTS public.user_hair_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Profil capillaire
    texture_id UUID REFERENCES public.hair_textures(id),
    porosity_id UUID REFERENCES public.hair_porosities(id),
    scalp_type_id UUID REFERENCES public.scalp_types(id),
    concern_ids UUID[], -- Array des préoccupations
    
    -- Métadonnées
    name VARCHAR(100), -- Ex: "Mon profil hiver 2026"
    is_active BOOLEAN DEFAULT true, -- Un seul profil actif à la fois
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE public.user_hair_profiles IS 'Profils capillaires des utilisateurs (historique possible)';
COMMENT ON COLUMN public.user_hair_profiles.is_active IS 'Un seul profil actif par utilisateur';

-- ===================
-- 3. AMÉLIORATION DIAGNOSTIC_SESSIONS
-- ===================
-- Ajout de colonnes pour mieux gérer l'historique
ALTER TABLE public.diagnostic_sessions 
ADD COLUMN IF NOT EXISTS name VARCHAR(100),
ADD COLUMN IF NOT EXISTS is_complete BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE;

COMMENT ON COLUMN public.diagnostic_sessions.name IS 'Nom du diagnostic (ex: "Diagnostic Janvier 2026")';
COMMENT ON COLUMN public.diagnostic_sessions.is_complete IS 'Le diagnostic a été complété jusqu''au bout';
COMMENT ON COLUMN public.diagnostic_sessions.completed_at IS 'Date de complétion du diagnostic';

-- ===================
-- 4. INDEX POUR PERFORMANCE
-- ===================
CREATE INDEX IF NOT EXISTS idx_profiles_id ON public.profiles(id);
CREATE INDEX IF NOT EXISTS idx_user_hair_profiles_user ON public.user_hair_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_hair_profiles_active ON public.user_hair_profiles(user_id, is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_diagnostic_sessions_user_complete ON public.diagnostic_sessions(user_id, is_complete);

-- ===================
-- 5. ROW LEVEL SECURITY (RLS)
-- ===================

-- 5.1 Activer RLS sur les nouvelles tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_hair_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostic_sessions ENABLE ROW LEVEL SECURITY;

-- 5.2 Policies pour PROFILES
-- Les utilisateurs peuvent voir et modifier leur propre profil
CREATE POLICY "Users can view own profile" 
    ON public.profiles
    FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
    ON public.profiles
    FOR UPDATE 
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
    ON public.profiles
    FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- 5.3 Policies pour USER_HAIR_PROFILES
-- Les utilisateurs peuvent gérer leurs propres profils capillaires
CREATE POLICY "Users can view own hair profiles" 
    ON public.user_hair_profiles
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own hair profiles" 
    ON public.user_hair_profiles
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own hair profiles" 
    ON public.user_hair_profiles
    FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own hair profiles" 
    ON public.user_hair_profiles
    FOR DELETE 
    USING (auth.uid() = user_id);

-- 5.4 Policies pour DIAGNOSTIC_SESSIONS
-- Les utilisateurs peuvent voir leurs diagnostics OU créer des diagnostics anonymes
CREATE POLICY "Users can view own diagnostics" 
    ON public.diagnostic_sessions
    FOR SELECT 
    USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can create diagnostic" 
    ON public.diagnostic_sessions
    FOR INSERT 
    WITH CHECK (true); -- Permet les diagnostics anonymes

CREATE POLICY "Users can update own diagnostics" 
    ON public.diagnostic_sessions
    FOR UPDATE 
    USING (auth.uid() = user_id);

-- ===================
-- 6. TRIGGER: Créer profile automatiquement
-- ===================
-- Quand un user s'inscrit, créer automatiquement son profil

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, preferred_language)
    VALUES (NEW.id, 'fr');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Supprimer le trigger s'il existe déjà
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Créer le trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW 
    EXECUTE FUNCTION public.handle_new_user();

COMMENT ON FUNCTION public.handle_new_user IS 'Crée automatiquement un profil lors de l''inscription d''un utilisateur';

-- ===================
-- 7. TRIGGER: updated_at automatique
-- ===================

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_hair_profiles_updated_at
    BEFORE UPDATE ON public.user_hair_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ===================
-- 8. FONCTION: Désactiver les autres profils capillaires
-- ===================
-- Quand on active un profil, désactiver les autres

CREATE OR REPLACE FUNCTION public.handle_active_hair_profile()
RETURNS TRIGGER AS $$
BEGIN
    -- Si le nouveau profil est actif
    IF NEW.is_active = true THEN
        -- Désactiver tous les autres profils de cet utilisateur
        UPDATE public.user_hair_profiles
        SET is_active = false
        WHERE user_id = NEW.user_id 
        AND id != NEW.id
        AND is_active = true;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour gérer l'unicité du profil actif
DROP TRIGGER IF EXISTS ensure_single_active_profile ON public.user_hair_profiles;

CREATE TRIGGER ensure_single_active_profile
    AFTER INSERT OR UPDATE ON public.user_hair_profiles
    FOR EACH ROW
    WHEN (NEW.is_active = true)
    EXECUTE FUNCTION public.handle_active_hair_profile();

COMMENT ON FUNCTION public.handle_active_hair_profile IS 'Assure qu''un seul profil capillaire est actif par utilisateur';

-- ===================
-- FIN MIGRATION USER MANAGEMENT
-- ===================
