import { newsItems } from '../../constants/news.js';
import ArrowLink from '../ui/ArrowLink.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import NewsCard from './NewsCard.jsx';

const NewsSection = () => {
  // La primera noticia es la destacada y las otras tres van en la columna lateral
  const [featured, ...others] = newsItems;

  return (
    <section id='noticias' className='px-[10%] py-20 md:py-30'>
      <div className='mb-15 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end'>
        <SectionHeading label='ACTUALIDAD' lines={['ÚLTIMAS', 'NOTICIAS']} />
        <ArrowLink to='/noticias'>Ver todas las noticias</ArrowLink>
      </div>

      <div className='grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10'>
        <NewsCard news={featured} isFeatured />
        <div className='flex flex-col'>
          {others.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
