const MS_POR_DIA = 24 * 60 * 60 * 1000;

// Días enteros desde una fecha "AAAA-MM-DD" hasta hoy (null si no hay fecha)
export function diasDesdePago(fechaUltimoPago, hoy = new Date()) {
  if (!fechaUltimoPago) return null;
  const [anio, mes, dia] = fechaUltimoPago.split("-").map(Number);
  // Se comparan ambas fechas a medianoche local, para no depender de la hora ni de la zona horaria
  const pago = new Date(anio, mes - 1, dia);
  const hoyMedianoche = new Date(
    hoy.getFullYear(),
    hoy.getMonth(),
    hoy.getDate(),
  );
  return Math.round((hoyMedianoche - pago) / MS_POR_DIA);
}

// Estado de la cuota según los días desde el último pago
export function estadoCuota(fechaUltimoPago, hoy = new Date()) {
  const dias = diasDesdePago(fechaUltimoPago, hoy);
  if (dias === null) return "pendiente";
  if (dias <= 30) return "al_dia";
  if (dias <= 60) return "pendiente";
  if (dias <= 90) return "vencida";
  return "inactivo";
}