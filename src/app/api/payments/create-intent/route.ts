// ============================================
// KORELAB - API Create Payment Intent
// Crée un PaymentIntent Stripe pour le checkout
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Vérifier que la clé Stripe existe
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export async function POST(request: NextRequest) {
  try {
    // Vérifier la configuration Stripe
    if (!stripeSecretKey) {
      console.error('STRIPE_SECRET_KEY is not configured');
      return NextResponse.json(
        { error: 'Configuration paiement manquante. Contactez le support.' },
        { status: 500 }
      );
    }

    // Initialiser Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-12-15.clover',
    });

    const body = await request.json();
    const { amount, orderId, customerEmail, customerName, metadata } = body;

    // Validation
    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: 'Montant invalide (minimum 1 DH)' },
        { status: 400 }
      );
    }

    if (!orderId) {
      return NextResponse.json(
        { error: 'ID de commande requis' },
        { status: 400 }
      );
    }

    // Créer le PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // en centimes
      currency: 'mad', // Dirham marocain
      metadata: {
        orderId,
        ...metadata,
      },
      receipt_email: customerEmail || undefined,
      description: `Commande KORELAB #${orderId}`,
      // Options supplémentaires
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Erreur création PaymentIntent:', error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    // Erreur générique
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json(
      { error: `Erreur lors de la création du paiement: ${errorMessage}` },
      { status: 500 }
    );
  }
}
