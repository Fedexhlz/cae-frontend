import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Photo from "../components/ui/Photo.jsx";
import { getNoticia } from "../services/server.js";
import { adaptarNoticia } from "../utils/newsAdapter.js";

// Estilo de la etiqueta de categoría según la variante (igual que en NewsCard)
const tagClasses = {
  filled: "border-ink bg-ink text-white",
  outline: "border-ink text-ink",
  soft: "border-neutral-300 bg-neutral-300 text-ink",
};

function NewsDetailPage() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelado = false;

    getNoticia(id)
      .then((data) => {
        if (!cancelado) setNoticia(data ? adaptarNoticia(data) : null);
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
  }, [id]);

  return (
    <section className="px-[10%] py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/#noticias"
          className="text-[13px] font-bold uppercase hover:underline hover:underline-offset-4"
        >
          ← Volver a las noticias
        </Link>

        {loading && <p className="mt-12 text-muted">Cargando noticia...</p>}

        {error && (
          <p className="mt-12 font-semibold">No pudimos cargar la noticia.</p>
        )}

        {!loading && !error && !noticia && (
          <p className="mt-12 font-semibold">Esa noticia no existe.</p>
        )}

        {!loading && !error && noticia && (
          <article className="mt-10">
            <div className="mb-4 flex items-center gap-3">
              <span
                className={`border px-2.5 py-1.25 text-[10px] font-bold tracking-[2px] uppercase ${tagClasses[noticia.tagVariant]}`}
              >
                {noticia.category}
              </span>
              <time dateTime={noticia.dateTime} className="text-xs text-muted">
                {noticia.date}
              </time>
            </div>

            <h1 className="mb-8 font-display text-[clamp(40px,5vw,64px)] leading-[0.95] font-bold">
              {noticia.title}
            </h1>

            <Photo src={noticia.image} className="mb-8 min-h-85 w-full" />

            <p className="leading-relaxed whitespace-pre-line text-neutral-700">
              {noticia.content || noticia.excerpt}
            </p>
          </article>
        )}
      </div>
    </section>
  );
}

export default NewsDetailPage;
