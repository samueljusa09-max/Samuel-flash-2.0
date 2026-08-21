# Sam Flash - Video Generation Platform

Projet Next.js 14 avec App Router connecté à Supabase, Grok (Génération Vidéo) et SwyChr (Paiements).

## Prérequis
- Node.js (v18+)
- npm ou pnpm
- Un projet Supabase

## Variables d'environnement
Créez un fichier `.env.local` à la racine du projet (vous pouvez copier `.env.local.example`) :
```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_role
GROK_API_KEY=votre_cle_grok
SWYCHR_API_KEY=votre_cle_swychr
SWYCHR_WEBHOOK_SECRET=votre_secret_webhook
```

**⚠️ SÉCURITÉ :** La clé `SUPABASE_SERVICE_ROLE_KEY` et les autres clés d'API (Grok, SwyChr) ne doivent **jamais** être exposées au client. Elles sont exclusivement utilisées côté serveur (ex: dans `/lib/supabase/server.ts` et les routes de `/app/api/`).

## Lancement en local

1. Installer les dépendances :
```bash
npm install
```

2. Lancer le serveur de développement :
```bash
npm run dev
```

3. Ouvrir [http://localhost:3000/dashboard](http://localhost:3000/dashboard) dans votre navigateur pour voir le mock de l'interface utilisateur. L'interface admin est sur `/admin`.

## Structure du projet
- `/app/api/` : Les routes backend (génération, paiements, admin). Elles mockent actuellement les retours si la BDD n'est pas connectée.
- `/lib/supabase/` : Clients Supabase (`client.ts` pour le navigateur, `server.ts` avec la clé admin pour les routes API).
- `/lib/grok/` et `/lib/swychr/` : Clients simulés pour les APIs externes.
- `/types/database.ts` : Types TypeScript générés d'après le schéma SQL demandé.

## Base de données
Assurez-vous d'avoir exécuté votre fichier `sam_flash_schema.sql` dans votre projet Supabase.
Le backend attend les tables : `profiles`, `subscriptions`, `credits_wallet`, `credit_transactions`, `video_generations`, `daily_usage`, `payments`, `admin_roles`, `generation_queue`.

> **Note :** Tant que les clés API ne sont pas configurées, les routes API (Grok, DB) renvoient des données mockées pour permettre le développement du frontend.
