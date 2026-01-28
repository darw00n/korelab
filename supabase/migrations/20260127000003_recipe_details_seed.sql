-- ============================================
-- KORELAB - Recipe Ingredients, Steps & Tools
-- ============================================

-- ===================
-- HELPER: Get IDs
-- ===================

DO $$
DECLARE
    -- Recipe IDs
    v_spray_hydratant UUID;
    v_masque_nutrition UUID;
    v_bain_huile UUID;
    v_serum_pousse UUID;
    v_masque_proteine UUID;
    v_leave_in UUID;
    v_beurre_scellant UUID;
    v_pre_poo UUID;
    
    -- Product IDs
    v_gel_aloe UUID;
    v_beurre_karite UUID;
    v_huile_ricin UUID;
    v_huile_argan UUID;
    v_huile_avocat UUID;
    v_huile_pepins UUID;
    v_huile_nigelle UUID;
    v_huile_olive UUID;
    v_hydrolat_rose UUID;
    v_hydrolat_romarin UUID;
    v_hydrolat_lavande UUID;
    v_macerat_fenugrec UUID;
    v_macerat_oignon UUID;
    v_proteines_soie UUID;
    v_glycerine UUID;
    
    -- Tool IDs
    v_flacon_spray UUID;
    v_pot_verre UUID;
    v_flacon_pipette UUID;
    v_pipettes UUID;
    v_cuilleres UUID;
    v_bol_verre UUID;
    v_fouet UUID;
    v_spatule UUID;
    v_entonnoirs UUID;
    v_bonnet UUID;
    
BEGIN
    -- ===================
    -- GET RECIPE IDs
    -- ===================
    SELECT id INTO v_spray_hydratant FROM recipes WHERE slug = 'spray-hydratant-quotidien';
    SELECT id INTO v_masque_nutrition FROM recipes WHERE slug = 'masque-nutrition-intense';
    SELECT id INTO v_bain_huile FROM recipes WHERE slug = 'bain-huile-anti-chute';
    SELECT id INTO v_serum_pousse FROM recipes WHERE slug = 'serum-pousse-fortifiant';
    SELECT id INTO v_masque_proteine FROM recipes WHERE slug = 'masque-proteine-reparateur';
    SELECT id INTO v_leave_in FROM recipes WHERE slug = 'leave-in-definition-boucles';
    SELECT id INTO v_beurre_scellant FROM recipes WHERE slug = 'beurre-scellant-karite';
    SELECT id INTO v_pre_poo FROM recipes WHERE slug = 'pre-poo-demelant';
    
    -- ===================
    -- GET PRODUCT IDs
    -- ===================
    SELECT id INTO v_gel_aloe FROM products WHERE slug = 'gel-aloe-vera';
    SELECT id INTO v_beurre_karite FROM products WHERE slug = 'beurre-karite';
    SELECT id INTO v_huile_ricin FROM products WHERE slug = 'huile-ricin';
    SELECT id INTO v_huile_argan FROM products WHERE slug = 'huile-argan';
    SELECT id INTO v_huile_avocat FROM products WHERE slug = 'huile-avocat';
    SELECT id INTO v_huile_pepins FROM products WHERE slug = 'huile-pepins-raisin';
    SELECT id INTO v_huile_nigelle FROM products WHERE slug = 'huile-nigelle';
    SELECT id INTO v_huile_olive FROM products WHERE slug = 'huile-olive';
    SELECT id INTO v_hydrolat_rose FROM products WHERE slug = 'hydrolat-rose';
    SELECT id INTO v_hydrolat_romarin FROM products WHERE slug = 'hydrolat-romarin';
    SELECT id INTO v_hydrolat_lavande FROM products WHERE slug = 'hydrolat-lavande';
    SELECT id INTO v_macerat_fenugrec FROM products WHERE slug = 'macerat-fenugrec';
    SELECT id INTO v_macerat_oignon FROM products WHERE slug = 'macerat-oignon';
    SELECT id INTO v_proteines_soie FROM products WHERE slug = 'proteines-soie';
    SELECT id INTO v_glycerine FROM products WHERE slug = 'glycerine-vegetale';
    
    -- ===================
    -- GET TOOL IDs
    -- ===================
    SELECT id INTO v_flacon_spray FROM diy_tools WHERE slug = 'flacon-spray-100ml';
    SELECT id INTO v_pot_verre FROM diy_tools WHERE slug = 'pot-verre-100ml';
    SELECT id INTO v_flacon_pipette FROM diy_tools WHERE slug = 'flacon-compte-gouttes-30ml';
    SELECT id INTO v_pipettes FROM diy_tools WHERE slug = 'pipettes-graduees-x5';
    SELECT id INTO v_cuilleres FROM diy_tools WHERE slug = 'cuilleres-doseuses';
    SELECT id INTO v_bol_verre FROM diy_tools WHERE slug = 'bol-verre-200ml';
    SELECT id INTO v_fouet FROM diy_tools WHERE slug = 'mini-fouet-silicone';
    SELECT id INTO v_spatule FROM diy_tools WHERE slug = 'spatule-silicone';
    SELECT id INTO v_entonnoirs FROM diy_tools WHERE slug = 'entonnoirs-mini';
    SELECT id INTO v_bonnet FROM diy_tools WHERE slug = 'bonnet-chauffant';

    -- ===================
    -- RECIPE 1: Spray Hydratant Quotidien
    -- ===================
    
    -- Ingredients
    INSERT INTO recipe_ingredients (recipe_id, product_id, quantity_value, quantity_unit, percentage, role, step_order) VALUES
        (v_spray_hydratant, v_hydrolat_rose, 60, 'ml', 60, 'base', 1),
        (v_spray_hydratant, v_gel_aloe, 30, 'ml', 30, 'hydratant', 2),
        (v_spray_hydratant, v_huile_pepins, 10, 'ml', 10, 'scellant', 3);
    
    -- Steps
    INSERT INTO recipe_steps (recipe_id, step_number, title, instruction, tip, duration_seconds, icon) VALUES
        (v_spray_hydratant, 1, 'Verser l''hydrolat', 'Verse 60ml d''hydrolat de rose dans le flacon spray à l''aide de l''entonnoir.', 'L''hydrolat de rose convient à tous. Tu peux le remplacer par hydrolat de romarin pour stimuler la pousse.', 30, 'Droplets'),
        (v_spray_hydratant, 2, 'Ajouter le gel d''aloe', 'Ajoute 30ml de gel d''aloe vera. Utilise une pipette pour plus de précision.', 'Le gel doit être pur à 99% minimum pour un effet optimal.', 30, 'Leaf'),
        (v_spray_hydratant, 3, 'Incorporer l''huile', 'Ajoute 10ml d''huile de pépins de raisin avec une pipette.', 'Pour porosité forte, utilise plutôt de l''huile d''argan ou d''avocat.', 30, 'Droplet'),
        (v_spray_hydratant, 4, 'Bien mélanger', 'Ferme le flacon et agite vigoureusement pendant 30 secondes.', 'Agiter avant chaque utilisation car les phases peuvent se séparer.', 30, 'RefreshCw');
    
    -- Tools
    INSERT INTO recipe_tools (recipe_id, tool_id, is_essential, usage_note) VALUES
        (v_spray_hydratant, v_flacon_spray, true, 'Contenant final'),
        (v_spray_hydratant, v_pipettes, true, 'Pour doser l''huile'),
        (v_spray_hydratant, v_entonnoirs, true, 'Pour verser sans renverser');

    -- ===================
    -- RECIPE 2: Masque Nutrition Intense
    -- ===================
    
    INSERT INTO recipe_ingredients (recipe_id, product_id, quantity_value, quantity_unit, percentage, role, step_order) VALUES
        (v_masque_nutrition, v_beurre_karite, 40, 'g', 40, 'base', 1),
        (v_masque_nutrition, v_huile_avocat, 30, 'ml', 30, 'nourrissant', 2),
        (v_masque_nutrition, v_huile_ricin, 20, 'ml', 20, 'fortifiant', 3),
        (v_masque_nutrition, v_huile_argan, 10, 'ml', 10, 'scellant', 4);
    
    INSERT INTO recipe_steps (recipe_id, step_number, title, instruction, tip, duration_seconds, icon) VALUES
        (v_masque_nutrition, 1, 'Faire fondre le karité', 'Place 40g de beurre de karité dans le bol en verre. Fais fondre au bain-marie ou 20 secondes au micro-ondes.', 'Ne pas surchauffer! Juste assez pour qu''il devienne liquide.', 60, 'Flame'),
        (v_masque_nutrition, 2, 'Ajouter l''huile d''avocat', 'Retire du feu et ajoute immédiatement 30ml d''huile d''avocat en mélangeant.', 'L''huile d''avocat pénètre profondément dans la fibre capillaire.', 30, 'Plus'),
        (v_masque_nutrition, 3, 'Incorporer le ricin', 'Ajoute 20ml d''huile de ricin et mélange bien avec le fouet.', 'Le ricin est épais, bien émulsionner pour éviter les grumeaux.', 30, 'Plus'),
        (v_masque_nutrition, 4, 'Finaliser avec l''argan', 'Ajoute 10ml d''huile d''argan et fouette jusqu''à obtenir une texture homogène.', 'L''argan apporte brillance et facilite le rinçage.', 30, 'Sparkles'),
        (v_masque_nutrition, 5, 'Transvaser', 'Verse le mélange encore tiède dans le pot en verre à l''aide de la spatule.', 'Le mélange va figer en refroidissant - texture beurre crémeux.', 60, 'Package');
    
    INSERT INTO recipe_tools (recipe_id, tool_id, is_essential, usage_note) VALUES
        (v_masque_nutrition, v_pot_verre, true, 'Contenant final'),
        (v_masque_nutrition, v_bol_verre, true, 'Pour faire fondre au bain-marie'),
        (v_masque_nutrition, v_fouet, true, 'Pour émulsionner'),
        (v_masque_nutrition, v_spatule, true, 'Pour transvaser'),
        (v_masque_nutrition, v_cuilleres, true, 'Pour doser le karité'),
        (v_masque_nutrition, v_bonnet, false, 'Recommandé pour meilleure pénétration');

    -- ===================
    -- RECIPE 3: Bain d'Huile Anti-Chute
    -- ===================
    
    INSERT INTO recipe_ingredients (recipe_id, product_id, quantity_value, quantity_unit, percentage, role, step_order) VALUES
        (v_bain_huile, v_macerat_oignon, 20, 'ml', 40, 'actif', 1),
        (v_bain_huile, v_huile_ricin, 15, 'ml', 30, 'fortifiant', 2),
        (v_bain_huile, v_huile_nigelle, 15, 'ml', 30, 'assainissant', 3);
    
    INSERT INTO recipe_steps (recipe_id, step_number, title, instruction, tip, duration_seconds, icon) VALUES
        (v_bain_huile, 1, 'Combiner les huiles', 'Dans le flacon compte-gouttes, verse 20ml de macérat d''oignon.', 'Le macérat d''oignon a une odeur forte mais elle part au shampoing.', 30, 'Droplet'),
        (v_bain_huile, 2, 'Ajouter le ricin', 'Ajoute 15ml d''huile de ricin avec une pipette.', 'Le ricin fortifie le follicule et favorise la pousse.', 30, 'Plus'),
        (v_bain_huile, 3, 'Compléter avec nigelle', 'Finalise avec 15ml d''huile de nigelle.', 'La nigelle assainit et prévient les pellicules.', 30, 'Plus'),
        (v_bain_huile, 4, 'Mélanger', 'Ferme le flacon et retourne-le plusieurs fois pour homogénéiser.', 'Tu peux tiédir le flacon dans les mains avant application.', 30, 'RefreshCw');
    
    INSERT INTO recipe_tools (recipe_id, tool_id, is_essential, usage_note) VALUES
        (v_bain_huile, v_flacon_pipette, true, 'Contenant final - pipette pour application'),
        (v_bain_huile, v_pipettes, true, 'Pour doser'),
        (v_bain_huile, v_bonnet, false, 'Pour maximiser la pénétration');

    -- ===================
    -- RECIPE 4: Sérum Pousse Fortifiant
    -- ===================
    
    INSERT INTO recipe_ingredients (recipe_id, product_id, quantity_value, quantity_unit, percentage, role, step_order) VALUES
        (v_serum_pousse, v_macerat_fenugrec, 15, 'ml', 50, 'actif', 1),
        (v_serum_pousse, v_huile_ricin, 10, 'ml', 33, 'fortifiant', 2),
        (v_serum_pousse, v_huile_nigelle, 5, 'ml', 17, 'assainissant', 3);
    
    INSERT INTO recipe_steps (recipe_id, step_number, title, instruction, tip, duration_seconds, icon) VALUES
        (v_serum_pousse, 1, 'Base fenugrec', 'Verse 15ml de macérat de fenugrec dans le flacon compte-gouttes.', 'Le fenugrec est LE secret indien pour la pousse - très puissant!', 30, 'Zap'),
        (v_serum_pousse, 2, 'Ajouter ricin', 'Ajoute 10ml d''huile de ricin.', 'Le ricin renforce l''action fortifiante.', 30, 'Plus'),
        (v_serum_pousse, 3, 'Finaliser avec nigelle', 'Complète avec 5ml d''huile de nigelle.', 'La nigelle équilibre et purifie.', 30, 'Plus'),
        (v_serum_pousse, 4, 'Application', 'Appliquer 10-15 gouttes directement sur le cuir chevelu, masser 5 minutes.', 'Masser stimule la circulation sanguine et booste l''effet.', 30, 'Hand');
    
    INSERT INTO recipe_tools (recipe_id, tool_id, is_essential, usage_note) VALUES
        (v_serum_pousse, v_flacon_pipette, true, 'Pour application précise sur le cuir chevelu'),
        (v_serum_pousse, v_pipettes, true, 'Pour doser');

    -- ===================
    -- RECIPE 5: Masque Protéiné Réparateur
    -- ===================
    
    INSERT INTO recipe_ingredients (recipe_id, product_id, quantity_value, quantity_unit, percentage, role, step_order) VALUES
        (v_masque_proteine, v_gel_aloe, 50, 'ml', 62.5, 'base', 1),
        (v_masque_proteine, v_huile_argan, 20, 'ml', 25, 'nourrissant', 2),
        (v_masque_proteine, v_proteines_soie, 10, 'ml', 12.5, 'actif', 3);
    
    INSERT INTO recipe_steps (recipe_id, step_number, title, instruction, tip, duration_seconds, icon) VALUES
        (v_masque_proteine, 1, 'Préparer la base', 'Verse 50ml de gel d''aloe vera dans le bol en verre.', 'L''aloe vera est la base parfaite - hydratant et pénétrant.', 30, 'Leaf'),
        (v_masque_proteine, 2, 'Ajouter l''argan', 'Incorpore 20ml d''huile d''argan en fouettant doucement.', 'L''argan nourrit sans alourdir et apporte brillance.', 30, 'Droplet'),
        (v_masque_proteine, 3, 'Intégrer les protéines', 'Ajoute 10ml de protéines de soie et mélange bien.', 'IMPORTANT: Ne pas dépasser cette dose - risque de surcharge!', 30, 'Shield'),
        (v_masque_proteine, 4, 'Transvaser', 'Transfère dans un pot propre. Utiliser dans les 5 jours.', 'Les protéines se dégradent vite - petites quantités préférables.', 30, 'Package');
    
    INSERT INTO recipe_tools (recipe_id, tool_id, is_essential, usage_note) VALUES
        (v_masque_proteine, v_pot_verre, true, 'Contenant - préférer petit pot'),
        (v_masque_proteine, v_bol_verre, true, 'Pour mélanger'),
        (v_masque_proteine, v_fouet, true, 'Pour émulsionner'),
        (v_masque_proteine, v_pipettes, true, 'Pour doser les protéines précisément');

    -- ===================
    -- RECIPE 6: Leave-In Définition Boucles
    -- ===================
    
    INSERT INTO recipe_ingredients (recipe_id, product_id, quantity_value, quantity_unit, percentage, role, step_order) VALUES
        (v_leave_in, v_gel_aloe, 70, 'ml', 70, 'base', 1),
        (v_leave_in, v_hydrolat_lavande, 20, 'ml', 20, 'hydratant', 2),
        (v_leave_in, v_glycerine, 5, 'ml', 5, 'humectant', 3),
        (v_leave_in, v_huile_pepins, 5, 'ml', 5, 'scellant', 4);
    
    INSERT INTO recipe_steps (recipe_id, step_number, title, instruction, tip, duration_seconds, icon) VALUES
        (v_leave_in, 1, 'Base aloe', 'Verse 70ml de gel d''aloe vera dans le flacon pompe.', 'L''aloe définit les boucles et apporte de la tenue.', 30, 'Leaf'),
        (v_leave_in, 2, 'Hydrolat lavande', 'Ajoute 20ml d''hydrolat de lavande.', 'La lavande apaise le cuir chevelu et sent divinement bon.', 30, 'Flower'),
        (v_leave_in, 3, 'Glycérine (attention!)', 'Ajoute SEULEMENT 5ml de glycérine - pas plus!', '⚠️ Trop de glycérine en climat sec = effet inverse (dessèche).', 30, 'AlertTriangle'),
        (v_leave_in, 4, 'Sceller avec l''huile', 'Finalise avec 5ml d''huile de pépins de raisin.', 'Huile ultra-légère parfaite pour ne pas alourdir les boucles.', 30, 'Droplet'),
        (v_leave_in, 5, 'Homogénéiser', 'Ferme et agite vigoureusement 30 secondes.', 'Agiter avant chaque utilisation.', 30, 'RefreshCw');
    
    INSERT INTO recipe_tools (recipe_id, tool_id, is_essential, usage_note) VALUES
        (v_leave_in, v_flacon_spray, true, 'Utiliser comme flacon pompe'),
        (v_leave_in, v_pipettes, true, 'Pour doser glycérine précisément'),
        (v_leave_in, v_entonnoirs, true, 'Pour verser');

    -- ===================
    -- RECIPE 7: Beurre Scellant Karité
    -- ===================
    
    INSERT INTO recipe_ingredients (recipe_id, product_id, quantity_value, quantity_unit, percentage, role, step_order) VALUES
        (v_beurre_scellant, v_beurre_karite, 60, 'g', 60, 'base', 1),
        (v_beurre_scellant, v_huile_olive, 25, 'ml', 25, 'nourrissant', 2),
        (v_beurre_scellant, v_huile_ricin, 15, 'ml', 15, 'brillance', 3);
    
    INSERT INTO recipe_steps (recipe_id, step_number, title, instruction, tip, duration_seconds, icon) VALUES
        (v_beurre_scellant, 1, 'Fondre le karité', 'Fais fondre 60g de beurre de karité au bain-marie (pas micro-ondes).', 'Le bain-marie préserve les propriétés du karité brut.', 120, 'Flame'),
        (v_beurre_scellant, 2, 'Ajouter huile d''olive', 'Hors du feu, incorpore 25ml d''huile d''olive.', 'L''olive pénètre profondément - parfait pour cheveux très secs.', 30, 'Plus'),
        (v_beurre_scellant, 3, 'Ajouter ricin', 'Ajoute 15ml d''huile de ricin et mélange.', 'Le ricin apporte brillance et renforce l''effet scellant.', 30, 'Plus'),
        (v_beurre_scellant, 4, 'Refroidir', 'Place au réfrigérateur 30-45 minutes jusqu''à ce que ça commence à figer sur les bords.', 'NE PAS laisser figer complètement!', 30, 'Snowflake'),
        (v_beurre_scellant, 5, 'Fouetter', 'Sors du frigo et fouette énergiquement 5-10 minutes jusqu''à texture crémeuse.', 'C''est le fouettage qui rend le beurre léger et non gras!', 300, 'Wind'),
        (v_beurre_scellant, 6, 'Conditionner', 'Transfère dans le pot. Texture finale: crème fouettée.', 'Si trop liquide, remettre au frigo et refouetter.', 60, 'Package');
    
    INSERT INTO recipe_tools (recipe_id, tool_id, is_essential, usage_note) VALUES
        (v_beurre_scellant, v_pot_verre, true, 'Contenant final'),
        (v_beurre_scellant, v_bol_verre, true, 'Pour bain-marie'),
        (v_beurre_scellant, v_fouet, true, 'INDISPENSABLE pour fouetter'),
        (v_beurre_scellant, v_spatule, true, 'Pour transvaser'),
        (v_beurre_scellant, v_cuilleres, true, 'Pour doser le karité');

    -- ===================
    -- RECIPE 8: Pré-Poo Démêlant
    -- ===================
    
    INSERT INTO recipe_ingredients (recipe_id, product_id, quantity_value, quantity_unit, percentage, role, step_order) VALUES
        (v_pre_poo, v_gel_aloe, 50, 'ml', 50, 'base', 1),
        (v_pre_poo, v_hydrolat_rose, 30, 'ml', 30, 'hydratant', 2),
        (v_pre_poo, v_huile_argan, 20, 'ml', 20, 'nourrissant', 3);
    
    INSERT INTO recipe_steps (recipe_id, step_number, title, instruction, tip, duration_seconds, icon) VALUES
        (v_pre_poo, 1, 'Verser l''aloe', 'Mets 50ml de gel d''aloe vera dans le flacon.', 'L''aloe glisse et facilite le démêlage.', 30, 'Leaf'),
        (v_pre_poo, 2, 'Ajouter l''hydrolat', 'Ajoute 30ml d''hydrolat de rose.', 'L''hydrolat apaise et prépare le cheveu.', 30, 'Flower'),
        (v_pre_poo, 3, 'Finaliser avec l''argan', 'Incorpore 20ml d''huile d''argan.', 'L''argan protège des tensioactifs du shampoing.', 30, 'Droplet'),
        (v_pre_poo, 4, 'Mélanger', 'Agite vigoureusement pour émulsionner.', 'Agiter avant chaque utilisation.', 30, 'RefreshCw');
    
    INSERT INTO recipe_tools (recipe_id, tool_id, is_essential, usage_note) VALUES
        (v_pre_poo, v_flacon_spray, true, 'Ou flacon pompe'),
        (v_pre_poo, v_pipettes, true, 'Pour doser'),
        (v_pre_poo, v_entonnoirs, true, 'Pour verser');

    RAISE NOTICE '✅ Recipe details (ingredients, steps, tools) inserted successfully!';
END $$;
