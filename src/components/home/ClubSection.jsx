import ArrowLink from "../ui/ArrowLink.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import ClubGallery from "./ClubGallery.jsx";

function ClubSection() {
  return (
    <section id="club" className="bg-paper-soft px-[10%] py-20 md:py-30">
      <div className="grid items-center gap-15 lg:grid-cols-2 lg:gap-25">
        <div>
          <SectionHeading
            label="NUESTRA IDENTIDAD"
            lines={["UNA HISTORIA", "EN BLANCO Y NEGRO"]}
          />
          <div className="mt-8 max-w-132 space-y-5 leading-[1.8] text-neutral-600">
            <p>
              El Club Atlético Estudiantes forma parte de la comunidad deportiva
              de San Miguel de Tucumán, construyendo su identidad alrededor del
              deporte, la competencia y el sentido de pertenencia.
            </p>
            <p>
              Hoy el club cuenta con disciplinas como básquet y cestoball,
              ofreciendo un espacio deportivo para distintas edades y
              categorías.
            </p>
          </div>
          <ArrowLink to="/club" className="mt-8">
            Conocé más sobre nosotros
          </ArrowLink>
        </div>

        <ClubGallery />
      </div>
    </section>
  );
}

export default ClubSection;
