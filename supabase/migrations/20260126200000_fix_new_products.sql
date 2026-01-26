-- ============================================
-- KORELAB - Fix: Add New Product Categories and Products
-- Date: 2026-01-26
-- ============================================

-- 1. CREATE MISSING CATEGORIES
INSERT INTO categories (name, slug, description, icon) VALUES
    ('Hydrolats', 'hydrolats', 'Eaux florales apaisantes pour cuir chevelu et cheveux', 'Droplet'),
    ('Macérats', 'macerats', 'Huiles végétales infusées aux plantes actives', 'Leaf'),
    ('Huiles Essentielles', 'huiles-essentielles', 'Actifs concentrés à diluer - Usage expert', 'Sparkles')
ON CONFLICT (slug) DO NOTHING;

-- 2. INSERT NEW PRODUCTS (skip if already exists)

-- Huile d'Olive
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT 'Huile d''Olive Vierge Extra Cosmétique', 'huile-olive', 'Huile d''olive vierge extra de qualité cosmétique.', 'Nutrition intense - Cheveux très secs', 65.00, 'treatment', 'oil', id, '/product-images/placeholder-oil.webp', 'En bain d''huile 2h minimum.', 'Réservée aux cheveux épais.', ARRAY['olive', 'nutrition'], NULL, true
FROM categories WHERE slug = 'huiles' ON CONFLICT (slug) DO NOTHING;

-- Hydrolats
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT 'Hydrolat de Rose de Damas', 'hydrolat-rose', 'Eau florale de rose apaisant universel.', 'Apaisant universel', 55.00, 'treatment', 'hydrolat', id, '/product-images/placeholder-hydrolat.webp', 'Vaporiser quotidiennement.', 'Convient à tous.', ARRAY['hydrolat', 'rose'], NULL, true
FROM categories WHERE slug = 'hydrolats' ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT 'Hydrolat de Romarin', 'hydrolat-romarin', 'Eau florale tonifiante pour pousse.', 'Anti-chute & Pousse', 50.00, 'treatment', 'hydrolat', id, '/product-images/placeholder-hydrolat.webp', 'Vaporiser 3-4x/semaine.', 'Stimule la circulation.', ARRAY['hydrolat', 'romarin', 'pousse'], NULL, true
FROM categories WHERE slug = 'hydrolats' ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT 'Hydrolat de Lavande Vraie', 'hydrolat-lavande', 'Eau florale apaisante pour cuirs chevelus sensibles.', 'Apaisant intense', 50.00, 'treatment', 'hydrolat', id, '/product-images/placeholder-hydrolat.webp', 'Vaporiser sur cuir chevelu.', 'Calme les irritations.', ARRAY['hydrolat', 'lavande'], NULL, true
FROM categories WHERE slug = 'hydrolats' ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT 'Hydrolat de Sauge Officinale', 'hydrolat-sauge', 'Eau florale régulatrice pour cuirs chevelus gras.', 'Régulateur sébum', 55.00, 'treatment', 'hydrolat', id, '/product-images/placeholder-hydrolat.webp', 'Vaporiser après shampoing.', 'Idéal cuir chevelu gras.', ARRAY['hydrolat', 'sauge', 'gras'], NULL, false
FROM categories WHERE slug = 'hydrolats' ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT 'Hydrolat de Menthe Poivrée', 'hydrolat-menthe', 'Eau florale rafraîchissante et stimulante.', 'Fraîcheur stimulante', 45.00, 'treatment', 'hydrolat', id, '/product-images/placeholder-hydrolat.webp', 'Vaporiser pour effet frais.', 'Stimule la circulation.', ARRAY['hydrolat', 'menthe'], NULL, true
FROM categories WHERE slug = 'hydrolats' ON CONFLICT (slug) DO NOTHING;

-- Macérats
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT 'Macérat Huileux de Fenugrec', 'macerat-fenugrec', 'Huile infusée fortifiante pour pousse.', 'Fortifiant - Pousse', 75.00, 'treatment', 'macerat', id, '/product-images/placeholder-macerat.webp', 'En bain d''huile 1-2h.', 'Secret indien pour cheveux forts.', ARRAY['macerat', 'fenugrec', 'pousse'], NULL, false
FROM categories WHERE slug = 'macerats' ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT 'Macérat Huileux d''Oignon', 'macerat-oignon', 'Huile anti-chute puissante.', 'Anti-chute puissant', 70.00, 'treatment', 'macerat', id, '/product-images/placeholder-macerat.webp', 'Massage cuir chevelu 30 min.', 'Très efficace contre la chute.', ARRAY['macerat', 'oignon', 'anti-chute'], NULL, true
FROM categories WHERE slug = 'macerats' ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT 'Macérat Huileux d''Ail', 'macerat-ail', 'Huile tonique antifongique puissant.', 'Tonique antifongique', 65.00, 'treatment', 'macerat', id, '/product-images/placeholder-macerat.webp', 'Massage cuir chevelu. Double shampoing.', 'Le plus puissant des macérats.', ARRAY['macerat', 'ail', 'pellicules'], NULL, true
FROM categories WHERE slug = 'macerats' ON CONFLICT (slug) DO NOTHING;

-- Actifs
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT 'Protéines de Riz Hydrolysées', 'proteines-riz', 'Actif protéiné léger pour cheveux fins.', 'Volume & Force', 95.00, 'treatment', 'active', id, '/product-images/placeholder-active.webp', '5-10 gouttes dans masque.', 'Parfait pour cheveux fins.', ARRAY['proteines', 'riz', 'volume'], NULL, true
FROM categories WHERE slug = 'actifs' ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT 'Panthénol (Pro-Vitamine B5)', 'panthenol-b5', 'Actif fortifiant et hydratant.', 'Fortifiant hydratant', 85.00, 'treatment', 'active', id, '/product-images/placeholder-active.webp', 'Ajouter 2-5% aux soins.', 'Polyvalent pour tous types.', ARRAY['panthenol', 'vitamine-b5'], NULL, true
FROM categories WHERE slug = 'actifs' ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT 'Glycérine Végétale Pure', 'glycerine-vegetale', 'Humectant naturel hydratation profonde.', 'Humectant naturel', 45.00, 'treatment', 'active', id, '/product-images/placeholder-active.webp', 'Max 5-10% dans soins. Ne pas utiliser pure.', 'Attention climat sec.', ARRAY['glycerine', 'humectant'], NULL, true
FROM categories WHERE slug = 'actifs' ON CONFLICT (slug) DO NOTHING;

-- Huiles Essentielles
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT 'Huile Essentielle de Tea Tree', 'he-tea-tree', 'HE antifongique anti-pelliculaire.', 'Purifiant - Pellicules', 65.00, 'treatment', 'essential_oil', id, '/product-images/placeholder-he.webp', 'DILUER! 2-3 gouttes max.', 'HE anti-pelliculaire excellence.', ARRAY['huile-essentielle', 'tea-tree', 'pellicules'], '⚠️ Interdit femmes enceintes. Ne pas utiliser pur.', false
FROM categories WHERE slug = 'huiles-essentielles' ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT 'Huile Essentielle de Lavande Vraie', 'he-lavande', 'HE apaisante équilibrante multi-usage.', 'Apaisant équilibrant', 70.00, 'treatment', 'essential_oil', id, '/product-images/placeholder-he.webp', 'DILUER! 3-5 gouttes dans 30ml huile.', 'HE la plus douce.', ARRAY['huile-essentielle', 'lavande', 'apaisant'], '⚠️ Interdit femmes enceintes. Ne pas utiliser pur.', false
FROM categories WHERE slug = 'huiles-essentielles' ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT 'Huile Essentielle d''Eucalyptus', 'he-eucalyptus', 'HE détoxifiante purifiante.', 'Détox purifiant', 55.00, 'treatment', 'essential_oil', id, '/product-images/placeholder-he.webp', 'DILUER! 2-3 gouttes. 1x/mois.', 'Reset cuir chevelu.', ARRAY['huile-essentielle', 'eucalyptus', 'detox'], '⚠️ Interdit femmes enceintes et enfants -6 ans.', false
FROM categories WHERE slug = 'huiles-essentielles' ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT 'Huile Essentielle d''Orange Douce', 'he-orange', 'HE parfumante pour brillance.', 'Parfum & Brillance', 45.00, 'treatment', 'essential_oil', id, '/product-images/placeholder-he.webp', 'DILUER! 2-4 gouttes pour parfumer.', 'Principalement pour le parfum.', ARRAY['huile-essentielle', 'orange', 'brillance'], '⚠️ Interdit femmes enceintes. Photosensibilisant.', false
FROM categories WHERE slug = 'huiles-essentielles' ON CONFLICT (slug) DO NOTHING;

-- 3. ADD SCORING DATA FOR NEW PRODUCTS
DO $$
DECLARE
    r RECORD;
    por RECORD;
    tex RECORD;
    scp RECORD;
    con RECORD;
BEGIN
    -- For each new product
    FOR r IN SELECT id, slug FROM products WHERE slug IN (
        'huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande',
        'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon',
        'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale',
        'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange'
    ) LOOP
        -- Insert concern scoring
        FOR con IN SELECT id, slug FROM concerns LOOP
            INSERT INTO product_concern_scoring (product_id, concern_id, score)
            VALUES (r.id, con.id, 
                CASE 
                    WHEN r.slug = 'hydrolat-romarin' AND con.slug IN ('chute', 'pousse') THEN 9
                    WHEN r.slug = 'hydrolat-lavande' AND con.slug = 'pellicules' THEN 8
                    WHEN r.slug = 'macerat-fenugrec' AND con.slug = 'pousse' THEN 10
                    WHEN r.slug = 'macerat-fenugrec' AND con.slug IN ('chute', 'casse') THEN 8
                    WHEN r.slug = 'macerat-oignon' AND con.slug = 'chute' THEN 10
                    WHEN r.slug = 'macerat-ail' AND con.slug = 'pellicules' THEN 9
                    WHEN r.slug = 'proteines-riz' AND con.slug = 'volume' THEN 10
                    WHEN r.slug = 'proteines-riz' AND con.slug = 'casse' THEN 8
                    WHEN r.slug = 'panthenol-b5' AND con.slug = 'casse' THEN 9
                    WHEN r.slug = 'glycerine-vegetale' AND con.slug = 'secheresse' THEN 10
                    WHEN r.slug = 'glycerine-vegetale' AND con.slug = 'frisottis' THEN 8
                    WHEN r.slug = 'huile-olive' AND con.slug = 'secheresse' THEN 10
                    WHEN r.slug = 'he-tea-tree' AND con.slug = 'pellicules' THEN 10
                    WHEN r.slug LIKE 'hydrolat-%' THEN 6
                    ELSE 5
                END
            ) ON CONFLICT DO NOTHING;
        END LOOP;

        -- Insert porosity compat
        FOR por IN SELECT id, slug FROM hair_porosities LOOP
            INSERT INTO product_porosity_compat (product_id, porosity_id, compatibility, score)
            VALUES (r.id, por.id,
                CASE 
                    WHEN r.slug LIKE 'hydrolat-%' AND por.slug = 'faible' THEN 'recommended'
                    WHEN r.slug = 'proteines-riz' AND por.slug = 'faible' THEN 'recommended'
                    WHEN r.slug IN ('huile-olive', 'macerat-fenugrec') AND por.slug = 'faible' THEN 'not_recommended'
                    WHEN r.slug IN ('huile-olive', 'macerat-fenugrec', 'glycerine-vegetale') AND por.slug = 'forte' THEN 'recommended'
                    ELSE 'compatible'
                END::compatibility_enum,
                CASE 
                    WHEN r.slug LIKE 'hydrolat-%' AND por.slug = 'faible' THEN 9
                    WHEN r.slug IN ('huile-olive', 'macerat-fenugrec') AND por.slug = 'faible' THEN 3
                    WHEN r.slug IN ('huile-olive', 'macerat-fenugrec') AND por.slug = 'forte' THEN 9
                    ELSE 7
                END
            ) ON CONFLICT DO NOTHING;
        END LOOP;

        -- Insert texture compat
        FOR tex IN SELECT id, slug FROM hair_textures LOOP
            INSERT INTO product_texture_compat (product_id, texture_id, compatibility, score)
            VALUES (r.id, tex.id,
                CASE 
                    WHEN r.slug LIKE 'hydrolat-%' THEN 'recommended'
                    WHEN r.slug = 'huile-olive' AND tex.slug = 'lisse' THEN 'not_recommended'
                    WHEN r.slug = 'huile-olive' AND tex.slug = 'crepu' THEN 'recommended'
                    WHEN r.slug IN ('glycerine-vegetale', 'panthenol-b5') AND tex.slug IN ('boucle', 'crepu') THEN 'recommended'
                    ELSE 'compatible'
                END::compatibility_enum,
                CASE 
                    WHEN r.slug LIKE 'hydrolat-%' THEN 8
                    WHEN r.slug = 'huile-olive' AND tex.slug = 'lisse' THEN 3
                    WHEN r.slug = 'huile-olive' AND tex.slug = 'crepu' THEN 9
                    ELSE 7
                END
            ) ON CONFLICT DO NOTHING;
        END LOOP;

        -- Insert scalp compat
        FOR scp IN SELECT id, slug FROM scalp_types LOOP
            INSERT INTO product_scalp_compat (product_id, scalp_type_id, compatibility, score)
            VALUES (r.id, scp.id,
                CASE 
                    WHEN r.slug IN ('hydrolat-rose', 'hydrolat-lavande') AND scp.slug IN ('sec', 'sensible') THEN 'recommended'
                    WHEN r.slug IN ('hydrolat-sauge', 'hydrolat-romarin', 'hydrolat-menthe') AND scp.slug = 'gras' THEN 'recommended'
                    WHEN r.slug = 'he-tea-tree' AND scp.slug = 'gras' THEN 'recommended'
                    WHEN r.slug = 'he-tea-tree' AND scp.slug IN ('sec', 'sensible') THEN 'not_recommended'
                    WHEN r.slug = 'huile-olive' AND scp.slug = 'sec' THEN 'recommended'
                    WHEN r.slug = 'huile-olive' AND scp.slug = 'gras' THEN 'not_recommended'
                    ELSE 'compatible'
                END::compatibility_enum,
                CASE 
                    WHEN r.slug IN ('hydrolat-rose', 'hydrolat-lavande') AND scp.slug IN ('sec', 'sensible') THEN 10
                    WHEN r.slug IN ('hydrolat-sauge', 'he-tea-tree') AND scp.slug = 'gras' THEN 10
                    WHEN r.slug = 'he-tea-tree' AND scp.slug IN ('sec', 'sensible') THEN 3
                    ELSE 7
                END
            ) ON CONFLICT DO NOTHING;
        END LOOP;
    END LOOP;
    
    RAISE NOTICE 'Scoring data inserted for new products';
END $$;
