import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const responder = (cuerpo: unknown, status = 200) =>
  new Response(JSON.stringify(cuerpo), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  // El navegador pregunta primero si puede llamar a la función (CORS)
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const url = Deno.env.get("SUPABASE_URL")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  // Cliente con el token de quien llama: sirve para saber quién es
  const authHeader = req.headers.get("Authorization") ?? "";
  const cliente = createClient(url, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data: usuario } = await cliente.auth.getUser();
  if (!usuario?.user) return responder({ error: "No autenticado" }, 401);

  // Cliente con permisos totales: solo vive dentro de la función
  const admin = createClient(url, serviceKey);

  // ¿Quien pide es admin?
  const { data: quien } = await admin
    .from("socios")
    .select("id,rol")
    .eq("auth_id", usuario.user.id)
    .maybeSingle();
  if (quien?.rol !== "admin") return responder({ error: "Solo un admin puede borrar" }, 403);

  const { socioId } = await req.json();
  if (!socioId) return responder({ error: "Falta socioId" }, 400);
  if (socioId === quien.id) return responder({ error: "No podés borrarte a vos mismo" }, 400);

  const { data: socio } = await admin
    .from("socios")
    .select("id,auth_id")
    .eq("id", socioId)
    .maybeSingle();
  if (!socio) return responder({ error: "El socio no existe" }, 404);

  // Primero el usuario de Auth (si tiene uno), después la fila de socios
  if (socio.auth_id) {
    const { error } = await admin.auth.admin.deleteUser(socio.auth_id);
    if (error) return responder({ error: error.message }, 500);
  }

  // Si el usuario de Auth ya se borró, auth_id queda en null por on delete set null; borramos la fila igual
  const { error: errorFila } = await admin.from("socios").delete().eq("id", socioId);
  if (errorFila) return responder({ error: errorFila.message }, 500);

  return responder({ ok: true });
});