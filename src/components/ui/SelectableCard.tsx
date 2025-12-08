'use client';

// ============================================
// KORELAB - Carte Sélectionnable
// Pour les choix dans le wizard (type de peau, concerns, etc.)
// ============================================

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface SelectableCardProps {
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function SelectableCard({
  selected,
  onClick,
  icon,
  title,
  description,
  disabled = false,
  size = 'md',
}: SelectableCardProps) {
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5',
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        selectable-card w-full text-left
        ${selected ? 'selected' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${sizeClasses[size]}
      `}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.1 }}
    >
      {/* Indicateur de sélection */}
      <motion.div
        className="check-indicator"
        initial={false}
        animate={{
          opacity: selected ? 1 : 0,
          scale: selected ? 1 : 0.75,
        }}
        transition={{ duration: 0.2 }}
      >
        <Check className="w-4 h-4" />
      </motion.div>

      {/* Contenu */}
      <div className="flex items-center gap-3">
        {/* Icône */}
        {icon && (
          <div className={`
            flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
            ${selected ? 'bg-primary text-white' : 'bg-secondary-100 text-secondary-600'}
            transition-colors duration-200
          `}>
            {icon}
          </div>
        )}

        {/* Texte */}
        <div className="flex-1 min-w-0">
          <p className={`
            font-semibold truncate
            ${selected ? 'text-primary' : 'text-secondary-800'}
          `}>
            {title}
          </p>
          {description && (
            <p className="text-sm text-secondary-500 mt-0.5 line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.button>
  );
}

// ===================
// VARIANTE GRID (pour multi-select comme les concerns)
// ===================

interface SelectableGridCardProps {
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  label: string;
  disabled?: boolean;
}

export function SelectableGridCard({
  selected,
  onClick,
  icon,
  label,
  disabled = false,
}: SelectableGridCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        relative flex flex-col items-center justify-center gap-2
        p-4 rounded-xl border-2 
        ${selected 
          ? 'border-primary bg-primary-50' 
          : 'border-secondary-200 bg-white hover:border-primary-300'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        transition-all duration-200
      `}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {/* Checkmark */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
        >
          <Check className="w-3 h-3 text-white" />
        </motion.div>
      )}

      {/* Icône */}
      {icon && (
        <div className={`
          w-10 h-10 rounded-full flex items-center justify-center
          ${selected ? 'bg-primary text-white' : 'bg-secondary-100 text-secondary-600'}
          transition-colors duration-200
        `}>
          {icon}
        </div>
      )}

      {/* Label */}
      <span className={`
        text-sm font-medium text-center
        ${selected ? 'text-primary' : 'text-secondary-700'}
      `}>
        {label}
      </span>
    </motion.button>
  );
}

export default SelectableCard;

