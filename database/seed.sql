-- ============================================
-- KORELAB - Seed Data (HAIR CARE EDITION)
-- Produits Capillaires Marocains Authentiques
-- ============================================

-- ===================
-- CATÉGORIES
-- ===================
INSERT INTO categories (name, slug, description, icon) VALUES
    ('Lavants', 'lavants', 'Shampoings et nettoyants capillaires', 'Droplets'),
    ('Huiles Végétales', 'huiles', 'Huiles pures pour soins et scellage', 'Leaf'),
    ('Beurres & Scellants', 'beurres', 'Beurres nourrissants et scellants', 'Heart'),
    ('Actifs & Boosters', 'actifs', 'Actifs concentrés et huiles essentielles', 'Sparkles'),
    ('Styling & Finish', 'styling', 'Gels et produits coiffants', 'Wind');

-- ===================
-- TEXTURES DE CHEVEUX
-- ===================
INSERT INTO hair_textures (name, slug, description, icon, display_order) VALUES
    ('Lisse (Type 1)', 'lisse', 'Cheveux raides, sans ondulation naturelle', 'Minus', 1),
    ('Ondulé (Type 2)', 'ondule', 'Cheveux formant des vagues en S', 'Waves', 2),
    ('Bouclé (Type 3)', 'boucle', 'Boucles définies en spirales', 'Circle', 3),
    ('Frisé / Crépu (Type 4)', 'crepu', 'Boucles très serrées en Z, cheveux afro', 'Zap', 4);

-- ===================
-- POROSITÉS
-- ===================
INSERT INTO hair_porosities (name, slug, description, care_tip, icon, display_order) VALUES
    (
        'Porosité Faible', 
        'faible', 
        'Cuticules fermées - Le cheveu repousse l''eau, les produits restent en surface',
        'Privilégier les huiles légères (Pépins de Raisin, Argan). Éviter les beurres lourds.',
        'ShieldOff',
        1
    ),
    (
        'Porosité Moyenne', 
        'moyenne', 
        'Cuticules normales - Absorption et rétention équilibrées',
        'Vous pouvez utiliser la plupart des produits. Routine LOC classique.',
        'Shield',
        2
    ),
    (
        'Porosité Forte', 
        'forte', 
        'Cuticules ouvertes/endommagées - Absorbe vite mais perd l''hydratation',
        'Besoin de protéines et de scellage fort (Karité, Avocat). Éviter les humectants seuls.',
        'ShieldAlert',
        3
    );

-- ===================
-- TYPES DE CUIR CHEVELU
-- ===================
INSERT INTO scalp_types (name, slug, description, icon, display_order) VALUES
    ('Cuir Chevelu Sec', 'sec', 'Tiraillements, démangeaisons, pellicules sèches', 'Droplet', 1),
    ('Cuir Chevelu Gras', 'gras', 'Excès de sébum, cheveux qui regraissent vite', 'Sun', 2),
    ('Cuir Chevelu Normal', 'normal', 'Équilibré, pas de problème particulier', 'Heart', 3),
    ('Cuir Chevelu Sensible', 'sensible', 'Réactif, irritations, rougeurs, pellicules', 'AlertTriangle', 4);

-- ===================
-- PRÉOCCUPATIONS CAPILLAIRES
-- ===================
INSERT INTO concerns (name, slug, description, icon, display_order) VALUES
    ('Chute de Cheveux', 'chute', 'Perte excessive, alopécie, cheveux clairsemés', 'TrendingDown', 1),
    ('Pellicules', 'pellicules', 'Squames blanches, démangeaisons du cuir chevelu', 'Snowflake', 2),
    ('Casse & Fragilité', 'casse', 'Cheveux qui se cassent, pointes fourchues', 'Scissors', 3),
    ('Pousse Lente', 'pousse', 'Cheveux qui stagnent, croissance ralentie', 'Clock', 4),
    ('Sécheresse', 'secheresse', 'Cheveux secs, ternes, manque d''hydratation', 'Droplets', 5),
    ('Frisottis', 'frisottis', 'Cheveux gonflés, manque de définition', 'Wind', 6),
    ('Manque de Volume', 'volume', 'Cheveux plats, sans corps', 'ArrowUp', 7),
    ('Manque de Brillance', 'brillance', 'Cheveux ternes, sans éclat', 'Sparkles', 8);

-- ===================
-- PRODUITS CAPILLAIRES
-- ===================

-- 1. GHASSOUL ATLAS PUR (Cleanser - Clay Powder)
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, image_url, usage_instructions, expert_note, tags) VALUES
(
    'Ghassoul de l''Atlas Pur',
    'ghassoul-atlas-pur',
    'Argile minérale 100% naturelle des montagnes de l''Atlas marocain. Utilisée depuis des siècles dans les hammams, elle nettoie en profondeur le cuir chevelu et absorbe l''excès de sébum sans agresser. Apporte volume et légèreté aux cheveux.',
    'Argile lavante purifiante - Volume & Détox',
    75.00,
    'cleanser',
    'clay_powder',
    '/images/products/ghassoul-hair.jpg',
    'Mélanger 2-3 cuillères avec de l''eau tiède jusqu''à obtenir une pâte. Appliquer sur cuir chevelu humide, masser 5 min, rincer abondamment.',
    'Idéal pour espacer les shampoings. Attention aux cheveux très secs ou à faible porosité (peut assécher).',
    ARRAY['ghassoul', 'argile', 'detox', 'volume', 'naturel', 'maroc']
);

-- 2. SHAMPOING BASE NEUTRE DOUCE (Cleanser - Shampoo)
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, image_url, usage_instructions, expert_note, tags) VALUES
(
    'Shampoing Base Neutre Douce',
    'shampoing-base-neutre',
    'Base lavante ultra-douce sans sulfates agressifs, formulée pour les cuirs chevelus sensibles et les lavages fréquents. pH équilibré, respecte le film hydrolipidique. Convient à tous types de cheveux.',
    'Nettoyant doux quotidien - Cuirs chevelus sensibles',
    65.00,
    'cleanser',
    'shampoo',
    '/images/products/shampoing-neutre.jpg',
    'Appliquer sur cheveux mouillés, masser délicatement le cuir chevelu, rincer. Répéter si nécessaire.',
    'La base parfaite pour tous. Peut être enrichie avec des actifs (HE Romarin pour chute, Tea Tree pour pellicules).',
    ARRAY['shampoing', 'doux', 'sensible', 'quotidien', 'sans-sulfate']
);

-- 3. HUILE DE RICIN (Treatment - Oil)
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, image_url, usage_instructions, expert_note, tags) VALUES
(
    'Huile de Ricin Pure (Castor Oil)',
    'huile-ricin',
    'Huile de Ricin 100% pure, pressée à froid. Reconnue mondialement pour stimuler la pousse des cheveux et renforcer les follicules. Riche en acide ricinoléique aux propriétés fortifiantes exceptionnelles.',
    'L''huile de la pousse - Fortifie et stimule',
    95.00,
    'treatment',
    'oil',
    '/images/products/huile-ricin.jpg',
    'En bain d''huile : appliquer sur le cuir chevelu et les longueurs, masser 10 min, laisser poser 1h minimum (ou toute la nuit), puis laver.',
    'ATTENTION : Huile très épaisse ! Toujours utiliser en bain d''huile avant shampoing, jamais en leave-in. Peut alourdir les cheveux fins.',
    ARRAY['ricin', 'castor', 'pousse', 'chute', 'fortifiant', 'bain-huile']
);

-- 4. HUILE DE NIGELLE (Treatment - Oil)
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, image_url, usage_instructions, expert_note, tags) VALUES
(
    'Huile de Nigelle (Habba Sawda)',
    'huile-nigelle',
    'L''huile de "graine bénie" (Black Seed Oil), utilisée depuis l''Antiquité pour ses propriétés purifiantes et apaisantes. Riche en Thymoquinone, elle assainit le cuir chevelu et combat les pellicules.',
    'La graine bénie - Anti-pelliculaire & Apaisant',
    110.00,
    'treatment',
    'oil',
    '/images/products/huile-nigelle.jpg',
    'En massage cuir chevelu : quelques gouttes, masser 5 min avant le shampoing. Peut être ajoutée au shampoing (3-4 gouttes).',
    'Excellente pour les cuirs chevelus irrités et les pellicules. Odeur caractéristique épicée.',
    ARRAY['nigelle', 'habba-sawda', 'black-seed', 'pellicules', 'apaisant', 'cuir-chevelu']
);

-- 5. HUILE D'ARGAN BIO (Finish - Oil)
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, image_url, usage_instructions, expert_note, tags) VALUES
(
    'Huile d''Argan Bio Pure',
    'huile-argan',
    'L''or liquide du Maroc, extraite à froid des noix d''arganier de la région de Souss-Massa. Riche en Vitamine E et acides gras essentiels. Apporte brillance, nutrition et protection sans alourdir.',
    'L''or du Maroc - Brillance universelle',
    135.00,
    'finish',
    'oil',
    '/images/products/huile-argan.jpg',
    'En finition : 2-3 gouttes sur cheveux humides ou secs, sur les longueurs et pointes. En bain d''huile : appliquer généreusement, poser 30 min.',
    'Huile universelle qui convient à tous les types. Légère, pénètre bien. Le must-have marocain.',
    ARRAY['argan', 'maroc', 'brillance', 'nutrition', 'universel', 'bio']
);

-- 6. HUILE DE PÉPINS DE RAISIN (Finish - Oil)
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, image_url, usage_instructions, expert_note, tags) VALUES
(
    'Huile de Pépins de Raisin',
    'huile-pepins-raisin',
    'Huile ultra-légère, idéale pour les cheveux fins qui craignent l''alourdissement. Riche en polyphénols antioxydants. Pénètre rapidement sans laisser de film gras. Parfaite pour la porosité faible.',
    'L''huile des cheveux fins - Ultra-légère',
    85.00,
    'finish',
    'oil',
    '/images/products/huile-pepins-raisin.jpg',
    'En finition quotidienne : 2-4 gouttes sur longueurs humides. En sérum de jour sur cheveux secs.',
    'LE choix pour les cheveux fins ou à faible porosité. Ne bouche pas les cuticules, n''alourdit jamais.',
    ARRAY['pepins-raisin', 'leger', 'fins', 'porosite-faible', 'antioxydant']
);

-- 7. HUILE D'AVOCAT (Treatment - Oil)
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, image_url, usage_instructions, expert_note, tags) VALUES
(
    'Huile d''Avocat Pure',
    'huile-avocat',
    'Huile pénétrante par excellence, capable de traverser la cuticule pour nourrir le cortex du cheveu. Riche en vitamines A, D, E et acides gras. Idéale pour les cheveux très poreux ou abîmés.',
    'L''huile pénétrante - Nutrition profonde',
    90.00,
    'treatment',
    'oil',
    '/images/products/huile-avocat.jpg',
    'En bain d''huile : appliquer sur cheveux secs, couvrir d''un bonnet, laisser 1-2h ou toute la nuit. En masque : mélanger avec Karité.',
    'Une des rares huiles qui PÉNÈTRE vraiment le cheveu. Parfaite pour reconstruire les cheveux poreux/abîmés.',
    ARRAY['avocat', 'penetrant', 'porosite-forte', 'reparateur', 'nutrition-profonde']
);

-- 8. BEURRE DE KARITÉ BRUT (Finish - Butter)
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, image_url, usage_instructions, expert_note, tags) VALUES
(
    'Beurre de Karité Brut Non Raffiné',
    'beurre-karite',
    'Beurre de Karité pur du Burkina Faso, non raffiné pour conserver tous ses actifs. Le scellant ultime pour les cheveux crépus et très poreux. Forme un film protecteur qui retient l''hydratation.',
    'Le scellant ultime - Cheveux crépus & poreux',
    95.00,
    'finish',
    'butter',
    '/images/products/beurre-karite.jpg',
    'Faire fondre une noisette entre les mains, appliquer sur cheveux humides en scellant après un leave-in hydratant. Pour les pointes : petite quantité sur pointes sèches.',
    'INTERDIT sur cheveux fins ou porosité faible (effet carton garanti). Réservé aux textures 3C-4C et haute porosité.',
    ARRAY['karite', 'beurre', 'scellant', 'crepu', 'porosite-forte', 'afro']
);

-- 9. GEL D'ALOE VERA (Finish - Gel)
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, image_url, usage_instructions, expert_note, tags) VALUES
(
    'Gel d''Aloe Vera Natif 99%',
    'gel-aloe-vera',
    'Gel d''Aloe Vera pur à 99%, cultivé au Maroc. Hydratant puissant qui ne laisse pas de résidus. Apaise le cuir chevelu, définit les boucles, et sert de base pour les soins DIY.',
    'L''hydratant universel - Définition & Apaisement',
    70.00,
    'finish',
    'gel',
    '/images/products/gel-aloe-vera.jpg',
    'En leave-in : appliquer sur cheveux humides avant huile/beurre. En gel coiffant : appliquer et scruncher les boucles. Sur cuir chevelu : masser pour apaiser.',
    'Le "L" de la méthode LOC/LCO. Hydrate sans alourdir. Base parfaite avant scellage.',
    ARRAY['aloe-vera', 'gel', 'hydratant', 'boucles', 'cuir-chevelu', 'loc']
);

-- 10. PROTÉINES DE SOIE (Treatment - Active)
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, image_url, usage_instructions, expert_note, tags) VALUES
(
    'Protéines de Soie Hydrolysées',
    'proteines-soie',
    'Actif concentré de protéines de soie hydrolysées. Renforce la fibre capillaire, comble les brèches dans les cheveux poreux, réduit la casse. Apporte brillance et toucher soyeux.',
    'Réparateur intense - Anti-casse',
    120.00,
    'treatment',
    'active',
    '/images/products/proteines-soie.jpg',
    'Ajouter 5-10 gouttes à votre masque ou après-shampoing. Ne pas utiliser plus d''1x/semaine pour éviter l''excès de protéines.',
    'Indispensable pour les cheveux cassants ou très poreux. Attention au "protein overload" : alterner avec soins hydratants.',
    ARRAY['proteines', 'soie', 'reparateur', 'casse', 'porosite-forte', 'actif']
);

-- 11. HUILE ESSENTIELLE DE ROMARIN (Treatment - Active)
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, image_url, usage_instructions, expert_note, tags) VALUES
(
    'Huile Essentielle de Romarin à Cinéole',
    'he-romarin',
    'Huile essentielle de Romarin reconnue scientifiquement pour stimuler la microcirculation du cuir chevelu et favoriser la pousse. Études cliniques comparables au Minoxidil.',
    'Le booster de pousse - Stimulant capillaire',
    85.00,
    'treatment',
    'active',
    '/images/products/he-romarin.jpg',
    'JAMAIS PURE ! Diluer 3-5 gouttes dans 30ml d''huile de Ricin ou Argan. Masser le cuir chevelu 2-3x/semaine.',
    'L''actif anti-chute naturel le plus étudié. À combiner avec Ricin pour effet synergique sur la pousse.',
    ARRAY['romarin', 'huile-essentielle', 'pousse', 'chute', 'stimulant', 'actif']
);

-- ===================
-- SCORING : PRODUITS <-> CONCERNS
-- ===================

-- Ghassoul
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id, 
    CASE c.slug
        WHEN 'volume' THEN 9
        WHEN 'frisottis' THEN 6
        ELSE 3
    END
FROM products p, concerns c WHERE p.slug = 'ghassoul-atlas-pur';

-- Shampoing Base Neutre
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'secheresse' THEN 7
        ELSE 5
    END
FROM products p, concerns c WHERE p.slug = 'shampoing-base-neutre';

-- Huile de Ricin
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'chute' THEN 10
        WHEN 'pousse' THEN 10
        WHEN 'casse' THEN 7
        ELSE 3
    END
FROM products p, concerns c WHERE p.slug = 'huile-ricin';

-- Huile de Nigelle
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'pellicules' THEN 10
        ELSE 4
    END
FROM products p, concerns c WHERE p.slug = 'huile-nigelle';

-- Huile d'Argan
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'brillance' THEN 10
        WHEN 'frisottis' THEN 8
        WHEN 'secheresse' THEN 7
        ELSE 5
    END
FROM products p, concerns c WHERE p.slug = 'huile-argan';

-- Huile Pépins de Raisin
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'brillance' THEN 8
        WHEN 'volume' THEN 9
        ELSE 4
    END
FROM products p, concerns c WHERE p.slug = 'huile-pepins-raisin';

-- Huile d'Avocat
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'secheresse' THEN 10
        WHEN 'casse' THEN 9
        ELSE 5
    END
FROM products p, concerns c WHERE p.slug = 'huile-avocat';

-- Beurre de Karité
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'secheresse' THEN 10
        WHEN 'casse' THEN 8
        WHEN 'frisottis' THEN 7
        ELSE 4
    END
FROM products p, concerns c WHERE p.slug = 'beurre-karite';

-- Gel Aloe Vera
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'secheresse' THEN 9
        WHEN 'frisottis' THEN 7
        ELSE 5
    END
FROM products p, concerns c WHERE p.slug = 'gel-aloe-vera';

-- Protéines de Soie
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'casse' THEN 10
        WHEN 'brillance' THEN 8
        ELSE 3
    END
FROM products p, concerns c WHERE p.slug = 'proteines-soie';

-- HE Romarin
INSERT INTO product_concern_scoring (product_id, concern_id, score)
SELECT p.id, c.id,
    CASE c.slug
        WHEN 'chute' THEN 10
        WHEN 'pousse' THEN 9
        ELSE 2
    END
FROM products p, concerns c WHERE p.slug = 'he-romarin';

-- ===================
-- COMPATIBILITÉ : PRODUITS <-> POROSITÉ
-- ===================

-- Faible porosité
INSERT INTO product_porosity_compat (product_id, porosity_id, compatibility, score)
SELECT p.id, por.id,
    CASE p.slug
        WHEN 'huile-pepins-raisin' THEN 'recommended'::compatibility_enum
        WHEN 'huile-argan' THEN 'recommended'::compatibility_enum
        WHEN 'gel-aloe-vera' THEN 'recommended'::compatibility_enum
        WHEN 'ghassoul-atlas-pur' THEN 'not_recommended'::compatibility_enum
        WHEN 'beurre-karite' THEN 'forbidden'::compatibility_enum
        WHEN 'huile-ricin' THEN 'not_recommended'::compatibility_enum
        WHEN 'huile-avocat' THEN 'compatible'::compatibility_enum
        ELSE 'compatible'::compatibility_enum
    END,
    CASE p.slug
        WHEN 'huile-pepins-raisin' THEN 10
        WHEN 'huile-argan' THEN 9
        WHEN 'gel-aloe-vera' THEN 8
        WHEN 'beurre-karite' THEN 1
        WHEN 'huile-ricin' THEN 3
        ELSE 5
    END
FROM products p, hair_porosities por WHERE por.slug = 'faible';

-- Moyenne porosité (tout compatible)
INSERT INTO product_porosity_compat (product_id, porosity_id, compatibility, score)
SELECT p.id, por.id, 'compatible'::compatibility_enum, 7
FROM products p, hair_porosities por WHERE por.slug = 'moyenne';

-- Forte porosité
INSERT INTO product_porosity_compat (product_id, porosity_id, compatibility, score)
SELECT p.id, por.id,
    CASE p.slug
        WHEN 'beurre-karite' THEN 'recommended'::compatibility_enum
        WHEN 'huile-avocat' THEN 'recommended'::compatibility_enum
        WHEN 'proteines-soie' THEN 'recommended'::compatibility_enum
        WHEN 'huile-pepins-raisin' THEN 'not_recommended'::compatibility_enum
        ELSE 'compatible'::compatibility_enum
    END,
    CASE p.slug
        WHEN 'beurre-karite' THEN 10
        WHEN 'huile-avocat' THEN 10
        WHEN 'proteines-soie' THEN 9
        WHEN 'huile-pepins-raisin' THEN 3
        ELSE 6
    END
FROM products p, hair_porosities por WHERE por.slug = 'forte';

-- ===================
-- COMPATIBILITÉ : PRODUITS <-> TEXTURE
-- ===================

-- Cheveux Lisses/Fins
INSERT INTO product_texture_compat (product_id, texture_id, compatibility, score)
SELECT p.id, t.id,
    CASE p.slug
        WHEN 'huile-pepins-raisin' THEN 'recommended'::compatibility_enum
        WHEN 'huile-argan' THEN 'recommended'::compatibility_enum
        WHEN 'beurre-karite' THEN 'forbidden'::compatibility_enum
        WHEN 'huile-ricin' THEN 'not_recommended'::compatibility_enum
        ELSE 'compatible'::compatibility_enum
    END,
    CASE p.slug
        WHEN 'huile-pepins-raisin' THEN 10
        WHEN 'huile-argan' THEN 9
        WHEN 'beurre-karite' THEN 1
        WHEN 'huile-ricin' THEN 3
        ELSE 6
    END
FROM products p, hair_textures t WHERE t.slug = 'lisse';

-- Cheveux Ondulés
INSERT INTO product_texture_compat (product_id, texture_id, compatibility, score)
SELECT p.id, t.id, 'compatible'::compatibility_enum, 7
FROM products p, hair_textures t WHERE t.slug = 'ondule';

-- Cheveux Bouclés
INSERT INTO product_texture_compat (product_id, texture_id, compatibility, score)
SELECT p.id, t.id,
    CASE p.slug
        WHEN 'gel-aloe-vera' THEN 'recommended'::compatibility_enum
        WHEN 'huile-argan' THEN 'recommended'::compatibility_enum
        ELSE 'compatible'::compatibility_enum
    END,
    CASE p.slug
        WHEN 'gel-aloe-vera' THEN 9
        WHEN 'huile-argan' THEN 8
        ELSE 7
    END
FROM products p, hair_textures t WHERE t.slug = 'boucle';

-- Cheveux Crépus (Type 4)
INSERT INTO product_texture_compat (product_id, texture_id, compatibility, score)
SELECT p.id, t.id,
    CASE p.slug
        WHEN 'beurre-karite' THEN 'recommended'::compatibility_enum
        WHEN 'huile-avocat' THEN 'recommended'::compatibility_enum
        WHEN 'gel-aloe-vera' THEN 'recommended'::compatibility_enum
        WHEN 'huile-pepins-raisin' THEN 'not_recommended'::compatibility_enum
        ELSE 'compatible'::compatibility_enum
    END,
    CASE p.slug
        WHEN 'beurre-karite' THEN 10
        WHEN 'huile-avocat' THEN 9
        WHEN 'gel-aloe-vera' THEN 8
        WHEN 'huile-pepins-raisin' THEN 4
        ELSE 6
    END
FROM products p, hair_textures t WHERE t.slug = 'crepu';

-- ===================
-- COMPATIBILITÉ : PRODUITS <-> CUIR CHEVELU
-- ===================

-- Cuir chevelu Sec
INSERT INTO product_scalp_compat (product_id, scalp_type_id, compatibility, score)
SELECT p.id, s.id,
    CASE p.slug
        WHEN 'shampoing-base-neutre' THEN 'recommended'::compatibility_enum
        WHEN 'gel-aloe-vera' THEN 'recommended'::compatibility_enum
        WHEN 'ghassoul-atlas-pur' THEN 'not_recommended'::compatibility_enum
        ELSE 'compatible'::compatibility_enum
    END,
    CASE p.slug
        WHEN 'shampoing-base-neutre' THEN 10
        WHEN 'gel-aloe-vera' THEN 9
        WHEN 'ghassoul-atlas-pur' THEN 3
        ELSE 6
    END
FROM products p, scalp_types s WHERE s.slug = 'sec';

-- Cuir chevelu Gras
INSERT INTO product_scalp_compat (product_id, scalp_type_id, compatibility, score)
SELECT p.id, s.id,
    CASE p.slug
        WHEN 'ghassoul-atlas-pur' THEN 'recommended'::compatibility_enum
        WHEN 'huile-nigelle' THEN 'recommended'::compatibility_enum
        WHEN 'beurre-karite' THEN 'not_recommended'::compatibility_enum
        ELSE 'compatible'::compatibility_enum
    END,
    CASE p.slug
        WHEN 'ghassoul-atlas-pur' THEN 10
        WHEN 'huile-nigelle' THEN 8
        WHEN 'beurre-karite' THEN 3
        ELSE 6
    END
FROM products p, scalp_types s WHERE s.slug = 'gras';

-- Cuir chevelu Normal
INSERT INTO product_scalp_compat (product_id, scalp_type_id, compatibility, score)
SELECT p.id, s.id, 'compatible'::compatibility_enum, 7
FROM products p, scalp_types s WHERE s.slug = 'normal';

-- Cuir chevelu Sensible
INSERT INTO product_scalp_compat (product_id, scalp_type_id, compatibility, score)
SELECT p.id, s.id,
    CASE p.slug
        WHEN 'shampoing-base-neutre' THEN 'recommended'::compatibility_enum
        WHEN 'huile-nigelle' THEN 'recommended'::compatibility_enum
        WHEN 'gel-aloe-vera' THEN 'recommended'::compatibility_enum
        WHEN 'ghassoul-atlas-pur' THEN 'not_recommended'::compatibility_enum
        ELSE 'compatible'::compatibility_enum
    END,
    CASE p.slug
        WHEN 'shampoing-base-neutre' THEN 10
        WHEN 'huile-nigelle' THEN 9
        WHEN 'gel-aloe-vera' THEN 8
        WHEN 'ghassoul-atlas-pur' THEN 4
        ELSE 6
    END
FROM products p, scalp_types s WHERE s.slug = 'sensible';

-- ===================
-- CODE PROMO BIENVENUE
-- ===================
INSERT INTO promo_codes (code, discount_type, discount_value, min_order_amount, is_active)
VALUES ('HAIRCARE10', 'percentage', 10, 150, true);

-- ===================
-- FIN SEED HAIR CARE
-- ===================
