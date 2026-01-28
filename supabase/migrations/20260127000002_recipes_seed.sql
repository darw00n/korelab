-- ============================================
-- KORELAB - DIY Recipes Seed Data
-- 8 validated recipes WITHOUT essential oils
-- ============================================

-- ===================
-- RECIPE 1: Spray Hydratant Quotidien
-- ===================

INSERT INTO recipes (
    name, slug, description, short_description, recipe_type, difficulty,
    prep_time_minutes, application_time_minutes, frequency,
    shelf_life_days, storage_instructions, yield_ml, yield_applications,
    color_hex, icon,
    target_porosities, target_textures, target_concerns, target_scalp_types,
    benefits, warnings, is_featured
) VALUES (
    'Spray Hydratant Quotidien',
    'spray-hydratant-quotidien',
    'Un spray léger et frais pour hydrater tes cheveux au quotidien sans les alourdir. La combinaison hydrolat + aloe vera apporte hydratation instantanée, tandis que l''huile légère scelle sans effet gras. Parfait pour rafraîchir tes boucles ou réveiller tes cheveux le matin.',
    'Hydratation légère quotidienne',
    'spray', 'debutant',
    5, NULL, 'Quotidien ou selon besoin',
    7, 'Conserver au réfrigérateur. Agiter avant utilisation.', 100, 15,
    '#87CEEB', 'Droplets',
    ARRAY['faible', 'moyenne', 'forte'],
    ARRAY['ondule', 'boucle', 'crepu'],
    ARRAY['secheresse', 'frisottis', 'definition'],
    ARRAY['normal', 'sec', 'sensible'],
    ARRAY['Hydratation instantanée', 'Rafraîchit les boucles', 'Réduit les frisottis', 'Texture légère'],
    ARRAY['Éviter le contact avec les yeux'],
    true
);

-- ===================
-- RECIPE 2: Masque Nutrition Intense
-- ===================

INSERT INTO recipes (
    name, slug, description, short_description, recipe_type, difficulty,
    prep_time_minutes, application_time_minutes, frequency,
    shelf_life_days, storage_instructions, yield_ml, yield_applications,
    color_hex, icon,
    target_porosities, target_textures, target_concerns, target_scalp_types,
    benefits, warnings, is_featured
) VALUES (
    'Masque Nutrition Intense',
    'masque-nutrition-intense',
    'Un masque riche et onctueux pour les cheveux très secs et abîmés. Le beurre de karité et l''huile d''avocat pénètrent en profondeur pour restaurer la fibre capillaire. L''huile de ricin renforce et apporte de la brillance. Idéal en soin hebdomadaire.',
    'Réparation cheveux très secs',
    'masque', 'intermediaire',
    10, 30, '1x par semaine',
    14, 'Conserver au frais et au sec.', 100, 4,
    '#DEB887', 'Sparkles',
    ARRAY['moyenne', 'forte'],
    ARRAY['boucle', 'crepu'],
    ARRAY['secheresse', 'casse', 'brillance'],
    ARRAY['normal', 'sec'],
    ARRAY['Nutrition profonde', 'Réduit la casse', 'Apporte brillance', 'Adoucit la fibre'],
    ARRAY['Ne pas appliquer sur le cuir chevelu si gras', 'Bien rincer pour éviter l''effet gras'],
    true
);

-- ===================
-- RECIPE 3: Bain d'Huile Anti-Chute
-- ===================

INSERT INTO recipes (
    name, slug, description, short_description, recipe_type, difficulty,
    prep_time_minutes, application_time_minutes, frequency,
    shelf_life_days, storage_instructions, yield_ml, yield_applications,
    color_hex, icon,
    target_porosities, target_textures, target_concerns, target_scalp_types,
    benefits, warnings, is_featured
) VALUES (
    'Bain d''Huile Anti-Chute',
    'bain-huile-anti-chute',
    'Un soin ciblé pour lutter contre la chute de cheveux. Le macérat d''oignon est reconnu pour stimuler la repousse, tandis que l''huile de ricin fortifie les follicules. L''huile de nigelle assainit le cuir chevelu. À utiliser en cure de 4-6 semaines pour des résultats visibles.',
    'Stimule la pousse, réduit la chute',
    'bain_huile', 'intermediaire',
    5, 60, '2x par semaine pendant 6 semaines',
    30, 'Conserver à l''abri de la lumière.', 50, 6,
    '#8B4513', 'TrendingUp',
    ARRAY['faible', 'moyenne', 'forte'],
    ARRAY['lisse', 'ondule', 'boucle', 'crepu'],
    ARRAY['chute', 'pousse'],
    ARRAY['normal', 'gras', 'sec'],
    ARRAY['Réduit la chute', 'Stimule la pousse', 'Fortifie les follicules', 'Assainit le cuir chevelu'],
    ARRAY['Odeur forte du macérat d''oignon - bien rincer', 'Faire un shampoing double après'],
    true
);

-- ===================
-- RECIPE 4: Sérum Pousse Fortifiant
-- ===================

INSERT INTO recipes (
    name, slug, description, short_description, recipe_type, difficulty,
    prep_time_minutes, application_time_minutes, frequency,
    shelf_life_days, storage_instructions, yield_ml, yield_applications,
    color_hex, icon,
    target_porosities, target_textures, target_concerns, target_scalp_types,
    benefits, warnings, is_featured
) VALUES (
    'Sérum Pousse Fortifiant',
    'serum-pousse-fortifiant',
    'Un sérum concentré à appliquer sur le cuir chevelu pour booster la pousse. Le macérat de fenugrec, secret indien ancestral, stimule la microcirculation. Combiné à l''huile de ricin et à l''huile de nigelle, il fortifie et nourrit les racines.',
    'Booster de pousse concentré',
    'serum', 'expert',
    5, NULL, '3-4x par semaine (cure)',
    30, 'Conserver au réfrigérateur dans flacon opaque.', 30, 15,
    '#228B22', 'Zap',
    ARRAY['faible', 'moyenne', 'forte'],
    ARRAY['lisse', 'ondule', 'boucle', 'crepu'],
    ARRAY['pousse', 'chute', 'volume'],
    ARRAY['normal', 'sec'],
    ARRAY['Accélère la pousse', 'Fortifie les racines', 'Nourrit le cuir chevelu'],
    ARRAY['Le fenugrec a une odeur particulière', 'Éviter pendant la grossesse (fenugrec)'],
    false
);

-- ===================
-- RECIPE 5: Masque Protéiné Réparateur
-- ===================

INSERT INTO recipes (
    name, slug, description, short_description, recipe_type, difficulty,
    prep_time_minutes, application_time_minutes, frequency,
    shelf_life_days, storage_instructions, yield_ml, yield_applications,
    color_hex, icon,
    target_porosities, target_textures, target_concerns, target_scalp_types,
    benefits, warnings, is_featured
) VALUES (
    'Masque Protéiné Réparateur',
    'masque-proteine-reparateur',
    'Un masque reconstructeur pour les cheveux fragilisés par les colorations, défrisages ou la chaleur. Les protéines de soie comblent les brèches dans la cuticule, tandis que le gel d''aloe vera hydrate et l''huile d''argan nourrit. Résultat: des cheveux plus forts et plus brillants.',
    'Reconstruction cheveux abîmés',
    'masque', 'intermediaire',
    10, 20, '1x toutes les 2 semaines',
    5, 'Préparer juste avant utilisation ou conserver 5 jours max au frigo.', 80, 2,
    '#FFD700', 'Shield',
    ARRAY['moyenne', 'forte'],
    ARRAY['lisse', 'ondule', 'boucle'],
    ARRAY['casse', 'secheresse', 'brillance'],
    ARRAY['normal', 'sec', 'sensible'],
    ARRAY['Renforce la fibre', 'Répare les pointes', 'Apporte brillance', 'Réduit la casse'],
    ARRAY['Ne pas abuser des protéines (1x/2 semaines max)', 'Surcharge protéinée = cheveux cassants'],
    true
);

-- ===================
-- RECIPE 6: Leave-In Définition Boucles
-- ===================

INSERT INTO recipes (
    name, slug, description, short_description, recipe_type, difficulty,
    prep_time_minutes, application_time_minutes, frequency,
    shelf_life_days, storage_instructions, yield_ml, yield_applications,
    color_hex, icon,
    target_porosities, target_textures, target_concerns, target_scalp_types,
    benefits, warnings, is_featured
) VALUES (
    'Leave-In Définition Boucles',
    'leave-in-definition-boucles',
    'Un soin sans rinçage qui définit et hydrate les boucles toute la journée. Le gel d''aloe vera apporte tenue et définition, la glycérine attire l''humidité, et l''huile de pépins de raisin scelle sans alourdir. Parfait pour la méthode LOC/LCO.',
    'Définition boucles sans rinçage',
    'leave_in', 'debutant',
    5, NULL, 'Après chaque lavage',
    7, 'Conserver au réfrigérateur.', 100, 8,
    '#9370DB', 'Wind',
    ARRAY['faible', 'moyenne'],
    ARRAY['ondule', 'boucle'],
    ARRAY['definition', 'frisottis', 'secheresse'],
    ARRAY['normal', 'sec'],
    ARRAY['Définit les boucles', 'Anti-frisottis', 'Hydrate sans alourdir', 'Tenue légère'],
    ARRAY['Attention glycérine en climat très sec (peut dessécher)', 'Adapter la quantité de glycérine selon l''humidité'],
    true
);

-- ===================
-- RECIPE 7: Beurre Scellant Karité
-- ===================

INSERT INTO recipes (
    name, slug, description, short_description, recipe_type, difficulty,
    prep_time_minutes, application_time_minutes, frequency,
    shelf_life_days, storage_instructions, yield_ml, yield_applications,
    color_hex, icon,
    target_porosities, target_textures, target_concerns, target_scalp_types,
    benefits, warnings, is_featured
) VALUES (
    'Beurre Scellant Karité',
    'beurre-scellant-karite',
    'Un beurre fouetté ultra-nourrissant pour sceller l''hydratation des cheveux très poreux ou crépus. Le karité forme un film protecteur, l''huile d''olive nourrit en profondeur, et l''huile de ricin apporte brillance. Texture légère et non grasse grâce au fouettage.',
    'Scellant ultime porosité forte',
    'beurre', 'intermediaire',
    15, NULL, 'Après chaque lavage',
    60, 'Conserver à température ambiante, à l''abri de la chaleur.', 100, 20,
    '#F5DEB3', 'Lock',
    ARRAY['forte'],
    ARRAY['boucle', 'crepu'],
    ARRAY['secheresse', 'casse', 'definition'],
    ARRAY['normal', 'sec'],
    ARRAY['Scelle l''hydratation', 'Protège des agressions', 'Nourrit intensément', 'Texture non grasse'],
    ARRAY['Peut alourdir les cheveux fins', 'Ne pas utiliser sur porosité faible'],
    true
);

-- ===================
-- RECIPE 8: Pré-Poo Démêlant
-- ===================

INSERT INTO recipes (
    name, slug, description, short_description, recipe_type, difficulty,
    prep_time_minutes, application_time_minutes, frequency,
    shelf_life_days, storage_instructions, yield_ml, yield_applications,
    color_hex, icon,
    target_porosities, target_textures, target_concerns, target_scalp_types,
    benefits, warnings, is_featured
) VALUES (
    'Pré-Poo Démêlant',
    'pre-poo-demelant',
    'Un soin à appliquer avant le shampoing pour faciliter le démêlage et protéger les cheveux du pouvoir asséchant des tensioactifs. Le gel d''aloe vera glisse sur le cheveu, l''huile d''argan nourrit, et l''hydrolat de rose apaise. Tes cheveux seront doux et faciles à coiffer.',
    'Protection avant-shampoing',
    'pre_poo', 'debutant',
    5, 15, 'Avant chaque shampoing',
    7, 'Conserver au réfrigérateur.', 100, 6,
    '#FFB6C1', 'Heart',
    ARRAY['faible', 'moyenne', 'forte'],
    ARRAY['ondule', 'boucle', 'crepu'],
    ARRAY['secheresse', 'casse'],
    ARRAY['normal', 'sec', 'sensible'],
    ARRAY['Facilite le démêlage', 'Protège du shampoing', 'Apaise le cuir chevelu', 'Réduit la casse'],
    ARRAY['Bien rincer avant le shampoing'],
    false
);

-- ===================
-- SUCCESS MESSAGE
-- ===================

DO $$
DECLARE
    recipe_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO recipe_count FROM recipes;
    RAISE NOTICE '✅ Recipes seed completed!';
    RAISE NOTICE '   - % recipes inserted', recipe_count;
END $$;
