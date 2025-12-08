// ═══════════════════════════════════════════════════════════════════════════
// 🌍 KORELAB - SYSTÈME INTERNATIONALIZATION (i18n)
// ═══════════════════════════════════════════════════════════════════════════

import fr from '../../../locales/fr.json';
import en from '../../../locales/en.json';
import darija from '../../../locales/darija.json';
import amazigh from '../../../locales/amazigh.json';

// Types pour les langues supportées
export type Locale = 'fr' | 'en' | 'ma' | 'tz';

export interface LocaleConfig {
  code: Locale;
  name: string;
  nativeName: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}

// Configuration des langues
export const LOCALES: Record<Locale, LocaleConfig> = {
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    direction: 'ltr',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    direction: 'ltr',
  },
  ma: {
    code: 'ma',
    name: 'Darija',
    nativeName: 'الدارجة',
    flag: '🇲🇦',
    direction: 'rtl',
  },
  tz: {
    code: 'tz',
    name: 'Tamazight',
    nativeName: 'ⵜⴰⵎⴰⵣⵉⵖⵜ',
    flag: 'ⵣ',
    direction: 'ltr',
  },
};

// Dictionnaires de traduction
export const translations: Record<Locale, typeof fr> = {
  fr,
  en: en as typeof fr,
  ma: darija as typeof fr,
  tz: amazigh as typeof fr,
};

// Langue par défaut
export const DEFAULT_LOCALE: Locale = 'fr';

// Clé localStorage
export const LOCALE_STORAGE_KEY = 'korelab-locale';

// Helper pour obtenir une valeur imbriquée
export function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let result: unknown = obj;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return path; // Retourne la clé si non trouvée
    }
  }
  
  return typeof result === 'string' ? result : path;
}

