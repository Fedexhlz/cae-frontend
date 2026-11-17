import { useState } from "react";

const DEPORTES = [
  { slug: "basquet", nombre: "Básquet" },
  { slug: "cestoball", nombre: "Cestoball" },
];

function MemberForm({ valoresIniciales, onGuardar, onCancelar, guardando }) {
  const [nombre, setNombre] = useState(valoresIniciales.nombre ?? "");
  const [documento, setDocumento] = useState(valoresIniciales.documento ?? "");
  const [fechaNacimiento, setFechaNacimiento] = useState(
    valoresIniciales.fecha_nacimiento ?? "",
  );
  const [deportes, setDeportes] = useState(valoresIniciales.deportes ?? []);

  // Tilda o destilda un deporte de la lista
  const alternarDeporte = (slug) => {
    setDeportes((actuales) =>
      actuales.includes(slug)
        ? actuales.filter((item) => item !== slug)
        : [...actuales, slug],
    );
  };

  const handleSubmit = (event) => {
    // Evita que el formulario recargue la página
    event.preventDefault();
    onGuardar({
      nombre: nombre.trim(),
      documento: documento.trim(),
      fecha_nacimiento: fechaNacimiento || null,
      deportes,
    });
  };

  const inputClassName =
    "border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-ink";
  const labelClassName = "text-[11px] font-bold tracking-[2px] uppercase";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="nombre" className={labelClassName}>
          Nombre y apellido
        </label>
        <input
          id="nombre"
          type="text"
          required
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="documento" className={labelClassName}>
          Documento
        </label>
        <input
          id="documento"
          type="text"
          inputMode="numeric"
          required
          value={documento}
          onChange={(event) => setDocumento(event.target.value)}
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="fechaNacimiento" className={labelClassName}>
          Fecha de nacimiento
        </label>
        <input
          id="fechaNacimiento"
          type="date"
          value={fechaNacimiento}
          onChange={(event) => setFechaNacimiento(event.target.value)}
          className={inputClassName}
        />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className={labelClassName}>Deportes</legend>
        <div className="mt-2 flex gap-6">
          {DEPORTES.map(({ slug, nombre: nombreDeporte }) => (
            <label key={slug} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={deportes.includes(slug)}
                onChange={() => alternarDeporte(slug)}
              />
              {nombreDeporte}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={guardando}
          className="bg-ink px-6 py-3 text-sm font-bold text-white uppercase hover:bg-ink-light disabled:opacity-60"
        >
          {guardando ? "Guardando..." : "Guardar"}
        </button>
        <button
          type="button"
          onClick={onCancelar}
          className="border border-ink px-6 py-3 text-sm font-bold uppercase transition-colors hover:bg-ink hover:text-white"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default MemberForm;
