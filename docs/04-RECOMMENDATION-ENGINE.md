# 🧠 KORELAB - Moteur de Recommandation (Skin-Match)

## Concept

Le **Skin-Match** est un système de recommandation basé sur des règles pondérées qui analyse le profil utilisateur pour sélectionner les 3 meilleurs produits formant une routine beauté complète.

---

## 🎯 Objectif

Recommander une routine de **3 produits** :

| Étape | Type | Rôle |
|-------|------|------|
| 1. NETTOYER | `base` | Préparer la peau |
| 2. TRAITER | `active` | Cibler les problèmes |
| 3. NOURRIR | `oil` | Hydrater et protéger |

---

## 📊 Matrice de Scoring

### Structure

Chaque produit a un **score** (1-10) pour chaque **concern** :

```
                    │ Acné │ Rides │ Teint │ Hydrat│ Taches│ Pores │
────────────────────┼──────┼───────┼───────┼───────┼───────┼───────┤
Ghassoul            │  9   │   3   │   7   │   4   │   5   │   8   │
Savon Noir          │  7   │   2   │   6   │   3   │   4   │   7   │
Aloe Vera           │  7   │   5   │   6   │   9   │   4   │   5   │
Niacinamide         │  9   │   5   │   7   │   5   │   6   │   8   │
AHA Fruits          │  6   │   6   │  10   │   3   │   8   │   7   │
Huile Argan         │  4   │   7   │   6   │   9   │   5   │   3   │
Huile Figue Barbarie│  3   │  10   │   7   │   8   │   7   │   2   │
Huile Nigelle       │ 10   │   4   │   5   │   6   │   5   │   7   │
```

### Compatibilité Type de Peau

Bonus/Malus selon le type de peau :

```
                    │ Sèche │ Grasse │ Mixte │ Normale │ Sensible │
────────────────────┼───────┼────────┼───────┼─────────┼──────────┤
Ghassoul            │  ⚠️   │   ✅   │  ✅   │   ✅    │    ⚠️    │
Huile Argan         │  ✅   │   ⚠️   │  ✅   │   ✅    │    ✅    │
Huile Nigelle       │  ✅   │   ✅   │  ✅   │   ✅    │    ⚠️    │
Niacinamide         │  ✅   │   ✅   │  ✅   │   ✅    │    ✅    │
AHA                 │  ⚠️   │   ✅   │  ✅   │   ✅    │    ❌    │

✅ recommended = +2 bonus
⚠️ compatible  = +0
❌ not_recommended = -2 malus
```

---

## 🔢 Algorithme de Calcul

### Input (Profil Utilisateur)

```typescript
interface UserProfile {
  skinTypeId: string;      // Ex: "grasse"
  concernIds: string[];    // Ex: ["acne", "pores"]
  preference: 'diy' | 'ready';
}
```

### Étapes de l'Algorithme

```
┌─────────────────────────────────────────────────────────────┐
│ ÉTAPE 1: FILTRAGE PAR TYPE                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Tous les produits                                         │
│         │                                                   │
│         ▼                                                   │
│   ┌─────────────┬─────────────┬─────────────┐              │
│   │   BASE      │   ACTIVE    │    OIL      │              │
│   │  (cleanser) │   (serum)   │   (huile)   │              │
│   ├─────────────┼─────────────┼─────────────┤              │
│   │ Ghassoul    │ Niacinamide │ Argan       │              │
│   │ Savon Noir  │ AHA         │ Figue       │              │
│   │ Aloe Vera   │             │ Nigelle     │              │
│   └─────────────┴─────────────┴─────────────┘              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ ÉTAPE 2: CALCUL DU SCORE                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Pour chaque produit:                                      │
│                                                             │
│   score = Σ (score_concern[i] pour chaque concern choisi)   │
│                                                             │
│   Exemple: User choisit [Acné, Pores]                       │
│                                                             │
│   Ghassoul:                                                 │
│     score = score_acne(9) + score_pores(8) = 17             │
│                                                             │
│   Savon Noir:                                               │
│     score = score_acne(7) + score_pores(7) = 14             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ ÉTAPE 3: BONUS TYPE DE PEAU                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Si le produit est "recommended" pour ce type de peau:     │
│     score += 2                                              │
│                                                             │
│   Si "not_recommended":                                     │
│     score -= 2                                              │
│                                                             │
│   Exemple: Peau Grasse + Ghassoul                           │
│     Ghassoul est "recommended" pour Grasse                  │
│     score = 17 + 2 = 19                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ ÉTAPE 4: SÉLECTION TOP 1 PAR CATÉGORIE                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   BASE:   max(Ghassoul=19, SavonNoir=14, Aloe=12)          │
│           → Ghassoul ✓                                      │
│                                                             │
│   ACTIVE: max(Niacinamide=18, AHA=13)                       │
│           → Niacinamide ✓                                   │
│                                                             │
│   OIL:    max(Nigelle=17, Argan=7, Figue=5)                │
│           → Nigelle ✓                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ ÉTAPE 5: CALCUL FINAL                                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Routine = [Ghassoul, Niacinamide, Nigelle]                │
│                                                             │
│   Prix Total = 80 + 140 + 120 = 340 MAD                     │
│   Réduction (-10%) = -34 MAD                                │
│   Prix Final = 306 MAD                                      │
│                                                             │
│   Match Score = moyenne(19, 18, 17) / 20 * 100 = 90%        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 💻 Implémentation

### Code Principal (`matching-engine.ts`)

```typescript
export function generateRoutine(userProfile: UserProfile): RoutineRecommendation | null {
  // 1. Charger les données
  const products = fetchProducts();
  const scoring = fetchProductScoring();
  
  // 2. Filtrer par type
  const bases = products.filter(p => p.product_type === 'base');
  const actives = products.filter(p => p.product_type === 'active');
  const oils = products.filter(p => p.product_type === 'oil');
  
  // 3. Calculer les scores
  const scoreProduct = (product: Product): number => {
    let score = 0;
    
    // Score par concern
    for (const concernId of userProfile.concernIds) {
      const match = scoring.find(
        s => s.product_id === product.id && s.concern_id === concernId
      );
      if (match) {
        score += match.score;
      }
    }
    
    // Bonus skin type
    const skinMatch = productSkinTypes.find(
      pst => pst.product_id === product.id && pst.skin_type_id === userProfile.skinTypeId
    );
    if (skinMatch?.compatibility === 'recommended') {
      score += 2;
    } else if (skinMatch?.compatibility === 'not_recommended') {
      score -= 2;
    }
    
    return score;
  };
  
  // 4. Sélectionner le meilleur de chaque catégorie
  const bestBase = selectBest(bases, scoreProduct);
  const bestActive = selectBest(actives, scoreProduct);
  const bestOil = selectBest(oils, scoreProduct);
  
  // 5. Construire la routine
  const routine: ScoredProduct[] = [
    { ...bestBase, score: scoreProduct(bestBase), step: 'cleanser' },
    { ...bestActive, score: scoreProduct(bestActive), step: 'active' },
    { ...bestOil, score: scoreProduct(bestOil), step: 'oil' },
  ];
  
  // 6. Calculer les totaux
  const totalPrice = routine.reduce((sum, p) => sum + p.price, 0);
  const discountPercent = 10;
  const discountAmount = totalPrice * (discountPercent / 100);
  
  return {
    products: routine,
    totalPrice,
    discountPercent,
    discountAmount,
    finalPrice: totalPrice - discountAmount,
    matchScore: calculateMatchScore(routine),
    generatedAt: new Date().toISOString(),
  };
}
```

---

## 📈 Calcul du Match Score

Le **Match Score** (ex: "Match à 95%") est calculé ainsi :

```typescript
function calculateMatchScore(routine: ScoredProduct[]): number {
  // Score maximum théorique par produit
  // = nombre de concerns × 10 (score max) + 2 (bonus skin type)
  const maxScorePerProduct = (concernCount: number) => concernCount * 10 + 2;
  
  // Score obtenu
  const totalObtained = routine.reduce((sum, p) => sum + p.score, 0);
  
  // Score maximum possible
  const totalMax = routine.length * maxScorePerProduct(userConcerns.length);
  
  // Pourcentage (arrondi)
  return Math.round((totalObtained / totalMax) * 100);
}
```

---

## 🎨 Affichage des Résultats

### Carte Produit Recommandé

```
┌─────────────────────────────────────────┐
│  1  NETTOYER                            │
│ ┌───┐                                   │
│ │ 🧴│  Ghassoul de l'Atlas Pur          │
│ └───┘  Argile purifiante traditionnelle │
│        80 MAD                    ⭐ 92% │
│                                         │
│  ✓ Cible : Acné & Imperfections         │
└─────────────────────────────────────────┘
```

### Sticky Footer

```
┌─────────────────────────────────────────┐
│  Total de la routine                    │
│  3̶4̶0̶ ̶M̶A̶D̶  306 MAD         -34 MAD    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  🛒 Ajouter au panier (-10%)    │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

---

## 🔮 Évolutions Futures

### Court Terme
- [ ] Prise en compte du budget utilisateur
- [ ] Pondération des concerns (primaire vs secondaire)
- [ ] A/B testing sur les coefficients

### Moyen Terme
- [ ] Machine Learning sur les conversions
- [ ] Collaborative filtering (utilisateurs similaires)
- [ ] Personnalisation par saison

### Long Terme
- [ ] Analyse photo de la peau (vision IA)
- [ ] Chatbot conseil beauté
- [ ] Suivi de routine et feedback

