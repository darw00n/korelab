# 🏗 KORELAB - Architecture Technique

## Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│                    (Next.js 14 App Router)                   │
├─────────────────────────────────────────────────────────────┤
│  Pages          │  Components      │  Hooks & State          │
│  ─────          │  ──────────      │  ────────────           │
│  /              │  MobileShell     │  useDiagnosticStore     │
│  /diagnostic    │  DiagnosticWiz   │  useMatchingEngine      │
│  /products      │  RoutineReveal   │  useCartStore           │
│  /cart          │  ProductCard     │                         │
│  /account       │  SelectableCard  │                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        SUPABASE                              │
├─────────────────────────────────────────────────────────────┤
│  PostgreSQL     │  Auth            │  Storage                │
│  ──────────     │  ────            │  ───────                │
│  products       │  Users           │  Product Images         │
│  concerns       │  Sessions        │  User Avatars           │
│  skin_types     │  JWT Tokens      │                         │
│  orders         │                  │                         │
│  product_scoring│                  │                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Structure des Fichiers

```
Korelab/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Layout racine (fonts, metadata)
│   │   ├── page.tsx              # Page d'accueil
│   │   ├── diagnostic/
│   │   │   └── page.tsx          # Page du diagnostic
│   │   ├── products/
│   │   │   └── page.tsx          # Catalogue produits
│   │   └── globals.css           # Styles globaux + Tailwind
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   └── MobileShell.tsx   # Layout mobile (header + navbar)
│   │   ├── diagnostic/
│   │   │   ├── DiagnosticWizard.tsx    # Orchestrateur du quiz
│   │   │   ├── RoutineReveal.tsx       # Page résultats
│   │   │   └── steps/
│   │   │       ├── StepIntro.tsx       # Étape 1: Introduction
│   │   │       ├── StepSkinType.tsx    # Étape 2: Type de peau
│   │   │       ├── StepConcerns.tsx    # Étape 3: Préoccupations
│   │   │       ├── StepPreference.tsx  # Étape 4: DIY vs Ready
│   │   │       └── StepLoading.tsx     # Animation de chargement
│   │   └── ui/
│   │       ├── SelectableCard.tsx      # Carte cliquable
│   │       └── ProgressBar.tsx         # Barre de progression
│   │
│   ├── lib/
│   │   ├── supabase.ts           # Client Supabase
│   │   └── matching-engine.ts    # Algorithme de recommandation
│   │
│   ├── hooks/
│   │   └── useMatchingEngine.ts  # Hook pour le moteur IA
│   │
│   ├── store/
│   │   └── diagnosticStore.ts    # État global Zustand
│   │
│   └── types/
│       ├── index.ts              # Types métier
│       └── database.types.ts     # Types Supabase (auto-générés)
│
├── database/
│   ├── schema.sql                # Schéma PostgreSQL
│   ├── seed.sql                  # Données initiales
│   └── fix-encoding.sql          # Corrections UTF-8
│
├── public/
│   └── images/                   # Assets statiques
│
├── docs/                         # Documentation
│
├── tailwind.config.ts            # Config Tailwind + Design System
├── next.config.mjs               # Config Next.js
├── .env.local                    # Variables d'environnement
└── package.json
```

---

## 🔄 Flux de Données

### 1. Chargement Initial

```
┌──────────┐     ┌────────────────┐     ┌──────────┐
│  Page    │────▶│ useMatching    │────▶│ Supabase │
│  Load    │     │ Engine Hook    │     │ Query    │
└──────────┘     └────────────────┘     └──────────┘
                        │
                        ▼
              ┌──────────────────┐
              │ Zustand Store    │
              │ (skinTypes,      │
              │  concerns,       │
              │  products)       │
              └──────────────────┘
```

### 2. Flux du Diagnostic

```
User Input          Zustand Store         Matching Engine
    │                    │                      │
    │  Select SkinType   │                      │
    │───────────────────▶│                      │
    │                    │                      │
    │  Select Concerns   │                      │
    │───────────────────▶│                      │
    │                    │                      │
    │  Select Preference │                      │
    │───────────────────▶│                      │
    │                    │                      │
    │  Click "Découvrir" │   generateRoutine()  │
    │───────────────────▶│─────────────────────▶│
    │                    │                      │
    │                    │◀─────────────────────│
    │                    │  RoutineRecommendation
    │                    │                      │
    │◀───────────────────│                      │
    │   Display Results  │                      │
```

---

## 🧩 Composants Principaux

### DiagnosticWizard

**Responsabilités :**
- Orchestrer les étapes du quiz
- Gérer les animations de transition
- Déclencher le calcul de la routine
- Afficher loading/error states

**État géré :**
- `currentStep` : Étape actuelle
- `direction` : Direction de l'animation
- `hasCalculated` : Flag anti-boucle

### MobileShell

**Responsabilités :**
- Layout responsive mobile-first
- Header avec logo et panier
- Bottom Navigation Bar fixe
- Zone de contenu scrollable

### RoutineReveal

**Responsabilités :**
- Afficher les produits recommandés
- Calculer et afficher le score de match
- Sticky footer avec prix et CTA
- Animations d'entrée séquentielles

---

## 🔐 Sécurité

### Variables d'Environnement

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...  # Clé publique (client)
SUPABASE_SERVICE_ROLE_KEY=eyJ...       # Clé privée (serveur only)
```

### Row Level Security (RLS)

```sql
-- Exemple: Les utilisateurs ne voient que leurs commandes
CREATE POLICY "Users can view own orders" ON orders
    FOR SELECT USING (auth.uid() = user_id);
```

---

## ⚡ Performance

### Optimisations Appliquées

1. **Code Splitting** : Chaque page est lazy-loaded
2. **Image Optimization** : Next.js Image avec lazy loading
3. **State Minimal** : Zustand pour éviter re-renders
4. **Memoization** : `useCallback` sur handlers fréquents
5. **Animations GPU** : Transform/opacity uniquement

### Cibles de Performance

| Métrique | Cible | Actuel |
|----------|-------|--------|
| FCP | < 1.5s | ✅ |
| LCP | < 2.5s | ✅ |
| CLS | < 0.1 | ✅ |
| TTI | < 3.5s | ✅ |

---

## 🧪 Testing Strategy

```
┌─────────────────────────────────────────┐
│           E2E Tests (Playwright)        │
│         Parcours utilisateur complet    │
├─────────────────────────────────────────┤
│        Integration Tests (Vitest)       │
│      Hooks, Store, API calls            │
├─────────────────────────────────────────┤
│          Unit Tests (Vitest)            │
│     Matching Engine, Utilities          │
└─────────────────────────────────────────┘
```

