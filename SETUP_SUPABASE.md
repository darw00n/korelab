# 🔧 Configuration Supabase pour Korelab

## Étape 1 : Créer le fichier `.env.local`

Crée un fichier `.env.local` à la racine du projet avec ce contenu :

```env
# URL de ton projet Supabase
NEXT_PUBLIC_SUPABASE_URL=https://VOTRE_PROJECT_ID.supabase.co

# Clé publique (anon key)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Clé secrète (service role) - NE JAMAIS EXPOSER CÔTÉ CLIENT
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Étape 2 : Où trouver ces valeurs ?

1. Va sur [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionne ton projet (ou crées-en un nouveau)
3. Va dans **Settings** (icône engrenage) > **API**
4. Copie :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

## Étape 3 : Créer les tables (Migration)

1. Dans Supabase Dashboard, va dans **SQL Editor**
2. Clique sur **New query**
3. Copie-colle le contenu de `database/schema.sql`
4. Clique sur **Run**

## Étape 4 : Insérer les données de test (Seeding)

1. Dans **SQL Editor**, crée une nouvelle requête
2. Copie-colle le contenu de `database/seed.sql`
3. Clique sur **Run**

## Étape 5 : Générer les types TypeScript (Optionnel)

```bash
# Installer Supabase CLI
npm install -g supabase

# Login
supabase login

# Générer les types
supabase gen types typescript --project-id VOTRE_PROJECT_ID > src/types/database.types.ts
```

## ✅ Vérification

Après avoir configuré, redémarre le serveur :
```bash
npm run dev
```

Les données devraient se charger depuis Supabase !

