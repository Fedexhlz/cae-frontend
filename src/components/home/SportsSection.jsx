import { sports } from '../../constants/sports.js';
import SectionHeading from '../ui/SectionHeading.jsx';
import SportCard from './SportCard.jsx';

function SportsSection() {
  return (
    <section
      id='deportes'
      className='bg-ink px-[10%] py-20 text-white md:py-30'
    >
      <div className='mb-15 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end'>
        <SectionHeading
          label='TODO EL AÑO'
          lines={['NUESTROS', 'DEPORTES']}
          isLight
        />
        <p className='max-w-75 leading-[1.7] text-neutral-500'>
          Encontrá tu lugar dentro del club. Entrenamientos, categorías y
          profesores.
        </p>
      </div>

      <div className='grid gap-0.5 lg:grid-cols-2'>
        {sports.map((sport) => (
          <SportCard key={sport.id} sport={sport} />
        ))}
      </div>
    </section>
  );
}

export default SportsSection;
