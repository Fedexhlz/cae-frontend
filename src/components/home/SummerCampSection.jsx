import { Link } from 'react-router-dom';
import {
  summerCampDetails,
  summerCampFeatures,
  summerCampStatus,
  summerCampStatuses,
} from '../../constants/summerCamp.js';
import Photo from '../ui/Photo.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

function SummerCampSection() {
  // Cartel de la temporada actual, según el estado definido en constants/summerCamp.js
  const {
    label: statusLabel,
    badgeClass,
    dotClass,
  } = summerCampStatuses[summerCampStatus];

  return (
    <section id='colonia' className='bg-paper-soft px-[10%] py-20 md:py-30'>
      <div className='grid items-center gap-15 lg:grid-cols-2 lg:gap-22.5'>
        <div>
          <SectionHeading
            label='SOLO EN VERANO'
            lines={['COLONIA', 'DE VERANO']}
          />

          <p
            className={`mt-7 inline-flex items-center gap-2.5 border px-3.5 py-1.75 text-[11px] font-bold tracking-[2px] ${badgeClass}`}
          >
            <span className={`size-2 rounded-full border ${dotClass}`} />
            {statusLabel}
          </p>

          <p className='mt-6 max-w-130 leading-[1.8] text-neutral-600'>
            Una propuesta de verano con pileta, deportes y actividades
            recreativas para pasar las vacaciones en el club.
          </p>

          <ul className='my-8 max-w-130'>
            {summerCampFeatures.map(({ id, icon: Icon, title, text }) => (
              <li
                key={id}
                className='flex items-center gap-4.5 border-t border-line py-4 last:border-b'
              >
                <span className='flex size-11 shrink-0 items-center justify-center bg-ink text-lg text-white'>
                  <Icon />
                </span>
                <div>
                  <strong className='block text-[15px]'>{title}</strong>
                  <span className='text-sm text-neutral-500'>{text}</span>
                </div>
              </li>
            ))}
          </ul>

          <dl className='mb-9 grid max-w-130 gap-3.5 sm:grid-cols-3 sm:gap-5'>
            {summerCampDetails.map(({ id, term, value }) => (
              <div key={id}>
                <dt className='text-[10px] font-bold tracking-[2px] text-muted uppercase'>
                  {term}
                </dt>
                <dd className='mt-1.5 font-display text-2xl font-semibold'>
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            to='/#contacto'
            className='inline-block bg-ink px-6.25 py-3.75 text-xs font-bold text-white uppercase transition-colors hover:bg-ink-light'
          >
            Consultar información
          </Link>
        </div>

        <Photo
          src='/images/summer-camp/pool.jpg'
          label='Pileta del club'
          className='min-h-85 shadow-[10px_10px_0_var(--color-ink)] lg:min-h-140 lg:shadow-[16px_16px_0_var(--color-ink)]'
        />
      </div>
    </section>
  );
}

export default SummerCampSection;
