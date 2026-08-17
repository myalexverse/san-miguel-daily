"use server";

import { createClient } from "@supabase/supabase-js";

// We use the service role key to bypass RLS, because the public is not allowed to insert directly
// This ensures that the only way to subscribe is through this validated Server Action endpoint.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function subscribeAction(formData: FormData) {
  const email = formData.get("email")?.toString();
  const domain = formData.get("domain")?.toString() || "daily.localhost"; // Default for San Miguel Daily

  if (!email || !email.includes("@")) {
    return { success: false, message: "Por favor, ingresa un correo válido." };
  }

  try {
    // 1. Fetch the tenant ID for the current domain
    const { data: tenant, error: tenantError } = await supabase
      .from("tenants")
      .select("id")
      .eq("domain", domain)
      .single();

    if (tenantError || !tenant) {
      console.error("Tenant fetch error:", tenantError);
      return { success: false, message: "Error interno. Por favor intenta más tarde." };
    }

    // 2. Insert the subscriber
    const { error: insertError } = await supabase
      .from("subscribers")
      .insert({
        tenant_id: tenant.id,
        email: email.toLowerCase(),
      });

    if (insertError) {
      if (insertError.code === "23505") { // Unique violation
        return { success: false, message: "Este correo ya está suscrito." };
      }
      console.error("Insert error:", insertError);
      return { success: false, message: "Ocurrió un error al guardar tu suscripción." };
    }

    return { success: true, message: "¡Gracias por suscribirte al boletín!" };
  } catch (err) {
    console.error("Subscription error:", err);
    return { success: false, message: "Error interno. Por favor intenta más tarde." };
  }
}
