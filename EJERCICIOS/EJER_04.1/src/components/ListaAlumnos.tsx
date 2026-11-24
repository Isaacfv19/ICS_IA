import type { Alumno } from "../tiposAlumno";

interface ListaAlumnosProps {
  alumnos: Alumno[];
  alCambiarNota: (id: string, nota: number) => void;
  alEliminar: (id: string) => void;
}

export default function ListaAlumnos({
  alumnos,
  alCambiarNota,
  alEliminar,
}: ListaAlumnosProps) {
  if (alumnos.length === 0) {
    return <p>No hay alumnos todavía</p>;
  }

  return (
    <ul>
      {alumnos.map((a) => (
        <li key={a.id}>
          {a.nombre}{" "}
          <input
            type="number"
            min={0}
            max={10}
            step={0.1}
            value={a.nota}
            onChange={(e) => alCambiarNota(a.id, Number(e.target.value))}
          />{" "}
          <button onClick={() => alEliminar(a.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}
