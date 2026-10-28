import { useState } from "react";

interface Producto {
  id: number;
  nombre: string;
  comprado: boolean;
}

export default function ListaCompra() {
  const [lista, setLista] = useState<Producto[]>([]);
  const [texto, setTexto] = useState<string>("");

  // Dato derivado
  const pendientes = lista.filter((producto) => !producto.comprado).length;

  const anadir = (): void => {
    const nombre = texto.trim();
    if (nombre === "") return;
    const nuevo: Producto = { id: Date.now(), nombre, comprado: false };
    setLista([...lista, nuevo]);
    setTexto("");
  };

  const alternarComprado = (id: number): void => {
    setLista(
      lista.map((producto) =>
        producto.id === id
          ? { ...producto, comprado: !producto.comprado }
          : producto
      )
    );
  };

  const quitar = (id: number): void => {
    setLista(lista.filter((producto) => producto.id !== id));
  };

  return (
    <section>
      <h2>Ejercicio 3. Lista de la compra</h2>
      <input
        type="text"
        value={texto}
        placeholder="Nuevo producto"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTexto(e.target.value)
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") anadir();
        }}
      />{" "}
      <button onClick={anadir}>Añadir</button>

      <p>Pendientes: {pendientes}</p>

      <ul>
        {lista.map((producto) => (
          <li key={producto.id}>
            <input
              type="checkbox"
              checked={producto.comprado}
              onChange={() => alternarComprado(producto.id)}
            />{" "}
            <span
              style={{
                textDecoration: producto.comprado ? "line-through" : "none",
              }}
            >
              {producto.nombre}
            </span>{" "}
            <button onClick={() => quitar(producto.id)}>Quitar</button>
          </li>
        ))}
      </ul>
    </section>
  );
}