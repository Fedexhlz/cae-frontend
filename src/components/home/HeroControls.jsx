import { FaPause, FaPlay } from 'react-icons/fa6';

// Puntos para elegir foto y botón de pausa: todo llega por props desde HeroCarousel
function HeroControls({
  slides,
  currentIndex,
  isPaused,
  onSelect,
  onTogglePause,
}) {
  return (
    <div
      role='group'
      aria-label='Controles del carrusel de fotos'
      className='absolute right-[7%] bottom-5 z-10 flex items-center gap-1 bg-black/70 py-1 pr-1.5 pl-2.5 lg:right-[6%] lg:bottom-8'
    >
      <div className='flex'>
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type='button'
            onClick={() => onSelect(index)}
            aria-label={`Ver foto ${index + 1} de ${slides.length}`}
            aria-current={index === currentIndex}
            className='group relative h-7 w-7.5 cursor-pointer'
          >
            {/* Barrita: blanca si es la foto actual, tenue si no */}
            <span
              className={`absolute inset-x-0.75 top-3 h-1 transition-colors ${
                index === currentIndex
                  ? 'bg-white'
                  : 'bg-white/40 group-hover:bg-white/75'
              }`}
            />
          </button>
        ))}
      </div>

      <button
        type='button'
        onClick={onTogglePause}
        aria-label={isPaused ? 'Reanudar carrusel' : 'Pausar carrusel'}
        className='ml-1 flex h-7 w-8 cursor-pointer items-center justify-center border-l border-white/30 text-xs'
      >
        {isPaused ? <FaPlay /> : <FaPause />}
      </button>
    </div>
  );
}

export default HeroControls;
