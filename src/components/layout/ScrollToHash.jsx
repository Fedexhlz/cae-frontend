import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// No dibuja nada: solo ajusta el scroll cuando cambia la dirección
function ScrollToHash() {
  const { pathname, hash, key } = useLocation();

  // Recuerda la página anterior para saber si se cambió de página o se sigue en la misma
  const previousPathname = useRef(null);

  // Se ejecuta al cargar y en cada navegación: key cambia siempre, incluso si la dirección es la misma
  useEffect(() => {
    const isSamePage = previousPathname.current === pathname;
    previousPathname.current = pathname;

    // Con hash (ej. #club) baja hasta ese elemento. Sin hash vuelve arriba: con scroll suave
    // si se sigue en la misma página (ej. el logo) y con salto directo si es otra página
    hash
      ? document.getElementById(hash.slice(1))?.scrollIntoView()
      : window.scrollTo({ top: 0, behavior: isSamePage ? 'auto' : 'instant' });
  }, [pathname, hash, key]);

  return null;
}

export default ScrollToHash;
