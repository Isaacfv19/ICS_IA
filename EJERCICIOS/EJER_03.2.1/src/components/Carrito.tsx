import type { ItemCarrito, Producto } from "../tipos";
import FilaCarrito from "./FilaCarrito";
import ResumenCarrito from "./ResumenCarrito";

interface CarritoProps {
  carrito: ItemCarrito[];
  productos: Producto[];
  unidades: number;
  subtotal: number;
  onIncrementar: (id: string) => void;
  onDecrementar: (id: string) => void;
  onEliminar: (id: string) => void;
  onVaciar: () => void;
}

export default function Carrito({
  carrito,
  productos,
  unidades,
  subtotal,
  onIncrementar,
  onDecrementar,
  onEliminar,
  onVaciar,
}: CarritoProps) {
  if (carrito.length === 0) {
    return (
      <section>
        <h2>Carrito</h2>
        <p>Tu carrito está vacío</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Carrito</h2>
      <ul className="lista-carrito">
        {carrito.map((item) => {
          const producto = productos.find((p) => p.id === item.idProducto);
          if (!producto) return null;
          return (
            <FilaCarrito
              key={item.idProducto}
              producto={producto}
              cantidad={item.cantidad}
              onIncrementar={onIncrementar}
              onDecrementar={onDecrementar}
              onEliminar={onEliminar}
            />
          );
        })}
      </ul>
      <ResumenCarrito unidades={unidades} subtotal={subtotal} />
      <button className="vaciar" onClick={onVaciar}>
        Vaciar carrito
      </button>
    </section>
  );
}
