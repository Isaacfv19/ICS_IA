// "import type" importa solo el tipo (no existe en el JS final).
import type { Estado } from "./tipos";

// obtenerEstado: función que decide en qué situación está un candidato.
// - votos: votos del candidato
// - maximo: votos del candidato que más tiene
// ": Estado" tras los paréntesis es el tipo de RETORNO.
export function obtenerEstado(votos: number, maximo: number): Estado {
  if (votos === 0) return "ninguno";     // sin votos
  if (votos === maximo) return "lider";  // tiene votos y iguala al máximo
  return "algunos";                      // tiene votos pero menos que el máximo
}