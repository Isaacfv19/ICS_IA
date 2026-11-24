import { useState, type FormEvent } from "react";

// Fragmento 1: dato derivado, se calcula al renderizar.
interface PropsResumen {
  nombre: string;
  apellidos: string;
}

function Resumen({ nombre, apellidos }: PropsResumen) {
  const nombreCompleto = `${nombre} ${apellidos}`;
  return <p>{nombreCompleto}</p>;
}

// Fragmento 2: la acción de enviar va en el manejador del evento.
function guardarEnServidor(datos: { nombre: string }) {
  console.log("Guardando", datos);
}

function Formulario() {
  const [nombre, setNombre] = useState("");

  function manejarEnvio(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    guardarEnServidor({ nombre });
  }

  return (
    <form onSubmit={manejarEnvio}>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <button type="submit">Guardar</button>
    </form>
  );
}

// Fragmento 3: sin efecto, el padre pasa key={idAlumno} y React crea un componente nuevo.
interface PropsFicha {
  idAlumno: number;
}

function FichaAlumno({ idAlumno }: PropsFicha) {
  const [comentario, setComentario] = useState("");

  return (
    <label>
      Comentario del alumno {idAlumno}
      <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} />
    </label>
  );
}

export default function B2Efectos() {
  const [idAlumno, setIdAlumno] = useState(1);

  return (
    <section>
      <h2>B2 · ¿Necesito un efecto?</h2>
      <Resumen nombre="Lucía" apellidos="Fernández" />
      <Formulario />
      <p>
        <button onClick={() => setIdAlumno(1)}>Alumno 1</button>
        <button onClick={() => setIdAlumno(2)}>Alumno 2</button>
      </p>
      <FichaAlumno key={idAlumno} idAlumno={idAlumno} />
    </section>
  );
}
