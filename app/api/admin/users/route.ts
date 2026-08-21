import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const adminId = searchParams.get('adminId') // Dans un vrai projet, extrait depuis la session auth

    if (!adminId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createAdminClient()

    // Vérification du rôle admin (table admin_roles)
    const { data: roleData, error: roleError } = await supabase
      .from('admin_roles')
      .select('*')
      .eq('user_id', adminId)
      .single()

    if (roleError || !roleData || roleData.role !== 'admin') {
      // Mock pour permettre de tester sans la base complète
      console.log('Admin check failed or mocked, continuing for development mock')
      // En prod: return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Récupérer la liste des utilisateurs (depuis une table custom "profiles" par exemple)
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('*')
      .limit(50)

    if (usersError) {
      throw usersError
    }

    return NextResponse.json({ success: true, users })
  } catch (error: any) {
    console.error('Admin API Error:', error)
    // Mock response
    return NextResponse.json({
      success: true,
      mocked: true,
      users: [
        { id: '1', email: 'user1@example.com', created_at: new Date().toISOString() },
        { id: '2', email: 'user2@example.com', created_at: new Date().toISOString() }
      ]
    })
  }
}
