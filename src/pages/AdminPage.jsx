import { useEffect, useMemo, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import { getSocios } from "../services/server.js";

// Clave = valor guardado en la base. Ajustá acá si tus valores son otros
const ESTADOS_CUOTA = {
  al_dia: {
    label: "Al día",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  pendiente: {
    label: "Pendiente",
    className: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  vencida: {
    label: "Vencida",
    className: "bg-red-50 text-red-700 ring-red-200",
  },
};

const DEPORTES = {
  basquet: "Básquet",
  cestoball: "Cestoball",
};

// Pasa a minúsculas y quita tildes, para comparar y buscar sin errores
const normalizar = (texto) =>
  String(texto ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

// Si el socio no tiene deportes cargados, devolvemos una lista vacía
const listaDeportes = (socio) =>
  Array.isArray(socio.deportes) ? socio.deportes : [];

function EstadoCuota({ estado }) {
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

function DeporteChip({ deporte }) {
  return (
    <span className="inline-block border border-line px-2.5 py-1 text-[11px] font-bold tracking-[1px] uppercase">
      {DEPORTES[normalizar(deporte)] ?? deporte}
    </span>
  );
}

function AdminPage() {
  const [socios, setSocios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // Cambiar este número vuelve a disparar la carga (botón "Reintentar")
  const [intento, setIntento] = useState(0);

  const [busqueda, setBusqueda] = useState("");
  const [filtroCuota, setFiltroCuota] = useState("todas");
  const [filtroDeporte, setFiltroDeporte] = useState("todos");

  useEffect(() => {
    // Si el componente se desmonta antes de que llegue la respuesta, la ignoramos
    let cancelado = false;

    getSocios()
      .then((data) => {
        if (!cancelado) setSocios(data);
      })
      .catch(() => {
        if (!cancelado) setError(true);
      })
      .finally(() => {
        if (!cancelado) setLoading(false);
      });

    return () => {
      cancelado = true;
    };
  }, [intento]);

  const reintentar = () => {
    setLoading(true);
    setError(false);
    setIntento((n) => n + 1);
  };

  // Lista ya filtrada: se recalcula solo si cambian los datos o algún filtro
  const visibles = useMemo(() => {
    const texto = normalizar(busqueda);

    return socios.filter((socio) => {
      const coincideTexto =
        normalizar(socio.nombre).includes(texto) ||
        normalizar(socio.documento).includes(texto);
      const coincideCuota =
        filtroCuota === "todas" || socio.estado_cuotas === filtroCuota;
      const coincideDeporte =
        filtroDeporte === "todos" ||
        listaDeportes(socio).some((d) => normalizar(d) === filtroDeporte);

      return coincideTexto && coincideCuota && coincideDeporte;
    });
  }, [socios, busqueda, filtroCuota, filtroDeporte]);

  const inputClassName =
    "border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-ink";

  return (
    <section className="px-[6%] py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="ADMINISTRACIÓN" lines={["SOCIOS"]} />

        {/* Herramientas de lectura: buscador y filtros */}
        <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <FaMagnifyingGlass
              aria-hidden="true"
              className="absolute top-1/2 left-4 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
              placeholder="Buscar por nombre o documento"
              aria-label="Buscar socio por nombre o documento"
              className={`${inputClassName} w-full pl-11`}
            />
          </div>

          <select
            value={filtroCuota}
            onChange={(event) => setFiltroCuota(event.target.value)}
            aria-label="Filtrar por estado de cuotas"
            className={inputClassName}
          >
            <option value="todas">Todas las cuotas</option>
            {Object.entries(ESTADOS_CUOTA).map(([valor, { label }]) => (
              <option key={valor} value={valor}>
                {label}
              </option>
            ))}
          </select>

          <select
            value={filtroDeporte}
            onChange={(event) => setFiltroDeporte(event.target.value)}
            aria-label="Filtrar por deporte"
            className={inputClassName}
          >
            <option value="todos">Todos los deportes</option>
            {Object.entries(DEPORTES).map(([valor, label]) => (
              <option key={valor} value={valor}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Contador de resultados */}
        {!loading && !error && (
          <p aria-live="polite" className="mt-6 text-sm text-muted">
            {visibles.length} de {socios.length} socios
          </p>
        )}

        <div className="mt-4 overflow-x-auto border border-line">
          {loading && (
            <p className="px-6 py-16 text-center text-muted">
              Cargando socios...
            </p>
          )}

          {error && (
            <div className="px-6 py-16 text-center">
              <p className="font-semibold">No pudimos cargar los socios.</p>
              <button
                type="button"
                onClick={reintentar}
                className="mt-4 bg-ink px-6 py-3 text-sm font-bold text-white uppercase hover:bg-ink-light"
              >
                Reintentar
              </button>
            </div>
          )}

          {!loading && !error && visibles.length === 0 && (
            <p className="px-6 py-16 text-center text-muted">
              No hay socios que coincidan con la búsqueda.
            </p>
          )}

          {!loading && !error && visibles.length > 0 && (
            <table className="w-full min-w-175 border-collapse text-left">
              <caption className="sr-only">Listado de socios del club</caption>
              <thead className="bg-paper-soft">
                <tr>
                  {["Nombre", "Documento", "Cuotas", "Deportes"].map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="px-6 py-4 text-[11px] font-bold tracking-[2px] uppercase"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibles.map((socio) => (
                  <tr
                    key={socio.id}
                    className="border-t border-line transition-colors hover:bg-paper-soft"
                  >
                    <td className="px-6 py-4 font-semibold">{socio.nombre}</td>
                    <td className="px-6 py-4 text-muted tabular-nums">
                      {socio.documento}
                    </td>
                    <td className="px-6 py-4">
                      <EstadoCuota estado={socio.estado_cuotas} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {listaDeportes(socio).length > 0 ? (
                          listaDeportes(socio).map((deporte) => (
                            <DeporteChip key={deporte} deporte={deporte} />
                          ))
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}

export default AdminPage;