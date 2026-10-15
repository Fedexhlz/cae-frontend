import { trainingSchedule } from "../../constants/schedule.js";
import SectionHeading from "../ui/SectionHeading.jsx";

function ScheduleSection() {
  return (
    <section id="horarios" className="px-[10%] py-20 md:py-30">
      <SectionHeading
        label="ORGANIZÁ TU SEMANA"
        lines={["HORARIOS DE", "ENTRENAMIENTO"]}
      />

      <div className="mt-15 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {trainingSchedule.map(({ id, day, sport, time }) => (
          <div
            key={id}
            className="flex flex-col gap-2 border-b border-line px-5 py-7.5 lg:border-r lg:border-b-0"
          >
            <span className="text-[10px] font-bold tracking-[2px] text-muted">
              {day}
            </span>
            <strong className="font-display text-[28px]">{sport}</strong>
            <span className="text-[13px] text-muted">{time}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ScheduleSection;
