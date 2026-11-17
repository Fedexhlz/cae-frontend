import { useEffect, useMemo, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import {
  getSocios,
  registrarPago,
  eliminarSocio,
  actualizarPerfil,
} from "../services/server.js";
import FeeStatus from "../components/ui/FeeStatus.jsx";
import { ESTADOS_CUOTA } from "../constants/cuotas.js";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore.js";
import { estadoCuota, sumarUnMes } from "../utils/fees.js";
import { edadActual, edadEnElAnio, categoriaPorEdad } from "../utils/age.js";
import { sports } from "../constants/sports.js";
import NotificationsPanel from "../components/admin/NotificationsPanel.jsx";
import MemberForm from "../components/admin/MemberForm.jsx";
import { armarNotificaciones } from "../utils/notifications.js";
import Swal from "sweetalert2";

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

// Edad real y categoría de cada deporte del socio (sin fecha de nacimiento no se puede calcular)
const datosDeEdad = (socio) => {
  if (!socio.fecha_nacimiento) return { edad: null, categorias: [] };

  const edadAnio = edadEnElAnio(socio.fecha_nacimiento);
  const categorias = listaDeportes(socio).map((deporte) => {
    const sport = sports.find((item) => item.slug === normalizar(deporte));
    const categoria = sport ? categoriaPorEdad(sport, edadAnio) : null;
    return {
      deporte: DEPORTES[normalizar(deporte)] ?? deporte,
      categoria: categoria?.name ?? null,
    };
  });

  return { edad: edadActual(socio.fecha_nacimiento), categorias };
};

// Junta en un solo texto todo lo que se puede buscar de un socio
const textoBuscable = (socio) =>
  normalizar(
    [
      socio.nombre,
      socio.documento,
      ESTADOS_CUOTA[socio.estado_cuotas]?.label,
      socio.edad !== null ? `${socio.edad} años` : "",
      ...listaDeportes(socio).map((d) => DEPORTES[normalizar(d)] ?? d),
      ...socio.categorias.flatMap(({ categoria }) => categoria ?? []),
    ].join(" "),
  );

function DeporteChip({ deporte }) {
  return (
    <span className="inline-block border border-line px-2.5 py-1 text-[11px] font-bold tracking-[1px] uppercase">
      {DEPORTES[normalizar(deporte)] ?? deporte}
    </span>
  );
}

function AdminPage() {
  const sesion = useAuthStore((state) => state.socio);
  const cerrarSesion = useAuthStore((state) => state.cerrarSesion);
  const esAdmin = sesion?.rol === "admin";
  const [socios, setSocios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // Cambiar este número vuelve a disparar la carga (botón "Reintentar")
  const [intento, setIntento] = useState(0);
  // Id del socio cuyo pago se está guardando (null si ninguno)
  const [guardandoId, setGuardandoId] = useState(null);
  // Socio que se está editando (null si el formulario está cerrado)
  const [socioEditando, setSocioEditando] = useState(null);

  const [busqueda, setBusqueda] = useState("");
  const [filtroCuota, setFiltroCuota] = useState("todas");
  const [filtroDeporte, setFiltroDeporte] = useState("todos");

  useEffect(() => {
    if (!esAdmin) return;
    let cancelado = false;

    getSocios()
      .then((data) => {
        if (!cancelado) {
          setSocios(
            data.map((socio) => ({
              ...socio,
              estado_cuotas: estadoCuota(socio.fecha_ultimo_pago),
              ...datosDeEdad(socio),
            })),
          );
        }
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
  }, [intento, esAdmin]);

  const reintentar = () => {
    setLoading(true);
    setError(false);
    setIntento((n) => n + 1);
  };

  // Fecha de hoy como texto "AAAA-MM-DD", sin pasar por UTC
  const fechaDeHoy = () => {
    const hoy = new Date();
    const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    const dd = String(hoy.getDate()).padStart(2, "0");
    return `${hoy.getFullYear()}-${mm}-${dd}`;
  };

  const registrarPagoDe = async (aviso) => {
    const socio = socios.find((item) => item.socio_id === aviso.socioId);
    if (!socio) return;

    // Inactivo o sin pagos: cuenta nueva (hoy). Si no, se suma un mes a la fecha anterior.
    const reiniciar = aviso.tipo === "inactivo" || aviso.tipo === "sin_pagos";
    const nuevaFecha = reiniciar
      ? fechaDeHoy()
      : sumarUnMes(socio.fecha_ultimo_pago);

    setGuardandoId(aviso.socioId);
    try {
      await registrarPago(aviso.socioId, nuevaFecha);
      // Cambiar este número vuelve a cargar la lista con los datos nuevos
      setIntento((n) => n + 1);
    } catch {
      alert("No se pudo registrar el pago. Probá de nuevo.");
    } finally {
      setGuardandoId(null);
    }
  };

  const eliminarSocioDe = async (aviso) => {
    // Confirmación antes de borrar: la acción no se puede deshacer
    const respuesta = await Swal.fire({
      icon: "warning",
      title: `¿Eliminar a ${aviso.nombre}?`,
      text: "Se borran su cuenta y sus datos. Esta acción no se puede deshacer.",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!respuesta.isConfirmed) return;

    setGuardandoId(aviso.socioId);
    try {
      await eliminarSocio(aviso.socioId);
      // Recarga la lista: el socio ya no aparece
      setIntento((n) => n + 1);
    } catch {
      Swal.fire({
        icon: "error",
        title: "No se pudo eliminar",
        text: "Probá de nuevo en unos minutos.",
      });
    } finally {
      setGuardandoId(null);
    }
  };

  const guardarEdicion = async (cambios) => {
    setGuardandoId(socioEditando.socio_id);
    try {
      await actualizarPerfil(socioEditando.socio_id, cambios);
      setSocioEditando(null);
      // Recarga la lista con los datos nuevos
      setIntento((n) => n + 1);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No se pudo guardar",
        text: error.message,
      });
    } finally {
      setGuardandoId(null);
    }
  };

  // Lista ya filtrada: se recalcula solo si cambian los datos o algún filtro
  const visibles = useMemo(() => {
    const texto = normalizar(busqueda);

    return socios.filter((socio) => {
      const coincideTexto = textoBuscable(socio).includes(texto);
      const coincideCuota =
        filtroCuota === "todas" || socio.estado_cuotas === filtroCuota;
      const coincideDeporte =
        filtroDeporte === "todos" ||
        listaDeportes(socio).some((d) => normalizar(d) === filtroDeporte);

      return coincideTexto && coincideCuota && coincideDeporte;
    });
  }, [socios, busqueda, filtroCuota, filtroDeporte]);

  // Avisos de todo el club: no dependen del buscador ni de los filtros
  const notificaciones = useMemo(() => armarNotificaciones(socios), [socios]);

  if (!sesion) return <Navigate to="/ingresar" replace />;
  if (!esAdmin) return <Navigate to="/socio" replace />;

  const inputClassName =
    "border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-ink";

  return (
    <section className="px-[6%] py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading label="ADMINISTRACIÓN" lines={["SOCIOS"]} />
          <button
            type="button"
            onClick={cerrarSesion}
            className="border border-ink px-5 py-3 text-xs font-bold uppercase transition-colors hover:bg-ink hover:text-white"
          >
            Cerrar sesión
          </button>
        </div>

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
              placeholder="Buscar por nombre, documento, categoría, edad..."
              aria-label="Buscar socio por nombre, documento, deporte, categoría, estado de cuota o edad"
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

        {/* Grilla: tabla a la izquierda y panel de avisos a la derecha (apilados en celular) */}
        <div className="mt-4 grid items-start gap-6 lg:grid-cols-[1fr_20rem]">
          <div className="overflow-x-auto border border-line">
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
              <table className="w-full min-w-225 border-collapse text-left">
                <caption className="sr-only">
                  Listado de socios del club
                </caption>
                <thead className="bg-paper-soft">
                  <tr>
                    {[
                      "Nombre",
                      "Documento",
                      "Cuotas",
                      "Deportes",
                      "Edad y categoría",
                      "",
                    ].map((col, indice) => (
                      <th
                        key={indice}
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
                      key={socio.socio_id}
                      className="border-t border-line transition-colors hover:bg-paper-soft"
                    >
                      <td className="px-6 py-4 font-semibold">
                        {socio.nombre}
                      </td>
                      <td className="px-6 py-4 text-muted tabular-nums">
                        {socio.documento}
                      </td>
                      <td className="px-6 py-4">
                        <FeeStatus estado={socio.estado_cuotas} />
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
                      <td className="px-6 py-4">
                        {socio.edad === null ? (
                          <span className="text-muted">—</span>
                        ) : (
                          <>
                            <span className="font-semibold tabular-nums">
                              {socio.edad} años
                            </span>
                            {socio.categorias.map(({ deporte, categoria }) => (
                              <p key={deporte} className="text-sm text-muted">
                                {deporte}: {categoria ?? "Sin categoría"}
                              </p>
                            ))}
                          </>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSocioEditando(socio)}
                          className="border border-ink px-3 py-1.5 text-[11px] font-bold uppercase transition-colors hover:bg-ink hover:text-white"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <NotificationsPanel
            notificaciones={notificaciones}
            onRegistrarPago={registrarPagoDe}
            onEliminar={eliminarSocioDe}
            guardandoId={guardandoId}
          />
        </div>
      </div>

      {socioEditando && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Editar socio"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        >
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto bg-white p-8">
            <h2 className="mb-6 font-display text-3xl font-bold">
              EDITAR SOCIO
            </h2>
            <MemberForm
              valoresIniciales={socioEditando}
              onGuardar={guardarEdicion}
              onCancelar={() => setSocioEditando(null)}
              guardando={guardandoId === socioEditando.socio_id}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminPage;
