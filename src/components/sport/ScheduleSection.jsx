import SectionHeading from "../ui/SectionHeading.jsx";

// Horarios de entrenamiento de un deporte: una tarjeta por día, con la hora y las categorías que entrenan
function ScheduleSection({ schedule }) {
  return (
    <section className="px-[10%] py-20 md:py-30">
      <SectionHeading
        label="ORGANIZÁ TU SEMANA"
        lines={["HORARIOS DE", "ENTRENAMIENTO"]}
      />

      {/* auto-fit reparte el ancho entre las tarjetas que haya, sean 2 o 5 */}
      <div className="mt-15 grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] border-t border-l border-line">
        {schedule.map(({ id, day, time, category }) => (
          <div
            key={id}
            className="flex flex-col gap-2 border-r border-b border-line px-5 py-7.5"
          >
            <span className="text-[10px] font-bold tracking-[2px] text-muted">
              {day}
            </span>
            <strong className="font-display text-[28px]">{time}</strong>
            <span className="text-[13px] text-muted">{category}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ScheduleSection;
