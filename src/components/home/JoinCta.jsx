import { Link } from 'react-router-dom';

// Llamado final a asociarse, antes del footer
function JoinCta() {
  return (
    <section className='relative flex min-h-112.5 items-center justify-center overflow-hidden bg-ink px-[7%] py-20 text-center text-white'>
      {/* Rayas diagonales decorativas */}
      <div
        aria-hidden='true'
        className='absolute -inset-75 -rotate-15 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_80px,rgba(255,255,255,0.04)_80px,rgba(255,255,255,0.04)_120px)]'
      />

      <div className='relative'>
        <span className='text-[11px] font-bold tracking-[4px]'>
          FORMÁ PARTE
        </span>
        <h2 className='my-5 font-display text-[clamp(65px,8vw,90px)] leading-[0.8] font-bold'>
          EL CLUB
          <span className='block text-transparent [-webkit-text-stroke:2px_white]'>
            TE ESPERA
          </span>
        </h2>
        <p className='mx-auto my-7.5 max-w-112.5 leading-[1.7] text-neutral-400'>
          Consultá nuestras disciplinas, horarios y formas de asociarte.
        </p>
        <Link
          to='/asociarse'
          className='inline-block bg-white px-6.25 py-3.75 text-xs font-bold text-ink uppercase transition-colors hover:bg-neutral-300'
        >
          Quiero asociarme
        </Link>
      </div>
    </section>
  );
}

export default JoinCta;
