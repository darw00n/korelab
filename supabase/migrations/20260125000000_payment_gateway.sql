-- ============================================
-- KORELAB - Migration: Payment Gateway
-- Date: 2026-01-25
-- Ajoute les champs pour la gestion des paiements
-- ============================================

-- ===================
-- 1. AMÉLIORATION TABLE ORDERS
-- ===================
-- Ajouter les colonnes pour les paiements

ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50) DEFAULT 'cash_on_delivery',
ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS payment_intent_id VARCHAR(100),
ADD COLUMN IF NOT EXISTS payment_error TEXT,
ADD COLUMN IF NOT EXISTS paid_at TIMESTAMP WITH TIME ZONE;

COMMENT ON COLUMN public.orders.payment_method IS 'Méthode de paiement: card, cash_on_delivery';
COMMENT ON COLUMN public.orders.payment_status IS 'Statut paiement: pending, processing, succeeded, failed, refunded';
COMMENT ON COLUMN public.orders.payment_intent_id IS 'ID du PaymentIntent Stripe (pour carte)';
COMMENT ON COLUMN public.orders.payment_error IS 'Message d''erreur en cas d''échec de paiement';
COMMENT ON COLUMN public.orders.paid_at IS 'Date du paiement effectif';

-- ===================
-- 2. INDEX POUR PERFORMANCE
-- ===================
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_intent ON public.orders(payment_intent_id) WHERE payment_intent_id IS NOT NULL;

-- ===================
-- 3. ENUM TYPES (pour référence)
-- ===================
-- Les valeurs acceptées:
-- payment_method: 'card', 'cash_on_delivery'
-- payment_status: 'pending', 'processing', 'succeeded', 'failed', 'refunded'
-- status (order): 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'

-- ===================
-- FIN MIGRATION PAYMENT GATEWAY
-- ===================
