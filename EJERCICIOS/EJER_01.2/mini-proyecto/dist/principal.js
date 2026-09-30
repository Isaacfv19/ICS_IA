"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelos_1 = require("./modelos");
const cursoTS = { id: 1, titulo: 'TypeScript', nivel: modelos_1.Nivel.INTERMEDIO };
const cursoJS = { id: 2, titulo: 'JavaScript', nivel: modelos_1.Nivel.BASICO };
const alumnos = [
    { id: 1, nombre: 'Ana', nota: 8.5, estado: 'matriculado', curso: cursoTS },
    { id: 2, nombre: 'Luis', nota: 4.2, estado: 'matriculado', curso: cursoJS },
    { id: 3, nombre: 'Marta', nota: 6.0, estado: 'baja', curso: cursoTS },
    { id: 4, nombre: 'Pablo', nota: 0, estado: 'pendiente', curso: cursoJS },
];
function filtrarPorEstado(lista, estado) {
    return lista.filter((a) => a.estado === estado);
}
function notaMedia(lista) {
    if (lista.length === 0)
        return 0;
    const suma = lista.reduce((total, a) => total + a.nota, 0);
    return suma / lista.length;
}
function describirAlumno(alumno) {
    const aprobado = alumno.nota >= 5 ? 'aprobado' : 'suspenso';
    return `${alumno.nombre} (${alumno.curso.titulo}, nivel ${modelos_1.Nivel[alumno.curso.nivel]}): ${aprobado}`;
}
const activos = filtrarPorEstado(alumnos, 'matriculado');
console.log('Matriculados:', activos.map(describirAlumno));
console.log('Nota media de matriculados:', notaMedia(activos));
