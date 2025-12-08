# 🌿 KORELAB - Vue d'Ensemble (HAIR CARE EDITION)

## Qu'est-ce que Korelab ?

**Korelab** est une plateforme e-commerce mobile-first spécialisée dans les **soins capillaires naturels marocains**. Elle intègre un système de recommandation intelligent appelé **"Hair-Match"** qui analyse le profil capillaire de l'utilisateur (texture, porosité, cuir chevelu) pour proposer une routine personnalisée.

---

## 🎯 Positionnement

> **"Le Aroma-Zone du Maroc pour les cheveux"**

Korelab cible le marché marocain avec :
- Des produits authentiques (Ghassoul, Huile de Ricin, Nigelle, Argan...)
- Une expérience mobile optimisée (4G)
- Un système de paiement adapté (Cash on Delivery)
- Une approche éducative (test de porosité, méthode LOC/LCO)

---

## ✨ Fonctionnalités Principales

### 1. Diagnostic Hair-Match (IA)
- Quiz interactif en **4 étapes** :
  1. **Texture** : Type 1 (Lisse) à Type 4 (Crépu)
  2. **Cuir Chevelu** : Sec, Gras, Normal, Sensible
  3. **Porosité** : Faible, Moyenne, Forte (avec test éducatif)
  4. **Préoccupations** : Chute, Pellicules, Casse, Sécheresse...
- Recommandation de **3 produits** : CLEANSE → TREAT → SEAL
- Score de compatibilité et explications scientifiques

### 2. Catalogue Produits Capillaires
- Catégories : Lavants, Huiles, Beurres, Actifs
- Filtrage par texture, porosité, concern
- Fiches produits avec notes d'expert

### 3. Science Explainer
- Explication de la porosité
- Méthode LOC/LCO personnalisée
- Pourquoi chaque produit est recommandé

### 4. Panier & Commande
- Routine complète avec -10% de réduction
- Paiement à la livraison (COD)

---

## 🛠 Stack Technique

| Couche | Technologie |
|--------|-------------|
| **Frontend** | Next.js 14+ (App Router) |
| **Langage** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **State** | Zustand |
| **Backend** | Supabase (PostgreSQL) |
| **Icônes** | Lucide React |

---

## 📱 Design System

### Palette de Couleurs

| Nom | Hex | Usage |
|-----|-----|-------|
| **Primary** | `#B45309` (Amber-700) | CTAs, accents, liens |
| **Secondary** | `#78716C` (Stone-500) | Textes, bordures |
| **Background** | `#FAFAF9` (Stone-50) | Fond principal |
| **Accent** | `#15803D` (Green-700) | Succès, badges bio |

### Typographie

- **Titres** : Playfair Display (serif élégant)
- **Corps** : Inter (sans-serif lisible)

---

## 🧪 Diagnostic Hair-Match - Étapes

```
┌─────────────────────────────────────────────────────────────┐
│ 1. TEXTURE                                                  │
│    "Quelle est ta texture ?"                                │
│    [Lisse] [Ondulé] [Bouclé] [Crépu]                       │
├─────────────────────────────────────────────────────────────┤
│ 2. CUIR CHEVELU                                             │
│    "Comment se sent ton cuir chevelu après 2 jours ?"       │
│    [Sec] [Gras] [Normal] [Sensible]                        │
├─────────────────────────────────────────────────────────────┤
│ 3. POROSITÉ (avec test du verre d'eau)                      │
│    "Ta capacité à absorber l'eau"                           │
│    [Flotte = Faible] [Milieu = Moyenne] [Coule = Forte]    │
├─────────────────────────────────────────────────────────────┤
│ 4. PRÉOCCUPATIONS                                           │
│    "Que veux-tu améliorer ?"                                │
│    [Chute] [Pellicules] [Casse] [Sécheresse] [...]         │
└─────────────────────────────────────────────────────────────┘
```

---

## 💇 Routine en 3 Étapes

| Étape | Anglais | Description | Exemple Produit |
|-------|---------|-------------|-----------------|
| **LAVER** | CLEANSE | Nettoyer le cuir chevelu | Ghassoul, Shampoing doux |
| **TRAITER** | TREAT | Cibler les problèmes | Huile de Ricin, Nigelle |
| **SCELLER** | SEAL | Retenir l'hydratation | Beurre de Karité, Argan |

---

## 🔬 Règles Expertes de l'Algorithme

### Par Porosité
- **Faible** : Huiles légères (Pépins de Raisin, Argan) • ❌ Karité interdit
- **Moyenne** : Tout compatible • Routine LOC classique
- **Forte** : Scellants lourds (Karité, Avocat) • Protéines recommandées

### Par Cuir Chevelu
- **Gras** → Ghassoul (détox)
- **Sec/Sensible** → Shampoing doux

### Par Concern
- **Chute** → Ricin + Romarin
- **Pellicules** → Nigelle
- **Casse** → Protéines + Avocat

---

## 📈 Métriques Clés (KPIs)

- **Taux de complétion** du diagnostic
- **Taux de conversion** diagnostic → panier
- **Panier moyen**
- **Score de compatibilité** moyen
- **Temps de chargement** (< 3s sur 4G)
