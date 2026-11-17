const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

// Pasa "2026-10-12" a "12 oct 2026", sin pasar por Date para evitar el desfase de zona horaria
export function formatearFecha(texto) {
  if (!texto) return "";
  const [anio, mes, dia] = texto.split("-");
  return `${Number(dia)} ${MESES[Number(mes) - 1]} ${anio}`;
}