'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  Locale, 
  LocaleConfig, 
  LOCALES, 
  translations, 
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  getNestedValue 
} from './index';

// Types du contexte
interface I18nContextType {
  locale: Locale;
  localeConfig: LocaleConfig;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  dir: 'ltr' | 'rtl';
}

// Création du contexte
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Provider
interface I18nProviderProps {
  children: React.ReactNode;
  defaultLocale?: Locale;
}

export function I18nProvider({ children, defaultLocale = DEFAULT_LOCALE }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [isHydrated, setIsHydrated] = useState(false);

  // Charger la langue depuis localStorage au montage
  useEffect(() => {
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (savedLocale && LOCALES[savedLocale]) {
      setLocaleState(savedLocale);
    }
    setIsHydrated(true);
  }, []);

  // Mettre à jour le document direction
  useEffect(() => {
    if (isHydrated) {
      const dir = LOCALES[locale].direction;
      document.documentElement.setAttribute('dir', dir);
      document.documentElement.setAttribute('lang', locale);
    }
  }, [locale, isHydrated]);

  // Fonction pour changer de langue
  const setLocale = useCallback((newLocale: Locale) => {
    if (LOCALES[newLocale]) {
      setLocaleState(newLocale);
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    }
  }, []);

  // Fonction de traduction
  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    const translation = getNestedValue(
      translations[locale] as unknown as Record<string, unknown>, 
      key
    );
    
    if (!params) return translation;
    
    // Remplacer les paramètres {param} dans la chaîne
    return Object.entries(params).reduce(
      (acc, [paramKey, value]) => acc.replace(`{${paramKey}}`, String(value)),
      translation
    );
  }, [locale]);

  const value: I18nContextType = {
    locale,
    localeConfig: LOCALES[locale],
    setLocale,
    t,
    dir: LOCALES[locale].direction,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

// Hook pour utiliser le contexte
export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Hook simplifié pour la traduction
export function useTranslation() {
  const { t, locale, dir } = useI18n();
  return { t, locale, dir };
}

