import ArrowLink from "../ui/ArrowLink.jsx";
import Photo from "../ui/Photo.jsx";

function SportCard({ sport }) {
  const { slug, name, description, image } = sport;

  return (
    <article className="relative flex min-h-105 items-end overflow-hidden p-6 sm:p-11">
      <Photo src={image} className="absolute inset-0" />
      {/* Velo oscuro para que el texto se lea sobre la foto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black/90 via-black/45 to-black/20"
      />

      <div className="relative">
        <h3 className="mb-3.5 font-display text-[clamp(52px,5vw,65px)] leading-[0.9] font-bold">
          {name}
        </h3>
        <p className="max-w-100 leading-relaxed text-neutral-400">
          {description}
        </p>
        <ArrowLink to={`/deportes/${slug}`} className="mt-6">
          Ver disciplina
        </ArrowLink>
      </div>
    </article>
  );
}

export default SportCard;
