import { Link } from "react-router-dom";
import HeroCarousel from "./HeroCarousel.jsx";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative flex flex-col overflow-hidden bg-ink text-white lg:min-h-[680px] lg:flex-row lg:items-center"
    >
      {/* Capa 1: rayas decorativas sobre el fondo negro */}
      <div
        aria-hidden="true"
        className="absolute -top-45 -right-62.5 h-250 w-175 rotate-20 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_45px,rgba(255,255,255,0.08)_45px,rgba(255,255,255,0.08)_70px)]"
      />

      {/* Capa 2 y controles: carrusel de fotos */}
      <HeroCarousel />

      {/* Capa 3: fondo negro del texto, con corte diagonal y borde difuminado (solo escritorio) */}
      <div
        aria-hidden="true"
        className="absolute -inset-y-20 right-0 -left-25 hidden blur-[36px] lg:block"
      >
        <div className="absolute inset-0 bg-ink [clip-path:polygon(0_0,34%_0,54%_100%,0_100%)]" />
      </div>

      {/* Texto, por encima de todo */}
      <div className="relative z-10 order-1 px-[7%] pt-17.5 pb-10 lg:ml-[10%] lg:w-[26vw] lg:p-0">
        <p className="mb-5 text-xs font-bold tracking-[4px]">
          CLUB ATLÉTICO ESTUDIANTES
        </p>

        <h1 className="font-display text-[length:clamp(60px,14vw,100px)] leading-[0.82] font-bold tracking-[-2px] lg:text-[length:clamp(52px,5.7vw,110px)]">
          PASIÓN.
          <span className="block text-transparent [-webkit-text-stroke:2px_white]">
            DEPORTE.
          </span>
          IDENTIDAD.
        </h1>

        <p className="mt-8.75 max-w-[500px] leading-[1.7] text-neutral-300">
          Un club, dos disciplinas y una misma pasión. Formamos parte de la
          historia deportiva de Tucumán.
        </p>
        <div className="mt-8.75 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
          <Link
            to="/#deportes"
            className="bg-white px-6.25 py-3.75 text-xs font-bold text-ink uppercase transition-colors hover:bg-neutral-300"
          >
            Conocé nuestras disciplinas
          </Link>
          <Link
            to="/#club"
            className="border border-neutral-600 px-6.25 py-3.75 text-xs font-bold uppercase transition-colors hover:border-white"
          >
            Conocé el club
          </Link>
        </div>

        {/* Mención discreta de la colonia, sin competir con los dos botones */}
        <Link
          to="/#colonia"
          className="group mt-7.5 inline-flex items-center gap-3 text-[13px] font-semibold text-neutral-300 hover:text-white"
        >
          <span className="border border-neutral-600 px-2 py-0.75 text-[10px] tracking-[2px]">
            VERANO
          </span>
          Colonia de verano
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1.5"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
