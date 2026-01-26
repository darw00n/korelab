-- ============================================
-- KORELAB - Migration: Fix Products Insert
-- Date: 2026-01-26
-- Fixes category slugs and inserts missing products
-- ============================================

-- ===================
-- 1. HUILE D'OLIVE (category: huiles)
-- ===================
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT
    'Huile d''Olive Vierge Extra Cosmétique',
    'huile-olive',
    'Huile d''olive vierge extra de qualité cosmétique, pressée à froid. Très riche et nourrissante, idéale pour les cheveux très secs et épais.',
    'Nutrition intense - Cheveux très secs & épais',
    65.00,
    'treatment',
    'oil',
    id,
    '/product-images/placeholder-oil.webp',
    'En bain d''huile : appliquer généreusement sur cheveux secs, couvrir d''un bonnet, laisser poser 2h minimum.',
    'Réservée aux cheveux épais et très secs. Trop lourde pour les cheveux fins.',
    ARRAY['olive', 'nutrition', 'cheveux-epais', 'tres-sec', 'bain-huile'],
    NULL,
    true
FROM categories WHERE slug = 'huiles'
ON CONFLICT (slug) DO NOTHING;

-- ===================
-- 2. HYDROLATS (category: hydrolats)
-- ===================

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT
    'Hydrolat de Rose de Damas',
    'hydrolat-rose',
    'Eau florale de rose de Damas obtenue par distillation. Apaisant universel pour tous types de cuirs chevelus.',
    'Apaisant universel - Cuir chevelu équilibré',
    55.00,
    'treatment',
    'hydrolat',
    id,
    '/product-images/placeholder-hydrolat.webp',
    'Vaporiser sur cuir chevelu et longueurs après le shampoing. Peut être utilisé quotidiennement.',
    'L''hydrolat le plus polyvalent. Convient à tous, même les cuirs chevelus les plus sensibles.',
    ARRAY['hydrolat', 'rose', 'apaisant', 'universel', 'cuir-chevelu'],
    NULL,
    true
FROM categories WHERE slug = 'hydrolats'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT
    'Hydrolat de Romarin',
    'hydrolat-romarin',
    'Eau florale de romarin tonifiante. Stimule la microcirculation du cuir chevelu pour favoriser la pousse.',
    'Tonique stimulant - Anti-chute & Pousse',
    50.00,
    'treatment',
    'hydrolat',
    id,
    '/product-images/placeholder-hydrolat.webp',
    'Vaporiser sur cuir chevelu propre, masser délicatement. Utiliser 3-4x/semaine.',
    'Alternative douce à l''HE de romarin pour ceux qui veulent éviter les huiles essentielles.',
    ARRAY['hydrolat', 'romarin', 'tonique', 'pousse', 'chute', 'stimulant'],
    NULL,
    true
FROM categories WHERE slug = 'hydrolats'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT
    'Hydrolat de Lavande Vraie',
    'hydrolat-lavande',
    'Eau florale de lavande vraie aux propriétés apaisantes exceptionnelles. Calme les irritations et pellicules.',
    'Apaisant intense - Cuirs chevelus sensibles',
    50.00,
    'treatment',
    'hydrolat',
    id,
    '/product-images/placeholder-hydrolat.webp',
    'Vaporiser sur cuir chevelu irrité ou sensible. Usage quotidien possible.',
    'Le meilleur choix pour les cuirs chevelus réactifs et les pellicules sèches.',
    ARRAY['hydrolat', 'lavande', 'apaisant', 'sensible', 'pellicules'],
    NULL,
    true
FROM categories WHERE slug = 'hydrolats'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT
    'Hydrolat de Sauge Officinale',
    'hydrolat-sauge',
    'Eau florale de sauge régulatrice. Excellent pour les cuirs chevelus gras.',
    'Régulateur de sébum - Cuir chevelu gras',
    55.00,
    'treatment',
    'hydrolat',
    id,
    '/product-images/placeholder-hydrolat.webp',
    'Vaporiser sur cuir chevelu après le shampoing. Peut être utilisé entre les shampoings.',
    'Idéal pour espacer les shampoings.',
    ARRAY['hydrolat', 'sauge', 'sebum', 'gras', 'purifiant'],
    NULL,
    false
FROM categories WHERE slug = 'hydrolats'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT
    'Hydrolat de Menthe Poivrée',
    'hydrolat-menthe',
    'Eau florale de menthe poivrée rafraîchissante et stimulante.',
    'Fraîcheur stimulante - Tonique capillaire',
    45.00,
    'treatment',
    'hydrolat',
    id,
    '/product-images/placeholder-hydrolat.webp',
    'Vaporiser sur cuir chevelu pour une sensation de fraîcheur. Idéal en été.',
    'Effet "coup de frais" garanti. Stimule la circulation.',
    ARRAY['hydrolat', 'menthe', 'fraicheur', 'stimulant', 'tonique'],
    NULL,
    true
FROM categories WHERE slug = 'hydrolats'
ON CONFLICT (slug) DO NOTHING;

-- ===================
-- 3. MACÉRATS (category: macerats)
-- ===================

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT
    'Macérat Huileux de Fenugrec',
    'macerat-fenugrec',
    'Huile végétale infusée aux graines de fenugrec. Renforce les cheveux et favorise la pousse.',
    'Fortifiant naturel - Pousse & Renforcement',
    75.00,
    'treatment',
    'macerat',
    id,
    '/product-images/placeholder-macerat.webp',
    'En bain d''huile : appliquer sur cuir chevelu et longueurs, masser 10 min, laisser poser 1-2h.',
    'Le secret des femmes indiennes pour des cheveux forts et longs.',
    ARRAY['macerat', 'fenugrec', 'fortifiant', 'pousse', 'renforcement'],
    NULL,
    false
FROM categories WHERE slug = 'macerats'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT
    'Macérat Huileux d''Oignon',
    'macerat-oignon',
    'Huile végétale infusée à l''oignon. Reconnu pour ses propriétés anti-chute exceptionnelles.',
    'Anti-chute puissant - Stimulation folliculaire',
    70.00,
    'treatment',
    'macerat',
    id,
    '/product-images/placeholder-macerat.webp',
    'En massage cuir chevelu : appliquer quelques ml, masser 10-15 min, laisser poser 30 min.',
    'Très efficace contre la chute mais odeur forte.',
    ARRAY['macerat', 'oignon', 'anti-chute', 'soufre', 'follicule'],
    NULL,
    true
FROM categories WHERE slug = 'macerats'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT
    'Macérat Huileux d''Ail',
    'macerat-ail',
    'Huile végétale infusée à l''ail, tonique capillaire puissant.',
    'Tonique puissant - Antifongique naturel',
    65.00,
    'treatment',
    'macerat',
    id,
    '/product-images/placeholder-macerat.webp',
    'En massage cuir chevelu : petite quantité, masser vigoureusement. Double shampoing nécessaire.',
    'Le plus puissant des macérats. Réservé aux problèmes persistants.',
    ARRAY['macerat', 'ail', 'tonique', 'antifongique', 'pellicules'],
    NULL,
    true
FROM categories WHERE slug = 'macerats'
ON CONFLICT (slug) DO NOTHING;

-- ===================
-- 4. ACTIFS (category: actifs)
-- ===================

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT
    'Protéines de Riz Hydrolysées',
    'proteines-riz',
    'Actif protéiné léger dérivé du riz. Idéal pour les cheveux fins qui ont besoin de renforcement.',
    'Volume & Force - Cheveux fins',
    95.00,
    'treatment',
    'active',
    id,
    '/product-images/placeholder-active.webp',
    'Ajouter 5-10 gouttes à votre masque ou après-shampoing. Max 1x/semaine.',
    'Alternative plus légère aux protéines de soie. Parfait pour les cheveux fins.',
    ARRAY['proteines', 'riz', 'volume', 'fins', 'renforcement'],
    NULL,
    true
FROM categories WHERE slug = 'actifs'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT
    'Panthénol (Pro-Vitamine B5)',
    'panthenol-b5',
    'Actif fortifiant et hydratant dérivé de la vitamine B5. Améliore l''élasticité.',
    'Fortifiant hydratant - Anti-pointes fourchues',
    85.00,
    'treatment',
    'active',
    id,
    '/product-images/placeholder-active.webp',
    'Ajouter 2-5% à vos soins (masque, après-shampoing, sérum).',
    'Un des actifs les plus polyvalents. Convient à tous types de cheveux.',
    ARRAY['panthenol', 'vitamine-b5', 'fortifiant', 'hydratant', 'pointes'],
    NULL,
    true
FROM categories WHERE slug = 'actifs'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT
    'Glycérine Végétale Pure',
    'glycerine-vegetale',
    'Humectant naturel qui attire et retient l''eau dans la fibre capillaire.',
    'Humectant naturel - Hydratation profonde',
    45.00,
    'treatment',
    'active',
    id,
    '/product-images/placeholder-active.webp',
    'Ajouter max 5-10% à vos soins aqueux. Ne jamais utiliser pure.',
    'ATTENTION au climat ! En climat sec, peut assécher les cheveux.',
    ARRAY['glycerine', 'humectant', 'hydratation', 'actif'],
    NULL,
    true
FROM categories WHERE slug = 'actifs'
ON CONFLICT (slug) DO NOTHING;

-- ===================
-- 5. HUILES ESSENTIELLES (category: huiles-essentielles)
-- ===================

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT
    'Huile Essentielle de Tea Tree',
    'he-tea-tree',
    'Huile essentielle de Melaleuca alternifolia, puissant antifongique et antibactérien naturel.',
    'Purifiant intense - Anti-pelliculaire',
    65.00,
    'treatment',
    'essential_oil',
    id,
    '/product-images/placeholder-he.webp',
    'TOUJOURS DILUER ! 2-3 gouttes dans votre dose de shampoing ou dans 30ml d''huile végétale.',
    'L''HE anti-pelliculaire par excellence.',
    ARRAY['huile-essentielle', 'tea-tree', 'antifongique', 'pellicules', 'purifiant'],
    '⚠️ Interdit femmes enceintes/allaitantes. Ne pas utiliser pur. Dosage max : 0.5%.',
    false
FROM categories WHERE slug = 'huiles-essentielles'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT
    'Huile Essentielle de Lavande Vraie',
    'he-lavande',
    'Huile essentielle de Lavandula angustifolia, apaisante et équilibrante.',
    'Apaisant équilibrant - Multi-usage',
    70.00,
    'treatment',
    'essential_oil',
    id,
    '/product-images/placeholder-he.webp',
    'TOUJOURS DILUER ! 3-5 gouttes dans 30ml d''huile végétale.',
    'L''HE la plus douce et polyvalente.',
    ARRAY['huile-essentielle', 'lavande', 'apaisant', 'equilibrant', 'relaxant'],
    '⚠️ Interdit femmes enceintes/allaitantes. Ne pas utiliser pur.',
    false
FROM categories WHERE slug = 'huiles-essentielles'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT
    'Huile Essentielle d''Eucalyptus Globulus',
    'he-eucalyptus',
    'Huile essentielle d''Eucalyptus aux propriétés détoxifiantes et purifiantes.',
    'Détox purifiant - Nettoyage profond',
    55.00,
    'treatment',
    'essential_oil',
    id,
    '/product-images/placeholder-he.webp',
    'TOUJOURS DILUER ! 2-3 gouttes dans le shampoing clarifiant. Idéal 1x/mois.',
    'Parfait pour un "reset" du cuir chevelu.',
    ARRAY['huile-essentielle', 'eucalyptus', 'detox', 'purifiant', 'nettoyage'],
    '⚠️ Interdit femmes enceintes/allaitantes et enfants -6 ans.',
    false
FROM categories WHERE slug = 'huiles-essentielles'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, safety_warning, is_pregnancy_safe)
SELECT
    'Huile Essentielle d''Orange Douce',
    'he-orange',
    'Huile essentielle d''orange douce au parfum ensoleillé. Apporte brillance.',
    'Parfum & Brillance - Optionnel',
    45.00,
    'treatment',
    'essential_oil',
    id,
    '/product-images/placeholder-he.webp',
    'TOUJOURS DILUER ! 2-4 gouttes dans vos soins pour parfumer.',
    'Principalement utilisée pour le parfum.',
    ARRAY['huile-essentielle', 'orange', 'parfum', 'brillance', 'agrume'],
    '⚠️ Interdit femmes enceintes/allaitantes. Photosensibilisant.',
    false
FROM categories WHERE slug = 'huiles-essentielles'
ON CONFLICT (slug) DO NOTHING;

-- ===================
-- FIN MIGRATION FIX PRODUCTS INSERT
-- ===================
