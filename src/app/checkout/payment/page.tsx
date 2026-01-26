'use client';

// ============================================
// KORELAB - Page Paiement Stripe
// Formulaire de paiement sécurisé
// ============================================

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { MobileShell } from '@/components/layout/MobileShell';
import { supabase } from '@/lib/supabase';
import { useCartStore } from '@/store/cartStore';

// Charger Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

// ===================
// COMPOSANT FORMULAIRE DE PAIEMENT
// ===================

interface PaymentFormProps {
  orderId: string;
  onSuccess: () => void;
  onError: (message: string) => void;
}

function PaymentForm({ orderId, onSuccess, onError }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success?orderId=${orderId}`,
        },
        redirect: 'if_required',
      });

      if (error) {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setMessage(error.message || 'Une erreur est survenue');
          onError(error.message || 'Erreur de paiement');
        } else {
          setMessage('Une erreur inattendue est survenue');
          onError('Erreur inattendue');
        }
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Mettre à jour la commande
        await supabase
          .from('orders')
          .update({
            payment_status: 'succeeded',
            status: 'confirmed',
            paid_at: new Date().toISOString(),
          })
          .eq('id', orderId);
        
        onSuccess();
      }
    } catch (err) {
      console.error('Erreur paiement:', err);
      setMessage('Erreur lors du traitement du paiement');
      onError('Erreur de traitement');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement
        options={{
          layout: 'tabs',
        }}
      />

      {message && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <p className="font-sans text-sm text-red-700">{message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            TRAITEMENT EN COURS...
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            CONFIRMER LE PAIEMENT
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-text-muted">
        <Lock className="w-3 h-3" />
        <span className="font-sans text-xs">Paiement sécurisé par Stripe</span>
      </div>
    </form>
  );
}

// ===================
// CONTENU DE LA PAGE
// ===================

function PaymentPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCartStore();
  
  const clientSecret = searchParams.get('secret');
  const orderId = searchParams.get('orderId');
  
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Si pas de secret, rediriger
  useEffect(() => {
    if (!clientSecret || !orderId) {
      router.push('/checkout');
    }
  }, [clientSecret, orderId, router]);

  const handleSuccess = () => {
    clearCart();
    setPaymentSuccess(true);
  };

  const handleError = (message: string) => {
    console.error('Erreur paiement:', message);
  };

  // Écran de succès
  if (paymentSuccess) {
    return (
      <MobileShell showHeader={false} showBottomNav={false}>
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mb-6"
          >
            <CheckCircle className="w-10 h-10 text-success-700" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono font-bold text-xl uppercase tracking-wider text-science-900 mb-2"
          >
            PAIEMENT ACCEPTÉ !
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-sm text-text-secondary mb-6"
          >
            Votre commande a été confirmée. Nous vous contacterons bientôt.
          </motion.p>
          
          {orderId && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-mono text-xs text-text-muted mb-8"
            >
              Commande #{orderId.slice(0, 8).toUpperCase()}
            </motion.p>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3 w-full max-w-xs"
          >
            <button 
              onClick={() => router.push('/profil')}
              className="btn-primary w-full py-3"
            >
              VOIR MES COMMANDES
            </button>
            <button 
              onClick={() => router.push('/')}
              className="btn-secondary w-full py-3"
            >
              RETOUR À L'ACCUEIL
            </button>
          </motion.div>
        </div>
      </MobileShell>
    );
  }

  if (!clientSecret || !orderId) {
    return (
      <MobileShell showHeader={false} showBottomNav={false}>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-science-900 animate-spin" />
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell showHeader={false} showBottomNav={false}>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
          <div className="px-4 py-3">
            <button
              onClick={() => router.push('/checkout')}
              className="inline-flex items-center gap-2 text-text-secondary hover:text-science-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-mono text-sm uppercase tracking-wider">Retour</span>
            </button>
          </div>
        </header>

        <div className="px-4 py-6">
          <h1 className="font-mono font-bold text-lg uppercase tracking-wider text-science-900 mb-6">
            Paiement Sécurisé
          </h1>

          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: 'stripe',
                variables: {
                  colorPrimary: '#0F172A',
                  colorBackground: '#FFFFFF',
                  colorText: '#0F172A',
                  colorDanger: '#DC2626',
                  fontFamily: 'ui-monospace, monospace',
                  borderRadius: '6px',
                },
              },
            }}
          >
            <PaymentForm
              orderId={orderId}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </Elements>
        </div>
      </div>
    </MobileShell>
  );
}

// ===================
// PAGE PRINCIPALE AVEC SUSPENSE
// ===================

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <MobileShell showHeader={false} showBottomNav={false}>
          <div className="min-h-screen bg-white flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-science-900 animate-spin" />
          </div>
        </MobileShell>
      }
    >
      <PaymentPageContent />
    </Suspense>
  );
}
