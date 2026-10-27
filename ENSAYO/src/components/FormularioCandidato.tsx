// FormEvent: tipo del evento de un formulario (para tipar manejarEnvio).
import { useState, type FormEvent } from "react";
import type { Candidato } from "../tipos";

// Props: solo recibe la función con la que avisa a App de un candidato nuevo.
type Props = {
  alAnadir: (candidato: Candidato) => void;
};

export default function FormularioCandidato({ alAnadir }: Props) {
  // CAMPOS CONTROLADOS: React guarda en estado lo que hay escrito en cada input.
  // Todos son texto, porque un <input> siempre entrega texto.
  const [nombre, setNombre] = useState("");
  const [numeroLista, setNumeroLista] = useState("");
  const [lema, setLema] = useState("");

  // VALIDACIÓN derivada: se calcula en cada render, sin crear otro estado.
  const numero = Number(numeroLista); // texto -> número
  const valido =
    nombre.trim() !== "" &&   // trim quita espacios: "   " cuenta como vacío
    numeroLista !== "" &&     // el número está relleno
    numero >= 1 &&            // y está entre 1...
    numero <= 30;             // ...y 30. El lema es opcional, no se comprueba.

  // manejarEnvio: se ejecuta al enviar el formulario.
  // FormEvent<HTMLFormElement> es el tipo del evento.
  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault(); // evita que el navegador recargue la página

    // Construimos el candidato nuevo.
    const nuevo: Candidato = {
      id: Date.now(),             // milisegundos actuales: id prácticamente único
      nombre: nombre.trim(),
      numeroLista: numero,        // ya convertido a número
      votos: 0,                   // empieza sin votos
      // Spread condicional: si hay lema, añade { lema: "..." }; si no, no añade nada
      // (si la condición es false, "...false" no añade ninguna propiedad).
      ...(lema.trim() !== "" && { lema: lema.trim() }),
    };

    alAnadir(nuevo); // avisamos a App (datos hacia arriba)

    // Vaciamos los tres campos.
    setNombre("");
    setNumeroLista("");
    setLema("");
  }

  return (
    // onSubmit se dispara al pulsar el botón submit o dar Enter.
    <form onSubmit={manejarEnvio}>
      <h2>Presentar candidatura</h2>

      {/* value = lo que se muestra (viene del estado).
          onChange = al escribir, actualiza el estado con e.target.value. */}
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="number"
        placeholder="Nº de lista (1-30)"
        value={numeroLista}
        onChange={(e) => setNumeroLista(e.target.value)}
      />
      <input
        placeholder="Lema (opcional)"
        value={lema}
        onChange={(e) => setLema(e.target.value)}
      />

      {/* disabled: el botón queda bloqueado mientras el formulario no sea válido */}
      <button type="submit" disabled={!valido}>
        Presentar
      </button>
    </form>
  );
}