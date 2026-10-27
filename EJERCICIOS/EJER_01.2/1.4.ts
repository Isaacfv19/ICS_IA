enum Rol {
  ADMIN,
  EDITOR,
  LECTOR,
}

type Estado = 'activo' | 'inactivo' | 'pendiente';

interface Usuario {
  nombre: string;
  rol: Rol;
  estado: Estado;
}

function describirUsuario(usuario: Usuario): string {
  if (usuario.estado === 'pendiente') {
    return `${usuario.nombre} está pendiente de aprobación.`;
  }

  if (usuario.estado === 'inactivo') {
    return `${usuario.nombre} está inactivo y no puede acceder.`;
  }

  if (usuario.rol === Rol.ADMIN) {
    return `${usuario.nombre} es administrador activo: acceso total.`;
  }
  if (usuario.rol === Rol.EDITOR) {
    return `${usuario.nombre} es editor activo: puede crear y editar contenido.`;
  }
  return `${usuario.nombre} es lector activo: solo puede leer.`;
}

// 5. Matriz de usuarios con varios casos
const usuarios: Usuario[] = [
  { nombre: 'Ana', rol: Rol.ADMIN, estado: 'activo' },
  { nombre: 'Luis', rol: Rol.EDITOR, estado: 'activo' },
  { nombre: 'Marta', rol: Rol.LECTOR, estado: 'activo' },
  { nombre: 'Pablo', rol: Rol.EDITOR, estado: 'inactivo' },
  { nombre: 'Lucía', rol: Rol.LECTOR, estado: 'pendiente' },

  // Caso inválido (descomenta para ver el error)
  // { nombre: 'Error', rol: Rol.ADMIN, estado: 'bloqueado' },
  // Error: Type '"bloqueado"' is not assignable to type 'Estado'
];

usuarios.forEach((u) => console.log(describirUsuario(u)));

export {};