'use client';

// ============================================
// KORELAB - Page Compte (Placeholder)
// ============================================

import React from 'react';
import { User, Settings, HelpCircle, LogOut } from 'lucide-react';
import { MobileShell } from '@/components/layout/MobileShell';
import { useTranslation } from '@/lib/i18n/context';

export default function ComptePage() {
  const { t } = useTranslation();
  
  return (
    <MobileShell headerTitle={t('account_page.header_title')}>
      <div className="px-4 py-6">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-3">
            <User className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-secondary-900">{t('account_page.welcome.title')}</h2>
          <p className="text-secondary-500">{t('account_page.welcome.subtitle')}</p>
        </div>

        {/* Menu */}
        <div className="space-y-2">
          <MenuItem icon={<User />} label={t('account_page.menu.my_info')} />
          <MenuItem icon={<Settings />} label={t('account_page.menu.settings')} />
          <MenuItem icon={<HelpCircle />} label={t('account_page.menu.help')} />
        </div>

        {/* Info */}
        <div className="mt-8 p-4 bg-secondary-50 rounded-xl text-center">
          <p className="text-sm text-secondary-600">
            {t('account_page.info_message')}
          </p>
        </div>
      </div>
    </MobileShell>
  );
}

function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="w-full flex items-center gap-3 p-4 bg-white rounded-xl border border-secondary-200 text-left hover:bg-secondary-50 transition-colors">
      <span className="text-secondary-600">{icon}</span>
      <span className="font-medium text-secondary-900">{label}</span>
    </button>
  );
}

