import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import {
  getNoticias,
  crearNoticia,
  actualizarNoticia,
  eliminarNoticia,
} from "../services/server.js";
import { useAuthStore } from "../stores/useAuthStore.js";
import { formatearFecha } from "../utils/dates.js";
import NewsForm from "../components/admin/NewsForm.jsx";
import Swal from "sweetalert2";

function AdminNewsPage() {
  const sesion = useAuthStore((state) => state.socio);
  const esAdmin = sesion?.rol === "admin";
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // Cambiar este número vuelve a disparar la carga (botón "Reintentar")
  const [intento, setIntento] = useState(0);
  // Id de la noticia que se está guardando o borrando ("nueva" si es un alta)
  const [guardandoId, setGuardandoId] = useState(null);
  // Noticia que se está editando (null si el formulario está cerrado)
  const [noticiaEditando, setNoticiaEditando] = useState(null);
  // true mientras el formulario de alta está abierto
  const [creandoNoticia, setCreandoNoticia] = useState(false);

  useEffect(() => {
    if (!esAdmin) return;
    let cancelado = false;

    getNoticias()
      .then((data) => {
        if (!cancelado) setNoticias(data);
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

  const guardarNueva = async (datos) => {
    setGuardandoId("nueva");
    try {
      await crearNoticia(datos);
      setCreandoNoticia(false);
      // Recarga la lista: la noticia nueva ya aparece
      setIntento((n) => n + 1);
    } catch (error) {
      // El modal queda abierto para no perder lo que se escribió
      Swal.fire({
        icon: "error",
        title: "No se pudo crear la noticia",
        text: error.message,
      });
    } finally {
      setGuardandoId(null);
    }
  };

  const guardarEdicion = async (cambios) => {
    setGuardandoId(noticiaEditando.id);
    try {
      await actualizarNoticia(noticiaEditando.id, cambios);
      setNoticiaEditando(null);
      setIntento((n) => n + 1);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No se pudo guardar la noticia",
        text: error.message,
      });
    } finally {
      setGuardandoId(null);
    }
  };

  const eliminarNoticiaDe = async (noticia) => {
    // Confirmación antes de borrar: la acción no se puede deshacer
    const respuesta = await Swal.fire({
      icon: "warning",
      title: "¿Eliminar esta noticia?",
      text: noticia.title,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!respuesta.isConfirmed) return;

    setGuardandoId(noticia.id);
    try {
      await eliminarNoticia(noticia.id);
      setIntento((n) => n + 1);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No se pudo eliminar la noticia",
        text: error.message,
      });
    } finally {
      setGuardandoId(null);
    }
  };

  if (!sesion) return <Navigate to="/ingresar" replace />;
  if (!esAdmin) return <Navigate to="/socio" replace />;

  return (
    <section className="px-[6%] py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading label="ADMINISTRACIÓN" lines={["NOTICIAS"]} />
          <button
            type="button"
            onClick={() => setCreandoNoticia(true)}
            className="bg-ink px-5 py-3 text-xs font-bold text-white uppercase hover:bg-ink-light"
          >
            Nueva noticia
          </button>
        </div>

        <div className="mt-12 overflow-x-auto border border-line">
          {loading && (
            <p className="px-6 py-16 text-center text-muted">
              Cargando noticias...
            </p>
          )}

          {error && (
            <div className="px-6 py-16 text-center">
              <p className="font-semibold">No pudimos cargar las noticias.</p>
              <button
                type="button"
                onClick={reintentar}
                className="mt-4 bg-ink px-6 py-3 text-sm font-bold text-white uppercase hover:bg-ink-light"
              >
                Reintentar
              </button>
            </div>
          )}

          {!loading && !error && noticias.length === 0 && (
            <p className="px-6 py-16 text-center text-muted">
              Todavía no hay noticias cargadas.
            </p>
          )}

          {!loading && !error && noticias.length > 0 && (
            <table className="w-full min-w-150 border-collapse text-left">
              <caption className="sr-only">
                Listado de noticias del club
              </caption>
              <thead className="bg-paper-soft">
                <tr>
                  {["Fecha", "Categoría", "Título", ""].map((col, indice) => (
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
                {noticias.map((noticia) => (
                  <tr
                    key={noticia.id}
                    className="border-t border-line transition-colors hover:bg-paper-soft"
                  >
                    <td className="px-6 py-4 text-muted tabular-nums">
                      {formatearFecha(noticia.date)}
                    </td>
                    <td className="px-6 py-4">{noticia.category}</td>
                    <td className="px-6 py-4 font-semibold">{noticia.title}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setNoticiaEditando(noticia)}
                          disabled={guardandoId === noticia.id}
                          className="border border-ink px-3 py-1.5 text-[11px] font-bold uppercase transition-colors hover:bg-ink hover:text-white disabled:opacity-60"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => eliminarNoticiaDe(noticia)}
                          disabled={guardandoId === noticia.id}
                          className="border border-ink px-3 py-1.5 text-[11px] font-bold uppercase transition-colors hover:bg-ink hover:text-white disabled:opacity-60"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {creandoNoticia && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Nueva noticia"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        >
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto bg-white p-8">
            <h2 className="mb-6 font-display text-3xl font-bold">
              NUEVA NOTICIA
            </h2>
            <NewsForm
              valoresIniciales={{}}
              onGuardar={guardarNueva}
              onCancelar={() => setCreandoNoticia(false)}
              guardando={guardandoId === "nueva"}
            />
          </div>
        </div>
      )}

      {noticiaEditando && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Editar noticia"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        >
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto bg-white p-8">
            <h2 className="mb-6 font-display text-3xl font-bold">
              EDITAR NOTICIA
            </h2>
            <NewsForm
              valoresIniciales={noticiaEditando}
              onGuardar={guardarEdicion}
              onCancelar={() => setNoticiaEditando(null)}
              guardando={guardandoId === noticiaEditando.id}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminNewsPage;
