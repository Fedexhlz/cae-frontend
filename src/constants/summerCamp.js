import {
  FaBasketball,
  FaCampground,
  FaSun,
  FaWaterLadder,
} from 'react-icons/fa6';

// Estado de la temporada: 'upcoming', 'open' o 'ongoing' (más adelante lo cambiará el administrador)
export const summerCampStatus = 'upcoming';

// Texto y estilo del cartel según el estado
export const summerCampStatuses = {
  upcoming: {
    label: 'PRÓXIMA TEMPORADA',
    badgeClass: 'border-ink',
    dotClass: 'border-ink',
  },
  open: {
    label: 'INSCRIPCIONES ABIERTAS',
    badgeClass: 'border-ink bg-ink text-white',
    dotClass: 'border-white bg-white',
  },
  ongoing: {
    label: 'EN CURSO',
    badgeClass: 'border-ink',
    dotClass: 'border-ink bg-ink',
  },
};

export const summerCampFeatures = [
  {
    id: 1,
    icon: FaWaterLadder,
    title: 'Pileta y clases de natación',
    text: 'Uso de la pileta del club, con clases de natación.',
  },
  {
    id: 2,
    icon: FaBasketball,
    title: 'Básquet y cestoball recreativos',
    text: 'Se practican de forma recreativa, como entretenimiento y sin entrenamientos intensos.',
  },
  {
    id: 3,
    icon: FaCampground,
    title: 'Salidas y campamentos',
    text: 'Pueden incluir salidas o viajes cortos.',
  },
  {
    id: 4,
    icon: FaSun,
    title: 'Temporada de verano',
    text: 'Se realiza únicamente durante el verano.',
  },
];

export const summerCampDetails = [
  { id: 1, term: 'Fechas', value: 'A confirmar' },
  { id: 2, term: 'Edades', value: 'A confirmar' },
  { id: 3, term: 'Valores', value: 'A confirmar' },
];
