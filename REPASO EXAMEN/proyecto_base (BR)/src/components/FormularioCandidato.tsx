// RETO 5 · Componente FormularioCandidato
// Ahora es un formulario estático que no hace nada. Hay que hacerlo funcional.
import { useState, type FormEvent } from "react";
import type { Candidato } from "../tipos";

type Props = {
  alAñadir: (candidato: Candidato) => void;
};
export function FormularioCandidato({alAñadir}:Props) {

  const [nombre,setNombre]=useState("")
  const [numeroLista,setNumeroLista]=useState("")
  const [lema,setLema]=useState("")

  const numero=Number(numeroLista)

  const esValido=
  nombre.trim()!==""&&
  numeroLista.trim()!==""&&
  Number.isInteger(numero)&&
  numero>=1 &&
  numero<=30;

  function manejarEnvio(
    evento: FormEvent<HTMLFormElement>
  ):void {
    event?.preventDefault();
    if (!esValido) {
      return;
    }

    const nuevoCandidato:Candidato={
      id:Date.now(),
      nombre:nombre.trim(),
      numeroLista:numero,
      votos:0,
      ...(lema.trim()!==""&&{lema:lema.trim()}),

    };

    alAñadir(nuevoCandidato);
    setNombre("");
    setNumeroLista("");
    setLema("");

  }

  return (
     <form className="formulario" onSubmit={manejarEnvio}>
      <h2>Nueva candidatura</h2>

      <div className="campo">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(evento) => setNombre(evento.target.value)}
          required
        />
      </div>

      <div className="campo">
        <label htmlFor="numeroLista">
          Número de lista (1 a 30)
        </label>
        <input
          id="numeroLista"
          type="number"
          min="1"
          max="30"
          step="1"
          value={numeroLista}
          onChange={(evento) => setNumeroLista(evento.target.value)}
          required
        />
      </div>

      <div className="campo">
        <label htmlFor="lema">Lema (opcional)</label>
        <input
          id="lema"
          type="text"
          value={lema}
          onChange={(evento) => setLema(evento.target.value)}
        />
      </div>

      <button type="submit" disabled={!esValido}>
        Presentar candidatura
      </button>
    </form>
  );
}
