import { FaScrewdriverWrench } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

// Página provisoria para las rutas que todavía no tienen su vista
function UnderConstructionPage() {
  return (
    <section className='px-[10%] py-24'>
      <FaScrewdriverWrench aria-hidden='true' className='text-4xl' />
      <p className='mt-6 text-sm font-bold tracking-widest'>EN CONSTRUCCIÓN</p>
      <h1 className='mt-4 font-display text-6xl font-bold'>
        Estamos trabajando en esta página
      </h1>
      <p className='mt-4 max-w-xl text-muted'>
        Muy pronto vas a poder ver esta sección del sitio.
      </p>
      <Link
        to='/'
        className='mt-8 inline-block bg-ink px-6 py-3 text-sm font-bold text-white uppercase hover:bg-ink-light'
      >
        Volver al inicio
      </Link>
    </section>
  );
}

export default UnderConstructionPage;
