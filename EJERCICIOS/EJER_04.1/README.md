# EJER_04.1 · Estado, efectos y refs

Cada ejercicio está en un componente propio dentro de `src/components`. `App.tsx` los muestra todos.

## A1 · Predice y comprueba

1. Tras pulsar **Sumar 3** desde 0, la consola muestra `Consola: 0` y el `<h3>` muestra `1`.
2. Con **Duplicar**, el primer clic da 2 y el segundo da 6.
3. Corrección: usar `setCuenta((anterior) => anterior + 1)` tres veces. El original no sumaba 3 porque `cuenta` es una foto del renderizado, vale 0 en todo el manejador y las tres llamadas ponen el mismo valor, 1.

## A2 · Carrito con useReducer

Al añadir `{ tipo: "aplicarDescuento"; porcentaje: number }` a la unión sin tratarla en el `switch`, TypeScript avisa con TS2366, porque la función ya no devuelve un valor en todos los casos y no hay `default`.

## B1 · Reloj con limpieza

Sin limpieza, cada montaje deja su `setInterval` vivo. En desarrollo, `StrictMode` monta, desmonta y vuelve a montar el componente, así que quedan dos temporizadores y salen dos `tic` por segundo. Al ocultar el reloj, los dos siguen funcionando porque nadie los detuvo.

## B2 · ¿Necesito un efecto?

1. **Fragmento 1.** El nombre completo es un dato derivado de las props, se calcula en el renderizado con una variable. El efecto provoca un renderizado extra y un estado duplicado.
2. **Fragmento 2.** Guardar es la respuesta a un evento, no a un renderizado, por eso va en `manejarEnvio`. El efecto además depende de `nombre` sin declararlo y guardaría datos desactualizados.
3. **Fragmento 3.** Con `key={idAlumno}` en el padre, React crea un componente nuevo al cambiar de alumno y su estado empieza vacío, sin efecto.

Avisos de `npm run lint` esperados en los originales, a comprobar en tu proyecto: en los fragmentos 1 y 3 el aviso de llamar a `setState` de forma síncrona dentro de un efecto (`react-hooks/set-state-in-effect`), y en el 2 `react-hooks/exhaustive-deps` por la dependencia `nombre` que falta.

## C1 · Foco inteligente

`campoCorreo.current` vale `null` hasta que el input se monta, y vuelve a ser `null` si se desmonta. Con `?.` no se llama a `focus()` sobre `null`, así que no hay error.

## C2 · Cronómetro con vueltas

El id va en una ref porque no se muestra en pantalla y cambiarlo no debe renderizar de nuevo. Si estuviera en el estado, cada vez que se guardara el id habría un renderizado extra, y dentro de un manejador el valor leído sería el de la foto anterior, lo que permitiría crear dos temporizadores al pulsar **Iniciar** dos veces seguidas.

## D · Cuaderno de notas del grupo

¿Por qué la media va en una variable calculada y no en el estado? Porque es un dato derivado de `alumnos`. Si se guardara en el estado habría que actualizarla en cada acción y podría quedar desincronizada, calculándola al renderizar siempre es correcta.
