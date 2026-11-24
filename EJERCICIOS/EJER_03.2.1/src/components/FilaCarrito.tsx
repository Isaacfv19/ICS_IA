import { useState } from "react";
import type { Producto } from "../tipos";
import { formatoMoneda } from "../formato";

interface FilaCarritoProps {
  producto: Producto;
  cantidad: number;
  onIncrementar: (id: string) => void;
  onDecrementar: (id: string) => void;
  onEliminar: (id: string) => void;
}

export default function FilaCarrito({
  producto,
  cantidad,
  onIncrementar,
  onDecrementar,
  onEliminar,
}: FilaCarritoProps) {
  // Estado local: si la key no fuera estable, la nota se mezclaría entre filas.
  const [nota, setNota] = useState("");

  return (
    <li className="fila">
      <div className="fila-info">
        <strong>{producto.nombre}</strong>
        <span>{formatoMoneda(producto.precio)} / ud.</span>
        <span>Subtotal: {formatoMoneda(producto.precio * cantidad)}</span>
      </div>

      <div className="fila-cantidad">
        <button onClick={() => onDecrementar(producto.id)} aria-label="Quitar una unidad">
          −
        </button>
        <span>{cantidad}</span>
        <button
          onClick={() => onIncrementar(producto.id)}
          disabled={cantidad >= producto.stock}
          aria-label="Añadir una unidad"
        >
          +
        </button>
        <button onClick={() => onEliminar(producto.id)}>Eliminar</button>
      </div>

      <label className="nota">
        Nota para regalo
        <input type="text" value={nota} onChange={(e) => setNota(e.target.value)} />
      </label>
    </li>
  );
}
