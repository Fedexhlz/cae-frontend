import { useEffect, useState } from "react";
import { getNoticias } from "../../services/server.js";
import { adaptarNoticia } from "../../utils/newsAdapter.js";
import ArrowLink from "../ui/ArrowLink.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import NewsCard from "./NewsCard.jsx";

const NewsSection = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // Cambiar este número vuelve a disparar la carga (botón "Reintentar")
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    // Si el componente se desmonta antes de que llegue la respuesta, la ignoramos
    let cancelado = false;

    getNoticias()
      .then((data) => {
        if (!cancelado) setNoticias(data.map(adaptarNoticia));
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

  // La primera noticia es la destacada y las otras tres van en la columna lateral
  const [featured, ...others] = noticias;

  return (
    <section id="noticias" className="px-[10%] py-20 md:py-30">
      <div className="mb-15 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading label="ACTUALIDAD" lines={["ÚLTIMAS", "NOTICIAS"]} />
        <ArrowLink to="/noticias">Ver todas las noticias</ArrowLink>
      </div>

      {loading && <p className="text-muted">Cargando noticias...</p>}

      {error && (
        <div>
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

      {!loading && !error && !featured && (
        <p className="text-muted">Todavía no hay noticias publicadas.</p>
      )}

      {!loading && !error && featured && (
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
          <NewsCard news={featured} isFeatured />
          <div className="flex flex-col">
            {others.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default NewsSection;
