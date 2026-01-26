// ============================================
// KORELAB - Auth Store (Zustand)
// Gestion de l'état d'authentification
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import type { AuthUser, UserProfile, AuthState } from '@/types/database.types';
import type { User, Session } from '@supabase/supabase-js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

// ===================
// TYPES
// ===================

interface AuthStore {
  // État
  user: AuthUser | null;
  session: Session | null;
  authState: AuthState;
  isLoading: boolean;
  error: string | null;
  
  // Téléphone en attente de vérification (pour OTP)
  pendingPhone: string | null;
  
  // Actions
  initialize: () => Promise<void>;
  signInWithPhone: (phone: string, countryCode?: string) => Promise<{ success: boolean; error?: string }>;
  verifyOtp: (phone: string, token: string, countryCode?: string) => Promise<{ success: boolean; error?: string }>;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (email: string, password: string, fullName?: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  fetchProfile: () => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
  setPendingPhone: (phone: string | null) => void;
}

// ===================
// HELPERS
// ===================

/**
 * Transforme un User Supabase en AuthUser
 */
const transformUser = (user: User, profile?: UserProfile | null): AuthUser => ({
  id: user.id,
  email: user.email || null,
  phone: user.phone || null,
  created_at: user.created_at,
  profile: profile || null,
  hairProfile: null,
});

/**
 * Formate le numéro de téléphone international
 * Supporte: +33..., +212..., +1..., etc.
 * Si pas de code pays, assume le Maroc (+212)
 */
const formatInternationalPhone = (phone: string, countryCode: string = '212'): string => {
  // Nettoyer le numéro (garder uniquement les chiffres et le +)
  let cleaned = phone.replace(/[^\d+]/g, '');
  
  // Si commence par +, c'est déjà un format international
  if (cleaned.startsWith('+')) {
    return cleaned;
  }
  
  // Si commence par 00, remplacer par +
  if (cleaned.startsWith('00')) {
    return '+' + cleaned.slice(2);
  }
  
  // Si commence par 0, c'est un numéro local - ajouter le code pays
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.slice(1);
  }
  
  return '+' + countryCode + cleaned;
};

// Liste des codes pays supportés
export const COUNTRY_CODES = [
  { code: '212', name: 'Maroc', flag: '🇲🇦', example: '6 12 34 56 78' },
  { code: '33', name: 'France', flag: '🇫🇷', example: '6 12 34 56 78' },
  { code: '1', name: 'USA/Canada', flag: '🇺🇸', example: '555 123 4567' },
  { code: '44', name: 'UK', flag: '🇬🇧', example: '7911 123456' },
  { code: '34', name: 'Espagne', flag: '🇪🇸', example: '612 345 678' },
  { code: '49', name: 'Allemagne', flag: '🇩🇪', example: '151 12345678' },
  { code: '39', name: 'Italie', flag: '🇮🇹', example: '312 345 6789' },
  { code: '32', name: 'Belgique', flag: '🇧🇪', example: '470 12 34 56' },
  { code: '41', name: 'Suisse', flag: '🇨🇭', example: '76 123 45 67' },
  { code: '213', name: 'Algérie', flag: '🇩🇿', example: '5 12 34 56 78' },
  { code: '216', name: 'Tunisie', flag: '🇹🇳', example: '20 123 456' },
  { code: '971', name: 'UAE', flag: '🇦🇪', example: '50 123 4567' },
  { code: '966', name: 'Arabie Saoudite', flag: '🇸🇦', example: '50 123 4567' },
];

// Numéros de test (OTP: 123456)
export const TEST_PHONE_NUMBERS = [
  '+15555550100',
  '+15555550101', 
  '+15555550102',
  '+33600000000',
  '+212600000000',
];

// ===================
// STORE
// ===================

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // État initial
      user: null,
      session: null,
      authState: 'loading',
      isLoading: true,
      error: null,
      pendingPhone: null,

      // ===================
      // INITIALISATION
      // ===================
      initialize: async () => {
        try {
          set({ isLoading: true, error: null });

          // Récupérer la session existante
          const { data: { session }, error } = await db.auth.getSession();
          
          if (error) {
            console.error('Auth init error:', error);
            set({ 
              authState: 'unauthenticated', 
              isLoading: false,
              user: null,
              session: null 
            });
            return;
          }

          if (session?.user) {
            // Récupérer le profil utilisateur
            const { data: profile } = await db
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            // Récupérer le profil capillaire actif
            const { data: hairProfile } = await db
              .from('user_hair_profiles')
              .select('*')
              .eq('user_id', session.user.id)
              .eq('is_active', true)
              .single();

            const authUser = transformUser(session.user, profile);
            authUser.hairProfile = hairProfile || null;

            set({
              user: authUser,
              session,
              authState: 'authenticated',
              isLoading: false,
            });
          } else {
            set({
              authState: 'unauthenticated',
              isLoading: false,
              user: null,
              session: null,
            });
          }

          // Écouter les changements d'auth
          supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event);
            
            if (event === 'SIGNED_IN' && session?.user) {
              const { data: profile } = await db
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();

              set({
                user: transformUser(session.user, profile),
                session,
                authState: 'authenticated',
                pendingPhone: null,
              });
            } else if (event === 'SIGNED_OUT') {
              set({
                user: null,
                session: null,
                authState: 'unauthenticated',
              });
            }
          });

        } catch (error) {
          console.error('Auth initialization failed:', error);
          set({ 
            authState: 'unauthenticated', 
            isLoading: false,
            error: 'Erreur d\'initialisation' 
          });
        }
      },

      // ===================
      // CONNEXION PAR TÉLÉPHONE (OTP)
      // ===================
      signInWithPhone: async (phone: string, countryCode: string = '212') => {
        try {
          set({ isLoading: true, error: null });
          
          const formattedPhone = formatInternationalPhone(phone, countryCode);
          
          const { error } = await db.auth.signInWithOtp({
            phone: formattedPhone,
          });

          if (error) {
            set({ isLoading: false, error: error.message });
            return { success: false, error: error.message };
          }

          set({ 
            isLoading: false, 
            pendingPhone: formattedPhone,
            authState: 'awaiting_verification' 
          });
          
          return { success: true };
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Erreur d\'envoi du code';
          set({ isLoading: false, error: message });
          return { success: false, error: message };
        }
      },

      // ===================
      // VÉRIFICATION OTP
      // ===================
      verifyOtp: async (phone: string, token: string, countryCode: string = '212') => {
        try {
          set({ isLoading: true, error: null });
          
          const formattedPhone = formatInternationalPhone(phone, countryCode);
          
          const { data, error } = await db.auth.verifyOtp({
            phone: formattedPhone,
            token,
            type: 'sms',
          });

          if (error) {
            set({ isLoading: false, error: error.message });
            return { success: false, error: error.message };
          }

          if (data.user) {
            // Mettre à jour le téléphone dans le profil
            await db
              .from('profiles')
              .update({ 
                phone: formattedPhone,
                phone_verified: true 
              })
              .eq('id', data.user.id);

            const { data: profile } = await db
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .single();

            set({
              user: transformUser(data.user, profile),
              session: data.session,
              authState: 'authenticated',
              isLoading: false,
              pendingPhone: null,
            });
          }

          return { success: true };
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Code invalide';
          set({ isLoading: false, error: message });
          return { success: false, error: message };
        }
      },

      // ===================
      // CONNEXION PAR EMAIL
      // ===================
      signInWithEmail: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const { data, error } = await db.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            set({ isLoading: false, error: error.message });
            return { success: false, error: error.message };
          }

          if (data.user) {
            const { data: profile } = await db
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .single();

            set({
              user: transformUser(data.user, profile),
              session: data.session,
              authState: 'authenticated',
              isLoading: false,
            });
          }

          return { success: true };
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Erreur de connexion';
          set({ isLoading: false, error: message });
          return { success: false, error: message };
        }
      },

      // ===================
      // INSCRIPTION PAR EMAIL
      // ===================
      signUpWithEmail: async (email: string, password: string, fullName?: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const { data, error } = await db.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
              },
            },
          });

          if (error) {
            set({ isLoading: false, error: error.message });
            return { success: false, error: error.message };
          }

          // Si l'utilisateur est créé, mettre à jour le profil avec le nom
          if (data.user && fullName) {
            await db
              .from('profiles')
              .update({ full_name: fullName })
              .eq('id', data.user.id);
          }

          set({ isLoading: false });
          return { success: true };
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Erreur d\'inscription';
          set({ isLoading: false, error: message });
          return { success: false, error: message };
        }
      },

      // ===================
      // DÉCONNEXION
      // ===================
      signOut: async () => {
        try {
          set({ isLoading: true });
          await db.auth.signOut();
          set({
            user: null,
            session: null,
            authState: 'unauthenticated',
            isLoading: false,
            pendingPhone: null,
          });
        } catch (error) {
          console.error('Sign out error:', error);
          set({ isLoading: false });
        }
      },

      // ===================
      // MISE À JOUR PROFIL
      // ===================
      updateProfile: async (data: Partial<UserProfile>) => {
        try {
          const { user } = get();
          if (!user) {
            return { success: false, error: 'Non connecté' };
          }

          set({ isLoading: true, error: null });

          const { error } = await db
            .from('profiles')
            .update(data)
            .eq('id', user.id);

          if (error) {
            set({ isLoading: false, error: error.message });
            return { success: false, error: error.message };
          }

          // Rafraîchir le profil
          await get().fetchProfile();
          
          set({ isLoading: false });
          return { success: true };
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Erreur de mise à jour';
          set({ isLoading: false, error: message });
          return { success: false, error: message };
        }
      },

      // ===================
      // RÉCUPÉRER LE PROFIL
      // ===================
      fetchProfile: async () => {
        try {
          const { user, session } = get();
          if (!user || !session) return;

          const { data: profile } = await db
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (profile) {
            set({
              user: { ...user, profile },
            });
          }
        } catch (error) {
          console.error('Fetch profile error:', error);
        }
      },

      // ===================
      // RAFRAÎCHIR UTILISATEUR (profil + profil capillaire)
      // ===================
      refreshUser: async () => {
        try {
          const { user, session } = get();
          if (!user || !session) return;

          // Récupérer le profil utilisateur
          const { data: profile } = await db
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          // Récupérer le profil capillaire actif
          const { data: hairProfile } = await db
            .from('user_hair_profiles')
            .select('*')
            .eq('user_id', user.id)
            .eq('is_active', true)
            .single();

          set({
            user: { 
              ...user, 
              profile: profile || null,
              hairProfile: hairProfile || null,
            },
          });
        } catch (error) {
          console.error('Refresh user error:', error);
        }
      },

      // ===================
      // HELPERS
      // ===================
      clearError: () => set({ error: null }),
      setPendingPhone: (phone) => set({ pendingPhone: phone }),
    }),
    {
      name: 'korelab-auth',
      partialize: (state) => ({
        // Ne persister que certaines données
        pendingPhone: state.pendingPhone,
      }),
    }
  )
);

// ===================
// HOOKS UTILITAIRES
// ===================

/**
 * Hook pour vérifier si l'utilisateur est connecté
 */
export const useIsAuthenticated = () => {
  const authState = useAuthStore((state) => state.authState);
  return authState === 'authenticated';
};

/**
 * Hook pour obtenir l'utilisateur courant
 */
export const useCurrentUser = () => {
  return useAuthStore((state) => state.user);
};

export default useAuthStore;
