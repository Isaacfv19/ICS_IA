import type { Producto } from "../tipos";
import { formatoMoneda } from "../formato";

interface TarjetaProductoProps {
  producto: Producto;
  enCarrito: number;
  onAñadir: (id: string) => void;
}

export default function TarjetaProducto({
  producto,
  enCarrito,
  onAñadir,
}: TarjetaProductoProps) {
  const agotado = producto.stock === 0;
  const sinMas = !agotado && enCarrito >= producto.stock;
  const deshabilitado = agotado || sinMas;

  let texto = "Añadir";
  if (agotado) texto = "Agotado";
  else if (sinMas) texto = "Sin más unidades";

  return (
    <article className="tarjeta">
      <h3>{producto.nombre}</h3>
      <p className="precio">{formatoMoneda(producto.precio)}</p>
      <button disabled={deshabilitado} onClick={() => onAñadir(producto.id)}>
        {texto}
      </button>
    </article>
  );
}
