import {
  FaIdCard,
  FaInstagram,
  FaLocationDot,
  FaPersonSwimming,
} from 'react-icons/fa6';
import { Link } from 'react-router-dom';

// Estilo compartido por los enlaces de la columna central
const linkClassName =
  'flex items-center gap-2.5 transition-opacity hover:opacity-50';

function Footer() {
  return (
    // El id permite que el enlace "Contacto" del navbar baje hasta acá desde cualquier página
    <footer
      id='contacto'
      className='grid gap-10 bg-ink-deep px-[10%] py-15 text-white md:grid-cols-[2fr_1fr_1fr]'
    >
      {/* Escudo y nombre del club */}
      <div className='flex items-center gap-4.5'>
        <img src='/crest.png' alt='' className='h-18 w-auto' />
        <div className='flex flex-col gap-3'>
          <strong className='font-display text-[28px] leading-[0.9] font-bold'>
            CLUB ATLÉTICO
            <br />
            ESTUDIANTES
          </strong>
          <span className='text-xs text-neutral-500'>
            San Miguel de Tucumán
          </span>
        </div>
      </div>

      {/* Enlaces */}
      <ul className='flex flex-col gap-2.5 text-xs uppercase'>
        <li>
          <a
            href='https://www.instagram.com/caestudiantestuc'
            target='_blank'
            rel='noopener noreferrer'
            className={linkClassName}
          >
            <FaInstagram className='size-4' /> Instagram
          </a>
        </li>
        <li>
          <Link to='/#colonia' className={linkClassName}>
            <FaPersonSwimming className='size-4' /> Colonia de verano
          </Link>
        </li>
        <li>
          <Link to='/ingresar' className={linkClassName}>
            <FaIdCard className='size-4' /> Área de socios
          </Link>
        </li>
      </ul>

      {/* Dirección */}
      <address className='flex items-start gap-2.5 text-xs leading-[1.7] text-neutral-500 not-italic'>
        <FaLocationDot className='mt-1 size-4 shrink-0 text-white' />
        <span>
          Monteagudo 955
          <br />
          San Miguel de Tucumán
        </span>
      </address>
    </footer>
  );
}

export default Footer;
