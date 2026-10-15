import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className='px-[10%] py-24'>
      <p className='text-sm font-bold tracking-widest'>ERROR 404</p>
      <h1 className='mt-4 font-display text-6xl font-bold'>
        Página no encontrada
      </h1>
      <p className='mt-4 text-muted'>
        La dirección que buscás no existe o fue movida.
      </p>
      <Link
        to='/'
        className='mt-8 inline-block bg-ink px-6 py-3 text-sm font-bold text-white uppercase hover:bg-ink-light'
      >
        Volver al inicio
      </Link>
    </section>
  );
};

export default NotFoundPage;
