import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "../services/server.js";

// Guarda quién inició sesión. persist lo copia en localStorage para que sobreviva a recargar la página
export const useAuthStore = create(
  persist(
    (set) => ({
      socio: null,
      iniciarSesion: (socio) => set({ socio }),
      cerrarSesion: () => {
        supabase.auth.signOut();
        set({ socio: null });
      },
    }),
    { name: "cae-sesion" },
  ),
);