import { useState } from "react";
import type { ItemCarrito } from "./tipos";
import { catalogo } from "./datos";
import Catalogo from "./components/Catalogo";
import Carrito from "./components/Carrito";
import "./App.css";

export default function App() {
  // Único estado: qué producto y cuántas unidades.
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  const añadir = (id: string) => {
    setCarrito((prev) => {
      const producto = catalogo.find((p) => p.id === id);
      if (!producto) return prev;
      const item = prev.find((i) => i.idProducto === id);
      if (!item) {
        return producto.stock > 0 ? [...prev, { idProducto: id, cantidad: 1 }] : prev;
      }
      if (item.cantidad >= producto.stock) return prev;
      return prev.map((i) =>
        i.idProducto === id ? { ...i, cantidad: i.cantidad + 1 } : i
      );
    });
  };

  const incrementar = añadir;

  const decrementar = (id: string) => {
    setCarrito((prev) =>
      prev.flatMap((i) => {
        if (i.idProducto !== id) return [i];
        return i.cantidad <= 1 ? [] : [{ ...i, cantidad: i.cantidad - 1 }];
      })
    );
  };

  const eliminar = (id: string) => {
    setCarrito((prev) => prev.filter((i) => i.idProducto !== id));
  };

  const vaciar = () => setCarrito([]);

  // Datos derivados, no se guardan en el estado.
  const unidades = carrito.reduce((suma, i) => suma + i.cantidad, 0);
  const subtotal = carrito.reduce((suma, i) => {
    const producto = catalogo.find((p) => p.id === i.idProducto);
    return suma + (producto ? producto.precio * i.cantidad : 0);
  }, 0);

  return (
    <main className="app">
      <h1>Tienda</h1>
      <Catalogo productos={catalogo} carrito={carrito} onAñadir={añadir} />
      <Carrito
        carrito={carrito}
        productos={catalogo}
        unidades={unidades}
        subtotal={subtotal}
        onIncrementar={incrementar}
        onDecrementar={decrementar}
        onEliminar={eliminar}
        onVaciar={vaciar}
      />
    </main>
  );
}
