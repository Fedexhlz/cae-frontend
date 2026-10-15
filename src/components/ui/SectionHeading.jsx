// Etiqueta con raya y título grande de cada sección; isLight es para fondos oscuros
function SectionHeading({ label, lines, isLight = false }) {
  return (
    <div>
      <div
        className={`flex items-center gap-3 text-[11px] font-bold tracking-[2px] ${
          isLight ? "text-white" : ""
        }`}
      >
        <span className={`h-0.75 w-7.5 ${isLight ? "bg-white" : "bg-ink"}`} />
        {label}
      </div>
      <h2 className="mt-6 font-display text-[clamp(55px,6vw,80px)] leading-[0.85] font-bold">
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>
    </div>
  );
}

export default SectionHeading;
