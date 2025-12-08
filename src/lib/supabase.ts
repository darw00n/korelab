// ============================================
// KORELAB - Client Supabase
// Configuration et instances pour le client et le serveur
// ============================================

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

// ===================
// VARIABLES D'ENVIRONNEMENT
// ===================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// ===================
// VALIDATION
// ===================

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ Supabase credentials missing. Create a .env.local file with:\n' +
    '   NEXT_PUBLIC_SUPABASE_URL=your-url\n' +
    '   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key\n' +
    'See SETUP_SUPABASE.md for instructions.'
  );
}

// ===================
// CLIENT BROWSER (Public)
// Utilisé côté client (composants React)
// ===================

export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// ===================
// CLIENT SERVER (Admin)
// Utilisé côté serveur uniquement (API routes, Server Components)
// ⚠️ NE JAMAIS importer côté client !
// ===================

export const supabaseAdmin = supabaseServiceKey
  ? createClient<Database>(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

// ===================
// HELPER: Vérifier si Supabase est configuré
// ===================

export const isSupabaseConfigured = (): boolean => {
  return !!(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://placeholder.supabase.co'
  );
};

// ===================
// EXPORT PAR DÉFAUT
// ===================

export default supabase;

