import { mesesAdeudados, proximoVencimiento } from "./fees.js";

const DIAS_DE_AVISO = 7;
const MS_POR_DIA = 24 * 60 * 60 * 1000;

// Orden de urgencia: el número menor aparece primero
const PRIORIDAD = { inactivo: 0, deuda: 1, sin_pagos: 2, por_vencer: 3 };

// Días enteros desde hoy hasta una fecha futura
function diasHasta(fecha, hoy) {
  const hoyMedianoche = new Date(
    hoy.getFullYear(),
    hoy.getMonth(),
    hoy.getDate(),
  );
  return Math.round((fecha - hoyMedianoche) / MS_POR_DIA);
}

// Arma una tarjeta por cada socio que necesita atención (o null si no hace falta)
function notificacionDe(socio, hoy) {
  const base = { socioId: socio.socio_id, nombre: socio.nombre };
  const meses = mesesAdeudados(socio.fecha_ultimo_pago, hoy);

  if (meses === null) {
    return { ...base, tipo: "sin_pagos", meses: null, diasRestantes: null, mensaje: "Todavía no registra pagos" };
  }
  if (meses >= 3) {
    return { ...base, tipo: "inactivo", meses, diasRestantes: null, mensaje: `Inactivo: debe ${meses} meses` };
  }
  if (meses >= 1) {
    return { ...base, tipo: "deuda", meses, diasRestantes: null, mensaje: `Debe ${meses} ${meses === 1 ? "mes" : "meses"}` };
  }

  const dias = diasHasta(proximoVencimiento(socio.fecha_ultimo_pago, hoy), hoy);
  if (dias <= DIAS_DE_AVISO) {
    return {
      ...base,
      tipo: "por_vencer",
      meses: 0,
      diasRestantes: dias,
      mensaje: dias === 0 ? "Pasa a pendiente hoy" : `Pasa a pendiente en ${dias} ${dias === 1 ? "día" : "días"}`,
    };
  }
  return null;
}

// Lista de notificaciones ordenada por urgencia (y, dentro de cada tipo, por más meses o menos días)
export function armarNotificaciones(socios, hoy = new Date()) {
  return socios
    .map((socio) => notificacionDe(socio, hoy))
    .filter(Boolean)
    .sort((a, b) => {
      if (PRIORIDAD[a.tipo] !== PRIORIDAD[b.tipo]) {
        return PRIORIDAD[a.tipo] - PRIORIDAD[b.tipo];
      }
      if (a.tipo === "por_vencer") return a.diasRestantes - b.diasRestantes;
      return (b.meses ?? 0) - (a.meses ?? 0);
    });
}