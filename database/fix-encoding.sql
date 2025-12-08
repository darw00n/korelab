-- ============================================
-- KORELAB - Fix Encoding Issues (UTF-8)
-- Corrige les caractères mal encodés
-- ============================================

-- ===================
-- FIX PRODUCTS
-- ===================

-- Sérum Niacinamide
UPDATE products SET 
    name = 'Sérum Niacinamide 10% + Zinc',
    description = 'La Niacinamide (Vitamine B3) est l''actif star pour réguler le sébum et resserrer les pores. Combinée au Zinc, elle apaise les imperfections et unifie le teint.',
    short_description = 'Régule le sébum et affine le grain de peau'
WHERE slug = 'serum-niacinamide';

-- Sérum AHA
UPDATE products SET 
    name = 'Sérum AHA Acides de Fruits 10%',
    description = 'Un complexe d''acides de fruits (Glycolique, Lactique, Citrique) à 10% pour un peeling doux à domicile. Élimine les cellules mortes, révèle l''éclat et lisse le grain de peau.',
    short_description = 'Peeling doux - Révèle l''éclat en 2 semaines'
WHERE slug = 'serum-aha';

-- Huile Figue de Barbarie
UPDATE products SET 
    name = 'Huile de Pépins de Figue de Barbarie',
    description = 'L''huile la plus précieuse du Maroc. Extraite à froid des pépins de figue de barbarie du désert marocain. Exceptionnellement riche en Vitamine E et Stérols, c''est l''anti-âge naturel par excellence.',
    short_description = 'L''or du désert marocain - Anti-âge puissant'
WHERE slug = 'huile-figue-barbarie';

-- Huile Nigelle
UPDATE products SET 
    name = 'Huile de Nigelle (Habba Sawda)',
    description = 'L''huile de Nigelle, connue sous le nom de "Habba Sawda" ou "graine bénie", est utilisée depuis l''Antiquité pour ses propriétés purifiantes exceptionnelles. Riche en Thymoquinone.',
    short_description = 'La graine bénie - Purifie et rééquilibre'
WHERE slug = 'huile-nigelle';

-- Huile Argan
UPDATE products SET 
    name = 'Huile d''Argan Bio Pure',
    description = 'L''huile d''Argan authentique du Maroc, extraite à froid des noix d''arganier de la région de Souss-Massa. Certifiée Bio et équitable.',
    short_description = 'L''or liquide du Maroc - Nutrition intense'
WHERE slug = 'huile-argan';

-- Gel Aloe Vera
UPDATE products SET 
    name = 'Gel d''Aloe Vera Natif 99%',
    description = 'Gel d''Aloe Vera pur à 99%, cultivé au Maroc sous le soleil méditerranéen. Hydrate, apaise et répare la peau instantanément.',
    short_description = 'Hydratation express - Apaise et répare'
WHERE slug = 'gel-aloe-vera';

-- Eau Florale Rose
UPDATE products SET 
    name = 'Eau Florale de Rose de Damas',
    description = 'Eau florale de Rose de Damas, distillée dans la Vallée des Roses de Kelâat M''Gouna. Tonifie, rafraîchit et prépare la peau.',
    short_description = 'De la Vallée des Roses - Tonifie et rafraîchit'
WHERE slug = 'eau-rose-damas';

-- Savon Noir
UPDATE products SET 
    name = 'Savon Noir Beldi Traditionnel',
    description = 'Le véritable Savon Noir Beldi marocain, préparé selon la recette ancestrale avec des olives noires de la région de Meknès. Exfolie en douceur et prépare la peau au gommage.',
    short_description = 'Recette ancestrale du hammam marocain'
WHERE slug = 'savon-noir-beldi';

-- ===================
-- FIX SKIN TYPES
-- ===================

UPDATE skin_types SET 
    name = 'Peau Sèche',
    description = 'Peau qui tiraille, manque de confort'
WHERE slug = 'seche';

UPDATE skin_types SET 
    name = 'Peau Grasse',
    description = 'Peau brillante, pores dilatés'
WHERE slug = 'grasse';

UPDATE skin_types SET 
    name = 'Peau Mixte',
    description = 'Zone T grasse, joues sèches'
WHERE slug = 'mixte';

UPDATE skin_types SET 
    name = 'Peau Normale',
    description = 'Peau équilibrée'
WHERE slug = 'normale';

UPDATE skin_types SET 
    name = 'Peau Sensible',
    description = 'Peau réactive, rougeurs'
WHERE slug = 'sensible';

-- ===================
-- FIX CONCERNS
-- ===================

UPDATE concerns SET 
    name = 'Acné & Imperfections',
    description = 'Boutons, points noirs, imperfections'
WHERE slug = 'acne';

UPDATE concerns SET 
    name = 'Rides & Signes de l''âge',
    description = 'Ridules, perte de fermeté'
WHERE slug = 'rides';

UPDATE concerns SET 
    name = 'Teint terne / Manque d''éclat',
    description = 'Peau fatiguée, grise, sans éclat'
WHERE slug = 'teint-terne';

UPDATE concerns SET 
    name = 'Hydratation / Peau sèche',
    description = 'Déshydratation, tiraillements'
WHERE slug = 'hydratation';

UPDATE concerns SET 
    name = 'Taches pigmentaires',
    description = 'Taches brunes, hyperpigmentation'
WHERE slug = 'taches';

UPDATE concerns SET 
    name = 'Pores dilatés',
    description = 'Pores visibles, texture irrégulière'
WHERE slug = 'pores';

-- ===================
-- FIX CATEGORIES
-- ===================

UPDATE categories SET 
    name = 'Huiles Précieuses',
    description = 'Huiles végétales pures du Maroc'
WHERE slug = 'huiles';

UPDATE categories SET 
    name = 'Actifs Concentrés',
    description = 'Sérums et actifs ciblés'
WHERE slug = 'actifs';

-- Confirmation
SELECT 'Encodage corrigé avec succès!' AS status;

