import { useState } from "react";

export default function InterruptorLuz() {
  const [encendida, setEncendida] = useState<boolean>(false);

  return (
    <section>
      <h2>Ejercicio 1. Interruptor de luz</h2>
      <div
        style={{
          width: 200,
          height: 100,
          borderRadius: 8,
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: encendida ? "#facc15" : "#374151",
          color: encendida ? "#000" : "#fff",
        }}
      >
        {encendida ? "Luz encendida" : "Luz apagada"}
      </div>
      <button onClick={() => setEncendida(!encendida)}>
        {encendida ? "Apagar" : "Encender"}
      </button>
    </section>
  );
}