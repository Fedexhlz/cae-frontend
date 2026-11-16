// Colores de la marca lateral de cada tarjeta, según el tipo de aviso
const COLORES = {
  inactivo: "border-l-slate-400",
  deuda: "border-l-amber-400",
  sin_pagos: "border-l-slate-300",
  por_vencer: "border-l-emerald-400",
};

function NotificationsPanel({ notificaciones, onRegistrarPago, guardandoId }) {
  return (
    <aside aria-label="Notificaciones de cuotas" className="border border-line">
      <h2 className="border-b border-line bg-paper-soft px-5 py-4 text-[11px] font-bold tracking-[2px] uppercase">
        Notificaciones ({notificaciones.length})
      </h2>

      {notificaciones.length === 0 ? (
        <p className="px-5 py-8 text-sm text-muted">No hay avisos por ahora.</p>
      ) : (
        // max-h limita la altura y overflow-y-auto agrega el scroll vertical
        <ul className="max-h-[32rem] overflow-y-auto">
          {notificaciones.map((aviso) => (
            <li
              key={aviso.socioId}
              className={`border-t border-l-4 border-t-line px-5 py-4 first:border-t-0 ${
                // Debe 2 meses se marca en rojo en lugar de amarillo
                aviso.tipo === "deuda" && aviso.meses === 2
                  ? "border-l-red-400"
                  : COLORES[aviso.tipo]
              }`}
            >
              <p className="font-semibold">{aviso.nombre}</p>
              <p className="mt-1 text-sm text-muted">{aviso.mensaje}</p>
              <button
                type="button"
                onClick={() => onRegistrarPago(aviso)}
                disabled={guardandoId === aviso.socioId}
                className="mt-3 border border-ink px-3 py-1.5 text-[11px] font-bold uppercase transition-colors hover:bg-ink hover:text-white disabled:opacity-60"
              >
                {guardandoId === aviso.socioId
                  ? "Guardando..."
                  : "Registrar pago"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default NotificationsPanel;
