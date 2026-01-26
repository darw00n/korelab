-- ============================================
-- KORELAB - Migration: Insert New Products
-- Date: 2026-01-26
-- Adds 16 new products across 5 categories
-- ============================================

-- ===================
-- VARIABLES POUR CATEGORY IDs
-- ===================
-- We'll use subqueries to get category IDs dynamically

-- ===================
-- 1. HUILE VÉGÉTALE - HUILE D'OLIVE COSMÉTIQUE
-- ===================
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags)
SELECT
    'Huile d''Olive Vierge Extra Cosmétique',
    'huile-olive',
    'Huile d''olive vierge extra de qualité cosmétique, pressée à froid. Très riche et nourrissante, idéale pour les cheveux très secs et épais. Pénètre lentement pour une nutrition longue durée.',
    'Nutrition intense - Cheveux très secs & épais',
    65.00,
    'treatment',
    'oil',
    id,
    '/product-images/placeholder-oil.webp',
    'En bain d''huile : appliquer généreusement sur cheveux secs, couvrir d''un bonnet, laisser poser 2h minimum ou toute la nuit. Bien rincer avec 2 shampoings.',
    'Réservée aux cheveux épais et très secs. Trop lourde pour les cheveux fins. Excellente pour les pointes très abîmées.',
    ARRAY['olive', 'nutrition', 'cheveux-epais', 'tres-sec', 'bain-huile']
FROM categories WHERE slug = 'huiles-vegetales'
ON CONFLICT (slug) DO NOTHING;

-- ===================
-- 2. HYDROLATS (5 produits)
-- ===================

-- Hydrolat de Rose
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, is_pregnancy_safe)
SELECT
    'Hydrolat de Rose de Damas',
    'hydrolat-rose',
    'Eau florale de rose de Damas obtenue par distillation. Apaisant universel pour tous types de cuirs chevelus. Parfum délicat et propriétés tonifiantes pour le cuir chevelu.',
    'Apaisant universel - Cuir chevelu équilibré',
    55.00,
    'treatment',
    'hydrolat',
    id,
    '/product-images/placeholder-hydrolat.webp',
    'Vaporiser sur cuir chevelu et longueurs après le shampoing. Peut être utilisé quotidiennement comme brume rafraîchissante.',
    'L''hydrolat le plus polyvalent. Convient à tous, même les cuirs chevelus les plus sensibles. Base parfaite pour diluer des actifs.',
    ARRAY['hydrolat', 'rose', 'apaisant', 'universel', 'cuir-chevelu', 'tonifiant'],
    true
FROM categories WHERE slug = 'hydrolats'
ON CONFLICT (slug) DO NOTHING;

-- Hydrolat de Romarin
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, is_pregnancy_safe)
SELECT
    'Hydrolat de Romarin',
    'hydrolat-romarin',
    'Eau florale de romarin tonifiante. Stimule la microcirculation du cuir chevelu pour favoriser la pousse. Idéal contre la chute de cheveux et pour revitaliser les cheveux fatigués.',
    'Tonique stimulant - Anti-chute & Pousse',
    50.00,
    'treatment',
    'hydrolat',
    id,
    '/product-images/placeholder-hydrolat.webp',
    'Vaporiser sur cuir chevelu propre, masser délicatement. Utiliser 3-4x/semaine en cure de 3 mois pour la chute.',
    'Alternative douce à l''HE de romarin pour ceux qui veulent éviter les huiles essentielles. Peut être combiné avec l''hydrolat de menthe.',
    ARRAY['hydrolat', 'romarin', 'tonique', 'pousse', 'chute', 'stimulant'],
    true
FROM categories WHERE slug = 'hydrolats'
ON CONFLICT (slug) DO NOTHING;

-- Hydrolat de Lavande
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, is_pregnancy_safe)
SELECT
    'Hydrolat de Lavande Vraie',
    'hydrolat-lavande',
    'Eau florale de lavande vraie aux propriétés apaisantes exceptionnelles. Calme les irritations, démangeaisons et aide à réguler les pellicules. Parfum relaxant.',
    'Apaisant intense - Cuirs chevelus sensibles',
    50.00,
    'treatment',
    'hydrolat',
    id,
    '/product-images/placeholder-hydrolat.webp',
    'Vaporiser sur cuir chevelu irrité ou sensible. Peut être appliqué pur ou mélangé à d''autres hydrolats. Usage quotidien possible.',
    'Le meilleur choix pour les cuirs chevelus réactifs, les pellicules sèches et les démangeaisons. Effet calmant immédiat.',
    ARRAY['hydrolat', 'lavande', 'apaisant', 'sensible', 'pellicules', 'irritation'],
    true
FROM categories WHERE slug = 'hydrolats'
ON CONFLICT (slug) DO NOTHING;

-- Hydrolat de Sauge
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, is_pregnancy_safe)
SELECT
    'Hydrolat de Sauge Officinale',
    'hydrolat-sauge',
    'Eau florale de sauge régulatrice. Excellent pour les cuirs chevelus gras, aide à contrôler l''excès de sébum. Propriétés purifiantes et assainissantes.',
    'Régulateur de sébum - Cuir chevelu gras',
    55.00,
    'treatment',
    'hydrolat',
    id,
    '/product-images/placeholder-hydrolat.webp',
    'Vaporiser sur cuir chevelu après le shampoing. Peut être utilisé entre les shampoings pour rafraîchir les racines grasses.',
    'Idéal pour espacer les shampoings. Combine bien avec l''hydrolat de romarin pour les cuirs chevelus gras avec chute.',
    ARRAY['hydrolat', 'sauge', 'sebum', 'gras', 'purifiant', 'regulateur'],
    false -- Déconseillé femmes enceintes
FROM categories WHERE slug = 'hydrolats'
ON CONFLICT (slug) DO NOTHING;

-- Hydrolat de Menthe
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, is_pregnancy_safe)
SELECT
    'Hydrolat de Menthe Poivrée',
    'hydrolat-menthe',
    'Eau florale de menthe poivrée rafraîchissante et stimulante. Apporte une sensation de fraîcheur immédiate, stimule le cuir chevelu et aide à calmer les démangeaisons.',
    'Fraîcheur stimulante - Tonique capillaire',
    45.00,
    'treatment',
    'hydrolat',
    id,
    '/product-images/placeholder-hydrolat.webp',
    'Vaporiser sur cuir chevelu pour une sensation de fraîcheur. Idéal en été ou après le sport. Peut être combiné avec d''autres hydrolats.',
    'Effet "coup de frais" garanti. Stimule la circulation comme le romarin mais avec une sensation plus rafraîchissante.',
    ARRAY['hydrolat', 'menthe', 'fraicheur', 'stimulant', 'tonique', 'demangeaisons'],
    true
FROM categories WHERE slug = 'hydrolats'
ON CONFLICT (slug) DO NOTHING;

-- ===================
-- 3. MACÉRATS (3 produits)
-- ===================

-- Macérat de Fenugrec
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, is_pregnancy_safe)
SELECT
    'Macérat Huileux de Fenugrec',
    'macerat-fenugrec',
    'Huile végétale infusée aux graines de fenugrec, connues pour leurs propriétés fortifiantes et stimulantes. Renforce les cheveux fragilisés et favorise la pousse.',
    'Fortifiant naturel - Pousse & Renforcement',
    75.00,
    'treatment',
    'macerat',
    id,
    '/product-images/placeholder-macerat.webp',
    'En bain d''huile : appliquer sur cuir chevelu et longueurs, masser 10 min, laisser poser 1-2h avant shampoing. 1-2x/semaine.',
    'Le secret des femmes indiennes pour des cheveux forts et longs. Odeur caractéristique (curry) qui part au shampoing.',
    ARRAY['macerat', 'fenugrec', 'fortifiant', 'pousse', 'renforcement', 'indien'],
    false -- Déconseillé femmes enceintes
FROM categories WHERE slug = 'macerats'
ON CONFLICT (slug) DO NOTHING;

-- Macérat d'Oignon
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, is_pregnancy_safe)
SELECT
    'Macérat Huileux d''Oignon',
    'macerat-oignon',
    'Huile végétale infusée à l''oignon, riche en soufre et quercétine. Reconnu pour ses propriétés anti-chute exceptionnelles et sa capacité à stimuler les follicules pileux.',
    'Anti-chute puissant - Stimulation folliculaire',
    70.00,
    'treatment',
    'macerat',
    id,
    '/product-images/placeholder-macerat.webp',
    'En massage cuir chevelu : appliquer quelques ml, masser 10-15 min, laisser poser 30 min minimum. Bien rincer avec shampoing.',
    'Très efficace contre la chute mais odeur forte. Astuce : ajouter quelques gouttes d''HE de menthe ou lavande pour atténuer.',
    ARRAY['macerat', 'oignon', 'anti-chute', 'soufre', 'follicule', 'stimulant'],
    true
FROM categories WHERE slug = 'macerats'
ON CONFLICT (slug) DO NOTHING;

-- Macérat d'Ail
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, is_pregnancy_safe)
SELECT
    'Macérat Huileux d''Ail',
    'macerat-ail',
    'Huile végétale infusée à l''ail, tonique capillaire puissant. Riche en allicine aux propriétés antifongiques. Stimule la circulation et combat les infections du cuir chevelu.',
    'Tonique puissant - Antifongique naturel',
    65.00,
    'treatment',
    'macerat',
    id,
    '/product-images/placeholder-macerat.webp',
    'En massage cuir chevelu : petite quantité, masser vigoureusement. Laisser poser 20-30 min sous bonnet. Double shampoing nécessaire.',
    'Le plus puissant des macérats mais aussi le plus odorant. Réservé aux problèmes persistants (pellicules résistantes, infections).',
    ARRAY['macerat', 'ail', 'tonique', 'antifongique', 'pellicules', 'infection'],
    true
FROM categories WHERE slug = 'macerats'
ON CONFLICT (slug) DO NOTHING;

-- ===================
-- 4. ACTIFS (3 produits)
-- ===================

-- Protéines de Riz
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, is_pregnancy_safe)
SELECT
    'Protéines de Riz Hydrolysées',
    'proteines-riz',
    'Actif protéiné léger dérivé du riz. Idéal pour les cheveux fins qui ont besoin de renforcement sans alourdissement. Apporte volume, corps et résistance.',
    'Volume & Force - Cheveux fins',
    95.00,
    'treatment',
    'active',
    id,
    '/product-images/placeholder-active.webp',
    'Ajouter 5-10 gouttes à votre masque ou après-shampoing. Peut être ajouté au shampoing. Max 1x/semaine.',
    'Alternative plus légère aux protéines de soie. Le choix parfait pour les cheveux fins qui cassent mais craignent l''alourdissement.',
    ARRAY['proteines', 'riz', 'volume', 'fins', 'renforcement', 'actif'],
    true
FROM categories WHERE slug = 'actifs'
ON CONFLICT (slug) DO NOTHING;

-- Panthénol (Vitamine B5)
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, is_pregnancy_safe)
SELECT
    'Panthénol (Pro-Vitamine B5)',
    'panthenol-b5',
    'Actif fortifiant et hydratant dérivé de la vitamine B5. Pénètre la fibre capillaire pour la renforcer de l''intérieur. Améliore l''élasticité et réduit les pointes fourchues.',
    'Fortifiant hydratant - Anti-pointes fourchues',
    85.00,
    'treatment',
    'active',
    id,
    '/product-images/placeholder-active.webp',
    'Ajouter 2-5% à vos soins (masque, après-shampoing, sérum). Peut être utilisé pur en sérum sur pointes humides.',
    'Un des actifs les plus polyvalents. Convient à tous types de cheveux. Combine bien avec la glycérine pour une hydratation complète.',
    ARRAY['panthenol', 'vitamine-b5', 'fortifiant', 'hydratant', 'pointes', 'actif'],
    true
FROM categories WHERE slug = 'actifs'
ON CONFLICT (slug) DO NOTHING;

-- Glycérine Végétale
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, is_pregnancy_safe)
SELECT
    'Glycérine Végétale Pure',
    'glycerine-vegetale',
    'Humectant naturel qui attire et retient l''eau dans la fibre capillaire. Ingrédient de base pour l''hydratation. Idéal dans les climats humides.',
    'Humectant naturel - Hydratation profonde',
    45.00,
    'treatment',
    'active',
    id,
    '/product-images/placeholder-active.webp',
    'Ajouter max 5-10% à vos soins aqueux. Ne jamais utiliser pure sur cheveux. Toujours diluer dans l''eau ou un soin.',
    'ATTENTION au climat ! En climat sec, la glycérine peut assécher les cheveux (attire l''humidité des cheveux vers l''air). Parfaite au Maroc côtier.',
    ARRAY['glycerine', 'humectant', 'hydratation', 'actif', 'naturel'],
    true
FROM categories WHERE slug = 'actifs'
ON CONFLICT (slug) DO NOTHING;

-- ===================
-- 5. HUILES ESSENTIELLES (4 produits)
-- ===================

-- HE Tea Tree
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, is_pregnancy_safe, safety_warning)
SELECT
    'Huile Essentielle de Tea Tree',
    'he-tea-tree',
    'Huile essentielle de Melaleuca alternifolia, puissant antifongique et antibactérien naturel. L''alliée des cuirs chevelus gras et des pellicules tenaces.',
    'Purifiant intense - Anti-pelliculaire',
    65.00,
    'treatment',
    'essential_oil',
    id,
    '/product-images/placeholder-he.webp',
    'TOUJOURS DILUER ! 2-3 gouttes dans votre dose de shampoing ou dans 30ml d''huile végétale. Ne jamais appliquer pure.',
    'L''HE anti-pelliculaire par excellence. Très efficace sur les pellicules grasses et les démangeaisons. Odeur médicinale caractéristique.',
    ARRAY['huile-essentielle', 'tea-tree', 'antifongique', 'pellicules', 'gras', 'purifiant'],
    false,
    '⚠️ Interdit femmes enceintes/allaitantes. Ne pas utiliser pur. Dosage max : 0.5% (5 gouttes/30ml).'
FROM categories WHERE slug = 'huiles-essentielles'
ON CONFLICT (slug) DO NOTHING;

-- HE Lavande Vraie
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, is_pregnancy_safe, safety_warning)
SELECT
    'Huile Essentielle de Lavande Vraie',
    'he-lavande',
    'Huile essentielle de Lavandula angustifolia, apaisante et équilibrante. Calme les irritations du cuir chevelu et aide à réguler le sébum. Parfum relaxant.',
    'Apaisant équilibrant - Multi-usage',
    70.00,
    'treatment',
    'essential_oil',
    id,
    '/product-images/placeholder-he.webp',
    'TOUJOURS DILUER ! 3-5 gouttes dans 30ml d''huile végétale ou dans le shampoing. Massage cuir chevelu en cas d''irritation.',
    'L''HE la plus douce et polyvalente. Peut être combinée avec Tea Tree pour les pellicules ou Romarin pour la pousse.',
    ARRAY['huile-essentielle', 'lavande', 'apaisant', 'equilibrant', 'irritation', 'relaxant'],
    false,
    '⚠️ Interdit femmes enceintes/allaitantes. Ne pas utiliser pur. Dosage max : 0.5% (5 gouttes/30ml).'
FROM categories WHERE slug = 'huiles-essentielles'
ON CONFLICT (slug) DO NOTHING;

-- HE Eucalyptus
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, is_pregnancy_safe, safety_warning)
SELECT
    'Huile Essentielle d''Eucalyptus Globulus',
    'he-eucalyptus',
    'Huile essentielle d''Eucalyptus aux propriétés détoxifiantes et purifiantes. Nettoie le cuir chevelu en profondeur et élimine les résidus de produits coiffants.',
    'Détox purifiant - Nettoyage profond',
    55.00,
    'treatment',
    'essential_oil',
    id,
    '/product-images/placeholder-he.webp',
    'TOUJOURS DILUER ! 2-3 gouttes dans le shampoing clarifiant ou dans 30ml d''huile. Idéal 1x/mois en cure détox.',
    'Parfait pour un "reset" du cuir chevelu après utilisation intensive de produits coiffants (silicones, cires...).',
    ARRAY['huile-essentielle', 'eucalyptus', 'detox', 'purifiant', 'nettoyage', 'clarifiant'],
    false,
    '⚠️ Interdit femmes enceintes/allaitantes et enfants -6 ans. Ne pas utiliser pur. Dosage max : 0.5%.'
FROM categories WHERE slug = 'huiles-essentielles'
ON CONFLICT (slug) DO NOTHING;

-- HE Orange Douce
INSERT INTO products (name, slug, description, short_description, price, product_type, product_subtype, category_id, image_url, usage_instructions, expert_note, tags, is_pregnancy_safe, safety_warning)
SELECT
    'Huile Essentielle d''Orange Douce',
    'he-orange',
    'Huile essentielle d''orange douce au parfum ensoleillé. Apporte brillance et parfume agréablement les soins capillaires. Propriétés tonifiantes légères.',
    'Parfum & Brillance - Optionnel',
    45.00,
    'treatment',
    'essential_oil',
    id,
    '/product-images/placeholder-he.webp',
    'TOUJOURS DILUER ! 2-4 gouttes dans vos soins pour parfumer. Peut être combinée avec d''autres HE pour masquer leurs odeurs.',
    'Principalement utilisée pour le parfum. Moins d''effets capillaires que les autres HE mais agréable et sans danger aux bonnes dilutions.',
    ARRAY['huile-essentielle', 'orange', 'parfum', 'brillance', 'agrume', 'tonifiant'],
    false,
    '⚠️ Interdit femmes enceintes/allaitantes. Photosensibilisant : ne pas s''exposer au soleil après application. Dosage max : 0.5%.'
FROM categories WHERE slug = 'huiles-essentielles'
ON CONFLICT (slug) DO NOTHING;

-- ===================
-- FIN MIGRATION NEW PRODUCTS INSERT
-- ===================
