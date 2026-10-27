// RETO 2 · Componente TarjetaCandidato
// Ahora muestra datos fijos y el botón no hace nada. Hay que hacerlo configurable mediante props.
import type {Candidato,Estado  } from "../tipos";

type props={
  candidato:Candidato,
  estado:Estado,
  textBoton?:String,
  alvotar:(id:number)=>void
}

export function TarjetaCandidato({
  candidato,
  estado,
  textBoton='Votar',
  alvotar
}:props){
  return (
    <article className="tarjeta">
      <h3>
        Nombre del candidato: {candidato.nombre} <span className="numero">Nº {candidato.numeroLista}</span>
      </h3>
      <p>
        Votos:<strong> {candidato.votos}</strong>
      </p>
      {estado==='lider'&&(
        <p>Va en cabeza</p>)}

      {estado==='ninguno'&&(
        <p>Todavia sin votos</p>
      )}
      {candidato.lema&&(
        <p>{candidato.lema}</p>
      )}
      <button onClick={()=>alvotar(candidato.id)}>{textBoton}</button>
    </article>
  );
}


export default TarjetaCandidato;
