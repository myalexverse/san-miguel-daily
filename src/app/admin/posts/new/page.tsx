import { createClient } from '@/lib/supabase/server'
import { PostForm } from '@/components/admin/post-form'

export const dynamic = 'force-dynamic'

export default async function NewPostPage() {
  const supabase = await createClient()

  // Traer los Tenants disponibles para poblar el Select
  const { data: tenants } = await supabase
    .from('tenants')
    .select('id, name')
    .order('name')

  return <PostForm tenants={tenants || []} />
}
