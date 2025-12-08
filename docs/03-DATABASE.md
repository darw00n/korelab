# 🗄 KORELAB - Base de Données

## Vue d'Ensemble

La base de données utilise **PostgreSQL** hébergé sur **Supabase**. Elle est conçue pour supporter le système de recommandation, le catalogue produits, et la gestion des commandes.

---

## 📊 Schéma Entité-Relation

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   categories    │       │    products     │       │    concerns     │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (PK)         │◀──────│ category_id     │       │ id (PK)         │
│ name            │       │ id (PK)         │       │ name            │
│ slug            │       │ name            │       │ slug            │
│ description     │       │ slug            │       │ description     │
│ icon            │       │ description     │       │ icon            │
└─────────────────┘       │ price           │       │ display_order   │
                          │ product_type    │       └─────────────────┘
                          │ is_available    │               │
                          └─────────────────┘               │
                                  │                         │
                                  │                         │
                                  ▼                         ▼
                          ┌─────────────────┐       ┌─────────────────┐
                          │ product_scoring │       │  skin_types     │
                          ├─────────────────┤       ├─────────────────┤
                          │ id (PK)         │       │ id (PK)         │
                          │ product_id (FK) │       │ name            │
                          │ concern_id (FK) │       │ slug            │
                          │ score (1-10)    │       │ description     │
                          └─────────────────┘       │ icon            │
                                                    └─────────────────┘
                                                            │
                                                            ▼
                                                    ┌─────────────────┐
                                                    │product_skin_type│
                                                    ├─────────────────┤
                                                    │ product_id (FK) │
                                                    │ skin_type_id(FK)│
                                                    │ compatibility   │
                                                    └─────────────────┘
```

---

## 📋 Tables Détaillées

### `categories`
Catégories de produits (Nettoyants, Huiles, Actifs, Corps)

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Clé primaire |
| `name` | VARCHAR(100) | Nom affiché |
| `slug` | VARCHAR(100) | URL-friendly, unique |
| `description` | TEXT | Description |
| `icon` | VARCHAR(50) | Nom de l'icône Lucide |
| `created_at` | TIMESTAMP | Auto |

---

### `products`
Catalogue des produits cosmétiques

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Clé primaire |
| `category_id` | UUID (FK) | Référence catégorie |
| `name` | VARCHAR(200) | Nom du produit |
| `slug` | VARCHAR(200) | URL-friendly, unique |
| `description` | TEXT | Description longue |
| `short_description` | VARCHAR(300) | Accroche courte |
| `price` | DECIMAL(10,2) | Prix en MAD |
| `compare_at_price` | DECIMAL(10,2) | Prix barré (nullable) |
| `product_type` | ENUM | `base`, `active`, `oil` |
| `image_url` | VARCHAR(500) | URL image principale |
| `video_url` | VARCHAR(500) | Lien TikTok (nullable) |
| `stock_quantity` | INTEGER | Stock disponible |
| `is_available` | BOOLEAN | Produit actif |
| `tags` | TEXT[] | Tags pour filtrage |
| `created_at` | TIMESTAMP | Auto |
| `updated_at` | TIMESTAMP | Auto (trigger) |

**Types de produits (`product_type`)** :
- `base` : Nettoyants (Ghassoul, Savon Noir)
- `active` : Sérums et actifs (Niacinamide, AHA)
- `oil` : Huiles végétales (Argan, Figue de Barbarie)

---

### `concerns`
Préoccupations beauté sélectionnables

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Clé primaire |
| `name` | VARCHAR(100) | Nom affiché |
| `slug` | VARCHAR(100) | Identifiant unique |
| `description` | TEXT | Description |
| `icon` | VARCHAR(50) | Icône Lucide |
| `display_order` | INTEGER | Ordre d'affichage |

**Concerns actuels** :
1. Acné & Imperfections
2. Rides & Signes de l'âge
3. Teint terne / Manque d'éclat
4. Hydratation / Peau sèche
5. Taches pigmentaires
6. Pores dilatés

---

### `skin_types`
Types de peau pour le diagnostic

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Clé primaire |
| `name` | VARCHAR(50) | Nom (Peau Sèche, Grasse...) |
| `slug` | VARCHAR(50) | Identifiant |
| `description` | VARCHAR(200) | Description courte |
| `icon` | VARCHAR(50) | Icône Lucide |
| `display_order` | INTEGER | Ordre d'affichage |

**Types actuels** :
1. Peau Sèche
2. Peau Grasse
3. Peau Mixte
4. Peau Normale
5. Peau Sensible

---

### `product_scoring`
**Table pivot** - Matrice de scoring produit ↔ concern

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Clé primaire |
| `product_id` | UUID (FK) | Référence produit |
| `concern_id` | UUID (FK) | Référence concern |
| `score` | INTEGER | Score 1-10 |

**Exemple** :
| Produit | Concern | Score |
|---------|---------|-------|
| Ghassoul | Acné | 9 |
| Ghassoul | Pores | 8 |
| Huile Figue | Rides | 10 |
| Niacinamide | Acné | 9 |

---

### `product_skin_type`
**Table pivot** - Compatibilité produit ↔ type de peau

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Clé primaire |
| `product_id` | UUID (FK) | Référence produit |
| `skin_type_id` | UUID (FK) | Référence skin type |
| `compatibility` | ENUM | `recommended`, `compatible`, `not_recommended` |

---

### `orders`
Commandes clients

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Clé primaire |
| `user_id` | UUID (FK) | Référence auth.users |
| `status` | ENUM | `pending`, `confirmed`, `shipped`, `delivered`, `cancelled` |
| `total_amount` | DECIMAL | Total en MAD |
| `discount_amount` | DECIMAL | Réduction appliquée |
| `promo_code_id` | UUID (FK) | Code promo utilisé |
| `shipping_address` | JSONB | Adresse de livraison |
| `phone` | VARCHAR | Téléphone |
| `notes` | TEXT | Notes client |
| `created_at` | TIMESTAMP | Date commande |

---

### `order_items`
Lignes de commande

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Clé primaire |
| `order_id` | UUID (FK) | Référence commande |
| `product_id` | UUID (FK) | Référence produit |
| `quantity` | INTEGER | Quantité |
| `unit_price` | DECIMAL | Prix unitaire au moment de l'achat |

---

### `diagnostic_sessions`
Historique des diagnostics

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Clé primaire |
| `user_id` | UUID (FK) | Utilisateur (nullable si guest) |
| `session_id` | VARCHAR | ID session anonyme |
| `skin_type_id` | UUID (FK) | Type de peau choisi |
| `concern_ids` | UUID[] | Concerns sélectionnés |
| `preference` | ENUM | `diy` ou `ready` |
| `recommended_products` | JSONB | Routine générée |
| `match_score` | INTEGER | Score global |
| `converted_to_order` | BOOLEAN | A commandé ? |
| `created_at` | TIMESTAMP | Date du diagnostic |

---

### `reviews`
Avis clients

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Clé primaire |
| `product_id` | UUID (FK) | Produit évalué |
| `user_id` | UUID (FK) | Auteur |
| `rating` | INTEGER | Note 1-5 |
| `title` | VARCHAR | Titre |
| `content` | TEXT | Contenu |
| `is_verified` | BOOLEAN | Achat vérifié |
| `created_at` | TIMESTAMP | Date |

---

### `promo_codes`
Codes promotionnels

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Clé primaire |
| `code` | VARCHAR | Code (unique) |
| `discount_type` | ENUM | `percentage` ou `fixed` |
| `discount_value` | DECIMAL | Valeur (% ou MAD) |
| `min_order_amount` | DECIMAL | Minimum de commande |
| `max_uses` | INTEGER | Utilisations max |
| `current_uses` | INTEGER | Utilisations actuelles |
| `valid_from` | TIMESTAMP | Début validité |
| `valid_until` | TIMESTAMP | Fin validité |
| `is_active` | BOOLEAN | Actif |

---

## 🔍 Index Importants

```sql
-- Recherche rapide par slug
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_categories_slug ON categories(slug);

-- Filtrage par type
CREATE INDEX idx_products_type ON products(product_type);
CREATE INDEX idx_products_available ON products(is_available);

-- Scoring lookup
CREATE INDEX idx_scoring_product ON product_scoring(product_id);
CREATE INDEX idx_scoring_concern ON product_scoring(concern_id);

-- Commandes utilisateur
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
```

---

## 🔄 Triggers

```sql
-- Mise à jour automatique de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

---

## 📊 Statistiques

| Table | Lignes (seed) |
|-------|---------------|
| categories | 4 |
| skin_types | 5 |
| concerns | 6 |
| products | 8 |
| product_scoring | ~30 |
| product_skin_type | ~20 |

