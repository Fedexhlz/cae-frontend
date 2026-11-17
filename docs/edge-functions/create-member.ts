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
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const url = Deno.env.get("SUPABASE_URL")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const authHeader = req.headers.get("Authorization") ?? "";
  const cliente = createClient(url, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data: usuario } = await cliente.auth.getUser();
  if (!usuario?.user) return responder({ error: "No autenticado" }, 401);

  const admin = createClient(url, serviceKey);

  const { data: quien } = await admin
    .from("socios")
    .select("id,rol")
    .eq("auth_id", usuario.user.id)
    .maybeSingle();
  if (quien?.rol !== "admin") return responder({ error: "Solo un admin puede crear" }, 403);

  // Datos que manda el formulario
  const cuerpo = await req.json();
  const email = String(cuerpo.email ?? "").trim().toLowerCase();
  const nombre = String(cuerpo.nombre ?? "").trim();
  const documento = String(cuerpo.documento ?? "").trim();
  const fechaNacimiento = cuerpo.fechaNacimiento || null;
  const fechaUltimoPago = cuerpo.fechaUltimoPago || null;
  const deportes = Array.isArray(cuerpo.deportes) ? cuerpo.deportes : [];

  if (!email.includes("@")) return responder({ error: "El email no es válido" }, 400);
  if (!nombre) return responder({ error: "Falta el nombre y apellido" }, 400);
  if (documento.length < 6) {
    return responder({ error: "El documento debe tener al menos 6 caracteres (es la contraseña inicial)" }, 400);
  }
  if (!fechaNacimiento) return responder({ error: "Falta la fecha de nacimiento" }, 400);

  // ¿Ya existe ese email o ese documento? Lo revisamos antes de crear nada
  const { data: emailRepetido } = await admin
    .from("socios")
    .select("id")
    .eq("email", email)
    .maybeSingle();
  if (emailRepetido) return responder({ error: "Ese email ya está registrado" }, 409);

  const { data: documentoRepetido } = await admin
    .from("perfiles")
    .select("socio_id")
    .eq("documento", documento)
    .maybeSingle();
  if (documentoRepetido) return responder({ error: "Ese documento ya está cargado" }, 409);

  // 1) Usuario de Auth: la contraseña inicial es el documento
  const { data: nuevo, error: errorAuth } = await admin.auth.admin.createUser({
    email,
    password: documento,
    email_confirm: true,
  });
  if (errorAuth || !nuevo?.user) {
    const yaExiste = errorAuth?.message?.toLowerCase().includes("already");
    return responder(
      { error: yaExiste ? "Ese email ya está registrado" : errorAuth?.message ?? "No se pudo crear el usuario" },
      yaExiste ? 409 : 500,
    );
  }
  const authId = nuevo.user.id;

  // 2) Fila en socios. Si falla, deshacemos el usuario de Auth
  const { data: socio, error: errorSocio } = await admin
    .from("socios")
    .insert({ email, rol: "socio", auth_id: authId })
    .select("id")
    .single();
  if (errorSocio || !socio) {
    await admin.auth.admin.deleteUser(authId);
    return responder({ error: errorSocio?.message ?? "No se pudo crear el socio" }, 500);
  }

  // 3) Fila en perfiles. Si falla, deshacemos socios y después Auth
  const { error: errorPerfil } = await admin.from("perfiles").insert({
    socio_id: socio.id,
    nombre,
    documento,
    fecha_nacimiento: fechaNacimiento,
    fecha_ultimo_pago: fechaUltimoPago,
    deportes,
  });
  if (errorPerfil) {
    await admin.from("socios").delete().eq("id", socio.id);
    await admin.auth.admin.deleteUser(authId);
    const documentoDuplicado = errorPerfil.code === "23505";
    return responder(
      { error: documentoDuplicado ? "Ese documento ya está cargado" : errorPerfil.message },
      documentoDuplicado ? 409 : 500,
    );
  }

  return responder({ ok: true, socioId: socio.id });
});