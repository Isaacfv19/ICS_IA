import { ENVIO_COSTE, ENVIO_UMBRAL } from "../datos";
import { formatoMoneda } from "../formato";

interface ResumenCarritoProps {
  unidades: number;
  subtotal: number;
}

export default function ResumenCarrito({ unidades, subtotal }: ResumenCarritoProps) {
  // Se trabaja en céntimos para evitar errores de decimales al comparar.
  const subtotalCent = Math.round(subtotal * 100);
  const umbralCent = Math.round(ENVIO_UMBRAL * 100);

  const envioGratis = subtotalCent >= umbralCent;
  const envio = envioGratis ? 0 : ENVIO_COSTE;
  const total = (subtotalCent + Math.round(envio * 100)) / 100;
  const falta = (umbralCent - subtotalCent) / 100;
  const progreso = Math.min(100, (subtotalCent / umbralCent) * 100);

  return (
    <section className="resumen">
      <h3>Resumen</h3>
      <p>Unidades: {unidades}</p>
      <p>Subtotal: {formatoMoneda(subtotal)}</p>
      <p>Envío: {envioGratis ? "Gratis" : formatoMoneda(envio)}</p>
      <p className="total">Total: {formatoMoneda(total)}</p>

      <div className="barra" role="progressbar" aria-valuenow={Math.round(progreso)} aria-valuemin={0} aria-valuemax={100}>
        <div className="barra-relleno" style={{ width: `${progreso}%` }} />
      </div>
      <p className="aviso">
        {envioGratis
          ? "¡Envío gratis!"
          : `Te faltan ${formatoMoneda(falta)} para el envío gratis`}
      </p>
    </section>
  );
}
