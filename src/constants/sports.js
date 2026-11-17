export const sports = [
  {
    id: 1,
    slug: "basquet",
    name: "BÁSQUET",
    description: "Formación y competencia para diferentes categorías.",
    image: "/images/sports/basketball.jpg",

    schedule: [
      {
        id: 1,
        day: "LUNES",
        time: "18:00 — 20:00",
        category: "Mini y Cadetes",
        categoryIds: [4, 6],
      },
      {
        id: 2,
        day: "MIÉRCOLES",
        time: "18:00 — 20:00",
        category: "Juveniles",
        categoryIds: [7],
      },
    ],

    categories: [
      { id: 1, name: "Escuelita", ages: "Hasta 5 años", minAge: 0, maxAge: 5 },
      {
        id: 2,
        name: "Mosquito (U7)",
        ages: "6 y 7 años",
        minAge: 6,
        maxAge: 7,
      },
      {
        id: 3,
        name: "Pre-Mini (U9)",
        ages: "8 y 9 años",
        minAge: 8,
        maxAge: 9,
      },
      {
        id: 4,
        name: "Mini (U11)",
        ages: "10 y 11 años",
        minAge: 10,
        maxAge: 11,
      },
      {
        id: 5,
        name: "Infantiles (U13)",
        ages: "12 y 13 años",
        minAge: 12,
        maxAge: 13,
      },
      {
        id: 6,
        name: "Cadetes (U15)",
        ages: "14 y 15 años",
        minAge: 14,
        maxAge: 15,
      },
      {
        id: 7,
        name: "Juveniles (U17)",
        ages: "16 y 17 años",
        minAge: 16,
        maxAge: 17,
      },
      {
        id: 8,
        name: "Liga Próximo (U21)",
        ages: "18 a 21 años",
        minAge: 18,
        maxAge: 21,
      },
      {
        id: 9,
        name: "Primera",
        ages: "Desde 22 años",
        minAge: 22,
        maxAge: null,
      },
    ],

    coaches: [
      {
        id: 1,
        name: "Nombre del entrenador",
        role: "Entrenador",
        image: "/images/coaches/basquet-1.jpg",
      },
    ],
  },
  {
    id: 2,
    slug: "cestoball",
    name: "CESTOBALL",
    description:
      "Deporte, compañerismo y formación dentro de nuestra comunidad.",
    image: "/images/sports/cestoball.jpg",
    schedule: [
      {
        id: 1,
        day: "MARTES",
        time: "18:30 — 20:30",
        category: "Infantiles",
        categoryIds: [4],
      },
      {
        id: 2,
        day: "JUEVES",
        time: "18:30 — 20:30",
        category: "Juveniles y Primera",
        categoryIds: [6, 7],
      },
    ],
    categories: [
      { id: 1, name: "Escuelita", ages: "Hasta 7 años", minAge: 0, maxAge: 7 },
      { id: 2, name: "Pre-Mini", ages: "8 y 9 años", minAge: 8, maxAge: 9 },
      { id: 3, name: "Mini", ages: "10 y 11 años", minAge: 10, maxAge: 11 },
      {
        id: 4,
        name: "Infantiles",
        ages: "12 y 13 años",
        minAge: 12,
        maxAge: 13,
      },
      { id: 5, name: "Cadetes", ages: "14 y 15 años", minAge: 14, maxAge: 15 },
      {
        id: 6,
        name: "Juveniles",
        ages: "16 y 17 años",
        minAge: 16,
        maxAge: 17,
      },
      {
        id: 7,
        name: "Primera",
        ages: "Desde 18 años",
        minAge: 18,
        maxAge: null,
      },
    ],
    coaches: [
      {
        id: 1,
        name: "Nombre del entrenador",
        role: "Entrenador",
        image: "/images/coaches/cestoball-1.jpg",
      },
    ],
  },
];
