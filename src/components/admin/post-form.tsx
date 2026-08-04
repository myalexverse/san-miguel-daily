'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, ArrowLeft, Wand2, Send, Loader2 } from "lucide-react"
import Link from "next/link"
import { TipTapEditor } from "./tiptap-editor"
import { createPost } from "@/app/actions/posts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Tenant = {
  id: string
  name: string
}

export function PostForm({ tenants }: { tenants: Tenant[] }) {
  const [title, setTitle] = React.useState("")
  const [content, setContent] = React.useState("<p>Escribe tu noticia aquí...</p>")
  const [tenantId, setTenantId] = React.useState(tenants[0]?.id || "")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!title.trim() || !tenantId) return alert("Título y Medio son obligatorios")
    setIsSubmitting(true)
    
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      formData.append('tenant_id', tenantId)
      formData.append('status', status)
      
      await createPost(formData)
      // Redirect happens in server action
    } catch (e: any) {
      alert("Error al guardar: " + e.message)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/posts">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Crear Noticia</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => handleSubmit('draft')}
            disabled={isSubmitting}
          >
            Guardar Borrador
          </Button>
          <Button 
            onClick={() => handleSubmit('published')}
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Publicar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Principal */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="tenant" className="text-sm font-semibold">Selecciona el Medio (Tenant)</Label>
            <Select value={tenantId} onValueChange={setTenantId}>
              <SelectTrigger className="w-[300px] bg-background">
                <SelectValue placeholder="Selecciona un medio..." />
              </SelectTrigger>
              <SelectContent>
                {tenants.map(t => (
                  <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-lg">Título de la noticia</Label>
            <div className="flex gap-2">
              <Input 
                id="title" 
                placeholder="Escribe un título llamativo..." 
                className="text-lg font-medium bg-background"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Button type="button" variant="secondary" className="shrink-0 bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20 border-0" onClick={() => alert("Antigravity: Generando título...")}>
                <Wand2 className="mr-2 h-4 w-4" /> ✨ Generar
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Contenido</Label>
              <Button type="button" variant="ghost" size="sm" className="h-8 text-indigo-500" onClick={() => alert("Antigravity: Mejorando redacción...")}>
                ✨ Mejorar redacción
              </Button>
            </div>
            <TipTapEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Panel Lateral (Asistente IA y Config) */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border/50 bg-card p-4 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-indigo-500" />
              Asistente Antigravity IA
            </h3>
            <p className="text-sm text-muted-foreground">
              Utiliza la inteligencia artificial para optimizar esta noticia antes de publicarla.
            </p>
            <div className="grid gap-2">
              <Button variant="outline" className="justify-start h-auto py-3" onClick={() => alert("Antigravity: Corrigiendo...")}>
                <span className="text-indigo-500 mr-2">✨</span> Corregir ortografía
              </Button>
              <Button variant="outline" className="justify-start h-auto py-3" onClick={() => alert("Antigravity: Resumiendo...")}>
                <span className="text-indigo-500 mr-2">✨</span> Crear resumen breve
              </Button>
              <Button variant="outline" className="justify-start h-auto py-3" onClick={() => alert("Antigravity: Optimizando SEO...")}>
                <span className="text-indigo-500 mr-2">✨</span> Optimizar SEO y Meta
              </Button>
              <Button variant="outline" className="justify-start h-auto py-3" onClick={() => alert("Antigravity: Traduciendo...")}>
                <span className="text-indigo-500 mr-2">✨</span> Traducir a Inglés
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border/50 bg-card p-4 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Send className="h-4 w-4" />
              Redes Sociales
            </h3>
            <div className="grid gap-2">
              <Button variant="secondary" className="justify-start bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20" onClick={() => alert("Antigravity: Facebook Post")}>
                ✨ Crear post Facebook
              </Button>
              <Button variant="secondary" className="justify-start bg-[#E1306C]/10 text-[#E1306C] hover:bg-[#E1306C]/20" onClick={() => alert("Antigravity: IG Post")}>
                ✨ Crear post Instagram
              </Button>
              <Button variant="secondary" className="justify-start bg-black/10 dark:bg-white/10 text-foreground" onClick={() => alert("Antigravity: X Post")}>
                ✨ Crear post X
              </Button>
              <Button variant="secondary" className="justify-start bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20" onClick={() => alert("Antigravity: WhatsApp")}>
                ✨ Crear texto WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
