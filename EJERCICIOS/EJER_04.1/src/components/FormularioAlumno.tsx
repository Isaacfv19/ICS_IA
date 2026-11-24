import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";

interface FormularioAlumnoProps {
  alAnadir: (nombre: string, nota: number) => void;
}

export default function FormularioAlumno({ alAnadir }: FormularioAlumnoProps) {
  const [nombre, setNombre] = useState("");
  const [nota, setNota] = useState("");
  const campoNombre = useRef<HTMLInputElement>(null);

  function vaciar() {
    setNombre("");
    setNota("");
    campoNombre.current?.focus();
  }

  function manejarEnvio(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (nombre.trim() === "") {
      campoNombre.current?.focus();
      return;
    }
    alAnadir(nombre, Number(nota));
    vaciar();
  }

  function manejarTecla(e: KeyboardEvent<HTMLFormElement>) {
    if (e.key === "Escape") vaciar();
  }

  return (
    <form onSubmit={manejarEnvio} onKeyDown={manejarTecla}>
      <label>
        Nombre{" "}
        <input
          ref={campoNombre}
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </label>{" "}
      <label>
        Nota{" "}
        <input
          type="number"
          min={0}
          max={10}
          step={0.1}
          value={nota}
          onChange={(e) => setNota(e.target.value)}
        />
      </label>{" "}
      <button type="submit">Añadir</button>
    </form>
  );
}
