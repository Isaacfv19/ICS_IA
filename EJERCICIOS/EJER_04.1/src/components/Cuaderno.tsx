import { useEffect, useReducer, useState } from "react";
import { esListaAlumnos, reductor, type Alumno } from "../tiposAlumno";
import FormularioAlumno from "./FormularioAlumno";
import ListaAlumnos from "./ListaAlumnos";
import Resumen from "./Resumen";

export default function Cuaderno() {
  const [alumnos, despachar] = useReducer(reductor, []);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Datos derivados, ninguno se guarda en el estado.
  const total = alumnos.length;
  const media = total === 0 ? 0 : alumnos.reduce((suma, a) => suma + a.nota, 0) / total;
  const aprobados = alumnos.filter((a) => a.nota >= 5).length;
  const mejor = alumnos.reduce<Alumno | null>(
    (actual, a) => (actual === null || a.nota > actual.nota ? a : actual),
    null
  );

  useEffect(() => {
    const tituloAnterior = document.title;
    document.title = `Cuaderno (${total} alumnos)`;
    return () => {
      document.title = tituloAnterior;
    };
  }, [total]);

  function manejarAnadir(nombre: string, nota: number) {
    // El id se crea fuera del reductor para que este sea puro.
    despachar({ tipo: "anadir", id: crypto.randomUUID(), nombre, nota });
  }

  async function manejarCargar() {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await fetch("/alumnos.json");
      if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status} al cargar el ejemplo`);
      }
      const datos: unknown = await respuesta.json();
      if (!esListaAlumnos(datos)) {
        throw new Error("El archivo no tiene el formato esperado");
      }
      despachar({ tipo: "cargar", alumnos: datos });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setCargando(false);
    }
  }

  return (
    <section>
      <h2>D · Cuaderno de notas del grupo</h2>
      <FormularioAlumno alAnadir={manejarAnadir} />
      <p>
        <button onClick={manejarCargar} disabled={cargando}>
          Cargar ejemplo
        </button>{" "}
        <button onClick={() => despachar({ tipo: "vaciar" })}>Vaciar</button>
      </p>
      {cargando && <p>Cargando…</p>}
      {error && <p role="alert">{error}</p>}
      <ListaAlumnos
        alumnos={alumnos}
        alCambiarNota={(id, nota) => despachar({ tipo: "cambiarNota", id, nota })}
        alEliminar={(id) => despachar({ tipo: "eliminar", id })}
      />
      <Resumen total={total} media={media} aprobados={aprobados} mejor={mejor} />
    </section>
  );
}
