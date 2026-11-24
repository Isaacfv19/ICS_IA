import { useState } from "react";

export default function A1Contador() {
  const [cuenta, setCuenta] = useState(0);

  // Versión corregida: usa la función actualizadora para sumar 3 de verdad.
  function manejarSumarTres() {
    setCuenta((anterior) => anterior + 1);
    setCuenta((anterior) => anterior + 1);
    setCuenta((anterior) => anterior + 1);
    console.log("Consola:", cuenta);
  }

  function manejarDuplicar() {
    setCuenta(cuenta + 1);
    setCuenta((anterior) => anterior * 2);
  }

  return (
    <section>
      <h2>A1 · Predice y comprueba</h2>
      <h3>{cuenta}</h3>
      <button onClick={manejarSumarTres}>Sumar 3</button>
      <button onClick={manejarDuplicar}>Duplicar</button>
    </section>
  );
}
