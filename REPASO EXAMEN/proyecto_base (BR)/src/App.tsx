// RETOS 3, 4 y 5 · Estado, lista de tarjetas, votos y uso de los componentes.
// Ahora solo muestra el título. Importa lo que necesites desde `./datos`, `./tipos`,
// `./utilidades` y `./components`.
import { useState } from "react";
import type { Candidato } from "./tipos";
import { candidatosIniciales } from "./datos";
import { obtenerEstado } from "./utilidades";
import { TarjetaCandidato } from "./components/TarjetaCandidato";
import { FormularioCandidato } from "./components/FormularioCandidato";

function App() {

  const [candidatos, setCandidatos] =
    useState<Candidato[]>(candidatosIniciales);


  function votar(id: number): void {
    setCandidatos((lista) =>
      lista.map((candidato) =>
        candidato.id === id ? {
          ...candidato, votos: candidato.votos + 1
        } : candidato
      ));
  }

  const totalVotos = candidatos.reduce((total, candidato) => total + candidato.votos, 0)

  const maximo = Math.max(0, ...candidatos.map((candidato) => candidato.votos,))

  function anadirCandidato(nuevoCandidato: Candidato): void {
    setCandidatos((lista) => [...lista, nuevoCandidato]);
  }

  return (
    <main className="contenedor">
      <h1>Elección de delegado/a</h1>
      <p>Votos emitidos: {totalVotos}</p>
      {candidatos.length === 0 ? (
        <p>Todavia No haty candidatos</p>
      ) : (
        <section>
          {candidatos.map((candidato) =>
            <TarjetaCandidato
              key={candidato.id}
              candidato={candidato}
              estado={obtenerEstado(candidato.votos, maximo)}
              alvotar={votar} />)}
        </section>
      )}

      <FormularioCandidato alAñadir={anadirCandidato} />
      <p className="subtitulo">Ensayo 2 · UT 01 y UT 02</p>
    </main>
  );
}

export default App;
