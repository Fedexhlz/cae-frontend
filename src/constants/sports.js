// Disciplinas del club (slug: parte final de la ruta, por ejemplo /deportes/basquet).
// Cada deporte guarda sus horarios, categorías y entrenadores. Los datos de ejemplo se reemplazan por los reales.
export const sports = [
  {
    id: 1,
    slug: 'basquet',
    name: 'BÁSQUET',
    description: 'Formación y competencia para diferentes categorías.',
    image: '/images/sports/basketball.jpg',
    schedule: [
      { id: 1, day: 'LUNES', time: '18:00 — 20:00', category: 'Mini y Cadetes' },
      { id: 2, day: 'MIÉRCOLES', time: '18:00 — 20:00', category: 'Juveniles' },
    ],
    categories: [
      { id: 1, name: 'Mini', ages: '6 a 11 años' },
      { id: 2, name: 'Cadetes', ages: '12 a 15 años' },
      { id: 3, name: 'Juveniles', ages: '16 a 19 años' },
    ],
    coaches: [
      {
        id: 1,
        name: 'Nombre del entrenador',
        role: 'Entrenador',
        image: '/images/coaches/basquet-1.jpg',
      },
    ],
  },
  {
    id: 2,
    slug: 'cestoball',
    name: 'CESTOBALL',
    description:
      'Deporte, compañerismo y formación dentro de nuestra comunidad.',
    image: '/images/sports/cestoball.jpg',
    schedule: [
      { id: 1, day: 'MARTES', time: '18:30 — 20:30', category: 'Infantiles' },
      { id: 2, day: 'JUEVES', time: '18:30 — 20:30', category: 'Juveniles y Mayores' },
    ],
    categories: [
      { id: 1, name: 'Infantiles', ages: '8 a 12 años' },
      { id: 2, name: 'Juveniles', ages: '13 a 17 años' },
      { id: 3, name: 'Mayores', ages: 'Desde 18 años' },
    ],
    coaches: [
      {
        id: 1,
        name: 'Nombre del entrenador',
        role: 'Entrenador',
        image: '/images/coaches/cestoball-1.jpg',
      },
    ],
  },
];