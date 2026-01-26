-- ============================================
-- KORELAB - Migration: Fix Products Scoring
-- Date: 2026-01-26
-- Adds scoring for newly inserted products
-- ============================================

-- ===================
-- CONCERN SCORING
-- ===================

-- Huile d'Olive
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'secheresse' THEN 10
        WHEN 'casse' THEN 7
        WHEN 'frisottis' THEN 6
        ELSE 3
    END
FROM products p, concerns c WHERE p.slug = 'huile-olive'
ON CONFLICT DO NOTHING;

-- Hydrolats
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id, 6 FROM products p, concerns c WHERE p.slug = 'hydrolat-rose' ON CONFLICT DO NOTHING;

INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id, CASE c.slug WHEN 'chute' THEN 9 WHEN 'pousse' THEN 9 ELSE 4 END
FROM products p, concerns c WHERE p.slug = 'hydrolat-romarin' ON CONFLICT DO NOTHING;

INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id, CASE c.slug WHEN 'pellicules' THEN 8 WHEN 'secheresse' THEN 6 ELSE 4 END
FROM products p, concerns c WHERE p.slug = 'hydrolat-lavande' ON CONFLICT DO NOTHING;

INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id, CASE c.slug WHEN 'volume' THEN 7 ELSE 4 END
FROM products p, concerns c WHERE p.slug = 'hydrolat-sauge' ON CONFLICT DO NOTHING;

INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id, CASE c.slug WHEN 'pousse' THEN 7 WHEN 'pellicules' THEN 6 ELSE 5 END
FROM products p, concerns c WHERE p.slug = 'hydrolat-menthe' ON CONFLICT DO NOTHING;

-- Macérats
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id, CASE c.slug WHEN 'chute' THEN 9 WHEN 'pousse' THEN 10 WHEN 'casse' THEN 8 ELSE 4 END
FROM products p, concerns c WHERE p.slug = 'macerat-fenugrec' ON CONFLICT DO NOTHING;

INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id, CASE c.slug WHEN 'chute' THEN 10 WHEN 'pousse' THEN 9 ELSE 3 END
FROM products p, concerns c WHERE p.slug = 'macerat-oignon' ON CONFLICT DO NOTHING;

INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id, CASE c.slug WHEN 'pellicules' THEN 9 WHEN 'chute' THEN 7 ELSE 3 END
FROM products p, concerns c WHERE p.slug = 'macerat-ail' ON CONFLICT DO NOTHING;

-- Actifs
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id, CASE c.slug WHEN 'volume' THEN 10 WHEN 'casse' THEN 8 ELSE 4 END
FROM products p, concerns c WHERE p.slug = 'proteines-riz' ON CONFLICT DO NOTHING;

INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id, CASE c.slug WHEN 'casse' THEN 9 WHEN 'secheresse' THEN 8 WHEN 'pousse' THEN 6 ELSE 5 END
FROM products p, concerns c WHERE p.slug = 'panthenol-b5' ON CONFLICT DO NOTHING;

INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id, CASE c.slug WHEN 'secheresse' THEN 10 WHEN 'frisottis' THEN 8 ELSE 5 END
FROM products p, concerns c WHERE p.slug = 'glycerine-vegetale' ON CONFLICT DO NOTHING;

-- Huiles Essentielles
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id, CASE c.slug WHEN 'pellicules' THEN 10 ELSE 2 END
FROM products p, concerns c WHERE p.slug = 'he-tea-tree' ON CONFLICT DO NOTHING;

INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id, CASE c.slug WHEN 'pellicules' THEN 7 WHEN 'secheresse' THEN 6 ELSE 4 END
FROM products p, concerns c WHERE p.slug = 'he-lavande' ON CONFLICT DO NOTHING;

INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id, 5 FROM products p, concerns c WHERE p.slug = 'he-eucalyptus' ON CONFLICT DO NOTHING;

INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id, CASE c.slug WHEN 'brillance' THEN 7 ELSE 3 END
FROM products p, concerns c WHERE p.slug = 'he-orange' ON CONFLICT DO NOTHING;

-- ===================
-- POROSITY COMPATIBILITY
-- ===================

-- All new products for each porosity level
INSERT INTO product_porosity_compat (product_id, porosity_id, compatibility, score)
SELECT p.id, por.id,
    CASE 
        WHEN p.slug IN ('hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'proteines-riz') THEN 'recommended'::compatibility_enum
        WHEN p.slug IN ('huile-olive', 'macerat-fenugrec') THEN 'not_recommended'::compatibility_enum
        ELSE 'compatible'::compatibility_enum
    END,
    CASE 
        WHEN p.slug LIKE 'hydrolat-%' THEN 9
        WHEN p.slug = 'proteines-riz' THEN 10
        WHEN p.slug IN ('huile-olive', 'macerat-fenugrec') THEN 3
        ELSE 6
    END
FROM products p, hair_porosities por 
WHERE por.slug = 'faible' 
AND p.slug IN ('huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon', 'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale', 'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange')
ON CONFLICT DO NOTHING;

INSERT INTO product_porosity_compat (product_id, porosity_id, compatibility, score)
SELECT p.id, por.id, 'compatible'::compatibility_enum, 7
FROM products p, hair_porosities por 
WHERE por.slug = 'moyenne'
AND p.slug IN ('huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon', 'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale', 'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange')
ON CONFLICT DO NOTHING;

INSERT INTO product_porosity_compat (product_id, porosity_id, compatibility, score)
SELECT p.id, por.id,
    CASE 
        WHEN p.slug IN ('huile-olive', 'macerat-fenugrec', 'panthenol-b5', 'glycerine-vegetale') THEN 'recommended'::compatibility_enum
        ELSE 'compatible'::compatibility_enum
    END,
    CASE 
        WHEN p.slug IN ('huile-olive', 'macerat-fenugrec') THEN 9
        WHEN p.slug IN ('panthenol-b5', 'glycerine-vegetale') THEN 8
        ELSE 7
    END
FROM products p, hair_porosities por 
WHERE por.slug = 'forte'
AND p.slug IN ('huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon', 'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale', 'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange')
ON CONFLICT DO NOTHING;

-- ===================
-- TEXTURE COMPATIBILITY
-- ===================

INSERT INTO product_texture_compat (product_id, texture_id, compatibility, score)
SELECT p.id, t.id,
    CASE 
        WHEN p.slug LIKE 'hydrolat-%' OR p.slug = 'proteines-riz' THEN 'recommended'::compatibility_enum
        WHEN p.slug IN ('huile-olive', 'macerat-fenugrec') THEN 'not_recommended'::compatibility_enum
        ELSE 'compatible'::compatibility_enum
    END,
    CASE 
        WHEN p.slug LIKE 'hydrolat-%' THEN 9
        WHEN p.slug = 'proteines-riz' THEN 10
        WHEN p.slug IN ('huile-olive', 'macerat-fenugrec') THEN 3
        ELSE 6
    END
FROM products p, hair_textures t 
WHERE t.slug = 'lisse'
AND p.slug IN ('huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon', 'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale', 'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange')
ON CONFLICT DO NOTHING;

INSERT INTO product_texture_compat (product_id, texture_id, compatibility, score)
SELECT p.id, t.id, 'compatible'::compatibility_enum, 7
FROM products p, hair_textures t 
WHERE t.slug = 'ondule'
AND p.slug IN ('huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon', 'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale', 'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange')
ON CONFLICT DO NOTHING;

INSERT INTO product_texture_compat (product_id, texture_id, compatibility, score)
SELECT p.id, t.id,
    CASE WHEN p.slug IN ('glycerine-vegetale', 'panthenol-b5') THEN 'recommended'::compatibility_enum ELSE 'compatible'::compatibility_enum END,
    CASE WHEN p.slug IN ('glycerine-vegetale', 'panthenol-b5') THEN 9 ELSE 7 END
FROM products p, hair_textures t 
WHERE t.slug = 'boucle'
AND p.slug IN ('huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon', 'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale', 'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange')
ON CONFLICT DO NOTHING;

INSERT INTO product_texture_compat (product_id, texture_id, compatibility, score)
SELECT p.id, t.id,
    CASE WHEN p.slug IN ('huile-olive', 'macerat-fenugrec', 'glycerine-vegetale') THEN 'recommended'::compatibility_enum ELSE 'compatible'::compatibility_enum END,
    CASE WHEN p.slug IN ('huile-olive', 'macerat-fenugrec', 'glycerine-vegetale') THEN 9 ELSE 7 END
FROM products p, hair_textures t 
WHERE t.slug = 'crepu'
AND p.slug IN ('huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon', 'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale', 'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange')
ON CONFLICT DO NOTHING;

-- ===================
-- SCALP COMPATIBILITY
-- ===================

INSERT INTO product_scalp_compat (product_id, scalp_type_id, compatibility, score)
SELECT p.id, s.id,
    CASE 
        WHEN p.slug IN ('hydrolat-rose', 'hydrolat-lavande', 'glycerine-vegetale', 'he-lavande') THEN 'recommended'::compatibility_enum
        WHEN p.slug IN ('hydrolat-sauge', 'he-tea-tree', 'he-eucalyptus') THEN 'not_recommended'::compatibility_enum
        ELSE 'compatible'::compatibility_enum
    END,
    CASE 
        WHEN p.slug IN ('hydrolat-rose', 'hydrolat-lavande') THEN 10
        WHEN p.slug IN ('glycerine-vegetale', 'he-lavande') THEN 8
        WHEN p.slug IN ('hydrolat-sauge', 'he-tea-tree', 'he-eucalyptus') THEN 3
        ELSE 6
    END
FROM products p, scalp_types s 
WHERE s.slug = 'sec'
AND p.slug IN ('huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon', 'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale', 'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange')
ON CONFLICT DO NOTHING;

INSERT INTO product_scalp_compat (product_id, scalp_type_id, compatibility, score)
SELECT p.id, s.id,
    CASE 
        WHEN p.slug IN ('hydrolat-sauge', 'hydrolat-romarin', 'hydrolat-menthe', 'he-tea-tree', 'he-eucalyptus') THEN 'recommended'::compatibility_enum
        WHEN p.slug IN ('huile-olive', 'glycerine-vegetale') THEN 'not_recommended'::compatibility_enum
        ELSE 'compatible'::compatibility_enum
    END,
    CASE 
        WHEN p.slug = 'hydrolat-sauge' THEN 10
        WHEN p.slug IN ('hydrolat-romarin', 'hydrolat-menthe', 'he-tea-tree') THEN 9
        WHEN p.slug = 'he-eucalyptus' THEN 8
        WHEN p.slug IN ('huile-olive', 'glycerine-vegetale') THEN 3
        ELSE 6
    END
FROM products p, scalp_types s 
WHERE s.slug = 'gras'
AND p.slug IN ('huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon', 'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale', 'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange')
ON CONFLICT DO NOTHING;

INSERT INTO product_scalp_compat (product_id, scalp_type_id, compatibility, score)
SELECT p.id, s.id, 'compatible'::compatibility_enum, 7
FROM products p, scalp_types s 
WHERE s.slug = 'normal'
AND p.slug IN ('huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon', 'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale', 'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange')
ON CONFLICT DO NOTHING;

INSERT INTO product_scalp_compat (product_id, scalp_type_id, compatibility, score)
SELECT p.id, s.id,
    CASE 
        WHEN p.slug IN ('hydrolat-rose', 'hydrolat-lavande', 'he-lavande') THEN 'recommended'::compatibility_enum
        WHEN p.slug IN ('he-tea-tree', 'he-eucalyptus', 'macerat-ail') THEN 'not_recommended'::compatibility_enum
        ELSE 'compatible'::compatibility_enum
    END,
    CASE 
        WHEN p.slug IN ('hydrolat-rose', 'hydrolat-lavande') THEN 10
        WHEN p.slug = 'he-lavande' THEN 8
        WHEN p.slug IN ('he-tea-tree', 'he-eucalyptus', 'macerat-ail') THEN 2
        ELSE 6
    END
FROM products p, scalp_types s 
WHERE s.slug = 'sensible'
AND p.slug IN ('huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon', 'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale', 'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange')
ON CONFLICT DO NOTHING;

-- ===================
-- FIN MIGRATION FIX SCORING
-- ===================
