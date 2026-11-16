import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

// Cliente preconfigurado: todas las peticiones llevan la dirección base y la clave
const api = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
  },
});

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
  const { data } = await api.get("/noticias", {
    params: { select: "*", order: "date.desc" },
  });
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
