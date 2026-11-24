import { useReducer } from "react";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

interface LineaCarrito {
  producto: Producto;
  cantidad: number;
}

type Accion =
  | { tipo: "anadir"; producto: Producto }
  | { tipo: "quitar"; idProducto: number }
  | { tipo: "cambiarCantidad"; idProducto: number; cantidad: number }
  | { tipo: "vaciar" };

const catalogo: Producto[] = [
  { id: 1, nombre: "Cuaderno A4", precio: 3.5 },
  { id: 2, nombre: "Bolígrafos (pack 5)", precio: 4.2 },
  { id: 3, nombre: "Mochila", precio: 24.9 },
  { id: 4, nombre: "Calculadora", precio: 12 },
];

const moneda = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });

function reductor(estado: LineaCarrito[], accion: Accion): LineaCarrito[] {
  switch (accion.tipo) {
    case "anadir": {
      const existe = estado.some((l) => l.producto.id === accion.producto.id);
      if (existe) {
        return estado.map((l) =>
          l.producto.id === accion.producto.id ? { ...l, cantidad: l.cantidad + 1 } : l
        );
      }
      return [...estado, { producto: accion.producto, cantidad: 1 }];
    }
    case "quitar":
      return estado.filter((l) => l.producto.id !== accion.idProducto);
    case "cambiarCantidad":
      if (accion.cantidad <= 0) {
        return estado.filter((l) => l.producto.id !== accion.idProducto);
      }
      return estado.map((l) =>
        l.producto.id === accion.idProducto ? { ...l, cantidad: accion.cantidad } : l
      );
    case "vaciar":
      return [];
  }
}

export default function A2Carrito() {
  const [lineas, despachar] = useReducer(reductor, []);

  // Datos derivados, no se guardan en el estado.
  const articulos = lineas.reduce((suma, l) => suma + l.cantidad, 0);
  const total = lineas.reduce((suma, l) => suma + l.producto.precio * l.cantidad, 0);

  return (
    <section>
      <h2>A2 · Carrito con useReducer</h2>

      <h3>Catálogo</h3>
      <ul>
        {catalogo.map((p) => (
          <li key={p.id}>
            {p.nombre} · {moneda.format(p.precio)}{" "}
            <button onClick={() => despachar({ tipo: "anadir", producto: p })}>Añadir</button>
          </li>
        ))}
      </ul>

      <h3>Carrito ({articulos} artículos)</h3>
      {lineas.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <ul>
            {lineas.map((l) => (
              <li key={l.producto.id}>
                {l.producto.nombre} · {moneda.format(l.producto.precio)} ×{" "}
                <input
                  type="number"
                  min={0}
                  value={l.cantidad}
                  onChange={(e) =>
                    despachar({
                      tipo: "cambiarCantidad",
                      idProducto: l.producto.id,
                      cantidad: Number(e.target.value),
                    })
                  }
                />{" "}
                <button onClick={() => despachar({ tipo: "quitar", idProducto: l.producto.id })}>
                  Quitar
                </button>
              </li>
            ))}
          </ul>
          <p>
            <strong>Total: {moneda.format(total)}</strong>
          </p>
          <button onClick={() => despachar({ tipo: "vaciar" })}>Vaciar</button>
        </>
      )}
    </section>
  );
}
