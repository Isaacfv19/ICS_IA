import { useEffect, useRef, useState, type FormEvent } from "react";

export default function C1FormularioAcceso() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [intentado, setIntentado] = useState(false);
  const [verContrasena, setVerContrasena] = useState(false);

  const campoCorreo = useRef<HTMLInputElement>(null);
  const campoContrasena = useRef<HTMLInputElement>(null);

  // Los errores se calculan a partir de los valores.
  const errorCorreo = correo.includes("@") ? "" : "El correo debe contener @";
  const errorContrasena =
    contrasena.length >= 8 ? "" : "La contraseña debe tener al menos 8 caracteres";

  useEffect(() => {
    campoCorreo.current?.focus();
  }, []);

  function manejarEnvio(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIntentado(true);
    if (errorCorreo) {
      campoCorreo.current?.focus();
    } else if (errorContrasena) {
      campoContrasena.current?.focus();
    }
  }

  function manejarVaciar() {
    setCorreo("");
    setContrasena("");
    setIntentado(false);
    campoCorreo.current?.focus();
  }

  return (
    <section>
      <h2>C1 · Foco inteligente</h2>
      <form onSubmit={manejarEnvio} noValidate>
        <p>
          <label>
            Correo{" "}
            <input
              ref={campoCorreo}
              type="text"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </label>
          {intentado && errorCorreo && <span role="alert"> {errorCorreo}</span>}
        </p>
        <p>
          <label>
            Contraseña{" "}
            <input
              ref={campoContrasena}
              type={verContrasena ? "text" : "password"}
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </label>
          {/* onMouseDown evita que el botón le quite el foco al campo */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setVerContrasena((v) => !v)}
          >
            {verContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
          </button>
          {intentado && !errorCorreo && errorContrasena && (
            <span role="alert"> {errorContrasena}</span>
          )}
        </p>
        <button type="submit">Entrar</button>
        <button type="button" onClick={manejarVaciar}>
          Vaciar
        </button>
      </form>
    </section>
  );
}
