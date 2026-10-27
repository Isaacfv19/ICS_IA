// Un "type" describe la FORMA de un dato. No genera código al ejecutarse,
// solo ayuda a TypeScript a detectar errores mientras escribes.

// Candidato: la forma que tiene cada candidato de la lista.
export type Candidato = {
  id: number;          // identificador único (sirve para saber a quién se vota y como "key")
  nombre: string;      // nombre del candidato
  numeroLista: number; // número que ocupa en la lista
  votos: number;       // votos acumulados
  lema?: string;       // el "?" indica que es OPCIONAL: puede existir o no
};

// Estado: tipo "unión de literales". Solo admite exactamente estos tres textos.
// Si escribes "otro", TypeScript da error.
export type Estado = "ninguno" | "algunos" | "lider";