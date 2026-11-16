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

// Edad real en años cumplidos hoy, a partir de una fecha "AAAA-MM-DD"
export function edadActual(fechaNacimiento, hoy = new Date()) {
  const [anio, mes, dia] = fechaNacimiento.split("-").map(Number);
  let edad = hoy.getFullYear() - anio;
  const mesHoy = hoy.getMonth() + 1;
  const todaviaNoCumplio = mesHoy < mes || (mesHoy === mes && hoy.getDate() < dia);
  if (todaviaNoCumplio) edad -= 1;
  return edad;
}