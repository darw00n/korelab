'use client';

// ============================================
// KORELAB - Page Checkout avec Gateway de Paiement
// Carte bancaire (Stripe) ou Cash on Delivery
// ============================================

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Truck, 
  Loader2, 
  CheckCircle, 
  CreditCard,
  Banknote,
  Shield,
  Lock
} from 'lucide-react';
import { MobileShell } from '@/components/layout/MobileShell';
import { useCartStore } from '@/store/cartStore';
import { useTranslation } from '@/lib/i18n/context';
import { getProductImageUrl } from '@/lib/product-images';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase';

// Types
type PaymentMethod = 'card' | 'cash_on_delivery';
type CheckoutStep = 'info' | 'payment' | 'processing' | 'success';

export default function CheckoutPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { items, getComputedValues, clearCart } = useCartStore();
  const { subtotal, discountAmount, shippingCost, total } = getComputedValues();
  const { user } = useAuthStore();

  // États
  const [step, setStep] = useState<CheckoutStep>('info');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash_on_delivery');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    countryCode: '+212',
    city: '',
    address: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Liste des pays pour le téléphone
  const countryCodes = [
    { code: '+212', country: 'Maroc', flag: '🇲🇦' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+34', country: 'Espagne', flag: '🇪🇸' },
    { code: '+39', country: 'Italie', flag: '🇮🇹' },
    { code: '+49', country: 'Allemagne', flag: '🇩🇪' },
    { code: '+32', country: 'Belgique', flag: '🇧🇪' },
    { code: '+41', country: 'Suisse', flag: '🇨🇭' },
    { code: '+213', country: 'Algérie', flag: '🇩🇿' },
    { code: '+216', country: 'Tunisie', flag: '🇹🇳' },
    { code: '+966', country: 'Arabie Saoudite', flag: '🇸🇦' },
    { code: '+971', country: 'EAU', flag: '🇦🇪' },
  ];

  // Pré-remplir avec les données du profil
  useEffect(() => {
    if (user?.profile) {
      setFormData({
        name: user.profile.full_name || '',
        phone: user.phone || user.profile.phone || '',
        countryCode: '+212',
        city: user.profile.city || '',
        address: user.profile.default_address?.street || '',
        email: user.email || '',
      });
    }
  }, [user]);

  // Créer la commande dans Supabase
  const createOrder = async (): Promise<string> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: orderData, error: orderError } = await (supabase as any)
      .from('orders')
      .insert({
        user_id: user?.id || null,
        status: 'pending',
        total_amount: total,
        discount_amount: discountAmount,
        shipping_amount: shippingCost,
        shipping_address: {
          street: formData.address,
          city: formData.city,
          firstName: formData.name.split(' ')[0],
          lastName: formData.name.split(' ').slice(1).join(' '),
        },
        phone: `${formData.countryCode}${formData.phone.replace(/^0+/, '')}`,
        payment_method: paymentMethod,
        payment_status: 'pending',
      })
      .select()
      .single();
    
    if (orderError) throw orderError;
    
    // Créer les lignes de commande
    const orderItems = items.map(item => ({
      order_id: orderData.id,
      product_id: item.product.id,
      quantity: item.quantity,
      unit_price: item.product.price,
    }));
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: itemsError } = await (supabase as any)
      .from('order_items')
      .insert(orderItems);
    
    if (itemsError) throw itemsError;
    
    return orderData.id;
  };

  // Mettre à jour le profil utilisateur
  const updateUserProfile = async () => {
    if (!user?.id) return;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from('profiles')
      .update({
        full_name: formData.name,
        phone: formData.phone,
        city: formData.city,
        default_address: {
          street: formData.address,
          city: formData.city,
        },
      })
      .eq('id', user.id);
  };

  // Gérer le paiement Cash on Delivery
  const handleCashOnDelivery = async () => {
    setIsSubmitting(true);
    setError(null);
    setStep('processing');
    
    try {
      const newOrderId = await createOrder();
      
      // Confirmer la commande COD
      await fetch('/api/payments/confirm-cod', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: newOrderId }),
      });
      
      await updateUserProfile();
      
      setOrderId(newOrderId);
      clearCart();
      setStep('success');
    } catch (err) {
      console.error('Erreur commande COD:', err);
      setError('Erreur lors de la création de la commande. Veuillez réessayer.');
      setStep('payment');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Gérer le paiement par carte (Stripe)
  const handleCardPayment = async () => {
    setIsSubmitting(true);
    setError(null);
    setStep('processing');
    
    try {
      const newOrderId = await createOrder();
      setOrderId(newOrderId);
      
      // Créer le PaymentIntent
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total * 100, // En centimes
          orderId: newOrderId,
          customerEmail: formData.email || user?.email,
          customerName: formData.name,
        }),
      });
      
      // Vérifier le content-type de la réponse
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Erreur serveur. Veuillez réessayer ou utiliser le paiement à la livraison.');
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erreur paiement');
      }
      
      const { clientSecret } = data;
      
      if (!clientSecret) {
        throw new Error('Erreur de configuration du paiement. Veuillez utiliser le paiement à la livraison.');
      }
      
      // Rediriger vers la page de paiement Stripe
      router.push(`/checkout/payment?secret=${clientSecret}&orderId=${newOrderId}`);
      
    } catch (err: any) {
      console.error('Erreur paiement carte:', err);
      setError(err.message || 'Erreur lors du paiement. Veuillez réessayer.');
      setStep('payment');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Valider le formulaire d'info
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Le nom est obligatoire';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Le téléphone est obligatoire';
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      errors.phone = 'Numéro de téléphone invalide';
    }
    
    if (!formData.city.trim()) {
      errors.city = 'La ville est obligatoire';
    }
    
    if (!formData.address.trim()) {
      errors.address = 'L\'adresse est obligatoire';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Soumettre le formulaire d'info
  const handleInfoSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (validateForm()) {
      setStep('payment');
    }
  };

  // Soumettre le paiement
  const handlePaymentSubmit = () => {
    if (paymentMethod === 'cash_on_delivery') {
      handleCashOnDelivery();
    } else {
      handleCardPayment();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Écran de succès
  if (step === 'success') {
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
            COMMANDE CONFIRMÉE !
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-sm text-text-secondary mb-2"
          >
            {paymentMethod === 'cash_on_delivery' 
              ? 'Vous paierez à la livraison.'
              : 'Votre paiement a été accepté.'}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="font-sans text-sm text-text-secondary mb-6"
          >
            Nous vous contacterons pour confirmer la livraison.
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
            <Link href="/profil" className="btn-primary w-full py-3 block text-center">
              VOIR MES COMMANDES
            </Link>
            <Link href="/" className="btn-secondary w-full py-3 block text-center">
              RETOUR À L'ACCUEIL
            </Link>
          </motion.div>
        </div>
      </MobileShell>
    );
  }

  // Écran de traitement
  if (step === 'processing') {
    return (
      <MobileShell showHeader={false} showBottomNav={false}>
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
          <Loader2 className="w-12 h-12 text-science-900 animate-spin mb-6" />
          <p className="font-mono text-sm uppercase tracking-wider text-science-900">
            TRAITEMENT EN COURS...
          </p>
        </div>
      </MobileShell>
    );
  }

  // Panier vide
  if (items.length === 0) {
    return (
      <MobileShell showHeader={true} showBottomNav={true}>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <p className="font-mono text-sm uppercase tracking-wider text-text-secondary mb-4">
            PANIER VIDE
          </p>
          <Link href="/shop" className="btn-primary">
            VOIR LES PRODUITS
          </Link>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell showHeader={false} showBottomNav={false}>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => step === 'payment' ? setStep('info') : router.push('/panier')}
              className="inline-flex items-center gap-2 text-text-secondary hover:text-science-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-mono text-sm uppercase tracking-wider">Retour</span>
            </button>
            
            {/* Steps indicator */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${step === 'info' ? 'bg-science-900' : 'bg-slate-300'}`} />
              <div className={`w-2 h-2 rounded-full ${step === 'payment' ? 'bg-science-900' : 'bg-slate-300'}`} />
            </div>
          </div>
        </header>

        <div className="px-4 py-6 pb-32">
          {/* Récapitulatif */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-4 mb-6"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-text-secondary mb-3">
              RÉCAPITULATIF ({items.length} article{items.length > 1 ? 's' : ''})
            </p>
            
            {/* Images des produits */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
              {items.map((item) => {
                const imageUrl = getProductImageUrl(item.product);
                return (
                  <div key={item.product.id} className="flex-shrink-0 w-14 h-14 bg-slate-100 rounded-md overflow-hidden relative">
                    {imageUrl ? (
                      <img src={imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-mono text-xs text-text-muted">x{item.quantity}</span>
                      </div>
                    )}
                    {item.quantity > 1 && (
                      <span className="absolute bottom-0 right-0 bg-science-900 text-white text-[10px] font-mono px-1 rounded-tl">
                        x{item.quantity}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="font-mono text-sm font-bold uppercase tracking-wider text-science-900">
                Total
              </span>
              <span className="font-mono text-lg font-bold text-science-900">
                {total} DH
              </span>
            </div>
          </motion.div>

          {/* STEP 1: Informations de livraison */}
          {step === 'info' && (
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleInfoSubmit}
              className="space-y-4"
            >
              <h2 className="font-mono font-bold text-sm uppercase tracking-wider text-science-900 mb-4">
                Informations de livraison
              </h2>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-science-900 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input ${formErrors.name ? 'border-red-500' : ''}`}
                  placeholder="Votre nom"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-science-900 mb-2">
                  Téléphone *
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    className="input w-32 px-2"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`input flex-1 ${formErrors.phone ? 'border-red-500' : ''}`}
                    placeholder="6 12 34 56 78"
                  />
                </div>
                {formErrors.phone && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-science-900 mb-2">
                  Email (pour le reçu)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-science-900 mb-2">
                  Ville *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`input ${formErrors.city ? 'border-red-500' : ''}`}
                  placeholder="Casablanca"
                />
                {formErrors.city && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>
                )}
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-science-900 mb-2">
                  Adresse complète *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className={`input resize-none ${formErrors.address ? 'border-red-500' : ''}`}
                  placeholder="Numéro, rue, quartier..."
                />
                {formErrors.address && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>
                )}
              </div>
            </motion.form>
          )}

          {/* STEP 2: Mode de paiement */}
          {step === 'payment' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h2 className="font-mono font-bold text-sm uppercase tracking-wider text-science-900 mb-4">
                Mode de paiement
              </h2>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="font-sans text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Option: Cash on Delivery */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cash_on_delivery')}
                className={`w-full p-4 border-2 rounded-md text-left transition-all ${
                  paymentMethod === 'cash_on_delivery'
                    ? 'border-science-900 bg-slate-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-md flex items-center justify-center ${
                    paymentMethod === 'cash_on_delivery' ? 'bg-science-900 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-mono font-bold text-sm uppercase tracking-wider text-science-900">
                      Paiement à la livraison
                    </p>
                    <p className="font-sans text-xs text-text-secondary mt-1">
                      Payez en espèces ou par carte bancaire lors de la réception
                    </p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'cash_on_delivery' ? 'border-science-900 bg-science-900' : 'border-slate-300'
                  }`}>
                    {paymentMethod === 'cash_on_delivery' && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
              </button>

              {/* Option: Carte bancaire */}
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-4 border-2 rounded-md text-left transition-all ${
                  paymentMethod === 'card'
                    ? 'border-science-900 bg-slate-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-md flex items-center justify-center ${
                    paymentMethod === 'card' ? 'bg-science-900 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-mono font-bold text-sm uppercase tracking-wider text-science-900">
                      Carte bancaire
                    </p>
                    <p className="font-sans text-xs text-text-secondary mt-1">
                      Paiement sécurisé par Stripe
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-1.5 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded">VISA</span>
                      <span className="px-1.5 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded">MC</span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'card' ? 'border-science-900 bg-science-900' : 'border-slate-300'
                  }`}>
                    {paymentMethod === 'card' && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
              </button>

              {/* Sécurité */}
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-md">
                <Lock className="w-4 h-4 text-text-muted" />
                <p className="font-sans text-xs text-text-secondary">
                  Vos données de paiement sont sécurisées et chiffrées
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Bouton Final Sticky */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-lg z-40"
        >
          {step === 'info' ? (
            <button
              onClick={handleInfoSubmit}
              className="btn-primary w-full py-4 text-base"
            >
              CONTINUER VERS LE PAIEMENT
            </button>
          ) : (
            <button
              onClick={handlePaymentSubmit}
              disabled={isSubmitting}
              className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  TRAITEMENT...
                </>
              ) : paymentMethod === 'cash_on_delivery' ? (
                `CONFIRMER LA COMMANDE - ${total} DH`
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  PAYER {total} DH
                </>
              )}
            </button>
          )}
        </motion.div>
      </div>
    </MobileShell>
  );
}
