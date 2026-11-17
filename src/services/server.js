import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const loginSocio = async (email, password) => {
  // 1. Supabase Auth verifica el email y la contraseña
  const { data: auth, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Datos incorrectos: se devuelve null, como antes
    if (error.code === "invalid_credentials") return null;
    // Cualquier otro error (red, servidor) lo maneja el catch de la página
    throw error;
  }

  // 2. Buscamos la fila de socios vinculada a ese usuario
  const { data: socio, error: errorSocio } = await supabase
    .from("socios")
    .select("id,email,rol")
    .eq("auth_id", auth.user.id)
    .maybeSingle();

  if (errorSocio) throw errorSocio;

  // 3. Existe en Auth pero no está vinculado a un socio: no lo dejamos pasar
  if (!socio) {
    await supabase.auth.signOut();
    return null;
  }

  return socio;
};

export const getNoticias = async () => {
  const { data, error } = await supabase
    .from("noticias")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;
  return data;
};

export const getSocios = async () => {
  const { data, error } = await supabase
    .from("perfiles")
    .select("socio_id,nombre,documento,estado_cuotas,deportes,fecha_nacimiento,fecha_ultimo_pago")
    .order("nombre", { ascending: true });

  if (error) throw error;
  return data;
};

export const getPerfil = async (socioId) => {
  const { data, error } = await supabase
    .from("perfiles")
    .select("socio_id,nombre,documento,estado_cuotas,deportes,fecha_nacimiento,fecha_ultimo_pago")
    .eq("socio_id", socioId)
    .maybeSingle();

  if (error) throw error;
  // maybeSingle devuelve la fila, o null si el socio no tiene perfil
  return data;
};

export const registrarPago = async (socioId, fechaUltimoPago) => {
  const { data, error } = await supabase
    .from("perfiles")
    .update({ fecha_ultimo_pago: fechaUltimoPago })
    .eq("socio_id", socioId)
    .select("socio_id,fecha_ultimo_pago");

  if (error) throw error;
  // Si la política no deja escribir, Supabase no da error: devuelve 0 filas
  if (data.length === 0) throw new Error("No se pudo registrar el pago");
  return data[0];
};

export const eliminarSocio = async (socioId) => {
  const { data, error } = await supabase.functions.invoke("delete-member", {
    body: { socioId },
  });

  if (error) {
    // Si la función respondió con un error (400, 403, 404, 500), el mensaje viene en el cuerpo
    let mensaje = error.message;
    try {
      const cuerpo = await error.context.json();
      if (cuerpo?.error) mensaje = cuerpo.error;
    } catch {
      // Si no se puede leer el cuerpo, queda el mensaje genérico
    }
    throw new Error(mensaje);
  }

  return data;
};

export const crearSocio = async (datos) => {
  const { data, error } = await supabase.functions.invoke("create-member", {
    body: datos,
  });

  if (error) {
    // Si la función respondió con un error (400, 409, 500), el mensaje viene en el cuerpo
    let mensaje = error.message;
    try {
      const cuerpo = await error.context.json();
      if (cuerpo?.error) mensaje = cuerpo.error;
    } catch {
      // Si no se puede leer el cuerpo, queda el mensaje genérico
    }
    throw new Error(mensaje);
  }

  return data;
};

export const actualizarPerfil = async (socioId, cambios) => {
  const { data, error } = await supabase
    .from("perfiles")
    .update(cambios)
    .eq("socio_id", socioId)
    .select("socio_id,nombre,documento,deportes,fecha_nacimiento");

  if (error) {
    // 23505: el documento ya pertenece a otro socio (columna unique)
    if (error.code === "23505") throw new Error("Ese documento ya está cargado");
    throw error;
  }
  if (data.length === 0) throw new Error("No se pudo guardar el socio");
  return data[0];
};

export const crearNoticia = async (noticia) => {
  const { data, error } = await supabase
    .from("noticias")
    .insert(noticia)
    .select("*");

  if (error) throw error;
  if (data.length === 0) throw new Error("No se pudo crear la noticia");
  return data[0];
};

export const actualizarNoticia = async (id, cambios) => {
  const { data, error } = await supabase
    .from("noticias")
    .update(cambios)
    .eq("id", id)
    .select("*");

  if (error) throw error;
  if (data.length === 0) throw new Error("No se pudo guardar la noticia");
  return data[0];
};

export const eliminarNoticia = async (id) => {
  const { data, error } = await supabase
    .from("noticias")
    .delete()
    .eq("id", id)
    .select("id");

  if (error) throw error;
  if (data.length === 0) throw new Error("No se pudo eliminar la noticia");
};

