import { useState } from "react";

interface Pelicula {
  titulo: string;
  anio: number;
  genero: string;
}

const PELICULAS: Pelicula[] = [
  { titulo: "El Padrino", anio: 1972, genero: "Drama" },
  { titulo: "Matrix", anio: 1999, genero: "Ciencia ficción" },
  { titulo: "Alien", anio: 1979, genero: "Ciencia ficción" },
  { titulo: "El Rey León", anio: 1994, genero: "Animación" },
  { titulo: "Toy Story", anio: 1995, genero: "Animación" },
  { titulo: "Pulp Fiction", anio: 1994, genero: "Crimen" },
  { titulo: "Seven", anio: 1995, genero: "Crimen" },
  { titulo: "Forrest Gump", anio: 1994, genero: "Drama" },
  { titulo: "Origen", anio: 2010, genero: "Ciencia ficción" },
];

const GENEROS: string[] = Array.from(new Set(PELICULAS.map((p) => p.genero)));

export default function BuscadorPeliculas() {
  const [busqueda, setBusqueda] = useState<string>("");
  const [genero, setGenero] = useState<string>("Todos");

  // Datos derivados
  const filtradas = PELICULAS.filter(
    (pelicula) =>
      pelicula.titulo.toLowerCase().includes(busqueda.trim().toLowerCase()) &&
      (genero === "Todos" || pelicula.genero === genero)
  );

  const limpiarFiltros = (): void => {
    setBusqueda("");
    setGenero("Todos");
  };

  return (
    <section>
      <h2>Ejercicio 4. Buscador de películas</h2>
      <input
        type="text"
        value={busqueda}
        placeholder="Buscar por título"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setBusqueda(e.target.value)
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Escape") setBusqueda("");
        }}
      />{" "}
      <select
        value={genero}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setGenero(e.target.value)
        }
      >
        <option value="Todos">Todos</option>
        {GENEROS.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>{" "}
      <button onClick={limpiarFiltros}>Limpiar filtros</button>

      <p>{filtradas.length} resultados</p>

      {filtradas.length === 0 ? (
        <p>Sin resultados</p>
      ) : (
        <ul>
          {filtradas.map((pelicula) => (
            <li key={pelicula.titulo}>
              {pelicula.titulo} ({pelicula.anio}) · {pelicula.genero}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}