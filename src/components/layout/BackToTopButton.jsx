import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

// Botón flotante para volver arriba: aparece al bajar una pantalla de alto
const BackToTopButton = () => {
  // Indica si el botón se ve; cambia según cuánto se haya bajado en la página
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () =>
      setIsVisible(window.scrollY > window.innerHeight);

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Limpieza: quita el escuchador al desmontar el componente
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // El scroll suave lo define index.css (y respeta "menos movimiento")
  const scrollToTop = () => window.scrollTo({ top: 0 });

  return (
    <button
      type='button'
      onClick={scrollToTop}
      aria-label='Volver arriba'
      className={`fixed right-6 bottom-6 z-40 flex size-12 items-center justify-center border border-white bg-ink text-white shadow-[0_6px_20px_rgba(0,0,0,0.35)] transition-all duration-300 hover:bg-ink-light ${
        isVisible ? 'visible opacity-100' : 'invisible translate-y-3 opacity-0'
      }`}
    >
      <FaArrowUp />
    </button>
  );
};

export default BackToTopButton;
