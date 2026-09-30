export enum Nivel {
  BASICO,
  INTERMEDIO,
  AVANZADO,
}

export type EstadoMatricula = 'matriculado' | 'baja' | 'pendiente';

export interface Curso {
  id: number;
  titulo: string;
  nivel: Nivel;
}

export interface Alumno {
  id: number;
  nombre: string;
  nota: number;
  estado: EstadoMatricula;
  curso: Curso;
}