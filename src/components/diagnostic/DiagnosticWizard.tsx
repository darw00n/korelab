'use client';

// ============================================
// KORELAB - Diagnostic Wizard (Science Snap)
// Formulaire multi-étapes avec style clinique
// ============================================

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowLeft } from 'lucide-react';
import { 
  useDiagnosticStore, 
  selectCanProceed, 
  selectStepProgress,
  selectHairProfile,
} from '@/store/diagnosticStore';
import { useMatchingEngine } from '@/hooks/useMatchingEngine';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase';

// Import des étapes
import { StepIntro } from './steps/StepIntro';
import { StepTexture } from './steps/StepTexture';
import { StepScalp } from './steps/StepScalp';
import { StepPorosity } from './steps/StepPorosity';
import { StepConcerns } from './steps/StepConcerns';
import { StepLoading } from './steps/StepLoading';
import { StepAuthRequired } from './steps/StepAuthRequired';
import { RoutineTutorial } from './RoutineTutorial';

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
  x: { type: 'spring' as const, stiffness: 300, damping: 30 },
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
  
  // Auth state
  const { authState, user } = useAuthStore();
  const isAuthenticated = authState === 'authenticated';
  
  // État pour savoir si on affiche l'auth ou les résultats
  const [showAuthStep, setShowAuthStep] = useState(false);
  const [authCompleted, setAuthCompleted] = useState(false);
  
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
  const hasSavedDiagnostic = useRef(false);

  // Fonction pour sauvegarder le diagnostic en DB
  const saveDiagnostic = useCallback(async () => {
    if (hasSavedDiagnostic.current) return;
    if (!user?.id) return;
    
    const answers = useDiagnosticStore.getState().answers;
    const results = useDiagnosticStore.getState().results;
    
    try {
      hasSavedDiagnostic.current = true;
      
      // 1. Sauvegarder la session de diagnostic
      const { error: sessionError } = await supabase
        .from('diagnostic_sessions')
        .insert({
          user_id: user.id,
          texture_id: answers.textureId || null,
          porosity_id: answers.porosityId || null,
          scalp_type_id: answers.scalpTypeId || null,
          concern_ids: answers.concernIds || [],
          recommended_products: results || null,
          match_score: results?.matchScore || null,
          is_complete: true,
          completed_at: new Date().toISOString(),
          name: `Diagnostic ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}`,
        });
      
      if (sessionError) {
        console.error('Erreur sauvegarde session diagnostic:', sessionError);
      }
      
      // 2. Désactiver les anciens profils capillaires
      await supabase
        .from('user_hair_profiles')
        .update({ is_active: false })
        .eq('user_id', user.id);
      
      // 3. Créer le nouveau profil capillaire actif (remplace l'ancien)
      const { error: profileError } = await supabase
        .from('user_hair_profiles')
        .insert({
          user_id: user.id,
          texture_id: answers.textureId || null,
          porosity_id: answers.porosityId || null,
          scalp_type_id: answers.scalpTypeId || null,
          concern_ids: answers.concernIds || [],
          is_active: true,
          name: 'Mon profil capillaire',
        });
      
      if (profileError) {
        console.error('Erreur sauvegarde profil capillaire:', profileError);
        hasSavedDiagnostic.current = false;
      } else {
        console.log('✅ Diagnostic et profil capillaire sauvegardés avec succès');
        
        // 4. Mettre à jour le store auth avec le nouveau profil
        const { refreshUser } = useAuthStore.getState();
        if (refreshUser) {
          await refreshUser();
        }
      }
    } catch (error) {
      console.error('Erreur sauvegarde diagnostic:', error);
      hasSavedDiagnostic.current = false;
    }
  }, [user?.id]);

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
        
        // Après le loading, vérifier si l'utilisateur est connecté
        // Si non, afficher l'étape d'authentification
        if (!isAuthenticated && !authCompleted) {
          setShowAuthStep(true);
        }
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [currentStep, isReady, generateRoutine, setResults, setLoading, isAuthenticated, authCompleted]);
  
  // Si l'utilisateur était déjà authentifié, pas besoin de l'étape auth
  useEffect(() => {
    if (isAuthenticated) {
      setAuthCompleted(true);
      setShowAuthStep(false);
    }
  }, [isAuthenticated]);
  
  // Sauvegarder le diagnostic pour les utilisateurs déjà connectés
  useEffect(() => {
    if (isAuthenticated && currentStep === 'results' && !isCalculating && !showAuthStep) {
      saveDiagnostic();
    }
  }, [isAuthenticated, currentStep, isCalculating, showAuthStep, saveDiagnostic]);
  
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
        <Loader2 className="w-10 h-10 text-science-900 animate-spin mb-4" />
        <p className="font-mono text-sm uppercase tracking-wider text-text-secondary">CHARGEMENT...</p>
      </div>
    );
  }

  // Erreur de chargement
  if (error) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-md flex items-center justify-center mb-4">
          <span className="text-3xl">⚠</span>
        </div>
        <h2 className="text-xl font-mono font-bold uppercase tracking-wider text-science-900 mb-2">ERREUR</h2>
        <p className="text-text-secondary mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn-primary px-6 py-3"
        >
          RÉESSAYER
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
        // Afficher loading, auth, ou résultats
        if (isCalculating) {
          return <StepLoading />;
        }
        // Si non authentifié et pas encore complété l'auth
        if (showAuthStep && !authCompleted) {
          return (
            <StepAuthRequired 
              onAuthenticated={() => {
                setAuthCompleted(true);
                setShowAuthStep(false);
                // Sauvegarder le diagnostic après authentification
                saveDiagnostic();
              }} 
            />
          );
        }
        return <RoutineTutorial />;
      
      default:
        return <StepIntro onStart={handleNext} />;
    }
  };

  // Détermine si on doit afficher le header de navigation
  const showHeader = currentStep !== 'intro' && currentStep !== 'results';
  const showProgress = currentStep !== 'intro' && currentStep !== 'results' && !isCalculating;

  // Calculer le numéro de paramètre actuel
  const getStepNumber = () => {
    const stepOrder = ['texture', 'scalp', 'porosity', 'concerns'];
    return stepOrder.indexOf(currentStep) + 1;
  };

  const totalSteps = 4;

  // Vérifier si on peut revenir en arrière
  const canGoBack = currentStep !== 'intro' && currentStep !== 'results';

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col bg-white">
      {/* Top Bar avec PARAMÈTRE X/Y et ENREGISTREMENT */}
      {showHeader && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 pt-4 pb-2 border-b border-slate-200"
        >
          {/* Bouton Retour */}
          {canGoBack && (
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 text-text-secondary hover:text-science-900 transition-colors mb-3"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-wider">Retour</span>
            </button>
          )}

          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-science-900">
              PARAMÈTRE {getStepNumber()}/{totalSteps}
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent-500 animate-pulse">
              ENREGISTREMENT...
            </span>
          </div>
          
          {/* Progress Bar fine bleue */}
          <div className="progress-bar">
            <motion.div
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress.percent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      )}

      {/* Contenu de l'étape */}
      <div className={`flex-1 ${currentStep === 'results' ? 'overflow-y-auto' : 'overflow-hidden'}`}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            className={currentStep === 'results' ? 'min-h-full' : 'h-full'}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DiagnosticWizard;
