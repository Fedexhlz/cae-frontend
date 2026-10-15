import { Link } from 'react-router-dom';

// Enlace de texto con una flecha que se desplaza al pasar el mouse
const ArrowLink = ({ to, children, className = '' }) => {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2 text-[13px] font-bold uppercase ${className}`}
    >
      {children}
      <span
        aria-hidden='true'
        className='transition-transform group-hover:translate-x-1.5'
      >
        →
      </span>
    </Link>
  );
};

export default ArrowLink;
