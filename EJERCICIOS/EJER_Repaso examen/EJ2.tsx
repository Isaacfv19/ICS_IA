import { useState } from "react";

const MINIMO = 0;
const MAXIMO = 10;

export default function ContadorLimitado() {
  const [cuenta, setCuenta] = useState<number>(MINIMO);

  // Dato derivado: no se guarda en estado
  const maximoAlcanzado = cuenta === MAXIMO;

  return (
    <section>
      <h2>Ejercicio 2. Contador con límites</h2>
      <p>Valor: {cuenta}</p>
      <button
        onClick={() => setCuenta((anterior) => anterior - 1)}
        disabled={cuenta <= MINIMO}
      >
        Restar
      </button>{" "}
      <button
        onClick={() => setCuenta((anterior) => anterior + 1)}
        disabled={cuenta >= MAXIMO}
      >
        Sumar
      </button>{" "}
      <button onClick={() => setCuenta(MINIMO)}>Reiniciar</button>
      {maximoAlcanzado && <p>Máximo alcanzado</p>}
    </section>
  );
}