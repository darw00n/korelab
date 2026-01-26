-- ============================================
-- KORELAB - Migration: New Products Scoring
-- Date: 2026-01-26
-- Adds compatibility scoring for 16 new products
-- ============================================

-- ===================
-- 1. SCORING : PRODUITS <-> CONCERNS
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

-- Hydrolat de Rose
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id, 6 -- Universel
FROM products p, concerns c WHERE p.slug = 'hydrolat-rose'
ON CONFLICT DO NOTHING;

-- Hydrolat de Romarin
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'chute' THEN 9
        WHEN 'pousse' THEN 9
        ELSE 4
    END
FROM products p, concerns c WHERE p.slug = 'hydrolat-romarin'
ON CONFLICT DO NOTHING;

-- Hydrolat de Lavande
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'pellicules' THEN 8
        WHEN 'secheresse' THEN 6
        ELSE 4
    END
FROM products p, concerns c WHERE p.slug = 'hydrolat-lavande'
ON CONFLICT DO NOTHING;

-- Hydrolat de Sauge
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'volume' THEN 7
        ELSE 4
    END
FROM products p, concerns c WHERE p.slug = 'hydrolat-sauge'
ON CONFLICT DO NOTHING;

-- Hydrolat de Menthe
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'pousse' THEN 7
        WHEN 'pellicules' THEN 6
        ELSE 5
    END
FROM products p, concerns c WHERE p.slug = 'hydrolat-menthe'
ON CONFLICT DO NOTHING;

-- Macérat de Fenugrec
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'chute' THEN 9
        WHEN 'pousse' THEN 10
        WHEN 'casse' THEN 8
        ELSE 4
    END
FROM products p, concerns c WHERE p.slug = 'macerat-fenugrec'
ON CONFLICT DO NOTHING;

-- Macérat d'Oignon
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'chute' THEN 10
        WHEN 'pousse' THEN 9
        ELSE 3
    END
FROM products p, concerns c WHERE p.slug = 'macerat-oignon'
ON CONFLICT DO NOTHING;

-- Macérat d'Ail
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'pellicules' THEN 9
        WHEN 'chute' THEN 7
        ELSE 3
    END
FROM products p, concerns c WHERE p.slug = 'macerat-ail'
ON CONFLICT DO NOTHING;

-- Protéines de Riz
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'volume' THEN 10
        WHEN 'casse' THEN 8
        ELSE 4
    END
FROM products p, concerns c WHERE p.slug = 'proteines-riz'
ON CONFLICT DO NOTHING;

-- Panthénol
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'casse' THEN 9
        WHEN 'secheresse' THEN 8
        WHEN 'pousse' THEN 6
        ELSE 5
    END
FROM products p, concerns c WHERE p.slug = 'panthenol-b5'
ON CONFLICT DO NOTHING;

-- Glycérine Végétale
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'secheresse' THEN 10
        WHEN 'frisottis' THEN 8
        ELSE 5
    END
FROM products p, concerns c WHERE p.slug = 'glycerine-vegetale'
ON CONFLICT DO NOTHING;

-- HE Tea Tree
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'pellicules' THEN 10
        ELSE 2
    END
FROM products p, concerns c WHERE p.slug = 'he-tea-tree'
ON CONFLICT DO NOTHING;

-- HE Lavande
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'pellicules' THEN 7
        WHEN 'secheresse' THEN 6
        ELSE 4
    END
FROM products p, concerns c WHERE p.slug = 'he-lavande'
ON CONFLICT DO NOTHING;

-- HE Eucalyptus
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id, 5 -- Detox général
FROM products p, concerns c WHERE p.slug = 'he-eucalyptus'
ON CONFLICT DO NOTHING;

-- HE Orange
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'brillance' THEN 7
        ELSE 3
    END
FROM products p, concerns c WHERE p.slug = 'he-orange'
ON CONFLICT DO NOTHING;

-- ===================
-- 2. COMPATIBILITÉ : PRODUITS <-> POROSITÉ
-- ===================

-- Les nouveaux produits pour chaque niveau de porosité

-- Faible porosité
INSERT INTO product_porosity_compat (product_id, porosity_id, compatibility, score)
SELECT p.id, por.id,
    CASE p.slug
        -- Hydrolats légers - Recommandés
        WHEN 'hydrolat-rose' THEN 'recommended'::compatibility_enum
        WHEN 'hydrolat-romarin' THEN 'recommended'::compatibility_enum
        WHEN 'hydrolat-lavande' THEN 'recommended'::compatibility_enum
        WHEN 'hydrolat-sauge' THEN 'recommended'::compatibility_enum
        WHEN 'hydrolat-menthe' THEN 'recommended'::compatibility_enum
        -- Actifs légers
        WHEN 'proteines-riz' THEN 'recommended'::compatibility_enum
        WHEN 'panthenol-b5' THEN 'compatible'::compatibility_enum
        WHEN 'glycerine-vegetale' THEN 'compatible'::compatibility_enum
        -- Huiles essentielles (diluées)
        WHEN 'he-tea-tree' THEN 'compatible'::compatibility_enum
        WHEN 'he-lavande' THEN 'compatible'::compatibility_enum
        WHEN 'he-eucalyptus' THEN 'compatible'::compatibility_enum
        WHEN 'he-orange' THEN 'compatible'::compatibility_enum
        -- Macérats (plus lourds)
        WHEN 'macerat-fenugrec' THEN 'not_recommended'::compatibility_enum
        WHEN 'macerat-oignon' THEN 'compatible'::compatibility_enum
        WHEN 'macerat-ail' THEN 'compatible'::compatibility_enum
        -- Huile olive (très lourde)
        WHEN 'huile-olive' THEN 'not_recommended'::compatibility_enum
        ELSE 'compatible'::compatibility_enum
    END,
    CASE p.slug
        WHEN 'hydrolat-rose' THEN 9
        WHEN 'hydrolat-romarin' THEN 9
        WHEN 'hydrolat-lavande' THEN 9
        WHEN 'hydrolat-sauge' THEN 9
        WHEN 'hydrolat-menthe' THEN 9
        WHEN 'proteines-riz' THEN 10
        WHEN 'panthenol-b5' THEN 7
        WHEN 'glycerine-vegetale' THEN 6
        WHEN 'macerat-fenugrec' THEN 3
        WHEN 'huile-olive' THEN 2
        ELSE 6
    END
FROM products p, hair_porosities por 
WHERE por.slug = 'faible' 
AND p.slug IN ('huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon', 'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale', 'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange')
ON CONFLICT DO NOTHING;

-- Moyenne porosité (tout compatible)
INSERT INTO product_porosity_compat (product_id, porosity_id, compatibility, score)
SELECT p.id, por.id, 'compatible'::compatibility_enum, 7
FROM products p, hair_porosities por 
WHERE por.slug = 'moyenne'
AND p.slug IN ('huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon', 'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale', 'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange')
ON CONFLICT DO NOTHING;

-- Forte porosité
INSERT INTO product_porosity_compat (product_id, porosity_id, compatibility, score)
SELECT p.id, por.id,
    CASE p.slug
        -- Huile lourde recommandée
        WHEN 'huile-olive' THEN 'recommended'::compatibility_enum
        -- Macérats nourrissants
        WHEN 'macerat-fenugrec' THEN 'recommended'::compatibility_enum
        WHEN 'macerat-oignon' THEN 'compatible'::compatibility_enum
        WHEN 'macerat-ail' THEN 'compatible'::compatibility_enum
        -- Actifs réparateurs
        WHEN 'panthenol-b5' THEN 'recommended'::compatibility_enum
        WHEN 'glycerine-vegetale' THEN 'recommended'::compatibility_enum
        WHEN 'proteines-riz' THEN 'compatible'::compatibility_enum
        -- Hydrolats (toujours bons)
        ELSE 'compatible'::compatibility_enum
    END,
    CASE p.slug
        WHEN 'huile-olive' THEN 9
        WHEN 'macerat-fenugrec' THEN 9
        WHEN 'panthenol-b5' THEN 9
        WHEN 'glycerine-vegetale' THEN 8
        ELSE 7
    END
FROM products p, hair_porosities por 
WHERE por.slug = 'forte'
AND p.slug IN ('huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon', 'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale', 'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange')
ON CONFLICT DO NOTHING;

-- ===================
-- 3. COMPATIBILITÉ : PRODUITS <-> TEXTURE
-- ===================

-- Cheveux Lisses/Fins
INSERT INTO product_texture_compat (product_id, texture_id, compatibility, score)
SELECT p.id, t.id,
    CASE p.slug
        -- Hydrolats légers - parfaits
        WHEN 'hydrolat-rose' THEN 'recommended'::compatibility_enum
        WHEN 'hydrolat-romarin' THEN 'recommended'::compatibility_enum
        WHEN 'hydrolat-lavande' THEN 'recommended'::compatibility_enum
        WHEN 'hydrolat-sauge' THEN 'recommended'::compatibility_enum
        WHEN 'hydrolat-menthe' THEN 'recommended'::compatibility_enum
        -- Actifs légers
        WHEN 'proteines-riz' THEN 'recommended'::compatibility_enum
        -- Huile olive trop lourde
        WHEN 'huile-olive' THEN 'not_recommended'::compatibility_enum
        WHEN 'macerat-fenugrec' THEN 'not_recommended'::compatibility_enum
        ELSE 'compatible'::compatibility_enum
    END,
    CASE p.slug
        WHEN 'hydrolat-rose' THEN 9
        WHEN 'hydrolat-romarin' THEN 9
        WHEN 'hydrolat-lavande' THEN 9
        WHEN 'hydrolat-sauge' THEN 9
        WHEN 'hydrolat-menthe' THEN 9
        WHEN 'proteines-riz' THEN 10
        WHEN 'huile-olive' THEN 2
        WHEN 'macerat-fenugrec' THEN 3
        ELSE 6
    END
FROM products p, hair_textures t 
WHERE t.slug = 'lisse'
AND p.slug IN ('huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon', 'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale', 'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange')
ON CONFLICT DO NOTHING;

-- Cheveux Ondulés (tout compatible)
INSERT INTO product_texture_compat (product_id, texture_id, compatibility, score)
SELECT p.id, t.id, 'compatible'::compatibility_enum, 7
FROM products p, hair_textures t 
WHERE t.slug = 'ondule'
AND p.slug IN ('huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon', 'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale', 'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange')
ON CONFLICT DO NOTHING;

-- Cheveux Bouclés
INSERT INTO product_texture_compat (product_id, texture_id, compatibility, score)
SELECT p.id, t.id,
    CASE p.slug
        WHEN 'glycerine-vegetale' THEN 'recommended'::compatibility_enum
        WHEN 'panthenol-b5' THEN 'recommended'::compatibility_enum
        ELSE 'compatible'::compatibility_enum
    END,
    CASE p.slug
        WHEN 'glycerine-vegetale' THEN 9
        WHEN 'panthenol-b5' THEN 8
        ELSE 7
    END
FROM products p, hair_textures t 
WHERE t.slug = 'boucle'
AND p.slug IN ('huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon', 'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale', 'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange')
ON CONFLICT DO NOTHING;

-- Cheveux Crépus
INSERT INTO product_texture_compat (product_id, texture_id, compatibility, score)
SELECT p.id, t.id,
    CASE p.slug
        WHEN 'huile-olive' THEN 'recommended'::compatibility_enum
        WHEN 'macerat-fenugrec' THEN 'recommended'::compatibility_enum
        WHEN 'glycerine-vegetale' THEN 'recommended'::compatibility_enum
        -- Protéines riz trop légères pour crépus
        WHEN 'proteines-riz' THEN 'compatible'::compatibility_enum
        ELSE 'compatible'::compatibility_enum
    END,
    CASE p.slug
        WHEN 'huile-olive' THEN 9
        WHEN 'macerat-fenugrec' THEN 9
        WHEN 'glycerine-vegetale' THEN 9
        WHEN 'proteines-riz' THEN 5
        ELSE 7
    END
FROM products p, hair_textures t 
WHERE t.slug = 'crepu'
AND p.slug IN ('huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon', 'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale', 'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange')
ON CONFLICT DO NOTHING;

-- ===================
-- 4. COMPATIBILITÉ : PRODUITS <-> CUIR CHEVELU
-- ===================

-- Cuir chevelu Sec
INSERT INTO product_scalp_compat (product_id, scalp_type_id, compatibility, score)
SELECT p.id, s.id,
    CASE p.slug
        WHEN 'hydrolat-rose' THEN 'recommended'::compatibility_enum
        WHEN 'hydrolat-lavande' THEN 'recommended'::compatibility_enum
        WHEN 'glycerine-vegetale' THEN 'recommended'::compatibility_enum
        WHEN 'he-lavande' THEN 'recommended'::compatibility_enum
        -- Sauge et tea tree trop asséchants
        WHEN 'hydrolat-sauge' THEN 'not_recommended'::compatibility_enum
        WHEN 'he-tea-tree' THEN 'not_recommended'::compatibility_enum
        WHEN 'he-eucalyptus' THEN 'not_recommended'::compatibility_enum
        ELSE 'compatible'::compatibility_enum
    END,
    CASE p.slug
        WHEN 'hydrolat-rose' THEN 10
        WHEN 'hydrolat-lavande' THEN 10
        WHEN 'glycerine-vegetale' THEN 9
        WHEN 'he-lavande' THEN 8
        WHEN 'hydrolat-sauge' THEN 3
        WHEN 'he-tea-tree' THEN 3
        WHEN 'he-eucalyptus' THEN 3
        ELSE 6
    END
FROM products p, scalp_types s 
WHERE s.slug = 'sec'
AND p.slug IN ('huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon', 'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale', 'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange')
ON CONFLICT DO NOTHING;

-- Cuir chevelu Gras
INSERT INTO product_scalp_compat (product_id, scalp_type_id, compatibility, score)
SELECT p.id, s.id,
    CASE p.slug
        WHEN 'hydrolat-sauge' THEN 'recommended'::compatibility_enum
        WHEN 'hydrolat-romarin' THEN 'recommended'::compatibility_enum
        WHEN 'hydrolat-menthe' THEN 'recommended'::compatibility_enum
        WHEN 'he-tea-tree' THEN 'recommended'::compatibility_enum
        WHEN 'he-eucalyptus' THEN 'recommended'::compatibility_enum
        -- Huile olive trop lourde
        WHEN 'huile-olive' THEN 'not_recommended'::compatibility_enum
        WHEN 'glycerine-vegetale' THEN 'not_recommended'::compatibility_enum
        ELSE 'compatible'::compatibility_enum
    END,
    CASE p.slug
        WHEN 'hydrolat-sauge' THEN 10
        WHEN 'hydrolat-romarin' THEN 9
        WHEN 'hydrolat-menthe' THEN 9
        WHEN 'he-tea-tree' THEN 9
        WHEN 'he-eucalyptus' THEN 8
        WHEN 'huile-olive' THEN 2
        WHEN 'glycerine-vegetale' THEN 3
        ELSE 6
    END
FROM products p, scalp_types s 
WHERE s.slug = 'gras'
AND p.slug IN ('huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon', 'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale', 'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange')
ON CONFLICT DO NOTHING;

-- Cuir chevelu Normal (tout compatible)
INSERT INTO product_scalp_compat (product_id, scalp_type_id, compatibility, score)
SELECT p.id, s.id, 'compatible'::compatibility_enum, 7
FROM products p, scalp_types s 
WHERE s.slug = 'normal'
AND p.slug IN ('huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon', 'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale', 'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange')
ON CONFLICT DO NOTHING;

-- Cuir chevelu Sensible
INSERT INTO product_scalp_compat (product_id, scalp_type_id, compatibility, score)
SELECT p.id, s.id,
    CASE p.slug
        WHEN 'hydrolat-rose' THEN 'recommended'::compatibility_enum
        WHEN 'hydrolat-lavande' THEN 'recommended'::compatibility_enum
        WHEN 'he-lavande' THEN 'recommended'::compatibility_enum
        -- HE fortes déconseillées
        WHEN 'he-tea-tree' THEN 'not_recommended'::compatibility_enum
        WHEN 'he-eucalyptus' THEN 'not_recommended'::compatibility_enum
        WHEN 'macerat-ail' THEN 'not_recommended'::compatibility_enum
        ELSE 'compatible'::compatibility_enum
    END,
    CASE p.slug
        WHEN 'hydrolat-rose' THEN 10
        WHEN 'hydrolat-lavande' THEN 10
        WHEN 'he-lavande' THEN 8
        WHEN 'he-tea-tree' THEN 2
        WHEN 'he-eucalyptus' THEN 2
        WHEN 'macerat-ail' THEN 2
        ELSE 6
    END
FROM products p, scalp_types s 
WHERE s.slug = 'sensible'
AND p.slug IN ('huile-olive', 'hydrolat-rose', 'hydrolat-romarin', 'hydrolat-lavande', 'hydrolat-sauge', 'hydrolat-menthe', 'macerat-fenugrec', 'macerat-oignon', 'macerat-ail', 'proteines-riz', 'panthenol-b5', 'glycerine-vegetale', 'he-tea-tree', 'he-lavande', 'he-eucalyptus', 'he-orange')
ON CONFLICT DO NOTHING;

-- ===================
-- FIN MIGRATION NEW PRODUCTS SCORING
-- ===================
