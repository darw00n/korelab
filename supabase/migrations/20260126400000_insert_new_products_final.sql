-- ============================================
-- KORELAB - Insert New Products (Final)
-- Categories now exist, inserting products
-- ============================================

-- Insert products with verified categories
DO $$
DECLARE
    v_huiles_id UUID;
    v_hydrolats_id UUID;
    v_macerats_id UUID;
    v_actifs_id UUID;
    v_he_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO v_huiles_id FROM categories WHERE slug = 'huiles';
    SELECT id INTO v_hydrolats_id FROM categories WHERE slug = 'hydrolats';
    SELECT id INTO v_macerats_id FROM categories WHERE slug = 'macerats';
    SELECT id INTO v_actifs_id FROM categories WHERE slug = 'actifs';
    SELECT id INTO v_he_id FROM categories WHERE slug = 'huiles-essentielles';

    RAISE NOTICE 'Category IDs: huiles=%, hydrolats=%, macerats=%, actifs=%, he=%', 
        v_huiles_id, v_hydrolats_id, v_macerats_id, v_actifs_id, v_he_id;

    -- Only proceed if all categories exist
    IF v_huiles_id IS NULL OR v_hydrolats_id IS NULL OR v_macerats_id IS NULL 
       OR v_actifs_id IS NULL OR v_he_id IS NULL THEN
        RAISE WARNING 'Missing categories! Aborting product insert.';
        RETURN;
    END IF;

    -- Insert Huile d'Olive
    INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, is_pregnancy_safe)
    VALUES ('Huile d''Olive Vierge Extra Cosmétique', 'huile-olive', 
            'Huile d''olive vierge extra de qualité cosmétique, pressée à froid. Très riche et nourrissante.',
            'Nutrition intense - Cheveux très secs & épais', 65.00, 'treatment', 'oil', v_huiles_id,
            '/product-images/placeholder-oil.webp', 'En bain d''huile 2h minimum.',
            'Réservée aux cheveux épais et très secs.', ARRAY['olive', 'nutrition'], true)
    ON CONFLICT (slug) DO NOTHING;

    -- Insert Hydrolats
    INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, is_pregnancy_safe)
    VALUES 
        ('Hydrolat de Rose de Damas', 'hydrolat-rose', 'Eau florale apaisante universelle.', 'Apaisant universel', 55.00, 'treatment', 'hydrolat', v_hydrolats_id, '/product-images/placeholder-hydrolat.webp', 'Vaporiser quotidiennement.', 'Convient à tous.', ARRAY['hydrolat', 'rose'], true),
        ('Hydrolat de Romarin', 'hydrolat-romarin', 'Eau florale tonifiante pour pousse.', 'Anti-chute & Pousse', 50.00, 'treatment', 'hydrolat', v_hydrolats_id, '/product-images/placeholder-hydrolat.webp', 'Vaporiser 3-4x/semaine.', 'Stimule la pousse.', ARRAY['hydrolat', 'romarin', 'pousse'], true),
        ('Hydrolat de Lavande Vraie', 'hydrolat-lavande', 'Eau florale apaisante.', 'Apaisant intense', 50.00, 'treatment', 'hydrolat', v_hydrolats_id, '/product-images/placeholder-hydrolat.webp', 'Vaporiser sur cuir chevelu.', 'Calme les irritations.', ARRAY['hydrolat', 'lavande'], true),
        ('Hydrolat de Sauge Officinale', 'hydrolat-sauge', 'Eau florale régulatrice.', 'Régulateur sébum', 55.00, 'treatment', 'hydrolat', v_hydrolats_id, '/product-images/placeholder-hydrolat.webp', 'Vaporiser après shampoing.', 'Idéal cuir chevelu gras.', ARRAY['hydrolat', 'sauge'], false),
        ('Hydrolat de Menthe Poivrée', 'hydrolat-menthe', 'Eau florale rafraîchissante.', 'Fraîcheur stimulante', 45.00, 'treatment', 'hydrolat', v_hydrolats_id, '/product-images/placeholder-hydrolat.webp', 'Vaporiser pour effet frais.', 'Stimule la circulation.', ARRAY['hydrolat', 'menthe'], true)
    ON CONFLICT (slug) DO NOTHING;

    -- Insert Macérats
    INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, is_pregnancy_safe)
    VALUES 
        ('Macérat Huileux de Fenugrec', 'macerat-fenugrec', 'Huile infusée fortifiante.', 'Fortifiant - Pousse', 75.00, 'treatment', 'macerat', v_macerats_id, '/product-images/placeholder-macerat.webp', 'En bain d''huile 1-2h.', 'Secret indien.', ARRAY['macerat', 'fenugrec'], false),
        ('Macérat Huileux d''Oignon', 'macerat-oignon', 'Huile anti-chute.', 'Anti-chute puissant', 70.00, 'treatment', 'macerat', v_macerats_id, '/product-images/placeholder-macerat.webp', 'Massage 30 min.', 'Très efficace.', ARRAY['macerat', 'oignon'], true),
        ('Macérat Huileux d''Ail', 'macerat-ail', 'Huile tonique antifongique.', 'Tonique antifongique', 65.00, 'treatment', 'macerat', v_macerats_id, '/product-images/placeholder-macerat.webp', 'Massage puis double shampoing.', 'Le plus puissant.', ARRAY['macerat', 'ail'], true)
    ON CONFLICT (slug) DO NOTHING;

    -- Insert Actifs
    INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, is_pregnancy_safe)
    VALUES 
        ('Protéines de Riz Hydrolysées', 'proteines-riz', 'Actif protéiné léger.', 'Volume & Force', 95.00, 'treatment', 'active', v_actifs_id, '/product-images/placeholder-active.webp', '5-10 gouttes dans masque.', 'Parfait pour cheveux fins.', ARRAY['proteines', 'riz'], true),
        ('Panthénol (Pro-Vitamine B5)', 'panthenol-b5', 'Actif fortifiant hydratant.', 'Fortifiant hydratant', 85.00, 'treatment', 'active', v_actifs_id, '/product-images/placeholder-active.webp', 'Ajouter 2-5% aux soins.', 'Polyvalent.', ARRAY['panthenol'], true),
        ('Glycérine Végétale Pure', 'glycerine-vegetale', 'Humectant naturel.', 'Humectant naturel', 45.00, 'treatment', 'active', v_actifs_id, '/product-images/placeholder-active.webp', 'Max 5-10% dans soins.', 'Attention climat sec.', ARRAY['glycerine'], true)
    ON CONFLICT (slug) DO NOTHING;

    -- Insert Huiles Essentielles
    INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
    VALUES 
        ('Huile Essentielle de Tea Tree', 'he-tea-tree', 'HE antifongique anti-pelliculaire.', 'Purifiant - Pellicules', 65.00, 'treatment', 'essential_oil', v_he_id, '/product-images/placeholder-he.webp', 'DILUER! 2-3 gouttes max.', 'HE anti-pelliculaire.', ARRAY['huile-essentielle', 'tea-tree'], '⚠️ Interdit femmes enceintes.', false),
        ('Huile Essentielle de Lavande Vraie', 'he-lavande', 'HE apaisante équilibrante.', 'Apaisant équilibrant', 70.00, 'treatment', 'essential_oil', v_he_id, '/product-images/placeholder-he.webp', 'DILUER! 3-5 gouttes.', 'HE la plus douce.', ARRAY['huile-essentielle', 'lavande'], '⚠️ Interdit femmes enceintes.', false),
        ('Huile Essentielle d''Eucalyptus', 'he-eucalyptus', 'HE détoxifiante purifiante.', 'Détox purifiant', 55.00, 'treatment', 'essential_oil', v_he_id, '/product-images/placeholder-he.webp', 'DILUER! 2-3 gouttes.', 'Reset cuir chevelu.', ARRAY['huile-essentielle', 'eucalyptus'], '⚠️ Interdit enfants -6 ans.', false),
        ('Huile Essentielle d''Orange Douce', 'he-orange', 'HE parfumante.', 'Parfum & Brillance', 45.00, 'treatment', 'essential_oil', v_he_id, '/product-images/placeholder-he.webp', 'DILUER! 2-4 gouttes.', 'Pour le parfum.', ARRAY['huile-essentielle', 'orange'], '⚠️ Photosensibilisant.', false)
    ON CONFLICT (slug) DO NOTHING;

    RAISE NOTICE 'Products inserted successfully!';
END $$;

-- Insert scoring data for new products
DO $$
DECLARE
    r RECORD;
    con RECORD;
    por RECORD;
    tex RECORD;
    scp RECORD;
BEGIN
    FOR r IN SELECT id, slug FROM products WHERE slug IN (
        'huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande',
        'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon',
        'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale',
        'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange'
    ) LOOP
        RAISE NOTICE 'Processing product: %', r.slug;
        
        -- Concern scoring
        FOR con IN SELECT id, slug FROM concerns LOOP
            INSERT INTO product_concern_scoring (product_id, concern_id, score)
            VALUES (r.id, con.id, 
                CASE 
                    WHEN r.slug = 'hydrolat-romarin' AND con.slug IN ('chute', 'pousse') THEN 9
                    WHEN r.slug = 'hydrolat-lavande' AND con.slug = 'pellicules' THEN 8
                    WHEN r.slug = 'macerat-fenugrec' AND con.slug = 'pousse' THEN 10
                    WHEN r.slug = 'macerat-oignon' AND con.slug = 'chute' THEN 10
                    WHEN r.slug = 'macerat-ail' AND con.slug = 'pellicules' THEN 9
                    WHEN r.slug = 'proteines-riz' AND con.slug = 'volume' THEN 10
                    WHEN r.slug = 'panthenol-b5' AND con.slug = 'casse' THEN 9
                    WHEN r.slug = 'glycerine-vegetale' AND con.slug = 'secheresse' THEN 10
                    WHEN r.slug = 'huile-olive' AND con.slug = 'secheresse' THEN 10
                    WHEN r.slug = 'he-tea-tree' AND con.slug = 'pellicules' THEN 10
                    WHEN r.slug LIKE 'hydrolat-%' THEN 6
                    ELSE 5
                END
            ) ON CONFLICT DO NOTHING;
        END LOOP;

        -- Porosity compat
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

        -- Texture compat
        FOR tex IN SELECT id, slug FROM hair_textures LOOP
            INSERT INTO product_texture_compat (product_id, texture_id, compatibility, score)
            VALUES (r.id, tex.id,
                CASE 
                    WHEN r.slug LIKE 'hydrolat-%' THEN 'recommended'
                    WHEN r.slug = 'huile-olive' AND tex.slug = 'lisse' THEN 'not_recommended'
                    WHEN r.slug = 'huile-olive' AND tex.slug = 'crepu' THEN 'recommended'
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

        -- Scalp compat
        FOR scp IN SELECT id, slug FROM scalp_types LOOP
            INSERT INTO product_scalp_compat (product_id, scalp_type_id, compatibility, score)
            VALUES (r.id, scp.id,
                CASE 
                    WHEN r.slug IN ('hydrolat-rose', 'hydrolat-lavande') AND scp.slug IN ('sec', 'sensible') THEN 'recommended'
                    WHEN r.slug IN ('hydrolat-sauge', 'hydrolat-romarin') AND scp.slug = 'gras' THEN 'recommended'
                    WHEN r.slug = 'he-tea-tree' AND scp.slug = 'gras' THEN 'recommended'
                    WHEN r.slug = 'he-tea-tree' AND scp.slug IN ('sec', 'sensible') THEN 'not_recommended'
                    ELSE 'compatible'
                END::compatibility_enum,
                CASE 
                    WHEN r.slug IN ('hydrolat-rose', 'hydrolat-lavande') AND scp.slug IN ('sec', 'sensible') THEN 10
                    WHEN r.slug = 'hydrolat-sauge' AND scp.slug = 'gras' THEN 10
                    WHEN r.slug = 'he-tea-tree' AND scp.slug IN ('sec', 'sensible') THEN 3
                    ELSE 7
                END
            ) ON CONFLICT DO NOTHING;
        END LOOP;
    END LOOP;
    
    RAISE NOTICE 'Scoring data inserted!';
END $$;

-- Final verification
DO $$
DECLARE
    prod_count INTEGER;
    score_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO prod_count FROM products WHERE slug IN (
        'huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande',
        'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon',
        'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale',
        'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange'
    );
    
    SELECT COUNT(*) INTO score_count FROM product_concern_scoring pcs
    JOIN products p ON pcs.product_id = p.id
    WHERE p.slug IN (
        'huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande',
        'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon',
        'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale',
        'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange'
    );
    
    RAISE NOTICE 'FINAL: % new products, % concern scores', prod_count, score_count;
END $$;
