# 📋 SPÉCIFICATION DÉTAILLÉE - AMÉLIORATIONS DIAGNOSTIC KORELAB

**Date:** 25 Janvier 2026  
**Version:** 1.0  
**Auteur:** Équipe Korelab

---

## 🎯 OBJECTIFS GLOBAUX

1. **Améliorer l'expérience utilisateur** du diagnostic avec navigation fluide
2. **Réduire l'agressivité commerciale** en privilégiant l'éducation
3. **Créer une routine tutoriel** avec guide jour/nuit plutôt que vente directe
4. **Améliorer la partie éducative** avec scroll optimisé
5. **Mettre à jour le catalogue** avec la liste de produits à jour

---

## 📑 TABLE DES MATIÈRES

1. [Navigation Arrière dans le Diagnostic](#1-navigation-arrière-dans-le-diagnostic)
2. [Choix Multiples Quand Applicable](#2-choix-multiples-quand-applicable)
3. [Partie Éducative avec Scroll Amélioré](#3-partie-éducative-avec-scroll-amélioré)
4. [Routine Tutoriel (Matin/Après-midi/Soir)](#4-routine-tutoriel-matinaprès-midisoir)
5. [Chargement avec Fond Blanc](#5-chargement-avec-fond-blanc)
6. [Mise à Jour du Catalogue Produits](#6-mise-à-jour-du-catalogue-produits)
7. [Plan d'Implémentation](#7-plan-dimplémentation)

---

## 1. NAVIGATION ARRIÈRE DANS LE DIAGNOSTIC

### 1.1 Problème Actuel
- Les étapes du diagnostic avancent automatiquement après sélection
- Pas de possibilité de revenir en arrière de manière fluide
- Les réponses précédentes ne sont pas conservées visuellement

### 1.2 Solution Proposée

#### A. Bouton Retour Visible
- **Emplacement:** En haut à gauche de chaque étape (sauf intro)
- **Style:** Bouton texte avec icône flèche gauche
- **Comportement:** 
  - Animation slide vers la gauche (direction -1)
  - Restauration de la réponse précédente si elle existe
  - Mise à jour de la progress bar

#### B. Conservation des Réponses
- **État:** Les réponses doivent être conservées dans le store Zustand
- **Affichage:** Lors du retour, la réponse précédente doit être pré-sélectionnée
- **Validation:** Le bouton "Continuer" doit rester actif si une réponse existe

#### C. Animation Fluide
```typescript
// Direction de l'animation
const [direction, setDirection] = useState(1);

// Navigation arrière
const handlePrev = () => {
  setDirection(-1); // Animation vers la gauche
  prevStep();
};

// Navigation avant
const handleNext = () => {
  setDirection(1); // Animation vers la droite
  nextStep();
};
```

#### D. Modifications à Apporter

**Fichiers à modifier:**
- `src/components/diagnostic/DiagnosticWizard.tsx`
  - Ajouter bouton retour visible dans le header
  - Améliorer la gestion de la direction d'animation
  - S'assurer que `prevStep()` fonctionne correctement

- `src/components/diagnostic/steps/StepTexture.tsx`
- `src/components/diagnostic/steps/StepScalp.tsx`
- `src/components/diagnostic/steps/StepPorosity.tsx`
- `src/components/diagnostic/steps/StepConcerns.tsx`
  - Retirer la transition automatique après sélection
  - Ajouter un bouton "Continuer" explicite
  - Pré-sélectionner la réponse si elle existe déjà

---

## 2. CHOIX MULTIPLES QUAND APPLICABLE

### 2.1 Analyse des Étapes

| Étape | Choix Unique | Choix Multiples | Justification |
|-------|--------------|-----------------|---------------|
| **Texture** | ✅ | ❌ | Une seule texture possible |
| **Cuir Chevelu** | ✅ | ❌ | Un seul type de cuir chevelu |
| **Porosité** | ✅ | ❌ | Une seule porosité |
| **Préoccupations** | ❌ | ✅ | Plusieurs préoccupations possibles |

### 2.2 Implémentation

#### A. Étape Concerns (Déjà Multiples)
- ✅ **Déjà implémenté** avec `toggleConcern()`
- ✅ Permet de sélectionner plusieurs concerns
- ✅ Bouton "Continuer" activé si au moins 1 concern sélectionné

#### B. Vérification des Autres Étapes
- **Texture:** Choix unique ✅ (correct)
- **Scalp:** Choix unique ✅ (correct)
- **Porosity:** Choix unique ✅ (correct)

#### C. Amélioration UX pour Concerns
- Ajouter un compteur visuel: "X préoccupations sélectionnées"
- Permettre de désélectionner en cliquant à nouveau
- Animation de sélection/désélection fluide

---

## 3. PARTIE ÉDUCATIVE AVEC SCROLL AMÉLIORÉ

### 3.1 Problème Actuel
- La partie éducative (`ScienceExplainer`) n'est pas visible ou mal scrollable
- L'utilisateur ne comprend pas pourquoi les produits sont recommandés
- Manque d'explications scientifiques

### 3.2 Solution Proposée

#### A. Restructuration de RoutineReveal

**Structure proposée:**
```
┌─────────────────────────────────────┐
│ En-tête Bleu Nuit (33vh)           │
│ - ANALYSE COMPLÈTE                 │
│ - Profil résumé                     │
├─────────────────────────────────────┤
│ Carte Résultat (scrollable)         │
│ ┌─────────────────────────────────┐ │
│ │ SOLUTION SCIENTIFIQUE          │ │
│ │ Mécanisme d'action             │ │
│ │                                 │ │
│ │ 📚 PARTIE ÉDUCATIVE            │ │
│ │ - Explication porosité         │ │
│ │ - Méthode LOC/LCO              │ │
│ │ - Pourquoi chaque produit      │ │
│ │                                 │ │
│ │ 📦 PRODUITS RECOMMANDÉS        │ │
│ │ - Liste numérotée               │ │
│ │ - Prix et descriptions         │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ CTA Discret (non sticky)            │
│ "Voir les produits"                 │
└─────────────────────────────────────┘
```

#### B. Composant ScienceExplainer Amélioré

**Nouveau composant:** `RoutineTutorial.tsx`

**Sections:**
1. **Explication de la Porosité**
   - Schéma visuel (faible/moyenne/forte)
   - Impact sur l'absorption des produits
   - Méthode de test du verre d'eau

2. **Méthode LOC/LCO Personnalisée**
   - **L** (Liquid): Gel Aloe Vera ou eau
   - **O** (Oil): Huile recommandée selon porosité
   - **C** (Cream): Beurre si porosité forte
   - Adaptation selon le profil utilisateur

3. **Pourquoi Chaque Produit**
   - Explication scientifique pour chaque produit recommandé
   - Compatibilité avec le profil
   - Bénéfices attendus

#### C. Amélioration du Scroll

**Problèmes identifiés:**
- CTA sticky bloque le scroll
- Hauteur fixe de l'en-tête bleu nuit
- Pas de padding bottom suffisant

**Solutions:**
```css
.routine-container {
  min-height: 100vh;
  padding-bottom: 120px; /* Espace pour CTA */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* iOS smooth scroll */
}

.educational-section {
  scroll-margin-top: 20px; /* Espacement pour scroll smooth */
}
```

#### D. Modifications à Apporter

**Fichiers à créer:**
- `src/components/diagnostic/RoutineTutorial.tsx` (nouveau composant tutoriel)

**Fichiers à modifier:**
- `src/components/diagnostic/RoutineReveal.tsx`
  - Restructurer pour intégrer la partie éducative en premier
  - Rendre le CTA non-sticky (en bas de page)
  - Améliorer le scroll

- `src/components/diagnostic/ScienceExplainer.tsx`
  - Améliorer le design
  - Ajouter des sections scrollables
  - Intégrer des visuels explicatifs

---

## 4. ROUTINE TUTORIEL (MATIN/APRÈS-MIDI/SOIR)

### 4.1 Philosophie

**Avant (Vente Agressive):**
- Focus immédiat sur l'achat
- CTA "COMMANDER LE PROTOCOLE" en sticky
- Prix en évidence
- Pas d'explication de routine

**Après (Éducation First):**
- Focus sur l'apprentissage
- Tutoriel de routine quotidienne
- Produits présentés comme outils d'une routine
- CTA discret en bas de page

### 4.2 Structure de la Routine Tutoriel

#### A. Vue d'Ensemble
```
┌─────────────────────────────────────┐
│ 📅 TA ROUTINE QUOTIDIENNE          │
│                                     │
│ Basée sur ton profil:               │
│ • Texture: [X]                      │
│ • Porosité: [Y]                     │
│ • Cuir chevelu: [Z]                  │
└─────────────────────────────────────┘
```

#### B. Section Matin (AM)

**Timing:** Au réveil / Avant de sortir

**Étapes:**
1. **Nettoyage (si nécessaire)**
   - Produit: [Cleanser recommandé]
   - Quantité: "1 noisette"
   - Méthode: "Masser le cuir chevelu, rincer"
   - Fréquence: "2-3x/semaine" ou "Quotidien"

2. **Hydratation**
   - Produit: [Gel Aloe ou Leave-in]
   - Quantité: "2-3 cuillères à soupe"
   - Méthode: "Applique sur cheveux humides, longueurs et pointes"
   - Technique: "Méthode LOC/LCO"

3. **Scellage (si porosité forte)**
   - Produit: [Huile ou Beurre]
   - Quantité: "Quelques gouttes" ou "Noisette"
   - Méthode: "Applique en dernier, sur les pointes"

#### C. Section Après-midi (PM)

**Timing:** Après le sport / Rafraîchissement

**Étapes:**
1. **Rafraîchissement (optionnel)**
   - Produit: Eau ou brumisateur
   - Méthode: "Vaporise légèrement, scrunch si bouclé"

2. **Retouche (si nécessaire)**
   - Produit: [Huile légère]
   - Quantité: "1-2 gouttes"
   - Méthode: "Sur les pointes uniquement"

#### D. Section Soir (Nuit)

**Timing:** Avant de se coucher

**Étapes:**
1. **Protection**
   - Produit: [Bonnet satin ou foulard]
   - Méthode: "Protège les cheveux pendant le sommeil"

2. **Traitement (2-3x/semaine)**
   - Produit: [Treatment recommandé]
   - Quantité: Selon produit
   - Méthode: "Bain d'huile ou masque"
   - Temps: "Laisser poser 1h minimum ou toute la nuit"

#### E. Section Hebdomadaire

**Timing:** 1-2x par semaine

**Étapes:**
1. **Nettoyage profond**
   - Produit: [Ghassoul si applicable]
   - Méthode: "Masque sur cuir chevelu, 10 min"

2. **Masque réparateur**
   - Produit: [Masque ou bain d'huile]
   - Temps: "30 min à 2h"

### 4.3 Composant RoutineTutorial

**Structure du composant:**
```typescript
interface RoutineTutorialProps {
  profile: HairProfile;
  products: ScoredProduct[];
  matchScore: number;
}

// Sections:
1. Header avec profil
2. Section Matin (RoutineAM)
3. Section Après-midi (RoutinePM)
4. Section Soir (RoutineNight)
5. Section Hebdomadaire (RoutineWeekly)
6. Produits Recommandés (liste discrète)
7. CTA "Voir les produits" (non agressif)
```

### 4.4 Design

**Style Science Snap:**
- Fond blanc
- Sections avec bordures fines
- Icônes horloge pour timing
- Badges pour fréquence (Quotidien, 2-3x/semaine, etc.)
- Typographie Space Mono pour les titres
- Inter pour les descriptions

**Exemple visuel:**
```
┌─────────────────────────────────────┐
│ 🕐 MATIN                            │
│ ─────────────────────────────────── │
│                                     │
│ 1. NETTOYAGE (2-3x/semaine)        │
│    [Produit]                        │
│    Quantité: 1 noisette             │
│    → Masser cuir chevelu, rincer   │
│                                     │
│ 2. HYDRATATION (Quotidien)          │
│    [Produit]                        │
│    Quantité: 2-3 cuillères          │
│    → Appliquer sur cheveux humides │
└─────────────────────────────────────┘
```

### 4.5 Modifications à Apporter

**Fichiers à créer:**
- `src/components/diagnostic/RoutineTutorial.tsx`
- `src/components/diagnostic/routine/RoutineAM.tsx`
- `src/components/diagnostic/routine/RoutinePM.tsx`
- `src/components/diagnostic/routine/RoutineNight.tsx`
- `src/components/diagnostic/routine/RoutineWeekly.tsx`

**Fichiers à modifier:**
- `src/components/diagnostic/RoutineReveal.tsx`
  - Remplacer le contenu actuel par `RoutineTutorial`
  - Retirer le CTA sticky agressif
  - Ajouter un CTA discret en bas

---

## 5. CHARGEMENT AVEC FOND BLANC

### 5.1 Problème Actuel
- Fond bleu nuit (`bg-science-900`) dans `StepLoading.tsx`
- Inversion de couleurs trop agressive
- Ne correspond pas au style "Science Snap" blanc

### 5.2 Solution Proposée

#### A. Nouveau Design

**Style:**
- Fond blanc (`bg-white`)
- Barre de chargement scientifique (fine, bleue)
- Texte technique en Space Mono
- Icône pouls discrète (cyan)

**Exemple:**
```
┌─────────────────────────────────────┐
│                                     │
│        [Icône Pouls animée]        │
│                                     │
│    Corrélation des symptômes...    │
│                                     │
│    ▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░ 65%      │
│                                     │
└─────────────────────────────────────┘
```

#### B. Modifications à Apporter

**Fichier à modifier:**
- `src/components/diagnostic/steps/StepLoading.tsx`

**Changements:**
```typescript
// Avant
<div className="bg-science-900 text-white">

// Après
<div className="bg-white text-science-900">

// Barre de chargement
<div className="h-1 bg-slate-100 rounded-full">
  <motion.div className="h-full bg-science-900" />
</div>

// Icône pouls
<Activity className="w-16 h-16 text-accent-500" />
```

---

## 6. MISE À JOUR DU CATALOGUE PRODUITS

### 6.1 État Actuel

**Produits dans seed.sql (11 produits):**
1. Ghassoul de l'Atlas Pur
2. Shampoing Base Neutre Douce
3. Huile de Ricin Pure
4. Huile de Nigelle
5. Huile d'Argan Bio Pure
6. Huile de Pépins de Raisin
7. Huile d'Avocat Pure
8. Beurre de Karité Brut
9. Gel d'Aloe Vera Natif 99%
10. Protéines de Soie Hydrolysées
11. Huile Essentielle de Romarin

### 6.2 Action Requise

**⚠️ IMPORTANT:** L'utilisateur mentionne avoir une **liste à jour des produits** mais ne l'a pas fournie dans le message.

**À faire:**
1. Demander la liste complète des produits à jour
2. Comparer avec la liste actuelle
3. Identifier les produits à ajouter/modifier/supprimer
4. Mettre à jour:
   - `database/seed.sql`
   - `src/lib/test-hair-algo.ts` (données mock)
   - Base de données Supabase (si applicable)

### 6.3 Structure de Données

**Format attendu pour chaque produit:**
```typescript
{
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  product_type: 'cleanser' | 'treatment' | 'finish';
  product_subtype: string;
  usage_instructions: string;
  expert_note: string;
  tags: string[];
  // Scoring et compatibilités à définir
}
```

### 6.4 Plan de Mise à Jour

1. **Réception de la liste** (à obtenir de l'utilisateur)
2. **Validation** des données
3. **Mise à jour seed.sql**
4. **Mise à jour algorithmes** (scoring, compatibilités)
5. **Tests** de l'algorithme avec nouveaux produits
6. **Migration base de données** (si nécessaire)

---

## 7. PLAN D'IMPLÉMENTATION

### 7.1 Phase 1: Navigation et UX (Priorité Haute)

**Durée estimée:** 2-3 heures

**Tâches:**
1. ✅ Ajouter bouton retour visible dans DiagnosticWizard
2. ✅ Retirer transitions automatiques dans les steps
3. ✅ Ajouter boutons "Continuer" explicites
4. ✅ Pré-sélectionner les réponses existantes
5. ✅ Améliorer animations de navigation

**Fichiers:**
- `src/components/diagnostic/DiagnosticWizard.tsx`
- `src/components/diagnostic/steps/StepTexture.tsx`
- `src/components/diagnostic/steps/StepScalp.tsx`
- `src/components/diagnostic/steps/StepPorosity.tsx`
- `src/components/diagnostic/steps/StepConcerns.tsx`

### 7.2 Phase 2: Chargement et Style (Priorité Haute)

**Durée estimée:** 30 minutes

**Tâches:**
1. ✅ Modifier StepLoading pour fond blanc
2. ✅ Ajuster barre de chargement scientifique
3. ✅ Adapter couleurs et typographie

**Fichiers:**
- `src/components/diagnostic/steps/StepLoading.tsx`

### 7.3 Phase 3: Routine Tutoriel (Priorité Haute)

**Durée estimée:** 4-5 heures

**Tâches:**
1. ✅ Créer composant RoutineTutorial
2. ✅ Créer sections Matin/Après-midi/Soir/Hebdomadaire
3. ✅ Intégrer partie éducative
4. ✅ Remplacer RoutineReveal actuel
5. ✅ Retirer CTA agressif
6. ✅ Améliorer scroll

**Fichiers à créer:**
- `src/components/diagnostic/RoutineTutorial.tsx`
- `src/components/diagnostic/routine/RoutineAM.tsx`
- `src/components/diagnostic/routine/RoutinePM.tsx`
- `src/components/diagnostic/routine/RoutineNight.tsx`
- `src/components/diagnostic/routine/RoutineWeekly.tsx`

**Fichiers à modifier:**
- `src/components/diagnostic/RoutineReveal.tsx`
- `src/components/diagnostic/ScienceExplainer.tsx`

### 7.4 Phase 4: Partie Éducative (Priorité Moyenne)

**Durée estimée:** 2-3 heures

**Tâches:**
1. ✅ Améliorer ScienceExplainer
2. ✅ Ajouter explications porosité
3. ✅ Ajouter méthode LOC/LCO personnalisée
4. ✅ Ajouter "Pourquoi chaque produit"
5. ✅ Optimiser scroll et espacement

**Fichiers:**
- `src/components/diagnostic/ScienceExplainer.tsx`
- `src/components/diagnostic/RoutineTutorial.tsx`

### 7.5 Phase 5: Catalogue Produits (Priorité Moyenne)

**Durée estimée:** 2-3 heures (après réception liste)

**Tâches:**
1. ⏳ Recevoir liste produits à jour
2. ⏳ Comparer avec liste actuelle
3. ⏳ Mettre à jour seed.sql
4. ⏳ Mettre à jour données mock
5. ⏳ Mettre à jour algorithmes de scoring
6. ⏳ Tester avec nouveaux produits

**Fichiers:**
- `database/seed.sql`
- `src/lib/test-hair-algo.ts`
- `src/lib/matching-engine.ts` (si nécessaire)

### 7.6 Phase 6: Tests et Validation (Priorité Haute)

**Durée estimée:** 2 heures

**Tâches:**
1. ✅ Tester navigation arrière/avant
2. ✅ Tester choix multiples (concerns)
3. ✅ Tester scroll partie éducative
4. ✅ Tester routine tutoriel complète
5. ✅ Vérifier style Science Snap cohérent
6. ✅ Tests responsive mobile

---

## 8. DÉTAILS TECHNIQUES

### 8.1 Store Zustand (diagnosticStore)

**Modifications nécessaires:**
```typescript
// Ajouter méthode pour vérifier si on peut revenir en arrière
const canGoBack = (): boolean => {
  return currentStep !== 'intro';
};

// Améliorer prevStep pour restaurer les réponses
const prevStep = () => {
  // Logique de retour avec restauration état
};
```

### 8.2 Animations

**Direction d'animation:**
```typescript
// Dans DiagnosticWizard
const [direction, setDirection] = useState(1);

// Avant
setDirection(1);
nextStep();

// Arrière
setDirection(-1);
prevStep();
```

### 8.3 Scroll Optimisé

**CSS pour smooth scroll:**
```css
.routine-container {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

.section {
  scroll-margin-top: 80px; /* Pour éviter que le header cache le contenu */
}
```

### 8.4 Responsive Design

**Breakpoints:**
- Mobile: < 768px (focus principal)
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Adaptations:**
- Routine tutoriel: Stack vertical sur mobile
- Partie éducative: Sections collapsibles sur mobile
- Produits: Liste verticale sur mobile

---

## 9. VALIDATION ET TESTS

### 9.1 Checklist de Validation

**Navigation:**
- [ ] Bouton retour visible sur toutes les étapes (sauf intro)
- [ ] Animation fluide vers l'arrière
- [ ] Réponses conservées lors du retour
- [ ] Progress bar mise à jour correctement

**Choix Multiples:**
- [ ] Concerns permet sélection multiple
- [ ] Autres étapes restent choix unique
- [ ] Compteur visuel pour concerns

**Routine Tutoriel:**
- [ ] Sections Matin/Après-midi/Soir/Hebdomadaire présentes
- [ ] Instructions claires avec quantités
- [ ] Produits intégrés naturellement
- [ ] CTA discret (non agressif)

**Partie Éducative:**
- [ ] Scroll fluide et accessible
- [ ] Explications porosité présentes
- [ ] Méthode LOC/LCO expliquée
- [ ] "Pourquoi chaque produit" visible

**Chargement:**
- [ ] Fond blanc
- [ ] Barre de chargement scientifique
- [ ] Texte technique en Space Mono

**Style:**
- [ ] Cohérence Science Snap partout
- [ ] Typographie Space Mono + Inter
- [ ] Couleurs Science Blue + Accent Cyan
- [ ] Responsive mobile

### 9.2 Tests Utilisateur

**Scénarios à tester:**
1. **Parcours complet:**
   - Démarrer diagnostic
   - Répondre à toutes les questions
   - Revenir en arrière sur texture
   - Modifier réponse
   - Continuer jusqu'à la fin
   - Voir routine tutoriel
   - Scroller partie éducative
   - Voir produits recommandés

2. **Navigation arrière:**
   - Aller jusqu'à concerns
   - Revenir à texture
   - Vérifier que réponse est conservée
   - Modifier réponse
   - Continuer

3. **Choix multiples:**
   - Sélectionner 3 concerns
   - Désélectionner 1
   - Vérifier compteur
   - Continuer

---

## 10. RÉSUMÉ DES MODIFICATIONS

### 10.1 Fichiers à Créer (7 fichiers)

1. `src/components/diagnostic/RoutineTutorial.tsx`
2. `src/components/diagnostic/routine/RoutineAM.tsx`
3. `src/components/diagnostic/routine/RoutinePM.tsx`
4. `src/components/diagnostic/routine/RoutineNight.tsx`
5. `src/components/diagnostic/routine/RoutineWeekly.tsx`
6. `docs/SPEC-AMELIORATIONS-DIAGNOSTIC.md` (ce document)

### 10.2 Fichiers à Modifier (8 fichiers)

1. `src/components/diagnostic/DiagnosticWizard.tsx`
2. `src/components/diagnostic/RoutineReveal.tsx`
3. `src/components/diagnostic/ScienceExplainer.tsx`
4. `src/components/diagnostic/steps/StepLoading.tsx`
5. `src/components/diagnostic/steps/StepTexture.tsx`
6. `src/components/diagnostic/steps/StepScalp.tsx`
7. `src/components/diagnostic/steps/StepPorosity.tsx`
8. `src/components/diagnostic/steps/StepConcerns.tsx`

### 10.3 Fichiers à Mettre à Jour (après réception liste)

1. `database/seed.sql`
2. `src/lib/test-hair-algo.ts`

---

## 11. QUESTIONS OUVERTES

### 11.1 Liste de Produits

**❓ Question:** Pouvez-vous fournir la liste à jour des produits à intégrer dans le catalogue et l'algorithme ?

**Format attendu:**
- Nom du produit
- Type (cleanser/treatment/finish)
- Prix
- Description courte
- Instructions d'utilisation
- Notes expert
- Scoring par concern (optionnel)
- Compatibilités (optionnel)

### 11.2 Fréquences de Routine

**❓ Question:** Les fréquences proposées (quotidien, 2-3x/semaine) sont-elles correctes ou souhaitez-vous les ajuster ?

**Exemples actuels:**
- Nettoyage: 2-3x/semaine
- Hydratation: Quotidien
- Traitement: 2-3x/semaine
- Masque: 1-2x/semaine

### 11.3 Quantités de Produits

**❓ Question:** Les quantités proposées ("1 noisette", "2-3 cuillères") sont-elles adaptées ou faut-il les personnaliser selon le type de cheveux ?

---

## 12. PROCHAINES ÉTAPES

1. **Validation de cette spécification** par l'utilisateur
2. **Réception de la liste de produits** à jour
3. **Démarrage Phase 1** (Navigation et UX)
4. **Démarrage Phase 2** (Chargement)
5. **Démarrage Phase 3** (Routine Tutoriel)
6. **Tests et ajustements**
7. **Déploiement**

---

**Document créé le:** 25 Janvier 2026  
**Dernière mise à jour:** 25 Janvier 2026  
**Version:** 1.0
