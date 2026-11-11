import Photo from "../ui/Photo.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";

// Entrenadores de un deporte: una tarjeta por persona, con su foto, nombre y rol
function CoachesSection({ coaches }) {
  return (
    <section className="bg-paper-soft px-[10%] py-20 md:py-30">
      <SectionHeading
        label="QUIÉNES TE ACOMPAÑAN"
        lines={["NUESTROS", "ENTRENADORES"]}
      />

      {/* auto-fill mantiene el ancho de cada tarjeta aunque haya un solo entrenador */}
      <div className="mt-15 grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-6">
        {coaches.map(({ id, name, role, image }) => (
          <article key={id}>
            {/* Con label, la foto se anuncia a los lectores de pantalla */}
            <Photo
              src={image}
              label={`${name}, ${role}`}
              className="aspect-4/5 w-full"
            />
            <h3 className="mt-4 font-display text-[28px] leading-none font-bold">
              {name}
            </h3>
            <p className="mt-1 text-[13px] text-muted">{role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CoachesSection;
