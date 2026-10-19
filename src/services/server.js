import axios from "axios";

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

export const loginSocio = async (email, password) => {
  const { data } = await api.get("/socios", {
    params: {
      select: "id,email",
      email: `eq.${email}`,
      password: `eq.${password}`,
    },
  });

  // data es una lista: con una fila los datos coinciden, vacía significa que no
  return data.length > 0 ? data[0] : null;
};

export const getNoticias = async () => {
  const { data } = await api.get("/noticias", {
    params: { select: "*", order: "date.desc" },
  });
  return data;
};
