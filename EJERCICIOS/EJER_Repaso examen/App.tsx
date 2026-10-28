import InterruptorLuz from "./InterruptorLuz";
import ContadorLimitado from "./ContadorLimitado";
import ListaCompra from "./ListaCompra";
import BuscadorPeliculas from "./BuscadorPeliculas";

export default function App() {
  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: 16 }}>
      <InterruptorLuz />
      <hr />
      <ContadorLimitado />
      <hr />
      <ListaCompra />
      <hr />
      <BuscadorPeliculas />
    </main>
  );
}
