let edad = 25;          
let nombre = 'Ana';       
let esActivo = true;      

let edad2: number = 30;
let nombre2: string = 'Luis';
let esActivo2: boolean = false;

// 3. Provocar errores de tipos
// edad = 'veinticinco';   // Error: Type 'string' is not assignable to type 'number'
// nombre = 42;            // Error: Type 'number' is not assignable to type 'string'
// esActivo = 'sí';        // Error: Type 'string' is not assignable to type 'boolean'
// edad2 = '30';           // Error: igual, aunque el tipo esté anotado

// 4. Corregirlos: asignar valores del tipo correcto
edad = 26;
nombre = 'María';
esActivo = false;

// 5. Objeto tipado
const persona: { nombre: string; edad: number; esSocio: boolean } = {
  nombre: 'Carlos',
  edad: 40,
  esSocio: true,
};

// Propiedad inexistente (descomenta para ver el error)
// persona.apellido = 'Pérez';
// Error: Property 'apellido' does not exist on type '{ nombre: string; edad: number; esSocio: boolean; }'

// Corrección: añadir apellido como propiedad opcional al tipo
const persona2: { nombre: string; edad: number; esSocio: boolean; apellido?: string } = {
  nombre: 'Carlos',
  edad: 40,
  esSocio: true,
};
persona2.apellido = 'Pérez'; // válido

console.log(edad, nombre, esActivo, edad2, nombre2, esActivo2, persona, persona2);

export {}; // evita conflictos de nombres con otros .ts del proyecto