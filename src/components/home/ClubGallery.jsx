import { clubPhotos } from '../../constants/clubPhotos.js';
import Photo from '../ui/Photo.jsx';

// Ubicación de cada foto según cuántas haya (de 1 a 4)
const layouts = {
  1: ['col-span-2 row-span-2'],
  2: ['row-span-2', 'row-span-2'],
  3: ['row-span-2', '', ''],
  4: ['', '', '', ''],
};

function ClubGallery() {
  const itemClasses = layouts[clubPhotos.length];

  return (
    <div className='grid h-87.5 grid-cols-2 grid-rows-2 gap-1.5 lg:h-120'>
      {clubPhotos.map((photo, index) => (
        <Photo
          key={photo.id}
          src={photo.src}
          label={photo.label}
          className={itemClasses[index]}
        />
      ))}
    </div>
  );
}

export default ClubGallery;
