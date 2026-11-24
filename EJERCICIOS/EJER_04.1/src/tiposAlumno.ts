export interface Alumno {
  id: string;
  nombre: string;
  nota: number; // de 0 a 10
}

export type Accion =
  | { tipo: "anadir"; id: string; nombre: string; nota: number }
  | { tipo: "cambiarNota"; id: string; nota: number }
  | { tipo: "eliminar"; id: string }
  | { tipo: "cargar"; alumnos: Alumno[] }
  | { tipo: "vaciar" };

// La nota siempre queda entre 0 y 10, lo garantiza el reductor.
function limitarNota(nota: number): number {
  if (Number.isNaN(nota)) return 0;
  return Math.min(10, Math.max(0, nota));
}

export function reductor(estado: Alumno[], accion: Accion): Alumno[] {
  switch (accion.tipo) {
    case "anadir": {
      const nombre = accion.nombre.trim();
      if (nombre === "") return estado;
      return [...estado, { id: accion.id, nombre, nota: limitarNota(accion.nota) }];
    }
    case "cambiarNota":
      return estado.map((a) =>
        a.id === accion.id ? { ...a, nota: limitarNota(accion.nota) } : a
      );
    case "eliminar":
      return estado.filter((a) => a.id !== accion.id);
    case "cargar":
      return accion.alumnos.map((a) => ({ ...a, nota: limitarNota(a.nota) }));
    case "vaciar":
      return [];
  }
}

// Guardas de tipo para validar datos externos (unknown).
function esAlumno(valor: unknown): valor is Alumno {
  if (typeof valor !== "object" || valor === null) return false;
  const candidato = valor as Record<string, unknown>;
  return (
    typeof candidato.id === "string" &&
    typeof candidato.nombre === "string" &&
    typeof candidato.nota === "number"
  );
}

export function esListaAlumnos(valor: unknown): valor is Alumno[] {
  return Array.isArray(valor) && valor.every(esAlumno);
}
