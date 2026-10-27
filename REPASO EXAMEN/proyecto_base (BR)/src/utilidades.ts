// RETO 1 · Función obtenerEstado
// Escribe aquí la función `obtenerEstado` (consulta el enunciado).


export function obtenerEstado(
    votos:number,
    maximo:number){

    if (votos===0) {
        return 'ninguno'
    }else if (votos===maximo) {
        return 'lider'
    }else{
        return 'algunos'
    }
};
