'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { LOCALES, Locale } from '@/lib/i18n';

interface LanguageSelectorProps {
  variant?: 'default' | 'compact' | 'minimal';
  className?: string;
}

export function LanguageSelector({ variant = 'default', className = '' }: LanguageSelectorProps) {
  const { locale, setLocale, localeConfig } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const localeList = Object.values(LOCALES);

  const handleSelect = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  // Variante minimale (juste un bouton avec le drapeau)
  if (variant === 'minimal') {
    return (
      <div ref={containerRef} className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors"
          aria-label="Changer de langue"
        >
          <span className="text-xl">{localeConfig.flag}</span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-stone-200 overflow-hidden z-50 min-w-[160px]"
            >
              {localeList.map((loc) => (
                <button
                  key={loc.code}
                  onClick={() => handleSelect(loc.code)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
                    ${locale === loc.code 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-stone-50 text-stone-700'
                    }
                  `}
                >
                  <span className="text-xl">{loc.flag}</span>
                  <span className="font-medium">{loc.nativeName}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Variante compacte
  if (variant === 'compact') {
    return (
      <div ref={containerRef} className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors"
          aria-label="Changer de langue"
        >
          <span className="text-lg">{localeConfig.flag}</span>
          <ChevronDown 
            className={`w-4 h-4 text-stone-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-stone-200 overflow-hidden z-50 min-w-[180px]"
            >
              {localeList.map((loc) => (
                <button
                  key={loc.code}
                  onClick={() => handleSelect(loc.code)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
                    ${locale === loc.code 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-stone-50 text-stone-700'
                    }
                  `}
                >
                  <span className="text-xl">{loc.flag}</span>
                  <div className="flex flex-col">
                    <span className="font-medium">{loc.nativeName}</span>
                    <span className="text-xs text-stone-400">{loc.name}</span>
                  </div>
                  {locale === loc.code && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Variante par défaut (complète)
  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-stone-200 hover:border-primary/30 hover:shadow-md transition-all"
        aria-label="Changer de langue"
      >
        <Globe className="w-4 h-4 text-stone-400" />
        <span className="text-xl">{localeConfig.flag}</span>
        <span className="font-medium text-stone-700">{localeConfig.nativeName}</span>
        <ChevronDown 
          className={`w-4 h-4 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-stone-200 overflow-hidden z-50 min-w-[220px]"
          >
            <div className="p-2 border-b border-stone-100">
              <p className="text-xs text-stone-400 px-2">Choisir une langue</p>
            </div>
            
            {localeList.map((loc) => (
              <button
                key={loc.code}
                onClick={() => handleSelect(loc.code)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
                  ${locale === loc.code 
                    ? 'bg-gradient-to-r from-primary/10 to-transparent border-l-2 border-primary' 
                    : 'hover:bg-stone-50 border-l-2 border-transparent'
                  }
                `}
              >
                <span className="text-2xl">{loc.flag}</span>
                <div className="flex flex-col flex-1">
                  <span className={`font-medium ${locale === loc.code ? 'text-primary' : 'text-stone-700'}`}>
                    {loc.nativeName}
                  </span>
                  <span className="text-xs text-stone-400">{loc.name}</span>
                </div>
                {locale === loc.code && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-primary font-bold"
                  >
                    ✓
                  </motion.span>
                )}
              </button>
            ))}

            <div className="p-2 border-t border-stone-100 bg-stone-50">
              <p className="text-[10px] text-stone-400 text-center">
                {localeConfig.direction === 'rtl' ? '← RTL' : 'LTR →'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageSelector;

