import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// No dibuja nada: solo ajusta el scroll cuando cambia la dirección
function ScrollToHash() {
  const { pathname, hash, key } = useLocation();

  // Se ejecuta al cargar y en cada navegación: key cambia siempre, incluso si la dirección es la misma
  useEffect(() => {
    // Con hash (ej. #club) baja hasta ese elemento; sin hash vuelve arriba sin animación
    hash
      ? document.getElementById(hash.slice(1))?.scrollIntoView()
      : window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash, key]);

  return null;
}

export default ScrollToHash;
