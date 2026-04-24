"use strict";
// ============================================
// CLASE 1: FUNDAMENTOS Y SISTEMA DE TIPOS
// ============================================
// ============================================
// MÓDULO 2: ¿Por qué TypeScript?
// ============================================
// JavaScript - Problemas comunes
function sumarJS(a, b) {
    return a + b;
}
console.log(sumarJS(5, "10")); // "510" 😱
console.log(sumarJS(5, 10)); // 15 ✅
// TypeScript - Solución
function sumarTS(a, b) {
    return a + b;
}
console.log(sumarTS(5, 10)); // 15 ✅
// console.log(sumarTS(5, "10")); // ❌ Error en tiempo de desarrollo
// ============================================
// MÓDULO 5: Tipos Básicos - Primitivos
// ============================================
// String
let nombre = "Juan";
let apellido = "Pérez";
// Number
let edad1 = 25;
let precio = 99.99;
let hexadecimal = 0xf00d;
// Boolean
let esEstudiante = true;
let tieneDescuento = false;
// Inferencia de tipos (TypeScript adivina el tipo)
let ciudad = "Mendoza"; // TypeScript infiere: string
// ciudad = 123; // ❌ Error!
// ============================================
// MÓDULO 6: Tipos Especiales
// ============================================
// any - Desactiva el chequeo de tipos (¡evitar!)
let cualquierCosa = "hola";
cualquierCosa = 123;
cualquierCosa = true; // Todo permitido
// unknown - Tipo seguro para valores desconocidos
let valorDesconocido = "hola";
// valorDesconocido.toUpperCase(); // ❌ Error
if (typeof valorDesconocido === "string") {
    console.log(valorDesconocido.toUpperCase()); // ✅ OK
}
// void - Para funciones que no retornan nada
function saludar1() {
    console.log("Hola!");
    // No hay return
}
// never - Para funciones que nunca terminan
function error(mensaje) {
    throw new Error(mensaje);
}
// ============================================
// MÓDULO 7: Arrays Tipados
// ============================================
// Array de strings
let frutas = ["manzana", "banana", "naranja"];
// frutas.push(123); // ❌ Error
frutas.push("pera"); // ✅ OK
// Array de números
let numeros2 = [1, 2, 3, 4, 5];
numeros2.push(6); // ✅ OK
// Más arrays
let ciudades = ["Mendoza", "Córdoba", "Buenos Aires"];
let edades = [18, 25, 30];
// ============================================
// MÓDULO 8: Funciones con Tipos - Parte 1
// ============================================
// Función básica con tipos
function multiplicar(a, b) {
    return a * b;
}
// Arrow function
const dividir = (a, b) => {
    return a / b;
};
// Retorno implícito
const restar = (a, b) => a - b;
// Función que no retorna nada
function mostrarMensaje(mensaje) {
    console.log(mensaje);
}
// Ejemplo de uso
const resultado = multiplicar(5, 3); // 15
mostrarMensaje(`El resultado es: ${resultado}`);
// ============================================
// MÓDULO 9: Funciones con Tipos - Parte 2
// ============================================
// Función con parámetro opcional
function saludarCompleto(nombre, apellido) {
    if (apellido) {
        return `Hola ${nombre} ${apellido}`;
    }
    return `Hola ${nombre}`;
}
console.log(saludarCompleto("Juan")); // "Hola Juan"
console.log(saludarCompleto("Juan", "Pérez")); // "Hola Juan Pérez"
// Función con valor por defecto
function crearUsuario(nombre, rol = "usuario") {
    return `Usuario: ${nombre}, Rol: ${rol}`;
}
console.log(crearUsuario("Ana")); // Rol: "usuario"
console.log(crearUsuario("Ana", "admin")); // Rol: "admin"
// Rest parameters
function sumarTodos(...numeros) {
    return numeros.reduce((acc, num) => acc + num, 0);
}
console.log(sumarTodos(1, 2, 3, 4, 5)); // 15
console.log(sumarTodos(10, 20)); // 30
