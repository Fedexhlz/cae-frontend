# Club Atlético Estudiantes

Sitio web del Club Atlético Estudiantes de San Miguel de Tucumán. Presenta las noticias del club, su identidad, las disciplinas que se practican (básquet y cestoball) y los horarios de entrenamiento.

Proyecto desarrollado en equipo para la materia Programación Web de la Tecnicatura Universitaria en Programación (UTN FRT).

🔗 **Sitio publicado:** https://caestudiantestuc.vercel.app/

## Integrantes

**Grupo 15**

- Herrera Lopez, Federico.
- Wytrykusz, Juan Esteban.
- Alvarado, Walter Martín.

- ## Tecnologías utilizadas

- [React](https://react.dev/) 19: construcción de la interfaz con componentes.
- [Vite](https://vite.dev/): herramienta de desarrollo y compilación.
- [Tailwind CSS](https://tailwindcss.com/) 4: estilos.
- [React Router](https://reactrouter.com/) 7: navegación entre páginas y secciones.
- [React Icons](https://react-icons.github.io/react-icons/): íconos.
- [Vercel](https://vercel.com/): publicación del sitio.

- ## Funcionalidades

- **Navegación fija** con menú hamburguesa en pantallas chicas y desplazamiento suave hacia cada sección.
- **Botón para volver arriba**, que aparece al bajar una pantalla.
- **Portada con carrusel de fotos** que cambia solo cada 6 segundos, con puntos para elegir la foto y botón de pausa. Arranca pausado si el usuario pidió menos movimiento en su dispositivo.
- **Noticias:** una noticia destacada y tres secundarias.
- **El club:** texto de presentación y galería que se acomoda según la cantidad de fotos.
- **Deportes:** tarjetas de básquet y cestoball.
- **Horarios de entrenamiento** organizados por día.
- **Pie de página** con el escudo, enlaces a redes y dirección.
- **Página 404** para direcciones que no existen.
- **Diseño responsive:** se adapta a celulares, tablets y computadoras.

- ## Instalación y ejecución

Requisitos: tener instalado [Node.js](https://nodejs.org/) (versión LTS) y [Git](https://git-scm.com/).

1. Clonar el repositorio:

```bash
   git clone https://github.com/Fedexhlz/cae-frontend.git
   cd cae-frontend
```

2. Instalar las dependencias:

```bash
   npm install
```

3. Iniciar el servidor de desarrollo:

```bash
   npm run dev
```

4. Abrir en el navegador la dirección que muestra la terminal (normalmente `http://localhost:5173`).

### Otros comandos

| Comando           | Qué hace                                      |
| ----------------- | --------------------------------------------- |
| `npm run build`   | Genera la versión optimizada para publicar    |
| `npm run preview` | Muestra en local la versión generada          |
| `npm run lint`    | Revisa el código con ESLint                   |


## Estructura del proyecto

```
cae-frontend/
├── public/                 Archivos estáticos (escudo, íconos, imágenes)
├── src/
│   ├── components/
│   │   ├── home/           Secciones de la página de inicio
│   │   ├── layout/         Navbar, footer y marco común de las páginas
│   │   └── ui/             Piezas reutilizables (fotos, títulos, enlaces)
│   ├── constants/          Datos de ejemplo: noticias, deportes, horarios
│   ├── pages/              Páginas: inicio y error 404
│   ├── services/           Reservada para la conexión con una API
│   ├── stores/             Reservada para el estado global
│   ├── App.jsx             Tabla de rutas
│   ├── main.jsx            Punto de entrada de la aplicación
│   └── index.css           Estilos globales y variables de diseño
├── index.html
└── package.json
```
