# 📋 KORELAB - Spécification Fonctionnelle
## Moteur de Recommandation Capillaire

**Version:** 2.0 - Hair Care Edition  
**Date:** Décembre 2025  
**Auteur:** Korelab Tech

---

## 🎯 1. OBJECTIF

Le moteur de recommandation analyse le **profil capillaire** de l'utilisateur pour générer une **routine personnalisée de 3 produits** adaptés à ses besoins.

---

## 📝 2. DONNÉES D'ENTRÉE (Profil Utilisateur)

L'utilisateur répond à **4 questions** pendant le diagnostic :

| Question | Donnée collectée | Exemple |
|----------|------------------|---------|
| 1. Texture | Type de cheveux (1-4) | "Bouclé (Type 3)" |
| 2. Porosité | Niveau de porosité | "Porosité Forte" |
| 3. Cuir Chevelu | Type de cuir chevelu | "Gras" |
| 4. Préoccupations | Problèmes à cibler (multi-select) | ["Chute", "Sécheresse"] |

### Structure du profil :

```typescript
interface HairProfile {
  textureId: string;      // ID texture (lisse, ondule, boucle, crepu)
  porosityId: string;     // ID porosité (faible, moyenne, forte)
  scalpTypeId: string;    // ID cuir chevelu (sec, gras, normal, sensible)
  concernIds: string[];   // IDs des préoccupations choisies (1 à 3 max)
}
```

---

## 🎁 3. SORTIE : LA ROUTINE

Le moteur génère une routine de **3 produits**, un pour chaque étape :

| Étape | Type Produit | Critère Principal | Rôle |
|-------|--------------|-------------------|------|
| **1. LAVER** | `cleanser` | Cuir chevelu | Nettoyer sans agresser |
| **2. TRAITER** | `treatment` | Préoccupations (concerns) | Cibler les problèmes |
| **3. SCELLER** | `finish` | Porosité + Texture | Hydrater et protéger |

---

## 🔢 4. ALGORITHME DE SCORING

### 4.1 Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FLUX DE L'ALGORITHME                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   Profil Utilisateur                                                 │
│         │                                                            │
│         ▼                                                            │
│   ┌───────────────┐   ┌───────────────┐   ┌───────────────┐         │
│   │   CLEANSER    │   │   TREATMENT   │   │    FINISH     │         │
│   │   (Lavants)   │   │    (Soins)    │   │  (Scellants)  │         │
│   ├───────────────┤   ├───────────────┤   ├───────────────┤         │
│   │ Critère:      │   │ Critère:      │   │ Critères:     │         │
│   │ CUIR CHEVELU  │   │ CONCERNS      │   │ POROSITÉ +    │         │
│   │               │   │               │   │ TEXTURE       │         │
│   └───────┬───────┘   └───────┬───────┘   └───────┬───────┘         │
│           │                   │                   │                  │
│           ▼                   ▼                   ▼                  │
│   ┌───────────────┐   ┌───────────────┐   ┌───────────────┐         │
│   │ Score chaque  │   │ Score chaque  │   │ Score chaque  │         │
│   │ cleanser      │   │ treatment     │   │ finish        │         │
│   └───────┬───────┘   └───────┬───────┘   └───────┬───────┘         │
│           │                   │                   │                  │
│           ▼                   ▼                   ▼                  │
│   ┌─────────────────────────────────────────────────────────┐       │
│   │              SÉLECTIONNER LE MEILLEUR                    │       │
│   │              (score max, excluant les "forbidden")       │       │
│   └───────────────────────────┬─────────────────────────────┘       │
│                               │                                      │
│                               ▼                                      │
│                   ┌─────────────────────┐                           │
│                   │  ROUTINE FINALE     │                           │
│                   │  [Cleanser,         │                           │
│                   │   Treatment,        │                           │
│                   │   Finish]           │                           │
│                   └─────────────────────┘                           │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

### 4.2 Scoring CLEANSER (Étape Laver)

**Critère principal : Type de cuir chevelu**

```
Score = score_scalp_compat + bonus_règle_métier + bonus_compatibilité
```

#### Matrice de compatibilité Cleanser ↔ Cuir Chevelu :

| Produit | Sec | Gras | Normal | Sensible |
|---------|-----|------|--------|----------|
| Ghassoul Atlas | ⚠️ 3 | ✅ 10 | ✅ 7 | ⚠️ 4 |
| Shampoing Base Neutre | ✅ 10 | ✅ 6 | ✅ 7 | ✅ 10 |

**Légende :**
- ✅ `recommended` = Score élevé + bonus +3
- ⚠️ `not_recommended` = Score bas + malus -2
- ❌ `forbidden` = Exclu de la sélection

#### Règle métier experte :

```javascript
CLEANSER_BY_SCALP = {
  'gras': 'ghassoul-atlas-pur',      // Absorbe l'excès de sébum
  'sec': 'shampoing-base-neutre',    // Ultra-doux, sans agression
  'normal': 'shampoing-base-neutre',
  'sensible': 'shampoing-base-neutre'
}
```

---

### 4.3 Scoring TREATMENT (Étape Traiter)

**Critère principal : Préoccupations capillaires (Concerns)**

```
Score = Σ(scores par concern) + score_porosité + bonus_compatibilité
```

#### Matrice de scoring Produit ↔ Concern (1-10) :

| Produit | Chute | Pellicules | Casse | Pousse | Sécheresse | Frisottis | Volume | Brillance |
|---------|-------|------------|-------|--------|------------|-----------|--------|-----------|
| Huile Ricin | **10** | 3 | 7 | **10** | 3 | 3 | 3 | 3 |
| Huile Nigelle | 4 | **10** | 4 | 4 | 4 | 4 | 4 | 4 |
| Huile Avocat | 5 | 5 | **9** | 5 | **10** | 5 | 5 | 5 |
| Protéines Soie | 3 | 3 | **10** | 3 | 3 | 3 | 3 | **8** |
| HE Romarin | **10** | 2 | 2 | **9** | 2 | 2 | 2 | 2 |

#### Règle métier experte :

```javascript
TREATMENT_BY_CONCERN = {
  'chute': ['huile-ricin', 'he-romarin'],     // Stimulent la pousse
  'pousse': ['huile-ricin', 'he-romarin'],
  'pellicules': ['huile-nigelle'],            // Assainit le cuir chevelu
  'casse': ['proteines-soie', 'huile-avocat'], // Renforcent la fibre
  'secheresse': ['huile-avocat', 'gel-aloe-vera'],
  'frisottis': ['huile-argan', 'gel-aloe-vera'],
  'volume': ['ghassoul-atlas-pur'],
  'brillance': ['huile-argan', 'proteines-soie']
}
```

**Exemple de calcul :**

```
Utilisateur choisit : [Chute, Casse]

Huile Ricin :
  score_chute = 10
  score_casse = 7
  TOTAL = 17 → MEILLEUR CHOIX

Huile Avocat :
  score_chute = 5
  score_casse = 9
  TOTAL = 14

Protéines Soie :
  score_chute = 3
  score_casse = 10
  TOTAL = 13
```

---

### 4.4 Scoring FINISH (Étape Sceller)

**Critères principaux : Porosité + Texture**

```
Score = score_porosité + score_texture + bonus_règles_métier - pénalités_interdictions
```

#### 🚫 RÈGLE CRITIQUE : Interdictions

Certaines combinaisons sont **INTERDITES** (score = -100) :

| Porosité | Produits INTERDITS | Raison |
|----------|-------------------|---------|
| Faible | Beurre Karité, Huile Ricin | Trop lourds, cuticules fermées ne peuvent pas absorber |

```javascript
FORBIDDEN_COMBOS = {
  'faible': ['beurre-karite', 'huile-ricin']
}
```

#### Matrice Porosité (Finish) :

| Produit | Faible | Moyenne | Forte |
|---------|--------|---------|-------|
| Huile Pépins Raisin | ✅ 10 | ✅ 7 | ⚠️ 3 |
| Huile Argan | ✅ 9 | ✅ 7 | ✅ 6 |
| Gel Aloe Vera | ✅ 8 | ✅ 7 | ✅ 6 |
| Beurre Karité | ❌ 1 | ✅ 7 | ✅ **10** |
| Huile Avocat | ✅ 5 | ✅ 7 | ✅ **10** |

#### Matrice Texture (Finish) :

| Produit | Lisse (1) | Ondulé (2) | Bouclé (3) | Crépu (4) |
|---------|-----------|------------|------------|-----------|
| Huile Pépins Raisin | ✅ 10 | ✅ 7 | ✅ 7 | ⚠️ 4 |
| Huile Argan | ✅ 9 | ✅ 7 | ✅ **8** | ✅ 6 |
| Gel Aloe Vera | ✅ 6 | ✅ 7 | ✅ **9** | ✅ **8** |
| Beurre Karité | ❌ 1 | ✅ 7 | ✅ 7 | ✅ **10** |

#### Règles métier expertes :

```javascript
// Recommandations par porosité
FINISH_BY_POROSITY = {
  'faible': ['huile-pepins-raisin', 'huile-argan'],  // Huiles légères
  'moyenne': ['huile-argan', 'gel-aloe-vera', 'huile-pepins-raisin'],
  'forte': ['beurre-karite', 'huile-avocat', 'huile-argan']  // Scellage fort
}

// Recommandations par texture
FINISH_BY_TEXTURE = {
  'lisse': ['huile-pepins-raisin', 'huile-argan'],   // Ultra-léger
  'ondule': ['huile-argan', 'gel-aloe-vera'],
  'boucle': ['gel-aloe-vera', 'huile-argan', 'beurre-karite'],
  'crepu': ['beurre-karite', 'huile-avocat', 'gel-aloe-vera']  // Nourrissant
}
```

---

### 4.5 Bonus de Compatibilité

Chaque niveau de compatibilité ajoute un bonus/malus au score :

| Compatibilité | Bonus |
|---------------|-------|
| `recommended` | **+3** |
| `compatible` | 0 |
| `not_recommended` | **-2** |
| `forbidden` | **-10** (exclusion) |

---

## 🧮 5. FORMULE COMPLÈTE

### Cleanser :
```
score_cleanser = score_scalp_compat 
               + (5 si produit = CLEANSER_BY_SCALP[cuir_chevelu])
               + getCompatibilityBonus(compatibility)
```

### Treatment :
```
score_treatment = Σ(score_concern pour chaque concern choisi)
                + score_porosity_compat
                + getCompatibilityBonus(compatibility)
```

### Finish :
```
SI produit IN FORBIDDEN_COMBOS[porosité]:
    RETURN -100 (exclu)

score_finish = score_porosity_compat
             + score_texture_compat
             + (3 si produit IN FINISH_BY_POROSITY[porosité])
             + (3 si produit IN FINISH_BY_TEXTURE[texture])
             + getCompatibilityBonus(compatibility)
```

---

## 📊 6. SÉLECTION FINALE

Pour chaque catégorie (cleanser, treatment, finish) :

1. **Filtrer** les produits de cette catégorie
2. **Calculer** le score de chaque produit
3. **Exclure** les produits `forbidden` ou avec score < -50
4. **Trier** par score décroissant
5. **Sélectionner** le meilleur (score max)

---

## 💰 7. CALCUL DES PRIX

```javascript
totalPrice = cleanser.price + treatment.price + finish.price
discountPercent = 10  // Réduction bundle
discountAmount = totalPrice × 0.10
finalPrice = totalPrice - discountAmount
```

---

## 📈 8. CALCUL DU MATCH SCORE

Le "Match Score" affiché (ex: "Match 92%") :

```javascript
maxPossibleScore = 30  // Score max théorique par produit
totalObtained = cleanser.score + treatment.score + finish.score

// Formule avec plancher à 60% (UX : éviter les scores trop bas)
matchScore = min(100, round((totalObtained / (maxPossibleScore × 3)) × 100) + 60)
```

---

## 🎯 9. EXEMPLES CONCRETS

### Exemple 1 : Cheveux Crépus, Forte Porosité, Cuir Chevelu Gras, Chute + Sécheresse

**Profil :**
- Texture : Crépu (Type 4)
- Porosité : Forte
- Cuir chevelu : Gras
- Concerns : [Chute, Sécheresse]

**Résultat attendu :**

| Étape | Produit | Raison |
|-------|---------|--------|
| LAVER | Ghassoul Atlas | Idéal cuir chevelu gras (score 10) |
| TRAITER | Huile Ricin | Chute=10 + Sécheresse=3 = 13 (meilleur pour chute) |
| SCELLER | Beurre Karité | Porosité forte=10 + Texture crépu=10 = 20 |

---

### Exemple 2 : Cheveux Lisses, Faible Porosité, Cuir Chevelu Sec, Brillance

**Profil :**
- Texture : Lisse (Type 1)
- Porosité : Faible
- Cuir chevelu : Sec
- Concerns : [Brillance]

**Résultat attendu :**

| Étape | Produit | Raison |
|-------|---------|--------|
| LAVER | Shampoing Base Neutre | Idéal cuir chevelu sec (score 10) |
| TRAITER | Huile Argan | Brillance=10 (meilleur score) |
| SCELLER | Huile Pépins de Raisin | Porosité faible=10 + Texture lisse=10 (Karité interdit!) |

⚠️ **Note** : Le Beurre Karité est INTERDIT pour porosité faible, même s'il a un bon score pour brillance.

---

## 📦 10. PRODUITS DISPONIBLES

### Cleansers (Lavants)
| Slug | Nom | Prix |
|------|-----|------|
| `ghassoul-atlas-pur` | Ghassoul de l'Atlas Pur | 75 MAD |
| `shampoing-base-neutre` | Shampoing Base Neutre | 65 MAD |

### Treatments (Soins)
| Slug | Nom | Prix |
|------|-----|------|
| `huile-ricin` | Huile de Ricin Pure | 95 MAD |
| `huile-nigelle` | Huile de Nigelle | 110 MAD |
| `huile-avocat` | Huile d'Avocat Pure | 90 MAD |
| `proteines-soie` | Protéines de Soie | 120 MAD |
| `he-romarin` | HE Romarin à Cinéole | 85 MAD |

### Finishes (Scellants)
| Slug | Nom | Prix |
|------|-----|------|
| `huile-argan` | Huile d'Argan Bio | 135 MAD |
| `huile-pepins-raisin` | Huile Pépins de Raisin | 85 MAD |
| `beurre-karite` | Beurre de Karité Brut | 95 MAD |
| `gel-aloe-vera` | Gel d'Aloe Vera 99% | 70 MAD |

---

## 🔧 11. FICHIERS SOURCES

| Fichier | Rôle |
|---------|------|
| `src/lib/matching-engine.ts` | Algorithme de scoring |
| `src/hooks/useMatchingEngine.ts` | Hook React + chargement données |
| `supabase/migrations/*_hair_care_seed.sql` | Données et matrices de scoring |

---

## 🚀 12. ÉVOLUTIONS FUTURES

- [ ] Pondération des concerns (primaire vs secondaires)
- [ ] Prise en compte du budget utilisateur
- [ ] Recommandation de produits complémentaires (upsell)
- [ ] Personnalisation saisonnière (été = plus léger, hiver = plus nourrissant)
- [ ] Machine Learning sur les conversions

---

*Fin de la spécification fonctionnelle*

