'use client';

// ============================================
// KORELAB - Barre de Progression
// Pour le wizard de diagnostic
// ============================================

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number; // Pourcentage 0-100
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({ value, showLabel = false, size = 'md' }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, value));
  
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-end mb-1">
          <span className="text-sm font-semibold text-primary">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      <div className={`w-full bg-secondary-100 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-primary-500 to-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
