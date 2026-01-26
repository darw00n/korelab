'use client';

// ============================================
// KORELAB - Page Profil
// Infos utilisateur, historique diagnostics & commandes
// ============================================

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  User,
  Phone,
  MapPin,
  History,
  ShoppingBag,
  ChevronRight,
  LogOut,
  Settings,
  Sparkles,
  Package,
  Calendar,
  Edit2,
  Loader2
} from 'lucide-react';
import { MobileShell } from '@/components/layout/MobileShell';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase';

// ===================
// TYPES
// ===================

interface DiagnosticHistoryItem {
  id: string;
  created_at: string;
  match_score: number | null;
  is_complete: boolean;
  texture_name?: string;
  porosity_name?: string;
}

interface OrderHistoryItem {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  items_count: number;
}

// ===================
// PAGE PRINCIPALE
// ===================

export default function ProfilPage() {
  const router = useRouter();
  const { user, authState, isLoading: authLoading, signOut, initialize } = useAuthStore();
  
  const [diagnostics, setDiagnostics] = useState<DiagnosticHistoryItem[]>([]);
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Initialiser l'auth au chargement
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Rediriger si non connecté
  useEffect(() => {
    if (authState === 'unauthenticated' && !authLoading) {
      router.push('/auth?redirect=/profil');
    }
  }, [authState, authLoading, router]);

  // Charger les données
  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) return;
      
      setIsLoadingData(true);
      
      try {
        // Charger les diagnostics
        const { data: diagData } = await supabase
          .from('diagnostic_sessions')
          .select(`
            id,
            created_at,
            match_score,
            is_complete,
            texture_id,
            porosity_id
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10);
        
        if (diagData) {
          setDiagnostics(diagData.map(d => ({
            id: d.id,
            created_at: d.created_at,
            match_score: d.match_score,
            is_complete: d.is_complete || false,
          })));
        }

        // Charger les commandes
        const { data: orderData } = await supabase
          .from('orders')
          .select(`
            id,
            created_at,
            status,
            total_amount
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10);
        
        if (orderData) {
          setOrders(orderData.map(o => ({
            id: o.id,
            created_at: o.created_at,
            status: o.status,
            total_amount: o.total_amount,
            items_count: 0,
          })));
        }
      } catch (error) {
        console.error('Erreur chargement données:', error);
      } finally {
        setIsLoadingData(false);
      }
    };

    if (user?.id) {
      loadData();
    }
  }, [user?.id]);

  // Déconnexion
  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  // Loading
  if (authLoading || authState === 'loading') {
    return (
      <MobileShell showHeader={false} showBottomNav={true}>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-science-900 animate-spin" />
        </div>
      </MobileShell>
    );
  }

  // Non connecté
  if (!user) {
    return null;
  }

  return (
    <MobileShell showHeader={false} showBottomNav={true}>
      <div className="min-h-screen bg-white pb-24">
        {/* Header Profil */}
        <div className="bg-science-900 px-4 pt-8 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-mono font-bold text-lg uppercase tracking-wider text-white">
              Mon Profil
            </h1>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          {/* Info Utilisateur */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="font-mono font-bold text-lg text-white">
                {user.profile?.full_name || 'Utilisateur'}
              </h2>
              <p className="font-mono text-sm text-white/70">
                {user.phone || user.email || 'Non renseigné'}
              </p>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="px-4 -mt-6">
          {/* Carte Actions Rapides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-4 mb-6"
          >
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/diagnostic"
                className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors"
              >
                <Sparkles className="w-6 h-6 text-science-900" />
                <span className="font-mono text-xs uppercase tracking-wider text-science-900">
                  Nouveau Diagnostic
                </span>
              </Link>
              <Link
                href="/shop"
                className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors"
              >
                <ShoppingBag className="w-6 h-6 text-science-900" />
                <span className="font-mono text-xs uppercase tracking-wider text-science-900">
                  Boutique
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Historique des Diagnostics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-science-900">
                Mes Diagnostics
              </h3>
              <History className="w-4 h-4 text-text-muted" />
            </div>

            {isLoadingData ? (
              <div className="card p-8 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-text-muted animate-spin" />
              </div>
            ) : diagnostics.length > 0 ? (
              <div className="space-y-2">
                {diagnostics.map((diag) => (
                  <DiagnosticCard key={diag.id} diagnostic={diag} />
                ))}
              </div>
            ) : (
              <div className="card p-6 text-center">
                <Sparkles className="w-8 h-8 text-text-muted mx-auto mb-2" />
                <p className="font-sans text-sm text-text-secondary mb-3">
                  Aucun diagnostic enregistré
                </p>
                <Link href="/diagnostic" className="btn-secondary text-xs py-2 px-4">
                  Faire un diagnostic
                </Link>
              </div>
            )}
          </motion.div>

          {/* Historique des Commandes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-science-900">
                Mes Commandes
              </h3>
              <Package className="w-4 h-4 text-text-muted" />
            </div>

            {isLoadingData ? (
              <div className="card p-8 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-text-muted animate-spin" />
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-2">
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <div className="card p-6 text-center">
                <ShoppingBag className="w-8 h-8 text-text-muted mx-auto mb-2" />
                <p className="font-sans text-sm text-text-secondary mb-3">
                  Aucune commande passée
                </p>
                <Link href="/shop" className="btn-secondary text-xs py-2 px-4">
                  Voir les produits
                </Link>
              </div>
            )}
          </motion.div>

          {/* Paramètres */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-science-900 mb-3">
              Paramètres
            </h3>

            <div className="card divide-y divide-slate-100">
              <SettingsItem
                icon={<User className="w-5 h-5" />}
                label="Modifier mon profil"
                href="/profil/edit"
              />
              <SettingsItem
                icon={<MapPin className="w-5 h-5" />}
                label="Adresse de livraison"
                href="/profil/adresse"
              />
              <SettingsItem
                icon={<Settings className="w-5 h-5" />}
                label="Préférences"
                href="/profil/preferences"
              />
            </div>
          </motion.div>

          {/* Bouton Déconnexion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <button
              onClick={handleSignOut}
              className="w-full py-3 text-center font-mono text-sm uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors"
            >
              Se déconnecter
            </button>
          </motion.div>
        </div>
      </div>
    </MobileShell>
  );
}

// ===================
// CARTE DIAGNOSTIC
// ===================

interface DiagnosticCardProps {
  diagnostic: DiagnosticHistoryItem;
}

function DiagnosticCard({ diagnostic }: DiagnosticCardProps) {
  const date = new Date(diagnostic.created_at);
  const formattedDate = date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <Link 
      href={`/diagnostic/resultats/${diagnostic.id}`}
      className="card p-3 flex items-center gap-3 hover:bg-slate-50 transition-colors"
    >
      <div className="w-10 h-10 bg-science-900 rounded-md flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono font-bold text-sm text-science-900">
          Diagnostic capillaire
        </p>
        <div className="flex items-center gap-2 mt-1">
          <Calendar className="w-3 h-3 text-text-muted" />
          <span className="font-sans text-xs text-text-secondary">
            {formattedDate}
          </span>
          {diagnostic.match_score && (
            <>
              <span className="text-text-muted">•</span>
              <span className="font-mono text-xs text-success-700">
                {diagnostic.match_score}% match
              </span>
            </>
          )}
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-text-muted flex-shrink-0" />
    </Link>
  );
}

// ===================
// CARTE COMMANDE
// ===================

interface OrderCardProps {
  order: OrderHistoryItem;
}

function OrderCard({ order }: OrderCardProps) {
  const date = new Date(order.created_at);
  const formattedDate = date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const statusLabels: Record<string, { label: string; color: string }> = {
    pending: { label: 'En attente', color: 'text-yellow-600' },
    confirmed: { label: 'Confirmée', color: 'text-blue-600' },
    shipped: { label: 'Expédiée', color: 'text-purple-600' },
    delivered: { label: 'Livrée', color: 'text-success-700' },
    cancelled: { label: 'Annulée', color: 'text-red-600' },
  };

  const status = statusLabels[order.status] || { label: order.status, color: 'text-text-secondary' };

  return (
    <div className="card p-3 flex items-center gap-3">
      <div className="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center flex-shrink-0">
        <Package className="w-5 h-5 text-science-900" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-mono font-bold text-sm text-science-900">
            {order.total_amount} DH
          </p>
          <span className={`font-mono text-xs ${status.color}`}>
            {status.label}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Calendar className="w-3 h-3 text-text-muted" />
          <span className="font-sans text-xs text-text-secondary">
            {formattedDate}
          </span>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-text-muted flex-shrink-0" />
    </div>
  );
}

// ===================
// ITEM PARAMÈTRES
// ===================

interface SettingsItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

function SettingsItem({ icon, label, href }: SettingsItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors"
    >
      <span className="text-text-muted">{icon}</span>
      <span className="flex-1 font-sans text-sm text-science-900">{label}</span>
      <ChevronRight className="w-5 h-5 text-text-muted" />
    </Link>
  );
}
