import { useState } from "react";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import Swal from "sweetalert2";
import { loginSocio } from "../services/server.js";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore.js";

function AreaDeSocios() {
  // Cada campo guarda su valor en un estado (input controlado)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const socioActual = useAuthStore((state) => state.socio);
  const iniciarSesion = useAuthStore((state) => state.iniciarSesion);
  // Mientras esperamos la respuesta de Supabase, se desactiva el botón
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    // Evita que el formulario recargue la página
    event.preventDefault();
    setLoading(true);

    try {
      const socio = await loginSocio(email, password);

      if (socio) {
        iniciarSesion(socio);
      } else {
        Swal.fire({
          icon: "error",
          title: "Datos incorrectos",
          text: "El email o la contraseña no coinciden.",
        });
      }
    } catch (error) {
      console.error("Error en el login:", error);

      Swal.fire({
        icon: "error",
        title: "No pudimos conectar",
        text: "Probá de nuevo en unos minutos.",
      });
    } finally {
      setLoading(false);
    }
  };
  if (socioActual) {
    return <Navigate to={socioActual.rol === "admin" ? "/admin" : "/socio"} replace />;
  }

  return (
    <section className="px-[10%] py-24">
      <div className="mx-auto max-w-md">
        <SectionHeading label="ÁREA DE SOCIOS" lines={["INGRESAR"]} />

        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-[11px] font-bold tracking-[2px] uppercase"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="border border-line px-4 py-3 outline-none focus:border-ink"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-[11px] font-bold tracking-[2px] uppercase"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border border-line px-4 py-3 outline-none focus:border-ink"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-ink px-6 py-3 text-sm font-bold text-white uppercase hover:bg-ink-light disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AreaDeSocios;
