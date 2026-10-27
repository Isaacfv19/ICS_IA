// useState: hook de React que crea una variable de ESTADO.
// Cuando el estado cambia, React vuelve a dibujar el componente.
import { useState } from "react";
import type { Candidato } from "./tipos";
import { candidatosIniciales } from "./datos"; // datos de partida
import { obtenerEstado } from "./utilidades";
import TarjetaCandidato from "./components/TarjetaCandidato";
import FormularioCandidato from "./components/FormularioCandidato";

// App: componente principal. Guarda la lista (estado) y reparte datos y funciones.
export default function App() {
    // candidatos: valor actual de la lista.
    // setCandidatos: única forma correcta de modificarla.
    // <Candidato[]> indica que es una lista de Candidato.
    const [candidatos, setCandidatos] = useState<Candidato[]>(candidatosIniciales);

    // VALORES DERIVADOS: se calculan a partir del estado en cada render.
    // No se guardan en otro useState porque se podrían desincronizar.

    // reduce recorre la lista acumulando: suma empieza en 0 y añade los votos de cada c.
    const totalVotos = candidatos.reduce((suma, c) => suma + c.votos, 0);

    // Mayor número de votos. map saca solo los votos; "..." los pasa como argumentos
    // sueltos a Math.max. El 0 inicial hace que con lista vacía devuelva 0.
    const maximo = Math.max(0, ...candidatos.map((c) => c.votos));

    // votar: suma un voto al candidato con ese id.
    function votar(id: number) {
        // Forma FUNCIONAL de setCandidatos: recibe el valor anterior (anteriores)
        // y devuelve el nuevo. Se usa porque el valor nuevo depende del anterior.
        setCandidatos((anteriores) =>
            // map crea una lista NUEVA (no modifica la original, que sería un error en React).
            anteriores.map((c) =>
                // Si es el candidato votado: copia del objeto ({ ...c }) con votos + 1.
                // Si no, se deja el mismo objeto sin tocar.
                c.id === id ? { ...c, votos: c.votos + 1 } : c
            )
        );
    }

    // anadir: añade una candidatura nueva sin modificar el array original.
    function anadir(nuevo: Candidato) {
        // [...anteriores, nuevo] crea un array nuevo con todo lo anterior + el nuevo.
        // (push modificaría el original, y no se debe)
        setCandidatos((anteriores) => [...anteriores, nuevo]);
    }

    return (
        <main>
            <h1>Elección de delegado/a</h1>
            <p>Votos emitidos: {totalVotos}</p>

            {/* Operador ternario: condición ? si es true : si es false */}
            {candidatos.length === 0 ? (
                <p className="vacio">Todavía no hay candidaturas.</p>
            ) : (
                // map convierte cada candidato en una tarjeta.
                candidatos.map((c) => (
                    <TarjetaCandidato
                        key={c.id}                              // key: React identifica cada elemento de la lista
                        candidato={c}                           // props hacia abajo
                        estado={obtenerEstado(c.votos, maximo)} // estado calculado para esta tarjeta
                        alVotar={votar}                         // función que la tarjeta llamará al pulsar
                    />
                ))
            )}

            {/* El formulario se ve siempre. Le pasamos "anadir" para que nos avise
          cuando haya una candidatura nueva (datos hacia ARRIBA) */}
            <FormularioCandidato alAnadir={anadir} />
        </main>
    );
}