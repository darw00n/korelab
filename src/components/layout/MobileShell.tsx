'use client';

// ============================================
// KORELAB - Mobile Shell Layout
// Layout principal avec Bottom Navigation (style App Native)
// ============================================

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Sparkles, 
  ShoppingBag, 
  User,
  Leaf
} from 'lucide-react';
import { useCartStore, selectItemCount } from '@/store/cartStore';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { useTranslation } from '@/lib/i18n/context';

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
  { href: '/panier', label: 'Panier', i18nKey: 'navigation.cart', icon: ShoppingBag },
  { href: '/compte', label: 'Compte', i18nKey: 'navigation.account', icon: User },
];

// ===================
// COMPOSANT HEADER
// ===================

function Header({ title }: { title?: string }) {
  const itemCount = useCartStore(selectItemCount);
  const { t } = useTranslation();
  
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-secondary-200">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-lg text-secondary-800">
            {title || t('navigation.diagnostic')}
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Sélecteur de langue - Caché pour l'instant */}
          {/* <LanguageSelector variant="minimal" /> */}
          
          {/* Panier */}
          <Link 
            href="/panier" 
            className="relative p-2 text-secondary-600 hover:text-primary transition-colors"
          >
            <ShoppingBag className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
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

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;
          const label = t(item.i18nKey);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="relative">
                {/* Highlight pour le bouton Diagnostic */}
                {item.highlight && !isActive && (
                  <div className="absolute -inset-2 bg-primary/10 rounded-full animate-pulse-soft" />
                )}
                
                <Icon className={`icon ${item.highlight && !isActive ? 'text-primary' : ''}`} />
                
                {/* Badge panier */}
                {item.href === '/panier' && itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </div>
              
              <span className={item.highlight && !isActive ? 'text-primary font-semibold' : ''}>
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
    <div className="min-h-screen bg-background flex flex-col">
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

