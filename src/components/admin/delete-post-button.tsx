'use client'

import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"
import { deletePost } from "@/app/actions/posts"
import { useState } from "react"

export function DeletePostButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de que deseas eliminar esta noticia permanentemente?")) {
      setIsDeleting(true)
      try {
        await deletePost(id)
      } catch (e: any) {
        alert("Error al eliminar: " + e.message)
        setIsDeleting(false)
      }
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="text-destructive" 
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  )
}
