// ============================================
// KORELAB - Types Database (HAIR CARE EDITION)
// Types générés/alignés avec le schéma Supabase
// ============================================

// ===================
// DATABASE TYPE (pour Supabase client)
// ===================

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Database {
  public: {
    Tables: Record<string, unknown>;
    Views: Record<string, unknown>;
    Functions: Record<string, unknown>;
  };
}

// ===================
// ENUMS
// ===================

export type ProductType = 'cleanser' | 'treatment' | 'finish';

export type ProductSubtype = 
  | 'shampoo' 
  | 'clay_powder' 
  | 'co_wash' 
  | 'mask' 
  | 'oil' 
  | 'butter' 
  | 'serum' 
  | 'active' 
  | 'gel' 
  | 'leave_in'
  | 'hydrolat'
  | 'macerat'
  | 'essential_oil';

export type Compatibility = 'recommended' | 'compatible' | 'not_recommended' | 'forbidden';

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

// ===================
// TABLES DE RÉFÉRENCE
// ===================

export interface HairTexture {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  display_order: number;
  created_at: string;
}

export interface HairPorosity {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  care_tip: string | null;
  icon: string | null;
  display_order: number;
  created_at: string;
}

export interface ScalpType {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  display_order: number;
  created_at: string;
}

export interface Concern {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  display_order: number;
  created_at: string;
}

// ===================
// PRODUITS
// ===================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number;
  compare_at_price: number | null;
  product_type: ProductType;
  product_subtype: ProductSubtype;
  image_url: string | null;
  video_url: string | null;
  stock_quantity: number;
  is_available: boolean;
  usage_instructions: string | null;
  expert_note: string | null;
  tags: string[] | null;
  safety_warning: string | null;
  is_pregnancy_safe: boolean;
  created_at: string;
  updated_at: string;
}

// ===================
// SCORING & COMPATIBILITÉ
// ===================

export interface ProductConcernScoring {
  id: string;
  product_id: string;
  concern_id: string;
  score: number; // 1-10
  created_at: string;
}

export interface ProductTextureCompat {
  id: string;
  product_id: string;
  texture_id: string;
  compatibility: Compatibility;
  score: number | null;
  created_at: string;
}

export interface ProductPorosityCompat {
  id: string;
  product_id: string;
  porosity_id: string;
  compatibility: Compatibility;
  score: number | null;
  created_at: string;
}

export interface ProductScalpCompat {
  id: string;
  product_id: string;
  scalp_type_id: string;
  compatibility: Compatibility;
  score: number | null;
  created_at: string;
}

// ===================
// DIAGNOSTIC & ROUTINE
// ===================

export interface HairProfile {
  textureId: string;
  porosityId: string;
  scalpTypeId: string;
  concernIds: string[];
}

export interface ScoredProduct extends Product {
  score: number;
  step: 'cleanser' | 'treatment' | 'finish';
  reason: string; // Pourquoi ce produit a été choisi
  compatibility: Compatibility;
}

export interface HairRoutineRecommendation {
  products: ScoredProduct[];
  additionalProducts?: ScoredProduct[]; // Produits complémentaires recommandés
  totalPrice: number;
  discountPercent: number;
  discountAmount: number;
  finalPrice: number;
  matchScore: number; // Pourcentage global de compatibilité
  generatedAt: string;
  profile: {
    texture: string;
    porosity: string;
    scalpType: string;
    concerns: string[];
  };
}

// ===================
// SESSIONS DIAGNOSTIC
// ===================

export interface DiagnosticSession {
  id: string;
  user_id: string | null;
  session_id: string | null;
  texture_id: string | null;
  porosity_id: string | null;
  scalp_type_id: string | null;
  concern_ids: string[] | null;
  recommended_products: HairRoutineRecommendation | null;
  match_score: number | null;
  converted_to_order: boolean;
  created_at: string;
}

// ===================
// WIZARD STEPS
// ===================

export type DiagnosticStep = 
  | 'intro' 
  | 'texture' 
  | 'porosity' 
  | 'scalp' 
  | 'concerns' 
  | 'loading'
  | 'results';

export interface DiagnosticAnswers {
  textureId?: string;
  porosityId?: string;
  scalpTypeId?: string;
  concernIds?: string[];
}

// ===================
// COMMANDES
// ===================

export interface Order {
  id: string;
  user_id: string | null;
  status: OrderStatus;
  total_amount: number;
  discount_amount: number;
  shipping_amount: number;
  promo_code: string | null;
  shipping_address: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode?: string;
  } | null;
  phone: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  created_at: string;
}

// ===================
// AVIS
// ===================

export interface Review {
  id: string;
  product_id: string;
  user_id: string | null;
  rating: number; // 1-5
  title: string | null;
  content: string | null;
  reviewer_texture: string | null;
  reviewer_porosity: string | null;
  is_verified: boolean;
  created_at: string;
}

// ===================
// PROFILS UTILISATEURS
// ===================

export interface UserProfile {
  id: string; // Same as auth.users.id
  full_name: string | null;
  phone: string | null;
  phone_verified: boolean;
  default_address: {
    street: string;
    city: string;
    postal_code?: string;
    country?: string;
  } | null;
  city: string | null;
  preferred_language: string;
  accepts_marketing: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserHairProfile {
  id: string;
  user_id: string;
  texture_id: string | null;
  porosity_id: string | null;
  scalp_type_id: string | null;
  concern_ids: string[] | null;
  name: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ===================
// AUTHENTIFICATION
// ===================

export interface AuthUser {
  id: string;
  email: string | null;
  phone: string | null;
  created_at: string;
  profile?: UserProfile | null;
  hairProfile?: UserHairProfile | null;
}

export type AuthState = 
  | 'loading'
  | 'unauthenticated'
  | 'awaiting_verification'
  | 'authenticated';

// ===================
// HISTORIQUE DIAGNOSTIC
// ===================

export interface DiagnosticHistoryItem extends DiagnosticSession {
  name: string | null;
  is_complete: boolean;
  completed_at: string | null;
}
