import type { ItemCarrito, Producto } from "../tipos";
import TarjetaProducto from "./TarjetaProducto";

interface CatalogoProps {
  productos: Producto[];
  carrito: ItemCarrito[];
  onAñadir: (id: string) => void;
}

export default function Catalogo({ productos, carrito, onAñadir }: CatalogoProps) {
  return (
    <section>
      <h2>Catálogo</h2>
      <div className="rejilla">
        {productos.map((p) => (
          <TarjetaProducto
            key={p.id}
            producto={p}
            enCarrito={carrito.find((i) => i.idProducto === p.id)?.cantidad ?? 0}
            onAñadir={onAñadir}
          />
        ))}
      </div>
    </section>
  );
}
