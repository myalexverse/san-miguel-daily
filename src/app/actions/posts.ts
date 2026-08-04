'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const tenant_id = formData.get('tenant_id') as string
  const status = formData.get('status') as string

  if (!title || !content || !tenant_id) {
    throw new Error('Faltan campos requeridos')
  }

  // Generar slug
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4)

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        title,
        slug,
        content,
        tenant_id,
        status: status || 'draft',
        published_at: status === 'published' ? new Date().toISOString() : null
      }
    ])
    .select()

  if (error) {
    console.error('Error creating post:', error)
    throw new Error(error.message)
  }

  revalidatePath('/admin/posts')
  redirect('/admin/posts')
}

export async function deletePost(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)
    
  if (error) {
    throw new Error(error.message)
  }
  
  revalidatePath('/admin/posts')
}
