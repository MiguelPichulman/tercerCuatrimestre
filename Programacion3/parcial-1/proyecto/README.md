# Food Store - Evaluación 1 (Programación 3)

## Descripción del Proyecto
Este proyecto es una aplicación frontend dinámica e interactiva desarrollada para la cátedra de Programación 3 de la UTN. Consiste en la evolución de un catálogo de comidas (Food Store) que permite a los usuarios interactuar con los productos.

Las funcionalidades principales implementadas son:
* Renderizado dinámico del catálogo de productos y categorías.
* Búsqueda de productos por nombre en tiempo real.
* Filtrado de productos por categoría.
* Carrito de compras funcional con persistencia de datos utilizando `localStorage`.
* Capacidad para agregar, modificar cantidades y eliminar productos del carrito.
* Cálculo automático del subtotal y total de la compra.

El desarrollo se realizó utilizando HTML5, CSS3, JavaScript y TypeScript puro (Vanilla), sin el uso de frameworks externos, y está empaquetado utilizando Vite.

## 🚀 Instalación y Uso

Se recomienda usar `pnpm` como gestor de paquetes para mayor eficiencia en el manejo de dependencias.

### 1. Instalar pnpm
Si no tienes `pnpm` instalado, puedes hacerlo fácilmente a través de `npm` (que viene con Node.js) ejecutando el siguiente comando en tu terminal:
```bash
npm install -g pnpm

### 2. Instalar Dependencias del Proyecto

Una vez en la carpeta raíz del proyecto, instala las dependencias necesarias con `pnpm`:

```bash
pnpm install
```

### 3. Ejecutar el Proyecto

Para iniciar el servidor de desarrollo de Vite, ejecuta:

```bash
pnpm dev
```

La aplicación estará disponible en la URL que aparezca en la terminal (generalmente `http://localhost:5173`).

---

## 📁 Estructura del Proyecto

```
## Estructura del Proyecto

Las páginas y lógica del parcial se ubican dentro de `src/`, respetando la siguiente organización:

```text
src/
├── pages/
│   └── store/
│       ├── home/
│       │   ├── home.html    <- catálogo de productos
│       │   └── home.ts      <- lógica: render, búsqueda, filtros
│       └── cart/
│           ├── cart.html    <- vista del carrito
│           └── cart.ts      <- lógica: render, cantidades, total
├── types/
│   ├── product.ts           <- interfaces Product y CartItem
│   └── categoria.ts         <- interface Icategoria
└── data/
    └── data.ts              <- PRODUCTS y getCategories()



Alumuno: Pichulman, Miguel Angel