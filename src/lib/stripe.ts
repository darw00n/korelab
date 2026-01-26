// ============================================
// KORELAB - Configuration Stripe
// ============================================

import { loadStripe, Stripe } from '@stripe/stripe-js';

// Clé publique Stripe (côté client)
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

let stripePromise: Promise<Stripe | null>;

/**
 * Récupère l'instance Stripe (côté client uniquement)
 */
export const getStripe = () => {
  if (!stripePromise && stripePublishableKey) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  return stripePromise;
};

/**
 * Types pour les paiements
 */
export type PaymentMethod = 'card' | 'cash_on_delivery';

export interface PaymentIntent {
  id: string;
  client_secret: string;
  amount: number;
  currency: string;
  status: string;
}

export interface CreatePaymentIntentRequest {
  amount: number; // en centimes (DH * 100)
  currency?: string;
  orderId: string;
  customerEmail?: string;
  customerName?: string;
  metadata?: Record<string, string>;
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}
