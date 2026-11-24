import type { Alumno } from "../tiposAlumno";

interface ResumenProps {
  total: number;
  media: number;
  aprobados: number;
  mejor: Alumno | null;
}

const formatoMedia = new Intl.NumberFormat("es-ES", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export default function Resumen({ total, media, aprobados, mejor }: ResumenProps) {
  return (
    <div>
      <p>Total de alumnos: {total}</p>
      <p>Nota media: {total === 0 ? "-" : formatoMedia.format(media)}</p>
      <p>Aprobados: {aprobados}</p>
      <p>Mejor alumno: {mejor ? `${mejor.nombre} (${mejor.nota})` : "-"}</p>
    </div>
  );
}
