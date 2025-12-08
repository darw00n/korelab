'use client';

// ============================================
// KORELAB - Diagnostic Wizard (HAIR CARE)
// Formulaire multi-étapes pour le diagnostic capillaire
// ============================================

import React, { useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { 
  useDiagnosticStore, 
  selectCanProceed, 
  selectStepProgress,
  selectHairProfile,
} from '@/store/diagnosticStore';
import { useMatchingEngine } from '@/hooks/useMatchingEngine';
import { ProgressBar } from '@/components/ui/ProgressBar';

// Import des étapes
import { StepIntro } from './steps/StepIntro';
import { StepTexture } from './steps/StepTexture';
import { StepScalp } from './steps/StepScalp';
import { StepPorosity } from './steps/StepPorosity';
import { StepConcerns } from './steps/StepConcerns';
import { StepLoading } from './steps/StepLoading';
import { RoutineReveal } from './RoutineReveal';

// ===================
// ANIMATION VARIANTS
// ===================

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const slideTransition = {
  x: { type: 'spring', stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
};

// ===================
// COMPOSANT PRINCIPAL
// ===================

export function DiagnosticWizard() {
  const {
    currentStep,
    isLoading: isCalculating,
    nextStep,
    prevStep,
    setResults,
    setLoading
  } = useDiagnosticStore();
  
  const canProceed = useDiagnosticStore(selectCanProceed);
  const progress = useDiagnosticStore(selectStepProgress);
  const hairProfile = useDiagnosticStore(selectHairProfile);
  
  // Hook pour le moteur de recommandation
  const { 
    isLoading: isLoadingData, 
    isReady, 
    error,
    textures,
    porosities,
    scalpTypes,
    concerns, 
    generateRoutine 
  } = useMatchingEngine();
  
  // Direction de l'animation
  const [direction, setDirection] = React.useState(1);
  
  // Ref pour éviter les calculs multiples
  const hasCalculated = useRef(false);

  // Navigation
  const handleNext = useCallback(() => {
    if (canProceed) {
      setDirection(1);
      nextStep();
    }
  }, [canProceed, nextStep]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    prevStep();
  }, [prevStep]);

  // Calculer la routine quand on arrive à l'étape results
  useEffect(() => {
    // Démarrer le loading dès qu'on arrive à results
    if (currentStep === 'results' && !hasCalculated.current) {
      setLoading(true);
      hasCalculated.current = true;
      
      // Attendre que les données soient prêtes
      if (!isReady) {
        console.log('Attente des données...');
        return;
      }
      
      // Créer un profil avec des valeurs par défaut si nécessaire
      const answers = useDiagnosticStore.getState().answers;
      const profile = {
        textureId: answers.textureId || '',
        porosityId: answers.porosityId || '',
        scalpTypeId: answers.scalpTypeId || '',
        concernIds: answers.concernIds || [],
      };
      
      console.log('Profil pour génération:', profile);
      
      // Simuler un délai pour l'animation (2.5 secondes)
      const timer = setTimeout(() => {
        if (profile.textureId && profile.porosityId && profile.scalpTypeId) {
          const routine = generateRoutine(profile);
          
          if (routine) {
            console.log('Routine générée:', routine);
            setResults(routine);
          } else {
            console.error('Échec de la génération de routine');
          }
        } else {
          console.error('Profil incomplet:', profile);
        }
        setLoading(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [currentStep, isReady, generateRoutine, setResults, setLoading]);
  
  // Reset le flag quand on quitte l'étape results
  useEffect(() => {
    if (currentStep !== 'results') {
      hasCalculated.current = false;
    }
  }, [currentStep]);

  // Écran de chargement initial
  if (isLoadingData) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-secondary-600">Chargement des données...</p>
      </div>
    );
  }

  // Erreur de chargement
  if (error) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl">😕</span>
        </div>
        <h2 className="text-xl font-bold text-secondary-900 mb-2">Oups !</h2>
        <p className="text-secondary-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-6 py-3 bg-primary text-white rounded-xl font-semibold"
        >
          Réessayer
        </button>
      </div>
    );
  }

  // Rendu de l'étape actuelle
  const renderStep = () => {
    switch (currentStep) {
      case 'intro':
        return <StepIntro onStart={handleNext} />;
      
      case 'texture':
        return <StepTexture onNext={handleNext} textures={textures} />;
      
      case 'scalp':
        return <StepScalp onNext={handleNext} scalpTypes={scalpTypes} />;
      
      case 'porosity':
        return <StepPorosity onNext={handleNext} porosities={porosities} />;
      
      case 'concerns':
        return <StepConcerns onNext={handleNext} concerns={concerns} />;
      
      case 'results':
        // Afficher loading ou résultats
        if (isCalculating) {
          return <StepLoading />;
        }
        return <RoutineReveal />;
      
      default:
        return <StepIntro onStart={handleNext} />;
    }
  };

  // Détermine si on doit afficher le header de navigation
  const showHeader = currentStep !== 'intro' && currentStep !== 'results';
  const showProgress = currentStep !== 'intro' && currentStep !== 'results' && !isCalculating;

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col">
      {/* Barre de progression */}
      {showProgress && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 pt-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-secondary-500">
              Étape {progress.current} sur {progress.total}
            </span>
            <span className="text-sm font-semibold text-primary">
              {progress.percent}%
            </span>
          </div>
          <ProgressBar value={progress.percent} />
        </motion.div>
      )}

      {/* Bouton retour */}
      {showHeader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-4 pt-4"
        >
          <button
            onClick={handlePrev}
            className="flex items-center gap-2 text-secondary-600 hover:text-secondary-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>
        </motion.div>
      )}

      {/* Contenu de l'étape */}
      <div className="flex-1 px-4 py-6 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            className="h-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DiagnosticWizard;
