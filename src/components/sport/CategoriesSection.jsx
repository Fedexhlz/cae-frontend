import SectionHeading from "../ui/SectionHeading.jsx";

// Categorías de un deporte: una tarjeta por categoría, con su número, nombre y edades
function CategoriesSection({ categories }) {
  return (
    <section className="bg-paper-soft px-[10%] py-20 md:py-30">
      <SectionHeading
        label="PARA TODAS LAS EDADES"
        lines={["NUESTRAS", "CATEGORÍAS"]}
      />

      <div className="mt-15 grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-0.5">
        {categories.map(({ id, name, ages }, index) => (
          <article
            key={id}
            className="flex min-h-48 flex-col justify-between border border-line bg-white p-7.5"
          >
            {/* index empieza en 0: se le suma 1 y se completa con un cero para mostrar 01, 02, 03 */}
            <span className="text-[10px] font-bold tracking-[2px] text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display text-[40px] leading-none font-bold">
                {name}
              </h3>
              <p className="mt-2 text-[13px] text-muted">{ages}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CategoriesSection;
