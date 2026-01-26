-- Debug: Check and insert categories
DO $$
DECLARE
    cat_count INTEGER;
BEGIN
    -- Count existing categories
    SELECT COUNT(*) INTO cat_count FROM categories;
    RAISE NOTICE 'Current category count: %', cat_count;
    
    -- Try to insert hydrolats
    INSERT INTO categories (name, slug, description, icon) 
    VALUES ('Hydrolats', 'hydrolats', 'Eaux florales', 'Droplet');
    RAISE NOTICE 'Inserted hydrolats';
EXCEPTION WHEN unique_violation THEN
    RAISE NOTICE 'hydrolats already exists';
WHEN OTHERS THEN
    RAISE NOTICE 'Error inserting hydrolats: %', SQLERRM;
END $$;

DO $$
BEGIN
    INSERT INTO categories (name, slug, description, icon) 
    VALUES ('Macérats', 'macerats', 'Huiles infusées', 'Leaf');
    RAISE NOTICE 'Inserted macerats';
EXCEPTION WHEN unique_violation THEN
    RAISE NOTICE 'macerats already exists';
WHEN OTHERS THEN
    RAISE NOTICE 'Error inserting macerats: %', SQLERRM;
END $$;

DO $$
BEGIN
    INSERT INTO categories (name, slug, description, icon) 
    VALUES ('Huiles Essentielles', 'huiles-essentielles', 'Actifs concentrés', 'Sparkles');
    RAISE NOTICE 'Inserted huiles-essentielles';
EXCEPTION WHEN unique_violation THEN
    RAISE NOTICE 'huiles-essentielles already exists';
WHEN OTHERS THEN
    RAISE NOTICE 'Error inserting huiles-essentielles: %', SQLERRM;
END $$;

-- Verify
DO $$
DECLARE
    cat_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO cat_count FROM categories WHERE slug IN ('hydrolats', 'macerats', 'huiles-essentielles');
    RAISE NOTICE 'New categories count: %', cat_count;
END $$;
