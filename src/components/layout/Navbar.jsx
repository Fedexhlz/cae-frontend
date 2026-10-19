import { useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { navLinks } from "../../constants/navLinks.js";
import NavbarLinks from "./NavbarLinks.jsx";

function Navbar() {
  // Indica si el menú móvil está abierto; cambia al tocar el botón, un enlace o la tecla Escape
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-(--navbar-height) items-center justify-between border-b border-line bg-white px-[6%]">
      {/* Logo: escudo y nombre, lleva al inicio */}
      <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
        <img src="/crest.png" alt="" className="h-12.5 w-auto" />
        <span className="flex flex-col font-display leading-[0.9]">
          <span className="text-[11px] tracking-[1.5px]">CLUB ATLÉTICO</span>
          <strong className="text-[21px] font-bold tracking-[1px]">
            ESTUDIANTES
          </strong>
        </span>
      </Link>

      {/* Enlaces de escritorio: ocultos por debajo de 1100px */}
      <NavbarLinks
        links={navLinks}
        className="hidden nav:flex nav:gap-8"
        linkClassName="text-[13px] font-semibold uppercase transition-opacity hover:opacity-50"
      />

      <Link
        to="/ingresar"
        className="hidden bg-ink px-5 py-3 text-xs font-bold text-white uppercase transition-colors hover:bg-ink-light nav:inline-block"
      >
        Área de socios
      </Link>

      {/* Botón del menú móvil: solo por debajo de 1100px */}
      <button
        type="button"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        className="flex size-11 items-center justify-center text-2xl nav:hidden"
      >
        {isMenuOpen ? <FaXmark /> : <FaBars />}
      </button>

      {/* Menú móvil desplegable: se dibuja solo si está abierto */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-line bg-white px-[6%] pt-2 pb-7 shadow-[0_20px_30px_rgba(0,0,0,0.12)] nav:hidden"
        >
          <NavbarLinks
            links={navLinks}
            onLinkClick={closeMenu}
            className="flex flex-col"
            linkClassName="block border-b border-line py-4 text-sm font-semibold uppercase"
          />
          <Link
            to="/ingresar"
            onClick={closeMenu}
            className="mt-6 block bg-ink px-5 py-4 text-center text-sm font-bold text-white uppercase"
          >
            Área de socios
          </Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;
