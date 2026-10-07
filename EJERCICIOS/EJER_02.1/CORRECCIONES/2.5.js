export function Fecha() {
  const anioActual = new Date().getFullYear();
  return <p>Estamos en el año {anioActual}</p>;
}