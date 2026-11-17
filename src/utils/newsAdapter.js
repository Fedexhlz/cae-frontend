import { formatearFecha } from "./dates.js";

// Estilo de la etiqueta según la categoría; cualquier categoría nueva queda "soft"
const VARIANTES = {
  Básquet: "filled",
  Cestoball: "outline",
  Club: "soft",
};

// Pasa una fila de Supabase al formato que espera NewsCard
export function adaptarNoticia(noticia) {
  return {
    ...noticia,
    tagVariant: VARIANTES[noticia.category] ?? "soft",
    date: formatearFecha(noticia.date),
    dateTime: noticia.date,
  };
}