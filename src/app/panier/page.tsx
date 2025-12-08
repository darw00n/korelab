'use client';

// ============================================
// KORELAB - Page Panier
// Affichage du panier avec formulaire COD
// ============================================

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight,
  Truck,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { MobileShell } from '@/components/layout/MobileShell';
import { useCartStore } from '@/store/cartStore';
import { useTranslation } from '@/lib/i18n/context';

export default function PanierPage() {
  const { t } = useTranslation();
  const { items, removeItem, updateQuantity, isFromDiagnostic, getComputedValues } = useCartStore();
  const { subtotal, discountAmount, shippingCost, total, itemCount } = getComputedValues();

  // Panier vide
  if (items.length === 0) {
    return (
      <MobileShell headerTitle={t('cart.header_title')}>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="w-10 h-10 text-secondary-400" />
          </div>
          <h2 className="text-xl font-bold text-secondary-900 mb-2">
            {t('cart.empty_state.title')}
          </h2>
          <p className="text-secondary-600 mb-6">
            {t('cart.empty_state.description')}
          </p>
          <Link href="/diagnostic" className="btn-primary">
            <Sparkles className="w-5 h-5" />
            {t('cart.empty_state.cta_button')}
          </Link>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell headerTitle={t('cart.header_title')}>
      <div className="px-4 py-4 pb-48">
        {/* Badge Skin-Match si applicable */}
        {isFromDiagnostic && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-accent-50 border border-accent-200 rounded-xl mb-4"
          >
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-accent">
              {t('cart.diagnostic_badge')}
            </span>
          </motion.div>
        )}

        {/* Liste des produits */}
        <div className="space-y-3">
          {items.map((item, index) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-3 p-3 bg-white rounded-xl border border-secondary-200"
            >
              {/* Image placeholder */}
              <div className="w-20 h-20 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="w-8 h-8 text-secondary-400" />
              </div>

              {/* Infos */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-secondary-900 text-sm leading-tight line-clamp-2">
                  {item.product.name}
                </h3>
                <p className="text-primary font-bold mt-1">
                  {item.product.price} MAD
                </p>

                {/* Quantité */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-600 hover:bg-secondary-200"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-600 hover:bg-secondary-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Supprimer */}
              <button
                onClick={() => removeItem(item.product.id)}
                className="p-2 text-secondary-400 hover:text-error self-start"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Info livraison */}
        <div className="mt-6 p-4 bg-secondary-50 rounded-xl">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-secondary-600" />
            <div>
              {total >= 300 ? (
                <p className="text-sm font-medium text-accent">
                  {t('cart.shipping_info.free_shipping')}
                </p>
              ) : (
                <p className="text-sm text-secondary-600">
                  {t('cart.shipping_info.remaining_for_free').replace('{amount}', String(300 - total))}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-secondary-200 shadow-elevated z-50 p-4">
        {/* Récapitulatif */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-secondary-600">{t('cart.summary.subtotal').replace('{count}', String(itemCount))}</span>
            <span className="text-secondary-900">{subtotal} MAD</span>
          </div>
          
          {discountAmount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-accent">{t('cart.summary.discount')}</span>
              <span className="text-accent">-{discountAmount} MAD</span>
            </div>
          )}
          
          <div className="flex justify-between text-sm">
            <span className="text-secondary-600">{t('cart.summary.shipping')}</span>
            <span className="text-secondary-900">
              {shippingCost === 0 ? t('cart.summary.free') : `${shippingCost} MAD`}
            </span>
          </div>
          
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-secondary-200">
            <span>{t('cart.summary.total')}</span>
            <span className="text-primary">{total} MAD</span>
          </div>
        </div>

        {/* Boutons */}
        <div className="flex gap-3">
          <button className="flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-xl text-white">
            <MessageCircle className="w-6 h-6" />
          </button>
          <Link
            href="/checkout"
            className="flex-1 flex items-center justify-center gap-2 h-14 bg-primary text-white font-semibold rounded-xl"
          >
            {t('cart.buttons.order')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </MobileShell>
  );
}

