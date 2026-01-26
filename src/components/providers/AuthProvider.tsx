'use client';

// ============================================
// KORELAB - Auth Provider
// Initialise l'authentification au démarrage de l'app
// ============================================

import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { initialize, authState } = useAuthStore();

  useEffect(() => {
    // Initialiser l'auth au montage du composant
    if (authState === 'loading') {
      initialize();
    }
  }, [initialize, authState]);

  return <>{children}</>;
}

export default AuthProvider;
