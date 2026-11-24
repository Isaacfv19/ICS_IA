import { useEffect, useState } from "react";

interface RelojProps {
  zonaHoraria?: string;
}

function Reloj({ zonaHoraria }: RelojProps) {
  const [ahora, setAhora] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => {
      console.log("tic"); // Solo para la comprobación del ejercicio
      setAhora(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <p>{ahora.toLocaleTimeString("es-ES", { timeZone: zonaHoraria })}</p>;
}

export default function B1Relojes() {
  const [visible, setVisible] = useState(true);

  return (
    <section>
      <h2>B1 · Reloj con limpieza</h2>
      <label>
        <input
          type="checkbox"
          checked={visible}
          onChange={(e) => setVisible(e.target.checked)}
        />{" "}
        Mostrar relojes
      </label>
      {visible && (
        <>
          <h3>Madrid</h3>
          <Reloj zonaHoraria="Europe/Madrid" />
          <h3>Ciudad de México</h3>
          <Reloj zonaHoraria="America/Mexico_City" />
        </>
      )}
    </section>
  );
}
