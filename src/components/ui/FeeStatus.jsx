import { ESTADOS_CUOTA } from "../../constants/cuotas.js";

function FeeStatus({ estado }) {
  const config = ESTADOS_CUOTA[estado] ?? {
    label: estado ?? "Sin datos",
    className: "bg-paper-soft text-muted ring-line",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${config.className}`}
    >
      {config.label}
    </span>
  );
}

export default FeeStatus;
