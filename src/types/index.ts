// ============================================
// KORELAB - Types Application (HAIR CARE EDITION)
// ============================================

// Re-export des types database
export * from './database.types';

// ===================
// DIAGNOSTIC WIZARD
// ===================

export type DiagnosticStep = 
  | 'intro' 
  | 'texture' 
  | 'scalp' 
  | 'porosity' 
  | 'concerns' 
  | 'loading'
  | 'results';

export interface DiagnosticAnswers {
  textureId?: string;
  scalpTypeId?: string;
  porosityId?: string;
  concernIds?: string[];
}

// ===================
// PROFIL CAPILLAIRE
// ===================

export interface HairProfile {
  textureId: string;
  porosityId: string;
  scalpTypeId: string;
  concernIds: string[];
}

// ===================
// DONNÉES DE RÉFÉRENCE
// ===================

export interface HairTextureOption {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  visualType: '1' | '2' | '3' | '4'; // Type de cheveu
}

export interface HairPorosityOption {
  id: string;
  name: string;
  slug: string;
  description: string;
  careTip: string;
  testResult: string; // "Flotte", "Milieu", "Coule"
  icon: string;
}

export interface ScalpTypeOption {
  id: string;
  name: string;
  slug: string;
  description: string;
  question: string; // "Comment se sent ton cuir chevelu après 2 jours ?"
  icon: string;
}

export interface ConcernOption {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

// ===================
// ROUTINE & RÉSULTATS
// ===================

export interface RoutineStep {
  number: 1 | 2 | 3;
  label: 'LAVER' | 'TRAITER' | 'SCELLER';
  labelEn: 'CLEANSE' | 'TREAT' | 'SEAL';
  description: string;
}

export const ROUTINE_STEPS: RoutineStep[] = [
  { 
    number: 1, 
    label: 'LAVER', 
    labelEn: 'CLEANSE',
    description: 'Nettoyer le cuir chevelu' 
  },
  { 
    number: 2, 
    label: 'TRAITER', 
    labelEn: 'TREAT',
    description: 'Cibler les problèmes' 
  },
  { 
    number: 3, 
    label: 'SCELLER', 
    labelEn: 'SEAL',
    description: 'Retenir l\'hydratation' 
  },
];

// ===================
// SCIENCE EXPLAINER
// ===================

export interface ScienceCard {
  id: string;
  title: string;
  category: 'porosity' | 'texture' | 'active' | 'routine';
  content: string;
  imageUrl?: string;
  productSlug?: string; // Lien vers le produit concerné
}

// ===================
// UI COMPONENTS
// ===================

export interface SelectableOption {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  selected?: boolean;
}
