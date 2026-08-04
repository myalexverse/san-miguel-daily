import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { PlusCircle, Edit } from 'lucide-react'
import { DeletePostButton } from '@/components/admin/delete-post-button'

export const dynamic = 'force-dynamic'

export default async function PostsPage() {
  const supabase = await createClient()

  // Intentamos traer los posts de la base de datos
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      id, title, status, published_at,
      tenants ( name )
    `)
    .order('created_at', { ascending: false })

  const postsList = posts || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Noticias</h1>
          <p className="text-muted-foreground mt-2">
            Administra todas las publicaciones de tus medios.
          </p>
        </div>
        <Link href="/admin/posts/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nueva Noticia
          </Button>
        </Link>
      </div>

      <div className="rounded-md border border-border/50 bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Medio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {postsList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No hay noticias publicadas aún. Crea la primera.
                </TableCell>
              </TableRow>
            ) : (
              postsList.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    {/* @ts-ignore */}
                    <Badge variant="outline">{post.tenants?.name || 'Desconocido'}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                      {post.status === 'published' ? 'Publicado' : 'Borrador'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {post.published_at 
                      ? new Date(post.published_at).toLocaleDateString()
                      : '—'
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DeletePostButton id={post.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
