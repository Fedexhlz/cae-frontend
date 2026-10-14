import { Link } from 'react-router-dom';

// Lista de enlaces del menú: se reutiliza en escritorio (fila) y en el menú móvil (columna)
function NavbarLinks({ links, className, linkClassName, onLinkClick }) {
  return (
    <ul className={className}>
      {links.map(({ label, to }) => (
        <li key={to}>
          <Link to={to} onClick={onLinkClick} className={linkClassName}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default NavbarLinks;