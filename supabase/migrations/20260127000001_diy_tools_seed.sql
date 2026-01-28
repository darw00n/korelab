-- ============================================
-- KORELAB - DIY Tools & Accessories Seed Data
-- ============================================

-- ===================
-- 1. INSERT DIY TOOLS
-- ===================

INSERT INTO diy_tools (name, slug, description, short_description, price, image_url, is_in_starter_kit, usage_tip) VALUES

-- Contenants
('Flacon Spray 100ml', 'flacon-spray-100ml', 
 'Flacon spray en verre ambré avec pulvérisateur fin. Idéal pour les sprays démêlants et hydratants. Le verre ambré protège les actifs de la lumière.',
 'Flacon spray verre ambré', 25.00, '/product-images/diy/flacon-spray.webp', true,
 'Bien agiter avant chaque utilisation. Nettoyer à l''eau chaude entre chaque recette.'),

('Pot en Verre 100ml', 'pot-verre-100ml',
 'Pot en verre avec couvercle hermétique. Parfait pour les masques et beurres. Large ouverture pour faciliter l''application.',
 'Pot verre hermétique', 20.00, '/product-images/diy/pot-verre.webp', true,
 'Conserver au frais pour les préparations sans conservateur.'),

('Flacon Compte-Gouttes 30ml', 'flacon-compte-gouttes-30ml',
 'Flacon en verre ambré avec pipette graduée. Idéal pour les sérums et huiles concentrées. Permet un dosage précis goutte par goutte.',
 'Flacon pipette 30ml', 18.00, '/product-images/diy/flacon-pipette.webp', true,
 'La pipette graduée permet de mesurer jusqu''à 1ml.'),

('Pot Voyage 50ml (x3)', 'pots-voyage-50ml',
 'Lot de 3 petits pots pour emporter vos préparations. Parfait pour tester de nouvelles recettes ou en voyage.',
 'Mini pots voyage x3', 15.00, '/product-images/diy/pots-voyage.webp', false,
 'Étiquetez toujours vos pots avec la date de préparation.'),

-- Outils de mesure
('Pipettes Graduées (x5)', 'pipettes-graduees-x5',
 'Lot de 5 pipettes graduées en plastique (1ml, 2ml, 3ml, 5ml, 10ml). Indispensables pour doser précisément les huiles et actifs.',
 'Pipettes dosage précis x5', 15.00, '/product-images/diy/pipettes.webp', true,
 'Rincer après chaque utilisation. Ne pas mélanger les pipettes entre ingrédients.'),

('Cuillères Doseuses (set)', 'cuilleres-doseuses',
 'Set de 4 cuillères doseuses en inox: 1/4 c.à.c, 1/2 c.à.c, 1 c.à.c, 1 c.à.s. Pour mesurer poudres et ingrédients épais.',
 'Set cuillères inox', 20.00, '/product-images/diy/cuilleres.webp', true,
 '1 cuillère à soupe = 15ml, 1 cuillère à café = 5ml'),

('Balance Précision 0.1g', 'balance-precision',
 'Balance digitale précise au 0.1g près. Écran LCD rétroéclairé. Fonction tare. Indispensable pour des formulations professionnelles.',
 'Balance digitale 0.1g', 85.00, '/product-images/diy/balance.webp', false,
 'Pour les recettes où la précision est cruciale (actifs, protéines).'),

-- Outils de préparation
('Bol en Verre 200ml', 'bol-verre-200ml',
 'Bol en verre borosilicate résistant à la chaleur. Bec verseur intégré. Parfait pour mélanger et faire fondre au bain-marie.',
 'Bol mélange verre', 25.00, '/product-images/diy/bol-verre.webp', true,
 'Peut aller au micro-ondes pour faire fondre les beurres.'),

('Mini Fouet en Silicone', 'mini-fouet-silicone',
 'Petit fouet en silicone alimentaire. Flexible et doux pour mélanger sans incorporer trop d''air. Facile à nettoyer.',
 'Fouet silicone mini', 12.00, '/product-images/diy/fouet.webp', true,
 'Idéal pour les émulsions et mélanges délicats.'),

('Spatule en Silicone', 'spatule-silicone',
 'Spatule souple en silicone alimentaire. Permet de récupérer tout le produit du bol. Résistante à la chaleur.',
 'Spatule silicone', 10.00, '/product-images/diy/spatule.webp', true,
 'Parfait pour transférer les masques dans les pots.'),

('Entonnoir Mini (x2)', 'entonnoirs-mini',
 'Lot de 2 mini entonnoirs en inox. Diamètres différents pour s''adapter à tous les flacons.',
 'Entonnoirs inox x2', 12.00, '/product-images/diy/entonnoirs.webp', true,
 'Indispensable pour verser dans les flacons spray sans en mettre partout.'),

-- Accessoires application
('Bonnet Chauffant Électrique', 'bonnet-chauffant',
 'Bonnet chauffant électrique avec 3 niveaux de chaleur. Ouvre les cuticules pour une meilleure pénétration des soins. Minuterie 30 min.',
 'Bonnet chaleur 3 niveaux', 120.00, '/product-images/diy/bonnet-chauffant.webp', false,
 'Utiliser sur cheveux recouverts d''un film plastique pour maximiser l''effet.'),

('Charlotte Plastique (x10)', 'charlottes-plastique',
 'Lot de 10 charlottes en plastique transparent. À utiliser sous le bonnet chauffant ou pour les poses longues.',
 'Charlottes plastique x10', 15.00, '/product-images/diy/charlottes.webp', false,
 'Retient la chaleur corporelle et empêche les masques de sécher.'),

('Pinceau Applicateur', 'pinceau-applicateur',
 'Pinceau large à poils souples pour appliquer les masques section par section. Application précise et économique.',
 'Pinceau application', 18.00, '/product-images/diy/pinceau.webp', false,
 'Bien répartir de la racine aux pointes en sections fines.'),

-- Organisation
('Étiquettes Waterproof (x50)', 'etiquettes-waterproof',
 'Lot de 50 étiquettes autocollantes résistantes à l''eau. Pour identifier vos préparations avec nom et date.',
 'Étiquettes x50', 12.00, '/product-images/diy/etiquettes.webp', true,
 'Notez toujours: nom de la recette, date, durée de conservation.'),

('Cahier de Recettes KoreLab', 'cahier-recettes',
 'Cahier 50 pages avec fiches recettes pré-imprimées. Sections pour noter les ingrédients, étapes, résultats et ajustements.',
 'Cahier formulation', 35.00, '/product-images/diy/cahier.webp', false,
 'Documenter vos recettes permet d''améliorer vos formulations.')

ON CONFLICT (slug) DO NOTHING;

-- ===================
-- 2. CREATE STARTER KIT AS A PRODUCT
-- ===================

-- First, ensure we have a DIY category
INSERT INTO categories (name, slug, description, icon)
VALUES ('Accessoires DIY', 'accessoires-diy', 'Outils et accessoires pour créer vos propres soins capillaires', 'Beaker')
ON CONFLICT (slug) DO NOTHING;

-- Note: Kit Starter will be added to diy_tools table, not products
-- This avoids enum type conflicts

-- Add Kit Starter as a special "bundle" tool
INSERT INTO diy_tools (name, slug, description, short_description, price, image_url, is_in_starter_kit, usage_tip)
VALUES (
    'Kit Starter DIY KoreLab',
    'kit-starter-diy',
    'Tout le nécessaire pour débuter vos créations capillaires maison ! Ce kit contient: 1 flacon spray 100ml, 1 pot en verre 100ml, 1 flacon compte-gouttes 30ml, 5 pipettes graduées, 1 set de cuillères doseuses, 1 bol en verre, 1 mini fouet, 1 spatule, 2 entonnoirs mini, et 50 étiquettes waterproof. Valeur totale: 169 DH - Économisez 30%!',
    'Kit complet 11 accessoires - Économie 30%',
    119.00,
    '/product-images/diy/kit-starter.webp',
    true,
    'Lavez tous les ustensiles avant première utilisation. Consultez nos recettes pour bien démarrer.'
) ON CONFLICT (slug) DO NOTHING;

-- ===================
-- SUCCESS MESSAGE
-- ===================

DO $$
DECLARE
    tool_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO tool_count FROM diy_tools;
    RAISE NOTICE '✅ DIY Tools seed completed!';
    RAISE NOTICE '   - % tools inserted', tool_count;
    RAISE NOTICE '   - Accessoires DIY category created';
    RAISE NOTICE '   - Kit Starter DIY product created';
END $$;
