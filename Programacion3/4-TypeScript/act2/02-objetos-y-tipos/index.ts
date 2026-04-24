// ============================================
// CLASE 2: FUNCIONES AVANZADAS Y OBJETOS
// ============================================

// ============================================
// MÓDULO 2: Repaso Rápido
// ============================================

// Tipos básicos
let nombre2: string = "Juan";
let edad: number = 25;
let activo: boolean = true;

// Arrays
let numeros: number[] = [1, 2, 3];

// Funciones
function sumar(a: number, b: number): number {
  return a + b;
}

// Parámetros opcionales
function saludar(nombre: string, apellido?: string): string {
  return apellido ? `Hola ${nombre} ${apellido}` : `Hola ${nombre}`;
}

// ============================================
// MÓDULO 3: Objetos - Tipado Inline
// ============================================

// Objeto con tipo inline
let usuario: { nombre: string; edad: number; activo: boolean } = {
  nombre: "Ana",
  edad: 28,
  activo: true,
};

// Función que recibe un objeto
function mostrarUsuario(user: { nombre: string; edad: number }): void {
  console.log(`${user.nombre} tiene ${user.edad} años`);
}

mostrarUsuario({ nombre: "Carlos", edad: 30 });

// Arrays de objetos
let usuarios: { nombre: string; edad: number }[] = [
  { nombre: "Juan", edad: 25 },
  { nombre: "María", edad: 30 },
  { nombre: "Pedro", edad: 22 },
];

// ============================================
// MÓDULO 4: Type Alias - Reutilizando Tipos
// ============================================

// Crear un Type Alias
type Usuario = {
  nombre: string;
  edad: number;
  email: string;
  activo: boolean;
};

// Usar el tipo
let usuario1: Usuario = {
  nombre: "Ana",
  edad: 28,
  email: "ana@mail.com",
  activo: true,
};

// Función con Type Alias
function registrarUsuario(usuario: Usuario): void {
  console.log(`Usuario registrado: ${usuario.nombre}`);
}

// Array con Type Alias
let usuariosLista: Usuario[] = [
  { nombre: "Juan", edad: 25, email: "juan@mail.com", activo: true },
  { nombre: "María", edad: 30, email: "maria@mail.com", activo: false },
];

// ============================================
// MÓDULO 5: Propiedades Opcionales y Readonly
// ============================================

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string; // Propiedad opcional
  stock?: number; // Propiedad opcional
  readonly codigo: string; // Solo lectura
};

let producto1: Producto = {
  id: 1,
  nombre: "Laptop",
  precio: 1000,
  codigo: "LAP-001",
  // descripcion y stock son opcionales
};

let producto2: Producto = {
  id: 2,
  nombre: "Mouse",
  precio: 25,
  descripcion: "Mouse inalámbrico",
  stock: 50,
  codigo: "MOU-002",
};

// producto1.codigo = "LAP-002"; // ❌ Error: es readonly

// ============================================
// MÓDULO 6: Interface - La alternativa a Type
// ============================================

// Interface básica
interface Estudiante {
  nombre: string;
  legajo: number;
  carrera: string;
  activo: boolean;
}

let estudiante1: Estudiante = {
  nombre: "Laura",
  legajo: 12345,
  carrera: "Desarrollo de Software",
  activo: true,
};

// Interface con métodos
interface Calculadora {
  sumar(a: number, b: number): number;
  restar(a: number, b: number): number;
}

let miCalculadora: Calculadora = {
  sumar: (a, b) => a + b,
  restar: (a, b) => a - b,
};

console.log(miCalculadora.sumar(10, 5)); // 15
console.log(miCalculadora.restar(10, 5)); // 5

// ============================================
// MÓDULO 7: Type vs Interface
// ============================================

// Type - Puede ser cualquier cosa
type ID = string | number;
type Punto = [number, number];

// Interface - Solo para objetos
interface UsuarioInterface {
  id: ID;
  nombre: string;
}

// Type - Union types
type Estado = "activo" | "inactivo" | "pendiente";

// Interface - Se puede extender (herencia)
interface Persona {
  nombre: string;
  edad: number;
}

interface Empleado extends Persona {
  salario: number;
  puesto: string;
}

let empleado: Empleado = {
  nombre: "Carlos",
  edad: 35,
  salario: 50000,
  puesto: "Developer",
};

// ============================================
// MÓDULO 8: Union Types
// ============================================

// Union type básico
let id: string | number;
id = "ABC123"; // ✅ OK
id = 456; // ✅ OK
// id = true;   // ❌ Error

// Función con union type
function imprimirId(id: string | number): void {
  console.log(`El ID es: ${id}`);
}

imprimirId("ABC123");
imprimirId(456);

// Union type con objetos
type Respuesta =
  | {
      success: true;
      data: string;
    }
  | {
      success: false;
      error: string;
    };

let respuestaOk: Respuesta = {
  success: true,
  data: "Datos cargados",
};

let respuestaError: Respuesta = {
  success: false,
  error: "No se encontró el recurso",
};

// ============================================
// MÓDULO 9: Literal Types y Type Narrowing
// ============================================

// Literal types
type Direccion = "arriba" | "abajo" | "izquierda" | "derecha";

function mover(direccion: Direccion): void {
  console.log(`Moviendo hacia: ${direccion}`);
}

mover("arriba"); // ✅ OK
// mover("diagonal"); // ❌ Error

// Type narrowing con typeof
function procesarValor(valor: string | number): string {
  if (typeof valor === "string") {
    return valor.toUpperCase(); // TypeScript sabe que es string
  } else {
    return valor.toFixed(2); // TypeScript sabe que es number
  }
}

console.log(procesarValor("hola")); // "HOLA"
console.log(procesarValor(3.14159)); // "3.14"

// Type narrowing con propiedad discriminante
type Figura =
  | { tipo: "circulo"; radio: number }
  | { tipo: "rectangulo"; ancho: number; alto: number };

function calcularArea(figura: Figura): number {
  if (figura.tipo === "circulo") {
    return Math.PI * figura.radio ** 2;
  } else {
    return figura.ancho * figura.alto;
  }
}

const circulo: Figura = { tipo: "circulo", radio: 5 };
const rectangulo: Figura = { tipo: "rectangulo", ancho: 10, alto: 5 };

console.log(calcularArea(circulo)); // 78.54
console.log(calcularArea(rectangulo)); // 50

// ============================================
// MÓDULO 10: Ejemplo Completo - Sistema de Productos
// ============================================

// Definir tipos
type Categoria = "electrónica" | "ropa" | "alimentos" | "hogar";

interface ProductoCompleto {
  id: number;
  nombre: string;
  precio: number;
  categoria: Categoria;
  stock: number;
  descripcion?: string;
}

// Crear productos
let productos: ProductoCompleto[] = [
  {
    id: 1,
    nombre: "Laptop Dell",
    precio: 1200,
    categoria: "electrónica",
    stock: 15,
  },
  {
    id: 2,
    nombre: "Remera Nike",
    precio: 45,
    categoria: "ropa",
    stock: 50,
    descripcion: "Remera deportiva",
  },
  {
    id: 3,
    nombre: "Arroz",
    precio: 3.5,
    categoria: "alimentos",
    stock: 100,
  },
];

// Funciones para manejar productos
function agregarProducto(producto: ProductoCompleto): void {
  productos.push(producto);
  console.log(`Producto ${producto.nombre} agregado`);
}

function buscarPorCategoria(categoria: Categoria): ProductoCompleto[] {
  return productos.filter((p) => p.categoria === categoria);
}

function calcularTotal(productos: ProductoCompleto[]): number {
  return productos.reduce((total, p) => total + p.precio, 0);
}

function actualizarStock(id: number, nuevoStock: number): void {
  const producto = productos.find((p) => p.id === id);
  if (producto) {
    producto.stock = nuevoStock;
    console.log(`Stock de ${producto.nombre} actualizado a ${nuevoStock}`);
  } else {
    console.log("Producto no encontrado");
  }
}

// Uso de las funciones
const electronicos = buscarPorCategoria("electrónica");
console.log(`Total electrónicos: $${calcularTotal(electronicos)}`);

const nuevoProducto: ProductoCompleto = {
  id: 4,
  nombre: "Silla Ergonómica",
  precio: 250,
  categoria: "hogar",
  stock: 20,
  descripcion: "Silla para oficina",
};

agregarProducto(nuevoProducto);
actualizarStock(1, 10);

console.log("Todos los productos:", productos);
