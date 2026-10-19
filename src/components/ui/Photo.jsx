import { placeholder } from '../../constants/placeholder.js';

// Caja con foto de fondo: si el archivo no existe, se ve el fondo de ejemplo.
// Con label se anuncia como imagen; sin label es decorativa y se oculta a los lectores de pantalla.
const Photo = ({ src, label, className = '' }) => {
  const accessibility = label
    ? { role: 'img', 'aria-label': label }
    : { 'aria-hidden': true };

  return (
    <div
      {...accessibility}
      className={`bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url(${src}), ${placeholder}` }}
    />
  );
};

export default Photo;
