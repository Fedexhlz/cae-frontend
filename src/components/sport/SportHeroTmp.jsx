import { Link } from "react-router-dom";
import Photo from "../ui/Photo.jsx";

// Banner de la página de un deporte: foto de fondo con velo oscuro, nombre y descripción
function SportHero({ sport }) {
  const { name, description, image } = sport;

  return (
    <section className="relative flex min-h-110 items-end overflow-hidden bg-ink px-[10%] pt-16 pb-12 text-white md:min-h-130">
      <Photo src={image} className="absolute inset-0" />
      {/* Velo oscuro para que el texto se lea sobre la foto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/30"
      />

      <div className="relative">
        <Link
          to="/#deportes"
          className="mb-8 inline-block text-[13px] font-bold uppercase transition-opacity hover:opacity-50"
        >
          ← Todos los deportes
        </Link>
        <h1 className="font-display text-[clamp(64px,10vw,120px)] leading-[0.85] font-bold">
          {name}
        </h1>
        <p className="mt-6 max-w-120 leading-[1.7] text-neutral-300">
          {description}
        </p>
      </div>
    </section>
  );
}

export default SportHero;
