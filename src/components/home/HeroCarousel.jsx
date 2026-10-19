import { useEffect, useState } from 'react';
import { heroSlides } from '../../constants/heroSlides.js';
import { placeholder } from '../../constants/placeholder.js';
import HeroControls from './HeroControls.jsx';

// Tiempo que dura cada foto, en milisegundos
const SLIDE_DURATION = 6000;

function HeroCarousel() {
  // Posición de la foto que se muestra; cambia con el temporizador o al tocar un punto
  const [currentIndex, setCurrentIndex] = useState(0);

  // Indica si el carrusel está en pausa; arranca pausado si el usuario pidió menos movimiento
  const [isPaused, setIsPaused] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  // Programa el paso a la foto siguiente; se vuelve a programar cada vez que cambia la foto o la pausa
  useEffect(() => {
    const timeoutId = isPaused
      ? null
      : setTimeout(
          () => setCurrentIndex((prev) => (prev + 1) % heroSlides.length),
          SLIDE_DURATION,
        );

    // Limpieza: cancela el temporizador pendiente antes de programar otro o al desmontar
    return () => clearTimeout(timeoutId);
  }, [currentIndex, isPaused]);

  const togglePause = () => setIsPaused((prev) => !prev);
  return (
    <>
      {/* Capa 2: fotos (solo decorativas). En celular van debajo del texto, con fundido hacia arriba */}
      <div
        aria-hidden='true'
        className='relative order-2 h-80 w-full mask-[linear-gradient(to_bottom,transparent_0,#000_40%)] lg:absolute lg:inset-y-0 lg:right-[4%] lg:left-0 lg:h-auto lg:w-auto lg:mask-[linear-gradient(to_right,#000_78%,transparent_100%)]'
      >
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 bg-cover bg-position-[65%_center] transition-opacity duration-1200 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${slide.src}), ${placeholder}` }}
          />
        ))}
      </div>

      <HeroControls
        slides={heroSlides}
        currentIndex={currentIndex}
        isPaused={isPaused}
        onSelect={setCurrentIndex}
        onTogglePause={togglePause}
      />
    </>
  );
}

export default HeroCarousel;
