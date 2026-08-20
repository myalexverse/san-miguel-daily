-- 1. Crear tabla de suscriptores al boletín
CREATE TABLE public.subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(tenant_id, email)
);

-- 2. Habilitar la seguridad de la tabla (RLS)
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- 3. Borrar políticas anteriores por si acaso
DROP POLICY IF EXISTS "Nadie puede ver los correos públicamente" ON public.subscribers;
DROP POLICY IF EXISTS "Solo el servidor interno puede insertar correos" ON public.subscribers;

-- 4. Asegurar que los correos sean invisibles e intocables desde el frontend público.
-- Al no crear ninguna política de "SELECT", "INSERT" o "UPDATE", la tabla queda 100% bloqueada.
-- Solo nuestro servidor (Next.js con la Service Role Key) podrá guardar y ver los correos.
