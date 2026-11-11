import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import FeeStatus from "../components/ui/FeeStatus.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import { ESTADOS_CUOTA } from "../constants/cuotas.js";
import { sports } from "../constants/sports.js";
import { getPerfil } from "../services/server.js";
import { useAuthStore } from "../stores/useAuthStore.js";

const DIAS = [
  "LUNES",
  "MARTES",
  "MIÉRCOLES",
  "JUEVES",
  "VIERNES",
  "SÁBADO",
  "DOMINGO",
];

function PartnerPage() {
  const socio = useAuthStore((state) => state.socio);
  const cerrarSesion = useAuthStore((state) => state.cerrarSesion);

  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // Cambiar este número vuelve a disparar la carga (botón "Reintentar")
  const [intento, setIntento] = useState(0);
  // Posición de hoy dentro de DIAS (getDay() arranca el domingo en 0, nuestra semana el lunes)
  const [hoy] = useState(() => (new Date().getDay() + 6) % 7);

  const socioId = socio?.id;

  useEffect(() => {
    if (!socioId) return;
    // Si el componente se desmonta antes de que llegue la respuesta, la ignoramos
    let cancelado = false;

    getPerfil(socioId)
      .then((data) => {
        if (!cancelado) setPerfil(data);
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
  }, [socioId, intento]);

  const reintentar = () => {
    setLoading(true);
    setError(false);
    setIntento((n) => n + 1);
  };

  // Sin sesión no hay nada que mostrar: se manda al formulario de ingreso
  if (!socio) {
    return <Navigate to="/ingresar" replace />;
  }
  if (socio.rol === "admin") {
    return <Navigate to="/admin" replace />;
  }

  // Deportes en los que está inscripto (el slug coincide con perfiles.deportes)
  const deportesDelSocio = sports.filter((sport) =>
    (perfil?.deportes ?? []).includes(sport.slug),
  );

  // Una entrada por día de la semana, con las actividades de sus deportes ordenadas por hora
  const clasesPorDia = DIAS.map((dia) => ({
    dia,
    clases: deportesDelSocio
      .flatMap((sport) =>
        sport.schedule
          .filter((item) => item.day.toUpperCase() === dia)
          .map((item) => ({
            ...item,
            sportName: sport.name,
            slug: sport.slug,
          })),
      )
      .sort((a, b) => a.time.localeCompare(b.time)),
  }));

  return (
    <section className="px-[6%] py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading label="ÁREA DE SOCIOS" lines={["MI CUENTA"]} />
          <button
            type="button"
            onClick={cerrarSesion}
            className="border border-ink px-5 py-3 text-xs font-bold uppercase transition-colors hover:bg-ink hover:text-white"
          >
            Cerrar sesión
          </button>
        </div>

        {loading && <p className="mt-12 text-muted">Cargando tus datos...</p>}

        {error && (
          <div className="mt-12">
            <p className="font-semibold">No pudimos cargar tus datos.</p>
            <button
              type="button"
              onClick={reintentar}
              className="mt-4 bg-ink px-6 py-3 text-sm font-bold text-white uppercase hover:bg-ink-light"
            >
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && !perfil && (
          <p className="mt-12 text-muted">
            Todavía no tenemos tus datos cargados. Comunicate con el club.
          </p>
        )}

        {!loading && !error && perfil && (
          <>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {/* Datos del socio */}
              <div className="border border-line p-8">
                <p className="text-[11px] font-bold tracking-[2px] text-muted uppercase">
                  Socio
                </p>
                <h2 className="mt-3 font-display text-4xl font-bold">
                  {perfil.nombre}
                </h2>
                <p className="mt-2 text-muted">
                  Documento{" "}
                  <span className="tabular-nums">{perfil.documento}</span>
                </p>
                <p className="mt-1 text-muted">{socio.email}</p>
              </div>

              {/* Estado de cuotas */}
              <div className="border border-line p-8">
                <p className="text-[11px] font-bold tracking-[2px] text-muted uppercase">
                  Estado de cuotas
                </p>
                <div className="mt-4">
                  <FeeStatus estado={perfil.estado_cuotas} />
                </div>
                <p className="mt-4 text-muted">
                  {ESTADOS_CUOTA[perfil.estado_cuotas]?.mensaje ??
                    "No hay información sobre tus cuotas."}
                </p>
              </div>
            </div>

            {/* Calendario semanal */}
            <h2 className="mt-16 font-display text-3xl font-bold">MI SEMANA</h2>

            {deportesDelSocio.length === 0 ? (
              <p className="mt-4 text-muted">
                Todavía no estás inscripto en ningún deporte.
              </p>
            ) : (
              <>
                <p className="mt-2 text-sm text-muted">
                  Entrenamientos de{" "}
                  {deportesDelSocio.map((sport) => sport.name).join(" y ")}
                </p>

                <div className="mt-8 grid border-t border-l border-line md:grid-cols-7">
                  {clasesPorDia.map(({ dia, clases }, indice) => (
                    <div
                      key={dia}
                      className={`flex-col gap-3 border-r border-b border-line p-4 md:min-h-40 ${
                        clases.length === 0 ? "hidden md:flex" : "flex"
                      } ${indice === hoy ? "bg-paper-soft" : ""}`}
                    >
                      <span className="text-[10px] font-bold tracking-[2px] text-muted">
                        {dia}
                        {indice === hoy && " · HOY"}
                      </span>

                      {clases.length === 0 ? (
                        <span className="text-sm text-muted">—</span>
                      ) : (
                        clases.map((clase) => (
                          <div
                            key={`${clase.slug}-${clase.id}`}
                            className="bg-ink p-3 text-white"
                          >
                            <strong className="block font-display text-lg leading-tight">
                              {clase.time}
                            </strong>
                            <span className="block text-[11px] tracking-[1px] uppercase">
                              {clase.sportName}
                            </span>
                            <span className="block text-xs text-white/70">
                              {clase.category}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default PartnerPage;
