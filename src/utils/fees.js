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

// Estado de la cuota según los meses adeudados
export function estadoCuota(fechaUltimoPago, hoy = new Date()) {
  const meses = mesesAdeudados(fechaUltimoPago, hoy);
  if (meses === null) return "pendiente";
  if (meses === 0) return "al_dia";
  if (meses === 1) return "pendiente";
  if (meses === 2) return "vencida";
  return "inactivo";
}

export function mesesAdeudados(fechaUltimoPago, hoy = new Date()) {
  if (!fechaUltimoPago) return null;
  const [anio, mes, dia] = fechaUltimoPago.split("-").map(Number);

  let meses =
    (hoy.getFullYear() - anio) * 12 + (hoy.getMonth() + 1 - mes);

  // Último día del mes actual (el día 0 del mes siguiente es el último de este)
  const ultimoDiaDelMes = new Date(
    hoy.getFullYear(),
    hoy.getMonth() + 1,
    0,
  ).getDate();

  // Si pagó el 31 y el mes tiene 28 días, el mes se cumple el 28
  const diaDeVencimiento = Math.min(dia, ultimoDiaDelMes);
  if (hoy.getDate() < diaDeVencimiento) meses -= 1;

  return meses;
}

// Fecha en que se cumple el próximo mes desde el último pago (null si no hay fecha)
export function proximoVencimiento(fechaUltimoPago, hoy = new Date()) {
  const meses = mesesAdeudados(fechaUltimoPago, hoy);
  if (meses === null) return null;
  const [anio, mes, dia] = fechaUltimoPago.split("-").map(Number);

  // Mes en el que cae el próximo vencimiento (meses cumplidos + 1)
  const destino = new Date(anio, mes - 1 + meses + 1, 1);
  // Último día de ese mes, por si el socio pagó el 29, 30 o 31
  const ultimoDia = new Date(
    destino.getFullYear(),
    destino.getMonth() + 1,
    0,
  ).getDate();

  return new Date(
    destino.getFullYear(),
    destino.getMonth(),
    Math.min(dia, ultimoDia),
  );
}

// Suma un mes calendario a una fecha "AAAA-MM-DD" y devuelve otra "AAAA-MM-DD".
// Si el día no existe en el mes siguiente (31 de enero), cae en el último día (28 de febrero).
export function sumarUnMes(fecha) {
  const [anio, mes, dia] = fecha.split("-").map(Number);
  const ultimoDia = new Date(anio, mes + 1, 0).getDate();
  const nuevoDia = Math.min(dia, ultimoDia);
  const resultado = new Date(anio, mes, nuevoDia);

  const dd = String(resultado.getDate()).padStart(2, "0");
  const mm = String(resultado.getMonth() + 1).padStart(2, "0");
  return `${resultado.getFullYear()}-${mm}-${dd}`;
}