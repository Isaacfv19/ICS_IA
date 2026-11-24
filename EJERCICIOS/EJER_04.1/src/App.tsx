import A1Contador from "./components/A1Contador";
import A2Carrito from "./components/A2Carrito";
import B1Relojes from "./components/B1Reloj";
import B2Efectos from "./components/B2Efectos";
import C1FormularioAcceso from "./components/C1FormularioAcceso";
import C2Cronometro from "./components/C2Cronometro";
import Cuaderno from "./components/Cuaderno";

export default function App() {
  return (
    <main>
      <h1>EJER_04.1 · Estado, efectos y refs</h1>
      <A1Contador />
      <A2Carrito />
      <B1Relojes />
      <B2Efectos />
      <C1FormularioAcceso />
      <C2Cronometro />
      <Cuaderno />
    </main>
  );
}
