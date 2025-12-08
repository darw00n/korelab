// ============================================
// KORELAB - useMatchingEngine Hook (HAIR CARE)
// Charge les données Supabase et génère les routines
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { generateHairRoutine } from '@/lib/matching-engine';
import type {
  Product,
  HairTexture,
  HairPorosity,
  ScalpType,
  Concern,
  ProductConcernScoring,
  ProductPorosityCompat,
  ProductTextureCompat,
  ProductScalpCompat,
  HairProfile,
  HairRoutineRecommendation,
} from '@/types/database.types';

// ===================
// TYPES
// ===================

interface MatchingData {
  products: Product[];
  textures: HairTexture[];
  porosities: HairPorosity[];
  scalpTypes: ScalpType[];
  concerns: Concern[];
  concernScoring: ProductConcernScoring[];
  porosityCompat: ProductPorosityCompat[];
  textureCompat: ProductTextureCompat[];
  scalpCompat: ProductScalpCompat[];
}

interface UseMatchingEngineReturn {
  // États
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
  
  // Données de référence
  textures: HairTexture[];
  porosities: HairPorosity[];
  scalpTypes: ScalpType[];
  concerns: Concern[];
  products: Product[];
  
  // Fonction principale
  generateRoutine: (profile: HairProfile) => HairRoutineRecommendation | null;
  
  // Reload
  reload: () => Promise<void>;
}

// ===================
// HOOK PRINCIPAL
// ===================

export function useMatchingEngine(): UseMatchingEngineReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MatchingData | null>(null);

  // Chargement des données
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Vérifier si Supabase est configuré
      if (!supabase) {
        throw new Error('Supabase non configuré');
      }

      // Charger toutes les données en parallèle
      const [
        texturesRes,
        porositiesRes,
        scalpTypesRes,
        concernsRes,
        productsRes,
        concernScoringRes,
        porosityCompatRes,
        textureCompatRes,
        scalpCompatRes,
      ] = await Promise.all([
        supabase.from('hair_textures').select('*').order('display_order'),
        supabase.from('hair_porosities').select('*').order('display_order'),
        supabase.from('scalp_types').select('*').order('display_order'),
        supabase.from('concerns').select('*').order('display_order'),
        supabase.from('products').select('*').eq('is_available', true),
        supabase.from('product_concern_scoring').select('*'),
        supabase.from('product_porosity_compat').select('*'),
        supabase.from('product_texture_compat').select('*'),
        supabase.from('product_scalp_compat').select('*'),
      ]);

      // Vérifier les erreurs
      const errors = [
        texturesRes.error,
        porositiesRes.error,
        scalpTypesRes.error,
        concernsRes.error,
        productsRes.error,
        concernScoringRes.error,
        porosityCompatRes.error,
        textureCompatRes.error,
        scalpCompatRes.error,
      ].filter(Boolean);

      if (errors.length > 0) {
        console.error('Erreurs Supabase:', errors);
        throw new Error('Erreur lors du chargement des données');
      }

      // Assembler les données
      setData({
        textures: texturesRes.data || [],
        porosities: porositiesRes.data || [],
        scalpTypes: scalpTypesRes.data || [],
        concerns: concernsRes.data || [],
        products: productsRes.data || [],
        concernScoring: concernScoringRes.data || [],
        porosityCompat: porosityCompatRes.data || [],
        textureCompat: textureCompatRes.data || [],
        scalpCompat: scalpCompatRes.data || [],
      });

      console.log('✅ Données Hair Care chargées:', {
        textures: texturesRes.data?.length,
        porosities: porositiesRes.data?.length,
        scalpTypes: scalpTypesRes.data?.length,
        concerns: concernsRes.data?.length,
        products: productsRes.data?.length,
      });

    } catch (err) {
      console.error('Erreur chargement:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      
      // Fallback avec données mock si Supabase échoue
      console.log('⚠️ Utilisation des données mock');
      setData(getMockData());
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Charger les données au montage
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Fonction de génération de routine
  const generateRoutine = useCallback((profile: HairProfile): HairRoutineRecommendation | null => {
    if (!data) {
      console.error('Données non chargées');
      return null;
    }

    return generateHairRoutine(profile, data);
  }, [data]);

  return {
    isLoading,
    isReady: !isLoading && !error && data !== null,
    error,
    textures: data?.textures || [],
    porosities: data?.porosities || [],
    scalpTypes: data?.scalpTypes || [],
    concerns: data?.concerns || [],
    products: data?.products || [],
    generateRoutine,
    reload: loadData,
  };
}

// ===================
// DONNÉES MOCK (FALLBACK)
// ===================

function getMockData(): MatchingData {
  return {
    textures: [
      { id: 'tex-1', name: 'Lisse (Type 1)', slug: 'lisse', description: 'Cheveux raides', icon: 'Minus', display_order: 1, created_at: '' },
      { id: 'tex-2', name: 'Ondulé (Type 2)', slug: 'ondule', description: 'Vagues en S', icon: 'Waves', display_order: 2, created_at: '' },
      { id: 'tex-3', name: 'Bouclé (Type 3)', slug: 'boucle', description: 'Boucles définies', icon: 'Circle', display_order: 3, created_at: '' },
      { id: 'tex-4', name: 'Frisé/Crépu (Type 4)', slug: 'crepu', description: 'Boucles très serrées', icon: 'Zap', display_order: 4, created_at: '' },
    ],
    porosities: [
      { id: 'por-1', name: 'Porosité Faible', slug: 'faible', description: 'Cuticules fermées', care_tip: 'Privilégier les huiles légères', icon: '', display_order: 1, created_at: '' },
      { id: 'por-2', name: 'Porosité Moyenne', slug: 'moyenne', description: 'Équilibre parfait', care_tip: 'Routine LOC classique', icon: '', display_order: 2, created_at: '' },
      { id: 'por-3', name: 'Porosité Forte', slug: 'forte', description: 'Cuticules ouvertes', care_tip: 'Besoin de protéines et scellage fort', icon: '', display_order: 3, created_at: '' },
    ],
    scalpTypes: [
      { id: 'scalp-1', name: 'Cuir Chevelu Sec', slug: 'sec', description: 'Tiraillements', icon: 'Droplet', display_order: 1, created_at: '' },
      { id: 'scalp-2', name: 'Cuir Chevelu Gras', slug: 'gras', description: 'Excès de sébum', icon: 'Sun', display_order: 2, created_at: '' },
      { id: 'scalp-3', name: 'Cuir Chevelu Normal', slug: 'normal', description: 'Équilibré', icon: 'Heart', display_order: 3, created_at: '' },
      { id: 'scalp-4', name: 'Cuir Chevelu Sensible', slug: 'sensible', description: 'Réactif', icon: 'AlertTriangle', display_order: 4, created_at: '' },
    ],
    concerns: [
      { id: 'con-1', name: 'Chute de Cheveux', slug: 'chute', description: 'Perte excessive', icon: 'TrendingDown', display_order: 1, created_at: '' },
      { id: 'con-2', name: 'Pellicules', slug: 'pellicules', description: 'Squames', icon: 'Snowflake', display_order: 2, created_at: '' },
      { id: 'con-3', name: 'Casse & Fragilité', slug: 'casse', description: 'Cheveux cassants', icon: 'Scissors', display_order: 3, created_at: '' },
      { id: 'con-4', name: 'Pousse Lente', slug: 'pousse', description: 'Croissance ralentie', icon: 'Clock', display_order: 4, created_at: '' },
      { id: 'con-5', name: 'Sécheresse', slug: 'secheresse', description: 'Cheveux secs', icon: 'Droplets', display_order: 5, created_at: '' },
      { id: 'con-6', name: 'Frisottis', slug: 'frisottis', description: 'Manque de définition', icon: 'Wind', display_order: 6, created_at: '' },
    ],
    products: [],
    concernScoring: [],
    porosityCompat: [],
    textureCompat: [],
    scalpCompat: [],
  };
}

export default useMatchingEngine;
