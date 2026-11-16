// Edad que el socio cumple durante este año, a partir de una fecha "AAAA-MM-DD".
// Es la que usan las federaciones para armar categorías (U13, U15...).
export function edadEnElAnio(fechaNacimiento, hoy = new Date()) {
  const anioNacimiento = Number(fechaNacimiento.split("-")[0]);
  return hoy.getFullYear() - anioNacimiento;
}

// Categoría de un deporte que le corresponde a esa edad (o null si ninguna)
export function categoriaPorEdad(sport, edad) {
  return (
    sport.categories.find(
      (cat) => edad >= cat.minAge && (cat.maxAge === null || edad <= cat.maxAge),
    ) ?? null
  );
}