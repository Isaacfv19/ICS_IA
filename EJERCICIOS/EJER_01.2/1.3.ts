//interfaz Alumno
interface Alumno {
    nombre: string;
    nota: number;
    activo?: boolean;
}

//array de alumnos
const alumnos: Alumno[] = [
    { nombre: "Ana", nota: 8.5, activo: true },
    { nombre: "Carlos", nota: 7, activo: true },
    { nombre: "Lucía", nota: 9.2 },
    { nombre: "Miguel", nota: 6.8, activo: false }
];

//nota media usando reduce
function calcularMedia(alumnos: Alumno[]): number {
    const suma = alumnos.reduce((total, alumno) => total + alumno.nota, 0);
    return suma / alumnos.length;
}

//mostar los datos de un alumno
function mostrarResumen(alumno: Alumno): void {
    console.log(`Nombre: ${alumno.nombre}`);
    console.log(`Nota: ${alumno.nota}`);
    console.log(`Activo: ${alumno.activo ?? "No especificado"}`);
}

// Mostrar la media
console.log(`Nota media: ${calcularMedia(alumnos)}`);

// Mostrar el resumen de un alumno
// mostrarResumen(alumnos[0]);

// Forzamos un error de tipos 
// calcularMedia("No es un array de alumnos");
