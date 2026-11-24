import { useEffect, useRef, useState } from "react";

function formatear(decimas: number): string {
  const minutos = Math.floor(decimas / 600);
  const segundos = Math.floor(decimas / 10) % 60;
  const decima = decimas % 10;
  return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}.${decima}`;
}

export default function C2Cronometro() {
  const [decimas, setDecimas] = useState(0);
  const [enMarcha, setEnMarcha] = useState(false);
  const [vueltas, setVueltas] = useState<number[]>([]);

  // Valores mutables que no deben provocar un nuevo renderizado.
  const idTemporizador = useRef<number | null>(null);
  const instanteInicio = useRef(0);

  function iniciar() {
    if (idTemporizador.current !== null) return;
    // Se calcula a partir del instante de inicio para no acumular error.
    instanteInicio.current = Date.now() - decimas * 100;
    idTemporizador.current = window.setInterval(() => {
      setDecimas(Math.floor((Date.now() - instanteInicio.current) / 100));
    }, 100);
    setEnMarcha(true);
  }

  function parar() {
    if (idTemporizador.current !== null) {
      window.clearInterval(idTemporizador.current);
      idTemporizador.current = null;
    }
    setEnMarcha(false);
  }

  function vuelta() {
    setVueltas((anteriores) => [...anteriores, decimas]);
  }

  function reiniciar() {
    parar();
    setDecimas(0);
    setVueltas([]);
  }

  // Si se desmonta con el cronómetro en marcha, se detiene el temporizador.
  useEffect(() => {
    return () => {
      if (idTemporizador.current !== null) {
        window.clearInterval(idTemporizador.current);
      }
    };
  }, []);

  return (
    <section>
      <h2>C2 · Cronómetro con vueltas</h2>
      <p style={{ fontSize: "2rem", fontFamily: "monospace" }}>{formatear(decimas)}</p>
      <button onClick={iniciar} disabled={enMarcha}>Iniciar</button>
      <button onClick={parar} disabled={!enMarcha}>Parar</button>
      <button onClick={vuelta} disabled={!enMarcha}>Vuelta</button>
      <button onClick={reiniciar}>Reiniciar</button>
      <ol>
        {vueltas.map((v, i) => (
          <li key={i}>{formatear(v)}</li>
        ))}
      </ol>
    </section>
  );
}
