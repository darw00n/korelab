// ============================================
// KORELAB - Store Zustand pour le Panier
// Gestion du panier avec persistance locale
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  Product, 
  CartItem, 
  PromoCode, 
  RoutineRecommendation 
} from '@/types';

// ===================
// CONSTANTES
// ===================

const ROUTINE_DISCOUNT = 0.10; // 10% sur les routines Skin-Match
const FREE_SHIPPING_THRESHOLD = 300; // Livraison gratuite à partir de 300 MAD
const DEFAULT_SHIPPING = 30; // Frais de port par défaut

// ===================
// TYPES DU STORE
// ===================

interface CartState {
  items: CartItem[];
  promoCode: PromoCode | null;
  isFromDiagnostic: boolean; // Pour appliquer la réduction -10%
}

interface CartComputed {
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  total: number;
  itemCount: number;
}

interface CartActions {
  // Gestion des articles
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Code promo
  applyPromoCode: (code: PromoCode) => void;
  removePromoCode: () => void;
  
  // Action spéciale Skin-Match
  addRoutineToCart: (routine: RoutineRecommendation) => void;
  
  // Computed values
  getComputedValues: () => CartComputed;
}

type CartStore = CartState & CartActions;

// ===================
// ÉTAT INITIAL
// ===================

const initialState: CartState = {
  items: [],
  promoCode: null,
  isFromDiagnostic: false,
};

// ===================
// CRÉATION DU STORE AVEC PERSISTANCE
// ===================

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // ─────────────────────────────────────────
      // GESTION DES ARTICLES
      // ─────────────────────────────────────────

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            item => item.product.id === product.id
          );

          if (existingItem) {
            // Augmenter la quantité si déjà dans le panier
            return {
              items: state.items.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          // Ajouter un nouvel article
          return {
            items: [...state.items, { product, quantity }],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set(initialState),

      // ─────────────────────────────────────────
      // CODE PROMO
      // ─────────────────────────────────────────

      applyPromoCode: (code) => set({ promoCode: code }),

      removePromoCode: () => set({ promoCode: null }),

      // ─────────────────────────────────────────
      // ACTION SPÉCIALE SKIN-MATCH
      // Ajoute toute la routine au panier avec réduction
      // ─────────────────────────────────────────

      addRoutineToCart: (routine) => {
        set((state) => {
          // Vider le panier avant d'ajouter la routine
          const newItems: CartItem[] = [];

          if (routine.cleanser) {
            newItems.push({ product: routine.cleanser, quantity: 1 });
          }
          if (routine.activeIngredient) {
            newItems.push({ product: routine.activeIngredient, quantity: 1 });
          }
          if (routine.oil) {
            newItems.push({ product: routine.oil, quantity: 1 });
          }

          return {
            items: newItems,
            isFromDiagnostic: true, // Activer la réduction -10%
            promoCode: null, // Reset le code promo
          };
        });
      },

      // ─────────────────────────────────────────
      // COMPUTED VALUES
      // ─────────────────────────────────────────

      getComputedValues: () => {
        const { items, promoCode, isFromDiagnostic } = get();

        // Sous-total
        const subtotal = items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        // Réduction
        let discountAmount = 0;

        // Réduction Skin-Match (-10%)
        if (isFromDiagnostic) {
          discountAmount = Math.round(subtotal * ROUTINE_DISCOUNT);
        }

        // Code promo (cumulable ou non selon les règles)
        if (promoCode && subtotal >= promoCode.minimum_order) {
          if (promoCode.discount_type === 'percentage') {
            discountAmount += Math.round(subtotal * (promoCode.discount_value / 100));
          } else {
            discountAmount += promoCode.discount_value;
          }
        }

        // Frais de port
        const afterDiscount = subtotal - discountAmount;
        const shippingCost = afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING;

        // Total
        const total = Math.max(0, afterDiscount + shippingCost);

        // Nombre d'articles
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

        return {
          subtotal,
          discountAmount,
          shippingCost,
          total,
          itemCount,
        };
      },
    }),
    {
      name: 'korelab-cart', // Clé localStorage
      partialize: (state) => ({
        items: state.items,
        isFromDiagnostic: state.isFromDiagnostic,
      }),
    }
  )
);

// ===================
// SELECTORS
// ===================

export const selectCartItems = (state: CartStore) => state.items;
export const selectItemCount = (state: CartStore) => 
  state.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectIsFromDiagnostic = (state: CartStore) => state.isFromDiagnostic;

