import { Link } from 'react-router-dom';
import Photo from '../ui/Photo.jsx';

// Estilo de la etiqueta de categoría según la variante de cada noticia
const tagClasses = {
  filled: 'border-ink bg-ink text-white',
  outline: 'border-ink text-ink',
  soft: 'border-neutral-300 bg-neutral-300 text-ink',
};

const featuredClasses = 'group relative flex flex-col';
const smallClasses =
  'group relative grid grid-cols-[34%_1fr] gap-4 border-t border-line py-6 sm:grid-cols-[38%_1fr] sm:gap-5 lg:flex-1 lg:first:border-0 lg:first:pt-0 lg:last:pb-0';

// Tarjeta de noticia: grande si es la destacada, chica si no
const NewsCard = ({ news, isFeatured = false }) => {
  const { id, category, tagVariant, date, dateTime, title, excerpt, image } =
    news;

  return (
    <article className={isFeatured ? featuredClasses : smallClasses}>
      <Photo
        src={image}
        className={isFeatured ? 'min-h-85 flex-1' : 'min-h-30'}
      />

      <div className={isFeatured ? 'pt-6' : ''}>
        <div className='mb-3 flex items-center gap-3'>
          <span
            className={`border px-2.5 py-1.25 text-[10px] font-bold tracking-[2px] uppercase ${tagClasses[tagVariant]}`}
          >
            {category}
          </span>
          <time dateTime={dateTime} className='text-xs text-muted'>
            {date}
          </time>
        </div>

        <h3
          className={`font-display leading-[0.95] font-bold ${
            isFeatured
              ? 'mb-3.5 text-[clamp(36px,3.6vw,52px)]'
              : 'mb-2 text-[22px] sm:text-[26px]'
          }`}
        >
          {/* El enlace del título cubre toda la tarjeta */}
          <Link
            to={`/noticias/${id}`}
            className='after:absolute after:inset-0 hover:underline hover:underline-offset-4'
          >
            {title}
          </Link>
        </h3>

        <p
          className={`leading-relaxed text-neutral-600 ${
            isFeatured ? '' : 'line-clamp-2 text-sm'
          }`}
        >
          {excerpt}
        </p>

        {isFeatured && (
          <span className='mt-4.5 inline-block text-[13px] font-bold uppercase'>
            Leer más{' '}
            <span
              aria-hidden='true'
              className='inline-block transition-transform group-hover:translate-x-1.5'
            >
              →
            </span>
          </span>
        )}
      </div>
    </article>
  );
};

export default NewsCard;
