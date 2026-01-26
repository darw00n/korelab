'use client';

// ============================================
// KORELAB - Mobile Shell Layout (Science Snap)
// Layout principal avec style clinique
// ============================================

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Sparkles, 
  ShoppingBag, 
  User,
  LogIn,
  Store,
} from 'lucide-react';
import { useCartStore, selectItemCount } from '@/store/cartStore';
import { useTranslation } from '@/lib/i18n/context';
import { useAuthStore } from '@/store/authStore';

// ===================
// TYPES
// ===================

interface MobileShellProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showBottomNav?: boolean;
  headerTitle?: string;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
}

// ===================
// NAVIGATION ITEMS
// ===================

const NAV_ITEMS: (NavItem & { i18nKey: string })[] = [
  { href: '/', label: 'Accueil', i18nKey: 'navigation.home', icon: Home },
  { href: '/diagnostic', label: 'Diagnostic', i18nKey: 'navigation.diagnostic', icon: Sparkles, highlight: true },
  { href: '/shop', label: 'Shop', i18nKey: 'navigation.shop', icon: Store },
  { href: '/panier', label: 'Panier', i18nKey: 'navigation.cart', icon: ShoppingBag },
  { href: '/profil', label: 'Profil', i18nKey: 'navigation.account', icon: User },
];

// ===================
// COMPOSANT HEADER
// ===================

function Header({ title }: { title?: string }) {
  const itemCount = useCartStore(selectItemCount);
  const { t } = useTranslation();
  
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-mono font-bold text-lg text-science-900">
            {title || 'KORELAB.SC'}
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Panier */}
          <Link 
            href="/panier" 
            className="relative p-2 text-text-secondary hover:text-science-900 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-science-900 text-white text-[10px] font-mono font-bold rounded-sm flex items-center justify-center">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

// ===================
// COMPOSANT BOTTOM NAVIGATION
// ===================

function BottomNavigation() {
  const pathname = usePathname();
  const itemCount = useCartStore(selectItemCount);
  const { t } = useTranslation();
  const { authState, user } = useAuthStore();
  const isAuthenticated = authState === 'authenticated';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200">
      <div className="flex items-center justify-around py-2">
        {NAV_ITEMS.map((item) => {
          // Pour le profil, rediriger vers /auth si non connecté
          const href = item.href === '/profil' && !isAuthenticated 
            ? '/auth?redirect=/profil' 
            : item.href;
          
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.href === '/profil' && !isAuthenticated ? LogIn : item.icon;
          const label = item.href === '/profil' 
            ? (isAuthenticated ? (user?.profile?.full_name?.split(' ')[0] || 'Profil') : 'Connexion')
            : t(item.i18nKey);

          return (
            <Link
              key={item.href}
              href={href}
              className={`flex flex-col items-center justify-center py-2 px-4 rounded-md transition-all duration-200 ${
                isActive 
                  ? 'text-science-900 bg-slate-50' 
                  : 'text-text-secondary hover:text-science-900 hover:bg-slate-50'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                
                {/* Badge panier */}
                {item.href === '/panier' && itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-science-900 text-white text-[9px] font-mono font-bold rounded-sm flex items-center justify-center">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
                
                {/* Indicateur connecté */}
                {item.href === '/profil' && isAuthenticated && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-success-500 rounded-full" />
                )}
              </div>
              
              <span className={`text-[10px] font-mono uppercase tracking-wider mt-1 ${
                isActive ? 'font-bold' : 'font-medium'
              }`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

// ===================
// COMPOSANT PRINCIPAL
// ===================

export function MobileShell({ 
  children, 
  showHeader = true,
  showBottomNav = true,
  headerTitle
}: MobileShellProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      {showHeader && <Header title={headerTitle} />}

      {/* Main Content */}
      <main className={`flex-1 ${showBottomNav ? 'pb-20' : ''}`}>
        {children}
      </main>

      {/* Bottom Navigation */}
      {showBottomNav && <BottomNavigation />}
    </div>
  );
}

// ===================
// EXPORT PAR DÉFAUT
// ===================

export default MobileShell;
