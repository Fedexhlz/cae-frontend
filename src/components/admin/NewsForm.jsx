import { useState } from "react";
import { subirImagen } from "../../services/server.js";

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
  // URL de la foto guardada (vacía si no tiene)
  const [imagen, setImagen] = useState(valoresIniciales.image ?? "");
  // Archivo elegido que todavía no se subió
  const [archivo, setArchivo] = useState(null);
  // Estado para bloquear el botón mientras se sube la foto
  const [subiendo, setSubiendo] = useState(false);
  const [fecha, setFecha] = useState(valoresIniciales.date ?? fechaDeHoy());

  const handleSubmit = async (event) => {
    // Evita que el formulario recargue la página
    event.preventDefault();

    let urlImagen = imagen.trim() || null;

    // Si el admin eligió una foto nueva, se sube y se usa su URL pública
    if (archivo) {
      setSubiendo(true);
      try {
        urlImagen = await subirImagen(archivo, "news");
      } catch {
        setSubiendo(false);
        alert("No se pudo subir la foto. Probá de nuevo.");
        return;
      }
      setSubiendo(false);
    }

    onGuardar({
      category: categoria,
      title: titulo.trim(),
      excerpt: resumen.trim(),
      content: contenido.trim() || null,
      image: urlImagen,
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
          Foto (JPG, PNG o WebP, máximo 5 MB)
        </label>

        {/* Vista previa: la foto nueva si hay, o la que ya estaba guardada */}
        {(archivo || imagen) && (
          <img
            src={archivo ? URL.createObjectURL(archivo) : imagen}
            alt="Vista previa de la foto"
            className="max-h-48 w-full border border-line object-cover"
          />
        )}

        <input
          id="imagen"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => setArchivo(event.target.files[0] ?? null)}
          className="text-sm"
        />

        {(archivo || imagen) && (
          <button
            type="button"
            onClick={() => {
              setArchivo(null);
              setImagen("");
            }}
            className="self-start text-xs font-bold text-red-600 uppercase underline"
          >
            Quitar foto
          </button>
        )}
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
          disabled={guardando || subiendo}
          className="bg-ink px-6 py-3 text-sm font-bold text-white uppercase hover:bg-ink-light disabled:opacity-60"
        >
          {subiendo
            ? "Subiendo foto..."
            : guardando
              ? "Guardando..."
              : "Guardar"}
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
