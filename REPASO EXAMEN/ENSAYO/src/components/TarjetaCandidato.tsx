import type { Candidato, Estado } from "../tipos";

// Props: los datos que el componente padre (App) le pasa a la tarjeta.
// Los datos viajan HACIA ABAJO por props.
type Props = {
  candidato: Candidato;            // datos del candidato a mostrar
  estado: Estado;                  // "ninguno" | "algunos" | "lider"
  textoBoton?: string;             // opcional: texto del botón
  alVotar: (id: number) => void;   // función que recibe un id y no devuelve nada;
                                   // así la tarjeta AVISA hacia ARRIBA de que se votó
};

// Componente: función que devuelve JSX (lo que se dibuja en pantalla).
// Las props se reciben DESESTRUCTURADAS: { a, b } en vez de props.a, props.b.
// "textoBoton = 'Votar'" es un valor por defecto si no se pasa esa prop.
export default function TarjetaCandidato({
  candidato,
  estado,
  textoBoton = "Votar",
  alVotar,
}: Props) {
  return (
    // Clase dinámica: "tarjeta tarjeta--lider", "tarjeta tarjeta--ninguno"...
    // Sirve para que el CSS coloree la tarjeta según su estado.
    <div className={`tarjeta tarjeta--${estado}`}>
      {/* Entre llaves {} se mete JavaScript dentro del JSX */}
      <h2>{candidato.nombre}</h2>
      <p>Lista nº {candidato.numeroLista}</p>
      <p>Votos: {candidato.votos}</p>

      {/* Renderizado condicional con &&: si la condición es true, se muestra el <p>;
          si es false, no se dibuja nada */}
      {estado === "lider" && <p>👑 Va en cabeza</p>}
      {estado === "ninguno" && <p>Todavía sin votos</p>}

      {/* Si lema es undefined o "" es falsy y no se muestra; solo aparece si lo tiene */}
      {candidato.lema && <p>«{candidato.lema}»</p>}

      {/* Función flecha: la llamada a alVotar se ejecuta AL PULSAR.
          Si escribieras onClick={alVotar(candidato.id)} se ejecutaría al dibujar */}
      <button onClick={() => alVotar(candidato.id)}>{textoBoton}</button>
    </div>
  );
}