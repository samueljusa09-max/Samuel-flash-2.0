import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/database'

export function createAdminClient() {
  // Client avec service_role, utilisable uniquement côté serveur (routes API)
  // Contourne le RLS pour des modifications sécurisées
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookies().getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookies().set(name, value, options)
            )
          } catch {
            // Ignoré si appelé depuis un contexte qui ne permet pas de set des cookies
          }
        },
      },
    }
  )
}
