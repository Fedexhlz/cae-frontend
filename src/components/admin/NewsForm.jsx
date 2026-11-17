import { useState } from "react";

const CATEGORIAS = ["Básquet", "Cestoball", "Club"];

// Fecha de hoy como texto "AAAA-MM-DD", sin pasar por UTC
function fechaDeHoy() {
  const hoy = new Date();
  const mm = String(hoy.getMonth() + 1).padStart(2, "0");
  const dd = String(hoy.getDate()).padStart(2, "0");
  return `${hoy.getFullYear()}-${mm}-${dd}`;
}

function NewsForm({ valoresIniciales, onGuardar, onCancelar, guardando }) {
  const [categoria, setCategoria] = useState(
    valoresIniciales.category ?? CATEGORIAS[0],
  );
  const [titulo, setTitulo] = useState(valoresIniciales.title ?? "");
  const [resumen, setResumen] = useState(valoresIniciales.excerpt ?? "");
  const [contenido, setContenido] = useState(valoresIniciales.content ?? "");
  const [imagen, setImagen] = useState(valoresIniciales.image ?? "");
  const [fecha, setFecha] = useState(valoresIniciales.date ?? fechaDeHoy());

  const handleSubmit = (event) => {
    // Evita que el formulario recargue la página
    event.preventDefault();
    onGuardar({
      category: categoria,
      title: titulo.trim(),
      excerpt: resumen.trim(),
      content: contenido.trim() || null,
      image: imagen.trim() || null,
      date: fecha,
    });
  };

  const inputClassName =
    "border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-ink";
  const labelClassName = "text-[11px] font-bold tracking-[2px] uppercase";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="categoria" className={labelClassName}>
          Categoría
        </label>
        <select
          id="categoria"
          value={categoria}
          onChange={(event) => setCategoria(event.target.value)}
          className={inputClassName}
        >
          {CATEGORIAS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="titulo" className={labelClassName}>
          Título
        </label>
        <input
          id="titulo"
          type="text"
          required
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="resumen" className={labelClassName}>
          Resumen (se ve en la tarjeta)
        </label>
        <textarea
          id="resumen"
          required
          rows={3}
          value={resumen}
          onChange={(event) => setResumen(event.target.value)}
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contenido" className={labelClassName}>
          Contenido completo (opcional)
        </label>
        <textarea
          id="contenido"
          rows={8}
          value={contenido}
          onChange={(event) => setContenido(event.target.value)}
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="imagen" className={labelClassName}>
          Imagen (ruta o URL, opcional)
        </label>
        <input
          id="imagen"
          type="text"
          value={imagen}
          onChange={(event) => setImagen(event.target.value)}
          placeholder="/images/news/news-1.jpg"
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="fecha" className={labelClassName}>
          Fecha
        </label>
        <input
          id="fecha"
          type="date"
          required
          value={fecha}
          onChange={(event) => setFecha(event.target.value)}
          className={inputClassName}
        />
      </div>

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

export default NewsForm;
