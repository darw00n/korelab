// ============================================
// KORELAB - Diagnostic Store (HAIR CARE EDITION)
// Gestion d'état du quiz capillaire avec Zustand
// ============================================

import { create } from 'zustand';
import type { 
  DiagnosticStep, 
  DiagnosticAnswers,
  HairRoutineRecommendation,
  HairTexture,
  HairPorosity,
  ScalpType,
  Concern,
} from '@/types/database.types';

// ===================
// TYPES DU STORE
// ===================

interface DiagnosticState {
  // Navigation
  currentStep: DiagnosticStep;
  isLoading: boolean;
  
  // Réponses utilisateur
  answers: DiagnosticAnswers;
  
  // Résultats
  results: HairRoutineRecommendation | null;
  
  // Données de référence (chargées depuis Supabase)
  textures: HairTexture[];
  porosities: HairPorosity[];
  scalpTypes: ScalpType[];
  concerns: Concern[];
}

interface DiagnosticActions {
  // Navigation
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: DiagnosticStep) => void;
  resetWizard: () => void;
  
  // Réponses
  setTexture: (textureId: string) => void;
  setScalpType: (scalpTypeId: string) => void;
  setPorosity: (porosityId: string) => void;
  toggleConcern: (concernId: string) => void;
  setConcerns: (concernIds: string[]) => void;
  setUserProblemDescription: (description: string) => void;
  setUserDesiredSolution: (solution: string) => void;
  
  // Résultats
  setResults: (results: HairRoutineRecommendation) => void;
  setLoading: (isLoading: boolean) => void;
  
  // Données de référence
  setTextures: (textures: HairTexture[]) => void;
  setPorosities: (porosities: HairPorosity[]) => void;
  setScalpTypes: (scalpTypes: ScalpType[]) => void;
  setConcernsData: (concerns: Concern[]) => void;
}

type DiagnosticStore = DiagnosticState & DiagnosticActions;

// ===================
// ORDRE DES ÉTAPES
// ===================

const STEP_ORDER: DiagnosticStep[] = [
  'intro',
  'texture',
  'scalp',
  'porosity',
  'concerns',
  'freetext',  // New step for free text input
  'results'    // Loading est géré dans results
];

// ===================
// ÉTAT INITIAL
// ===================

const initialState: DiagnosticState = {
  currentStep: 'intro',
  isLoading: false,
  answers: {},
  results: null,
  textures: [],
  porosities: [],
  scalpTypes: [],
  concerns: [],
};

// ===================
// CRÉATION DU STORE
// ===================

export const useDiagnosticStore = create<DiagnosticStore>((set, get) => ({
  ...initialState,

  // ─────────────────────────────────────────
  // NAVIGATION
  // ─────────────────────────────────────────

  nextStep: () => {
    const { currentStep } = get();
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    
    if (currentIndex < STEP_ORDER.length - 1) {
      set({ currentStep: STEP_ORDER[currentIndex + 1] });
    }
  },

  prevStep: () => {
    const { currentStep } = get();
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    
    if (currentIndex > 0) {
      set({ currentStep: STEP_ORDER[currentIndex - 1] });
    }
  },

  goToStep: (step) => set({ currentStep: step }),

  resetWizard: () => set(initialState),

  // ─────────────────────────────────────────
  // MISE À JOUR DES RÉPONSES
  // ─────────────────────────────────────────

  setTexture: (textureId) => 
    set((state) => ({ 
      answers: { ...state.answers, textureId } 
    })),

  setScalpType: (scalpTypeId) => 
    set((state) => ({ 
      answers: { ...state.answers, scalpTypeId } 
    })),

  setPorosity: (porosityId) => 
    set((state) => ({ 
      answers: { ...state.answers, porosityId } 
    })),

  toggleConcern: (concernId) => 
    set((state) => {
      const currentConcerns = state.answers.concernIds || [];
      const isSelected = currentConcerns.includes(concernId);
      
      const newConcerns = isSelected
        ? currentConcerns.filter(id => id !== concernId)
        : [...currentConcerns, concernId];
      
      return { 
        answers: { ...state.answers, concernIds: newConcerns } 
      };
    }),

  setConcerns: (concernIds) =>
    set((state) => ({
      answers: { ...state.answers, concernIds }
    })),

  setUserProblemDescription: (description) =>
    set((state) => ({
      answers: { ...state.answers, userProblemDescription: description }
    })),

  setUserDesiredSolution: (solution) =>
    set((state) => ({
      answers: { ...state.answers, userDesiredSolution: solution }
    })),

  // ─────────────────────────────────────────
  // RÉSULTATS
  // ─────────────────────────────────────────

  setResults: (results) => set({ results }),

  setLoading: (isLoading) => set({ isLoading }),

  // ─────────────────────────────────────────
  // DONNÉES DE RÉFÉRENCE
  // ─────────────────────────────────────────

  setTextures: (textures) => set({ textures }),

  setPorosities: (porosities) => set({ porosities }),

  setScalpTypes: (scalpTypes) => set({ scalpTypes }),

  setConcernsData: (concerns) => set({ concerns }),
}));

// ===================
// SELECTORS (optimisation re-renders)
// ===================

export const selectCurrentStep = (state: DiagnosticStore) => state.currentStep;
export const selectAnswers = (state: DiagnosticStore) => state.answers;
export const selectResults = (state: DiagnosticStore) => state.results;
export const selectIsLoading = (state: DiagnosticStore) => state.isLoading;

// Données de référence
export const selectTextures = (state: DiagnosticStore) => state.textures;
export const selectPorosities = (state: DiagnosticStore) => state.porosities;
export const selectScalpTypes = (state: DiagnosticStore) => state.scalpTypes;
export const selectConcerns = (state: DiagnosticStore) => state.concerns;

// Selector: Peut-on passer à l'étape suivante ?
export const selectCanProceed = (state: DiagnosticStore): boolean => {
  const { currentStep, answers } = state;
  
  switch (currentStep) {
    case 'intro':
      return true; // Toujours OK pour commencer
    case 'texture':
      return !!answers.textureId;
    case 'scalp':
      return !!answers.scalpTypeId;
    case 'porosity':
      return !!answers.porosityId;
    case 'concerns':
      return (answers.concernIds?.length || 0) > 0;
    case 'freetext':
      return true; // Optional step, always can proceed
    case 'results':
      return false; // Fin du wizard
    default:
      return false;
  }
};

// Selector: Progression (pour la barre)
export const selectStepProgress = (state: DiagnosticStore): { current: number; total: number; percent: number } => {
  const { currentStep } = state;
  const currentIndex = STEP_ORDER.indexOf(currentStep);
  const total = STEP_ORDER.length - 1; // -1 car 'results' n'est pas une étape de saisie
  
  return {
    current: Math.min(currentIndex, total),
    total,
    percent: Math.round((Math.min(currentIndex, total) / total) * 100),
  };
};

// Selector: Profil complet pour l'algo
export const selectHairProfile = (state: DiagnosticStore) => {
  const { answers } = state;
  
  if (!answers.textureId || !answers.porosityId || !answers.scalpTypeId) {
    return null;
  }
  
  return {
    textureId: answers.textureId,
    porosityId: answers.porosityId,
    scalpTypeId: answers.scalpTypeId,
    concernIds: answers.concernIds || [],
  };
};

export default useDiagnosticStore;
